<p>为了让您更好的理解<em>皮肤工具</em>（Skins Tool）以及它的层间遍历机制，我建议您阅读由Andy McKay著写的官方<a href="http://docs.neuroinf.de/PloneBook">Plone Book</a>的<a href="http://docs.neuroinf.de/PloneBook/ch7.rst">第七章</a>，特别是<a href="http://docs.neuroinf.de/PloneBook/ch7.rst#using-layers-within-a-skin">在皮肤中使用层</a>
以及<a href="http://docs.neuroinf.de/PloneBook/ch7.rst#managing-skins-with-the-portal-skins-tool">使用portal_skins管理皮肤</a>。这里给出的联接不是官方的，但是据我所知它是唯一一个公开可用的直接为这本书提供<acronym title="超文本标记语言（Hyper Text Markup Language）">HTML</acronym>版本的网站，并且它还是即时更新的。
这两部分主要聚焦于<acronym title="Through The Web">TTW</acronym>方式的Plone定制工作。尽管对于学习<em>Skins Tools</em>的层间遍历机制而言，这是一种很好的方式，但是我们知道直接在<acronym title="Zope管理界面（Zope Management Interface）">ZMI</acronym>中进行工作，并不适合为Plone构建一个完全图形化的环境。</p>
<p>当在文件系统中构建一个皮肤产品的时候，概念上都是一样的：<br />
安装函数首先会创建一个皮肤，它包含了所基于皮肤的所有层，然后附加上产品所特定的层。产品特定的层就是指在文件系统中位于产品<code>skins/</code>目录下的那些文件夹。(*)</p>
<p>实际上，如果您的产品仅仅是通过添加几个样式表和替换图形化UI元素来定制一个Plone站点，那么您只需要向您的皮肤选择项添加一个层就足够了。(**)</p>
<p>但是在某些情形下，拥有多个层也是很有用的，主要用于组织分类皮肤元素，如图片，定制(customizations)，样式表等等。</p>
<p><div class="discreet">
(*) 任何位于您的产品<code>skins/</code>目录下的文件夹都将被注册为<em>皮肤工具</em>（Skins Tool）中的一个FSDirectoryView，
然后会被添加到您的皮肤选择项的层中。只有那些名字以 '.' 开始的文件夹，以及名为<code>CVS</code>或者<code>{arch)</code>的文件夹除外（这是被硬编码到
<em>Products.DIYPloneStyle.Extensions.utils.getSkinsFolderNames()</em>中的）。</p>
<p>(**) 如果DIYPloneStyle提供了超过一个皮肤层（也就是说如果它的<code>skins/</code>文件夹包含了不止一个文件夹），这仅仅是为了使得我们在<em>Get Started</em>部分的删除例子步骤更容易些。
</div></p>
