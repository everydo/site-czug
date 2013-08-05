---
created: 2012-04-13 18:04:09
creator:
description: 
title: Pyramid国际化支持（一）
---

========================
Pyramid国际化支持（一）
========================

国际化支持是很多web应用开发的重要一环。Pyramid提供了国际化、本地化子系统可以将应用中诸如按钮名称、出错信息、应用及模版中定义的值等内容转换成当前用户的本地语言。


一、翻译字串（Translation String）
--------------------------------------

在开发过程中，可以在Python代码中插入一些特殊标记以使系统能够自动将文本内容切换成用户本地化语言（虽然叫Translation，但系统所有做的事情就是切换，并没有语种之间的翻译噢），这些标记就是翻译字串。翻译字串很类似Unicode对象，除了它还附带了一些用以支持翻译机制的特殊信息。

1. TranslationString 类

创建一个翻译字串的最主要方式就是使用pyramid.i18n.TranslationString类。如

.. code:: python

    from pyramid.i18n import TranslationString
    ts = TranslationString('Add')

上例中，TranslationString所带的参数叫msgid，它是一段需要翻译内容的编号（虽然它是一个字符串，并且可以是一个复杂的字符串，但它确实起了一个编号的作用）。msgid可以是Unicode对象，也可以是ASCII字符串。

在msgid中，可以包含一个或多个占位符，如：

.. code:: python

    from pyramid.i18n import TranslationString
    ts = TranslationString('Add ${number}', mapping={'number':1})

占位符将在翻译转换过程中替换成mapping中的值，如果mapping中找不到对应地值，则原样输出其内容。

TranslationString还可以带一个domain参数，用以表明翻译分类，以免在大应用多人开发中，msgid发生冲突。经常的，一个domain在后面会对应一个po、mo文件。如：

.. code:: python

    from pyramid.i18n import TranslationString
    ts = TranslationString('Add ${number}', mapping={'number':1}, domain='form')

最后，TranslationString还可以带一个default参数，如果有default参数，该参数将成为翻译字串的默认内容，而msgid则成为一个抽象的纯id。如果没有该参数，msgid扮演两者的角色。如：

.. code:: python

    from pyramid.i18n import TranslationString
    ts = TranslationString('add-number', default='Add ${number}', mapping={'number':1}, domain='form')

2. TranslationStringFactory类

生成翻译字串的另一个方法是使用TranslationStringFactory类，它带一个domain参数。如：

.. code:: python

    from pyramid.i18n import TranslationStringFactory
    _ = TranslationStringFactory('pyramid')
    ts = _('add-number', default='Add ${number}', mapping={'number':1})

上例通过TranslationStringFactory('pyramid')生成了一个TranslationString的实例，并赋给\_。这段代码等同于如下代码：

.. code:: python

    from pyramid.i18n import TranslationString as _
    ts = _('add-number', default='Add ${number}', mapping={'number':1}, domain='pyramid')


二、gettext翻译文件
---------------------

1. gettext基础

Pyramid翻译服务的基础就是GNU gettext模块。一旦在源码及模版使用了翻译标记之后，就可以通过创建不同的gettext文件来进行翻译工作。

GNU gettext翻译服务框架使用了三类文件：

.pot，可移植对象模版文件，它由程序通过搜索项目源代码，拾取其中的翻译字串，构成一个列表存成.pot文件，为后续的.po文件提供模版服务。
.po，可移植对象文件，.pot文件经人工翻译成一个特定语种之后的结果存成.po文件。
.mo，机器对象文件，.po文件为了性能考虑编译成机器可识别的二进制文件，就是.mo文件。

在Pyramid中，提供gettext文件操作服务的工具就是Babel和Lingua。

2. 安装配置Babel和Lingua

如果Pyramid的安装用了virtualenv虚拟环境，推荐将Babel和Lingua也安装到该虚拟环境中。直接在该虚拟环境中easy_install即可。

安装了Babel和Lingua之后，还需要配置一下setup.py来限定一下翻译字串抽取路径和抽取方式，即在setup函数中加入参数：

.. code:: python

      message_extractors = { '.': [
            ('**.py',   'lingua_python', None ),
            ('**.pt',   'lingua_xml', None ),
      ]}

在上面的例子中，'.'表示从当前目录开始抽取，这个时候setup.py也会被抽取。可以直接指定'myproject'包名，则只有这个包下的文件被抽取。**.py是指递归子目录查找py文件，lingua_python是文件类型，这里表明这是一个python文件。也可以指定忽略一个目录，如(static/**', 'ignore', None)。

如果需要将项目迁移到其他电脑上的话，最好在install_requires中加上Babel、lingua这两个包。


3. 开始抽取翻译字串

在抽取前，首先要在myproject这个包结构的根目录下建立一个locale目录，抽取的结果文件将存放在这里。目录建立好之后，运行下面命令即可完成抽取工作：

python setup.py extract_messages

运行完之后，locale目录下多了一个文件MyProject.pot。打开这个文件，我们可以看到类似如下的内容：

.. code:: 

   A. Default: Add ${number}
   #: myproject/views.py:8
   msgid "add-number"
   msgstr ""

   A. Default: Add2 ${number}
   #: myproject/views.py:9
   msgid "add-number2"
   msgstr ""

这就是我们刚才标定的翻译字串时所用参数在这里的体现。对应的视图如下：

.. code:: python

    @view_config(route_name='home', renderer='templates/mytemplate.pt')
    def my_view(request):

        from pyramid.i18n import TranslationStringFactory
        _ = TranslationStringFactory('MyProject')
        ts = _('add-number', default='Add ${number}', mapping={'number':1})
        ts2 = _('add-number2', default='Add2 ${number}', mapping={'number':1})
        return {'project':'MyProject'}
