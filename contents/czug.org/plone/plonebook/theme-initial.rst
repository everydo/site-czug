---
created: 2006-02-20 17:23:44
creator: panjy
description: 如何定制个性化的皮肤，拥有一个不同外观的个性化网站
title: Plone的外观定制
---
Plone的外观定制
==============

:作者: zopezen
:翻译: 潘俊勇
:版本: $Revision: 1.5 $
:版权: 

.. contents:: 章节目录

本章将展示如何使用Plone构建个性化的网站外观。您将了解到Plone外观定制的原理、操作方法、内部结构和一些具体的实例。

基本的概念
--------

皮肤
````

皮肤是内容之上的一个视觉上的包装。他也可能包括和视觉表现直接相关的少量逻辑部分。
你安装完Plone，你就会看到一个缺省的皮肤。
这个皮肤是绝大多数用户所熟悉的，也就是您在 `plone.org`_ 和其他网站上可看到的那个。
通过编写一个新的皮肤，你能改变Plone的外观。
`zopezen.org`_ 和 `zopera.org`_ 就是两个例子，尽管他们还是有着类似的Plone外观。

.. _plone.org: <a href="http://plone.org">http://plone.org</a>
.. _zopezen.org: <a href="http://zopezen.org">http://zopezen.org</a>
.. _zopera.org: <a href="http://zopera.org">http://zopera.org</a>

但是Plone站点并不必类似。如果将一个Plone站点进行完全的定制，你甚至将很难识别出是否是Plone站点。
比如， `这里`__ 有一个Plone网站清单，他们都有一个完全不同的、个性化的定制外观。
大多数情况下，这些网站能够轻松地在多个皮肤中切换，提供给用户不同的皮肤。
很多网站在内部仍然使用Plone的标准界面，这个界面功能强大而且很灵活，他们能很方便的添加和编辑内容；
与此同时，他们提供一个完全不同的外部界面。

__ <a href="http://plone.org/about/sites">http://plone.org/about/sites</a>

皮肤是由ZMI下的 'portal_skins' 工具提供的. 在 'portal_skins' 中点击 'properties' 标签，
这将出现一组网站上可获得的皮肤. 例如有一个皮肤叫做"Plone Default"的（Plone 2只预装了这一个）。 在这个表单中你将看到这个皮肤后面有一个文本框，这个文本框包括多行，每个行是一个层。

在 'properties' 标签页上，用户能够更改显示给用户的缺省皮肤，以及是否允许用户更改他们的皮肤. 
如果用户允许刚刚自己的皮肤, 他们就能够在 '我的设置' 中，到 '我的偏好设置' 那里进行更改。

层
``

每个皮肤包括多个层。一个层是展现给用户的一组模板和脚本。组合这些层，就形成了皮肤。
通过修改这些层，用户能够轻松地从皮肤中添加或者删除一些组件。
再次以"Plone Default"皮肤为例(在ZMI中到portal_skins，点击properties标签), 
他有一系列的层："custom, ..." 等等. 这些层是这个皮肤的.

关于层，有两点很重要：

* 层的次序很重要，最上面的层将被一个对象首先检查
* 每个层都位于portal_skins的contents标签页中, 通常使用一个 'Filesystem Directory View' 或者一个 'Folder' 


改变Logo，快速的示例
------------------

阅读了上面的内容，你可能很希望能尝试更改一些东西。最常问到的问题是：“我该如何改变网站的左上角的logo？”。这是一个非常容易做的事情。

* 在ZMI中到 'portal_skins' 中，点击 'plone_images' 
* 在清单中找到logo.jpg，点击他
* 点击 'Customize' (定制)按钮
* 使用浏览表单，上载一个新的图片，点击 'Upload' ，完成上载

这样，回到你的Plone界面，这个图片已经更改了。十分简单.

改变Logo，解释
-------------

上面的例子中我们展示了如何在主页中修改logo。
之所以这样，是因为我们使用了皮肤的一个重要特性：上面讲述的层。
层最重要的特性之一是查询顺序, 在寻找一个对象时，最上面的层(清单中的第一个)首先被检查。

因此首先让我们看看皮肤"Plone Default"的各层. 第一层是"custom", 他是在"portal_skins -> custom"处可找到的custom文件夹。在这个层清单中，您还可以找到 'plone_images' 层。他是一个文件系统文件夹视图(Filesystem Directory View)，这些文件可以在Plone安装的文件系统中找到。当你点击图片(位于portal_skins -> plone_images), 你会发现没有编辑图片的标签，但是你可以定制他，下面的屏幕截图上的文字能够帮助你解释他。

.. image:: <a href="http://plone.org/documentation/book/images/skins/logo-before.jpg">http://plone.org/documentation/book/images/skins/logo-before.jpg</a>

你无法编辑这个图片，因为他位于文件系统中。在下列菜单中，给出了缺省的文件夹 'custom' 。点击 'customise' ，将在custom文件夹下得到这个图片在ZODB中的一个拷贝，并直接把这个拷贝显示给你。如果你仔细观察，你将发现图片的路径和元类型(meta type)变化了，现在你可以开始编辑这个图片.

为什么要这样做呢？因为在我们的层清单中，custom层位于plone_images层之前, 既然这个图片拷贝到了custom文件夹，现在拷贝后的这个图片首先被查找到。因此当浏览器请求logo.jpg时, 他将依次查找各层, 在custom文件夹中首先找到那个图片，他也将返回这个图片。

到此为止，还不错。现在在上面的第4步中，我们上载一个新的图片。他更改了logo.jpg，因此这个图片会在清单中首先被找到。

这就是Plone中皮肤和层的基本概念。通过更改层和在层中移动元素，你能轻松的更改和定制你的网站。你可以根据你自己的要求，进行大量或者少量的定制。

定制网站其他的内容
----------------

在深入钻研网站和页面模板定制之前，你首先应该看看样式表(Style sheet)。

样式表(Style sheet)
``````````````````

大多数Plone的风格是有样式表控制的，通过配置这些样式表，你能在根本上改变Plone。在portal_skins -> plone_styles中主要有四各样式表:

* ploneCustom.css: 是一个用于定制的空的样式表。你应该首先定制这个样式表。
* plone.css: 是最主要的样式表。他控制了网站绝大多数的设置。如果可能的话，请尽量首先去更改ploneCustom.css.
* ploneNS4.css: 用于Netscape 4的样式表。
* plonePresentation.css: 包含 Opera's演示模式的样式表
* plonePrint.css: 包括页面打印方面的代码

更进一步，有一个 'base_properties' 对象，他包含了在上面的样式表中使用的颜色、字体、大小的实际定义。定制这些属性是更改外观和感觉的一个非常简单的方法。例如，如果你定制这个对象，你可以更改主要的字体： 你可更改fontBaseSize属性，将"69%"更改为"75%"。

* logoName: logo的名字，通过更改这里的名字，也是定制logo的另外一种方法
* fontFamily：备选字体族
* fontBaseSize：基础的字体大小，控制整个Plone的字体
* fontColor：字体颜色
* fontSmallSize：小字体的大小
* backgroundColor：背景颜色
* linkColor：链接颜色
* linkActiveColor：激活链接颜色
* linkVisitedColor：访问过的链接颜色
* borderWidth：边框宽
* borderStyle：边框风格
* borderStyleAnnotations：注释的边框类型
* globalBorderColor：全局边框颜色
* globalBackgroundColor：全局背景颜色
* globalFontColor：全局字体颜色
* headingFontFamily：大标题备选字体族
* headingFontBaseSize：大标题基础大小
* contentViewBorderColor：内容上方标签的边框颜色
* contentViewBackgroundColor：内容上方标签的背景颜色
* contentViewFontColor：内容上方标签的字体颜色
* inputFontColor：输入框字体的颜色
* textTransform：文本转换方法
* evenRowBackgroundColor：偶数行的背景颜色
* oddRowBackgroundColor：奇数行的背景颜色
* notifyBorderColor：通知的边框颜色
* notifyBackgroundColor：通知的背景颜色
* discreetColor：离散区的颜色
* helpBackgroundColor：提示的背景颜色
* portalMinWidth：网站最小宽度
* columnOneWidth：左边面板的宽
* columnTwoWidth：右边面板的宽

图片
````

所有的图片包含在plone_images中.

Plone内容
`````````

和内容相关的一些模板存放在plone_content中. 这里全部是页面模板(Page Templates)。页面模板是Zope的一个主要用于HTML的模板语言, 现在Plone几乎只用这种语言. 页面模板是一个十分强大和高级的模板语言. 通过改变任意的某个模板，你能够改变内容的显示效果。

Plone模板
`````````

plone_templates中包含着在网站中可能最重要的部分：主模板、标准页首/页脚等。

事实上，定制一个新的网站的诀窍是找到你要定制的部分。这其实很容易。首先找到你调用的页面URL，如果URL最后的元素类似login_form或document_edit, 那么他们将直接和portal_skins中的对象相关. 要找到实际的对象，到portal_skins -> find，输入URL中最后的那个元素. 对于更加复杂的元素，你可能需要检查一下portal_types工具，查看调用了哪个动作（action）. 如果全部失败，请使用find或grep命令，在文件系统中的文件中进行查找。

介绍其他的层
```````````

上面介绍了plone_styles、plone_image、plone_template这几个层(也就是文件夹)，下面是Plone中另外几个层（文件夹）的含义：

cmf_legacy
 在CMF中遗留的一些python script

plone_3rdParty
 Plone对第三方产品的skin进行的定制

plone_content
 Plone缺省内容的查看和编辑ZPT页面

Plone_debug
 Plone中的debug页面

plone_ecmascript
 Plone的一些javascript

plone_form_scripts
 Plone表单处理的script（python），包括一些表单输入校验脚本

plone_scripts
 Plone其他的一些有意义的script

plone_forms
 Plone的一些表单页面

plone_portlets
 Plone的面板组件

plone_prefs
 Plone设置

Plone_wysiwyg 
 Plone对所见即所得编辑器的支持

创建一个全新的皮肤
----------------

尽管更改皮肤很好，但是，但有时你希望创建一个新的皮肤。

* 到portal_skins中添加一个新的文件夹，取名为alpha
* 接着到portal_skins -> properties中，添加一个新的皮肤：输入皮肤的名字以及层的清单，只需输入alpha即可

对于一个新的皮肤，你可能希望或者不希望添加在Plone中的元素，这由你自己决定: 看你在新的alpha后中添加他们. 这样你有了一个叫做alpha的新皮肤，把他用作alpha版本的皮肤.

网站实例
-------

使用Plone的一个例子是 `zopezen.org`_ ，ZopeZen皮肤的全部代码均可免费获得。下面是讨论这个网站如何制作完成的一组文章（3篇）. 他们对于新的Plone版本而言，虽然部分不幸有些过时，但大部分还是能够说明问题的。

* `构建ZopeZen, 第一部分`__
* `构建ZopeZen，第二部分`__
* `构建ZopeZen，第三部分`__
* `代码和皮肤`__

__ <a href="http://www.zopezen.org/Members/zopista/News_Item.2002-09-30.2355">http://www.zopezen.org/Members/zopista/News_Item.2002-09-30.2355</a>
__ <a href="http://www.zopezen.org/Members/zopista/News_Item.2002-10-02.2007">http://www.zopezen.org/Members/zopista/News_Item.2002-10-02.2007</a>
__ <a href="http://www.zopezen.org/Members/zopista/News_Item.2002-10-09.3743">http://www.zopezen.org/Members/zopista/News_Item.2002-10-09.3743</a>
__ <a href="http://sourceforge.net/project/showfiles.php?group_id=55262&release_id=113832">http://sourceforge.net/project/showfiles.php?group_id=55262&release_id=113832</a>



From Zoomq Fri Apr 2 17:36:22 +0800 2004
From: Zoomq
Date: Fri, 02 Apr 2004 17:36:22 +0800
Subject: 皮肤
Message-ID: <20040403093622+0800@www.czug.org>

最好连缀Skin 原文？毕竟中文的语感不同，一般使用 外观/样式/风格 等等来规定的..

From blueszhao Sun Apr 4 15:12:47 +0800 2004
From: blueszhao
Date: Sun, 04 Apr 2004 15:12:47 +0800
Subject: 感觉还是外观好一些
Message-ID: <20040405071247+0800@www.czug.org>

把“皮肤”翻译为“外观（skin）”的形式，大家的意见呢？

From Zoomq Sun Apr 4 18:51:01 +0800 2004
From: Zoomq
Date: Sun, 04 Apr 2004 18:51:01 +0800
Subject: 页面模板
Message-ID: <20040405105101+0800@www.czug.org>

ZPT!应该指明是Zope模板脚本,否则与其它语言实现的模板层概念冲突?
直接使用原文吧:ZPT,第一次引用使用加以说明就好,

From Zoomq Sun Apr 4 18:52:56 +0800 2004
From: Zoomq
Date: Sun, 04 Apr 2004 18:52:56 +0800
Subject: 网站实例
Message-ID: <20040405105256+0800@www.czug.org>

原始站点链接已经丢失,应该创建本地镜像,指明版本日期吧...殷切期望ing...

From panjy Sun Apr 4 19:07:47 +0800 2004
From: panjy
Date: Sun, 04 Apr 2004 19:07:47 +0800
Subject: 皮肤及页面模板
Message-ID: <20040405110747+0800@www.czug.org>

skin可以翻译为外观的。 ZPT是Zope页面模板的的意思，这个应该是应该标准说法了，应该有所说明的。

我没有听说过 “模板层” 的概念。

From blueszhao Sun Apr 4 19:08:26 +0800 2004
From: blueszhao
Date: Sun, 04 Apr 2004 19:08:26 +0800
Subject: 回复“ 网站实例 ”评注
Message-ID: <20040405110826+0800@www.czug.org>

哪个链接已经丢失？

From hongs Sun Apr 11 22:19:48 +0800 2004
From: hongs
Date: Sun, 11 Apr 2004 22:19:48 +0800
Subject: 还是"皮肤"好
Message-ID: <20040412141948+0800@www.czug.org>

外观这个词太笼统了。皮肤更好的理解，而且可以直接想到skin这个外文单词。
