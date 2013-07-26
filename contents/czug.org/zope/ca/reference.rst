---
created: ''
creator: ''
description: 接口和函数使用参考
title: 参考
---
====================
参考
====================

接口和函数使用参考

.. Contents::
.. sectnum::

:原文: http://www.muthukadan.net/docs/zca.html#reference

adaptedBy
~~~~~~~~~

This function helps to find the adapted interfaces.

 - Location: ``zope.component``

 - Signature: `adaptedBy(object)`

Example::

  >>> from zope.interface import implements
  >>> from zope.component import adapts
  >>> from zope.component import adaptedBy

  >>> class FrontDeskNG(object):
  ...
  ...     implements(IDesk)
  ...     adapts(IGuest)
  ...
  ...     def __init__(self, guest):
  ...         self.guest = guest

  >>> adaptedBy(FrontDeskNG)
  (<InterfaceClass __builtin__.IGuest>,)


adapter
~~~~~~~

Adapters can be any callable object, you can use the `adapter`
decorator to declare that a callable object adapts some interfaces (or
classes)

 - Location: ``zope.component``

 - Signature: `adapter(*interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implementer
  >>> from zope.component import adapter
  >>> from zope.interface import implements

  >>> class IJob(Interface):
  ...     """A job"""

  >>> class Job(object):
  ...     implements(IJob)

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name")
  ...     job = Attribute("Job")

  >>> class Person(object):
  ...     implements(IPerson)
  ...
  ...     name = None
  ...     job = None

  >>> @implementer(IJob)
  ... @adapter(IPerson)
  ... def personJob(person):
  ...     return person.job

  >>> jack = Person()
  >>> jack.name = "Jack"
  >>> jack.job = Job()
  >>> personJob(jack) #doctest: +ELLIPSIS
  <Job object at ...>


adapts
~~~~~~

This function helps to declare adapter classes.

 - Location: ``zope.component``

 - Signature: `adapts(*interfaces)`

Example::

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }


alsoProvides
~~~~~~~~~~~~

Declare interfaces declared directly for an object.  The arguments
after the object are one or more interfaces.  The interfaces given are
added to the interfaces previously declared for the object.

 - Location: ``zope.interface``

 - Signature: `alsoProvides(object, *interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.interface import alsoProvides

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class Person(object):
  ...
  ...     implements(IDesk)
  ...     name = u""

  >>> jack = Person()
  >>> jack.name = "Jack"
  >>> jack.college = "New College"
  >>> alsoProvides(jack, IStudent)

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IStudent in providedBy(jack)
  True


Attribute
~~~~~~~~~

Using this class, you can define normal attributes in an interface.

 - Location: ``zope.interface``

 - Signature: `Attribute(name, doc='')`

 - See also: `Interface`_

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")
  ...     email = Attribute("Email Address")


classImplements
~~~~~~~~~~~~~~~

Declare additional interfaces implemented for instances of a class.
The arguments after the class are one or more interfaces.  The
interfaces given are added to any interfaces previously declared.

 - Location: ``zope.interface``

 - Signature: `classImplements(cls, *interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.interface import classImplements

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class Person(object):
  ...
  ...     implements(IDesk)
  ...     name = u""
  ...     college = u""

  >>> classImplements(Person, IStudent)
  >>> jack = Person()
  >>> jack.name = "Jack"
  >>> jack.college = "New College"

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IStudent in providedBy(jack)
  True


classImplementsOnly
~~~~~~~~~~~~~~~~~~~

Declare the only interfaces implemented by instances of a class.  The
arguments after the class are one or more interfaces.  The interfaces
given replace any previous declarations.

 - Location: ``zope.interface``

 - Signature: `classImplementsOnly(cls, *interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.interface import classImplementsOnly

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     college = u""

  >>> classImplementsOnly(Person, IStudent)
  >>> jack = Person()
  >>> jack.college = "New College"

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IPerson in providedBy(jack)
  False
  >>> IStudent in providedBy(jack)
  True


classProvides
~~~~~~~~~~~~~

Normally if a class implements a particular interface, the instance of
that class will provide the interface implemented by that class.  But
if you want a class to be provided by an interface, you can declare it
using ``classProvides`` function.

 - Location: ``zope.interface``

 - Signature: `classProvides(*interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import classProvides

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class Person(object):
  ...
  ...     classProvides(IPerson)
  ...     name = u"Jack"

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IPerson in providedBy(Person)
  True


ComponentLookupError
~~~~~~~~~~~~~~~~~~~~

This is the exception raised when a component lookup fails.

Example::

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> person = object()
  >>> getAdapter(person, IPerson, 'not-exists') #doctest: +ELLIPSIS
  Traceback (most recent call last):
  ...
  ComponentLookupError: ...


createObject
~~~~~~~~~~~~

Create an object using a factory.

Finds the named factory in the current site and calls it with the
given arguments.  If a matching factory cannot be found raises
``ComponentLookupError``.  Returns the created object.

A context keyword argument can be provided to cause the factory to be
looked up in a location other than the current site.  (Of course, this
means that it is impossible to pass a keyword argument named "context"
to the factory.

 - Location: ``zope.component``

 - Signature: `createObject(factory_name, *args, **kwargs)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IDatabase(Interface):
  ...
  ...     def getConnection():
  ...         """Return connection object"""

  >>> class FakeDb(object):
  ...
  ...     implements(IDatabase)
  ...
  ...     def getConnection(self):
  ...         return "connection"

  >>> from zope.component.factory import Factory

  >>> factory = Factory(FakeDb, 'FakeDb')

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> from zope.component.interfaces import IFactory
  >>> gsm.registerUtility(factory, IFactory, 'fakedb')

  >>> from zope.component import createObject
  >>> createObject('fakedb') #doctest: +ELLIPSIS
  <FakeDb object at ...>


Declaration
~~~~~~~~~~~

Need not to use directly.


directlyProvidedBy
~~~~~~~~~~~~~~~~~~

This function will return the interfaces directly provided by the
given object.

 - Location: ``zope.interface``

 - Signature: `directlyProvidedBy(object)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class ISmartPerson(Interface):
  ...     pass

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     name = u""

  >>> jack = Person()
  >>> jack.name = u"Jack"
  >>> jack.college = "New College"
  >>> alsoProvides(jack, ISmartPerson, IStudent)

  >>> from zope.interface import directlyProvidedBy

  >>> jack_dp = directlyProvidedBy(jack)
  >>> IPerson in jack_dp.interfaces()
  False
  >>> IStudent in jack_dp.interfaces()
  True
  >>> ISmartPerson in jack_dp.interfaces()
  True


directlyProvides
~~~~~~~~~~~~~~~~

Declare interfaces declared directly for an object.  The arguments
after the object are one or more interfaces.  The interfaces given
replace interfaces previously declared for the object.

 - Location: ``zope.interface``

 - Signature: `directlyProvides(object, *interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class ISmartPerson(Interface):
  ...     pass

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     name = u""

  >>> jack = Person()
  >>> jack.name = u"Jack"
  >>> jack.college = "New College"
  >>> alsoProvides(jack, ISmartPerson, IStudent)

  >>> from zope.interface import directlyProvidedBy

  >>> jack_dp = directlyProvidedBy(jack)
  >>> ISmartPerson in jack_dp.interfaces()
  True
  >>> IPerson in jack_dp.interfaces()
  False
  >>> IStudent in jack_dp.interfaces()
  True
  >>> from zope.interface import providedBy

  >>> ISmartPerson in providedBy(jack)
  True

  >>> from zope.interface import directlyProvides
  >>> directlyProvides(jack, IStudent)

  >>> jack_dp = directlyProvidedBy(jack)
  >>> ISmartPerson in jack_dp.interfaces()
  False
  >>> IPerson in jack_dp.interfaces()
  False
  >>> IStudent in jack_dp.interfaces()
  True

  >>> ISmartPerson in providedBy(jack)
  False


getAdapter
~~~~~~~~~~

Get a named adapter to an interface for an object.  Returns an adapter
that can adapt object to interface.  If a matching adapter cannot be
found, raises ``ComponentLookupError`` .

 - Location: ``zope.interface``

 - Signature: `getAdapter(object, interface=Interface, name=u'', context=None)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk, 'ng')

  >>> getAdapter(jack, IDesk, 'ng') #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>


getAdapterInContext
~~~~~~~~~~~~~~~~~~~

Instead of this function, use `context` argument of `getAdapter`_
function.

 - Location: ``zope.component``

 - Signature: `getAdapterInContext(object, interface, context)`

 - See also: `queryAdapterInContext`_

Example::

  >>> from zope.component.globalregistry import BaseGlobalComponents
  >>> from zope.component import IComponentLookup
  >>> sm = BaseGlobalComponents()

  >>> class Context(object):
  ...     def __init__(self, sm):
  ...         self.sm = sm
  ...     def __conform__(self, interface):
  ...         if interface.isOrExtends(IComponentLookup):
  ...             return self.sm

  >>> context = Context(sm)

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> sm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk)

  >>> from zope.component import getAdapterInContext

  >>> getAdapterInContext(jack, IDesk, sm) #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>


getAdapters
~~~~~~~~~~~

Look for all matching adapters to a provided interface for objects.
Return a list of adapters that match. If an adapter is named, only the
most specific adapter of a given name is returned.

 - Location: ``zope.component``

 - Signature: `getAdapters(objects, provided, context=None)`

Example::

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

  >>> jack = Guest("Jack", "Bangalore")
  >>> jack_frontdesk = FrontDeskNG(jack)

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerAdapter(FrontDeskNG, name='ng')

  >>> from zope.component import getAdapters
  >>> list(getAdapters((jack,), IDesk)) #doctest: +ELLIPSIS
  [(u'ng', <FrontDeskNG object at ...>)]


getAllUtilitiesRegisteredFor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Return all registered utilities for an interface.  This includes
overridden utilities.  The returned value is an iterable of utility
instances.

 - Location: ``zope.component``

 - Signature: `getAllUtilitiesRegisteredFor(interface)`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         print "Hello", name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, IGreeter)

  >>> from zope.component import getAllUtilitiesRegisteredFor

  >>> getAllUtilitiesRegisteredFor(IGreeter) #doctest: +ELLIPSIS
  [<Greeter object at ...>]


getFactoriesFor
~~~~~~~~~~~~~~~

Return a tuple (name, factory) of registered factories that create
objects which implement the given interface.

 - Location: ``zope.component``

 - Signature: `getFactoriesFor(interface, context=None)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IDatabase(Interface):
  ...
  ...     def getConnection():
  ...         """Return connection object"""

  >>> class FakeDb(object):
  ...
  ...     implements(IDatabase)
  ...
  ...     def getConnection(self):
  ...         return "connection"

  >>> from zope.component.factory import Factory

  >>> factory = Factory(FakeDb, 'FakeDb')

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> from zope.component.interfaces import IFactory
  >>> gsm.registerUtility(factory, IFactory, 'fakedb')

  >>> from zope.component import getFactoriesFor

  >>> list(getFactoriesFor(IDatabase))
  [(u'fakedb', <Factory for <class 'FakeDb'>>)]


getFactoryInterfaces
~~~~~~~~~~~~~~~~~~~~

Get interfaces implemented by a factory.  Finds the factory of the
given name that is nearest to the context, and returns the interface
or interface tuple that object instances created by the named factory
will implement.

 - Location: ``zope.component``

 - Signature: `getFactoryInterfaces(name, context=None)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IDatabase(Interface):
  ...
  ...     def getConnection():
  ...         """Return connection object"""

  >>> class FakeDb(object):
  ...
  ...     implements(IDatabase)
  ...
  ...     def getConnection(self):
  ...         return "connection"

  >>> from zope.component.factory import Factory

  >>> factory = Factory(FakeDb, 'FakeDb')

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> from zope.component.interfaces import IFactory
  >>> gsm.registerUtility(factory, IFactory, 'fakedb')

  >>> from zope.component import getFactoryInterfaces

  >>> getFactoryInterfaces('fakedb')
  <implementedBy __builtin__.FakeDb>


getGlobalSiteManager
~~~~~~~~~~~~~~~~~~~~

Return the global site manager.  This function should never fail and
always return an object that provides `IGlobalSiteManager`

 - Location: ``zope.component``

 - Signature: `getGlobalSiteManager()`

Example::

  >>> from zope.component import getGlobalSiteManager
  >>> from zope.component import globalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm is globalSiteManager
  True


getMultiAdapter
~~~~~~~~~~~~~~~

Look for a multi-adapter to an interface for an objects.  Returns a
multi-adapter that can adapt objects to interface.  If a matching
adapter cannot be found, raises ComponentLookupError.  The name
consisting of an empty string is reserved for unnamed adapters. The
unnamed adapter methods will often call the named adapter methods with
an empty string for a name.

 - Location: ``zope.component``

 - Signature: `getMultiAdapter(objects, interface=Interface, name='',
   context=None)`

 - See also: `queryMultiAdapter`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.component import adapts

  >>> class IAdapteeOne(Interface):
  ...     pass

  >>> class IAdapteeTwo(Interface):
  ...     pass

  >>> class IFunctionality(Interface):
  ...     pass

  >>> class MyFunctionality(object):
  ...     implements(IFunctionality)
  ...     adapts(IAdapteeOne, IAdapteeTwo)
  ...
  ...     def __init__(self, one, two):
  ...         self.one = one
  ...         self.two = two

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerAdapter(MyFunctionality)

  >>> class One(object):
  ...     implements(IAdapteeOne)

  >>> class Two(object):
  ...     implements(IAdapteeTwo)

  >>> one = One()
  >>> two = Two()

  >>> from zope.component import getMultiAdapter

  >>> getMultiAdapter((one,two), IFunctionality) #doctest: +ELLIPSIS
  <MyFunctionality object at ...>

  >>> myfunctionality = getMultiAdapter((one,two), IFunctionality)
  >>> myfunctionality.one #doctest: +ELLIPSIS
  <One object at ...>
  >>> myfunctionality.two #doctest: +ELLIPSIS
  <Two object at ...>


getSiteManager
~~~~~~~~~~~~~~

Get the nearest site manager in the given context.  If `context` is
`None`, return the global site manager.  If the `context` is not
`None`, it is expected that an adapter from the `context` to
`IComponentLookup` can be found.  If no adapter is found, a
`ComponentLookupError` is raised.

 - Location: ``zope.component``

 - Signature: `getSiteManager(context=None)`

Example 1::

  >>> from zope.component.globalregistry import BaseGlobalComponents
  >>> from zope.component import IComponentLookup
  >>> sm = BaseGlobalComponents()

  >>> class Context(object):
  ...     def __init__(self, sm):
  ...         self.sm = sm
  ...     def __conform__(self, interface):
  ...         if interface.isOrExtends(IComponentLookup):
  ...             return self.sm

  >>> context = Context(sm)

  >>> from zope.component import getSiteManager

  >>> lsm = getSiteManager(context)
  >>> lsm is sm
  True

Example 2::

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> sm = getSiteManager()
  >>> gsm is sm
  True


getUtilitiesFor
~~~~~~~~~~~~~~~

Look up the registered utilities that provide an interface.  Returns
an iterable of name-utility pairs.

 - Location: ``zope.component``

 - Signature: `getUtilitiesFor(interface)`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         print "Hello", name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, IGreeter)

  >>> from zope.component import getUtilitiesFor

  >>> list(getUtilitiesFor(IGreeter)) #doctest: +ELLIPSIS
  [(u'', <Greeter object at ...>)]


getUtility
~~~~~~~~~~

Get the utility that provides interface.  Returns the nearest utility
to the context that implements the specified interface.  If one is not
found, raises ``ComponentLookupError``.

 - Location: ``zope.component``

 - Signature: `getUtility(interface, name='', context=None)`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         return "Hello " + name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, IGreeter)

  >>> from zope.component import getUtility

  >>> getUtility(IGreeter).greet('Jack')
  'Hello Jack'


handle
~~~~~~

Call all of the handlers for the given objects.  Handlers are
subscription adapter factories that don't produce anything.  They do
all of their work when called.  Handlers are typically used to handle
events.

 - Location: ``zope.component``

 - Signature: `handle(*objects)`

Example::

  >>> import datetime

  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IDocumentCreated(Interface):
  ...     doc = Attribute("The document that was created")

  >>> class DocumentCreated(object):
  ...     implements(IDocumentCreated)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc


  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.component import adapter

  >>> @adapter(IDocumentCreated)
  ... def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()


  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerHandler(documentCreated)

  >>> from zope.component import handle

  >>> handle(DocumentCreated(doc))
  >>> doc.created.__class__.__name__
  'datetime'


implementedBy
~~~~~~~~~~~~~

Return the interfaces implemented for a class' instances.

 - Location: ``zope.interface``

 - Signature: `implementedBy(class_)`

Example 1::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         print "Hello", name

  >>> from zope.interface import implementedBy
  >>> implementedBy(Greeter)
  <implementedBy __builtin__.Greeter>

Example 2::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IPerson(Interface):
  ...     name = Attribute("Name of person")

  >>> class ISpecial(Interface):
  ...     pass

  >>> class Person(object):
  ...     implements(IPerson)
  ...     name = u""

  >>> from zope.interface import classImplements
  >>> classImplements(Person, ISpecial)

  >>> from zope.interface import implementedBy

  To get a list of all interfaces implemented by that class::

  >>> [x.__name__ for x in implementedBy(Person)]
  ['IPerson', 'ISpecial']


implementer
~~~~~~~~~~~

Create a decorator for declaring interfaces implemented by a factory.
A callable is returned that makes an implements declaration on objects
passed to it.

 - Location: ``zope.interface``

 - Signature: `implementer(*interfaces)`

Example::

  >>> from zope.interface import implementer
  >>> class IFoo(Interface):
  ...     pass
  >>> class Foo(object):
  ...     implements(IFoo)

  >>> @implementer(IFoo)
  ... def foocreator():
  ...     foo = Foo()
  ...     return foo
  >>> list(implementedBy(foocreator))
  [<InterfaceClass __builtin__.IFoo>]


implements
~~~~~~~~~~

Declare interfaces implemented by instances of a class This function
is called in a class definition.  The arguments are one or more
interfaces.  The interfaces given are added to any interfaces
previously declared.  Previous declarations include declarations for
base classes unless implementsOnly was used.

 - Location: ``zope.interface``

 - Signature: `implements(*interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     name = u""

  >>> jack = Person()
  >>> jack.name = "Jack"

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IPerson in providedBy(jack)
  True


implementsOnly
~~~~~~~~~~~~~~

Declare the only interfaces implemented by instances of a class.  This
function is called in a class definition.  The arguments are one or
more interfaces.  Previous declarations including declarations for
base classes are overridden.

 - Location: ``zope.interface``

 - Signature: `implementsOnly(*interfaces)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.interface import implementsOnly

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     name = u""

  >>> class NewPerson(Person):
  ...     implementsOnly(IStudent)
  ...     college = u""

  >>> jack = NewPerson()
  >>> jack.college = "New College"

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IPerson in providedBy(jack)
  False
  >>> IStudent in providedBy(jack)
  True


Interface
~~~~~~~~~

Using this class, you can define an interface.  To define an
interface, just inherit from ``Interface`` class.

 - Location: ``zope.interface``

 - Signature: `Interface(name, doc='')`

Example 1::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")
  ...     email = Attribute("Email Address")


Example 2::

  >>> from zope.interface import Interface

  >>> class IHost(Interface):
  ...
  ...     def goodmorning(guest):
  ...         """Say good morning to guest"""


moduleProvides
~~~~~~~~~~~~~~

Declare interfaces provided by a module.  This function is used in a
module definition.  The arguments are one or more interfaces.  The
given interfaces are used to create the module's direct-object
interface specification.  An error will be raised if the module
already has an interface specification.  In other words, it is an
error to call this function more than once in a module definition.

This function is provided for convenience.  It provides a more
convenient way to call ``directlyProvides`` for a module.

 - Location: ``zope.interface``

 - Signature: `moduleProvides(*interfaces)`

 - See also: `directlyProvides`_

You can see an example usage in `zope.component` source itself.  The
`__init__.py` file has a statement like this::

  moduleProvides(IComponentArchitecture,
                 IComponentRegistrationConvenience)

So, the `zope.component` provides two interfaces:
`IComponentArchitecture` and `IComponentRegistrationConvenience`.


noLongerProvides
~~~~~~~~~~~~~~~~

Remove an interface from the list of an object's directly provided
interfaces.

 - Location: ``zope.interface``

 - Signature: `noLongerProvides(object, interface)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.interface import classImplements

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class IStudent(Interface):
  ...
  ...     college = Attribute("Name of college")

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     name = u""

  >>> jack = Person()
  >>> jack.name = "Jack"
  >>> jack.college = "New College"
  >>> directlyProvides(jack, IStudent)

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IPerson in providedBy(jack)
  True
  >>> IStudent in providedBy(jack)
  True
  >>> from zope.interface import noLongerProvides
  >>> noLongerProvides(jack, IStudent)
  >>> IPerson in providedBy(jack)
  True
  >>> IStudent in providedBy(jack)
  False


provideAdapter
~~~~~~~~~~~~~~

It is recommended to use `registerAdapter`_ .


provideHandler
~~~~~~~~~~~~~~

It is recommended to use `registerHandler`_ .


provideSubscriptionAdapter
~~~~~~~~~~~~~~~~~~~~~~~~~~

It is recommended to use `registerSubscriptionAdapter`_ .


provideUtility
~~~~~~~~~~~~~~

It is recommended to use `registerUtility`_ .


providedBy
~~~~~~~~~~

Test whether the interface is implemented by the object.  Return true
if the object asserts that it implements the interface, including
asserting that it implements an extended interface.

 - Location: ``zope.interface``

 - Signature: `providedBy(object)`

Example 1::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IPerson(Interface):
  ...
  ...     name = Attribute("Name of person")

  >>> class Person(object):
  ...
  ...     implements(IPerson)
  ...     name = u""

  >>> jack = Person()
  >>> jack.name = "Jack"

  You can test it like this:

  >>> from zope.interface import providedBy
  >>> IPerson in providedBy(jack)
  True

Example 2::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IPerson(Interface):
  ...     name = Attribute("Name of person")

  >>> class ISpecial(Interface):
  ...     pass

  >>> class Person(object):
  ...     implements(IPerson)
  ...     name = u""

  >>> from zope.interface import classImplements
  >>> classImplements(Person, ISpecial)
  >>> from zope.interface import providedBy
  >>> jack = Person()
  >>> jack.name = "Jack"

  To get a list of all interfaces provided by that object::

  >>> [x.__name__ for x in providedBy(jack)]
  ['IPerson', 'ISpecial']


queryAdapter
~~~~~~~~~~~~

Look for a named adapter to an interface for an object.  Returns an
adapter that can adapt object to interface.  If a matching adapter
cannot be found, returns the default.

 - Location: ``zope.component``

 - Signature: `queryAdapter(object, interface=Interface, name=u'',
   default=None, context=None)`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk, 'ng')

  >>> queryAdapter(jack, IDesk, 'ng') #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>


queryAdapterInContext
~~~~~~~~~~~~~~~~~~~~~

Look for a special adapter to an interface for an object.

NOTE: This method should only be used if a custom context needs to be
provided to provide custom component lookup. Otherwise, call the
interface, as in::

  interface(object, default)

Returns an adapter that can adapt object to interface.  If a matching
adapter cannot be found, returns the default.

Context is adapted to IServiceService, and this adapter's 'Adapters'
service is used.

If the object has a __conform__ method, this method will be called
with the requested interface.  If the method returns a non-None value,
that value will be returned. Otherwise, if the object already
implements the interface, the object will be returned.

 - Location: ``zope.component``

 - Signature: `queryAdapterInContext(object, interface, context,
   default=None)`

 - See also: `getAdapterInContext`_

Example::

  >>> from zope.component.globalregistry import BaseGlobalComponents
  >>> from zope.component import IComponentLookup
  >>> sm = BaseGlobalComponents()

  >>> class Context(object):
  ...     def __init__(self, sm):
  ...         self.sm = sm
  ...     def __conform__(self, interface):
  ...         if interface.isOrExtends(IComponentLookup):
  ...             return self.sm

  >>> context = Context(sm)

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> sm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk)

  >>> from zope.component import queryAdapterInContext

  >>> queryAdapterInContext(jack, IDesk, sm) #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>


queryMultiAdapter
~~~~~~~~~~~~~~~~~

Look for a multi-adapter to an interface for objects.  Returns a
multi-adapter that can adapt objects to interface.  If a matching
adapter cannot be found, returns the default.  The name consisting of
an empty string is reserved for unnamed adapters.  The unnamed adapter
methods will often call the named adapter methods with an empty string
for a name.

 - Location: ``zope.component``

 - Signature: `queryMultiAdapter(objects, interface=Interface,
   name=u'', default=None, context=None)`

 - See also: `getMultiAdapter`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements
  >>> from zope.component import adapts

  >>> class IAdapteeOne(Interface):
  ...     pass

  >>> class IAdapteeTwo(Interface):
  ...     pass

  >>> class IFunctionality(Interface):
  ...     pass

  >>> class MyFunctionality(object):
  ...     implements(IFunctionality)
  ...     adapts(IAdapteeOne, IAdapteeTwo)
  ...
  ...     def __init__(self, one, two):
  ...         self.one = one
  ...         self.two = two

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerAdapter(MyFunctionality)

  >>> class One(object):
  ...     implements(IAdapteeOne)

  >>> class Two(object):
  ...     implements(IAdapteeTwo)

  >>> one = One()
  >>> two = Two()

  >>> from zope.component import queryMultiAdapter

  >>> getMultiAdapter((one,two), IFunctionality) #doctest: +ELLIPSIS
  <MyFunctionality object at ...>

  >>> myfunctionality = queryMultiAdapter((one,two), IFunctionality)
  >>> myfunctionality.one #doctest: +ELLIPSIS
  <One object at ...>
  >>> myfunctionality.two #doctest: +ELLIPSIS
  <Two object at ...>


queryUtility
~~~~~~~~~~~~

This function is used to look up a utility that provides an interface.
If one is not found, returns default.

 - Location: ``zope.component``

 - Signature: `queryUtility(interface, name='', default=None)`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         return "Hello " + name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, IGreeter)

  >>> from zope.component import queryUtility

  >>> queryUtility(IGreeter).greet('Jack')
  'Hello Jack'


registerAdapter
~~~~~~~~~~~~~~~

This function is used to register an adapter factory.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registerAdapter(factory, required=None, provided=None,
   name=u'', info=u'')`

 - See also: `unregisterAdapter`_

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk, 'ng')

  You can test it like this:

  >>> queryAdapter(jack, IDesk, 'ng') #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>


registeredAdapters
~~~~~~~~~~~~~~~~~~

Return an iterable of `IAdapterRegistrations`.  These registrations
describe the current adapter registrations in the object.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registeredAdapters()`

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk, 'ng2')


  >>> reg_adapter = list(gsm.registeredAdapters())
  >>> 'ng2' in [x.name for x in reg_adapter]
  True


registeredHandlers
~~~~~~~~~~~~~~~~~~

Return an iterable of `IHandlerRegistrations`.  These registrations
describe the current handler registrations in the object.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registeredHandlers()`

Example::

  >>> import datetime

  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IDocumentCreated(Interface):
  ...     doc = Attribute("The document that was created")

  >>> class DocumentCreated(object):
  ...     implements(IDocumentCreated)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc


  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.component import adapter

  >>> @adapter(IDocumentCreated)
  ... def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()


  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerHandler(documentCreated, info='ng3')

  >>> reg_adapter = list(gsm.registeredHandlers())
  >>> 'ng3' in [x.info for x in reg_adapter]
  True

  >>> gsm.registerHandler(documentCreated, name='ng4')
  Traceback (most recent call last):
  ...
  TypeError: Named handlers are not yet supported


registeredSubscriptionAdapters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Return an iterable of `ISubscriptionAdapterRegistrations`.  These
registrations describe the current subscription adapter registrations
in the object.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registeredSubscriptionAdapters()`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IValidate(Interface):
  ...     def validate(ob):
  ...         """Determine whether the object is valid
  ...
  ...         Return a string describing a validation problem.
  ...         An empty string is returned to indicate that the
  ...         object is valid.
  ...         """

  >>> class IDocument(Interface):
  ...     summary = Attribute("Document summary")
  ...     body = Attribute("Document text")

  >>> class Document(object):
  ...     implements(IDocument)
  ...     def __init__(self, summary, body):
  ...         self.summary, self.body = summary, body

  >>> from zope.component import adapts

  >>> class AdequateLength(object):
  ...
  ...     adapts(IDocument)
  ...     implements(IValidate)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc
  ...
  ...     def validate(self):
  ...         if len(self.doc.body) < 1000:
  ...             return 'too short'
  ...         else:
  ...             return ''

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerSubscriptionAdapter(AdequateLength, info='ng4')

  >>> reg_adapter = list(gsm.registeredSubscriptionAdapters())
  >>> 'ng4' in [x.info for x in reg_adapter]
  True


registeredUtilities
~~~~~~~~~~~~~~~~~~~

This function return an iterable of `IUtilityRegistrations`.  These
registrations describe the current utility registrations in the
object.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registeredUtilities()`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         print "Hello", name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet, info='ng5')

  >>> reg_adapter = list(gsm.registeredUtilities())
  >>> 'ng5' in [x.info for x in reg_adapter]
  True


registerHandler
~~~~~~~~~~~~~~~

This function is used to register a handler.  A handler is a
subscriber that doesn't compute an adapter but performs some function
when called.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registerHandler(handler, required=None, name=u'', info='')`

 - See also: `unregisterHandler`_

Note: In the current implementation of ``zope.component`` doesn't
support `name` attribute.

Example::

  >>> import datetime

  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IDocumentCreated(Interface):
  ...     doc = Attribute("The document that was created")

  >>> class DocumentCreated(object):
  ...     implements(IDocumentCreated)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc


  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.component import adapter

  >>> @adapter(IDocumentCreated)
  ... def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()


  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerHandler(documentCreated)

  >>> from zope.component import handle

  >>> handle(DocumentCreated(doc))
  >>> doc.created.__class__.__name__
  'datetime'


registerSubscriptionAdapter
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This function is used to register a subscriber factory.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registerSubscriptionAdapter(factory, required=None,
   provides=None, name=u'', info='')`

 - See also: `unregisterSubscriptionAdapter`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IValidate(Interface):
  ...     def validate(ob):
  ...         """Determine whether the object is valid
  ...
  ...         Return a string describing a validation problem.
  ...         An empty string is returned to indicate that the
  ...         object is valid.
  ...         """

  >>> class IDocument(Interface):
  ...     summary = Attribute("Document summary")
  ...     body = Attribute("Document text")

  >>> class Document(object):
  ...     implements(IDocument)
  ...     def __init__(self, summary, body):
  ...         self.summary, self.body = summary, body

  >>> from zope.component import adapts

  >>> class AdequateLength(object):
  ...
  ...     adapts(IDocument)
  ...     implements(IValidate)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc
  ...
  ...     def validate(self):
  ...         if len(self.doc.body) < 1000:
  ...             return 'too short'
  ...         else:
  ...             return ''

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerSubscriptionAdapter(AdequateLength)


registerUtility
~~~~~~~~~~~~~~~

This function is used to register a utility.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `registerUtility(component, provided=None, name=u'',
   info=u'')`

 - See also: `unregisterUtility`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         print "Hello", name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet)


subscribers
~~~~~~~~~~~

This function is used to get subscribers.  Subscribers are returned
that provide the provided interface and that depend on and are
computed from the sequence of required objects.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `subscribers(required, provided, context=None)`

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IValidate(Interface):
  ...     def validate(ob):
  ...         """Determine whether the object is valid
  ...
  ...         Return a string describing a validation problem.
  ...         An empty string is returned to indicate that the
  ...         object is valid.
  ...         """

  >>> class IDocument(Interface):
  ...     summary = Attribute("Document summary")
  ...     body = Attribute("Document text")

  >>> class Document(object):
  ...     implements(IDocument)
  ...     def __init__(self, summary, body):
  ...         self.summary, self.body = summary, body

  >>> from zope.component import adapts

  >>> class SingleLineSummary:
  ...     adapts(IDocument)
  ...     implements(IValidate)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc
  ...
  ...     def validate(self):
  ...         if '\n' in self.doc.summary:
  ...             return 'Summary should only have one line'
  ...         else:
  ...             return ''

  >>> class AdequateLength(object):
  ...     adapts(IDocument)
  ...     implements(IValidate)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc
  ...
  ...     def validate(self):
  ...         if len(self.doc.body) < 1000:
  ...             return 'too short'
  ...         else:
  ...             return ''

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerSubscriptionAdapter(SingleLineSummary)
  >>> gsm.registerSubscriptionAdapter(AdequateLength)

  >>> from zope.component import subscribers

  >>> doc = Document("A\nDocument", "blah")
  >>> [adapter.validate()
  ...  for adapter in subscribers([doc], IValidate)
  ...  if adapter.validate()]
  ['Summary should only have one line', 'too short']

  >>> doc = Document("A\nDocument", "blah" * 1000)
  >>> [adapter.validate()
  ...  for adapter in subscribers([doc], IValidate)
  ...  if adapter.validate()]
  ['Summary should only have one line']

  >>> doc = Document("A Document", "blah")
  >>> [adapter.validate()
  ...  for adapter in subscribers([doc], IValidate)
  ...  if adapter.validate()]
  ['too short']


unregisterAdapter
~~~~~~~~~~~~~~~~~

This function is used to unregister an adapter factory.  A boolean is
returned indicating whether the registry was changed.  If the given
component is None and there is no component registered, or if the
given component is not None and is not registered, then the function
returns False, otherwise it returns True.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `unregisterAdapter(factory=None, required=None,
   provided=None, name=u'')`

 - See also: `registerAdapter`_

Example::

  >>> from zope.interface import Attribute
  >>> from zope.interface import Interface

  >>> class IDesk(Interface):
  ...     """A frontdesk will register object's details"""
  ...
  ...     def register():
  ...         """Register object's details"""
  ...

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
  ...         next_id = get_next_id()
  ...         bookings_db[next_id] = {
  ...         'name': guest.name,
  ...         'place': guest.place,
  ...         'phone': guest.phone
  ...         }

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

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()
  >>> gsm.registerAdapter(FrontDeskNG,
  ...                     (IGuest,), IDesk, 'ng6')

  You can test it like this:

  >>> queryAdapter(jack, IDesk, 'ng6') #doctest: +ELLIPSIS
  <FrontDeskNG object at ...>

  Now unregister:

  >>> gsm.unregisterAdapter(FrontDeskNG, name='ng6')
  True

  After unregistration:

  >>> print queryAdapter(jack, IDesk, 'ng6')
  None


unregisterHandler
~~~~~~~~~~~~~~~~~

This function is used for unregistering a handler.  A handler is a
subscriber that doesn't compute an adapter but performs some function
when called.  A boolean is returned indicating whether the registry
was changed.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `unregisterHandler(handler=None, required=None,
   name=u'')`

 - See also: `registerHandler`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IDocument(Interface):
  ...
  ...     summary = Attribute("Document summary")
  ...     body = Attribute("Document text")

  >>> class Document(object):
  ...
  ...     implements(IDocument)
  ...     def __init__(self, summary, body):
  ...         self.summary, self.body = summary, body

  >>> doc = Document("A\nDocument", "blah")

  >>> class IDocumentAccessed(Interface):
  ...     doc = Attribute("The document that was accessed")

  >>> class DocumentAccessed(object):
  ...     implements(IDocumentAccessed)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc
  ...         self.doc.count = 0

  >>> from zope.component import adapter

  >>> @adapter(IDocumentAccessed)
  ... def documentAccessed(event):
  ...     event.doc.count = event.doc.count + 1

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerHandler(documentAccessed)

  >>> from zope.component import handle

  >>> handle(DocumentAccessed(doc))
  >>> doc.count
  1

  Now unregister:

  >>> gsm.unregisterHandler(documentAccessed)
  True

  After unregistration:

  >>> handle(DocumentAccessed(doc))
  >>> doc.count
  0


unregisterSubscriptionAdapter
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This function is used to unregister a subscriber factory.  A boolean
is returned indicating whether the registry was changed.  If the given
component is None and there is no component registered, or if the
given component is not None and is not registered, then the function
returns False, otherwise it returns True.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `unregisterSubscriptionAdapter(factory=None,
   required=None, provides=None, name=u'')`

 - See also: `registerSubscriptionAdapter`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IValidate(Interface):
  ...     def validate(ob):
  ...         """Determine whether the object is valid
  ...
  ...         Return a string describing a validation problem.
  ...         An empty string is returned to indicate that the
  ...         object is valid.
  ...         """

  >>> class IDocument(Interface):
  ...     summary = Attribute("Document summary")
  ...     body = Attribute("Document text")

  >>> class Document(object):
  ...     implements(IDocument)
  ...     def __init__(self, summary, body):
  ...         self.summary, self.body = summary, body

  >>> from zope.component import adapts

  >>> class AdequateLength(object):
  ...
  ...     adapts(IDocument)
  ...     implements(IValidate)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc
  ...
  ...     def validate(self):
  ...         if len(self.doc.body) < 1000:
  ...             return 'too short'
  ...         else:
  ...             return ''

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerSubscriptionAdapter(AdequateLength)

  >>> from zope.component import subscribers

  >>> doc = Document("A\nDocument", "blah")
  >>> [adapter.validate()
  ...  for adapter in subscribers([doc], IValidate)
  ...  if adapter.validate()]
  ['too short']

  Now unregister:

  >>> gsm.unregisterSubscriptionAdapter(AdequateLength)
  True

  After unregistration:

  >>> [adapter.validate()
  ...  for adapter in subscribers([doc], IValidate)
  ...  if adapter.validate()]
  []


unregisterUtility
~~~~~~~~~~~~~~~~~

This function is used for unregistering a utility.  A boolean is
returned indicating whether the registry was changed.  If the
given component is None and there is no component registered, or if
the given component is not None and is not registered, then the
function returns False, otherwise it returns True.

 - Location: ``zope.component - IComponentRegistry``

 - Signature: `unregisterUtility(component=None, provided=None,
   name=u'')`

 - See also: `registerUtility`_

Example::

  >>> from zope.interface import Interface
  >>> from zope.interface import implements

  >>> class IGreeter(Interface):
  ...     def greet(name):
  ...         "say hello"

  >>> class Greeter(object):
  ...
  ...     implements(IGreeter)
  ...
  ...     def greet(self, name):
  ...         return "Hello " + name

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> greet = Greeter()
  >>> gsm.registerUtility(greet)

  >>> queryUtility(IGreeter).greet('Jack')
  'Hello Jack'

  Now unregister:

  >>> gsm.unregisterUtility(greet)
  True

  After unregistration:

  >>> print queryUtility(IGreeter)
  None
