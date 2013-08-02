---
created: 2011-07-31 15:39:45
creator:
description:
title: Pyramid 学习笔记：创建Pyramid项目（中）
---

=======================================
Pyramid 学习笔记：创建Pyramid项目（中）
=======================================

需要深入理解Pyramid(Pylons也一样)项目结构，至少需要了解Paste项目的一些必要信息，也要对setuptools有一定了解，否则很多东西都会知其然而不知其所以然。

我们先简单看看一个基本Pyramid项目中各个文件的作用与基本内容。

一、development.ini配置文件结构
---------------------------------------

development.ini是一个PasteDeploy配置文件，主要为使用paster serve运行的应用提供配置参数。我们安装development.ini中配置段落逐项看一下其具体的作用。

.. code::

    [server:main]
    use = egg:Paste#http
    host = 0.0.0.0
    port = 6543

这一段定义了WSGI服务器的一些基本信息。
use = egg:Paste#http表明使用Paste中的http服务器来为应用提供服务。
host = 0.0.0.0表示任何IP地址都可以访问这个应用
port = 6543表示服务端口是6543
在[server:main]里面还可以配置http服务器线程池等各种参数，具体可以查看PasteDeplay。

.. code::

    [pipeline:main]
    pipeline =
        egg:WebError#evalerror
        MyProject

这也是PasteDeplay中定义的格式。这一段定义了paster serve命令运行的应用（这里是一个管道）。

.. code::

    [app:MyProject]
    use = egg:MyProject
    reload_templates = true
    debug_authorization = false
    debug_notfound = false
    debug_routematch = false
    debug_templates = true
    default_locale_name = en

这一段就是本应用的配置参数。注意，这里的名字MyProject与pineline中定义的名字一致。
在本段配置参数中，use = egg:MyProject  这里省略了#main（即use = egg:MyProject#main）。这个定义指明了本应用的入口程序，这里是MyProject这个egg包中的main函数（可以查看myproject目录下的__init__.py文件，里面就定义了这个main函数）。
另外还有reload_templates、debug_templates也需要注意一下，这主要是在开发中调试方便使用的，在应用部署时记得设成false。

development.ini中还有一大段python 标准log信息的配置，都懂得，不解释。

二、production.ini
-------------------------

Pyramid还加了一个产品部署时用的配置文件production.ini，基本等同与development.ini。主要区别是去掉了WebError交互调试界面，以及一些调试开关。

三、MANIFEST.in文件
-------------------------

这是distutils这个打包工具的配置文件（setuptools是distutils的一个扩展）。主要在里面列出了一些需要打进egg包的非python文件。

四、setup.py
-------------------------

这是运行setuptools所需要的启动文件。我们在单元测试、打包、分发等工作时经常需要使用它。这基本已经是python世界里面的事实标准了。
在这个文件里面，我们需要注意的配置项如下：
name=’MyProject’  项目名，包名
version=’0.0’    版本，这个经常需要改动
packages=find_packages()   打包时需要打到包中的内容，默认所有
zip_safe=False   指定该包是否能够不解压就能被引用
install_requires=requires, tests_require=requires   指定了本项目的依赖关系，需要什么包才能安装、测试
test_suite="myproject"   指定了单元测试搜索路径
entry_points   定义了本项目的入口。

定义好我们就可以使用
python setup.py sdist
这样的命令将整个项目打包。不同的打包命令及其区别参见setuptools

五、setup.cfg
-------------------------

这个文件是setuptools的参数配置文件，主要配置了单元测试、国际化等方面的一些配置。

.. code::

   [nosetests]
   match = ^test
   nocapture = 1
   cover-package = myproject
   with-coverage = 1
   cover-erase = 1

这一段是单元测试的配置信息（不过貌似跟python setup.py test命令无关，目前还不清楚在什么地方用到。
其他的信息都是国际化支持的配置，这跟标准python中定义的基本相同。

本文提到的示例材料均源于Pyramid官方网站
