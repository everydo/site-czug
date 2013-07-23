---
created: ''
creator: ''
description: 创建项目；安装新建的项目，准备开发；运行测试；运行应用；项目结构；MyProject项目和包；
title: 创建一个bfg项目
---
.. include:: include.rst

:翻译: Hu. Ziming hzmangel at gmail.com

创建一个 :mod:`repoze.bfg` 项目
====================================

您可以从 :mod:`repoze.bfg` 的示例程序生成器开始。这个生成器使用 :term:`Paste`
模板，这样就可以通过回答一些问题来创建新工程。

创建新工程
--------------------

在交互环境中切换到 :ref:`installing_chapter` 创建出的虚拟环境 (``bfgenv``) 目
录中，并运行 ``paster create`` 以开始一个 :mod:`repoze.bfg` 的 :term:`工程` 。

.. code-block:: bash
      :linenos:

   $ bin/paster create -t bfg_starter

``paster create`` 只会询问您一个问题：工程的 *名称* 。您需要提供一个仅有字母（
不可以包含空格）组成的字符串。下面是运行 ``paster create`` 的一个输出示例，其
中使用 ``MyProject`` 作为工程的名称：

.. code-block:: bash
   :linenos:

   $ bin/paster create -t bfg_starter
   Selected and implied templates:
     repoze.bfg#bfg  repoze.bfg starter project

   Enter project name: MyProject
   Variables:
     egg:      MyProject
     package:  myproject
     project:  MyProject
   Creating template bfg
   Creating directory ./MyProject
     Recursing into +package+
       Creating ./MyProject/myproject/
       Copying __init__.py to ./MyProject/myproject/__init__.py
       Copying configure.zcml to ./MyProject/myproject/configure.zcml
       Copying models.py to ./MyProject/myproject/models.py
       Copying run.py_tmpl to ./MyProject/myproject/run.py
       Recursing into templates
         Creating ./MyProject/myproject/templates/
         Copying mytemplate.pt to ./MyProject/myproject/templates/mytemplate.pt
       Copying tests.py_tmpl to ./MyProject/myproject/tests.py
       Copying views.py_tmpl to ./MyProject/myproject/views.py
     Copying +project+.ini_tmpl to ./MyProject/MyProject.ini
     Copying CHANGES.txt_tmpl to ./MyProject/CHANGES.txt
     Copying README.txt_tmpl to ./MyProject/README.txt
     Copying ez_setup.py to ./MyProject/ez_setup.py
     Copying setup.py_tmpl to ./MyProject/setup.py
   Running /Users/chrism/projects/repoze/bfg/bin/python setup.py egg_info

上面程序运行的结果就是在一个名为 ``MyProject`` 的目录下创建了一个工程。这个目
录是一个 :term:`setuptools` :term:`工程` 的目录，可以用它来创建一个 Python
setuptools 的发布版本。目录中的 ``setup.py`` 文件可以用于发布您的应用
(application)，或者安装您的应用用于开发或部署。在工程目录下，还会创建一个名为
``MyProject.ini`` 的示例 :term:`PasteDeploy` ``.ini`` 文件。您可以将这个
``.ini`` 文件作为 ``paster serve`` 命令的参数来运行您的应用。

``MyProject`` 的工程目录下包含有一个名为 ``myproject`` 的子目录（注意大小写的
区别），这是一个 Python 的 :term:`包` ，里面包含有很简单的 :mod:`repoze.bfg`
的示例代码。在这里加入您的模板以及用 Python 编写的应用代码。

.. note:: 您可以将工程名作为命令行参数传递给 ``paster create`` ，这样在后面创
   建工程的过程中就可以略过输入工程名这一步。例如： ``paster create -t bfg_starter MyProject`` 。

.. note:: 还有可用的模板是需要 :term:`ZODB` 支持的 :term:`Paste` 模板，您可以
   使用 ``paster create -t bfg_zodb`` 来使用这个模板，而非默认的
   ``bfg_starter`` 模板。


安装并开发新创建的应用
-----------------------------------------------------

切换到您工程所在的目录中，使用您在 :ref:`installing_chapter` 中创建的
:term:`虚拟环境 (virtualenv)` 调用下述命令，并将生成的 ``setup.py`` 作为参数
传递给下面列出的命令。

.. code-block:: bash
   :linenos:

   $ ../bin/python setup.py develop

省略命令执行的中间结果，您可以在最下面看到这么几行内容：

.. code-block:: bash
   :linenos:

   $ ../bin/python setup.py develop
   ...
   Finished processing dependencies for MyProject==0.1

上面的操作会将您应用的包安装到解释器中，这样它就可以被 WSGI 服务器找到
，并作为 :term:`WSGI` 应用运行。


测试您的应用
--------------------------------------

您可以使用如下的命令来为您的应用运行单元测试：

.. code-block:: bash
   :linenos:

   $ ../bin/python setup.py test -q

这是一个测试运行的示例输出：

.. code-block:: bash
   :linenos:

   $ python setup.py test -q
   running test
   running egg_info
   writing requirements to MyProject.egg-info/requires.txt
   writing MyProject.egg-info/PKG-INFO
   writing top-level names to MyProject.egg-info/top_level.txt
   writing dependency_links to MyProject.egg-info/dependency_links.txt
   writing entry points to MyProject.egg-info/entry_points.txt
   reading manifest file 'MyProject.egg-info/SOURCES.txt'
   writing manifest file 'MyProject.egg-info/SOURCES.txt'
   running build_ext
   ..
        ----------------------------------------------------------------------
   Ran 2 tests in 0.647s

   OK

在由 ``paster create`` 生成的工程中，这些测试可以在 ``test.py`` 模块中找到。模
块中包含有两个测试的示例。


运行工程
--------------------------------

一旦工程成功的以开发方式安装后，您只需要向 ``paster serve`` 命
令传入生成的 ``MyProject.ini`` 作为参数，即可运行应用。如下所示：

.. code-block:: bash
   :linenos:

   $ ../bin/paster serve MyProject.ini

这是运行的一个示例输出：

.. code-block:: bash
   :linenos:

   $ paster serve MyProject.ini
   Starting server in PID 16601.
   serving on 0.0.0.0:6543 view at http://127.0.0.1:6543

在默认情况下，生成的 :mod:`repoze.bfg` 应用会监听 6543 端口。

.. note:: 在开发时，为 ``paster server`` 传入 ``--reload`` 参数是
   十分有用的。当您改动了工程中一个 Python 的模块的时候，服务器会自动重启，这
   会让开发变的更加容易，否则对于 :mod:`repoze.bfg` 下 Python 模块代码所进行的改
   动只有在服务器重启后才会生效。

.. note:: 在 :mod:`repoze.bfg` 启动后，它会尝试着去将缓存的
   :term:`应用注册表 (application registry)` 的内容写入 ``.cache`` 文件。在典
   型安装的情况下，缓存文件将会被命名为 ``configure.zcml.cache`` 并且存放在和
   应用的 ``configure.zcml`` 文件相同的目录中。这些临时的数据会稍稍加快您
   :mod:`repoze.bfg` 应用的启动速度（如果一个 ``.zcml`` 文件所依赖的文件都没有
   改动的话，就不需要重新解析存储在其中的 XML 数据）。您可以在需要的时候删除这
   个文件，不过它会被重新创建出来。如果一个 ``.cache`` 文件由于文件系统的权限
   而不能写入，那么 :mod:`repoze.bfg` 将会在每次启动的时候都去解析 ``.zcml`` 
   文件。

浏览应用
-----------------------

在浏览器中浏览 ``http://localhost:6543/`` ，您将会看到： ::

  Welcome to MyProject

这是一个默认的页面，任何由 ``paster create`` 新生成而且没有做任何改动的工程都
会显示它。

工程结构
---------------------

前面生成的 :mod:`repoze.bfg` 是一个 setuptools 的 :term:`工程` (工程名为
``MyProject`` )，它包含一个 Python 的 :term:`包` （包的名字 *也* 是
``myproject`` ，只是字母是小写的而已； 即 paster 模板在工程中生成了一个同名的
包，它们之间的区别仅仅是字母的大小写不同）。

``MyProject`` 工程的目录结构如下所示： ::

  MyProject/
  |-- CHANGES.txt
  |-- README.txt
  |-- ez_setup.py
  |-- myproject
  |   |-- __init__.py
  |   |-- configure.zcml
  |   |-- models.py
  |   |-- run.py
  |   |-- templates
  |   |   `-- mytemplate.pt
  |   |-- tests.py
  |   `-- views.py
  |-- MyProject.ini
  `-- setup.py

``MyProject`` :term:`工程`
---------------------------------

``MyProject`` :term:`工程` 是用于发布及部署您应用的包装器 (wrapper) 。它不仅包
含有用于表示应用的 ``myproject`` :term:`包` ，还有用于描述，运行以及测试应用的
一些文件。

#. ``CHANGES.txt`` 描述了您对应用所做的改动，可以很方便的用
   :term:`ReStructuredText` 格式编写这个文件。

#. ``README.txt`` 简要的介绍了整个应用。它也是使用:term:`ReStructuredText` 格
   式编写的。

#. ``ez_setup.py`` 是用来安装 :term:`Setuptools` 的，如果用户没有安装这个工具
   ， ``setup.py`` 将会负责安装。

#. ``MyProject.ini`` 是一个 :term:`PasteDeploy` 配置文件，可以用来运行应用。

#. ``setup.py`` 是用来测试与发布应用的工具，它是一个标准的 :term:`setuptools`
   ``setup.py`` 文件。

我们不会对 ``CHANGES.txt`` 或 ``README.txt`` 文件做具体的描述。
``ez_setup.py`` 只是在用户想要安装应用但却没有安装 :term:`Setuptools` 的情况下
才会被 ``setup.py`` 调用。由于它只会被 ``setup.py`` 使用，所以我们在这篇文档中
也不会对它进行具体描述。

.. _MyProject_ini:

``MyProject.ini``
~~~~~~~~~~~~~~~~~

``MyProject.ini`` 文件是 :term:`PasteDeploy` 的配置文件。在使用 ``paster
server`` 运行一个应用时，它会被用来指定将要运行的应用，以及这个应用运行时的一
些选项。

由工具生成的 ``MyProject.ini`` 文件的内容可能是：

.. code-block::
   :linenos:

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

文件包含有许多"小节"，如 ``[DEFAULT]``, ``[app:main]``, 以及 ``[server:main]``
。 ``[DEFAULT]`` 一节包含的是将会被所有应用分享的一些全局参数。默认的，它会包
含一个值被设成 ``true`` 的关键字 ``debug`` 。许多组件会根据这个关键字的取值来
决定是否需要进入"调试"模式。 ``repoze.bfg`` 和生成的示例程序不会受这个参数影响
。

``[app:main]`` 小节用于配置您的应用。从名字可以看出，它配置的是名为 ``main``
的应用（因为是应用，所以需要在前面加上 ``app`` 的前缀，即为 ``app:main`` ），当使用
``paster server`` 运行这个配置文件时，这会是默认运行的应用。 ``main`` 通常就是用来
表示默认的应用。

在 ``[app:main]`` 一节中，一定需要设置 ``use`` 关键字。这个值用于将
:term:`setuptools` 的 :term:`入口点 (entry point)` 设置于 ``MyProject#app`` 上
（在 ``egg:MyProject#app`` 中的前缀 ``egg`` 用以指定入口点的 *URI* ，它表示
"scheme" 是 "egg"；目前还没有别的 "scheme"，所以在目前的情况下， ``egg:`` 前缀
的作用不是很大）。

.. note::

   这一部分的配置可能会让人比较不解，所以让我们把它说明的更清楚一些。首先看看
   为这个工程生成的 ``setup.py`` 文件。在文件的 ``entry_point`` 一行可以看到它
   指向一个很像 ``.ini`` 文件的字符串，这个字符串实际上表示了一个包含有
   ``[paste.app_factory]`` 节的 ``.ini`` 文件。在这一节中还有一个名为 ``app`` （
   入口点的名字）的关键字，它的值是 ``myproject.run:app`` 。 ``app`` 是
   ``use`` 一节中 ``egg:MyProject#app`` 所指向的应用。这个值是一个 Python 风格
   的"以点分隔名称"的路径，它指向 ``myproject`` 包中的 ``run.py`` 模块。

   在英语中，这个入口点可以被认为是 ``MyProject`` 工程中的 "Paste application
   factory" （这个工程的入口点名称是 ``app`` ，它指向 ``mypackage.run`` 模块中
   的一个函数）。 如果您打开 ``myproject`` 包中的 ``run.py`` 文件，您会看到一
   个 ``app`` 函数。在使用 ``paster server`` 命令运行应用时，这个函数会去调用
   :term:`PasteDeploy` 。它接受一个全局的配置对象 (configuration object) 并且
   *返回* 应用的一个实例。

``use`` 关键字是唯一需要在 ``[app:main]`` 一节中指定的关键字，除非您更改了在
``MyProject#app`` 入口点中指定的可调用部分 (callable) 以让其可以接受更多的参数
：您加在这一节中的其它配置会以关键字参数的形式传递给这个入口点（ ``run.py`` 模
块中的 ``app`` ）指定的可调用部分。您可以通过在这一节中加更多的设置以将启动时
间作为参数传递给应用 (You can provide startup-time configuration parameters to
your application by requiring more settings in this section.)

``[app:main]`` 一节中的 ``reload_templates`` 关键字是 :mod:`repoze.bfg` 特有的
。如果它的值被设置为 ``true`` ，那么不需要重启应用就可以看到 :term:`Chameleon`
和 XSLT 模板的改动，查看 `reload_templates_section` 以获取更多信息。

.. warning:: 对于最终发布用于产品的应用而言， ``reload_templates`` 选项是应该
   关闭的，因为当它打开时，会降低模板渲染的速度。

在这一节中，可能还有许多其它的设置可以用于调试 :mod:`repoze.bfg` 应用。请查阅
:ref:`environment_chapter` 以获取更多关于这一节的信息。

配置文件中 ``[server:main]`` 一节用于配置一个监听于所有网络接口 (``0.0.0.0``)
6543 端口的 WSGI 服务器。 ``Paste#http`` 服务器会为每个请求新开一个线程。

.. note::

  通常而言， ``repoze.bgf`` 应用是线程感知 (threading-aware) 在。
  ``repoze.bfg`` 的应用不需要一定是非阻塞的因为每个应用都会运行于服务器提供的
  独立线程中。

如果想了解更多可以写入 ``.ini`` 文件的信息，诸如其它应用， :term:`middleware`
以及 alternate 服务器的信息，请查阅 :term:`PasteDeploy` 的文档。

``setup.py``
~~~~~~~~~~~~

``setup.py`` 文件是 :term:`setuptools` 的安装文件。它一般是直接由命令行运行以
完成特定的功能，如测试您的应用，打包以及发布您的应用。


.. note::

  ``setup.py`` 是 Python 开发者用来发布他们的可重用代码的事实上的标准。您可以
  查阅 :term:`Setuptools` 文档以获取更多关于 ``setup.py`` 的内容以及使用。

生成的 ``setup.py`` 文件内容可能如下：

.. code-block:: python
   :linenos:

   import os

   from ez_setup import use_setuptools
   use_setuptools()

   from setuptools import setup, find_packages

   here = os.path.abspath(os.path.dirname(__file__))
   README = open(os.path.join(here, 'README.txt')).read()
   CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

   setup(name='MyProject',
          version='0.1',
          description='MyProject',
          long_description=README + '\n\n' +  CHANGES,
          classifiers=[
            "Development Status :: 3 - Alpha",
            "Intended Audience :: Developers",
            "Programming Language :: Python",
            "Topic :: Internet :: WWW/HTTP",
            "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
            "Topic :: Internet :: WWW/HTTP :: WSGI",
            "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
            ],
          author='',
          author_email='',
          url='',
          keywords='web wsgi bfg zope',
          packages=find_packages(),
          include_package_data=True,
          zip_safe=False,
          install_requires=[
                'repoze.bfg',
                ],
          tests_require=[
                'repoze.bfg',
                ],
          test_suite="myproject",
          entry_points = """\
          [paste.app_factory]
          app = myproject.run:app
          """
          )

文件的开头导入并使用了 ``ez_setup`` ，用以将 :term:`Setuptools` 安装到用户的电
脑中。 ``setup.py`` 文件调用 setuptools 的 ``setup`` 函数，它会依据
``setup.py`` 的命令行参数完成一系列操作。

在这个函数调用的参数中，包含有您应用的信息。介绍所有关于 setuptools 的 setup 文件并不
是本文档所涉及的范围，但是我们会给出一个关于现有文件的简明说明。

您的应用的名字（可以是任何字符串）在 ``name`` 字段中指定。版本号会在
``version`` 中设置。 ``description`` 字段用于存放一段简短的介绍，而
``long_description`` 通常是将 README 文件和 CHANGES 文件的内容放在一起。
``classifiers`` 字段是一个 `Trove
<http://pypi.python.org/pypi?%3Aaction=list_classifiers>`_ 分类的列表用以描述
应用。 ``author`` 和 ``author_email`` 是文本字段，应该不需要更多解释了吧。
``url`` 用以指向您应用的 URL （如果有的话）。 ``packages=find_packages()`` 指
定了打包时工程中所有的包都会被处理。 ``include_package_data`` 会在打包时加入非
Python 的内容（前提是它们是在版本控制仓库中的）。 ``zip_safe`` 表示这个以压缩的
egg 文件来分发这个包是不安全的（它会被解压为一个目录，这会很方便）(不是很确定)。
``install_requires`` 和 ``tests_require`` 表示这个包依赖于 ``repoze.bfg`` 包。
``test_suite`` 所指的包存储了所有的测试用例。在讨论中我们解读了一遍
``entry_point`` 所指的 ``MyProject.ini`` 文件，这个文件会指定我们应用的
``app`` 入口点。

通常，只有在您需要将应用发布给别人或者为您的应用加上版本控制时，才需要考
虑 ``setup.py`` 文件的内容。您可以试试下面的命令看看会发生什么有趣的事情：::

  python setup.py sdist

上面的命令会在您的 ``dist`` 子目录下生成一个压缩包，包的文件名是
``MyProject-0.1-tar.gz`` 。您可以将这个压缩包发给其他想尝试您的应用的人。

.. note::

   在默认情况下， ``setup.py sdist`` 不会将非 Python 的源代码放入压缩包中。这就
   是说，在现在的情况下， ``template`` 目录下的 ``mytemplate.pt`` 文件是不会被
   加入压缩包中的。为了避免这种情况，把您所有想要发布的文件都放到一个版本控制的
   仓库中，如 Subversion 。此后您再运行 ``setup.py sdist`` 时，所有放在版本控制
   系统仓库中的文件都会被放到压缩包中。

``myproject`` :term:`包`
---------------------------------

``myproject`` :term:`包` 是 ``MyProject`` :term:`工程` 的一部分，它包含有：

#. ``__init__.py`` 表明这是一个 Python 的 :term:`包` 。通常这是一个空文件，仅
   仅在文件的开头写上一行注释。

#. ``configure.zcml`` 是 :term:`ZCML` 文件，它在视图 (view) 的名称与模块类型间
   建立映射关系。这也被称为 :term:`应用注册表 (application registry)` 。

#. ``models.py`` 是模块，包含有 :term:`模块` 的代码。

#. ``run.py`` 模块包含有帮助用户运行应用的代码。

#. ``templates`` 目录包含有 :term:`Chameleon` （或其它类型的）模板。

#. ``test.py`` 模块包含有应用的单元测试代码。

#. ``views.py`` 模块包含有应用的视图代码。

这些都是在 ``paster`` 模板中内置的： :mod:`repoze.bfg` 对您的文件命名方式没有
任何特殊要求。

``configure.zcml``
~~~~~~~~~~~~~~~~~~

``configure.zcml`` 是 ;term:`应用的注册表(application registry)` 。它看起来是
这样的：

.. code-block:: xml
   :linenos:

   <configure xmlns="http://namespaces.repoze.org/bfg">

      <!-- this must be included for the view declarations to work -->
      <include package="repoze.bfg.includes" />

      <view
         for=".models.MyModel"
         view=".views.my_view"
         />

   </configure>

#. 第 1-3 行提供了配置语言的根节点和命名空间。
   ``http://namespaces.repoze.org/bfg`` 是默认的 XML 命名空间。一些第三方的库可能
   需要其它的命名空间。

#. 第 6 行通过直接包含 ``repoze.bfg.includes`` 包初始化了 :mod:`repoze.bfg` 相
   关的配置。这就把 ``repoze.bfg.includes`` 包（参见 :mod:`repoze.bfg` 的源代
   码）中所有的内容都放到 ``configure.zcml`` 中了。

#. 第 8-11 行注册了一个单独的视图。这是一个 ``for`` 模块对象，它是 ``MyModel``
   类的一个实例。 ``view`` 属性指向一个用以处理视图中所有逻辑的 Python 函数。
   注意，无论是 ``for`` 属性还是 ``view`` 属性都是以一个句点 (period) 开始的。
   所有以句点开头的名称都表示这是一个快捷方式，它指向与 ``configure.zcml`` 在
   同一个文件夹的 :term:`包` 中的相关文件。在我们的工程中，因为
   ``configure.zcml`` 文件是在 ``mypackage`` 包中，所以 ``.models.MyModel`` 也
   可以被拼为 ``myproject.models.MyModel`` （以 Python 路径方式表示的
   ``MyModel`` 类的完整路径）。类似，快捷方式 ``.views.my_view`` 可以被替换为
   ``myproject.views.my_view`` 。

``views.py``
~~~~~~~~~~~~

在 `repoze.bfg` 应用中，许多繁重的工作是由 *视图* 来完成的。 :term:`视图` 是模
块中的内容与返回给浏览器的 HTML 代码的桥梁。

.. code-block:: python
   :linenos:

   from repoze.bfg.chameleon_zpt import render_template_to_response

   def my_view(context, request):
        return render_template_to_response('templates/mytemplate.pt',
                                           project = 'myproject')

#. 第 3-5 行将 ``my_view`` 注册为一个视图。 ``configure.zcml`` 指明了类
   ``MyModel`` 实例的默认 URL 使用 ``my_view`` 函数处理。

   函数需要两方面的信息： :term:`上下文 (context)` 和 :term:`请求 (request)` 
   。*上下文* 是由 :term:`traversal` （或由 :term:`URL dispatch` ）组成的
   :term:`模块 (model)` 。 *请求* 是 :term:`WebOb` 类的一个实例，它表示由浏览
   器发给服务器的请求。

#. 视图渲染 :term:`Chameleon` 模板并且返回一个结果作为 :term:`响应 (response)`
   。注意由于我们在 ``MyProject.ini`` 中设置了 ``reload_templates = true`` ，
   所以模板每次改动后都会重新载入，这样您无需重启应用就能看到您模板改动的结果
   。在开发过程中，这会十分方便。如果这个属性被设置为 ``false`` （或者这个属性
   没有在配置文件中列出），那么您每次都需要重启应用才能看到模板改动的结果。对
   于发布出去的应用，您应该把这个值设置为 ``false`` ，这样能加快渲染模板的速度
   。

.. note::

   这个例子使用的 ``render_template_to_response`` 是一个函数的快捷方式，如果您
   想要更好的控制传回的响应，请使用同样在 :ref:`template_module` 中介绍的
   ``render_template`` 函数。这样您可以创建您自己的 :term:`WebOb` 响应对象，使
   用 ``render_template`` 的结果作为您响应的消息体。在这个模块中还有一个名为
   ``get_template`` 的 API ，您可以用它在不渲染的情况下取得模板对象，这样您可以
   对程序有更好的控制。

.. _modelspy_project_section:

``models.py``
~~~~~~~~~~~~~

``models.py`` 模块为我们的应用提供了 :term:`模块 (model)` 数据，我们现在编写一
个 ``MyModel`` 来实现一些行为 (behavior) 。

.. code-block:: python
   :linenos:

   class MyModel(object):
        pass

   root = MyModel()

   def get_root(environ):
        return root

#. 第 1-2 行定义了 MyModel 类

#. 第 4 行定义了 root 元素为 MyModel 的一个实例

#. 第 6 行是一个会被 :mod:`repoze.bfg` 调用的函数，用来响应对于模块图 (module
   graph) 中 root 元素的请求。通常它会被命名为 ``get_root`` 。

在"实际"的应用中，root 元素不会是这么一个简单的对象。至少，它需要能够访问一些
持久的数据存储资源，例如数据库。 :mod:`repoze.bfg` 并不对您将要使用的数据存储
的方式做出任何假设，所以在这个示例性的应用中，使用 ``MyModel`` 的一个实例来表
示 root 元素。

``run.py``
~~~~~~~~~~

我们需要一个小的 Python 模块来配置我们的应用，并且让 :term:`PasteDeploy`
``.ini`` 文件知道这个模块。不过为了方便起见，同样允许在没有 PasteDeploy 配置文
件的情况下运行这个模块。

.. code-block:: python
   :linenos:

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

#. 第 1-2 行导入了将会在后面用到的 :mod:`repoze.bfg` 中的函数。

#. 第 4-12 行定义了一个从 :ref:`router_module` 返回 :mod:`repoze.bfg` Router 
   应用的函数。这即是说它会被 :term:`PasteDeploy` 框架调用，作为运行
   ``paste server`` 的结果返回。

``templates/mytemplate.pt``
~~~~~~~~~~~~~~~~~~~~~~~~~~~

工程中唯一的 :term:`Chameleon` 模板看上去是这样的：

.. code-block:: xml
   :linenos:

   <html xmlns="http://www.w3.org/1999/xhtml"
         xmlns:tal="http://xml.zope.org/namespaces/tal">
   <head></head>
   <body>
      <h1>Welcome to ${project}</h1>
   </body>
   </html>

当这个模板被渲染时，它会显示当前的工程名。它对应着 ``views.py`` 模块中的
``my_view`` 函数。视图函数可以访问和使用模板。

``tests.py``
~~~~~~~~~~~~

``tests.py`` 模块包含有应用的单元测试用例。

.. code-block:: python
   :linenos:

   import unittest

   from zope.testing.cleanup import cleanUp
   from repoze.bfg import testing

   class ViewTests(unittest.TestCase):

       """ These tests are unit tests for the view.  They test the
       functionality of *only* the view.  They register and use dummy
       implementations of repoze.bfg functionality to allow you to avoid
       testing 'too much'"""

       def setUp(self):
            """ cleanUp() is required to clear out the application registry
            between tests (done in setUp for good measure too)
            """
            cleanUp()
            
       def tearDown(self):
            """ cleanUp() is required to clear out the application registry
            between tests
            """
            cleanUp()

       def test_my_view(self):
            from myproject.views import my_view
            context = testing.DummyModel()
            request = testing.DummyRequest()
            renderer = testing.registerDummyRenderer('templates/mytemplate.pt')
            response = my_view(context, request)
            self.assertEqual(renderer.project, 'myproject')

   class ViewIntegrationTests(unittest.TestCase):
        """ These tests are integration tests for the view.  These test
        the functionality the view *and* its integration with the rest of
        the repoze.bfg framework.  They cause the entire environment to be
        set up and torn down as if your application was running 'for
        real'.  This is a heavy-hammer way of making sure that your tests
        have enough context to run properly, and it tests your view's
        integration with the rest of BFG.  You should not use this style
        of test to perform 'true' unit testing as tests will run faster
        and will be easier to write if you use the testing facilities
        provided by bfg and only the registrations you need, as in the
        above ViewTests.
        """
        def setUp(self):
            """ This sets up the application registry with the
            registrations your application declares in its configure.zcml
            (including dependent registrations for repoze.bfg itself).
            """
            cleanUp()
            import myproject
            import zope.configuration.xmlconfig
            zope.configuration.xmlconfig.file('configure.zcml', package=myproject)

        def tearDown(self):
            """ Clear out the application registry """
            cleanUp()

        def test_my_view(self):
            from myproject.views import my_view
            context = testing.DummyModel()
            request = testing.DummyRequest()
            result = my_view(context, request)
            self.assertEqual(result.status, '200 OK')
            body = result.app_iter[0]
            self.failUnless('Welcome to myproject' in body)
            self.assertEqual(len(result.headerlist), 2)
            self.assertEqual(result.headerlist[0],
                             ('content-type', 'text/html; charset=UTF-8'))
            self.assertEqual(result.headerlist[1], ('Content-Length',
                                                    str(len(body))))


示例的 ``rwara.py`` 文件包含有一个单独的单元测试用例以及一个单独的集成测试用例
。这两个用例会在您执行 ``setup.py test -q`` 时运行。您可以依自己的需求在其中加
入更多的用例。您不必为 :mod:`repoze.bfg` 编写测试用例，因为它只是用于方便开发
以及示例程序。


