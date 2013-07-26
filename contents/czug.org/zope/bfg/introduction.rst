---
created: ''
creator: ''
description: 和其他框架的相似性，为什么？
title: bfg介绍
---
===============
bfg介绍
===============

和其他框架的相似性，为什么？

.. include:: include.rst

:mod:`repoze.bfg` 介绍 
==============================

:mod:`repoze.bfg` 是一个pythonWeb框架。他最早受到了Zope发布器的启发，
使用了 :term:`Zope` 库来完成大部分的工作。
但bfg没那么多野心，其特性比任何一个Zope发布版本都少很多。

:mod:`repoze.bfg` 使用 :term:`WSGI` 协议来处理请求request和响应response
, 集成了 :term:`Zope`, :term:`Paste`, 和
:term:`WebOb` 库来构建一个简单的web对象发布框架。

和其他框架的相似性
----------------------------------

:mod:`repoze.bfg` 受到 Zope, Django, 和 Pylons 的启发.

:mod:`repoze.bfg` 的漫游(traversal)由Zope启发而来.  
和 Zope 2, Zope 3, 及 Grok 一样，
:mod:`repoze.bfg` 内部使用了 Zope组件架构 (Component Architecture,"CA"). 
但是，在典型的开发过程中，开发人员不需要太多和CA接触。
CA更多是被框架开发人员而不是应用开发人员所使用。
:mod:`repoze.bfg` 开发人员使用 :term:`ZCML` (一个 XML 派生语言) 来执行各种配置任务；
尤其是，和 Zope3 一样, 一个个 :term:`view` 函数和 :term:`model` 类型通过
ZCML关联在一起.  
通过使用一个名字叫做 :term:`repoze.bfg.convention` 的附加包，
现在也可以不使用 :term:`ZCML` ，而使用Python decorator来完成配置 :mod:`repoze.bfg` views.

和Pylons类似, :mod:`repoze.bfg` 几乎完全 策略自由 policy-free.  
他不断言使用哪个数据库，内置模板机制也仅仅是为了方便。
本质上，他只提供了一个把URL映射到
:term:`view` 代码的机制, 同时伴随一个调用这些views的约定.  
你可在自己的应用中自由使用满足你自己需求的第三方组件。
和Pylons一样, :mod:`repoze.bfg` 也严重依赖于 WSGI.

Django 文档声称 Django 是一个 "MTV" 框架，详见他们的 `FAQ
<http://www.djangoproject.com/documentation/faq/>`_.  
这对 :mod:`repoze.bfg` 也是相同的::

  Django appears to be a MVC framework, but you call the Controller
  the "view", and the View the "template". How come you don't use the
  standard names?

  Well, the standard names are debatable.

  In our interpretation of MVC, the "view" describes the data that
  gets presented to the user. It's not necessarily how the data looks,
  but which data is presented. The view describes which data you see,
  not how you see it. It's a subtle distinction.

  So, in our case, a "view" is the Python callback function for a
  particular URL, because that callback function describes which data
  is presented.

  Furthermore, it's sensible to separate content from presentation -
  which is where templates come in. In Django, a "view" describes
  which data is presented, but a view normally delegates to a
  template, which describes how the data is presented.

  Where does the "controller" fit in, then? In Django's case, it's
  probably the framework itself: the machinery that sends a request to
  the appropriate view, according to the Django URL configuration.

  If you're hungry for acronyms, you might say that Django is a "MTV"
  framework - that is, "model", "template", and "view." That breakdown
  makes much more sense.

:mod:`repoze.bfg` 的框架代码生成器
依照 `Django Book <http://www.djangobook.com/>`_ 所推荐的的目录结构，
生成非常相似的目录布局；
另外，根据上面的建议, 和Django一样， term:`view`, :term:`model` 和 
:term:`template` 概念被 :mod:`repoze.bfg` 所使用.

如果要深入了解 :mod:`repoze.bfg` 的一些概念, 去 :ref:`glossary` 看看定义清单。

为什么选择bfg? 
-------------------------------------

熟悉
    作为web开发人员，多年来，我们已经开始习惯于使用一个非常特殊的方式开发
    (尤其是使用Zope 2)。  而这个框架是适合我们大脑的实践经典
    （如何翻译？ a canonization of practices that "fit our brains"）.

简单
  :mod:`repoze.bfg` 试图成为一个 *"只为你吃的买单"* 的框架，只需要掌握部分知识，你便可快速变得高产；
  而不是 *"为每个人最后可能都会吃的预先买单"* 的那种框架，那种框架在你能真正高产前，
  会要求你完全理解非常多的概念和技术. :mod:`repoze.bfg` 在你开始写程序前，不强制要求你使用某个特殊的技术，
  我们力求你需要理解的核心概念最小化。我们扔掉了笨重的盔甲。

最小化 
  :mod:`repoze.bfg` 仅仅提供了最基本的概念: *URL映射到代码*, *模板*, 和 *安全性*.  
  框架除了这些就没有了：剩下的由你来提供。

文档 
  因为 :mod:`repoze.bfg` 这慢小，相对来说比较容易让文档保持最新，
  这对让新手跟上非常重要。我们的目标就是， :mod:`repoze.bfg` 中没有未经文档的东东。

速度
  :mod:`repoze.bfg` 意味着非常快，支持在当今一般的硬件上，为正确实现的真实应用，提供每秒100+请求。
  *硬件很便宜* 的咒语在你需要管理大量机器的情况下也会有限制：如果需要得少，你的麻烦就少很多。
