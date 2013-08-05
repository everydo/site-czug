---
created: 2012-03-25 11:42:30
creator:
description: 
title: 使用URL分发方式配置Pyramid项目（上）
---

========================================
使用URL分发方式配置Pyramid项目（上）
========================================

本节资料整理改编自Pyramid官方网站，部分内容按理解进行了增删整理和归纳，以便结构上更清晰。

Pyramid中可以使用URL分发作为其URL映射机制，这种方式来源于其前身Pylons中引用的Routes项目，通过定义一系列有序的URL匹配规则来将每一个request请求关联到合适的view上。如果找不到任何一条相匹配的规则，Pyramid将转而采用漫游（traversal）方式来定位view。
在URL规划过程时，可以在ini文件中设置pyramid.debug_routematch为true来打开调试模式以便观察规则匹配结果。

一、Route配置
--------------------

通常地，在开发过程中，route跟view是相匹配出现地。Pyramid允许使用如下两种定义方式来完成配置：

1. 同时add_route、add_view。

.. code:: python

    config.add_route('myroute', '/prefix/{one}/{two}') 
    config.add_view(myview, route_name='myroute')

在这里，add_route的第一个参数是这个route的名字，第二个参数是用于匹配的规则。add_view的第一个参数是view对象，也可以是一个类似'mypackage.views.myview'这样的带包结构的view名。第二个参数是一个断言，表明只有route_name为‘myroute’时才能调用这个view。这两个函数均可以带一系列断言参数来缩小匹配范围。

2. 使用scan扫描view定义

在main函数中定义route，然后使用scan方法扫描整个包，载入标注的view。

.. code:: python

    config.add_route('myroute', '/prefix/{one}/{two}') 
    config.scan('mypackage')

在view中，则用view_config来标注对应的view

.. code:: python

    @view_config(route_name='myroute') 
    def myview(request):
        return Response('OK')

这种方式其配置比较靠近实现代码，因此从阅读上更清晰，比较受到开发人员的欢迎。


二、规则语法
-----------------

这里的匹配规则主要是指上面例子中add_route的第二个参数，即'/prefix/{one}/{two}'。在Pyramid中，定义了一个比较直观的匹配算法灵活地实现了各种URL的匹配。

规则1. 前导‘/’可有可无，‘{foo}/bar/baz’跟‘/{foo}/bar/baz’两则是等价的。

规则2. 每一个匹配段（在'/'之间的字符串）均可以是一个既定字符串，也可以是一个占位符，甚至可以是两者的组合。如‘foo/{name}.html’

规则3. 匹配段必须至少包含一个字符。如‘/abc/’这个url跟‘/abc/{foo}’无法匹配，因foo不能是空地，但跟‘/{foo}/’可以匹配。

规则4. 占位符可以附带一个正则表达式以进一步缩小匹配范围。如{foo:\d+}表示只匹配数字内容。其实单独的占位符都隐含了一个通配地正则表达式，即{foo}就是{foo:[^/]+}，匹配不包含'/'的一个或多个任意字符。

规则5. 可以使用*号加占位符来通配URL剩余部分。\*只能放在匹配规则的最后，而且无需‘/’前导。如foo/{baz}/{bar}*fizzle

规则6. 规则严格按照申明顺序进行匹配，一旦发现匹配即中止匹配过程，返回匹配的route。

三、匹配算法
------------------

编写route配置的最终目的是为了将匹配规则与WSGI中的PATH_INFO相匹配（或不匹配）。这个处理过程很简单，当一个请求来临的时候，Pyramid会按照定义的顺序逐条检查所有匹配规则。这里要注意的是，除了上面我们看到的名字，匹配规则这两个参数之外，add_route还可以带一些所谓的断言参数，必须所有的断言参数都为真才能判定一条route配置匹配，否则即为不匹配，跳过这条规则检查下一条，直到检查完所有定义的规则。

一旦找到匹配的规则，Pyramid即启动view寻找机制定位该匹配route最合理地view。如果遍历完所有规则还是找不到匹配，Pyramid则启动漫游机制进行resouce定位和view定位。

作为匹配过程地一个自然结果，匹配算法将会在request中添加两个跟其相关的属性：matchdict、matched_route。matchdict是一个包含了占位符名与其匹配值对的字典。这里要注意一下的是，占位符名的类型是string，对应值的类型是Unicode，URL中对应部分将会通过url decode进行转换，并将utf-8转成Unicode之后才进入matchdict。


四、函数参数
---------------

add_route除了name和pattern之外，还可以带一系列的参数，这些参数大致可以分为普通和断言两种类型，其中断言参数参与匹配算法，如果断言参数不匹配，该规则即不匹配。

1. 普通参数

- name: route名，必填，单一应用唯一。
- factory: 当该route匹配时用于生成资源根对象（root resource object）的可执行对象（函数或类），不指定系统将采用默认的root factory。
- traverse: 指定特定的漫游路径
- pregenerator: 通过route产生url时的前置操作，用于变更route_url传入的参数，不常用。
- use_global_views: 当view定位时找不到一个route_name相同的view时，是否需要看看context，request，view名匹配而route_name不匹配的view
- static: 是否是静态route，静态意味着该route只能用于生成url，不能用于request匹配，也就是不用通过url访问到它。

2. 断言参数

- pattern: 匹配规则
- xhr: 匹配时是否处理HTTP_X_REQUESTED_WITH，处理AJAX请求时常用。
- request_method: ‘GET’、‘POST’、‘HEAD’、‘DELETE’、‘PUT’之一或是一个它们的tuple组合。不指定通配所有请求。
- path_info: 匹配PATH_INFO的正则表达式。
- request_param: 指定GET、POST必含的参数，如使用了request_param="foo=123"这种方式，则必须参数名、参数值都对应才算匹配。
- header: 指定请求中必含的的HTTP header或header名值对。如‘User-Agent:Mozilla/.*’、'Host:localhost'
- accept: 指定HTTP 请求头中客户端可以能够接受的内容类型，如'text/plain'、'text*'
- custom_predicates: 定制的断言可执行对象。

