第12章
----------
:翻译: 红原

.. contents:: 内容

Writing a Product in Python (用python写一个产品)
================================================

Writing a product for Plone allows you to do almost anything you'd like to do with Plone. Using Python to write content types or tools is the best way to provide ultimate flexibility. If you have a burning need for Plone to do something specific and it isn't covered elsewhere, then this is your opportunity to add this feature by writing a product. This could be storing some type of content specific to your company or some manipulation unique to you. In the previous chapter, I showed how you can customize a content type. This customization can take you only so far, though; you can't actually add new attributes to your content type, for example. Instead, you'll probably want to write your own content type.

通过给Plone写一个产品，你几乎可以用Plone作任何事。用Python写内容类型或工具是提供最大灵活性的最佳方法。如果你急需要用Plone实现某个特殊的功能但其他地方找不到现成的，那你就有机会写一个产品来添加该功能。这个功能可能是保存你公司所特有的某种类型的内容，或者是某种对你来说特有的操作。在前一章中，我讲述了如何定制一种内容类型，但定制只能带你走这么远了。例如，你实际上无法为你的内容类型添加新属性。这时，你可能希望能够写自己的内容类型。

In this chapter, I run through two examples: a content type and a tool. Both of these examples will be relatively straightforward but will get you ready for the next chapter, where I'll show you how to use Archetypes, a framework for Plone that allows you to generate content types quickly and simply with a minimal amount of code.

本章中，我将列举两个例子：一个内容类型以及一个工具。两个例子都相当简单明了，但能使你对下一章的内容有所准备。下一章将要讲述Archetype，这是Plone中能使你简单迅速地生成内容类型而将编码工作减到最低的一个框架。

Specifically, I create a custom content type in Plone and step through all the code used to create this content type. It's a quite interesting content type -- it uses several building blocks it pulls from a third-party C module and incorporates them into your Plone site. I show how to create the content type initially and then add permissions, search integration, new user interface elements, and installation scripts. Finally, I cover how to create a Plone tool, which is a way to add new tools to a site. Both of the examples in this chapter are available online for you to download, install, and study. Also, Appendix B lists all the code.

下面我会具体地在Plone中创建一个定制内容类型，和大家一起分析创建该内容类型所用到的所有代码。这是一个相当有用的内容类型，它从一个第三方的C语言模块中将一些组件组合到你的Plone站点中去。我将展示如何初始创建该内容类型，然后添加权限，整合检索功能，增加用户界面以及安装脚本。最后，我会阐述如何创建Plone工具。这是一种向站点添加新工具的途径。本章的两个例子都可以在线下载，安装。同时，附录B中列出了完整的代码。

Writing a Custom Content Type (定制内容类型)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For the Plone book Web site (*<a href="http://plone-book.agmweb.ca">http://plone-book.agmweb.ca</a>*), I wanted to be able to show the code from this book online. I could've taken the code and simply placed it into documents, but that code would just show up without syntax highlighting. Also, all the whitespace in Python would have been removed. For a great product such as Plone, I needed something that looked good. So I needed a content type that would take code, syntax highlight it nicely, and allow users to easily view it online. Figure 12-1 shows the sample finished product.

在Plone宝典的网站(*<a href="http://plone-book.agmweb.ca">http://plone-book.agmweb.ca</a>*)上，我希望能够显示本书中的一些源代码。我可以把源代码直接插到Web文档中去，但这样的话代码显示的时候就不会有语法强调。另外，Python代码中的空白也会被丢掉。对于Plone这样的一流产品，我需要显示的效果同样的棒。这样我需要一种能对代码进行语法强调，让用户能够很方便地在线查看代码的内容类型。图12-1是这样一种产品完成后的样子。

 .. image:: img/3294f1201.png
    :width: 700

Figure 12-1. An example Python script uploaded into Plone

图12-1. 上传到Plone中的一段Pytyon脚本代码

From this design, you can extrapolate a few requirements for this product. Specifically, this product will have the following attributes:

从这样一个设计中，你可以推出该产品的一些要求。特别地，这个产品需要有以下一些属性：

  - **ID**: Each piece of code will have a unique ID. This attribute is required.

  - **Title**: Each piece of code should have a title. This attribute is required.

  - **Description**: Each piece of code should have a description describing what it should do. This attribute is optional.

  - **Source code**: Each piece of code will have one source code attribute that contains the source for that content type. This will be optional, but making it required is reasonable.

  - **Language**: This is the language for the source code -- for example, Perl, Python, Hypertext Markup Language (HTML), and so on.

  - **ID**: 每段代码都需要有唯一的ID。这是一个必要属性。

  - **Title**: 每段代码都需要有一个标题. 这是一个必要属性。

  - **Description**: 每段代码应该有该代码实现那些功能的描述。这是一个可选属性。

  - **Source code**: 每段代码有一个源代码属性，保存该内容类型的源代码。例子中这个属性是可选的，但把它设为必要属性也是合理的。

  - **Language**: 源代码的语言，如Perl, Python, Hypertext Markup Language (HTML)等。

Of course, the content type should interact with Plone so that you can use the power of Plone. You'll need to ensure that the product can be searched, can interact with security, can interact with workflow, and is correctly persisted. Further, it'd be nice if users could upload scripts directly from their hard drives rather than trying to cut and paste into a text area.

当然，内容类型应该能够和Plone互动以便能够充分利用Plone。你应该保证新产品可以被检索，能够与Plone的安全模型结合，能够整合流程并能正确地被固化。除此之外，用户最好还能够从硬盘上直接上传脚本文件而无需拷贝后粘贴到文本框中。

When investigating this code, I needed to find a simple way to turn code into HTML. This is pretty easy to do for a language with simple syntax such as Python (in fact, Python can 'lex' its own code), but really you want to be able to do this for multiple languages, such as HTML (page templates), JavaScript<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=JavaScript" title="create this page">?</a>, Cascading Style Sheets (CSS), and so on. Fortunately, the SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> module does this already and is available from SourceForge<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SourceForge" title="create this page">?</a> (*<a href="http://silvercity.sf.net/">http://silvercity.sf.net/</a>*). It uses C libraries from the Scintilla text editor to lex the code. Without having to worry too much implementation, the upshot is that it'll happily spit out syntax-highlighted HTML for nearly a dozen programming languages.

对代码进行分析时，我发现需要找到一种把代码转化为HTML的简单的方法。对于象Python一样语法简单的语言，这还是相当方便的(事实上，Python可以分析自己的代码语法)。但我们需要的是对多种不同的语言实现这个功能，包括HTML(页面模板)，Java Script, CSS等。幸运的是，SourceForge上的SilverCity模块(*<a href="http://silvercity.sf.net/">http://silvercity.sf.net/</a>*)已经实现了这个功能。它使用Scintilla文本编辑器中的C语言库来完成代码分析。这样我们不用去操心具体的实现，只要使用该模块就可以为十几种编程语言生成带语法强调的HTML代码。

Looking at the list of requirements, you'll see that they're pretty straightforward. In fact, the ID, title, and description are all defined in the Dublin Core implementation in Plone. So you have to worry only about the source code and language. Plone requires an ID and a title, and it really helps to have a description.

从需求清单中你可以看到这些都是相当简单的需求。实际上，ID、标题、描述在Plone的Dublin核心实现中都已经是现成的了。这样你只要关心源代码和语言属性就可以了。Plone要求必须有ID和标题，而描述属性也非常有用。

Starting the Content Type (开始内容类型的创建)
..............................................

Now that you have an idea of the content type you'll create in this chapter, you can start building it by writing Python on the file system. This content type is also a product, so you create a new directory in your product directory. The name of the directory you'll create is the name of the product that Zope will import, so choose your name wisely. I toyed with the idea of calling the product *SourceCode<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SourceCode" title="create this page">?</a>* or *PloneSourceCode<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSourceCode" title="create this page">?</a>* but decided those would be too confusing (they could also mean that the product is the actual source code for Plone). Instead, *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* seemed to be a nice name that gave credit to its origins and was sufficiently obscure that no one would confuse it with something else.

现在你已经了解了本章中将要创建的内容类型的大概情况，就可以着手在文件系统上使用Python开始编写它了。这个内容类型同时也是一个产品，因此你需要在产品目录中创建一个新的目录。目录的名称就事Zope就要导入的产品名称，所以要合理地取名。我曾想给这个产品取名为*源代码*或*Plone源代码*，但最后觉得它们都太容易引起误解(从名称上看人们可能会以为这是Plone的源代码)。*PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>*看上去是个不错的名字，既点明了它的来源，又足够地含糊，使人不会把它误解为其他东西。

After creating the directory, I usually add a few files and directories that I'll need. Every package needs an *__init__.py* file in it. The name of this file comes from Python and indicates that this directory is a Python package and hence importable. When the package is imported, Zope executes this file. Inside that file, you'll insert the product registration code so that the product will be registered with Zope.

建立该目录后，我一般会加入一些需要的文件和目录。所有的产品包需要包含一个 *__init__.py* 文件。这个文件名来源于Python，表示该目录是一个Python的包，可以使用import导入。当这个软件包被导入时，Zope会执行该文件。在该文件中，你需要包含产品的注册代码将该产品在Zope中注册。

Being user friendly, you can also add a few text files such as *readme.txt*, *install.txt*, and so on. One other text file that's also useful to add is *refresh.txt*. This file lets you hook into Zope's Refresh module and lets you dynamically reload the product as you write it. This is mind-bogglingly useful for your first few steps in writing a class, and I'll show how to configure this in Zope later.

为了对用户友好一些，你还需要加入一些文本文件如 *readme.txt*,  *install.txt* 等。另一个有用的文件是  *refresh.txt* 。这个文件使你可以连接Zope的Refresh模块，可以在编写产品的时候动态地重新加载该产品。对于刚开始编写一个类的读者来说，这可能已经让你有些不知所云了。我将在以后介绍如何在Zope中进行这个配置。

At the moment, you have a directory called *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* in the product directory that contains the following files, all empty: *readme.txt*, *refresh.txt*, *install.txt*, and *__init__.py*. This is now a valid Python package that does absolutely nothing (but not for long).

现在，在产品目录中我们有了一个名为 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* 的目录，包含了以下的文件： *readme.txt*, *refresh.txt*, *install.txt* 和 *__init__.py* 。这些文件暂时是空白的。这已经是一个合法的Python包了，尽管它目前什么都不做(但仅仅是暂时)。

Developing with ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a> (使用ZClass进行开发)
.............................................

You're creating the content type using Python, but you've probably heard about ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a> in other documentation or on the Internet. ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a> are an existing framework in Zope 2 for developing classes through the Web. Many people have developed and distributed ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a> successfully, and there can be a role for them for rapid development. However, I really don't recommend them. It's hard to develop them using existing tools, place them in source code, distribute them, and so on. Almost everyone I've talked to about ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a> agrees that it's worth the effort to learn how to develop with Python, and I've seen more than one presentation that has ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a> in the list of mistakes people have made.

你将使用Python语言创建我们的内容类型，但你可能曾经在其他文档和互联网上听说过ZClass。ZClass是在Zope 2中通过Web进行类开发的现有框架。许多人成功地开发并发布了不少ZClass，它们在快速开发中可以有一席之地。然而，我并不建议使用ZClass进行开发，因为它们用现有的工具很难进行源代码级的开发和发布。几乎所有和我讨论过ZClass的人都认为应该花力气去学习如何使用Python进行开发，而且我不止一次看到有人将ZClass列为曾经犯过的错误之一。

If you do see documentation or other information relating to ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a>, then I really recommend resisting the temptation to use it. For this reason, there's no mention of developing using ZClasses<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZClasses" title="create this page">?</a>. If you're looking for a quick way to develop, then take a look at Archetypes, which is a slightly different approach.

如果你确实看了关于ZClass的文档和其他信息，我强烈建议你抵制住诱惑不要使用它。处于这个原因，本书中没有提到ZClass的开发方法。如果你需要使用快速开发的方面，那就请看一下Archetype，它采用了一种略微不同的方法。

Integrating SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> (整合SilverCity)
.......................................

Before you get too far into the Zope code, it may be useful to figure out how to use SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>. In any software development, writing layers that allow testing at atomic layers is absolutely vital. For this reason, you should start by making sure that you can use SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> from a Python module. If that works, you then simply have to add the Zope layer.

在深入Zope代码之前，我们最好能看一下怎样使用SilverCity。在任何软件开发过程中，使用分层结构以便能够在完整独立的层上进行测试，这一点是绝对重要的。因此，你在一开始应该能够确保能够从Python模块中使用SilverCity。如果成功了，你只需要加上Zope的一层就可以了。

So, look into SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> for a moment. First, you have to install SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>; fortunately, this module corresponds to the install instructions for Python modules as outlined in Chapter 10. To install on Windows, download the file *SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>-0.9.5.win32-py2.3.exe* from *<a href="http://silvercity.sf.net">http://silvercity.sf.net</a>* and run the graphical installer. To install on Linux, download the file *SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>-0.9.5.tar.gz* from *<a href="http://silvercity.sf.net">http://silvercity.sf.net</a>* and save it to disk. Then unpack it and run the *setup.py* program. For example:

所以我们先来看看SilverCity。首先，你必须先安装SilverCity。幸运的是，这个模块的安装方法和第十章中描述的Python模块的安装方法是一致的。在Windows下，从 *<a href="http://silvercity.sf.net">http://silvercity.sf.net</a>* 下载 *SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>-0.9.5.win32-py2.3.exe* 然后运行安装程序就可以了。在Linux下，下载文件 *SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>-0.9.5.tar.gz* 到磁盘上，解包后运行 *setup.py* 。例如：

::

 $ tar -zxf SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>-0.9.2.tgz
 $ cd SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>-0.9.2
 $ python setup.py install
 ...

After doing this, you can quickly test that it works from the following Python prompt in Windows or Linux:

安装完成后，通过Windows或Linux下的Python命令行，你可以很快建议其运行是否正常：

::

 $ python
 Python 2.3.2 (#1, Oct  6 2003, 10:07:16)
 [GCC 3.2.2 20030222 (Red Hat Linux 3.2.2-5)]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=GCC%203.2.2%2020030222%20%28Red%20Hat%20Linux%203.2.2-5%29" title="create this page">?</a> on linux2
 Type "help", "copyright", "credits" or "license" for more information.
 >>> import SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>
 >>>

This means SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> has been successfully installed. If you don't get a similar result and can't import SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>, stop and solve this issue first; otherwise nothing else will run.

这表明SilverCity成功安装了。如果你得不到相同的结果，不能导入SilverCity模块，那就先停下来解决这个问题，否则往后什么都不会运行。

Now you need to figure out the Application Programming Interface (API) for this module; being lazy, I went and read an example script located in *PySilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PySilverCity" title="create this page">?</a>/Scripts* called *source2html.py*. This script does exactly what you want: It spits out HTML for a given piece of code. A really cheeky way to see this in operation is to feed this script to itself, like so:

下面你需要探索一下这个模块的编程接口(API)。作为一个偷懒的方法，我在 *PySilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PySilverCity" title="create this page">?</a>/Scripts* 目录下找到了一个示例脚本 *source2html.py* 研究了一下。这个脚本恰好完成了你想要的东西：给定一段代码它就输出相应的HTML。观察该脚本实际工作方式的一种好玩的方法是把该脚本作为自己的输入，象下面一样：

::

 $python source2html.py source2html.py --generator=python
  
 <?xml version="1.0" encoding="utf-8"?>
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml">
 <head>
   <title>source2html.py</title>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <link
     rel="stylesheet"
     href="default.css" />
 </head>
 ...

This means you just need to look at this API and alter it slightly. Add a module called *source.py* in the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* directory. In this you'll write the code that will provide the interface to the library; this new module contains no Zope-specific or Plone-specific code at this point. This module has three main modules: it'll tell you all the possible languages you can use, it'll take some text and return the correct parser, and finally it'll actually perform the translation.

这意味着你只要看看这个脚本中的API然后稍作修改就可以了。在 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* 目录下先添加一个模块 *source.py* 。你将在这个模块中写入与库接口的代码，现在这个模块中不包含任何Zope或Plone相关代码。这个模块有3个主要部分：它列举所有你可以用的语言；它接受一些文本，返回正确的分析器；最后，它进行代码的转换。

First, add the following *create_generator* function, which gives you the correct parser:

首先添加下面的 *create_generator* 函数以返回正确的生成器。

::

 from SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> import LanguageInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=LanguageInfo" title="create this page">?</a>
 from StringIO<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=StringIO" title="create this page">?</a> import StringIO<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=StringIO" title="create this page">?</a>
  
 def create_generator(source_file_name=None, generator_name=None):
     """ Make a generator from the given information
     about the object, such as its source and type """
     if generator_name:
         return LanguageInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=LanguageInfo" title="create this page">?</a>.find_generator_by_name(generator_name)()
     else:
         if source_file_name:
             h = LanguageInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=LanguageInfo" title="create this page">?</a>.guess_language_for_file(source_file_name)
             return h.get_default_html_generator()()
         else:
             raise ValueError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ValueError" title="create this page">?</a>, "Unknown file type, cannot create lexer"

Second, when you're in Plone, you need to be able to figure out exactly what languages are available so you can show them to the users. Write the following function to return that list, and call it *list_generators*:

第二不，在Plone中你需要能够知道有哪几种语言可用，这样你可以把它们显示给用户。下面的 *list_generators* 函数返回这样的一份清单：

::

 def list_generators():
     """ This returns a list of generators, a generator
     is a valid language, so these are things like perl,
     python, xml etc..."""
     lexers = LanguageInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=LanguageInfo" title="create this page">?</a>.get_generator_names()
     return lexers

Finally, the *generate_html* function takes a source file as a string, an optional generator, and an optional filename. SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> requires a file such as *buffer* to write the content out, so you can use Python's *StringIO<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=StringIO" title="create this page">?</a>* module to accomplish this. The following is the *generate_html* function:

最后，函数 *generate_html* 接受三个参数：以字符串格式代表的源文件名，可选的生成器以及一个可选的文件名。SilverCity需要一个类似 *buffer* 的文件进行输出，这可以通过Python的 *StringIO<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=StringIO" title="create this page">?</a>* 模块来实现。下面是函数 *generate_html* 的代码：

::

 def generate_html(source_file, generator=None, source_file_name=None):
     """ From the source make a generator
     and then make the html """
  
     # SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> requires a file like object
     target_file = StringIO<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=StringIO" title="create this page">?</a>()
     generator = create_generator(source_file_name, generator)
     generator.generate_html(target_file, source_file)
  
     # return the html back
     return target_file.getvalue(), generator.name

You'll note that this calls the *create_generator* function you wrote earlier to figure out the correct generator for this language. That's all the code you need to able to generate the HTML for a file. I haven't gotten into any of the specifics of actually lexing through the source or producing the HTML; the SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> library does this all for you. To reiterate the earlier point, in this module you have no reference to Zope or Plone; this module is completely independent. The actual details of this module aren't necessary to know, as long as you understand you're importing a third-party library.

你可以看到这个函数调用了先前你写的 *create_generator* 函数来找出某种语言相对应的生成器。为一个文件生成HTML的所有代码就这么一些，这里没有牵涉到具体对源文件进行语法分析然后生成HTML的细节，这些具体工作都由SilverCity库完成了。这里再强调一下，这个模块现在完全没有引用Zope或Plone的任何部分，它是完全独立的。它的具体细节没有必要完全清楚，你只要知道你在导入一个第三方的软件库就可以了。

It's traditional in Python scripts to put in at least one piece of test code. You could write a complete unit test suite, but that's outside of the current topic. Instead, you'll add a little bit of code to test two things: that this works and the languages that are available, like so:

Python脚本中按照惯例通常至少会放上一段测试代码。你可以写一个完整的单元测试，但这不是我们目前的主题。在这里你只需一点代码测试两件事情：第一这个脚本能正常运行，第二，哪些语言可以支持：

::

 if __name__ == "__main__":
     import sys
     myself = sys.argv[0]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=0" title="create this page">?</a>
     file = open(myself, 'r').read()
     print generate_html(file, generator="python")
     print list_generators()

If you run this script, it'll open itself and feed that into the HTML syntax highlighter. A bunch of HTML will be spit out. You could just place this in the Zope-specific module you're about to write; however, having it all in a separate script makes it easy to test and alter later.

该脚本运行时会打开自己，把自身内容传给HTML语法强调器，输出一堆HTML代码。尽管你也可以把这些代码放在你下面要写的Zope相关模块中，但把它作为一个单独的模块能够简化测试及日后的修改。

Writing the Class(编写类)
.........................

A content type in Plone is just an object that has some particular attributes and some particular base classes. You don't even need to worry about reading and writing from the database--that's all handled by the *Persistencebase* classes. For the moment, create a module called *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* in the package.

Plone中的内容类型不过是一个由某些特别的属性及特殊基类的对象。你甚至不用去关心对数据库的读写，因为这些都由 *Persistencebase* 类进行处理。现在，在软件包中新建一个名为 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* 的模块。

First, import the *source.py* module you wrote a few moments ago. That's one simple line because the module is in the same package. The line to import the functions is as follows:

首先，导入刚才你写的 *source.py* 模块。由于这个模块在同一个软件包中，导入这些函数只需要一句语句就可以了:

::

 from source import generate_html, list_generators

Second, you'll need a *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* class that allows you to encapsulate the functionality you need. You need to worry about the following four attributes on this class:

第二步，你需要一个用来封装所需功能的 *PloneSiverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSiverCity" title="create this page">?</a>* 类。需要考虑该类的以下四个属性：

  - **id**: This stores the unique ID of this instance of the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* class.

  - **id**: 保存 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* 类的这个实例的唯一标识。

  - **_raw**: This stores the raw source code in the class.

  - **_raw**: 在类中保存原始代码

  - **_raw_as_html**: This stores the source code after it has been lexed into HTML.

  - **_raw_as_html**: 保存被转化成HTML后的源代码

  - **_raw_language**: This stores the language of this source code.

  - **_raw_langeuate**: 保存源代码的语言

For each of these attributes, you'll write an *accessor*, which is a function that returns the value of that attribute so that rather than calling the attribute, you call the accessor function. An example accessor function is *getLanguage*, which returns the value of the language. Writing an accessor is usually a good idea, especially because you'll apply security to these accessor methods later. In Zope, any method or attribute that begins within an underscore isn't available to Web-based methods such as page templates or Script (Python) objects. A good practice is to start all your attributes with an underscore and then put security on the accessing method.

你需要为每个属性编写一个 *存取器* (*accessor*)，当你需要得到属性值的时候，你可以调用存取器函数返回属性而不用直接调用属性。存取器函数的一个例子是 *getLanguage* 函数，它返回语言属性的值。通常编写存取器是一个好主意，特别是因为以后你可以对存取器进行安全设置。在Zope中，任何以下划线开头的方法或属性将不会被基于Web的方法(如页面模板或Python脚本)访问到。将所有属性以下划线开头命名然后在存取方法上设置安全控制是一个好方法。

Listing 12-1 shows the basic class. 清单12-1列出了基本的类。

Listing 12-1. The Basic Python Class 清单12-1. 基本的Python类

::

 class PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>:
     def __init__(self, id):
         self.id = id
         self._raw = ""
         self._raw_as_html = ""
         self._raw_language = None
  
     def getLanguage(self):
         """ Returns the language this code has been lexed with """
         return self._raw_language
  
     def getRawCode(self):
         """ Returns the raw code """
         return self._raw
  
     def getHTMLCode(self):
         """ Returns the html code """
         return self._raw_as_html
  
     def getLanguages(self):
         """ Returns the list of languages available """
         langs = []
         for name, description in list_generators():
             langs.append( {'name':lang, 'value':language} )
         langs.sort()
         return langs

You'll have to add one other method, which is an edit method that allows you to upload a file or a string. This one method will read the file and see if there's anything in the file; if there is, then it will be read and a filename determined. Then the code, language, and filename will be passed to the generate function. You'll store all this in the attributes mentioned earlier, as shown in Listing 12-2.

你还必须增加一个用于上传文件或字符串的编辑方法。该方法读取一个文件，判断是否文件有内容。如果有，它就读取该文件并确定文件名，然后将代码、语言和文件名传递给生成器函数。这些都保存在前面提到的属性当中，代码见清单12-2。

Listing 12-2. The Method for Handling Edits (清单12-2. 处理编辑的方法)

::

     def edit(self, language, raw_code, file=""):
         """ The edit function, that sets
         all our parameters, and turns the code
         into pretty HTML """
         filename = ""
         if file:
             file_code = file.read()
  
             # if there is a file and it's not blank...
             if file_code:
                 raw_code = file_code
                 if hasattr(file, "name"):
                     filename = file.name
                 else:
                     filename = file.filename
                 # set the language to None so set by SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>
                 language = None
  
         self._raw = raw_code
  
         # our function, generate_html does the hard work here
         html, language = generate_html(raw_code, language, filename)
         self._raw_as_html = html
         self._raw_language = language

**NOTE** Well-versed Python developers may raise an issue with using *file.name* and *file.filename*. Zope file objects have an attribute called *filename*, which represents the filename, while in Python the attribute is called *name*. This code will then work in straight Python or Zope.

** 注意 ** 熟悉Python的开发人员可能会提出有关使用 *file.name* 和 *file.filename* 的问题。Zope的文件对象以属性 *filename* 来代表文件名，而在Python中这个属性叫 *name* 。以上的代码保证在纯粹的Python及Zope中都能正确运行。

So now you have a Python class that encapsulates the object. At this point, you should be able to run this from the Python prompt quite easily and test that it does what you want. For example:

这样你现在有了一个封装了对象的Python类。此时，你应该能很方便地从Python命令行运行并测试这个类。例如：

::

 $ python
 Python 2.3.2 (#1, Oct  6 2003, 10:07:16)
 [GCC 3.2.2 20030222 (Red Hat Linux 3.2.2-5)]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=GCC%203.2.2%2020030222%20%28Red%20Hat%20Linux%203.2.2-5%29" title="create this page">?</a> on linux2
 Type "help", "copyright", "credits" or "license" for more information.
 >>> from PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>
 >>> p = PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>("test.py")
 >>> p.edit("python", "print 'hello world'")
 >>> p.getRawCode()
 "print 'hello world'"
 >>> p.getHTMLCode()
 '<span class="p_word">print</span>
 <span class="p_default">nbsp;</span>
 <span class="p_character">\'hellonbsp;world\'</span>'
 >>> p.getLanguage()
 'python'

Turning the Package into a Product(将软件包改造成Plone产品)
...........................................................

Now you have a simple package, but this isn't yet a Plone product. You have to initialize it with Plone. This means adding extra information to the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* module. Specifically, you need to add a factory function. Using a factory is a well-known pattern in object-oriented design, and it defines how an object will be created. So, to the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* module, add the following constructor to the module:

现在你有了一个简单的软件包，但它还不是Plone的产品。你必须在Plone中将它初始化。为此需要给 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* 模块增加一些附加信息。具体来说，需要增加一个工厂函数。工厂函数在面向对象的设计中是一种常用的模式，用来定义如何创建一个对象。在 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* 模块中，我们添加以下的构造函数：

::

 def addPloneSilverCity(self, id, REQUEST=None):
     """ This is our factory function and creates
     an empty PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> object """
     obj = PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>(id)
     self._setObject(id, obj)

The *addPloneSilverCity* function isn't part of the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* class. As a constructor for the class, it's placed in the module outside the class. This function is the first Plone-specific function. Three parameters are passed to the method: the *self* object, the ID string for the object, and *REQUEST*. The *self* object is actually the *context* you've seen before, just by a different name. Since the objects will always be created inside folder, *self* will refer to the folder in which this object will be created. This function creates an instance of *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* called *obj* and passes it to the *_setObject* method of the folder. The *_setObject* method is particular to Zope; it instantiates the object in the database and registers the object in the containing folder.

*addPloneSilverCity* 函数不是 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* 类的一部分。作为该类的构造函数，它被放在模块中类的外面。这个函数是第一个针对Plone的函数，它接受三个参数: *self* 对象，对象的ID字符串以及 *REQUEST* 。 *self* 对象事实上就是以前见到的 *context* ，只不过换了个名字而已。由于对象永远是在目录中创建的， *self* 将会指向在其中创建该对象的那个目录。该函数创建 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>* 的一个实例 *obj* ,然后把它传递给目录的 *_setObject* 方法。 *_setObject* 方法是Zope特有的，它数据库中实例化对象然后在父目录中注册该对象。

Next, add the factory type information covered in Chapter 11 (this is your first chance to create it yourself). The factory type information contains all the information about the content type in a dictionary; this information is loaded into *portal_types* when the product is installed into your Plone instance. This information will mirror what you saw in earlier, where you altered factory type information through the Web.

接下来我们添加第11章中阐述的工厂类型信息(这可是你第一次有机会自己创建它)。工厂类型信息使用一个字典保存有关该内容类型的所有相关信息，这些信息在产品安装到Plone中时被加载到 *protal_types* 中。这些信息和前面我们通过Web修改工厂类型信息时看到的是一样的。

Before building the factory information, I usually create a configuration file that contains all the repeated variables for the product. This file is called *config.py*, and in there you put the names of the product, the name of its layer in the skins, and the name as it will appear to the user, like so:

在构建工厂信息之前，我通常会新建一个配置文件，保存该产品中所有会重复用到的变量。这个文件名为 *config.py* ，里面有产品的名称，它在皮肤中的层名以及用户看见的名称，例如：

::

 product_name = "PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>"
 plone_product_name = "Source Code"
 layer_name = "silvercity"
 layer_location = "PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/skins"

Then you can set up the factory type information and use these strings. For example, the ID will be *Source Code* since this is shown in Plone to the users. The actions section of the type information is a tuple of dictionaries of all the actions that can occur with this object. When this factory is loaded into Plone, the Actions tab inside the *portal_types* tool will be populated with this content. Each of those actions has a corresponding method, template, or script that will be called; most of these directly correspond to page templates, which I discuss later in this section.

接下来你可以设置工厂类型信息并使用这些字符串。例如，ID设为 *Source Code* 因为这是Plone显示给用户的名称。类型信息的动作部分是包含该对象所有可能发生的动作的字典的一个元组。当该工厂类型被加载入Plone时， *portal_types* 工具中的Action页的内容即由此而来。每个动作都对应一个可执行的方法、模板或脚本，多数情况下它们直接对应到页面模板上。这一点本节中稍后在讨论。

As you know by now, an action is something that users can do to an item in the Plone database. Thinking of this example application, users can do two obvious things to the source code. They can view it and see the nicely highlighted code, and they can edit the item and upload some source code. Actually, Plone requires that there's one action called *view* and one called *edit*, so these two fit nicely. You also want a third action--it's nice to be able to download the source in its original form. With languages such as Python where the formatting is key, this is really useful. This action points directly to *getRawCode*, which is the method for getting the raw code back again.

现在你知道了动作就是用户可以对Plone数据库中的一个对象进行的某个操作。在我们的例子里，用户非常明显地可以对源代码对象进行两个操作：他们可以查看被语法强调的源代码；可以编辑该对象并上传源代码。实际上，Plone要求必须有一个名为 *view* 的动作以及一个名为 *edit* 的动作，正好和用户的操作符合。你还会想要第三个动作：如果能以原始的形式下载源代码就好了。对于像Python这样格式至关重要的语言，这个要求是非常有用的。这个动作直接指向 *getRawCode* 这个用于取回原始代码的方法。

Each action has a permission associated, as shown in Listing 12-3 (I show exactly where that comes from later in this section).

每个动作都有对应的权限，如清单12-3所示(本节后面我会讲述它们是从哪里来的)。

Listing 12-3. The Factory Type Information and Actions (清单12-3. 工厂类型信息及动作)

::

 factory_type_information = {
      'id': plone_product_name,
      'meta_type': product_name,
      'description': ('Provides syntax highlighted HTML of source code.'),
      'product': product_name,
      'factory': 'addPloneSilverCity',
      'content_icon': 'silvercity.gif',
      'immediate_view': 'view',
      'actions': (
                  {'id': 'view',
                   'name': 'View',
                   'action': 'silvercity_view_form',
                   'permissions': (view_permission,)},
                  {'id': 'edit',
                   'name': 'Edit',
                   'action': 'silvercity_edit_form',
                   'permissions': (edit_permission,)},
                  {'id': 'source',
                   'name': 'Source',
                   'action': 'getRawCode',
                   'permissions': (view_permission,)},
                  ),
      }

**NOTE** At this point, the product can't be imported from the Python prompt because the code is incomplete.

**注意** 现在该产品还不能从Python命令行中导入，因为代码还不完整。

Setting Up Permissions(设置权限)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

A fundamental concept when dealing with Web sites is that everything and everybody is untrusted. Before any property is accessed or any method is called, you must first check if the party wanting to perform an action is allowed to do so. In most systems, three permissions exist: the permission to add an item, the permission to delete an item, and the permission to edit an item. One other permission applies to Plone: the right to view an item through the Web (or other protocol). The containing folder handles deleting, which is a permission handed out in Plone to the containing folder. If you can delete anything in the folder, you can then also delete the content type you're adding here.

禺网站打交道时的一个基本观念是所有人、所有东西都是不可信的。在任何属性被访问或任何方法被调用之前，你必须首先核实希望执行这个动作的一方被允许这么做。大多数系统中有三种权限：添加项目的权限、删除项目的权限以及编辑项目的权限。Plone有另外一种权限：通过Web(或其他协议)查看项目的权限。删除是由包含项目的文件夹负责处理的，Plone把删除的权限给予包含项目的文件夹。只要你能在目录中删除随便哪样东西，你也就可以删除我们正在编写的这种内容类型。

This leaves you with three permissions to worry about. It's normal to use the ones that come with the CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a> package: *Add portal content*, *Modify portal content*, and *View*. Returning to the config file, you can add the permissions you need, like so:

这样你需要考虑三种权限。通常使用CMFCore包内含的三种权限:*Add portal content(添加内容)*, *Modify portal content(修改内容)* 以及  *View(查看)* 。回到配置文件，你可以像下面一样添加所需要的权限：

::

 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a> import CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>
  
 add_permission = CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>.AddPortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=AddPortalContent" title="create this page">?</a>
 edit_permission = CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>.ModifyPortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ModifyPortalContent" title="create this page">?</a>
 view_permission = CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>.View

This means the *add_permission* variable references the permission imported from CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>. There's nothing magical about the permissions -- each permission is just a string. Using the built-in permission is convenient and understandable for your users. Plone is already configured to allow the right person to add content using the *Add portal content* permission. Further, the default workflow is defined to use and alter these permissions. These permissions were the ones you added to the factory type information.

这里由变量 *add_permission* 引用从CMFCorePermissions中导入的权限。权限其实并没有什么神秘的 -- 一种权限不过是一个字符串而已。使用系统内置的权限不光方便，对用户来说也好理解。Plone已经配置成允许合适的人使用 *Add portal content*  权限增添内容。此外，默认的工作流也使用并修改这些内置权限。在工厂类型信息中你添加的也正是这些权限。

If you wanted to make your own permission, you could do so quite easily. Suppose you wanted the Add鈥?permission to be Add Source Code and have its own permission. Then you'd change the file to read as follows:

如果你希望使用自己的权限，这也非常简单。假定你想使用Add Souce Code权限来进行添加，可以这样修改代码：

::

 add_permission = "Add Source Code"

After importing the product, you'd have a new permission in the Security tab matching that Add Source Code permission. Why would you want to do this? Well, using a permission that everyone else uses is convenient. However, it may be that you want more granularity or different security. For this reason, you can just create your own security settings.

产品导入后，在"安全"页上你可以看到与Add Source Code相匹配的一个新的权限。这样做有什么好处呢？使用所有人都在用的权限尽管非常方便，但也许你需要更细的权限控制粒度或需要不同的安全设置。出于这个原因，你可以创建自己的安全设置。

Completing the Initialization(完成初始化)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Now you need to set up the initialization of the product. You do this in the *__init__.py* module so that when Zope reads this file at startup, it'll complete the initialization of the product, as shown in Listing 12-4.

现在你需要初始化我们的产品。初始化代码放在 *__init__.py* 模块中，这样在Zope启动时会读取该文件完成产品的初始化。代码如清单12-4所示：

Listing 12-4. The *__init__.py* Module (清单12-4 *__init__.py* 模块)

::

 import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>
  
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a> import utils
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.DirectoryView<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DirectoryView" title="create this page">?</a> import registerDirectory
  
 from config import product_name, add_permission
  
 contentConstructors = (PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.addPloneSilverCity,)
 contentClasses = (PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>,)
 contentFTI = (PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.factory_type_information,)
  
 registerDirectory('skins', globals())
  
 def initialize(context):
     product = utils.ContentInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ContentInit" title="create this page">?</a>(product_name,
         content_types = contentClasses,
         permission = add_permission,
         extra_constructors = contentConstructors,
         fti = contentFTI)
     product.initialize(context)

What's happening in this code? Well, actually not that much -- it's just a little verbose. First, you make references to the classes and constructors that are going to be used in *contentClasses* and *contentConstructors*. These map to the factory function for creating the objects and the actual class. These are then passed into the *ContentInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ContentInit" title="create this page">?</a>* function, inside *initialize*, which is a special function that's called during the product initialization. *ContentInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ContentInit" title="create this page">?</a>* does all the work to set up the product within Plone. The parameters to this function are as follows:

这段代码做了些什么呢？其实没有多少东西，只是看起来比较复杂。首先，它用变量 *contentClasses* 及 *contentConstructors* 引用要用到的类及其构造函数，它们对应到实际的类对象以及用于生成该类实例的工厂函数。产品初始化过程中，系统自动调用特殊函数 *initialize* ，该 函数再将这两个变量传递给 *ContentInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ContentInit" title="create this page">?</a>* 函数。在Plone中设置产品的所有实际工作由 *ContentInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ContentInit" title="create this page">?</a>* 函数完成。该函数的参数如下：

  - **product_name**: This is the name of the product, as defined in the config file (in this case, *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>*).

  - **product_name**: config文件中定义的产品名称(本例中为 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>*).

  - **content_types**: This is the tuple of classes that this product defines; usually this is just one class, but it may be more.

  - **content_types**: 本产品中所定义的类的元组，通常只有一个类，但也可以是多个。

  - **permission**: This is the permission that's needed to create an instance of this object; in this case, it's the *add_permission* variable I've defined in *config.py**.*

  - **permission**: 创建该对象的一个实例所需要的权限；本例中为我们在 *config.py**.* 中定义的 *add_permission* 变量。

  - **fti**: This stands for factory type information and is the dictionary of factory type information you defined in the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* module for the content.

  - **fti**: 这是工厂类型信息(factory type information)的缩写，其内容为你在 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* 模块中定义的工厂类型信息字典。

Altering the Product Modules(修改产品模块)
..........................................

Now you can return to the *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* module and complete the task of turning this into a Plone product. At the start of the module, you'll create the *import* statements. These *import* statements pull various Plone initialization requirements from various locations, as follows:

现在我们回过头来修改 *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py* 模块完成将它变成Plone产品的任务。在模块的开头需要增加 *import* 语句，从不同的地方汇集Plone初始化所需的部件：

::

 from Globals import InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>
 from AccessControl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=AccessControl" title="create this page">?</a> import ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>
 from Products.CMFDefault<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFDefault" title="create this page">?</a>.DublinCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DublinCore" title="create this page">?</a> import DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a> import PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>

These imports provide the base functionality for the product and are common across most content types. The definitions of imports are as follows:

这些导入语句提供了一个产品所需的基本功能，适用于大多数的内容类型。导入的具体内容如下：

 **InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>**: This function initializes the class and applies all the security declarations that it'll have. You specify those security declarations by using the *ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* class.

 **InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>**: 该函数初始化类并应用该类的所有安全声明。安全声明使用 *ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* 类指定。

 **ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>**: This class provides a series of security methods that will allow you to restrict access to methods of the content type.

 **ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>**: 该类提供一系列有关安全的方法，使你能够限制对内容类型的访问。

 **DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>**: This class provides an implementation of Dublin Core metadata. Chapter 11 covered Dublin Core; this gives an object all the Dublin Core attributes and methods to access them such as Title, Description, Creator, and so on.

 **DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>**: 该类提供了都柏林核心元数据(Dublic Core metadata)的一个实现。第11章中叙述了都柏林核心，它提供了一个对象全部的都柏林核心属性以及访问这些属性的方法，如标题、描述、创建者等等。

 **PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>**: This provides the base class for all content in a Plone site and some of the key attributes it needs. Using this base class gives the object a whole host of functionality such as making the object persist inside the database, cataloging the object for searching inside the *portal_catalog* object, and making it registerable with the *portal_types* tool.

 **PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>**: 提供了Plone中所有内容的基类以及其所需的部分关键属性。该基类替对象实现了许多Plone的功能，如对象的数据库持久化、在 *portal_catalog* 对象中维护对象的索引以便搜索、使对象能够在 *portal_types* 工具中得到注册等等。

You'll also need to import the configuration variables and permissions as well. So that takes the following two lines:

你还需要导入配置文件和权限，为此添加一下两行：

::

 from config import plone_product_name, product_name
 from config import add_permission, edit_permission, view_permission

Returning to the class, you have to add two base classes to make it fully Plone compatible: *PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>* and *DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>*. You also need to give the class a *meta_type*. Each product in Zope has a unique *meta_type*:

对于PloneSilverCity类需要添加 *PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>* 以及 *DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>* 两个基类使其完全兼容Plone。还要给类添加一个 *meta_type* 。Zope中的每个产品都需要有唯一的 *meta_type* ：

::

 class PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>(PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>, DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>):
     meta_type = product_name

One requirement of Plone is that it knows what base classes the content type implements. Other parts of the application will need to know what classes are implemented. So, explicitly state what classes the content type implements, like so:

Plone要求知道一个内容类型到底实现了哪些基类，因为系统的其他部分需要知道实现了哪些类。因此代码中需要显示地指出该内容类型实现的类：

::

     __implements__ = (
         PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>.__implements__,
         DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>.__implements__
         )

Adding Security to the Class (为类增加安全设置)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

If you've already decided to give the actions security, you also need to apply this security to the class. In an object-publishing environment such as Plone, anyone can call any method of the class through the Web, unless it begins with an underscore. This is obviously bad, and you need to protect all your methods.

如果你已经决定为动作增加安全设置，则也需要对类进行相同的安全设置。在Plone这样的对象发布环境中，任何人都可以通过Web调用类的任何一个方法，除非该方法的名称以下划线开头。显然这非常不好，所以你需要保护所有的方法。

To do this inside the class, make an instance of the *ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* class. You do this with the following line:

为了实现保护，需要在类中如下建立 *ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* 类的一个实例：

::

     security = ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>()

This security object provides an interface into Zope security machinery. You can then apply methods to the object. My favorite method for doing this is to add a line applying the security directly above the method. This way it's easy to remember where the security is applied, and you won't forget to update it later, if you need to do so. The *declareProtected* method takes the permission and the method name to protect the edit method. So that only people who actually have the edit permission can call it, you do the following:

security安全对象提供了访问Zope安全机制的接口，通过该接口可以对你的对象应用安全方法。我比较偏爱的做法是将应用安全设置的代码行紧靠在方法的前面。这样可以很方便地记住安全是在何处定义的，以后需要修改时就不会有所遗漏。下面的 *declareProtected* 方法接受权限和方法名为参数，保护edit方法，保证只有拥有编辑权限的人才能够调用该方法：

::

     security.declareProtected(edit_permission, "edit")

Repeat this for each method, giving the appropriate permission and method name. The only one that needs to be protected is *__init__* because this begins with an underscore. To apply all this security, you must initialize the class. Without doing this one step, all the security further declared *won't* be applied, and your object will be public.

对于每个方法重复该步骤，给出恰当的权限以及方法名。唯一不需要特别保护的方法是 *__init__* 因为它以下划线打头。注意必须初始化类才能使这些安全设置生效。如果不进行类的初始化，所定义的全部安全设置并不会被应用，你的对象将会是公有的。

In other words, don't forget this line:

换句话说，不要忘了这行代码：

::

 InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>(PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>)

The API for *ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* provides the following methods for the class:

*ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* 类提供了一下的API：

  - **declarePublic**: This takes a list of names. All the names are declared publicly accessible for all users through restricted code and through the Web.

  - **declarePublic**: 参数为名称的列表。所有的名称被定义为可被所有用户通过限制性代码以及Web进行公有访问。

  - **declarePrivate**: This takes a list of names. All the names are private and can't be accessed through restricted code.

  - **declarePrivate**: 参数为名称的列表。所有的名称为私有名称，不能通过限制性代码访问。

  - **declareProtected**: This takes a permission and any number of names. All the names can be accessed only with the permission given.

  - **declareProtected**: 参数为权限以及任意数量的名称。所有的名称只能在拥有指定权限时才能被访问。

  - **declareObjectPublic**: This sets the entire object as publicly accessible.

  - **declareObjectPublic**: 将整个对象设置为可公有访问。

  - **declareObjectPrivate**: This sets the entire object to private and inaccessible to restricted code.

  - **declareObjectPublic**: 将整个对象设置为私有，不能被限制性代码访问。

With these methods it's possible to set almost any security you'd like. However, I've almost always found that explicitly setting the protection of each method with a permission has been sufficient.

使用上述这些方法可以设置你需要的任何权限。通常情况下，我发现对每个方法显示地定义一个权限进行保护就足够了。

Integrating with Search(整合搜索功能)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

In the previous chapter I showed you how the search works and the indexes that exist. Since the indexes work against Dublin Core objects and you've used Dublin Core as a base class, your object's title, description, creator, modification date, and so on, will all be indexed for you -- no extra work is needed. Further, by inheriting from the *PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>* class every time the object is altered, the catalog will be updated for you; again, you don't need to worry about anything.

前面一章中我描述了搜索功能是如何实现的以及存在哪些索引。由于索引是基于都柏林核心对象工作的，而我们已经使用了都柏林核心作为基类之一，所以我们的对象的标题、描述、创建者、修改日期等属性均已被索引，不需要我们做任何额外的工作。此外，通过对 *PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>* 类的继承，每次对象被更新时目录也会自动更新；同样，我们不需要做任何事情。

However, one index does need a little help, and that's *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>*. As I demonstrated previously, the *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>* index provides the full-text index that Plone uses when a search is run. It'd be nice if the search would also index the source code, so if somebody uploaded a piece of code with *import* in it, the search would pick it up. Because the catalog looks at the object and tries to find an attribute or method matching the index name, all you need to do is provide a method with that name that returns the value you want.

不过，有一个索引需要我们一些小小的帮助，它就是 *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>* 。前面说过， *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>* 索引提供Plone搜索时使用的全文索引。我们希望检索时也可以索引源代码，这样当有人上传一段包含 *import* 语句的代码时，可以通过检索将它找到。由于目录服务在查看一个对象时试图通过名称匹配来找到一个属性和方法，你只需要提供一个与索引同名的方法返回你希望的值就可以了。

The easiest way to do this is to make a string out of the fields you want -- for example, the title, the description, and the raw code. This can be protected by the *View* permission, since anyone viewing the object can happily see the contents anyway. The following is a *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>* method that performs this task:

完成这个工作的最简单的方法就是返回一个包含所需全部字段的字符串 -- 如标题、描述以及源代码。这个方法可以用 *View* 权限进行保护，因为任何能查看对象的人都能够看到这些内容。下面是这样设计的 *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>* 方法：

::

     security.declareProtected(view_permission, "SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>")
     def SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>(self):
         """ Used by the catalog for basic full text indexing """
         return "%s %s %s" % ( self.Title()
                             , self.Description()
                             , self._raw
                             )

The Difference Between a Python Class and a Plone Class(Python类和Plone类的差别)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

As you can see, there's quite a difference between a normal Python product and one registered in Plone. However, most of those differences are about registering the product and asserting the security. The actual class remains similar. Listing 12-5 highlights all the differences between the pure Python implementation and the Plone implementation.

正如你看到的，普通的Python产品和一个在Plone中注册的产品之间有着不少的差别。尽管如此，大部分差异是用来注册产品以及声明安全的，实际的类仍旧非常类似。清单12-5显示了纯Python的实现以及Plone实现之间的所有差别。

Listing 12-5. The Plone Version of the Class (清单12-5 类的Plone版本)

::

 from Globals import InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>**
 from AccessControl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=AccessControl" title="create this page">?</a> import ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>
 from Products.CMFDefault<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFDefault" title="create this page">?</a>.DublinCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DublinCore" title="create this page">?</a> import DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a> import PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>

 from config import meta_type, product_name
 from config import add_permission, edit_permission, view_permission
 from source import generate_html, list_generators

 factory_type_information = {
      'id': plone_product_name,
      'meta_type': product_name,
      'description': ('Provides syntax highlighted HTML of source code.'),
      'product': product_name,
      'factory': 'addPloneSilverCity',
      'content_icon': 'silvercity.gif',
      'immediate_view': 'view',
      'actions': (
                  {'id': 'view',
                   'name': 'View',
                   'action': 'silvercity_view_form',
                   'permissions': (view_permission,)},
                  {'id': 'source',
                   'name': 'View source',
                   'action': 'getRawCode',
                   'permissions': (view_permission,)},
                  {'id': 'edit',
                   'name': 'Edit',
                   'action': 'silvercity_edit_form',
                   'permissions': (edit_permission,)},
                  ),

      }


 def addPloneSilverCity(self, id, REQUEST=None):
     """ This is our factory function and creates
     an empty PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> object inside our Plone
     site """
     obj = PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>(id)
     self._setObject(id, obj)
 

 class PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>(PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>, DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>):

     meta_type = product_name
 

     __implements__ = (
         PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PortalContent" title="create this page">?</a>.__implements__,
         DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>.__implements__
         )

         
     security = ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>()
  
     def __init__(self, id):
         DefaultDublinCoreImpl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DefaultDublinCoreImpl" title="create this page">?</a>.__init__(self)
         self.id = id
         self._raw = ""
         self._raw_as_html = ""
         self._raw_language = None
  

     security.declareProtected(edit_permission, "edit")
     def edit(self, language, raw_code, file=""):
         """ The edit function, that sets
         all our parameters, and turns the code
         into pretty HTML """
         filename = ""
         if file:
             file_code = file.read()
  
             # if there is a file and its not blank...
             if file_code:
                 raw_code = file_code
                 if hasattr(file, "name"):
                     filename = file.name
                 else:
                     filename = file.filename
                 # set the language to None so set by SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>
                 language = None
  
         self._raw = raw_code
  
         # our function, generate_html does the hard work here
         html, language = generate_html(raw_code, language, filename)
         self._raw_as_html = html
         self._raw_language = language
  

     security.declareProtected(view_permission, "getLanguage")
     def getLanguage(self):
         """ Returns the language that code has been lexed with """
         return self._raw_language
  

     security.declareProtected(view_permission, "getLanguages")
     def getLanguages(self):
         """ Returns the list of languages available """
         langs = []
  
         for name, description in list_generators():
             # these names are normally in uppercase
             langs.append( {'name':lang, 'value':language } )
  
         langs.sort()
         return langs
  

     security.declareProtected(view_permission, "getRawCode")
     def getRawCode(self):
         """ Returns the raw code """
         return self._raw
  

     security.declareProtected(view_permission, "getHTMLCode")
     def getHTMLCode(self):
         """ Returns the html code """
         return self._raw_as_html
  

     security.declareProtected(view_permission, "SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>")
     def SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SearchableText" title="create this page">?</a>(self):

         """ Used by the catalog for basic full text indexing """

         return "%s %s %s" % ( self.Title()

                             , self.Description()

                             , self._raw

                             )
  

 InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>(PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>)
 
Adding Skins(增加皮肤)
......................

So now that you've got the main code, you have two things left to do: build the skins and create an installation method. The skins are actually one of the easier parts because so much of the work has been done already in the Plone framework. I covered skins in detail in earlier chapters, where I discussed how to make a skin for the Plone site on the file system. Each product that needs to provide custom User Interface (UI) does so by making its own File System Directory View (FSDV), so you'll do the same again here.

在完成了主题代码之后还有两件事剩下要做：制作皮肤及写一个安装方法。皮肤其实比较简单，因为许多的工作都由Plone框架完成了。在前面描述如何在文件系统上创建Plone站点皮肤的章节中我已详细地叙述了皮肤。一个产品通过建立它自己的文件系统目录试图(FSDV)来提供定制的用户界面(UI)，现在我们也如法炮制。

The skins are placed in the *skins* directory of the product. This directory name is defined in the *__init__.py* file where you register the directory using the *registerDirectory* function. If you wanted to change the name, make sure to register it -- you can register as many directories as you like, but it's recursive and will register everything in and below that registered directory.

我们把皮肤的代码放在产品的 *skins* 目录下。在 *__init__.py* 文件中我们使用 *registerDirectory* 函数注册该目录的名称。如果你想换一个目录名，一定记住要注册它。你可以注册任意数量的目录，注意注册是递归的，也就是说被注册目录下面的所有子目录都会被注册。

The easiest of all your jobs for this product is to add an icon for the object that will appear in Plone. The name of this icon is already defined in the factory type information with the line *'content_icon': 'silvercity.gif'*, so all you have to do is add an icon to the *skins* directory called *silvercity.gif*. This icon will display whenever you see the object in the Plone user interface. When SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> lexes a file, it outputs HTML using CSS tags, so you have ensure that the particular CSS file is available. For this product you simply copy the CSS out of the SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> product and place it in the *skins* directory with the name *silvercity.css*.

最简单的任务是为该产品增加一个在Plone中代表该对象类型的图标。图标的名称在工厂类型信息中已经定义过了: *'content_icon': 'silvercity.gif'* ，我们需要做的只是在 *skin* 目录中增加一个名为 *silversity.gif*  的图标文件。该图标将会在Plone用户界面中出现我们的对象的地方出现。此外SilverCity分析文件语法时使用CSS标记生成HTML代码，所以你应该保证这个CSS文件能被访问。这里只要简单的把CSS文件从SilverCity产品中拷贝出来放在 *skins* 目录中并命名为 *silvercity.css* 。

These two items are now done. Next, you actually have to write the view and edit pages. Previously I discussed how this is similar to a document, so when you're looking for view and edit pages, the best place to look is the pages for a document. Those pages are *document_view.pt* and *document_edit_form.cpt* and are located in the *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFPlone" title="create this page">?</a>/skins/plone_content* directory.

这两件事完成后下面就要着手写对象的查看(View)和编辑(Edit)页面了。前面我们讨论过这两个页面类似类似于文档对象的相应页面，因此我们可以寻找文档对象的查看和编辑页面入手。这两个页面分别是 *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFPlone" title="create this page">?</a>/skins/plone_content* 目录下的 *document_view.pt* 和 *document_edit_form.cpt*  文件。

Making the View Page (编写查看页面)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

To alter the view page, you take the view page for a document, copy it into your product's *skins* directory, and rename it to *silvercity_view.pt*. There's no point in re-creating the entire page when the view page is so similar; all you need to do is to make two minor changes.

我们首先把文档对象的查看页面拷贝到我们产品的 *skins* 目录中，重命名为 *silvercity_view.pt* 。由于查看页面极为相似，没有必要去重写整个页面，只需要做两处小小的改动就可以了。

As mentioned, SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> spits out HTML where all the code has been highlighted using CSS and you have a custom style sheet. You need to make sure that the view page inserts that CSS, and the main template has a slot for CSS called *css_slot*. To put the custom CSS file into that slot, you just have to provide a value for it. For example:

如前所述，SilverCity生成的HTML代码使用CSS来突出显示代码，所以你需要查看页面能够插入该CSS文件。主模板中有一个专门用于插入定制CSS的槽位 *css_slot* ，我们只要正确提供参数就可以了：

::

 <metal:cssslot fill-slot="css_slot">
  
 <link
    rel="stylesheet"
    href=""
    tal:attributes="href string:$portal_url/silvercity.css" />
 </metal:cssslot>

Here you're referencing a CSS file called *silvercity.css*. That file is located in the *skins* directory, and you'll be accessing it from the skin when it's rendered. The original document shows a property called *cookedBody*, which is an attribute of a document. I removed that part of the code and instead inserted the code. As you've seen by now, the function *getHTMLCode* returns the HTML, so all you have to do is the following:

这里我们引用了CSS文件 *silvercity.css* ，该文件位于 *skins* 目录下。原始的文档对象查看代码中用到了一个名为 *cookedBody* 的属性，这是一个文档属性。我们把它去掉代之以代码对象。你已经知道函数 *getHTMLCode*  用于返回代码的HTML格式，所以我们只需要像下面这样做就可以了：

::

 <div id="bodyContent">
     <div tal:replace="structure here/getHTMLCode" />
 </div>

If you want to change anything else specific in this page template, now is your opportunity. It could be nice to show the language that it was written in, to show an icon, or to change history, for example.

如果你需要更改模板中的其他部分，现在正是时候。例如可以显示源代码的语言，一个图标或者更改历史。

Making the Edit Page(编写编辑页面)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Like the view page, you can take the edit page, copy it into the skin, and rename it to *silvercity_edit_form.cpt*. The biggest problem is that the edit form is designed to be used with a What You See Is What You Get (WYSIWYG) editor such as Epoz. Until a good WYSIWYG editor for source code is available for Web browsers, you'll have to turn this off because you can't write SQL in an HTML editor.

和查看页面一样，我们也可以把文档对象的编辑页面拷贝到皮肤目录中改名为 *silvercity_edit_form.cpt* 。但这样做碰到的最大问题是原始的编辑页面设计是配合Epoz等所见及所得(WYSIWYG)编辑器使用的。在一个适用于浏览器的所见及所得式源代码编辑器诞生之前，我们必须关闭此功能因为我们不能在HTML编辑器中编写SQL代码。

This is quite a lengthy change of the page template -- remember, you can get this off the Web site. In this template, remove all mentions of the editors and replace them with a simple text area. Keep the name of the HTML field the same because there's no real need to change it. Also, leaving it the same means it plays nicely with the script for handling the form later. A document has at the bottom a series of selections for the format, which are normally items such as Plain Text, HTML, and so on. You'll replace this with a drop-down box for all the languages that the main SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> library has available. The *getLanguages* method written earlier returns a list of all the languages. Each item is a dictionary that contains the value (for example, CPP) and a nice name (for example, C or C++).

这需要对页面模板进行较大的改动，但记住你可以从本书网站上下载代码。在该页面模板中，我们去除所有的编辑器的方法，代之以一个简单的文本区域。HTML字段的名称保持不变，因为没有什么特别的理由去修改它们，保持原状可以使后面的表单处理代码更好地处理它。文档编辑时底部有一个格式选择框，用于选择标准文本、HTML等格式。我们把它替换成一个选择SilverCity库函数能处理的语言的下拉选择框。函数 *getLanguages* 返回所有语言的列表，每个元素是一个包含语言值(如'CPP')及语言名称(如'C或C++')的字典。

Listing 12-6 loops through the *getLanguages* method written earlier. You can also define a variable for the current language so that as it loops through the languages, you can highlight the current language.

清单12-6中的代码遍历 *getLanguages* 方法返回的结果。你也可以定义一个当前语言的变量，在遍历语言时用来突出显示当前的语言。

Listing 12-6. Adding a Drop-Down List for Selecting the Language (清单12-6 增加语言选择框)

::

 <div class="field">
   <label
    for="language"
    i18n:translate="label_silvercity_language">
 Language</label>
  
     <div class="formHelp" i18n:translate="help_silvercity_language">
         Select the name of the language that you are adding
     </div>
     <select name="text_format"
             tal:define="l here/getLanguage">
         <option tal:repeat="item here/getLanguages"
             tal:content="item/name"
             tal:attributes="value item/value;
                             selected python:test(item['value'] == l, 1, 0)" />
     </select>
 </div>

When the edit page gets submitted, you need to set up the validators and actions to do something with the form. The validation should check that a valid title and a valid ID have been given. To the *silvercity_edit.cpt.metadata* file, add the following:

该编辑页面被提交时，你需要设置用于处理表单的验证方法及动作。验证方法应该确保用户输入了合法的标题和ID。在 *silvercity_edit.cpt.metadata*  文件中增加以下内容：

::

 [validators]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=validators" title="create this page">?</a>
 validators..Save = validate_id,validate_title
 validators..Cancel =

Where did those validations come from? Well, I was cheeky and again looked at the validations for a document. That calls three validations, but you need only two of them. By checking what that validation evaluated to, you can see which ones are needed and which ones aren't. You'll find all the validations in *plone_skins/plone_form_scripts*, and the object name starts with *validation*.

这些验证方法是从哪里来的呢？这里我又偷了下懒，借用了文档对象的验证方法。文档的验证调用了三个验证方法，而我们只需要其中的两个。检查一下这些验证方法的结果，我们就可以看出哪些是我们需要，哪些不需要。所有的验证方法代码在目录 *plone_skins/plone_form_scripts* 目录下，代码对象名都以 *validate* 打头。

So now you need the action, so take the edit script for a document (*document_edit.cpy*) and copy it into SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>. Mostly the script is just fine, so you can keep it with one modification. Change the messages to *Source code* instead of *Document*. Listing 12-7 shows the edit script.

现在我们还需要动作。同样我们把文档对象的编辑脚本(*document_edit.cpy*)拷贝到SilverCity中。该脚本的大部分都可以使用，只需要做一处修改：将消息文本中的 *Document* 更改成 *Source Code* 。

Listing 12-7. The Edit Script (清单12-7 编辑脚本)

::

 ##parameters=text_format, text, file='', SafteyBelt<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SafteyBelt" title="create this page">?</a>='', \
 title='', description='', id=''
 ##title=Edit a document
  
 filename=getattr(file,'filename', '')
 if file and filename:
     # if there is no id, use the filename as the id
     if not id:
         id = filename[max( filename.rfind('/')
                        , filename.rfind('\\')
                        , filename.rfind(':') )+1:]
     file.seek(0)
  
 # if there is no id specified, keep the current one
 if not id:
     id = context.getId()
  
 new_context = context.portal_factory.doCreate(context, id)
 new_context.edit( text_format
                 , text
                 , file
                 , safety_belt=SafetyBelt<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SafetyBelt" title="create this page">?</a> )
  
 from Products.CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFPlone" title="create this page">?</a> import transaction_note
 transaction_note('Edited source code %s at %s' % \
   (new_context.title_or_id(), new_context.absolute_url()) \
   )
  
 new_context.plone_utils.contentEdit( new_context
                                    , id=id
                                    , title=title
                                    , description=description )
  
 return state.set(context=new_context, \
  portal_status_message='Source code changes saved.')

The script does a few things. First, it gets the filename if one exists; if no ID is given, then the ID is set to that filename. This means if a user uploads *library.c*, the ID for that object will be *library.c*. Second, it tells *portal_factory* to create an object (see the 'Portal Factory' sidebar for more information on what that means). Then it calls the *edit* method on the object (something you wrote earlier), and it calls *contentEdit* on the *plone_utils* tool. Without looking into the depths of the *plone_utils* tool, *contentEdit* takes the keywords given, and if the class implements Dublin Core, then it will change those attributes. Since you set up the *__implements__* attribute earlier, the edit method in Listing 12-7 will do the work for you. Any changes to title, ID, or description will be changed in the object.

这个脚本代码做了以下一些事情。首先如果有文件名就取得文件名；如果没有指定ID，则将ID设为文件名。这也就是说如果用户上传了 *library.c* ，该对象的ID就是 *library* 。然后代码要求 *portal_factory* 创建一个对象(关于门户工厂见下)。之后它调用该对象的 *edit*  方法(这个方法我们之前编写过)并调用工具 *plone_utils* 的 *contentEdit* 方法。这里不深入讨论 *plone_utils* 工具，只要知道 *contentEdit*  方法对实现了都柏林核心(Dublin Core)的类根据传入的参数修改对象的属性。因为我们的类已经设置了 *__implements__*  属性，清单12-7中的编辑方法就可以完成这些工作。所以标题、ID及描述的修改都会改变对象。

Portal Factory(门户工厂)
.................................

One problem exists with the way objects are created. Before you can even get to the edit form, you have to create an object. Then the edit form for that object will display. In practice, people accidentally create objects, get to the edit form, and then realize it was the wrong type. This is annoying and leaves spare objects lying around in your database. It's like creating a file on the file system, realizing it's wrong, and then leaving it there.

对象创建时有一个问题：在你能够使用编辑表单之前，对象必须已经被创建，之后该对象的编辑表单才能显示。实际使用当中，经常会有人意外地创建了对象，到了编辑表单才发现选择了对象类型。恼人的结果是你的数据库中因此产生一堆空白的对象。这就像在文件系统上生成一个文件，然后发现错了，但把文件留在了那里。

To solve this, the *portal_factory* tool allows you to temporarily create objects. It'll create a temporary object and then let you edit it. Only once you've clicked the edit button will your object be created. To assign an object to *portal_factory*, go to the *portal_factory* tool, and in the form select all the content types for which you'd like to use this tool. The only catch is that you must ensure your edit scripts correctly integrate with the tool, as shown in this example.

为了解决这个问题， *portal_factory* 工具允许你临时创建对象。它会创建一个临时对象让你编辑，只有在你按下了编辑按钮后对象才会正式创建。需要 *portal_factory*  工具创建对象的话，进入 *portal_factory*  工具，在表单中选择所有你希望使用该工具的内容类型。唯一需要注意的是你必须保证你的编辑代码和该工具正确地整合，就像我们在例子中展示的一样。

Installing the Product into Plone(在Plone中安装产品)
....................................................

You have a standard way for installing a product into Plone you go to the Plone control panel and click the product to install it. That script uses the *portal_quickinstaller* tool to do the installation. For this product to work, you need to expose functionality that the tool can read. After all, you want as many people to use the product as possible. If you're writing something that's for internal use only and you're never going to distribute to anyone else, you can skip this stage. But you'll need to do these steps by hand anyway, and it's always better to have a script for the installation.

安装一个产品到Plone中的标准方法是到Plone的控制面板中选择产品安装它。这个脚本使用的 *portal_quickinstaller*  工具完成安装工作。为了使用标准的安装方法。我们的产品需要提供该工具能够读取的方法。毕竟你希望尽可能多的人使用该产品。如果你编写的是仅供内部使用的产品，不会对外发布，你可以跳过这步，但你仍然必须手工完成这些步骤，所以编写安装脚本总是一种较好的安装方式。

 **NOTE** Quick Installer makes an external method of this install function and runs it for you behind the scenes. It performs a few other tasks, as well. This means you could make an external method to do this if you wanted. That's why the installation instructions for many products tell you to create an external method.

**注**  快速安装工具自动生成一个完成安装的外部方法，在后台替你运行它。除此之外，它还进行其他的一些工作。这也就是说如果你愿意，你也可以自己写一个外部方法进行安装，这就是为什么许多产品的安装说明都要求你自己创建一个外部方法的原因。

To integrate with the Quick Installer, you need to make a specific module called *Install.py* in the *Extensions* directory. That module has to contain a function called *install*. The Quick Installer tool runs the *install* function, and the output is placed in a file on the server. The *install* method has to install the product into the portal types, so add an FSDV that points to the *skins* directory, and add this new directory to the skin layers.

为了和快速安装工具整合，你需要在 *Extensions* 目录种创建一个名为 *Install.py* 的模块。该模块必须包含一个名为 *install* 的函数。快速安装工具运行 *install* 函数，将输出结果放在服务器上的一个文件中。 *install* 方法必须将产品安装到门户类型中，增加一个指向 *skins* 目录的文件系统目录视图(FSDV)并将该目录添加到皮肤层中。

Now import the functions and set up the variables as usual. You have to import the *factory_type_information* from the product so that you can use it in the script, as shown in Listing 12-8.

一开始我们需要像往常一样导入函数并初始化变量。你必须从产品中导入 *factory_type_information* 以便在脚本中使用，如清单12-8所示：

Listing 12-8. The Start of the Installation Function (清单12-8 安装函数的开始部分)

::

 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.TypesTool<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=TypesTool" title="create this page">?</a> import ContentFactoryMetadata<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ContentFactoryMetadata" title="create this page">?</a>
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.DirectoryView<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=DirectoryView" title="create this page">?</a> import createDirectoryView
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.utils import getToolByName
 from Products.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> import factory_type_information
  
 from Products.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.config import plone_product_name, product_name
 from Products.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.config import layer_name, layer_location
  
 def install(self):
     """ Install this product """

After this, everything is generic and could be run on any product -- unless of course you want it to do something special on the installation. To add your product to the *portal_types* tool, you first check that your product isn't already registered. It could be that someone has registered another product of the same name. For this you'll call the *manage_addTypeInformation* method, as shown in Listing 12-9.

之后的操作是通用的，可以用于所有产品，当然除非你希望在安装是执行一些特殊操作。为了把你的产品加入到 *portal_types* 工具中，首先需要检查该产品尚未被注册，因为有可能其他人已经注册了一个同名的其他产品。然后调用 *manage_addTypeInformation* 方法进行注册，如清单12-9所示：

Listing 12-9. Remainder of the Installation Function (清单12-9 安装函数的剩余部分)

::

     out = []
     typesTool = getToolByName(self, 'portal_types')
     skinsTool = getToolByName(self, 'portal_skins')
  
     if id not in typesTool.objectIds():
        typesTool.manage_addTypeInformation(
            add_meta_type =  factory_type_information['meta_type']<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%27meta_type%27" title="create this page">?</a>
            id = factory_type_information['id']<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%27id%27" title="create this page">?</a>
            )
        out.append('Registered with the types tool')
     else:
        out.append('Object "%s" already existed in the types tool' % (id))

Next you need to add an FSDV to the *skins* directory. Again, the first thing you check is that you don't already have one; then you add the directory view with the following:

接下来需要增加一个FSDV到 *skins* 目录。同样，我们首先需要检查该目录尚不存在，然后用下列代码增加目录视图：

::

     if skinname not in skinsTool.objectIds():
         createDirectoryView(skinsTool, skinlocation, skinname)
         out.append('Added "%s" directory view to portal_skins' % skinname)

Finally, you loop through all the skins and add your new FSDV to each of the skins. This is a generic function; each skin is listed as string with each layer separated by commas. All you have to do is split the string up and insert your new skin after the layer named *custom*, as shown in Listing 12-10.

最后，你需要遍历所有的皮肤，将新的FSDV增加到每一个皮肤中去。这是一个通用功能；每个皮肤作为一个字符串返回，皮肤的层名称用逗号分开。我们需要做的就是拆分该字符串，将我们的新皮肤名加入到名为 *custom* 的层后面。代码见清单12-10。

Listing 12-10. Setting the Skin in the Installation Method (清单12-10 在安装方法中设置皮肤)

::

     skins = skinsTool.getSkinSelections()
     for skin in skins:
         path = skinsTool.getSkinPath(skin)
         path = [ p.strip() for p in p.split(',') ]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%20p.strip%28%29%20for%20p%20in%20p.split%28%27%2C%27%29%20" title="create this page">?</a>
         if skinname not in path:
             path.insert(path.index('custom')+1, skinname)
  
             path = ", ".join(path)
             skinsTool.addSkinSelection(skin, path)
             out.append('Added "%s" to "%s" skins' % (skinname, skin))
         else:
             out.append('Skipping "%s" skin' % skin)
     return "\n".join(out)

That's it. Your product is now ready to run.

一切就绪，我们的产品已经可以运行了。

Testing the Product(测试产品)
.............................

To test, restart your Plone instance so that it'll read the product directory in. If you haven't already developed your product in the appropriate products folder, then place it there now as part of your standard installation process. If there are any problems with your product, then Zope may start, but the product may show up as broken in the control panel.

开始测试时先重新启动Plone，让它读入产品目录。如果还没有把你的产品放到合适的产品目录中，请现在就放进去。如果你的产品有任何问题，Zope可能可以启动，但产品将在控制面板中显示为损坏。

Then install into Plone using the Add/Remove Products page in the Plone control panel. Now you should be able to go to a folder and add a source code object. The icon will be your icon in the skin, and the name is what you defined in the file system. After adding this, you'll get the edit page. Note that the URL now has *silvercity_edit_form* on the end and shows the nicely altered edit form.

然后到Plone控制面板中通过添加／删除产品页安装你的产品进入Plone。现在你应该可以在文件夹中添加代码对象了。对象的图标就是你在皮肤中定义的图标，名称是你在文件系统中定义的名称。添加完对象后转到编辑页。注意现在的URL结尾是 *silversity_edit_form* ，显示的是我们更改后的编辑页面。

You could add some code, select a language, and click Save, or you could upload a file from your computer. After clicking Save, you'll be taken back to the view function, and, sure enough, the code will be shown with the syntax highlighted.

你可以添加一些代码，选择一种语言，按保存按钮，也可以从电脑中上传一个文件。按保存按钮后，你会被带回显示页面，可以看到代码已经被正确地语法突出了。

This product is a little example of how simple writing a product in Plone is. Although it has been a lot of pages, most of it has been setting up the infrastructure and the skins. One of the first things people do is compare this to other Web scripting languages such as PHP. You have to remember that by having your code in Plone, you've achieved quite a few things without having to rewrite them. Specifically, you've achieved the following:

这个产品展示了写一个Plone产品是多么方便。尽管有很多页，它们大部分是用来设置基础架构和皮肤的。人们常常马上会去和其他的Web脚本语言去比较，如PHP。你要记住的是，在Plone中写代码的话有很多功能不用你去重新编写。特别地，你已经实现了以下的功能：

  - Full-text searching of the content

  - Integration with the workflow

  - Integration with portal membership and authentication

  - Persistence through the Plone database without having to write SQL or do other work

  - 内容的全文检索

  - 和工作流的整合

  - 和门户会员及认证功能的整合

  - 通过Plone数据库进行对象的持久化而无须编写SQL代码或进行其他工作

Further, it really does let your complete product scale later. For example, if you need a bug-tracking system, drop in the Collector product, and if you need a photo management product, drop in CMFPhoto<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFPhoto" title="create this page">?</a>. By utilizing the framework, you can give your overall site a great deal of flexibility and scalability.

还有，Plone使你的产品今后可以扩展。比如，如果你需要一个错误跟踪系统，添加Collector产品就可以了；如果需要照片管理功能，只要添加CMFPhoto产品。使用Plone框架给你的网站以极大的灵活性和可扩展性。

Although this product is a little cheeky by using lots of existing code, it demonstrates quite a few key functions of writing a product in Plone.

尽管该产品使用了许多现成的代码，它还是展示了编写Plone产品的许多关键功能。

Debugging Development(代码调试)
...............................

If you're developing your own product, then two things will happen to you at some point (unless you have so much Zen that you should be writing the Zope core code): your product will break, and you'll need to debug it.

一旦你开始开发自己的产品，下面两件事情早晚会发生(除非你是Zope大师，那么你应该去写Zope核心代码)：你的产品会出错，你需要对它进行调试。

During development, you may want to try importing the product into the Python prompt to see how it works. Unfortunately, you'll probably get an error. This is because when you do this import, you'll get a cascade of Zope-related imports. You can cope with some of this but not all of it. One of the common problems is that you'll get the following error:

开发过程中，你可能会希望在Python命令行中导入产品看它工作得如何。不幸的是，这样做的话你很可能得到一个错误。这是因为你在进行导入是会连带导入一系列Zope相关的模块，你能处理其中的部分，但不是全部。通常你会得到类似下面的出错信息：

::

 Traceback (most recent call last):
   File "<stdin>", line 1, in ?
   File "PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/__init__.py", line 1, in ?
     import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>
   File "PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py", line 4, in ?
     from Globals import InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>
   File "/opt/Zope-2.7/lib/python/Globals.py", line 23, in ?
     import Acquisition, ComputedAttribute<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ComputedAttribute" title="create this page">?</a>, App.PersistentExtra<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PersistentExtra" title="create this page">?</a>, os
   File "/opt/Zope-2.7/lib/python/App/PersistentExtra<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PersistentExtra" title="create this page">?</a>.py", line 15, in ?
     from Persistence import Persistent
 ImportError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ImportError" title="create this page">?</a>: cannot import name Persistent

You can solve this by making sure that before you import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> you import Zope and run the startup method. To be able to import Zope, you must have the directory containing Zope in your path; on my computer, this is */opt/Zope-2.7/lib/python*. However, you'll then run across errors trying to import CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a> if you have an instance home configured, which you probably will.

你可以通过在导入PloneSilverCity前导入Zope并运行它的startup方法。为了能够导入Zope，必须将包含Zope的目录加到你的路径中去；在我的电脑上，这个目录是 */opt/Zope-2.7/lib/python*。然而，如果你按通常的作法配置了实例目录，那么在导入CMFCore时会遇上错误。

The easiest way to import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> is to run Zope from the command line in debug mode using *zopectl*. This will open a Python prompt that will let you access the Zope database directly from Python. Chapter 14 covers this in more detail, but it can be done easily now (assuming your Zope isn't currently running). You can find the *zopectl* script in the *bin* directory of your Zope instance; for example, on my computer, this is */var/zope/bin*. Listing 12-11 shows an example running *zopectl* with PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.

导入PloneSilverCity的最简单的方法是使用 *zopectl* 从命令行中运行Zope的调试模式。这会打开一个Python对话，能让你直接从Python中访问Zope数据库。第14章中对此有更详细的描述，但现在我们也可以很方便地实现这一点(假设你的Zope目前不在运行)。你可以在Zope实例的 *bin* 目录下找到 *zopectl* 脚本，在我的电脑上，它的路径是 */var/zope/bin*。清单12-11是一个通过 *zopectl* 运行PloneSilverCity的例子。

 **NOTE** At the time of writing, *zopectl* doesn't work on Windows. However, on Linux, it's a convenient way to test your code. Unfortunately, using *zopectl* requires locking the Zope Object Database (ZODB) and, unless you're running ZEO (something I'll discuss in Chapter 14), can't be done while Zope is running.

 **注意** 直到本文写作时，*zopectl* 不能在Windows上运行。但是在Linux上它是用来测试你的代码的方便途径。不幸的是，运行 *zopectl* 需要锁住Zope对象数据库(ZODB)。所以，除非你使用ZEO(第14章中会有介绍)，在Zope运行时无法使用这个方法。

Listing 12-11. Debugging the Product Using Zope(清单12-11 使用Zope进行产品调试)

::

 $ cd /var/zope/bin
 $ ./zopectl debug
 Starting debugger (the name "app" is bound to the top-level Zope object)
 >>> from PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>
 >>> p = PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>("test")
 >>> p.edit("python", "import test")
 >>> p.getRawCode()
 'import test'
 >>> p
 <PloneSilverCity at test>

When your product breaks, you'll get a traceback to one of two places, either the error log page or one of the event logs. If you've really broken it, then Plone won't start; this normally happens when an import fails. If that's the case, then Plone will just not start at all. I recommend starting Plone from the command line, be it Windows or Linux. Having the console output of that error will give you an immediate output of the error. For example, Listing 12-12 shows what happens when you try to run Plone SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a> with a deliberate error in the import.

如何你的产品出了错，你可以在两个地方之一找到错误跟踪信息：错误日志页面或事件日志中的某一个。如果错误很严重，Plone就无法启动，这通常发生在出现导入错误时。如果是这种情况，那么Plone就根本无法启动了。我建议不管是在Windows还是在Linux中，最好在命令行中启动Plone。控制台的输出会立即反应出发生的错误。例如，清单12-12中显示了故意在导入Plone SilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SilverCity" title="create this page">?</a>时制造一个错误后，运行Plone时发生的情况：

Listing 12-12. An Example Error on Startup

::

 $ bin/runzope
 ------
 2003-12-19T17:44:05 INFO(0) ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZServer" title="create this page">?</a> HTTP server started at Fri Dec 19 17:44:05 2003
         Hostname: laptop
         Port: 8080
 ------
 2003-12-19T17:44:05 INFO(0) ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZServer" title="create this page">?</a> FTP server started at Fri Dec 19 17:44:05
 2003
         Hostname: basil.agmweb.ca
         Port: 8021
 ------
 2003-12-19T17:44:16 ERROR(200) Zope Could not import Products.PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>
 Traceback (most recent call last):
   File "/opt/Zope-2.7/lib/python/OFS/Application.py", line 533, in import_product
     product=__import__(pname, global_dict, global_dict, silly)
   File "/var/zope.zeo/Products/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/__init__.py", line 1, in ?
     import PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>
   File "/var/zope.zeo/Products/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py", line 1
      import ThisModuleDoesNotExist<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ThisModuleDoesNotExist" title="create this page">?</a>
                                   ^
  ImportError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ImportError" title="create this page">?</a>: No module named ThismoduleDoesNotExist<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ThismoduleDoesNotExist" title="create this page">?</a>

At this point, Zope stops; you'll have to fix this import before starting again. This is probably the easiest error to fix but will likely occur only when you install that a whiz-bang new product off the Internet only to find it has a dozen dependencies.

这时Zope会停止运行，直到你修正这一导入错误才能重新启动。这也许是最容易修复的错误了，但它常常发生在你兴奋地安装刚刚从网上下载的某个新产品，却发现它依赖于一大堆其他产品时。

The next kind of error that can occur is a programming or logic error, which occurs inside the code. Suppose your product adds two numbers together, but one of them is a string (this is an error in Python). An error will be raised, which Plone will report back to the user interface with an error value and error type. At this point, you should click *plone setup* and click Error Log to see the traceback, find the bug, and fix the issue.

下一种可能发生的错误是代码中的程序错误或者逻辑错误。假设你的代码想计算两个数字的和，但其中一个是个字符串(在Python中这是一个错误)。这会引发一个错误，而Plone则会将错误报告给用户界面并提供错误代码和错误值。这时，你应该点击 *plone setup* 然后点Error Log去查看错误跟踪信息，找到错误并修正。

If you change something in a product, the change doesn't get reflected in Python right away; you need to use a product called *Refresh* to force that change. This is an amazingly useful tool for new developers, and you enable it by having a file called *refresh.txt* in your *Products* directory. You'll note that PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> has one. Next, in the ZMI, select Control Panel, select Products, select PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a> (or your product name), and click the Refresh tab. If your product has a *refresh.txt* file, you can click the Refresh button. Plone will then dynamically reload your product with all the new code. If you're running Zope in debug mode, then you can set the product to dynamically check every time it's run, rather than having to come back to this screen each time.

如果你在产品中改了一些东西，这些变更不会立即在Plone中体现出来。你需要使用一个叫 *Refresh* 的产品强制变更生效。对于开发新手来说，这是一个极有用的工具。要使该功能生效，你需要在你的产品目录中添加一个名为 *refresh.txt* 的文件。你可以注意到PloneSilverCity就有一个这样的文件。下一步，在ZMI中进入Control Panel，选择Products，选中PloneSilverCity(或你的产品名)，点击Refresh页。如果你的产品包含 *refresh.txt* 文件，你可以按Refresh按钮。Plone会动态地重新加载你的产品。如果你是使用调试模式运行Zope的，你可以设置你的产品在每次运行是动态地检查更新，而无须一直手工进入更新界面刷新产品。

Unfortunately, everything with refresh isn't all rosy. It does do some rather 'interesting' things behind the scenes to Python to enable this to happen. In fact, the Refresh product can produce unexpected results in your product - nothing that restarting Zope won't fix, though. Relatively simple products that just do data manipulation will be fine, but some products aren't. Chances are if you're just starting out, your products will be simple, and you'll be fine.

不幸的是，刷新并不是完美无缺的。为了实现刷新，它在背后对Python做了些“有趣”的事。实际上，Refresh产品可能在你的产品中导致意料之外的结果，虽然不是连重启也无法修复的问题。那些只是进行一些数据处理的相对简单的产品不会有问题，但某些产品会出问题。如果你是刚开始使用Plone，大部分情况下你的产品会比较简单，一般不会有事。

Finally, if it something goes wrong and you can't figure it out, you'll need to pull out a debugger. You have so many ways to debug Zope that I'll just discuss the one I use the most: the Python debugger. You can call the Python debugger by adding the following line to a piece of code:

最后，如果你无法搞清是什么东西出了错，那你就需要使用调试器了。调试Zope可以有许多种方法，我只讨论我用得最多的一种：Python调试器。在你的代码中增加如下的一行你就可以调用Python调试器了：

::

 import pdb; pdb.set_trace()

**TIP** It's uncommon in Python to put two lines into one by using a semicolon, but here it's handy so that when you come to delete or comment it out later, you have only one line to comment.

** 提示 ** 在Python中用分号分隔同一行上的两条语句并不常见。但在这里却很方便，因为你事后需要删除或注释掉调试代码时，你只有一行代码要处理。

That will cause a breakpoint in the code execution, and Zope will stop processing and open the debugger. This is why you really want to run Plone from a console when developing. This doesn't work with a service or a daemon because there's no console to which to connect. Now if you re-create your problem, you'll be dropped into the Python debugger, and you can debug your product. For example, in my now fixed-up and correctly importing PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>, I added the following *pdb* trace function to the *getLanguages* method:

这行代码会在代码执行时产生一个断点，Zope会停止运行并打开调试器。这就是为什么开发时需要从控制台运行Plone的一个重要原因，因为如果使用了服务或后台守护进程，就没有控制台可以连接了。现在如果你重现错误，就会进入Python调试器，可以进行代码调试了。例如，假如在PloneSilverCity产品的 *getLanguages* 方法中我加入了以下 *pdb* 跟踪函数：

::

    def getLanguages(self):
         """ Returns the list of languages available """
         import pdb; pdb.set_trace()
         langs = []
         ...

Now when you run Plone and connect to the skin (something you'll add a moment), this function will be called, and, sure enough, on the console you started Zope with, you'll see the following:

然后我们启动Plone并访问皮肤，这个函数就会被调用，你可以在启动Zope所用的控制台上看到如下显示：

::

 --Return--
 > /var/tmp/python2.3-2.3.2-root/usr/lib/python2.3/pdb.py(992)set_trace()->None
 -> Pdb().set_trace()
 (Pdb)

You can type help to get a list of help options. The two main choices are *n* for next and *s* for steppng into an item. For example:

现在输入help可以看看下一步能做些什么。两个主要的选择是 *n* 执行下一条代码以及 *s* 单步执行。

::

 (Pdb) n
 > /var/zope.zeo/Products/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py(97)getLanguages()
 -> langs = []
 (Pdb) n
 > /var/zope.zeo/Products/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>/PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneSilverCity" title="create this page">?</a>.py(99)getLanguages()
 -> for value, description in list_generators():
 (Pdb) langs
 []

For more information on the debugger, I recommend the online documentation at the Python Web site (*<a href="http://python.org/doc/current/lib/module-pdb.html">http://python.org/doc/current/lib/module-pdb.html</a>*). You have other ways to debug Zope, such as using ZEO to get an interpreter, for example. Chapter 14 covers using ZEO. Integrated developer environments such as Wing (*<a href="http://wingide.com/wingide">http://wingide.com/wingide</a>*) or Komodo (*<a href="http://www.activestate.com/Products/Komodo">http://www.activestate.com/Products/Komodo</a>*) can remotely debug Zope instances and have nice graphical interfaces.

如果需要关于调试器的更多信息，我建议读一下Python网站上的在线文档(*<a href="http://python.org/doc/current/lib/module-pdb.html">http://python.org/doc/current/lib/module-pdb.html</a>*)。用其他方法也可以调试Zope，比如使用ZEO进入一个Python解释器。第14章叙述了如何使用ZEO。集成开发环境如Wing
(*<a href="http://wingide.com/wingide">http://wingide.com/wingide</a>*)或Komodo (*<a href="http://www.activestate.com/Products/Komodo">http://www.activestate.com/Products/Komodo</a>*)可以远程调试Zope实例并提供了良好的图形界面。

Writing a Custom Tool(编写工具)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Writing a tool is simpler than writing a content type, mostly because there's little to do in terms of registering the product and because the user interface is simple. For an example, I use simple statistics tool on my ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZopeZen" title="create this page">?</a> Web site (*<a href="http://www.zopezen.org">http://www.zopezen.org</a>*) for giving information about the amount of content, number of users, and so on. This simple tool prints a few numbers that interest me as a manager of the site. Figure 12-2 shows my ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZopeZen" title="create this page">?</a> stats.



 .. image:: img/3294f1202.png

Figure 12-2. PloneStats<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneStats" title="create this page">?</a> on ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZopeZen" title="create this page">?</a>

These are Web site statistics鈥擨 can get those by parsing the Web logs for my Plone server. Tools鈥攕uch as Analog, Webalizer, WebTrends<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=WebTrends" title="create this page">?</a>, and so on鈥攃an happily parse your Plone or Apache Web logs for you. Again, you can find the entire code for this project in the Collective at *<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>* in the PloneStats<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneStats" title="create this page">?</a> package.

Starting the Tool
.................

You should place the tool in a product directory the same way you did with the content type鈥攂y making a directory inside the instance home product directory. Into that folder add the *refresh.txt*, *install.txt*, *readme.txt*, and *__init__.py* files.

In that directory, the main module is called *stats.py*, which contains all the code for creating the stats. Again, I'll cover how the module looks without any extra Zope code. However, since you're directly plugging into the other Plone tools, running outside of Zope will make little sense.

Listing 12-13 shows the start of the tool. This is a simple version that has two methods: one to return the number of content types by type and by workflow state and the other for users that returns the total number of users in the site.

Listing 12-13. The Basic Stats Object

::

 class Stats:
     def getContentTypes(self):
         """ Returns the number of documents by type """
         pc = getToolByName(self, "portal_catalog")
         # call the catalog and loop through the records
         results = pc()
         numbers = {"total":len(results),"bytype":{},"bystate":{}}
         for result in results:
             # set the number for the type
             ctype = str(result.Type)
             num = numbers["bytype"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%22bytype%22" title="create this page">?</a>.get(ctype, 0)
             num += 1
             numbers["bytype"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%22bytype%22" title="create this page">?</a>[ctype]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ctype" title="create this page">?</a> = num
  
             # set the number for the state
             state = str(result.review_state)
             num = numbers["bystate"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%22bystate%22" title="create this page">?</a>.get(state, 0)
             num += 1
             numbers["bystate"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=%22bystate%22" title="create this page">?</a>[state]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=state" title="create this page">?</a> = num
         return numbers
  
     def getUserCount(self):
         """ The number of users """
         pm = getToolByName(self, "portal_membership")
         count = len(pm.listMemberIds())
         return count

Turning the Package into a Tool
...............................

To turn the package into a tool, you have to do the same process for the content type. In other words, you have to register the tool in the *__init__.py* module. Just like in the content type example, make a *config.py* file that contains all the configurations. The *config.py* file looks like this:

::

 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a> import CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>
  
 view_permission = CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCorePermissions" title="create this page">?</a>.ManagePortal<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ManagePortal" title="create this page">?</a>
  
 product_name = "PloneStats<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneStats" title="create this page">?</a>"
 unique_id = "plone_stats"

The security for this product is simpler, but that's because the product is quite simple鈥攁ll it does is interact with other tools and produce some statistics. There's nothing for users to add, edit, delete, or otherwise interact with. This means you have really only one permission, *ManagePortal<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ManagePortal" title="create this page">?</a>*, which is the permission to actually manage Plone's configuration and is usually given only to managers. For this purpose, this means only managers can go into the ZMI and see the information the tool provides. You could quite easily add a nice-looking skin for the Plone control panel or a portlet that displays this information in your site if you wanted.

Returning to *__init__.py*, add the initialization code for the tool. There's a special initialization script for tools, called *ToolInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ToolInit" title="create this page">?</a>*. In this tool, the *__init__.py* file looks like this:

::

 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a> import utils
 from stats import Stats
 from config import product_name
  
 tools = (stats.Stats,)
  
 def initialize(context):
     init = utils.ToolInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ToolInit" title="create this page">?</a>( product_name,
                     tools = tools,
                     product_name = product_name,
                     icon='tool.gif'
                     )
 init.initialize(context)

The *ToolInit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ToolInit" title="create this page">?</a>* function can take multiple tools; in this case, you have only one tool. If you have multiple tools, you can have only one product name and icon to show in the ZMI. This is all that's needed to register the tool. Now you have to complete the main module to turn it into an actual tool object.

Altering the Tool Code
......................

Next, add the code to the class to turn into a tool. Like the content type, this is just a matter of adding security inheriting from the correct base classes, like so:

::

 from Globals import InitializeClass<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=InitializeClass" title="create this page">?</a>
 from OFS.SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a> import SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a>
 from AccessControl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=AccessControl" title="create this page">?</a> import ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>
  
 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=CMFCore" title="create this page">?</a>.utils import UniqueObject<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=UniqueObject" title="create this page">?</a>, getToolByName

The *SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a>* class is the default base class for a simple (not a folder) object in Zope. Actually, all content types inherit from a class that, somewhere in its class hierarchy, inherits from *SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a>*; it's just that you don't need all the extra attributes those other classes provide. *UniqueObject<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=UniqueObject" title="create this page">?</a>* ensures that there will be one and only one instance of this object inside your Plone site and that it can't be renamed or moved around. This means your object will always be available.

Next, you import the variables from the config file as usual. By assigning the ID of your object, you ensure that the tool will have the ID of whatever *unique_id* is in the config file鈥攊n this case, *plone_stats*. The two base classes for the tool are the *UniqueObject<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=UniqueObject" title="create this page">?</a>* and *SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a>* classes, which are the minimum it needs. For example:

::

 from config import view_permission, product_name, unique_id
  
 class Stats(UniqueObject<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=UniqueObject" title="create this page">?</a>,  SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a>):
     """ Prints out statistics for a Plone site """
     meta_type = product_name
     id = unique_id

Next, you need to set up the security, and again you'll use the *ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>* class to set explicit permissions on the methods. For example:

::

     security = ClassSecurityInfo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ClassSecurityInfo" title="create this page">?</a>()
     security.declareProtected(view_permission, 'getContentTypes')
     def getContentTypes(self):
         ...

Adding Some User Interface Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The main code is complete, so it'd be nice to show some response to the user when they click the tool in the ZMI, such as giving an example of how to use the product. For this, you'll alter the ZMI so that you can display something.

Specifically, you write a page template that does what you want it to do. In this example, this is a simple page template that hooks into the ZMI. The ZMI is an unsophisticated user interface that just spits back Web pages to the user, so no fancy macros or slots render the page. All you need to do is write a HTML and add the following:

::

 <span tal:replace="structure here/manage_tabs" />

This one *tal:replace* function gets the management tabs and makes them appear at the top of the page. My ZMI page loops through the two methods of the *plone_stats* tool and spits out the results for the user, as shown in Listing 12-14.

Listing 12-14. A Page to Show in the Management Interface

::

 <html>
 <body>
 <span tal:replace="structure here/manage_tabs" />
  
 <p>Statistics for this Plone site.</p>
  
 <h3>Content Types</h3>
 <span tal:define="numbers here/getContentTypes">
     <p>
         Total count: <i tal:replace="numbers/total" /><br />
         Content types by type:
     </p>
  
     <span tal:repeat="type python:numbers['bytype'].keys()">
         <ul>
             <li>
               <span tal:replace="type" />:
               <i tal:replace="python: numbers['bytype'][type]" />
             </li>
         </ul>
     </span>
  
     <p>Content types by state:</p>
     <span tal:repeat="type python:numbers['bystate'].keys()">
         <ul>
             <li>
               <span tal:replace="type" />:
               <i tal:replace="python: numbers['bystate'][type]" />
             </li>
         </ul>
     </span>
 </span>
  
 <h3>Users</h3>
 <p>
   User count: <i tal:replace="here/getUserCount" />
 </p>
  
 </body>
 </html>

This is called *output.pt* and placed inside the *www* directory. You don't have to use a separate directory, but doing so makes it easier to remember.

The last step is to hook this up into the ZMI for your product. You do this by returning to the *Stats* class and adding the following (first import a *PageTemplateFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PageTemplateFile" title="create this page">?</a>* class that can handle the template from the file system):

::

 from Products.PageTemplates<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PageTemplates" title="create this page">?</a>.PageTemplateFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PageTemplateFile" title="create this page">?</a> import PageTemplateFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PageTemplateFile" title="create this page">?</a>

Then you register the page template as a method for the product that can be accessed. In the following, the method *outputPage* can now be called through the Web, and the matching page template is returned:

::

 outputPage = PageTemplateFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PageTemplateFile" title="create this page">?</a>('www/output.pt', globals())
 security.declareProtected(view_permission, 'outputPage')

Finally, the tabs at the top of the ZMI are determined by a tuple called *manage_options* that maintains a list of all the tabs to be shown on a page. You need to insert the new management page in there, so you do the following:

::

     manage_options = (
         {'label':'output', 'action':'outputPage'},
         ) + SimpleItem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=SimpleItem" title="create this page">?</a>.manage_options

Testing the Tool
................

Now that the tool is done, you can test that it works. First, restart your Plone instance so that it'll read the product directory in and register your new tool. Second, access the ZMI and go to the Add drop-down box in the top-right corner. You'll notice that PloneStats<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneStats" title="create this page">?</a> is now in the drop-down list, so select this option and click Add. The next form will list the tools available in the PloneStats<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=PloneStats" title="create this page">?</a> product; in this case, just one appears, as shown in Figure 12-3.

 .. image:: img/3294f1203.png

Figure 12-3. Adding the tool

Select the tool, and click Add. To test that the tool works, click it. You should see a series of statistics, as you saw earlier on ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter12/createform?page=ZopeZen" title="create this page">?</a>.

This tool is simple because I'm really not sure what presentation people want; if I make a standard reporting tool, then you can use it as you want. Some ideas that spring to mind are a page in the control panel, a little portlet box, a Portable Document Format (PDF) that contains pretty graphs and is e-mailed to the manager, or an API that's an external reporting tool, such as Crystal Reports could use. At this point, I'll wait and see what happens in the future.




From unknown Wed Dec 15 23:04:09 +0800 2004
From: 
Date: Wed, 15 Dec 2004 23:04:09 +0800
Subject: 翻译得不错
Message-ID: <20041215230409+0800@www.czug.org>

很感谢站长的劳动。有了一点基本的概念了。希望能得到更完整系统的python 及plone 中文教程。如果出版的话，我想应该会很好销的。


From unknown Sat Dec 10 08:37:56 +0800 2005
From: 
Date: Sat, 10 Dec 2005 08:37:56 +0800
Subject: 
Message-ID: <20051210083756+0800@blog.czug.org>

brilliant site! happy to be here. Good Plane becomes Good Grass in final: <a href="http://www.theonion.com/">http://www.theonion.com/</a> , Curious Corner becomes Industrious Soldier in final <a href="http://www.mercurynews.com/mld/mercurynews/">Astonishing Pair is always Collective Soldier</a> , Steal Player is very good Plane <a href="http://www.startribune.com/" rel="itsok">right Gnome will Play Corner without any questions</a>