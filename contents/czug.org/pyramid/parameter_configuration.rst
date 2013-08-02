---
created: 2012-04-11 18:06:20
creator:
description: 
title: Pyramid的参数配置
---

===================
Pyramid的参数配置
===================

Pyramid在系统参数配置方面提供了环境变量和ini配置文件两种支持方式，其中环境变量配置优先于配置文件。

一、使用方法
----------------

在ini文件中的配置方式如下：

.. code::

    [app:main]
    use = egg:MyProject
    pyramid.reload_templates = true
    pyramid.debug_authorization = true

使用环境变量配置方式如下：

PYRAMID_DEBUG_AUTHORIZATION=1 PYRAMID_RELOAD_TEMPLATES=1 pserve development.ini

这里需要注意2点：

1. 在ini配置文件中，pyramid.reload_templates跟reload_templates是等同的，因此在程序自己定义参数是尽量不要跟pyramid参数冲突。
2. 在ini文件中，使用true/false，在环境变量中，使用1/0，或不加这个参数。

二、配置参数
-----------------

1. 模版变更时是否自动重加载模版

设置此参数为true时，不需重启服务器即可重新加载修改过的模版，适合在调试中使用。生产环境不推荐。

- ENV名: PYRAMID_RELOAD_TEMPLATES
- ini中名：pyramid.reload_templates

2. 资源变更时是否重加载资源文件，适合调试用，会大大降低系统性能。

- ENV名: PYRAMID_RELOAD_ASSETS 
- ini中名：pyramid.reload_assets

因在Pyramid中，模版本身也视作资源，因此上面两个配置会有点容易混淆。主要是因为涉及到了资源重载的概念，使得资源变更的判断比单纯文件更新复杂。

当reload_templates为真时，Pyramid会利用模版自身能力来检查是否重载一个模版文件。如果这时reload_assets为假，则Pyramid会在第一次请求时缓存pkg_resources返回的模版文件名，后续的请求则直接从缓存中得到这个模版文件名。而模版系统则检查是否需要重载。

一旦reload_assets设为真，Pyramid将不缓存这个模版文件名，而是每次都根据资源重载目录得到最终的模版路径。因此会大大降低系统性能。

3. 是否调试权限（输出log信息）

- ENV名: PYRAMID_DEBUG_AUTHORIZATION 
- ini中名：pyramid.debug_authorization

4. 是否调试试图中的NotFound异常

- ENV名: PYRAMID_DEBUG_NOTFOUND
- ini中名：pyramid.debug_notfound

5. 是否调试路由匹配情况

- ENV名: PYRAMID_DEBUG_ROUTEMATCH
- ini中名：pyramid.debug_routematch

6. 是否禁止HTTP缓存，禁止所有视图配置中的HTTP缓存设置

- ENV名: PYRAMID_PREVENT_HTTP_CACHE 
- ini中名：pyramid.prevent_http_cache

7. 开始所有调试类参数（名字带debug的），其他参数无影响

- ENV名: PYRAMID_DEBUG_ALL 
- ini中名：pyramid.debug_all

8. 开始所有重载类参数（名字带reload的），其他参数无影响

- ENV名: PYRAMID_RELOAD_ALL 
- ini中名：pyramid.reload_all

9. 设置默认Locale，如果应用没有配置Locale策略，就采用默认Locale

- ENV名: PYRAMID_DEFAULT_LOCALE_NAME
- ini中名：pyramid.default_locale_name


三、includes
-----------------

Pyramid还允许通过includes指令配置符合Pyramid要求的第三方包，该配置效果等同调用Configurator的include方法。如

.. code::

    pyramid.includes =
        pyramid_debugtoolbar
        pyramid_tm

或

.. code::

    pyramid.includes = pyramid_debugtoolbar  pyramid_tm

或

.. code::

    pyramid.includes = ['pyramid_debugtoolbar', 'pyramid_tm']

不过清晰起见，一般采用第一种方式。

这种方式等同与直接调用include方法，如

.. code:: python

    from pyramid.config import Configurator

    def main(global_config, **settings):
        config = Configurator(settings=settings)
        ...
        config.include('pyramid_debugtoolbar')
        config.include('pyramid_tm')


四、tween
-------------

tween是Pyramid的一种插件方式，它们形成一直有序的链式调用关系。

一般情况下，tween都隐式地配置在include地第三方包中，不需要自己单独配置。如果需要精准调整tween之间地顺序，则需要用tweens指令来定义。它的定义方式基本跟include一致。如：

pyramid.tweens =pkg.tween_factory1 pkg.tween_factory2 pkg.tween_factory3
或

.. code::

    pyramid.tweens = pkg.tween_factory1
                                     pkg.tween_factory2
                                      pkg.tween_factory3

或

.. code::

    pyramid.tweens =['pkg.tween_factory1', 'pkg.tween_factory2', 'pkg.tween_factory3']



五、Mako 参数配置
-------------------

如果使用了Mako模版，则应用还需要为Mako定义一系列参数。

- mako.directories：Moko模版文件所在目录，可以使用资源专用格式，如mypackage:templates
- mako.module_directory：模版编译后存放路径，必须是一个绝对路径，如%(here)/data/templates。不指定则放内存。
- mako.input_encoding：模版字符集，默认utf-8
- mako.error_handler：Mako模版编译或运行错误时的处理程序
- mako.default_filters：所有Mako表达式缺省的过滤器
- mako.imports：模版中需要的import
- mako.strict_undefined：是否严格处理未定义变量。默认为false，Mako可将未定义变量显示为空字符串。
- mako.preprocessor：模版解析前的预处理程序，处理结果将视为真正使用的模版


六、自定义参数及引用
-------------------------

我们完全可以在ini文件中定义自己需要的配置信息（注意，要定义在app:foo节），如

.. code::

    [app:main]
    # .. other settings
    debug_frobnosticator = True

则可以在以下地方这样使用这个配置：

1. main函数

.. code:: python

    def main(global_config, **settings):
        from pyramid.settings import asbool
        debug_frobnosticator = asbool(settings.get(
                   'debug_frobnosticator', 'false'))
        settings['debug_frobnosticator'] = debug_frobnosticator
        config = Configurator(settings=settings)

2. 第三方模块的include函数

.. code:: python

    def includeme(config):
        settings = config.registry.settings
        debug_frobnosticator = settings['debug_frobnosticator']

3. 视图中

.. code:: python

    settings = request.registry.settings
    debug_frobnosticator = settings['debug_frobnosticator']

4. 非视图中

.. code:: python

    registry = pyramid.threadlocal.get_current_registry()
    settings = registry.settings
    debug_frobnosticator = settings['debug_frobnosticator']

