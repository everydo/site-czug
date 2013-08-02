---
created: 2012-03-31 19:31:09
creator:
description: 
title: Pyramid中的view（上）
---

=========================
Pyramid中的view（上）
=========================

本节资料整理改编自Pyramid官方网站，部分内容按理解进行了增删整理和归纳，以便结构上更清晰。
不知道官网为啥要将view、view configuration划分成独立的两个章节，不管它了。

一、如何定义view
--------------------

在Pyramid中，view是一个可调用的python对象，可以是方法，也可以是类。它基本等同与原来Pylons中的controller。每个view至少需要接收一个request参数，并最终形成一个Response对象。
1. 函数方式定义的view

.. code:: python

    from pyramid.response import Response
    def hello_world(request):
        return Response('Hello world!')

2. 类方式定义的view

.. code:: python

    from pyramid.response import Response
    class MyView(object):
    def __init__(self, request):
        self.request = request
    def __call__(self):
        return Response('hello')

注意这里__init__、__call__两个函数的参数，其中__init__中的request即函数方式定义view的request。

另外需要注意的是，view的参数也有可能是context, request两个（在traversal中），如：

.. code:: python

    def view(context, request):
            return Response('OK')

    class view(object):
            def __init__(self, context, request):
                    self.context = context
                    self.request = request

            def __call__(self):
                    return Response('OK')

二、如何配置view
------------------

上面的例子只是定义了一个view，其需要生效可用还需要经过配置这一关。这些配置信息直接用于view的定位与判定。
正如在早先的章节中说明的，view配置有两种方式，一种是add_view方法，另外一种是view_config标注。两者的定义是可以完全等价的，其参数也基本一致，只是后者需要一个scan操作查找这些配置。例如：

.. code:: python

   config.add_view('mypackage.views.my_view', route_name='ok', request_method='POST', permission='read')

   @view_config(route_name='edit')
   def edit(request):
       return Response('edited!')

开发者通过配置使其开发的view能在Pyramid应用中使用。view配置参数大都来自context 和request。


跟route配置参数类似，view配置参数也可以分成普通参数、断言参数。在view的查找过程中，断言参数扮演了一个很重要的角色。一个view配置中断言参数的数量越多，调用该view所需要的环境就会越细化。一个申明了6个断言参数的view总是在申明了2个断言参数的view之前被查找、评估。必须所有的断言参数都匹配，该view才能被调用。（这跟route中的断言参数的作用是不一样的。）

1. 普通参数：

- permission: 该view的访问权限，这个后续会具体介绍。
- attr: Pyramid默认调用的是view类的__call__函数，如果需要指定调用其他方法，通过attr指定。如attr='index'。
- renderer: 指定构建Response的渲染器。如json，模版等。后续章节详细介绍。
- http_cache: 指定Response地expires和Cache-Control头属性。设置该值基本等同调用response.cache_expires。如

  http_cache=3600，表示通知浏览器缓存1小时、

  http_cache=datetime.timedelta(days=1)，表示通知浏览器缓存1天、

  http_cache=0，表示无缓存

  http_cache=(3600, {'public':True})，表示缓存1小时，并且response.cache_control.public = True.

- wrapper: 串联view以构造更复杂地Response。
- decorator: view地装饰器，该装饰器需要返回一个接受context, request参数的view
- mapper: 指定view mapper，用与转换view地参数和返回值。

2. 断言参数

- name: view名字，在漫游时使用
- context: 上下文，可以是对象或接口，也主要在漫游时使用
- route_name: route名，主要用于URL分发。
- request_type: 指定需要符合地request地接口，不常用。
- request_method: GET、POST、DELETE、HEAD
- request_param: 指定GET、POST必含的参数，如使用了request_param="foo=123"这种方式，则必须参数名、参数值都对应才算匹配。
- match_param: match中必须包含地参数，如使用了request_param="foo=123"这种方式，则必须参数名、参数值都对应才算匹配。如果是一个字典，则必须里面每一项都匹配。
- containment: resource树包含关系，必须是参数地子孙节点才匹配。
- xhr: 匹配时是否处理HTTP_X_REQUESTED_WITH
- header: 指定请求中必含的的HTTP header或header名值对。如‘User-Agent:Mozilla/.*’、'Host:localhost'
- accept: 指定HTTP 请求头中客户端可以能够接受的内容类型，如'text/plain'、'text*'
- path_info: 匹配PATH_INFO的正则表达式。
- custom_predicates: 定制的断言可执行对象。
