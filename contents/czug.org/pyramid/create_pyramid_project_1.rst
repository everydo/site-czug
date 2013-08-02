---
created: 2011-07-30 19:56:18
creator:
description: 
title: Pyramid 学习笔记：创建Pyramid项目（上）
---

=========================================
Pyramid 学习笔记：创建Pyramid项目（上）
=========================================

一、目前Pyramid提供的项目模板
----------------------------------

Pyramid项目模板之间主要靠持久化机制，URL映射机制来区分，目前主要提供以下几种：

* pyramid_starter： 使用traversal机制进行URL映射，无持久化支持
* pyramid_zodb： 使用traversal机制进行URL映射，使用ZODB提供持久化支持
* pyramid_routesalchemy： 使用分发机制（即Route机制）进行URL映射，使用SQLAlchemy提供持久化支持
* pyramid_alchemy： 使用traversal机制进行URL映射，使用SQLAlchemy提供持久化支持


二、创建一个项目
-------------------------

这个跟原来的pylons一模一样，直接运行
paster create -t pyramid_starter
然后在接下来的提示中输入项目名就可以创建一个项目。
这里要注意一下的是，Pyramid（Pylons也一样）项目的名字推荐采用类似MyProject（单词首字母大写，单词间无间隔符）这样的命名方式，Pyramid会建立一个叫MyProject的目录。在该目录下，Pyramid会再建一个叫myproject（单词全小写，无间隔符，符合PEP8规范）的目录，这个目录就是该项目所有代码、开发模板的推荐存放处。

三、建立开发环境
-------------------------

运行python setup.py develop即可完成这个步骤。
这一步是以前pylons项目所没有的。主要工作就是刷新一下PKG-INFO，在Pyramid环境的site-packages中加入一个MyProject.egg-link文件，指向当前项目所在的目录，并在easy-install.pth 中加入该项目所在的目录。这样就可以在整个Pyramid环境中引用这个项目了。最后就是查找新建项目的依赖包，如果本地环境没有，则从网上下载安装。

个人感觉这个步骤不如pylons清晰，特别是如果本机开发的项目比较多，就会造成很多link，而这些项目之间并不一定都需要相互依赖。还不如直接在IDE中设置项目依赖关系更清楚、方便，可以单独设置每个项目的依赖关系。

四、单元测试
-------------------------

Pyramid貌似对单元测试相当重视，不再需要单独装nosetests貌似也可以直接跑整个项目的单元测试。
直接运行命令
python setup.py test -q
即可执行整个项目的单元测试。
不过目前还不知道特定指定某个包的单元测试如何做，也还不清楚怎么使用这个命令计算覆盖率，需要空了再来研究一下。

五、运行
-------------------------

很简单，跟pylons一样，直接运行
paster serve development.ini
即可启动服务。当然也可以加--reload参数以便检测到文件变更自动重启服务。
这里development.ini就是这个项目的配置文件。

六、项目结构
-------------------------

打开我们创建的这个新项目，我们可以看到以下目录结构：

.. code::

    MyProject/
    |-- CHANGES.txt
    |-- development.ini
    |-- MANIFEST.in
    |-- myproject
    |   |-- __init__.py
    |   |-- resources.py
    |   |-- static
    |   |   |-- favicon.ico
    |   |   |-- logo.png
    |   |   ‘-- pylons.css
    |   |-- templates
    |   |   ‘-- mytemplate.pt
    |   |-- tests.py
    |   ‘-- views.py
    |--production.ini
    |--README.txt
    |--setup.cfg
    ‘--setup.py

这里我们首先看一下Myroject这个项目根目录下的几个文件：

1. CHANGES.txt

    本项目的变更文件，推荐采用ReST格式编写
2. RADME.txt

    项目描述文件，推荐采用ReST格式编写
3. development.ini

    开发时参数配置文件
4. production.ini

    运行时参数配置文件
5. setup.cfg
   
    这是setup.py使用的配置文件
6. MANIFEST.in

    打包清单，列出了打包时需要一起打到python程序包中的文件
7. setup.py

    标准的setuptools的setup.py文件，用于测试、分发该项目

七、包结构
-------------------------

在MyProject项目目录中，还有一个叫myproject的包目录，这个目录下包含了如下内容

1. __init__.py

    初始化文件。包含了一些启动本项目的指令。
2. resources.py

    资源定义文件，提供URL映射所需的站点结构
3. templates

    存放开发模板文件的目录
4. tests.py

    存放单元测试
5. views.py

    存放可调用视图

本文提到的示例材料均源于Pyramid官方网站 
