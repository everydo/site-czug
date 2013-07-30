---
created: 2004-11-11 13:56:47
creator: panjy
description: 使用pySVN可以使用Python来使用Subversion
title: 'pySVN: subversion的Python开发包'
---

 <p><a href="http://subversion.tigris.org/">subversion</a>是一个优秀的版本控制系统，是cvs的替代产品。Zope/Plone均采用她进行源代码版本管理。<br />
 <br />
 subversion自带了一个python的开发包，但是这个开发包是使<a href="http://www.swig.org/">SWIG</a>自动生成的，对开发人员非常不友好。<br />
 <br />
 于是有了<a href="http://pysvn.tigris.org/">pySVN</a>，她支持svn客户端的全部功能， <a href="http://svn.collab.net/repos/pysvn/trunk/pysvn/Extension/Docs/pysvn_prog_ref.html">
 接口非常简单</a>，同时也提供了一个<a href="http://pysvn.tigris.org/wb_screen_1.png">python编写的图形界面</a>,
 或许limodou的NewEdit可以很方便的集成进来？<br />
 <br />
 说到版本控制，也顺便提一下目前越来越热的<a href="http://projects.edgewall.com/trac/">Trac</a>，她是一个非常好的融合了wiki、故障跟踪、版本管理的软件项目管理平台。使用Python编写，版本管理采用subversion,
 不过采用的是subversion自带的Swig-python接口。其他的数据存储在<a href="http://www.sqlite.org/">sqlite</a>中，系统采用<a href="http://clearsilver.net/">clearsliver</a>页面模板引擎编写。</p>
