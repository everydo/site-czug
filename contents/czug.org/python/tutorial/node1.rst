<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node3.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node3.html</a></p>

<H1><A NAME="SECTION003000000000000000000"></A><A NAME="intro"></A>
<BR>
1. Whetting Your Appetite 开胃菜 
</H1>

<P>
If you do much work on computers, eventually you find that there's
some task you'd like to automate.  For example, you may wish to
perform a search-and-replace over a large number of text files, or
rename and rearrange a bunch of photo files in a complicated way.
Perhaps you'd like to write a small custom database, or a specialized
GUI application, or a simple game.

<P>
假设如果你要用计算机做很多工作，你希望有些任务可以自动完成。例如，你可能希望在大量的文本文件中进行查找替换操作，也许是通过复杂的方式重命名并重新摆放一批图像文件。可能你喜欢写个小的定制数据库，或者特殊的GUI应用程序，或者简单的游戏。

<P>
If you're a professional software developer, you may have to work with
several C/C++/Java libraries but find the usual
write/compile/test/re-compile cycle is too slow.  Perhaps you're
writing a test suite for such a library and find writing the testing
code a tedious task.  Or maybe you've written a program that could use
an extension language, and you don't want to design and implement a
whole new language for your application.

<P>
如果你是个专业的软件开发者，你可能要用几个 C/C++/Java 库工作，但是发现通常的编写/编译/测试/重编译循环太慢了。可能你在给每个库编写对应的测试代码，但是发现这是一个烦人的活儿。或者你在编写一个带有扩展语言的程序，而你不想给你的应用程序设计和实现一门全新的语言。

<P>
Python is just the language for you.

<P>
Python 就是你需要的语言。

<P>
You could write a <span class="Unix">Unix</span> shell script or Windows batch files for some
of these tasks, but shell scripts are best at moving around files and
changing text data, not well-suited for GUI applications or games.
You could write a C/C++/Java program, but it can take a lot of
development time to get even a first-draft program.  Python is simpler
to use, available on Windows, MacOS X, and <span class="Unix">Unix</span> operating systems,
and will help you get the job done more quickly.

<P>
你能够针对一些任务编写 <span class="Unix">Unix</span> shell 脚本或者 Windows 批处理文件，但是脚本语言最擅长移动文件和修改文本数据，不适合 GUI 应用程序或者游戏。你能写 C/C++/Java程序，但是这些技术就是开发最简单的程序也要用去大量的开发时间。无论在 Windows、MacOS X 或者 <span class="Unix">Unix</span> 操作系统上，Python 非常易于使用，可以帮助你更快的完成任务。

<P>
Python is simple to use, but it is a real programming language,
offering much more structure and support for large programs than shell
scripts or batch files can offer.  On the other hand, Python also
offers much more error checking than C, and, being a
<em>very-high-level language</em>, it has high-level data types built
in, such as flexible arrays and dictionaries.  Because of its more
general data types Python is applicable to a much larger problem
domain than Awk or even Perl, yet many things are at
least as easy in Python as in those languages.

<P>
Python 很容易上手，但它是一门真正的编程语言，相对于 Shell，它提供的针对大型程序的支持和结构要多的多。另一方面，它提供了比 C 更多的错误检查，并且，做为一门<em>非常高级的语言</em>，它拥有内置的高级数据类型，例如可变数组和字典，如果通过 C 来实现的话，这些工作可能让你大干上几天的时间。因为拥有更多的通用数据类型，Python 
适合比 <em>Awk</em> 甚至 <em>Perl</em> 更广泛的问题领域，在其它的很多领域，Python 至少比别的语言要易用得多。

<P>
Python allows you to split your program into modules that can be
reused in other Python programs.  It comes with a large collection of
standard modules that you can use as the basis of your programs -- or
as examples to start learning to program in Python.  Some of these
modules provide things like file I/O, system calls,
sockets, and even interfaces to graphical user interface toolkits like Tk.

<P>
Python 可以让你把自己的程序分隔成不同的模块，以便在其它的 Python 程序中重用。这样你就可以让自己的程序基于一个很大的标准模块集或者用它们做为示例来学习 Python 编程。Python 中集成了一些类似文件 I/O，系统调用，sockets，甚至像 Tk 这样的图形工具接口。

<P>
Python is an interpreted language, which can save you considerable time
during program development because no compilation and linking is
necessary.  The interpreter can be used interactively, which makes it
easy to experiment with features of the language, to write throw-away
programs, or to test functions during bottom-up program development.
It is also a handy desk calculator.

<P>
Python是一门解释型语言，因为不需要编译和链接的时间，它可以帮你省下一些开发时间。解释器可以交互式使用，这样就可以很方便的测试语言中的各种功能，以便于编写发布用的程序，或者进行自下而上的开发。还可以当它是一个随手可用的计算器。

<P>
Python enables programs to be written compactly and readably.  Programs
written in Python are typically much shorter than equivalent C, 
C++, or Java programs, for several reasons:

<P>
Python 可以写出很紧凑和可读性很强的程序。用 Python 写的程序通常比同样的 C、C++ 或Java程序要短得多，这是因为以下几个原因：

<P>

<UL>
<LI>the high-level data types allow you to express complex operations in a
single statement;
</LI>
<LI>statement grouping is done by indentation instead of beginning and ending
brackets;
</LI>
<LI>no variable or argument declarations are necessary.

<P>
</LI>
<LI>高级数据结构使你可以在一个单独的语句中表达出很复杂的操作；
</LI>
<LI>语句的组织依赖于缩进而不是 begin/end 块； 
</LI>
<LI>不需要变量或参数声明。

<P>
</LI>
</UL>

<P>
Python is <em>extensible</em>: if you know how to program in C it is easy
to add a new built-in function or module to the interpreter, either to
perform critical operations at maximum speed, or to link Python
programs to libraries that may only be available in binary form (such
as a vendor-specific graphics library).  Once you are really hooked,
you can link the Python interpreter into an application written in C
and use it as an extension or command language for that application.

<P>
Python 是 <em>可扩展的</em>：如果你会用 C 语言写程序，那就可以很容易的为解释器添加新的集成模块和功能，或者优化瓶颈，使其达到最大速度，或者使 Python 能够链接到所需的二进制架构上（比如某个专用的商业图形库）。等你真正熟悉这一切了，你就可以将 Python 集成进由 C 写成的程序，把 Python 当做这个程序的扩展或命令行语言。

<P>
By the way, the language is named after the BBC show ``Monty Python's
Flying Circus'' and has nothing to do with nasty reptiles.  Making
references to Monty Python skits in documentation is not only allowed,
it is encouraged!

<P>
顺便说一下，这个语言的名字来源于 BBC 的“Monty Python's Flying Circus”节目，和凶猛的爬虫没有任何关系。在文档中引用 Monty Python 典故不仅是允许的，而且还受到鼓励！

<P>
Now that you are all excited about Python, you'll want to examine it
in some more detail.  Since the best way to learn a language is
to use it, the tutorial invites you to play with the Python interpreter
as you read.

<P>
现在我们已经了解了 Python 中所有激动人心的东西，大概你想仔细的试试它了。学习一门语言最好的办法就是使用它，如你所读到的，本文会引领你运用 Python 解释器。

<P>
In the next chapter, the mechanics of using the interpreter are
explained.  This is rather mundane information, but essential for
trying out the examples shown later.

<P>
下一节中，我们直接说明解释器的用法。这没有什么神秘的内容，不过有助于我们练习后面展示的例子。

<P>
The rest of the tutorial introduces various features of the Python
language and system through examples, beginning with simple
expressions, statements and data types, through functions and modules,
and finally touching upon advanced concepts like exceptions
and user-defined classes.

<P>
本指南其它部分通过例子介绍了 Python 语言和系统的各种功能，开始是简单表达式、语法和数据类型，接下来是函数和模块，最后是诸如异常和自定义类这样的高级内容。

<P>


