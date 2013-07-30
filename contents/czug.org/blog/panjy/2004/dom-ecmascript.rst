---
created: 2004-08-21 10:24:50
creator: panjy
description: 如何实现和各个浏览器都兼容的JavaScript编程，需要掌握的标准是DOM和Ecmascript。
title: DOM和Ecmascript － 网站的行为标准
---

 <p>（应该说，我还不是一个javascript的guru，由于需要编写一些code，以下是我对这个技术的理解。）<br>
在一篇<a href="http://www.blueidea.com/tech/site/2004/1931.asp">介绍网站标准的文章</a>中，说到：

 </p>
<ul>
<li><a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">Ecmascrpt</a>
  + <a href="http://www.w3.org/DOM/">DOM</a>构成了网站的<b>行为标准</b>，也是最上层的标准；</li><li><a href="http://www.w3.org/TR/CSS2/">CSS</a>则是其<b>表现标准</b>；</li><li>而<a href="http://www.w3.org/TR/2000/REC-XML-20001006">XML</a> + <a href="http://www.w3.org/TR/xhtml1">XHTML</a>则是其最基本的<b>结构标准</b>。</li>
</ul>


 这个说法比较确切和全面，真正的web开发人员，应该掌握这三类技术。<br>
<br>
<a href="http://www.w3.org/DOM/">DOM</a>是一个：
<p>"与平台和语言无关的接口，用于程序和脚本动态访问和更改文档的内容、结构和样式. 文档能够进行更多的处理，其结果能直接返回到显示页面上."</p>
<p>
JavaScript，或者JScript，仅仅是<a href="http://www-900.ibm.com/developerWorks/cn/web/wa-emca/index.shtml">Ecmascript</a>的一种实现。Ecmascript也能够调用DOM接口。Plone中的javascript宣称支持各种浏览器，也是因为符合这两个标准。<a href="http://www.wokey.com/surf/guide/js.htm">JavaScript</a>包括了DOM外的更多对象，比如Window、Location等对象。<br>
</p>

<p>DOM分为<b> 内核</b>、<b>HTML</b>、<b>XML</b>部分。DOM被广泛的使用。<a href="http://www.w3.org/DOM/DOMTR">DOM被设计为多层</a>（目前主要用两层）：<br>
</p>
<ul>
  <li>"Level 1. 包括内核, HTML, 和XML 文档模型. 提供了文档对象导航和操作的功能. （<a href="http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/ecma-script-language-binding.html"> Ecmascript绑定(Core和html)</a>）<br>
  </li>
  <li>Level 2. 包括了样式表对象模型, 定义了操作附加到文档的样式信息的功能接口. It also enables traversals on the document, defines an event
model and provides support for XML namespaces. （Ecmascript绑定: <a href="http://www.w3.org/TR/DOM-Level-2-HTML/ecma-script-binding.html">Core</a>,<a href="http://www.w3.org/TR/DOM-Level-2-HTML/ecma-script-binding.html"> HTML</a>）<br>
  </li>
  <li>Level 3. Will address document loading and saving, as well as
content models (such as DTDs and schemas) with document validation
support. In addition, it will also address document views and
formatting, key events and event groups. First public working drafts
are available.</li>
  <li>Further Levels. These may specify some interface with the possibly
underlying window system, including some ways to prompt the user. They
may also contain a query language interface, and address multithreading
and synchronization, security, and repository."</li>
</ul><br>