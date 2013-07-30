---
created: 2004-12-27 07:41:44
creator: panjy
description: apache认为client传来的webdav请求是utf-8的编码，但对中文来说实际上更多是gb编码。
title: mod_encoding：让apache的webdav支持中文文件名
---

 <p><a href="http://webdav.todo.gr.jp/download/">mod_encoding</a>是日本人做的一个产品，解决了apache针对webdav的编码支持问题。<br />
 <br />
 mod_encoding支持apache1.3和apache2，在debian上有对应的包libapache2-mod-encoding。配置参数包括：</p>
 <ul>
 <li>EncodingEngine (on|off)<br />
 编码转换引擎开关</li>
 <li>SetServerEncoding &lt;enc&gt;<br />
 设置服务器文件系统的编码</li>
 <li>AddClientEncoding &lt;agent&gt; &lt;enc&gt; [&lt;enc&gt; ...]<br />
 设置某个客户端请求代理的编码<br /></li>
 <li>DefaultClientEncoding &lt;enclist&gt;<br />
 缺省的客户端编码清单<br /></li>
 <li>NormalizeUsername (on|off)<br />
 是否规范话用户名。Windows平台上（特别是WinXP）认证的适合传递的用户名格式是"hostname\\username"，这个不标准，自动去除hostname。</li>
 </ul>
 <p>典型的配置如：</p>
 <pre>
LoadModule encoding_module modules/mod_encoding.so<br />
&lt;Location /dav&gt;
 EncodingEngine on<br />
 NormalizeUsername on
&lt;/Location&gt;
SetServerEncoding UTF-8
DefaultClientEncoding UTF-8 gb18030 big5
AddClientEncoding "Microsoft .* DAV 1.1" gb
AddClientEncoding "(Microsoft .* DAV $)" UTF-8 gb18030 big5<br />
AddClientEncoding "Microsoft .* DAV" UTF-8 gb18030 big5<br />
AddClientEncoding "(Microsoft .* DAV 1.1)" gb18030 big5
AddClientEncoding "Microsoft-WebDAV*" UTF-8 gb18030
AddClientEncoding "RMA/*" gb18030
AddClientEncoding "xdwin9x/" gb18030<br />
AddClientEncoding "cadaver/" UTF-8 gb18030<br />
AddClientEncoding "Mozilla/" gb18030
</pre>
 <p>mod_encoding对中文用户很重要，但目前几乎没有中文资料。原始网站也是日文的，也没有太多英文文档，只有去看源代码，抓出这个文档
 :-(<br />
 <br />
 写这个帖子的同时，发现了一个<a href="http://www.excite.co.jp/world/chinese/">中日文翻译工具</a>，虽然翻译出来的东东实在不怎么样。</p>
