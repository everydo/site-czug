---
created: 2006-09-15 08:46:53
creator: panjy
description: 这是一个zope/cmf/plone和其他产品的中文补丁集合。仅供中文用户。
title: ZopeChinaPak
---
<a href="http://www.zope.org/Members/panjunyong/ZopeChinaPak">产品网页</a>

作者 -- <a href="http://www.zopen.cn">润普公司</a> 潘俊勇

当前版本 -- 0.3版本

什么是ZopeChinaPak

 这是一个zope/cmf/plone和其他产品的中文补丁集合。仅供中文用户。

 润普公司即将发布该产品的最新版本, 新版本将对Plone2/archetypes等进行补丁

 这个产品仅仅涉及核心产品的补丁，

特性

  **0.1版本**

  * 结构化文本支持中文

  * 让zope支持中文ID(警告：中文ID并不为zope推荐).

  * 使用了zope的'monkey patch'技术（为什么叫这个名字？），十分容易安装和升级

  **0.2版本**

  * 针对plone2.0完成

  * 自动在ZMI中设置management_page_charset属性，支持在ZMI中查看中文。

  * 使用了Plone的customisePolicy，创建Plone站点的时候，选择Default Chinese Plone即可。

  * 使用customizeMethod的标准接口，分别定义如下方法：
 
   - 修改catalog的index，Plone使用CJKSplitter进行断字，支持中文全文检索。同时修改为时间类型的索引为DataIndex。

   - 设置Plone，使得符合中文习惯

  **0.3版本** 

  下载: <a href="http://plone.org/Members/panjunyong/zopechinapak.tgz">http://plone.org/Members/panjunyong/zopechinapak.tgz</a>

  - 和Plone2.0.3的CustomPolicy接口兼容

  - windows上自动支持gb2312/gbk/gb18030/big5等编码, 无需安装其他的中文编解码模块

  **todo**

   - 解决通过ftp/web导致中文文件名乱码的问题

   - 解决Plone中，上载文件时，文件内容乱码的问题

安装要求

 - 请先安装CJKSplitter


参考: <a href="http://www.czug.org/docs/plone/plonebook/X_e5_ae_89_e8_a3_85Plone2/wikipage_view">支持中文的Plone的安装</a>

From panjy Wed Apr 14 12:39:50 +0800 2004
From: panjy
Date: Wed, 14 Apr 2004 12:39:50 +0800
Subject: utf8编码检查的算法
Message-ID: <20040415043950+0800@www.czug.org>

参考

<a href="http://mail.nl.linux.org/linux-utf8/1999-09/msg00110.html">http://mail.nl.linux.org/linux-utf8/1999-09/msg00110.html</a>
