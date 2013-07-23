<p>由于文件编码差异，winrar不能解压缩来自linux上的文件 :-(</p>
<p>由于硬件支持的问题，俺的本本还是在跑windows。这次需要从我们的服务器下载些文件。</p>
<p>于是 <tt class="docutils literal"><span class="pre">tar</span> <span class="pre">czf</span> <span class="pre">a.tgz</span> <span class="pre">....</span></tt> 打了个包，下载下来。</p>
<p>但是在windows上，用winrar却解压不成，因为linux上是utf8的编码，而windows只理会gb编码。</p>
<p>找了半天winrar的选项，也没发现文件名编码转换的功能，生气中...</p>
<p>但是托python的福，其实只要4行脚本就可以解决问题了:</p>
<pre class="literal-block">
&gt;&gt;&gt; import tarfile
&gt;&gt;&gt; t = tarfile.open(r'a.tgz', 'r:gz')
&gt;&gt;&gt; for i in t:
...    i.name = unicode(i.name)
...    t.extract(i)
</pre>
<p>需要注意的是：</p>
<ol class="arabic simple">
<li>我用的是python2.4</li>
<li>需要调整site.py中的默认编码： <tt class="docutils literal"><span class="pre">encoding</span> <span class="pre">=</span> <span class="pre">&quot;utf-8&quot;</span></tt></li>
</ol>
