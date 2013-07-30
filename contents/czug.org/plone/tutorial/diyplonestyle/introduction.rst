<p>(译者：本教程的英文原稿位于 <a href="http://plone.org/documentation/tutorial/creating-custom-style">这里</a>.)</p>
<p>Plone从2.1版本开始引入了<a href="http://plone.org/products/resourceregistries">资源注册表</a>（ResourceRegistries）这个新组件，
它提供了一组工具来管理链接到plone页面（模板）的样式表以及Javascript等资源文件。这些工具——<em>portal_css</em>和<em>portal_javascripts</em>
——让您能够以一种类似于“将动作（actions）注册到<em>portal_actions</em>”的方式来注册<acronym title="层叠样式表（Cascading Style Sheet）">
CSS</acronym>和<acronym title="Javascript">JS</acronym>文件（例如您可以为它们设置访问条件）。感谢资源注册表，我们现在能够以更清晰和更强大的方式定制Plone的外观。</p>
<p>要定制一个Plone站点，一般通过<acronym title="Through The Web">TTW</acronym>方式（在<acronym title="Zope管理界面（Zope Management Interface）">ZMI</acronym>中），
使用<em>Skins Tool</em>中的<code>custom</code>层来完成定制任务。尽管这样做完全可以，但是这种方式仅仅适合于客户这边的简略更改，特别是那些无权访问文件系统的人。如果这就是您想要的，
那么您或许更应该阅读Plone2.0权威指南的<a href="http://docs.neuroinf.de/PloneBook/ch7.rst">第七章</a>。但是如果您期望为Plone构建一个完整的图形化环境，那么最好的方式就是写一个
基于文件系统python代码的产品。</p>
<p>在本指南中，我们将使用<a href="http://plone.org/products/diyplonestyle">DIYPloneStyle</a>——一个针对Plone2.1的简单示例/骨架性质的皮肤产品——作为研究资源注册表如何工作的基础，并
且我们将基于它来构建一个新产品，以支持在任何Plone门户中安装新的定制外观。</p>
<p>DIYPloneStyle是基于如下两个产品的：</p>

<ul>
<li>Martin Aspeli的<a href="http://plone.org/products/myskin">MySkin</a>，一个骨架性质的Plone产品，它可以用它自己的层来安装一个皮肤选择项，但是没有使用资源注册表机制。</li>
<li><a href="http://plone.org/products/simpleplonestyle">SimplePloneStyle</a>（作者是我），这是另一个骨架产品，它利用了资源注册表机制，但是不能创建新的皮肤选择项。</li>

</ul>
<p>这两个产品都还没有废弃，仍然很有价值。比如，您可能想要使用SimplePloneStyle来启动这样一个新项目：其中需要有“为所有Plone皮肤选择项注册新样式表”的功能。
又或者，您可能想基于MySkin写一个新产品，它仅仅需要使用几个层来向Plone添加新的皮肤选择项。</p>
<dl>
<dt>注意</dt>
<dd>本指南有意没有包括“通过用覆盖Plone宏中的<acronym title="超文本标记语言（Hyper Text Markup Language）">HTML</acronym>”来订制Plone外观的资料；
 代替的，我们聚焦于使用<acronym title="层叠样式表（Cascading Style Sheet）">CSS</acronym>。我们并不推荐修改Plone的<acronym title="超文本标
 记语言（Hyper Text Markup Language）">HTML</acronym>的方式，因为这样做可能导致您在升级Plone时遇到麻烦。<br />
 如果您真的需要修改Plone的页面模板来定制某些<acronym title="用户界面（User Interface）">UI</acronym>元素，那么我们推荐您阅读Ben Calder的
 关于如何<a href="http://plone.org/documentation/how-to/creating-custom-skins">创建一个定制皮肤</a>的how-to文档，以及Jet Wilda的
 <a href="http://plone.org/documentation/tutorial/where-is-what/whereiswhat">&quot;Where is what?&quot;</a>指南。</dd>
</dl>
