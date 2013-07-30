---
created: 2006-02-20 17:24:29
creator: panjy
description: 这里介绍如何通过定制css，改变Plone的外观。网站设计人员必看。Plone是适合做外部网解决方案的。
title: 深入定制Plone外观
---
这里介绍如何通过定制css，改变Plone的外观。

.. contents:: 章节目录


CSS的功能非常强大， `css garden`__ 是展现使用css定制不同外观的最佳站点。Plone推荐使用css来更改网站的外观，设计人员几乎不需要掌握如何新的知识，便可实现对网站外观的定制。

__ <a href="http://csszengarden.com/">http://csszengarden.com/</a>


在Plone外观定制基础中，我们了解到，通过改变base_properties，可以实现最常用的网站风格定制。如果需要更进一步定制Plone的网站风格，则需要对plone的css进行定制，具体通过定制ploneCustom.css实现。


实现动态的CSS
============

Plone通过base_properties定义一组变量，在css中可以引用这些变量，实现动态的css。

plone的css不采用页面模板ZPT技术，而是采用另外一中叫做DTML的语言完成。和ZPT比较，DTML使用的时候更加简单。具体的ploneCustom.css需要采用如下固定结构::

  /* <dtml-with base_properties> */
  /* <dtml-call "REQUEST.set('portal_url', portal_url())"> */

  /* 定制区域：在这里添加定制的css内容 */

  /* </dtml-with> */

在定制区域中，使用base_properties中变量的方法为::

  &dtml-variableName; 

例如::

  myLink {
      color: &dtml-fontColor;
  }

这样，通过变量的引用，你更容易实现一致风格的界面，也更加容易维护。

Plone样式定制(CSS)
=================

ploneCustom.css的定制一般包括如下几个部分的定制。

总体结构的定制
-------------

定制网站整体结构，一般可定义背景颜色、边距、位置、边框、显隐等。通常定制如下元素：

body 
  整个网页，可定义整个网页的背景(background), 边距(margin)等。

#visual-portal-wrapper 
  网站的有效视觉区，可设置宽度(width)，和边距(margine)等。

#portal-columns 
  页面中的中间部分（三列所在的区域），可设置背景、边框等。

#visual-column-wrapper 
  中间部分的有效视觉区域，可设置背景、边框等。

#portal-column-content #content 
  页面的主内容区域，也就是中间一列，一般设置背景、边框等。

#portal-column-one 
  左边的面板列区域，一般可设置背景。

#portal-column-one .visualPadding 
  左边面板列的有效视觉区域，可设置边框等

网页首部区域定制
----------------

首部区域的内容比较多，也是最醒目和容易表现特色的地方。包括页首背景图片、logo、查询、页面标签、网站链接、个人栏、路径等元素。

#portal-top 
  整个网站首部区域，可定义边框、背景图片等。

#portal-logo 
  网站logo，图片通过定义背景实现，也可以隐藏

#portal-siteactions 
  网站的顶部标签, 可更改位置，调整对应图片

#portal-searchbox 
  查询区域

#portal-globalnav 
  页首标签

#portal-personaltools 
  个人工具栏

#portal-breadcrumbs 
  路径栏

面板区域
--------

面板区域指页面中间的左右两边的面板。面板的结构类似，可以对面板进行统一的属性设置，也可以针对具体的面板ID进行单独的设置。

.portlet h5 
  面板标题的统一设置

.portletBody 
  面板体的统一设置

#portlet-navigation-tree .portletContent 
  对导航数内容区的设置

#portlet-navigation-tree a 
  导航树链接的设置

...

网站底部区域
-----------

底部区域包括footer和colophon两部分。

#portal-footer 
  底部区域总体设置

#portal-footer a 
  底部区域链接设置

#portal-colophon 
  脚注区域，可隐藏

内容风格
--------

内容风格主要文本显示上的具体风格的设置。

h1,h2,h3 
  和设置具体的字体、边框等

a:hover 
  链接

典型网站定制案例
===============

最典型的外观定制网站是 `zetaweb.com`__ ，可以直接通过访问<a href="http://www.zetaweb.com/ploneCustom.css">http://www.zetaweb.com/ploneCustom.css</a>，得到其定制的css。

__ <a href="http://www.zetaweb.com">http://www.zetaweb.com</a>

这个网站基本没有更改plone的主模板，主要的设计均使用css完成，但外观发生了巨大的变化：

* 包括两个皮肤(<a href="http://members.czug.org/plone/plonebook/X_e5_85_ac_e5_8f_b8css" title="" style="background-color:;">公司css</a>、<a href="http://members.czug.org/plone/plonebook/X_e8_82_ae_e8_84_8fcss" title="" style="background-color:;">肮脏css</a>)，在网站上方可以点击切换

* 采用固定长度的框架，居中

* 顶部使用的背景图片

* 隐藏了“查询”、“页首标签”、“个人栏”、“路径栏”等首部元素

* 在左边面板区域增加的背景图片，定制了面板的显示

* 改变的footer区域的显示风格

* 隐藏了colophon区域

参考：

1. `CSS的简单介绍`__ 
2. `使用图片代替页首标签`__
3. `Plone2和Plone1样式名称对照表`__ 
4. `Plone2界面实践`__

__ <a href="http://www.czug.org/docs/w3c/my-css/document_view">http://www.czug.org/docs/w3c/my-css/document_view</a>
__ <a href="http://plone.org/development/teams/ui/ReplaceTabsWithImagesViaCSSNoRollovers">http://plone.org/development/teams/ui/ReplaceTabsWithImagesViaCSSNoRollovers</a>
__ <a href="http://plone.org/development/teams/ui/UINameAgeddon">http://plone.org/development/teams/ui/UINameAgeddon</a>
__ <a href="http://plone.org/development/teams/ui/ThePlone2UICookbook/wikipage_view">http://plone.org/development/teams/ui/ThePlone2UICookbook/wikipage_view</a>


From Zoomq Mon Apr 5 10:20:48 +0800 2004
From: Zoomq
Date: Mon, 05 Apr 2004 10:20:48 +0800
Subject: 肮脏css
Message-ID: <20040406022048+0800@www.czug.org>

从效果上看,是 昏沉/浑浊 的,

From hongs Sun Apr 11 23:08:57 +0800 2004
From: hongs
Date: Sun, 11 Apr 2004 23:08:57 +0800
Subject: 重要的是思想
Message-ID: <20040412150857+0800@www.czug.org>

界面完全可以更换，如果你觉得肮脏。但换肤的思想和实现的方法却是先进的。在其他语言中也尽量在实现内容和界面的分离，但成功的较少。asp.net 2.0基本实现该功能，但要等到2005年才出来。
所以，plone 还是比较好的选择。

From albert Fri Jun 11 12:47:29 +0800 2004
From: albert
Date: Fri, 11 Jun 2004 12:47:29 +0800
Subject: 
Message-ID: <20040612044729+0800@www.czug.org>

