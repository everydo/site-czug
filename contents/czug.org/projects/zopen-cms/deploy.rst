---
created: ''
creator: ''
description: 运行zopen-cms的配置文件说明
title: 详细配置说明
---
.. include:: include.rst

详细配置说明
=====================

配置文件是cms.ini，内容如下：
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    [DEFAULT]
    debug = True
    theme_host = http://localhost:6543

    [server:main]
    use = egg:PasteScript#cherrypy
    host = 0.0.0.0
    port = 6543

    [app:cms]
    use = egg:zopen.cms#app
    reload_templates = true
    roots = contents
    root_vpath = /contents
    tabs = [('首页', '/'), ('关于', '/about'), ('产品', '/products')]

    [app:themes.app]
    use = egg:Paste#static
    document_root = themes

    [pipeline:cms.pipeline]
    pipeline = deliverance
               cms

    [composite:main]
    use = egg:Paste#urlmap
    /themes = themes.app
    / = cms.pipeline

    [filter:deliverance]
    paste.filter_app_factory = deliverance.wsgimiddleware:make_filter
    theme_uri = %(theme_host)s/themes/index.html?notheme
    rule_uri = file:///%(here)s/rules.xml
    is_internal_uri = deliverance.wsgimiddleware:always_external

简要说明：
~~~~~~~~~~~~~~~~~
#. [DEFAULT]是全局设置

    theme_host 指皮肤的位置，用于[filter:deliverance]中的%(theme_host)s调用，端口注意和下面服务器端口一致。

#. [server:main]服务器设置

    port 端口

#. [app:cms]是zopen.cms的运行配置

    roots 是网站内容的位置，可以有多个网站，用分号隔开。
    root_vpath 网站根目录访问时的对应位置，在上面的配置中http://localhost:6543访问的实际为http://localhost:6543/contents
    tabs 网站导航栏设置

#. [filter:deliverance]

    theme_uri 皮肤位置
    rule_uri 皮肤规则位置

