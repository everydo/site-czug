---
created: ''
creator: ''
description: Zope组件架构是什么，发展历史，安装方法，准备进入代码
title: 起步
---
====================
起步
====================

Zope组件架构是什么，发展历史，安装方法，准备进入代码

.. contents::
.. sectnum::
   :prefix: 1.

:原文: http://www.muthukadan.net/docs/zca.html#getting-started
:翻译: whycrying: kwanwind at gmail dot com
:校正: 潘俊勇

介绍
~~~~~~~~~~~~

开发一个大型软件系统通常是非常复杂的。
用于分析、设计和编程的面向对象方法，已显示出非常适合于处理大型系统。
近来，基于组件的设计、和使用组件编程正在变成非常流行。
在不同的编程语言中，有很多支持基于组件设计的框架。
有些甚至是和语言中立的，比如Microsoft的COM和Mozilla的XPCOM.

(译者：组件架构适合大型的复杂系统，所以很多简单应用，可能并不需要这个。)

**Zope组件架构(ZCA)** 是一个支持基于组件设计和编程的Python框架。
它非常适合于开发大型Python软件系统。
ZCA并非为Zope的网站应用服务器所专用：它能够被用来开发任何Python应用程序。
或许它应该被称为是 `Python组件架构` 。

ZCA其实就是讲如何更有效地使用Python对象。组件是提供可自省接口的可重用对象。
每个组件提供的接口，可以是在类Class中实现，或者其他任何可调用的对象中实现。
它不管组件是怎样实现的，重要的是它遵守它的接口的约定。
使用ZCA，你能把系统的复杂性分布到多个相互协作的组件上(译者：每个相对简单了)。
他帮助你创建2中基本的组件类型： `适配器adapter` 和 `工具utility` .

ZCA相关的核心包有2个：

  - ``zope.interface`` 用来定义组件的接口。

  - ``zope.component`` 用来处理组件的注册和检索。

记住：ZCA不仅仅是关于组件自身，它更包括组件的创建、注册和检索。
再次记住： `适配器adapter` 是一个普通的Python类Class(或一个广义的工厂)，而utility是一个普通的Python可调用的对象。

ZCA框架是作为Zope3项目的一部分进行开发的。
如前面提及的，这是一个纯Python的框架，它能够被应用于任何类型的Python应用程序中。
目前Zope3和Zope2项目都广泛地使用这个框架，还有很多其他的项目在使用，包括非网站应用  [#projects]_.

.. [#projects] http://wiki.zope.org/zope3/ComponentArchitecture


历史概要
~~~~~~~~~~~~~~~
ZCA框架项目作为Zope3项目的一部分，开始于2001年。
ZCA是总结在开发Zope2这个大型软件系统的教训的基础上逐渐成长起来的。
Jim Fulton是这个项目的项目领导者。很多其他人参与了系统设计和实现，
包括Stephan Richter, Philipp von Weitershausen, Guido van Rossum (*亦称为：Python BDFL*), Tres Seaver,
Phillip J Eby and Martijn Faassen等。

最初，ZCA定义了几个附加组件: `服务(services)` 和 `视图(views)` ，
但开发者们最终认识到 `工具utility` 可代替 `服务(services)` ， `多适配multi-adapter` 可代替 `视图(views)` 。
现在，ZCA只有一个非常小量的核心组件类型： 工具utilities、适配器adapters,
订阅器subscribers和处理器handlers.
而事实上，订阅器subscribers和处理器handlers是两种特殊的adapters类型。

在Zope3.2发布周期期间，Jim Fulton提出了一个大的ZCA简化提议 [#proposal]_.  
由于这个简化，一个新的简单接口(`IComponentRegistry`)，被用来注册全局的和局部的组件。

.. [#proposal] http://wiki.zope.org/zope3/LocalComponentManagementSimplification

`zope.component` 包中有很一个长的依赖关系列表，其中很多对于非Zope3的应用程序来说并不需要。
于是在PyCon 2007期间，Jim Fulton添加了setuptools的 `extras_require` 特性 ，
将核心ZCA功能和附加特性(add-on features)分离 [#extras]_。

.. [#extras] http://peak.telecommunity.com/DevCenter/setuptools#declaring-dependencies

现在，ZCA项目是一个独立的项目，具有自己的发布周期和Subversion版本仓库。
然而，问题(issues)和故障(bugs)仍然是作为Zope3项目的一部分在跟踪处理 [#bugs]_, 
而且使用主要的zope-dev邮件列表作为开发讨论 [#discussions]_.
另外Zope3还有一个通用的用户邮件列表(`zope3-users`)，可以用来讨论任何ZCA疑问 [#z3users]_ 。

.. [#bugs] https://bugs.launchpad.net/zope3
.. [#discussions] http://mail.zope.org/mailman/listinfo/zope-dev
.. [#z3users] http://mail.zope.org/mailman/listinfo/zope3-users

安装
~~~~~~~~~~~~
``zope.component`` 包和 ``zope.interface`` 包是Zope组件架构的核心。
他们提供定义组件、注册组件和查找组件的工具。
``zope.component`` 包及其依赖包都可在Python包索引(PyPI)中找到egg格式包 [#pypi]_.

.. [#pypi] Repository of Python packages: http://pypi.python.org/pypi

你能够使用easy_install安装zope.component及其依赖包 [#easyinstall]_ ::

  $ easy_install zope.component

.. [#easyinstall] http://peak.telecommunity.com/DevCenter/EasyInstall

这个命令将从PyPI下载 ``zope.component`` 及其依赖包，并且在你的Python路径中安装它们。

Alternately, you can download ``zope.component`` and its dependencies
from PyPI and then install them.  Install packages in the order given
below.  On Windows, you may need binary packages of ``zope.interface``
and ``zope.proxy``.

或者，你也能从PyPI下载 ``zope.component`` 及其依赖包然后安装它们。安装包的顺序在下面。
在Windows上，你可能需要 ``zope.interface``和 ``zope.proxy`` 的二进制包。


  1. ``zope.interface``
  2. ``zope.proxy``
  3. ``zope.deferredimport``
  4. ``zope.event``
  5. ``zope.deprecation``
  6. ``zope.component``


在下载完这些包后，要安装它们，你可以使用带有参数的 ``easy_install`` 命令将其当作eggs安装
(你也可以让所有的eggs放在同一条命令里。)::

  $ easy_install /path/to/zope.interface-3.4.x.tar.gz
  $ easy_install /path/to/zope.proxy-3.4.x.tar.gz
  ...

你也能够逐个解压这些包后安装。比如::

  $ tar zxvf /path/to/zope.interface-3.4.x.tar.gz
  $ cd zope.interface-3.4.x
  $ python setup.py build
  $ python setup.py install

这些方法将安装ZCA到系统Python路径的site-packages目录中，这可能会引发问题。
在Zope3邮件列表中，Jim Fulton建议不要使用系统Python路径 [#systempython]_. 
你可以使用virtualenv和(或)zc.buildout来处理任何Python包，这对部署也很好。

.. [#systempython] http://article.gmane.org/gmane.comp.web.zope.zope3/21045


代码体验
~~~~~~~~~~~~~~~~~~~~~~~
在Python中有两个不错的包，可用来建立开发Python应用程序的工作环境。
它们是Ian Biking创建的 ``virtualenv`` ，和Jim Fulton创建的 ``zc.buildout``.
你也可以结合2个一起使用。
你能够使用这两种包将 ``zope.component`` 及其其他依赖包安装在一个独立的工作环境中。
即便是做python代码实验，这也是一个好习惯，并且精通这些工具将有助于开发和部署应用程序。

可以使用easy_install来安装virtualenv::

  $ easy_install virtualenv

然后创建一个类似下面的新环境 ::

  $ virtualenv myve

这将在myve目录下创建一个新的虚拟环境。现在，在myve目录中，你能够使用easy_install，将zope.component及其其他依赖包安装进myve/bin目录中::

  $ cd myve
  $ ./bin/easy_install zope.component

现在你可以从myve/bin目录下的新python解释器(interpreter)导入zope.interface和zope.component::

  $ ./bin/python

这个命令将给你一个Python提示符，在这里你可以用来运行这本书上的程序。

使用带zc.recipe.egg的zc.buildout的方法，你可以创建带指定的Python
eggs的Python解释器(interpreter)。首先，使用easy_install命令安装zc.buildout。(你也可以在虚拟环境中这样做。)
如要创建用Python eggs的新buildout进行实验，首先要创建一个目录并且使用buildout初始命令初始化它::

  $ mkdir mybuildout
  $ cd mybuildout
  $ buildout init

现在，新建的mybuildout目录就是一个buildout. 缺省的buildout配置文件是buildout.cfg. 在初始化之后，将包括这些内容::

  [buildout]
  parts =

你可改变成::

  [buildout]
  parts = py

  [py]
  recipe = zc.recipe.egg
  interpreter = python
  eggs = zope.component

现在，在mybuildout/bin目录中，不带参数运行buildout命令。
这将在mybuildout/bin下创建一个新的Python解释器(interpreter)::

  $ ./bin/buildout
  $ ./bin/python

这个命令将给你一个Python提示符，在这里你可以用来运行这本书上的程序。

几种组件
~~~~~~~~~~~~~~
内容组件
    包含数据的对象，最核心的对象，可在URL进行traverse，发布的对象

    内容组件不必提供特别的接口，很简单，也就是没什么业务逻辑方法

Adapter组件
    - 功能的组件
    - 把组件串起来，有context
    - 提供展现视图(特殊的adapter)

Utility组件
    很独立，不和其他组件发生关系，没有context
