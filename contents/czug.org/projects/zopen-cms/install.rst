---
created: ''
creator: ''
description: 如何安装？
title: 安装、基本配置、运行
---
.. include:: include.rst
.. _environment_chapter:

安装 :mod:`zopen-cms`
=======================

安装前需要确认系统已有以下基本包: 
---------------------------------------
gcc, Python（2.4以上版本）

如果没有就如下安装::

    $ sudo apt-get install make gcc libc6-dev g++

    $ sudo apt-get install python python-dev

获取demosite
---------------------
::

    $ svn co http://zopen-cms.googlecode.com/svn/trunk/demosite demosite

建立buildout基本环境
----------------------------------
::

  $ cd demosite
  $ python boostrap.py
  $ bin/buildout

注意：buildout前请确认bin/buildout脚本中的zc.buildout版本为1.1.1。

加入zopen.cms, zopen.frs.core开发包
--------------------------------------
#. 在buildout.cfg的[buildout]加上::

       develop = src/zopen.cms
            src/zopen.frs.core

#. 在buildout.cfg的[bfg]的eggs改为::

        eggs = repoze.bfg
            zopen.cms
            zopen.frs.core

#. 开发包加入buildout环境::

    $ bin/buildout -N

开启服务
----------------
#. 修改cms.ini中的'localhost'为本地ip(如:192.168.1.5)。

#. 然后启动指令::

    $ bin/paster serve cms.ini

浏览器访问
-----------------
http://localhost:6543 (localhost改为本地ip)

