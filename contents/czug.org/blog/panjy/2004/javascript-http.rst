<p><a href="http://kupu.oscom.org">kupu</a>应该是web编辑器之王了吧，他使用了<a href="http://sarissa.sourceforge.net">sarissa</a> 这个标准的ECMAScript版本的XML处理库。</p>
<p>其中应该关键类就是XMLHttpRequest，浏览器上的ECMAScript可通过他实现对服务器上脚本的调用，包括同步和异步两种调用。</p>
<p>另外，Epoz 更是采用一个<a href="www.vcdn.org/Public/XMLRPC">ECMAScript版本的xmlrpc:vcXMLRPC</a>，利用服务器来实现对html的清理的。也可以实现诸如拼写检查等复杂功能。</p>
<p>他们的底层，都是采用的<a href="http://jibbering.com/2002/4/httprequest.html">XML HTTP Request object</a>。目前，至少IE和Mozilla对这个支持已经比较成熟了。Zope3的界面上应该也是使用这个特性。</p>
<p>具体，建立xmlhttp对象的方法为:
<pre>
 var xmlhttp=false;
 /*@cc_on @*/
 /*@if (@_jscript_version &gt;= 5)
 // JScript gives us Conditional compilation, we can cope with old IE versions.
 // and security blocked creation of the objects.
  try {
   xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
   try {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   } catch (E) {
    xmlhttp = false;
   }
  }
 @end @*/
 if (!xmlhttp &amp;&amp; typeof XMLHttpRequest!='undefined') {
   xmlhttp = new XMLHttpRequest();
 }
</pre>
</p>
<p>如果要发送一个异步请求，方法为:
<pre>
 xmlhttp.open("GET", "test.txt",true);
 xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4) {
   alert(xmlhttp.responseText)
  }
 }
 xmlhttp.send(null)
</pre>
</p>
<p>当然也支持同步请求，但是一般不推荐，方法是将上面的:
<pre>
 xmlhttp.open("GET", "test.txt",true);
</pre>
</p>
<p>调整为:
<pre>
 xmlhttp.open("GET", "test.txt",false);
</pre>
</p>
<p>这里测试的GET方法，当然也可以使用HEAD、POST等其他的方法。</p>
