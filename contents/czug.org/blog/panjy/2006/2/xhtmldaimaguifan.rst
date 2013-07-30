---
created: 2006-02-06 15:22:25
creator: panjy
description: 'zope页面模板(ZPT: Zope Page Template)是对xhtml的一个扩展，而xht'
title: XHTML代码规范
---
<p>zope页面模板(ZPT: Zope Page Template)是对xhtml的一个扩展，而xhtml不是简单的html扩展，而是一个格式符合xml规范的语法更加严格的html。</p>
<p>作者：阿捷 摘自：http://www.w3cn.org/article/step/2004/31.html</p>
<div class="section">
<h3><a id="id1" name="id1">所有的标记都必须要有一个相应的结束标记</a></h3>
<p>以前在HTML中，你可以打开许多标签，例如&lt;p&gt;和&lt;li&gt;而不一定写对应的&lt;/p&gt;和&lt; /li&gt;来关闭它们。
但在XHTML中这是不合法的。XHTML要求有严谨的结构，所有标签必须关闭。
如果是单独不成对的标签，在标签最后加一个 &quot;/&quot;来关闭它。例如:</p>
<pre class="literal-block">
&lt;br /&gt;
&lt;img height=&quot;80&quot; alt=&quot;网页设计师&quot; src=&quot;../images/logo_w3cn_200x80.gif&quot; width=&quot;200&quot; /&gt;
</pre>
</div>
<div class="section">
<h3><a id="id2" name="id2">所有标签的元素和属性的名字都必须使用小写</a></h3>
<p>与HTML不一样，XHTML对大小写是敏感的，&lt;title&gt;和&lt;TITLE&gt;是不同的标签。
XHTML要求所有的标签和属性的名字都必须使用小写。例如：&lt;BODY&gt;必须写成&lt;body&gt; 。
大小写夹杂也是不被认可的，通常dreamweaver自动生成的属性名字&quot;onMouseOver&quot;也必须修改成&quot;onmouseover&quot;。</p>
</div>
<div class="section">
<h3><a id="xml" name="xml">所有的XML标记都必须合理嵌套</a></h3>
<p>同样因为XHTML要求有严谨的结构，因此所有的嵌套都必须按顺序，以前我们这样写的代码:</p>
<pre class="literal-block">
&lt;p&gt;&lt;b&gt;&lt;/p&gt;/b&gt;
</pre>
<p>必须修改为:</p>
<pre class="literal-block">
&lt;p&gt;&lt;b&gt;&lt;/b&gt;/p&gt;
</pre>
<p>就是说，一层一层的嵌套必须是严格对称。</p>
</div>
<div class="section">
<h3><a id="id3" name="id3">所有的属性必须用引号&quot;&quot;括起来</a></h3>
<p>在HTML中，你可以不需要给属性值加引号，但是在XHTML中，它们必须被加引号。例如:</p>
<pre class="literal-block">
&lt;height=80&gt;
</pre>
<p>必须修改为:</p>
<pre class="literal-block">
&lt;height=&quot;80&quot;&gt;
</pre>
<p>特殊情况，你需要在属性值里使用双引号，你可以用&quot;，单引号可以使用'，例如:</p>
<pre class="literal-block">
&lt;alt=&quot;say'hello'&quot;&gt;
</pre>
</div>
<div class="section">
<h3><a id="id4" name="id4">把所有&lt;和&amp;特殊符号用编码表示</a></h3>
<ul class="simple">
<li>任何小于号（&lt;），不是标签的一部分，都必须被编码为 &amp;lt;</li>
<li>任何大于号（&gt;），不是标签的一部分，都必须被编码为 &amp;gt;</li>
<li>任何与号（&amp;），不是实体的一部分的，都必须被编码为 &amp;amp;</li>
</ul>
</div>
<div class="section">
<h3><a id="id5" name="id5">给所有属性赋一个值</a></h3>
<p>XHTML规定所有属性都必须有一个值，没有值的就重复本身。例如:</p>
<pre class="literal-block">
&lt;td nowrap&gt;
&lt;input type=&quot;checkbox&quot; name=&quot;shirt&quot; value=&quot;medium&quot; checked&gt;
</pre>
<p>必须修改为:</p>
<pre class="literal-block">
&lt;td nowrap=&quot;nowrap&quot;&gt;
&lt;input type=&quot;checkbox&quot; name=&quot;shirt&quot; value=&quot;medium&quot; checked=&quot;checked&quot;&gt;
</pre>
</div>
<div class="section">
<h3><a id="id6" name="id6">不要在注释内容中使“--”</a></h3>
<p>“--”只能发生在XHTML注释的开头和结束，也就是说，在内容中它们不再有效。例如下面的代码是无效的:</p>
<pre class="literal-block">
&lt;!--这里是注释-----------这里是注释--&gt;
</pre>
<p>用等号或者空格替换内部的虚线:</p>
<pre class="literal-block">
&lt;!--这里是注释============这里是注释--&gt;
</pre>
<p>以上这些规范有的看上去比较奇怪，但这一切都是为了使我们的代码有一个统一、唯一的标准，便于以后的数据再利用。</p>
</div>
