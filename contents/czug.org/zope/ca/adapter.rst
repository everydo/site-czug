---
created: ''
creator: ''
description: 适配器是扩展对象功能的基础组件
title: 适配器
---
=============
适配器
=============

适配器是扩展对象功能的基础组件

.. contents:: 目录
.. sectnum::
   :prefix: 4.

:翻译: yuting cui yutingcui at gmail dot com
:原文: http://www.muthukadan.net/docs/zca.html#adapters

实现
====

这一节将会详细介绍适配器。就像前面说过的那样，Zope组件架构可以帮助程序员更有效的使用Python对象，适配器是这一架构中的一个基本组件。适配器组件是拥有完善接口定义的Python对象。

使用 `zope.component` 包中的 `adapts` 函数来声明一个类是适配器。下面是一个显式声明了接口的新的 `FrontDeskNG` 适配器::

  >>> from zope.interface import implements
  >>> from zope.component import adapts

  >>> class FrontDeskNG(object):
  ...
  ...     implements(IDesk)
  ...     adapts(IGuest)
  ...
  ...     def __init__(self, guest):
  ...         self.guest = guest
  ...
  ...     def register(self):
  ...         guest = self.guest
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

上面定义的是对应 `IDesk` 的适配器，这个适配器适用于 `IGuest` 对象 [#IGuest]_ 。 `IDesk` 接口由 `FrontDeskNG` 类所实现，因此，这个类的实例提供了 `IDesk` 接口。

.. [#IGuest] 译者注：这里的 `IGuest` 就是适配者 adpatee

::

  >>> class Guest(object):
  ...
  ...     implements(IGuest)
  ...
  ...     def __init__(self, name, place):
  ...         self.name = name
  ...         self.place = place

  >>> jack = Guest("Jack", "Bangalore")
  >>> jack_frontdesk = FrontDeskNG(jack)

  >>> IDesk.providedBy(jack_frontdesk)
  True

刚才我们已经创建了一个名为 `FrontDeskNG` 的适配器，同样的，我们也可以创建用于处理不同房客登记流程的其他适配器。

注册
====

在使用一个适配器组件之前，你必须在一个也被称作站点管理器的组件注册表中注册该适配器。通常情况下，站点管理器是属于一个站点的。站点和站点管理器在开发Zope 3应用的时候会更重要，现在你只需要了解全局站点和全局站点管理器（或者叫组件注册表）就可以了。全局站点管理器是保存在内存之中，而局部站点管理器是持久化的。

在注册组件之前，首先需要获得全局站点管理器::

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk, 'ng')

为了获得全局站点管理器，需要调用 `zope.component` 包中的 `getGlobalSiteManager` 函数。事实上，全局站点管理器是作为 `zope.component` 包的一个属性（ `globalSiteManager` ）出现的，因此，我们也可以直接使用 `zope.component.globalSiteManager` 属性。像前面的例子所写的那样，把适配器注册成组件，需要调用组件注册表的 `registerAdapter` 方法。第一个参数是适配器的类或者工厂。第二个参数是一个由多个适配者（adaptee 也就是适配器所适配的对象）所组成的tuple；在这个例子中，只适配了 `IGuest` 对象。第三个参数是由该适配器组件所实现的接口。第四个参数是个可选参数，提供了该适配器的名称；如果给出了适配器名称，那么该适配器就是一个已命名适配器，如果没有给出适配器名称，那么该参数默认为一个空字符串（ `''` ）。

在上面的组件注册流程中，我们给出了适配者（adaptee）的接口和适配器所提供的接口，不过由于在适配器的实现中已经给定了这些细节，注册的时候完全没有必要再次指定这些参数，事实上，我们完全可以像下面这样注册这个适配器::

  >>> gsm.registerAdapter(FrontDeskNG, name='ng')

包里面提供了一些陈旧的注册API，我们要尽量避免使用这些API，这些陈旧的API函数都以 `provide` 开头，比如： `provideAdapter` 、 `provideUtility` 之类。在开发Zope 3应用的时候，可以使用Zope设置标记语言（ZCML）来注册组件，在Zope 3里，局部组件（持久化组件）可以通过Zope管理界面（ZMI）或者编程来注册。

前面我们使用 `ng` 来注册 `FrontDeskNG` ，同样的，我们也可以用不同的名字来注册其他组件，如果注册组件的时候没有提供名字，那么名字默认为空字符串。

.. admonition:: 注意 
     :class: note

  局部组件是持久化组件，而全局组件是保存在内存之中。全局组件是根据应用的设置进行注册的，而局部组件是在应用启动的时候从数据库中加载到内存的。

查询适配器
==========

从组件注册表中获取已注册的组件是通过 `zope.component` 包中的两个函数来完成的。一个是 `getAdapter` 另一个是 `queryAdapter` 。两个函数都接受相同的参数，不过如果无法找到组件，那么 `getAdapter` 会抛出 `ComponentLookupError` ，而 `queryAdapter` 会返回 `None` 。

可以像下面这样导入这两个方法::

  >>> from zope.component import getAdapter
  >>> from zope.component import queryAdapter

在上一节中，我们以'ng'为名字注册了一个组件，这个组件提供了 `IDesk` 接口，并且适配于房客对象（适配者 adaptee）。在本章的第一节中，我们创建了一个名为 `jack` 的房客对象。

下面就是如何获取一个既适配于 `jack` 对象的接口（ `IGuest` ），又提供了 `IDesk` 接口，同时被命名为 `ng` 的组件的例子。在这里， `getAdapter` 和 `queryAdapter` 的作用是一致的::

  >>> getAdapter(jack, IDesk, 'ng') #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>
  >>> queryAdapter(jack, IDesk, 'ng') #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>

就像你所看到的这样，第一个参数是适配者（adaptee），然后是组件应该提供的接口，最后是适配器组件的名字。

如果我们试图查找一个有相同的接口和适配者（adaptee）但是使用一个没有被注册过的名字的组件，那么查询会失败，下面是这两种方法的在这种情况下的不同结果::

  >>> getAdapter(jack, IDesk, 'not-exists') #doctest: +ELLIPSIS
  Traceback (most recent call last):
  ...
  ComponentLookupError: ...
  >>> reg = queryAdapter(jack,
  ...           IDesk, 'not-exists') #doctest: +ELLIPSIS
  >>> reg is None
  True

就像上面所写的那样，在查找失败的时候， `getAdapter` 抛出一个 `ComponentLookupError` 异常，而 `queryAdapter` 返回 `None` 。

第三个参数，也就是组件的注册名，是可选项。如果没有提供第三个参数，那么这个参数默认为空字符串。由于之前我们没有用空字符串注册组件， `getAdapter` 会抛出 `ComponentLookupError` ，类似的， `queryAdapter` 会返回 `None` ，下面请自己尝试一下::

  >>> getAdapter(jack, IDesk) #doctest: +ELLIPSIS
  Traceback (most recent call last):
  ...
  ComponentLookupError: ...
  >>> reg = queryAdapter(jack, IDesk) #doctest: +ELLIPSIS
  >>> reg is None
  True

在这一节中，我们学习了如何注册一个简单适配器和如何从组件注册表中获取这个适配器。这类适配器被称为简单适配器是因为它只适配于一个适配者（adaptee）。如果一个适配器适配于多个适配者（adaptee），那么这个适配器被称为多重适配器。

利用接口来获取适配器
====================

我们可以利用接口来直接获取适配器，不过这种方式只能获取未命名简单适配器。第一个参数是适配者（adaptee），第二个参数是一个关键字参数，如果适配器查找失败，那么就会返回第二个参数::

      >>> IDesk(jack, alternate='default-output')
      'default-output'

调用时可以忽略关键字名::

      >>> IDesk(jack, 'default-output')
      'default-output'

如果没有给出第二个参数，那么会抛出 `TypeError` ::

      >>> IDesk(jack) #doctest: +NORMALIZE_WHITESPACE +ELLIPSIS
      Traceback (most recent call last):
      ...
      TypeError: ('Could not adapt',
      <Guest object at ...>,
      <InterfaceClass __builtin__.IDesk>)

下面我们采用无命名方式来注册 `FrontDeskNG`::

      >>> gsm.registerAdapter(FrontDeskNG)

在简单的情况下，可以使用接口来获得适配器对象。

适配器模式
==========

在Zope组件架构中的适配器概念和《设计模式》一书中的经典 **适配器模式** 是非常类似的；但是，ZCA中的适配器的设计应用目标要比 **适配器模式** 广泛的多。 **适配器模式** 的目的是把一个类的接口转换为客户需要的另一个接口，这可以使得本来不兼容的几个类在一起工作。但是在《设计模式》一书中的“设计动机”一节中，GoF提到：“通常情况下，适配器需要负责提供适配类没有提供的功能”。ZCA的适配器更多的着眼于为适配对象（适配者 adaptee）增加功能而不是创建新的接口。ZCA的适配器允许适配器类对象通过增加方法的方式来扩展功能（值得一提的是，在ZCA的早期设计阶段， **适配器** 被称为 **特性** ——Feature） [#Feature2Adapter]_

.. [#Feature2Adapter] 讨论把 **特性** 改名为 **适配器** 的帖子： http://mail.zope.org/pipermail/zope3-dev/2001-December/000008.html

在上面一段文字中，引用了Gang of Four的书中的一段文字，那段话中写到：“……适配类没有提供的……”。但是在下面一句话中，我使用了“适配对象”来替代“适配类”。这是因为GoF在书中描述了根据实现不同区分的两种适配器，一种是 **类适配器** 另一种则是 **对象适配器** 。类适配器采用多重继承来把一个接口适配为另外一个，而对象适配器依赖于对象组合来完成适配。ZCA的适配器采用了对象适配器模式，并且采用委托（delegation）模式作为组合机制。GoF的面向对象设计第二原则就是：“倾向于对象组合而不是类继承”，关于这一话题的更详细介绍请参考《设计模式》一书。

ZCA适配器的主要优势就是在于明确组件的接口和组件注册表。ZCA的适配器组件都在组件注册表中进行过注册，客户对象可以在需要的时候根据名字和接口来查找这些适配器。
