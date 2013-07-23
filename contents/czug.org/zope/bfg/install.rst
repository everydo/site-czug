---
created: ''
creator: ''
description: 如何安装？创建Virtaulenv并安装；安装了什么？采用buildout安装
title: 安装bfg
---
.. include:: include.rst
.. _environment_chapter:

安装 :mod:`repoze.bfg`
=======================

:翻译: vbarter yzcaijunjie@gmail.com

如何安装
---------

你需要 `Python <http://python.org/>`_ 2.4或更高版本来运行 :mod:`repoze.bfg`. 在Python2.4.5, Python2.5.2和Python2.6上都已测试通过. 最新的 :mod:`repoze.bfg` 发布版本是运行在Python2.4, 在Python2.4之前的版本上是无法运行repoze.bfg, 同时也不支持Python3.X.

.. warning::

   为了成功安装 :mod:`repoze.bfg` , 你需要有可编译C代码的环境, 可参考在系统上如何安装 ``gcc`` 的文档. 另外, python的开发库和 ``lixbml2`` , ``libxslt`` 开发库也要安装上. 在系统中安装上 ``python-devel`` , ``libxml2-devel`` 和 ``libxslt-devel`` 包即可满足这些条件. 同样, 你需要安装setuptools以便可以运行 ``easy_install`` 命令.

在写本文时, ``repoze.bfg`` 还不能安装在Windows上, 除非你安装了相关的的开发工具(如 *Visual C++*).

.. note::

   如果你想制作和维护一个windows版本的 :mod:`repoze.bfg` , 我们很欢迎. 本质上来说, :mod:`repoze.bfg` 运行在windows上是没有问题的, 但当前的开发者还没有使用这个平台. 如果你想尝试处理这个编译和维护任务, 请联系通过 `repoze.dev maillist <http://lists.repoze.org/listinfo/repoze-dev>`_ 联系我们.

创建一个Virtualenv
-------------------

推荐将 :mod:`repoze.bfg` 安装到 :term:`virtualenv` 中以便和已安装Python版本中的"系统"包相隔离. (同样, 也防止全局安装 :mod:`repoze.bfg` 后的包和你的系统Python出现兼容问题).

建立一个virtualenv来安装 :mod:`repoze.bfg` , 首先需要将 :term:`virtualenv` 包安装到你的Python中, 然后调用:

.. code-block:: bash
   :linenos:

   $ virtualenv --no-site-packages bfgenv
   New python executable in bfgenv/bin/python
   Installing setuptools.............done.

.. warning::

   使用 ``--no-site-packages`` 来产生virtualenv是关键的. 这个标记对运行 :mod:`repoze.bfg` 所需要的包提供了必要的隔离. 如果你不指定 ``--no-site-packages``. 有可能会使 :mod:`repoze.bfg` 不能正确安装到virtualenv中, 即使安装了, 由于你Python主目录下的包的某些原因, 也会运行不正确.

你可以执行virtualenv中 ``bfgenv`` 的bin目录下的任何命令.

在Virtualenv中安装 :mod:`repoze.bfg`
--------------------------------------

当你安装了 ``bfgenv`` virtualenv之后, 就可以通过在virtualenv( ``bfgenv`` )目录中使用如下命令来安装 :mod:`repoze.bfg`:

.. code-block:: bash
   :linenos:

   $ bin/easy_install -i http://dist.repoze.org/lemonade/dev/simple repoze.bfg

安装了什么
------------

当你使用 ``easy_install`` 安装 :mod:`repoze.bfg`, 多种Zope库, WebOb, Paste, PasteScript和PasteDeploy库将被安装.

另外, 下一节会介绍, 需要注册PasteScript(或者 *paster*)模板, 这样可以使得创建一个新 :mod:`repoze.bfg` 工程变得简单.


如果你通过 ``easy_install`` 不能安装(候选安装)
--------------------------------------------------------------

如果你因为 ``lxml`` 没有成功编译到系统上而导致使用 ``easy_install`` 不能安装 :mod:`repoze.bfg`. 你可以试试 `repoze.bfg buildout <http://svn.repoze.org/buildouts/repoze.bfg/trunk/README.txt>`_. 这个安装策略是对 ``libxml2`` 和 ``libxslt`` 源码编译了一个可兼容版本, 使的 ``lxml`` 可以不指向你系统中的包. 系统包和 ``lxml`` 版本之间的不兼容问题通常归咎于编译问题.

