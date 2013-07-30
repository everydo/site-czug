---
created: 2005-12-14 14:34:42
creator: panjy
description: ''
title: Chapter5
---
第五章
---------

.. Contents:: 内容：

:翻译: 潘俊勇

介绍基本的Plone模板技术
==================================

Plone puts together three layers of technology to create a page. Python and page templates create some Hypertext Markup Language (HTML), which is sent to the browser. There, some Cascading Style Sheets (CSS) render the nice page with which you're now familiar. Those two first elements, the Python code and the page templates, are the main areas of discussion in this chapter and Chapter 6.

plone同时使用三层技术来产生一个页面. 使用Python和页模板创建HTML, 然后发送到浏览器。在那里采用CSS来喧染这个页面，这是你已熟悉的技术. 前面的两点，python代码和页面模板, 是本章和第6章重点讨论的. 

To understand how to generate and then edit a Plone template, you have to first learn about some key underlying concepts. Some of these concepts are particularly unique to Plone, and although they provide great advantages, it does take some time to get used to them.

为了讨论如何生成和编辑一个Plone模板，你不得不首先学习一些关键的底层概念。其中某些概念是Plone特有的，尽管他们提供了很大的优点，使用他们却并不耗时。

In this chapter, I'll start by covering object publishing. I'll explain how to interact with objects inside Plone. Then I'll explain how to build expressions. Once you're familiar with those two concepts, I'll cover how Plone pages are actually put together. At the end of the chapter, you'll create a new page inside your Plone site that uses the techniques you've learned so far.

在这章，我将从对象发布开始。我将解释如何对象如何在Plone内部相互作用。接下来，我将解释如何构建表达式。一旦你熟悉了这两个概念，我就会开始讲解Plone页面实际上是如何组合在一起的。本章的最后，你将使用目前学到的技术，在Plone网站中创建一个新的页面。

This chapter will make more sense if you're familiar with Python. However, at each stage I'll explain the concept behind the code, so even if you don't understand Python, you should be fine. The rest of the book references the Template Attribute Language Expression Syntax (TALES) and Script (Python) objects, so you should take the time to get familiar with them in this chapter. You should have a head start: I already introduced TALES in the previous chapter because it's used for generating portlets and actions.

这章将对你是否熟悉Python比较敏感。尽管如此，在每个阶段，我将解释代码后面的含义。因此，既便你不理解Python，应该也没有问题。本书的剩余部分参考了“模板属性语言表达式语法(TALES)”和"Script(Python)"对象，因此，你应该在这章中逐步熟悉他们。你应该有过一次提前的经历：我已经在前面的章节中介绍过了TALES，因为他用于创建Portlets和actions。

理解底层的模板机制
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Diving straight into how Plone templating works would likely leave you confused, so I'll start by going through the underlying templating machinery. In an ideal world, this is something you shouldn't have to worry about, but in practice I've found that it's the first block people hit when trying to learn to use Plone.

深入进Plone模板的工作机理后，你可能被弄胡涂了，因此我将从模板机制的底层开始。在理想的世界中，这是不应该担心的东西，但是，实际上我发现这是人们学习使用Plone时候碰到的第一个钉子。

Plone is rather unique in that everything in Plone is an object. If you're unfamiliar with the concept of an object, there isn't much to know; an *object* is just a 'thing???? that encapsulates some behavior. Each object has methods that you can call on the object. One example is a computer mouse. A computer mouse could have methods such as move, click, and right-click.

Plone独特的一个特点是，Plone中的每个东西都是对象。如果你对“对象”的概念还不熟悉，也没有太多需要知道的；一个“对象”是一个封装了一些行为的'东西'。每个对象有可以在这个对象上调用的方法。一个例子是一个计算机鼠标。一个计算机鼠标可能有移动、点击和右键点击这几个方法。

In Plone, a document is an object of a particular type. All this means is that the document isn't just a static bit of text; instead, it's something a little more complicated and far more useful. A document in Plone has a description method, for example, that will give you the description that the user added. When using the templating system, you'll see in more detail that everything is an object. You'll look first at some of the basic principles of object publishing.

在Plone中，一个文档是某个类型的对象。所有这些意味着，文档不仅仅是一个静态的文本，他是某个更加复杂、更加有用的东西。Plone中的一个文档有一个描述方法，例如，提供给你用户添加的描述信息。当使用模板系统的时候，对于任何东西都是对象，你将看得更加具体。你将首先看看对象发布的基本原理。

介绍对象发布
.............................

In Plone, you're actually publishing objects that are located in Zope; most of them are objects that are persisted in the object database. The concept is more complicated than standard Common Gateway Interface (CGI) environments, where a script is executed and passed a series of request variables. Everything in Plone is an object, everything in Zope is an object, and everything in Python is an object. Until now I've tried to avoid using the word *object*; instead I've used words such as *template*, *script*, and *item*, but all of these are really objects??”just ones that behave differently.

在Plone中，你实际上是在发布Zope中的对象；大多数的对象都保存在对象数据库中。这个概念比标准的CGI环境更加复杂，这里一个脚本在执行的时候被传递了一系列的请求变量。Plone中的每个东西都是对象，Zope中的每个东西都是对象，Python中的每个东西也都是对象。到目前为止，我已经尽量不说 *对象* 一词，而是使用诸如 *模板* ， *脚本* ，和 *条目* ， 但是所有的这些实际上都是对象，只是他们的行为不同而已。

When you request a Uniform Resource Locator (URL) from Plone, an object in the environment is called. Plone does this by translating the URL into a path. So, if the URL is */Plone/login_form*, what Plone is going to do is break that URL down into a path and look up each of those objects in the database. It's going find the *Plone* object and then a *login_form* object inside the *Plone* object. Looking up this path is called *traversal*; essentially, Zope traverses across those objects and then calls the last one in the path.

当你向Plone请求一个“统一资源定位符”（URL）的时候，Plone环境中的一个对象被调用了。Plone通过把URL翻译成一个路径，来完成这个过程。因此，如果URL是 */Plone/login_form*, Plone就会把这个URL分割为一个路径，并因此在对象数据库中查看每个对象。他首先寻找 *Plone* 对象，再在 *Plone* 对象内部寻找 *login_form* 对象。这个路径查询的过程，叫做 *变量traversal*; 在本质上，zope遍历了这些对象，然后调用了路径中的最后一个对象。

When Zope calls the *login_form* object, the object is executed in its context. The term *context* is something you'll hear a lot of in Plone. It's merely the current context of the object being executed. In this case, it's */Plone*. The context changes a lot as you move through a Plone site. If you called the URL */Plone/Members/login_form* in a browser, then the context would be */Plone/Members*.

当Zope调用 *login_form* 对象的时候，这个对象在他的上下文(context)执行。这个 *上下文(context)* 术语是你在Plone频繁听到的东西。他仅仅是指对象执行的当前上下文。在这个例子中，他是 */Plone*. 当你在Plone站点中移动的时候，上下文就会不断改变。如果你在浏览器中调用URL： */Plone/Members/login_form* ，那么上下文就变成了 */Plone/Members*.

As mentioned, *traversal* is how you can programmatically access objects in Plone in the same manner as you do in a URL. This is similar to accessing items in a file system??”if you wanted to access a picture in *My Documents* on Windows, you'd enter a directory such as **c:\Documents and Settings\andym\My Documents\My Portrait.jpg**. You could access an object in Plone by entering **Members/andy/My Portrait.jpg**. This would work if you had a series of folders and objects that looked like the following:

上面提到， *遍历(traversal)* 是编程访问Plone中的对象的方法，这和通过URL访问是一样的行为。这就像访问文件系统中的条目。如果你向访问Windows系统中“我的文档”中的一个图片，你要进入到诸如 **c:\Documents and Settings\andym\My Documents\My Portraite.jpg** 这个文件夹。同样，你可以键入 **Members/andy/My Portail.jpg** , 来访问Plone中的一个对象。如果你有一系列的文件夹和对象，他们组织如下，前面的说就可能可以工作:

::

 Members
   |_ andy
      |_  My Portrait.jpg

In the file system version, you go through the computer's hard drive directory by directory. In Plone, the same thing happens; it's just that *Members* and *andy* are objects.

在文件系统版本中，你在计算机硬盘中一个文件夹一个文件夹地经过。在Plone，同样的事情也发生了；不同的是 *Members* 和 *andy* 是对象。

One catch is that Zope is case sensitive. In Windows, you can type **My Portrait.jpg** or **my portrait.jpg**. That won't work in Plone, however; you have to provide the same case as the object ID. For this reason, it's recommended that you try to keep all URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter5/createform?page=URLs" title="create this page">?</a> lowercase so your users have less chance of making a mistake.

有一点需要注意，Zope是大小写敏感的。在Windows中，你可以打字 **My Portait.jpg** 或者 **my portrait.jpg**. 然而，这在Plone中行不通。你必须使用和对象Id相同的大小写。因为这个原因，我们推荐保持URL全部小写，这样你的用户就不容易犯错误。

Plone and Zope have added a twist, called *acquisition*, to this whole publishing system. The concept behind acquisition is one of containment: Objects are situated inside other objects called *containers*. In the previous example, the *andy* object is a container inside the *Members* container inside the Plone site container (which in turn is inside the Zope application container).

Plone和Zope整个发布系统中，有一个精妙之处，叫做 *获取(acquiaition)*. 获取后面的概念是一种容器包含关系：对象被放置在叫做 *容器* 的其他对象中。在前面的例子中， *andy* 对象是一个容器，它位于 *Members* 容器中，然后位于Plone网站容器中(它有反过来位于Zope应用容器中).

In a standard object-oriented environment, an object inherits behavior from its parent. In Plone and Zope, an object also inherits behavior from its container. An object goes through a container hierarchy to figure out how to get these behaviors.

在一个标准的面向对象环境中，一个对象继承了它父对象的行为。在Plone和Zope中，一个对象也继承了它的容器的行为。一个对象可以查找整个容器层次结构，以计算出如何得到这个行为。

So, take the example of accessing *Members/andy/My Portrait.jpg*. What if the object *Some Image.jpg* didn't exist in the *andy* folder but instead exists higher up in the hierarchy? Well, acquisition would find it for you. Take the following hierarchy:

因此，拿访问 *Members/andy/My Portraite.jpg* 来说。如果对象 *My Portraite.jpg* 不存在 *any* 文件夹，但是存在高层的文件夹中，会怎么样呢？好，获取机制将帮你找到他。看看下面的层次结构：

::

 Members
    |_ andy
    |_ My Portrait.jpg

In this case, if you executed the URL, Plone would traverse to *andy* and then try to find *My Portrait.jpg*??”but, sure enough, it doesn't exist in the container. So, it'd look in the containment hierarchy, which is the *Members* folder, and it finds and returns *My Portrait.jpg*. The result is that the user will see the image, just like usual.

这个例子中，如果你执行这个URL，Plone将遍历到 *andy* ，看看有没有 *My Portrait.jpg* , 但是当然那里没有。于是他开始在容器层次结构中找，也就是 *Members* 文件夹，便找到了并返回了 *My Portrait.jpg*. 结果是，这个用户和原来一样看到了图片。

However, if you compare this to the earlier example where the image was contained in the *andy* folder, you'd find that the following key differences exist:

然而，你可以把这个和从前图片在 *andy* 文件夹中的例子进行比较，你将发现下面几点主要的区别

  - First, the context is the same, even though the object is in a different place. Context is based on the location from where the object is called.

  - 首先，既便对象位于不同的位置，上下文是相同的。上下文是基于对象调用的位置的。

  - Second, the container is different, and the container of *My Portrait.jpg* is now different. It's *Members*, not *andy*.

  - 其次，容器是不同的， *My Portrait.jpg* 的容易位置现在不同了。现在是 *Members*, 不是 *andy*.

So, what's the point of all this? Well, you can now put an object in the root of a Plone site, and any object can get to it because it's looked up through acquisition.

这样，所有这些说明了什么呢？好，你可以把一个对象放到Plone站点的根，这样任何对象都能够访问他，因为他使用获取机制在访问他。

Although this probably makes sense, acquisition can be quite complicated, especially looking through the context hierarchy (which can occur). If you want to learn more about it, you can read Zope lead developer Jim Fulton's excellent discussion of acquisition at *<a href="http://www.zope.org/Members/jim/Info/IPC8/AcquisitionAlgebra/index.html">http://www.zope.org/Members/jim/Info/IPC8/AcquisitionAlgebra/index.html</a>*.

尽管这可能很有意义，获取可能被弄得非常复杂，尤其是在查找层次结构的上下文的时候。如果你想学到更多相关的东西，你可以阅读Zope的主导开发人员Jim Fulton对获取机制的优秀讨论：*<a href="http://www.zope.org/Members/jim/Info/IPC8/AcquisitionAlgebra/index.html">http://www.zope.org/Members/jim/Info/IPC8/AcquisitionAlgebra/index.html</a>*.


介绍模板表达式
................................

Before diving into the Zope Page Templates system, you must understand TALES. Often in an application you need to write expressions that can be evaluated dynamically. These aren't scripts; rather, they're *one liners* simple expressions that can do something simple and easy in one line of code.

An expression is evaluated with a series of local variables passed into it. These variables are determined by what's calling the expression. Workflow passes one set of variables in, and the Zope Page Templates system passes another. For the moment, I'll use examples that have *context*. Remember, as discussed, the *context* is the context in which an object is requested.

So far you've seen some TALES expressions, such as *string:${portal_url}/Software*. However, this is merely one example of a wide range of expressions. The main use of TALES is in Zope Page Templates, the HTML generation system for Plone. Although its name may suggest it's suitable only in templates, many tools in Plone use this syntax to provide simple expressions, such as actions, workflow, and security. Different kinds of expressions exist, and I'll run through them one by one.

使用路径（Path）表达式
,,,,,,,,,,,,,,,,,,,,,,

The path expression is the default and most commonly used expression. Unlike all the other expressions, it doesn't require a prefix to denote the expression type. The expression comprises one or more paths. Each path is separated by the pipe symbol (*|*). Each path is a series of variables separated by forward slashes (*/*). The following are some simple examples:

::

 context/message
 context/folderA/title
 context/Members/andy/My Portrait.jpg

When the expression is evaluated, the path is split on the forward slashes. It then starts at the leftmost value and traverses to find that object, method, or value. It then places that object on the current stack and moves onto the next value; it repeats that process until it reaches the end of the expression or can't find a matching value. If the object it finds is a Python dictionary or mapping object, it'll call that value of the dictionary. One nice feature of a path expression in that the only restricted character is */*, so names can contain spaces and periods and still be evaluated.

When the end is reached, it'll call that object (if it can be called). If it's a noncallable object, it'll get the object's string value, and this is what will be returned. If at any time there's an error in this lookup (the most common being that the requested attribute doesn't exist), then it'll move onto the alternate expression, if there is one. You can specify an alternate expression by separating it with a pipe symbol.

For example:

::

 context/folderA/title|context/folderB/title

The previous example will render *folderA*'s title if it exists or *folderB*'s title if the first one doesn't exist. It'll repeat this process for each expression, until there are no more expressions or until one of them evaluates successfully.

使用Not表达式
,,,,,,,,,,,,,,,,,,,,,

A not expression has the prefix *not:* at the beginning and simply inverses the evaluation of the TALES expression that follows the prefix. Because the Zope Page Templates system doesn't have an *if* statement, you can use this to test for the opposite of a previous condition.

For example:

::

 not: context/message|nothing

Using Nocall Expression

使用Nocall表达式
,,,,,,,,,,,,,,,,,,,,,,,

By default, when a path expression reaches the last item in the path sequence, it calls the item, if possible. The *nocall:* prefix prevents this from happening. A nocall expression is rarely used in Plone, but it does have occasional uses. For example, you can use it to reference another object but not render it. Here's an example:

::

 nocall: context/someImage

Using String Expressions

使用String表达式
,,,,,,,,,,,,,,,,,,,,,,,,

String expressions allow you to mix up text and variables into one expression. All string expressions start with the *string:* prefix. This is a useful function, and you'll see it used quite a bit. The text can contain anything that's legally allowed inside an attribute, which essentially includes alphanumeric characters plus spaces. Contained inside the text can be variables, prefixed with a dollar sign (*$*). Here are some examples:

::

 string: This is some long string
 string: This is the $title

In the latter example, the variable *$title* is evaluated. The variable can actually be any path expression. If the variable contains */*, then the variable has to be wrapped with *{}* to signify the start and end of the expression.

For example:

::

 string: This is the ${context/someImage/title}.

If a dollar sign in the text needs to be escaped, use another dollar sign immediately before the dollar sign you need to escape.

For example:

::

 string: In $$US it costs ${context/myThing/cost}.

Using Python Expressions

使用Python表达式
,,,,,,,,,,,,,,,,,,,,,,,,

Python expressions evaluate a line of Python code. All Python expressions start with a *python:* prefix and contain one line of Python.

For example:

::

 python: 1 + 2

The Python code is evaluated using the same security model that a Script (Python) object uses, as discussed in Chapter 6. For these reasons, Python should be simple and limited to presentation functionality, such as formatting strings and numbers or performing simple conditions.

Further, almost all the other TALES expressions mentioned can be wrapped in Python and called. The following are the expressions:

  - **path(string)**: Evaluates a path expression

  - **string(string)**: Evaluates a string expression

  - **exists(string)**: Evaluates a string expression

  - **nocall(string)**: Evaluates a nocall expression

For example, the following code:

::

 python: path('context/Members')

is equivalent to the following:

::

 context/Members

A few convenience functions have also been added to assist developers. The *test* function takes three parameters: a statement to evaluate and the *true* and *false* conditions. The statement is evaluated, and the appropriate value is returned. For example:

::

 python: test(1 - 1, 0, 1)

The *same_type* function takes two variables and compares if they're the same. For example:

::

 python: same_type(something, '')

Some developers discourage using Python inside the Zope Page Templates system because it means adding logic in the presentation templates. Often, as a developer, for each piece of Python added, it can be useful to ask yourself if that piece of code would be better factored out and placed in a separate Script (Python) object. This doesn't mean you should move every piece of Python out??”just think about it before adding anything.

一些开发人员不鼓励在Zope页面模板系统中使用Python，因为这表示着，在展现模板中添加了逻辑。通常，作为一个开发人员，对于每段Python的添加，最好先问一下自己，这个段代码是否优化为一个独立的Script(Python)对象更合适。这不意味着你应该把每段Python都移出去，仅仅是在添加的时候考虑一下。

Book Web Site: Revisiting Actions

书店网站：再谈action
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

In Chapter 4, you added an action for pointing to the software part of the site so it appeared as a portal tab. In that action, you added in the string expression *string: ${portal_url}/Software*. This may make a bit more sense now that I've explained the variable *portal_url*. This is the URL to your portal, which may vary depending upon if you're using virtual hosting. It does this by using acquisition to acquire the *portal_url* object and insert the resulting value into the string. The result is that you'll always get an absolute link to the *Software* folder.

在第4章，你添加了一个指向软件网站软件部分的action，这样他显示在网站标签上。在这个action中，你添加了一个string表达式 *string: ${portal_url}/Software*. 由于我讲解了遍历 *portal_url*, 他有更多含义了。这是指向你网站的URL，他可能因为你使用虚拟主机而变化。他通过获取 *portal_url* 对象，而且插入他的值到字符串中。结果是你将总能够得到一个绝对的链接到 *Software* 文件夹。

Gotcha: Mixing Python and Strings

问题: 混合Python和String
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

I've seen newcomers mixing up Python and strings a few times. All the expressions are different. In other words, you can't place path-like expressions inside a Python expression. For example, the expression *python: here/Members + "/danae"* doesn't make sense. The entire expression is interpreted as Python, so Plone will try to divide *here* by *Members*, and you'll get errors. This is an ideal situation to use a string expression (which lets you do variable substitution), so the variable contain a path expression. So, you could use *string: ${here/Members}/danae*.

Using the Zope Page Templates System

使用Zope页面模板系统
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that you understand object publishing and expressions, you can get into the real meat of the system, Zope Page Templates. This is the templating system that Plone uses for generating HTML.

现在你理解的度系发布和表达式，你能进入到这个系统的内部了－Zope页面模板(Zope Page Template). 他是Plone用来生成HTML的模板系统。

Many HTML generation systems are available, and some of the better known are JavaServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter5/createform?page=JavaServer" title="create this page">?</a> Pages, Active Server Pages, and PHP. To users of the other systems, the Zope Page Templates system at first looks rather odd, but quickly you'll see it's an extremely powerful system.

很多HTML生成系统都可以利用，其中一个是有名的JavaServer Pages，Active Server Pages, 和PHP。对于其他系统的用户，Zope页面模板系统最初看起来很奇怪，但是很快你就发现这是一个极度强大的系统。

The simplest template looks something like the following:

最简单的模板如下：

::

 <p tal:content="here/message">The title</p>

If the value of message resolved to *Hello, World!* then the following would be output when the template was rendered:

如果这个消息的值是 *Hello, World!*, 那么下面就是这个模板的输出:

::

 <p>Hello, World!</p>

For a moment I'll gloss over a few of the finer points and show what has happened here. A standard paragraph was written in HTML, yet the content of that paragraph isn't the text shown in the output. To the opening paragraph tag, a *tal:content* attribute was added, and the *here/message* expression was written for that attribute. The content of the paragraph was output, however, as the value of the message variable (in this case, *Hello, World!*).

这会儿，我将掩盖一些细节点，展示所发生的事情。一个标准的段落使用HTML写出来了，然而短路的结果并不是输出中显示的结果。对于那个起始的段落标记，一个 *tal:content* 熟悉被添加了，而且 *here/message* 表达式被写进了这个熟悉。这个段落的内容，使用这个message变量的值输出了(这个例子中，是 *Hello, World!*).

At run time, the template is evaluated, and the *tal:content* attribute is called. The *tal* part stands for Template Attribute Language and has a range of commands, including *content*. You'll see all these commands later; with them, you can do almost anything you want to do the HTML tags. You can create loops, alter tags, alter attributes, remove tags, and so on. Before the template runs, this will show up as valid Extensible HTML (XHTML) and will show up in an editor as a paragraph with that text.

在运行的时候，模板被执行， *tal:content* 属性被调用。 *tal*部分表示Template Attribute Language，他拥有很多命令，其中之一是 *content*. 接下来你将看到所有的命令；使用他们，你可以做所有使用html标记可以做的事情。你可以创建循环，更改标记，更改属性，删除标记和其他的。在模板运行前，这将显示为一个有效的扩展HTML(XHTML)而且将在编辑器中作为一个文本短路显示。

All these page templates are valid XHTML. This is a standard for HTML and is valid Extensible Markup Language (XML) code. This means you must follow these rules:

这些页面模板都是有效的XHTML。这是HTML的一个标准，是一个有效的扩展标记语言XML代码。这意味这你必须使用如下的规则：

  - All tags must be lowercase.

  - 所有的标记必须小写。

  - Attributes must always be quoted (for example, *<input type="checkbox" checked="1" />*).

  - 属性必须总是使用引号（如， *<input type="checkbox" checked="1" />*).

  - Empty elements must be terminated (for example, *<br />*, not *<br>*).

  - 空原始必须结束（如， *<br />* 不能是 *<br>*).

To define a page as XHTML, you must give a DOCTYPE declaration and use the XML namespace set in the *html* tag. Plone uses the following declaration at the top of every page:

为了把一个页面定义为XHMTL，你必须给一个DOCTYPE的声明，而且在在 *html* 标记中使用XML名字空间。Plone在每个页面中，使用下面的声明，

::

 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

For more information on the XHTML specification, go to *<a href="http://www.w3.org/TR/xhtml1/#xhtml">http://www.w3.org/TR/xhtml1/#xhtml</a>*.

要知道更多XHMTL规范的信息，请到 *<a href="http://www.w3.org/TR/xhtml1/#xhtml">http://www.w3.org/TR/xhtml1/#xhtml</a>*.


Another HTML Generation System?

另外一个HTML生成系统？
...............................

In the first few years of the Web, programmers were the prime creators of HTML. Programmers rapidly threw together systems to generate HTML programmatically so they could get on with their real jobs. With tools such as Perl's CGI modules, programmers could write complicated server-side code for content.

在Web的最初几年中，编程人员是HTML的主要创建者。程序员很快放弃了这些使用程序生成HTML的系统，以便他们能够处理他们真正的工作。使用类似Perl的CGI模块，程序员能够为内容编写复杂的服务器代码。

However, soon everybody was generating content, and the process had to be made easier. This brought about the wave of escape coding languages. These languages used a special kind of HTML markup that was processed to produce output. As mentioned, some of the most popular are Active Server Pages, JavaServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter5/createform?page=JavaServer" title="create this page">?</a> Pages, and even whole languages based on the concept, such as PHP. Zope followed this trend with Document Template Markup Language (DTML).

然而，很快每个人都在生成内容，这样这个过程不得不变得轻松些。这样带来了放弃代码语言的潮流。这些语言使用一个特殊的HTML标记，处理后生成输出。前面提到过，其中著名的是Active Server Pages，JavaServer Pages，和完全基于语言的概念，如PHP。Zope跟随这个潮流推出了文档模板标记语言(DTML).

These systems take HTML and intersperse it with custom tags such as *<% .. %>* or *<dtml-... />*. This system was popular because it was easy to understand, and users who already knew basic HTML could grasp the idea of a few more tags. Designers could ignore the content of these tags and let the programmers deal with them. Programmers could alter the relevant code parts without upsetting the content.

这些系统使用HTML，而且在其中散布了一些定制标记，如*<% .. %>* 或 *<dtml-... />*. 这些系统非常流行，因为他们很容易理解，而且用户理解基本HTML的用户能够理解更多的标记。设计人员能够忽略这些标记的内容，让程序员去处理他们。程序员修改相关的代码，而不会弄乱内容。

However, these systems have the following problems:

然而，这些系统有如下问题：

    * The HTML templates can be hard to scale as more and more content gets added to the script. Pages quickly become huge and hard to manage.

    * 随着更多的脚本加入，HTML模板可能很扩展。页面很快变得巨大，而且很难管理。

    * Logic and content aren't neatly separated. They can be separated with some of these systems; however, the ability to intersperse any HTML with a piece of programming code is too easy. Often, content, presentation, and logic become one large, entangled mess.

    * 逻辑和内容没有干净的分开。他们在某些系统中能够分开；然而，散布代码到HTML中太容易了。通常，内容、展现、和逻辑变成了一个非常大的、绞成一团的东西。

    * Pages can't be easily edited. Often pages or templates come with the note "just leave these bits alone..."cause editing them would break the code. What You See Is What You Get (WYSIWYG) editors can be set to not alter some tags, but they can easily break others. In large organizations, users with different roles all have to edit the same page.

    * 页面不能轻松编辑。通常，声称"只需把他们放在一边"的页面和模板导致编辑他们破坏了代码。所见即所得的编辑器能被设置为不修改某些标记，但是他们能轻松破坏其他的。在一个大的组织中，扮演不同角色的用户不得不编辑同一个页面。

    * It can be hard to see a default result. Take, for example, a database query that shows the result in a table. How can a designer see how that would look without actually running the code?

    * 很难看到缺省的页面结果。如，一个数据库查询显示结果为一个表格。设计人员如何在没有实际运行代码的情况看到最终结果？

For these reasons, the Zope Page Templates system was created. Page templates present a novel approach; instead of providing another method of escape coding, code is added to existing tag attributes. Not only is the Zope Page Templates system free and open source, it doesn't require Zope. Currently, versions of the system exist in Python, Perl, and Java.

由于这些原因，Zope页面模板系统创建了。页面模板是一个十分新颖的方法：不是提供新方法来注解代码，而是把代码直接放到现有的标记属性中。Zope页面模板不仅仅是免费的，他也并不依赖于Zope。当前这个系统的其他版本在Python，Perl和Java中使用。

Introducing Page Templates and Content

介绍Zope页面模板和内容
......................................

As you're now aware, Plone is a content management system where users add content to a Plone site through the Web. Those content objects are stored inside Plone and then rendered back to the world using page templates.

正如你所知，Plone是一个内容管理系统，用户通过web往Plone站点中添加内容。这些内容对象保存在Plone中，使用页面模板渲染返回到世界。

Returning to the earlier example of accessing */Members/andy/My Portrait.jpg*, I'll now discuss what actually happens to the content in Plone. First, Plone finds and calls the *My Portrait.jpg* object; it's called because there's no specific method being called on the object. When a content type is called, a certain template is located and rendered. The context for that template will be the image you want to access, and the template will be the one for that image.

返回到先前的例子中，访问 */Members/andy/My Portrait.jpg*, 我现在将讨论Plone中的内容到底发生了什么。首先Plone找到并调用了 *My Portrait.jpg* 对新；他被调用是因为这个对象没有特殊的方法被调用。当一个内容类型被调用，一个特殊的模板被找到，并渲染。模板的上下文将是你想访问的图片，这个模板是针对这个图片的模板。

If a different action was being called on the image, such as */Members/andy/My Portrait/image_edit*, then the action *image_edit* would be looked up for that object, and the corresponding template would be returned. Chapter 11 discusses how this works in more detail.

如果图片上一个不同的动作被调用，如 */Members/andy/My Portrait/image_edit*, 那么这个 *image_edit*动作将被为这个对象查找，相应的模板返回。第11章讲述了具体的工作细节。

So, in all the templates in Plone, you'll see a referral to *here* or *context*. This is the context of the content being accessed. In a template, you can now say *context/something or other*, and this will be the *something or other* looked up relative to the piece of content, not the template. You'll now create your first template in Plone.

这样，所有Plone的模板中，你将看到一个 *here* 或者 *context* 的引用。这就是内容访问的上下文。一个模板中，你现在能够说 *context/something or other* ，这就会相对这个内容去寻找 *something or other* , 而不是这个模板。你现在将创建你的第一个Plone的模板。

Creating Your First Page Template

创建你的第一个页面模板
.................................

The standard way to create a page template is through the Zope Management Interface (ZMI). Unfortunately, because it means editing the template through a text area in a Web browser, the ZMI is also the most painful to use as a developer. The text area provides limited functionality compared with most editors; it's lacking features such as line numbers, syntax highlighting, and so on. In Chapter 9, I show you how to use External Editor to edit content; this allows you to edit Web site content in local editors such as Macromedia Dreamweaver or Emacs. In Chapter 6, I show you how to make Plone read page templates off a hard drive as files, and then you can use any tool you'd like.

To create a template, go to the ZMI, click *portal_skins*, click *custom*, and then select Page Template from the drop-down box (see Figure 5-1). Click Add, and you'll see the page shown in Figure 5-2.

为了创建一个模板，来到ZMI，点击 *portal_skins* ,点击 *custom* , 在下拉框中选择Page Tempage（见图 5-1）. 点击添加，你见过看到如图5-2的页面。

 .. image:: img/3294f0501.png

Figure 5-1. Selecting the Page Template option

 .. image:: img/3294f0502.png

Figure 5-2. Adding a page template

Enter **test** for the page template's ID. Then click the Add and Edit button, which takes you to management screen (see Figure 5-3). You can then edit this template through the Web by using the text area and clicking Save Changes to commit your changes.

 .. image:: img/3294f0503.png

Figure 5-3. Editing a page template

**NOTE** Before Plone 2, all the page templates passed through the variable *here*, which is equivalent to *context*. If you see *here* in any code in a page template, it means *context*. The new *context* variable was added to be clearer and bring the page templates in line with Script (Python) objects.

After clicking Save Changes, the page template will be compiled. If you've made any errors in the template, you'll see them highlighted at the top of the page. Figure 5-4 shows an error with an *h1* tag that isn't closed. (As previously mentioned, page templates must be valid XHTML.)

 .. image:: img/3294f0504.png

Figure 5-4. Page template error

Once you've saved the page template successfully, you can click the Test tab to see the rendered value of the template. In Figure 5-5, you'll see that the heading has been replaced with the ID of the template, and the main paragraph now includes the ID of the template.

 .. image:: img/3294f0505.png

Figure 5-5. Generating the page

The management screen for a page template also has the following important features:

 **Title**: This is the title for this template, and it's optional. If you change this in the previous example, for instance, after clicking Test, you'll note that the resulting HTML has changed.

 **Content-Type**: This is the content type for this template; it's usually *text/html*.

 **Browse HTML source**: This will render the template unprocessed as HTML. This is how the template would appear if it were loaded into an HTML editor.

 **Test**: This will process and render the template.

 **Expand macros when editing**: This checkbox will try to expand macros. I recommend leaving this unchecked most of the time. Macros are an advanced feature and are discussed in Chapter 6.

Now that you've created a page template, you'll make a few modifications to it. This will demonstrate the topics covered so far in this chapter. For example, if you want your page template to demonstrate 1+2, you could add the following line to your page template:

::

 <p>1+2 = <em tal:content="python: 1+2" /></p>

Then click the Test tab to see if it works. You should see the following:


 1+2 = *3*
 
To see an example of a path traversal, print the logo of your Plone site. You can include an expression in the logo of your Plone site by adding the following to your page template:

::

 <p tal:replace="structure context/logo.jpg" />

This will create the appropriate HTML for the image and show it on the page.

Understanding the Page Template Basic Syntax

理解页面模板的基本语法
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that you've seen how to make a page template, I'll explain the basic syntax of it. You can break the syntax of page templates into a few different components, which I'll cover in the following sections.

Introducing Built-in Variables

介绍内置的变量
..............................

You've seen the expression syntax, so now you'll learn about the variables that are passed to it when you render a page template. All of the following happen in the context of accessing the image *Some Image.jpg* in the *Members/andy* folder, called with the URL */Members/andy/Some Image.jpg*:

 **container**: This is the container in which the template is located. With Plone this is usually the *portal_skins* folder. You should avoid using a container because *portal_skins* can do unexpected things to the meaning of container (for example, a reference to the *andy* folder).

 **context**: This is the context in which the template is being executed. In Plone this is the object being viewed if you're viewing a portal object (for example, a reference to the *Some Image.jpg* object).

 **default**: Some statements have particular default behavior. This is noted in each of the statements, and this variable is a pointer to that behavior.

 **here**: This is equivalent to *context*.

 **loop**: This is equivalent to *repeat*.

 **modules**: This is a container for imported modules. For example, *modules/string/atoi* is the *atoi* function of the Python string module. This includes all the modules that are safe to import into the Zope Page Templates system. For more information, see 'Scripting Plone with Python???? in Chapter 6.

 **modules**: 这是导入模块的容器. 例如, *modules/string/atoi* 是Python string模块的*atoi*函数. 他包括了所有可以安全导入到Zope页面模板中的模块. 更多信息，参考第6章的'使用Python进行Plone脚本编程'.  

 **nothing**: This is the equivalent of Python's *None*.

 **options**: These are the options passed to a template, which occurs when the template is called from a script or other method, not through the Web.

 **options**: 这些是传递到模板的参数选项, 当模板被其他的脚本或者方法不通过web调用的时候才发生.

 **repeat**: This is the repeated element; see the *tal:repeat* element in the 'Introducing TAL Statement Syntax???? section of this chapter.

 **repeat**: 这是循环的元素; 在本章 'Introducing TAL Statement Syntax' 节中查看 *tal:repeat* 元素.

 **request**: This is the incoming request from the client (all the values from the incoming request are visible using the following test context script). All the *GET* and *POST* parameters are marshaled into a dictionary for easy access. Here are some examples:

 **request**: 这是从客户端输入的请求，(输入请求的全部变量都可使用下面的测试上下文脚本查看到). 所有的 *GET* 和 *POST* 变量被转换进一个自动中，以方便访问. 下面是例子:

 ***production**:*** the following code is part of the list.**

::

 request/HTTP_USER_AGENT # the users browser
 request/REMOTE_ADDRR # the users browser
 request/someMessage   # the value of some message, in the query string

 **root**: This is the root Zope object. For example, *root/Control_Panel* gives you the control panel for Zope.

 **root**: 这是Zope的根对象. 例如，*root/Control_Panel* 可到Zope的控制面板.

 **template**: 这是被调用的模板. 例如, *template/id* 是正在渲染的模板的ID.

 **traverse_subpath**: 这包含这一系列的需要遍历的元素清单. 这是一个高级变量, 在使用前建议你理解遍历和获取机制.

 **user**: 当前的用户对象。如, *user/getUserName* 是当前用户的用户名.

 **CONTEXTS**: 这是这些变量的一个列表.

 **NOTE	**With the exception of *CONTEXTS*, any of these variables can be redefined in a *tal:define* statement if the user wants. However, this can be confusing for anyone using the code and isn't recommended.

The *test_context* page template shows all the values of these variables, plus the locations of some of the objects (see Listing 5-1). It can be useful for debugging and explaining the variables. Add it as a page template called *test_context*, and then click Test to see the results.

Listing 5-1. *test_context*

::

 <html>
   <head />
   <body>
     <h1>Debug information</h1>
   <h2>CONTEXTS</h2>
   <ul>
     <tal:block
         tal:repeat="item CONTEXTS">
     <li
         tal:condition="python: item != 'request'"
         tal:define="context CONTEXTS;">
             <b tal:content="item" />
             <span tal:replace="python: context[item]" />
     </li>
     </tal:block>
   </ul>
   <h2>REQUEST</h2>
   <p tal:replace="structure request" />
   </body>
 </html>

The *test_context* page template will produce the output shown in Figure 5-6.

 .. image:: img/3294f0506.png
    :width: 700

Figure 5-6. An example of all the default variables in a script

Introducing TAL Statement Syntax

介绍TAL语句语法
................................

The Template Attribute Language (TAL) provides all the basic building blocks for dynamic presentation. TAL defines eight statements: *attributes*, *condition*, *content*, *define*, *omit-tag*, *on-error*, *repeat*, and *replace*.

模板属性语言(TAL)提供了所有动态外观的基本构建块。TAL 定义了8个语句: *attributes*, *condition*, *content*, *define*, *omit-tag*, *on-error*, *repeat*, 和 *replace*.

Since page templates are valid XML, all TAL attributes must be lowercase. Further, each element can have each statement only once. In the following examples, I've inserted new lines in the elements to increase legibility; this is perfectly valid code and quite common in the Plone source. However, this is optional and isn't required.

tal:attributes: Changing an Element's Attributes

tal:attributes: 改元素的属性
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:attributes* allows you to replace one or more attribute of an element. A statement contains the attribute to be changed, separated by a space from the statement. For example:

::

 <a href="#"
    tal:attributes="href context/absolute_url">
    Link to here
 </a>

This will change the *href* attribute of the link to the result of *here/absolute_url*. The *href* attribute has already been defined on this element, so if a designer opens this page, the designer will see a valid element (although the link may not make sense until the page is processed). Some example output is as follows:

::

 <a href="http://plone.org/Members/andy/book">Link to here</a>

Since each element can have multiple attributes, *tal:attributes* allows you to alter one or more attributes simultaneously by having multiple statements. To change multiple attributes at once, separate statements with a semicolon (*;*). If the attribute or statement contains a semicolon, you can escape this with another semicolon immediately after it appears (*;;*). For example, to change both the *href* and *title* element, do the following:

::

 <a href="#"
    tal:attributes="href context/absolute_url;
       title context/title_or_id">Link</a>

The example output is as follows:

::

 <a href="http://plone.org/Members/andy/book">Plone Book</a>

The *tal:attributes* and *tal:replace* tag are mutually exclusive since *replace* eliminates the element. If the Zope Page Templates system detects this, it'll raise a warning, and it'll ignore the *tal:attributes* tag. If the expression evaluates to *default*, then no change will be made. For example:

::

 <a href="#"
     tal:attributes="href
         python:request.get('message', 'change', default)">
     Link</a>

In this example, I'm using the *get* function on the *request* object. If the incoming request to the page has the *message* variable, then the first value will be used, which is of course *change*. If the *message* variable isn't present, then the second value, *default*, will be used. Hence, only by passing the *message* parameter will a change take place.

tal:condition: Evaluating Conditions

tal:condition: 评估条件
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:condition* statement allows a condition to be tested before rendering the element. For example:

::

 <p tal:condition="request/message">
     There's a message
 </p>
 <p tal:condition="not: request/message">
     No message
 </p>

Here, the paragraph with the text for a message will be rendered only if the *request* variable has an attribute and it resolves to *true*. Being able to test for a condition is pointless if the opposite condition can't be tested for; this is what the not expression allows. The *not:* prefix inverts the statement, so *not: request/message* resolves to *true* if the request variable message resolves to *false*.

In TAL, the following evaluates to *false*:

  - The number zero

  - Any float or complex that evaluates to zero (for example, *0.0*)

  - Strings of zero characters (for example, *""*)

  - An empty list or tuple

  - An empty dictionary

  - Python's *None* value

  - TALES's *nothing* value

The following evaluates to *true*:

  - The default value

  - Any number other than zero

  - Strings that aren't empty

  - Strings that are just spaces (for example, *"   "*)

  - Anything else

tal:content: Adding Text

tal:content: 添加文本
,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:content* statement is probably the most commonly used statement in a page template. This statement is also one of the simplest, replacing the content of an element with the value specified. For example:

::

 <i tal:content="context/title_or_id">Some title</i>

The example output is as follows:

::

 <i>The title</i>

This will replace the text *Some title* with the value of the expression *context/title_or_id*. If the text to be placed contains HTML elements, those elements will be escaped. By default, the text to be replaced is HTML escaped; the *structure* prefix will allow the HTML to be entered without the elements being escaped. For example:

::

 <i tal:content="structure here/title_or_id">Do not escape HTML</i>

If the element with the *tal:content* attributes contains other elements, then all those elements will be replaced. The *tal:content* and *tal:replace* tags are mutually exclusive; they can't both be placed on the same element, and an error will be raised if this is attempted. If the value is *default*, the content is unchanged.

tal:define: Defining Variables

tal:define: 定义变量
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:define* statement allows variables to be created and reused within the template. For example:

::

 <p tal:define="title here/title_or_id">
     ... <i tal:content="title">The title</i> ...
 </p>

In this example, the variable title is created and assigned the result of *here/title_or_id*; later the variable *title* is used in a *tal:content* statement. By default the variable is created only locally within the scope of the current element. So, in the previous example, only elements within the paragraph tag can use the *title* variable. You can redefine the variable anywhere within the statement or reuse it in other elements as many times as needed.

To create a variable to be used globally, you can use the prefix *global*. This will allow access to the variable anywhere within the template, not just within the defining element. For example:

::

 <p tal:define="global title string:Foo bar">
     ... <i tal:content="title">The title</i> ...
 </p>
 <i tal:content="title">We still have a title</i>

Furthermore, Plone defines a large number of global definitions so that users can easily use them in their scripts. As with any such definitions, they're subject to change, so you should use them carefully. These *defines* mean a large number of global variables are available. For example, to get the title of your Plone site, you can just call the following:

::

 <p tal:content="portal_title" />

You can find these defines in the ZMI by clicking *portal_skins*, clicking *plone_templates*, and then clicking *global_defines*. You can find a full list of all the defines, and an explanation of them, in Appendix A.

tal:omit-tag: Removing Elements

tal:omit-tag: 删除元素
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:omit-tag* is rather unusual. It allows the removal of a tag. Because the Zope Page Templates system requires the use of HTML tags, complicated pages can often need lots of elements and can result in extra tags being added. For this statement, the tag is removed, which just leaves the content of the tags. For example:

::

 <p tal:omit-tag="">This is some text</p>

The output is as follows:

::

 This is some text

In this example, the text *This is some text* will be rendered; however, the tag won't be rendered. Optionally, the *tal:omit-tag* statement can take an expression as an argument. If that expression evaluates to *false*, then the *tal:omit-tag* doesn't happen. For example, this does nothing:

::

 <p tal:omit-tag="nothing">This is some text</p>

One alternative to using *tal:omit-tag* is using the *tal* namespace, as discussed in the 'Useful Tips???? section of Chapter 6.

tal:on-error: Performing Error Handling

tal:on-error: 执行错误处理
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:on-error* statement provides a method to handle errors. It acts rather like *tal:content* because it causes the content of the tag to replaced, but it's triggered only when an error occurs.

The following is an example:

::

 <p  tal:content="request/message"
     tal:on-error="string: No message">Message</p>

If there's an error evaluating the *request/message* expression here, then the *on-error* attribute will be activated. This causes the contents of the tag to be replaced with the text *No message*.

Unfortunately, the *on-error* statement is rather limited. The tag can't distinguish between different errors and allows only one expression to be evaluated and used. This limitation is by design so that the tag won't be overused. Error handling should really be handled in the logic of your application.

Fortunately, for all expressions, you can supply alternatives in the statement if the first part of the statement evaluates to something other than *true* or *false* (in other words, if an error is raised). Each alternative is separated by the pipe character (*|*), and multiple alternatives can appear in a statement. If you're relying on variables from the incoming request, then always add a *|nothing* to the end to ensure that an attribute error isn't raised.

For example:

::

 <p
   tal:content="request/message"
   tal:condition="request/message|nothing">
     There's a message
 </p>
 <p tal:condition="not: request/message|nothing">
     No message
 </p>

This second example is more verbose but desirable for a couple of reasons:

  - The designer is able to see the positive *and* negative condition.

  - You can handle a more complicated error condition than just printing a string.

tal:repeat: Performing Looping

tal:repeat: 执行循环
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:repeat* allows looping through objects and is one of the more complicated statements. A statement contains the value to be assigned for each iteration of the results, separated by a space from the results being iterated through.

Here's an example of looping:

::

 <table>
   <tr tal:repeat="row context/portal_catalog">
     <td tal:content="row/Title">Title</td>
   </tr>
 </table>

In this example, the expression *here/portal_catalog* returns a list of results. Because the repeat starts on the table's *row* tag, for each row in the list of results, a new row in the table will be created. Rather like *tal:define*, each iteration of the results is assigned to a local variable (in this case, *row*). This example will show one row for every item in the list of results.

You can access some useful variables from the *repeat* statement, such as the number of the current iteration. You can access these through the *repeat* variable, which gets added to the namespace. For example, to access the current number, you use the following:

::

 <table>
   <tr tal:repeat="row context/portal_catalog">
     <td tal:content="repeat/row/number">1</td>
     <td tal:content="row/Title">Title</td>
   </tr>
 </table>

The full list of variables available in *repeat* is as follows:

  - **index***:* This is the iteration number, starting from zero.

 * - ***number***:* This is the iteration number, starting from one.

 * - ***even***:* This is *true* for an even-indexed iteration (for example, *0*, *2*, *4*, ...).

 * - ***odd***:* This is *true* for an odd-indexed iteration (for example, *1*, *3*, *5*, ...).

  - **start***:* This is *true* for the first iteration.

  - **end***:* This is *true* for the last iteration.

 * - ***length***:* This is the total number of iterations.

  - **letter***:* This is the iteration number as a lowercase letter (for example, *a*??“*z*, *aa*??“*az*, *ba*??“*bz*, ..., *za*??“*zz*, *aaa*??“*aaz*, and so on), starting from one.

 * - ***Letter***: *This is the uppercase version of letter*.*

 * - ***roman***: *This is the number as a lowercase Roman numeral (*i*, *ii*, *iii*, *iv*, *v*, and so on), starting from one.

Two other values are available in the *repeat* namespace that are rather unusual and rarely used, *first* and *last*. These two variables allow you to store information about data in the iteration. By using the value you want to store in an expression, a Boolean value will be returned. For the variable *first*, *true* indicates that this the first time the value has occurred in the iteration. Likewise, for the variable *last*, *true* indicates that this is the last time the value has occurred in the iteration.

Here's an example of this:

::

 <ul>
   <li tal:repeat="val context/objectValues">
     First: <i tal:content="repeat/val/first/meta_type" />,
     Last: <i tal:content="repeat/val/last/meta_type" />:
     <b tal:content="val/meta_type" />,
     <b tal:content="val/title_or_id" />
   </li>
 </ul>

tal:replace: Adding Text

tal:replace: 添加文本
,,,,,,,,,,,,,,,,,,,,,,,,

The *tal:replace* statement is similar to *tal:content* with one difference??”it removes the entire tag.

For example:

::

 <p tal:replace="context/title_or_id">Some title</p>

This will render the result of the expression *context/title_or_id* but will remove the paragraph tags from the result. This is equivalent to the following:

::

 <p
   tal:content="here/title_or_id"
   tal:omit-tag="">Some title</p>

If the element with the *tal:replace* statement contains other elements, then all those elements will be replaced. You can't use the *tal:replace* statement with *tal:attributes* or *tal:content*; they're mutually exclusive, and an error will be raised if you place both on the same element.

Introducing Execution Order

介绍执行顺序
...........................

The order that TAL attributes are written isn't the order in which they're executed because they're really XML elements (and XML doesn't care about attribute order). The order in which they're executed is as follows:

*define*
*condition*
*repeat*
*content*
*replace*
*attributes*
*omit-tag*
You can't use the *content* and *replace* statements on the same element because they're mutually exclusive. Using the *attributes* statement on the same element as a *replace* or an *omit-tag* is meaningless since the attributes are removed. The *on-error* tag isn't mentioned because it'll be used when the first error occurs in any of the previous elements.

Example: Displaying User Information

例子：显示用户信息
....................................

To illustrate the points you've learned so far, you'll now create a page template that performs a simple task: displaying information about a user in the system.

In this example, a company is using Plone internally as an intranet. Each employee is registered in Plone and given a login; however, there's no simple page that shows employees or how to contact them. You'll create a simple user information page that shows a user's e-mail address, home page, picture, and when they last logged in.

The first prototype of this page is easily accomplished with TAL, TALES, and a bit of knowledge of the basic Content Management Framework (CMF) tools. Unfortunately, because the Application Programming Interfaces (APIs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter5/createform?page=APIs" title="create this page">?</a>) are rather convoluted for those tools, some of this code is a little longer than it should be. At this stage, don't worry too much about the API of those tools; these will be covered in Chapter 9. If you just take the API for granted for the moment, you can concentrate on the TAL.

First, you need to create a page template; click *portal_skins*, click *custom*, add a page template, and give it the ID **user_info**. Second, you'll edit it as follows. For a full listing of this page template, please see Appendix A. Examining the full listing, you'll see that it starts with HTML and body tags.

For, convenience you'll put the main definitions in a *div* tag:

::

 <div
   tal:omit-tag=""
   tal:define="
     userName request/userName|nothing;
     userObj python: here.portal_membership.getMemberById(userName);
     getPortrait nocall: here/portal_membership/getPersonalPortrait;
     getFolder nocall: here/portal_membership/getHomeFolder
     ">

In this *div* tag there are four defines: one to get the username passed in through the request object and another to translate that username into a user object. The last two defines ensure that you have a valid reference to the methods that give you user pictures and folders; these again are convenient because they make later code simpler. Making a *div* tag or other tag such as this that contains a series of defines is quite a common pattern in the Zope Page Templates system. It simply makes the code cleaner.

Next, you do two simple conditions to check that you have a user:

::

 <p tal:condition="not: userName">
     No username selected.
 </p>
 <p tal:condition="not: userObj">
     That username does not exist.
 </p>

If no username is given in the request, then the expression *request/username|nothing* will result in a *userName* that's *nothing* and hence fail the simple test. Further, if the username isn't valid, the *userObj* will result in *None*, and error messages will be printed for both these conditions.

Now you're ready to actually process the user:

::

 <table tal:condition="userObj">
   <tr>
     <td>
       <img src=""
       tal:replace="structure python: getPortrait(userName)" />
     </td>

Since you can only show the user if one is found, you'll ensure that there's a simple condition on this table, *tal:condition="userObj"*. To show a user's picture, you'll use the *getPortrait* method defined early. This function returns the entire tag, so the *structure* tag ensures the whole image is rendered correctly. Next, you want to show a few properties such as *name* and *email*. The following shows one of these options, getting the *home* folder:

::

 <li
     tal:define="home python: getFolder(userName)"
     tal:condition="home">
     <a href=""
         tal:attributes="href home/absolute_url"
         >Home folder</a>
 </li>

First, you use a define to get the folder and assign this the variable *home*. In a Plone site, creating a *home* folder for a user is optional, so you have to be sure that if you're linking to a folder, it exists. Fortunately, because of the TAL execution order, the define comes before the condition. Following this, you show a link to the folder using the *absolute_url* attribute of a folder.

The page template goes through a few more lines of finding other useful and exciting properties to show the user. As with most things in Plone, the key is finding the correct API calls and then processing the output accordingly.

Finally, the page ends by closing all the relevant tags. If all goes well, you should able to call the page by accessing the URL *<a href="http://yoursite/user_info?userName=">http://yoursite/user_info?userName=</a>[someuser]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter5/createform?page=someuser" title="create this page">?</a>* where *someuser* is a username that exists in your Plone site.

At the moment, this page template is pretty limited. Only a user with the manager role can view this page, it can show only one member at a time, and the information for the user is rather thin. In Chapter 6, I'll show how to expand this example and add some component reusability, as well as the ability to translate the text into other languages.

（潘俊勇）
