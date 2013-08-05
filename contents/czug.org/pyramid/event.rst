---
created: 2012-04-10 12:47:08
creator:
description: 
title: Pyramid的事件
---

=================
Pyramid的事件
=================

在Pyramid中，事件是在应用生命周期内的一些特殊执行点由框架发出的广播对象。开发人员可以通过订阅某事件将一段程序挂接到该事件的执行点，从而完成一些有趣的控制。

一、订阅者
------------

事件只有有了订阅者才有了真实用途，一个可能的订阅者如下：

.. code:: python

    def mysubscriber(event):
        print event

如上所述，订阅者通常是一个带event参数的方法。开发者可以根据传入的event进行一些额外的处理。

注意，订阅者无需返回任何值。如果多个订阅者订阅了同一个事件，开发者不能假定他们之间有任何前后调用关系。

二、订阅者的配置方式
----------------------

1. 指令式配置

可以通过main函数中，通过类似configurator.add_subscriber(mysubscriber, NewRequest)指令来配置订阅关系。在这个函数中，第一个参数是订阅者，第二个参数是事件类型。

2. 标注方式配置

.. code:: python

   from pyramid.events import NewRequest
   from pyramid.events import subscriber

   @subscriber(NewRequest)
   def mysubscriber(event):
       event.request.foo = 1

3. 订阅多个事件

.. code:: python

    @subscriber(NewRequest, NewResponse)
    def mysubscriber(event):
        print event

4. 订阅所有事件

.. code:: python

    @subscriber()
    def mysubscriber(event):
        print event


注意：标注方式配置的订阅关系在scan之后才能生效，跟视图配置类似。

三、事件说明
--------------

- NewRequest：开始处理请求事件，包含一个request属性
- NewResponse：视图或异常视图返回response事件，包含request、response属性，request是引发本次应答的请求，response是视图返回的应答。
- ContextFound：找到context事件，包含一个request属性
- ApplicationCreated：应用建立事件，make_wsgi_app调用后发出，包含app属性
- BeforeRender：渲染前事件，包含传给模版的参数，可以用于自省或修改其值。


四、一个真实的例子
---------------------

在有数据库支持的web开发过程中，有时候经常需要在每次请求处理完之后做一些清理工作，

例如，一个应用使用了SQLAlchemy，我们希望在每次请求执行后清除当前SQLAlchemy数据库会话那么我们可以在项目的__init__模块里写如下程序：

.. code:: python

    from mypackage.models import DBSession
    from pyramid.events import subscriber
    from pyramid.events import NewRequest

    def cleanup_callback(request):
        DBSession.remove()

    @subscriber(NewRequest)
    def add_cleanup_callback(event):
        event.request.add_finished_callback(cleanup_callback)

注意，上面只是一个实验例子，如果应用已经配置了pyramid_tm中间件，那么，我们就不再需要手工调用DBSession.remove来做清理工作了。

