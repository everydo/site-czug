---
created: 2006-02-20 17:24:22
creator: panjy
description: 页面模板(Page Template)是plone中构建动态页面主要的方法。这里介绍最简单介绍。
title: 页面模板技术
---
页面模板(Page Template)是plone中构建动态页面主要的方法。这里介绍最简单介绍。

.. contents:: 章节目录

什么是网站模板？
==============

一个网站包括很多页面，但是所有页面包括一组公共的页面元素（参考下面的截图）。

为了减少重复页面的编写，方便管理，Plone使用一个页面模板（ZPT: Zope Page Template）的技术构建动态页面，实现这些公共的页面元素和页面布局框架。一旦页面模板发生改变，所有的页面均发生变化。

ZPT是基于XML的一个动态模板语言，语法简单，扩展容易。他使用了一个“宏-插槽结构”来灵活定义页面中的模板元素：通过宏来实现模板的重用，通过插槽来支持模板中的可变的内容。宏和插槽的关系，就像计算机主板和扩展槽的关系。

宏(Macro)
==============

宏是对可重用的页面元素的一个定义。通过定义宏，其他需要使用这个宏的页面，可简单的通过引用这个宏来代替重新编写宏中的页面元素。

在Plone的模板层plone_templates中，包含着所有的模板定义。一个页面模板中可包含多个宏的定义。宏的定义方法为::

  <div metal:define-macro="macroName">
     这里是宏的主体内容
  </div>

使用下面的方法，可引用定义的宏::

  <div metal:use-macro="here/ZPTName/macros/macroName" />

.. image:: <a href="http://www.zopechina.com/training/plone/res/plone-skins/res/interfaceelements.png">http://www.zopechina.com/training/plone/res/plone-skins/res/interfaceelements.png</a>

**页面元素的宏引用说明:**

1. logo区：global_logo中的portal_logo 
2. 查询框：global_searchbox中的quick_search
3. 网站标签页：global_sections中的portal_tabs
4. 个人栏：global_personalbar中的personal_bar
5. 当前位置：global_pathbar中的path_bar
6. 左边的面板列: portlets_fetcher中的left_column
7. 内容标签: global_contentviews中的content_views
8. 内容操作栏：global_contentviews中的content_actions
9. 消息区: global_statusmessage中的portal_message
10. 内容工具条：document_actions中的document_actions
11. 标题：不是宏，在document_view中实现
12. 描述：不是宏，在document_view中实现
13. 正文：不是宏，在document_view中实现
14. 署名：document_byline中的byline
15. 评注区: viewThreadsAtBottom中的discussionView
16. 右面板区：portlets_fetcher中的right_column
17. 页面底部区: footer中的portal_footer
18. 页末区: colophon中的colophon
19. 2区附近的网站链接（图中未显示）：global_siteactions中的site_actions 

通过对上述页面模板中的宏进行单独定制，可改变整个网站中对于区域的页面表现。

插槽(Slot)
==============

上面的介绍，可以了解到宏做为一个整体，可方便地实现对网站局部的定制。但是仅仅有宏，仍然无法实现对整个网站的总体框架布局的定义。

插槽定义了宏中的可变部分。在对宏进行引用的时候，仍然可以控制宏中插槽部分的显示。比如对网站主模板的调用中，仍然可以改变内容区插槽的内容，填充特有的内容。

在宏中定义插槽::

  <div metal:define-slot="slotName">
    缺省的插槽内容
  </div>

在引用宏的页面替换插槽内容::

  <div metal:fill-slot="slotName">
    你的新的插槽内容
  </div>

Plone的主模板，页面模板main_template中的宏master，定义了网站的总体框架布局；而其中也定义了如下的插槽：

- top_slot: 最上面的一个插槽，很少用到（主要用于定义是否显示绿色的编辑边框）。
- base：最开始的一个插槽，用来定义HTML中相对链接的参照基础指令base
- head_slot: 模板head区的插槽
- css_slot：用来填充css的插槽，缺省为空
- javascript_head_slot：用来填充javascript的插槽
- column_one_slot：第一列面板的插槽，缺省为一系列面板
- header：内容区头部的插槽，缺省为空
- main：内容区主体的插槽，缺省为空. (注意: 这是最主要的插槽，引用的页面必须填充这个插槽）
- sub: 内容区底部的插槽，缺省为讨论内容
- column_two_slot：第二列的插槽，缺省为一系列面板

另外，我们也可以看看一个具体的页面实例： `页面文档的查看页面document_view`__

__ <a href="http://www.zopechina.com/training/plone/res/plone-skins/demo-zpt">http://www.zopechina.com/training/plone/res/plone-skins/demo-zpt</a>

页面模板编写语法
==============

声明XML名字空间
--------------

- xmlns:tal=<a href=""http://xml.zope.org/namespaces/tal">"http://xml.zope.org/namespaces/tal</a>" 
- xmlns:metal=<a href=""http://xml.zope.org/namespaces/metal">"http://xml.zope.org/namespaces/metal</a>"

ZPT的扩展属性
--------------

1. tal:define ：定义一个变量
2. tal:condition ： 使用该元素的条件
3. tal:repeat ： 循环该元素
4. tal:content ： 设置元素的body （structure / text）
5. tal:replace ： 替换整个元素（structure / text）
6. tal:attributes ： 设置元素的属性
7. tal:omit-tag ： 去除元素的起始结束标签

ZPT的国际化支持
==============

I18N（internationalization）：国际化. 

zpt的I18N扩展属性
--------------

示例::

   <span i18n:translate=""
         i18n:domain="demo">Hello</span>
   <span i18n:translate="hello"
         i18n:domain="demo">Hello</span>
   <span i18n:translate="hello">Hello</span>
   <span i18n:attribute="title hello">Hello</span>

说明：

a) i18n:domain：设置翻译区域
b) i18n:translate：翻译元素的内容
c) i18n:attributes：翻译元素的某个属性

翻译对照文件(po文件)
-------------------

具体的翻译信息，存放在一个翻译对照文件中，翻译对照文件应该保存在系统安装的某个产品的i18n目录下。简单的方法是，保存到CMFPlone/i18n目录下。重新启动Zope，会自动起用新的翻译对照文件。

翻译对照文件，采用一个标准的po文件格式，如下::

 # 翻译元数据
 msgid ""
 msgstr "Project-Id-Version: DemoProject<a class="new" href="http://members.czug.org/plone/plonebook/X_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf_e6_8a_80_e6_9c_af/createform?page=DemoProject" title="create this page">?</a> 1.0\n"
 "POT-Creation-Date: 2003-05-09 14:05+0100\n"
 "PO-Revision-Date: 2003-05-09 14:05+0100\n"
 "Last-Translator:  Pan Jun Yong<xxx@zopechina.com>\n"
 "Language-Team: de <xxx@zopechina.com>\n"
 "MIME-Version: 1.0\n"
 "Content-Type: text/plain; charset=utf-8\n"
 "Content-Transfer-Encoding: 8bit\n"
 "Plural-Forms: nplurals=1; plural=0;\n"
 "Language-code: zh\n"
 "Language-name: Chinese\n"
 "Preferred-encodings: utf-8\n"
 "Domain: demo\n"

 # 翻译映射
 msgid "hello"
 msgstr "您好！"

 # 更多...
 msgid "Hello"
 msgstr "您好！"

参考资料
=========

1. `《使用页面模板》`__
2. `《页面模板进阶》`__
3. `《ZPT参考手册》`__
4. `《I18N语法》`__
5. `《I18N样例》`__
6. 页面实例：<a href="http://members.czug.org/plone/plonebook/X_e9_a1_b5_e9_9d_a2_e6_96_87_e6_a1_a3_e7_9a_84_e6_9f_a5_e7_9c_8b_e9_a1_b5_e9_9d_a2" title="" style="background-color:;">页面文档的查看页面</a>

__ <a href="http://www.czug.org/docs/zope/zopebook/X_e4_bd_bf_e7_94_a8_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf">http://www.czug.org/docs/zope/zopebook/X_e4_bd_bf_e7_94_a8_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf</a>
__ <a href="http://www.czug.org/docs/zope/zopebook/X_e9_ab_98_e7_ba_a7_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf">http://www.czug.org/docs/zope/zopebook/X_e9_ab_98_e7_ba_a7_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf</a>
__ <a href="http://www.czug.org/docs/zope/zopebook/Zope_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf_e5_8f_82_e8_80_83">http://www.czug.org/docs/zope/zopebook/Zope_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf_e5_8f_82_e8_80_83</a>
__ <a href="http://dev.zope.org/Wikis/DevSite/Projects/ComponentArchitecture/ZPTInternationalizationSupport">http://dev.zope.org/Wikis/DevSite/Projects/ComponentArchitecture/ZPTInternationalizationSupport</a>
__ <a href="http://dev.zope.org/Wikis/DevSite/Projects/ComponentArchitecture/ZPTInternationalizationExamples">http://dev.zope.org/Wikis/DevSite/Projects/ComponentArchitecture/ZPTInternationalizationExamples</a>


From Zoomq Fri Apr 2 00:40:59 +0800 2004
From: Zoomq
Date: Fri, 02 Apr 2004 00:40:59 +0800
Subject: 介绍最简单介绍
Message-ID: <20040402164059+0800@www.czug.org>

修正为"进行最简单的介绍"

From Zoomq Fri Apr 2 17:39:01 +0800 2004
From: Zoomq
Date: Fri, 02 Apr 2004 17:39:01 +0800
Subject: 声名XML名字空间
Message-ID: <20040403093901+0800@www.czug.org>

声明XML名字空间

From Zoomq Mon Apr 5 09:34:56 +0800 2004
From: Zoomq
Date: Mon, 05 Apr 2004 09:34:56 +0800
Subject: interfaceelements.png
Message-ID: <20040406013456+0800@www.czug.org>

使用原始站点的吧!

<a href="http://plone.org/events/conferences/1/archive/interfaceelements.png">http://plone.org/events/conferences/1/archive/interfaceelements.png</a>
