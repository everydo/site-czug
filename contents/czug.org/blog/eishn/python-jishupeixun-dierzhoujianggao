<h2 class="Heading">上半场·面向对象编程初步</h2><p><br />  上周我们简单扫描了一下 Python
的基本语法。其实说到底那个还是 C++, 不过大家不必太担心, 我从 Python 1.5 开始一直写的就是这种 Python,
直到第三年才警醒 Python 其实要比 C++ 好玩得多, 但是这种风格的 Python 已经足以满足我日常所有的需要了。<br /> 
不过我们不应该满足于此, 说句让我自己汗言的话, 其实我走了三年弯路。当然问题也不全在我, 当年 Python 1.5
的特性还不是非常丰富。斗转星移, 现在已经是 Python 2.4 了, 我们就更没有理由去走老路了。为此, 我们需要更为深入地掌握
Python 的语言特点 (当然, 这里很搞笑, Python 所谓特性基本上都可以在其他语言中找到出处,
感觉有点像深圳的世界大观)。Python 的各种语言特点互相融合在一起, 和 C++ 比起来一点都不生硬, 一点也不令人讨厌。嗯, 就如同 C
一样的简洁、美丽。所以在 Python 里面有一个词, 叫做 Pythonic, 它的意思是假如你遇到钉子了,
不是因为你不够设计或者不够模式, 是因为你没有用 Python 的方法去做事情。Python 下面一切都是那么简单, 那么好玩 -- 这个就是
Python 的方法, Pythonic。<br />  这是以熟悉 Python 的高级特性为基础的。说到这里,
想起我们部门新来两位同事, 在使用 Python 做项目之前, 先沉下心来做了两周的 Python Challenge, 把 Python
模了个透, 结果两周后程序写出来相当漂亮, 甚至让我这种老牌 Python 程序员跌破眼镜, 与我周围的同事立马有了境界上的区分。<br />  所以上周我迫不及待地说这周要把 Python 的高级特性介绍给大家, 这个是我本来的打算。但是无数次有人晕倒在我的技术推广讲座上的惨痛教训让我放慢了进度。<br />  好了, 今天是面向对象编程。<br /> 
我不太喜欢所谓 "面向对象"的编程方式, 相反对 "基于对象" 的方法情有独钟。这里, 面向对象是什么东西呢? 我想大家都接触过,
但实际上大家也许用的都是 "基于对象" 的方法。面向对象, 是一个很没意思、很意识形态、很一根筋的东西。为什么呢, 就用用对象不行吗? 不行,
你一定要用类继承, 你一定要多态, 你一定要虚一个函数, 你一定要怎么怎么样才行, 这才能叫面向对象。哼哼, 写程序不是摆地摊, 不是卖东西,
这样你累不累啊? 务实一点吧, 该用什么用什么去, 我宁愿就用一点点, 我宁愿仅仅基于对象来做事情。所以以后有人说你不 "懂面向对象",
大可不理, 让别人去懂吧。<br />  今天回过头来还是要讲讲面向对象的东西。话说回来, "面向" 这个东西虽然没什么意思, "对象"
还是非常有用的。还是那句话, 等我们玩熟了 "面向对象" 的东西, 就会发现它可笑的一面, 或者简直就是一无是处, 这个时候,
你就可以用面向对象来真正开始写程序了。<br />  上次讲到类。类是万恶之首, 将来讲到 "配置编程" 和 C 与 C++ 的 "真正分野" 的时候我会重新回过头来讲这个东西。现在回来:<br /><br /></p><blockquote>    <b>class</b> Foo:<br />      <b>def</b> __init__(self, a, b):<br />        self.a = a<br />        self.b = b<br /><br />      <b>def</b> show_a(self):<br />        <b>print</b> self.a<br /><br />      <b>def</b> show_b(self):<br />        <b>print</b> self.b<br /><br />    foo_obj = Foo("I'm A", "I'm B")<br />    foo_obj.show_a()<br /><br />    foo_obj.b = "Hello world!"<br />    foo_obj.show_b()<br /></blockquote><p><br /> 
这个例子很简单, __init__ 函数是每次生成类的时候都会执行的, self 指向类对象自身。 记住, 类函数(或者叫做方法)
它的第一个参数 "self" 不要忘记写了, 其他的我就不深入讲了。请大家注意命名规范类的首字母大写, 没有特别原因不要在前面加 "T" 或者
"C" 什么的。函数和变量尽量全小写, 单词间下划线。<br />  下面是一个命名规范, 就是类里面 "单下划线"
开始的成员变量叫做保护变量, 意思是只有类对象和自类对象自己能访问到这些变量; 而 "双下划线" 开始的是私有成员,
意思是只有类对象自己能访问, 连子类对象也不能访问到这个数据。这是个悲剧性的设计思想, 我不打算详细讲什么是 "保护成员" 什么是
"私有成员" 请大家自己去查阅面向对象的相关资料。下面是使用私有成员的一个例子。<br /><br /></p><blockquote>    <b>class</b> Fool:<br />      <b>def</b> __init__(self):<br />        self.__a = None <i># None 就是什么都没有</i><br /><br />      <b>def</b> set_a(self, a):<br />        self.__a = a<br /><br />      <b>def</b> get_a(self):<br />        <b>print</b> self.__a<br /><br />    fool_obj = Fool()<br />    <b>print</b> foo.__a <i># 哼哼, 等着报错吧,</i><br />   
<i>#                
# 只有 foo "自己" 才可以 "看见" __a</i><br /><br />    fool_obj.set_a("I'm A")<br />    <b>print</b> fool_obj.get_a()<br /></blockquote><p><br /> 
把对象里面的成员保护起来, 曾经流行过一段时间, 特别是 Java 里面, 程序员似乎养成了习惯, 要改点东西一定要 get/set 一番,
也不觉得累。后来人们才发现好端端的 "等号" 不用非要搞一大堆劳什子 get 和 set 函数, 还在那里自称 "隐藏实现",
完全是自我虐待。聪明起来之后, 才找到真正 "隐藏实现" 的方法, 就是重定义等号运算符, 把许多本来就是应该用 get 和 set 的地方
(比如 get_time, 当前时间每次都要生成, 似乎只能用方法得到) 用直接操作成员变量的方法来做 (用等号代替函数, 这个以后会讲)。<br /> 
更深一层讲, 真正漂亮、收放自如的程序敢于暴露自己的实现细节, 用最轻量级的方法来做事情。重量级的程序常常会被自己绊倒,
一大堆的无谓封装和重复封装让程序变得很难编写和维护, 轻量级的方法用最简单而不损失稳定和安全性的方法来做事情, 把十倍的时间用于测试和完善;
而重量级的方法花最长的时间来营造一个虚假繁荣的世界, 花最多的时间在自我安慰上。即, 我一直在努力花更多的时间和用更复杂的方法来做事情,
我很强, 没有人能比我更能延长项目周期, 没有人能写出比我更拐弯抹角的程序。<br />  轻量级的方法通常会很巧妙,
但不会很复杂。有时候你写程序也许会觉得越写越麻烦, 那肯定是方法用错了; 有时候你学习编程会觉得很难, 那也肯定是方法错了。如果不改变自己,
习惯于用麻烦的方法写程序、痛苦地学习, 那么我很高兴地告诉你, 你挂掉了。<br />  开个玩笑, 区分早期的 Python 程序和现代的 Python 程序的方法就是数下划线的数量。 用很多下划线的程序是早期思想的产物, 现代的程序接口越来越聪明, 下划线也就越来越少了。<br />  下面是继承。<br /><br /></p><blockquote>    <b>class</b> Bar(Foo):<br />      <b>def</b> __init__(self, a, b, c, d):<br />        Foo.__init__(self, a, b)<br />        self.c = c<br />        self.d = d<br /><br />      <b>def</b> show_c(self):<br />        <b>print</b> self.c<br /><br />      <b>def</b> show_d(self):<br />        <b>print</b> self.d<br /><br />    foo_obj.show_a()<br />    foo_obj.show_b()<br />    foo_obj.show_c()<br />    foo_obj.show_d()<br /></blockquote><p><br />  多重继承。<br /><br /></p><blockquote>    <b>class</b> Bar(Foo1, Foo2, Foo3, ...): ...<br /></blockquote><p><br /> 
所谓继承就是让新的类, 子类得到父类 (就是那个 Foo) 的成员和功能。但是最好不要忘记子类也需要一个 __init__ 函数, 把
a、b、c、d 这些成员都创建出来, 或者直接调用父类的 __init__ 函数来完成这件事情,
并且我们通常是这样做的。这里我不准备做详细的讲解, 请大家阅读相关文档。<br />  今天对面向对象的介绍就到这里。以后我们讲到高级特性的时候还会回来。<br />  现在我们 Have a break, 大家可以整理一下上面的内容。下面是提问时间。<br /><br /></p><h2 class="Heading">下半场·图形界面编程<br /></h2><p><br />  好, 继续我们的话题。在上周魏中华提醒我多讲写看得见摸得着的东西, 让大家马上能够看见 Python 能够干什么。这确实是防止审美疲劳的好办法。<br />  马上, 图形应用程序界面编程。眼球经济嘛, 尽管对我而言图形界面程序对我而言是最没劲的, 但是对大部分 Windows 用户而言是最有吸引力的。所以先拿出来试刀了。<br /> 
大家有用过我写的两套图形界面的应用程序, 其中那个服务器管理程序似乎很小巧, 用的是一套叫做 Tkinter 的界面工具;
另外一个是带数据库的编辑器, 看起来比较大, 用的是 PyQt。Python 不是一根筋, 界面工具库数不胜数其中我最喜欢的是
wxPython, 出名的还有 PyGtk、PythonWin 等。PythonWin 其实就是 C++ 下面的 MFC,
其他都是跨平台的程序库。除了 Tkinter 其他图形库基本上都有类似于 Delphi、VB 那样的所见即所得拖来拽去的界面设计工具。不是
Tkinter 不想有这样的开发工具, 而是用起来实在是太方便了。下面创建一个窗体:<br /><br /></p><blockquote>    <b>from</b> Tkinter <b>import</b> *<br />    wnd = <b>Tk</b>()<br /></blockquote><p><br />  下面加一个按钮:<br /><br /></p><blockquote>    btn = <b>Button</b>(<b>master</b>=wnd, <b>text</b>="Exit", <b>command</b>=wnd.<b>quit</b>)<br />    btn.<b>pack</b>()<br /></blockquote><p><br />  作为惯例, 我们通常会把 btn 加到 wnd 下面, 而使用这种写法来创建:<br /><br /></p><blockquote>    wnd.btn = <b>Button</b>(<b>master</b>=wnd, <b>text</b>="Exit", <b>command</b>=wnd.<b>quit</b>)<br />    wnd.btn.<b>pack</b>()<br /></blockquote><p><br />  最后, 让这个窗口跑起来:<br /><br /></p><blockquote>    wnd.<b>mainloop</b>()<br /></blockquote><p><br />  mainloop() 是一定要的, 但是请在调用 mainloop() 之前把所有该做的事情都做完, 因为之后的代码在窗体退出之前都不会被执行。<br /> 
Tkinter 是一种相当简单的图形界面程序库。它基于 Tk/Tcl 这套工具, Tcl 被誉为最容易的图形应用程序开发语言, 而
Tkinter 在 Tcl 的基础上利用 Python 的语言优势在易用性上更进一步。当然有得有失, 有一种流行的说法是 Tkinter
因为过于简单而不适合于开发大型应用。然而事实上这并不是真的, 因为疏忽, 这次没有把我的几位同事的所有作品带过来, 他们使用 Tkinter
编写了极为漂亮、同时效果相当夸张的游戏, 包括对对碰还有纸牌游戏。但是大家可以看到 Python 自带的 IDLE 这套编辑器, 完全是用
Tkinter 写的 (当然还有大家在用的我写的那套服务器工具)。<br />  下面是科学家吴国瑞随便用 Tkinter 写的拱猪。这里简单看看效果, 源码就不放出来了, 因为据国瑞兄自己说这个代码是他刚开始用 Python 的时候匆匆写就, 所以相当出不了手, 呵呵。<br />
</p>
<div><img src="../images/python-jishupeixun-dierzhoujianggao-1.jpg" alt="python-jishupeixun-dierzhoujianggao-1.jpg" /><br />
</div>
<br />
<p><br />  我已经把 Tkinter 的文挡给大家了, 学习 Tkinter 最好的方法是把这份文挡中的代码照抄一遍,
让它跑起来。然后按着自己的兴趣把这些例子改得更搞笑些, 并且也跑起来。在使用的过程中, 你会发现其实 Tkinter 能做所有的事情,
它已经自带了编辑框、绘图工具 (Canvas) 等许多组件, 剩下的基本上就是搭积木的工作了。<br />  那么 Tkinter
真正的弱点在哪里呢, 我可以很负责任地告诉大家, 在界面效果上。毋庸置疑, Tkinter 的界面绘制相当难看。以至于我以前对 Tkinter
相当反感, 我和大多数 Python 程序员一样, 认为将 Tkinter 作为 Python 的基本图形界面库是个阴谋, 真正时至名归的是
wxPython。然而很多年后, 我发现 Tkinter 是最适合 Python 风格的图形界面工具, 我开始在许多场合抛弃 wxPython
和 pyQt, 重新开始使用 Tkinter, 主要是在轻量极的场合。这是我努力使自己变得不那么愚蠢的一个证明。<br />  离开
Tkinter 我们就来到了 wxPython 和 pyQt 的世界。wx 是一套已经发展多年并最终会一统江湖的图形界面库。在 C++
等编译语言的世界 (Java 除外), MFC 曾经一统微软自己的天下, Unix 下面免费的 GTK 和半开放 QT 是后来最受欢迎的界面库
(当然 Unix 下面界面库多如牛毛, 还有 More or Less Tif、Tk 等等)。我们用过 Borland 的东西,
Borland 最后的 C++ Builder X 版本抛弃了强大的 TCL 而最终转向了 wx, 这是其一统江湖的前兆。QT
是老牌的强力工具库, 它在许多地方都要胜过 wx, 但是也有硬伤, 比如 MOC 预编译让许多 C++ 原教旨主义者吓了一跳;
以前其半开放的性质也让黑客社团很恼火, 这也是以前我更多倾向于 wx 的原因, 但是现在 QT 已经完全开放了。<br />  比起来 pyQt 要比 wxPython 更容易, 但是比起 Tkinter 它们的易用性是个笑话。所以用他们我通常会借助类似与 Delphi 那样的工具。<br />  下面是 pyQt 可以使用的一套界面设计工具, 叫做 QtDesigner, 我们来看看。<br /><br /><img src="../images/python-jishupeixun-dierzhoujianggao-2.jpg" alt="python-jishupeixun-dierzhoujianggao-2.jpg" /></p>
<p><img src="../images/python-jishupeixun-dierzhoujianggao-3.jpg" alt="python-jishupeixun-dierzhoujianggao-3.jpg" /><br /><br /> 
学习 wxPython, 必须下载它的 Demo, 里面有你需要的一切范例代码, 甚至不需要去看它的文挡。当然很搞笑, wxPython 与
C++ wxWidget 共享一个文挡, 其实是 C++ 的文挡。如果你已经视一切工具为一体的话自然会读得很开心,
否则会有点吃力或者有点怪怪的感觉, 另一方面这些都是英文文挡。同样这种情况很不幸地又发生在 pyQt 上。<br />  下面我们来看看最新版的 wxPython Demo。<br /><br /> <img src="../images/python-jishupeixun-dierzhoujianggao-4.jpg" alt="python-jishupeixun-dierzhoujianggao-4.jpg" /><br />
<img src="../images/python-jishupeixun-dierzhoujianggao-5.jpg" alt="python-jishupeixun-dierzhoujianggao-5.jpg" /><br />
<img src="../images/python-jishupeixun-dierzhoujianggao-6.jpg" alt="python-jishupeixun-dierzhoujianggao-6.jpg" /><br />
<br /> 
等下我会把 Windows 版本的 wxPython 下载地址给大家, 里面附带有含金量极高的 Demo。wxPython 中最强大的编辑器是
Boa constructor, 但是他没有发布版, 只有开发和测试版。他们说他们或许在几年之后会完成这个编辑器发布出来。我已经等了好多年,
这个谎言令我非常愤怒。所以我一直用的是测试版。这个试玩版确实有些瑕疵, 但已经远远超过其他工具。<br /><br />
<img src="../images/python-jishupeixun-dierzhoujianggao-7.jpg" alt="python-jishupeixun-dierzhoujianggao-7.jpg" /><br /> <br />
<img src="../images/python-jishupeixun-dierzhoujianggao-8.jpg" alt="python-jishupeixun-dierzhoujianggao-8.jpg" /><br /> <br />
<img src="../images/python-jishupeixun-dierzhoujianggao-9.jpg" alt="python-jishupeixun-dierzhoujianggao-9.jpg" /><br /> <br />
<br /> 
pyQt 很遗憾, 目前不存在可用的 Windows 版本。我成功地把 Unix 版本的 Qt 和 pyQt 移植到 Windows 下,
但是因为 X11 的原因许多地方不尽人意。同时我费尽苦心地拿到 Qt 的 Windows 版本, 做了一个 pyQt 的 Windows
版本, 一切都好, 但是因为 Qt 在 Windows 下的版权问题也是不能用的。但至少现在我们这里有 pyQt
的多个版本可以供大家学习。尽管国内许多人许多人在争论是 wxPython 好还是 pyQt 好, 但是真的把 pyQt
编译出来的人也就十人左右, 能够得到全系列来进行评估的人则更少, 这个简直就是笑话。<br />  好了, 下面请大家整理一下 Tkinter 的内容。下面是提问时间。<br /></p><p><br /></p><h2 class="Heading">相关资料</h2><p><br /><a href="http://www.wxpython.org" target="_self">wxPython</a> <a href="http://www.wxpython.org/download.php" target="_self">[下载]</a><br /><a href="http://boa-constructor.sourceforge.net/" target="_self">Boa constructor</a> <a href="http://boa-constructor.sourceforge.net/Download.html" target="_self">[下载]</a><br /></p><p><a href="http://www.trolltech.com/" target="_self">C++ Qt</a><br /><a href="http://www.riverbankcomputing.co.uk/pyqt/download.php" target="_self">PyQt</a><br /></p><br />