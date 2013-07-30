---
created: 2004-10-01 07:56:41
creator: panjy
description: 做为一个文本书写格式, RestructuredText可以很好的支持中文化，特别是在zope中
title: 新结构化文本reStructuredText的国际化支持
---

 <p>自Zope2.7起，引入了对<a href="http://docutils.sf.net/">reStructuredText</a>的支持，我把她翻译为“新结构化文本”。reStructuredText是使用
 <a href="http://www.czug.org/docs/plone/plonebook/X_e6_96_b0_e7_bb_93_e6_9e_84_e5_8c_96_e6_96_87_e6_9c_ac">
 一个严谨的格式</a>，采用纯文本的方式，编写出word才能达到的结果，可转换为DocBook, pdf, odc,
 html等众多的格式。是一个很严谨的所想即所得的、可扩展的编辑格式。<br />
 <br />
 reStructuredText是 <a href="http://www.czug.org/docs/plone/plonebook/X_e7_bb_93_e6_9e_84_e5_8c_96_e6_96_87_e6_9c_ac">
 StructureText(结构化文本)</a>的一个补充，但不是代替。reStructuredText更面向出版，适合文章的编写，StructuredText则是html的代替。<br />
 <br />
 在Zope中，需要进行相关设置，才能更好的使用reStructuredText，以便支持中文，包括：</p>
 <ul>
 <li>在INSTANCE/etc/zope.conf中，设置：<br />
 rest-input-encoding utf-8<br />
 rest-output-encoding utf-8<br /></li>
 <li>在ZOPE/lib/python/docutils/languages中，添加一个zh.py, 可以拷贝en.py，更多参考<a href="http://docutils.sf.net/spec/howto/i18n.html">docutils的国际化支持</a><br /></li>
 </ul>
