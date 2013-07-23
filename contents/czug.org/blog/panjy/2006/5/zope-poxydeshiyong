<p>zope.proxy是zope3的一个包，能够实现对象的透明代理。
下面介绍主要接口（摘自 <tt class="docutils literal"><span class="pre">zope/proxy/tests/test_proxy.py</span></tt> ）。</p>
<div class="contents topic">
<p class="topic-title first"><a id="id1" name="id1">接口清单</a></p>
<ul class="simple">
<li><a class="reference" href="#zope-proxy-proxybase" id="id4" name="id4">zope.proxy.ProxyBase: 代理的基类</a><ul>
<li><a class="reference" href="#id2" id="id5" name="id5">典型使用案例</a></li>
<li><a class="reference" href="#id3" id="id6" name="id6">代理的非数据变量，不会隐藏被代理对象的属性</a></li>
<li><a class="reference" href="#override" id="id7" name="id7">禁止override</a></li>
</ul>
</li>
<li><a class="reference" href="#isproxy" id="id8" name="id8">isProxy：判断代理关系</a></li>
<li><a class="reference" href="#getproxiedobject" id="id9" name="id9">getProxiedObject: 得到被代理的对象</a></li>
<li><a class="reference" href="#proxyiterator" id="id10" name="id10">ProxyIterator: 得到所有的代理</a></li>
<li><a class="reference" href="#removeallproxies" id="id11" name="id11">removeAllProxies: 去除所有的代理层</a></li>
<li><a class="reference" href="#queryproxy-proxy" id="id12" name="id12">queryProxy: 查找一个Proxy</a></li>
<li><a class="reference" href="#queryinnerproxy-proxy-queryproxy" id="id13" name="id13">queryInnerProxy：从内外外查找Proxy，类似queryProxy</a></li>
<li><a class="reference" href="#sameproxiedobjects" id="id14" name="id14">sameProxiedObjects: 是否代理了相同的对象</a></li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id4" id="zope-proxy-proxybase" name="zope-proxy-proxybase">zope.proxy.ProxyBase: 代理的基类</a></h3>
<div class="section">
<h4><a class="toc-backref" href="#id5" id="id2" name="id2">典型使用案例</a></h4>
<p>你可建立ProxyBase的子类:</p>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase
&gt;&gt;&gt; class MyProxy(ProxyBase):
...    __slots__ = 'x', 'y'
...
...    def f(self):
...        return self.x

&gt;&gt;&gt; l = [1, 2, 3]
&gt;&gt;&gt; p = MyProxy(l)
</pre>
<p>可使用类中定义的属性，包括slots:</p>
<pre class="literal-block">
&gt;&gt;&gt; p.x = 'x'
&gt;&gt;&gt; p.x
'x'
&gt;&gt;&gt; p.f()
'x'
</pre>
<p>也可直接使用被代理对象的属性:</p>
<pre class="literal-block">
&gt;&gt;&gt; p
[1, 2, 3]
&gt;&gt;&gt; p.pop()
3
&gt;&gt;&gt; p
[1, 2]
</pre>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id6" id="id3" name="id3">代理的非数据变量，不会隐藏被代理对象的属性</a></h4>
<p>A non-data descriptor in a proxy class doesn't hide an attribute on
a proxied object or prevent writing the attribute.（下面这个例子好像不完全？）</p>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase
&gt;&gt;&gt; class ReadDescr(object):
...     def __get__(self, i, c):
...         return 'read'

&gt;&gt;&gt; class MyProxy(ProxyBase):
...    __slots__ = ()
...
...    z = ReadDescr()
...    q = ReadDescr()

&gt;&gt;&gt; class MyOb:
...    q = 1

&gt;&gt;&gt; o = MyOb()
&gt;&gt;&gt; p = MyProxy(o)
&gt;&gt;&gt; p.q
1

&gt;&gt;&gt; p.z
'read'

&gt;&gt;&gt; p.z = 1
&gt;&gt;&gt; o.z, p.z
(1, 1)
</pre>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id7" id="override" name="override">禁止override</a></h4>
<p>Normally, methods defined in proxies are overridden by
methods of proxied objects.  This applies to all non-data
descriptors.  The non_overridable function can be used to
convert a non-data descriptor to a data descriptor that disallows
writes.  This function can be used as a decorator to make functions
defined in proxy classes take precedence over functions defined
in proxied objects.:</p>
<pre class="literal-block">
&gt;&gt;&gt; class MyProxy(ProxyBase):
...    __slots__ = ()
...
...    &#64;zope.proxy.non_overridable
...    def foo(self):
...        return 'MyProxy foo'

&gt;&gt;&gt; class MyOb:
...    def foo(self):
...        return 'MyOb foo'

&gt;&gt;&gt; o = MyOb()
&gt;&gt;&gt; p = MyProxy(o)
&gt;&gt;&gt; p.foo()
'MyProxy foo'
</pre>
</div>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id8" id="isproxy" name="isproxy">isProxy：判断代理关系</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, isProxy
&gt;&gt;&gt; class P1(ProxyBase):
...     pass
&gt;&gt;&gt; class P2(ProxyBase):
...     pass
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c = C()
&gt;&gt;&gt; int(isProxy(c))
0
&gt;&gt;&gt; p = P1(c)
&gt;&gt;&gt; int(isProxy(p))
1
&gt;&gt;&gt; int(isProxy(p, P1))
1
&gt;&gt;&gt; int(isProxy(p, P2))
0
&gt;&gt;&gt; p = P2(p)
&gt;&gt;&gt; int(isProxy(p, P1))
1
&gt;&gt;&gt; int(isProxy(p, P2))
1
</pre>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id9" id="getproxiedobject" name="getproxiedobject">getProxiedObject: 得到被代理的对象</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, getProxiedObject
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c = C()
&gt;&gt;&gt; int(getProxiedObject(c) is c)
1
&gt;&gt;&gt; p = ProxyBase(c)
&gt;&gt;&gt; int(getProxiedObject(p) is c)
1
&gt;&gt;&gt; p2 = ProxyBase(p)
&gt;&gt;&gt; int(getProxiedObject(p2) is p)
1
</pre>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id10" id="proxyiterator" name="proxyiterator">ProxyIterator: 得到所有的代理</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, ProxyIterator
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c = C()
&gt;&gt;&gt; p1 = ProxyBase(c)
&gt;&gt;&gt; class P(ProxyBase):
...     pass
&gt;&gt;&gt; p2 = P(p1)
&gt;&gt;&gt; p3 = ProxyBase(p2)
&gt;&gt;&gt; list(ProxyIterator(p3)) == [p3, p2, p1, c]
1
</pre>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id11" id="removeallproxies" name="removeallproxies">removeAllProxies: 去除所有的代理层</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, removeAllProxies
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c = C()
&gt;&gt;&gt; int(removeAllProxies(c) is c)
1
&gt;&gt;&gt; p = ProxyBase(c)
&gt;&gt;&gt; int(removeAllProxies(p) is c)
1
&gt;&gt;&gt; p2 = ProxyBase(p)
&gt;&gt;&gt; int(removeAllProxies(p2) is c)
1
</pre>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id12" id="queryproxy-proxy" name="queryproxy-proxy">queryProxy: 查找一个Proxy</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, queryProxy
&gt;&gt;&gt; class P1(ProxyBase):
...    pass
&gt;&gt;&gt; class P2(ProxyBase):
...    pass
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c = C()
&gt;&gt;&gt; queryProxy(c, P1)
&gt;&gt;&gt; queryProxy(c, P1, 42)
42
&gt;&gt;&gt; p1 = P1(c)
&gt;&gt;&gt; int(queryProxy(p1, P1) is p1)
1
&gt;&gt;&gt; queryProxy(c, P2)
&gt;&gt;&gt; queryProxy(c, P2, 42)
42
&gt;&gt;&gt; p2 = P2(p1)
&gt;&gt;&gt; int(queryProxy(p2, P1) is p1)
1
&gt;&gt;&gt; int(queryProxy(p2, P2) is p2)
1
&gt;&gt;&gt; int(queryProxy(p2, ProxyBase) is p2)
1
</pre>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id13" id="queryinnerproxy-proxy-queryproxy" name="queryinnerproxy-proxy-queryproxy">queryInnerProxy：从内外外查找Proxy，类似queryProxy</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, queryProxy, queryInnerProxy
&gt;&gt;&gt; class P1(ProxyBase):
...    pass
&gt;&gt;&gt; class P2(ProxyBase):
...    pass
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c = C()
&gt;&gt;&gt; queryInnerProxy(c, P1)
&gt;&gt;&gt; queryInnerProxy(c, P1, 42)
42
&gt;&gt;&gt; p1 = P1(c)
&gt;&gt;&gt; int(queryProxy(p1, P1) is p1)
1
&gt;&gt;&gt; queryInnerProxy(c, P2)
&gt;&gt;&gt; queryInnerProxy(c, P2, 42)
42
&gt;&gt;&gt; p2 = P2(p1)
&gt;&gt;&gt; int(queryInnerProxy(p2, P1) is p1)
1
&gt;&gt;&gt; int(queryInnerProxy(p2, P2) is p2)
1
&gt;&gt;&gt; int(queryInnerProxy(p2, ProxyBase) is p1)
1

&gt;&gt;&gt; p3 = P1(p2)
&gt;&gt;&gt; int(queryProxy(p3, P1) is p3)
1
&gt;&gt;&gt; int(queryInnerProxy(p3, P1) is p1)
1
&gt;&gt;&gt; int(queryInnerProxy(p3, P2) is p2)
1
</pre>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id14" id="sameproxiedobjects" name="sameproxiedobjects">sameProxiedObjects: 是否代理了相同的对象</a></h3>
<pre class="literal-block">
&gt;&gt;&gt; from zope.proxy import ProxyBase, sameProxiedObjects
&gt;&gt;&gt; class C(object):
...     pass
&gt;&gt;&gt; c1 = C()
&gt;&gt;&gt; c2 = C()
&gt;&gt;&gt; int(sameProxiedObjects(c1, c1))
1
&gt;&gt;&gt; int(sameProxiedObjects(ProxyBase(c1), c1))
1
&gt;&gt;&gt; int(sameProxiedObjects(ProxyBase(c1), ProxyBase(c1)))
1
&gt;&gt;&gt; int(sameProxiedObjects(ProxyBase(ProxyBase(c1)), c1))
1
&gt;&gt;&gt; int(sameProxiedObjects(c1, ProxyBase(c1)))
1
&gt;&gt;&gt; int(sameProxiedObjects(c1, ProxyBase(ProxyBase(c1))))
1
&gt;&gt;&gt; int(sameProxiedObjects(c1, c2))
0
&gt;&gt;&gt; int(sameProxiedObjects(ProxyBase(c1), c2))
0
&gt;&gt;&gt; int(sameProxiedObjects(ProxyBase(c1), ProxyBase(c2)))
0
&gt;&gt;&gt; int(sameProxiedObjects(ProxyBase(ProxyBase(c1)), c2))
0
&gt;&gt;&gt; int(sameProxiedObjects(c1, ProxyBase(c2)))
0
&gt;&gt;&gt; int(sameProxiedObjects(c1, ProxyBase(ProxyBase(c2))))
0
</pre>
</div>
