===========
安装Plone 2
===========

:作者: 潘俊勇
:版本: $Revision: 0.1 $
:版权: This document has been placed in the public domain.

.. contents:: 章节目录

介绍
====

基本的安装步骤：

1. 先安装python

2. 安装zope 

3. 创建zope实例.  zope实例，可独立运行的zope服务器程序，一个计算机上可安装多个运行的实例。每个实例有自己的目录，INSTANCE_HOME，有自己的配置文件、启动文件、运行日志、数据文件等。

4. `配置Zope <X_e9_85_8d_e7_bd_aeZope>`__

5. 安装zope产品：CMF / Plone 等

6. `Plone的中文支持 <Plone_e7_9a_84_e4_b8_ad_e6_96_87_e6_94_af_e6_8c_81>`__

Windows下的安装方法
==================

方案一：傻瓜型
-------------

直接安装python/zope/plone. 

1. windows下有直接执行的傻瓜型的exe安装程序

   依照安装程序便可完成安装(**注意：必须使用“系统管理员”角色的用户进行安装，否则会报"corrupt installation detected"之类的错误**)

   这里有一些 `截图`__ 。

   __ http://download.limi.net/xcontroller

2. `Plone的中文支持 <Plone_e7_9a_84_e4_b8_ad_e6_96_87_e6_94_af_e6_8c_81>`__ 安装

方案二：集成安装
--------------

使用安装程序，同时安装zope和python, 手工安装Plone：

1. zope下载：

   http://zope.org/Products/Zope/

2. 运行zope安装程序 (**注意：必须使用“系统管理员”角色的用户进行安装，否则会报"corrupt installation detected"之类的错误**)

3. 选择zope的安装路径为：c:\zope2.7，后面用$INSTANCE_HOME代替

4. 选择实例的路径为：c:\zope-instance；后面用$INSTANCE_HOME代替

5. 输入zope实例admin用户的口令

6. 是否使用windows服务的方式运行

7. `配置Zope <X_e9_85_8d_e7_bd_aeZope>`__

8. `手工安装Plone等产品 <X_e6_89_8b_e5_b7_a5_e5_ae_89_e8_a3_85Plone_e7_ad_89_e4_ba_a7_e5_93_81>`__ 到Products目录中

9. `Plone的中文支持 <Plone_e7_9a_84_e4_b8_ad_e6_96_87_e6_94_af_e6_8c_81>`__ 安装

Linux下的安装方法
================

步骤如下：

1. 安装python

   a. 下载python2.3.3, 解压缩

      命令::

       wget http://www.python.org/ftp/python/2.3.3/Python-2.3.3.tgz
       tar xzf Python-2.3.3.tgz

   b. 支持大文件的配置的安装

      进入刚才解压后的python目录，依次以root用户的身份输入下面的指令，python会安装到/usr/local/目录下，后面以$PYTHON_HOME指代::

       CFLAGS='-D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64' OPT="-g -O2 $CFLAGS" \
       ./configure
       make && make install

2. 安装Zope2.7

   a. 下载zope2.7 的Linux版本, 解压缩

      http://zope.org/Products/Zope/2.7.0/Zope-2.7.0.tgz

   b. 安装zope

      安装命令为::

       ./configure --with-python=/usr/local/bin/python2.3 --prefix=/opt/Zope-2.7
       make && make install

      注意：

      * with-python指定python的目录，如果不设置，则会自动寻找一个。
      * prefix是zope安装的目录，可不设置，缺省为/opt/Zope-2.7，下文用$ZOPE_HOME代替.

3. 创建zope实例

   a. 使用系统管理员帐号，创建zope用户，创建实例目录，分配权限

      如在/var/ZopeInstances/domo目录下建立实例，命令为::

       useradd zope
       mkdir /var/ZopeInstances/demo
       chown zope:zope /var/ZopeInstances/demo

   b. 切换到zope用户，创建demo实例

      命令::

       su zope
       /opt/Zope-2.7/bin/mkzopeinstance.py

      依次提示输入如下信息：

      * 实例目录，在这里是:/var/ZopeInstances/demo
      * 初始的系统管理员用户名，如：admin
      * 初始系统管理员对应的口令
      * 确认口令，再次输入口令

4. `配置Zope <X_e9_85_8d_e7_bd_aeZope>`__ ，这个过程可以忽略

5. 运行zope：

   在实例目录下运行::

    bin/runzope

   如果您没有更改端口设置，您可在浏览器中访问 http://localhost:8080 

6. `手工安装Plone等产品 <X_e6_89_8b_e5_b7_a5_e5_ae_89_e8_a3_85Plone_e7_ad_89_e4_ba_a7_e5_93_81>`__

7. `Plone的中文支持 <Plone_e7_9a_84_e4_b8_ad_e6_96_87_e6_94_af_e6_8c_81>`__ 安装

8. 关闭Zope实例

   最佳的关闭方法是：点击Zope的控制面板Control_Panel中的Shutdown按钮，或者直接访问下面的URL::

    Control_Panel/manage_shutdown

