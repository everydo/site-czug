Set Index

SetIndex vs KeywordIndex
==================================
The setindex is an index similar to, but more general than a traditional
keyword index.  The values indexed are expected to be iterables; the index
allows searches for documents that contain any of a set of values; all of a set
of values; or between a set of values.

Additionally, the index supports an interface that allows examination of the
indexed values.

It is as policy-free as possible, and is intended to be the engine for indexes
with more policy, as well as being useful itself.

初始化
==================
On creation, the index has no wordCount, no documentCount, and is, as
expected, fairly empty.

    >>> from zc.catalog.index import SetIndex
    >>> index = SetIndex()
    >>> index.documentCount()
    0
    >>> index.wordCount()
    0
    >>> index.maxValue() # doctest: +ELLIPSIS
    Traceback (most recent call last):
    ...
    ValueError:...
    >>> index.minValue() # doctest: +ELLIPSIS
    Traceback (most recent call last):
    ...
    ValueError:...
    >>> list(index.values())
    []
    >>> len(index.apply({'any_of': (5,)}))
    0

The index supports indexing any value.  All values within a given index must
sort consistently across Python versions.  In our example, we hope that strings
and integers will sort consistently; this may not be a reasonable hope.

    >>> data = {1: ['a', 1],
    ...         2: ['b', 'a', 3, 4, 7],
    ...         3: [1],
    ...         4: [1, 4, 'c'],
    ...         5: [7],
    ...         6: [5, 6, 7],
    ...         7: ['c'],
    ...         8: [1, 6],
    ...         9: ['a', 'c', 2, 3, 4, 6,],
    ... }
    >>> for k, v in data.items():
    ...     index.index_doc(k, v)
    ...

After indexing, the statistics and values match the newly entered content.

    >>> list(index.values())
    [1, 2, 3, 4, 5, 6, 7, 'a', 'b', 'c']
    >>> index.documentCount()
    9
    >>> index.wordCount()
    10
    >>> index.maxValue()
    'c'
    >>> index.minValue()
    1
    >>> list(index.ids())
    [1, 2, 3, 4, 5, 6, 7, 8, 9]

any_of查询
=====================
The index supports five types of query.  The first is 'any_of'.  It
takes an iterable of values, and returns an iterable of document ids that
contain any of the values.  The results are weighted.

    >>> list(index.apply({'any_of':('b', 1, 5)}))
    [1, 2, 3, 4, 6, 8]
    >>> list(index.apply({'any_of': ('b', 1, 5)}))
    [1, 2, 3, 4, 6, 8]
    >>> list(index.apply({'any_of':(42,)}))
    []
    >>> index.apply({'any_of': ('a', 3, 7)})              # doctest: +ELLIPSIS
    BTrees...FBucket([(1, 1.0), (2, 3.0), (5, 1.0), (6, 1.0), (9, 2.0)])

any查询
==========
Another query is 'any'. If the key is None, all indexed document ids with any
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

all_of查询
===============
The 'all_of' argument also takes an iterable of values, but returns an
iterable of document ids that contains all of the values.  The results are not
weighted [#all_of_regression_test]_.

    >>> list(index.apply({'all_of': ('a',)}))
    [1, 2, 9]
    >>> list(index.apply({'all_of': (3, 4)}))
    [2, 9]

between查询
===============
The 'between' argument takes from 1 to four values.  The first is the
minimum, and defaults to None, indicating no minimum; the second is the
maximum, and defaults to None, indicating no maximum; the next is a boolean for
whether the minimum value should be excluded, and defaults to False; and the
last is a boolean for whether the maximum value should be excluded, and also
defaults to False.  The results are weighted.

    >>> list(index.apply({'between': (1, 7)}))
    [1, 2, 3, 4, 5, 6, 8, 9]
    >>> list(index.apply({'between': ('b', None)}))
    [2, 4, 7, 9]
    >>> list(index.apply({'between': ('b',)}))
    [2, 4, 7, 9]
    >>> list(index.apply({'between': (1, 7, True, True)}))
    [2, 4, 6, 8, 9]
    >>> index.apply({'between': (2, 6)})               # doctest: +ELLIPSIS
    BTrees...FBucket([(2, 2.0), (4, 1.0), (6, 2.0), (8, 1.0), (9, 4.0)])

none查询
=============
The 'none' argument takes an extent and returns the ids in the extent
that are not indexed; it is intended to be used to return docids that have
no (or empty) values.

    >>> list(index.apply({'none': extent}))
    [0, 10, 11, 12, 13, 14]

错误查询
================
Trying to use more than one of these at a time generates an error.

    >>> index.apply({'all_of': (5,), 'any_of': (3,)})
    ... # doctest: +ELLIPSIS
    Traceback (most recent call last):
    ...
    ValueError:...

Using none of them simply returns None.

    >>> index.apply({}) # returns None

Invalid query names cause ValueErrors.

    >>> index.apply({'foo':()})
    ... # doctest: +ELLIPSIS
    Traceback (most recent call last):
    ...
    ValueError:...

unindex
===============
When you unindex a document, the searches and statistics should be updated.

    >>> index.unindex_doc(6)
    >>> len(index.apply({'any_of': (5,)}))
    0
    >>> index.documentCount()
    8
    >>> index.wordCount()
    9
    >>> list(index.values())
    [1, 2, 3, 4, 6, 7, 'a', 'b', 'c']
    >>> list(index.ids())
    [1, 2, 3, 4, 5, 7, 8, 9]

reindex
============
Reindexing a document that has new additional values also is reflected in
subsequent searches and statistic checks.

    >>> data[8].extend([5, 'c'])
    >>> index.index_doc(8, data[8])
    >>> index.documentCount()
    8
    >>> index.wordCount()
    10
    >>> list(index.apply({'any_of': (5,)}))
    [8]
    >>> list(index.apply({'any_of': ('c',)}))
    [4, 7, 8, 9]

The same is true for reindexing a document with both additions and removals.

    >>> 2 in set(index.apply({'any_of': (7,)}))
    True
    >>> 2 in set(index.apply({'any_of': (2,)}))
    False
    >>> data[2].pop()
    7
    >>> data[2].append(2)
    >>> index.index_doc(2, data[2])
    >>> 2 in set(index.apply({'any_of': (7,)}))
    False
    >>> 2 in set(index.apply({'any_of': (2,)}))
    True

Reindexing a document that no longer has any values causes it to be removed
from the statistics.

    >>> del data[2][:]
    >>> index.index_doc(2, data[2])
    >>> index.documentCount()
    7
    >>> index.wordCount()
    9
    >>> list(index.ids())
    [1, 3, 4, 5, 7, 8, 9]

This affects both ways of determining the ids that are and are not in the index
(that do and do not have values).

    >>> list(index.apply({'any': None}))
    [1, 3, 4, 5, 7, 8, 9]
    >>> list(index.apply({'none': extent}))
    [0, 2, 6, 10, 11, 12, 13, 14]

The values method can be used to examine the indexed values for a given
document id.

    >>> set(index.values(doc_id=8)) == set([1, 5, 6, 'c'])
    True

And the containsValue method provides a way of determining membership in the
values.

    >>> index.containsValue(5)
    True
    >>> index.containsValue(20)
    False

.. [#all_of_regression_test] These tests illustrate two related reported
       errors that have been fixed.

    >>> list(index.apply({'all_of': ('z', 3, 4)}))
    []
    >>> list(index.apply({'all_of': (3, 4, 'z')}))
    []
