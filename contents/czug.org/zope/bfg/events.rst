---
created: ''
creator: ''
description: 原理，使用世界来区别对待请求类型
title: 使用事件机制
---
==================
使用事件机制
==================

原理，使用世界来区别对待请求类型

.. include:: include.rst
  
.. _events_chapter:

:作者: Wang Eric glitch.wang at gmail.com
:校核: 潘俊勇

使用事件
========

*事件* 是在应用程序的生命周期中, 在某些特殊的时间点被 :mod:`repoze.bfg` 框架 "广播" 出来的一种对象.
在大多数 :mod:`repoze.bfg` 应用中, 我们都不必使用, 关注或者理解它, 但是在我们做一些进阶的操作时,
比如对于个站点进行"更换皮肤"(skinning)操作,而这个操作是跟访问这个站点的域名相关的, 在这种情况之下,
事件机制可能会帮到你.

在 :mod:`repoze.bfg` 中, 事件永远是被框架所广播的. 我们注册一个 *订阅者* (subscriber)就可以利用事件了.
一个订阅者就是一个function, 接受一个参数`event`:

.. code-block:: python
   :linenos:

   def mysubscriber(event):
       print event

上面的代码就是一个订阅者, 被调用的时候它简单地把事件输出到控制台.

如果只有一个订阅者function, 还不足以让它在事件发生的时候被调用. 要做到这一点,
我们需要修改 :term:`应用程序注册表` (:term:`application registry`), 
也就是修改应用的 ``configure.zcml`` 文件. 这里有一段XML文档,
示例了我们如何把上面的 ``mysubscriber`` 函数作为一个订阅者加入到 ``configure.zcml`` 中,
在这里我们假设它存在于 ``subscribers.py`` 模块中.

.. code-block:: xml
   :linenos:

   <subscriber
     for="repoze.bfg.interfaces.INewRequest"
     handler=".subscribers.mysubscriber"
   />

上面例子的意思是，每当 :mod:`repoze.bfg` 框架抛出一个提供 ``INewRequest`` 接口的事件对象,  ``mysubscriber`` 函数就会被调用,
如我们所见, 订阅是针对某（几）个 *接口interface* 的.
发送到订阅者的事件对象一定会有一个interface. 
你可以利用这个interface自身来判断有哪些事件属性可资利用.

举例而言, 如果我们在 ``subscribers.py`` 中创建了一个如下的事件监听函数:

.. code-block:: python
   :linenos:

   def handle_new_request(event):
       print 'request', event.request

   def handle_new_response(event):
       print 'response', event.response

我们可以配置这些方法, 让它们在恰当的时间点被框架调用，只需要我们把如下代码添加到应用的 ``configure.zcml`` 文件:

.. code-block:: xml
   :linenos:

   <subscriber
     for="repoze.bfg.interfaces.INewRequest"
     handler=".subscribers.handle_new_request"
   />

   <subscriber
     for="repoze.bfg.interfaces.INewResponse"
     handler=".subscribers.handle_new_response"
   />


这样的配置会让两个函数在 :term:`应用程序注册表` 中注册为订阅者. 
当应用程序运行时, 每一个新的请求和应答都会被输出到控制台.
我们知道 ``INewRequest`` 事件拥有一个 ``request`` 属性, 并且知道它是一个 :term:`WebOb` 请求,
因为根据 ``repoze.bfg.interfaces.INewRequest`` 的定义上说明必然如此. 类似的, 我们也可以知道,
``INewResponse`` 拥有一个 ``response`` 属性, 它是由应用程序构建的,
根据 ``repoze.bfg.interfaces.INewResponse`` 的定义, 这也是必然的.
这两个接口的定义可以在 :ref:`events_module` API一章中找到.

.. note::

   通常对请求采用后处理(postprocessing)在中间件组件(middleware components)完成会更为合理.
   ``INewResponse`` 事件只是为了与 ``INewRequest`` 对象保持对称，而造出来的。

ZCML的 *subscriber* 元素包含两个值:  ``for`` 是这个订阅者为哪些接口注册(它限制了订阅者只能接受指定类型的事件),
``handler`` 是一个Python的以点分隔的路径, 指向订阅者函数.

订阅者函数的返回值将会被框架忽略.

使用事件来改变Request的类型
---------------------------

对于 ``INewRequestEvent`` 的最常见的用法是附加一个 :term:`interface` 到请求, 以满足不同的处理要求.
比如一个从浏览器中发起的, 而另一个从JSON客户端发送的请求.
这样的区别使得为不同的 ``request_type`` 接口注册不同的视图成为可能. 
比如根据请求头部(HTTP HEADER)中的不同设置, 我们可能选择返回JSON数据.

为了做到这一点, 我们应该订阅一个 ``INewRequest`` 事件类型,
同时我们也要在这个函数中使用 ``zope.interface.alsoProvides`` API来为请求对象增加一个或多个接口,
这些接口都是由相应的事件所对应的. 请看例子:

.. code-block:: python
   :linenos:

  from zope.interface import alsoProvides
  from zope.interface import Interface

  class IJSONRequest(Interface):
      """ A request from a JSON client that sets and Accept:
      application/json header """

  def categorize_request(event):
      request = event.request
      accept = request.headers.get('accept', '')
      if 'application/json' in accept:
          alsoProvides(request, IJSONRequest)

接下来, 在注册有视图的ZCML文件中,
如果我们为 ``repoze.bfg.interfaces.INewRequest`` 注册了 ``categorize_request`` 订阅函数,
根据request实现的interface的不同, 我们可以使用 ``request_type`` 属性指向不同的视图function.
比如说, 如果上面的订阅者函数已经注册了, 对同一个model，使用不同请求类型接口，下面注册的三个视图可以指向不同的视图函数：

.. code-block:: xml
   :linenos:

   <subscriber
     for="repoze.bfg.interfaces.INewRequest"
     handler=".subscribers.categorize_request"
   />

   <!-- html default view -->
   <view
     for=".models.MyModel"
     request_type="repoze.bfg.interfaces.IRequest"
     view=".views.html_view"/>

   <!-- JSON default view -->
   <view
     for=".models.MyModel"
     request_type=".interfaces.IJSONRequest"
     view=".views.json_view"/>

每一个 :mod:`repoze.bfg` 请求自动实现了 ``repoze.bfg.interfaces.IRequest`` 接口,
也就是所有请求都实现了这种类型. 针对某个model注册的视图, 如果不提供 ``request_type`` ,
将会被视为默认的注册为``IRequest``.

当然, 我们并不局限于使用 ``Accept`` 头来决定我们将要把那个interface附加到请求.
比如说我们可能还想根据主机名称(比如 ``request.environ.get('HTTP_HOST',request.environ['SERVER_NAME'])`` )
的不同来定制我们应用显示不同的"皮肤"(skin),
以决定用户能否看到"管理"界面(比如"manage.myapp.com"), 还是终端用户界面(比如"www.myapp.com").
