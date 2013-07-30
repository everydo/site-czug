---
created: 2007-02-01 11:14:48
creator: zhangbingkai
description: ''
title: IE7弹出MSXML 5.0支持的问题
---
<h1>IE7弹出MSXML 5.0支持的问题</h1>
<p>Ｐlone在IE7上显示有点问题。</p>
<p>Plone.org上Limi正好写了一篇相关的文章有介绍。
<a class="reference" href="http://plone.org/documentation/how-to/plone-ie7-updates">http://plone.org/documentation/how-to/plone-ie7-updates</a></p>
<p>我们只需要稍定制一下就可以：</p>
<p>1.页面会撑宽浏览器，导致浏览器下方有卷轴</p>
<p>解决：#portal-searchbox { overflow: hidden; }</p>
<p>2.日历每格之间有显示空隙</p>
<p>解决：.ploneCalendar { border-collapse: collapse }</p>
<p>3.如果在导航树中不使用ico,会有&quot;记号&quot;显示</p>
<p>解决：.navTreeLocal { list-style-image: none; list-style-type: none; }</p>
<p>--</p>
