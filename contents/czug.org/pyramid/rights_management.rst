---
created: 2012-04-03 08:49:15
creator:
description: 
title: Pyramid的权限管理
---

=========================
Pyramid的权限管理
=========================

Pyramid提供了一种声明式的权限管理，可以按照一定的授权策略保护view，以保证只有经过认证的用户才能访问应用。在Pyramid中，权限管理体系被明确的分成了认证和授权两个部分。

认证系统将request中的身份证明转化成一个或多个系统能识别的主体标识。这些表示代表了request中当前生效的用户、组信息。

授权系统则根据得到的主体标识、视图配置、上下文决定是否有访问权限。

一、Pyramid权限处理流程
--------------------------

1. 用户用过一个特定的URL访问应用，因此在应用中生成一个request。
2. 基于这个request的信息，通过resource定位找到一个上下文（context）（不论是漫游还是URL分发）。
3. 通过视图定位找到一个合适的视图，
4. 如果认证策略生效，将由此与request生成几个主体(principal)的标识。
5. 如果授权策略生效，并且视图配置中定义定义了permission参数，将由这它们以及上下文、主体标识来共同决定是否有权访问这个视图。
6. 如果授权成功，则调用视图。
7. 如果授权失败，则调用forbidden视图。


二、权限配置声明
----------------------

1. 启动配置

在Pyramid中，授权系统依赖于认证系统，要启动授权系统，必须先启动认证系统。如下例

.. code:: python
   
    from pyramid.config import Configurator
    from pyramid.authentication import AuthTktAuthenticationPolicy
    from pyramid.authorization import ACLAuthorizationPolicy

    authentication_policy = AuthTktAuthenticationPolicy('seekrit')
    authorization_policy = ACLAuthorizationPolicy()

    config = Configurator()

    config.set_authentication_policy(authentication_policy)
    config.set_authorization_policy(authorization_policy)

2. view config配置

在项目启动时配置了认证策略、授权策略之外，还需要在每个view的配置中加入permission参数。例如：

.. code:: python

    config.add_view('mypackage.views.blog_entry_add_view',
                    name='add_entry.html',
                    context='mypackage.resources.Blog',
                    permission='add')

也可以加在view_config中，例如：

.. code:: python

    @view_config(context=Blog, name='add_entry.html', permission='add')

这里的"add"是一个在ACL中定义的字符串，可以更换成任何记得住的名字。

3. 默认权限

如果视图数量比较多，且权限大多类似的情况下，可以定义一个默认权限，如调用Configurator中下面的方法：

.. code:: python

    pyramid.config.Configurator.set_default_permission() 

定义了默认权限之后，没有加入permission参数的所有视图都将默认带有该权限。开发者也可以加入该参数来变更为其他权限。如果要让视图变成无权限，则需要设置permission为pyramid.security.NO_PERMISSION_REQUIRED。


三、ACL
--------------

1. ACL定义

在Pyramid中，可以在类中定义ACL，也可以在一个具体的实例中定义ACL。例如：

.. code:: python

    class Blog(object): __acl__ = [
            (Allow, Everyone, 'view'),
            (Allow, 'group:editors', 'add'),
            (Allow, 'group:editors', 'edit'),
            ]

    class Blog(object): pass
    blog = Blog()
    blog.__acl__ = [
            (Allow, Everyone, 'view'),
            (Allow, 'group:editors', ('add', 'edit')),
            ]

这两种定义都是可行的，只不过他们并不等同，其作用范围是不一样的。

2. ACL元素介绍

在上面的例子中，我们可以看到，ACL就是一个由三元组（ACE，access control emtry）组成的列表。其中每个元祖的第一个参数为固定的Allow/Deny，第二个参数为主体标识，第三个参数为权限名或权限名元组，用在permission参数中。如(Allow, Everyone, 'view')即为所有人均具有‘view’（这里是查看的意思，不是那个视图噢）这个权限。(Allow, 'group:editors', 'add')表明所有editors组的人员均有新增权限。

ACL的定义是有前后顺序的，因此，不好的定义很可能会导致后面的ACE不起作用，如

.. code:: python
   
    __acl__ = [
        (Allow, Everyone, 'view'),
        (Deny, Everyone, 'view'),
        ]

后面的Deny永远不起作用。所有用户均有查看权限。而

.. code:: python
 
    __acl__ = [
        (Deny, Everyone, 'view'),
        (Allow, Everyone, 'view'),
        ]

则所有用户都没有查看权限

3. 一些特殊的主体

为了使用上的便利，在Pyramid.security中定义了一些特殊的主体，如：

pyramid.security.Everyone，所有人员

pyramid.security.Authenticated，已登录人员

4. 特殊的权限

pyramid.security.ALL_PERMISSIONS，包含任何权限

5. 特殊的ACE

pyramid.security.DENY_ALL，等同于(Deny, Everyone, ALL_PERMISSIONS)

6. ACL查找方法

当一个resource对象作为上下文时，如果它自身没有带ACL信息，则会继续查找其父节点的ACL信息，层层向上，直到根节点。（这时resource树必须是位置感知的。）

四、高级用法
-----------------

1. 变更forbidden视图

在Configurator中调用add_forbidden_view方法：

.. code:: python
 
    from helloworld.views import forbidden_view
    from pyramid.httpexceptions import HTTPForbidden

    config.add_forbidden_view(forbidden_view)

2. 权限配置调试

变更development.ini文件

.. code::

    [app:main]
    use = egg:MyProject
    pyramid.debug_authorization = true

3. has_permission方法

Pyramid提供了pyramid.security.has_permission()这样一个方法来判断是否有权限，它将返回 pyramid.security.ACLAllowed, pyramid.security.ACLDenied, pyramid.security.Allowed, 或 pyramid.security.Denied。
