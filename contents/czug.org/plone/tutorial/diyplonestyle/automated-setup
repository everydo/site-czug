<p>在<a href="getting-started">前一章</a>中您学会了如何手动设置DIYPloneStyle为一个全新的皮肤骨架产品。这是我们后续工作的基础。</p>
<p>然而还有另一种迅速得多的方式来达到同样的目的——使用DIYPloneStyle自带的生成器脚本程序。</p>
<p>在文件系统里的DIYPloneStyle产品文件夹中，有一个<code>bin/</code>目录，在这里面您会发现一个叫做<code>generator.py</code>的python脚本文件。
这个脚本程序能够被用来自动化完成所有前一章中列出的手动设置。</p>
<h2>下载和解包展开DIYPloneStyle</h2>

<ul>
<li>把解包后的DIYPloneStyle产品文件夹放到您的zope实例的<code>Products/</code>目录。</li>
<li><strong>卸载您以前安装的DIYPloneStyle</strong>（以管理员角色登录plone，进入<em>站点设置 > 添加/删除产品</em> ）。</li>

</ul>
<h2>运行该脚本</h2>
<h3> 在Unix/Linux/OSX下</h3>
<p>  在bash shell中，运行类似于如下提供的命令:
<pre>
   /您的zope实例目录路径/Products/DIYPloneStyle/bin/generator.py --productname MyOwnPloneSkin
</pre>
</p>
<h3> 在windows下</h3>

<ul>
<li>在windows的<em>开始</em>菜单中选择<em>运行</em>，然后键入<code>cmd</code>，按下<em>确定</em>按钮。</li>
<li>使用类似如下提供的命令来运行脚本:
<pre>
   python C:\您的zope实例目录路径\Products\DIYPloneStyle\bin\generator.py --productname MyOwnPloneSkin
</pre>
</li>

</ul>
<p>  在类Unix系统中，您能够从任何目录调用该脚本。<br />
  在Windows中您则不能：您的当前工作目录不能是产品目录或其子目录。</p>
<p>  我收到一些用户反馈，说是当使用直接从subversion中检出的DIYPloneStyle中的这个脚本时，在Windows下会遇到一些权限问题。<br />
  如果您遇到这样的情况，在调用这个脚本之前花点时间删除所有<code>.svn</code>文件夹就可以了。</p>
<h2>开始构建</h2>
<p>  现在您的Zope实例的<code>Products/</code>目录中已经有了一个全新的可安装产品。<br />
  唯一需要您自己动手的就是重启动Zope服务器,这样您才可以在Plone中安装它。</p>
<dl>
<dt>注意</dt>
<dd>如果您想要知道更多可用的脚本参数，您可以参照它的源代码，或者不带参数执行它，参考它的输出信息。</dd>
</dl>
