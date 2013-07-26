逐步开始把<a href="http://www.czug.org/docs/zope/zope3book">Zope3宝典</a>放到了CZUG.org上，并开始阅读和实践。刚刚看完下面的几个部分：<br>
<ul>
  <li><a href="http://www.czug.org/docs/zope/zope3book/Preface" title="" style="">Preface</a>: 绪言<br>
说了Zope的一些用途：首先是内容管理，再就是web应用服务，也可以用做非web的应用！对Zope历史的说明也比较有趣。<br>
  </li>
  <li>安装Zope 3 <a href="../../../../../../../../../../../../../../docs/zope/zope3book/InstallZope3" title="" style=""></a><a href="http://www.czug.org/docs/zope/zope3book/InstallZope3">InstallZope3</a><br>
    和Zope2区别之一是，Zope3的用户存放在一个配置文件principals.zcml中。zope.conf目前还比较简单。<br>
我是在linux上下载svn的源代码安装的，很方便，很顺利（不过要使用python2.3.4才行）。</li><li>新的web用户界面 <a href="http://www.czug.org/docs/zope/zope3book/WebGUI">WebGUI</a><br>
  </li>

    首先是Zope X3现在界面十分的漂亮了。<b>而且他支持更换皮肤！</b>如果分别使用http://localhost:8080/manage和http://localhost:8080/++skin++ZopeTop/manage去访问你的服务器，就会发现两种完全不同的皮肤。<br>
Zope3的用户界面有些类似Plone，废弃了从前的多桢的结构，而且他用来很多javascrip，因此不必频繁刷新界面，而且使用很连贯。另外，对于我们比较重用的一个特性是，整个Zope用户界面也是<b>支持国际化</b>的！<br>
  <br>再就是Zope3的<b>帮助系统</b>，由于充分利用了Introspect和Zope3的Interface特性，现在很容易查看各个接口的调用方法，这比Zope2中DocFinderTab要好很多！实际上通过   <span class="obeylines-h"><a href="http://localhost:8080/++apidoc++" class="url"><span class="cmtt-10">http://localhost:8080/++apidoc++</span></a>便可得到全部的API文档！</span><br>
  <br>
Zope3把内容和软件进行了分离，提出了<b>内容空间</b>和<b>软件空间</b>两部分。软件空间提供对包（Package）的配置。这的确让ZODB更加干净了，不会出现类似现在Plone下面那么多令人费解的portal_xxx。<br>
  <br>
走了一遍对翻译设置的例子，还比较顺利，感觉Zope3的确比较神奇！<br>
  </ul><br>
