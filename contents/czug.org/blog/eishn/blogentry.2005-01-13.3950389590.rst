---
created: 2005-01-15 10:40:21
creator: eishn
description: 简单地探讨一下 Python 中的 import，它的用法。这是第二篇。
title: import 初探之二 —— __import__() 、reload() 及受限脚本
---
<h1>import 初探之二 —— __import__() 、reload() 及受限脚本</h1>
<div align="right">
 <b>——朋友，你从哪里来？</b><br />
 <b>沈崴 2005 年 1 月，于广州</b>
 </div>
 <p>
 <b>逐渐起飞<br /></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放下尼龙弦吉他，点下鼠标左键，退出
 GP3 —— 即使是老版本，我还是比不上它的弹奏速度。但庆幸的是我还能勉强地跟上 Python 的节奏 —— 巨蟒的飞行速度。</p>
 <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;import
 自古以来就没有发生过什么大的变化，只有在一次版本更替中引入了 as 关键词。这种变化温和到以至于我们常常会忘记 as
 其实是在后来才加进来的，这正叫做随风潜入夜润物细无声啊。</p>
 <pre>
<font color="#FFA500">import</font> string as string1, string as string2
<font color="#FFA500">from</font> string <font color="#FFA500">import</font> strip <font color="#FFA500">as</font> strip1, strip <font color="#FFA500">as</font> strip2
</pre>
 <p><b>__import__()</b><br />
 嗯，import 总会去调这个玩艺的。也就是说你可以重载这个函数，让 Python 在导入好东东之前先做出许多好玩的事情来：</p>
 <pre>
old_imp = __buildins__.__import__<font color="#FFA500">
def</font> new_imp(module_name, globals=None, locals=None, fromlist=[]):
<font color="#FFA500"> print</font> module_name
 <font color="#FFA500">return</font> old_imp(module_name, globals, locals, fromlist)<br />
<br />
__buildins__.__import__ = new_imp
</pre>
 <p> __import__() 的完全调用形式是 __import__(name, globals, locals,
 fromlist),name 即模块名、其后是全局和局部变量，最后是在模块中要导入的列表。比如：</p>
 <pre>
__import__('string', globals(), locals(), ['join', 'split'])
</pre>
 <p><br />
 当然，通常你可能会判断一下该模块是否已经导入过了。或者把你讨厌的东西拒之门外。</p>
 <p><b>reload()</b><br />
 这个听起来有点像是我的那个金属酒瓶。我与它在岗顶的那家小店铺之中一见钟情，结果花去我 140 ￥——当然威士忌要更贵一点。</p>
 <p> reload 函数的意思就是旧瓶装新酒了。比如我们已经 import something 了，但是外面的 something.py
 模块文件的内容突然改变、更新了，如果要享受新的 somethin.py 的好处，我们就需要 reload 一下了。</p>
 <p> 据说 reload 通常和一种神秘的仪式有关。差不多类似于这样吧：</p>
 <pre>
<font color="#FFA500"><span style="color: rgb(0, 153, 0);">""" maillist.py</span>
<span style="color: rgb(0, 153, 0);"> 向远程 Mail 服务器查询是否有新邮件。</span>
<span style="color: rgb(0, 153, 0);"> 服务器返回一个 Python 模块文件，把结果封装在 show() 函数中。</span>
<span style="color: rgb(0, 153, 0);">"""
<br /></span>def</font> download_netobj(url, module_name):
 <font color="#FFA500">import</font> urllib
 web_file = urllib.urlopen(url)
 buff = web_file.read()
 web_file.close()
 module_file = open(module_name + <font color="#008000">'.py'</font>, <font color="#008000">'w'</font>)
 module_file.write(buff)
 module_file.close()<font color="#008000">
<br />
#查询邮件</font>
download_netobj(
 <font color="#008000">'http://http://blog.czug.org/eishn/mail_list.cgi?user=eishn&amp;pass=6star'</font>,
 <font color="#008000">'mail_list'</font>)
import mail_list
mail_list.show()<font color="#008000"><br />
<br />
#好的，过一会儿再查询吧。</font>
import time
time.sleep(100)<font color="#008000"><br />
#再次查询</font>
download_netobj(
 <font color="#008000">'http://http://blog.czug.org/eishn/mail_list.cgi?user=eishn&amp;pass=6star',
 'mail_list'</font>)<br />
reload(mail_list)
mail_list.main()
</pre>
 <p> reload()
 通常对应的就是这种玩法。因为模块之所以会更新，大多数的情况是由于——模块它自网上来。除了邮件服务，其他的玩法大同小异。自从对“程序混着数据传来传去”不再恶心之后，沈崴开始乐衷于此道，并开始自觉地传道。</p>
 <p> 这就像是魔兽的地图，既有静态数据，又有许多
 道具和人物。这些道具和人物的控制程序同时被封装在假装是地图的那个文件里。这样那些游戏们就可以动态的随着地图的不同改变更多的行为了，比如添加更多地
 图特有的变态道具。</p>
 <p> reload() 和 __import__() 一样是可以重载的。</p>
 <p><b>什么是 __builtins__</b><br />
 __builtins__ 是一个名字空间，是系统自动生成的，其中的内容是直接可调用的。我们可以尝试着导入一个叫做 __builtin__
 的模块，如果发现模块 __builtin__ 与名字空间 __builtins__ 中的内容无异，那么我们正运行在一个无限制的 Python
 执行环境下。</p>
 <p><b>定制脚本执行环境</b><br />
 当然，重定义 __import__() 有着另一层深刻的含义 —— 如果你想定制一个自己的脚本执行环境的话。这让我们想起 Zope 中的
 "Python Script" 执行环境，只能使用 Zope 所允许的模块，这相当酷。</p>
 <p> 简单的做法，覆盖掉脚本的 __builtins__.__import__ 函数，使之只能导入限定的模块。</p>
 <p> 修改脚本的 __builtins__。当然我们已经知道了，如果想给它完全的执行环境可以把 module __builtin__
 的内容赋给脚本的 __builtins__ 名字空间 —— 其实系统总是默认地做了这件事情了。</p>
 <p> 好了，下面是一个订制脚本执行环境的简单例子：</p>
 <pre>
execfile(<font color="#008000">'script.py'</font>, {<font color="#008000">'__builtins__'</font>: {<font color="#008000">'__import__'</font>:<font color="#FFA500">lambda</font> name, globals, locals, fromlist:<b>None</b>} } )
</pre>
 <p> 现在，script.py 这个脚本所能做的事情相当，相当有限了。</p>
 <p><b>imp 模块</b><br />
 imp 模块是专业的导入功能定制模块，而且它给人一较为底层的映象。在网上可以找到一种叫做 knee.py 的脚本，它讲了很多。</p>
 <p> 但是我从来没有想过来使用这个模块，因为 imputil 工具模块要更为亲和一点。使用 imp 或者 imputil
 模块可以让你的程序于“无法在本地找到某一个模块”时自动地区网上下载下来并导入，这显得比上面 reload 一节中的那个邮件程序更为聪明了。</p>
 <p><b>欲练神功，挥刀自宫</b><br />
 在开始关于 import 的下面两辑（之三、之四）之前，我想最好还是忘了本辑和第一集的内容吧，尽管他们是大厦的基础，但是与新时代的
 import 玩法似乎已经有些格格不入了。</p>