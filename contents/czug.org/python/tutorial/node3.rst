---
created: 
creator: panjy
description: ''
title: 深入流程控制
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node5.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node5.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node5.html#SECTION005100000000000000000">3.1 <tt class="keyword">if</tt> Statements</a>
<LI><A href="node5.html#SECTION005200000000000000000">3.2 <tt class="keyword">for</tt> Statements <tt class="keyword">for</tt> 语句</a>
<LI><A href="node5.html#SECTION005300000000000000000">3.3 The <tt class="function">range()</tt> Function <tt class="function">range()</tt>函数</a>
<LI><A href="node5.html#SECTION005400000000000000000">3.4 <tt class="keyword">break</tt> and <tt class="keyword">continue</tt> Statements, and
         <tt class="keyword">else</tt> Clauses on Loops
         	<tt class="keyword">break</tt> 和 <tt class="keyword">continue</tt> 语句, 以及
         循环中的 <tt class="keyword">else</tt> 子句</a>
<LI><A href="node5.html#SECTION005500000000000000000">3.5 <tt class="keyword">pass</tt> Statements <tt class="keyword">pass</tt> 语句</a>
<LI><A href="node5.html#SECTION005600000000000000000">3.6 Defining Functions 定义函数</a>
<LI><A href="node5.html#SECTION005700000000000000000">3.7 More on Defining Functions 深入函数定义</a>
<UL>
<LI><A href="node5.html#SECTION005710000000000000000">3.7.1 Default Argument Values 参数默认值</a>
<LI><A href="node5.html#SECTION005720000000000000000">3.7.2 Keyword Arguments</a>
<LI><A href="node5.html#SECTION005730000000000000000">3.7.3 Arbitrary Argument Lists 可变参数列表</a>
<LI><A href="node5.html#SECTION005740000000000000000">3.7.4 Unpacking Argument Lists 参数列表的分拆</a>
<LI><A href="node5.html#SECTION005750000000000000000">3.7.5 Lambda Forms Lambda 形式</a>
<LI><A href="node5.html#SECTION005760000000000000000">3.7.6 Documentation Strings 文档字符串</a>
</ul></ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION005000000000000000000"></A><A NAME="moreControl"></A>
<BR>
3. More Control Flow Tools 深入流程控制
</H1>

<P>
Besides the <tt class="keyword">while</tt> statement just introduced, Python knows
the usual control flow statements known from other languages, with
some twists.

<P>
除了前面介绍的 <tt class="keyword">while</tt> 语句，Python 还从别的语言中借鉴了一些流程控制功能，并有所改变。

<P>

<H1><A NAME="SECTION005100000000000000000"></A><A NAME="if"></A>
<BR>
3.1 <tt class="keyword">if</tt> Statements 
</H1>

<P>
Perhaps the most well-known statement type is the
<tt class="keyword">if</tt> statement.  For example:

<P>
也许最有名的是 if 语句。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; x = int(raw_input("Please enter an integer: "))
&gt;&gt;&gt; if x &lt; 0:
...      x = 0
...      print 'Negative changed to zero'
... elif x == 0:
...      print 'Zero'
... elif x == 1:
...      print 'Single'
... else:
...      print 'More'
...
</pre></div>

<P>
There can be zero or more <tt class="keyword">elif</tt> parts, and the
<tt class="keyword">else</tt> part is optional.  The keyword `<tt class="keyword">elif</tt>' is
short for `else if', and is useful to avoid excessive indentation.  An 
<tt class="keyword">if</tt> ... <tt class="keyword">elif</tt> ... <tt class="keyword">elif</tt> ... sequence
is a substitute for the <tt class="keyword">switch</tt> or
<tt class="keyword">case</tt> statements found in other languages.

<P>
可能会有零到多个 <tt class="keyword">elif</tt> 部分，<tt class="keyword">else</tt> 是可选的。关键字“<tt class="keyword">elif</tt>” 是“ else if ”的缩写，这个可以有效避免过深的缩进。if ... elif ... elif ... 序列用于替代其它语言中的 switch 或 case 语句。

<P>

<H1><A NAME="SECTION005200000000000000000"></A><A NAME="for"></A>
<BR>
3.2 <tt class="keyword">for</tt> Statements <tt class="keyword">for</tt> 语句 
</H1>

<P>
The <tt class="keyword">for</tt><a id='l2h-4' xml:id='l2h-4'></a> statement in Python differs a bit from
what you may be used to in C or Pascal.  Rather than always
iterating over an arithmetic progression of numbers (like in Pascal),
or giving the user the ability to define both the iteration step and
halting condition (as C), Python's
<tt class="keyword">for</tt><a id='l2h-5' xml:id='l2h-5'></a> statement iterates over the items of any
sequence (a list or a string), in the order that they appear in
the sequence.  For example (no pun intended):

<P>
Python 中的 <tt class="keyword">for</tt><a id='l2h-6' xml:id='l2h-6'></a> 语句和 C 或 Pascal 中的略有不同。通常的循环可能会依据一个等差数值步进过程（如Pascal）或由用户来定义迭代步骤和中止条件（如 C ），Python 的 <tt class="keyword">for</tt><a id='l2h-7' xml:id='l2h-7'></a> 语句依据任意序列（链表或字符串）中的子项，按它们在序列中的顺序来进行迭代。例如（没有暗指）：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; # Measure some strings:
... a = ['cat', 'window', 'defenestrate']
&gt;&gt;&gt; for x in a:
...     print x, len(x)
... 
cat 3
window 6
defenestrate 12
</pre></div>

<P>
It is not safe to modify the sequence being iterated over in the loop
(this can only happen for mutable sequence types, such as lists).  If
you need to modify the list you are iterating over (for example, to
duplicate selected items) you must iterate over a copy.  The slice
notation makes this particularly convenient:

<P>
在迭代过程中修改迭代序列不安全（只有在使用链表这样的可变序列时才会有这样的情况）。如果你想要修改你迭代的序列（例如，复制选择项），你可以迭代它的复本。使用切割标识就可以很方便的做到这一点：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; for x in a[:]: # make a slice copy of the entire list
...    if len(x) &gt; 6: a.insert(0, x)
... 
&gt;&gt;&gt; a
['defenestrate', 'cat', 'window', 'defenestrate']
</pre></div>

<P>

<H1><A NAME="SECTION005300000000000000000"></A><A NAME="range"></A>
<BR>
3.3 The <tt class="function">range()</tt> Function <tt class="function">range()</tt>函数 
</H1>

<P>
If you do need to iterate over a sequence of numbers, the built-in
function <tt class="function">range()</tt> comes in handy.  It generates lists
containing arithmetic progressions:

<P>
如果你需要一个数值序列，内置函数range()可能会很有用，它生成一个等差级数链表。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; range(10)
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
</pre></div>

<P>
The given end point is never part of the generated list;
<code>range(10)</code> generates a list of 10 values, the legal
indices for items of a sequence of length 10.  It is possible to let
the range start at another number, or to specify a different increment
(even negative; sometimes this is called the `step'):

<P>
<code>range(10)</code> 生成了一个包含10个值的链表，它用链表的索引值填充了这个长度为10的列表，所生成的链表中不包括范围中的结束值。也可以让range操作从另一个数值开始，或者可以指定一个不同的步进值（甚至是负数，有时这也被称为“步长”）：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; range(5, 10)
[5, 6, 7, 8, 9]
&gt;&gt;&gt; range(0, 10, 3)
[0, 3, 6, 9]
&gt;&gt;&gt; range(-10, -100, -30)
[-10, -40, -70]
</pre></div>

<P>
To iterate over the indices of a sequence, combine
<tt class="function">range()</tt> and <tt class="function">len()</tt> as follows:

<P>
需要迭代链表索引的话，如下所示结合使 用<tt class="function">range()</tt> 和 <tt class="function">len()</tt> ：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; a = ['Mary', 'had', 'a', 'little', 'lamb']
&gt;&gt;&gt; for i in range(len(a)):
...     print i, a[i]
... 
0 Mary
1 had
2 a
3 little
4 lamb
</pre></div>

<P>

<H1><A NAME="SECTION005400000000000000000"></A><A NAME="break"></A>
<BR>
3.4 <tt class="keyword">break</tt> and <tt class="keyword">continue</tt> Statements, and
         <tt class="keyword">else</tt> Clauses on Loops
         	<tt class="keyword">break</tt> 和 <tt class="keyword">continue</tt> 语句, 以及
         循环中的 <tt class="keyword">else</tt> 子句
</H1>

<P>
The <tt class="keyword">break</tt> statement, like in C, breaks out of the smallest
enclosing <tt class="keyword">for</tt> or <tt class="keyword">while</tt> loop.

<P>
break 语句和 C 中的类似，用于跳出最近的一级 <tt class="keyword">for</tt> 或 <tt class="keyword">while</tt> 循环。

<P>
The <tt class="keyword">continue</tt> statement, also borrowed from C, continues
with the next iteration of the loop.

<P>
<tt class="keyword">continue</tt> 语句是从 C 中借鉴来的，它表示循环继续执行下一次迭代。

<P>
Loop statements may have an <code>else</code> clause; it is executed when
the loop terminates through exhaustion of the list (with
<tt class="keyword">for</tt>) or when the condition becomes false (with
<tt class="keyword">while</tt>), but not when the loop is terminated by a
<tt class="keyword">break</tt> statement.  This is exemplified by the following loop,
which searches for prime numbers:

<P>
循环可以有一个 <code>else</code> 子句;它在循环迭代完整个列表（对于 <tt class="keyword">for</tt> ）或执行条件为 false （对于 <tt class="keyword">while</tt> ）时执行，但循环被 <tt class="keyword">break</tt> 中止的情况下不会执行。以下搜索素数的示例程序演示了这个子句：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; for n in range(2, 10):
...     for x in range(2, n):
...         if n % x == 0:
...             print n, 'equals', x, '*', n/x
...             break
...     else:
...         # loop fell through without finding a factor
...         print n, 'is a prime number'
... 
2 is a prime number
3 is a prime number
4 equals 2 * 2
5 is a prime number
6 equals 2 * 3
7 is a prime number
8 equals 2 * 4
9 equals 3 * 3
</pre></div>

<P>

<H1><A NAME="SECTION005500000000000000000"></A><A NAME="pass"></A>
<BR>
3.5 <tt class="keyword">pass</tt> Statements <tt class="keyword">pass</tt> 语句 
</H1>

<P>
The <tt class="keyword">pass</tt> statement does nothing.
It can be used when a statement is required syntactically but the
program requires no action.
For example:

<P>
<tt class="keyword">pass</tt> 语句什么也不做。它用于那些语法上必须要有什么语句，但程序什么也不做的场合，例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; while True:
...       pass # Busy-wait for keyboard interrupt
...
</pre></div>

<P>

<H1><A NAME="SECTION005600000000000000000"></A><A NAME="functions"></A>
<BR>
3.6 Defining Functions 定义函数 
</H1>

<P>
We can create a function that writes the Fibonacci series to an
arbitrary boundary:

<P>
我们可以定义一个函数以生成任意上界的菲波那契数列：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def fib(n):    # write Fibonacci series up to n
...     """Print a Fibonacci series up to n."""
...     a, b = 0, 1
...     while b &lt; n:
...         print b,
...         a, b = b, a+b
... 
&gt;&gt;&gt; # Now call the function we just defined:
... fib(2000)
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597
</pre></div>

<P>
The keyword <tt class="keyword">def</tt> introduces a function <em>definition</em>.  It
must be followed by the function name and the parenthesized list of
formal parameters.  The statements that form the body of the function
start at the next line, and must be indented.  The first statement of
the function body can optionally be a string literal; this string
literal is the function's <a id='l2h-8' xml:id='l2h-8'></a>documentation
string, or <i class="dfn">docstring</i>.<a id='l2h-9' xml:id='l2h-9'></a>

<P>
关键字  <tt class="keyword">def</tt> 引入了一个函数定义。在其后必须跟有函数名和包括形式参数的圆括号。函数体语句从下一行开始，必须是缩进的。函数体的第一行可以是一个字符串值，这个字符串是该函数的 <i class="dfn">(</i>文档字符串（documentation string）)<a id='l2h-10' xml:id='l2h-10'></a>，也可称作 <i class="dfn">docstring</i>。<a id='l2h-11' xml:id='l2h-11'></a>

<P>
There are tools which use docstrings to automatically produce online
or printed documentation, or to let the user interactively browse
through code; it's good practice to include docstrings in code that
you write, so try to make a habit of it.

<P>
有些文档字符串工具可以在线处理或打印文档，或让用户交互的浏览代码;在代码中加入文档字符串是一个好的作法，应该养成这个习惯。

<P>
The <em>execution</em> of a function introduces a new symbol table used
for the local variables of the function.  More precisely, all variable
assignments in a function store the value in the local symbol table;
whereas variable references first look in the local symbol table, then
in the global symbol table, and then in the table of built-in names.
Thus,  global variables cannot be directly assigned a value within a
function (unless named in a <tt class="keyword">global</tt> statement), although
they may be referenced.

<P>
<em>执行</em>函数时会为局部变量引入一个新的符号表。所有的局部变量都存储在这个局部符号表中。引用参数时，会先从局部符号表中查找，然后是全局符号表，然后是内置命名表。因此，全局参数虽然可以被引用，但它们不能在函数中直接赋值（除非它们用
global 语句命名）。

<P>
The actual parameters (arguments) to a function call are introduced in
the local symbol table of the called function when it is called; thus,
arguments are passed using <em>call by value</em> (where the
<em>value</em> is always an object <em>reference</em>, not the value of
the object).<A NAME="tex2html3"
  HREF="#foot2441"><SUP>3.1</SUP></A> When a function calls another function, a new local symbol table is
created for that call.

<P>
函数引用的实际参数在函数调用时引入局部符号表，因此，实参总是传值调用（这里的值总是一个对象引用，而不是该对象的值）。<A NAME="tex2html4"
  HREF="#foot378"><SUP>3.2</SUP></A> 一个函数被另一个函数调用时，一个新的局部符号表在调用过程中被创建。

<P>
A function definition introduces the function name in the current
symbol table.  The value of the function name
has a type that is recognized by the interpreter as a user-defined
function.  This value can be assigned to another name which can then
also be used as a function.  This serves as a general renaming
mechanism:

<P>
函数定义在当前符号表中引入函数名。作为用户定义函数，函数名有一个为解释器认可的类型值。这个值可以赋给其它命名，使其能够作为一个函数来使用。这就像一个重命名机制：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; fib
&lt;function fib at 10042ed0&gt;
&gt;&gt;&gt; f = fib
&gt;&gt;&gt; f(100)
1 1 2 3 5 8 13 21 34 55 89
</pre></div>

<P>
You might object that <code>fib</code> is not a function but a procedure.  In
Python, like in C, procedures are just functions that don't return a
value.  In fact, technically speaking, procedures do return a value,
albeit a rather boring one.  This value is called <code>None</code> (it's a
built-in name).  Writing the value <code>None</code> is normally suppressed by
the interpreter if it would be the only value written.  You can see it
if you really want to:

<P>
你可能认为<code>fib</code>不是一个函数（ function ），而是一个过程（ procedure ）。Python 和 C 一样，过程只是一个没有返回值的函数。实际上，从技术上讲，过程也有一个返回值，虽然是一个不讨人喜欢的。这个值被称为 <code>None</code> （这是一个内置命名）。如果一个值只是 None 的话，通常解释器不会写一个 None 出来，如果你真想要查看它的话，可以这样做：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; print fib(0)
None
</pre></div>

<P>
It is simple to write a function that returns a list of the numbers of
the Fibonacci series, instead of printing it:

<P>
以下示例演示了如何从函数中返回一个包含菲波那契数列的数值链表，而不是打印它：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def fib2(n): # return Fibonacci series up to n
...     """Return a list containing the Fibonacci series up to n."""
...     result = []
...     a, b = 0, 1
...     while b &lt; n:
...         result.append(b)    # see below
...         a, b = b, a+b
...     return result
... 
&gt;&gt;&gt; f100 = fib2(100)    # call it
&gt;&gt;&gt; f100                # write the result
[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
</pre></div>

<P>
This example, as usual, demonstrates some new Python features:

<P>
和以前一样，这个例子演示了一些新的 Python 功能：

<P>

<UL>
<LI>The <tt class="keyword">return</tt> statement returns with a value from a function.
<tt class="keyword">return</tt> without an expression argument returns <code>None</code>.
Falling off the end of a procedure also returns <code>None</code>.

<P>
<tt class="keyword">return</tt> 语句从函数中返回一个值，不带表达式的 <tt class="keyword">return</tt> 返回 <code>None</code>。过程结束后也会返回 <code>None</code> 。

<P>
</LI>
<LI>The statement <code>result.append(b)</code> calls a <em>method</em> of the list
object <code>result</code>.  A method is a function that `belongs' to an
object and is named <code>obj.methodname</code>, where <code>obj</code> is some
object (this may be an expression), and <code>methodname</code> is the name
of a method that is defined by the object's type.  Different types
define different methods.  Methods of different types may have the
same name without causing ambiguity.  (It is possible to define your
own object types and methods, using <em>classes</em>, as discussed later
in this tutorial.)
The method <tt class="method">append()</tt> shown in the example is defined for
list objects; it adds a new element at the end of the list.  In this
example it is equivalent to "<tt class="samp">result = result + [b]</tt>", but more
efficient.

<P>
语句 <code>result.append(b)</code> 称为链表对象 <code>result</code> 的一个<em>方法（ method ）</em>。方法是一个“属于”某个对象的函数，它被命名为 <code>obj.methodename</code> ，这里的 <code>obj</code> 是某个对象（可能是一个表达式），<code>methodename</code> 是某个在该对象类型定义中的方法的命名。不同的类型定义不同的方法。不同类型可能有同样名字的方法，但不会混淆。（当你定义自己的对象类型和方法时，可能会出现这种情况，本指南后面的章节会介绍如何使用<em>类型</em>）。示例中演示的 <tt class="method">append()</tt>方法由链表对象定义，它向链表中加入一个新元素。在示例中它等同于"<tt class="samp">"result = result + [b]"</tt>"，不过效率更高。

<P>
</LI>
</UL>

<P>

<H1><A NAME="SECTION005700000000000000000"></A><A NAME="defining"></A>
<BR>
3.7 More on Defining Functions 深入函数定义 
</H1>

<P>
It is also possible to define functions with a variable number of
arguments.  There are three forms, which can be combined.

<P>
有时需要定义参数个数可变的函数。有三个方法可以达到目的，我们可以组合使用它们。

<P>

<H2><A NAME="SECTION005710000000000000000"></A><A NAME="defaultArgs"></A>
<BR>
3.7.1 Default Argument Values 参数默认值 
</H2>

<P>
The most useful form is to specify a default value for one or more
arguments.  This creates a function that can be called with fewer
arguments than it is defined to allow.  For example:

<P>
最有用的形式是给一个或多个参数指定默认值。这样创建的函数可以用较少的参数来调用。例如：

<P>
<div class="verbatim"><pre>
def ask_ok(prompt, retries=4, complaint='Yes or no, please!'):
    while True:
        ok = raw_input(prompt)
        if ok in ('y', 'ye', 'yes'): return True
        if ok in ('n', 'no', 'nop', 'nope'): return False
        retries = retries - 1
        if retries &lt; 0: raise IOError, 'refusenik user'
        print complaint
</pre></div>

<P>
This function can be called either like this:
<code>ask_ok('Do you really want to quit?')</code> or like this:
<code>ask_ok('OK to overwrite the file?', 2)</code>.

<P>
这个函数还可以用以下的方式调用：<code>ask_ok('Do you really want
to quit?')</code>，或者像这样：<code>ask_ok('OK to overwrite the file?',
2)</code>。

<P>
This example also introduces the <tt class="keyword">in</tt> keyword. This tests
whether or not a sequence contains a certain value.

<P>
这个示例还介绍了关键字 <tt class="keyword">in</tt> 。它检测一个序列中是否包含某个给定的值。

<P>
The default values are evaluated at the point of function definition
in the <em>defining</em> scope, so that

<P>
默认值在函数<em>定义</em>段被解析，如下所示：

<P>
<div class="verbatim"><pre>
i = 5

def f(arg=i):
    print arg

i = 6
f()
</pre></div>

<P>
will print <code>5</code>.

<P>
以上代码会打印5。

<P>
<strong>Important warning:</strong>  The default value is evaluated only once.
This makes a difference when the default is a mutable object such as a
list, dictionary, or instances of most classes.  For example, the
following function accumulates the arguments passed to it on
subsequent calls:

<P>
<div class="verbatim"><pre>
def f(a, L=[]):
    L.append(a)
    return L

print f(1)
print f(2)
print f(3)
</pre></div>

<P>
This will print

<P>
这会打印出：

<P>
<div class="verbatim"><pre>
[1]
[1, 2]
[1, 2, 3]
</pre></div>

<P>
If you don't want the default to be shared between subsequent calls,
you can write the function like this instead:

<P>
如果你不想在不同的函数调用之间共享参数默认值，可以如下面的实例一样编写函数：

<P>
<div class="verbatim"><pre>
def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L
</pre></div>

<P>

<H2><A NAME="SECTION005720000000000000000"></A><A NAME="keywordArgs"></A>
<BR>
3.7.2 Keyword Arguments 
</H2>

<P>
Functions can also be called using
keyword arguments of the form "<tt class="samp"><var>keyword</var> = <var>value</var></tt>".  For
instance, the following function:

<P>
函数可以通过关键字参数的形式来调用，形如"<tt class="samp"><var>keyword</var> = <var>value</var></tt>"。例如，以下的函数：

<P>
<div class="verbatim"><pre>
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print "-- This parrot wouldn't", action,
    print "if you put", voltage, "volts through it."
    print "-- Lovely plumage, the", type
    print "-- It's", state, "!"
</pre></div>

<P>
could be called in any of the following ways:

<P>
可以用以下的任一方法调用：

<P>
<div class="verbatim"><pre>
parrot(1000)
parrot(action = 'VOOOOOM', voltage = 1000000)
parrot('a thousand', state = 'pushing up the daisies')
parrot('a million', 'bereft of life', 'jump')
</pre></div>

<P>
but the following calls would all be invalid:

<P>
不过以下几种调用是无效的：

<P>
<div class="verbatim"><pre>
parrot()                     # required argument missing
parrot(voltage=5.0, 'dead')  # non-keyword argument following keyword
parrot(110, voltage=220)     # duplicate value for argument
parrot(actor='John Cleese')  # unknown keyword
</pre></div>

<P>
In general, an argument list must have any positional arguments
followed by any keyword arguments, where the keywords must be chosen
from the formal parameter names.  It's not important whether a formal
parameter has a default value or not.  No argument may receive a
value more than once -- formal parameter names corresponding to
positional arguments cannot be used as keywords in the same calls.
Here's an example that fails due to this restriction:

<P>
通常，参数列表中的每一个关键字都必须来自于形式参数，每个参数都有对应的关键字。形式参数有没有默认值并不重要。实际参数不能一次赋多个值——形式参数不能在同一次调用中同时使用位置和关键字绑定值。这里有一个例子演示了在这种约束下所出现的失败情况：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def function(a):
...     pass
... 
&gt;&gt;&gt; function(0, a=0)
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
TypeError: function() got multiple values for keyword argument 'a'
</pre></div>

<P>
When a final formal parameter of the form <code>**<var>name</var></code> is
present, it receives a <a class="ulink" href="../lib/typesmapping.html"
  >dictionary</a>
containing all keyword arguments except for those corresponding to
a formal parameter.  This may be
combined with a formal parameter of the form
<code>*<var>name</var></code> (described in the next subsection) which receives a
tuple containing the positional arguments beyond the formal parameter
list.  (<code>*<var>name</var></code> must occur before <code>**<var>name</var></code>.)
For example, if we define a function like this:

<P>
引入一个形如 <code>**name</code> 的参数时，它接收一个 <a class="ulink" href="../lib/typesmapping.html"
  >字典</a> ，该字典包含了所有未出现在形式参数列表中的关键字参数。这里可能还会组合使用一个形如 <code>*<var>name</var></code> 的形式参数，它接收一个元组（下一节中会详细介绍），包含了所有没有出现在形式参数列表中的参数值。（<code>*<var>name</var></code> 必须在 <code>**<var>name</var></code> 之前出现） 例如，我们这样定义一个函数：

<P>
<div class="verbatim"><pre>
def cheeseshop(kind, *arguments, **keywords):
    print "-- Do you have any", kind, '?'
    print "-- I'm sorry, we're all out of", kind
    for arg in arguments: print arg
    print '-'*40
    keys = keywords.keys()
    keys.sort()
    for kw in keys: print kw, ':', keywords[kw]
</pre></div>

<P>
It could be called like this:

<P>
它可以像这样调用：

<P>
<div class="verbatim"><pre>
cheeseshop('Limburger', "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           client='John Cleese',
           shopkeeper='Michael Palin',
           sketch='Cheese Shop Sketch')
</pre></div>

<P>
and of course it would print:

<P>
当然它会按如下内容打印：

<P>
<div class="verbatim"><pre>
-- Do you have any Limburger ?
-- I'm sorry, we're all out of Limburger
It's very runny, sir.
It's really very, VERY runny, sir.
----------------------------------------
client : John Cleese
shopkeeper : Michael Palin
sketch : Cheese Shop Sketch
</pre></div>

<P>
Note that the <tt class="method">sort()</tt> method of the list of keyword argument
names is called before printing the contents of the <code>keywords</code>
dictionary; if this is not done, the order in which the arguments are
printed is undefined.

<P>
注意<tt class="method">sort()</tt>方法在关键字字典内容打印前被调用，否则的话，打印参数时的顺序是未定义的。

<P>

<H2><A NAME="SECTION005730000000000000000"></A><A NAME="arbitraryArgs"></A>
<BR>
3.7.3 Arbitrary Argument Lists 可变参数列表 
</H2>

<P>
Finally, the least frequently used option is to specify that a
function can be called with an arbitrary number of arguments.  These
arguments will be wrapped up in a tuple.  Before the variable number
of arguments, zero or more normal arguments may occur.

<P>
最后，一个最不常用的选择是可以让函数调用可变个数的参数。这些参数被包装进一个元组。在这些可变个数的参数之前，可以有零到多个普通的参数：

<P>
<div class="verbatim"><pre>
def fprintf(file, format, *args):
    file.write(format % args)
</pre></div>

<P>

<H2><A NAME="SECTION005740000000000000000"></A><A NAME="unpacking-arguments"></A>
<BR>
3.7.4 Unpacking Argument Lists 参数列表的分拆 
</H2>

<P>
The reverse situation occurs when the arguments are already in a list
or tuple but need to be unpacked for a function call requiring separate
positional arguments.  For instance, the built-in <tt class="function">range()</tt>
function expects separate <var>start</var> and <var>stop</var> arguments.  If they
are not available separately, write the function call with the 
<code>*</code>-operator to unpack the arguments out of a list or tuple:

<P>
另有一种相反的情况: 当你要传递的参数已经是一个列表但要调用的函数却接受分开一个个的参数值. 这时候你要把已有的列表拆开来. 例如内建函数 <tt class="function">range()</tt> 需要要独立的 <var>start</var>, <var>stop</var> 参数. 你可以在调用函数时加一个 <code>*</code> 操作符来自动把参数列表拆开:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; range(3, 6)             # normal call with separate arguments
[3, 4, 5]
&gt;&gt;&gt; args = [3, 6]
&gt;&gt;&gt; range(*args)            # call with arguments unpacked from a list
[3, 4, 5]
</pre></div>

<P>
In the same fashion, dictionaries can deliver keyword arguments with the
<code>**</code>-operator:

<P>
以同样的方式，可以使用 <code>**</code> 操作符分拆关键字参数为字典：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def parrot(voltage, state='a stiff', action='voom'):
...     print "-- This parrot wouldn't", action,
...     print "if you put", voltage, "volts through it.",
...     print "E's", state, "!"
...
&gt;&gt;&gt; d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
&gt;&gt;&gt; parrot(**d)
-- This parrot wouldn't VOOM if you put four million volts through it. E's bleedin' demised !
</pre></div>

<P>

<H2><A NAME="SECTION005750000000000000000"></A><A NAME="lambda"></A>
<BR>
3.7.5 Lambda Forms Lambda 形式 
</H2>

<P>
By popular demand, a few features commonly found in functional
programming languages like Lisp have been added to Python.  With the
<tt class="keyword">lambda</tt> keyword, small anonymous functions can be created.
Here's a function that returns the sum of its two arguments:
"<tt class="samp">lambda a, b: a+b</tt>".  Lambda forms can be used wherever function
objects are required.  They are syntactically restricted to a single
expression.  Semantically, they are just syntactic sugar for a normal
function definition.  Like nested function definitions, lambda forms
can reference variables from the containing scope:

<P>
出于实际需要，有几种通常在功能性语言例如 Lisp 中出现的功能加入到了 Python 。通过 <tt class="keyword">lambda</tt> 关键字，可以创建短小的匿名函数。这里有一个函数返回它的两个参数的和："<tt class="samp">lambda a, b: a+b</tt>"。 Lambda 形式可以用于任何需要的函数对象。出于语法限制，它们只能有一个单独的表达式。语义上讲，它们只是普通函数定义中的一个语法技巧。类似于嵌套函数定义，lambda 形式可以从包含范围内引用变量：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def make_incrementor(n):
...     return lambda x: x + n
...
&gt;&gt;&gt; f = make_incrementor(42)
&gt;&gt;&gt; f(0)
42
&gt;&gt;&gt; f(1)
43
</pre></div>

<P>

<H2><A NAME="SECTION005760000000000000000"></A><A NAME="docstrings"></A>
<BR>
3.7.6 Documentation Strings 文档字符串 
</H2>

<P>
There are emerging conventions about the content and formatting of
documentation strings.
<a id='l2h-12' xml:id='l2h-12'></a>

<P>
这里介绍<a id='l2h-13' xml:id='l2h-13'></a>的概念和格式。

<P>
The first line should always be a short, concise summary of the
object's purpose.  For brevity, it should not explicitly state the
object's name or type, since these are available by other means
(except if the name happens to be a verb describing a function's
operation).  This line should begin with a capital letter and end with
a period.

<P>
第一行应该是关于对象用途的简介。简短起见，不用明确的陈述对象名或类型，因为它们可以从别的途径了解到（除非这个名字碰巧就是描述这个函数操作的动词）。这一行应该以大写字母开头，以句号结尾。

<P>
If there are more lines in the documentation string, the second line
should be blank, visually separating the summary from the rest of the
description.  The following lines should be one or more paragraphs
describing the object's calling conventions, its side effects, etc.

<P>
如果文档字符串有多行，第二行应该空出来，与接下来的详细描述明确分隔。接下来的文档应该有一或多段描述对象的调用约定、边界效应等。

<P>
The Python parser does not strip indentation from multi-line string
literals in Python, so tools that process documentation have to strip
indentation if desired.  This is done using the following convention.
The first non-blank line <em>after</em> the first line of the string
determines the amount of indentation for the entire documentation
string.  (We can't use the first line since it is generally adjacent
to the string's opening quotes so its indentation is not apparent in
the string literal.)  Whitespace ``equivalent'' to this indentation is
then stripped from the start of all lines of the string.  Lines that
are indented less should not occur, but if they occur all their
leading whitespace should be stripped.  Equivalence of whitespace
should be tested after expansion of tabs (to 8 spaces, normally).

<P>
Python的解释器不会从多行的文档字符串中去除缩进，所以必要的时候应当自己清除缩进。这符合通常的习惯。第一行<em>之后</em>的第一个非空行决定了整个文档的缩进格式。（我们不用第一行是因为它通常紧靠着起始的引号，缩进格式显示的不清楚。）留白“相当于”是字符串的起始缩进。每一行都不应该有缩进，如果有缩进的话，所有的留白都应该清除掉。留白的长度应当等于扩展制表符的宽度（通常是8个空格）。

<P>
Here is an example of a multi-line docstring:

<P>
以下是一个多行文档字符串的示例：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def my_function():
...     """Do nothing, but document it.
... 
...     No, really, it doesn't do anything.
...     """
...     pass
... 
&gt;&gt;&gt; print my_function.__doc__
Do nothing, but document it.

    No, really, it doesn't do anything.
</pre></div>

<P>
<BR><HR><H4>Footnotes</H4>
<DL>
<DT><A NAME="foot2441">... object).</A><A
 HREF="node5.html#tex2html3"><SUP>3.1</SUP></A></DT>
<DD>
         Actually, <em>call by object reference</em> would be a better
         description, since if a mutable object is passed, the caller
         will see any changes the callee makes to it (items
         inserted into a list).


</DD>
<DT><A NAME="foot378">...函数引用的实际参数在函数调用时引入局部符号表，因此，实参总是传值调用（这里的值总是一个对象引用，而不是该对象的值）。</A><A
 HREF="node5.html#tex2html4"><SUP>3.2</SUP></A></DT>
<DD>事实上，称之为调用对象的引用更合适。因为一个可变对象传递进来后，调用者可以看到被调用对象的任何修改（如在链表中插入一个新的子项）。

</DD>
</DL>

