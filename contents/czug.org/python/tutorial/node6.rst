---
created: 
creator: panjy
description: ''
title: 输入和输出
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node8.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node8.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node8.html#SECTION008100000000000000000">6.1 Fancier Output Formatting 设计输出格式</a>
<LI><A href="node8.html#SECTION008200000000000000000">6.2 Reading and Writing Files 读写文件</a>
<UL>
<LI><A href="node8.html#SECTION008210000000000000000">6.2.1 Methods of File Objects 文件方法对象</a>
<LI><A href="node8.html#SECTION008220000000000000000">6.2.2 The <tt class="module">pickle</tt> Module <tt class="module">pickle</tt> 模块</a>
</ul></ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION008000000000000000000"></A><A NAME="io"></A>
<BR>
6. Input and Output 输入和输出 
</H1>

<P>
There are several ways to present the output of a program; data can be
printed in a human-readable form, or written to a file for future use.
This chapter will discuss some of the possibilities.

<P>
有几种方法可以表现程序的输出结果；数据可以用可读的结构打印，也可以写入文件供以后使用。本章将会讨论几种可行的做法。

<P>

<H1><A NAME="SECTION008100000000000000000"></A><A NAME="formatting"></A>
<BR>
6.1 Fancier Output Formatting 设计输出格式 
</H1>

<P>
So far we've encountered two ways of writing values: <em>expression
statements</em> and the <tt class="keyword">print</tt> statement.  (A third way is using
the <tt class="method">write()</tt> method of file objects; the standard output file
can be referenced as <code>sys.stdout</code>.  See the Library Reference for
more information on this.)

<P>
我们有两种大相径庭的输出值方法：<em>表达式语句</em>和 <tt class="keyword">print</tt> 语句。（第三种访求是使用文件对象的 <tt class="method">write()</tt> 方法，标准文件输出可以参考 <code>sys.stdout</code>。详细内容参见库参考手册。）

<P>
Often you'll want more control over the formatting of your output than
simply printing space-separated values.  There are two ways to format
your output; the first way is to do all the string handling yourself;
using string slicing and concatenation operations you can create any
layout you can imagine.  The standard module
<tt class="module">string</tt><a id='l2h-43' xml:id='l2h-43'></a> contains some useful operations
for padding strings to a given column width; these will be discussed
shortly.  The second way is to use the <code>%</code> operator with a
string as the left argument.  The <code>%</code> operator interprets the
left argument much like a <tt class="cfunction">sprintf()</tt>-style format
string to be applied to the right argument, and returns the string
resulting from this formatting operation.

<P>
可能你经常想要对输出格式做一些比简单的打印空格分隔符更为复杂的控制。有两种方法可以格式化输出。第一种是由你来控制整个字符串，使用字符切割和联接操作就可以创建出任何你想要的输出形式。标准模块 <tt class="module">string</tt><a id='l2h-44' xml:id='l2h-44'></a> 包括了一些操作，将字符串填充入给定列时，这些操作很有用。随后我们会讨论这部分内容。第二种方法是使用 <code>%</code> 操作符，以某个字符串做为其左参数。 <code>%</code> 操作符将左参数解释为类似于 <tt class="cfunction">sprintf()</tt> 风格的格式字符串，并作用于右参数，从该操作中返回格式化的字符串。

<P>
One question remains, of course: how do you convert values to strings?
Luckily, Python has ways to convert any value to a string: pass it to
the <tt class="function">repr()</tt>  or <tt class="function">str()</tt> functions.  Reverse quotes
(<code>``</code>) are equivalent to <tt class="function">repr()</tt>, but they are no
longer used in modern Python code and will likely not be in future
versions of the language.

<P>
当然，还有一个问题，如何将（不同的）值转化为字符串？很幸运，Python总是把任意值传入 <tt class="function">repr()</tt> 或 <tt class="function">str()</tt> 函数，转为字符串。反引号 (<code>``</code>)等价于<tt class="function">repr()</tt>，未来版本的Python中将会去掉它们，这个功能不再出现于现代的Python代码。

<P>
The <tt class="function">str()</tt> function is meant to return representations of
values which are fairly human-readable, while <tt class="function">repr()</tt> is
meant to generate representations which can be read by the interpreter
(or will force a <tt class="exception">SyntaxError</tt> if there is not equivalent
syntax).  For objects which don't have a particular representation for
human consumption, <tt class="function">str()</tt> will return the same value as
<tt class="function">repr()</tt>.  Many values, such as numbers or structures like
lists and dictionaries, have the same representation using either
function.  Strings and floating point numbers, in particular, have two
distinct representations.

<P>
函数 <tt class="function">str()</tt> 用于将值转化为适于人阅读的形式，而 <tt class="function">repr()</tt> 转化为供解释器读取的形式（如果没有等价的语法，则会发生 <tt class="exception">SyntaxError</tt> 异常） 某对象没有适于人阅读的解释形式的话， <tt class="function">str()</tt> 会返回与 <tt class="function">repr()</tt> 等同的值。很多类型，诸如数值或链表、字典这样的结构，针对各函数都有着统一的解读方式。字符串和浮点数，有着独特的解读方式。

<P>
Some examples:

<P>
示例：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; s = 'Hello, world.'
&gt;&gt;&gt; str(s)
'Hello, world.'
&gt;&gt;&gt; repr(s)
"'Hello, world.'"
&gt;&gt;&gt; str(0.1)
'0.1'
&gt;&gt;&gt; repr(0.1)
'0.10000000000000001'
&gt;&gt;&gt; x = 10 * 3.25
&gt;&gt;&gt; y = 200 * 200
&gt;&gt;&gt; s = 'The value of x is ' + repr(x) + ', and y is ' + repr(y) + '...'
&gt;&gt;&gt; print s
The value of x is 32.5, and y is 40000...
&gt;&gt;&gt; # The repr() of a string adds string quotes and backslashes:
... hello = 'hello, world\n'
&gt;&gt;&gt; hellos = repr(hello)
&gt;&gt;&gt; print hellos
'hello, world\n'
&gt;&gt;&gt; # The argument to repr() may be any Python object:
... repr((x, y, ('spam', 'eggs')))
"(32.5, 40000, ('spam', 'eggs'))"
&gt;&gt;&gt; # reverse quotes are convenient in interactive sessions:
... `x, y, ('spam', 'eggs')`
"(32.5, 40000, ('spam', 'eggs'))"
</pre></div>

<P>
Here are two ways to write a table of squares and cubes:

<P>
以下两种方法可以输出平方和立方表：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; for x in range(1, 11):
...     print repr(x).rjust(2), repr(x*x).rjust(3),
...     # Note trailing comma on previous line
...     print repr(x*x*x).rjust(4)
...
 1   1    1
 2   4    8
 3   9   27
 4  16   64
 5  25  125
 6  36  216
 7  49  343
 8  64  512
 9  81  729
10 100 1000
&gt;&gt;&gt; for x in range(1,11):
...     print '%2d %3d %4d' % (x, x*x, x*x*x)
... 
 1   1    1
 2   4    8
 3   9   27
 4  16   64
 5  25  125
 6  36  216
 7  49  343
 8  64  512
 9  81  729
10 100 1000
</pre></div>

<P>
(Note that one space between each column was added by the way
<tt class="keyword">print</tt> works: it always adds spaces between its arguments.)

<P>
（需要注意的是使用 <tt class="keyword">print</tt> 方法时每两列之间有一个空格：它总是在参数之间加一个空格。）

<P>
This example demonstrates the <tt class="method">rjust()</tt> method of string objects,
which right-justifies a string in a field of a given width by padding
it with spaces on the left.  There are similar methods
<tt class="method">ljust()</tt> and <tt class="method">center()</tt>.  These
methods do not write anything, they just return a new string.  If
the input string is too long, they don't truncate it, but return it
unchanged; this will mess up your column lay-out but that's usually
better than the alternative, which would be lying about a value.  (If
you really want truncation you can always add a slice operation, as in
"<tt class="samp">x.ljust(n)[:n]</tt>".)

<P>
以上是一个 <tt class="method">rjust()</tt> 函数的演示，这个函数把字符串输出到一列，并通过向左侧填充空格来使其右对齐。类似的函数还有 <tt class="method">ljust()</tt> 和 <tt class="method">center()</tt>。这些函数只是输出新的字符串，并不改变什么。如果输出的字符串太长，它们也不会截断它，而是原样输出，这会使你的输出格式变得混乱，不过总强过另一种选择（截断字符串），因为那样会产生错误的输出值。（如果你确实需要截断它，可以使用切割操作，例如：" "<tt class="samp">x.ljust(&nbsp;n)[:n]</tt>"。）

<P>
There is another method, <tt class="method">zfill()</tt>, which pads a
numeric string on the left with zeros.  It understands about plus and
minus signs:

<P>
还有一个函数， <tt class="method">zfill()</tt> 它用于向数值的字符串表达左侧填充0。该函数可以正确理解正负号：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; '12'.zfill(5)
'00012'
&gt;&gt;&gt; '-3.14'.zfill(7)
'-003.14'
&gt;&gt;&gt; '3.14159265359'.zfill(5)
'3.14159265359'
</pre></div>

<P>
Using the <code>%</code> operator looks like this:

<P>
可以如下这样使用 <code>%</code> 操作符：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import math
&gt;&gt;&gt; print 'The value of PI is approximately %5.3f.' % math.pi
The value of PI is approximately 3.142.
</pre></div>

<P>
If there is more than one format in the string, you need to pass a
tuple as right operand, as in this example:

<P>
如果有超过一个的字符串要格式化为一体，就需要将它们传入一个元组做为右值，如下所示：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}
&gt;&gt;&gt; for name, phone in table.items():
...     print '%-10s ==&gt; %10d' % (name, phone)
... 
Jack       ==&gt;       4098
Dcab       ==&gt;       7678
Sjoerd     ==&gt;       4127
</pre></div>

<P>
Most formats work exactly as in C and require that you pass the proper
type; however, if you don't you get an exception, not a core dump.
The <code>%s</code> format is more relaxed: if the corresponding argument is
not a string object, it is converted to string using the
<tt class="function">str()</tt> built-in function.  Using <code>*</code> to pass the width
or precision in as a separate (integer) argument is supported.  The
C formats <code>%n</code> and <code>%p</code> are not supported.

<P>
大多数类 C 的格式化操作都需要你传入适当的类型，不过如果你没有定义异常，也不会有什么从内核中主动的弹出来。（however, if you don't you get an exception, not a core dump）使用 <code>%s</code> 格式会更轻松些：如果对应的参数不是字符串，它会通过内置的 <tt class="function">str()</tt> 函数转化为字符串。Python支持用 * 作为一个隔离（整型的）参数来传递宽度或精度。Python 不支持  C的 <code>%n</code> 和 <code>%p</code> 操作符。

<P>
If you have a really long format string that you don't want to split
up, it would be nice if you could reference the variables to be
formatted by name instead of by position.  This can be done by using
form <code>%(name)format</code>, as shown here:

<P>
如果可以逐点引用要格式化的变量名，就可以产生符合真实长度的格式化字符串，不会产生间隔。这一效果可以通过使用form <code>%(name)format</code> 结构来实现：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
&gt;&gt;&gt; print 'Jack: %(Jack)d; Sjoerd: %(Sjoerd)d; Dcab: %(Dcab)d' % table
Jack: 4098; Sjoerd: 4127; Dcab: 8637678
</pre></div>

<P>
This is particularly useful in combination with the new built-in
<tt class="function">vars()</tt> function, which returns a dictionary containing all
local variables.

<P>
这个技巧在与新的内置函数 <tt class="function">vars()</tt> 组合使用时非常有用，该函数返回一个包含所有局部变量的字典。

<P>

<H1><A NAME="SECTION008200000000000000000"></A><A NAME="files"></A>
<BR>
6.2 Reading and Writing Files 读写文件 
</H1>

<P>
<tt class="function">open()</tt><a id='l2h-45' xml:id='l2h-45'></a> returns a file
object<a id='l2h-46' xml:id='l2h-46'></a>, and is most commonly used with two arguments:
"<tt class="samp">open(<var>filename</var>, <var>mode</var>)</tt>".

<P>
<tt class="function">open()</tt><a id='l2h-47' xml:id='l2h-47'></a> 返回一个文件<a id='l2h-48' xml:id='l2h-48'></a>，通常的用法需要两个参数： "<tt class="samp">open(<var>filename</var>, <var>mode</var>)</tt>"。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f=open('/tmp/workfile', 'w')
&gt;&gt;&gt; print f
&lt;open file '/tmp/workfile', mode 'w' at 80a0960&gt;
</pre></div>

<P>
The first argument is a string containing the filename.  The second
argument is another string containing a few characters describing the
way in which the file will be used.  <var>mode</var> can be <code>'r'</code> when
the file will only be read, <code>'w'</code> for only writing (an existing
file with the same name will be erased), and <code>'a'</code> opens the file
for appending; any data written to the file is automatically added to
the end.  <code>'r+'</code> opens the file for both reading and writing.
The <var>mode</var> argument is optional; <code>'r'</code> will be assumed if
it's omitted.

<P>
第一个参数是一个标识文件名的字符串。第二个参数是由有限的字母组成的字符串，描述了文件将会被如何使用。可选的<var>模式</var> 有： <code>'r'</code> ，此选项使文件只读； <code>'w'</code>，此选项使文件只写（对于同名文件，该操作使原有文件被覆盖）； <code>'a'</code> ，此选项以追加方式打开文件； <code>'r+'</code> ，此选项以读写方式打开文件；如果没有指定，默认为 <code>'r'</code> 模式。

<P>
On Windows and the Macintosh, <code>'b'</code> appended to the
mode opens the file in binary mode, so there are also modes like
<code>'rb'</code>, <code>'wb'</code>, and <code>'r+b'</code>.  Windows makes a
distinction between text and binary files; the end-of-line characters
in text files are automatically altered slightly when data is read or
written.  This behind-the-scenes modification to file data is fine for
ASCII text files, but it'll corrupt binary data like that in <span class="file">JPEG</span> or
<span class="file">EXE</span> files.  Be very careful to use binary mode when reading and
writing such files.

<P>
在Windows 和 Macintosh平台上， <code>'b'</code>模式以二进制方式打开文件，所以可能会有类似于 <code>'rb'</code> ，<code>'wb'</code> ， <code>'r+b'</code> 等等模式组合。Windows平台上文本文件与二进制文件是有区别的，读写文本文件时，行尾会自动添加行结束符。这种后台操作方式对ASCII 文本文件没有什么问题，但是操作 JPEG 或 <span class="file">.EXE</span>这样的二进制文件时就会产生破坏。在操作这些文件时一定要记得以二进制模式打开。

<P>

<H2><A NAME="SECTION008210000000000000000"></A><A NAME="fileMethods"></A>
<BR>
6.2.1 Methods of File Objects 文件方法对象 
</H2>

<P>
The rest of the examples in this section will assume that a file
object called <code>f</code> has already been created.

<P>
本节中的示例都默认文件对象 <code>f</code> 已经创建。

<P>
To read a file's contents, call <code>f.read(<var>size</var>)</code>, which reads
some quantity of data and returns it as a string.  <var>size</var> is an
optional numeric argument.  When <var>size</var> is omitted or negative,
the entire contents of the file will be read and returned; it's your
problem if the file is twice as large as your machine's memory.
Otherwise, at most <var>size</var> bytes are read and returned.  If the end
of the file has been reached, <code>f.read()</code> will return an empty
string (<code>""</code>).

<P>
要读取文件内容，需要调用 <code>f.read(<var>size</var>)</code>，该方法读取若干数量的数据并以字符串形式返回其内容，字符串长度为数值<var>size</var> 所指定的大小。如果没有指定 <var>size</var>或者指定为负数，就会读取并返回整个文件。当文件大小为当前机器内存两倍时，就会产生问题。正常情况下，会尽可能按比较大的<var>size</var> 读取和返回数据。如果到了文件末尾，<code>f.read()</code>会返回一个空字符串（<code>""</code>）。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f.read()
'This is the entire file.\n'
&gt;&gt;&gt; f.read()
''
</pre></div>

<P>
<code>f.readline()</code> reads a single line from the file; a newline
character (<code>&#92;n</code>) is left at the end of the string, and is only
omitted on the last line of the file if the file doesn't end in a
newline.  This makes the return value unambiguous; if
<code>f.readline()</code> returns an empty string, the end of the file has
been reached, while a blank line is represented by <code>'&#92;n'</code>, a
string containing only a single newline.  

<P>
<code>f.readline()</code>从文件中读取单独一行，字符串结尾会自动加上一个换行符，只有当文件最后一行没有以换行符结尾时，这一操作才会被忽略。这样返回值就不会有什么混淆不清，如果如果 <code>f.readline()</code>返回一个空字符串，那就表示到达了文件末尾，如果是一个空行，就会描述为<code>'&#92;n&#180;</code> ，一个只包含换行符的字符串。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f.readline()
'This is the first line of the file.\n'
&gt;&gt;&gt; f.readline()
'Second line of the file\n'
&gt;&gt;&gt; f.readline()
''
</pre></div>

<P>
<code>f.readlines()</code> returns a list containing all the lines of data
in the file.  If given an optional parameter <var>sizehint</var>, it reads
that many bytes from the file and enough more to complete a line, and
returns the lines from that.  This is often used to allow efficient
reading of a large file by lines, but without having to load the
entire file in memory.  Only complete lines will be returned.

<P>
<code>f.readlines()</code>返回一个列表，其中包含了文件中所有的数据行。如果给定了<var>sizehint</var>参数，就会读入多于一行的比特数，从中返回多行文本。这个功能通常用于高效读取大型行文件，避免了将整个文件读入内存。这种操作只返回完整的行。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f.readlines()
['This is the first line of the file.\n', 'Second line of the file\n']
</pre></div>

<P>
An alternate approach to reading lines is to loop over the file object.
This is memory efficient, fast, and leads to simpler code:

<P>
交换通道可以循环读取文件对象中的行。这是内存操作的效率，快速，代码简单：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; for line in f:
        print line,
        
This is the first line of the file.
Second line of the file
</pre></div>

<P>
The alternative approach is simpler but does not provide as fine-grained
control.  Since the two approaches manage line buffering differently,
they should not be mixed.

<P>
交换通道很简单，但是不提供完整的控制。因为两个通道管理线缓冲不同，它们不能混合。

<P>
<code>f.write(<var>string</var>)</code> writes the contents of <var>string</var> to
the file, returning <code>None</code>.  

<P>
<code>f.write(<var>string</var>)</code> 将 <var>string</var> 的内容写入文件，返回
<code>None</code> 。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f.write('This is a test\n')
</pre></div>

<P>
To write something other than a string, it needs to be converted to a
string first:

<P>
如果需要写入字符串以外的数据，就要先把这些数据转换为字符串。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; value = ('the answer', 42)
&gt;&gt;&gt; s = str(value)
&gt;&gt;&gt; f.write(s)
</pre></div>

<P>
<code>f.tell()</code> returns an integer giving the file object's current
position in the file, measured in bytes from the beginning of the
file.  To change the file object's position, use
"<tt class="samp">f.seek(<var>offset</var>, <var>from_what</var>)</tt>".  The position is
computed from adding <var>offset</var> to a reference point; the reference
point is selected by the <var>from_what</var> argument.  A
<var>from_what</var> value of 0 measures from the beginning of the file, 1
uses the current file position, and 2 uses the end of the file as the
reference point.  <var>from_what</var> can be omitted and defaults to 0,
using the beginning of the file as the reference point.

<P>
<code>f.tell()</code>返回一个整数，代表文件对象在文件中的指针位置，该数值计量了自文件开头到指针处的比特数。需要改变文件对象指针话话，使用"<tt class="samp">f.seek(<var>offset</var>,<var>from_what</var>)</tt>" 。指针在该操作中从指定的引用位置移动<var>offset</var> 比特，引用位置由 <var>from_what</var> 参数指定。 <var>from_what</var>值为0表示自文件起初处开始，1表示自当前文件指针位置开始，2表示自文件末尾开始。 <var>from_what</var> 可以忽略，其默认值为零，此时从文件头开始。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f = open('/tmp/workfile', 'r+')
&gt;&gt;&gt; f.write('0123456789abcdef')
&gt;&gt;&gt; f.seek(5)     # Go to the 6th byte in the file
&gt;&gt;&gt; f.read(1)        
'5'
&gt;&gt;&gt; f.seek(-3, 2) # Go to the 3rd byte before the end
&gt;&gt;&gt; f.read(1)
'd'
</pre></div>

<P>
When you're done with a file, call <code>f.close()</code> to close it and
free up any system resources taken up by the open file.  After calling
<code>f.close()</code>, attempts to use the file object will automatically fail.

<P>
文件使用完后，调用 <code>f.close()</code>可以关闭文件，释放打开文件后占用的系统资源。调用 <code>f.close()</code>之后，再调用文件对象会自动引发错误。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; f.close()
&gt;&gt;&gt; f.read()
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
ValueError: I/O operation on closed file
</pre></div>

<P>
File objects have some additional methods, such as
<tt class="method">isatty()</tt> and <tt class="method">truncate()</tt> which are less frequently
used; consult the Library Reference for a complete guide to file
objects.

<P>
文件对象还有一些不太常用的附加方法，比如 <tt class="method">isatty()</tt> 和<tt class="method">truncate()</tt> 在库参考手册中有文件对象的完整指南。

<P>

<H2><A NAME="SECTION008220000000000000000"></A><A NAME="pickle"></A>
<BR>
6.2.2 The <tt class="module">pickle</tt> Module <tt class="module">pickle</tt> 模块 
</H2>
<a id='l2h-49' xml:id='l2h-49'></a>

<P>
Strings can easily be written to and read from a file. Numbers take a
bit more effort, since the <tt class="method">read()</tt> method only returns
strings, which will have to be passed to a function like
<tt class="function">int()</tt>, which takes a string like <code>'123'</code> and
returns its numeric value 123.  However, when you want to save more
complex data types like lists, dictionaries, or class instances,
things get a lot more complicated.

<P>
我们可以很容易的读写文件中的字符串。数值就要多费点儿周折，因为<tt class="method">read()</tt> 方法只会返回字符串，应该将其传入 <tt class="function">int()</tt>方法中，就可以将 <code>'123'</code>这样的字符转为对应的数值123。不过，当你需要保存更为复杂的数据类型，例如链表、字典，类的实例，事情就会变得更复杂了。

<P>
Rather than have users be constantly writing and debugging code to
save complicated data types, Python provides a standard module called
<a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a>.  This is an
amazing module that can take almost
any Python object (even some forms of Python code!), and convert it to
a string representation; this process is called <i class="dfn">pickling</i>.  
Reconstructing the object from the string representation is called
<i class="dfn">unpickling</i>.  Between pickling and unpickling, the string
representing the object may have been stored in a file or data, or
sent over a network connection to some distant machine.

<P>
好在用户不必要非得自己编写和调试保存复杂数据类型的代码。 Python提供了一个名为 <a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a>的标准模块。这是一个令人赞叹的模块，几乎可以把任何 Python对象 （甚至是一些 Python 代码段！）表达为为字符串，这一过程称之为<i class="dfn">封装</i> （ <i class="dfn">pickling</i>）。从字符串表达出重新构造对象称之为<i class="dfn">拆封</i>（ <i class="dfn">unpickling</i>）。封装状态中的对象可以存储在文件或对象中，也可以通过网络在远程的机器之间传输。

<P>
If you have an object <code>x</code>, and a file object <code>f</code> that's been
opened for writing, the simplest way to pickle the object takes only
one line of code:

<P>
如果你有一个对象 <code>x</code> ，一个以写模式打开的文件对象 <code>f</code>，封装对像的最简单的方法只需要一行代码：

<P>
<div class="verbatim"><pre>
pickle.dump(x, f)
</pre></div>

<P>
To unpickle the object again, if <code>f</code> is a file object which has
been opened for reading:

<P>
如果 <code>f</code>是一个以读模式打开的文件对象，就可以重装拆封这个对象：

<P>
<div class="verbatim"><pre>
x = pickle.load(f)
</pre></div>

<P>
(There are other variants of this, used when pickling many objects or
when you don't want to write the pickled data to a file; consult the
complete documentation for
<a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a> in the
<em class="citetitle"><a
 href="../lib/"
 title="Python Library Reference"
 >Python Library Reference</a></em>.)

<P>
（如果不想把封装的数据写入文件，这里还有一些其它的变化可用。完整的<a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a>
文档请见<em class="citetitle"><a
 href="../lib/"
 title="Python 库参考手册"
 >Python 库参考手册</a></em>）。

<P>
<a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a> is the standard way
to make Python objects which can be stored and reused by other
programs or by a future invocation of the same program; the technical
term for this is a <i class="dfn">persistent</i> object.  Because
<a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a> is so widely used,
many authors who write Python extensions take care to ensure that new
data types such as matrices can be properly pickled and unpickled.

<P>
<a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a> 是存储 Python 对象以供其它程序或其本身以后调用的标准方法。提供这一组技术的是一个持久化对象（ <i class="dfn">persistent</i> object ）。因为 <a class="ulink" href="../lib/module-pickle.html"
  ><tt class="module">pickle</tt></a> 的用途很广泛，很多 Python 扩展的作者都非常注意类似矩阵这样的新数据类型是否适合封装和拆封。

<P>


