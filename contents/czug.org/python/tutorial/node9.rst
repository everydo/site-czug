---
created: 
creator: panjy
description: ''
title: 标准库概览
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node11.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node11.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node11.html#SECTION0011100000000000000000">9.1 Operating System Interface 操作系统接口</a>
<LI><A href="node11.html#SECTION0011200000000000000000">9.2 File Wildcards 文件通配符</a>
<LI><A href="node11.html#SECTION0011300000000000000000">9.3 Command Line Arguments 命令行参数</a>
<LI><A href="node11.html#SECTION0011400000000000000000">9.4 Error Output Redirection and Program Termination 错误输出重定向和程序终止</a>
<LI><A href="node11.html#SECTION0011500000000000000000">9.5 String Pattern Matching 字符串正则匹配</a>
<LI><A href="node11.html#SECTION0011600000000000000000">9.6 Mathematics 数学</a>
<LI><A href="node11.html#SECTION0011700000000000000000">9.7 Internet Access 互联网访问</a>
<LI><A href="node11.html#SECTION0011800000000000000000">9.8 Dates and Times 日期和时间</a>
<LI><A href="node11.html#SECTION0011900000000000000000">9.9 Data Compression 数据压缩</a>
<LI><A href="node11.html#SECTION00111000000000000000000">9.10 Performance Measurement 性能度量</a>
<LI><A href="node11.html#SECTION00111100000000000000000">9.11 Quality Control 质量控制</a>
<LI><A href="node11.html#SECTION00111200000000000000000">9.12 Batteries Included</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION0011000000000000000000"></A><A NAME="briefTour"></A>
<BR>
9. Brief Tour of the Standard Library 标准库概览 
</H1>

<P>

<H1><A NAME="SECTION0011100000000000000000"></A><A NAME="os-interface"></A>
<BR>
9.1 Operating System Interface 操作系统接口 
</H1>

<P>
The <a class="ulink" href="../lib/module-os.html"
  ><tt class="module">os</tt></a>
module provides dozens of functions for interacting with the
operating system:

<P>
<a class="ulink" href="../lib/module-os.html"
  ><tt class="module">os</tt></a> 模块提供了不少与操作系统相关联的函数。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import os
&gt;&gt;&gt; os.system('time 0:02')
0
&gt;&gt;&gt; os.getcwd()      # Return the current working directory
'C:\\Python24'
&gt;&gt;&gt; os.chdir('/server/accesslogs')
</pre></div>

<P>
Be sure to use the "<tt class="samp">import os</tt>" style instead of
"<tt class="samp">from os import *</tt>".  This will keep <tt class="function">os.open()</tt> from
shadowing the builtin <tt class="function">open()</tt> function which operates much
differently.

<P>
应该用 "<tt class="samp">import os</tt>" 风格而非 "<tt class="samp">from os import *</tt>"。这样可以保证随操作系统不同而有所变化的 <tt class="function">os.open()</tt> 不会覆盖内置函数 <tt class="function">open()</tt>。

<P>
<a id='l2h-51' xml:id='l2h-51'></a>The builtin <tt class="function">dir()</tt> and <tt class="function">help()</tt> functions are useful
as interactive aids for working with large modules like <tt class="module">os</tt>:

<P>
在使用一些像 <tt class="module">os</tt> 这样的大型模块时内置的 <tt class="function">dir()</tt> 和 <tt class="function">help()</tt> 函数非常有用。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import os
&gt;&gt;&gt; dir(os)
&lt;returns a list of all module functions&gt;
&gt;&gt;&gt; help(os)
&lt;returns an extensive manual page created from the module's docstrings&gt;
</pre></div>

<P>
For daily file and directory management tasks, the 
<a class="ulink" href="../lib/module-shutil.html"
  ><tt class="module">shutil</tt></a>
module provides a higher level interface that is easier to use:

<P>
针对日常的文件和目录管理任务，<a class="ulink" href="../lib/module-shutil.html"
  ><tt class="module">shutil</tt></a>
模块提供了一个易于使用的高级接口。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import shutil
&gt;&gt;&gt; shutil.copyfile('data.db', 'archive.db')
&gt;&gt;&gt; shutil.move('/build/executables', 'installdir')
</pre></div>

<P>

<H1><A NAME="SECTION0011200000000000000000"></A><A NAME="file-wildcards"></A>
<BR>
9.2 File Wildcards 文件通配符 
</H1>

<P>
The <a class="ulink" href="../lib/module-glob.html"
  ><tt class="module">glob</tt></a>
module provides a function for making file lists from directory
wildcard searches:

<P>
<a class="ulink" href="../lib/module-glob.html"
  ><tt class="module">glob</tt></a> 模块提供了一个函数用于从目录通配符搜索中生成文件列表。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import glob
&gt;&gt;&gt; glob.glob('*.py')
['primes.py', 'random.py', 'quote.py']
</pre></div>

<P>

<H1><A NAME="SECTION0011300000000000000000"></A><A NAME="command-line-arguments"></A>
<BR>
9.3 Command Line Arguments 命令行参数 
</H1>

<P>
Common utility scripts often need to process command line arguments.
These arguments are stored in the
<a class="ulink" href="../lib/module-sys.html"
  ><tt class="module">sys</tt></a> module's <var>argv</var>
attribute as a list.  For instance the following output results from
running "<tt class="samp">python demo.py one two three</tt>" at the command line:

<P>
通用工具脚本经常调用命令行参数。这些命令行参数以链表形式存储于 <a class="ulink" href="../lib/module-sys.html"
  ><tt class="module">sys</tt></a> 模块的 <var>argv</var> 变量。例如在命令行中执行 "<tt class="samp">python demo.py one two three</tt>" 后可以得到以下输出结果：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import sys
&gt;&gt;&gt; print sys.argv
['demo.py', 'one', 'two', 'three']
</pre></div>

<P>
The <a class="ulink" href="../lib/module-getopt.html"
  ><tt class="module">getopt</tt></a>
module processes <var>sys.argv</var> using the conventions of the <span class="Unix">Unix</span>
<tt class="function">getopt()</tt> function.  More powerful and flexible command line
processing is provided by the
<a class="ulink" href="../lib/module-optparse.html"
  ><tt class="module">optparse</tt></a> module.

<P>
<a class="ulink" href="../lib/module-getopt.html"
  ><tt class="module">getopt</tt></a> 模块使用 <span class="Unix">Unix</span> <tt class="function">getopt()</tt> 函处理 <var>sys.argv</var>。更多的复杂命令行处理由 <a class="ulink" href="../lib/module-optparse.html"
  ><tt class="module">optparse</tt></a> 模块提供。

<P>

<H1><A NAME="SECTION0011400000000000000000"></A><A NAME="stderr"></A>
<BR>
9.4 Error Output Redirection and Program Termination 错误输出重定向和程序终止 
</H1>

<P>
The <a class="ulink" href="../lib/module-sys.html"
  ><tt class="module">sys</tt></a>
module also has attributes for <var>stdin</var>, <var>stdout</var>, and
<var>stderr</var>.  The latter is useful for emitting warnings and error
messages to make them visible even when <var>stdout</var> has been redirected:

<P>
<a class="ulink" href="../lib/module-sys.html"
  ><tt class="module">sys</tt></a> 还有 <var>stdin</var>，<var>stdout</var> 和 <var>stderr</var> 属性，即使在 <var>stdout</var> 被重定向时，后者也可以用于显示警告和错误信息。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; sys.stderr.write('Warning, log file not found starting a new one\n')
Warning, log file not found starting a new one
</pre></div>

<P>
The most direct way to terminate a script is to use "<tt class="samp">sys.exit()</tt>".

<P>
大多脚本的定向终止都使用 "<tt class="samp">sys.exit()</tt>"。

<P>

<H1><A NAME="SECTION0011500000000000000000"></A><A NAME="string-pattern-matching"></A>
<BR>
9.5 String Pattern Matching 字符串正则匹配 
</H1>

<P>
The <a class="ulink" href="../lib/module-re.html"
  ><tt class="module">re</tt></a>
module provides regular expression tools for advanced string processing.
For complex matching and manipulation, regular expressions offer succinct,
optimized solutions:

<P>
<a class="ulink" href="../lib/module-re.html"
  ><tt class="module">re</tt></a> 模块为高级字符串处理提供了正则表达式工具。对于复杂的匹配和处理，正则表达式提供了简洁、优化的解决方案。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import re
&gt;&gt;&gt; re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest')
['foot', 'fell', 'fastest']
&gt;&gt;&gt; re.sub(r'(\b[a-z]+) \1', r'\1', 'cat in the the hat')
'cat in the hat'
</pre></div>

<P>
When only simple capabilities are needed, string methods are preferred
because they are easier to read and debug:

<P>
如果只需要简单的功能，应该首先考虑字符串方法，因为它们非常简单，易于阅读和调试。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 'tea for too'.replace('too', 'two')
'tea for two'
</pre></div>

<P>

<H1><A NAME="SECTION0011600000000000000000"></A><A NAME="mathematics"></A>
<BR>
9.6 Mathematics 数学 
</H1>

<P>
The <a class="ulink" href="../lib/module-math.html"
  ><tt class="module">math</tt></a> module gives
access to the underlying C library functions for floating point math:

<P>
<a class="ulink" href="../lib/module-math.html"
  ><tt class="module">math</tt></a> 模块为浮点运算提供了对底层C函数库的访问。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import math
&gt;&gt;&gt; math.cos(math.pi / 4.0)
0.70710678118654757
&gt;&gt;&gt; math.log(1024, 2)
10.0
</pre></div>

<P>
The <a class="ulink" href="../lib/module-random.html"
  ><tt class="module">random</tt></a>
module provides tools for making random selections:

<P>
<a class="ulink" href="../lib/module-random.html"
  ><tt class="module">random</tt></a> 提供了生成随机数的工具。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import random
&gt;&gt;&gt; random.choice(['apple', 'pear', 'banana'])
'apple'
&gt;&gt;&gt; random.sample(xrange(100), 10)   # sampling without replacement
[30, 83, 16, 4, 8, 81, 41, 50, 18, 33]
&gt;&gt;&gt; random.random()    # random float
0.17970987693706186
&gt;&gt;&gt; random.randrange(6)    # random integer chosen from range(6)
4
</pre></div>

<P>

<H1><A NAME="SECTION0011700000000000000000"></A><A NAME="internet-access"></A>
<BR>
9.7 Internet Access 互联网访问 
</H1>

<P>
There are a number of modules for accessing the internet and processing
internet protocols. Two of the simplest are
<a class="ulink" href="../lib/module-urllib2.html"
  ><tt class="module">urllib2</tt></a>
for retrieving data from urls and
<a class="ulink" href="../lib/module-smtplib.html"
  ><tt class="module">smtplib</tt></a> 
for sending mail:

<P>
有几个模块用于访问互联网以及处理网络通信协议。其中最简单的两个是用于处理从 urls 接收的数据的 <a class="ulink" href="../lib/module-urllib2.html"
  ><tt class="module">urllib2</tt></a> 以及用于发送电子邮件的 <a class="ulink" href="../lib/module-smtplib.html"
  ><tt class="module">smtplib</tt></a>。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import urllib2
&gt;&gt;&gt; for line in urllib2.urlopen('http://tycho.usno.navy.mil/cgi-bin/timer.pl'):
...     if 'EST' in line or 'EDT' in line:  # look for Eastern Time
...         print line
    
&lt;BR&gt;Nov. 25, 09:43:32 PM EST

&gt;&gt;&gt; import smtplib
&gt;&gt;&gt; server = smtplib.SMTP('localhost')
&gt;&gt;&gt; server.sendmail('soothsayer@example.org', 'jcaesar@example.org',
"""To: jcaesar@example.org
From: soothsayer@example.org

Beware the Ides of March.
""")
&gt;&gt;&gt; server.quit()
</pre></div>

<P>

<H1><A NAME="SECTION0011800000000000000000"></A><A NAME="dates-and-times"></A>
<BR>
9.8 Dates and Times 日期和时间 
</H1>

<P>
The <a class="ulink" href="../lib/module-datetime.html"
  ><tt class="module">datetime</tt></a> module
supplies classes for manipulating dates and times in both simple
and complex ways. While date and time arithmetic is supported, the
focus of the implementation is on efficient member extraction for
output formatting and manipulation.  The module also supports objects
that are timezone aware.

<P>
<a class="ulink" href="../lib/module-datetime.html"
  ><tt class="module">datetime</tt></a> 模块为日期和时间处理同时提供了简单和复杂的方法。支持日期和时间算法的同时，实现的重点放在更有效的处理和格式化输出。该模块还支持时区处理。

<P>
<div class="verbatim"><pre>
# dates are easily constructed and formatted
&gt;&gt;&gt; from datetime import date
&gt;&gt;&gt; now = date.today()
&gt;&gt;&gt; now
datetime.date(2003, 12, 2)
&gt;&gt;&gt; now.strftime("%m-%d-%y. %d %b %Y is a %A on the %d day of %B.")
'12-02-03. 02 Dec 2003 is a Tuesday on the 02 day of December.'

# dates support calendar arithmetic
&gt;&gt;&gt; birthday = date(1964, 7, 31)
&gt;&gt;&gt; age = now - birthday
&gt;&gt;&gt; age.days
14368
</pre></div>

<P>

<H1><A NAME="SECTION0011900000000000000000"></A><A NAME="data-compression"></A>
<BR>
9.9 Data Compression 数据压缩 
</H1>

<P>
Common data archiving and compression formats are directly supported
by modules including:
<a class="ulink" href="../lib/module-zlib.html"
  ><tt class="module">zlib</tt></a>,
<a class="ulink" href="../lib/module-gzip.html"
  ><tt class="module">gzip</tt></a>,
<a class="ulink" href="../lib/module-bz2.html"
  ><tt class="module">bz2</tt></a>,
<a class="ulink" href="../lib/module-zipfile.html"
  ><tt class="module">zipfile</tt></a>, and
<a class="ulink" href="../lib/module-tarfile.html"
  ><tt class="module">tarfile</tt></a>.

<P>
以下模块直接支持通用的数据打包和压缩格式：

<P>
<a class="ulink" href="../lib/module-zlib.html"
  ><tt class="module">zlib</tt></a>，
<a class="ulink" href="../lib/module-gzip.html"
  ><tt class="module">gzip</tt></a>，
<a class="ulink" href="../lib/module-bz2.html"
  ><tt class="module">bz2</tt></a>，
<a class="ulink" href="../lib/module-zipfile.html"
  ><tt class="module">zipfile</tt></a>， 以及
<a class="ulink" href="../lib/module-tarfile.html"
  ><tt class="module">tarfile</tt></a>

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import zlib
&gt;&gt;&gt; s = 'witch which has which witches wrist watch'
&gt;&gt;&gt; len(s)
41
&gt;&gt;&gt; t = zlib.compress(s)
&gt;&gt;&gt; len(t)
37
&gt;&gt;&gt; zlib.decompress(t)
'witch which has which witches wrist watch'
&gt;&gt;&gt; zlib.crc32(s)
226805979
</pre></div>

<P>

<H1><A NAME="SECTION00111000000000000000000"></A><A NAME="performance-measurement"></A>
<BR>
9.10 Performance Measurement 性能度量 
</H1>

<P>
Some Python users develop a deep interest in knowing the relative
performance of different approaches to the same problem.
Python provides a measurement tool that answers those questions
immediately.

<P>
有些用户对了解解决同一问题的不同方法之间的性能差异很感兴趣。Python 提供了一个度量工具，为这些问题提供了直接答案。

<P>
For example, it may be tempting to use the tuple packing and unpacking
feature instead of the traditional approach to swapping arguments.
The <a class="ulink" href="../lib/module-timeit.html"
  ><tt class="module">timeit</tt></a> module
quickly demonstrates a modest performance advantage:

<P>
例如，使用元组封装和拆封来交换元素看起来要比使用传统的方法要诱人的多。<a class="ulink" href="../lib/module-timeit.html"
  ><tt class="module">timeit</tt></a>
证明了传统的方法更快一些。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; from timeit import Timer
&gt;&gt;&gt; Timer('t=a; a=b; b=t', 'a=1; b=2').timeit()
0.57535828626024577
&gt;&gt;&gt; Timer('a,b = b,a', 'a=1; b=2').timeit()
0.54962537085770791
</pre></div>

<P>
In contrast to <tt class="module">timeit</tt>'s fine level of granularity, the
<a class="ulink" href="../lib/module-profile.html"
  ><tt class="module">profile</tt></a> and <tt class="module">pstats</tt>
modules provide tools for identifying time critical sections in larger blocks
of code.

<P>
相对于 <tt class="module">timeit</tt> 的细粒度，<a class="ulink" href="../lib/module-profile.html"
  ><tt class="module">profile</tt></a> 和 <tt class="module">pstats</tt> 模块提供了针对更大代码块的时间度量工具。

<P>

<H1><A NAME="SECTION00111100000000000000000"></A><A NAME="quality-control"></A>
<BR>
9.11 Quality Control 质量控制 
</H1>

<P>
One approach for developing high quality software is to write tests for
each function as it is developed and to run those tests frequently during
the development process.

<P>
开发高质量软件的方法之一是为每一个函数开发测试代码，并且在开发过程中经常进行测试。

<P>
The <a class="ulink" href="../lib/module-doctest.html"
  ><tt class="module">doctest</tt></a> module provides
a tool for scanning a module and validating tests embedded in a program's
docstrings.  Test construction is as simple as cutting-and-pasting a
typical call along with its results into the docstring.  This improves
the documentation by providing the user with an example and it allows the
doctest module to make sure the code remains true to the documentation:

<P>
<a class="ulink" href="../lib/module-doctest.html"
  ><tt class="module">doctest</tt></a> 模块提供了一个工具，扫描模块并根据程序中内嵌的文档字符串执行测试。测试构造如同简单的将它的输出结果剪切并粘贴到文档字符串中。通过用户提供的例子，它发展了文档，允许 doctest 模块确认代码的结果是否与文档一致。

<P>
<div class="verbatim"><pre>
def average(values):
    """Computes the arithmetic mean of a list of numbers.

    &gt;&gt;&gt; print average([20, 30, 70])
    40.0
    """
    return sum(values, 0.0) / len(values)

import doctest
doctest.testmod()   # automatically validate the embedded tests
</pre></div>

<P>
The <a class="ulink" href="../lib/module-unittest.html"
  ><tt class="module">unittest</tt></a> module is not
as effortless as the <tt class="module">doctest</tt> module, but it allows a more
comprehensive set of tests to be maintained in a separate file:

<P>
<a class="ulink" href="../lib/module-unittest.html"
  ><tt class="module">unittest</tt></a> 模块不像 <tt class="module">doctest</tt> 模块那么容易使用，不过它可以在一个独立的文件里提供一个更全面的测试集。

<P>
<div class="verbatim"><pre>
import unittest

class TestStatisticalFunctions(unittest.TestCase):

    def test_average(self):
        self.assertEqual(average([20, 30, 70]), 40.0)
        self.assertEqual(round(average([1, 5, 7]), 1), 4.3)
        self.assertRaises(ZeroDivisionError, average, [])
        self.assertRaises(TypeError, average, 20, 30, 70)

unittest.main() # Calling from the command line invokes all tests
</pre></div>

<P>

<H1><A NAME="SECTION00111200000000000000000"></A><A NAME="batteries-included"></A>
<BR>
9.12 Batteries Included
</H1>

<P>
Python has a ``batteries included'' philosophy.  This is best seen
through the sophisticated and robust capabilities of its larger
packages. For example:

<P>
Python 体现了“batteries included”哲学。Python 可以通过更大的包的来得到应付各种复杂情况的强大能力，从这一点我们可以看出该思想的应用。例如：

<P>

<UL>
<LI>The <a class="ulink" href="../lib/module-xmlrpclib.html"
  ><tt class="module">xmlrpclib</tt></a> and
  <a class="ulink" href="../lib/module-SimpleXMLRPCServer.html"
  ><tt class="module">SimpleXMLRPCServer</tt></a>
  modules make implementing remote procedure calls into an almost trivial task.
  Despite the modules names, no direct knowledge or handling of XML is needed.

<P>
<a class="ulink" href="../lib/module-xmlrpclib.html"
  ><tt class="module">xmlrpclib</tt></a> 和 <a class="ulink" href="../lib/module-SimpleXMLRPCServer.html"
  ><tt class="module">SimpleXMLRPCServer</tt></a> 模块实现了在琐碎的任务中调用远程过程。尽管有这样的名字，其实用户不需要直接处理
XML ，也不需要这方面的知识。
</LI>
<LI>The <a class="ulink" href="../lib/module-email.html"
  ><tt class="module">email</tt></a> package is a library
  for managing email messages, including MIME and other RFC 2822-based message
  documents. Unlike <tt class="module">smtplib</tt> and <tt class="module">poplib</tt> which actually send
  and receive messages, the email package has a complete toolset for building
  or decoding complex message structures (including attachments) and for
  implementing internet encoding and header protocols.

<P>
<a class="ulink" href="../lib/module-email.html"
  ><tt class="module">email</tt></a> 包是一个邮件消息管理库，可以处理 MIME 或其它基于 RFC 2822 的消息文档。不同于实际发送和接收消息的 <tt class="module">smtplib</tt> 和 <tt class="module">poplib</tt> 模块，email 包有一个用于构建或解析复杂消息结构（包括附件）以及实现互联网编码和头协议的完整工具集。
</LI>
<LI>The <a class="ulink" href="../lib/module-xml.dom.html"
  ><tt class="module">xml.dom</tt></a> and
  <a class="ulink" href="../lib/module-xml.sax.html"
  ><tt class="module">xml.sax</tt></a> packages provide robust
  support for parsing this popular data interchange format. Likewise, the
  <a class="ulink" href="../lib/module-csv.html"
  ><tt class="module">csv</tt></a> module supports direct reads and
  writes in a common database format. Together, these modules and packages
  greatly simplify data interchange between python applications and other
  tools.

<P>
<a class="ulink" href="../lib/module-xml.dom.html"
  ><tt class="module">xml.dom</tt></a> 和 <a class="ulink" href="../lib/module-xml.sax.html"
  ><tt class="module">xml.sax</tt></a> 包为流行的信息交换格式提供了强大的支持。同样， <tt class="module">csv</tt> 模块支持在通用数据库格式中直接读写。综合起来，这些模块和包大大简化了
Python 应用程序和其它工具之间的数据交换。
</LI>
<LI>Internationalization is supported by a number of modules including
  <a class="ulink" href="../lib/module-gettext.html"
  ><tt class="module">gettext</tt></a>,
  <a class="ulink" href="../lib/module-locale.html"
  ><tt class="module">locale</tt></a>, and the
  <a class="ulink" href="../lib/module-codecs.html"
  ><tt class="module">codecs</tt></a> package.

<P>
国际化由 <a class="ulink" href="../lib/module-gettext.html"
  ><tt class="module">gettext</tt></a>，
<a class="ulink" href="../lib/module-locale.html"
  ><tt class="module">locale</tt></a>和
<a class="ulink" href="../lib/module-codecs.html"
  ><tt class="module">codecs</tt></a> 包支持
</LI>
</UL>

<P>


