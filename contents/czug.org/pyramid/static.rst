---
created: 2012-04-08 12:36:58
creator:
description: 
title: Pyramid静态资源的使用
---

================================
Pyramid静态资源的使用
================================

在一个Python包中任何非Python源码的文件都可以叫做资源，如GIF、CSS、JS、模版文件、不包含__init__.py地目录等。

一、资源申明
---------------

在Pyramid程序中，我们经常可以看到这样的引用，如render_to_response('myapp:templates/some_template.pt', {}, request)

在这种引用方式下，Pyramid会尝试去解析myapp:templates/some_template.pt 这个字符串。该字符串就是一个资源申明，其中前半部分是包名，这里就是myapp。后半部分是该资源相对于这个包的相对路径。

Pyramid通过pkg_resources方法将这种资源申明解析成对应资源文件的绝对路径，并在后续的操作中使用该路径进行具体操作。

有些时候，我们也可以省略前面的包名，仅仅使用templates/some_template.pt这个字符串来表示一个资源，在这种方式下，表示该资源相对于使用它的代码段所在文件的相对路径。这种方式一般常用于某资源仅仅在一个地方被使用，跟其他代码都毫无关系的情况下。


二、Pyramid中静态资源的使用
------------------------------------

在Pyramid中，可以通过add_static_view进行静态资源的配置。在使用该函数时，要理解清楚，它本身仍是一个视图。

1. 单一静态资源配置

Pyramid支持从文件系统载入静态资源提供访问。正如我们在分析Pyramid启动时看到的，可以通过在main方法里面加入诸如 pyramid.config.Configurator.add_static_view(name='static', path='/var/www/static') 之类的语句来告诉Pyramid如何寻找静态资源。

在这个例子中，add_static_view(name='static', path='/var/www/static')告诉Pyramid在/var/www/static目录下的文件，均以/static开头的URL提供服务。

在这里，name表示URL的前缀；path可以是一个目录或一个资源申明，如config.add_static_view(name='static', path='some_package:a/b/c/static')，只要pkg_resources能正确定位即可。系统会根据文件的后缀来设置相应地content-type。

2. 多个静态资源配置

有的时候，为了项目清晰需要，可能会定义多个静态资源，如

.. code:: python

    config.add_static_view(name='static1', path='mypackage:assets/1')
    config.add_static_view(name='static2', path='mypackage:assets/2')

在上例中，凡是在assets/1目录中的文件访问时都需要带/static1，assets/2目录中的文件访问时都需要带/static2。如下面程序：

.. code:: python

    def my_view(request):
        css_url = request.static_url('mypackage:assets/1/foo.css')
        js_url = request.static_url('mypackage:assets/2/foo.js')
        return render_template_to_response('templates/my_template.pt', css_url = css_url, js_url = js_url)

如果定义了本节开头的两个静态资源，那么上面代码中，css_url 即为 http://example.com/static1/foo.css js_url即为 http://example.com/static2/foo.js。

Pyramid鼓励在程序、模版中使用resource_url这样的方式来生成URL，这样只要变更add_static_view的name参数即可完成整个静态资源的迁移。

3. 动静分离的配置

在有些情况下，我们需要使用动静分离，这时候我们需要将静态文件转移到一个另外的域名上去，这时候我们可以用config.add_static_view(name='http://example.com/images', path='mypackage:images')这种方式提供服务。在这种方式下，一旦在程序中使用resource_url()来生成URL，name指向的字符串就会作为这个生成的URL的前缀。

如我们定义config.add_static_view(name='http://example.com/images', path='mypackage:images')
那么调用request.static_url(’mypackage:images/logo.png’) 将会得到 http://example.com/images/logo.png 这样的URL。

使用了这样的配置方式，甚至可以在开发环境时将静态资源放在项目中，而部署时变更name来完成动静分离，只要我们在ini文件中配置一个media_location参数，然后使name等于这个配置参数即可。

4. 静态资源的权限

在默认情况下，所有通过add_static_view形式来提供服务地文件均可被匿名访问。如果要为这些静态资源提供权限控制，则还需要加一个permission参数，该参数的使用方式跟视图中的permission参数是一样的。

三、通过自定义视图来载入静态资源
----------------------------------

上面讲的都是用Pyramid默认的视图来载入静态资源，但有的时候，可能需要定义一个自定义视图来载入静态资源来达到特殊目的。如在URL分发中，希望当任何路由匹配规则都不满足时，直接查找某个目录下的静态文件。或者因下载权限等特殊情况，就需要自定义特殊视图来提供服务。

1. 根相关的自定义静态视图（仅URL分发有效）

在Pyramid中，pyramid.static.static_view类提供了静态资源视图的支持，我们可以用它直接生成一个支持特定静态资源的实例（add_static_view也使用了它）。如：

.. code:: python

    from pyramid.static import static_view
    static_view = static_view('/path/to/static/dir', use_subpath=True)

然后在所有add_route定义之后加上：

.. code:: python

    config.add_route('catchall_static', '/*subpath')
    config.add_view(static_view, route_name='catchall_static')

这条规则匹配了所有形式的请求，所以只能放在最后。也因此，这种方式不适合traversal方式。

2. 服务特定资源的视图

我们可以为一些特殊的资源定义特定的服务视图，如下：

.. code:: python

    import os
    from pyramid.response import FileResponse

    def favicon_view(request):
        here = os.path.dirname(__file__)
        icon = os.path.join(here, 'static', 'favicon.ico')
        return FileResponse(icon, request=request)

这个例子直接读取favicon.ico文件，形成一个Response，当然，也可以加上任何你希望的其他控制功能。

再在main中加入路由信息：

.. code:: python

    config.add_route('favicon', '/favicon.ico')
    config.add_view('myapp.views.favicon_view', route_name='favicon')

这个时候，就可以在add_view中加入断言参数来进一步控制其匹配情况了，如permission。

四、资源重载
-----------------

有的时候，我们会希望直接利用一个已有项目，仅仅变更其静态资源（如模版、图片、logo、CSS等），从而使其变成一个新的项目，但并不希望破坏原项目的完整性。在这种情况下，Pyramid提供了资源重载的概念来支持这类需求。

在Configurator这个类里面，提供了一个override_asset方法，允许重载下列内容：

* 独立的Chamelon模版
* 一个包含多个Chamelon模版的目录
* 通过pyramid.static.static_view实例支持的独立静态文件
* 一个包含多个通过pyramid.static.static_view实例支持的静态文件的目录
* 任何使用pkg_resoures定位的资源

1. 重载一个模版

.. code:: python

   config.override_asset(
            to_override='some.package:templates/mytemplate.pt',
            override_with='another.package:othertemplates/anothertemplate.pt')

2. 重载整个目录

.. code:: python

    config.override_asset(to_override='some.package',
                          override_with='another.package')

3. 重载一个子目录

.. code:: python

   config.override_asset(to_override='some.package:templates/',
                         override_with='another.package:othertemplates/')

注意：这里目录后必须加/结尾，否则后果不可预知。

在项目中，不能用一个文件来重载一个目录，反之亦然。也不能重载自身。

如果多个override_asset的to_override相同，而override_with不同，则会堆叠而形成一个搜索路径，第一个被检索到的资源将被使用，如果重载路径里都找不到，则原始资源被使用。
