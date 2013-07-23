<p>介绍Python代码修补</p>
<div class="section">
<h3><a id="patch-diff-merge" name="patch-diff-merge">传统Patch: diff + merge</a></h3>
<p>需要修改源代码</p>
<ul class="simple">
<li>不便于安装</li>
<li>可能不兼容</li>
</ul>
</div>
<div class="section">
<h3><a id="mokey-patch" name="mokey-patch">Mokey Patch</a></h3>
<p>不需要修改源代码:</p>
<pre class="literal-block">
from SomeOtherProduct.SomeModule import SomeClass

old_speak = SomeClass.speak
def speak(self):
    return &quot;ook ook eee eee eee!&quot; + old_speak(self)

SomeClass.speak = speak
SomeClass.__old_speak = old_speak
</pre>
</div>
<div class="section">
<h3><a id="id1" name="id1">灵活的猴子</a></h3>
<p>感谢Python的动态性:</p>
<ul class="simple">
<li>Zope 2最常用的修补方法</li>
<li>非常方便安装</li>
<li>ZopeChinaPak就是系列的补丁集合</li>
</ul>
</div>
<div class="section">
<h3><a id="id2" name="id2">又爱又恨的猴子</a></h3>
<ul class="simple">
<li>修补竞争：如果2个模块同时修补1个方法？</li>
<li>解决问题更困难</li>
<li>何时退出舞台？</li>
</ul>
</div>
<div class="section">
<h3><a id="monkey" name="monkey">Monkey发展历史</a></h3>
<p>来自Zope公司：</p>
<ul>
<li><p class="first">起始： guerilla patch: 游击的，随意的</p>
</li>
<li><p class="first">误解： gorilla patch</p>
<blockquote>
<p>大猩猩, 壮而残暴的男人, &lt;俚&gt; 歹徒(尤指使用暴力者)</p>
</blockquote>
</li>
<li><p class="first">改良： monkey patch</p>
</li>
<li><p class="first">继续困惑:  Ruby / RoR</p>
</li>
</ul>
</div>
