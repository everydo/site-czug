<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node12.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node12.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node12.html#SECTION0012100000000000000000">10.1 Output Formatting 格式化输出</a>
<LI><A href="node12.html#SECTION0012200000000000000000">10.2 Templating 模版</a>
<LI><A href="node12.html#SECTION0012300000000000000000">10.3 Working with Binary Data Record Layouts 使用二进制记录层</a>
<LI><A href="node12.html#SECTION0012400000000000000000">10.4 Multi-threading 多线程</a>
<LI><A href="node12.html#SECTION0012500000000000000000">10.5 Logging 日志</a>
<LI><A href="node12.html#SECTION0012600000000000000000">10.6 Weak References 弱引用</a>
<LI><A href="node12.html#SECTION0012700000000000000000">10.7 Tools for Working with Lists 链表工具</a>
<LI><A href="node12.html#SECTION0012800000000000000000">10.8 Decimal Floating Point Arithmetic 十进制浮点数算法</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION0012000000000000000000"></A><A NAME="briefTourTwo"></A>
<BR>
10. Brief Tour of the Standard Library - Part II 标准库概览 
</H1>

<P>
This second tour covers more advanced modules that support professional
programming needs.  These modules rarely occur in small scripts.

<P>
第二部分包含了支持专业编程工作所需的更高级的模块，这些模块很少出现在小脚本中。

<P>

<H1><A NAME="SECTION0012100000000000000000"></A><A NAME="output-formatting"></A>
<BR>
10.1 Output Formatting 格式化输出 
</H1>

<P>
The <a class="ulink" href="../lib/module-repr.html"
  ><tt class="module">repr</tt></a> module provides a
version of <tt class="function">repr()</tt> customized for abbreviated displays of large
or deeply nested containers:

<P>
<a class="ulink" href="../lib/module-repr.html"
  ><tt class="module">repr</tt></a> 提供了一个 <tt class="function">repr()</tt> 的定制版本，以显示大型或深度嵌套的容器： 

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; import repr   
    &gt;&gt;&gt; repr.repr(set('supercalifragilisticexpialidocious'))
    "set(['a', 'c', 'd', 'e', 'f', 'g', ...])"
</pre></div>

<P>
The <a class="ulink" href="../lib/module-pprint.html"
  ><tt class="module">pprint</tt></a> module offers
more sophisticated control over printing both built-in and user defined
objects in a way that is readable by the interpreter.  When the result
is longer than one line, the ``pretty printer'' adds line breaks and
indentation to more clearly reveal data structure:

<P>
The <a class="ulink" href="../lib/module-pprint.html"
  ><tt class="module">pprint</tt></a> 模块给老手提供了一种解释器可读的方式深入控制内置和用户自定义对象的打印。当输出超过一行的时候，“美化打印（pretty printer）”添加断行和标识符，使得数据结构显示的更清晰：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; import pprint
    &gt;&gt;&gt; t = [[[['black', 'cyan'], 'white', ['green', 'red']], [['magenta',
    ...     'yellow'], 'blue']]]
    ...
    &gt;&gt;&gt; pprint.pprint(t, width=30)
    [[[['black', 'cyan'],
       'white',
       ['green', 'red']],
      [['magenta', 'yellow'],
       'blue']]]
</pre></div>

<P>
The <a class="ulink" href="../lib/module-textwrap.html"
  ><tt class="module">textwrap</tt></a> module
formats paragraphs of text to fit a given screen width:

<P>
The <a class="ulink" href="../lib/module-textwrap.html"
  ><tt class="module">textwrap</tt></a> 模块格式化文本段落以适应设定的屏宽：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; import textwrap
    &gt;&gt;&gt; doc = """The wrap() method is just like fill() except that it returns
    ... a list of strings instead of one big string with newlines to separate
    ... the wrapped lines."""
    ...
    &gt;&gt;&gt; print textwrap.fill(doc, width=40)
    The wrap() method is just like fill()
    except that it returns a list of strings
    instead of one big string with newlines
    to separate the wrapped lines.
</pre></div>

<P>
The <a class="ulink" href="../lib/module-locale.html"
  ><tt class="module">locale</tt></a> module accesses
a database of culture specific data formats.  The grouping attribute
of locale's format function provides a direct way of formatting numbers
with group separators:

<P>
The <a class="ulink" href="../lib/module-locale.html"
  ><tt class="module">locale</tt></a> 模块按访问预定好的国家信息数据库。locale的格式化函数属性集提供了一个直接方式以分组标示格式化数字：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; import locale
    &gt;&gt;&gt; locale.setlocale(locale.LC_ALL, 'English_United States.1252')
    'English_United States.1252'
    &gt;&gt;&gt; conv = locale.localeconv()          # get a mapping of conventions
    &gt;&gt;&gt; x = 1234567.8
    &gt;&gt;&gt; locale.format("%d", x, grouping=True)
    '1,234,567'
    &gt;&gt;&gt; locale.format("%s%.*f", (conv['currency_symbol'],
    ...	      conv['frac_digits'], x), grouping=True)
    '$1,234,567.80'
</pre></div>

<P>

<H1><A NAME="SECTION0012200000000000000000"></A><A NAME="templating"></A>
<BR>
10.2 Templating 模版 
</H1>

<P>
The <a class="ulink" href="../lib/module-string.html"
  ><tt class="module">string</tt></a> module includes a
versatile <tt class="class">Template</tt> class with a simplified syntax suitable for
editing by end-users.  This allows users to customize their applications
without having to alter the application.

<P>
<a class="ulink" href="../lib/module-string.html"
  ><tt class="module">string</tt></a> 提供了一个灵活多变的模版类 <tt class="class">template</tt>，使用它最终用户可以用简单的进行编辑。这使用户可以在不进行改变的情况下定制他们的应用程序。

<P>
The format uses placeholder names formed by "<tt class="samp">$</tt>" with valid Python
identifiers (alphanumeric characters and underscores).  Surrounding the
placeholder with braces allows it to be followed by more alphanumeric letters
with no intervening spaces.  Writing "<tt class="samp">$$</tt>" creates a single escaped
"<tt class="samp">$</tt>":

<P>
格式使用 "<tt class="samp">$</tt>" 为开头的 Python 合法标识（数字、字母和下划线）作为占位符。占位符外面的大括号使它可以和其它的字符不加空格混在一起。 "<tt class="samp">$$</tt>" 创建一个单独的 "<tt class="samp">$</tt>"。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; from string import Template
&gt;&gt;&gt; t = Template('${village}folk send $$10 to $cause.')
&gt;&gt;&gt; t.substitute(village='Nottingham', cause='the ditch fund')
'Nottinghamfolk send $10 to the ditch fund.'
</pre></div>

<P>
The <tt class="method">substitute</tt> method raises a <tt class="exception">KeyError</tt> when a
placeholder is not supplied in a dictionary or a keyword argument. For
mail-merge style applications, user supplied data may be incomplete and the
<tt class="method">safe_substitute</tt> method may be more appropriate -- it will leave
placeholders unchanged if data is missing:

<P>
字典或者关键字参数中缺少某个占位符的时候 <tt class="method">substitute</tt> 方法抛出 <tt class="exception">KeyError</tt> 异常。在邮件-合并风格的应用程序中，用户提供的数据可能并不完整，也许用 <tt class="method">safe-substitute</tt> 方法更合适——如果数据不完整，它保留未改动的占位符：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; t = Template('Return the $item to $owner.')
&gt;&gt;&gt; d = dict(item='unladen swallow')
&gt;&gt;&gt; t.substitute(d)
Traceback (most recent call last):
  . . .
KeyError: 'owner'
&gt;&gt;&gt; t.safe_substitute(d)
'Return the unladen swallow to $owner.'
</pre></div>

<P>
Template subclasses can specify a custom delimiter.  For example, a batch
renaming utility for a photo browser may elect to use percent signs for
placeholders such as the current date, image sequence number, or file format:

<P>
模版子类可以指定一个定制分隔符。例如，图像浏览器的批量命名工具可能选用百分号作为表示当前日期、图像序列号或文件格式的占位符：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import time, os.path
&gt;&gt;&gt; photofiles = ['img_1074.jpg', 'img_1076.jpg', 'img_1077.jpg']
&gt;&gt;&gt; class BatchRename(Template):
...     delimiter = '%'
&gt;&gt;&gt; fmt = raw_input('Enter rename style (%d-date %n-seqnum %f-format):  ')
Enter rename style (%d-date %n-seqnum %f-format):  Ashley_%n%f

&gt;&gt;&gt; t = BatchRename(fmt)
&gt;&gt;&gt; date = time.strftime('%d%b%y')
&gt;&gt;&gt; for i, filename in enumerate(photofiles):
...     base, ext = os.path.splitext(filename)
...     newname = t.substitute(d=date, n=i, f=ext)
...     print '%s --&gt; %s' % (filename, newname)

img_1074.jpg --&gt; Ashley_0.jpg
img_1076.jpg --&gt; Ashley_1.jpg
img_1077.jpg --&gt; Ashley_2.jpg
</pre></div>

<P>
Another application for templating is separating program logic from the
details of multiple output formats.  This makes it possible to substitute
custom templates for XML files, plain text reports, and HTML web reports.

<P>
另一个应用是将多样化的输出格式细节从程序逻辑中分离出来。这使得为 XML 文件，纯文本报表，HTML web 报表定制替换模版成为可能。

<P>

<H1><A NAME="SECTION0012300000000000000000"></A><A NAME="binary-formats"></A>
<BR>
10.3 Working with Binary Data Record Layouts 使用二进制记录层 
</H1>

<P>
The <a class="ulink" href="../lib/module-struct.html"
  ><tt class="module">struct</tt></a> module provides
<tt class="function">pack()</tt> and <tt class="function">unpack()</tt> functions for working with
variable length binary record formats.  The following example shows how
to loop through header information in a ZIP file (with pack codes
<code>"H"</code> and <code>"L"</code> representing two and four byte unsigned
numbers respectively):

<P>
<a class="ulink" href="../lib/module-struct.html"
  ><tt class="module">struct</tt></a> 模块提供 <tt class="function">pack()</tt> 和 <tt class="function">unpack()</tt> 函数用于变长二进制记录格式。以下示例显示了如何通过ZIP文件的头信息（压缩代码中的 <code>"H"</code> 和 <code>"L"</code> 分别传递二和四字节无符号整数）。

<P>
<div class="verbatim"><pre>
    import struct

    data = open('myfile.zip', 'rb').read()
    start = 0
    for i in range(3):                      # show the first 3 file headers
        start += 14
        fields = struct.unpack('LLLHH', data[start:start+16])
        crc32, comp_size, uncomp_size, filenamesize, extra_size = fields

        start += 16
        filename = data[start:start+filenamesize]
        start += filenamesize
        extra = data[start:start+extra_size]
        print filename, hex(crc32), comp_size, uncomp_size

        start += extra_size + comp_size     # skip to the next header
</pre></div>

<P>

<H1><A NAME="SECTION0012400000000000000000"></A><A NAME="multi-threading"></A>
<BR>
10.4 Multi-threading 多线程 
</H1>

<P>
Threading is a technique for decoupling tasks which are not sequentially
dependent.  Threads can be used to improve the responsiveness of
applications that accept user input while other tasks run in the
background.  A related use case is running I/O in parallel with
computations in another thread.

<P>
线程是一个分离无顺序依赖关系任务的技术。在某些任务运行于后台的时候应用程序会变得迟缓，线程可以提升其速度。一个有关的用途是在I/O的同时其它线程可以并行计算。

<P>
The following code shows how the high level
<a class="ulink" href="../lib/module-threading.html"
  ><tt class="module">threading</tt></a> module can run
tasks in background while the main program continues to run:

<P>
下面的代码显示了高级模块 <a class="ulink" href="../lib/module-threading.html"
  ><tt class="module">threading</tt></a> 如何在主程序运行的同时运行任务。

<P>
<div class="verbatim"><pre>
    import threading, zipfile

    class AsyncZip(threading.Thread):
        def __init__(self, infile, outfile):
            threading.Thread.__init__(self)        
            self.infile = infile
            self.outfile = outfile
        def run(self):
            f = zipfile.ZipFile(self.outfile, 'w', zipfile.ZIP_DEFLATED)
            f.write(self.infile)
            f.close()
            print 'Finished background zip of: ', self.infile

    background = AsyncZip('mydata.txt', 'myarchive.zip')
    background.start()
    print 'The main program continues to run in foreground.'
    
    background.join()    # Wait for the background task to finish
    print 'Main program waited until background was done.'
</pre></div>

<P>
The principal challenge of multi-threaded applications is coordinating
threads that share data or other resources.  To that end, the threading
module provides a number of synchronization primitives including locks,
events, condition variables, and semaphores.

<P>
多线程应用程序最重要的挑战是在协调线程共享的数据和其它资源。最终，线程模块提供了几个基本的同步方式如锁、事件，条件变量和旗语。

<P>
While those tools are powerful, minor design errors can result in
problems that are difficult to reproduce.  So, the preferred approach
to task coordination is to concentrate all access to a resource
in a single thread and then use the
<a class="ulink" href="../lib/module-Queue.html"
  ><tt class="module">Queue</tt></a> module to feed that
thread with requests from other threads.  Applications using
<tt class="class">Queue</tt> objects for inter-thread communication and coordination
are easier to design, more readable, and more reliable.

<P>
尽管工具很强大，微小的设计错误也可能造成难以挽回的故障。因此，更好的方法是将所有的资源访问集中到一个独立的线程中，然后使用 <a class="ulink" href="../lib/module-Queue.html"
  ><tt class="module">Queue</tt></a> 模块调度该线程相应其它线程的请求。应用程序使用 <tt class="class">Queue</tt> 对象可以让内部线程通信和协调更容易设计，更可读，更可靠。

<P>

<H1><A NAME="SECTION0012500000000000000000"></A><A NAME="logging"></A>
<BR>
10.5 Logging 日志 
</H1>

<P>
The <a class="ulink" href="../lib/module-logging.html"
  ><tt class="module">logging</tt></a> module offers
a full featured and flexible logging system.  At its simplest, log
messages are sent to a file or to <code>sys.stderr</code>:

<P>
<a class="ulink" href="../lib/module-logging.html"
  ><tt class="module">logging</tt></a> 模块提供了完整和灵活的日志系统。它最简单的用法是记录信息并发送到一个文件或 <code>sys.stderr</code>:

<P>
<div class="verbatim"><pre>
    import logging
    logging.debug('Debugging information')
    logging.info('Informational message')
    logging.warning('Warning:config file %s not found', 'server.conf')
    logging.error('Error occurred')
    logging.critical('Critical error -- shutting down')
</pre></div>

<P>
This produces the following output: 
这里是输出：

<P>
<div class="verbatim"><pre>
    WARNING:root:Warning:config file server.conf not found
    ERROR:root:Error occurred
    CRITICAL:root:Critical error -- shutting down
</pre></div>

<P>
By default, informational and debugging messages are suppressed and the
output is sent to standard error.  Other output options include routing
messages through email, datagrams, sockets, or to an HTTP Server.  New
filters can select different routing based on message priority:
<tt class="constant">DEBUG</tt>, <tt class="constant">INFO</tt>, <tt class="constant">WARNING</tt>, <tt class="constant">ERROR</tt>,
and <tt class="constant">CRITICAL</tt>.

<P>
默认情况下捕获信息和调试消息并将输出发送到标准错误流。其它可选的路由信息方式通过email，数据报文，socket或者HTTP Server。基于消息属性，新的过滤器可以选择不同的路由：<tt class="constant">DEBUG</tt>,<tt class="constant">INFO</tt>，<tt class="constant">WARNING</tt>，<tt class="constant">ERROR</tt> 和 <tt class="constant">CRITICAL</tt>。

<P>
The logging system can be configured directly from Python or can be
loaded from a user editable configuration file for customized logging
without altering the application.

<P>
日志系统可以直接在 Python 中定制，也可以不经过应用程序直接在一个用户可编辑的配置文件中加载。

<P>

<H1><A NAME="SECTION0012600000000000000000"></A><A NAME="weak-references"></A>
<BR>
10.6 Weak References 弱引用
</H1>

<P>
Python does automatic memory management (reference counting for most
objects and garbage collection to eliminate cycles).  The memory is
freed shortly after the last reference to it has been eliminated.

<P>
Python 自动进行内存管理（对大多数的对象进行引用计数和垃圾回收以循环利用）在最后一个引用消失后，内存会很快释放。

<P>
This approach works fine for most applications but occasionally there
is a need to track objects only as long as they are being used by
something else.  Unfortunately, just tracking them creates a reference
that makes them permanent.  The
<a class="ulink" href="../lib/module-weakref.html"
  ><tt class="module">weakref</tt></a> module provides
tools for tracking objects without creating a reference.  When the
object is no longer needed, it is automatically removed from a weakref
table and a callback is triggered for weakref objects.  Typical
applications include caching objects that are expensive to create:

<P>
这个工作方式对大多数应用程序工作良好，但是偶尔会需要跟踪对象来做一些事。不幸的是，仅仅为跟踪它们创建引用也会使其长期存在。 <a class="ulink" href="../lib/module-weakref.html"
  ><tt class="module">weakref</tt></a>  模块提供了不用创建引用的跟踪对象工具，一旦对象不再存在，它自动从弱引用表上删除并触发回调。典型的应用包括捕获难以构造的对象：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; import weakref, gc
    &gt;&gt;&gt; class A:
    ...     def __init__(self, value):
    ...             self.value = value
    ...     def __repr__(self):
    ...             return str(self.value)
    ...
    &gt;&gt;&gt; a = A(10)                   # create a reference
    &gt;&gt;&gt; d = weakref.WeakValueDictionary()
    &gt;&gt;&gt; d['primary'] = a            # does not create a reference
    &gt;&gt;&gt; d['primary']                # fetch the object if it is still alive
    10
    &gt;&gt;&gt; del a                       # remove the one reference
    &gt;&gt;&gt; gc.collect()                # run garbage collection right away
    0
    &gt;&gt;&gt; d['primary']                # entry was automatically removed
    Traceback (most recent call last):
      File "&lt;pyshell#108&gt;", line 1, in -toplevel-
        d['primary']                # entry was automatically removed
      File "C:/PY24/lib/weakref.py", line 46, in __getitem__
        o = self.data[key]()
    KeyError: 'primary'
</pre></div>

<P>

<H1><A NAME="SECTION0012700000000000000000"></A><A NAME="list-tools"></A>
<BR>
10.7 Tools for Working with Lists 链表工具 
</H1>

<P>
Many data structure needs can be met with the built-in list type.
However, sometimes there is a need for alternative implementations
with different performance trade-offs.

<P>
很多数据结构可能会用到内置链表类型。然而，有时可能需要不同性能代价的实现。

<P>
The <a class="ulink" href="../lib/module-array.html"
  ><tt class="module">array</tt></a> module provides an
<tt class="class">array()</tt> object that is like a list that stores only homogenous
data and stores it more compactly.  The following example shows an array
of numbers stored as two byte unsigned binary numbers (typecode
<code>"H"</code>) rather than the usual 16 bytes per entry for regular lists
of python int objects:

<P>
<a class="ulink" href="../lib/module-array.html"
  ><tt class="module">array</tt></a>模块提供了一个类似链表的 <tt class="class">array()</tt> 对象，它仅仅是存储数据，更为紧凑。以下的示例演示了一个存储双字节无符号整数的数组（类型编码 <code>"H"</code>）而非存储16字节 Python 整数对象的普通正规链表，：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; from array import array
    &gt;&gt;&gt; a = array('H', [4000, 10, 700, 22222])
    &gt;&gt;&gt; sum(a)
    26932
    &gt;&gt;&gt; a[1:3]
    array('H', [10, 700])
</pre></div>

<P>
The <a class="ulink" href="../lib/module-collections.html"
  ><tt class="module">collections</tt></a> module
provides a <tt class="class">deque()</tt> object that is like a list with faster
appends and pops from the left side but slower lookups in the middle.
These objects are well suited for implementing queues and breadth first
tree searches:

<P>
<a class="ulink" href="../lib/module-collections.html"
  ><tt class="module">collections</tt></a> 模块提供了类似链表的 <tt class="class">deque()</tt> 对象，它从左边添加（append）和弹出（pop）更快，但是在内部查询更慢。这些对象更适用于队列实现和广度优先的树搜索：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; from collections import deque
    &gt;&gt;&gt; d = deque(["task1", "task2", "task3"])
    &gt;&gt;&gt; d.append("task4")
    &gt;&gt;&gt; print "Handling", d.popleft()
    Handling task1

    unsearched = deque([starting_node])
    def breadth_first_search(unsearched):
        node = unsearched.popleft()
        for m in gen_moves(node):
            if is_goal(m):
                return m
            unsearched.append(m)
</pre></div>

<P>
In addition to alternative list implementations, the library also offers
other tools such as the <a class="ulink" href="../lib/module-bisect.html"
  ><tt class="module">bisect</tt></a>
module with functions for manipulating sorted lists:

<P>
除了链表的替代实现，该库还提供了 <a class="ulink" href="../lib/module-bisect.html"
  ><tt class="module">bisect</tt></a> 这样的模块以操作存储链表：

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; import bisect
    &gt;&gt;&gt; scores = [(100, 'perl'), (200, 'tcl'), (400, 'lua'), (500, 'python')]
    &gt;&gt;&gt; bisect.insort(scores, (300, 'ruby'))
    &gt;&gt;&gt; scores
    [(100, 'perl'), (200, 'tcl'), (300, 'ruby'), (400, 'lua'), (500, 'python')]
</pre></div>

<P>
The <a class="ulink" href="../lib/module-heapq.html"
  ><tt class="module">heapq</tt></a> module provides
functions for implementing heaps based on regular lists.  The lowest
valued entry is always kept at position zero.  This is useful for
applications which repeatedly access the smallest element but do not
want to run a full list sort:

<P>
<a class="ulink" href="../lib/module-heapq.html"
  ><tt class="module">heapq</tt></a> 提供了基于正规链表的堆实现。最小的值总是保持在0点。这在希望循环访问最小元素但是不想执行完整堆排序的时候非常有用。

<P>
<div class="verbatim"><pre>
    &gt;&gt;&gt; from heapq import heapify, heappop, heappush
    &gt;&gt;&gt; data = [1, 3, 5, 7, 9, 2, 4, 6, 8, 0]
    &gt;&gt;&gt; heapify(data)                      # rearrange the list into heap order
    &gt;&gt;&gt; heappush(data, -5)                 # add a new entry
    &gt;&gt;&gt; [heappop(data) for i in range(3)]  # fetch the three smallest entries
    [-5, 0, 1]
</pre></div>

<P>

<H1><A NAME="SECTION0012800000000000000000"></A><A NAME="decimal-fp"></A>
<BR>
10.8 Decimal Floating Point Arithmetic 十进制浮点数算法 
</H1>

<P>
The <a class="ulink" href="../lib/module-decimal.html"
  ><tt class="module">decimal</tt></a> module offers a
<tt class="class">Decimal</tt> datatype for decimal floating point arithmetic.  Compared to
the built-in <tt class="class">float</tt> implementation of binary floating point, the new
class is especially helpful for financial applications and other uses which
require exact decimal representation, control over precision, control over
rounding to meet legal or regulatory requirements, tracking of significant
decimal places, or for applications where the user expects the results to
match calculations done by hand.

<P>
<a class="ulink" href="../lib/module-decimal.html"
  ><tt class="module">decimal</tt></a> 模块提供了一个 <tt class="class">Decimal</tt> 数据类型用于浮点数计算。相比内置的二进制浮点数实现 <tt class="class">float</tt>，新类型特别适用于金融应用和其它需要精确十进制表达的场合，控制精度，控制舍入以适应法律或者规定要求，确保十进制数位精度，或者用户希望用作数学计算的场合。

<P>
For example, calculating a 5% tax on a 70 cent phone charge gives
different results in decimal floating point and binary floating point.
The difference becomes significant if the results are rounded to the
nearest cent:

<P>
例如，计算 70 分电话费的 5% 税计算，十进制浮点数和二进制浮点数计算结果的差别如下。如果在分值上舍入，这个差别就很重要了。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; from decimal import *       
&gt;&gt;&gt; Decimal('0.70') * Decimal('1.05')
Decimal("0.7350")
&gt;&gt;&gt; .70 * 1.05
0.73499999999999999
</pre></div>

<P>
The <tt class="class">Decimal</tt> result keeps a trailing zero, automatically inferring four
place significance from multiplicands with two place significance.  Decimal reproduces
mathematics as done by hand and avoids issues that can arise when binary
floating point cannot exactly represent decimal quantities.

<P>
<tt class="class">Decimal</tt> 的结果总是保有结尾的0，自动从两位精度延伸到4位。Decimal重现了手工的数学运算，这就确保了二进制浮点数无法精确保有的数据精度。

<P>
Exact representation enables the <tt class="class">Decimal</tt> class to perform
modulo calculations and equality tests that are unsuitable for binary
floating point:

<P>
高精度使 <tt class="class">Decimal</tt> 可以执行二进制浮点数无法进行的模运算和等值测试。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; Decimal('1.00') % Decimal('.10')
Decimal("0.00")
&gt;&gt;&gt; 1.00 % 0.10
0.09999999999999995
       
&gt;&gt;&gt; sum([Decimal('0.1')]*10) == Decimal('1.0')
True
&gt;&gt;&gt; sum([0.1]*10) == 1.0
False
</pre></div>

<P>
The <tt class="module">decimal</tt> module provides arithmetic with as much precision as
needed:

<P>
<tt class="module">decimal</tt> 提供了精度算法。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; getcontext().prec = 36
&gt;&gt;&gt; Decimal(1) / Decimal(7)
Decimal("0.142857142857142857142857142857142857")
</pre></div>

<P>


