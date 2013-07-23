Comments

.. Contents::
.. sectnum::

The comment package is a simple way to add comments to any ``IAnnotatable``
Zope content.  The datetime and current principals are stamped on to the
comment.  The comment body is currently simply unicode text but intended to be
html snippets ("rich text") at a later date.

The inclusion of current principals requires an interaction, which is what we
need to set up before we can use the system here.  Below, we set up a dummy
interaction with dummy participants, create some content that is
``IAttributeAnnotatable``, and then finally show the system in use.

必须先将声明ICommentable
-----------------------------------
nitially, the component is not commentable, because it does not provide the
correct interface:

    >>> zope.interface.directlyProvides(content, interfaces.ICommentable)

或者用zcml来声明.

访问IComments
----------------
We can access the comments of an object by adapting to ``IComments``:

    >>> from zc.comment import interfaces
    >>> comments = interfaces.IComments(content)
    >>> comments
    <Comments (0) for <SimpleContent u'content'>>

添加comment
--------------------
Let's now add a comment:

    >>> import datetime, pytz
    >>> before = datetime.datetime.now(pytz.utc)

    >>> comments.add(u"Foo!  Bar!")

    >>> after = datetime.datetime.now(pytz.utc)

As you can see it was not necessary to create the comments object manually,
but simply pass in the text. Clearly a comment has been added:

    >>> len(comments)
    1

读取comment
-----------------------
Let's now make sure that the data was set correctly:

    >>> comments[0].body
    u'Foo!  Bar!'
    >>> before <= comments[0].date <= after
    True
    >>> comments[0].principal_ids
    ('alice',)

清空全部评注
--------------------
If you like, you can always clear all comments:

    >>> comments.clear()
    >>> len(comments)
    0


