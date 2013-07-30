<p>如我们在基本示例部分提到的一样，定制<code>base_properties.props</code>是修改Plone <acronym title="用户界面（User Interface）">UI</acronym>元素样式属性最容易的方式，但是这仍然有些问题值得注意。
由于Plone皮肤工具现有工作方式的问题，您必须在该文件中给出所有Plone基本属性，即使您只打算定制其中很少几个。如果您删除该文件中的某些属性，Plone就不能再访问他们了。</p>
<p>所有这些问题使得<code>base_properties.props</code> 方式在维护，升级和定制上都不理想。这就是为什么它将在Plone中被逐步淘汰的理由之一（另一个理由则是为了避免
在<acronym title="层叠样式表（Cascading Style Sheet）">CSS</acronym>文件中使用<acronym title="文档模板标记语言（Document Template Markup Language）">DTML</acronym>）。<br />
我还不清楚这将在什么时候如何实现，因此请关注本段的更新。</p>
<p>您可以在<code>CMFPlone/skins/plone_styles/ploneCustom.css</code> 这个文件中找到更多关于Plone预定义属性的信息。</p>
<p>除了Plone中预定义的属性之外，可能您还需要使用您自己的属性。
除了添加新属性到<code>base_properties.props</code>中外，更好的方法是，在你的皮肤层中创建一个新的<code>.props</code>文件，并在css文件中注册使用它（以替代那个base_properties - 参见原始的<code>DIYPloneStyle/skins/diystyle/renameThisFile.css.dtml</code><acronym title="文档模板标记语言（Document Template Markup Language）">DTML</acronym> 代码）。</p>
