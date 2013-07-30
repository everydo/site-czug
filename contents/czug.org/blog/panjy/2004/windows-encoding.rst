---
created: 2005-01-21 12:03:13
creator: panjy
description: 讨论一下Windows的字符编码
title: windows的字符
---
<p>看到一个讲解<a href="http://blog.csdn.net/yjgx007/archive/2004/06/16/18079.aspx">windows字符编码的文章</a></p>
<p>解开了我的一些疑惑，总结如下:</p>

<ul>
<li>windows包括unicode和mbcs两套API</li>
<li>windows的头文件中的引入的奇怪的TCHAR、LPSTR，都是为了解决两套api的问题</li>
<li>unicode版本是windows的建议版，速度更快、支持更好。</li>
<li>unicode版本，在windows9x中不支持，适用NT技术上的windows</li>
<li>unicode版本，支持超长的文件名</li>

</ul>
<p>不过，我现在的疑问是：</p>

<ul>
<li>codepage好像就是指的是 字符集编码格式，比如cp936 = gbk, 是这样的吧？</li>
<li>如果改变windows的缺省codepage为utf8? 在windows的“控制面板”中的“区域和语言选项”中没有找到方法。<p>  这个可以实现吗？如果可以的话，从Plone输出的文件名，如果是utf8，便应该可正常显示了。</p>
</li>

</ul>
