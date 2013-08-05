---
created: 2012-04-02 16:16:59
creator:
description: 
title: Pyramid中的view（下）
---

===========================
Pyramid中的view（下）
===========================

三. view配置案例
------------------

1. 专用于POST，且有read权限才能访问地view配置

.. code:: python

    @view_config(route_name='ok', request_method='POST', permission='read')

2. 置于类定义之上地view配置

.. code:: python

    @view_config(route_name='hello')
    class MyView(object):
        def __init__(self, request):
            self.request = request

        def __call__(self):
            return Response('hello')

3. 两个view配置堆叠，分别起效

.. code:: python

    @view_config(route_name='edit')
    @view_config(route_name='change')
    def edit(request):
        return Response('edited!')

4. 类中方法上地view配置

.. code:: python

    class MyView(object):
        def __init__(self, request):
            self.request = request

        @view_config(route_name='hello')
        def amethod(self):
            return Response('hello')

5. 不用__call__作为默认方法的配置

.. code:: python

    @view_config(attr='amethod', route_name='hello')
    class MyView(object):
        def __init__(self, request):
            self.request = request

        def amethod(self):
            return Response('hello')

6. 使用view_defaults简化配置参数

.. code:: python

    @view_defaults(route_name='rest')
    class RESTView(object):
        def __init__(self, request):
            self.request = request

        @view_config(request_method='GET')
        def get(self):
            return Response('get')

        @view_config(request_method='POST')
        def post(self):
            return Response('post')

        @view_config(request_method='DELETE')
        def delete(self):
            return Response('delete')

7. 这样也是可以简化的

.. code:: python

    @view_defaults(route_name='rest')
    class RESTView(object):
        def __init__(self, request):
            self.request = request

        def get(self):
            return Response('get')

        def post(self):
            return Response('post')

        def delete(self):
            return Response('delete')

    if __name__ == '__main__':
        config = Configurator()
        config.add_route('rest', '/rest')
        config.add_view(RESTView, attr='get', request_method='GET')
        config.add_view(RESTView, attr='post', request_method='POST')
        config.add_view(RESTView, attr='delete', request_method='DELETE')


8. 类继承也可以view_defaults！

.. code:: python

    @view_defaults(route_name='rest')
    class Foo(object):
        pass

    class Bar(Foo):
        pass

这时，类Bar也继承了Foo的view配置。如果一定要取消这种继承，则用如下代码：

.. code:: python

    @view_defaults(route_name='rest')
    class Foo(object):
        pass

    @view_defaults()
    class Bar(Foo):
        pass


四、view中的exception处理
---------------------------

1. 异常

在view的开发过程中，经常会需要抛出一些异常，比如没有权限，404，禁止访问等。Pyramid专门定义了一系列专用的Exception类用于这种情况。所有exception类都继承自pyramid.httpexceptions.HTTPException。从实现角度来看，这些类其实是一些特殊的Response。因此，可以在程序种直接return、或raise。比如

.. code:: python

    def aview(request):
        raise HTTPUnauthorized()

    def aview(request):
        return HTTPUnauthorized()

甚至可以：

.. code:: python

    def aview(request):
        raise exception_response(401)

2. 特殊的异常

Pyramid有几个比较特殊的exception：

- pyramid.httpexceptions.HTTPNotFound，当Pyramid找不到view时抛出HTTPNotFound，并将NotFound view返回给浏览器。可以在启动时通过config.add_notfound_view(not found)来变更这个view。

- pyramid.httpexceptions.HTTPForbidden，当授权没有通过时，抛出HTTPForbidden，并将Forbidden view返回给浏览器。可以在启动时通过config.add_forbidden_view(forbidden_view)来变更这个view。

- pyramid.httpexceptions.HTTPFound，发起302 Found应答，实现URL重定向功能，如raise HTTPFound(location='http://example.com')

3. 定制异常视图

用户可以自定义异常，那么捕获自定义异常之后，该如何展现这个异常呢？Pyramid专门提供了异常view这种处理机制，如我们定义了一个异常：

.. code:: python

    class ValidationFailure(Exception):
        def __init__(self, msg):
            self.msg = msg

那么，我们可以相对应的定义一个这样的view：

.. code:: python

    @view_config(context=ValidationFailure)
    def failed_validation(exc, request):
        response =  Response('Failed validation: %s' % exc.msg)
        response.status_int = 500
        return response

这样，一旦程序抛出ValidationFailure这个异常，Pyramid将调用这个view，并将其response返回给浏览器。

五、表单数据处理
-------------------

可以通过request.params取得所有form提交的参数。如

.. code:: python

    def myview(request):
        firstname = request.params['firstname']
        lastname = request.params['lastname']

注意，在URL分发方式下，还有一个matchdict里面包含了一部分的URL路径参数。
