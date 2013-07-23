<p>最近在研究如何将 <a class="reference" href="http://docutils.sourceforge.net/rst.html">reStructurctedText</a> 转换为PDF格式， <a class="reference" href="http://reportlab.org">Reportlab</a> 是其中一种方法。</p>
<p><a class="reference" href="http://reportlab.org">Reportlab</a> 并不是 <a class="reference" href="http://docutils.sourceforge.net/">docutils</a> 项目推荐的最佳PDF生成方法， <a class="reference" href="http://docutils.sourceforge.net/">docutils</a> 推荐还是走 Latex 的路径。</p>
<p><a class="reference" href="http://reportlab.org">Reportlab</a> 是一个轻量级的PDF生成工具，纯Python，依赖少，性能也不错，一直是我关注的一个项目。</p>
<p>但是Reportlab对中文支持存在一些问题。 <a class="reference" href="http://blog.donews.com/limodou">limodou</a> 兄
<a class="reference" href="http://blog.donews.com/limodou/archive/2005/08/22/521202.aspx">对reportlabs中文支持有所说明</a> 。
总结一下，就是有2中支持方法:</p>
<dl class="docutils">
<dt>使用CID标准字体</dt>
<dd>速度快，输出文件小（非内嵌），但是只有1种中文字体（需要到adobe上下载CID字库）</dd>
<dt>使用TTF字体</dt>
<dd>必须内嵌字体，生成速度有影响，输出文件也比较大，但是支持很多字体</dd>
</dl>
<p>使用下来发现存在问题：</p>
<ul class="simple">
<li>中英文混合的时候，英文是全角宽度，需要单独为英文设置字体才行。</li>
<li>使用段落的时候，中文不能自动换行。Reportlabs愚蠢的使用空格判断换行。</li>
</ul>
<p>具体到reStructuredText-&gt;PDF的转换上， <a class="reference" href="http://awkly.org">dreamcatcher</a> 上也
<a class="reference" href="http://cvs.sf.net/viewcvs.py/docutils/sandbox/dreamcatcher/">有一个实现</a>
但是这个实现方法还不大成熟，不支持图片等很多特性，做出的PDF也不大美观。</p>
<p>总结下来，虽然Reportlab对中文有一定的支持，但是如果让文档轻松转换为PDF，则还很有一些工作要做。
reStructuredText-&gt;PDF，看来还是应该走LaTex之路了。</p>
