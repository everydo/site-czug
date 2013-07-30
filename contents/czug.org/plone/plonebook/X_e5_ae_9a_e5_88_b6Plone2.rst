---
created: 2006-02-20 17:20:10
creator: panjy
description: 介绍对Plone系统的简单定制方法，包括页首标签、面板配置调整等。
title: 定制Plone2
---
:作者: 潘俊勇、赵玉勇
:版本: $Revision: 0.1 $
:版权: This document has been placed in the public domain.

.. contents::

Plone系统内置了很多工具，Plone所表现出来的功能，都是通过这些工具完成的。本章着重介绍了如何修改配置Plone内置工具，实现修改页首标签、面板配置等常用的定制修改。

完成这些工作，基本上都需要通过ZMI进行，不需要编写任何代码。如果对ZMI还不了解，请阅读 系统管理__ 一章中ZMI相关介绍内容。

__ /docs/plone/plonebook/Plone2_e7_b3_bb_e7_bb_9f_e7_ae_a1_e7_90_86

操作（Actions）
--------------------------------

在Plone站点中，我们可以通过页首标签、内容标签、个人工具栏中的链接等形式，执行各种操作（Action）。这些操作是在几个Plone内置工具（Tool）中定义的，如 **portal_actions** ，所以这些工具又统称为 **Actions Providers** 。我们可通过ZMI，重新设置Action属性，如修改操作的权限、标题等。

Action基本属性
~~~~~~~~~~~~~~~~~~

进入Plone ZMI，点击  **portal_actions** （如图）。

.. image:: plone_actions

可以看到每个action都有如下几个属性：

Name（名称）
  Action的名称，通常会直接显示在界面上，如页首标签的显示文字等。

Id（编号）
  是所属的Action Provider中的唯一标识。

Action（操作）
  规定了Action的执行内容，如链接、一段程序脚本等。最常用就是链接了，如页首标签所对应的操作。链接的一般写法是::

   string: $portal_url/your_link_address
  
  其中$portal_url代表了Plone站点url，我们一般修改your_link_address部分，指向站点内某个内容就可以了。
  
  这个栏目的内容需要符合tal表达式定义，可阅读 使用Zope页面模板__  **简单表达式** 一节 了解详细内容。

  __ <a href="http://www.czug.org/docs/zope/zopebook/X_e4_bd_bf_e7_94_a8_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf/wikipage_view">http://www.czug.org/docs/zope/zopebook/X_e4_bd_bf_e7_94_a8_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf/wikipage_view</a>

Condition（条件）
  规定了Action显示的限制条件，如果条件不满足，这个action将不在界面中显示。该栏目同样要求符合tal表达式定义。

Permission（权限）
  规定了允许该操作的用户权限，对那些不具有该权限的用户，这个action将不在界面中显示。

Category（类型）
   对action进行分类，不同的分类决定了action在界面中的显示位置，一般常用的有: 

   * portal_tabs：
   
     action将显示在页首标签位置，Action Provider是portal_actions。Plone缺省已经包括了Welcome、Members、News等几个页首标签action。

   * user：
   
     action将显示在个人工具栏，其Action Provider一般有portal_membership、portal_registration。如登录、注册、我的文件夹等action，都属于这个类别。

   其它类别还有folder、object、folder_buttons等。

Visible（是否可见）
  决定该action是否可见。不选中Visible复选框，是屏蔽一个action的最简单的方式。

如何定制页首标签
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

学习了解action的基本概念后，让我们尝试对Plone网站进行基本的定制修改。这里介绍如何为Plone网站增加一个页首标签，这是非常常见的一种定制。

假如我们需要为网站增加一个显示为 **文档** 的页首标签，所有网站用户都可以通过这个标签查看 **documentation** 文件夹的内容。操作步骤如下：


* 在Plone网站界面内，在根目录下创建一个id为 **documentation** 的文件夹；

* 进入ZMI，打开Plone站点根目录下的 **portal_actions**

* 滚动页面到底部，在表单中填写如下内容：

  * Name:  **文档**
  
  * Id: **documentation**

  * Action: **string:$portal_url/documentation** ，我们已经知道，这代表链接到Plone站点内的 **documentation** 文件夹

  * Condition: 保持空白

  * Permission: **View**

  * Category: **portal_tabs**

  * Visible: 选中

* 点击 **Add** 按钮

此时，就完成了添加 **文档** 页首标签的工作。

Action Providers
~~~~~~~~~~~~~~~~~~~~~~

在Plone系统中，action定义分别属于不同的Action Providers，在 'portal_actions' 的 'Action Providers' 标签页中，可以看到相关Providers清单。

Portal Membership Tool (portal_membership)
  包含了与一个系统成员用户相关的action操作，如 **我的文件夹** 、 **个人设置** 等，大部分action的显示由用户登录与否决定，其分类一般都属于 **user** 类型。

Portal actions (portal_actions)
  包含了不属于其它action providers的所有action操作定义， 大部分属于 **portal_tabs** 类型。

Portal Registration (portal_registration)
  包含了与用户注册相关的action操作定义，缺省情况下，只包含 **join(注册)** 一个action定义。

Portal Discussion (portal_discussion)
  包含了与讨论评注相关的action操作定义，缺省情况下，只包含 **reply(回复)** 一个action定义。

Portal Undo (portal_undo)
  包含了撤销操作相关的action操作定义，如 **undo** 与 ** quick undo ** ，这些action可方便用户恢复以前版本的文档内容。

Portal Syndication (portal_syndication)
  包含了与syndication相关的action操作 ......

Portal Workflow (portal_workflow)
  包含了控制工作流(workflow)状态变迁的action操作定义，如状态设置界面中 **提交** 、 **发布** 等操作。

Portal Setup (portal_properties)
  包含了设置Plone站点属性相关的action操作。


面板（Portlet）
---------------

Plone网站界面布局中，一般都包括左右两个面板区，包括日历、新闻、导航树等面板内容，通过ZMI可以灵活地配置、调整面板的显示。

如何配置面板
~~~~~~~~

进入ZMI中需要定制修改其面板属性的内容对象界面，选择"Properties"标签页，将看到该内容对象的属性列表，包括 **left_slots** 和 **right_slots** ，这里以Plone站点本身为例（如图）：

.. image:: <a href="http://plone.org/documentation/book/images/slots/slots.jpg">http://plone.org/documentation/book/images/slots/slots.jpg</a>
 
**left_slots** 是指左面板区、 **right_slots** 是指右面板区，栏目中的每一行都是一个面板文件的路径表达式，对应了一个面板程序文件，常用面板路径的写法参见。

对Plone站点面板属性的配置修改，将影响整个站点的面板显示情况。或者你也可以为每个文件夹内容单独设置其面板属性，例如 **Members** 目录就仅包含一个空的 **right_slots** 属性，这使得打开 **Members** 文件夹时，左面板与整个站点的一致、但没有右面板。

这里需要说明的时，如果某个面板相关内容没有可显示的内容，则即使这里配置了该面板，但Plone站点中也不会显示。

常用面板介绍
~~~~~~~~

日历面板
^^^^^^

程序文件: plone_portlets\calendar_slot.pt

路径表达式: here/calendar_slot/macros/calendarBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/calendar.jpg">http://plone.org/documentation/book/images/slots/calendar.jpg</a>
 
日历面板显示了具有开始、结束时间段属性的内容信息，可通过ZMI，对portal_calendar进行配置，选择显示的内容类似。

事件面板
^^^^^^

程序文件:  plone_portlets\events_slot.pt

路径表达式: here/events_slot/macros/eventsBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/events.jpg">http://plone.org/documentation/book/images/slots/events.jpg</a>

事件面板显示了即将发生的事件按排。

收藏面板
^^^^^^

程序文件:  plone_portlets\favorites_slot

路径表达式: here/favorites_slot/macros/favoritesBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/favorites.jpg">http://plone.org/documentation/book/images/slots/favorites.jpg</a>

Displays a list of the users favorites and a link to organize them. Even if you have this item in the slot list it will not show unless the user has some favorites.
面板显示了用户收藏的链接列表。

登录面板
^^^^^^

程序文件:  plone_portlets\login_slot.pt

路径表达式: here/login_slot/macros/loginBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/login.jpg">http://plone.org/documentation/book/images/slots/login.jpg</a>
 
面板显示了用户名、口令输入表单，如果用户已经登录，则该面板不再显示。

导航面板
^^^^^^

程序文件:  plone_portlets\navigation_tree_slot.pt

路径表达式:  here/navigation_tree_slot/macros/navigationBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/navigation.jpg">http://plone.org/documentation/book/images/slots/navigation.jpg</a>
 
面板显示了用户名、口令输入表单，如果用户已经登录，则该面板不再显示。

导航面板以树状结构显示了站点内的目录结构。通过ZMI中 'portal_properties/navtree_properties' 可以灵活地配置修改其显示内容。

新闻面板
^^^^^^

程序文件:  plone_portlets\news_slot.pt

路径表达式: here/news_slot/macros/newsBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/news.jpg">http://plone.org/documentation/book/images/slots/news.jpg</a>
 
Shows a list of all the recent news items, with links to them. Even if you have this item in the slot list it will not show unless some news is published.
面板按时间顺序，显示了最近发布的新闻条目。

审核面板
^^^^^^

程序文件:  plone_portlets\review_slot.pt

路径表达式:  here/review_slot.pt/macros/reviewBox

.. image:: <a href="http://plone.org/documentation/book/images/slots/review.jpg">http://plone.org/documentation/book/images/slots/review.jpg</a>

显示了需要当前用户审批的文件清单。如果有待审文件存在的话，也会将待审的文件数显示在个人工具栏中（如下图）。

.. image:: <a href="http://plone.org/documentation/book/images/slots/review_top.jpg">http://plone.org/documentation/book/images/slots/review_top.jpg</a>
 
定制面板
~~~~~~~~

使用路径表达式引入面板的功能很强大，使你可以将任何内容作为面板内容显示。例如，你已经安装了一个用于投票产品，可以通过为 'left_slots' 或 'right_slots' 属性增加路径 'here/polls/funnylaughter/frontpage_poll_view' 的方式，显示投票结果。有很多第三方产品包括了用于面板显示的程序文件，可以通过同样方式，将其内容集成到Plone站点中。

如果需要定制面板程序，需要增加一个'Page Template'程序，这需要你掌握HTML以及TAL的语法，请参考阅读 Zope页面模板__ 一章。

__ <a href="http://www.czug.org/docs/zope/zopebook/X_e4_bd_bf_e7_94_a8_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf/wikipage_view">http://www.czug.org/docs/zope/zopebook/X_e4_bd_bf_e7_94_a8_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf/wikipage_view</a>

联合发布(Syndication)
----------------------------

联合发布(Syndication)实现了通过RSS (Really Simple Syndication or Rich Site Summary)访问文件夹内容的功能。 RSS产生了文件夹内的对象清单，可以被其它新闻阅读程序直接编程利用。

Plone站点设置
~~~~~~~~~~~~

设置Plone网站支持联合发布(Syndication)的操作步骤如下：

* 进入ZMI打开 'portal_syndication' 对象，确保其包含的 'Syndication' action操作可见；

* 打开 'properties' 标签页，点击 'Enable Syndication' 按钮，设置缺省配置信息：

  * 更新周期（UpdatePeriod ）：控制更改的周期，包括小时、天、星期、月、年几个选项；

  * 更新频率（UpdateFrequency）：控制更改的频率。例如，如果你希望每两周更新因此，在上面选择“周”，在这里设置2；

  * 更新基础（UpdateBase）：这是自动更改的起始时间，因此如果你希望每周二进行更新，请确保这里是周二；

  * 最大条目数（Max Syndicated Items）：RSS产生的内容清单的最大条目数量。

文件夹联合发布设置
~~~~~~~~~~~~~~~~

完成上述设置后，Plone站点内文件夹都将增加一个 '联合发布' 内容标签。打开需要同步发布信息的文件夹，在其 '联合发布' 标签页面内，点击 '允许syndication' 按钮，将使得该文件夹支持RSS。

此时同样需要设置一些 更新周期、更新频率等参数信息，这些参数的缺省值是由 'portal_syndication' 对象中设置决定的，该文件夹内容的同步情况将按此设置进行。

参考文档
-----------

1. Plone设置__ 

2. 介绍Plone在ZMI中的核心工具__ 

3. ZMI中Plone的内幕介绍__ 

__ <a href="http://www.agmweb.ca/Files/Plone/Book/PloneBook-HTML/5">http://www.agmweb.ca/Files/Plone/Book/PloneBook-HTML/5</a>

__ <a href="http://plone.org/documentation/howto/IntroductionToPloneZMI">http://plone.org/documentation/howto/IntroductionToPloneZMI</a>

__ /docs/plone/plonebook/ZMI_e4_b8_adPlone_e7_9a_84_e5_86_85_e5_b9_95_e4_bb_8b_e7_bb_8d

