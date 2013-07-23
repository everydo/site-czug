索引和搜索

.. Contents::
.. sectnum::

如何找到一个Model对象？

最简单的方法，是利用容器的values方法，逐个容器把对象找出来，进行比较是否是我们所需要的对象。

这个方法，存在的问题是，可能非常慢。就好像我们去查一个字典的时候，没有目录，直接逐页查找一样。

因此，我们需要提供一个类似字典索引目录这样的东西，加快对象的查找。

对象的引用方法Reference
===========================
在字典中，那个汉字就是整个字解释的引用，这个是直观的。

但是，对于对象，我们有没有一个方法，通过简单的一个标识，来标定这个对象呢？

一旦有了这个标识，我们才可能对对象进行索引。

由于这个太内部，我们也可以忽略本节。

直接引用
-------------------
通常Python中，如果采用直接强引用，只有所有引用对象全部删除，对象才会从内存中去除::

  >>> obj = MyObj()
  >>> obj.live = True
  >>> obj_ref = obj
  >>> del obj
  >>> obj_ref.live
  True
  >>> del obj_ref

所以，如果在目录中进行强引用，那是绝对错误的，会导致对象永远不能删除。

弱引用
-------------------
Python中有弱引用::

  >>> import weakref
  >>> weak_obj = weakref.ref(obj)
  >>> weak_obj() is obj
  True
  >>> del obj
  >>> weak_obj() is None
  True

但是，Python默认的weakref不支持ZODB存储，用 ``persistent.wref.WeakRef `` 代替 ``weakref.ref`` 即可。

键引用 Key reference
-----------------------
弱引用存在一个问题：对象必须可hash.

因此站点上有一个整数ID工具，存放一个整数ID，而不是weak reference. 这个整数，也就是对象的Key reference. 
这个intid的工具，就是对象和整数的映射字典，可注册和查询。

只需要做适配 zope.app.keyreference.interfaces.IKeyReference 即可。不用担心，Zope已经提供了对Persistent对象的适配，因此我们不需要担心什么！

这个对象<->整数的索引，是对象索引的基础。其他索引，只需要记录这个整数即可。

创建IntId::

      from zope.app.intid import IntIds
      from zope.app.intid.interfaces import IIntIds

      sm = site.getSiteManager()
      intids = IntIds()
      sm['default']['intids'] = intids
      sm.registerUtility(intids, IIntIds)

z3c.indexer 概述
==============================

z3c.indexer vs zope.app.catalog
------------------------------------------
z3c.indexer是最新的东东，性能更好，更柔性，支持(跨站点)组合查询.

- 显示的说明什么东西，在哪里进行索引，而不是自动
- 减少index调用，仅仅在需要的时候调用
- 去除了一个存储的catalog对象
- index直接就是utility


indexer概念
----------------
- 每个index都是utility
- IIndexer是适配器，负责对象在一个或者多个索引上去索引
- The default IIndexer adapter will lookup a IIndexValue multi adapter for each
  (object, index) tuple and get the right value from this adapter. You can 
  register custom IIndexer adapters for your objects if you like to avoid this
  additional adapter call.
- Each obj, index pair can have a IIndexValue multi adapter which knows how
  to get the value which get indexed. Only needed if no IIndexer adapter is
  available for your custom object.
- 没那么多自动，需要手动订阅IntIdAddedEvent更新索引

This will allow you to
----------------------

- choose when you index

- choose how you index, e.g.

  - in AddForm
  
    - call index per object

  - in large data imports
  
    - call update on index after import all objects

And you can make custom speedup improvments like

- index per object or update the index after adding large data sets without
  indexing on each object added event

- write index with built in value getter

索引
==================

每个索引都应该注册为工具！

TextIndex
---------

Setup a text index:

  >>> from z3c.indexer.index import TextIndex
  >>> textIndex = TextIndex()
  >>> sm['default']['textIndex'] = textIndex
  >>> sm.registerUtility(textIndex, interfaces.IIndex, name='textIndex')

创建了一个名字叫做textIndex的索引，存放到local site manager中。

如果需要支持中文全文索引，需要使用润普公司有贡献一个中文分词插件的cjksplitter。

  >>> from zopen.cjksplitter import CJKSplitter
  >>> from zope.index.text.lexicon import CaseNormalizer, StopWordRemover
  >>> lexicon = Lexicon(CJKSplitter(), CaseNormalizer(), StopWordRemover())
  >>> textIndex = TextIndex(lexicon = lexicon)

FieldIndex
----------
Setup a field index:

  >>> from z3c.indexer.index import FieldIndex
  >>> fieldIndex = FieldIndex()
  >>> sm['default']['fieldIndex'] = fieldIndex
  >>> sm.registerUtility(fieldIndex, interfaces.IIndex, name='fieldIndex')


ValueIndex
----------

The valueindex is an index similar to, but more flexible than a standard Zope
field index.  The index allows searches for documents that contain any of a
set of values; between a set of values; any (non-None) values; and any empty
values.

Setup a value index:

  >>> from z3c.indexer.index import ValueIndex
  >>> valueIndex = ValueIndex()
  >>> sm['default']['valueIndex'] = valueIndex
  >>> sm.registerUtility(valueIndex, interfaces.IIndex, name='valueIndex')


SetIndex
--------
The setindex is an index similar to, but more general than a traditional
keyword index.  The values indexed are expected to be iterables; the index
allows searches for documents that contain any of a set of values; all of a set
of values; or between a set of values.

Setup a set index:

  >>> from z3c.indexer.index import SetIndex
  >>> setIndex = SetIndex()
  >>> sm['default']['setIndex'] = setIndex
  >>> sm.registerUtility(setIndex, interfaces.IIndex, name='setIndex')

Indexer 索引建立器
=========================

单索引器
-------------------
建立适配器

Setup a indexer adapter for our content object. Let's define a IIndexer class
which knows how to index text given from body and description attribute:

  >>> from z3c.indexer.indexer import ValueIndexer
  >>> class DemoValueIndexer(ValueIndexer):
  ...     zope.component.adapts(IDemoContent)
  ... 
  ...     indexName = 'textIndex'
  ... 
  ...     @property
  ...     def value(self):
  ...         """Get the value form context."""
  ...         return '%s %s' % (self.context.title, self.context.body)

Register the adapter as a named adapter:

  >>> zope.component.provideAdapter(DemoValueIndexer, name='textIndex')

多索引器
----------------
We can also use a indexer wich knows how to index the object in different 
indexes.

  >>> from z3c.indexer.indexer import MultiIndexer
  >>> class DemoMultiIndexer(MultiIndexer):
  ...     zope.component.adapts(IDemoContent)
  ... 
  ...     def doIndex(self):
  ... 
  ...         # index context in fieldIndex
  ...         fieldIndex = self.getIndex('fieldIndex')
  ...         fieldIndex.doIndex(self.oid, self.context.field)
  ... 
  ...         # index context in setIndex
  ...         setIndex = self.getIndex('setIndex')
  ...         setIndex.doIndex(self.oid, self.context.iterable)
  ... 
  ...         # index context in valueIndex
  ...         valueIndex = self.getIndex('valueIndex')
  ...         valueIndex.doIndex(self.oid, self.context.value)
  ... 
  ...     def doUnIndex(self):
  ... 
  ...         # index context in fieldIndex
  ...         fieldIndex = self.getIndex('fieldIndex')
  ...         fieldIndex.doUnIndex(self.oid)
  ... 
  ...         # index context in setIndex
  ...         setIndex = self.getIndex('setIndex')
  ...         setIndex.doUnIndex(self.oid)
  ... 
  ...         # index context in valueIndex
  ...         valueIndex = self.getIndex('valueIndex')
  ...         valueIndex.doUnIndex(self.oid)

Register the adapter as a named adapter:

  >>> zope.component.provideAdapter(DemoMultiIndexer, name='DemoMultiIndexer')


Indexing 建立索引
======================
Now we can index our demo object:

  >>> from z3c.indexer.indexer import index
  >>> index(demo)

自动建立索引
==================

Sometimes, you like to ensure that each object get indexed or updated in the 
index like we us to do in the default zope.app.catalog implementation. This 
means each object get index after adding or updated on object modification.
We offer a solution for this behavior with the IAutoIndexer adapter call.
On each object added event or object modified event, a subscriber tries to 
lookup an IAutoIndexer which could index or update the object values in the 
relevant indexes. Since the subscriber calls getAdapters, it's allowed to 
have more then one such indexer adapter. 

注册索引
---------------
First register a new index:

  >>> from z3c.indexer.index import TextIndex
  >>> autoIndex = TextIndex()
  >>> sm['default']['autoIndex'] = textIndex
  >>> sm.registerUtility(autoIndex, interfaces.IIndex, name='autoIndex')

自动索引器
------------------
Let's now define a IAutoIndexer adapter:

  >>> from z3c.indexer.indexer import ValueAutoIndexer
  >>> class MyDemoContentAutoIndexer(ValueAutoIndexer):
  ...     zope.component.adapts(IDemoContent)
  ... 
  ...     indexName = 'autoIndex'
  ... 
  ...     @property
  ...     def value(self):
  ...         """Get the value form context."""
  ...         return 'auto indexed value: %s %s' % (self.context.title,
  ...             self.context.body)

and register them:

  >>> zope.component.provideAdapter(MyDemoContentAutoIndexer, name='Auto')

Now we need to register our subscriber which calls the IAutoIndexer adapters:

  >>> from z3c.indexer import subscriber
  >>> zope.component.provideHandler(subscriber.autoIndexSubscriber)
  >>> zope.component.provideHandler(subscriber.autoUnindexSubscriber)

and we also need to register the intid subscribers:

  >>> from zope.app.intid import addIntIdSubscriber
  >>> from zope.app.intid import removeIntIdSubscriber
  >>> zope.component.provideHandler(addIntIdSubscriber)
  >>> zope.component.provideHandler(removeIntIdSubscriber)

这样这个autoIndex自动索引了，在增加和删除的时候。

SearchQuery 搜索查询
===========================
我们知道有一个sql，非常灵活，已经是标准的关系数据库的查询语言了。

Zope上的catalog，采用api的方式查询，目前没有分离的查询语言。

具体有2个接口:

apply(query)
    返回对西的intid，需要函数转换找到具体的对象，因此不常用

searchResults(query)
    返回对象清单，这个不要怕，这个是lazy reference，不会占用太多内容，而且是yield的方式，用iterate非常适合。

问题，现在还不支持排序！！


Text Index Query
----------------------

Build a simple text search query:

  >>> from z3c.indexer.search import SearchQuery
  >>> from z3c.indexer.query import TextQuery
  >>> textQuery = TextQuery('textIndex', 'Title')
  >>> query = SearchQuery(textQuery)

Now let's see if we get ``uid`` from the content object:

  >>> res = query.apply()
  >>> res[0] == uid
  True

A none existent value will return a emtpy result:

  >>> textQuery = TextQuery('textIndex', 'bad')
  >>> query = SearchQuery(textQuery)
  >>> query.apply()
  IFSet([])


Field Index Query
----------------------

Search with a Eq query:

  >>> from z3c.indexer.query import Eq
  >>> eqQuery = Eq('fieldIndex', 'Field')
  >>> query = SearchQuery(eqQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A none existent value will return a emtpy result:

  >>> eqQuery = Eq('fieldIndex', 'bad')
  >>> query = SearchQuery(eqQuery)
  >>> query.apply()
  IFSet([])

Search with a NotEq query:

  >>> from z3c.indexer.query import NotEq
  >>> notEqQuery = NotEq('fieldIndex', 'bad')
  >>> query = SearchQuery(notEqQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A existent value will return a emtpy result:

  >>> notEqQuery = NotEq('fieldIndex', 'Field')
  >>> query = SearchQuery(notEqQuery)
  >>> query.apply()
  IFSet([])

Search with a Between query:

  >>> from z3c.indexer.query import Between
  >>> betweenQuery = Between('fieldIndex', 'Fiel', 'Fielder')
  >>> query = SearchQuery(betweenQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong min and max value will return a emtpy result:

  >>> betweenQuery = Between('fieldIndex', 'Fielder', 'Fiel')
  >>> query = SearchQuery(betweenQuery)
  >>> query.apply()
  IFSet([])

Search with a Ge query:

  >>> from z3c.indexer.query import Ge
  >>> geQuery = Ge('fieldIndex', 'Fiel')
  >>> query = SearchQuery(geQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong max value will return a emtpy result:

  >>> geQuery = Ge('fieldIndex', 'Fielder')
  >>> query = SearchQuery(geQuery)
  >>> query.apply()
  IFSet([])

Search with a Le query:

  >>> from z3c.indexer.query import Le
  >>> leQuery = Le('fieldIndex', 'Fielder')
  >>> query = SearchQuery(leQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong min value will return a emtpy result:

  >>> leQuery = Le('fieldIndex', 'Fiel')
  >>> query = SearchQuery(leQuery)
  >>> query.apply()
  IFSet([])

Search with a In query:

  >>> from z3c.indexer.query import In
  >>> inQuery = In('fieldIndex', ['Field', 1, 2])
  >>> query = SearchQuery(inQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A list of none existent values will return a emtpy result:

  >>> inQuery = In('fieldIndex', ['Fielder', 1, 2])
  >>> query = SearchQuery(inQuery)
  >>> query.apply()
  IFSet([])


Value Index Query
--------------------------

Search with a Eq query:

  >>> eqQuery = Eq('valueIndex', 'Value')
  >>> query = SearchQuery(eqQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A none existent value will return a emtpy result:

  >>> eqQuery = Eq('valueIndex', 'bad')
  >>> query = SearchQuery(eqQuery)
  >>> query.apply()
  IFSet([])

Search with a NotEq query:

  >>> notEqQuery = NotEq('valueIndex', 'bad')
  >>> query = SearchQuery(notEqQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A existent value will return a emtpy result:

  >>> notEqQuery = NotEq('valueIndex', 'Value')
  >>> query = SearchQuery(notEqQuery)
  >>> query.apply()
  IFSet([])

Search with a Between query:

  >>> betweenQuery = Between('valueIndex', 'Val', 'Values')
  >>> query = SearchQuery(betweenQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong min and max value will return a emtpy result:

  >>> betweenQuery = Between('valueIndex', 'Values', 'Val')
  >>> query = SearchQuery(betweenQuery)
  >>> query.apply()
  IFSet([])

Search with a Ge query:

  >>> geQuery = Ge('valueIndex', 'Val')
  >>> query = SearchQuery(geQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong max value will return a emtpy result:

  >>> geQuery = Ge('valueIndex', 'Values')
  >>> query = SearchQuery(geQuery)
  >>> query.apply()
  IFSet([])

Search with a Le query:

  >>> leQuery = Le('valueIndex', 'Values')
  >>> query = SearchQuery(leQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong min value will return a emtpy result:

  >>> leQuery = Le('valueIndex', 'Val')
  >>> query = SearchQuery(leQuery)
  >>> query.apply()
  IFSet([])

Search with a In query:

  >>> inQuery = In('valueIndex', ['Value', 1, 2])
  >>> query = SearchQuery(inQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A list of none existent values will return a emtpy result:

  >>> inQuery = In('valueIndex', ['Values', 1, 2])
  >>> query = SearchQuery(inQuery)
  >>> query.apply()
  IFSet([])

Search with a ExtentAny query:

  >>> from zc.catalog.extentcatalog import Extent
  >>> from z3c.indexer.query import ExtentAny
  >>> extent = Extent()
  >>> extent.add(uid, ['Values', 1, 2])

  >>> extentAnyQuery = ExtentAny('valueIndex', extent)
  >>> query = SearchQuery(extentAnyQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

Search with a ExtentNone query:

  >>> from z3c.indexer.query import ExtentNone
  >>> extentNoneQuery = ExtentNone('valueIndex', extent)
  >>> query = SearchQuery(extentNoneQuery)
  >>> res = query.apply()
  >>> len(res)
  0


Set Index Query
---------------------

Search with a AnyOf query:

  >>> from z3c.indexer.query import AnyOf
  >>> anyOfQuery = AnyOf('setIndex', ['Iterable', 1])
  >>> query = SearchQuery(anyOfQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A list of none existent values will return a emtpy result:

  >>> anyOfQuery = AnyOf('setIndex', ['Iter', 3])
  >>> query = SearchQuery(anyOfQuery)
  >>> query.apply()
  IFSet([])

Search with a AllOf query:

  >>> from z3c.indexer.query import AllOf
  >>> allOfQuery = AllOf('setIndex', ['Iterable', 1, 2])
  >>> query = SearchQuery(allOfQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A list of to less values will return the same result:

  >>> from z3c.indexer.query import AllOf
  >>> allOfQuery = AllOf('setIndex', ['Iterable', 1])
  >>> query = SearchQuery(allOfQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A list of to much values will return a emtpy result:

  >>> allOfQuery = AllOf('setIndex', ['Iterable', 1, 2, 3])
  >>> query = SearchQuery(allOfQuery)
  >>> query.apply()
  IFSet([])

Search with a Between query:

  >>> betweenQuery = Between('setIndex', 'Iter', 'Iterables')
  >>> query = SearchQuery(betweenQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong min and max value will return a emtpy result:

  >>> betweenQuery = Between('setIndex', 'Iterables', 'Iter')
  >>> query = SearchQuery(betweenQuery)
  >>> query.apply()
  IFSet([])

Search with a Ge query:

  >>> geQuery = Ge('valueIndex', 'Iter')
  >>> query = SearchQuery(geQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong max value will return a emtpy result:

  >>> geQuery = Ge('setIndex', 'Iterables')
  >>> query = SearchQuery(geQuery)
  >>> query.apply()
  IFSet([])

Search with a Le query:

  >>> leQuery = Le('setIndex', 'Iterables')
  >>> query = SearchQuery(leQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

A wrong min value will return a emtpy result:

  >>> leQuery = Le('setIndex', 0)
  >>> query = SearchQuery(leQuery)
  >>> query.apply()
  IFSet([])

Search with a ExtentAny query:

  >>> extentAnyQuery = ExtentAny('setIndex', extent)
  >>> query = SearchQuery(extentAnyQuery)
  >>> res = query.apply()
  >>> res[0] == uid
  True

Search with a ExtentNone query:

  >>> extent = Extent()
  >>> extent.add(uid, ['Iterables'])
  >>> extentNoneQuery = ExtentNone('setIndex', extent)
  >>> query = SearchQuery(extentNoneQuery)
  >>> query.apply()
  IFSet([])


组合查询 Chainable Search Query
=====================================

A search query is chainable. This means we can append queries to queries 
itself. The result of a previous query will be used for the next query in the 
chain. Note, this pattern can give you hugh speedup but you have to take care 
on what you chain in which order or you will very quickly get a wrong result.
But the speedup can be hugh, I optimized one of my application with this 
pattern and got a speedup by 900%.

Let's cleanup the text index first:

  >>> textIndex.clear()

And add some more demo object with different values:

  >>> apple = DemoContent(u'Apple')
  >>> site['apple'] = apple
  >>> appleId = intids.register(apple)

  >>> house = DemoContent(u'House')
  >>> site['house'] = house
  >>> houseId = intids.register(house) 

  >>> tower = DemoContent(u'Tower') 
  >>> site['tower'] = tower
  >>> towerId = intids.register(tower)

  >>> every = DemoContent(u'Apple House Tower') 
  >>> site['every'] = every
  >>> everyId = intids.register(every)

And register them in the text index:

  >>> index(apple)
  >>> index(house)
  >>> index(tower)
  >>> index(every)

Now we can see that we have 3 items in the text index:

  >>> textIndex.documentCount()
  4

Let's buold some query:

  >>> appleQuery = TextQuery('textIndex', 'Apple')
  >>> houseQuery = TextQuery('textIndex', 'House')
  >>> towerQuery = TextQuery('textIndex', 'Tower')


And SearchQuery
---------------

Now we can build a search query chain with this queries. The following sample
will return all items which are returned by the 'Apple' and the 'House' query
This is only the case for the ``every`` object:

  >>> query = SearchQuery(appleQuery).And(houseQuery)
  >>> res = query.apply()
  >>> res[0] == everyId
  True

  >>> intids.getObject(res[0])
  <DemoContent u'Apple House Tower'>


Or SearchQuery
--------------

A Or search query will return all object which are contained in each query. The
search query below will return all 4 objects becaues each of them get found by 
one of the existing queries. And the ``every`` object will only get listed once:

  >>> allQuery = SearchQuery(appleQuery).Or(houseQuery).Or(towerQuery)
  >>> res = allQuery.apply()
  >>> len(res)
  4


Not SearchQuery
---------------

A Not search query will return all object which are not contained in the given 
query. The search query below will return all objects except the ones which 
contains the word ``Apple`` becaues we exclude them within the appleQuery. 
Another interesting thing is, that we can use the previous query and simple 
add another query to the chain. This is a very interesting pattern for filters.

  >>> query = allQuery.Not(appleQuery)
  >>> res = query.apply()
  >>> len(res)
  2

  >>> intids.getObject(sorted(res)[0])
  <DemoContent u'House'>

  >>> intids.getObject(sorted(res)[1])
  <DemoContent u'Tower'>


搜索结果集合
===================

The SearchQuery provides also a ResultSet wrapper. We can get an iterable 
ResultSet instance if we call ``searchResults`` from the search query:

  >>> allQuery = SearchQuery(appleQuery).Or(houseQuery).Or(towerQuery)
  >>> resultSet = allQuery.searchResults()
  >>> len(resultSet)
  4

Or we can get a slice from the ResultSet:

  >>> resultSet[-1:]
  [<DemoContent u'Apple House Tower'>]

  >>> resultSet[0:]
  [<DemoContent u'Apple'>, <DemoContent u'House'>, <DemoContent u'Tower'>,
   <DemoContent u'Apple House Tower'>]

  >>> resultSet[1:]
  [<DemoContent u'House'>, <DemoContent u'Tower'>,
   <DemoContent u'Apple House Tower'>]

  >>> resultSet[:-2]
  [<DemoContent u'Apple'>, <DemoContent u'House'>]

Or we can iterate over the ResultSet:

  >>> list(resultSet)
  [<DemoContent u'Apple'>, <DemoContent u'House'>, <DemoContent u'Tower'>,
   <DemoContent u'Apple House Tower'>]

Or check if a item is a part of the result set:

  >>> resultSet.__contains__(object())
  False

  >>> resultSet.__contains__(apple)
  True



Batching 分页
====================

This ResultSet described above can be used together with the BAtch 
implementation defined in the z3c.batching package.


unindex 索引注销
===================

Now after the different index and serch tests we are ready to unindex our 
indexed objects. Let's see what we have in the indexes:

  >>> textIndex.documentCount()
  4

  >>> setIndex.documentCount()
  1

  >>> valueIndex.documentCount()
  5

Now let's use our unindex method from the module indexer. This will call our
Indexer adapter and delegate the unindex call to the doUnIndex method of such
a IIndexer adapter. Let's unindex our demo object:

  >>> from z3c.indexer.indexer import unindex
  >>> unindex(demo)

Now you can see that the dome object get reomved:

  >>> textIndex.documentCount()
  4

  >>> setIndex.documentCount()
  0

  >>> valueIndex.documentCount()
  4
 
正在过时的...
=============================
zope.app.catalog
  标准的catalog索引，但是效率不高！

hurry.query
    这个可以提供跨越多个catalog的复杂组合查询. 超酷

