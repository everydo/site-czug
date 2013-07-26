---
created: ''
creator: ''
description: 概念和使用；2个例子
title: URL Dispatch
---
===================
URL Dispatch
===================

概念和使用；2个例子

.. include:: include.rst

.. _urldispatch_chapter:

:翻译: Wang Eric glitch.wang at gmail.com

URL分发
=================

尽管对于 :mod:`repoze.bfg` 的用户来说，依赖 :term:`漫游` (traversal)来映射URL到代码是一种常见的做法, :mod:`repoze.bfg` 也同样能利用 :term:`Routes` 框架来实现URL到代码的映射,这个过程被叫做 :term:`URL分发` . :term:`Routes` 框架是 
`Rails routes system <http://manuals.rubyonrails.com/read/chapter/65>`_ 的一个Python实现,利用它我们能以声明的方式把URL映射到代码.

.. note:: 在 :term:`Routes` 的术语(黑话)体系里，能够被(URL)映射到的代码被称为 *控制器* (controller)和 *action*.  但是这两个概念实际上并不存在于 :mod:`repoze.bfg` 中. 实际上当我们把一个URL的模式(pattern)映射到bfg的代码中时，我们是把它们映射到一个 :term:`视图` (view). 因此，在我们处理bfg中的Routes URL分发时,我们需要做一点小小的思维转换。一般而言，当我们在 :term:`Routes` 的语境中看到 *控制器* 时，应该在思维中把它转换为 :term:`视图` . *Actions* 在 :mod:`repoze.bfg` 中并不存在: 在其他的框架中，他们可能是指 *控制器类* (controller    class)中的方法,但是因为在 :mod:`repoze.bfg` 中视图仅仅是callable对象(通常是function), 而不是类,所以没有"action"这个概念的直接对应物.

在一个没有自然的层级结构的应用中，使用 :term:`URL分发` 而不是 :term:`漫游Traverse` 尤其有意义.
举个例子，如果应用中所有的数据都存在于关系型数据库中，并且数据库中并不存在自引用的表结构，不构成自然的层级结构，URL分发相较于URL漫游Traverse更易于使用，并且构建维护"扁平化"的数据的应用时，是一个更为自然的选择。

概念和使用
------------------

:mod:`repoze.bfg` 的urldispatch特性允许我们替换默认的 :term:`漫游Traverse` 规则,
在解析一个URL的时候， :term:`Routes` 的"mapper"对象可以优先获得这个URL，进行解析处理. 并且在必要的时候,
将解析URL的任务再一次交还给URL漫游Traverse.

为了达到这个目的， :mod:`repoze.bfg` 框架定义了一个模块 :mod:`repoze.bfg.urldispatch`,
这个模块包含一个 :class:`RoutesMapper` 类.
这个类的实例的功能与 :mod:`repoze.bfg` 的 ``get_root``
callable对象一样，并且可以通过它的connect方法, 对 *route mappings* 进行必要的配置.

``get_root`` 是由应用传递到 :mod:`repoze.bfg` 框架的一个callable对象,
bfg将通过它找到漫游TraverseURL图的"根"对象. 本质上 :class:`RoutesMapper` 就起到这个"root
callable"对象的作用. 当它作为这样一个callable存在时，它将根据 *路由映射表* (routes map)检查被请求的URL,
如果有URL匹配了表中的某一项，它将通过在这个路由信息项中查找到的信息, 调用一个与之对应的 :mod:`repoze.bfg` 的视图;
如果没有任何URL匹配， :class:`RoutesMapper` 将会进行一次"回退"操作，调用 ``get_root``
callable，这个对象是在(RoutesMapper)被构建的时候传递进来的,
这样我们的应用就会使用另外一个不同的"根"(可能是一个基于漫游Traverse的根). 通过正确的设置 :class:`RoutesMapper` ,
我们就可以将URL分发和URL漫游Traverse混合使用了.


.. note:: 请参阅 :ref:`modelspy_project_section`, 那里有一个简单的 ``get_root`` callable对象的例子.

使用单独的路由信息来配置一个 :class:`RoutesMapper` ，我们需要创建一个RoutesMapper对象的实例，调用它的 ``.connect`` 方法,
它的参数与创建"原始"的 :term:`Routes` 和 ``Mapper`` 对象一样. 请参见 `Setting up routes <http://routes.groovie.org/manual.html#setting-up-routes>`_ ,
那里有一些使用Routes的 ``Mapper`` 对象的示例. 当我们配置好它之后，就可以把它作为一个 ``get_root``
callable对象传递给 :mod:`repoze.bfg` 使用了.


当我们通过调用 ``.connect`` 方法，使用一个路由信息(route)来配置一个 :class:`RoutesMapper` 时,
我们将会传入一个名为 ``controller`` 的string型关键字参数.
这个参数应该与注册为 :mod:`repoze.bfg` :term:`视图` 的callable对象的 **名称** 相匹配,
而这个callable对象是作为一个 ``repoze.bfg.interfaces.IRoutesContext`` 类型的对象而注册的(通过一个ZCML配置项,
请参阅 :ref:`views_chapter` 获取更多关于配置bfg视图的信息). 当某一个URL匹配到某个路由信息时,
:class:`RoutesMapper` 将会动态创建出一个 `上下文` (context)对象,
这个(上下文)对象包含由mapper对象返回的所有的 :term:`Routes` 定义的的匹配参数，系统会把这个对象作为参数传入视图callable对象.


例子1
--------------


以下是一个配置 :class:`RoutesMapper` 作为 ``get_root`` callback使用的例子.

.. code-block:: python
   :linenos:

   from repoze.bfg.urldispatch import RoutesMapper

   def fallback_get_root(environ):
      return {}

   root = RoutesMapper(fallback_get_root)
   root.connect('ideas/:idea', controller='ideas')
   root.connect('users/:user', controller='users')
   root.connect('tags/:tag', controller='tags')

以上配置使mapper能够响应以下形式的URL::

  /ideas/<ideaname>
  /users/<username>
  /tags/<tagname>


在本例中mapper被用作一个 ``get_root`` 的回调, 当一个URL匹配 ``/ideas/<ideaname>`` 这种模式的时候,
注册为 ``repoze.bfg.interfaces.IRoutesContext`` 的名为'ideas'的视图将会被调用.
如果根据interface的类型或者名称无法找到一个视图, 一个错误将会被抛出。

传入视图对象的context对象是URL分发查找的结果，它是 ``repoze.bfg.urldispatch.RoutesContext`` 接口的实例.
我们可以重写这个行为, 只要把一个名为 ``context_factory`` 的关键字参数传入一个特定route的mapper的connect方法就可以了.
``context_factory`` 是一个callable对象, 这个对象能接受任意的关键字参数, 返回一个对象,
而这个返回的对象就是视图的context.


如果上面配置的路由信息不能匹配URL, 路由映射将会调用"回退"的 ``get_root`` callable对象.


例子2
--------------


下面的例子在 ``configure.zcml`` 中配置了一个 ``view`` 声明,
这个声明把一个在 :term:`Routes` 的URL分发中查找到的context对象分发到一个视图方法:

.. code-block:: xml
   :linenos:

   <view
      for="repoze.bfg.interfaces.IRoutesContext"
      view=".views.articles_view"
      name="articles"
      />

所有的从Routes的URL分发中找到的context对象都提供了 ``IRoutesContext`` 接口(动态创建的).
我们可以这样配置 ``RoutesMapper`` ：

.. code-block:: python
   :linenos:

   def fallback_get_root(environ):
      return {} # the graph traversal root is empty in this example

   class Article(object):
      def __init__(self, **kw):
          self.__dict__.update(kw)

   get_root = RoutesMapper(fallback_get_root)
   get_root.connect('archives/:article', controller='articles',
                   context_factory=Article)

   import myapp
   from repoze.bfg.router import make_app

   app = make_app(get_root, myapp)

这样的配置产生如下的效果: 当这个 :mod:`repoze.bfg` 应用运行时,
如果有URL匹配了 ``archives/:article`` 这个模式，视图 ``.views.articles_view`` 就会被调用,
调用的参数 :term:`context` 是一个 ``Article`` 类的实例, 这个 ``Article`` 的实例拥有一些属性,
这些属性来自Routes的路由字典(routing dictionary)中匹配的键值对, 而这些键值对则是跟请求相关的.

在本例中，当用户访问 ``/archives/something`` 时, context对象是一个Article类的实例,
它拥有一个 ``article`` 属性, 这个属性的值是 ``something`` .


更多的文档是示例
----------------------

URL-dispatch相关的API文档可以在 :ref:`urldispatch_module` 中找到.

`repoze.shootout <http://svn.repoze.org/repoze.shootout/trunk/>`_ 应用使用URL分发来响应"ideas", "users"和"tags" 页面.
