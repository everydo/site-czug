---
created: 2012-04-23 13:07:44
creator:
description: 
title: Pyramid 1.3基础
---

========================
Pyramid 1.3基础
========================

因Pyramid1.3相比以前的版本从使用命令方面变更比较多，因此补个简单使用的章节。

一、虚拟环境
--------------

在安装Pyramid之前，推荐首先利用virtualenv建立一个专用的虚拟环境。

virtualenv --no-site-packages pyramid-1.3

这里使用了--no-site-packages参数，避免了跟系统安装包的冲突，可以保证一个比较干净的环境。

使用source bin/activate激活这个虚拟环境，以便后续操作。


二、安装Pyramid
------------------

安装Pyramid 1.3版本。

    easy_install pyramid==1.3

系统会自动下载安装所依赖的包。


三、建立工程
-----------------

使用命令：

    pcreate -s alchemy simpleCRUD

即可建立一个项目框架，这里可以选择 alchemy、starter、zodb三种类型的项目框架（scaffold）。


四、进入开发模式
-------------------

项目建立好之后，在开始开发前，还需要在该项目目录下运行如下命令：

    python setup.py develop

该命令会在我们刚才建立的虚拟环境中的lib/python/site-packages目录下建立一个指向本目录的指针 -- 1). simpleCRUD.egg-link文件（该文件内容包含了本项目的绝对路径），2). 在easy_install.pth中加入本项目的绝对路径。如果setup.py中包含了未安装得python包，也会在此时安装这些包。


五、运行单元测试
--------------------

生成的项目框架默认有一个单元测试的例子，在项目配置好之后，即可运行单元测试命令：

    python setup.py test -q

如果安装了nose、coverage，还可以得到单元测试覆盖率：

    nosetests --cover-package=simplecrud--cover-erase --with-coverage


六、安装数据库
-----------------

如果是使用了sqlalchemy的项目，还需要额外的一步：建立数据库。

    initialize_simpleCRUD_db development.ini

运行该命令将会执行simplecrud/script目录下的initializedb.py文件，在该文件中，可以建立数据库、插入初始数据。


七、启动应用
---------------

做完上面所有步骤之后，即可使用：

    pserve development.ini --reload

启动服务器，开始提供服务了。
