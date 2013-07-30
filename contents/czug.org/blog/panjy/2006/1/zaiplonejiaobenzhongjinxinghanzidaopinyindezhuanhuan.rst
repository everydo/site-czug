---
created: 2006-01-12 19:51:28
creator: panjy
description: 'Plone2.1中，如果安装了 ZopeChinaPak_ , 会发现新内容的英文代号会自动从中 '
title: 在Plone脚本中进行汉字到拼音的转换
---
<p>Plone2.1中，如果安装了 <a class="reference" href="http://www.zopechina.com/products/ZopeChinaPak">ZopeChinaPak</a> , 会发现新内容的英文代号会自动从中
文标题转换为拼音。</p>
<p>在论坛里看到有人希望将用户名按照拼音进行排序，这就需要知道这个汉字-&gt;拼音
的接口了。</p>
<p>实际上很简单，调用Plone的plone_utils工具的normalizeString方法就可以了，如:</p>
<pre class="literal-block">
context.plone_utils.normalizeString('张三')
</pre>
<p>这应该直接返回:</p>
<pre class="literal-block">
zhangsan
</pre>
