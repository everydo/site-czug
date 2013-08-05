---
created: 2012-04-29 08:33:14
creator:
description: 
title: 使用egg包方式在SAE上部署Pyramid应用
---

===========================================
使用egg包方式在SAE上部署Pyramid应用
===========================================

用源码在SinaAppEngine 上部署Pyramid应用经常会遇到文件过多的问题，因此尝试了一下egg包部署（只是喜欢egg格式而已～～，本文未涉及其他打包部署方式），主要步骤如下：

1. 打包

因为有的时候需要变更一些第三方包中的内容以适应平台的需要，我们需要将应用涉及到的第三方包重新打包（如果没有变更，不需要重新打包）。这个时候我们可以使用pip zip命令来完成这一工作。

不过不知何故，直接使用类似pip zip --no-pyc pyramid-1.3-py2.6.egg打出来的包里面包含了pyramid-1.3-py2.6.egg这个目录名，直接使用这些包会导致import失败。我们直接打开pip包中的zip.py文件，找到其中的zip_package方法，将其中涉及到的module_name的两行做修改，去掉往zip包写目录的功能即可。

对Pyramid涉及到的第三方包逐个运行pip zip命令即可完成打包工作。打包时注意带上--no-pyc参数，将pyc排除在外。

对于一些其中包含c模块的包，其中的包名可能会涉及到一些本地环境，如OS等。比如zope.interface-3.8.0-py2.6-macosx-10.7-intel.egg，可以直接将其名字改为zope.interface-3.8.0-py2.6.egg。

另外，目前SAE使用python 2.6版本，因此最好使用对应的python环境来打包。


2. 配置virtualenv.bundle目录

将所有涉及到的egg包拷贝到virtualenv.bundle中之后，在该目录建立一个easy-install.pth文件，里面包含如下内容：

.. code::

    import sys; sys.__plen = len(sys.path)
    ./Chameleon-2.8.4-py2.6.egg
    ./Mako-0.7.0-py2.6.egg
    ./MarkupSafe-0.15-py2.6.egg
    ./ordereddict-1.1-py2.6.egg
    ./PasteDeploy-1.5.0-py2.6.egg
    ./pyramid-1.3-py2.6.egg
    ./repoze.lru-0.5-py2.6.egg
    ./translationstring-1.1-py2.6.egg
    ./venusian-1.0a6-py2.6.egg
    ./WebOb-1.2b3-py2.6.egg
    ./zope.deprecation-3.5.1-py2.6.egg
    ./zope.interface-3.8.0-py2.6.egg
    import sys; new=sys.path[sys.__plen:]; del sys.path[sys.__plen:]; p=getattr(sys,'__egginsert',0); sys.path[p:p]=new; sys.__egginsert = p+len(new)

3. 修改index.wsgi文件

用site.addsitedir将这个目录包含到系统环境中。

.. code::

    import sae

    import os
    import site

    app_root = os.path.dirname(__file__)
    site.addsitedir(os.path.join(app_root, 'virtualenv.bundle'))

    from pyramid.config import Configurator

    settings = {"pyramid.reload_templates":"false",
                "pyramid.debug_authorization":"false",
                "pyramid.debug_notfound":"false",
                "pyramid.debug_routematch":"false",
                "pyramid.default_locale_name":"en"
                }

    config = Configurator(settings=settings)
    config.add_static_view('static', 'mypyramid:static', cache_max_age=3600)
    config.add_route('home', '/')
    config.scan("mypyramid")

    app = config.make_wsgi_app()

    application = sae.create_wsgi_app(app)


4. 上传

使用svn ci -m "my first pyramid in egg package"


5. 浏览

使用SAE提供的链接访问刚才部署的应用吧。


6. example下载与使用


本次使用的例子已经上传到vdisk，下载

下载该例子包含了pyramid开发所需的文件支持，可以直接在本地使用pyramid环境完成日常开发。开发完毕再将涉及的egg包打包到vieturlenv.bundle目录，静态文件拷贝到static目录上传即可。



本例子只适合当前的SAE环境，今后SAE环境的变化可能会导致本例不能正常运行。
