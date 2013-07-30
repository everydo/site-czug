---
created: 2005-03-29 16:28:24
creator: panjy
description: Zemantic是ZCatalog的一个替代。他能够存储网站的rdf数据，并支持查询。
title: 'Zemantic: 基于Zope的语义网(Semantic Web)存储和查询引擎'
---
<p>最近在巴黎的一个开发快进(Sprint)，已经让 <a class="reference" href="http://zemantic.org/">Zemantic</a> 日趋完善。从 <a class="reference" href="http://article.gmane.org/gmane.comp.web.zope.zope3/12387">0.5版本的发布报告</a> 中得知，CPS的webmail系统，已经是提供 <a class="reference" href="http://zemantic.org/">Zemantic</a> 查询引擎了。</p>
<p>和ZCatalog比较，Zemantic的有点在于：</p>
<ul class="simple">
<li>无需专门定义index，简化管理，可扩展性更强</li>
<li>基于rdf，更加标准，可以存储和搜索plone外的数据</li>
</ul>
<p>Zemantic目前还不支持通用的查询语言，只能通过API进行查询。但是这一特性正在考虑和 <a class="reference" href="http://nltk.sourceforge.net/">NLKT</a> 等集成。</p>
<p>Zemantic目前使用Zope3的技术开发，也可以通过Five，在Zope2.8上使用。</p>
