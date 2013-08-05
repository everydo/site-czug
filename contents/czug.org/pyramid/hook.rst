---
created: 2012-04-21 20:12:27
creator:
description: 
title: Pyramid的Hook机制
---

在Pyramid应用中，可以使用各种Hook 来影响影响框架的行为。

一、变更Not Found视图
----------------------

当Pyramid找不到URL对应的视图时，将会调用not found 视图。Pyramid提供了一个默认的not fund视图，但开发者也可以自定义它。如下：

.. code:: python

    from hello world.views import notfound
    config.add_notfound_view(notfound)

通过这种方式就可以将默认的not found 视图替换成自己所需的特殊视图了。

除了上面的指令方式指定之外，也可以用标注方式来指定not found 视图。如：

.. code:: python

    from pyramid.view import notfound_view_config

    @notfound_view_config()
    def notfound(request):
        return Response('Not Found!!', status='404 Not Found')

在Pyramid中，甚至可以定义多个not found视图，如：

.. code:: python

    from pyramid.view import notfound_view_config

    @notfound_view_config(request_method='GET')
    def notfound_get(request):
        return Response('Not Found during GET!!', status='404 Not Found')

    @notfound_view_config(request_method='POST')
    def notfound_post(request):
        return Response('Not Found during POST!!', status='404 Not Found')

not found 视图可以带request参数，或context、request参数。request就是调用当时的request，context就是HTTPNotFound异常的一个实例。

二、变更Forbidden视图
-------------------------

同样的，Forbidden视图也可视需要变更。如：

.. code:: python

    from hello world.views import forbidden_view
    config.add_forbidden_view(forbidden_view)

或

.. code:: python

    from pyramid.view import forbidden_view_config

    @forbidden_view_config()
    def forbidden(request):
        return Response('forbidden')


三、变更Request Factory
-----------------------------

在Pyramid处理WSGI传过来的请求时，它会基于WSGI环境变量创建一个request对象。系统系统的默认对象就是pyramid.request.Reqiest的一个实例，但开发者也可以通过程序来改变它。如：

.. code:: python

    from pyramid.request import Reqest

    class MyRequest(Request):
        pass

    config = Configurator(request_factory=MyRequest)

或

.. code:: python

    config = Configurator()
    config.set_request_factory(MyRequest)


四、Response 回调
-----------------------

Pyramid运行在视图返回了一个response对象之后调用一个回调函数来变更response里的内容。如：

.. code:: python

    def cache_callback(request, response):
        if request.exception is not None:
            response.cache_control.max_age = 360

    request.add_response_callback(cache_callback)

当视图返回非Response对象或抛出未处理异常时。不会调用response 回调。但当异常视图（这也是一个视图）处理返回后，会调用它，但此时request.exception就不是None，而是异常对象。因此上例判断了该值。

Response回调按添加顺序被调用，所有回调都在NewResponse事件发生后才会被调用。回调中抛出的异常将不会马上得到处理，而是需要传递到Pyramid route程序才能处理。

注意：Response回调的生命周期只是一次请求之内。如果需要每个请求都调用某个回调，则需要在每个请求中注册这个回调（如订阅NewRequest事件）。


五、Finished回调
-------------------

Finished回调将在Pyramid router处理完一个请求之后被无条件调用。Finished回调带一个request参数，如：

.. code:: python

    def log_callback(request):
        log.debug('request finished.')

    request.add_finished_callback(log_callback)

Finished回调按添加顺序被调用。即便是程序发生异常而无法产生response，也会调用Finished回调。回调中抛出的异常将不会马上得到处理，而是需要传递到Pyramid route程序才能处理。

注意：Finished回调的生命周期只是一次请求之内。如果需要每个请求都调用某个回调，则需要在每个请求中注册这个回调（如订阅NewRequest事件）。


六、改变Traverser程序
---------------------------

如果有特殊需要，Pyramid甚至允许自定义Traversal算法。如：

.. code:: python

    config = Configurator()
    config.add_traverser(MyTraverser)

其中，MyTraverser必须实现如下的方法：

.. code:: python

    class MyTraverser(object):
        def __init__(self, root):
            """ root参数为root factory返回的root对象"""
        def __call__(self, request):
            """ 返回一个至少包含root、context、view_name、subpath、traversed、virtual_root、virtual_root_path等值的字典"""

各参数的具体含义可参考traverser算法。

add_traverser方法还可以带一个root类参数，如config.add_traverser(MyTraverser, MyRoot)。这时如果root factory返回的root对象是MyRoot的实例，就使用MyTraverser算法，否则使用默认算法。


七、改变resource_url方法的URL生成方式
-----------------------------------------

一旦改变了Traverser之后，经常也需要一同改变resource_url方法。如：

    config.add_resource_url_adapter(MyResourceURLAdapter, Myroot)

因Traverser变更的可能性比较低，这里不展开细说。


八、修改Pyramid视图返回结果
------------------------------

视图一般情况下都是返回一个Response类或其子类的实例（未用renderer时），否则需要一个适配器来转换，如：

.. code:: python

    from Pyramid.response import Response

    def string_response_adapter(s):
        response = Response(s)
        return response

    config.add_response_adapter(string_response_adapter, str)

在上例中，如果视图返回str，将使用该适配器转换成Response。

类似情况在应用移植时可能会用到，一般不常见。


九、定制view mapper
-----------------------

如果不希望使用Pyramid视图结构，也可以通过定制view mapper来改变它，具体参见akhet项目，它将Pyramid改造成了原来Pylons的结构。


十、定制配置标注
---------------------

Pyramid允许自己定制类似view_config的标注，以便只有经过scan才使其生效，详细细节参见Venusian文档。
