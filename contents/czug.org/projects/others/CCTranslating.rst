---
created: 2006-09-15 08:46:59
creator: panjy
description: 支持在线的中英文翻译
title: 中英文翻译工具
---
:项目负责人: Limodou,Zoomq
:状态: 进行中

.. Contents:: 内容

通用协同翻译
--------------

需求分析
==============

- 在线大型文档翻译的有序管理和积累;

  + <a href="http://members.czug.org/projects/CCT_e9_9c_80_e6_b1_82_e5_88_86_e6_9e_90_e8_8d_89_e6_a1_88" title="" style="background-color:;">CCT需求分析草案</a> -- limodou

  + <a href="http://members.czug.org/projects/Archetypes_e7_89_88_e6_9c_ac_e5_ae_9e_e7_8e_b0" title="" style="background-color:;">Archetypes版本实现</a> -- Pan JunYong<a class="new" href="http://members.czug.org/projects/CCTranslating/createform?page=JunYong" title="create this page">?</a>

- 积累技术文档翻译的技巧和恰当词汇;


计划目标
==============

- bug修正;
- Zope 产品化改写,可以作为正式的Zope产品进行发布,安装;
- Plone 界面融合,可以成为Plone 的管理对象;
- 知识分享系统融合,未来的知识分享平台的结合准备;

 + 文本转化工具;独立或是页面结合;提供HTML,DocBook<a class="new" href="http://members.czug.org/projects/CCTranslating/createform?page=DocBook" title="create this page">?</a>,reStructured|Structured 等等流行文本格式转换!
 + 使用DocBook XML格式来记录翻译成果;
 + RSS格式记录评论,跟踪修改;
 + 可能的Atom 格式信息支持;

实现方法
==============

- 发布原型站点, .zexp 收集修改意见;
- 发布试用版本站点,实时修改;
- 提交版本管理系统,正式发布产品;

风险预计
==============

- 成熟实用以前,没有参与者;
- 没有空间提供试用站点安装;
- 没有方便的公共版本管理系统;
- 技术细节受阻,无法正常产品化;


发布内容
==============

* `最新版本的.zexp文件下载`__

__ <a href="http://www.czug.org/Members/Zoomq/zzDownload/">http://www.czug.org/Members/Zoomq/zzDownload/</a>

 - <a href="http://members.czug.org/projects/CCTranslating" title="" style="background-color:;">CCTranslating</a>-ed1    -- 20030716 Zoomq镜像版本;
 - <a href="http://members.czug.org/projects/CCTranslating" title="" style="background-color:;">CCTranslating</a>-ed2    -- 20030721 Zoomq镜像版本;

* `效果截屏-褐红高原`__

__ <a href="http://www.czug.org/Members/Zoomq/zzDownload/zSnapShot/CCT-altiplanoRed/image_view">http://www.czug.org/Members/Zoomq/zzDownload/zSnapShot/CCT-altiplanoRed/image_view</a>

* 相关代码段;
* 开发讨论精华;




参考资料
==============

+ `limodou贡献了翻译网`__

__ <a href="http://www.linuxforum.net/forum/showflat.php?Cat=&Board=python&Number=433680&page=0&view=collapsed&sb=5&o=&fpart">http://www.linuxforum.net/forum/showflat.php?Cat=&Board=python&Number=433680&page=0&view=collapsed&sb=5&o=&fpart</a>   


+ `实用的知识共享管理系统/软件/机制/引擎`__
  指导思想讨论

__ <a href="http://www.linuxforum.net/forum/showflat.php?Cat=&Board=python&Number=479181&page=0&view=collapsed&sb=5&o=31&fpart=">http://www.linuxforum.net/forum/showflat.php?Cat=&Board=python&Number=479181&page=0&view=collapsed&sb=5&o=31&fpart=</a>

+ `翻译与评论网`__
  原型站点

__ <a href="http://pyrecord.freezope.org/translation">http://pyrecord.freezope.org/translation</a>


+ `翻译与评论网站的skin功能的实现`__
  技术细节

__ <a href="http://pyrecord.freezope.org/articles/doc2003080301/show">http://pyrecord.freezope.org/articles/doc2003080301/show</a>



Discuss
--------------

From panjy Sat Mar 20 15:37:37 +0800 2004
From: panjy
Date: Sat, 20 Mar 2004 15:37:37 +0800
Subject: 翻译系统 的需求定义
Message-ID: <20040321073737+0800@www.czug.org>

- 项目题目：Common Comment Translation，中文怎么翻译？这个项目名字好像不是很确切。

- 需求：公众大型文档? 感觉定位为“文档协同翻译系统”可能更加准确，对应英文：Document Co-Translation System

- "积累技术文档翻译的技巧和恰当词汇;" 好像不是需求

From Zoomq Sat Mar 20 21:30:40 +0800 2004
From: Zoomq
Date: Sat, 20 Mar 2004 21:30:40 +0800
Subject: [Currency Collaboration Translating]<a class="new" href="http://members.czug.org/projects/CCTranslating/createform?page=Currency%20Collaboration%20Translating" title="create this page">?</a>
Message-ID: <20040321133040+0800@www.czug.org>

Common/Chinese Comment Translation
公共评注翻译系统;
因为C也同时暗示中文优先支持的,
所以一般使用[Currency Collaboration Translating]<a class="new" href="http://members.czug.org/projects/CCTranslating/createform?page=Currency%20Collaboration%20Translating" title="create this page">?</a>...为了通用一些,与Limodou 商议过的,不知可以改进否?

From panjy Sat Mar 20 23:03:33 +0800 2004
From: panjy
Date: Sat, 20 Mar 2004 23:03:33 +0800
Subject: 文档协同翻译系统
Message-ID: <20040321150333+0800@www.czug.org>

我感觉文档协同翻译系统好像更准确。

- 公共的意思，其实是想表单协同的意思，而不仅仅是公共。

- 评注是一个功能，但是系统的核心是翻译，可不必太强调。协同也可隐含评注等功能。

- 定位协同，对以后的扩展功能也不会限定，产品发展的空间更大。

希望听到大家的意见。

From Zoomq Sat Mar 20 23:25:26 +0800 2004
From: Zoomq
Date: Sat, 20 Mar 2004 23:25:26 +0800
Subject: Currency Collaboration Translating
Message-ID: <20040321152526+0800@www.czug.org>

"通用协同翻译"?!
本来Commen 就想取其通用的意思的....
只是评注,感觉的确是中心功能,应该强调的,是比Wiki 的不同之处,否则,Wiki 一样可以用来翻译协同的!

From panjy Sun Mar 21 11:23:27 +0800 2004
From: panjy
Date: Sun, 21 Mar 2004 11:23:27 +0800
Subject: 我的意见
Message-ID: <20040322032327+0800@www.czug.org>

Currency是流通、货币的意思，这个翻译可能还是不妥当。通用的翻译应该是General

我现在的一个想法是“在线协同翻译系统”，Oline Translation Collabration System, OTCS.

通用我觉得没有必要太强调。不做特殊的领域说明，系统肯定就是通用的。加不加通用二字，对系统的理解好像没有什么变化。

From panjy Tue Apr 6 20:00:17 +0800 2004
From: panjy
Date: Tue, 06 Apr 2004 20:00:17 +0800
Subject: 发现了一个好东东
Message-ID: <20040407120017+0800@www.czug.org>

w3c一个专门用于 网页评注 的标准。 `W3C's Annotea protocol`__ 。而且有很多可以用的服务器了，而且Zope上已经有一个 `ZAnnot<a class="new" href="http://members.czug.org/projects/CCTranslating/createform?page=ZAnnot" title="create this page">?</a>`__ 产品了。翻译包括评注，翻译也是一种评注。能否利用这个产品来做？

__ <a href="http://www.w3.org/2001/Annotea/">http://www.w3.org/2001/Annotea/</a>
__ <a href="http://www.zope.org/Members/Crouton/ZAnnot/">http://www.zope.org/Members/Crouton/ZAnnot/</a>

From Zoomq Tue Apr 6 21:23:26 +0800 2004
From: Zoomq
Date: Tue, 06 Apr 2004 21:23:26 +0800
Subject: 协议！！！优先！
Message-ID: <20040407132326+0800@www.czug.org>

咦咦咦！谢谢！
使用现有协议好处是大大的，可以有
`现成的client`__  
使用，而且是基于 rdfs 的XML组织方式,XSLT的解析...就是不知道中文支持如何?

__ <a href="http://www.w3.org/2001/Annotea/Projects.html">http://www.w3.org/2001/Annotea/Projects.html</a>



