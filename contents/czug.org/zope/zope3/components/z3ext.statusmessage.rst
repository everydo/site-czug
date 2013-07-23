Portal status message

.. Contents::
.. sectnum::

Instead include notification messages directly to template,
 developer can use messaging service.

Main interface is IStatusMessage, it is adapter for IBrowserRequest
so we can have different implementations, for example cookie based or session.

By default only session based service implemented.

找到工具
-----------------
By default only session based service implemented.

   >>> from z3ext.statusmessage.interfaces import IStatusMessage
   >>> service = IStatusMessage(request)

添加消息
---------------
   >>> service.add('Test message')

   >>> service.add('Warning message', 'warning')

   >>> service.add('Error message', 'error')

很简单吧。。。

更多参看: http://svn.zope.org/z3ext.statusmessage/trunk/src/z3ext/statusmessage/README.txt?rev=84824&view=markup

