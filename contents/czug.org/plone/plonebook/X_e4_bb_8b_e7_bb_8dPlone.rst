---
created: 2006-02-20 17:07:37
creator: panjy
description: Zope和Plone是什么？能做什么？为什么要选择他们？
title: 介绍Plone
---
.. Contents:: 目录


Plone是什么？
================

`Plone`__ 是一个Zope上的一个用户友好、功能强大的内容管理系统。

__ http://plone.org

.. image:: http://plone.org/logo.jpg

Plone适合用作内部网/外部网的服务器、文档发布系统、门户网站服务器和异地协同群件工具。象Plone这样的一个“万能型”的软件产品其实可以用于很多方面。和zope不同，Plone直接针对最终用户，安装即可使用。

Plone起源于2000年，凭借Zope/CMF的强大功能和社区领导人Limi及Runyan的组织能力，Plone得到迅猛的发展，被公认为最优秀的开放源代码内容管理系统。Plone的用户包括德国汉莎航空公司、美国航空航天局在内的 `众多知名客户`__ 

__ http://plone.org/about/sites

2003年Plone做为O'Relly首选的开源项目代表 `参与COMDEX大会`__ ，成为开源社区的一匹黑马。

__ http://www.czug.org/newsitems/News_Item.2004-01-18.0563172911

Plone特性
===========

安装方便 
  你可以通过一个安装程序, 轻松点击几下, 只需要几分钟, 便可在你的计算机上完成安装.

容易使用 
  Plone的开发团队中包括专职的可用性设计专家, 他们使得Plone在添加、修改和维护等操作更加易用。

国际化 
  Plone的界面翻译成了30多种语言, 而且包括包括管理多种语言内容的工具。

标准 
  Plone认真地遵循相关可用性和可访问性标准。包括美国的第508条, 以及W3C的AAA, 以及web的最好的事实标准，如XHTML和CSS.

开放源代码 
  Plone使用GNU General Public License, 和Linux相同的许可协议. 您可以使用Plone，而不需要支付任何许可费用, 并可在其上进行扩展.

服务保障
  Plone开发团队在全世界有近100个开发人员，而且有大量的专业公司提供Plone开发、支持等各种商业服务。

可扩展 
  有很多Plone的附加产品供选择，以添加新的特性和内容类型. 另外，Plone可通过web标准的解决方案和开放源代码的语言来进行脚本扩展.

技术中立 
  Plone可同绝大多数的关系数据库系统（开源的和封闭源代码的）进行接口，可在大量的平台上运行，包括linux、windows、Mac OS X, Solaris 和 BSD.

为什么选择Plone建立网站系统
========================

使用Plone构建内部和外部网站，是Plone最典型的应用。

在任何地方访问你的内容 
  你可使用普通的浏览器访问所有的信息 － Plone支持所有的浏览器，包括手机上的浏览器。这意味着你能够从世界上任何一个地方，使用web浏览器管理你的内外网。

在线编辑 
  网站直接在网站里更新，完全不需要其他的任何工具，仅仅是一个浏览器而已。

由可用性设计专家设计 
  由于对用户界面进行了精细的设计，员工无需太多的培训便可使用。Plone的目标就是能够自学习使用。

限制图片的使用 
  主要目标是减少图片的使用，这样能够集中精力到内容中去，无需多余的元素。

加强了协作 
  当编辑和发布内容的时候，你可以授权其他的参与人员进入项目，Plone也支持版本管理和多阶段的内容。

方便管理和配置 
  Plone的管理和配置直接在Web上完成，系统设置好后就根本不需要访问文件系统。这使得系统的管理非常安全：最坏的情况也就是获得了Zope实例的访问权，他们不可能得到Zope/Plone所运行的"沙箱"外的任何东西。

单点登录 
  Plone由一个中心的单点登录机制，这样用户不必分别登录到各个区域。安全性也是集中控制的，可轻松支持同公司现有的其他用户认证方式集成，不管是LDAP，活动目录(Active Directory), Novell, Windows, UNIX/Linux或者是其他的基于数据库的认证系统.

可访问性 
  在网站的设计过程中进行一些特别的考虑，能够更好的支持有视力障碍或者高级技能者都能方便的满意地使用。

鼓励拥有权 
  用户添加内容，管理人员进行管理。这使得用户编辑和添加内容的时候，让他们感到拥有权，这有利于鼓励内容的创建。反过来，这又让更多人更经常去使用内部网。

Zope - Plone的基础平台
=======================

Zope是一个开放源代码的Web应用服务器，使用他您可以方便的构建内容管理、内部网、门户网站，及其他更多的定制的web应用。

Zope是什么？
-----------

`Zope`__ （Z Object Publish Environment，Z对象发布系统），是一个企业级开放源代码Web应用服务器软件。Zope特别适合构建内容管理、内部网、门户网站，及其他更多的定制的web应用。

__ http://www.zope.org

.. image:: http://zope.org/logo.jpg

Zope是由包括 `美国zope公司`__ 在内的 `数百个商业公司`__ 以及数千个开发人员组成的的Zope技术社区 `Zope.org`__ 多年共同努力的结晶。

__ http://www.zope.com
__ http://www.zope.org/Resources/ZSP/
__ http://www.zope.org

1999年，美国Zope公司宣布其核心产品Zope为开放源代码软件。经过多年的发展，Zope已成为开放源代码软件商业模式的经典案例，Zope被誉为Web上Linux系统。zope更成为了 `美国海军、法国政府和北约组织的选择`__ 。2002年Zope更是赢得 `Linux Journal Award的企业应用服务器大奖`__ 。

__ http://www.zope.com/ZopeClientList
__ http://www.linuxjournal.com/article.php?sid=6260

2004年， `Zope3`__ 即将发布，这个版本对zope是一个革命性的版本，这一年也将是zope全面获胜的一年。

__ http://dev.zope.org/Wikis/DevSite/Projects/ComponentArchitecture/FrontPage

为什么要选择Zope？
----------------

与同类产品相比，使用Zope构建web应用花费的开支更少，但开发的速度会更快。和其他的应用服务器相比，Zope有如下特性：

免费 
  Zope是免费的，其他的应用服务器相当非常的昂贵。

完整的平台 
  Zope是一个自包含的完整平台，他自带了所有的必须的组件。您无需购买其他的软件许可证来支持Zope（如数据库系统），以运行您的应用。这同时，也使得Zope非常容易安装。许多其他的应用服务器需要其他的应用服务器支撑，这导致一旦开始开发，您需要去购买这些软件的昂贵许可证，因此他们有很多隐藏的费用。

丰富的第三方产品 
  Zope允许和鼓励第三方开发者打包和分发已有的应用。因此，Zope拥有丰富的集成服务和直接可用附加的产品(如CMF/Zope/Plone等)。这些产品绝大多数和Zope一样，是免费和开发源代码的。Zope的流行，哺育了一个很大的开发社区。其他的应用服务器没有如此广泛的第三方支持，或者缺少直接的插件方式。

平滑扩展 
  Zope的应用能使用Zope的Zope企业对象（ZEO）的Clusting技术扩展。使用ZEO，您可以在多个物理计算机上分步式地部署您的应用，而不必修改您的程序代码。很多应用服务器，并不能和设想的那样平滑扩展。

开发简单 
  Zope允许开发人员仅仅使用Web浏览器开发应用程序。IE，Mozilla，Netscape，OmniWeb，Konqueror，和Opera浏览器都能很好的显示和操作Zope的开发管理环境（ZMI）。在这个web界面下，Zope能安全地将服务器的开发任务委托到其他的开发人员。几乎没有其他的应用服务器，能提供同等的功能。

精细、可扩展的权限管理 
  Zope提供精细的、可扩展的权限框架。你可以使用已有的模块，将Zope同其他系统的认证和鉴权进行轻松集成，如LADP、WindowsNT、RADIUS等。很多其他的应用服务器，缺少对某些重要的认证和鉴权方式的支持。

协同开发 
  Zope允许开发人员有效的协作。协作的环境要求参与人员的工作不能相互干扰。Zope提供回退、版本、历史和很多其他的工具，来安全工作、避免错误。很多其他的服务器不能提供此特性。

跨平台 
  Zope能在大多数的流行服务器上运行，如：Linux、Windows NT/2000/XP、Solaris、FreeBSD、NetBSD、OpenBSD、和Mac OS X。Zope甚至能在Windows 98/ME上运行。很多应用服务器，只能在他们指定的操作系统上运行。

基于Python 
  Zope可以使用python语言扩展。Python非常容易学习，能带来快速的开发。有很多Python的开发包可供你创建您的应用。很多其他的服务器，必须使用很复杂的语言，如java，这样减慢了开发的速度。其他的应用服务器，使用不太流行的语言，这样他们很少有拿来就能用的开发包。

参考资料
=========

* `内部网的角度看Plone`__

   __ http://plone.org/pr/articles/plone-intranet

* `Plone文章清单`__

   __ http://plone.org/pr/articles

* `Plone官方站点`__ 

   __ http://plone.org

* `为什么要使用Plone？`__ 

   __ http://plone.org/development/current/projects/WhyPlone

* `Plone的客户清单`__

   __ http://plone.org/about/sites

* `Zope - an open-source application server and CMS system`__ 

   __ http://zopyx.com/Technologies/Zope

* `What Is Zope?`__ 

   __ http://zope.org/WhatIsZope

* `Zope介绍`__ 

   __ http://www.czug.org/docs/zope/zopebook/X_e4_bb_8b_e7_bb_8dZope

* `Plone - the new star under the content management systems`__ 

   __ http://zopyx.com/Technologies/Plone

