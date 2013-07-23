---
created: ''
creator: ''
description: 多重适配，订阅和处理
title: 适配器进阶
---
.. Contents::
.. sectnum::

:原文: http://www.muthukadan.net/docs/zca.html#advanced-adapters

This chapter discuss some advanced adapters like multi adapter,
subscription adapter and handler.


多适配
~~~~~~~~~~~~~

A simple adapter normally adapts only one object, but an adapter may
adapt more than one object.  If an adapter adapts more than one
objects, it is called `multi-adapter`.

::

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


订阅适配
~~~~~~~~~~~~~~~~~~~~

Unlike regular adapters, subscription adapters are used when we want
all of the adapters that adapt an object to a particular interface.
Subscription adapter is also known as `subscriber`.

Consider a validation problem.  We have objects and we want to assess
whether they meet some sort of standards.  We define a validation
interface::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IValidate(Interface):
  ...
  ...     def validate(ob):
  ...         """Determine whether the object is valid
  ...
  ...         Return a string describing a validation problem.
  ...         An empty string is returned to indicate that the
  ...         object is valid.
  ...         """

Perhaps we have documents::

  >>> class IDocument(Interface):
  ...
  ...     summary = Attribute("Document summary")
  ...     body = Attribute("Document text")

  >>> class Document(object):
  ...
  ...     implements(IDocument)
  ...
  ...     def __init__(self, summary, body):
  ...         self.summary, self.body = summary, body

Now, we may want to specify various validation rules for
documents. For example, we might require that the summary be a single
line::

  >>> from zope.component import adapts

  >>> class SingleLineSummary:
  ...
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

Or we might require the body to be at least 1000 characters in length::

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

We can register these as subscription adapters::

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerSubscriptionAdapter(SingleLineSummary)
  >>> gsm.registerSubscriptionAdapter(AdequateLength)

We can then use the subscribers to validate objects::

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


处理器
~~~~~~~

Handlers are subscription adapter factories that don't produce
anything.  They do all of their work when called.  Handlers are
typically used to handle events.  Handlers are also known as event
subscribers or event subscription adapters.

Event subscribers are different from other subscription adapters in
that the caller of event subscribers doesn't expect to interact with
them in any direct way.  For example, an event publisher doesn't
expect to get any return value.  Because subscribers don't need to
provide an API to their callers, it is more natural to define them
with functions, rather than classes.  For example, in a
document-management system, we might want to record creation times for
documents::

  >>> import datetime

  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

In this example, we have a function that takes an event and performs
some processing.  It doesn't actually return anything.  This is a
special case of a subscription adapter that adapts an event to
nothing.  All of the work is done when the adapter "factory" is
called.  We call subscribers that don't actually create anything
"handlers".  There are special APIs for registering and calling them.

To register the subscriber above, we define a document-created event::

  >>> from zope.interface import Interface
  >>> from zope.interface import Attribute
  >>> from zope.interface import implements

  >>> class IDocumentCreated(Interface):
  ...
  ...     doc = Attribute("The document that was created")

  >>> class DocumentCreated(object):
  ...
  ...     implements(IDocumentCreated)
  ...
  ...     def __init__(self, doc):
  ...         self.doc = doc

We'll also change our handler definition to::

  >>> def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

  >>> from zope.component import adapter

  >>> @adapter(IDocumentCreated)
  ... def documentCreated(event):
  ...     event.doc.created = datetime.datetime.utcnow()

This marks the handler as an adapter of `IDocumentCreated` events.

Now we'll register the handler::

  >>> from zope.component import getGlobalSiteManager
  >>> gsm = getGlobalSiteManager()

  >>> gsm.registerHandler(documentCreated)

Now, we can create an event and use the `handle` function to call
handlers registered for the event::

  >>> from zope.component import handle

  >>> handle(DocumentCreated(doc))
  >>> doc.created.__class__.__name__
  'datetime'

