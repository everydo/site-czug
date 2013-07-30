---
created: 2006-06-01 09:13:40
creator: panjy
description: 如果说Zope 2.8是开始对Zope 3触电，那么Zope 2.10则是完全的溶入Zope 3了。
title: Zope 2.10:走向Zope 3的革命性版本
---
<p>如果说Zope 2.8是开始对Zope 3触电，那么Zope 2.10则是完全的溶入Zope 3了。</p>
<p>看看 <a class="reference" href="/http://www.zope.org/Products/Zope/2.10.0b1/CHANGES.txt">Zope 2.10 beta1 的changelog</a></p>
<p>主要的变更包括：</p>
<ul class="simple">
<li>所有实例引入了Zope 3的site.zcml</li>
<li>页面模板该为使用Zope 3的zope.pagetemplate</li>
<li>支持wsgi</li>
<li>支持Twisted</li>
<li>路径漫游traverse机制，改为使用zope 3的机制，不再需要Five进行hack了</li>
<li>增加了应该时钟服务(clock server)，可方便执行定时任务</li>
<li>事件驱动</li>
<li>支持egg</li>
<li>zope3的formlib / viewlet</li>
</ul>
<p>这个版本回答了一个问题，就是Zope 2是否会和Zope 3兼容，如何兼容？</p>
<p>Zope 2.10已经回答了我们，Zope 2会兼容Zope3，Zope3会依然保持其简洁和美丽。
Zope 2逐步吸纳Zope 3的各种技术，同时保持和老版本的兼容，成为一个特殊定制的
Zope 3发行。</p>
<p>现在的Zope 2.10已经是可以承载很多纯zope 3的应用了。
这个理想，现在已经落到了实处。</p>
<p>有人对zope 2.10这个版本名字不大满意，说应该学习 <tt class="docutils literal"><span class="pre">OS</span> <span class="pre">X</span></tt> , 名字改为
<tt class="docutils literal"><span class="pre">Zope</span> <span class="pre">X</span></tt> 之类。</p>
