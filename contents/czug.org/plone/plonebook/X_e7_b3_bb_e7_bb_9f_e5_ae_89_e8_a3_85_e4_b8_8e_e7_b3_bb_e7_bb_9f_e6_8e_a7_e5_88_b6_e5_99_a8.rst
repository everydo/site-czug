---
created: 2005-12-14 14:34:33
creator: panjy
description: ''
title: 系统安装与系统控制器
---
:作者: pupq 
:原文: <a href="http://plone.org/documentation/whatsnew/2.0/installer">http://plone.org/documentation/whatsnew/2.0/installer</a>
:翻译: 赵玉勇
:版本: 1.0
:版权:

:作者: pupq
:原文: <a href="http://plone.org/documentation/whatsnew/2.0/installer">http://plone.org/documentation/whatsnew/2.0/installer</a>
:翻译: 赵玉勇
:版本: $Revision: 1.5 $
:版权: 

.. contents:: 目录


Epoz（编辑器）
=====================

.. image:: <a href="http://plone.org/documentation/whatsnew/2.0/epoz.png">http://plone.org/documentation/whatsnew/2.0/epoz.png</a>

Plone 2完全安装版本中自带了Epoz。Epoz是一个所见即所得（WYSIWYG）编辑器，允许用户可以在线编辑文档内容，支持IE、Mozilla/Netscape等浏览器。

欲详细了解请请阅读 `Epoz`_  一节。

.. _Epoz: <a href="http://www.czug.org/docs/plone/plonebook/EPoz">http://www.czug.org/docs/plone/plonebook/EPoz</a>

Archetypes
=====================
Plone 2中包含了Archetypes，她是一个开发框架，在Archetypes基础上，可以很容易创建新的内容类型，而不需要手工创建产品（Product）。Archetypes可以自动动态生成内容对象的编辑表单、验证逻辑处理以及显示界面等

系统控制器fow windows
=========================================

.. image:: <a href="http://plone.org/documentation/whatsnew/2.0/controller.png">http://plone.org/documentation/whatsnew/2.0/controller.png</a>

重写了Windows环境下的系统控制器，使得更加直观、也更加吸引用户。由于采用跨平台的工具包开发完成，所以Linux与Mac OS X的用户不久也将可以得到各自环境下的系统控制器工具。

去除的产品
=============================

CMFWiki<a class="new" href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e5_ae_89_e8_a3_85_e4_b8_8e_e7_b3_bb_e7_bb_9f_e6_8e_a7_e5_88_b6_e5_99_a8/createform?page=CMFWiki" title="create this page">?</a> 
  已经从Plone 2的安装程序中去除了CMFWiki，这个产品已经很久未更新了，鼓励大家使用 `<a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a>`_ ，并且ZWiki也包含一个从CMFWiki到ZWiki的迁移脚本程序。

CMFCollector<a class="new" href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e5_ae_89_e8_a3_85_e4_b8_8e_e7_b3_bb_e7_bb_9f_e6_8e_a7_e5_88_b6_e5_99_a8/createform?page=CMFCollector" title="create this page">?</a> 
  CMFCollector<a class="new" href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e5_ae_89_e8_a3_85_e4_b8_8e_e7_b3_bb_e7_bb_9f_e6_8e_a7_e5_88_b6_e5_99_a8/createform?page=CMFCollector" title="create this page">?</a>已经被移除。Plone 2还是支持CMFCollector的，但不再推荐与支持采用。

  目前已经有数个可替代CMFCollector的产品了， `PloneCollecorNG<a class="new" href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e5_ae_89_e8_a3_85_e4_b8_8e_e7_b3_bb_e7_bb_9f_e6_8e_a7_e5_88_b6_e5_99_a8/createform?page=PloneCollecorNG" title="create this page">?</a>`_ 是其中之一。这个产品是基于Archetypes的一个新版本的Collector。

.. _<a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a>: <a href="http://www.czug.org/docs/plone/plonebook/ZWiki">http://www.czug.org/docs/plone/plonebook/ZWiki</a>

.. _PloneCollecorNG<a class="new" href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e5_ae_89_e8_a3_85_e4_b8_8e_e7_b3_bb_e7_bb_9f_e6_8e_a7_e5_88_b6_e5_99_a8/createform?page=PloneCollecorNG" title="create this page">?</a>: <a href="http://www.czug.org/docs/plone/plonebook/PloneCollectorNG">http://www.czug.org/docs/plone/plonebook/PloneCollectorNG</a>


**下一节 <a href="http://members.czug.org/plone/plonebook/X_e7_b3_bb_e7_bb_9f_e6_9e_b6_e6_9e_84" title="" style="background-color:;">系统架构</a> >>>**