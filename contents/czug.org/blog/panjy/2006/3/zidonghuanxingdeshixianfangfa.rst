---
created: 2006-03-16 17:53:01
creator: panjy
description: 连续的英文或数字能是容器被撑大，不能根据容器的大小自动换行，下面是 CSS如何将他们换行的方法
title: 自动换行的实现方法
---
<p>连续的英文或数字能是容器被撑大，不能根据容器的大小自动换行，下面是 CSS如何将他们换行的方法</p>
<p>来自：http://blog.tagzine.com/article.asp?id=96
（原文内容好，但组织不佳，遂整理后贴于此处，非常感谢CZUG沈崴友情告知！）</p>
<p><strong>说明</strong> ：在IE浏览器下有完善的折行处理方法，但是在FireFox下还没有能使容器内容换行的好方法，只能用overflow将多出的内容隐藏，以免影响整体效果。</p>
<div class="section">
<h3><a id="div" name="div">div中的折行处理</a></h3>
<p>对于这样的长行:</p>
<pre class="literal-block">
&lt;div id=&quot;wrap&quot;&gt;ddd1111111111111111111111111111111111&lt;/div&gt;
</pre>
<p><strong>IE浏览器</strong></p>
<p>可使用下面二者之一(前者是遵循标准):</p>
<pre class="literal-block">
#wrap{white-space:normal; width:200px;}
#wrap{word-break:break-all;width:200px;}
</pre>
<p><strong>Firefox浏览器</strong></p>
<p>Firefox下没有很好的实现方法，只能隐藏或者加滚动条，可使用下面之一:</p>
<pre class="literal-block">
#wrap{white-space:normal; width:200px; overflow:auto;}
#wrap{word-break:break-all;width:200px; overflow:auto; }
#wrap{white-space:normal; width:200px; overflow:hidden;}
#wrap{word-break:break-all;width:200px; overflow:hidden; }
</pre>
</div>
<div class="section">
<h3><a id="table" name="table">table中的折行处理</a></h3>
<p><strong>IE浏览器</strong></p>
<p>可使用使用样式table-layout:fixed:</p>
<pre class="literal-block">
&lt;style&gt;
.tb{table-layout:fixed}
&lt;/style&gt;

&lt;table class=&quot;tbl&quot; width=&quot;80&quot;&gt;
&lt;tr&gt;
&lt;td&gt;abcdefghigklmnopqrstuvwxyz 1234567890
&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
</pre>
<p>或者使用样式table-layout:fixed与nowrap:</p>
<pre class="literal-block">
&lt;style&gt;
.tb {table-layout:fixed}
&lt;/style&gt;

&lt;table class=&quot;tb&quot; width=&quot;80&quot;&gt;
&lt;tr&gt;
&lt;td nowrap&gt;abcdefghigklmnopqrstuvwxyz 1234567890
&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
</pre>
<p>在使用百分比固定td大小情况下，可使用样式table-layout:fixed与nowrap:</p>
<pre class="literal-block">
&lt;style&gt;
.tb{table-layout:fixed}
&lt;/style&gt;

&lt;table class=&quot;tb&quot; width=80&gt;
&lt;tr&gt;
&lt;td width=25% nowrap&gt;abcdefghigklmnopqrstuvwxyz 1234567890
&lt;/td&gt;
&lt;td nowrap&gt;abcdefghigklmnopqrstuvwxyz 1234567890
&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
</pre>
<p><strong>FireFox浏览器</strong></p>
<p>在使用百分比固定td大小情况下使用样式table-layout:fixed与nowrap,并且使用div:</p>
<pre class="literal-block">
&lt;style&gt;
.tb {table-layout:fixed}
.td {overflow:hidden;}
&lt;/style&gt;

&lt;table class=tb width=80&gt;
&lt;tr&gt;
&lt;td width=25% class=td nowrap&gt;
&lt;div&gt;abcdefghigklmnopqrstuvwxyz 1234567890&lt;/div&gt;
&lt;/td&gt;
&lt;td class=td nowrap&gt;
&lt;div&gt;abcdefghigklmnopqrstuvwxyz 1234567890&lt;/div&gt;
&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
</pre>
<p>这里单元格宽度一定要用百分比定义。可实现正常显示，但不能换行</p>
</div>
