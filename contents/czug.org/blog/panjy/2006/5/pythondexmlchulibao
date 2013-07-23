<p>综述一下Python的一些标准的XML处理包</p>
<p>Python自带如下标准包:</p>
<dl class="docutils">
<dt>xml.dom</dt>
<dd>采用标准的dom规范(javascript对document的访问也是采用的这个)，适合对整个文档进行自由分析和修改。
支持DOM Level 2的规范。</dd>
<dt>xml.dom.minidom</dt>
<dd>轻量级的实现，更小，支持DOM Level 1</dd>
<dt>xml.dom.pulldom</dt>
<dd>从sax模型中，抽取的一部分和dom相关的事件？</dd>
<dt>xml.parsers.expat</dt>
<dd>Expat(<a class="reference" href="http://www.libexpat.org/">http://www.libexpat.org/</a>)是一个基于Python的不做校验的报销XML解析器, 是流式的，非常快。</dd>
<dt>xml.sax</dt>
<dd>sax仅仅是用来读，而且一次只能访问文档的一部分。采用的是所谓的“事件模型”。</dd>
</dl>
<p>另外常用的XML包还包括：</p>
<dl class="docutils">
<dt>PyXML(<a class="reference" href="http://pyxml.sourceforge.net/">http://pyxml.sourceforge.net/</a>)</dt>
<dd>Python的XML SIP正在开发的一个包，将支持DOM Level 3. 包括校验等很多其他XML高级功能(但是仍然不够)。</dd>
<dt>libxml2(<a class="reference" href="http://xmlsoft.org/python.html">http://xmlsoft.org/python.html</a>)</dt>
<dd><p class="first">C语言版Libxml2(业界标准了)的一个python封装，据说速度非常快. 功能非常强，支持几乎所有的XML处理要求。
包括对Relax NG等的支持。</p>
<p class="last">但是接口不够pythonic，需要考虑内存处理，
在Windows上会出现无故挂掉的情况，不稳定。</p>
</dd>
<dt>lxml(<a class="reference" href="http://codespeak.net/lxml/">http://codespeak.net/lxml/</a>)</dt>
<dd>针对libxml2的一些问题，又一个新的对libxml2的pythonic的封装，接口很好用。他还支持Libxslt.</dd>
</dl>
