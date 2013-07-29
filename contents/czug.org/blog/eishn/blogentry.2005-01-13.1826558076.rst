---
created: 2005-01-13 12:33:25
creator: eishn
description: 简单地探讨一下 Python 中的 import，它的用法。这是第一篇。
title: import 初探之一 —— 导入 Package
---

 <div align="right">
 <i><strong>—— 朋友，你从哪里来？</strong></i>
 </div>
 <p>
 <strong>酒壮熊人胆<br /></strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;两杯红酒下肚，乘兴便打开这个盒子
 —— import。<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;众所周知，import 也许是 Python
 中最平淡无奇、最道貌岸然的东西了。它总是用一种呆滞木然的眼神看着身怀绝技的道友们玩出各种花招、翻云覆雨，却从来是不动声色……这却越来越像是一个阴谋了！</p>
 <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;曾经，我也在江湖上听说过 import，它似乎是
 Python
 的基本语句，用于导入包(Package)，或者模块(Module)到当前的作用域里来，这样我们就可以在程序中调用这些包和模块了。好象还真没见它做过什么出格的事情来呢。</p>
 <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通常模块是后缀为
 ".py"、".pyo"、".pyc"、".pyd"、".so"、".dll"
 这样的文件。啊哈，导入模块还是挺简单的，就连我这种初学者都烂熟于心咯。只是那个 Package……</p>
 <p><strong>包<br /></strong>包通常总是一个目录，目录下为首的一个文件便是
 __init__.py。然后是一些模块文件和子目录，假如子目录中也有 __init__.py 那么它就是这个包的子包了。差不多就像这样吧：</p>
 <pre>
<font color="#008000">Package1/ __init__.py<br />
 Module1.py<br />
 Module2.py<br />
 Package2/ __init__.py<br />
 Module1.py<br />
 Module2.py</font>
</pre>
 <p>我们可以就这样导入一个包：</p>
 <pre>
<font color="#FFA500">import</font> Package1 
</pre>
 <p>或者调入一个子模块和子包：</p>
 <pre>
<font color="#FFA500">from</font> Package1 <font color="#FFA500">import</font> Module1<font color="#FFA500"><br />
from</font> Package1 <font color="#FFA500">import</font> Package2<font color="#FFA500"><br />
import</font> Packag1.Module1<font color="#FFA500"><br />
import</font> Packag1.Package2
</pre>
 <p>可以深入好几层包结构：</p>
 <pre>
<font color="#FFA500">from</font> Package1.Package2 <font color="#FFA500">import</font> Module1<font color="#FFA500"><br />
import</font> Package1.Package2.Module1
</pre>
 <p>大致就这样吧，我觉得，包的精髓应该是在 __init__.py 这个文件之中的。</p>
 <p><strong>__init__.py 文件</strong><br />
 __init__.py 控制着包的导入行为。假如 __init__.py 为空，那么仅仅导入包是什么都做不了的。</p>
 <pre>
<font color="#FFA500">&gt;&gt;&gt;</font> <font color="#FFA500">import</font> Package1<font color="#FFA500"><br />
&gt;&gt;&gt;</font> Package1.Module1<font color="#FF0000"><br />
Traceback (most recent call last):
 File "&lt;pyshell#1&gt;", line 1, in ? 
 Package1.Module1<br />
AttributeError: 'module' object has no attribute 'Module1'</font>
</pre>
 <p>我们需要在 __init__.py 里把 Module1 预先导入：</p>
 <pre>
<font color="#FFA500"><span style="color: rgb(0, 153, 0);">#文件 __init__.py</span><br />
import</font> Module1
</pre>
 <p>测试：</p>
 <pre>
<font color="#FFA500">&gt;&gt;&gt;</font> <font color="#FFA500">import</font> Package1<font color="#FFA500"><br />
&gt;&gt;&gt;</font> Package1.Module1<font color="#0000FF"><br />
&lt;module 'Package1.Module1' from 
'Module.pyc'&gt;</font>
</pre>
 <p>__init__.py 中还有一个重要的变量，叫做 __all__。我们有时会使出一招“全部导入”，也就是这样：</p>
 <pre>
<font color="#FFA500">from</font> Package1 <font color="#FFA500">import</font> *
</pre>
 <p>这时 import 就会把注册在包 __init__.py 文件中 __all__ 列表中的子模块和子包导入到当前作用域中来。比如：</p>
 <pre>
<font color="#008000">#文件 __init__.py</font><br />
__all__ = [<font color="#008000">'Module1'</font>, <font color="#008000">'Module2'</font>, <font color="#008000">'Package2'</font>]
</pre>
 <p>测试：</p>
 <pre>
<font color="#FFA500">&gt;&gt;&gt;</font><font color="#FFA500"> from</font> Package1 <font color="#FFA500">import</font> *<font color="#FFA500"><br />
&gt;&gt;&gt;</font> Module2<font color="#0000FF"><br />
&lt;module 'Package1.Module2' from 'Module.pyc'&gt;</font>
</pre>
 <p>__init__.py 文件会在导入时被执行。</p>
