---
created: 2012-04-17 17:13:44
creator:
description: 
title: 命令行调测Pyramid（上）
---

=============================
命令行调测Pyramid（上）
=============================

跟原来Pylons 一个paster包办一切不同，Pyramid提供了一系列命令行工具用于项目管控和调测。

一、控制类指令
------------------

1. 从系统提供框架结构创建一个Pyramid应用 pcreate

系统提供了三种应用框架结构供选择，分别是alchemy、starter、zodb。如

pcreate -s starter MyProject

pcreate创建了一个应用之后，还需要用python setup.py develop建立开发环境。如果用了alchemy，还需要运行initialize_MyAlchemy_db之类的命令来初始化数据库。

2. 启动应用服务器 pserve

pserve 可以启动一个Pyramid应用，如serve development.ini。

常见的pserve参数如下：

- \--reload  开始文件变更监控，监测到文件变更即重启，开发时常用
- \--daemon  daemon方式启动服务，生产环境常用


3. 发起一次请求 prequest

prequest可以通过命令行直接发起一次请求，得到应用返回结果，而不需要启动应用服务器。prequest带两个参数，一个是配置文件，另一个是访问的URL（非quoted），如

prequest development.ini /

输出应用首页HTML页面。

在该命令配置文件参数之前，还可以加一些参数，如

-d ：显示应答的HTTP状态、HTTP Header，如 prequest -d development.ini /
--header：添加请求的HTTP Header参数，如 prequest --header=Host=example.com development.ini
-m：指定发送请求的方式，默认是GET，使用了POST方式的话，标准输入将成为POST body。如 prequest -mPOST development.ini / < somefile


二、侦测类命令
------------------

1. 查看匹配的视图 pviews

pviews 带两个参数，一个是配置文件名，如development.ini，可以在配置文件名后面加#main之类的应用配置节名（app:后面的那个，一般是main，不用写。在用了pipeline之后会有不一样的）。另一个是需要查看的view对应的URL。如

pviews developent.ini /

该命令输出：

.. code::

    URL = /

        context: <pyramid.traversal.DefaultRootFactory instance at 0x110801fc8>
        view name:

        Route:
        ------
        route name: home
        route pattern: /
        route path: /
        subpath:

            View:
            -----
            myproject.views.my_view

上面的例子只是找到了一个匹配的view。如果找到多个，也会逐个列出。


2. 查看路由配置 proutes

proutes接收一个参数，即配置文件（#应用配置节），如：

proutes development.ini

输出route名字，匹配规则，对应视图三列信息：

.. code::

    Name                Pattern                           View                    
    ----                 -------                           ----                    
    ___debug_toolbar/static/ /_debug_toolbar/static/*subpath <function <pyramid.static.static_view object at 0x101dd5ad0> at 0x101f69500>
    debugtoolbar.source /_debug_toolbar/source         <function ExceptionDebugView at 0x101f6d1b8>
    debugtoolbar.execute /_debug_toolbar/execute        <function ExceptionDebugView at 0x101f6d488>
    debugtoolbar.console /_debug_toolbar/console        <function ExceptionDebugView at 0x101f6d758>
    debugtoolbar.exception /_debug_toolbar/exception      <function ExceptionDebugView at 0x101f69e60>
    debugtoolbar.sql_select /_debug_toolbar/sqlalchemy/sql_select <function SQLAlchemyViews at 0x101f6da28>
    debugtoolbar.sql_explain /_debug_toolbar/sqlalchemy/sql_explain <function SQLAlchemyViews at 0x101f6dcf8>
    __static/       /static/*subpath               <function <pyramid.static.static_view object at 0x101e15290> at 0x101f6df50>
    home            /                              <function my_view at 0x101f6e2a8>

因为本例中，配置了debugtoolbar，所以会有很多debugtoolbar的路由定义。属于本应用的配置主要就是最后两条，_static/和home。


3. 查看tween，ptweens

tween插件是Pyramid中位于WSGI与Pyramid应用请求处理程序之间运行的一些代码段。ptweens可以查询系统所有配置的tweens，如

ptweens development.ini

输出：

.. code::

    "pyramid.tweens" config value NOT set (implicitly ordered tweens used)

    Implicit Tween Chain

    Position    Name                                                            
    --------    ----                                                            
    1.           INGRESS                                                         
    0           pyramid_debugtoolbar.toolbar_tween_factory                      
    1           pyramid.tweens.excview_tween_factory                            
    1.           MAIN                            


4. 交互式shell pshell

就像python的shell一样，Pyramid也有一个shell，它就是pshell，可以不用启动应用服务器来查看应用的内部信息。pshell带一个参数，即应用配置文件，如：

pshell development.ini

将会输出：

.. code::

    Environment:
      app          The WSGI application.
      registry     Active Pyramid registry.
      request      Active request object.
      root         Root of the default resource tree.
      root_factory Default root factory used to create `root`.

然后进入交互式shell命令模式。可以在这个shell模式下查看Pyramid中每个部件的状态、内容。python指令也都可以在这里使用。如

.. code::

    >>> dir(app)
    >>> app.root_factory
    >>> dir(request)
    >>> request.url

甚至可以构造一次访问请求

.. code::

    >>> from myproject.views import my_view
    >>> from pyramid.request import Request
    >>> r = Request.blank('/')
    >>> my_view(r)

将会输出my_view的返回结果（不是渲染后的页面）。

可以如同退出python shell一样退出pshell。


5. 扩展pshell的服务能力

pshell启动之后，仅有app、registry、request、root、root_factory这几个变量可以用，如果我们想一开启就载入更多的全局变量，也可以通过如下配置来完成（在ini配置文件中）：

.. code::

    [pshell]
    setup = myapp.lib.pshell.setup
    m = myapp.models
    session = myapp.models.DBSession
    t = transaction

这里setup是一个特殊的配置，它指向了一段pshell启动首先运行的程序，已方便pshell启动时加载一些应用特有的数据。如：

.. code::

    # myapp/lib/pshell.py
    from webtest import TestApp

    def setup(env):
        env['request'].host = 'www.example.com'
        env['request'].scheme = 'https'
        env['testapp'] = TestApp(env['app'])

上面程序中的env就是整个pshell的环境。pshell里面可以访问的变量都是这个字典中的一项。

经过以上的配置之后，我们启动pshell就可以看到多了：

.. code::

    Custom Variables:
      m            myapp.models
      session      myapp.models.DBSession
      t            transaction

Environment中也多了testapp.

现在就可以运行下面的命令了：

.. code::

    >>> testapp.get('/')
    >>> request.route_url('home')
