---
created: ''
creator: ''
description: 一些扩展工具和使用案例，包括配置语言ZCML
title: 组件架构在Zope中的使用
---
========================
组件架构在Zope中的使用
========================

一些扩展工具和使用案例，包括配置语言ZCML

.. Contents::
.. sectnum::

:原文: http://www.muthukadan.net/docs/zca.html#zca-usage-in-zope

Zope Component Architecture is used in both Zope 3 and Zope 2.  This
chapter will go through usage of the ZCA in Zope.


ZCML
~~~~

The **Zope Configuration Markup Language (ZCML)** is an XML based
configuration system for registration of components.  So, instead of
using Python API for registration, you can use ZCML.  But to use ZCML,
unfortunately, you will be required to install more dependency
packages.

To install these packages::

  $ easy_install "zope.component [zcml]"

To register an adapter::

  <configure xmlns="http://namespaces.zope.org/zope">

  <adapter
      factory=".company.EmployeeSalary"
      provides=".interfaces.ISalary"
      for=".interfaces.IEmployee"
      />

The `provides` and `for` attributes are optional, provided you have
declared it in the implementation::

  <configure xmlns="http://namespaces.zope.org/zope">

  <adapter
      factory=".company.EmployeeSalary"
      />

If you want to register the component as named adapter, you can give a
`name` attribute::


  <configure xmlns="http://namespaces.zope.org/zope">

  <adapter
      factory=".company.EmployeeSalary"
      name="salary"
      />

Utilities are also registered similarly.

To register an utility::

  <configure xmlns="http://namespaces.zope.org/zope">

  <utility
      component=".database.connection"
      provides=".interfaces.IConnection"
      />

The `provides` attribute is optional, provided you have declared it in
the implementation::

  <configure xmlns="http://namespaces.zope.org/zope">

  <utility
      component=".database.connection"
      />

If you want to register the component as named utility, you can give a
`name` attribute::


  <configure xmlns="http://namespaces.zope.org/zope">

  <utility
      component=".database.connection"
      name="Database Connection"
      />

Instead of directly using the component, you can also give a factory::

  <configure xmlns="http://namespaces.zope.org/zope">

  <utility
      factory=".database.Connection"
      />


Overrides 覆盖
~~~~~~~~~~~~~~~~~~~~~~~

When you register components using Python API (``register*`` methods),
the last registered component will replace previously registered
component, if both are registered with same type of arguments.  For
example, consider this example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IA(Interface):
  ...     pass

  >>> class IP(Interface):
  ...     pass

  >>> from zope.interface import implements
  >>> from zope.component import adapts

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> class AP(object):
  ...
  ...     implements(IP)
  ...     adapts(IA)
  ...
  ...     def __init__(self, context):
  ...         self.context = context

  >>> class AP2(object):
  ...
  ...     implements(IP)
  ...     adapts(IA)
  ...
  ...     def __init__(self, context):
  ...         self.context = context

  >>> class A(object):
  ...
  ...     implements(IA)

  >>> a = A()
  >>> ap = AP(a)

  >>> gsm.registerAdapter(AP)

  >>> getAdapter(a, IP) #doctest: +ELLIPSIS
  <AP object at ...>

If you register another adapter, the existing one will be replaced::

  >>> gsm.registerAdapter(AP2)

  >>> getAdapter(a, IP) #doctest: +ELLIPSIS
  <AP2 object at ...>

But when registering components using ZCML, the second registration
will raise a conflict error.  This is a hint for you, otherwise there
is a chance for overriding registration by mistake.  This may lead to
hard to track bugs in your system.  So, using ZCML is a win for the
application.

Sometimes you will be required to override existing registration.
ZCML provides ``includeOverrides`` directive for this.  Using this,
you can write your overrides in a separate file::

  <includeOverrides file="overrides.zcml" />


NameChooser 名字选择
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Location: `zope.app.container.contained.NameChooser`

This is an adapter for choosing a unique name for an object inside a
container.

The registration of adapter is like this::

  <adapter
      provides=".interfaces.INameChooser"
      for="zope.app.container.interfaces.IWriteContainer"
      factory=".contained.NameChooser"
      />

From the registration, you can see that the adaptee is a
``IWriteContainer`` and the adapter provides ``INameChooser``.

This adapter provides a very convenient functionality for Zope
programmers.  The main implementations of ``IWriteContainer`` in
Zope 3 are ``zope.app.container.BTreeContainer`` and
``zope.app.folder.Folder``.  Normally you will be inheriting from
these implementations for creating your own container classes.
Suppose there is no interface called ``INameChooser`` and
adapter, then you will be required to implement this functionality
for every implementations separately.


LocationPhysicallyLocatable 位置可定位
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Location:
``zope.location.traversing.LocationPhysicallyLocatable``

This adapter is frequently used in Zope 3 applications, but
normally it is called through an API in ``zope.traversing.api``.
(Some old code even use ``zope.app.zapi`` functions, which is
again one more indirection)

The registration of adapter is like this::

  <adapter
      factory="zope.location.traversing.LocationPhysicallyLocatable"
      />

The interface provided and adaptee interface is given in the
implementation.

Here is the beginning of implementation::

  class LocationPhysicallyLocatable(object):
      """Provide location information for location objects
      """
      zope.component.adapts(ILocation)
      zope.interface.implements(IPhysicallyLocatable)
      ...

Normally, almost all persistent objects in Zope 3 application
will be providing the ``ILocation`` interface.  This interface
has only two attribute, ``__parent__`` and ``__name__``.  The
``__parent__`` is the parent in the location hierarchy.  And
``__name__`` is the name within the parent.

The ``IPhysicallyLocatable`` interface has four methods:
``getRoot``, ``getPath``, ``getName``, and ``getNearestSite``.

  - ``getRoot`` function will return the physical root object.

  - ``getPath`` return the physical path to the object as a
    string.

  - ``getName`` return the last segment of the physical path.

  - ``getNearestSite`` return the site the object is contained
    in.  If the object is a site, the object itself is returned.

If you learn Zope 3, you can see that these are the important
things which you required very often.  To understand the beauty
of this system, you must see how Zope 2 actually get the physical
root object and how it is implemented.  There is a method called
``getPhysicalRoot`` virtually for all container objects.


DefaultSized 默认大小
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Location: ``zope.size.DefaultSized``

This adapter is just a default implementation of ``ISized`` interface.
This adapter is registered for all kind of objects.  If you want to
register this adapter for a particular interface, then you have to
override this registration for your implementation.

The registration of adapter is like this::

  <adapter
      for="*"
      factory="zope.size.DefaultSized"
      provides="zope.size.interfaces.ISized"
      permission="zope.View"
      />

As you can see, the adaptee interface is `*`, so it can adapt any kind
of objects.

The ``ISized`` is a simple interface with two method contracts::

  class ISized(Interface):

      def sizeForSorting():
          """Returns a tuple (basic_unit, amount)

          Used for sorting among different kinds of sized objects.
          'amount' need only be sortable among things that share the
          same basic unit."""

      def sizeForDisplay():
          """Returns a string giving the size.
          """

You can see another ``ISized`` adapter registered for ``IZPTPage`` in
``zope.app.zptpage`` package.


ZopeVersionUtility Zope版本工具
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Location: ``zope.app.applicationcontrol.ZopeVersionUtility``

This utility gives version of the running Zope.

The registration goes like this::

  <utility
      component=".zopeversion.ZopeVersionUtility"
      provides=".interfaces.IZopeVersion" />

The interface provided, ``IZopeVersion``, has only one method named
``getZopeVersion``.  This method return a string containing the Zope
version (possibly including SVN information).

The default implementation, ``ZopeVersionUtility``, get version info
from a file ``version.txt`` in `zope/app` directory.  If Zope is
running from subversion checkout, it will show the latest revision
number.  If none of the above works it will set it to:
`Development/Unknown`.

