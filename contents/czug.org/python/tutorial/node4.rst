---
created: 
creator: panjy
description: ''
title: 数据结构
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node6.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node6.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node6.html#SECTION006100000000000000000">4.1 More on Lists 深入链表</a>
<UL>
<LI><A href="node6.html#SECTION006110000000000000000">4.1.1 Using Lists as Stacks 把链表当作堆栈使用</a>
<LI><A href="node6.html#SECTION006120000000000000000">4.1.2 Using Lists as Queues 把链表当作队列使用</a>
<LI><A href="node6.html#SECTION006130000000000000000">4.1.3 Functional Programming Tools 函数化编程工具</a>
<LI><A href="node6.html#SECTION006140000000000000000">4.1.4 List Comprehensions 链表推导式</a>
</ul>
<LI><A href="node6.html#SECTION006200000000000000000">4.2 The <tt class="keyword">del</tt> statement <tt class="keyword">del</tt>语句</a>
<LI><A href="node6.html#SECTION006300000000000000000">4.3 Tuples and Sequences 元组和序列</a>
<LI><A href="node6.html#SECTION006400000000000000000">4.4 Sets 集合</a>
<LI><A href="node6.html#SECTION006500000000000000000">4.5 Dictionaries 字典</a>
<LI><A href="node6.html#SECTION006600000000000000000">4.6 Looping Techniques 循环技术</a>
<LI><A href="node6.html#SECTION006700000000000000000">4.7 More on Conditions 深入条件控制</a>
<LI><A href="node6.html#SECTION006800000000000000000">4.8 Comparing Sequences and Other Types 不同序列类型的比较</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION006000000000000000000"></A><A NAME="structures"></A>
<BR>
4. Data Structures 数据结构 
</H1>

<P>
This chapter describes some things you've learned about already in
more detail, and adds some new things as well.

<P>
本章节深入讲述一些你已经学习过的东西，并且还加入了新的内容。

<P>

<H1><A NAME="SECTION006100000000000000000"></A><A NAME="moreLists"></A>
<BR>
4.1 More on Lists 深入链表 
</H1>

<P>
The list data type has some more methods.  Here are all of the methods
of list objects:

<P>
链表类型有很多方法，这里是链表类型的所有方法：

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-14' xml:id='l2h-14' class="method">append</tt></b>(</nobr></td>
  <td><var>x</var>)</td></tr></table></dt>
<dd>
Add an item to the end of the list;
equivalent to <code>a[len(a):] = [<var>x</var>]</code>.

<P>
把一个元素添加到链表的结尾，相当于 <code>a[len(a):] = [x]</code>
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-15' xml:id='l2h-15' class="method">extend</tt></b>(</nobr></td>
  <td><var>L</var>)</td></tr></table></dt>
<dd>
Extend the list by appending all the items in the given list;
equivalent to <code>a[len(a):] = <var>L</var></code>.

<P>
在指定位置插入一个元素。第一个参数是准备插入到其前面的那个元素的索引，例如<code>a.insert(0, x)</code> 会插入到整个链表之前，而<code>a.insert(len(a), x)</code> 相当于 <code>a.append(x)</code>。
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-16' xml:id='l2h-16' class="method">insert</tt></b>(</nobr></td>
  <td><var>i, x</var>)</td></tr></table></dt>
<dd>
Insert an item at a given position.  The first argument is the index
of the element before which to insert, so <code>a.insert(0, <var>x</var>)</code>
inserts at the front of the list, and <code>a.insert(len(a), <var>x</var>)</code>
is equivalent to <code>a.append(<var>x</var>)</code>.

<P>
删除链表中值为<var>x</var>的第一个元素。如果没有这样的元素，就会返回一个错误。
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-17' xml:id='l2h-17' class="method">remove</tt></b>(</nobr></td>
  <td><var>x</var>)</td></tr></table></dt>
<dd>
Remove the first item from the list whose value is <var>x</var>.
It is an error if there is no such item.

<P>
删除链表中值为<var>x</var>的第一个元素。如果没有这样的元素，就会返回一个错误。
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-18' xml:id='l2h-18' class="method">pop</tt></b>(</nobr></td>
  <td><var></var><big>[</big><var>i</var><big>]</big><var></var>)</td></tr></table></dt>
<dd>
Remove the item at the given position in the list, and return it.  If
no index is specified, <code>a.pop()</code> removes and returns the last item
in the list.  (The square brackets
around the <var>i</var> in the method signature denote that the parameter
is optional, not that you should type square brackets at that
position.  You will see this notation frequently in the
<em class="citetitle"><a
 href="../lib/lib.html"
 title="Python Library Reference"
 >Python Library Reference</a></em>.)

<P>
从链表的指定位置删除元素，并将其返回。如果没有指定索引，<code>a.pop()</code> 返回最后一个元素。元素随即从链表中被删除。（方法 中<var>i</var> 两边的方括号表示这个参数是可选的，而不是要求你输入一对方括号，你会经常在<em class="citetitle"><a
 href="../lib/lib.html"
 title="Python 库参考手册"
 >Python 库参考手册</a></em>中遇到这样的标记。）
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-19' xml:id='l2h-19' class="method">index</tt></b>(</nobr></td>
  <td><var>x</var>)</td></tr></table></dt>
<dd>
Return the index in the list of the first item whose value is <var>x</var>.
It is an error if there is no such item.

<P>
返回链表中第一个值为 <var>x</var> 的元素的索引。如果没有匹配的元素就会返回一个错误。
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-20' xml:id='l2h-20' class="method">count</tt></b>(</nobr></td>
  <td><var>x</var>)</td></tr></table></dt>
<dd>
Return the number of times <var>x</var> appears in the list.

<P>
返回<var>x</var>在链表中出现的次数。
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-21' xml:id='l2h-21' class="method">sort</tt></b>(</nobr></td>
  <td><var></var>)</td></tr></table></dt>
<dd>
Sort the items of the list, in place.

<P>
对链表中的元素就地（原文 in place，意即该操作直接修改调用它的对象——译者）进行排序。
</dl>

<P>
<dl><dt><table cellpadding="0" cellspacing="0"><tr valign="baseline">
  <td><nobr><b><tt id='l2h-22' xml:id='l2h-22' class="method">reverse</tt></b>(</nobr></td>
  <td><var></var>)</td></tr></table></dt>
<dd>
Reverse the elements of the list, in place.

<P>
就地（原文 in place，意即该操作直接修改调用它的对象——译者）倒排链表中的元素。
</dl>

<P>
An example that uses most of the list methods:

<P>
下面这个示例演示了链表的大部分方法：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; a = [66.25, 333, 333, 1, 1234.5]
&gt;&gt;&gt; print a.count(333), a.count(66.25), a.count('x')
2 1 0
&gt;&gt;&gt; a.insert(2, -1)
&gt;&gt;&gt; a.append(333)
&gt;&gt;&gt; a
[66.25, 333, -1, 333, 1, 1234.5, 333]
&gt;&gt;&gt; a.index(333)
1
&gt;&gt;&gt; a.remove(333)
&gt;&gt;&gt; a
[66.25, -1, 333, 1, 1234.5, 333]
&gt;&gt;&gt; a.reverse()
&gt;&gt;&gt; a
[333, 1234.5, 1, 333, -1, 66.25]
&gt;&gt;&gt; a.sort()
&gt;&gt;&gt; a
[-1, 1, 66.25, 333, 333, 1234.5]
</pre></div>

<P>

<H2><A NAME="SECTION006110000000000000000"></A><A NAME="lists-as-stacks"></A>
<BR>
4.1.1 Using Lists as Stacks 把链表当作堆栈使用 
</H2>

<P>
The list methods make it very easy to use a list as a stack, where the
last element added is the first element retrieved (``last-in,
first-out'').  To add an item to the top of the stack, use
<tt class="method">append()</tt>.  To retrieve an item from the top of the stack, use
<tt class="method">pop()</tt> without an explicit index.  For example:

<P>
链表方法使得链表可以很方便的做为一个堆栈来使用，堆栈作为特定的数据结构，最先进入的元素最后一个被释放（后进先出）。用<tt class="method">append()</tt> 方法可以把一个元素添加到堆栈顶。用不指定索引的<tt class="method">pop()</tt> 方法可以把一个元素从堆栈顶释放出来。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; stack = [3, 4, 5]
&gt;&gt;&gt; stack.append(6)
&gt;&gt;&gt; stack.append(7)
&gt;&gt;&gt; stack
[3, 4, 5, 6, 7]
&gt;&gt;&gt; stack.pop()
7
&gt;&gt;&gt; stack
[3, 4, 5, 6]
&gt;&gt;&gt; stack.pop()
6
&gt;&gt;&gt; stack.pop()
5
&gt;&gt;&gt; stack
[3, 4]
</pre></div>

<P>

<H2><A NAME="SECTION006120000000000000000"></A><A NAME="lists-as-queues"></A>
<BR>
4.1.2 Using Lists as Queues 把链表当作队列使用 
</H2>

<P>
You can also use a list conveniently as a queue, where the first
element added is the first element retrieved (``first-in,
first-out'').  To add an item to the back of the queue, use
<tt class="method">append()</tt>.  To retrieve an item from the front of the queue,
use <tt class="method">pop()</tt> with <code>0</code> as the index.  For example:

<P>
你也可以把链表当做队列使用，队列作为特定的数据结构，最先进入的元素最先释放（先进先出）。使用 <tt class="method">append()</tt> 方法可以把元素添加到队列最后，以0为参数调用 <tt class="method">pop()</tt> 方法可以把最先进入的元素释放出来。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; queue = ["Eric", "John", "Michael"]
&gt;&gt;&gt; queue.append("Terry")           # Terry arrives
&gt;&gt;&gt; queue.append("Graham")          # Graham arrives
&gt;&gt;&gt; queue.pop(0)
'Eric'
&gt;&gt;&gt; queue.pop(0)
'John'
&gt;&gt;&gt; queue
['Michael', 'Terry', 'Graham']
</pre></div>

<P>

<H2><A NAME="SECTION006130000000000000000"></A><A NAME="functional"></A>
<BR>
4.1.3 Functional Programming Tools 函数化编程工具 
</H2>

<P>
There are three built-in functions that are very useful when used with
lists: <tt class="function">filter()</tt>, <tt class="function">map()</tt>, and <tt class="function">reduce()</tt>.

<P>
对于链表来讲，有三个内置函数非常有用：<tt class="function">filter()</tt>，
<tt class="function">map()</tt>， 和 <tt class="function">reduce()</tt>。

<P>
"<tt class="samp">filter(<var>function</var>, <var>sequence</var>)</tt>" returns a sequence
consisting of those items from the
sequence for which <code><var>function</var>(<var>item</var>)</code> is true.
If <var>sequence</var> is a <tt class="class">string</tt> or <tt class="class">tuple</tt>, the result will
be of the same type; otherwise, it is always a <tt class="class">list</tt>.
For example, to compute some primes:

<P>
"<tt class="samp">filter(function, sequence)</tt>"返回一个<var>sequence</var>（序列），包括了给定序列中所有调用<code><var>function</var>(<var>item</var>)</code>后返回值为true的元素。（如果可能的话，会返回相同的类型）。如果 <var>sequence</var> 是一个 <tt class="class">string</tt> （字符串）或者 <tt class="class">tuple</tt>（元组），返回值必定是同一类型，否则，它总是 <tt class="class">list</tt>。例如，以下程序可以计算部分素数：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def f(x): return x % 2 != 0 and x % 3 != 0
...
&gt;&gt;&gt; filter(f, range(2, 25))
[5, 7, 11, 13, 17, 19, 23]
</pre></div>

<P>
"<tt class="samp">map(<var>function</var>, <var>sequence</var>)</tt>" calls
<code><var>function</var>(<var>item</var>)</code> for each of the sequence's items and
returns a list of the return values.  For example, to compute some
cubes:

<P>
"<tt class="samp">map(<var>function</var>, <var>sequence</var>)</tt>" 为每一个元素依次调用<code><var>function</var>(<var>item</var>)</code>并将返回值组成一个链表返回。例如，以下程序计算立方：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def cube(x): return x*x*x
...
&gt;&gt;&gt; map(cube, range(1, 11))
[1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]
</pre></div>

<P>
More than one sequence may be passed; the function must then have as
many arguments as there are sequences and is called with the
corresponding item from each sequence (or <code>None</code> if some sequence
is shorter than another).  For example:

<P>
可以传入多个序列，函数也必须要有对应数量的参数，执行时会依次用各序列上对应的元素来调用函数（如果某些序列比其它的短，就用<code>None</code>来代替）。如果把None做为一个函数传入，则直接返回参数做为替代。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; seq = range(8)
&gt;&gt;&gt; def add(x, y): return x+y
...
&gt;&gt;&gt; map(add, seq, seq)
[0, 2, 4, 6, 8, 10, 12, 14]
</pre></div>

<P>
"<tt class="samp">reduce(<var>function</var>, <var>sequence</var>)</tt>" returns a single value
constructed by calling the binary function <var>function</var> on the first two
items of the sequence, then on the result and the next item, and so
on.  For example, to compute the sum of the numbers 1 through 10:

<P>
"<tt class="samp">reduce(<var>func</var>, <var>sequence</var>)</tt>" 返回一个单值，它是这样构造的：首先以序列的前两个元素调用函数，再以返回值和第三个参数调用，依次执行下去。例如，以下程序计算1到10的整数之和：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def add(x,y): return x+y
...
&gt;&gt;&gt; reduce(add, range(1, 11))
55
</pre></div>

<P>
If there's only one item in the sequence, its value is returned; if
the sequence is empty, an exception is raised.

<P>
如果序列中只有一个元素，就返回它，如果序列是空的，就抛出一个异常。

<P>
A third argument can be passed to indicate the starting value.  In this
case the starting value is returned for an empty sequence, and the
function is first applied to the starting value and the first sequence
item, then to the result and the next item, and so on.  For example,

<P>
可以传入第三个参数做为初始值。如果序列是空的，就返回初始值，否则函数会先接收初始值和序列的第一个元素，然后是返回值和下一个元素，依此类推。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def sum(seq):
...     def add(x,y): return x+y
...     return reduce(add, seq, 0)
... 
&gt;&gt;&gt; sum(range(1, 11))
55
&gt;&gt;&gt; sum([])
0
</pre></div>

<P>
Don't use this example's definition of <tt class="function">sum()</tt>: since summing
numbers is such a common need, a built-in function
<code>sum(<var>sequence</var>)</code> is already provided, and works exactly like
this.
不要像示例中这样定义<tt class="function">sum()</tt>：因为合计数值是一个通用的需求，在2.3版中，提供了内置的<code>sum(<var>sequence</var>)</code> 函数。

<span class="versionnote">New in version 2.3.</span>

<P>

<H2><A NAME="SECTION006140000000000000000">
4.1.4 List Comprehensions 链表推导式</A>
</H2>

<P>
List comprehensions provide a concise way to create lists without resorting
to use of <tt class="function">map()</tt>, <tt class="function">filter()</tt> and/or <tt class="keyword">lambda</tt>.
The resulting list definition tends often to be clearer than lists built
using those constructs.  Each list comprehension consists of an expression
followed by a <tt class="keyword">for</tt> clause, then zero or more <tt class="keyword">for</tt> or
<tt class="keyword">if</tt> clauses.  The result will be a list resulting from evaluating
the expression in the context of the <tt class="keyword">for</tt> and <tt class="keyword">if</tt> clauses
which follow it.  If the expression would evaluate to a tuple, it must be
parenthesized.

<P>
链表推导式提供了一个创建链表的简单途径，无需使用<tt class="function">map()</tt>， <tt class="function">filter()</tt> 以及 <tt class="keyword">lambda</tt>。返回链表的定义通常要比创建这些链表更清晰。每一个链表推导式包括在一个<tt class="keyword">for</tt> 语句之后的表达式，零或多个 <tt class="keyword">for</tt>或 <tt class="keyword">if</tt> 语句。返回值是由 <tt class="keyword">for</tt> 或 <tt class="keyword">if</tt>子句之后的表达式得到的元素组成的链表。如果想要得到一个元组，必须要加上括号。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
&gt;&gt;&gt; [weapon.strip() for weapon in freshfruit]
['banana', 'loganberry', 'passion fruit']
&gt;&gt;&gt; vec = [2, 4, 6]
&gt;&gt;&gt; [3*x for x in vec]
[6, 12, 18]
&gt;&gt;&gt; [3*x for x in vec if x &gt; 3]
[12, 18]
&gt;&gt;&gt; [3*x for x in vec if x &lt; 2]
[]
&gt;&gt;&gt; [[x,x**2] for x in vec]
[[2, 4], [4, 16], [6, 36]]
&gt;&gt;&gt; [x, x**2 for x in vec]	# error - parens required for tuples
  File "&lt;stdin&gt;", line 1, in ?
    [x, x**2 for x in vec]
               ^
SyntaxError: invalid syntax
&gt;&gt;&gt; [(x, x**2) for x in vec]
[(2, 4), (4, 16), (6, 36)]
&gt;&gt;&gt; vec1 = [2, 4, 6]
&gt;&gt;&gt; vec2 = [4, 3, -9]
&gt;&gt;&gt; [x*y for x in vec1 for y in vec2]
[8, 6, -18, 16, 12, -36, 24, 18, -54]
&gt;&gt;&gt; [x+y for x in vec1 for y in vec2]
[6, 5, -7, 8, 7, -5, 10, 9, -3]
&gt;&gt;&gt; [vec1[i]*vec2[i] for i in range(len(vec1))]
[8, 12, -54]
</pre></div>

<P>
List comprehensions are much more flexible than <tt class="function">map()</tt> and can be
applied to complex expressions and nested functions:

<P>
链表推导式比 <tt class="function">map()</tt>更复杂，可使用复杂的表达式和嵌套函数。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; [str(round(355/113.0, i)) for i in range(1,6)]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
</pre></div>

<P>

<H1><A NAME="SECTION006200000000000000000"></A><A NAME="del"></A>
<BR>
4.2 The <tt class="keyword">del</tt> statement <tt class="keyword">del</tt>语句 
</H1>

<P>
There is a way to remove an item from a list given its index instead
of its value: the <tt class="keyword">del</tt> statement.  This differs from the
<tt class="method">pop()</tt>) method which returns a value.  The <tt class="keyword">del</tt>
statement can also be used to remove slices from a list or clear the
entire list (which we did earlier by assignment of an empty list to
the slice).  For example:

<P>
有一个方法可从链表中删除指定索引的元素：<tt class="keyword">del</tt> 语句。与返回变量值的 <tt class="method">pop()</tt> 方法不同，del 语句也可以从一个链表中移走切割部分或者整个链表(就像我们早先将一个空链表赋给切割部分)。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; a = [-1, 1, 66.25, 333, 333, 1234.5]
&gt;&gt;&gt; del a[0]
&gt;&gt;&gt; a
[1, 66.25, 333, 333, 1234.5]
&gt;&gt;&gt; del a[2:4]
&gt;&gt;&gt; a
[1, 66.25, 1234.5]
&gt;&gt;&gt; del a[:]
&gt;&gt;&gt; a
[]
</pre></div>

<P>
<tt class="keyword">del</tt> can also be used to delete entire variables:

<P>
<tt class="keyword">del</tt> 也可以用于删除整个变量：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; del a
</pre></div>

<P>
Referencing the name <code>a</code> hereafter is an error (at least until
another value is assigned to it).  We'll find other uses for
<tt class="keyword">del</tt> later.

<P>
此后再引用这个名字会发生错误（至少要到给它赋另一个值为止）。后面我们还会发现<tt class="keyword">del</tt>的其它用法。

<P>

<H1><A NAME="SECTION006300000000000000000"></A><A NAME="tuples"></A>
<BR>
4.3 Tuples and Sequences 元组和序列 
</H1>

<P>
We saw that lists and strings have many common properties, such as
indexing and slicing operations.  They are two examples of
<a class="ulink" href="../lib/typesseq.html"
  ><em>sequence</em> data types</a>.  Since
Python is an evolving language, other sequence data types may be
added.  There is also another standard sequence data type: the
<em>tuple</em>.

<P>
我们知道链表和字符串有很多通用的属性，例如索引和切割操作。它们是序列类型中的两种。因为Python是一个在不停进化的语言，也可能会加入其它的<a class="ulink" href="../lib/typesseq.html"
  ><em>序列</em>类型</a>，这里有另一种标准序列类型：<em>元组</em>。

<P>
A tuple consists of a number of values separated by commas, for
instance:

<P>
一个元组由数个逗号分隔的值组成，例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; t = 12345, 54321, 'hello!'
&gt;&gt;&gt; t[0]
12345
&gt;&gt;&gt; t
(12345, 54321, 'hello!')
&gt;&gt;&gt; # Tuples may be nested:
... u = t, (1, 2, 3, 4, 5)
&gt;&gt;&gt; u
((12345, 54321, 'hello!'), (1, 2, 3, 4, 5))
</pre></div>

<P>
As you see, on output tuples are always enclosed in parentheses, so
that nested tuples are interpreted correctly; they may be input with
or without surrounding parentheses, although often parentheses are
necessary anyway (if the tuple is part of a larger expression).

<P>
如你所见，元组在输出时总是有括号的，以便于正确表达嵌套结构。在输入时可能有或没有括号都可以，不过经常括号都是必须的（如果元组是一个更大的表达式的一部分）。

<P>
Tuples have many uses.  For example: (x, y) coordinate pairs, employee
records from a database, etc.  Tuples, like strings, are immutable: it
is not possible to assign to the individual items of a tuple (you can
simulate much of the same effect with slicing and concatenation,
though).  It is also possible to create tuples which contain mutable
objects, such as lists.

<P>
元组有很多用途。例如(x, y)坐标点，数据库中的员工记录等等。元组就像字符串，不可改变：不能给元组的一个独立的元素赋值（尽管你可以通过联接和切割来模仿）。也可以通过包含可变对象来创建元组，例如链表。

<P>
A special problem is the construction of tuples containing 0 or 1
items: the syntax has some extra quirks to accommodate these.  Empty
tuples are constructed by an empty pair of parentheses; a tuple with
one item is constructed by following a value with a comma
(it is not sufficient to enclose a single value in parentheses).
Ugly, but effective.  For example:

<P>
一个特殊的问题是构造包含零个或一个元素的元组：为了适应这种情况，语法上有一些额外的改变。一对空的括号可以创建空元组；要创建一个单元素元组可以在值后面跟一个逗号（在括号中放入一个单值是不够的）。丑陋，但是有效。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; empty = ()
&gt;&gt;&gt; singleton = 'hello',    # &lt;-- note trailing comma
&gt;&gt;&gt; len(empty)
0
&gt;&gt;&gt; len(singleton)
1
&gt;&gt;&gt; singleton
('hello',)
</pre></div>

<P>
The statement <code>t = 12345, 54321, 'hello!'</code> is an example of
<em>tuple packing</em>: the values <code>12345</code>, <code>54321</code> and
<code>'hello!'</code> are packed together in a tuple.  The reverse operation
is also possible:

<P>
语句 t = 12345, 54321, 'hello!' 是元组封装（sequence packing）的一个例子：值 12345， 54321 和 'hello!' 被封装进元组。其逆操作可能是这样：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; x, y, z = t
</pre></div>

<P>
This is called, appropriately enough, <em>sequence unpacking</em>.
Sequence unpacking requires the list of variables on the left to
have the same number of elements as the length of the sequence.  Note
that multiple assignment is really just a combination of tuple packing
and sequence unpacking!

<P>
这个调用被称为<em>序列拆封</em>非常合适。序列拆封要求左侧的变量数目与序列的元素个数相同。要注意的是可变参数（multiple assignment ）其实只是元组封装和序列拆封的一个结合！

<P>
There is a small bit of asymmetry here:  packing multiple values
always creates a tuple, and unpacking works for any sequence.

<P>
这里有一点不对称：封装多重参数通常会创建一个元组，而拆封操作可以作用于任何序列。

<P>

<H1><A NAME="SECTION006400000000000000000"></A><A NAME="sets"></A>
<BR>
4.4 Sets 集合 
</H1>

<P>
Python also includes a data type for <em>sets</em>.  A set is an unordered
collection with no duplicate elements.  Basic uses include membership
testing and eliminating duplicate entries.  Set objects also support
mathematical operations like union, intersection, difference, and
symmetric difference.

<P>
Python 还包含了一个数据类型—— <em>set</em>（集合）。集合是一个无序不重复元素的集。基本功能包括关系测试和消除重复元素。集合对象还支持 union（联合），intersection（交），difference（差）和sysmmetric difference（对称差集）等数学运算。

<P>
Here is a brief demonstration:

<P>
以下是一个简单的演示：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
&gt;&gt;&gt; fruit = set(basket)               # create a set without duplicates
&gt;&gt;&gt; fruit
set(['orange', 'pear', 'apple', 'banana'])
&gt;&gt;&gt; 'orange' in fruit                 # fast membership testing
True
&gt;&gt;&gt; 'crabgrass' in fruit
False

&gt;&gt;&gt; # Demonstrate set operations on unique letters from two words
...
&gt;&gt;&gt; a = set('abracadabra')
&gt;&gt;&gt; b = set('alacazam')
&gt;&gt;&gt; a                                  # unique letters in a
set(['a', 'r', 'b', 'c', 'd'])
&gt;&gt;&gt; a - b                              # letters in a but not in b
set(['r', 'd', 'b'])
&gt;&gt;&gt; a | b                              # letters in either a or b
set(['a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'])
&gt;&gt;&gt; a &amp; b                              # letters in both a and b
set(['a', 'c'])
&gt;&gt;&gt; a ^ b                              # letters in a or b but not both
set(['r', 'd', 'b', 'm', 'z', 'l'])
</pre></div>

<P>

<H1><A NAME="SECTION006500000000000000000"></A><A NAME="dictionaries"></A>
<BR>
4.5 Dictionaries 字典 
</H1>

<P>
Another useful data type built into Python is the
<a class="ulink" href="../lib/typesmapping.html"
  ><em>dictionary</em></a>.
Dictionaries are sometimes found in other languages as ``associative
memories'' or ``associative arrays''.  Unlike sequences, which are
indexed by a range of numbers, dictionaries are indexed by <em>keys</em>,
which can be any immutable type; strings and numbers can always be
keys.  Tuples can be used as keys if they contain only strings,
numbers, or tuples; if a tuple contains any mutable object either
directly or indirectly, it cannot be used as a key.  You can't use
lists as keys, since lists can be modified in place using
index assignments, slice assignments, or methods like
<tt class="method">append()</tt> and <tt class="method">extend()</tt>.

<P>
另一个非常有用的Python内建数据类型是<a class="ulink" href="../lib/typesmapping.html"
  ><em>字典</em></a>。字典在某些语言中可能称为“联合内存”（``associative memories''）或“联合数组”（``associative arrays''）。序列是以连续的整数为索引，与此不同的是，字典以<em>关键字</em>为索引，关键字可以是任意不可变类型，通常用字符串或数值。如果元组中只包含字符串和数字，它可以做为关键字，如果它直接或间接的包含了可变对象，就不能当做关键字。不能用链表做关键字，因为链表可以用索引、切割或者 <tt class="method">append()</tt> 和 <tt class="method">extend()</tt>等方法改变。

<P>
It is best to think of a dictionary as an unordered set of
<em>key: value</em> pairs, with the requirement that the keys are unique
(within one dictionary).
A pair of braces creates an empty dictionary: <code>{}</code>.
Placing a comma-separated list of key:value pairs within the
braces adds initial key:value pairs to the dictionary; this is also the
way dictionaries are written on output.

<P>
理解字典的最佳方式是把它看做无序的<em>关键字：值</em> 对（key:value pairs）集合，关键字必须是互不相同的（在同一个字典之内）。一对大括号创建一个空的字典：<code>{}</code>。初始化链表时，在大括号内放置一组逗号分隔的关键字：值对，这也是字典输出的方式。

<P>
The main operations on a dictionary are storing a value with some key
and extracting the value given the key.  It is also possible to delete
a key:value pair
with <code>del</code>.
If you store using a key that is already in use, the old value
associated with that key is forgotten.  It is an error to extract a
value using a non-existent key.

<P>
字典的主要操作是依据关键字来存储和析取值。也可以用 <code>del</code> 来删除关键字：值对（key:value）。如果你用一个已经存在的关键字存储值，以前为该关键字分配的值就会被遗忘。试图析取从一个不存在的关键字中读取值会导致错误。

<P>
The <tt class="method">keys()</tt> method of a dictionary object returns a list of all
the keys used in the dictionary, in arbitrary order (if you want it
sorted, just apply the <tt class="method">sort()</tt> method to the list of keys).  To
check whether a single key is in the dictionary, either use the dictionary's
<tt class="method">has_key()</tt> method or the <tt class="keyword">in</tt> keyword.

<P>
字典的 <tt class="method">keys()</tt>方法返回由所有关键字组成的链表，该链表的顺序不定（如果你需要它有序，只能调用关键字链表的<tt class="method">sort()</tt> 方法）。使用字典的 <tt class="method">has_key()</tt>方法或 in 关键字可以检查字典中是否存在某一关键字。

<P>
Here is a small example using a dictionary:

<P>
这是一个关于字典应用的小示例：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; tel = {'jack': 4098, 'sape': 4139}
&gt;&gt;&gt; tel['guido'] = 4127
&gt;&gt;&gt; tel
{'sape': 4139, 'guido': 4127, 'jack': 4098}
&gt;&gt;&gt; tel['jack']
4098
&gt;&gt;&gt; del tel['sape']
&gt;&gt;&gt; tel['irv'] = 4127
&gt;&gt;&gt; tel
{'guido': 4127, 'irv': 4127, 'jack': 4098}
&gt;&gt;&gt; tel.keys()
['guido', 'irv', 'jack']
&gt;&gt;&gt; tel.has_key('guido')
True
&gt;&gt;&gt; 'guido' in tel
True
</pre></div>

<P>
The <tt class="function">dict()</tt> constructor builds dictionaries directly from
lists of key-value pairs stored as tuples.  When the pairs form a
pattern, list comprehensions can compactly specify the key-value list.

<P>
链表中存储关键字-值对元组的话，<tt class="function">dict()</tt> 可以从中直接构造字典。关键字-值对来自某个特定模式时，可以用链表推导式简单的生成关键字-值链表。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
{'sape': 4139, 'jack': 4098, 'guido': 4127}
&gt;&gt;&gt; dict([(x, x**2) for x in (2, 4, 6)])     # use a list comprehension
{2: 4, 4: 16, 6: 36}
</pre></div>

<P>
Later in the tutorial, we will learn about Generator Expressions
which are even better suited for the task of supplying key-values pairs to
the <tt class="function">dict()</tt> constructor.

<P>
在入门指南后面的内容中，我们将会学习更适于为 <tt class="function">dict()</tt> 构造器生成键值对的生成器表达式。

<P>
When the keys are simple strings, it is sometimes easier to specify
pairs using keyword arguments:

<P>
使用简单字符串作为关键字的话，通常用关键字参数更简单。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; dict(sape=4139, guido=4127, jack=4098)
{'sape': 4139, 'jack': 4098, 'guido': 4127}
</pre></div>

<P>

<H1><A NAME="SECTION006600000000000000000"></A><A NAME="loopidioms"></A>
<BR>
4.6 Looping Techniques 循环技术 
</H1>

<P>
When looping through dictionaries, the key and corresponding value can
be retrieved at the same time using the <tt class="method">iteritems()</tt> method.

<P>
在字典中循环时，关键字和对应的值可以使用 <tt class="method">iteritems()</tt>方法同时解读出来。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; knights = {'gallahad': 'the pure', 'robin': 'the brave'}
&gt;&gt;&gt; for k, v in knights.iteritems():
...     print k, v
...
gallahad the pure
robin the brave
</pre></div>

<P>
When looping through a sequence, the position index and corresponding
value can be retrieved at the same time using the
<tt class="function">enumerate()</tt> function.

<P>
在序列中循环时，索引位置和对应值可以使用<tt class="function">enumerate()</tt>函数同时得到。

<P>
<div class="verbatim"><pre> 
&gt;&gt;&gt; for i, v in enumerate(['tic', 'tac', 'toe']):
...     print i, v
...
0 tic
1 tac
2 toe
</pre></div>

<P>
To loop over two or more sequences at the same time, the entries
can be paired with the <tt class="function">zip()</tt> function.

<P>
同时循环两个或更多的序列，可以使用 <tt class="function">zip()</tt> 整体解读。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; questions = ['name', 'quest', 'favorite color']
&gt;&gt;&gt; answers = ['lancelot', 'the holy grail', 'blue']
&gt;&gt;&gt; for q, a in zip(questions, answers):
...     print 'What is your %s?  It is %s.' % (q, a)
...	
What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.
</pre></div>

<P>
To loop over a sequence in reverse, first specify the sequence
in a forward direction and then call the <tt class="function">reversed()</tt>
function.

<P>
需要逆向循环序列的话，先正向定位序列，然后调用 <tt class="function">reversed()</tt> 函数

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; for i in reversed(xrange(1,10,2)):
...     print i
...
9
7
5
3
1
</pre></div>

<P>
To loop over a sequence in sorted order, use the <tt class="function">sorted()</tt>
function which returns a new sorted list while leaving the source
unaltered.

<P>
要按排序后的顺序循环序列的话，使用 <tt class="function">sorted()</tt> 函数，它不改动原序列，而是生成一个新的排好序的序列。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
&gt;&gt;&gt; for f in sorted(set(basket)):
...     print f
... 	
apple
banana
orange
pear
</pre></div>

<P>

<H1><A NAME="SECTION006700000000000000000"></A><A NAME="conditions"></A>
<BR>
4.7 More on Conditions 深入条件控制
</H1>

<P>
The conditions used in <code>while</code> and <code>if</code> statements can
contain any operators, not just comparisons.

<P>
<code>while</code> 和 <code>if</code> 语句中使用的条件不仅可以使用比较，而且可以包含任意的操作。

<P>
The comparison operators <code>in</code> and <code>not in</code> check whether a value
occurs (does not occur) in a sequence.  The operators <code>is</code> and
<code>is not</code> compare whether two objects are really the same object; this
only matters for mutable objects like lists.  All comparison operators
have the same priority, which is lower than that of all numerical
operators.

<P>
<code>in</code> 和 <code>not in</code> 比较操作符审核值是否在一个区间之内。操作符 <code>is</code> <code>is not</code> 和比较两个对象是否相同；这只和诸如链表这样的可变对象有关。所有的比较操作符具有相同的优先级，低于所有的数值操作。

<P>
Comparisons can be chained.  For example, <code>a &lt; b == c</code> tests
whether <code>a</code> is less than <code>b</code> and moreover <code>b</code> equals
<code>c</code>.

<P>
比较操作可以传递。例如 <code>a &lt; b == c</code> 审核是否 <code>a</code> 小于 <code>b</code> 并 <code>b</code> 等于<code>c</code>。

<P>
Comparisons may be combined using the Boolean operators <code>and</code> and
<code>or</code>, and the outcome of a comparison (or of any other Boolean
expression) may be negated with <code>not</code>.  These have lower
priorities than comparison operators; between them, <code>not</code> has
the highest priority and <code>or</code> the lowest, so that
<code>A and not B or C</code> is equivalent to <code>(A and (not B)) or C</code>.
As always, parentheses can be used to express the desired composition.

<P>
比较操作可以通过逻辑操作符 <code>and</code> 和 <code>or</code> 组合，比较的结果可以用 <code>not</code> 来取反义。这些操作符的优先级又低于比较操作符，在它们之中，<code>not</code> 具有最高的优先级， <code>or</code> 优先级最低，所以<code>A and not B or C</code> 等于 <code>(A and (not B)) or C</code>。当然，表达式可以用期望的方式表示。

<P>
The Boolean operators <code>and</code> and <code>or</code> are so-called
<em>short-circuit</em> operators: their arguments are evaluated from
left to right, and evaluation stops as soon as the outcome is
determined.  For example, if <code>A</code> and <code>C</code> are true but
<code>B</code> is false, <code>A and B and C</code> does not evaluate the
expression <code>C</code>.  When used as a general value and not as a
Boolean, the return value of a short-circuit operator is the last
evaluated argument.

<P>
逻辑操作符 <code>and</code> 和 <code>or</code> 也称作<em>短路</em>操作符：它们的参数从左向右解析，一旦结果可以确定就停止。例如，如果 <code>A</code> 和 <code>C</code> 为真而 <code>B</code> 为假， <code>A and B and C</code> 不会解析 <code>C</code>。作用于一个普通的非逻辑值时，短路操作符的返回值通常是最后一个变量

<P>
It is possible to assign the result of a comparison or other Boolean
expression to a variable.  For example,

<P>
可以把比较或其它逻辑表达式的返回值赋给一个变量，例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; string1, string2, string3 = '', 'Trondheim', 'Hammer Dance'
&gt;&gt;&gt; non_null = string1 or string2 or string3
&gt;&gt;&gt; non_null
'Trondheim'
</pre></div>

<P>
Note that in Python, unlike C, assignment cannot occur inside expressions.
C programmers may grumble about this, but it avoids a common class of
problems encountered in C programs: typing <code>=</code> in an expression when
<code>==</code> was intended.

<P>
需要注意的是Python与C不同，在表达式内部不能赋值。C 程序员经常对此抱怨，不过它避免了一类在 C 程序中司空见惯的错误：想要在解析式中使 <code>==</code> 时误用了 <code>=</code> 操作符。

<P>

<H1><A NAME="SECTION006800000000000000000"></A><A NAME="comparing"></A>
<BR>
4.8 Comparing Sequences and Other Types 不同序列类型的比较
</H1>

<P>
Sequence objects may be compared to other objects with the same
sequence type.  The comparison uses <em>lexicographical</em> ordering:
first the first two items are compared, and if they differ this
determines the outcome of the comparison; if they are equal, the next
two items are compared, and so on, until either sequence is exhausted.
If two items to be compared are themselves sequences of the same type,
the lexicographical comparison is carried out recursively.  If all
items of two sequences compare equal, the sequences are considered
equal.  If one sequence is an initial sub-sequence of the other, the
shorter sequence is the smaller (lesser) one.  Lexicographical
ordering for strings uses the ASCII ordering for individual
characters.  Some examples of comparisons between sequences of the
same type:

<P>
序列对象可以与相同类型的其它对象比较。比较操作按 <em>字典序</em> 进行：首先比较前两个元素，如果不同，就决定了比较的结果；如果相同，就比较后两个元素，依此类推，直到所有序列都完成比较。如果两个元素本身就是同样类型的序列，就递归字典序比较。如果两个序列的所有子项都相等，就认为序列相等。如果一个序列是另一个序列的初始子序列，较短的一个序列就小于另一个。字符串的字典序按照单字符的 ASCII 顺序。下面是同类型序列之间比较的一些例子：

<P>
<div class="verbatim"><pre>
(1, 2, 3)              &lt; (1, 2, 4)
[1, 2, 3]              &lt; [1, 2, 4]
'ABC' &lt; 'C' &lt; 'Pascal' &lt; 'Python'
(1, 2, 3, 4)           &lt; (1, 2, 4)
(1, 2)                 &lt; (1, 2, -1)
(1, 2, 3)             == (1.0, 2.0, 3.0)
(1, 2, ('aa', 'ab'))   &lt; (1, 2, ('abc', 'a'), 4)
</pre></div>

<P>
Note that comparing objects of different types is legal.  The outcome
is deterministic but arbitrary: the types are ordered by their name.
Thus, a list is always smaller than a string, a string is always
smaller than a tuple, etc.  <A NAME="tex2html5"
  HREF="#foot829"><SUP>4.1</SUP></A> Mixed numeric types are compared according to their numeric value, so
0 equals 0.0, etc.

<P>
需要注意的是不同类型的对象比较是合法的。输出结果是确定而非任意的：类型按它们的名字排序。因而，一个链表（list）总是小于一个字符串（string），一个字符串（string）总是小于一个元组（tuple）等等。数值类型比较时会统一它们的数据类型，所以0等于0.0，等等。<A NAME="tex2html6"
  HREF="#foot830"><SUP>4.2</SUP></A>
<P>
<BR><HR><H4>Footnotes</H4>
<DL>
<DT><A NAME="foot829">... etc.</A><A
 HREF="node6.html#tex2html5"><SUP>4.1</SUP></A></DT>
<DD>
        The rules for comparing objects of different types should
        not be relied upon; they may change in a future version of
        the language.


</DD>
<DT><A NAME="foot830">...需要注意的是不同类型的对象比较是合法的。输出结果是确定而非任意的：类型按它们的名字排序。因而，一个链表（list）总是小于一个字符串（string），一个字符串（string）总是小于一个元组（tuple）等等。数值类型比较时会统一它们的数据类型，所以0等于0.0，等等。</A><A
 HREF="node6.html#tex2html6"><SUP>4.2</SUP></A></DT>
<DD>
    不同类型对象的比较规则不依赖于此，它们有可能会在Python语言的后继版本中改变。


</DD>
</DL>

