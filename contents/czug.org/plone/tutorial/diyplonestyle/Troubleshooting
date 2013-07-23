<dl>
<dt>﻿清空所有缓存（！！！）</dt>
<dd>如果您应用到产品的改变并没有得到您期待的结果，或者如果某些皮肤元素在您反安装了相应产品后还持续存在，请确定浏览器以及前端代理缓存（apache,squid）已经清空了，
 并且重载入当前页面。<br />
 在Firefox中，当点击重载按钮时按下shift键。
 在<acronym title="Internet Explorer">IE</acronym>中，使用这个键组合&lt;Ctrl-F5&gt;。<br />
 不要低估这个可能的问题，它在您可能遇到的皮肤产品（不管是否基于DIYPloneStyle）相关故障中起码占有80%的比率。</dd>
<dt>在必要时反安装您的产品</dt>
<dd>如果您在重命名样式表或javascripts之前忘记这么做，您能够在<acronym title="Zope管理界面（Zope Management Interface）">ZMI</acronym>中用<em>portal_css</em>和<em>portal_javascripts</em>工具
 解决冲突。<br />
 如果您在重命名产品或皮肤选择项之前并没有反安装该产品，在文件系统上撤销您的更改，反安装该产品然后再次重命名这些元素。</dd>
<dt>小心任何<acronym title="Through The Web">TTW</acronym>方式的定制</dt>
<dd>您的某些产品皮肤元素可能已经在<acronym title="Zope管理界面（Zope Management Interface）">ZMI</acronym>中定制了。并且被<code>custom</code>皮肤层中的等价物覆写了。</dd>
<dt>检查该产品已经正确载入到Zope中</dt>
<dd>在<acronym title="Zope管理界面（Zope Management Interface）">ZMI</acronym>中，进入<code>/Control_Panel/Products/manage_main</code>，检查该产品已经列出了并且没有标记为“损坏的”。<br />
 如果没有被列出来，您应该在文件系统上仔细检查该产品的安装，确信启动Zope服务器的用户至少具备对该产品的读访问权限。<br />
 如果该产品被标记为“损坏的”，您应该检查您的错误日志并且确定您的业务python代码是有效的（这应该只有在您向您的初始骨架Plone样式产品添加了一个损坏的python类定义时才会出现）</dd>
<dt>确信该产品是可安装到Plone的</dt>
<dd>如果您在 <em>站点设置 > 添加/删除产品</em>中发现您的产品被认为是移除的，或者如果您的产品根本就没有列出在快速安装器中（<acronym title="Zope管理界面（Zope Management Interface）">ZMI</acronym>中的<em>portal_quickinstaller</em>），
 这或许意味着您不得不调试您的 <code>Extensions/Install.py</code>脚本。</dd>
<dt>使用测试框架</dt>
<dd>DIYPloneStyle自带了基本的单元测试。<br />
 如果您想要学习Plone单元测试框架，请参考本指南<a href="resources">资源</a>章节的链接。 </dd>
<dt>得到社区的支持</dt>
<dd>在添加注释到该页面之前，请发送您的问题到<a href="/contact#users">plone-users</a> 邮件列表或者尝试一下在IRC上的<a href="irc://irc.freenode.net/plone">#plone</a>频道得到支持。<br />
 您也可以通过发送电子邮件给DIYPloneStyle的作者们来联系他们（电子邮件地址列出在产品的<code>README.txt</code>文件中）。</dd>
</dl>
