---
created: ''
creator: ''
description: 这篇文章将带你快速开始玩转 Deliverance 。这个快速入门专为 Linux，Mac 或者 BSD 用户而写， Windows 用户就抱歉了。
title: 快速入门
---
快速入门
==========

本文的将展示如何快速开始玩转 Deliverance. 
This quickstart is written for a Linux, Mac, or BSD-using audience.  Sorry Windows users.

从virtualenv起步
------------------------

如果你已经熟悉 `virtualenv <http://pypi.python.org/pypi/virtualenv>`_ 和 `easy_install <http://peak.telecommunity.com/DevCenter/EasyInstall>`_ 你可略过本节。

我们将在一个隔离的环境里安装所有的东西。在这个入门向导里创建的目录之外的任何东西都不会受到影响————你可以直接删掉这个目录，如果你喜欢。
We'll be setting everything up in an isolated environment.  Nothing in this will effect anything on your system outside of the directories we set up in this tutorial -- so you can just delete the directory and forget about the whole thing if you don't like it.

首先我们需要获取 virtualenv 并创建一个独立环境。找到virtualenv.py,并运行指令：
The first thing we'll do is get virtualenv and create an environment.  Grab `virtualenv.py <http://svn.colorstudy.com/virtualenv/trunk/virtualenv.py>`_, and run::

    $ python virtualenv.py --no-site-packages DelivTest

这条指令会在DelivTest目录创建一个环境，并安装easy_install。在bin目录下还有一个新的python解析器。我们的所有东西都仅限于这一环境。在此环境中有自己的独立的库用于使用和安装。
This will create an environment in ``DelivTest/`` and install ``easy_install``.  There's also a new Python interpreter in ``DelivTest/bin/python`` -- anything in ``DelivTest/bin/`` will be tied to this environment.  It'll use libraries from the environment and install libraries into the environment.

注册环境变量
Note you can run ``source DelivTest/bin/activate`` to change ``$PATH`` so that everytime you run ``python``, ``easy_install``, etc., you'll be running it from the environment you've created.

安装软件
-----------------------
我们并不真正太多使用 ``easy_install`` , 我们将之需要安装另外一个安装器::

    $ DelivTest/bin/easy_install pip

我们用pip安装器来安装deliverance，这比easy_install有一个好处：可以立刻安装资源并确保各资源彼此适合。因此我们将一揽子地安装deliverance：
And we'll use the ``pip`` installer to install Deliverance.  This has the benefit over ``easy_install`` of installing all the source at once and with versions of the software that are known to work with each other.  So, we'll install the Deliverance bundle::

    $ DelivTest/bin/pip install http://deliverance.openplans.org/dist/Deliverance-snapshot-latest.pybundle

.. comment:

    This isn't really necessary anymore, I think:

    To install lxml, you have to have ``libxml2`` installed, and the ``-dev`` packages for ``libxml2`` and Python itself.  On Ubuntu this is ``libxml2-dev``, ``libxslt1-dev``, and ``python2.5-dev``.

This can take a long time to crunch.  On a Mac you must have the developer tools installed.

如果常规安装过程失败: buildout
--------------------------------------

For some people on some machines, you may find that the normal installation fails.  Or you might just like buildout.  If you do, here's an example of a ``buildout.cfg`` file for building Deliverance (from Martin Aspeli)::

  [buildout]
  parts = 
      lxml
      server
  develop = 
      src/Deliverance
  versions = versions

  [versions]
  lxml = 2.1.2

  [lxml]
  recipe = z3c.recipe.staticlxml
  egg = lxml == 2.1.2
  force = false

  [server]
  recipe = zc.recipe.egg
  eggs =
      lxml
      PasteScript
      Deliverance
  interpreter = py

创建一个配置
------------------------

We have the software installed, but not the configuration to run it.  To create the configuration run::

    $ DelivTest/bin/paster create -t deliverance DelivTest
    Selected and implied templates:
      deliverance#deliverance  Basic template for a deliverance-proxy setup

    Variables:
      egg:      TestEnv
      package:  testenv
      project:  TestEnv
    Enter host (The host/port to serve on) ['localhost:8000']: 
    Enter proxy_url (The main site to connect/proxy to) ['http://localhost:8080']: 
    Enter proxy_rewrite_links (Rewrite links from sub_host?) ['n']: 
    Enter password (The password for the deliverance admin console) ['']: test
    Enter theme_url (A URL to pull the initial theme from (optional)) ['']: http://mysite.com
    Creating template deliverance
    ...

It will ask you about some questions:

``host``:
    The host that Deliverance will serve from.  Note ``localhost`` (or 127.0.0.1) means that you can only connect from the machine itself.  If you want it to be externally visible use 0.0.0.0.
``proxy_host``:
    This is the location where all requests will go to.  ``http://localhost:8080`` is a common default for servers.  You can also give a remote host and a path, like ``http://mysite.com/blog``
``proxy_rewrite_links``:
    If you are proxying to a site that doesn't really expect you to be proxying to it, the links will probably be broken.  You can give Y here to turn on link rewriting.  It's not 100% perfect (e.g., links put into Javascript), but it can be good for experimenting.
``password``:
    The password to access the logging console.  The username is always ``admin``.  You can add or update logins later.
``theme_url``:
    If you want to base your theme on an existing page, you can give the URL of that page here.  It will fetch that page and all the CSS and images from that page, so you can locally edit them.  Otherwise an extremely simply theme will be setup.

Once you've entered these values, it will set up a basic layout with a file ``etc/deliverance.xml`` for the configuration, and the theme in ``theme/theme.html``.

You can start the server with::

    $ ./bin/deliverance-proxy ./etc/deliverance.xml

The site will be at ``http://localhost:8000`` and you can login at ``http://localhost:8000/.deliverance/login``

Once you have logged in you can look at ``http://localhost:8000/?deliv_log`` to see a log of everything Deliverance is doing (at the bottom of the page).

使用Buildout
--------------

Gaël Pasgrimaud wrote up `instructions on installing Deliverance using buildout and pip <http://www.gawel.org/weblog/en/2008/12/combine-zc.buildout-an-pip-benefits>`_.  The basic recipe looks like::

    [buildout]
    # the cache dir is used by buildout & pip
    download-cache = download
    parts = eggs

    [eggs]
    recipe = gp.recipe.pip

    # eggs installed by pip (also add the Deliverance bundle)
    install =
        Cython
        --install-option=--static-deps lxml==2.2alpha1
        http://deliverance.openplans.org/dist/Deliverance-snapshot-latest.pybundle

    # eggs installed by zc.recipe.egg
    eggs =
        Paste
        pyquery

This uses his `gp.recipe.pip <http://pypi.python.org/pypi/gp.recipe.pip>`_ buildout recipe.

编辑规则 Rules
-----------------

Here's where the quickstart ends for now; you'll have to read the rest of the documentation to understand the rules, specifically the `rule and theme <configuration.html#rule-and-theme>`_ section.

