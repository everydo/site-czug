---
created: 2005-12-14 14:34:32
creator: panjy
description: ''
title: 系统架构
---
:作者: Alexander Limi
:原文: <a href="http://plone.org/documentation/whatsnew/2.0/architecture">http://plone.org/documentation/whatsnew/2.0/architecture</a>
:翻译: 赵玉勇
:版本: $Revision: 1.5 $
:版权: 

.. contents:: 目录

Plone基础平台升级
=======================================

Plone 2 包含了最新版本的支撑软件，简化了系统开发工作。相关软件包括：

* Zope 2.7 
* Python 2.3 
* CMF 1.4 

采用最新版本底层软件的好处有：

* 更容易部署安装

* 更容易进行集群（clustering）与负载均衡（load-balancing）的设置

* 分布式存储

* Easier live debugging and setup of mirrored development instances。

在Windows环境下支持超过2G的文件
==============================================================================
在windows环境下，Plone 2采用最新版本的Python 2.3，使得系统支持超过2G的系统数据文件Data.fs，而不再需要将文件分隔存储了。

这使得在windows环境下，大数据量系统的设置与Linux或者Mac OS X-based环境可以一样了。

包含Archetypes
===========================================
Plone 2中包含了Archetypes。Archetypes是一个开发框架，可以很方便快速的开发自己的内容类型。Archetypes被认为是Plone最主要的强大特性之一。

Of special note is the bindings to Office and OpenOffice<a class="new" href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e6_9e_b6_e6_9e_84/createform?page=OpenOffice" title="create this page">?</a> document formats, and transformation to and from these. Ever wanted to edit your content from a word processor, and have it show up as a valid HTML page inside your content management system when you click the Save button? 

系统速度更快
===========================================
为了满足希望改善系统性能的要求，Plone 2与第三方产品SpeedPack兼容。SpeedPack可以在Debug模式下将系统性能提示100％，即使是在正常运行情况下，也可以极大改善系统性能。如果你足够勇敢，还可以尝试打开Psyco支持。

在一台低配置的机器上（比如CPU不高于500MHz) ，SpeedPack 可以为用户带来完全不同的体验。强烈推荐开发人员使用SpeedPack来改善系统开发环境的性能。

**下一节 <a href="http://members.czug.org/plone/plonebook/X_e9_92_88_e5_af_b9_e8_ae_be_e8_ae_a1_e4_ba_ba_e5_91_98_e7_9a_84_e6_94_b9_e8_bf_9b" title="" style="background-color:;">针对设计人员的改进</a> >>>**