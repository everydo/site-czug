<p>CZUG升级到Plone 2.1后，CMFBoard就歇菜了。最近才得以恢复。</p>
<p>CMFBoard的论坛位于：http://www.czug.org/forums
上面还是有很多有价值的历史帖子供参考的。</p>
<p>整个升级过程参考了tcc的升级记录：</p>
<p><a class="reference" href="http://blog.tcchou.org/Members/tcchou/zope/migrating_cmfboard_214_to_222">http://blog.tcchou.org/Members/tcchou/zope/migrating_cmfboard_214_to_222</a></p>
<p>但是我的升级过程并不完全相同，贴于下：</p>
<ol class="arabic">
<li><p class="first">使用Release-2_2的最新版本:</p>
<p><a class="reference" href="http://dev.plone.org/collective/browser/CMFBoard/branches/Release-2_2">http://dev.plone.org/collective/browser/CMFBoard/branches/Release-2_2</a></p>
</li>
<li><p class="first">在portal_quickinstall中升级一下CMFBoard产品</p>
</li>
<li><p class="first">去除Plone的ZMI根下的left_slots中CMFBoard的两个portlet</p>
</li>
<li><p class="first">如果你是使用zope 2.8, 需要转换catalog索引，需要对各个子版面逐一转换。 如对于zproducts论坛，需要访问URL：</p>
<p><a class="reference" href="http://your.site.com/forums/tech/zproducts/forum_catalog/manage_convertIndexes">http://your.site.com/forums/tech/zproducts/forum_catalog/manage_convertIndexes</a></p>
</li>
<li><p class="first">在portal_cmfboard中，执行migrate, 这时候可能出现各种报错，我遇到了2个。一个是:</p>
<pre class="literal-block">
The object unique id must be a string.
</pre>
<p>发现论坛的id居然是unicode的，导致很多问题。为ForumMessage.py的类 ForumMessage添加一个hack方法:</p>
<pre class="literal-block">
def getPhysicalPath(self):
    return tuple([str(id) for id in BaseFolder.getPhysicalPath(self)])
</pre>
<p>另外一个是:</p>
<pre class="literal-block">
IllegalHTML: Javascipt event &quot;onmouseover&quot; not allowed.
</pre>
<p>发现执行CMFBoard/utils.py的scrubHTML(bodyfinder(output))有问题，调整:</p>
<pre class="literal-block">
-  result = scrubHTML(bodyfinder(output))
+  result = bodyfinder(output)
</pre>
<p>这样，成功migrate后，一切都ok了。</p>
</li>
</ol>
