<p>在linux中，可使用zopectl在命令行中方便的调试你的
站点。</p>
<p>zopectl位于实例的bin命令中，这可是一个万能瑞士军刀。</p>
<p>管理员口令丢失了吗？这里可添加用户:</p>
<pre class="literal-block">
zopectl adduser 用户名 口令
</pre>
<p>需要交互的调试程序？很简单:</p>
<pre class="literal-block">
$ bin/zopectl debug
&gt;&gt;&gt; print app
&lt;Application Manager instance at 0xXXX&gt;
&gt;&gt;&gt;
</pre>
<p>这里的app变量，就是站点的根对象。</p>
<p>或者你有多个站点，想写一个批处理脚本去升级，免得在ZMI中烦琐手工升级？
可以写这样一个 <tt class="docutils literal"><span class="pre">demo.py</span></tt> 文件:</p>
<pre class="literal-block">
# filename: demo.py
from Testing.makerequest import makerequest
from AccessControl.SecurityManagement import newSecurityManager
from AccessControl.User import system

newSecurityManager(None,system)
app = makerequest(app)

app.frameworks.portal_catalog.manage_catalogClear()
get_transaction().note('Cleared Catalog')
get_transaction().commit()
print app.frameworks.absolute_url()
# prints http://foo/frameworks ;-)
</pre>
<p>然后让zopectl去执行:</p>
<pre class="literal-block">
$ bin/zopectl run demo.py
</pre>
<p>你还可以干更多的事情，可看看帮助:</p>
<pre class="literal-block">
$ bin/zopectl help
Documented commands (type help &lt;topic&gt;):
========================================
EOF      fg          kill       quit     run    start   test
adduser  foreground  logreopen  reload   shell  status  wait
debug    help        logtail    restart  show   stop
</pre>
<p>遗憾的是，zopectl在windows上需要一些特殊的设置。当然你可以考虑使用PloneShell:</p>
<p><a class="reference" href="http://plone.org/products/ploneshell">http://plone.org/products/ploneshell</a></p>
