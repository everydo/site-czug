===================
ZODB
===================

The ZODB is a powerful object database for Python objects. It's very mature - it's been around for more than a decade. It is transactional, has advanced features like clustering (ZEO), blob support, and yes, it can be used independently from Zope. Zope 2, Zope 3 and Grok all use the ZODB as its default data storage, and it's seen a lot of battle testing.

As a result of various discussions in the past, I realized that some smart, informed people, seem to think the ZODB doesn't do what it actually does. The ZODB is really an object database. It really does get references between objects right. It's not an object store where references have to be indirect (a string, for instance). Somehow this misconception about the ZODB is widespread.

What do I mean when I say the ZODB "gets references right"? Let me give you an example with a lot of a, b and c. If you have object a that points to c, and object b` that also points to c, updating c will really matter to both a and b. You will reach the updated version of c through the reference in both a and b.

That kind of example sounds rather abstract, so here is some code that demonstrates it::

    from persistent import Persistent

    class Source(Persistent):
      def __init__(self, ref):
          self.ref = ref

    class Target(Persistent):
       def __init__(self, message):
           self.message = message

    Let's use this code:

    >>> c = Target("First message")
    >>> c.message
    'First message'
    >>> a = Source(c)
    >>> b = Source(c)
    >>> c.message = "Second message"
    >>> a.ref.message
    'Second message'
    >>> b.ref.message
    'Second message'

So what's special here? There's nothing special! All this is the way you'd expect it from Python. The ZODB's mission is to take normal Python objects and persist them. This means that when you restart the application, all your objects and the reference between them will still be there. There are a few extra requirements to make sure objects get persisted which I'll go into below, but in essence, the above example is complete.

Quite a few smart people seem to be under the impression the ZODB does far less than this. They believe references like this won't work properly in the ZODB. They believe, perhaps, that c will be persisted twice, once for a, once for b. This may be the case if c doesn't inherit from the special Persistent superclass, but if it does, there really will only be that instance.

The ZODB offers transparent object persistence. It's almost exactly like a pool of normal Python objects. They can reference each other just fine. The only requirements I know of are:

* if you don't inherit your class from Persistent, or use a python builtin (which doesn't inherit from Persistent), instances of that class can be serialized multiple times.
* if you want to persist your object, your object needs to be connected to another persistent object (such as the database root dictionary).
* since the ZODB is a transactional storage, you need to actually commit the transaction sometimes to make sure your changes are stored.
* if you have a non-Persistent subobject (like a list) and you change it, you need to manually flag the persistence machinery on the object that its subobject changed, with _p_changed. This is only necessary if some of the objects are not sublclasses of Persistent. For common built-in collections in Python such as list and dictionary there are replacements (PersistentList, PersistentMapping), and more advanced building blocks for indexes (BTrees), that don't have this issue.

The misapprehension that the ZODB somehow does less than it really does seems to be an easy one for people to develop. One reason is because in real-world Zope or Grok-based applications hard references like this are relatively rare. The reason people don't use hard references like this all the time in an application is that sometimes you want back references, and sometimes you want looser coupling between objects. So that's when things are referenced by a string or using some other form of lookup.

It's no different in Python programs, though. For the same reason, you sometimes put Python objects in a dictionary and look them up with a key. The wide application of such soft references seems to give people the impression that normal Python references somehow don't work.

Let's look at a complete example now. The only thing you need installed to make this work is ZODB3, which you can retrieve from the Python package index here. It demonstrates some of the details, such as how to set up a database and how to use the root dictionary::

    from ZODB import FileStorage, DB
    from persistent import Persistent
    import transaction

    class Source(Persistent):
      def __init__(self, ref):
          self.ref = ref

    class Target(Persistent):
       def __init__(self, message):
         self.message = message

    def getroot():
        # open the database
        storage = FileStorage.FileStorage('/tmp/mystorage.fs')
        db = DB(storage)
        conn = db.open()
        dbroot = conn.root()
        return dbroot

    def main():
        dbroot = getroot()

        if 'a' not in dbroot:
            print "Filling database"
            fill_database(dbroot)
        else:
            print "Reusing existing database"
            # reset to first message
            dbroot['c'].message = 'First message'

        a = dbroot['a']
        b = dbroot['b']
        c = dbroot['c']

        print "message through a:", a.ref.message
        print "message through b:", b.ref.message
        print "ref is the same:", a.ref is b.ref
        print "ref is indeed c:", a.ref is c
        print "changing message c to: Second message"
        c.message = 'Second message'
        print "message through a:", a.ref.message
        print "message through b:", b.ref.message

        # commit any changes to the database
        transaction.commit()

    def fill_database(dbroot):
        dbroot['c'] = c = Target('First message')
        dbroot['a'] = a = Source(c)
        dbroot['b'] = b = Source(c)

    if __name__ == '__main__':
        main()

How could we do something about such misapprehensions? It would be good if the ZODB had a single, up to date to date web site that people could go to learn more about it. The ZODB is one of the coolest, most powerful libraries in the Python world, but it's less well known than it should be. I believe a good ZODB site, with some examples like the one above, would also help grow the ZODB community. The ZODB community is currently in a healthy enough state, with new developments always in progress, but it's a shame more people aren't aware of it.

Unfortunately the ZODB developers themselves seem to be too busy to put up this web site. It wouldn't be much work as it's mostly a matter of collecting existing information and redacting it. So, I hope that they will actually do it soon, so that I have some good hyperlinks to put at the end of this article. This `wiki page<http://wiki.zope.org/ZODB/FrontPage>`__ seems inadequate, but it's what Google thinks is the most relevant when I search for "ZODB".

The `ZODB PDF file <http://svn.zope.org/ZODB/trunk/doc/zodb.pdf>`__ is very useful, though I wish I knew of a better way to link to it than to the Subversion repository.

A recent `good introduction <http://www.ibm.com/developerworks/aix/library/au-zodb/>`__ was created by Brandon Rhodes and Noah Gift for IBM developerworks.

Blob
===========
http://tarekziade.wordpress.com/2007/09/14/to-blob-or-not-to-blob/
