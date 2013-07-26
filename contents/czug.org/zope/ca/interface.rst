---
created: ''
creator: ''
description: 接口是组件的对外契约和文档，是组件架构的基础
title: 接口
---
====================
接口
====================

接口是组件的对外契约和文档，是组件架构的基础

.. contents:: 目录
..
    1  简介
    2  声明接口
    3  实现接口
    4  范例重览
    5  <<标识>><<marker>>接口
    6  不变量

.. sectnum::
   :prefix: 3.

:翻译: yuting cui yutingcui at gmail dot com
:原文: http://www.muthukadan.net/docs/zca.html#interfaces 

简介
====

path/to/zope/interface 目录下的 README.txt [#zope_readme]_ 中对接口定义如下::

  Interfaces are objects that specify (document) the external behavior
  of objects that "provide" them.  An interface specifies behavior
  through:

  - Informal documentation in a doc string

  - Attribute definitions

  - Invariants, which are conditions that must hold for objects that
    provide the interface

翻译如下::

  接口是一类特殊的对象，它规范（并文档化)了所有“提供”这个接口的对象的外部行为。
  一个接口通过如下方式来规范行为:

  - 在文档字符串里提供详细的文档

  - 定义属性

  - 不变量，也就是每个提供这个接口的对象所必须满足的条件

在Gang of Four所编写的经典软件工程书籍《设计模式》 [#design_pattern]_ 中推荐“要面向接口而不要面向实现编程”。规范的进行接口定义有助于更好的理解系统，更重要的是，使用接口可以让你充分利用ZCA。

.. [#zope_readme] 在Zope的代码树中有大量的README.txt，这些文件提供了大量的高质量文档。
.. [#design_pattern] http://en.wikipedia.org/wiki/Design_Patterns

一个接口定义了一个对象的特性，包括对象的行为和对象的能力。接口定义了对象能做些 *什么* ，但是要想知道是 *怎么* 做的就需要去查看对象的实现。

在其他领域中常见的和接口类似的词语是 *契约* 和 *蓝图* ，他们分别是法律和建筑中用来描述一组规范的术语。

在一些现代编程语言（比如Java、C#、VB.NET等）中，接口是语言本身直接提供的一个特性。由于Python不提供接口，ZCA把接口实现为一个用来作为基类继承的<<元类>><<meta-class>>。

这是一个传统的Hello world类型的例子::

  >>> class Host(object):
  ...
  ...     def goodmorning(self, name):
  ...         """Say good morning to guests"""
  ...
  ...         return "Good morning, %s!" % name

在上面的类中定义了一个 `goodmorning` 方法，如果调用一个用这个类创建的对象中的 `goodmorning` 方法，那么这个方法将会返回 ``Good morning, ...!``

::

  >>> host = Host()
  >>> host.goodmorning('Jack')
  'Good morning, Jack!'

这里 `host` 是你的代码中真正使用的对象。如果想要了解实现细节，那么就需要通过查看 `Host` 的源码或者利用API [#API]_ 文档工具检查 `Host` 。

.. [#API] http://en.wikipedia.org/wiki/Application_programming_interface

现在我们开始使用ZCA的接口，按照上面给出的类定义，你可以用如下方式来定义接口::

  >>> from zope.interface import Interface

  >>> class IHost(Interface):
  ...
  ...     def goodmorning(guest):
  ...         """Say good morning to guest"""

如上所见，接口从 `zope.interface.Interface` 继承而来。这个使用（也许是不恰当的？）Python的 `class` 语句的方法就是ZCA定义接口的方式，在接口名字前面添加一个 `I` 前缀是一个很常见的习惯做法。

声明接口
========

在上一节中你已经了解了如何使用 `zope.interface.Interface` 来声明接口，在这一节中将会详细介绍这一部分。

考虑如下的接口例子::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute

  >>> class IHost(Interface):
  ...     """A host object"""
  ...
  ...     name = Attribute("""Name of host""")
  ...
  ...     def goodmorning(guest):
  ...         """Say good morning to guest"""

接口 `IHost` 有两个属性， `name` 和 `goodmoring` 。回想一下，至少在Python中，方法也是属性。属性 `name` 是采用 `zope.interface.Attribute` 类来定义的。当你给接口 `IHost` 添加一个属性 `name` 的时候，你不需要设置任何的初始值，在这里定义属性 `name` 只是为了声明所有的这个接口的实现都有一个名为 `name` 的属性，在这种情况下，你甚至不需要指定这个属性的类型。 `Attribute` 可以接收一个文档字符串作为第一个参数。

另一个属性 `goodmorning` 是一个采用函数声明来定义的方法。注意一下，在接口中不需要 `self` 参数，这是因为 `self` 是类的实现细节。举例来说，我们可以用一个模块来实现这个接口。如果有一个模块实现了这个接口，那么这个模块中必须定义一个属性 `name` 和一个函数 `goodmorning` ，并且这个 `goodmorning` 函数接收一个参数。

现在将要介绍接口、类、和对象之间的关联。对象是真实存在的实体，对象是类的实现，而接口提供了对象的规范定义，类只是实现细节。这就是为什么你要面向接口而不是面向实现编程的原因。

为了了解后面的概念，你必须熟悉两个术语，一个是 **提供** ，另一个是 **实现** 。对象提供接口而类实现接口。换句话说就是对象提供了定义它们的类所实现的接口。在上面的例子中， `host` （对象）提供了 `IHost` （接口）， `Host` （类） 实现了 `IHost` （接口）。一个对象可以提供多个接口，一个类也可以显示多个接口。对于对象来说，除了定义它们的类所实现的接口之外，还可以直接提供其他接口。

.. admonition:: 注意 
  :class: note

  类提供了对象的实现细节。在Python中，类是一个可调用对象。有人可能会问，难道其他可调用对象就不能实现一个接口吗？这是可以的。对于任意一个可调用对象，如果你希望声明这个可调用对象生成的对象提供了某些接口，那么你可以通过声称这个可调用对象实现了这些接口的方式来完成，这类的可调用对象一般被称作工厂。由于函数也是可调用对象，所以一个函数也可以是一个接口的实现者。

实现接口
========

要声明一个类实现了某个特定的接口，可以在 `class` 语句中使用zope.interface.implements函数。

在下面的例子， `Host` 实现了 `IHost` ::

  >>> from zope.interface import implements

  >>> class Host(object):
  ...
  ...     implements(IHost)
  ...
  ...     name = u''
  ...
  ...     def goodmorning(self, guest):
  ...         """Say good morning to guest"""
  ...
  ...         return "Good morning, %s!" % guest

.. admonition:: 注意
  :class: note

  如果你想知道 `implements` 函数是怎么工作的，可以参考James Henstridge撰写的博客文章（ http://blogs.gnome.org/jamesh/2005/09/08/python-class-advisors/ ）。在adapter一节，有一个工作原理类似的 `adapts` 函数。

由于 `Host` 实现了 `IHost` ， `Host` 的实例也就提供了 `IHost` 。有一些辅助方法可以<<内省>><<introspect>>这些声明。这个声明也可以写在类的外面，如果你没有在前面的例子中编写 `interface.implements(IHost)` 这条语句，那么在类的定义后面，你可以输入::

  >>> from zope.interface import classImplements
  >>> classImplements(Host, IHost)

范例重览
========

现在，回到之前的范例应用上来，下面是前台对象的接口定义::

  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

首先，从 `zope.interface` 模块中导入了 `Interface` 类。如果你定义了一个这个接口类的子类，那么从Zope component architecture的角度来看，这个类就是一个接口。就像前面已经提示过的，一个接口可以被类或者任意的其他可调用对象所实现。

这里定义的前台接口是 `IDesk` 。这个接口的文档字符串提供了对象的概述。通过在接口中定义一个方法，你保证了所有的组件都提供了同样名字的方法。在接口的方法的定义中，第一个参数绝对不能是 `self` ，这是由于一个接口绝对不会被实例化，而且接口的方法也不会被调用，接口类只是用来为那些声称实现它的普通类提供必须要实现的属性和方法的参考文档的，而 `self` 是一个实现上的细节，不需要被文档化。

前面已经说过，接口也可以被用来规定普通的属性::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute

  >>> class IGuest(Interface):
  ...
  ...     name = Attribute("Name of guest")
  ...     place = Attribute("Place of guest")

在这个接口中，房客对象有两个被文档所规定的属性。一个接口中可以同时规定属性和方法，接口可以被类、模块或者其他任何对象所实现。比如一个函数可以动态创建一个组件并返回，在这种情况下，这个函数就是某个接口的实现者。

现在你已经知道什么是接口和如何定义并使用接口，在下面一章中将你将了解到如何使用接口去定义一个<<适配器>><<adapter>>对象。

<<标识>><<marker>>接口
======================

一个接口可以被用来声明某个特定对象属于一个特殊的类型。一个没有任何属性和方法的接口被称作 **<<标识>><<marker>>接口** 。

下面是一个 **<<标识>><<marker>>接口** ::

  >>> from zope.interface import Interface

  >>> class ISpecialGuest(Interface):
  ...     """A special guest"""

这个接口可以用来声明一个对象是一个特殊房客。

不变量
======

在某些情况下，你可能需要给你的组件定义某些规则，这些规则会涉及到组件的一个或多个普通属性。这样的规则被叫做 **不变量** 。你可以在接口中使用 `zope.interface.invariant` 来给你的对象设定不变量。

考虑一个简单的例子，比如人物对象，每个人物都有 `name` 、 `email` 、和 `phone` 属性。那么要如何实现一个保证 `email` 和 `phone` 中至少有一个存在的校验规则呢？

首先，你必须完成一个可调用对象，可以是一个简单的函数或者是一个可调用的类实例，比如::

  >>> def contacts_invariant(obj):
  ...
  ...     if not (obj.email or obj.phone):
  ...         raise Exception(
  ...             "At least one contact info is required")

然后按下面的做法定义一个人物对象的接口。使用 `zope.interface.invariant` 函数来设定不变量::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import invariant

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name")
  ...     email = Attribute("Email Address")
  ...     phone = Attribute("Phone Number")
  ...
  ...     invariant(contacts_invariant)

现在使用接口的 `validateInvariants` 方法来进行校验::

  >>> from zope.interface import implements

  >>> class Person(object):
  ...     implements(IPerson)
  ...
  ...     name = None
  ...     email = None
  ...     phone = None

  >>> jack = Person()
  >>> jack.email = u"jack@some.address.com"
  >>> IPerson.validateInvariants(jack)
  >>> jill = Person()
  >>> IPerson.validateInvariants(jill)
  Traceback (most recent call last):
  ...
  Exception: At least one contact info is required

从上面的执行结果可以看出， `jack` 对象没有抛出任何异常就通过了校验，而 `jill` 对象就无法通过不变量约束的校验，并因此抛出了异常。
