---
created: 2004-11-12 01:11:38
creator: panjy
description: 对于中文用户，特别需要关注Python的编码技术. 列举一些常用的技巧。
title: Python的编码处理技术
---

 <ul>
 <li>
 <a href="http://docs.python.org/tut/node4.html#SECTION004230000000000000000">代码中的编码设置</a>，应该在代码最初两行内包含：<br />
 <pre>
# -*- coding: gb18030 -*-
</pre>
 </li>
 <li>获得/设置系统的缺省编码<br />
 <pre>
sys.getdefaultencoding()<br />
sys.setdefaultencoding('utf-8')
</pre>
 </li>
 <li>获得文件系统的文件名的编码<br />
 <pre>
sys.getfilesystemencoding()
</pre>
 </li>
 <li>获得当前终端的输入、输出编码<br />
 <pre class="literal-block">
sys.stdout.encoding<br />
sys.stdin.encoding
</pre>
 </li>
 <li>编码转换（先转换为unicode，再转换为具体的编码），有两种方法：<br />
 <pre>
unicode('abc', 'mbcs').encode('utf-8')<br />
'abc'.decode('mbcs').encode('utf-8')
</pre>
 </li>
 </ul>
 <p>其他参考：</p>
 <ul>
 <li><a href="http://www.pycs.net/users/0000323/stories/14.html">python and
 unicode</a><br /></li>
 </ul>
