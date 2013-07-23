---
created: ''
creator: ''
description: 'asdfasd '
title: 简单的Hello world
---
=============================================
Pyramid 学习笔记：简单的Hello world
=============================================

使用Pyramid并非就一定要使用其提供的标准模板来搭建应用，比如下面的代码就建立了一个带2个页面的简单web应用::

	from pyramid.config import Configurator
	from pyramid.response import Response
	from paste.httpserver import serve

	def hello_world(request):
	    return Response(’Hello world!’)

	def goodbye_world(request):
	    return Response(’Goodbye world!’)

	if __name__ == ’__main__’:
	    config = Configurator()
	    config.add_view(hello_world)
	    config.add_view(goodbye_world, name=’goodbye’)
	    app = config.make_wsgi_app()
	    serve(app, host=’0.0.0.0’)

将上述代码保存为helloworld.py，然后在命令行运行::

   python helloworld.py

系统将出现如下提示信息::

   serving on 0.0.0.0:8080 view at http://127.0.0.1:8080

这就说明一个web应用已经在本机8080端口提供服务了。现在我们就可以用http://127.0.0.1:8080和http://127.0.0.1:8080/goodbye访问这两个页面了。

（注意，这里需要事先将pyramid安装好，如果使用了虚拟环境，需要先启动虚拟环境）

下面我们逐行看一下这些代码的含义。

首先，看这两个函数的定义::

	def hello_world(request):
	    return Response(’Hello world!’)

	def goodbye_world(request):
	    return Response(’Goodbye world!’)

这两个函数均接收一个request参数，并组织一个Response对象返回。在Pyramid中，这样的函数就叫做可调用视图。它接收的request参数就是由WSGI 服务器传递给Pyramid的一个HTTP请求。

可调用视图必须返回一个Response对象以构建一个真实的HTTP 应答。该对象将会在WSGI 服务器转换成文本并发送给浏览器。
因此，上述两个函数基本上可以看着两个页面内容的具体实现。

接下来，我们再看::

    config = Configurator()

这一行创建了一个Configurator对象的示例。该对象就是本代码段用来进行Pyramid配置的一个接口。使用该对象提供的方法，我们可以改变这个小应用中的应用注册器中的包含的注册项。

接下来，马上可以看到我们怎么将一个可调用视图注册到本应用的配置对象中::

    config.add_view(hello_world)
    config.add_view(goodbye_world, name=’goodbye’)

在这里，hello_world, goodbye_world就是前面定义的可调用视图。我们通过add_view这个方法，就可以将这两个视图与对应的调用url结构添加到配置对象中。在上面的例子中，name是一个可选的视图参数，代表了只有http请求中包含这个name的值的请求才会激活它对应的可调用视图，name默认值为‘’。

基于上面的这个定义，我们就可以用URL /来访问hello_world视图对应的内容，而用URL /goodbye访问goodbye_world视图对应的内容。
add_view的定义是无序的，当Pyramid处理一个请求时，将总是调用参数最匹配的那个配置。

最后的两行就是启动一个wsgi 服务器来提供服务::

    app = config.make_wsgi_app()
    serve(app, host=’0.0.0.0’)

一旦配置结束，我们就可以使用make_wsgi_app来创建一个wsgi应用对象。然后就可以将该对象传递给一个paster的HTTP服务器对外提供服务了。这里我们指定了host='0.0.0.0'表示任意IP地址均可以访问本服务，如果仅提供本机服务而不提供远程访问的话，可以将host赋值成'127.0.0.1'。paster HTTP服务器默认采用8080端口提供服务。
