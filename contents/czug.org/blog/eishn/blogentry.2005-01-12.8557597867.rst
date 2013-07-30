---
created: 2005-01-13 12:22:30
creator: eishn
description: Python 中的内存泄漏 ，在 Python 中产生内存泄漏的技术
title: Python 中的内存泄漏
---
<h1>Python 中的内存泄漏</h1>
 <p align="right"><i><font face="黑体"><b>——献给那些有内存泄漏相伴的日子</b><br /></font></i></p>
 <p align="justify">&nbsp;&nbsp;&nbsp; 事实证明，写程序是一件非常好玩的事情。</p>
 <p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;我曾经尝试过靠自己勤劳的双手来封装 Python
 的扩展模块(不使用工具)，但是我很明智地发现也许以我的智商可能无法来很好地管理那些强的或是弱的引用计数……于是我动摇了。</p>
 <p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;动摇的结果是：我开始使用 SWIG 来做这件事情。</p>
 <p align="justify">
 &nbsp;&nbsp;&nbsp;&nbsp;我心中的一个声音在风雨交加的夜空中高喊着：再见了，怎么删也删不掉的内存；还有那些没有删就自动消失的意外内存……</p>
 <p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;好了，让我们再次回到那个“自动垃圾收集时代”的著名笑话吧……</p>
 <pre>
<font color="#DEB887">&gt;&gt;&gt;</font> <font color="#0000FF"><font color="#FFA500">class</font> </font><font color="#0000FF">LeakTest</font>(object):<br />
 <font color="#FFA500">def</font> __init__(self):<br />
 <font color="#FFA500">print</font> <font color="#008000">'Object with id %d born here.'</font> % id(self)<br />
 <font color="#FFA500">def</font> <font color="#0000FF">__del__(</font>self):<br />
 <font color="#FFA500">print</font> <font color="#008000">'Object with id %d dead here.'</font> % id(self)<br />
<font color="#DEB887"><br />
&gt;&gt;&gt;</font> T1 = LeakTest()<br />
<font color="#0000FF">Object with id 10462352 born here.</font><br />
<font color="#DEB887">&gt;&gt;&gt;</font> T2 = T1<br />
<font color="#DEB887">&gt;&gt;&gt;</font> T1 = None<br />
<font color="#DEB887">&gt;&gt;&gt;</font> T2 = None<br />
<font color="#0000FF">Object with id 10462352 dead here.</font>
</pre>
 <p align="justify">不错，这就是我们逃难到 Python 的原因，垃圾总是会自动地消失得无影无踪。然后……</p>
 <pre>
<font color="#DEB887">&gt;&gt;&gt;</font> A = LeakTest()<br />
<font color="#0000FF">Object with id 10462512 born here.</font><br />
<font color="#DEB887">&gt;&gt;&gt;</font> B = LeakTest()<br />
<font color="#0000FF">Object with id 10462544 born here.<br /></font><font color="#DEB887">&gt;&gt;&gt;</font> A.b = B<br />
<font color="#DEB887">&gt;&gt;&gt;</font> B.a = A<br />
<font color="#DEB887">&gt;&gt;&gt;</font> A = None<br />
<font color="#DEB887">&gt;&gt;&gt;</font> B = None
</pre>
 <p align="justify">也就是说，在指针 <b>A</b>、<b>B</b> 移情别恋时其原来所指向的内存却没有消失。原因是在 "<b>A
 = None</b>" 时，因为</p>
 <p align="justify"><b>A.b</b> 还指着 <b>B</b> ，所以 <b>A</b> 所指的对象还不能删除。同理，因为原来
 <b>A</b> 所指的对象还在，所以因为 "<b>B.a = A</b>" 的缘故，对象 <b>B</b> 也不能删除。</p>
 <p align="justify">这时 <b>A</b> 和 <b>B</b> 已经为 <b>None</b> ，于是产生了一处内存泄漏。</p>
 <p align="justify">初略想想，想让 Python 内存泄漏似乎比 C/C++ 还快呢（千万不要写 self.xxx =
 self）。</p>
 <p align="justify">最后写一个带作用域的作为结束，以博诸公一笑。</p>
 <pre>
<font color="#DEB887">&gt;&gt;&gt;</font> <font color="#FFA500">def</font> <font color="#0000FF">foo</font>():<br />
 A = LeakTest()<br />
 B = LeakTest()<br />
 A.b = B<br />
 B.a = A<br />
<font color="#DEB887"><br />
&gt;&gt;&gt;</font> foo()<br />
<font color="#0000FF">Object with id 10462448 born here.<br />
Object with id 10462832 born here.</font>
</pre>
