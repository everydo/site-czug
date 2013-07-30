---
created: 2006-04-25 02:21:15
creator: panjy
description: '使用Zope/Plone上的外部编辑器 ExternalEditor_ ，可自动激活你熟悉的编辑 '
title: 设置你的外部编辑器
---
<p>使用Zope/Plone上的外部编辑器 <a class="reference" href="http://www.zopechina.com/products/ExternalEditor-zh">ExternalEditor</a> ，可自动激活你熟悉的编辑
器，将网站内容的下载、编辑、上传集成起来，大大简化了用户的操作.</p>
<p>在个人文件夹中有一个文件，这里可进行一些不友好的设置（应该有个配置用户界
面的）:</p>
<pre class="literal-block">
C:\Documents and Settings\登录用户名\ZopeEdit.ini
</pre>
<p>我遇到的一个问题是：在windows中，我常使用vim来进行文本编辑。这个编辑器能
很好的解决utf8编码的问题。
但是即便我在windows资源管理器中，设置使用vim作为txt文件的默认编辑器（工
具-&gt;文件夹选项-&gt;文件类型）， ExternalEditor还是会激活Windows自带的纪事
本，这让我苦恼不堪。</p>
<p>查了一下代码，需要在注册表中进行调整，位于:</p>
<pre class="literal-block">
HKEY_CLASSES_ROOT\txtfile\Shell\Open\Command
</pre>
<p>我设置成下面的值就可以了:</p>
<pre class="literal-block">
C:\Program Files\Vim\vim64\gvim.exe %1
</pre>
<p>这样的hack方法，还是让人颇为不爽，考虑下个版本调整一下ExternalEditor，还
是直接根据资源管理上的设置来激活。</p>
