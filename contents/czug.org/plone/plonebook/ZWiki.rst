---
created: 2005-12-14 14:34:31
creator: panjy
description: ''
title: ZWiki
---
Zope上最好的wiki，非常好的文档协同编写工具，支持邮件订阅、自动生成目录结构、可转为为其它格式文档等功能。

.. contents:: 目录

基本情况
=======

:产品主页: <a href="http://zwiki.org<a href="http://joyful.com/">>http://zwiki.org</a>
:作者信息: Joyful Systems</a>
:下载地址: <a href="http://zwiki.org">http://zwiki.org</a>
:许可方式: GNU GPL
:安装要求: Zope.2.6.1 + 

功能特性
========

* 页面的层次化，即可以显示出页面创建的级别；
* 支持可选的标记格式，如：结构化文本，新结构化文本、HTML，WikiWiki标记语言，无格式文本等；
* 页面组织结构易于调整；
* 支持内容更改自动情况记录；
* 支持邮件订阅，内容更改情况可生成邮件通知；
* 支持DTML，可开发基于Zope的Web应用；
* 可生成PDF等其它格式文档。

内容添加
========

在目的文件夹内，通过'添加新内容'菜单中，选择'Wiki页'完成添加。
 
Wiki页支持WikiWord功能。在编辑Wiki页面的情况下，被'[]'框起来的文字被称为'WikiWord<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=WikiWord" title="create this page">?</a>'。WikiWord可实现新页面自动创建和链接。如在Wiki页中有如下内容::

   [第一章 Wiki基本概念]<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=%E7%AC%AC%E4%B8%80%E7%AB%A0%20Wiki%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5" title="create this page">?</a>

则在Wiki页的查看方式下，将出现**第一章 Wiki基本概念**"?":#的样式，点击该问号链接，就进入创建新页面的编辑环境，页面的名字，就是原来的**第一章 Wiki基本概念**。

新页面的内容编辑完被保存后，原来页面的WikiWord自动被链接到新建的页面。

操作使用
========

编辑修改
  <a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a>支持结构化文本，新结构化文本、HTML，WikiWiki标记语言，无格式文本等格式。

  请阅读[结构化文本]<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=%E7%BB%93%E6%9E%84%E5%8C%96%E6%96%87%E6%9C%AC" title="create this page">?</a>、<a href="http://members.czug.org/plone/plonebook/X_e6_96_b0_e7_bb_93_e6_9e_84_e5_8c_96_e6_96_87_e6_9c_ac" title="" style="background-color:;">新结构化文本</a>了解其格式要求。

查看内容结构 
  打开'Wiki内容'页面，可显示内容结构图，查看个Wiki页之间的逻辑链接关系。

查看页面更改 
  打开'Wiki更改'页面，可查看最近一天、一周、一月、一年内甚至所有的相关页面链接更改情况。

搜索Wiki内容 
  打开'查询Wiki'页面，可在当前Wiki页面群内全文检索，如果不输入任何查询条件，则列出所有Wiki页。

查看内容更改情况 
  打开Wiki页的'历史记录'内容标签页，可以查看修改日志、并比较两次修改之间的不同；

查看相关链接情况 
  打开Wiki页的'相关链接'内容标签页，可以查看当前Wiki页被其它Wiki页链接引用的情况。

邮件设置
========

支持邮件订阅和简单的集成邮件列表，参考：<a href="http://www.zwiki.org/WikiMail">http://www.zwiki.org/WikiMail</a>

打开'订阅'链接页面，要求系统将评注内容、内容更改情况发送邮件通知自己。

- mailout: 需要在ZMI中为所在文件夹添加一个属性: mail_replyto 、 mail_from

- mailout: 需要在ZMI中设置mailin_policy，检查curl的权限


如何设置权限
===============

`原文参考`__

__ <a href="http://zwiki.org/FAQs#How%20do%20I%20restrict%20access%20to%20my%20wiki?%20Or%20just%20to%20certain%20features%20like%20editing?">http://zwiki.org/FAQs#How%20do%20I%20restrict%20access%20to%20my%20wiki?%20Or%20just%20to%20certain%20features%20like%20editing?</a>

总的来说，ZWiki的权限设置采用Zope底层的权限设置方法：在ZMI中进行设置，在Plone中，主要包括如下权限：

Zwiki: Add pages 
  allows zwiki page creation (in the ZMI or by clicking?) In Zwiki versions before 0.23 this is Add <a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a> Pages.

Zwiki: Add comments 
  shows add a comment form. In Zwiki versions before 0.23 this is Zwiki: Add comments to pages.

Zwiki: Change page types 
  shows page type option in edit form

Zwiki: Change regulations 
  if regulations are in use, allows them to be changed

Zwiki: Delete pages 
  enables the page management form, allows deletion

Zwiki: Edit pages 
  allows page editing

Zwiki: Rename pages 
  enables the page management form, allows renaming

Zwiki: Reparent pages 
  shows reparenting controls in the backlinks form and page management form

Use external editor 
  shows the external edit pencil button

FTP access 
  allows ftp access to wiki pages

WebDAV<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=WebDAV" title="create this page">?</a> access, WebDAV<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=WebDAV" title="create this page">?</a> Lock items, WebDAV<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=WebDAV" title="create this page">?</a> Unlock items 
  allows WebDAV<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=WebDAV" title="create this page">?</a> access

补丁
=======

邮件中文支持
-----------

<a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a>的邮件订阅的乱码问题已经解决

解决方法为，修改ZWiki/Mail.py，修改sendMailTo函数，调整这一部分的内容::


        # send message - XXX templatize this
        from email.Header import Header  # 新添加
        msg = """\
 From: %s
 Reply-To: %s
 To: %s
 Bcc: %s
 Subject: %s
 Message-ID: %s%s
 Content-Type: text/plain; charset=utf-8  # 新添加
 X-BeenThere<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=BeenThere" title="create this page">?</a>: %s
 X-Zwiki-Version: %s
 Precedence: bulk
 List-Id: %s <%s>
 List-Post: 
 List-Subscribe: <%s/subscribeform>
 List-Unsubscribe: <%s/subscribeform>
 List-Archive: <%s>
 List-Help: <%s>

 %s %s """ \ % (fromhdr, replytohdr, tohdr, join(filter(lambda x:strip(x)!=', recipients), , '), 
 # 下面几行有修改 
 Header(  unicode(join([strip(getattr(self.folder(),mail_subject_prefix, '')),   
 #getattr(self.folder(),title))), 
 #strip(self.id()), pagename, subject,  strip(subjectSuffix)],''), 'utf-8', 'replace'), 
 'utf-8').encode(), message_id, 

时间的补丁
----------

<a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a>的编辑时间显示不正确。解决方法（由fun提供）：

Utils.py::

 elapsed = self.getPhysicalRoot().ZopeTime<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=ZopeTime" title="create this page">?</a>() - time

改为::

 elapsed = DateTime<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=DateTime" title="create this page">?</a>(self.getPhysicalRoot().ZopeTime<a class="new" href="http://members.czug.org/plone/plonebook/ZWiki/createform?page=ZopeTime" title="create this page">?</a>().ISO()) - time



From tomzy Wed Mar 24 12:50:51 +0800 2004
From: tomzy
Date: Wed, 24 Mar 2004 12:50:51 +0800
Subject: 
Message-ID: <20040325045051+0800@www.czug.org>

可惜objectis.org不包含zwiki

From panjy Wed Mar 24 13:57:50 +0800 2004
From: panjy
Date: Wed, 24 Mar 2004 13:57:50 +0800
Subject: 好像包括的，不知道版本
Message-ID: <20040325055750+0800@www.czug.org>

objectis上的faq中有一个产品清单的，上次去看包括zwiki，你可能要安装一下。另外不知道版本，可能版本比较老的话，就不支持plone了。

另外，上次有人反馈，中文支持不好。


From caosheng Tue Nov 2 17:11:41 -0800 2004
From: caosheng
Date: Tue, 02 Nov 2004 17:11:41 -0800
Subject: <a href="http://members.czug.org/plone/plonebook/ZWiki" title="" style="background-color:;">ZWiki</a> 建議使用 0.34 版本的
Message-ID: <20041102011141-0800@nocache.czug.org>
In-Reply-To: <20040325055750+0800@www.czug.org>

此版本最穩定,介面中文化翻譯完整,中文支持度良好(補丁和編碼的設定作好的話),objectis上的是0.32,且有中文編碼侷限的問題,其reST格式的中文幾乎不支持,至於最新的0.36加了新格式支持和預覽(很醜)有些介面又變成英文了

From caosheng Tue Nov 2 17:22:49 -0800 2004
From: caosheng
Date: Tue, 02 Nov 2004 17:22:49 -0800
Subject: 配合Zope 2.70 或Zope 2.73
Message-ID: <20041102012249-0800@nocache.czug.org>

zope 2.71 2.72 有reST格式的Bug,2.73已解決