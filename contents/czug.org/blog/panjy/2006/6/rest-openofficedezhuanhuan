<p>发现有人提供了rest-&gt;openoffice的转换代码，在这里：</p>
<p><a class="reference" href="http://artiemestieri.tn.it/~azazel/odwriter">http://artiemestieri.tn.it/~azazel/odwriter</a></p>
<p>这个产品还在pre-alpha的阶段，拿来测试了一下，感觉未来前景不错，拿来就可用，速度也不错，不需要依赖包.</p>
<p>作者使用darcs在管理源代码，在debian下连装darcs带下载使用例子如下:</p>
<pre class="literal-block">
apt-get install darcs
darcs get http://artiemestieri.tn.it/~azazel/darcs/odwrite
cd odwriter/
python rest2od.py samples/sample.rst &gt; sample.odt
</pre>
<p>使用的过程中，发现问题，稍微hack了一下utils.py中的getId函数如下:</p>
<pre class="literal-block">
def getId(node):
  &quot;&quot;&quot; Returns the id of the node, if its assigned, elsewhere returns
  None. Created to stabilize api while hiding docutils lookup
  internals.&quot;&quot;&quot;
  try:
      node_id = node['ids'][0]
  except KeyError:
      # keep compatibility with older versions of docutils which use
      # the attribute 'id'
      node_id = node['id']
  except:
      return None
  return node_id
</pre>
<p>发现存在的的主要问题是：</p>
<ol class="arabic simple">
<li>还不支持内嵌图片</li>
<li>发现默认中文的字体设置还大对, 需要生成完后手工设置下字体，否则一些汉字不会显示，看起来好像漏了字一样。</li>
</ol>
