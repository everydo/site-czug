
基础中的基础

认证
=========
我们知道有2中认证和授权的机制：

- 通过zcml来定义，这个是非常简单的了，其实不实用

  这部分实现是在zope.app.security的

- 通过pau来实现，也就是zope.app.authentication

  这个非常复杂，提供了很多可定制的高级特性

其实:

- zope.app.security提供了支持认证的最基础的东西，主要是需要一个IAuthentication就可以去认证了
- zope.app.authenitication提供了一个IAuthentication的另类实现，这是一个复杂的、高级的东东
- 其实也可以不用pau的，可参考社区提供的z3c.authenticator这个东东，据说引入了一些新的理念，简单而柔性

授权
===============
zope.securitypolicy是新的授权管理模块，zope.app.securitypolicy已经过时

权限检查
===================
::

 from zope.security.management import checkPermission
 has_permission = checkPermission('zope.ModifyContent', self.context)

如果不想被权限名字锁死::

 from zope.security import canAccess, canWrite

读取::

 canAccess(obj, name)

写::
 
 canWrite(obj, name)
