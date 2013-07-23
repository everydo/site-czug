Value Index

ValueIndex vs FieldIndex
=========================================
The valueindex is an index similar to, but more flexible than a standard Zope
field index.  The index allows searches for documents that contain any of a
set of values; between a set of values; any (non-None) values; and any empty
values.

Additionally, the index supports an interface that allows examination of the
indexed values.

It is as policy-free as possible, and is intended to be the engine for indexes
with more policy, as well as being useful itself.

初始化
=============
On creation, the index has no wordCount, no documentCount, and is, as
expected, fairly empty.

    >>> from zc.catalog.index import ValueIndex
    >>> index = ValueIndex()

The index supports indexing any value.  All values within a given index must
sort consistently across Python versions.

    >>> data = {1: 'a',
    ...         2: 'b',
    ...         3: 'a',
    ...         4: 'c',
    ...         5: 'd',
    ...         6: 'c',
    ...         7: 'c',
    ...         8: 'b',
    ...         9: 'c',
    ... }
    >>> for k, v in data.items():
    ...     index.index_doc(k, v)
    ...

After indexing, the statistics and values match the newly entered content.

    >>> list(index.values())
    ['a', 'b', 'c', 'd']
    >>> index.documentCount()
    9
    >>> index.wordCount()
    4
    >>> index.maxValue()
    'd'
    >>> index.minValue()
    'a'
    >>> list(index.ids())
    [1, 2, 3, 4, 5, 6, 7, 8, 9]

any_of查询
==================
The index supports four types of query.  The first is 'any_of'.  It
takes an iterable of values, and returns an iterable of document ids that
contain any of the values.  The results are not weighted.

    >>> list(index.apply({'any_of':('b', 'c')}))
    [2, 4, 6, 7, 8, 9]
    >>> list(index.apply({'any_of': ('b',)}))
    [2, 8]
    >>> list(index.apply({'any_of': ('d',)}))
    [5]
    >>> list(index.apply({'any_of':(42,)}))
    []

any查询
=============
Another query is 'any', If the key is None, all indexed document ids with any
values are returned.  If the key is an extent, the intersection of the extent
and all document ids with any values is returned.

    >>> list(index.apply({'any': None}))
    [1, 2, 3, 4, 5, 6, 7, 8, 9]

    >>> from zc.catalog.extentcatalog import FilterExtent
    >>> extent = FilterExtent(lambda extent, uid, obj: True)
    >>> for i in range(15):
    ...     extent.add(i, i)
    ...
    >>> list(index.apply({'any': extent}))
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> limited_extent = FilterExtent(lambda extent, uid, obj: True)
    >>> for i in range(5):
    ...     limited_extent.add(i, i)
    ...
    >>> list(index.apply({'any': limited_extent}))
    [1, 2, 3, 4]

between查询
===============
The 'between' argument takes from 1 to four values.  The first is the
minimum, and defaults to None, indicating no minimum; the second is the
maximum, and defaults to None, indicating no maximum; the next is a boolean for
whether the minimum value should be excluded, and defaults to False; and the
last is a boolean for whether the maximum value should be excluded, and also
defaults to False.  The results are not weighted.

    >>> list(index.apply({'between': ('b', 'd')}))
    [2, 4, 5, 6, 7, 8, 9]
    >>> list(index.apply({'between': ('c', None)}))
    [4, 5, 6, 7, 9]
    >>> list(index.apply({'between': ('c',)}))
    [4, 5, 6, 7, 9]
    >>> list(index.apply({'between': ('b', 'd', True, True)}))
    [4, 6, 7, 9]

none查询
================
The 'none' argument takes an extent and returns the ids in the extent
that are not indexed; it is intended to be used to return docids that have
no (or empty) values.

    >>> list(index.apply({'none': extent}))
    [0, 10, 11, 12, 13, 14]

错误查询
=====================
Trying to use more than one of these at a time generates an error.

    >>> index.apply({'between': (5,), 'any_of': (3,)})
    ... # doctest: +ELLIPSIS
    Traceback (most recent call last):
    ...
    ValueError:...

Using none of them simply returns None.

    >>> index.apply({}) # returns None

unindex
===============
When you unindex a document, the searches and statistics should be updated.

    >>> index.unindex_doc(5)
    >>> len(index.apply({'any_of': ('d',)}))
    0
    >>> index.documentCount()
    8
    >>> index.wordCount()
    3
    >>> list(index.values())
    ['a', 'b', 'c']
    >>> list(index.ids())
    [1, 2, 3, 4, 6, 7, 8, 9]

reindex
===============
Reindexing a document that has a changed value also is reflected in
subsequent searches and statistic checks.

    >>> list(index.apply({'any_of': ('b',)}))
    [2, 8]
    >>> data[8] = 'e'
    >>> index.index_doc(8, data[8])
    >>> index.documentCount()
    8
    >>> index.wordCount()
    4
    >>> list(index.apply({'any_of': ('e',)}))
    [8]
    >>> list(index.apply({'any_of': ('b',)}))
    [2]
    >>> data[2] = 'e'
    >>> index.index_doc(2, data[2])
    >>> index.documentCount()
    8
    >>> index.wordCount()
    3
    >>> list(index.apply({'any_of': ('e',)}))
    [2, 8]
    >>> list(index.apply({'any_of': ('b',)}))
    []

Reindexing a document for which the value is now None causes it to be removed
from the statistics.

    >>> data[3] = None
    >>> index.index_doc(3, data[3])
    >>> index.documentCount()
    7
    >>> index.wordCount()
    3
    >>> list(index.ids())
    [1, 2, 4, 6, 7, 8, 9]

This affects both ways of determining the ids that are and are not in the index
(that do and do not have values).

    >>> list(index.apply({'any': None}))
    [1, 2, 4, 6, 7, 8, 9]
    >>> list(index.apply({'any': extent}))
    [1, 2, 4, 6, 7, 8, 9]
    >>> list(index.apply({'none': extent}))
    [0, 3, 5, 10, 11, 12, 13, 14]

The values method can be used to examine the indexed values for a given
document id.  For a valueindex, the "values" for a given doc_id will always
have a length of 0 or 1.

    >>> index.values(doc_id=8)
    ('e',)

And the containsValue method provides a way of determining membership in the
values.

    >>> index.containsValue('a')
    True
    >>> index.containsValue('q')
    False

