
 <p>有了webware/php/jsp, 设置zope，为什么还需要<a href="http://www.modpython.org/">mod_python</a>？看了<a href="http://www.onlamp.com/pub/a/python/2003/10/02/mod_python.html">introducing
 mod_python</a>, 才得知她实在是一个不可忽视的利器。<br />
 <br />
 其特性概括来说有四点：</p>
 <ul>
 <li>她是Apache 的一个可加载的模块(<code>libpython</code>)，内嵌提供了Python解释器,
 因此她提供了执行在Apache进程内部执行python代码的能力.<br />
 这和CGI方式相比，速度更快；和webware等fastcgi接口相比，系统的复杂性降低，性能也提升了。<br /></li>
 <li>
 可以使用Python来处理Apache中请求的各个阶段。这样也能够支持使用Python实现过滤器(filters)和连接处理。甚至完成定制的协议开发，
 <b>使用Python轻松扩展和改变Apache</b>！<br /></li>
 <li>提供了Apache API子集的Python接口, 可以使用Python调用Apache的内部功能.
 这提供了访问Apache服务器内部信息的能力，可利用Apache服务器的诸多优点，如日志等。</li>
 <li>一套开发web应用的工具。</li>
 <li style="list-style-type: none; list-style-image: none; list-style-position: outside;">
 <ul>
 <li>Publisher,
 这个和Zope的对象“获取”机制完全类似。你几乎不需要任何的门槛，就可以用python进行web开发！<br /></li>
 <li>PSP，类似JSP、PHP的一个python动态页面语言。</li>
 <li>CGI<br /></li>
 </ul>
 </li>
 </ul>
