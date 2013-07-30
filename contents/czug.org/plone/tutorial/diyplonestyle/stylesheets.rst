<p>在<a href="http://plone.org/products/resourceregistries">资源注册表</a>内建到Plone之前，要重载Plone默认的<acronym
title="层叠样式表（Cascading Style Sheet）">CSS</acronym>规则，唯一的办法就是定制 <code>base_properties.props</code>以及<code>ploneCustom.css</code>这两个文件。
正因为这样，确定需要重载Plone的某些内容，需要我们关注<em>Skins Tool</em>中层的遍历顺序，或者通过设置Zope不太漂亮的<em>Access Rules</em>工具。<br />
就像我们在<a href="base_properties">前一章</a>中看到的，我们仍然得使用<code>base_properties.props</code>来定义我们的基本图形化设置。<br />
但是现在我们能够用CSS工具注册样式表了，<code>ploneCustom.css</code>仅仅保留为向后兼容目的。</p>
<p>没有资源注册表的Plone还有另一个限制就是，没有办法添加条件来决定是否一个样式表应该被载入。</p>
<p>在DIYPloneStyle中，样式表注册是用<code>config.py</code>来设置的，在<code>STYLESHEETS</code>声明中。<code>STYLESHEETS</code>是一个python字典的元组，其中每个字典对应于一个被<em>portal_css</em>工具注册的样式表。</p>
<p>如果您需要在一个样式表上放置一个条件，您得向它对应的字典添加一个<code>expression</code>关键字。其值是一个TAL表达式，它的工作方式与动作（actions）在<em>portal_actions</em>工具中一致。</p>
<p>您能够从<code>STYLESHEETS</code>的内联注释中学到更多样式表属性（字典键）</p>
<h2>实践示例</h2>
<p>  一个非常常见的用例就是要为公开匿名访问定义一个皮肤，同时为成员访问保持一个基本的plone风格。</p>
<p>  要实现这个用例，最容易的方式就是在产品特定的样式表上放置一个条件。</p>
<p>  在<code>config.py</code>的<code>STYLESHEETS</code>声明中，像下面这样声明您的样式表:
<pre>
   {'id': 'diystylesheet.css', 'expression':'portal/portal_membership/isAnonymousUser'},
</pre>
</p>
