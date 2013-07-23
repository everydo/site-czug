<p><br />
 1 <strong>卸载这个产品</strong>——使用门户的<em>快速安装器（Quick Installer）</em>。<br />
 <br />
 2 <strong>重命名这个产品</strong>为别的与<code>DIYPloneStyle</code>不同的名字。 <br />
 <br />
 3
 <strong>重命名skins/diystyle/renameThisFile.css.dtml</strong>为更适合您的产品的名字。您将在这个文件中添加您自己的<acronym title="层叠样式表（Cascading Style Sheet）">CSS</acronym>规则。<br />
 <br />
 4 <strong>重命名skins/diystyle/</strong>为更适合您的产品的名字(*)。 <br />
 <br />
 5
 <strong>在config.py中，</strong>改变您的皮肤选择项的名字（<code>SKINNAME</code>）。在<code>STYLESHEETS</code>声明中，替换<code>renameThisFile.css</code>为您为该模板选择的名字，省略<code>.dtml</code>后缀名。
 <br />
 <br />
 6 <strong>在Extensions/Install.py中，</strong>编辑import声明中的相关行。（参见<code># CHANGE</code>注释） <br />
 <br />
 7 <strong>在tests/testPloneSkin.py中，</strong>替换所有<code>DIYPloneStyle</code>为您的产品名（参见<code># CHANGE</code>注释）。
 <br />
 <br />
 8 <strong>编辑README.txt文件，</strong>在其中描述您的产品，删除usage和credits段，并替换作者名和电子邮件地址。 <br />
 <br />
 9 <strong>清除HISTORY.txt文件中</strong>和DIYPloneStyle相关的内容。 <br />
 <br />
 10 <strong>删除基本例子</strong> - <strong>删除 skins/diystyle_example/目录。</strong> -
 <strong>在config.py文件中，</strong>在<code>STYLESHEETS</code>声明部分，删除声明<code>diystylesheet.css</code>那一行。 <br />
 <br />
 常见问题 -- 本章的实践最容易遇到问题，请参见本指南<a href="troubleshooting">常见问题</a>部分的参考信息以避免出现这样的情况。 <br />
 <br />
 现在您已经拥有了一个全新的骨架，使用它您可以为Plone构建新皮肤了。<br />
 <strong>祝您的新工程一切顺利!</strong> <br />
 <br />
 <span class="discreet">(*)
 任何位于您产品的<code>skins/</code>目录下的文件夹都将被门户皮肤工具注册为一个FSDirectoryViews，仅有的几个例外就是那些名字以'.'开头的文件夹，以及名为<code>CVS</code>或者<code>{arch}</code>的文件夹。（这是硬编码到<em>Extensions.utils.getSkinsFolderNames()</em>中的）。
 由于在皮肤工具中FSDirectoryViews的名字/id标志必须是唯一的，一个很好的实践就是在您的文件夹名中包含您的产品名，这可以很大程度上确保它们的名字之间不会冲突——特别是您想使用那些常用名时。</span></p>
