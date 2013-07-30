<p>在上一节，讲过了po和pot文件的结构和编辑方法。</p>
 <p>这一节，将讲述如何将翻译好的po文件应用到产品中。</p>
 <p>首先，要将翻译好的po文件放到相应产品的i18n的目录下，一般这个目录下已经有一些其它语言的po文件了。</p>
 <p>然后，打开zope的管理平台（ZMI），进入<strong>&nbsp;</strong> <a href="../../../../manage_workspace"><font color="#0000ff"><strong>&nbsp;/</strong></font></a><a href="../../../../Control_Panel/manage_workspace"><font color="#0000ff"><strong>Control_Panel</strong></font></a><strong>/</strong>
 <a class="strong-link" href="../../../../Control_Panel/TranslationService/manage_workspace">
 <font color="#0000ff"><strong>TranslationService</strong></font></a>
 <strong>，在这里列出了所有已经安装的zope产品的翻译文件。</strong>在列表中查找kupu，一般在最下面。</p>
 <p><img src="zope_po_1.JPG" /></p>
 <p>上面图片中，用绿色框起来的项目就是我刚刚制作的kupu的简体中文翻译文件。</p>
 <p>可以注意到，在绿色框的上面的项目，显示出错误的信息，这表明该po文件编辑错误，无法应用。</p>
 <p>点击绿框的项目，进入详细信息页面，页面截图如下：</p>
 <p><img src="zope_po_2.JPG" /></p>
 <p>如果文件内容有修改或更新，可以按Reload this catalog按钮来刷新。</p>