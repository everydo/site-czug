<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node4.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node4.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node4.html#SECTION004100000000000000000">2.1 Invoking the Interpreter 调用解释器</a>
<UL>
<LI><A href="node4.html#SECTION004110000000000000000">2.1.1 Argument Passing 参数传递</a>
<LI><A href="node4.html#SECTION004120000000000000000">2.1.2 Interactive Mode 交互模式</a>
</ul>
<LI><A href="node4.html#SECTION004200000000000000000">2.2 The Interpreter and Its Environment 解释器及其环境</a>
<UL>
<LI><A href="node4.html#SECTION004210000000000000000">2.2.1 Error Handling 错误处理</a>
<LI><A href="node4.html#SECTION004220000000000000000">2.2.2 Executable Python Scripts 执行Python脚本</a>
<LI><A href="node4.html#SECTION004230000000000000000">2.2.3 Source Code Encoding 源程序编码</a>
<LI><A href="node4.html#SECTION004240000000000000000">2.2.4 The Interactive Startup File 交互式环境的启动文件</a>
</ul></ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION004000000000000000000"></A><A NAME="using"></A>
<BR>
2. Using the Python Interpreter 使用Python解释器
</H1>

<P>

<H1><A NAME="SECTION004100000000000000000"></A><A NAME="invoking"></A>
<BR>
2.1 Invoking the Interpreter 调用解释器
</H1>

<P>
The Python interpreter is usually installed as
<span class="file">/usr/local/bin/python</span> on those machines where it is available;
putting <span class="file">/usr/local/bin</span> in your <span class="Unix">Unix</span> shell's search path
makes it possible to start it by typing the command

<P>
通常 Python 的解释器被安装在目标机器的 <span class="file">/usr/local/bin/python</span> 目录下；把 <span class="file">/usr/local/bin</span> 目录放进你的<span class="Unix">Unix</span> Shell 的搜索路径里，确保它可以通过输入
<div class="verbatim"><pre>
python
</pre></div>

<P>
to the shell.  Since the choice of the directory where the interpreter
lives is an installation option, other places are possible; check with
your local Python guru or system administrator.  (E.g.,
<span class="file">/usr/local/python</span> is a popular alternative location.)

<P>
来启动。因为安装路径是可选的，所以也有可能安装在其它位置，你可以与安装
Python
的用户或系统管理员联系。（例如，<span class="file">/usr/local/python</span>就是一个很常见的选择）

<P>
On Windows machines, the Python installation is usually placed in
<span class="file">C:&#92;Python24</span>, though you can change this when you're running
the installer.  To add this directory to your path, 
you can type the following command into the command prompt in a DOS box:

<P>
在 Windows机器上，Python 通常安装在 <span class="file">C:&#92;Python25</span>(原文是24，可我们这篇明明是2.5的tut，看来原作者在这里大意了——译者),当然，我们在运行安装程序的时候可以改变它。需要把这个目录加入到我们的 Path 中的话，可以像下面这样在 DOS 窗中输入命令行。

<P>
<div class="verbatim"><pre>
set path=%path%;C:\python24
</pre></div>

<P>
Typing an end-of-file character (<kbd>Control-D</kbd> on <span class="Unix">Unix</span>,
<kbd>Control-Z</kbd> on Windows) at the primary prompt causes the
interpreter to exit with a zero exit status.  If that doesn't work,
you can exit the interpreter by typing the following commands:
"<tt class="samp">import sys; sys.exit()</tt>".

<P>
输入一个文件结束符（<span class="Unix">Unix</span>上是 kbdCtrl+D，Windows上是 <kbd>Ctrl+Z</kbd>）解释器会以0值退出。如果这没有起作用，你可以输入以下命令退出："<tt class="samp">import
sys; sys.exit()</tt>"。

<P>
The interpreter's line-editing features usually aren't very
sophisticated.  On <span class="Unix">Unix</span>, whoever installed the interpreter may have
enabled support for the GNU readline library, which adds more
elaborate interactive editing and history features. Perhaps the
quickest check to see whether command line editing is supported is
typing Control-P to the first Python prompt you get.  If it beeps, you
have command line editing; see Appendix <A HREF="node14.html#interacting">A</A> for an
introduction to the keys.  If nothing appears to happen, or if
<code>P</code> is echoed, command line editing isn't available; you'll
only be able to use backspace to remove characters from the current
line.

<P>
解释器的行编辑功能并不很复杂。装在<span class="Unix">Unix</span>上的解释器可能会有 GNU readline 库支持，这样就可以额外得到精巧的交互编辑和历史记录功能。可能检查命令行编辑器支持能力最方便的方式是在主提示符下输入Ctrl-P。如果有嘟嘟声（计算机扬声器），说明你可以使用命令行编辑功能，从附录 A <A HREF="node14.html#interacting">A</A> 可以查到快捷键的介绍。如果什么也没有发声，或者<code>P</code>显示了出来，说明命令行编辑功能不可用，你只有用退格键删掉输入的命令了。

<P>
The interpreter operates somewhat like the <span class="Unix">Unix</span> shell: when called
with standard input connected to a tty device, it reads and executes
commands interactively; when called with a file name argument or with
a file as standard input, it reads and executes a <em>script</em> from
that file. 

<P>
解释器的操作有些像 <span class="Unix">Unix</span> Shell：使用终端设备做为标准输入来调用它时，解释器交互的解读和执行命令，通过文件名参数或以文件做为标准输入设备时，它从文件中解读并执行<em>脚本</em>。

<P>
A second way of starting the interpreter is
"<tt class="samp"><b class="program">python</b> <b class="programopt">-c</b> <var>command</var> [arg] ...</tt>", which
executes the statement(s) in <var>command</var>, analogous to the shell's
<b class="programopt">-c</b> option.  Since Python statements often contain spaces
or other characters that are special to the shell, it is best to quote 
<var>command</var> in its entirety with double quotes.

<P>
启动解释器的第二个方法是"<tt class="samp"><b class="program">python</b> <b class="programopt">-c</b> <var>command</var> [arg] ...</tt>"，这种方法可以在命令行中直接执行语句，等同于Shell的 <b class="programopt">-c</b> 选项。因为Python语句通常会包括空格之类的特殊字符，所以最好把整个 <var>语句</var> 用双引号包起来。

<P>
Some Python modules are also useful as scripts.  These can be invoked using
"<tt class="samp"><b class="program">python</b> <b class="programopt">-m</b> <var>module</var> [arg] ...</tt>", which
executes the source file for <var>module</var> as if you had spelled out its
full name on the command line.

<P>
有些 Python 模块也可以当作脚本使用。它们可以用 "<tt class="samp"><b class="program">python</b> <b class="programopt">-m</b> <var>module</var> [arg] ...</tt>" 调用，这样就会像你在命令行中给出其完整名字一样运行源文件。

<P>
Note that there is a difference between "<tt class="samp">python file</tt>" and
"<tt class="samp">python &lt;file</tt>".  In the latter case, input requests from the
program, such as calls to <tt class="function">input()</tt> and <tt class="function">raw_input()</tt>, are
satisfied from <em>file</em>.  Since this file has already been read
until the end by the parser before the program starts executing, the
program will encounter end-of-file immediately.  In the former case
(which is usually what you want) they are satisfied from whatever file
or device is connected to standard input of the Python interpreter.

<P>
注意"<tt class="samp">python file</tt>"和"<tt class="samp">python &lt;file</tt>"是有区别的。对于后一种情况，程序中类似于调用 <tt class="function">input()</tt><tt class="function">raw_input()</tt> 这样的输入请求，来自于确定的<em>文件</em>。因为在解析器开始执行之前，文件已经完全读入，所以程序指向文件尾。在前一种情况（这通常是你需要的）它们从来自于任何联接到 Python 解释器的标准输入，无论它们是文件还是其它设备。

<P>
When a script file is used, it is sometimes useful to be able to run
the script and enter interactive mode afterwards.  This can be done by
passing <b class="programopt">-i</b> before the script.  (This does not work if the
script is read from standard input, for the same reason as explained
in the previous paragraph.)

<P>
使用脚本文件时，经常会运行脚本然后进入交互模式。这也可以通过在脚本之前加上 <b class="programopt">-i</b> 参数来实现。（如果脚本来自标准输入，就不能这样运行，与前一段提到的原因一样。）

<P>

<H2><A NAME="SECTION004110000000000000000"></A><A NAME="argPassing"></A>
<BR>
2.1.1 Argument Passing 参数传递 
</H2>

<P>
When known to the interpreter, the script name and additional
arguments thereafter are passed to the script in the variable
<code>sys.argv</code>, which is a list of strings.  Its length is at least
one; when no script and no arguments are given, <code>sys.argv[0]</code> is
an empty string.  When the script name is given as <code>'-'</code> (meaning 
standard input), <code>sys.argv[0]</code> is set to <code>'-'</code>.  When
<b class="programopt">-c</b> <var>command</var> is used, <code>sys.argv[0]</code> is set to
<code>'-c'</code>.  When <b class="programopt">-m</b> <var>module</var> is used, <code>sys.argv[0]</code> 
is set to the full name of the located module.  Options found after 
<b class="programopt">-c</b> <var>command</var> or <b class="programopt">-m</b> <var>module</var> are not consumed 
by the Python interpreter's option processing but left in <code>sys.argv</code> for 
the command or module to handle.

<P>
调用解释器时，脚本名和附加参数传入一个名为 <code>sys.argv</code> 的字符串列表。没有给定脚本和参数时，它至少也有一个元素：<code>sys.argv[0]</code> 此时为空字符串。脚本名指定为 <code>'-'</code> （表示标准输入）时， <code>sys.argv[0]</code>被设定为<code>'-'</code>，使用
<b class="programopt">-c</b> <var>指令</var> 时， <code>sys.argv[0]</code> 被设定为<code>'-c'</code>。 使用<b class="programopt">-m</b> <var>module</var>参数时，<code>sys.agv[0]</code> 被设定为指定模块的全名。<b class="programopt">-c</b> <var>command</var> 或者 <b class="programopt">-m</b> <var>module</var> 之后的参数不会被
Python 解释器的选项处理机制所截获，而是留在<code>sys.argv</code> 中，供脚本命令操作。

<P>

<H2><A NAME="SECTION004120000000000000000"></A><A NAME="interactive"></A>
<BR>
2.1.2 Interactive Mode 交互模式
</H2>

<P>
When commands are read from a tty, the interpreter is said to be in
<em>interactive mode</em>.  In this mode it prompts for the next command
with the <em>primary prompt</em>, usually three greater-than signs
("<tt class="samp">&#187;&gt;&nbsp;</tt>"); for continuation lines it prompts with the
<em>secondary prompt</em>, by default three dots ("<tt class="samp">...&nbsp;</tt>").
The interpreter prints a welcome message stating its version number
and a copyright notice before printing the first prompt:

<P>
从 tty 读取命令时，我们称解释器工作于<em>交互模式</em> 。这种模式下它根据<em>主提示符</em>来执行，主提示符通常标识为三个大于号（ "<tt class="samp">&#187;&gt;&nbsp;</tt>" ）；继续的部分被称为 <em>从属提示符</em> ，由三个点标识（"<tt class="samp">...&nbsp;</tt>"）。在第一行之前，解释器打印欢迎信息、版本号和授权提示：

<P>
<div class="verbatim"><pre>
python
Python 1.5.2b2 (#1, Feb 28 1999, 00:02:06)  [GCC 2.8.1] on sunos5
Copyright 1991-1995 Stichting Mathematisch Centrum, Amsterdam
&gt;&gt;&gt;
</pre></div>

<P>
Continuation lines are needed when entering a multi-line construct.
As an example, take a look at this <tt class="keyword">if</tt> statement:

<P>
输入多行结构时需要从属提示符了，例如，下面这个 <tt class="keyword">if</tt> 语句：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; the_world_is_flat = 1
&gt;&gt;&gt; if the_world_is_flat:
...     print "Be careful not to fall off!"
... 
Be careful not to fall off!
</pre></div>

<P>

<H1><A NAME="SECTION004200000000000000000"></A><A NAME="interp"></A>
<BR>
2.2 The Interpreter and Its Environment 解释器及其环境
</H1>

<P>

<H2><A NAME="SECTION004210000000000000000"></A><A NAME="error"></A>
<BR>
2.2.1 Error Handling 错误处理
</H2>

<P>
When an error occurs, the interpreter prints an error
message and a stack trace.  In interactive mode, it then returns to
the primary prompt; when input came from a file, it exits with a
nonzero exit status after printing
the stack trace.  (Exceptions handled by an <tt class="keyword">except</tt> clause in a
<tt class="keyword">try</tt> statement are not errors in this context.)  Some errors are
unconditionally fatal and cause an exit with a nonzero exit; this
applies to internal inconsistencies and some cases of running out of
memory.  All error messages are written to the standard error stream;
normal output from executed commands is written to standard
output.

<P>
有错误发生时，解释器打印一个错误信息和栈跟踪器。交互模式下，它返回主提示符，如果从文件输入执行，它在打印栈跟踪器后以非零状态退出。（异常可以由 <tt class="keyword">try</tt> 语句中的 <tt class="keyword">except</tt> 子句来控制，这样就不会出现上文中的错误信息）有一些非常致命的错误会导致非零状态下退出，这由通常由内部矛盾和内存溢出造成。所有的错误信息都写入标准错误流；命令中执行的普通输出写入标准输出。

<P>
Typing the interrupt character (usually Control-C or DEL) to the
primary or secondary prompt cancels the input and returns to the
primary prompt.<A NAME="tex2html1"
  HREF="#foot204"><SUP>2.1</SUP></A>Typing an interrupt while a command is executing raises the
<tt class="exception">KeyboardInterrupt</tt> exception, which may be handled by a
<tt class="keyword">try</tt> statement.

<P>
在主提示符或附属提示符输入中断符（通常是Control-C 或者 DEL）就会取消当前输入，回到主命令行。 <A NAME="tex2html2"
  HREF="#foot207"><SUP>2.2</SUP></A>.执行命令时输入一个中断符会抛出一个 <tt class="exception">KeyboardInterrupt</tt> 异常，它可以被 <tt class="keyword">try</tt> 句截获。

<P>

<H2><A NAME="SECTION004220000000000000000"></A><A NAME="scripts"></A>
<BR>
2.2.2 Executable Python Scripts 执行Python脚本
</H2>

<P>
On BSD'ish <span class="Unix">Unix</span> systems, Python scripts can be made directly
executable, like shell scripts, by putting the line

<P>
BSD类的 <span class="Unix">Unix</span>系统中，Python 脚本可以像 Shell
脚本那样直接执行。只要在脚本文件开头写一行命令，指定文件和模式：

<P>
<div class="verbatim"><pre>
#! /usr/bin/env python
</pre></div>

<P>
(assuming that the interpreter is on the user's <a class="envvar" id='l2h-1' xml:id='l2h-1'>PATH</a>) at the
beginning of the script and giving the file an executable mode.  The
"<tt class="samp">#!</tt>" must be the first two characters of the file.  On some
platforms, this first line must end with a <span class="Unix">Unix</span>-style line ending
("<tt class="character">&#92;n</tt>"), not a Mac OS ("<tt class="character">&#92;r</tt>") or Windows
("<tt class="character">&#92;r&#92;n</tt>") line ending.  Note that
the hash, or pound, character, "<tt class="character">#</tt>", is used to start a
comment in Python.

<P>
(要确认 Python 解释器在用户路径中) "<tt class="samp">#!</tt>" 必须是文件的前两个字符，在某些平台上，第一行必须以 <span class="Unix">Unix</span>风格的行结束符（"<tt class="character">&#92;n</tt>"）结束，不能用Mac（"<tt class="character">&#92;r</tt>"）或Windows（"<tt class="character">&#92;r&#92;n</tt>"）的结束符。注意，"<tt class="character">#</tt>"是Python中是行注释的起始符。

<P>
The script can be given an executable mode, or permission, using the
<b class="program">chmod</b> command:

<P>
脚本可以通过 <b class="program">chmod</b> 命令指定执行模式和权限。

<P>
<div class="verbatim"><pre>
$ chmod +x myscript.py
</pre></div> 
<P>

<H2><A NAME="SECTION004230000000000000000">
2.2.3 Source Code Encoding 源程序编码</A>
</H2>

<P>
It is possible to use encodings different than ASCII in Python source
files. The best way to do it is to put one more special comment line
right after the <code>#!</code> line to define the source file encoding:

<P>
Python 的源文件可以通过编码使用 ASCII 以外的字符集。最好的做法是在 <code>#!</code> 行后面用一个特殊的注释行来定义字符集。

<P>
<div class="verbatim"><pre><TT>
 # -*- coding: <var>encoding</var> -*- 
 </TT></pre></div>

<P>
With that declaration, all characters in the source file will be treated as
having the encoding <var>encoding</var>, and it will be
possible to directly write Unicode string literals in the selected
encoding.  The list of possible encodings can be found in the
<em class="citetitle"><a
 href="../lib/lib.html"
 title="Python Library Reference"
 >Python Library Reference</a></em>, in the section
on <a class="ulink" href="../lib/module-codecs.html"
  ><tt class="module">codecs</tt></a>.

<P>
根据这个声明，Python 会尝试将文件中的字符编码转为 <var>encoding</var> 编码。并且，它尽可能的将指定的编码直接写成 Unicode 文本。在 <em class="citetitle"><a
 href="../lib/lib.html"
 title="Python 库参考手册"
 >Python 库参考手册</a></em> 中 <a class="ulink" href="../lib/module-codecs.html"
  ><tt class="module">codecs</tt></a> 部份可以找到可用的编码列表（根据个人经验，推荐使用 cp-936或utf-8处理中文－－译者注）。

<P>
For example, to write Unicode literals including the Euro currency
symbol, the ISO-8859-15 encoding can be used, with the Euro symbol
having the ordinal value 164.  This script will print the value 8364
(the Unicode codepoint corresponding to the Euro symbol) and then
exit:

<P>
例如，可以用 ISO-8859-15 编码可以用来编写包含欧元符号的 Unicode 文本，其编码值为 164。这个脚本会输出 8364 （欧元符号的 Unicode 对应编码）然后退出：

<P>
<div class="verbatim"><pre><TT>
 # -*- coding: iso-8859-15 -*-
 
 currency = u&#34;&#8364;&#34;
 print ord(currency)
 </TT></pre></div>

<P>
If your editor supports saving files as <code>UTF-8</code> with a UTF-8
<em>byte order mark</em> (aka BOM), you can use that instead of an
encoding declaration. IDLE supports this capability if
<code>Options/General/Default Source Encoding/UTF-8</code> is set. Notice
that this signature is not understood in older Python releases (2.2
and earlier), and also not understood by the operating system for
script files with <code>#!</code> lines (only used on <span class="Unix">Unix</span> systems).

<P>
如果你的文件编辑器支持 <code>UTF-8</code> 格式，并且可以保存 <code>UTF-8</code> 标记（<em>aka BOM - Byte Order Mark</em>），你可以用这个来代替编码声明。IDLE可以通过设定<code>Options/General/Default Source Encoding/UTF-8</code> 来支持它。需要注意的是旧版Python不支持这个标记（Python 2.2或更早的版本），同样支持<code>#!</code>行的操作系统也不会支持它（仅用于 <span class="Unix">Unix</span>系统）。

<P>
By using UTF-8 (either through the signature or an encoding
declaration), characters of most languages in the world can be used
simultaneously in string literals and comments.  Using non-ASCII
characters in identifiers is not supported. To display all these
characters properly, your editor must recognize that the file is
UTF-8, and it must use a font that supports all the characters in the
file.

<P>
使用 UTF-8 内码（无论是用标记还是编码声明），我们可以在字符串和注释中使用世界上的大部分语言。标识符中不能使用非 ASCII 字符集。为了正确显示所有的字符，你一定要在编辑器中将文件保存为 UTF-8 格式，而且要使用支持文件中所有字符的字体。

<P>

<H2><A NAME="SECTION004240000000000000000"></A><A NAME="startup"></A>
<BR>
2.2.4 The Interactive Startup File 交互式环境的启动文件
</H2>

<P>
When you use Python interactively, it is frequently handy to have some
standard commands executed every time the interpreter is started.  You
can do this by setting an environment variable named
<a class="envvar" id='l2h-2' xml:id='l2h-2'>PYTHONSTARTUP</a> to the name of a file containing your start-up
commands.  This is similar to the <span class="file">.profile</span> feature of the
<span class="Unix">Unix</span> shells.

<P>
使用 Python 解释器的时候，我们可能需要在每次解释器启动时执行一些命令。你可以在一个文件中包含你想要执行的命令，设定一个名为 <a class="envvar" id='l2h-3' xml:id='l2h-3'>PYTHONSTARTUP</a> 的环境变量来指定这个文件。这类似于 Unix shell的 <span class="file">.profile</span> 文件。

<P>
This file is only read in interactive sessions, not when Python reads
commands from a script, and not when <span class="file">/dev/tty</span> is given as the
explicit source of commands (which otherwise behaves like an
interactive session).  It is executed in the same namespace where
interactive commands are executed, so that objects that it defines or
imports can be used without qualification in the interactive session.
You can also change the prompts <code>sys.ps1</code> and <code>sys.ps2</code> in
this file.

<P>
这个文件在交互会话期是只读的，当 Python 从脚本中解读文件或以终端 <span class="file">/dev/tty</span>
做为外部命令源时则不会如此（尽管它们的行为很像是处在交互会话期。）它与解释器执行的命令处在同一个命名空间，所以由它定义或引用的一切可以在解释器中不受限制的使用。你也可以在这个文件中改变 <code>sys.ps1</code> 和 <code>sys.ps2</code> 指令。

<P>
If you want to read an additional start-up file from the current
directory, you can program this in the global start-up file using code
like "<tt class="samp">if os.path.isfile('.pythonrc.py'):
execfile('.pythonrc.py')</tt>".  If you want to use the startup file in a
script, you must do this explicitly in the script:

<P>
如果你想要在当前目录中执行附加的启动文件，可以在全局启动文件中加入类似以下的代码："<tt class="samp">if os.path.isfile('.pythonrc.py'): execfile('.pythonrc.py')</tt>"。如果你想要在某个脚本中使用启动文件，必须要在脚本中写入这样的语句：

<P>
<div class="verbatim"><pre>
import os
filename = os.environ.get('PYTHONSTARTUP')
if filename and os.path.isfile(filename):
    execfile(filename)
</pre></div>

<P>
<BR><HR><H4>Footnotes</H4>
<DL>
<DT><A NAME="foot204">... prompt.</A><A
 HREF="node4.html#tex2html1"><SUP>2.1</SUP></A></DT>
<DD>
        A problem with the GNU Readline package may prevent this.


</DD>
<DT><A NAME="foot207">... DEL）就会取消当前输入，回到主命令行。</A><A
 HREF="node4.html#tex2html2"><SUP>2.2</SUP></A></DT>
<DD>GNU readline 包的一个问题可能会造成它无法正常工作。

</DD>
</DL>

