---
created: 2004-11-17 09:04:30
creator: panjy
description: WebDAV:"Web-based Distributed Authoring and Versioning". 她是一套HTTP协议的扩展，允许用户在远程协同地编辑和管理文件。
title: 认识强大的WebDAV
---

 <p><a href="http://www.webdav.org/">WebDAV</a>，从字面上翻译："基于web的分布式的著录和版本管理"，这个可不太容易理解。<br />
 <br />
 WebDAV是一个HTTP扩展协议，可做如下理解：</p>
 <ul>
 <li>
 webdav的出现，首先是在web提供了网页<b>浏览</b>的功能之后，力图提供网页<b>编辑</b>的统一接口。这是一个从读到写的变化。</li>
 <li>WebDAV管理的对象是源代码，而不是最终的网页生成结果。</li>
 <li>
 WebDAV可完全替代FTP，而且优于FTP。WebDAV是一个使用了XML技术的基于HTTP协议的扩展协议。可以利用HTTP的诸多成熟的特性，如cache、代理、鉴权、加密传输等。<br />
 由于WebDAV采用XML传输，因此应该可以避免FTP存在的一些中文问题。<br /></li>
 <li>和普通的FTP不同，WebDAV支持加锁修改，支持扩展属性（元数据），支持拷贝、移动等操作；<br /></li>
 <li>WebDAV扩展包括了版本管理(<a href="http://www.webdav.org/deltav/">DeltaV)</a>，<a href="http://subversion.tigris.org/">Subversion</a>就提供了这一接口。<br /></li>
 <li>WebDAV的扩展中，还包括针对元数据的查询接口（<a href="http://www.webdav.org/dasl/">DASL</a>）</li>
 </ul>
 <p>Zope自身提供了对WebDAV的支持，Apache也提供了<a href="http://httpd.apache.org/docs-2.0/mod/mod_dav.html">mod_dav</a>的支持模块。WebDAV的
 <a href="http://www.webdav.org/projects/">相关项目和产品</a>中，<a href="http://www.webdav.org/cadaver/">cadever</a>是一个十分优秀的Client访问工具。</p>
 <p>其他资料：</p>
 <ul>
 <li><span class="textBB"><a href="http://awkly.org">Sidnei da
 Silva</a>在<a href="http://www.zopemag.com">Zope杂志</a>中有一篇介绍<a href="http://www.zopemag.com/Issue009/Section_Articles/article_PloneWebDAV.html">在zope和plone中加强webdav的文章.</a></span></li>
 <li><span class="textBB">icoya提供的<a href="http://sprint.4teamwork.ch/Members/niels/icoyaDrive.zip/view">windows上的webdav驱动</a>，支持HTTPS</span></li>
 <li><span class="textBB">python的<a href="http://www.lyra.org/greg/python/davlib.py">davlib</a>, sidnei有一个<a href="http://awkly.org/files/ShellEx%20WebDav%20Client-0.1.tar.gz">改进版本</a>。</span></li>
 <li><span class="textBB">novell提供的windows上的<a href="http://support.novell.com/servlet/filedownload/uns/pub/ndrv41862.exe/">webdav驱动器</a><br />
 </span></li>
 </ul>
