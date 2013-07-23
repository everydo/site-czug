通知工具 Notification utility

.. Contents::
.. sectnum::

消息::

  >>> import zc.notification.interfaces
  >>> import zc.notification.notification

  >>> import zope.i18nmessageid
  >>> _ = zope.i18nmessageid.MessageFactory("zc.notification.tests")

The notification facility provides a single, very simple notification
implementation.  This should be specifialized to provide custom
behaviors as needed, but may be used directly.

定义一个通知
-------------------
The constructor for the notification requires the name of the
notification and a message::

  >>> n = zc.notification.notification.Notification(
  ...     name="my-notification-name",
  ...     message=_(u"my-notification-message",
  ...               default=u"This is a test notification."))

Notification objects conform to the `INotification` interface::

  >>> import zope.interface.verify

  >>> zope.interface.verify.verifyObject(
  ...     zc.notification.interfaces.INotification, n)
  True

Notification objects provide the information passed to the constructor
as attributes::

  >>> n.name
  'my-notification-name'

  >>> n.message
  u'my-notification-message'

There is also a `timestamp` attribute::

  >>> type(n.timestamp)
  <type 'datetime.datetime'>
  >>> n.timestamp.tzinfo
  <UTC>

设置通知人
--------------
Notifications have an `applicablePrincipals()` method that takes a set
of principal ids as an argument and returns a new set of principal ids
that should be sent the notification.  The default implementation is
"noisy": the argument set is returned::

  >>> principal_ids = set(("user1", "user2"))
  >>> sorted(n.applicablePrincipals(principal_ids))
  ['user1', 'user2']

Other implementations are available in the package: see the discussion near the
end of this document.

Notifications also have a `mapping` attribute and a `summary` attribute.  They
are both optional, and our notification example has neither.

  >>> n.summary # None
  >>> n.mapping # None

Summaries are intended to be single-line versions of the message--a headline.
Delivering notifications must be able to accomodate empty summaries.  

Mappings, if provided, are a dictionary.  Keys are strings.  Values are
strings that can be substituted in the message when translated; message ids
that should be translated and then substituted in the message when in it is
translated; or other values that custom notification views can use to render
the notification.

使用通知工具发送通知
------------------------

Let's create a fresh notification utility with no registrations::

  >>> utility = zc.notification.notification.NotificationUtility()

Sending a notification at this point should work just fine, but nobody
will be notified::

  >>> utility.notify(n)

支持多种通知渠道，比如邮件等
----------------------------------------------------------
每个人可以设置:

- 自己要收到什么养的消息：系统通知、点对点通知、任务通知

  `getRegistrations()` `setRegistrations()` 

- 通过什么方式接收：短信、邮件、IM、数据库

  `getNotifierMethod()` `setNotifierMethod()`

让我们注册几个通知器，检查下结果::

  >>> utility.getRegistrations("user1")
  set([])
  >>> utility.getNotifierMethod("user1")
  ''

  >>> utility.setRegistrations("user1", [])
  >>> utility.getRegistrations("user1")
  set([])
  >>> utility.setNotifierMethod("user1", "email")
  >>> utility.getNotifierMethod("user1")
  'email'

  >>> utility.setRegistrations("user1",
  ...     ["my-notification-name", "another-notification-name"])
  >>> sorted(utility.getRegistrations("user1"))
  ['another-notification-name', 'my-notification-name']
  >>> sorted(utility.getNotificationSubscriptions("another-notification-name"))
  ['user1']
  >>> sorted(utility.getNotificationSubscriptions("my-notification-name"))
  ['user1']

  >>> utility.setRegistrations("user1", ["another-notification-name"])
  >>> sorted(utility.getRegistrations("user1"))
  ['another-notification-name']
  >>> sorted(utility.getNotificationSubscriptions("another-notification-name"))
  ['user1']
  >>> sorted(utility.getNotificationSubscriptions("my-notification-name"))
  []

  >>> utility.getRegistrations("user2")
  set([])
  >>> utility.getNotifierMethod("user2")
  ''

  >>> utility.setRegistrations("user1", [])
  >>> utility.getRegistrations("user2")
  set([])

  >>> utility.setNotifierMethod("user2", "smoke signals")
  >>> utility.getNotifierMethod("user2")
  'smoke signals'

练习完毕，演出正式开始。我们还是重置下注册::

  >>> utility.setRegistrations("user1", ["my-notification-name"])

正式发送哪条消息，看看有什么结果::

  >>> utility.notify(n)
  my-notification-name
  my-notification-message
  user1 by 'email'

注意，发送方式是email：这个是从主体annotation上找到的。如果找不到，则采用默认的方法.

Note that the delivery method was "email": This was determined by
looking for a principal annotation specifying the preferred delivery
method.  If the preferred method does not exist, a default delivery
mechanism is used.

The "user2" user has configured a delivery method that doesn't exist
(presumably it used to), so let's configure the notification utility
to send the notification to him::

  >>> utility.setRegistrations("user1", [])
  >>> utility.setRegistrations("user2", ["my-notification-name"])

Since the "smoke signals" notifier isn't available, the default
notifier is used instead (the default meaning name == '')::

  >>> utility.notify(n)
  my-notification-name
  my-notification-message
  user2 by ''

If there is no annotation specifying the delivery method, as for
"user3", the default mechanism is used::

  >>> utility.setRegistrations("user2", [])
  >>> utility.setRegistrations("user3", ["my-notification-name"])

  >>> utility.notify(n)
  my-notification-name
  my-notification-message
  user3 by ''


发送通知
---------------------

Application code that needs to send a notification needs to create a
notification object and pass it to the `zc.notification.notify()`
function.  This function takes care of locating the notification
utility and passing it to the utility's `notify()` method.

  >>> import zope.component
  >>> zope.component.provideUtility(
  ...     utility, zc.notification.interfaces.INotificationUtility)

  >>> zc.notification.notify(n)
  my-notification-name
  my-notification-message
  user3 by ''

注册通知
-------------------------
Notice that the implementation-specific notification utility interfaces define
a source for the notifier methods and for the available notification
subscriptions.  These are populated by default with registered utilities. 
Register INotifier objects as utilities, and INotificationDefinition objects as
utilities.  It is worth noting that the INotificationDefinition interface can
be fulfilled with a class that directly provides the interface.

其他的 `applicablePrincipals` 实现
--------------------------------------------
The notification module includes two other notification implementations.  One
simply accepts an iterable of principal ids and intersects the principal ids
given to the `applicablePrincipals` method with the original ids given.

    >>> n = zc.notification.notification.PrincipalNotification(
    ...     name="my-notification-name",
    ...     message=_(u"my-notification-message",
    ...               default=u"This is a test notification."),
    ...     principal_ids=('user0', 'user1', 'user3'))
    >>> sorted(
    ...     n.applicablePrincipals(set(('user1', 'user2', 'user3', 'user4'))))
    ['user1', 'user3']

这个支持组的:

The other does a similar job, but it also checks group membership.  We need to
set up a demo authentication utility to show this.

    >>> import zope.app.security.interfaces
    >>> import zope.security.interfaces
    >>> class DemoPrincipal(object):
    ...     def __init__(self, groups=(), is_group=False):
    ...         self.groups = groups
    ...         if is_group:
    ...             zope.interface.directlyProvides(
    ...                 self, zope.security.interfaces.IGroup)
    ...
    >>> principals = {
    ... 'user1': DemoPrincipal(),
    ... 'user2': DemoPrincipal(('group1', 'group3')),
    ... 'user3': DemoPrincipal(('group2',)),
    ... 'group1': DemoPrincipal(is_group=True),
    ... 'group2': DemoPrincipal(('group3',), is_group=True),
    ... 'group3': DemoPrincipal(is_group=True)}
    >>> class DemoAuth(object):
    ...     zope.interface.implements(
    ...         zope.app.security.interfaces.IAuthentication)
    ...     def getPrincipal(self, pid):
    ...         return principals[pid]
    ...
    >>> auth = DemoAuth()
    >>> zope.component.provideUtility(auth)

    >>> n = zc.notification.notification.GroupAwarePrincipalNotification(
    ...     name="my-notification-name",
    ...     message=_(u"my-notification-message",
    ...               default=u"This is a test notification."),
    ...     principal_ids=('user1', 'group3'))
    >>> sorted(
    ...     n.applicablePrincipals(set(('user1', 'user2', 'user3'))))
    ['user1', 'user2', 'user3']

    >>> n = zc.notification.notification.GroupAwarePrincipalNotification(
    ...     name="my-notification-name",
    ...     message=_(u"my-notification-message",
    ...               default=u"This is a test notification."),
    ...     principal_ids=('group1',))
    >>> sorted(
    ...     n.applicablePrincipals(set(('user1', 'user2', 'user3'))))
    ['user2']

    >>> n = zc.notification.notification.GroupAwarePrincipalNotification(
    ...     name="my-notification-name",
    ...     message=_(u"my-notification-message",
    ...               default=u"This is a test notification."),
    ...     principal_ids=('user1',))
    >>> sorted(
    ...     n.applicablePrincipals(set(('user1', 'user2', 'user3'))))
    ['user1']

还支持去除的功能:

It also allows you to specify users who should not be included, even if they
match a group.

    >>> n = zc.notification.notification.GroupAwarePrincipalNotification(
    ...     name="my-notification-name",
    ...     message=_(u"my-notification-message",
    ...               default=u"This is a test notification."),
    ...     principal_ids=('user1', 'group3'),
    ...     exclude_ids=('user2',))
    >>> sorted(
    ...     n.applicablePrincipals(set(('user1', 'user2', 'user3'))))
    ['user1', 'user3']

