.. Contents::

.. sectnum::

POSKeyError: 数据库崩溃时
==============================
现象
----------
错误提示::

    Site Error

    An error was encountered while publishing this resource.

    Error Type: POSKeyError
    Error Value: 0x02ae27

基础
----------
- 删除数据库 index
- 使用 fsrecover.py
- 使用 fsrefs.py, 找到错误的引用。这个在跨storage的关联上，很重要

方法1: 删除问题对象
--------------------------
这个方法对我无效，但是可能对你有效

#. From the Zope bin directory (frequently /usr/local/zope/bin on UNIX machines), invoke zopectl::

    [user@machine bin]$ ./zopectl debug

#. From the debug prompt, do a little bit of setup::

    >>> from ZODB.POSException import POSKeyError

#. Get at the Zope path for the container of the object that's throwing the POSKeyError::

    >>> obj=root.unrestrictedTraverse('/path/to/container')

#. Find the ID of the object that's causing the problem::

    >>> for id,val in obj.objectItems():
    ...     try: val.getId()
    ...     except POSKeyError: break
    ...

   This should produce a list of all the objects in the containing folder stopping at the one that throws the POSKeyError exception. The id of that object will now be bound to the variable id. You can find the id of the cursed, evil, broken object::

    >>> id
    'nameOfBrokenObject'

#. In the previous recipe, this is where we would have called the manage_delObjects method of the containing folder, but in solving my own POSKeyError, this didn't work any more. I'm sure someone more enlightened than I could tell you why, but I found (with much Googling) another way. In all frankness, the mystical workings of the following code are over my head, but it works. The gist is that it removes "the reference from the parent folder, without accessing the
bad object." This gem was found in the following list thread: http://www.dzug.org/mailinglisten/zope-org-zope/archive/2004/2004-07/1090024676313

    >>> obj._objects=tuple(filter(lambda i,n=id: i['id']!=n, obj._objects))
    >>> delattr(obj,id)

#. Finally, you must commit the transactions to ZODB::

    >>> import transaction
    >>> transaction().commit()

#. You can now exit from the debugger with Ctrl-D or exit::

    >>> exit

删除导致问题的事务
--------------------------
1) Dump Data.fs (backup copy) to text file using fsdump
2) Convert POSKeyError to hex OID (object ID) using U64
3) Find last UID in the Data.fs dump using text editor
4) Find TID of next transaction's and  offset number
5) Truncate Data.fs to that given offset (tool? how?)
6) Start Zope with truncated Data.fs
7) Find object with problem and export it
9) Import object into new Zope installation

Questions:
- How do you truncate a Data.fs to an offset?

  It's the "truncate" method of Pythons file objects.

- How do I know where the object is that had the problem (will I see it in
the Data.fs dump I did?)

The POSKeyError tells you the oid of the missing object (as a string).
The dump of your "Data.fs" lists all object records contained
in the "Data.fs" with their oid in hexform.
Object records are contained in transaction records (starting at "offset").
The last occurrence of the object is where the object has
been written latest. When you truncate at the offset
of the following transaction, you have the state as it was after
the object was written.


> You will see object records containing "oid" values.
> These are hexadecimal representations of the values reported
> in "POSKeyError" (side node: why do "POSKeyError" not report
> the hexadecimal value?).
> To convert between hexadecimal and textual representation,
> you can use "U64" and "p64" from "ZODB.utils".
> "U64" converts a textual representation into a long
> and "p64" converts a long into a textual representation.
>
> Use a text editor to find the last reference to your missing
> object in the textual
> representation of your "Data.fs" (obtained by "fsdump").
> That's the last time, the object has been modified.
>
> Look at the next transaction record. It has a "tid" field.
> Note the "offset" for this transaction.
> Truncate your "Data.fs" to the given offset (in a copy, of course).
> Start Zope with the truncated "Data.fs".
> Your object should be there.
> Export it (you will get the state as it was at the time of the
> transaction where you have cut "Data.fs"; you may try to use
> later transaction, to be more up-to-date).
>
> Import the exported object into a Data.fs where you want to
> work with.
>
>
>
> Dieter


