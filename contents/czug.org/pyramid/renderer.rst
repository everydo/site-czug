---
created: 2012-04-04 20:16:42
creator:
description: 
title: Pyramid的Renderer
---

===================
Pyramid的Renderer
===================

通常的，一个视图返回一个Response对象。如果某个试图返回的不是Response，Pyramid将会尝试寻找一个合适的渲染器来生成这个Response。如

.. code:: python

    from pyramid.view import view_config

    @view_config(renderer='json')
    def hello_world(request):
        return {'content':'Hello!'}

这里返回的是一个字典，不是Response。但因在视图配置中定义了renderer参数，指定了渲染器。因此，当视图没有返回Response时，Pyramid将会调用这个渲染器来将视图返回结果转换成Response对象。如果一个视图定义了渲染器，但还是返回了Response，那么这个渲染器将会被忽略。

当然，如果没有定义渲染器，或返回的结果跟渲染器不匹配，在调用这个view的时候还是会抛出错误。

一、可配置的渲染器
----------------------

1. string

string是一个将视图返回结果转换成字符串的渲染器。因这个渲染器仅仅是简单的用了str方法来转换，Unicode数据将会出问题。

2. json

通过json.dumps方法转换视图结果，并封装成Response对象，同时将content-type 设为application/json

3. JSONP

实现了json/jsonp混合渲染，比较适用于AJAX请求。
注意，jsonp渲染器必须在启动时手工装载，如config.add_renderer('jsonp', JSONP(param_name='callback'))。然后才可以在add_view或view_config中使用renderer='jsonp'。
如果在某次请求中包含了一个param_name中指定的参数（上例中就是callback），那么就返回一个JSONP应答。否则，返回纯JSON应答。

4. Chameleon模版
如果renderer参数是一个绝对路径、相对路径或包结构资源定义，并且它们均指向一个.pt文件，则启动Chameleon ZPT渲染器。
如果renderer参数是一个绝对路径、相对路径或包结构资源定义，并且它们均指向一个.txt文件，则启动Chameleon 文本渲染器。

当应用使用了Chameleon模版做渲染时，视图程序可以返回一个Response对象，或一个dict对象，返回其他参数均抛错。

当视图返回dict的时候，dict中数据将作为Chameleon模版的参数传入模版。

5. Mako模版

跟Chameleon模版类似，也可以在Pyramid应用中使用Mako模版，只要文件名以.mak或.mako结尾即可。使用Mako模版，视图也必须返回Response对象或dict对象。

Mako模版所需参数可以在ini文件中定义。

二、改变应答参数
-------------------

我们在编程的时候，在正常通过renderer构建应答之外，经常需要改变一些应答的属性，如response.status，response.set_cookie等。

使用了renderer之后，如果需要改变应答的属性，必须通过request.response这个对象来修改（构造Response对象返回将会直接略过renderer）。如：

.. code:: python


    @view_config(name='gone', renderer='templates/gone.pt')
    def myview(request):
        request.response.status = '404 Not Found'
        return {'URL':request.URL}

三、自定义renderer
-----------------------

1. 自定义renderer

用户可以通过定义一个RendererFactory类来自定义自己所需要地renderer，如

.. code:: python


    class RendererFactory:
        def __init__(self, info):
            pass

        def __call__(self, value, system):
            pass

在add_renderer时，调用了__init__方法，其info参数包含了如下属性：

- name：renderer名
- package：renderer被注册时的factory包或包名
- type：renderer类型
- registry：当前注册表
- settings：配置字典

__call__函数则在Pyramid渲染时被调用，value就是视图返回的dict，system是pyramid传入的dict，包含view，context，request等新系统参数。

根据renderer工厂中传入的name参数（info对象中）的不同，可以将renderer工厂分为两类：

a. name是一个以.开头的名字，这类renderer通常与文件相关联，比如模版。
b. name不以.开头，则通常是对象序列化renderer。

例如：

.. code:: python

    config.add_renderer(name='amf', factory='my.package.MyAMFRenderer')

则可以在view_config中这样使用@view_config(renderer='amf')

再看一个带.的例子：

.. code:: python

    config.add_renderer(name='.jinja2', factory='my.package.MyJinja2Renderer')

则可以在view_config中这样使用@view_config(renderer='templates/mytemplate.jinja2')
在这种情况下，pyramid将会通过后缀名查找相应的renderer

2. 新增或改变renderer

可以通过add_renderer变更默认的renderer配置。例如：

- config.add_renderer('.zpt', 'pyramid.chameleon_zpt.renderer_factory')   表示zpt文件也用Chameleon解析。

- config.add_renderer('.pt', 'mypackage.pt_renderer')  表示pt文件改用mypackage.pt_renderer解析。

- config.add_renderer(None, 'mypackage.json_renderer_factory')  定义默认的renderer，从而在view配置中省略renderer参数。

3. 运行时变更renderer

可以使用request.override_renderer = 'json' 类似用法在运行时刻指定非申明式的renderer。

