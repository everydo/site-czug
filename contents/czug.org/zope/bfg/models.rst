---
created: ''
creator: ''
description: 定义Model；其他的实现；Model图；位置感知Model接口；相关API
title: Models
---
==========
Models
==========

定义Model；其他的实现；Model图；位置感知Model接口；相关API

.. include:: include.rst
   
:翻译: book4e, book4e at gmail dot com
:校核: 潘俊勇

Model
==================
Model通常是定义在一个模块里面的一个简单 Python 类。多个Model实例构成了 :mod:`repoze.bfg` 将要漫游Traverse的图。

定义Model
----------------
这里是一个 blog Model的例子:

.. code-block:: python
   :linenos:

   import datetime

   class BlogEntry(object):
       def __init__(self, title, body, author):
           self.title = title
           self.body =  body
           self.author = author
           self.created = datetime.datetime.now()

Model本质上可以是任何 Python 对象。在上面的例子中，创建了一个 ``BlogEntry`` 类的实例作为Model。

Model实现接口
---------------------------------
Model可以选择去实现一个接口。这样就有机会在应用注册表中针对接口本身，而不是视图声明中的类来注册视图。比如，下面的代码在描述一个 blog 条目的同时也声明了这个 blog 条目实现了一个接口。

.. code-block:: python
   :linenos:

   import datetime
   from zope.interface import implements
   from zope.interface import Interface

   class IBlogEntry(Interface):
       pass

   class BlogEntry(object):
       implements(IBlogEntry)
       def __init__(self, title, body, author):
           self.title = title
           self.body =  body
           self.author = author
           self.created = datetime.datetime.now()

这个Model包含两样东西：Model定义（ ``BlogEntry`` 类），和附加到Model对象的接口（ ``IBlogEntry`` 类）。接口只是简单地为模型对象打上一个“类型”标签，它能在应用程序登记中被引用。一个模型对象可以实现零到多个接口，接口必须是一个 ``zope.interface.Interface`` 子类的实例。

你通过类范围内的 ``zope.interface.implements`` 函数来指出Model实现了接口。上面的 ``BlogEntry`` Model实现了 ``IBlogEntry`` 接口。

参考 :ref:`views_chapter` 会很有趣，它告诉你为什么要为Model提供接口。

定义Model实例图表
-----------------------------------

:mod:`repoze.bfg` 希望能够漫游Traverse一份Model实例图，因此 :mod:`repoze.bfg` 在这个图中的Model实例节点有如下的约定：

- 包含其它节点的节点（即“容器”节点）必须提供一个 ``__getitem__`` 方法，它解析一个字符串或者 unicode 名字为子对象，如果这个名字的子对象不存在， ``__getitem__`` 必须发出一个 ``KeyError`` ，如果这个名字的子对象存在，就应该返回这个子对象（另一个Model实例）。

- 不包含其它节点的节点（即“叶”节点）不必实现 ``__getitem__`` 方法，如果一定要实现，那么 ``__getitem__`` 方法必须发出一个 ``KeyError`` 错误。

.. _location_aware:

位置感知Model实例
------------------------------
针对Model实例图，为使 :mod:`repoze.bfg` 安全、便利的 URL 生成功能能够正常工作，图中所有节点应该有两个属性:: ``__parent__`` 和 ``__name__``。``__parent__`` 属性应该是该节点的父节点Model实例的一个引用， ``__name__`` 属性应该是它的父节点通过 ``__getitem__`` 得到的名字。

如果你不想为你的Model手工维护 ``__name__`` 和 ``__parent__`` 属性，:mod:`repoze.bfg`` 能帮你做到。如果你的“根”节点声明它实现了 ``repoze.bfg.interfaces.ILocation`` 接口，你就不必手工维护这些属性了。在漫游traverse的过程中，如果根节点说它实现了 ``ILocation`` 接口， :mod:`repoze.bfg` 将会把每个子节点打包进一个 ``LocationProxy`` 里面，逐级自动为它们动态分配 ``__name__`` 和 ``__parent__`` 。

如果你选择使用基于位置的动态分配 ``__parent__`` 和 ``__name__`` ，根节点就必须有一个值为 ``None`` 的 ``__parent__`` ，一个可以是任何值的 ``__name__`` ，并且还必须提供 ``repoze.bfg.interfaces.ILocation`` 接口。要做到这些，最简单的方式就是声明代表根节点的这个类 ``implements(ILocation)``:

.. code-block:: python
   :linenos:

   from repoze.bfg.interfaces import ILocation
   from zope.interface import implements

   class MyRootObject(object):
       implements(ILocation)
       __parent__ = None
       __name__ = ''

:mod:`repoze.bfg` 针对Model的 API 函数
-------------------------------------------------------
一个Model实例会作为上下文context参数提供给View，参考 :ref:`traversal_chapter` 获得关于Model如何成为上下文context的更多信息。

:ref:`traversal_module` 提供的 APIs 专门用于Model实例。这些函数能够用来查询一个Model的”路径“、模型的 URL、模型图中的根模型，等等。

:ref:`location_module` 提供的 APIs 专门用于Model实例。它们在Model图中行走，或者方便地在一个对象中定位另一个。

:ref:`security_module` 中的一些 APIs 接受一个Model对象作为参数。例如， ``has_permission`` API 接受一个context（一个Model对象）作为参数之一，从这个model或者它的祖先处获得acl信息。此模块中其它 APIs 也接受context作为参数，而且context对象一定是一个Model。
