---
created: 2004-11-03 21:52:30
creator: panjy
description: ctypes是一个Python模块，使用他可以在Python中创建和操作C语言的数据类型，这样可以在动态链接库中传递参数到C的函数中去。
title: 'ctypes: 使用python调用C编写的动态链接库'
---
<p>必须得引用一段Python的创始人van Rossum对<a href="http://starship.python.net/crew/theller/ctypes/index.html">ctypes</a>的评价了：<br />
 <br />
 <i style="color: rgb(51, 102, 102);">&nbsp; ctypes is very cool! Great piece
 of work.<br /></i><br />
 ctypes可以在windows/linux等多个平台上使用，甚至支持Windows上的COM开发！<br />
 <br />
 对ctypes的评价，我和van Rossum的感觉相同:) . 费话不说，在windows上来段“hello world”吧：</p>
 <pre>
&gt;&gt;&gt; from ctypes import *<br />
&gt;&gt;&gt; MessageBox = windll.user32.MessageBoxA <br />
&gt;&gt;&gt; MessageBox(0, '你好，世界！', '第一个ctypes程序', 0) # 调用函数
</pre>
 <p>大家可以看到弹出了一个标准的windows消息框，就这么简单 :-)<br />
 <br />
 实际上书写windll.user32的时候，自动调入了user32.dll这个windows动态库；windll.user32.MessageBoxA则直接引用到了user32.dll动态库中的MessageBox函数。<br />
 <br />
 如此简洁、漂亮，C/C++程序员估计要嫉妒了 :-)</p>
 <p>可下载安装 <a href="http://sourceforge.net/project/showfiles.php?group_id=71702&package_id=71318&release_id=278603">
 最新的0.92版本</a>, 注意必须配合使用python2.3以上的版本。</p>
