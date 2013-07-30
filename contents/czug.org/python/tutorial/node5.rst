---
created: 
creator: panjy
description: ''
title: 模块
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node7.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node7.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node7.html#SECTION007100000000000000000">5.1 More on Modules 深入模块</a>
<UL>
<LI><A href="node7.html#SECTION007110000000000000000">5.1.1 The Module Search Path 模块搜索路径</a>
<LI><A href="node7.html#SECTION007120000000000000000">5.1.2 ``Compiled'' Python files Python“编译”文件</a>
</ul>
<LI><A href="node7.html#SECTION007200000000000000000">5.2 Standard Modules 标准模块</a>
<LI><A href="node7.html#SECTION007300000000000000000">5.3 The <tt class="function">dir()</tt> Function <tt class="function">dir()</tt> 函数</a>
<LI><A href="node7.html#SECTION007400000000000000000">5.4 Packages 包</a>
<UL>
<LI><A href="node7.html#SECTION007410000000000000000">5.4.1 Importing * From a Package</a>
<LI><A href="node7.html#SECTION007420000000000000000">5.4.2 Intra-package References 内置包（Intra-package）参考</a>
<LI><A href="node7.html#SECTION007430000000000000000">5.4.3 Packages in Multiple Directories 多重路径中的包</a>
</ul></ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION007000000000000000000"></A><A NAME="modules"></A>
<BR>
5. Modules 模块 
</H1>

<P>
If you quit from the Python interpreter and enter it again, the
definitions you have made (functions and variables) are lost.
Therefore, if you want to write a somewhat longer program, you are
better off using a text editor to prepare the input for the interpreter
and running it with that file as input instead.  This is known as creating a
<em>script</em>.  As your program gets longer, you may want to split it
into several files for easier maintenance.  You may also want to use a
handy function that you've written in several programs without copying
its definition into each program.

<P>
如果你退出 Python 解释器重新进入，以前创建的一切定义（变量和函数）就全部丢失了。因此，如果你想写一些长久保存的程序，最好使用一个文本编辑器来编写程序，把保存好的文件输入解释器。我们称之为创建一个<em>脚本</em>。程序变得更长一些了，你可能为了方便维护而把它分离成几个文件。你也可能想要在几个程序中都使用一个常用的函数，但是不想把它的定义复制到每一个程序里。

<P>
To support this, Python has a way to put definitions in a file and use
them in a script or in an interactive instance of the interpreter.
Such a file is called a <em>module</em>; definitions from a module can be
<em>imported</em> into other modules or into the <em>main</em> module (the
collection of variables that you have access to in a script
executed at the top level
and in calculator mode).

<P>
为了满足这些需要，Python提供了一个方法可以从文件中获取定义，在脚本或者解释器的一个交互式实例中使用。这样的文件被称为<em>模块</em>；模块中的定义可以<em>导入</em>到另一个模块或主模块中（在脚本执行时可以调用的变量集位于最高级，并且处于计算器模式）

<P>
A module is a file containing Python definitions and statements.  The
file name is the module name with the suffix <span class="file">.py</span> appended.  Within
a module, the module's name (as a string) is available as the value of
the global variable <code>__name__</code>.  For instance, use your favorite text
editor to create a file called <span class="file">fibo.py</span> in the current directory
with the following contents:

<P>
模块是包 括Python 定义和声明的文件。文件名就是模块名加上 <span class="file">.py</span> 后缀。模块的模块名（做为一个字符串）可以由全局变量 <code>__name__</code> 得到。例如，你可以用自己惯用的文件编辑器在当前目录下创建一个叫 <span class="file">fibo.py</span> 的文件，录入如下内容：

<P>
<div class="verbatim"><pre>
# Fibonacci numbers module

def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while b &lt; n:
        print b,
        a, b = b, a+b

def fib2(n): # return Fibonacci series up to n
    result = []
    a, b = 0, 1
    while b &lt; n:
        result.append(b)
        a, b = b, a+b
    return result
</pre></div>

<P>
Now enter the Python interpreter and import this module with the
following command:

<P>
现在进入Python解释器，用如下命令导入这个模块：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import fibo
</pre></div>

<P>
This does not enter the names of the functions defined in <code>fibo</code> 
directly in the current symbol table; it only enters the module name
<code>fibo</code> there.
Using the module name you can access the functions:

<P>
这样做不会直接把 <code>fibo</code>中的函数导入当前的语义表；它只是引入了模块名 <code>fibo</code>。你可以通过模块名按如下方式访问这个函数：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; fibo.fib(1000)
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
&gt;&gt;&gt; fibo.fib2(100)
[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
&gt;&gt;&gt; fibo.__name__
'fibo'
</pre></div>

<P>
If you intend to use a function often you can assign it to a local name:

<P>
如果你想要直接调用函数，通常可以给它赋一个本地名称：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; fib = fibo.fib
&gt;&gt;&gt; fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
</pre></div>

<P>

<H1><A NAME="SECTION007100000000000000000"></A><A NAME="moreModules"></A>
<BR>
5.1 More on Modules 深入模块 
</H1>

<P>
A module can contain executable statements as well as function
definitions.
These statements are intended to initialize the module.
They are executed only the
<em>first</em> time the module is imported somewhere.<A NAME="tex2html7"
  HREF="#foot859"><SUP>5.1</SUP></A>
<P>
模块可以像函数定义一样包含执行语句。这些语句通常用于初始化模块。它们只在模块<em>第一次</em>导入时执行一次。<A NAME="tex2html8"
  HREF="#foot861"><SUP>5.2</SUP></A>
<P>
Each module has its own private symbol table, which is used as the
global symbol table by all functions defined in the module.
Thus, the author of a module can use global variables in the module
without worrying about accidental clashes with a user's global
variables.
对应于定义模块中所有函数的全局语义表，每一个模块有自己的私有语义表。因此，模块作者可以在模块中使用一些全局变量，不会因为与用户的全局变量冲突而引发错误。
On the other hand, if you know what you are doing you can touch a
module's global variables with the same notation used to refer to its
functions,
<code>modname.itemname</code>.
另一方面，如果你确定你需要这个，可以像引用模块中的函数一样获取模块中的全局变量，形如：<code>modname.itemname</code>。

<P>
Modules can import other modules.  It is customary but not required to
place all <tt class="keyword">import</tt> statements at the beginning of a module (or
script, for that matter).  The imported module names are placed in the
importing module's global symbol table.

<P>
模块可以导入（import）其它模块。习惯上所有的 <tt class="keyword">import</tt> 语句都放在模块（或脚本，等等）的开头，但这并不是必须的。被导入的模块名入在本模块的全局语义表中。

<P>
There is a variant of the <tt class="keyword">import</tt> statement that imports
names from a module directly into the importing module's symbol
table.  For example:

<P>
<tt class="keyword">import</tt> 语句的一个变体直接从被导入的模块中导入命名到本模块的语义表中。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; from fibo import fib, fib2
&gt;&gt;&gt; fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
</pre></div>

<P>
This does not introduce the module name from which the imports are taken
in the local symbol table (so in the example, <code>fibo</code> is not
defined).

<P>
这样不会从局域语义表中导入模块名（如上所示， <code>fibo</code>没有定义）。

<P>
There is even a variant to import all names that a module defines:

<P>
甚至有种方式可以导入模块中的所有定义：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; from fibo import *
&gt;&gt;&gt; fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
</pre></div>

<P>
This imports all names except those beginning with an underscore
(<code>_</code>).

<P>
这样可以导入所有除了以下划线(<code>_</code>)开头的命名。

<P>

<H2><A NAME="SECTION007110000000000000000"></A><A NAME="searchPath"></A>
<BR>
5.1.1 The Module Search Path 模块搜索路径 
</H2>

<P>
<a id='l2h-23' xml:id='l2h-23'></a>When a module named <tt class="module">spam</tt> is imported, the interpreter searches
for a file named <span class="file">spam.py</span> in the current directory,
and then in the list of directories specified by
the environment variable <a class="envvar" id='l2h-24' xml:id='l2h-24'>PYTHONPATH</a>.  This has the same syntax as
the shell variable <a class="envvar" id='l2h-25' xml:id='l2h-25'>PATH</a>, that is, a list of
directory names.  When <a class="envvar" id='l2h-26' xml:id='l2h-26'>PYTHONPATH</a> is not set, or when the file
is not found there, the search continues in an installation-dependent
default path; on <span class="Unix">Unix</span>, this is usually <span class="file">.:/usr/local/lib/python</span>.

<P>
导入一个叫 <tt class="module">spam</tt> 的模块时，解释器先在当前目录中搜索名为 <span class="file">spam.py</span> 的文件，然后在环境变量 <a class="envvar" id='l2h-27' xml:id='l2h-27'>PYTHONPATH</a> 表示的目录列表中搜索，然后是环境变量 <a class="envvar" id='l2h-28' xml:id='l2h-28'>PATH</a> 中的路径列表。如果 <a class="envvar" id='l2h-29' xml:id='l2h-29'>PYTHONPATH</a> 没有设置，或者文件没有找到，接下来搜索安装目录，在 <span class="Unix">Unix</span>中，通常是 <span class="file">.:/usr/local/lib/python</span>。

<P>
Actually, modules are searched in the list of directories given by the 
variable <code>sys.path</code> which is initialized from the directory 
containing the input script (or the current directory),
<a class="envvar" id='l2h-30' xml:id='l2h-30'>PYTHONPATH</a> and the installation-dependent default.  This allows
Python programs that know what they're doing to modify or replace the 
module search path.  Note that because the directory containing the
script being run is on the search path, it is important that the
script not have the same name as a standard module, or Python will
attempt to load the script as a module when that module is imported.
This will generally be an error.  See section&nbsp;<A HREF="#standardModules">5.2</A>,
``Standard Modules,'' for more information.

<P>
实际上，解释器由 <code>sys.path</code> 变量指定的路径目录搜索模块，该变量初始化时默认包含了输入脚本（或者当前目录），<a class="envvar" id='l2h-31' xml:id='l2h-31'>PYTHONPATH</a> 和安装目录。这样就允许Python程序（原文如此，programs；我猜想应该是“programer”，程序员－－译者）了解如何修改或替换模块搜索目录。需要注意的是由于这些目录中包含有搜索路径中运行的脚本，所以这些脚本不应该和标准模块重名，否则在导入模块时Python会尝试把这些脚本当作模块来加载。这通常会引发一个错误。请参见6.2节“标准模块（&nbsp;<A HREF="#standardModules">5.2</A>）”以了解更多的信息。

<P>

<H2><A NAME="SECTION007120000000000000000">
5.1.2 ``Compiled'' Python files Python“编译”文件 </A>
</H2>

<P>
As an important speed-up of the start-up time for short programs that
use a lot of standard modules, if a file called <span class="file">spam.pyc</span> exists
in the directory where <span class="file">spam.py</span> is found, this is assumed to
contain an already-``byte-compiled'' version of the module <tt class="module">spam</tt>.
The modification time of the version of <span class="file">spam.py</span> used to create
<span class="file">spam.pyc</span> is recorded in <span class="file">spam.pyc</span>, and the
<span class="file">.pyc</span> file is ignored if these don't match.

<P>
对于引用了大量标准模块的短程序，有一个提高启动速度的重要方法，如果在 <span class="file">spam.py</span> 所在的目录下存在一个名为 <span class="file">spam.pyc</span> 的文件，它会被视为 <tt class="module">spam</tt> 模块的预“编译”（``byte-compiled'' ，二进制编译）版本。用于创建 <span class="file">spam.pyc</span> 的这一版 <span class="file">spam.py</span> 的修改时间记录在 <span class="file">spam.pyc</span> 文件中，如果两者不匹配，<span class="file">.pyc</span> 文件就被忽略。

<P>
Normally, you don't need to do anything to create the
<span class="file">spam.pyc</span> file.  Whenever <span class="file">spam.py</span> is successfully
compiled, an attempt is made to write the compiled version to
<span class="file">spam.pyc</span>.  It is not an error if this attempt fails; if for any
reason the file is not written completely, the resulting
<span class="file">spam.pyc</span> file will be recognized as invalid and thus ignored
later.  The contents of the <span class="file">spam.pyc</span> file are platform
independent, so a Python module directory can be shared by machines of
different architectures.

<P>
通常你不需要为创建 <span class="file">spam.pyc</span> 文件做任何工作。一旦 <span class="file">spam.py</span> 成功编译，就会试图编译对应版本的 <span class="file">spam.pyc</span>。如果有任何原因导致写入不成功，返回的 <span class="file">spam.pyc</span> 文件就会视为无效，随后即被忽略。 <span class="file">spam.pyc</span> 文件的内容是平台独立的，所以Python模块目录可以在不同架构的机器之间共享。

<P>
Some tips for experts:

<P>
部分高级技巧：

<P>

<UL>
<LI>When the Python interpreter is invoked with the <b class="programopt">-O</b> flag,
optimized code is generated and stored in <span class="file">.pyo</span> files.  The
optimizer currently doesn't help much; it only removes
<tt class="keyword">assert</tt> statements.  When <b class="programopt">-O</b> is used, <em>all</em>
bytecode is optimized; <code>.pyc</code> files are ignored and <code>.py</code>
files are compiled to optimized bytecode.

<P>
以 <b class="programopt">-O</b> 参数调用Python解释器时，会生成优化代码并保存在 <span class="file">.pyo</span> 文件中。现在的优化器没有太多帮助；它只是删除了断言（<tt class="keyword">assert</tt> ）语句。使用 <b class="programopt">-O</b> 参参数，所有的代码都会被优化；<code>.pyc</code> 文件被忽略， <code>.py</code>文件被编译为优化代码。

<P>
</LI>
<LI>Passing two <b class="programopt">-O</b> flags to the Python interpreter
(<b class="programopt">-OO</b>) will cause the bytecode compiler to perform
optimizations that could in some rare cases result in malfunctioning
programs.  Currently only <code>__doc__</code> strings are removed from the
bytecode, resulting in more compact <span class="file">.pyo</span> files.  Since some
programs may rely on having these available, you should only use this
option if you know what you're doing.

<P>
向Python解释器传递两个 <b class="programopt">-O</b> 参数（<b class="programopt">-OO</b>）会执行完全优化的二进制优化编译，这偶尔会生成错误的程序。现在的优化器，只是从二进制代码中删除了 <code>__doc__</code> 符串，生成更为紧凑的 <span class="file">.pyo</span> 文件。因为某些程序依赖于这些变量的可用性，你应该只在确定无误的场合使用这一选项。

<P>
</LI>
<LI>A program doesn't run any faster when it is read from a <span class="file">.pyc</span> or
<span class="file">.pyo</span> file than when it is read from a <span class="file">.py</span> file; the only
thing that's faster about <span class="file">.pyc</span> or <span class="file">.pyo</span> files is the
speed with which they are loaded.

<P>
来自 <span class="file">.pyc</span> 文件或 <span class="file">.pyo</span> 文件中的程序不会比来自 <span class="file">.py</span> 文件的运行更快； <span class="file">.pyc</span> 或 <span class="file">.pyo</span> 文件只是在它们加载的时候更快一些。

<P>
</LI>
<LI>When a script is run by giving its name on the command line, the
bytecode for the script is never written to a <span class="file">.pyc</span> or
<span class="file">.pyo</span> file.  Thus, the startup time of a script may be reduced
by moving most of its code to a module and having a small bootstrap
script that imports that module.  It is also possible to name a
<span class="file">.pyc</span> or <span class="file">.pyo</span> file directly on the command line.

<P>
通过脚本名在命令行运行脚本时，不会将为该脚本创建的二进制代码写入 <span class="file">.pyc</span> 或<span class="file">.pyo</span> 文件。当然，把脚本的主要代码移进一个模块里，然后用一个小的启动脚本导入这个模块，就可以提高脚本的启动速度。也可以直接在命令行中指定一个 <span class="file">.pyc</span> 或 <span class="file">.pyo</span> 文件。

<P>
</LI>
<LI>It is possible to have a file called <span class="file">spam.pyc</span> (or
<span class="file">spam.pyo</span> when <b class="programopt">-O</b> is used) without a file
<span class="file">spam.py</span> for the same module.  This can be used to distribute a
library of Python code in a form that is moderately hard to reverse
engineer.

<P>
对于同一个模块（这里指例程 <span class="file">spam.py</span> －－译者），可以只有 <span class="file">spam.pyc</span> 文件（或者 <span class="file">spam.pyc</span> ，在使用 <b class="programopt">-O</b> 参数时）而没有 <span class="file">spam.py</span> 文件。这样可以打包发布比较难于逆向工程的Python代码库。

<P>
</LI>
<LI>The module <a class="ulink" href="../lib/module-compileall.html"
  ><tt class="module">compileall</tt></a> <a id='l2h-32' xml:id='l2h-32'></a> can create <span class="file">.pyc</span> files (or
<span class="file">.pyo</span> files when <b class="programopt">-O</b> is used) for all modules in a
directory.

<P>
<a class="ulink" href="../lib/module-compileall.html"
  ><tt class="module">compileall</tt></a> <a id='l2h-33' xml:id='l2h-33'></a> 模块 可以为指定目录中的所有模块创建 <span class="file">.pyc</span> 文件（或者使用 <span class="file">.pyo</span> 参数创建.pyo文件）。

<P>
</LI>
</UL>

<P>

<H1><A NAME="SECTION007200000000000000000"></A><A NAME="standardModules"></A>
<BR>
5.2 Standard Modules 标准模块
</H1>

<P>
Python comes with a library of standard modules, described in a separate
document, the <em class="citetitle"><a
 href="../lib/lib.html"
 title="Python Library Reference"
 >Python Library Reference</a></em>
(``Library Reference'' hereafter).  Some modules are built into the
interpreter; these provide access to operations that are not part of
the core of the language but are nevertheless built in, either for
efficiency or to provide access to operating system primitives such as
system calls.  The set of such modules is a configuration option which
also depends on the underlying platform  For example,
the <tt class="module">amoeba</tt> module is only provided on systems that somehow
support Amoeba primitives.  One particular module deserves some
attention: <a class="ulink" href="../lib/module-sys.html"
  ><tt class="module">sys</tt></a><a id='l2h-34' xml:id='l2h-34'></a>, which is built into every 
Python interpreter.  The variables <code>sys.ps1</code> and
<code>sys.ps2</code> define the strings used as primary and secondary
prompts:

<P>
Python带有一个标准模块库，并发布有独立的文档，名为 <em class="citetitle"><a
 href="../lib/lib.html"
 title="Python 库参考手册"
 >Python 库参考手册</a></em> （此后称其为“库参考手册”）。有一些模块内置于解释器之中，这些操作的访问接口不是语言内核的一部分，但是已经内置于解释器了。这既是为了提高效率，也是为了给系统调用等操作系统原生访问提供接口。这类模块集合是一个依赖于底层平台的配置选项。例如，<tt class="module">amoeba</tt> 模块只提供对 Amoeba 原生系统的支持。有一个具体的模块值得注意：<a class="ulink" href="../lib/module-sys.html"
  ><tt class="module">sys</tt></a><a id='l2h-35' xml:id='l2h-35'></a> ，这个模块内置于所有的Python解释器。变量 <code>sys.ps1</code> 和 <code>sys.ps2</code>定义了主提示符和副助提示符字符串：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import sys
&gt;&gt;&gt; sys.ps1
'&gt;&gt;&gt; '
&gt;&gt;&gt; sys.ps2
'... '
&gt;&gt;&gt; sys.ps1 = 'C&gt; '
C&gt; print 'Yuck!'
Yuck!
C&gt;
</pre></div>

<P>
These two variables are only defined if the interpreter is in
interactive mode.

<P>
这两个变量只在解释器的交互模式下有意义。

<P>
The variable <code>sys.path</code> is a list of strings that determines the
interpreter's search path for modules. It is initialized to a default
path taken from the environment variable <a class="envvar" id='l2h-36' xml:id='l2h-36'>PYTHONPATH</a>, or from
a built-in default if <a class="envvar" id='l2h-37' xml:id='l2h-37'>PYTHONPATH</a> is not set.  You can modify
it using standard list operations: 

<P>
变量 <code>sys.path</code> 是解释器模块搜索路径的字符串列表。它由环境变量 <a class="envvar" id='l2h-38' xml:id='l2h-38'>PYTHONPATH</a> 初始化，如果没有设定 <a class="envvar" id='l2h-39' xml:id='l2h-39'>PYTHONPATH</a> ，就由内置的默认值初始化。你可以用标准的字符串操作修改它：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import sys
&gt;&gt;&gt; sys.path.append('/ufs/guido/lib/python')
</pre></div>

<P>

<H1><A NAME="SECTION007300000000000000000"></A><A NAME="dir"></A>
<BR>
5.3 The <tt class="function">dir()</tt> Function <tt class="function">dir()</tt> 函数 
</H1>

<P>
The built-in function <tt class="function">dir()</tt> is used to find out which names
a module defines.  It returns a sorted list of strings:

<P>
内置函数 <tt class="function">dir()</tt> 用于按模块名搜索模块定义，它返回一个字符串类型的存储列表：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import fibo, sys
&gt;&gt;&gt; dir(fibo)
['__name__', 'fib', 'fib2']
&gt;&gt;&gt; dir(sys)
['__displayhook__', '__doc__', '__excepthook__', '__name__', '__stderr__',
 '__stdin__', '__stdout__', '_getframe', 'api_version', 'argv', 
 'builtin_module_names', 'byteorder', 'callstats', 'copyright',
 'displayhook', 'exc_clear', 'exc_info', 'exc_type', 'excepthook',
 'exec_prefix', 'executable', 'exit', 'getdefaultencoding', 'getdlopenflags',
 'getrecursionlimit', 'getrefcount', 'hexversion', 'maxint', 'maxunicode',
 'meta_path', 'modules', 'path', 'path_hooks', 'path_importer_cache',
 'platform', 'prefix', 'ps1', 'ps2', 'setcheckinterval', 'setdlopenflags',
 'setprofile', 'setrecursionlimit', 'settrace', 'stderr', 'stdin', 'stdout',
 'version', 'version_info', 'warnoptions']
</pre></div>

<P>
Without arguments, <tt class="function">dir()</tt> lists the names you have defined
currently:

<P>
无参数调用时， <tt class="function">dir()</tt> 函数返回当前定义的命名：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; a = [1, 2, 3, 4, 5]
&gt;&gt;&gt; import fibo
&gt;&gt;&gt; fib = fibo.fib
&gt;&gt;&gt; dir()
['__builtins__', '__doc__', '__file__', '__name__', 'a', 'fib', 'fibo', 'sys']
</pre></div>

<P>
Note that it lists all types of names: variables, modules, functions, etc.

<P>
注意该列表列出了所有类型的名称：变量，模块，函数，等等：

<P>
<tt class="function">dir()</tt> does not list the names of built-in functions and
variables.  If you want a list of those, they are defined in the
standard module <tt class="module">__builtin__</tt><a id='l2h-40' xml:id='l2h-40'></a>:

<P>
<tt class="function">dir()</tt> 不会列出内置函数和变量名。如果你想列出这些内容，它们在标准模块 <tt class="module">__builtin__</tt><a id='l2h-41' xml:id='l2h-41'></a>中定义：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import __builtin__
&gt;&gt;&gt; dir(__builtin__)
['ArithmeticError', 'AssertionError', 'AttributeError', 'DeprecationWarning',
 'EOFError', 'Ellipsis', 'EnvironmentError', 'Exception', 'False',
 'FloatingPointError', 'FutureWarning', 'IOError', 'ImportError',
 'IndentationError', 'IndexError', 'KeyError', 'KeyboardInterrupt',
 'LookupError', 'MemoryError', 'NameError', 'None', 'NotImplemented',
 'NotImplementedError', 'OSError', 'OverflowError', 
 'PendingDeprecationWarning', 'ReferenceError', 'RuntimeError',
 'RuntimeWarning', 'StandardError', 'StopIteration', 'SyntaxError',
 'SyntaxWarning', 'SystemError', 'SystemExit', 'TabError', 'True',
 'TypeError', 'UnboundLocalError', 'UnicodeDecodeError',
 'UnicodeEncodeError', 'UnicodeError', 'UnicodeTranslateError',
 'UserWarning', 'ValueError', 'Warning', 'WindowsError',
 'ZeroDivisionError', '_', '__debug__', '__doc__', '__import__',
 '__name__', 'abs', 'apply', 'basestring', 'bool', 'buffer',
 'callable', 'chr', 'classmethod', 'cmp', 'coerce', 'compile',
 'complex', 'copyright', 'credits', 'delattr', 'dict', 'dir', 'divmod',
 'enumerate', 'eval', 'execfile', 'exit', 'file', 'filter', 'float',
 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex',
 'id', 'input', 'int', 'intern', 'isinstance', 'issubclass', 'iter',
 'len', 'license', 'list', 'locals', 'long', 'map', 'max', 'min',
 'object', 'oct', 'open', 'ord', 'pow', 'property', 'quit', 'range',
 'raw_input', 'reduce', 'reload', 'repr', 'reversed', 'round', 'set',
 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super',
 'tuple', 'type', 'unichr', 'unicode', 'vars', 'xrange', 'zip']
</pre></div>

<P>

<H1><A NAME="SECTION007400000000000000000"></A><A NAME="packages"></A>
<BR>
5.4 Packages 包 
</H1>

<P>
Packages are a way of structuring Python's module namespace
by using ``dotted module names''.  For example, the module name
<tt class="module">A.B</tt> designates a submodule named "<tt class="samp">B</tt>" in a package named
"<tt class="samp">A</tt>".  Just like the use of modules saves the authors of different
modules from having to worry about each other's global variable names,
the use of dotted module names saves the authors of multi-module
packages like NumPy or the Python Imaging Library from having to worry
about each other's module names.

<P>
包通常是使用用“圆点模块名”的结构化模块命名空间。例如，名为 <tt class="module">A.B</tt> 的模块表示了名为 "<tt class="samp">B</tt>" 的包中名为 "<tt class="samp">A</tt>" 的子模块。正如同用模块来保存不同的模块架构可以避免全局变量之间的相互冲突，使用圆点模块名保存像 NumPy 或 Python Imaging Library 之类的不同类库架构可以避免模块之间的命名冲突。

<P>
Suppose you want to design a collection of modules (a ``package'') for
the uniform handling of sound files and sound data.  There are many
different sound file formats (usually recognized by their extension,
for example: <span class="file">.wav</span>, <span class="file">.aiff</span>, <span class="file">.au</span>), so you may need
to create and maintain a growing collection of modules for the
conversion between the various file formats.  There are also many
different operations you might want to perform on sound data (such as
mixing, adding echo, applying an equalizer function, creating an
artificial stereo effect), so in addition you will be writing a
never-ending stream of modules to perform these operations.  Here's a
possible structure for your package (expressed in terms of a
hierarchical filesystem):

<P>
假设你现在想要设计一个模块集（一个“包”）来统一处理声音文件和声音数据。存在几种不同的声音格式（通常由它们的扩展名来标识，例如：<span class="file">.wav</span> ， <span class="file">.aiff</span> ， <span class="file">.au</span>) ），于是，为了在不同类型的文件格式之间转换，你需要维护一个不断增长的包集合。可能你还想要对声音数据做很多不同的操作（例如混音，添加回声，应用平衡功能，创建一个人造效果），所以你要加入一个无限流模块来执行这些操作。你的包可能会是这个样子（通过分级的文件体系来进行分组）：

<P>
<div class="verbatim"><pre>
Sound/                          Top-level package
      __init__.py               Initialize the sound package
      Formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      Effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      Filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
</pre></div>

<P>
When importing the package, Python searches through the directories
on <code>sys.path</code> looking for the package subdirectory.

<P>
导入模块时，Python通过 <code>sys.path</code> 中的目录列表来搜索存放包的子目录。

<P>
The <span class="file">__init__.py</span> files are required to make Python treat the
directories as containing packages; this is done to prevent
directories with a common name, such as "<tt class="samp">string</tt>", from
unintentionally hiding valid modules that occur later on the module
search path. In the simplest case, <span class="file">__init__.py</span> can just be an
empty file, but it can also execute initialization code for the
package or set the <code>__all__</code> variable, described later.

<P>
必须要有一个 <span class="file">__init__.py</span> 文件的存在，才能使Python视该目录为一个包；这是为了防止某些目录使用了"<tt class="samp">string</tt>" 这样的通用名而无意中在随后的模块搜索路径中覆盖了正确的模块。最简单的情况下，<span class="file">__init__.py</span> 可以只是一个空文件，不过它也可能包含了包的初始化代码，或者设置了 <code>__all__</code> 变量，后面会有相关介绍。

<P>
Users of the package can import individual modules from the
package, for example:

<P>
包用户可以从包中导入合法的模块，例如：

<P>
<div class="verbatim"><pre>
import Sound.Effects.echo
</pre></div>

<P>
This loads the submodule <tt class="module">Sound.Effects.echo</tt>.  It must be referenced
with its full name.

<P>
这样就导入了 <tt class="module">Sound.Effects.echo</tt> 子模块。它必需通过完整的名称来引用。

<P>
<div class="verbatim"><pre>
Sound.Effects.echo.echofilter(input, output, delay=0.7, atten=4)
</pre></div>

<P>
An alternative way of importing the submodule is:

<P>
导入包时有一个可以选择的方式：

<P>
<div class="verbatim"><pre>
from Sound.Effects import echo
</pre></div>

<P>
This also loads the submodule <tt class="module">echo</tt>, and makes it available without
its package prefix, so it can be used as follows:

<P>
这样就加载了 <tt class="module">echo</tt> 子模块，并且使得它在没有包前缀的情况下也可以使用，所以它可以如下方式调用：

<P>
<div class="verbatim"><pre>
echo.echofilter(input, output, delay=0.7, atten=4)
</pre></div>

<P>
Yet another variation is to import the desired function or variable directly:

<P>
还有另一种变体用于直接导入函数或变量：

<P>
<div class="verbatim"><pre>
from Sound.Effects.echo import echofilter
</pre></div>

<P>
Again, this loads the submodule <tt class="module">echo</tt>, but this makes its function
<tt class="function">echofilter()</tt> directly available:

<P>
这样就又一次加载了 <tt class="module">echo</tt> 子模块，但这样就可以直接调用它的 <tt class="function">echofilter()</tt> 函数：

<P>
<div class="verbatim"><pre>
echofilter(input, output, delay=0.7, atten=4)
</pre></div>

<P>
Note that when using <code>from <var>package</var> import <var>item</var></code>, the
item can be either a submodule (or subpackage) of the package, or some 
other name defined in the package, like a function, class or
variable.  The <code>import</code> statement first tests whether the item is
defined in the package; if not, it assumes it is a module and attempts
to load it.  If it fails to find it, an
<tt class="exception">ImportError</tt> exception is raised.

<P>
需要注意的是使用 <code>from <var>package</var> import <var>item</var></code> 方式导入包时，这个子项（item）既可以是包中的一个子模块（或一个子包），也可以是包中定义的其它命名，像函数、类或变量。<code>import</code> 语句首先核对是否包中有这个子项，如果没有，它假定这是一个模块，并尝试加载它。如果没有找到它，会引发一个 <tt class="exception">ImportError</tt> 异常。

<P>
Contrarily, when using syntax like <code>import
<var>item.subitem.subsubitem</var></code>, each item except for the last must be
a package; the last item can be a module or a package but can't be a
class or function or variable defined in the previous item.

<P>
相反，使用类似<code>import <var>item.subitem.subsubitem</var></code> 这样的语法时，这些子项必须是包，最后的子项可以是包或模块，但不能是前面子项中定义的类、函数或变量。

<P>

<H2><A NAME="SECTION007410000000000000000"></A><A NAME="pkg-import-star"></A>
<BR>
5.4.1 Importing * From a Package 
</H2>

<P>
<a id='l2h-42' xml:id='l2h-42'></a>
Now what happens when the user writes <code>from Sound.Effects import
*</code>?  Ideally, one would hope that this somehow goes out to the
filesystem, finds which submodules are present in the package, and
imports them all.  Unfortunately, this operation does not work very
well on Mac and Windows platforms, where the filesystem does not
always have accurate information about the case of a filename!  On
these platforms, there is no guaranteed way to know whether a file
<span class="file">ECHO.PY</span> should be imported as a module <tt class="module">echo</tt>,
<tt class="module">Echo</tt> or <tt class="module">ECHO</tt>.  (For example, Windows 95 has the
annoying practice of showing all file names with a capitalized first
letter.)  The DOS 8+3 filename restriction adds another interesting
problem for long module names.

<P>
那么当用户写下 <code>from Sound.Effects import *</code> 时会发生什么事？理想中，总是希望在文件系统中找出包中所有的子模块，然后导入它们。不幸的是，这个操作在 Mac 和 Windows 平台上工作的并不太好，这些文件系统的文件大小写并不敏感！在这些平台上没有什么方法可以确保一个叫<span class="file">ECHO.PY</span> 的文件应该导入为模块 <tt class="module">echo</tt> 、 <tt class="module">Echo</tt> 或 <tt class="module">ECHO</tt> 。（例如，Windows 95有一个讨厌的习惯，它会把所有的文件名都显示为首字母大写的风格。）DOS 8+3文件名限制又给长文件名模块带来了另一个有趣的问题。

<P>
The only solution is for the package author to provide an explicit
index of the package.  The import statement uses the following
convention: if a package's <span class="file">__init__.py</span> code defines a list
named <code>__all__</code>, it is taken to be the list of module names that
should be imported when <code>from <var>package</var> import *</code> is
encountered.  It is up to the package author to keep this list
up-to-date when a new version of the package is released.  Package
authors may also decide not to support it, if they don't see a use for
importing * from their package.  For example, the file
<span class="file">Sounds/Effects/__init__.py</span> could contain the following code:

<P>
对于包的作者来说唯一的解决方案就是给提供一个明确的包索引。import 语句按如下条件进行转换：执行 <code>from <var>package</var> import *</code> 时，如果包中的 <span class="file">__init__.py</span> 代码定义了一个名为 <code>__all__</code> 的链表，就会按照链表中给出的模块名进行导入。新版本的包发布时作者可以任意更新这个链表。如果包作者不想 import * 的时候导入他们的包中所有模块，那么也可能会决定不支持它（import *）。例如， <span class="file">Sounds/Effects/__init__.py</span> 这个文件可能包括如下代码：

<P>
<div class="verbatim"><pre>
__all__ = ["echo", "surround", "reverse"]
</pre></div>

<P>
This would mean that <code>from Sound.Effects import *</code> would
import the three named submodules of the <tt class="module">Sound</tt> package.

<P>
这意味着 <code>from Sound.Effects import *</code> 语句会从 <tt class="module">Sound</tt> 包中导入以上三个已命名的子模块。

<P>
If <code>__all__</code> is not defined, the statement <code>from Sound.Effects
import *</code> does <em>not</em> import all submodules from the package
<tt class="module">Sound.Effects</tt> into the current namespace; it only ensures that the
package <tt class="module">Sound.Effects</tt> has been imported (possibly running any
initialization code in <span class="file">__init__.py</span>) and then imports whatever names are
defined in the package.  This includes any names defined (and
submodules explicitly loaded) by <span class="file">__init__.py</span>.  It also includes any
submodules of the package that were explicitly loaded by previous
import statements.  Consider this code:

<P>
如果没有定义 <code>__all__</code> ， <code>from Sound.Effects import *</code> 语句不会从 <tt class="module">Sound.Effects</tt> 包中导入所有的子模块。Effects 导入到当前的命名空间，只能确定的是导入了 Sound.Effects 包（可能会运行 <span class="file">__init__.py</span> 中的初始化代码）以及包中定义的所有命名会随之导入。这样就从 <span class="file">__init__.py</span> 中导入了每一个命名（以及明确导入的子模块）。同样也包括了前述的import语句从包中明确导入的子模块，考虑以下代码：

<P>
<div class="verbatim"><pre>
import Sound.Effects.echo
import Sound.Effects.surround
from Sound.Effects import *
</pre></div>

<P>
In this example, the echo and surround modules are imported in the
current namespace because they are defined in the
<tt class="module">Sound.Effects</tt> package when the <code>from...import</code> statement
is executed.  (This also works when <code>__all__</code> is defined.)

<P>
在这个例子中，echo和surround模块导入了当前的命名空间，这是因为执行 <code>from...import</code> 语句时它们已经定义在 <tt class="module">Sound.Effects</tt> 包中了（定义了 <code>__all__</code> 时也会同样工作）。

<P>
Note that in general the practice of importing <code>*</code> from a module or
package is frowned upon, since it often causes poorly readable code.
However, it is okay to use it to save typing in interactive sessions,
and certain modules are designed to export only names that follow
certain patterns.

<P>
需要注意的是习惯上不主张从一个包或模块中用 import <code>*</code> 导入所有模块，因为这样的通常意味着可读性会很差。然而，在交互会话中这样做可以减少输入，相对来说确定的模块被设计成只导出确定的模式中命名的那一部分。

<P>
Remember, there is nothing wrong with using <code>from Package
import specific_submodule</code>!  In fact, this is the
recommended notation unless the importing module needs to use
submodules with the same name from different packages.

<P>
记住， <code>from Package import specific_submodule</code> 没有错误！事实上，除非导入的模块需要使用其它包中的同名子模块，否则这是受到推荐的写法。

<P>

<H2><A NAME="SECTION007420000000000000000">
5.4.2 Intra-package References 内置包（Intra-package）参考 </A>
</H2>

<P>
The submodules often need to refer to each other.  For example, the
<tt class="module">surround</tt> module might use the <tt class="module">echo</tt> module.  In fact,
such references
are so common that the <tt class="keyword">import</tt> statement first looks in the
containing package before looking in the standard module search path.
Thus, the surround module can simply use <code>import echo</code> or
<code>from echo import echofilter</code>.  If the imported module is not
found in the current package (the package of which the current module
is a submodule), the <tt class="keyword">import</tt> statement looks for a top-level
module with the given name.

<P>
子模块之间经常需要互相引用。例如，<tt class="module">surround</tt> 模块可能会引用 <tt class="module">echo</tt> 模块。事实上，这样的引用如此普遍，以致于 <tt class="keyword">import</tt> 语句会先搜索包内部，然后才是标准模块搜索路径。因此 surround 模块可以简单的调用 <code>import echo</code> 或者 <code>from echo import echofilter</code> 。如果没有在当前的包中发现要导入的模块，<tt class="keyword">import</tt> 语句会依据指定名寻找一个顶级模块。

<P>
When packages are structured into subpackages (as with the
<tt class="module">Sound</tt> package in the example), there's no shortcut to refer
to submodules of sibling packages - the full name of the subpackage
must be used.  For example, if the module
<tt class="module">Sound.Filters.vocoder</tt> needs to use the <tt class="module">echo</tt> module
in the <tt class="module">Sound.Effects</tt> package, it can use <code>from
Sound.Effects import echo</code>.

<P>
如果包中使用了子包结构（就像示例中的 <tt class="module">Sound</tt> 包），不存在什么从邻近的包中引用子模块的便捷方法－－必须使用子包的全名。例如，如果 <tt class="module">Sound.Filters.vocoder</tt> 包需要使用 <tt class="module">Sound.Effects</tt> 包中的 <tt class="module">echosa</tt> 模块，它可以使用 <code>from Sound.Effects import echo</code> 。

<P>

<H2><A NAME="SECTION007430000000000000000">
5.4.3 Packages in Multiple Directories 多重路径中的包</A>
</H2>

<P>
Packages support one more special attribute, <tt class="member">__path__</tt>.  This
is initialized to be a list containing the name of the directory
holding the package's <span class="file">__init__.py</span> before the code in that file
is executed.  This variable can be modified; doing so affects future
searches for modules and subpackages contained in the package.

<P>
包支持一个更为特殊的变量， <tt class="member">__path__</tt> 。 在包的 <span class="file">__init__.py</span> 文件代码执行之前，该变量初始化一个目录名列表。该变量可以修改，它作用于包中的子包和模块的搜索功能。

<P>
While this feature is not often needed, it can be used to extend the
set of modules found in a package.

<P>
这个功能可以用于扩展包中的模块集，不过它不常用。

<P>
<BR><HR><H4>Footnotes</H4>
<DL>
<DT><A NAME="foot859">... somewhere.</A><A
 HREF="node7.html#tex2html7"><SUP>5.1</SUP></A></DT>
<DD>
        In fact function definitions are also `statements' that are
        `executed'; the execution enters the function name in the
        module's global symbol table.


</DD>
<DT><A NAME="foot861">...第一次导入时执行一次。</A><A
 HREF="node7.html#tex2html8"><SUP>5.2</SUP></A></DT>
<DD>
    事实上函数定义既是“声明”又是“可执行体”；执行体由函数在模块全局语义表中的命名导入。


</DD>
</DL>

