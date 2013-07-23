---
created: ''
creator: ''
description: 通过实例体验使用组件架构让程序变得灵活、可扩展、可重用
title: 实例
---

.. Contents::
.. sectnum::
   :prefix: 2.

:原文: http://www.muthukadan.net/docs/zca.html#an-example
:翻译: elias.soong at gmail dot com

序言
~~~~~~~~~~~~

让我们来考虑为住在酒店中的顾客进行注册的业务应用。用Python语言可以有很多种方法来实现这一需求。我们先来简单看看过程式的开发过程，然后是最基本的面向对象方式。当我们研究后一种开发方法时，我们将会看到如何从“适配器（adapter）”、“接口（interface）”这两种经典设计模式中获益。这将把我们带到Zope组件架构（Zope Component Architecture）的世界里。


过程式开发过程
~~~~~~~~~~~~~~~~~~~

在任何业务应用中，数据存储都是十分关键的。为了简单，这里使用一个Python字典来作为存储引擎。我们给这个字典生成唯一的id作为键，与之关联的值则是一个关于预订详细信息的字典。

  >>> bookings_db = {} #键：唯一的Id，值：存储细节信息的字典

这个例子的最小实现需要一个用来传递预订详情的函数，以及一个提供唯一id用作存储引擎字典键值的辅助函数。

我们可以像这样得到这个唯一的id::

  >>> def get_next_id():
  ...     db_keys = bookings_db.keys()
  ...     if db_keys == []:
  ...         next_id = 1
  ...     else:
  ...         next_id = max(db_keys) + 1
  ...     return next_id

就像你看到的那样，“get_next_id”函数的实现是十分简单的。这个函数取得键值的列表并且检查是否是一个空列表：如果列表为空，那么这就是我们的第一个预订，因此返回“1”；如果列表不为空，我们就给列表中的最大元素加1来作为函数的返回值。

现在我们将使用下面的函数来创建bookings_db字典的条目::

  >>> def book_room(name, place):
  ...     next_id = get_next_id()
  ...     bookings_db[next_id] = {
  ...     'name': name,
  ...     'room': place
  ...     }

酒店预订管理的应用需求可能会要考虑额外的数据：

  - 电话号码
  - 房间选项
  - 支付方式
  - ……

以及管理这些数据的代码：

  - 取消一个预订
  - 更新一个预订
  - 为房间付款
  - 数据持久化
  - 保证数据安全
  - ……

如果我们继续进行这个过程式编程的例子，我们将创建很多函数，并且在这些函数之间把数据传来传去。当需求改变或者增加时，代码将更难维护、Bug会更难发现和修正。

我们将在此结束我们关于过程式开发的讨论。使用对象能更容易地提供数据持久化、设计上的灵活性、以及代码的可测试性。


面向对象开发过程
~~~~~~~~~~~~~~~~~~~~~~~~

.. ??? should this paragraph talk about "creating an object for
    handling registration" or "creating a class to handle registration"?

我们关于面向对象设计的讨论将引入“类”来封装数据及管理数据的代码。

我们的主类是“FrontDesk”。FrontDesk或者其他它委派（delegate）的类将知道如何管理酒店的数据。我们将创建FrontDesk类的实例来把这些知识应用到运营酒店业务中去。

经验证明可以用对象来统一处理代码和数据两方面的需求，我们最后将给出一个更容易理解、测试和修改的设计。

让我们看看FrontDesk类的实现细节::

  >>> class FrontDesk(object):
  ...
  ...     def book_room(self, name, place):
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': name,
  ...         'place': place
  ...         }

在这一实现中，FrontDesk对象（也就是FrontDesk类的一个实例）是能够处理预订的。我们可以像这样来使用它::

  >>> frontdesk = FrontDesk()
  >>> frontdesk.book_room("Jack", "Bangalore")

任何实际项目都可能包括需求变更。在这个案例中，管理部门决定每个顾客都必须提供电话号码，因此我们必须修改代码。

我们可以给book_room方法增加一个会被添加到取值字典中的参数来实现这个需求::

  >>> class FrontDesk(object):
  ...
  ...     def book_room(self, name, place, phone):
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': name,
  ...         'place': place,
  ...         'phone': phone
  ...         }

除了要向新的模型迁移数据外，我们还必须修改所有对FrontDesk的调用。如果我们把顾客的细节信息抽象成一个guest对象，并且用这个对象来完成注册，那么对代码的改动可以更小。也就是说我们只要修改guest对象的细节就可以了，而对FrontDesk的调用则不必修改。

现在我们有::

  >>> class FrontDesk(object):
  ...
  ...     def book_room(self, guest):
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

如果出现需求变更的话，我们还是得修改代码的。这是不可避免的，但是我们的目标是将这样的改动最小化，因而也就提高了可维护性。

.. note::

   在写代码的时候，能随意修改而不需要担心破坏了整个应用程序是很重要的。获得所需的即时反馈可以通过自动化测试来实现。有了高质量的测试（以及合理的版本控制），你就能自由自在地进行或大或小的修改。Kent Beck写的《Extreme Programming Explained》是关于这一编程法则的优秀资料。

通过引入guest对象，你省去了不少打字的功夫。更重要的是，guest对象所提供的这种抽象使得系统更简单并且更容易理解。因此，代码也就更容易重构和维护了。


适配器模式
~~~~~~~~~~~~~~~~~~~

现实应用中frontdesk对象需要处理诸如取消或是更新预订这类琐事。在现在的设计方案中，我们每次调用cancel_booking和update_booking这些方法时都得把guest对象传递给frontdesk。

我们把guest对象传递给FrontDesk.__init__()方法，使之成为实例的一个属性，就能避免这种情况::

  >>> class FrontDeskNG(object):
  ...
  ...     def __init__(self, guest):
  ...         self.guest = guest
  ...
  ...     def book_room(self):
  ...         guest = self.guest
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

.. include this bit at the front of the `Adapters` section when I get
       the equivalent quote from the Patterns book to start the 
    `Interfaces` section

    The solution we have reached is a common design pattern called,
    `Adapter`.  The `Gang of Four` [#patternbook]_ give this as the
    *intent* of Adapter::

     "Convert the interface of a class into another interface clients
     expect.  Adapter lets classes work together that couldn't otherwise
     because of incompatible interfaces."

我们获得的这个解决方案是一种著名的设计模式——适配器（adapter）。通常，适配器包含适配源::

  >>> class Adapter(object):
  ...
  ...     def __init__(self, adaptee):
  ...         self.adaptee = adaptee

这种模式在处理依赖以下因素的实现细节时会很有用:

 - 修改客户需求
 - 存储需求 (ZODB, RDBM, XML ...)
 - 输出需求 (HTML, PDF, plain text ...)
 - 标记渲染 (ReST, Markdown, Textile ...) 

ZCA使用适配器和组件注册表来实现通过配置修改代码实现细节的能力。

就像我们将在ZCA适配器章节看到的那样，配置实现细节的可能性提供了十分有用的能力：

 - 在不同具体实现间切换的能力
 - 在需要时添加新实现的能力
 - 提高遗留代码和ZCA代码的重用性

这些能力使代码变得灵活、可扩展、可重用。当然这也有一定代价，维护组件注册表会把应用程序的复杂性增加一些。如果应用永远不需要这样的特性，那么是不需要使用ZCA的。

我们现在准备从接口（interfaces）开始学习Zope Component Architecture了。

