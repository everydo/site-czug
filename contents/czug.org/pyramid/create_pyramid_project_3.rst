---
created: 2011-08-02 21:06:40
creator:
description: 
title: Pyramid 学习笔记：创建Pyramid项目（下）
---

===========================================
Pyramid 学习笔记：创建Pyramid项目（下）
===========================================

除了在项目根目录生成了一系列项目配置性文件之外，Pyramid还生成了一个简单的项目框架结构以方便开发人员编写代码。这些文件统一放在了myproject这个目录下面。

一、__init__.py文件
-------------------------

该文件主要定义了项目入口方法。主要代码如下：

.. code:: python

    def main(global_config, **settings):
        """ This function returns a Pyramid WSGI application.
        """
        config = Configurator(root_factory=Root, settings=settings)
        config.add_view('myproject.views.my_view',
                         context='myproject.resources.Root',
                         renderer='myproject:templates/mytemplate.pt')
        config.add_static_view('static', 'myproject:static')
        return config.make_wsgi_app()

这个main函数是Pyramid自动生成的本项目的入口，这里global_config, settings两个参数分别对应于development.ini(或production.ini)中的DEFAULT段和app:myproject段的内容。本函数主要功能就是完成了使用traversal机制进行URL映射的配置过程。traversal机制是受zope启发而来的一种URL映射机制，可以构建比较复杂的URL结构。如果URL结构比较简单的化，可以使用ROUTE机制，比较直观一点。
该函数最后返回一个WSGI应用以启动本应用。

二、view.py文件
-------------------------

Pyramid应用中的大部分实现都是在view中实现的，这个可以看作pylons中的controller。在我们生成的项目中，view.py只有一个简单的函数：

.. code:: python

    def my_view(request):
        return {'project':'myproject'}

在前面提到的__init__.py中，我们通过add_view函数注册到了系统中。因此运行这个应用之后，直接浏览 / 看到的就是调用了这个函数而返回的结果（经模板渲染之后）。

三、resources.py文件
-------------------------

这个文件就是用于traversal机制来映射URL时提供站点结构等资源的文件。我们通常用一个Root类来表示这些资源的根。每次接到WEB请求的时候，Pyramid Router通过这个类来找到本项目资源树的根。

四、静态文件目录
-------------------------

主要包含CSS、图片等静态文件

五、模板目录
-------------------------

存放项目开发用的模板文件。这也是在__init__.py中被add_view注册到系统中，并且与一个view关联。

六、test.py
-------------------------

这就是单元测试文件。

Pyramid生成的这个项目框架其实是很简单的一个结构，基本上是无法满足我们项目开发的需要的，一般我们都会修修改改再在项目中使用，也可以修改后生成一套scaffold以便今后重复利用。
一般情况下，我们都会做如下修改：

* view包，以及多层的包结构，如果应用比较复杂的话。
* 单元测试包结构
* URL映射如果复杂的化最好也能独立出来
* lib包，如果需要的话
* model包，如果有数据库支持的话

总体感觉，Pyramid生成的代码在项目代码结构的指导意义上不如pylons，也没Pylons那么严谨周全，要动的东西很多，需要抽个时间好好整理一个能用的东西出来。
