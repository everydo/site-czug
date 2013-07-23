---
created: ''
creator: ''
description: 开启安全策略；使用权限保护view; model对象 ACL控制；ACL继承；位置感张；调试
title: 安全性
---
.. include:: include.rst
.. _security_chapter:

:作者: wwwjfy wwwjfy at gmail.com

安全性
========

:mod:`repoze.bfg` 提供了一个可选的显式安全系统，使得在一个context中，
发出请求的用户没有相应访问权限时，由 :term:`permission` 保护的views不会
被渲染。

启用安全保护是通过在你的 ``configure.zcml`` 中增加一个名为
:term:`security policy` 的配置来实现的。

启用安全策略
--------------------------

默认情况下， :mod:`repoze.bfg` 不启用安全策略。所有view都是对匿名用户
完全可见的。

然而，如果你在一个应用的``configure.zcml``中加入以下代码，就可以启用
安全策略。

.. code-block:: xml
   :linenos:

   <utility
     provides="repoze.bfg.interfaces.ISecurityPolicy"
     factory="repoze.bfg.security.RemoteUserACLSecurityPolicy"
     />

上面这节难以理解的内容启用了 ``RemoteUserACLSecurityPolicy`` ，使其对这个
应用中的每一个请求起作用。 ``RemoteUserACLSecurityPolicy`` 是这样一种策
略：它在试图调用某一 :term:`view` 时，把在请求的环境变量中传进来的
``REMOTE_USER`` 变量（作为唯一的 :term:`principal` ）和在model数据中的所有
*ACL* 进行对比。如果被调用的许可已经声明，安全策略则允许这个view，否则，
返回一个 ``401 Unauthorized`` 响应码到上层的WSGI服务器。

用许可保护View
---------------------------------

你可以通过在 ``configure.zcml`` 应用注册表配置 :term:`permission` 来显式地保
护一个特定的view。
例如， 当在一个 ``IBlog`` 的context中以 ``add`` 许可被调用时，以下的声明保护
了一个名为 ``add_entry.html`` 的view：

.. code-block:: xml
   :linenos:

   <view
       for=".models.IBlog"
       view=".views.blog_entry_add_view"
       name="add_entry.html"
       permission="add"
       />

在正常的应用操作中，访问view时若存在安全策略，则用户需要在context中拥有
``add`` 权限，以调用 ``blog_entry_add_view`` 这个view。

许可的名字只是字符串。对于系统来说，它们没有特殊的意义，因而你可以以自己
喜欢的方式来命名许可。

在Model对象中指定ACL
------------------------------------

:mod:`repoze.bfg` 通过检查与context相关联的 :term:`ACL` 来确定一个用户是否在
:term:`context` 中拥有相应的许可。一个ACL通过在描述context的model对象中的
``__acl__`` 属性来与context建立关联关系。 这个属性可以在model的 *instance*
中定义（如果你需要instance级别的安全），也可以在model的 *class* 中定义（如
果你只需要类型级别的安全）。

例如，一个ACL可以通过以下方式附到一个blog的model上：

.. code-block:: python
   :linenos:

   from repoze.bfg.security import Everyone
   from repoze.bfg.security import Allow

   class IBlog(Interface):
       pass

   class Blog(dict):
       __acl__ = [
           (Allow, Everyone, 'view'),
           (Allow, 'group:editors', 'add'),
           (Allow, 'group:editors', 'edit'),
           ]
       implements(IBlog)

上面这个ACL指出 ``Everyone`` （一个特殊的系统定义的principal，按照字面意
思，指每一个人）这个principal允许查看blog，而 ``group:editors`` 这个
principal允许增加或编辑blog。

.. note:: 上面这个 ``__acl__`` 结构中的每一个tuple表示一个 :term:`ACE`
          （存取控制条目）。

一个principal通常是一个用户id。如果你的认证系统提供了组的信息，并且安全
策略中也已经声明支持，它也可以是一个组的id。
``RemoteUserACLSecurityPolicy`` 不支持组的信息。

ACL继承
---------------

如果安全策略存在，而一个model对象在context没有ACL，系统会向其 *parent* 查
询ACL。
如果一个对象没有ACL，就会一直向上级parent查询，直到到了root节点，没有
parent为止。

安全策略找到的 *第一个* ACL为有效ACL。在漫游或回溯中找到的ACL不会被组合起来
使用。

位置感知
------------------

model对象必须提供 *位置感知* ，以允许安全机制执行ACL继承。提供位置感知包括
两点：图中的root对象必须包含 ``__name__`` 和 ``_parent__`` 属性，root对象必须
声明支持 ``repoze.bfg.interfaces.ILocation`` 接口。例如：

.. code-block:: python
   :linenos:

   from repoze.bfg.interfaces import ILocation
   from zope.interface import implements

   class Blog(object):
       implements(ILocation)
       __name__ = ''
       __parent__ = None

一个包含 ``__parent__`` 属性和 ``__name__`` 属性的对象被认为是 *位置感知* 的。
位置感知的对象定义了一个指向parent对象的 ``__parent__`` 属性。root对象的
``__parent__`` 属性为 ``None`` 。

如果一个 :mod:`repoze.bfg` 应用中的root对象声明实现
``repoze.bfg.interfaces.ILocation`` 接口，那么这个model中的其它对象被认为
是位置感知的。

如果这些对象并不是位置感知的，而root对象又被标明为 ``ILocation`` ，bfg框架
就会在漫游过程中将每个对象在包含 ``__name__`` 和 ``__parent__`` 属性的 *位置
代理* 中进行封装。当然，如果不是这种情况的话，bfg框架还是按照model对象运
行。

当然，你可以明确地在所有的model对象中声明 ``__name`` 和 ``__parent__`` 属性，
不会执行位置代理。

关于位置感知的函数的文档参考 :ref:`location_module` 。

.. _debug_authorization_section:

调试View认证失败
-------------------------------------

如果你认为一个应用不恰当地允许或拒绝view存取，可以在shell下启动这个应用，
启动时将 ``BFG_DEBUG_AUTHORIZATION`` 环境变量设为 ``1`` 。例如::

  $ BFG_DEBUG_AUTHORIZATION=1 bin/paster serve myproject.ini

若渲染顶层view时发生认证行为，关于认证的详细信息就会记录到控制台
（stderr），信息包括ACE根据认证信息允许或拒绝认证，和具体的ACE信息和所在
的ACL信息。

也可以在应用的 ``.ini`` 文件中启用调试：将应用配置区的
``debug_authorization`` 设为 ``true`` 。如::

  [app:main]
  use = egg:MyProject#app
  debug_authorization = true

调试标志启用时，发回浏览器的响应的消息体中会包含安全性调试信息。

调试强制认证失败
-------------------------------------------

API ``has_permission`` (参考 :ref:`security_module` )用来在view函数中强制检
验安全性。其返回对象的实例是有效的boolean值。但是这些对象不是原始的
``True`` 或 ``False`` 对象，而包含为何许可被允许或拒绝的具体信息。一个对象
可以是 ``ACLAllowed`` ， ``ACLDenied`` ， ``Allowed`` ，或 ``Denied`` ，参见
:ref:`security_module` 。这些对象至少包含 ``msg`` 属性，这是一个描述许可被拒
绝或允许的具体原因的字符串。当 ``has_permission`` 失败时,在调试器中对相关信
息内省或者显示语句通常是非常有用的调试手段。
