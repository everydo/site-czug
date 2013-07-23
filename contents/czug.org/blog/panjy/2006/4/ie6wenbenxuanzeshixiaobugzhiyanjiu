<div class="section">
<h3><a id="bug" name="bug">BUG表现</a></h3>
<p>如果:</p>
<ol class="arabic">
<li><p class="first">你页面声名是xhtml的（不幸Plone默认生成的页面都是xhtml的）</p>
</li>
<li><p class="first">你的页面中的文本使用了absolute定位的div（IE对absolute定位支持不佳）:</p>
<pre class="literal-block">
position: absolute
</pre>
<p>(我的研究表明，如果 <tt class="docutils literal"><span class="pre">&lt;p&gt;</span></tt> 使用relative也会使选择失效)</p>
</li>
</ol>
<p>3. 你是使用IE6浏览器，而且操作系统是windows2000或者windowsxp（windows98
据说可幸免遇难）</p>
<p>那么：</p>
<p>你就很难正确选中文本了，要么无法选中，要么选中错位。你想复制粘贴，就没那
么容易了...</p>
</div>
<div class="section">
<h3><a id="id1" name="id1">解决方法</a></h3>
<p>对症下药，可能的解决方法包括：</p>
<ol class="arabic">
<li><p class="first">迁就微软，向低看齐，不使用xhtml，在页面头部去除下面的字样:</p>
<pre class="literal-block">
&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot;
  &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;&gt;
</pre>
</li>
<li><p class="first">不使用abolute方式的position</p>
</li>
<li><p class="first">使用javascript来hack，参看:</p>
<p><a class="reference" href="http://www.communitymx.com/blog/index.cfm?newsid=297">http://www.communitymx.com/blog/index.cfm?newsid=297</a></p>
</li>
<li><p class="first">不用IE(如果你能够说服你的所有访问者的话;-)</p>
</li>
</ol>
<p>参考讨论：</p>
<ol class="arabic simple">
<li><a class="reference" href="http://www.zen-cart.com/modules/ipb/index.php?showtopic=5927&amp;st=32">http://www.zen-cart.com/modules/ipb/index.php?showtopic=5927&amp;st=32</a></li>
<li><a class="reference" href="http://www.crystaltech.com/forum/post.asp?method=Reply&amp;TOPIC_ID=9250&amp;FORUM_ID=14">http://www.crystaltech.com/forum/post.asp?method=Reply&amp;TOPIC_ID=9250&amp;FORUM_ID=14</a></li>
</ol>
</div>
