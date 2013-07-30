---
created: 2005-11-08 11:27:49
creator: eishn
description: '通常，我们能够清醒地知道我们是否真正需要一个使用 Python 来编制的服务。其中最简单的一个场合是: 当所有应用逻辑都是使用 Python
  来完成的时候，也许我们将不得不继续使用 Python 来完成整个服务架构……'
title: 使用 Zope3 技术建立 Python 服务 (Unix 版本)
---
<h1>使用 Zope3 技术建立 Python 服务 (Unix 版本)</h1>
<h2>一、引入 Zope3 系统架构技术</h2>
 <ul>
 <li>使用 Zope3 系统架构技术建立 Python 服务</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 通常，我们能够清醒地知道我们是否真正需要一个使用 Python 来编制的服务。<br />
 &nbsp;&nbsp;&nbsp; 其中最简单的一个场合是: 当所有应用逻辑都是使用 Python 来完成的时候，也许我们将不得不继续使用
 Python 来完成整个服务架构。<br />
 <br />
 &nbsp;&nbsp;&nbsp; 我曾经用 Python 构架过一个应用，我自己编写了完整的 Python Daemon 的实现，并且采用了
 INI 文件来承载配置(使用 Python 标准库 ConfigParser)。<br />
 &nbsp;&nbsp;&nbsp; 但是很快我就发现这也许并不是一个明智的做法。在这个案例中 Daemon
 逻辑、配置逻辑与应用逻辑互相交错耦合，使程序架构变得相当 dirty，这影响了程序的可维护性，并且可能会降低程序的稳定性。<br />
 &nbsp;&nbsp;&nbsp; 不久前，我开始浏览 Zope3 的源码，发现其服务器架构设计得比较巧妙，正是我们可以借鉴的。<br />
 &nbsp;&nbsp;&nbsp; 现在我已经使用 Zope3
 架构及其技术重写了应用，目前整个服务架构变得非常清晰，便于维护。效果相当明显。<br />
 <br />
 &nbsp;&nbsp;&nbsp; 这里将对 Zope3 架构应用做简单的介绍。<br />
 <br />
 
 <ul>
 <li>安装 Zope3</li>
 </ul>
 　　首先我们需要安装一套 Zope3。<br />
 &nbsp;&nbsp;&nbsp; 编译 Zope3，make install 之后，Zope3 所有的包都会被自动安装到标准的 Python
 库目录中。<br />
 &nbsp;&nbsp;&nbsp; 这里，也可以手工配置 Zope3 的安装目录以得到对软件包更为灵活的控制：<br />
 <br />
<pre>
 $ ./configure --prefix=/opt/Zope-3.x.x<br />
 $ make<br />
 $ make install
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 现在，Zope3 所有的包都已经下榻到 /opt/Zope-3.x.x/lib/python
 目录中了。<br />
 <br />
 <br />
 
 <h2>二、zdaemon Package 使用介绍</h2>
 &nbsp;&nbsp;&nbsp; 使用 Python 建立守护进程，可以用到 Zope3 中的 zdaemon 包。zdaemon 是一套
 Standalone 的工具，可以脱离 Zope3 来使用。<br />
 &nbsp;&nbsp;&nbsp; 我们可以根据不同的需要来决定对 zdaemon 的调用方式。<br />
 &nbsp;&nbsp;&nbsp; zdaemon 中已经提供了两个直接可用的 Python 脚本，是调用 zdaemon
 功能最简单的方法。<br />
 <br />
 
 <ul>
 <li>使用 zdrun.py 来启动服务器</li>
 </ul>
 &nbsp;&nbsp;&nbsp; zdrun.py 脚本用于在控制台下直接执行服务器程序(这里用 my_program，不仅限于 Python
 程序)。通常用于测试。<br />
 <br />
<pre>
 $ cd /opt/Zope-3.x.x/lib/python/zdaemon<br />
 $ ./zdrun.py "my_program"
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 这里你可以想象 "my_program" 是一个 while true 的单循环服务器程序。<br />
 <br />
 
 <ul>
 <li>使用 zdctl.py 来启动、停止服务器</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 启动:<br />
 <br />
<pre>
 $ ./zdctl.py -p "my_program" start<br />
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 而停止、获取服务器运行状态也是相同的指令，不同的是将 "start" 换成
 "stop"、"status"。<br />
 &nbsp;&nbsp;&nbsp; 通常我们加上 -d 参数，使服务中标准输出的内容定向到日志中去。也就是所谓的 "Daemon 模式"
 (通常标准的 Daemon 程序就应该是这样的)。<br />
 <br />
<pre>
 $ ./zdctl.py -d -p "my_program" start<br />
</pre>
 <br />
 
 <ul>
 <li>管理进程以及 PID 文件</li>
 </ul>
 &nbsp;&nbsp;&nbsp; zdctl.py 会建立一个管理进程来对用户的服务进行管理，主要是服务的启动、停止与状态查询。这就将 Daemon
 逻辑与应用逻辑完全分离了。<br />
 &nbsp;&nbsp;&nbsp; 因为没有将 Daemon 实现逻辑注入应用，这样 Daemon 管理与应用之间的信号冲突就会减少很多。这里
 Daemon Manager 用于停止服务使用的信号是 SIGTERM。<br />
 &nbsp;&nbsp;&nbsp; zdctl.py 会在执行目录下建立一个名为 zdsock 的文件(Unix
 Socket)，用于访问管理进程。从某种意义上说，它起到了常见的 PID 文件的作用。<br />
 <br />
 
 <ul>
 <li>通过配置文件来管理 zdctl.py 脚本的参数</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 我们可以编写配置文件来保存 zdctl.py 需要的信息，然后通过这个配置文件来操作我们的服务。<br />
 <br />
<pre>
 # 一个配置文件的例子 my_program_daemon.conf<br />
 &lt;runner&gt;<br />
 program my_program<br />
 daemon true<br />
 directory /tmp/my_program_home<br />
 socket-name /tmp/my_program_home/zdsock<br />
 &lt;/runner&gt;
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 这样，我们就可以通过这种方法来操作我们的服务了:<br />
<pre>
 $ ./zdctl.py -C my_program_daemon.conf [start|stop|status]<br />
</pre>
 <br />
 
 <ul>
 <li>交互模式</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 进入交互模式(这里以 Zope 中带有的 runzeo.py 为例子服务):<br />
 <br />
<pre>
 $ ./zdctl.py -C zeoctl.conf<br />
 program: runzeo.py -a 9999 -f Data.fs<br />
 daemon manager not running<br />
 zdctl&gt;<br />
 zdctl&gt; help<br />
 Documented commands (type help &lt;topic&gt;):
 ========================================
 EOF fg foreground help kill
 logreopen logtail quit reload restart
 shell show start status stop
 wait<br />
 zdctl&gt; help start
 start -- Start the daemon process.
 If it is already running, do nothing.
</pre>
 <br />
 
 <ul>
 <li>在程序中使用 zdaemon Package</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 通常，我们会把 zdaemon 的调用写在程序中，这种类型的程序通常都以 ctl
 结尾，表示用于控制某个服务。它最起码可以接受 "start"、"stop" 以及 "status" 三个参数。<br />
 &nbsp;&nbsp;&nbsp; 可以想象到最简单的方案是把 zdctl.py 脚本的调用写在 shell 脚本中。下面是在 Python
 中直接调用 zdaemon 包接口的做法:<br />
 <br />
<pre>
 # !/usr/bin/env python<br />
 # my_program_ctl.py<br />
 def run():<br />
 ... import os,zdaemon<br />
 ... cmdclass = zdaemon.zdctl.ZDCmd<br />
 ... # zdaemon.zdctl.main(args=None, options=None, cmdclass=None)
 ... zdaemon.zdctl.main(["-C", "my_program_daemon.conf"] + sys.argv[1:], None, cmdclass)<br />
 if __name__ == "__main__":
 ... run()
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 在文件 controller.py 中，定义了一个关于 zdaemon.zdctl.main
 接口的调用。<br />
 &nbsp;&nbsp;&nbsp; 其中 args 就是上面 zdctl.py 脚本中所使用的参数列表。是最重要的参数，其定义与 zdctl.py
 脚本的参数列表相对应。<br />
 &nbsp;&nbsp;&nbsp; 可以简单地了解一下 options 这个参数，它指定了参数 args 的解释方法。通常取
 None，使用默认的行为就可以了。<br />
 &nbsp;&nbsp;&nbsp; cmdclass 这个参数指定了 start、stop、status 这些行为，通常我们使用
 zdaemon.zdctl.ZDCmd 就可以了。我们常常会定制这个选项来增加控制行为，比如 debug。<br />
 <br />
 &nbsp;&nbsp;&nbsp; 可见 zdaemon 提供了多种可配置的调用方法，以适应不同粒度下的需要。<br />
 <br />
 
 <h2>二、ZConfig Package 使用介绍</h2>
 &nbsp;&nbsp;&nbsp; ZConfig 提供了强大的关于配置文件的 "定义" 及 "操控" 能力。这里，将讲解如何基于 zdaemon
 来调用 ZConfig 的功能(ZConfig 可以独立使用)。<br />
 &nbsp;&nbsp;&nbsp; 这样，我们有机会将 Daemon 逻辑和配置管理都从应用逻辑中分离出来。<br />
 &nbsp;&nbsp;&nbsp; 事实上，ZConfig
 也可以用于其他场合，比如作为数据交换引擎，或者用于应用程序界面或网页的定义。接下来，大家将体会到这点。<br />
 <br />
 
 <ul>
 <li>配置文件</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 关于配置文件 Zope 系统中自带的 zope.conf 是一个很好的例子。在 Zope 体系下，配置文件使用
 Apache 中类似于 http.conf 那样的结构。<br />
 &nbsp;&nbsp;&nbsp; 这里给出一个简单的例子(事实上 zdctl 也使用了 ZConfig 的配置功能):<br />
 <br />
<pre>
 # my_program.conf<br />
 foo = hello<br />
 bar = 123<br />
 &lt;server&gt;<br />
 host = <a href="http://www.163.com/">http://www.czug.org</a>
 method = get<br />
 &lt;/server&gt;
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 其中，前两行是关于 foo、bar 的赋值操作。在 ZConfig 中，foo、bar 被认为是
 "key"。<br />
 &nbsp;&nbsp;&nbsp; 然后是关于 "server" 的配置。这里，server 被认为是 "section"。<br />
 <br />
 
 <ul>
 <li>读取配置</li>
 </ul>
 &nbsp;&nbsp;&nbsp; 这里是一个读取配置文件的例子:<br />
 <br />
<pre>
 # read_options.py<br />
 from zdaemon import zdoptions<br />
 def load_options(args=None):<br />
 ... if args is None:<br />
 ... args = sys.argv[1:]<br />
 ... options = zdoptions.ZDOptions()<br />
 ... options.schemadir = "/PATH/TO/SCHEMA_FOLDER"<br />
 ... options.realize(args)<br />
 ... options = options.configroot return options
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 这里这一行 options.realize(args) 允许将配置以 args
 列表的方式传递进来，与配置文件组合解析，请参考 zdctl.py 脚本的使用。<br />
 &nbsp;&nbsp;&nbsp; 这里，需要为配置文件指定一个样式定义文件，这将在下面提到。通常我们默认使用文件
 schema.xml。同时，我们需要给出存放 schema 文件的文件夹 schemadir。<br />
 &nbsp;&nbsp;&nbsp; 下面是调用 read_options 的方法:<br />
 <br />
<pre>
 # !/usr/bin/env python<br />
 # my_program.py<br />
 import sys<br />
 from read_options import read_options<br />
 args = ["-C", "my_program.conf"] + sys.argv[1:]
 options = load_options(args) # 读取配置文件 my_program.conf
 print options.foo # hello
 print options.bar # 123
 print options.server # server 对象
 print options.server.host # <a href="http://www.163.com/">http://www.czug.org</a><br />
 print options.server.method # get
</pre>
 <br />
 
 <ul>
 <li>Schema</li>
 </ul>
 &nbsp;&nbsp;&nbsp; Schema 是 ZConfig 真正强大的原因。Schema 文件定义了配置文件的结构。<br />
 &nbsp;&nbsp;&nbsp; 如果熟悉 Zope 的话，推荐看一下 Zope 自己使用的一个 Schema 文件(位于
 "Zope-3.x.x/lib/python/zope/app/server/schema.xml")，对照一下 zope.conf
 ，相信可以很快掌握其使用方法。<br />
 <br />
 &nbsp;&nbsp;&nbsp; 这里粗略地说一下关于 Schema 的几个简单特性，请看下面:<br />
 <br />
<pre>
 &lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
 &lt;schema&gt;<br />
 &lt;!-- 描述 --&gt;<br />
 &lt;description&gt; schema.xml for my_program.conf &lt;/description&gt;<br />
 &lt;!-- 类型定义 --&gt;<br />
 &lt;sectiontype name="server" datatype="option_factory.ServerFactory"&gt;<br />
 &lt;key name="host" required="yes" /&gt;<br />
 &lt;key name="method" required="yes" /&gt;<br />
 &lt;/sectiontype&gt;<br />
 &lt;!-- 实体声明 --&gt;<br />
 &lt;section type="server" name="*" attribute="server" required="yes" /&gt;<br />
 &lt;key name="foo" default="world" /&gt;<br />
 &lt;key name="bar" datatype="integer" required="yes" /&gt;<br />
 &lt;/schema&gt;
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 其中使用 Key 定义了 foo、bar 两个配置变量，使用 Section 定义了配置块
 "server"。<br />
 &nbsp;&nbsp;&nbsp; 里面用到了 "required" 来设定配置是否是必须的，或者直接指定 default
 来设定默认值。<br />
 &nbsp;&nbsp;&nbsp; datatype 则指定了数据验证器，例如
 datatype="integer"。如果验证失败，程序会抛出异常。验证器是可以定制的，如果 ZConfig
 中没有所需的验证器我们可以自己编写一个。<br />
 <br />
 &nbsp;&nbsp;&nbsp; 结合 "datatype" 和 "default" ，我们可以将程序中所有静态 const 变量全部初始化在
 schema.xml 中，进一步做到程序和数据分离。<br />
 <br />
 &nbsp;&nbsp;&nbsp; sectiontype 用于对配置块进行定义，通常下面需要用到的 section 都有一个相对应的
 sctiontype 声明。在读取配置文件时，会调用 sectiontype 中 "datatype" 所指向的 Factory
 来生成数据对象。<br />
 &nbsp;&nbsp;&nbsp; 下面给出这个 Factory 的代码:<br />
 <br />
<pre>
 # option_factory.py<br />
 class ServerFactory(object):<br />
 ... def __init__(self, section):<br />
 ... ... self.host = sectio.host<br />
 ... ... self.method = section.method
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; ZConfig 将会使用 ServerFactory 来创建一个数据对象，在这个例子中，我们可以通过
 options.server 来访问到。<br />
 &nbsp;&nbsp;&nbsp; 我们甚至可以考虑直接在 ServerFactory
 里面加入服务器实现，在读取配置的同时直接初始化服务。有兴趣的话大家可以去阅读一下 Zope3
 的源码(zope.app.server.server)。<br />
 <br />
 &nbsp;&nbsp;&nbsp; datatype 数据验证及数据实现，和 sectiontype
 声明，使配置文件同时也可以作为一种简单的数据交换格式来使用。我们可以把 conf 当作一种更好用的 XML 来看待。<br />
 &nbsp;&nbsp;&nbsp; Schema 还有其他一些功能和特性，比如嵌入外部 Schema 等等，我们可以逐步熟悉并用起来。<br />
 <br />
 
 <h2>四、App/Instance 结构</h2>
 &nbsp;&nbsp;&nbsp; Zope3 本身采用了 App/Instance 的结构。Zope3 通过 Instance
 (实体)来提供服务，并可以有多份 Instance，但是 Instance 本身并没有实现部分。Zope3 的实现都在 app (目录)下。<br />
 &nbsp;&nbsp;&nbsp; 我把这个结构称作 App/Instance 结构。它把程序分成 app 和 skel(模板)两部分:<br />
 
<pre>
 Zope-3.x.x/<br />
 ... bin/mkinstance.py<br />
 ... lib/python<br />
 ... zope/app/<br />
 ... zope-standalone-packages<br />
 ... zopeskel/
</pre>
 <br />
 &nbsp;&nbsp;&nbsp;
 这里，就不详细说明了，将这个体系移植到我们的应用中来，其实并不困难。在这里要做的，乃要分析几份源代码，其中相当多的东西是可以直接拷贝己用的。<br />
 &nbsp;&nbsp;&nbsp; 这些关键源码我就不详细列出来了，这里是它们的位置:<br />
 <br />
<pre>
 # 实现部分<br />
 lib/python/zope/app/server/main.py ... 主程序<br />
 lib/python/zope/app/server/controller.py ... zdaemon 调用<br />
 lib/python/zope/app/server/schema.xml ... 配置文件样式定义<br />
 lib/python/zope/app/server/server.py ... 配置文件中用到的 server section 类型的定义，涉及到 ZCML 的内容可以跳过<br />
 bin/mkinstance.py ... 拷贝模板生成 instance<br />
 # 模板部分<br />
 zopeskel/bin/runzope.in ... 调用主程序 app/server/main.py 启动服务
 zopeskel/etc/zdaemon.conf.in ... zdaemon 配置文件，指向 runzope.in 脚本
 zopeskel/bin/zopectl.in ... 服务控制程序，指向 zdaemon.conf.in
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 通过参考这几个文件，我们很快可以建立起自己的软件架构。<br />
 <br />
 
 <h2>五、其他 Standalone Package</h2>
 &nbsp;&nbsp;&nbsp; 最后，补充一下 Zope3 中其他单列的功能模块，这与本文主题关联度较小，但是这些包都是挺有用的。<br />
 &nbsp;&nbsp;&nbsp; 这里列出 Zope3 中所带有的包:<br />
 <br />
<pre>
 lib/python/<br />
 ... BTrees/<br />
 ... RestrictedPython/<br />
 ... ThreadedAsync/<br />
 ... ZEO/<br />
 ... ZODB/<br />
 ... docutils/<br />
 ... persistent/<br />
 ... pytz/<br />
 ... transaction/<br />
 ... zodbcode/<br />
 ... zdaemon/<br />
 ... ZConfig/<br />
 ... zope/
</pre>
 <br />
 &nbsp;&nbsp;&nbsp; 其中 ZODB、ZEO、BTrees、persistent、transaction、zodbcode
 是对象数据库 ZODB 的相关模块。<br />
 &nbsp;&nbsp;&nbsp; docutils 是文本处理的相关模块，pytz 是 Python Time Zone 的缩写。<br />
 &nbsp;&nbsp;&nbsp; RestrictedPython 是一个 Python 的限制实现，权限沙箱，限制 Python
 的执行能力，甚至包括循环的次数。<br />
 &nbsp;&nbsp;&nbsp; ThreadedAsync
 管理多个线程，不至于让一个线程直到跑起来的时候才发现它要的资源还在空运中。<br />
 <br />
 &nbsp;&nbsp;&nbsp; 既然那些 package 都明晃晃放在那里，我们平时怎么会好意思不去用它们呢？<br />
 <br />
 
 <blockquote>
 <b><i>沈崴 (William Shen)</i><br />
 <i>2005-11-1 于广州</i></b><br />
 </blockquote>
 <br />