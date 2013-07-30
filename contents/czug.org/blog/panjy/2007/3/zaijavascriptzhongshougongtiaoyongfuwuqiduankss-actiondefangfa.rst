---
created: 2007-04-30 20:43:03
creator: panjy
description: kss是Plone 3.0自带的一个轻量级的ajax引擎。
title: 在javascript中手工调用服务器端kss action的方法
---
<p>kss是Plone 3.0自带的一个轻量级的ajax引擎。</p>
<p>kss的采用类似css的语法，号称是不需要任何javascript技能，就可实现酷酷的
ajax界面。</p>
<p>kss的相关文章，可在kss的老巢中查看: <a class="reference" href="http://kssproject.org/">http://kssproject.org/</a></p>
<p>kss对服务器端的调用，非常方便。但肯定，完全不需要javascript也很难。</p>
<p>这样，一个问题是，如何在javascript中调用一个服务器端的kss action呢？</p>
<p>查遍了代码，花了若干小时的测试，总算弄出来了，不敢独享。</p>
<p>kss现在还在不断发展中，plone 3.0 alpha2和beta版本的接口都有不同。</p>
<p>比如翻动日历面板，在alpha2版本中，调用方法为:</p>
<pre class="literal-block">
new kukit.sa.ServerAction('refreshCalendar',{'year':'2003','month':'10', 'portlethash':'706c6f6e652e7269676874636f6c756d6e0a636f6e746578740a2f6533300a63616c656e646172'},new kukit.op.Oper());
</pre>
<p>在beta版本中，调用的方法为:</p>
<pre class="literal-block">
new kukit.sa.ServerAction('refreshCalendar',{'aparms':{},'parms':{'year':'2003','month':'12', 'portlethash':'706c6f6e652e7269676874636f6c756d6e0a636f6e746578740a2f617364640a63616c656e646172'} })
</pre>
