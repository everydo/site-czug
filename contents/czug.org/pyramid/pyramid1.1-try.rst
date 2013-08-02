---
created: 2011-07-25 22:53:30
author:
desription: 
title: pyramid 1.1 简单试用
---

=======================
pyramid 1.1 简单试用
=======================

测试操作系统：Ubuntu 10.10

首先下载一个virtualenv，拉出其中的virtualenv.py，运行
python virtualenv.py pyramid-1.1
建立一个虚拟的python工作环境。

然后，运行source pyramid-1.1/bin/activate激活该虚拟环境。
再输入命令easy_install pyramid 即可完成安装。

很简单的安装过程，跟以前的pylons基本相同。

先拷贝一个官网的小例子测似一下

.. code:: python

    from paste.httpserver import serve
    from pyramid.config import Configurator
    from pyramid.response import Response

    def hello_world(request):
        return Response('Hello world!')

    if __name__ == '__main__':
        config = Configurator()
        config.add_view(hello_world)
        app = config.make_wsgi_app()
        serve(app, host='0.0.0.0')

编辑保存成test.py。
运行python test.py
浏览器查看http://127.0.0.1:8080没有问题。

再来创建一个小项目试试看，

    paster create -t pyramid_starter

这里pyramid_starter是pyramid中内置的一个项目模板

再运行

    python setup.py develop

初始化这个项目的开发环境

然后运行

    paster serve development.ini

即可启动这个小项目。

这里跟以前的pylons不同的地方就是多了一个python setup.py develop步骤，需要注意一下。


