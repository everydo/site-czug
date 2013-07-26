---
created: ''
creator: ''
description: 启动过程
title: 启动
---

=============
启动
=============

启动过程

.. include:: include.rst
.. _startup_chapter:

:翻译: 宋进亮 Elias Soong elias.soong at gmail.com

启动
=======

当你以前台模式启动 :mod:`repoze.bfg` 时，你将在终端看到类似如下内容::

 $ paster serve myproject/MyProject.ini
 Starting server in PID 16601.
 serving on 0.0.0.0:6543 view at http://127.0.0.1:6543

这一章讲解在你输入``paster serve myproject/MyProject.ini``并按下回车键，终端输出``serving on 0.0.0:6543 ...``的这段时间里，都发生了什么。

启动过程
-------------------

启动并支持 :mod:`repoze.bfg` 应用程序的最简单和讲解最完整的方式是调用 ``paster serve`` 命令，并传递给它一个 :term:`PasteDeploy` ``.ini`` 文件。这将根据 ``.ini`` 文件的内容完成参数设定，并启动服务器监听端口。本章假定你使用这一命令来运行`repoze.bfg`应用程序。

.. note:: ``paster serve`` 绝不是启动和承载 :mod:`repoze.bfg` 应用程序的唯一方法。任何一个 :term:`WSGI` 服务器都能运行 :mod:`repoze.bfg` 应用程序，并且有些WSGI服务器（比如 :term:`mod_wsgi` ）不需要 :term:`PasteDeploy` 框架的 ``paster serve`` 指令来完成服务器进程管理，每个 :term:`WSGI` 服务器有它自己的文档讲解如何创建一个负责执行应用程序的进程。并且像这样的服务器也很多，因此我们没法在这儿探讨每一种服务器的使用细节。但无论使用哪种服务器，其基本概念都是大同小异的。

这里按照时间顺序给出一个在按回车键执行 ``paster serve MyProject.ini`` 时发生一切的高层次概览。

#. 在shell中用 ``serve`` 和 ``MyProject.ini`` 参数调用 :term:`PasteDeploy` ``paster`` 指令，于是 :term:`PasteDeploy` 框架知道这是要根据 ``MyProject.ini`` 文件包含的信息运行并承载一个应用。

#. PasteDeploy框架在这个 ``.ini`` 文件中找到名为 ``[app:main]`` 或者 ``[pipeline:main]`` 的部分，这两节给出了将承载的 :term:`WSGI` 应用程序的设置。如果你使用的是一个简单的应用程序（比如一个默认生成的 :mod:`repoze.bfg` 应用程序的 ``[app:main]`` 节），应用程序的 :term:`entry point` 或 :term:`dotted Python name` 将使用本节设置中 ``use=`` 这一行的值来命名。相反，如果你正在使用WSGI :term:`pipeline` （例如 ``[pipeline:main]`` 节），应用程序将使用涉及你 :mod:`repoze.bfg` 应用程序的最后一个元素来命名。

#. 该应用程序的 *构造器（constructor）* （用 ``use=`` 行上的entry point reference或dotted Python name来命名）接收定义它的节中所包含的键/值参数。构造器负责返回 :term:`router` 实例。

   对 ``repoze.bfg`` 应用程序来说，其所在 :term:`package` 中有 ``run.py`` 文件，构造器将是这一 ``run.py`` 文件中名为 ``app`` 的函数。如果该函数执行成功，它将返回一个 :mod:`repoze.bfg` :term:`router` 实例。以下是 ``run.py`` 模块内容的一个例子::

    from repoze.bfg.router import make_app
    from repoze.bfg.registry import get_options

    def app(global_config, **kw):
        """ This function returns a repoze.bfg.router.Router object.  It
        is usually called by the PasteDeploy framework during ``paster
        serve``"""
        from myproject.models import get_root
        import myproject
        options = get_options(kw)
        return make_app(get_root, myproject, options=options)

   注意构造器函数接收 ``global_config`` 参数（这是配置文件的 ``[DEFAULT]`` 节所对应的一个键/值对字典），以及 ``**kw`` 参数，后者收集了另一组动态变化的键/值对——由构造器函数被你的 ``paster serve`` 指令和 :term:`PasteDeploy` 框架调用时、 ``[app:main]`` 节下的所有键/值对组成（除了 ``use=`` 设置）。

   我们生成的 ``MyProject.ini`` 文件看起来像这样::

    [DEFAULT]
    debug = true

    [app:main]
    use = egg:MyProject#app
    reload_templates = true
    debug_authorization = false
    debug_notfound = false

    [server:main]
    use = egg:Paste#http
    host = 0.0.0.0
    port = 6543

   这样， ``myproject.run:app`` 函数表示为entry point URI ``egg:MyProject#app`` (:ref:`MyProject_ini` 包含关于entry point URIs的更多信息，以及如何把它们关联到可执行对象），并且将收到键/值对 ``{'reload_templates':'true', 'debug_authorization':'false', 'debug_notfound':'false'}`` 。

#. 构造器自身被调用，所生成的 :mod:`repoze.bfg` ``app`` 函数看起来像下面这样::

    from repoze.bfg.router import make_app
    from repoze.bfg.registry import get_options

    def app(global_config, **kw):
        """ This function returns a repoze.bfg.router.Router object.  It
        is usually called by the PasteDeploy framework during ``paster
        serve``"""
        from myproject.models import get_root
        import myproject
        options = get_options(kw)
        return make_app(get_root, myproject, options=options)

   注意app函数从 ``myproject.models`` Python模块中导入 ``get_root`` 函数，然后导入“裸露的” ``myproject`` 包，并把 ``get_root`` 、 ``myproject`` 和 ``get_options(kw)`` 的运算结果以 ``options`` 关键字的方式传递给 ``repoze.bfg.router`` 模块的 ``make_app`` 函数。

   ``get_options`` 是一个从 :mod:`repoze.bfg` 包导入的函数，它允许用户传递框架相关的（framework-related：与应用程序相关的（application-related）相对）选项给应用构造器，也即此函数从 ``**kw`` 字典中提取框架相关的选项，并传递给构造器。例如，我们在配置中实际使用一个名为 ``reload_templates`` 的框架选项。注意我们没有在应用程序中使用这个选项，但事实上我们用 ``get_options`` 来解析 ``*kw`` 字典，并且接着把处理结果作为 ``options`` 参数传递给 ``make_app`` 。对框架来说， ``reload_templates`` 具有特殊的含义：如果其取值为 ``true`` ，我们将让应用程序在模板变化时自动重新加载模板。

   ``get_root`` 是传给 ``make_app`` 的第一个参数，并且它是可调用的，也即在每个请求中会被调用来检索应用程序的根（root）。它不会在启动时被调用，只有在出现请求的时候才会被处理。

   我们进入裸露的 ``myproject`` 包，这样回调函数 ``make_app`` 就知道去哪找 :term:`application registry` 文件（通常就是 ``configure.zcml`` ）。 ``make_app`` 将使用包的路径并且在这一文件系统目录中查找 ``configure.zcml`` 。如果你由于一些原因需要或者想要为你的应用程序载入一个不同的应用程序注册表（application registry）文件，你可以传递一个可选的 ``filename=`` 参数给make_app（例如， ``make_app(get_root, myproject, filename='meta.zcml', options=options)`` ）。如果文件名是绝对路径， ``package`` 参数会被忽略。

#. ``make_app`` 函数进行它的工作：找到并且解析作为应用程序注册表的ZCML文件（或者可能会从一个之前缓存的pickle文件获取应用程序注册表，比如 ``configure.zcml.cache`` ）。如果它没能解析一个或多个ZCML文件，一个 ``XMLConfigurationError`` 会被抛出（或者可能是另一个错误，如果只是因为ZCML文件不存在的话）。如果它成功了，一个 :term:`application registry` 会被创建，描述你应用程序的视图注册（view registrations）（以及其他注册）。一个 :term:`router` 实例会被创建，并且这一路由（router）是和应用程序注册表相关联的。路由描述你的应用程序——创建的应用程序注册表中的设置将被你的应用程序使用。

#. 发出一个 ``WSGIApplicationCreatedEvent`` 事件（参见 :ref:`events_chapter` 获取关于事件的更多信息）。

#. 假如没有错误，我们的 ``myproject`` ``app`` 函数返回由 ``make_app`` 创建的路由实例给PasteDeploy。只要PasteDeploy被涉及到，那就是另一个WSGI应用程序了。

#. PasteDeploy启动在 ``[server:main]`` 节中定义的WSGI *服务器* 。在我们的例子里，这会是 ``Paste#http`` 服务器（ ``use = egg:Paste#http`` ），并且它将在端口6543上（ ``port = 6543`` ）监听所有的网络接口（ ``host = 0.0.0.0`` ）。服务器自身代码将打印 ``serving on 0.0.0.0:6543 view at http://127.0.0.1:6543`` 。该服务器承载应用程序，并且应用程序被运行起来，等待接收请求。


