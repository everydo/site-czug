---
created: ''
creator: ''
description: Traveral漫游和URL Dispatch之间的区别
title: 把URL映射到代码
---
====================
把URL映射到代码
====================

Traveral漫游和URL Dispatch之间的区别

.. _url_mapping_chapter:
.. include:: include.rst

:翻译: Tao Fei filia.tao at gmail dot com
:校核: 潘俊勇

将URL映射到代码
====================

很多流行的web框架使用 :term:`URL dispatch` (URL分派) 将一个特定的URL关联到一段代码。
(根据不同的偏好，你可能称这段代码为"控制器Controller"或者是 "视图View"）
这些系统允许开发者通过创建"urlconfs"或者"routes"(路由) ，
对URL的各个部分进行模式匹配，找到控制器/视图Python代码。
例如: `Django's URL dispatcher
<http://www.djangoproject.com/documentation/url_dispatch/>`_ 和 
:term:`Routes` URL 映射系统.

:mod:`repoze.bfg` 可支持通过 Route 来进行 URL分派.
URL分派是方便和直接的. 
当你限定你的应用只使用URL分派时，意味着你清楚你的应用可能生成或者响应的所有URL,并且将所有的URL匹配规则在一个单一的地方列出。 

类似 :term:`Zope`, :mod:`repoze.bfg` 还可以用一个同URL dispatch 有点不同的方法将URL映射到代码，那就是使用对象漫游Traverse图。
如果你希望你的URL能展现一个可能有各种异构项所组成的任意深度的层次结构,或者你需要对Model实例附加实例级安全声明(类似关系概念上的行级安全),
基于对象图漫游Traverse的分派方法就会很有用.

Traverse和URL分派之间的区别
----------------------------------------------

:term:`URL分派` 可以很方便的处理类似``http://example.com/members/Chris`` 的URL，
这个URL中``members``以后的部分代表了系统中的一个成员. 
你可以使用一个特定的视图匹配所有``members``下的内容.

例如，你配置了一个匹配以下URL模式的URL映射路由::

  archives/:year/:month/:day
  members/:membername

在这个配置中，有且只有2种类型的URL会匹配应用中的视图： 一个是以``/archives``开头,紧跟着表示年月日的路径元素。
另一个是以``/members``开头，并且紧跟着一个表示成员的名字的路径元素. 这是很简单的.

但是对于区分下面这样的一组URL，:term:`URL 分派` 就不是很好用了::

       http://example.com/members/Chris/document
       http://example.com/members/Chris/stuff/page

在基于URL-dispatch 的系统中,为了使这样的URL正常工作，我们将需要更多的模式匹配说明，甚至很多功能是不可能是实现的。 
比如，基于URL-dispatch 的系统不能很好的处理表达任意深度的层次关系的URL。

如果你需要区分清楚这些歧义的URL或者是任意深度的层次关系，图漫游可以工作的很好.
每一个URL分段，代表了对图中延某条边的一次漫游. 所以``http://example.com/a/b/c`` 
这样的URL可以看成在站点``example.com``上面通过边 ``a``, ``b`` , ``c`` 的一次图漫游


只要你愿意将你的应用模型看成一个可漫游的图, 提供(面向关系的概念上的)"行级"的安全将会变得很简单. 
你只需要对图中的每一个实例添加一个安全声明. 对于使用基于URL的分派的系统要实现这点就没有那么容易了.

图漫游比基于URL的分派复杂的多。然而这只是因为它需要构造和维护一个图，并且需要开发者从图漫游的角度考虑将URL映射到代码.

实际上，使用图漫游还是URL分派很大程度上看个人信仰的。
当你处理保存在关系数据库中的完全”扁平"的数据的时候，图漫游分派没有很大的意义。
然而，当你有一个 层次化的数据存储时，它就比基于URL的分派有优势了

:mod:`repoze.bfg` 两种方法都支持.你可以选用适合你的方案.

.. note::

   大部分现存的repoze.bfg 应用使用漫游来将URL映射到代码. 
   这个很大程度是由于repoze.bfg 和Zope历史渊源,并且其对需要声明细粒度的安全断言的应用程序很有帮助.
