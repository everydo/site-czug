---
created: 2004-09-06 14:21:33
creator: panjy
description: 继续学习Zope3，包管理、虚拟主机的设置，以及web编辑的代码到文件系统的同步
title: '学习Zope3: 安装包、虚拟主机和代码文件系统同步'
---
<b><a href="http://www.czug.org/docs/zope/zope3book/InstallPackages">安装包(Package)</a></b><br>
<br>
包（Package）就是Zope2中的Products, 换了个名字。Zope3没有明确的附加产品的概念。<br>
<p>现在包可以放到任意的python路径中了，而不必仅仅在Products目录中。Zope3通过ZCML来注册包。site.zcml是最基本的
zcml，包相关的zcml，在我的svn版本中位于package-includes下，包括metal和configure两种，首先执行metal
的zcml。<br>
</p>
<p><b><a href="http://www.czug.org/docs/zope/zope3book/VirtualHosting">虚拟主机（Virtual Hosting）</a></b><br>
</p>
Zope3在内核就支持虚拟主机，而不是象zope2那样需要添加一个virtual host
monster对象。通过apache的rewrite可以实现虚拟主机，将
http://www.example.com:80/site/hello.html映射到下面的url即可：<br>
<span class="obeylines-h"></span><br>
http://localhost:8080/site/++vh++http:www.example.com:80/site/++/hello.html<br>
<br>
不过，好像Zope3自身不能支持虚拟主机？<b><br>
<br>
</b><a href="http://www.czug.org/docs/zope/zope3book/SyncTTWCodeToFS"><b>把通过web编写的代码同步到文件系统</b><br>
</a><br>
Zope2中很多代码可在ZMI中编辑，保存到了ZODB中，Zope3也提供了这个功能。这很方便，但是缺点是很难现有的其他工具，比如版本管理、查找、差异比较等。如果能保存在文件系统中，则会方便很多。<br>
<br>
Zope3提供了一个类似于Subversion（或者cvs）的本地代码管理工具zsync，看看她的help，就发现和svn/cvs多么相似：<br>
<br>
# ./zsync help<br>
Filesystem synchronization utility for Zope 3.<br>
<br>
Command line syntax summary:<br>
<br>
zsync add [options] PATH ...<br>
zsync checkin [options] URL [TARGETDIR]<br>
zsync checkout [options] URL [TARGETDIR]<br>
zsync commit [options] [TARGET ...]<br>
zsync copy [options] SOURCE [TARGET]<br>
zsync diff [options] [TARGET ...]<br>
zsync login [options] URL<br>
zsync logout [options] URL<br>
zsync mkdir PATH ...<br>
zsync remove [options] TARGET ...<br>
zsync resolve PATH ...<br>
zsync revert PATH ...<br>
zsync status [TARGET ...]<br>
zsync update [TARGET ...]<br>
<br>
有了zsnyc，你就完全可以把ZODB中的配置、脚本等完全download到本地文件系统，编辑、修改、删除，然后再同步到ZODB中，当然也可以把她放到版本管理系统中进行版本管理。<br>
<br>
zsnyc这个功能实在值得赞叹，不过我却没有尝试成功，报了个错:( 可能毕竟还是beta版本的缘故吧。<br>
<br>
