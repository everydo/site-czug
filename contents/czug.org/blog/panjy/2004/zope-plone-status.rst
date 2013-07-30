---
created: 2006-05-11 16:12:46
creator: panjy
description: "本文是为CPUG成立第一会议发言的准备稿。zope产品和社区发展现状，社区zope2/zope3/cmf/plone/ecm项目介绍\r\
  \n"
title: Zope和Plone的发展现状
---
<div class="contents topic">
<p class="topic-title first"><a id="id1" name="id1">内容</a></p>
<ul class="simple">
<li><a class="reference" href="#zope-cmf-plone" id="id10" name="id10">什么是Zope/CMF/Plone?</a></li>
<li><a class="reference" href="#zope-plone" id="id11" name="id11">Zope/Plone的用户和案例</a></li>
<li><a class="reference" href="#id2" id="id12" name="id12">媒体和外界的评价</a></li>
<li><a class="reference" href="#id3" id="id13" name="id13">Zope/CMF/Plone的生态群</a></li>
<li><a class="reference" href="#zope" id="id14" name="id14">Zope产品线全览</a></li>
<li><a class="reference" href="#zope2" id="id15" name="id15">Zope2的发展</a></li>
<li><a class="reference" href="#id4" id="id16" name="id16">Zope：对象发布(略)</a></li>
<li><a class="reference" href="#zodb-zope" id="id17" name="id17">ZODB: zope的对象数据库(略)</a></li>
<li><a class="reference" href="#id5" id="id18" name="id18">Zope2存在的问题</a></li>
<li><a class="reference" href="#zope3-zope2" id="id19" name="id19">Zope3：对zope2的重写</a></li>
<li><a class="reference" href="#zope3" id="id20" name="id20">Zope3的一些主要技术</a></li>
<li><a class="reference" href="#zope3-web" id="id21" name="id21">Zope3的web服务器集成</a></li>
<li><a class="reference" href="#zope3-five" id="id22" name="id22">zope3/Five的一些应用和产品</a></li>
<li><a class="reference" href="#plone" id="id23" name="id23">Plone</a></li>
<li><a class="reference" href="#plone-2-2" id="id24" name="id24">Plone 2.2：更多融合</a></li>
<li><a class="reference" href="#ecm-enterprise-content-management" id="id25" name="id25">ECM: Enterprise Content Management</a></li>
<li><a class="reference" href="#ecm" id="id26" name="id26">ECM的进展</a><ul>
<li><a class="reference" href="#id6" id="id27" name="id27">内容的存储</a></li>
<li><a class="reference" href="#cpsskins" id="id28" name="id28">内容展现(CPSSkins)</a></li>
<li><a class="reference" href="#id7" id="id29" name="id29">ECM的工作流引擎</a></li>
</ul>
</li>
<li><a class="reference" href="#id8" id="id30" name="id30">结论</a></li>
<li><a class="reference" href="#id9" id="id31" name="id31">关于润普</a></li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id10" id="zope-cmf-plone" name="zope-cmf-plone">什么是Zope/CMF/Plone?</a></h3>
<ul class="simple">
<li>Zope: 基于python的web应用服务器<ul>
<li>Zope2 -&gt; Zope3</li>
<li>Zope3，实现了类似j2ee的组件架构，但更简单</li>
<li>众多的python web开发框架外的另外一个重量级选择</li>
</ul>
</li>
<li>CMF：基于Zope2的内容管理框架</li>
<li>Plone: 基于CMF的内容管理系统</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id11" id="zope-plone" name="zope-plone">Zope/Plone的用户和案例</a></h3>
<p><a class="reference" href="http://www.czug.org/resource/case/">http://www.czug.org/resource/case/</a></p>
<ul class="simple">
<li>政府：美国海军、北约、美国航空航天局、法国政府、巴西议会、英国健康服务系统、英国国防部、美国能源部门和农业部</li>
<li>非政府： 英国和美国的牛津饥荒救济委员会、 美国丙烷行业协会</li>
<li>大型(跨国)公司：Motorola、SGI、Nokia、迪斯尼、通用、美国大陆航空、德国汗莎航空、美洲银行、波士顿在线、...</li>
<li>教育：瑞典xx大学、进入哈佛的网络基础课程、</li>
<li>国内：上海航空公司、文化部、上海电信、中南民族大学、郑州海关、...</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id12" id="id2" name="id2">媒体和外界的评价</a></h3>
<ul class="simple">
<li>2002年，zope2被评为Linux jurnal最佳应用服务器</li>
<li>2003年Plone做为O'Relly首选的开源项目代表  参与了COMDEX大会</li>
<li>2004年，Plone得到CA公司的资助，成为CA公司开源战略的首批资助项目。</li>
<li>Plone被eWeek评定为2004年度10个最佳产品;</li>
<li>InformationWeek则评论Plone是一个世界级的内容管理系统.</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id13" id="id3" name="id3">Zope/CMF/Plone的生态群</a></h3>
<p>完整的商业链，类似生物链，健康发展</p>
<ul class="simple">
<li>Plone基金会、Zope基金会（正在筹备）</li>
<li>大量Zope/Plone商业服务公司: Zope / Nuxeo / Infrea / EnfoldSystem / PloneSolutions / BlueDynamics / 润普</li>
<li>杂志(ZopeMag)、书籍</li>
<li>冠群CA的支持，在Plone基金有董事席位<ul>
<li>新的CEO, 公司的重点发生变化</li>
<li>政治上决定不去开发任何的CMS/ECM系统</li>
</ul>
</li>
<li>有信念的技术个人，Shane(<a class="reference" href="http://hathawaymix.org/">http://hathawaymix.org/</a>) geoffd</li>
<li>团结、活跃、人气旺盛的社区：<ul>
<li>每年的Plone大会</li>
<li>Plone研讨会</li>
<li>开发Sprint</li>
<li>各地的Zope/Plone用户组织</li>
<li>欧洲Zope联盟</li>
</ul>
</li>
<li>开源相关组织：<ul>
<li>OSCON...</li>
<li>自由软件法律中心...</li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id14" id="zope" name="zope">Zope产品线全览</a></h3>
<ul class="simple">
<li>zope2 -&gt; (five) -&gt; zope3</li>
<li>CMF(1.5) -&gt; plone / cps / silva / <a class="reference" href="http://unioncms.org/">unioncms</a> -&gt; 跟进zope3</li>
<li>Plone：世界级的开源内容管理系统，用户友好、功能强大</li>
<li>ecm : 基于zope3的企业内容管理平台框架</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id15" id="zope2" name="zope2">Zope2的发展</a></h3>
<ul class="simple">
<li>成熟、功能完善全面、特性丰富、大量用户、大量应用、久经考验</li>
<li>没有停滞，和zope3并行发展</li>
<li>Zope 2.8<ul>
<li>MVCC</li>
<li>通过Five，开始使用大量的zope3技术</li>
</ul>
</li>
<li>Zope 2.9<ul>
<li>对Blob的支持</li>
<li>更多到zope3的过渡：权限机制的过渡</li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id16" id="id4" name="id4">Zope：对象发布(略)</a></h3>
<ul class="simple">
<li>天然支持ftp/http/webdav/xmlrpc多种发布接口</li>
<li>对象漫游（traverse）</li>
<li>获取机制</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id17" id="zodb-zope" name="zodb-zope">ZODB: zope的对象数据库(略)</a></h3>
<ul class="simple">
<li>ZODB：zope最激动人心的技术之一</li>
<li>透明数据的存取</li>
<li>支持事务</li>
<li>MVCC: 并行读写不冲突</li>
<li>支持回退undo</li>
<li>支持ZEO：实现clusting架构，平滑扩展</li>
<li>支持各种Storage，包括APE</li>
<li>对象缓存</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id18" id="id5" name="id5">Zope2存在的问题</a></h3>
<ul class="simple">
<li>入门快，但深入开发的学习曲线堵</li>
<li>大量使用继承，系统耦合性太强</li>
<li>复杂，不够pythonic，一些Python开发人员不太喜欢</li>
<li>内部的一些实现，还不够干净</li>
<li>文档更新不够</li>
<li>i18n和国际化解决不彻底</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id19" id="zope3-zope2" name="zope3-zope2">Zope3：对zope2的重写</a></h3>
<ul class="simple">
<li>保持了所有Zope2的优秀特点，解决Zope2的问题，首先针对developer</li>
<li>基于组件架构的重写</li>
<li>融合了CMF的很多思想</li>
<li>Python实验室，包括Guido van Rossum的参与</li>
<li>Zope公司力推的产品，4年艰辛开发的结晶</li>
<li>更加Pythonic，架构清晰，相互依赖少，能够被更多系统使用</li>
<li>是python版本的j2ee</li>
<li>所有开发人员的厚盼，Zope长久发展的利剑<ul>
<li>已经出炉！</li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id20" id="zope3" name="zope3">Zope3的一些主要技术</a></h3>
<ul class="simple">
<li>Interface：twisted使用Zope3的Interface机制</li>
<li>Component架构：Adapter / views</li>
<li>ZCML：zope的配置标记语言</li>
<li>schema / widget机制：model / view</li>
<li>Test框架：测试驱动的开发</li>
<li>彻底的i18n/i10n</li>
<li>ZODB和文件系统的同步</li>
<li>event 机制, 更加适合集成</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id21" id="zope3-web" name="zope3-web">Zope3的web服务器集成</a></h3>
<ul class="simple">
<li>Twisted</li>
<li>&quot;WSGI&quot;:<a class="reference" href="http://www.python.org/peps/pep-0333.html">http://www.python.org/peps/pep-0333.html</a></li>
<li>Appache/mod_python</li>
<li>jsonserver: <a class="reference" href="http://zif.hill-street.net/jsonserver">http://zif.hill-street.net/jsonserver</a></li>
<li>mail server</li>
<li>pipelines</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id22" id="zope3-five" name="zope3-five">zope3/Five的一些应用和产品</a></h3>
<div class="system-message">
<p class="system-message-title">System Message: WARNING/2 (<tt class="docutils">&lt;string&gt;</tt>, line 140)</p>
<p>Title underline too short.</p>
<pre class="literal-block">
zope3/Five的一些应用和产品
=========================
</pre>
</div>
<ul class="simple">
<li>launchpad：https://launchpad.ubuntu.com/</li>
<li>sqlos: 关系数据库和Zope的最佳，底层首页SqlObject<ul>
<li>sample Inventory Program (SIP)http://sip.houston.enfoldsystems.com/</li>
</ul>
</li>
<li>zemantic</li>
<li>zopejam(Shane Hathaway): Zope 3 configuration editor based on wxPython</li>
<li>SchoolTool</li>
<li>CPSMailAccess: 一个类似Gmail的产品</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id23" id="plone" name="plone">Plone</a></h3>
<ul class="simple">
<li>用户友好</li>
<li>几乎拥有其他商业内容管理的所有特性</li>
<li>新的Schema驱动的扩展产品开发框架:Archetypes<ul>
<li>大大简化plone扩展开发</li>
<li>成为解决zope2问题另外一个平滑突破口</li>
<li>可adapter到zope3的技术</li>
</ul>
</li>
<li>2.1:<ul>
<li>first version doesn't suck</li>
<li>全部内容基于Archetypes</li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id24" id="plone-2-2" name="plone-2-2">Plone 2.2：更多融合</a></h3>
<ul class="simple">
<li>发展策略：Evolution not Revelution，Integration not Isolation<ul>
<li>通过Five使用zope3技术，据说性能会有200-300%的提升</li>
<li>使用ECM的技术</li>
</ul>
</li>
<li>走向zope3<ul>
<li>CMFonFive: <a class="reference" href="http://codespeak.net/z3/cmfonfive/">http://codespeak.net/z3/cmfonfive/</a></li>
<li>Flon : five for plone</li>
<li>Fate: 使用Five技术的Archetypes</li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id25" id="ecm-enterprise-content-management" name="ecm-enterprise-content-management">ECM: Enterprise Content Management</a></h3>
<ul class="simple">
<li><a class="reference" href="http://www.z3lab.org/">http://www.z3lab.org/</a></li>
<li>Global platform and framework<ul>
<li>法国Nuxeo公司今年5月推动</li>
<li>得到整个开源社区热烈反响</li>
<li>准备进入Zope基金汇</li>
</ul>
</li>
<li>重点关注：<ul>
<li>文档管理</li>
<li>网站内容管理</li>
<li>协同</li>
<li>商务流程</li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id26" id="ecm" name="ecm">ECM的进展</a></h3>
<div class="section">
<h4><a class="toc-backref" href="#id27" id="id6" name="id6">内容的存储</a></h4>
<p><a class="reference" href="http://blogs.nuxeo.com/sections/blogs/fermigier/2005_06_25_jsr_170_java_content">http://blogs.nuxeo.com/sections/blogs/fermigier/2005_06_25_jsr_170_java_content</a></p>
<ul class="simple">
<li>JSR 170 标准 (Java Content Repository) Java内容仓库API<ul>
<li>apache的实现：jackrabbit, <a class="reference" href="http://incubator.apache.org/jackrabbit/">http://incubator.apache.org/jackrabbit/</a></li>
</ul>
</li>
<li>和具体的存储介质隔离(sql db / 文件系统)</li>
<li>支持版本、查询、事件、xml导入...</li>
</ul>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id28" id="cpsskins" name="cpsskins">内容展现(CPSSkins)</a></h4>
<ul class="simple">
<li>Ajaxs</li>
<li>portlet</li>
<li>XForms</li>
</ul>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id29" id="id7" name="id7">ECM的工作流引擎</a></h4>
<ul class="simple">
<li>结合过程工作流和文档工作流二者优点</li>
<li>分层架构：<ul>
<li>xpdlcore: zope3上的XPDL标准实现（已经实现）</li>
<li>zope.wfmc: zope3上的WFLMC标准兼容的流程引擎（已经实现）</li>
<li>ecmworkflow：WFMC兼容的文档为中心的ECM流程引擎</li>
</ul>
</li>
</ul>
</div>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id30" id="id8" name="id8">结论</a></h3>
<ul class="simple">
<li>zope/plone社区在商业的驱动下，正健康的发展</li>
<li>这个技术越来越得到市场的认可</li>
<li>zope2的相关项目正通过five，走向zope3</li>
<li>ecm是另一个技术激动人心的、有着良好规划的项目，但到还刚刚开始发展</li>
<li>Plone很长一段时间内仍然是主角，仍然是最产品化的产品</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id31" id="id9" name="id9">关于润普</a></h3>
<ul class="simple">
<li><a class="reference" href="http://www.zopechina.com">http://www.zopechina.com</a></li>
<li>国内Zope/Plone的主要推动公司之一</li>
<li>采用开源商业模式</li>
<li>创立czug: <a class="reference" href="http://www.czug.org">http://www.czug.org</a></li>
<li>贡献了全套的zope/plone的本地化、中文化补丁，以及相关产品</li>
<li>提供Zope/Plone技术培训服务</li>
<li>提供知识管理、文档管理、内容管理解决方案</li>
</ul>
</div>
