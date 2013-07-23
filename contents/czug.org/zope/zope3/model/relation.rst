zope3中对象之间的关系引用

.. Contents::
.. sectnum::

相关产品
================
zc.relationship
   这个是核心的产品，包括一个catalog和若干container。这个产品依赖zc.relation

   http://svn.zope.org/zc.relationship/trunk/src/zc/relationship

   关系和index存储在container中。

lovely.relation
   使用zc.relationship包，来实现了一些关系功能

   http://svn.zope.org/lovely.relation/trunk/src/lovely/relation

   支持更多类型的关系，比如给关系一个名字；

   可以在属性中，管理关系，同下，不佳；

plone.relations
   基于zc.releationship，迁移到zope3, 上面的说明很清晰。是用来建立对象关系，并提供关系的查询。

   http://svn.plone.org/svn/plone/plone.relations/trunk/plone/relations

   支持 5 向关系 ("sources", "targets", "relation", "getContext", "state")

zc.relation
   这个产品依赖包很少，可脱离zope使用，更底层，但是功能更少，主要是那个catalog的功能

   http://svn.zope.org/zc.relation/trunk/src/zc/relation

z3c.relationfield
   提供了一个新的 schema字段，叫做 Relation, 用于关系的控件, 以及用于存储实际关系的 Relation对象。 另外可以用 zc.relation 内部结构建立索引。整个用Grok来实现的。

   http://svn.zope.org/z3c.relationfield/trunk/src/z3c/relationfield

   关系存放在对象的字段中，自己定义了一个catalog. 感觉不好，model对象脏了

综合考虑
===============
- 主要用 lovely.relation，或者zc.relationship即可
- 高级特性的实现，可参考plone.relations

lovely.relation
===========================
This package provides functionality to realize relations using the
zc.relationship package.

  >>> from zope import component
  >>> from zope.app.intid.interfaces import IIntIds
  >>> intids = component.getUtility(IIntIds)


关系类型
-------------
relation type 用于定义是什么样的关系:

  >>> from lovely.relation.app import RelationType
  >>> relType = RelationType(u'my targets')
  >>> relType
  <RelationType u'my targets'>


关系
------------
relationships 用于和目标 targets 关联.

  >>> from lovely.relation.app import Relationship

首先，我们需要关联的源头:

  >>> class Source(object):
  ...     def __init__(self, name):
  ...         self.name = name
  ...     def __repr__(self):
  ...         return '<%s %r>' % (self.__class__.__name__, self.name)

  >>> class Target(object):
  ...     def __init__(self, name):
  ...         self.name = name
  ...     def __repr__(self):
  ...         return '<%s %r>' % (self.__class__.__name__, self.name)

  >>> source = Source('s1')
  >>> relationship = Relationship(source, [relType], [])
  >>> relationship.sources
  <Source 's1'>

  >>> relationship.relations
  [<RelationType u'my targets'>]

  >>> [o for o in relationship.targets]
  []

最重要的，定义一个关系容器，包含所有的关系，允许查询:

  >>> from lovely.relation.app import Relations
  >>> relations = Relations()
  >>> relations.add(relationship)

  >>> [o for o in relations.findTargets(source)]
  []

关系包含的对象，注册在IntIds工具里面：

  >>> intids = component.getUtility(IIntIds)
  >>> sourceId = intids.getId(source)
  >>> sourceId is None
  False

管理里面，增加一个target

  >>> target = Target('o1 of s1')
  >>> relationship.targets = [target]
  >>> targetId = intids.getId(target)
  >>> targetId is None
  False

现在可以进行目标查找:

  >>> [o for o in relations.findTargets(source)]
  [<Target 'o1 of s1'>]

  >>> [o for o in relations.findTargetTokens(source)] == [intids.getId(target)]
  True

可以在查询中，使用intid:

  >>> [o for o in relations.findTargets(sourceId)]
  [<Target 'o1 of s1'>]

The above lookup returns all targets of all existing relations. If we want to
see only the targets of a specific relation then we need to provide the
relation.

  >>> [o for o in relations.findTargets(source, relType)]
  [<Target 'o1 of s1'>]
  >>> [o for o in relations.findTargets(sourceId, relType)]
  [<Target 'o1 of s1'>]

We can also ask the other way around.

  >>> [s for s in relations.findSources(target, relType)]
  [<Source 's1'>]
  >>> [s for s in relations.findSources(targetId, relType)]
  [<Source 's1'>]

  >>> [s for s in relations.findSourceTokens(target, relType)] == [intids.getId(source)]
  True

We can also ask for all target of a relation without specifying the source.

  >>> list(relations.findRelationTargets(relType))
  [<Target 'o1 of s1'>]

  >>> list(relations.findRelationTargetTokens(relType)) == [intids.getId(target)]
  True

And the same for sources.

  >>> list(relations.findRelationSources(relType))
  [<Source 's1'>]

  >>> list(relations.findRelationSourceTokens(relType)) == [intids.getId(source)]
  True

Now lets create new targets and a new relationship.

  >>> s2 = Source('s2')
  >>> o2 = Target('o2 of s2')
  >>> r2 = Relationship(s2, [relType], [target, o2])
  >>> relations.add(r2)

  >>> sorted([s for s in relations.findSources(target, relType)],
  ...        key=lambda x:x.name)
  [<Source 's1'>, <Source 's2'>]

  >>> list(relations.findRelationTargets(relType))
  [<Target 'o1 of s1'>, <Target 'o2 of s2'>]

  >>> list(intids.getObject(s) for s in relations.findRelationTargetTokens(relType))
  [<Target 'o1 of s1'>, <Target 'o2 of s2'>]

  >>> list(relations.findRelationSources(relType))
  [<Source 's1'>, <Source 's2'>]

  >>> list(intids.getObject(s).sources for s in relations.findRelationTokens(relType))
  [<Source 's1'>, <Source 's2'>]


2个对象之间的多种关系
-------------------------------------
2个对象之间，可以存在多个关系：

  >>> rel1 = Relationship(source, [relType], [])
  >>> rel1.targets = [target]
  >>> relations.add(rel1)

现在relType有3个关系了:

  >>> list(intids.getObject(s).sources for s in relations.findRelationTokens(relType))
  [<Source 's1'>, <Source 's2'>, <Source 's1'>]

但我们只能看到不同的源:

  >>> [s for s in relations.findSources(target, relType)]
  [<Source 's1'>, <Source 's2'>]

Removing one relation...

  >>> relations.remove(rel1)

changes the seen relations...

  >>> list(intids.getObject(s).sources for s in relations.findRelationTokens(relType))
  [<Source 's1'>, <Source 's2'>]

but not the sources

  >>> [s for s in relations.findSources(target, relType)]
  [<Source 's1'>, <Source 's2'>]

关系类型
--------------
Relation types can be provided to Relations via a RelationTypes container. The
container can then be registered as a utility.



  >>> from lovely.relation.interfaces import IBasicRelationTypes
  >>> from lovely.relation.app import RelationTypes
  >>> types = RelationTypes()
  >>> types
  <RelationTypes None>

  >>> from zope import component
  >>> component.provideUtility(types, IBasicRelationTypes)

Now we can put our relations into this container and use them by name.

  >>> types['my targets'] = relType
  >>> types['my targets']
  <RelationType u'my targets'>

Now we can use the relation name to lookup for related targets.

  >>> sorted([s for s in relations.findSources(target, 'my targets')],
  ...        key=lambda x:x.name)
  [<Source 's1'>, <Source 's2'>]


更多的目标
------------

  >>> targets = []
  >>> for i in range(1000):
  ...     targets.append(Target('o%i'%i))
  >>> for i in range(5):
  ...     s = Source('s%i'%i)
  ...     r = Relationship(s, [relType], targets)
  ...     relations.add(r)

  >>> sorted([s for s in relations.findSources(targets[44], 'my targets')],
  ...        key=lambda x:x.name)
  [<Source 's0'>, <Source 's1'>, <Source 's2'>, <Source 's3'>, <Source 's4'>]


优化的一对多关系
-----------------------------------------------

A predefined one to many relationship using a btree to store and retrieve the
many relation.

  >>> from lovely.relation.app import OneToManyRelationship
  >>> otmSource = Source(u'otm source')
  >>> relType = RelationType(u'otm relation')
  >>> types[u'otm relation'] = relType
  >>> otm = OneToManyRelationship(otmSource, [relType])
  >>> otm.sources
  <Source u'otm source'>

  >>> otm.relations
  [<RelationType u'otm relation'>]

  >>> [o for o in otm.targets]
  []

The one to many relationship provides an extended interface.

  >>> from lovely.relation.interfaces import IOneToManyRelationship
  >>> IOneToManyRelationship.providedBy(otm)
  True

This interface allows us to add and remove targets.

  >>> otmTarget = Target(u'otm obj 1')
  >>> otm.add(otmTarget)
  >>> [o for o in otm.targets]
  [<Target u'otm obj 1'>]

We put the relationship into our relations container.

  >>> relations.add(otm)
  >>> sorted([s for s in relations.findSources(otmTarget, 'otm relation')])
  [<Source u'otm source'>]

  >>> otm.remove(otmTarget)
  >>> [o for o in otm.targets]
  []


访问关系
-----------------------

  >>> target44 = targets[44]
  >>> targetRelations = list(relations.findTargetRelationships(target44))
  >>> len(targetRelations)
  5

  >>> source = targetRelations[0].sources
  >>> source
  <Source 's0'>

  >>> sourceRelations = list(relations.findSourceRelationships(source))
  >>> len(sourceRelations)
  1

  >>> len(sourceRelations[0].targets)
  1000

  >>> target44 in sourceRelations[0].targets
  True


更多关系
--------------

A relationship can belong to more than just one relation type. First we need a
new relation type. This time we do not add the type to the relation types
container.

  >>> otherRelType = RelationType(u'my other targets')
  >>> otherRelType
  <RelationType u'my other targets'>

  >>> rel = targetRelations[0]
  >>> rel.addRelation(otherRelType)

Now we lookup the source for relation 'my targets'.

  >>> sorted([s for s in relations.findSources(target44, 'my targets')],
  ...        key=lambda x:x.name)
  [<Source 's0'>, <Source 's1'>, <Source 's2'>, <Source 's3'>, <Source 's4'>]

Now we can also lookup the sources for the new relation.

  >>> sorted([s for s in relations.findSources(target44, 'my other targets')],
  ...        key=lambda x:x.name)
  Traceback (most recent call last):
  ...
  KeyError: 'my other targets'

We get a KeyError because our new source is not stored in the relation types
container, but if we use the relation type target we get the result.

  >>> sorted([s for s in relations.findSources(target44, otherRelType)],
  ...        key=lambda x:x.name)
  [<Source 's0'>]

And let's remove the relation.

  >>> rel.removeRelation(otherRelType)
  >>> sorted([s for s in relations.findSources(target44, otherRelType)],
  ...        key=lambda x:x.name)
  []


更多关系类型
-------------------

Subclasses of Relationship and Relations can control which container relation
types are looked up in by overriding the `relationtypes` property.

  >>> from zope import interface
  >>> from zope import component
  >>> from lovely.relation.app import OneToOneRelationship
  >>> from lovely.relation.app import OneToOneRelationships

  >>> class IMyTypes(interface.Interface):
  ...     pass

  >>> class MyTypes(RelationTypes):
  ...     interface.implements(IMyTypes)

  >>> mytypes = MyTypes()
  >>> mytypes[u'foo'] = RelationType(u'foo')
  >>> mytypes[u'bar'] = RelationType(u'bar')
  >>> mytypes[u'baz'] = RelationType(u'baz')

Note that we don't need to register the utility for IRelationTypes

  >>> component.provideUtility(mytypes, IMyTypes)

  >>> class MyRelationship(OneToOneRelationship):
  ...     @property
  ...     def relationtypes(self):
  ...         return component.getUtility(IMyTypes)

  >>> class MyRelationships(OneToOneRelationships):
  ...     @property
  ...     def relationtypes(self):
  ...         return component.getUtility(IMyTypes)

Check Relationship

  >>> myrelationship = MyRelationship(None, [u'foo'], None)
  >>> myrelationship.relations
  [<RelationType u'foo'>]

  >>> myrelationship = MyRelationship(None, [u'bar', u'baz'], None)
  >>> myrelationship.relations
  [<RelationType u'bar'>, <RelationType u'baz'>]

Check relationship container

  >>> item1 = Source(u'Fred')
  >>> item2 = Target(u'Barney')

  >>> myrelations = MyRelationships()
  >>> myrelationship = MyRelationship(item1, [u'foo'], item2)
  >>> myrelations.add(myrelationship)

Find sources

  >>> [o for o in myrelations.findSources(item2)]
  [<Source u'Fred'>]

  >>> [o for o in myrelations.findSources(item2, relation=u'foo')]
  [<Source u'Fred'>]

  >>> [o for o in myrelations.findSources(item2, relation=u'bar')]
  []

Find targets

  >>> [o for o in myrelations.findTargets(item1)]
  [<Target u'Barney'>]

  >>> [o for o in myrelations.findTargets(item1, relation=u'foo')]
  [<Target u'Barney'>]

  >>> [o for o in myrelations.findTargets(item1, relation=u'bar')]
  []

Find relationships

  >>> [o for o in myrelations.findSourceRelationships(item1)]
  [<MyRelationship ...>]

  >>> [o for o in myrelations.findSourceRelationships(item1, relation=u'foo')]
  [<MyRelationship ...>]

  >>> [o for o in myrelations.findSourceRelationships(item1, relation=u'bar')]
  []

  >>> [o for o in myrelations.findTargetRelationships(item2)]
  [<MyRelationship ...>]

  >>> [o for o in myrelations.findTargetRelationships(item2, relation=u'foo')]
  [<MyRelationship ...>]

  >>> [o for o in myrelations.findTargetRelationships(item2, relation=u'bar')]
  []

配置器
------------

There is also a configurator implemented for site objects which
registers a IO2OStringTypeRelationships utility with a given name. The
name is optional.

  >>> from lovely.relation import configurator
  >>> util = configurator.SetUpO2OStringTypeRelationships(root)
  >>> util({'name':'myRelations'})
  >>> root.getSiteManager()['default']['o2oStringTypeRelationships_myRelations']
  <O2OStringTypeRelationships u'o2oStringTypeRelationships_myRelations'>

We can run it twice, so it does nothing.

  >>> util({'name':'myRelations'})

We also have a method for testing which is doing the setup.

  >>> from lovely.relation.testing import setUpPlugins
  >>> setUpPlugins()

An adapter has been registered.

  >>> from z3c.configurator.interfaces import IConfigurationPlugin
  >>> component.getAdapter(root,
  ...                      IConfigurationPlugin,
  ...                      name="lovely.relation.o2oStringTypeRelations")
  <lovely.relation.configurator.SetUpO2OStringTypeRelationships object at ...>


修改关系
-------------------

  >>> from lovely.relation.app import RepairOneToOne
  >>> component.provideAdapter(RepairOneToOne)

  >>> from lovely.relation.interfaces import IRepair
  >>> repairer = IRepair(relations)

We can call the repair method to repair the relation container.

  >>> repairer.repair()
  0

We can get the targets of our source.

  >>> [o for o in relations.findTargets(sourceId)]
  [<Target 'o1 of s1'>]

Now we unregister the target from the intids utility.

  >>> intids.unregister(target)

and get a key error if we try to get targets of our source.
This happens because the intid is still stored in the relation.

  >>> [o for o in relations.findTargets(sourceId)]
  Traceback (most recent call last):
  ...
  KeyError: ...

If we repair the relation container

  >>> repairer.repair()
  2

we can ask for the targets of the source without a key error.

  >>> [o for o in relations.findTargets(sourceId)]
  []

Warning:

The use of the integrated repair function removes a relation if at least one
of the referenced items can not be loaded. It should only be used on one to
one relations.

plone.relations
========================
Introduction
------------

Tools for defining and querying complex relationships between objects.  

参考： zc.relationship  container.txt

This is a product built on the ``zc.relationship`` product for Zope 3.

关系容器
-----------------------------
用于存储和查询实现了IRelationship接口的对象，也支持更加复杂的关系。

其他的功能在 IRelationship 扩展接口中实现：

IRelationship：基础
    defines a basic relationship consisting of
    only ``sources`` and ``targets``.  These are sequences of
    objects that comprise the relationship.  In the default
    implementation these must all be persistent objects from
    the ZODB (or more generally, objects for which and
    ``intid`` can be generated using the available ``IIntId``
    utility (cf ``zope.app.intid`` and ``five.intid``)).

IComplexRelationship：有名字
    adds a relationship predicate to
    indicate the type of relationship involved.  This
    predicate is retrieved from an attribute called
    ``relation`` which should be an immutable unicode string
    (so a zope.i18n.Message can be used) in the default
    implementation.

IContextAwareRelationship: 上下文
    adds a context in which the
    relationship applies.  This context is provided by a
    method called ``getContext`` which, in the default
    implementation, should return objects of the same sort
    required by IRelationship (e.g. persistent objects from
    the ZODB).  

    示例： a hierarchical relationship which
    exists only within the _context_ of a specific department
    or project.

IStatefulRelationship: 有状态
    adds a relationship state to
    indicate the status of a particular relationship in the
    case that the relationship is one which changes over time
    or as a result of user actions.  This state is retrieved
    from an attribute called ``state`` which should be an
    immutable unicode string (see above). 

    示例: a relationship which requires explicit approval by the
    involved target objects, it would start in an unapproved
    ``state`` and then transition to approved when the target
    objects had signaled their approval.  Also, the ``state``
    may represent a different stages of a particular
    relationship, e.g. ``stranger``, ``acquaintance``,
    ``pal``, ``friend``, ``BFF``.

These additional interfaces are entirely optional and may will be
looked up using adaptation to the desired interface.  So the
relationship objects themselves do not have to directly provide these
properties or methods, though that is also possible.  Only ``sources``
and ``targets`` are required to make a query-able relationship.

This additional richness could have been obtained using post query
filters, as supported by the default ``zc.relationship`` container.
However, filtering in this way is much less efficient that allowing
these potentially common attributes to be indexed and queried directly
(especially when doing so only results in a small increase in storage
requirements.


使用这个包
------------------
First you need a site with some content and by default an ``IIntId``
utility.  This was created for us by the test setup which has provided
us with an ``app`` an ``IIntId`` utility provided by the
``five.intid`` package.  Additionally, we need to create a
relationship container to use:

    >>> from plone.relations import tests
    >>> tests.setUp(app)

    >>> import transaction
    >>> from plone.relations import interfaces
    >>> from plone.relations.container import Z2RelationshipContainer
    >>> container = Z2RelationshipContainer()
    >>> from zope.interface.verify import verifyObject
    >>> verifyObject(interfaces.IComplexRelationshipContainer, container)
    True
    >>> app._setOb('references', container)
    >>> container.__name__ = 'references'
    >>> container.__parent__ = app
    >>> container = app['references']


This would generally be registered as a named local utility providing
the ``IComplexRelationshipContainer`` interface, but we will use it
directly.  Now we make some relationships, using the provided
``Relationship`` class which implements ``IRelationship`` and has a
built-in adapter to IComplexRelationship.  To properly illustrate the
potential complexity of relationships we will use some characters and
contexts from the 1974 film _Chinatown_:

    >>> from plone.relations.tests import ChinatownSetUp
    >>> ChinatownSetUp(app) #creates our characters and contexts
    >>> from plone.relations.relationships import Z2Relationship as Relationship
    >>> rel1 = Relationship((app['noah'],), (app['evelyn'],), relation='parent')
    >>> verifyObject(interfaces.IRelationship, rel1)
    True
    >>> interfaces.IComplexRelationship(rel1).relation
    'parent'
    >>> container.add(rel1)
    >>> rel2 = Relationship((app['hollis'],), (app['noah'],), relation='business-partner')
    >>> container.add(rel2)

Note that there is a default adatper for IRelationship objects which
provides IComplexRelationship using a simple attribute on the
relationship.

Then we add a relationship with a state, by directly applying the
interface and adding the attribute (which is not such a great way to
do this):

    >>> rel3 = Relationship((app['hollis'],), (app['evelyn'],), relation='intimate')
    >>> rel3.state = 'married'
    >>> from plone.relations.interfaces import IStatefulRelationship
    >>> from zope.interface import alsoProvides
    >>> alsoProvides(rel3, IStatefulRelationship)
    >>> container.add(rel3)

We currently have a simple tree::

    noah <---(business-partner)---
     | (parent)                   |
     v                            |
   evelyn <-(intimate:married)- hollis

Now we can make queries against this simple data set, like finding
objects for which a another object is the source or target:

    >>> list(container.findTargets(source=app['hollis']))
    [<Demo noah>, <Demo evelyn>]
    >>> list(container.findTargets(source=app['hollis'], relation='intimate'))
    [<Demo evelyn>]
    >>> list(container.findTargets(source=app['hollis'], relation='intimate', state='married'))
    [<Demo evelyn>]
    >>> list(container.findTargets(source=app['hollis'], relation='intimate', state='divorced'))
    []
    >>> list(container.findTargets(source=app['evelyn'], relation='parent'))
    []
    >>> list(container.findTargets(source=app['noah'], relation='parent'))
    [<Demo evelyn>]
    >>> list(container.findSources(target=app['evelyn']))
    [<Demo noah>, <Demo hollis>]
    >>> list(container.findSources(target=app['evelyn'], relation='parent'))
    [<Demo noah>]
    >>> list(container.findSources(target=app['evelyn'], relation='intimate'))
    [<Demo hollis>]


关系链传递
------------

We can also generate a list of relationships, and even look
transitively at chains of relationships by specifying a maxDepth (and
optionally a minDepth) for any of the queries.  In particular the
findRelationships method will seek out chains of relationship matching
the specified parameters.  Let's look at the ways that ``hollis`` and
``evelyn`` are connected:

    >>> list(container.findRelationships(source=app['hollis'],
    ...                                  target=app['evelyn'], maxDepth=2))
    [(<Relationship 'intimate' from (<Demo hollis>,) to (<Demo evelyn>,)>,), (<Relationship 'business-partner' from (<Demo hollis>,) to (<Demo noah>,)>, <Relationship 'parent' from (<Demo noah>,) to (<Demo evelyn>,)>)]

``Hollis`` is ``evelyn's`` husband, and also her father's associate.


修改关系
-----------------------

The above method also allows us to access existing relationships
directly, which is especially helpful when we want to alter them.  In
this case ``hollis`` has been _murdered_; so ``evelyn`` is now his
widow. We express this with a state change on the relationship, note that
we have to reindex the relationship after applying the state directly
to it, if we had used an adapter to provide the state, then it should
have taken care of this for us when the attribute was set.:

    >>> relations = container.findRelationships(target=app['evelyn'], relation='intimate')
    >>> relations = list(relations)
    >>> relations
    [(<Relationship 'intimate' from (<Demo hollis>,) to (<Demo evelyn>,)>,)]
    >>> marriage = relations[0][0]
    >>> marriage.state = 'widowed'
    >>> container.reindex(marriage) # an adapter could handle this, as
    ...                             # we'll see later with context

We have changed the state of the marriage, let's ensure we can still
find it the same way we did before, but also using out new state:

    >>> list(container.findTargets(source=app['hollis'], relation='intimate'))
    [<Demo evelyn>]
    >>> list(container.findTargets(source=app['hollis'], relation='intimate', state='widowed'))
    [<Demo evelyn>]
    >>> list(container.findTargets(source=app['hollis'], relation='intimate', state='happy'))
    []

Now let's add some more relationships, including one with an unknown
``relation``. Here is the new relation tree::

            noah <----(business-partner)---
             | (parent)                    |
             v                             |
           evelyn <-(intimate:widowed)- hollis
             /\
    (client)/  \ (??)
           v    v
        jake    katherine

and the associated code:

    >>> rel4 = Relationship((app['evelyn'],), (app['jake'],), relation='client')
    >>> rel5 = Relationship((app['evelyn'],), (app['katherine'],))
    >>> container.add(rel4)
    >>> container.add(rel5)


    >>> sorted([repr(r) for r in container.findTargets(source=app['evelyn'])])
    ['<Demo jake>', '<Demo katherine>']
    >>> list(container.findTargets(source=app['evelyn'], relation=None))
    [<Demo katherine>]
    >>> list(container.findTargets(source=app['noah'], relation=None))
    []

Note that we can find entries with empty parameters using None as the
query argument.


查找是否某些对象是否相关
-------------------------------

We can use maxDepth, like we did with the ``findRelationship``
queries, for any other query methods. A particularly useful one is
``isLinked``, which determines if any matching relationship chains
exist for a given query:

    >>> sorted([repr(r) for r in container.findTargets(source=app['noah'],
    ...                                                maxDepth=2)])
    ['<Demo evelyn>', '<Demo jake>', '<Demo katherine>']
    >>> container.isLinked(source=app['noah'], target=app['jake'])
    False
    >>> container.isLinked(source=app['noah'], target=app['jake'], maxDepth=2)
    True
    >>> container.isLinked(source=app['noah'], target=app['katherine'],
    ...                    relation='parent', maxDepth=2)
    False

So, as far as we know, ``noah`` and ``katherine`` are not linked via
parental relationships.


上下文
-------------

Now we'll apply a context to an existing relationship using a simple
adapter, in the real world this extra data would probably be stored
using an annotation on the relationship, but here we store it directly:

    >>> class ContextAdapter(object):
    ...     def __init__(self, relationship):
    ...         self.relationship = relationship
    ...     def getContext(self):
    ...         return getattr(self.relationship, '_context', None)
    ...     def setContext(self, context):
    ...         self.relationship._context = context
    ...         #reindex ourself in the container
    ...         if self.relationship.__parent__ is not None:
    ...             self.relationship.__parent__.reindex(self.relationship)
    >>> from zope.component import provideAdapter
    >>> provideAdapter(ContextAdapter, (interfaces.IRelationship,), interfaces.IContextAwareRelationship)

Right now the ``client`` relationship between ``evelyn`` and ``jake``
doesn't tell us much because there are potentially many different
contexts for a client relationship.  In this case ``jake`` is a
private investigator and the context is the ``investigation`` of
``hollis'`` murder.  This ``investigation`` object could consist of
notes pertaining to the investigation or other relevant data.  We
apply it to the relationship as a context:

    >>> list(container.findSources(target=app['jake'], relation='client',
    ...                            context=app['investigation']))
    []
    >>> relationships = list(container.findRelationships(source=app['evelyn'],
    ...                                                  target=app['jake']))
    >>> relationships
    [(<Relationship 'client' from (<Demo evelyn>,) to (<Demo jake>,)>,)]
    >>> evelyn_jake = relationships[0][0]
    >>> interfaces.IContextAwareRelationship(evelyn_jake).setContext(
    ...                                                   app['investigation'])
    >>> list(container.findSources(target=app['jake'], relation='client',
    ...                            context=app['investigation']))
    [<Demo evelyn>]
    >>> list(container.findSources(target=app['jake'], context=None))
    []
    >>> list(container.findSources(target=app['katherine'], context=None))
    [<Demo evelyn>]


In time some additional relationships develop. ``Jake`` and ``katherine``
have a fling during the investigation.  Also, ``jake`` becomes suspicious
of ``hollis'`` business partner and father-in-law ``noah``:

    >>> rel6 = Relationship((app['jake'],), (app['evelyn'],), 'intimate')
    >>> rel6.state = 'fling'
    >>> interfaces.IContextAwareRelationship(rel6).setContext(app['investigation'])
    >>> rel7 = Relationship((app['jake'],), (app['noah'],), 'nemesis')
    >>> interfaces.IContextAwareRelationship(rel7).setContext(app['investigation'])
    >>> container.add(rel6)
    >>> container.add(rel7)


多个关系链和环
---------------------------------------

We've got a fairly complex graph, but an existing relationship becomes
a little clearer, when we learn katherine is evelyn's sister:

    >>> murky = list(container.findRelationships(source=app['evelyn'],
    ...                                          target=app['katherine']))
    >>> evelyn_katherine = murky[0][0]
    >>> interfaces.IComplexRelationship(evelyn_katherine).relation = 'sibling'

Here's the current relationship tree in ASCII form::

            (nemesis)---->noah <-----(business-partner)--
     [investigation]|      | (parent)                    |
                    |      v                             |
    (intimate:fling)|--> evelyn <-(intimate:widowed)- hollis
    [investigation] |      /\
                    |(client)\
               [investigation]\ (sibling)
                    |   /      \
                    |  v        v
                    jake       katherine

This complexity will allow us to explore how the relationship query
mechanisms resolve multiple relationship paths:

    >>> list(container.findTargets(source=app['jake'], context=app['investigation']))
    [<Demo evelyn>, <Demo noah>]
    >>> list(container.findRelationships(context=app['investigation']))
    [(<Relationship 'client' from (<Demo evelyn>,) to (<Demo jake>,)>,), (<Relationship 'intimate' from (<Demo jake>,) to (<Demo evelyn>,)>,), (<Relationship 'nemesis' from (<Demo jake>,) to (<Demo noah>,)>,)]

The first findTargets example above shows all the people that are
``jake's`` targets in the context of the investigation.  Then we have
a map of all the relationships that apply in the context of the
investigation.

In the end of the film we discover some rather sinister connections
between these characters.  ``Noah`` was ``hollis'`` murderer, and also
had an inappropriate intimate relationship with his daughter
``evelyn`` which resulted in their daughter ``katherine``.  We add
those relationships below (note how one can use multiple sources or
targets for a single relationship with ``noah`` and ``evelyn`` the
sources for their parental relationship with ``katherine``)::

    noah-(intimate[the past])->evelyn
       |\                     /
       | \                   /
       |  \                 /
       |   \  (parents)    /
       |    -->katherine<--
   (murderer)
       |
     hollis

and the code:

    >>> rel8 = Relationship((app['noah'],), (app['evelyn'],), 'intimate')
    >>> interfaces.IContextAwareRelationship(rel8).setContext(app['the past'])
    >>> container.add(rel8)

    >>> rel9 = Relationship((app['noah'],), (app['hollis'],), 'murderer')
    >>> container.add(rel9)

    >>> rel10 = Relationship((app['evelyn'], app['noah']), (app['katherine'],),
    ...                      'parent')
    >>> container.add(rel10)

At this point the relationship tree is far too complex and full of
loops to draw understandably using ascii art. However, it's no trouble
for our relationship container to inspect it:

    >>> list(container.findSources(target=app['katherine'], relation='parent', maxDepth=None))
    [<Demo evelyn>, <Demo noah>]
    >>> list(container.findRelationships(source=app['noah'],
    ...                                  target=app['katherine'],
    ...                                  relation='parent', maxDepth=None))
    [(<Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>,), (<Relationship 'parent' from (<Demo noah>,) to (<Demo evelyn>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)]

This is the same query we tried earlier when we were unclear of
relation between ``katherine`` and ``noah``.  Now we can see that
``noah`` is both her father and grandfather (ick!).

Exploring the relationships pointing to ``katherine`` from ``evelyn``
yields a pretty crazy picture, even when we restrict ourselves to
paths of at most 2 relationships (we need to play some tricks to
ensure that the results are returned in a repeatable order, so that
this test passes):

    >>> relations = container.findRelationships(target=app['katherine'],
    ...                                         maxDepth=2)
    >>> res = [repr(r) for r in relations]
    >>> res.sort(key=lambda x:(len(x), x)) # sort by length
    >>> print '\n'.join(res)
    (<Relationship 'sibling' from (<Demo evelyn>,) to (<Demo katherine>,)>,)
    (<Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>,)
    (<Relationship 'parent' from (<Demo noah>,) to (<Demo evelyn>,)>, <Relationship 'sibling' from (<Demo evelyn>,) to (<Demo katherine>,)>)
    (<Relationship 'intimate' from (<Demo jake>,) to (<Demo evelyn>,)>, <Relationship 'sibling' from (<Demo evelyn>,) to (<Demo katherine>,)>)
    (<Relationship 'intimate' from (<Demo noah>,) to (<Demo evelyn>,)>, <Relationship 'sibling' from (<Demo evelyn>,) to (<Demo katherine>,)>)
    (<Relationship 'intimate' from (<Demo hollis>,) to (<Demo evelyn>,)>, <Relationship 'sibling' from (<Demo evelyn>,) to (<Demo katherine>,)>)
    (<Relationship 'nemesis' from (<Demo jake>,) to (<Demo noah>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)
    (<Relationship 'parent' from (<Demo noah>,) to (<Demo evelyn>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)
    (<Relationship 'intimate' from (<Demo jake>,) to (<Demo evelyn>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)
    (<Relationship 'intimate' from (<Demo noah>,) to (<Demo evelyn>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)
    (<Relationship 'intimate' from (<Demo hollis>,) to (<Demo evelyn>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)
    (<Relationship 'business-partner' from (<Demo hollis>,) to (<Demo noah>,)>, <Relationship 'parent' from (<Demo evelyn>, <Demo noah>) to (<Demo katherine>,)>)


The relationships are as follows:

  evelyn \|-(sibling)-> katherine
  evelyn+noah \|-(parent)-> katherine
  noah \|-(parent)-> evelyn \|-(sibling)-> katherine
  jake \|-(intimate)-> evelyn \|-(sibling)-> katherine
  noah \|-(intimate)-> evelyn \|-(sibling)-> katherine
  hollis \|-(intimate)-> evelyn \|-(sibling)-> katherine
  jake \|-(nemesis)-> noah \|-(parent)-> katherine
  noah \|-(parent)-> evelyn \|-(parent)-> katherine
  jake \|-(intimate)-> evelyn \|-(parent)-> katherine
  noah \|-(intimate)-> evelyn \|-(parent)-> katherine
  hollis \|-(intimate)-> evelyn \|-(parent)-> katherine
  hollis \|-(business-partner)-> noah \|-(parent)-> katherine


It's important to note that nothing explodes when a cycle is found.
The result in such a case is just a special tuple that implements
ICircularRelationshipPath.  We can see this by looking at the simplest
cycles between ``evelyn`` and herself:

    >>> list(container.findRelationships(source=app['evelyn'],
    ...                                  target=app['evelyn'], maxDepth=2))
    [cycle(<Relationship 'client' from (<Demo evelyn>,) to (<Demo jake>,)>, <Relationship 'intimate' from (<Demo jake>,) to (<Demo evelyn>,)>)]

实例分析
==============
人员和组之间的关系

- 每个org_container的sitemanager中安装initid以及catalog

  这个自动装

- 添加人员到组，实际上，就是添加一个人员和组之间的relation

