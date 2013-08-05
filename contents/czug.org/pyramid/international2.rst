---
created: 2012-04-15 11:34:52
creator:
description: 
title: Pyramid国际化支持（二）
---

===============================
Pyramid国际化支持（二）
===============================

上文中，已经完成了从项目文件中抽取翻译字串，形成了MyProject.pot文件。本文主要集中于解释pot、po、mo文件之间的关系和相互转换。

4. setup.cfg
刚才我们已经生成了.pot文件，但是为什么会生成在locale目录下，而且命名为MyProject.pot呢？这就需要来理解一下setup.py的配置文件setup.cfg了。

setup.cfg也是一个ini方式的配置文件，里面有一系列与国际化相关的配置：

.. code::

    [compile_catalog]
    directory = myproject/locale
    domain = MyProject
    statistics = true

    [extract_messages]
    add_comments = TRANSLATORS:
    output_file = myproject/locale/MyProject.pot
    width = 80

    [init_catalog]
    domain = MyProject
    input_file = myproject/locale/MyProject.pot
    output_dir = myproject/locale

    [update_catalog]
    domain = MyProject
    input_file = myproject/locale/MyProject.pot
    output_dir = myproject/locale
    previous = true

这个配置中，定义了国际化支持开发中的4个主要操作的配置。其中定义了domain，以及抽取生成的文件目录，以及抽取后生成多语种文件时操作的输入、输出文件。注意，在这个配置文件中，改变了其中一节的内容，其他关联节的配置的也要一起修改噢。

5. 新增一个翻译版本

一旦pot文件生成之后，就可以按语种生成各个po文件。po文件就是将一个pot文件中的消息集翻译到一个特定语种的结果。我们可以用如下命令生成一个西班牙语的翻译版本：

python setup.py init_catalog -l es

运行之后，将会生成myproject/locale/es/LC_MESSAGES/MyProject.po文件。po文件结构如下：

.. code::

    # Spanish translations for MyProject.
    # Copyright (C) 2012 ORGANIZATION
    # This file is distributed under the same license as the MyProject project.
    # FIRST AUTHOR <EMAIL@ADDRESS>, 2012.
    #
    msgid ""
    msgstr ""
    "Project-Id-Version: MyProject 0.0\n"
    "Report-Msgid-Bugs-To: EMAIL@ADDRESS\n"
    "POT-Creation-Date: 2012-04-09 11:55+0800\n"
    "PO-Revision-Date: 2012-04-09 13:09+0800\n"
    "Last-Translator: FULL NAME <EMAIL@ADDRESS>\n"
    "Language-Team: es <LL@li.org>\n"
    "Plural-Forms: nplurals=2; plural=(n != 1)\n"
    "MIME-Version: 1.0\n"
    "Content-Type: text/plain; charset=utf-8\n"
    "Content-Transfer-Encoding: 8bit\n"
    "Generated-By: Babel 0.9.6\n"

    A. Default: Add ${number}
    #: myproject/views.py:8
    msgid "add-number"
    msgstr ""

    A. Default: Add2 ${number}
    #: myproject/views.py:9
    msgid "add-number2"
    msgstr ""

我们需要的翻译工作就是变更其中的msgstr的内容，将其转成对应的西班牙文。如：

.. code::

    msgid "add-number"
    msgstr "añadir ${number}"

把这个po文件中的所有条目逐个翻译完就完成了一个语言版本的制作。

Pyramid支持可以多个语言版本，只需要在新增一个语言版本即可，如再加一个法语：

python setup.py init_catalog -l fr

中文可以用zh_CN，zh_TW这两个locale名来表示简繁体语言。

注意：Pyramid实际上并不使用.po文件，这些文件是为了人工编辑而生成的。Pyramid使用po编译之后的mo文件。


6. 更新一个翻译版本

如果翻译字串有了变更，比如加了新的内容，就需要基于pot文件更新一个已有的翻译版本。只需重新生成pot文件，然后运行命令：

python setup.py update_catalog

在项目开发过程中，可以随时重新抽取，更新po文件，即便在po文件里面已经有部分内容已经处理过了，在当前配置下，Pyramid会保留修改过的内容。


7. 翻译版本的编译

翻译完po文件之后，需要将他们编译成mo文件才能被Pyramid识别，运行如下命令：

python setup.py compile_catalog


三、打开Pyramid翻译切换功能
-----------------------------

当我们翻译好po文件，编译好mo文件之后，就可以马上启动程序看看实际的国际化支持效果了。在默认情况下，Pyramid是不会做翻译切换的，要打开翻译切换，必须要满足下面两个条件：

* 项目中至少添加了一个翻译目录
* 确保项目正确设置了locale名字

1. 添加翻译目录

gettext是一个隐藏在Pyramid后的翻译切换机制。配置好翻译目录是保证其工作必要条件。翻译目录通常由一系列语言目录组成，在这些语言目录里面，各有一个LC_MESSAGES目录，在LC_MESSAGES目录下，则有一个或多个mo文件。每一个mo文件代表一个翻译信息分类（即前面提到的domain参数）。如我们前面创建的locale目录。注意，这里pot、po文件不是必须的。这在今后项目打包时需要注意一下。

我们可以在项目启动时通过pyramid.config.Configurator.add_translation_dirs()方法来添加一个或多个翻译目录。

.. code:: python

    from pyramid.config import Configurator 
    config.add_translation_dirs('my.application:locale/',   'another.application:locale/')


2. 设置Locale

当使用了默认的Locale协调程序时，我们可以通过下面集中方式在翻译切换之前设置好Locale。

* 设置request的_LOCALE_属性，如在视图中指定 request._LOCALE_ = 'es'
* 确保request.params这个字典中key为_LOCALE_那项的值为需要的内容。这个可以通过URL就可以保证，如http://localhost?_LOCALE_=cs，在调试时，我们经常用这种方式。
* 确保request.cookies这个字典中key为_LOCALE_那项的值为需要的内容。这个经常在上一次访问时通过set_cookie设置。


3. 总结上面所有步骤产生的实例

a. 安装Babel，Lingua
b. 用pcreate -s starter MyProject生成一个测试项目
c. 在myproject目录下新建一个目录locale
d. 在views.py 中添加翻译字串，如

.. code:: python

    def my_view(request):
        from pyramid.i18n import TranslationStringFactory
        _ = TranslationStringFactory('MyProject')
        ts = _('a new project!')
        return {'project':ts}

e. python setup.py extract_messages 抽取
f. 增加一个语言，python setup.py init_catalog -l es
g. 再增加一个语言，python setup.py init_catalog -l fr
h. 翻译po文件，如在西班牙翻译中我们改成：(就暂时不用google translate翻译了。。。)

msgid "a new project!"
msgstr "a new spanish project!"

在法语翻译中改成

msgid "a new project!"
msgstr "a new franch project!"

i. 使用python setup.py compile_catalog编译成mo文件
j. 在__init__.py中增加config.add_translation_dirs('myproject:locale/')
k. pserve development.ini启动项目
l. 分别用http://localhost:6543、http://localhost:6543?_LOCALE_=fr、http://localhost:6543?_LOCALE_=es链接进行访问查看效果。

