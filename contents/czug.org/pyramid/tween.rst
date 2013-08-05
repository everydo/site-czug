---
created: 2012-04-22 13:32:42
creator:
description: 
title: Pyramid的tween
---

===================
Pyramid的tween
===================
在Pyramid中，tween是一些运行在Pyramid router处理逻辑和WSGI服务器直接的程序，经常用于Pyramid框架扩展功能。tween比较类似于WSGI中间件，但它能访问Pyramid应用注册表。


一、tween factory
---------------------

tween是一个接收request对象并且返回response对象的可调用程序。

要使用tween，必须首先构建tween factory。tween factory 必须是一个全局范围可调用的程序，它带两个参数：handler、registry。handler可以是一个Pyramid request处理程序或另外一个tween。registry则是Pyramid的应用注册表。tween factory必须返回一个tween。如：

.. code::

    import time
    from pyramid.settings import asbool
    import logging

    log = logging.getLogger(__name__)

    def timing_tween_factory(handler, registry):
        # 如果.ini配置文件中定义了do_timing = true，则启动计时
        if asbool(registry.settings.get('do_timing')):
            def timing_tween(request):
                #定义一个tween，接受request，返回response
                start = time.time()
                try:
                    response = handler(request)  # 调用原始的处理程序，可能是Pyramid处理程序，或一个tween
                finally:
                    end = time.time()
                    log.debug('the request took %s seconds' % (end-start))
                return response
            return timing_tween    # 如果开启了do_timing，则返回tween
        return handler   # 如果没有开启do_timing，则返回原始的handler


二、注册一个tween factory
----------------------------

可以通过add_tween方法直接注册一个tween factory。如：

.. code:: python

    config = Configurator()
    config.add_tween('myapp.tweens.timing_tween_factory')

注意这里只能是一个包结构定义的字符串，不能直接传一个对象。（还不清楚问什么要这么限定。）

tween也可以直接定义在ini文件中，如

.. code:: python

    pyramid.tweens = myapp..tweens.timing_tween_factory

如果在ini文件中定义了tweens，那么程序中的add_tween将被忽略。

如果在一个应用中注册了多个tween，他们将在程序启动时按照定义的顺序（如果没有特别指定的话）形成一个链式结构，类似于原来pylons的洋葱体结构。如定义了如下tween：

.. code:: python

    from pyramid.config import Configurator
    config = Configurator()

    config.add_tween('myapp.tween_factory1')
    config.add_tween('myapp.tween_factory2')

将形成如下调用顺序

.. code::

   INGRESS (implicit)     WSGI入口
   myapp.tween_factory2
   myapp.tween_factory1
   pyramid.tweens.excview_tween_factory (implicit)   Pyramid提供
   MAIN (implicit)  应用

三、指定tween的位置
-----------------------

默认的，tween的顺序就是申明的顺序，不过开发者也可以通过特定参数来改变这个顺序。如：

    config.add_tween('myapp.tween_factory', over=pyramid.tweens.MAIN)

add_tween 中可以通过under或over来特别指定tween的顺序。它们的值可以是：

* None：默认
* 一个tween factory的名字
* pyramid.tweens.MAIN, pyramid.tweens.INGRESS, or pyramid.tweens.EXCVIEW其中之一
* 以上的组合形式

其中under表示相比更靠近MAIN，over表示相比更靠近INGRESS。

如上例，将形成如下顺序：

.. code::

   INGRESS (implicit)
   pyramid.tweens.excview_tween_factory (implicit)
   myapp.tween_factory
   MAIN (implicit)

再如：

.. code:: python

    config.add_tween('myapp.tween_factory1', over=pyramid.tweens.MAIN)
    config.add_tween('myapp.tween_factory2', over=pyramid.tweens.MAIN, under='myapp.tween_factory1')

将形成如下顺序：

.. code::

    INGRESS (implicit)
    pyramid.tweens.excview_tween_factory (implicit)
    myapp.tween_factory1
    myapp.tween_factory2
    MAIN (implicit)

什么over、under都不定义，相当于使用了under=INGRESS。

在under、over中也可使用类似under=('someothertween', 'someothertween2', INGRESS)的方式，则系统只会检查存在的tween，如果tween不存在，则忽略。

开发者可以通过ptweens命令来查看tweens的顺序。

四、冲突与环形顺序

Pyramid不允许定义多次定义同名的tween factory。

Pyramid如果检测到over、under构成了一个环，则抛出异常。

