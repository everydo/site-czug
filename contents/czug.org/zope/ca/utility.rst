---
created: ''
creator: ''
description: 可以对应设计模式中的单子模式
title: 工具
---
====================
title: 工具
====================

可以对应设计模式中的单子模式

.. Contents::
.. sectnum::

:原文: http://www.muthukadan.net/docs/zca.html#utility
:翻译: elias.soong at gmail dot com

序言
~~~~~~~~~~~~

现在我们已经了解了接口、适配器以及组件注册表的概念。有时注册一个并不适配任何东西的对象也是有用的。比如数据库连接、XML解析器、返回唯一Id的对象等等，就属于这种情况。ZCA提供的这类组件称为 ``工具`` （utility）组件。

工具只是一种提供了接口的对象，并且能够使用接口和名字来查询。这一过程创建了一个全局注册表，用这个注册表可以注册实例并且随后被应用程序的其他部分访问，也就不必再把这些实例作为参数到处传递了。

我们不必用这种方法来注册所有的组件实例，通常只注册需要进行替换的组件就可以了。


简单工具
~~~~~~~~~~~~~~

注册一个工具时可以带名字也可以不带名字。带名字注册的工具称为命名工具，这将在下一节讲到。在实现工具之前，和以前一样，得先定义一个接口。下面是一个 `接待员` （greeter）接口::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...
  ...     def greet(name):
  ...         """Say hello"""

和适配器一样，一个工具可能有多个的实现。这是上面接口的一个可能实现::

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         return "Hello " + name

实际工具将是这个类的一个实例。为使用这个工具，必须注册它，然后可以用ZCA的API来进行查询。我们可以用 ``registerUtility`` 来注册这个类的实例（也就是注册了一个 `工具` ）::

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, IGreeter)

在这个例子里，我们将工具注册为 `IGreeter` 接口的一个提供者。我们可以用 `queryUtility` 或 `getUtility` 来查询接口::

  >>> from zope.component import queryUtility
  >>> from zope.component import getUtility

  >>> queryUtility(IGreeter).greet('Jack')
  'Hello Jack'

  >>> getUtility(IGreeter).greet('Jack')
  'Hello Jack'

如我们所见，适配器通常是类，而工具通常是类的实例。工具类的实例只需创建一次，但适配器的实例可以在任何我们查询它的时候动态创建。


命名工具
~~~~~~~~~~~~~

类似适配器，我们在注册一个工具组件的时候可以提供名字。如上一节提到的那样，使用一个特定名字注册的组件被称为命名工具。

这是如何带名字注册 `greeter` 工具的一个例子::

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, IGreeter, 'new')

在这个例子中，我们带着名字将工具注册为 `IGreeter` 接口的一个提供者，然后就可以用 `queryUtility` 或 `getUtility` 来查询接口::

  >>> from zope.component import queryUtility
  >>> from zope.component import getUtility

  >>> queryUtility(IGreeter, 'new').greet('Jill')
  'Hello Jill'

  >>> getUtility(IGreeter, 'new').greet('Jill')
  'Hello Jill'

如我们所见，在查询时我们必须把`名字`作为第二个参数来提供。

不带名字调用 `getUtility` 函数与以空字符串作为名字来调用是等价的。因为第二个参数（keyword）的默认值就是一个空字符串。然后组件查询机制将试着寻找以空字符串作为名字的组件，并且会失败。当组件查询失败时，会抛出 ``ComponentLookupError`` 异常。注意，这不会随机返回使用其他名字注册的组件。适配器查询函数 `getAdapter` 和 `queryAdapter` 也是按照类似方式工作的。


工厂
~~~~~~~

``工厂`` 是提供 ``IFactory`` 接口的工具组件。

为创建工厂，首先定义对象的接口::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IDatabase(Interface):
  ...
  ...     def getConnection():
  ...         """Return connection object"""

这是 `IDatabase` 接口的一个伪实现::

  >>> class FakeDb(object):
  ...
  ...     implements(IDatabase)
  ...
  ...     def getConnection(self):
  ...         return "connection"

我们可以用 ``zope.component.factory.Factory`` 创建一个工厂::

  >>> from zope.component.factory import Factory

  >>> factory = Factory(FakeDb, 'FakeDb')

现在我们可以像这样注册它::

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> from zope.component.interfaces import IFactory
  >>> gsm.registerUtility(factory, IFactory, 'fakedb')

要使用工厂，我们可能会这样做::

  >>> from zope.component import queryUtility
  >>> queryUtility(IFactory, 'fakedb')() #doctest: +ELLIPSIS
  <FakeDb object at ...>

有一个使用工厂的快捷方式::

  >>> from zope.component import createObject
  >>> createObject('fakedb') #doctest: +ELLIPSIS
  <FakeDb object at ...>

