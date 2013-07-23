<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node9.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node9.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node9.html#SECTION009100000000000000000">7.1 Syntax Errors 语法错误</a>
<LI><A href="node9.html#SECTION009200000000000000000">7.2 Exceptions 异常</a>
<LI><A href="node9.html#SECTION009300000000000000000">7.3 Handling Exceptions 处理异常</a>
<LI><A href="node9.html#SECTION009400000000000000000">7.4 Raising Exceptions 抛出异常</a>
<LI><A href="node9.html#SECTION009500000000000000000">7.5 User-defined Exceptions 用户自定义异常</a>
<LI><A href="node9.html#SECTION009600000000000000000">7.6 Defining Clean-up Actions 定义清理行为</a>
<LI><A href="node9.html#SECTION009700000000000000000">7.7 Predefined Clean-up Actions 预定义清理行为</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION009000000000000000000"></A><A NAME="errors"></A>
<BR>
7. Errors and Exceptions 错误和异常 
</H1>

<P>
Until now error messages haven't been more than mentioned, but if you
have tried out the examples you have probably seen some.  There are
(at least) two distinguishable kinds of errors:
<em>syntax errors</em> and <em>exceptions</em>.

<P>
至今为止还没有进一步的谈论过错误信息，不过在你已经试验过的那些例子中，可能已经遇到过一些。Python 中（至少）有两种错误：语法错误和异常（ <em>syntax errors</em>and <em>exceptions</em> ）。

<P>

<H1><A NAME="SECTION009100000000000000000"></A><A NAME="syntaxErrors"></A>
<BR>
7.1 Syntax Errors 语法错误 
</H1>

<P>
Syntax errors, also known as parsing errors, are perhaps the most common
kind of complaint you get while you are still learning Python:

<P>
语法错误，也称作解析错误，可能是学习 Python 的过程中最容易犯的：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; while True print 'Hello world'
  File "&lt;stdin&gt;", line 1, in ?
    while True print 'Hello world'
                   ^
SyntaxError: invalid syntax
</pre></div>

<P>
The parser repeats the offending line and displays a little `arrow'
pointing at the earliest point in the line where the error was
detected.  The error is caused by (or at least detected at) the token
<em>preceding</em> the arrow: in the example, the error is detected at
the keyword <tt class="keyword">print</tt>, since a colon ("<tt class="character">:</tt>") is missing
before it.  File name and line number are printed so you know where to
look in case the input came from a script.

<P>
解析器会重复出错的行，并在行中最早发现的错误位置上显示一个小箭头。错误（至少是被检测到的）就发生在箭头指向的位置。示例中的错误表现在关键字<tt class="keyword">print</tt> 上，因为在它之前少了一个冒号（ "<tt class="character">:</tt>"）。同时也会显示文件名和行号，这样你就可以知道错误来自哪个脚本，什么位置。

<P>

<H1><A NAME="SECTION009200000000000000000"></A><A NAME="exceptions"></A>
<BR>
7.2 Exceptions 异常 
</H1>

<P>
Even if a statement or expression is syntactically correct, it may
cause an error when an attempt is made to execute it.
Errors detected during execution are called <em>exceptions</em> and are
not unconditionally fatal: you will soon learn how to handle them in
Python programs.  Most exceptions are not handled by programs,
however, and result in error messages as shown here:

<P>
即使是在语法上完全正确的语句，尝试执行它的时候，也有可能会发生错误。在程序运行中检测出的错误称之为<em>异常</em>，它通常不会导致致命的问题，你很快就会学到如何在 Python 程序中控制它们。大多数异常不会由程序处理，而是显示一个错误信息：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 10 * (1/0)
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
ZeroDivisionError: integer division or modulo by zero
&gt;&gt;&gt; 4 + spam*3
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
NameError: name 'spam' is not defined
&gt;&gt;&gt; '2' + 2
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
TypeError: cannot concatenate 'str' and 'int' objects
</pre></div>

<P>
The last line of the error message indicates what happened.
Exceptions come in different types, and the type is printed as part of
the message: the types in the example are
<tt class="exception">ZeroDivisionError</tt>, <tt class="exception">NameError</tt> and
<tt class="exception">TypeError</tt>.
The string printed as the exception type is the name of the built-in
exception that occurred.  This is true for all built-in
exceptions, but need not be true for user-defined exceptions (although
it is a useful convention).
Standard exception names are built-in identifiers (not reserved
keywords).

<P>
错误信息的最后一行指出发生了什么错误。异常也有不同的类型，异常类型做为错误信息的一部分显示出来：示例中的异常分别为 <tt class="exception">零除错误（ ZeroDivisionError ）</tt> ，<tt class="exception">命名错误（ NameError）</tt> 和 <tt class="exception">类型错误（TypeError）</tt>。打印错误信息时，异常的类型作为异常的内置名显示。对于所有的内置异常都是如此，不过用户自定义异常就不一定了（尽管这是一个很有用的约定）。标准异常名是内置的标识（没有保留关键字）。

<P>
The rest of the line provides detail based on the type of exception
and what caused it.

<P>
这一行后一部分是关于该异常类型的详细说明，这意味着它的内容依赖于异常类型。

<P>
The preceding part of the error message shows the context where the
exception happened, in the form of a stack traceback.
In general it contains a stack traceback listing source lines; however,
it will not display lines read from standard input.

<P>
错误信息的前半部分以堆栈的形式列出异常发生的位置。通常在堆栈中列出了源代码行，然而，来自标准输入的源码不会显示出来。

<P>
The <em class="citetitle"><a
 href="../lib/module-exceptions.html"
 title="Python Library
Reference"
 >Python Library
Reference</a></em> lists the built-in exceptions and their meanings.

<P>
<em class="citetitle"><a
 href="../lib/module-exceptions.html"
 title="Python 库参考手册"
 >Python 库参考手册</a></em>列出了内置异常和它们的含义。

<P>

<H1><A NAME="SECTION009300000000000000000"></A><A NAME="handling"></A>
<BR>
7.3 Handling Exceptions 处理异常 
</H1>

<P>
It is possible to write programs that handle selected exceptions.
Look at the following example, which asks the user for input until a
valid integer has been entered, but allows the user to interrupt the
program (using <kbd>Control-C</kbd> or whatever the operating system
supports); note that a user-generated interruption is signalled by
raising the <tt class="exception">KeyboardInterrupt</tt> exception.

<P>
通过编程可以处理指定的异常。以下的例子重复要求用户输入一个值，直到用户输入的是一个合法的整数为止。不过这个程序允许用户中断程序（使用<kbd>Control-C</kbd> 或者其它操作系统支持的方法）。需要注意的是用户发出的中断会引发一个<tt class="exception">KeyboardInterrupt</tt> 异常。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; while True:
...     try:
...         x = int(raw_input("Please enter a number: "))
...         break
...     except ValueError:
...         print "Oops!  That was no valid number.  Try again..."
...
</pre></div>

<P>
The <tt class="keyword">try</tt> statement works as follows.

<P>
<tt class="keyword">try</tt> 语句按如下方式工作：

<P>

<UL>
<LI>First, the <em>try clause</em> (the statement(s) between the
<tt class="keyword">try</tt> and <tt class="keyword">except</tt> keywords) is executed.

<P>
首先，执行 <em>try</em> 子句（在 <tt class="keyword">try</tt> 和 <tt class="keyword">except</tt>
关键字之间的部分）。

<P>
</LI>
<LI>If no exception occurs, the <em>except clause</em> is skipped and
execution of the <tt class="keyword">try</tt> statement is finished.

<P>
如果没有异常发生， <em>except 子句</em> 在 <tt class="keyword">try</tt> 语句执行完毕后就被忽略了。

<P>
</LI>
<LI>If an exception occurs during execution of the try clause, the rest of
the clause is skipped.  Then if its type matches the exception named
after the <tt class="keyword">except</tt> keyword, the except clause is executed, and
then execution continues after the <tt class="keyword">try</tt> statement.

<P>
如果在 <tt class="keyword">try</tt>
子句执行过程中发生了异常，那么该子句其余的部分就会被忽略。如果异常匹配于 <tt class="keyword">except</tt> 关键字后面指定的异常类型，就执行对应的except子句，忽略try子句的其它部分。然后继续执行try语句之后的代码。

<P>
</LI>
<LI>If an exception occurs which does not match the exception named in the
except clause, it is passed on to outer <tt class="keyword">try</tt> statements; if
no handler is found, it is an <em>unhandled exception</em> and execution
stops with a message as shown above.

<P>
如果发生了一个异常，在 except 子句中没有与之匹配的分支，它就会传递到上一级 <tt class="keyword">try</tt> 语句中。如果最终仍找不到对应的处理语句，它就成为一个未处理异常，终止程序运行，显示提示信息。

<P>
</LI>
</UL>

<P>
A <tt class="keyword">try</tt> statement may have more than one except clause, to
specify handlers for different exceptions.  At most one handler will
be executed.  Handlers only handle exceptions that occur in the
corresponding try clause, not in other handlers of the same
<tt class="keyword">try</tt> statement.  An except clause may name multiple exceptions
as a parenthesized tuple, for example:

<P>
一个 <tt class="keyword">try</tt> 语句可能包含多个 except 子句，分别指定处理不同的异常。至多只会有一个分支被执行。异常处理程序只会处理对应的 <tt class="keyword">try</tt> 子句中发生的异常，在同一个 <tt class="keyword">try</tt> 语句中，其他子句中发生的异常则不作处理。一个except子句可以在括号中列出多个异常的名字，例如：

<P>
<div class="verbatim"><pre>
... except (RuntimeError, TypeError, NameError):
...     pass
</pre></div>

<P>
The last except clause may omit the exception name(s), to serve as a
wildcard.  Use this with extreme caution, since it is easy to mask a
real programming error in this way!  It can also be used to print an
error message and then re-raise the exception (allowing a caller to
handle the exception as well):

<P>
最后一个 except 子句可以省略异常名，把它当做一个通配项使用。一定要慎用这种方法，因为它很可能会屏蔽掉真正的程序错误，使人无法发现！它也可以用于打印一行错误信息，然后重新抛出异常（可以使调用者更好的处理异常）。

<P>
<div class="verbatim"><pre>
import sys

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except IOError, (errno, strerror):
    print "I/O error(%s): %s" % (errno, strerror)
except ValueError:
    print "Could not convert data to an integer."
except:
    print "Unexpected error:", sys.exc_info()[0]
    raise
</pre></div>

<P>
The <tt class="keyword">try</tt> ... <tt class="keyword">except</tt> statement has an optional
<em>else clause</em>, which, when present, must follow all except
clauses.  It is useful for code that must be executed if the try
clause does not raise an exception.  For example:

<P>
<tt class="keyword">try</tt> ... <tt class="keyword">except</tt> 语句可以带有一个 <em>else 子句</em>， 该子句只能出现在所有 except 子句之后。当 try 语句没有抛出异常时，需要执行一些代码，可以使用这个子句。例如：

<P>
<div class="verbatim"><pre>
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except IOError:
        print 'cannot open', arg
    else:
        print arg, 'has', len(f.readlines()), 'lines'
        f.close()
</pre></div>

<P>
The use of the <tt class="keyword">else</tt> clause is better than adding additional
code to the <tt class="keyword">try</tt> clause because it avoids accidentally
catching an exception that wasn't raised by the code being protected
by the <tt class="keyword">try</tt> ... <tt class="keyword">except</tt> statement.

<P>
使用 <tt class="keyword">else</tt> 子句比在 <tt class="keyword">try</tt> 子句中附加代码要好，因为这样可以避免 <tt class="keyword">try</tt> ...
<BR>
keywordexcept 意外的截获本来不属于它们保护的那些代码抛出的异常。

<P>
When an exception occurs, it may have an associated value, also known as
the exception's <em>argument</em>.
The presence and type of the argument depend on the exception type.

<P>
发生异常时，可能会有一个附属值，作为异常的参数存在。这个参数是否存在、是什么类型，依赖于异常的类型。

<P>
The except clause may specify a variable after the exception name (or tuple).
The variable is bound to an exception instance with the arguments stored
in <code>instance.args</code>.  For convenience, the exception instance
defines <tt class="method">__getitem__</tt> and <tt class="method">__str__</tt> so the arguments can
be accessed or printed directly without having to reference <code>.args</code>.

<P>
在异常名（列表）之后，也可以为 except 子句指定一个变量。这个变量绑定于一个异常实例，它存储在 <code>instance.args</code> 的参数中。为了方便起见，异常实例定义了 <tt class="method">__getitem__</tt> 和 <tt class="method">__str__</tt>，这样就可以直接访问过打印参数而不必引用 <code>.args</code>。

<P>
But use of <code>.args</code> is discouraged.  Instead, the preferred use is to pass
a single argument to an exception (which can be a tuple if multiple arguments
are needed) and have it bound to the <code>message</code> attribute.  One my also
instantiate an exception first before raising it and add any attributes to it
as desired.

<P>
这种做法不受鼓励。相反，更好的做法是给异常传递一个参数（如果要传递多个参数，可以传递一个元组），把它绑定到 <code>message</code> 属性。一旦异常发生，它会在抛出前绑定所有指定的属性。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; try:
...    raise Exception('spam', 'eggs')
... except Exception, inst:
...    print type(inst)     # the exception instance
...    print inst.args      # arguments stored in .args
...    print inst           # __str__ allows args to printed directly
...    x, y = inst          # __getitem__ allows args to be unpacked directly
...    print 'x =', x
...    print 'y =', y
...
&lt;type 'instance'&gt;
('spam', 'eggs')
('spam', 'eggs')
x = spam
y = eggs
</pre></div>

<P>
If an exception has an argument, it is printed as the last part
(`detail') of the message for unhandled exceptions.

<P>
对于未处理的异常，如果它有一个参数，那做就会作为错误信息的最后一部分（“明细”）打印出来。

<P>
Exception handlers don't just handle exceptions if they occur
immediately in the try clause, but also if they occur inside functions
that are called (even indirectly) in the try clause.
For example:

<P>
异常处理句柄不止可以处理直接发生在 try 子句中的异常，即使是其中（甚至是间接）调用的函数，发生了异常，也一样可以处理。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def this_fails():
...     x = 1/0
... 
&gt;&gt;&gt; try:
...     this_fails()
... except ZeroDivisionError, detail:
...     print 'Handling run-time error:', detail
... 
Handling run-time error: integer division or modulo by zero
</pre></div>

<P>

<H1><A NAME="SECTION009400000000000000000"></A><A NAME="raising"></A>
<BR>
7.4 Raising Exceptions 抛出异常 
</H1>

<P>
The <tt class="keyword">raise</tt> statement allows the programmer to force a
specified exception to occur.
For example:

<P>
程序员可以用 <tt class="keyword">raise</tt> 语句强制指定的异常发生。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; raise NameError, 'HiThere'
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
NameError: HiThere
</pre></div>

<P>
The first argument to <tt class="keyword">raise</tt> names the exception to be
raised.  The optional second argument specifies the exception's
argument.  Alternatively, the above could be written as
<code>raise NameError('HiThere')</code>.  Either form works fine, but there
seems to be a growing stylistic preference for the latter.

<P>
第一个参数指定了所抛出异常的名称，第二个指定了异常的参数。还有一种可以替代的写法是 <code>raise NameError('HiThere')</code>。两种形式都能用，只不过看上去前一种风格比后一种更好。

<P>
If you need to determine whether an exception was raised but don't
intend to handle it, a simpler form of the <tt class="keyword">raise</tt> statement
allows you to re-raise the exception:

<P>
如果你决定抛出一个异常而不处理它， <tt class="keyword">raise</tt> 语句可以让你很简单的重新抛出该异常。

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; try:
...     raise NameError, 'HiThere'
... except NameError:
...     print 'An exception flew by!'
...     raise
...
An exception flew by!
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 2, in ?
NameError: HiThere
</pre></div>

<P>

<H1><A NAME="SECTION009500000000000000000"></A><A NAME="userExceptions"></A>
<BR>
7.5 User-defined Exceptions 用户自定义异常 
</H1>

<P>
Programs may name their own exceptions by creating a new exception
class.  Exceptions should typically be derived from the
<tt class="exception">Exception</tt> class, either directly or indirectly.  For
example:

<P>
在程序中可以通过创建新的异常类型来命名自己的异常。异常类通常应该直接或间接的从 <tt class="exception">Exception</tt> 类派生，例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; class MyError(Exception):
...     def __init__(self, value):
...         self.value = value
...     def __str__(self):
...         return repr(self.value)
... 
&gt;&gt;&gt; try:
...     raise MyError(2*2)
... except MyError, e:
...     print 'My exception occurred, value:', e.value
... 
My exception occurred, value: 4
&gt;&gt;&gt; raise MyError, 'oops!'
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
__main__.MyError: 'oops!'
</pre></div>

<P>
In this example, the default <tt class="method">__init__</tt> of <tt class="class">Exception</tt>
has been overridden.  The new behavior simply creates the <var>value</var>
attribute.  This replaces the default behavior of creating the
<var>args</var> attribute.

<P>
在这个例子中，<tt class="class">Exception</tt> 默认的 <tt class="method">__init__</tt> 被覆盖。新的方式简单的创建 <var>value</var> 属性。这就替换了原来创建 <var>args</var> 属性的方式。

<P>
Exception classes can be defined which do anything any other class can
do, but are usually kept simple, often only offering a number of
attributes that allow information about the error to be extracted by
handlers for the exception.  When creating a module that can raise
several distinct errors, a common practice is to create a base class
for exceptions defined by that module, and subclass that to create
specific exception classes for different error conditions:

<P>
异常类中可以定义任何其它类中可以定义的东西，但是通常为了保持简单，只在其中加入几个属性信息，以供异常处理句柄提取。如果一个新创建的模块中需要抛出几种不同的错误时，一个通常的作法是为该模块定义一个异常基类，然后针对不同的错误类型派生出对应的异常子类。

<P>
<div class="verbatim"><pre>
class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class InputError(Error):
    """Exception raised for errors in the input.

    Attributes:
        expression -- input expression in which the error occurred
        message -- explanation of the error
    """

    def __init__(self, expression, message):
        self.expression = expression
        self.message = message

class TransitionError(Error):
    """Raised when an operation attempts a state transition that's not
    allowed.

    Attributes:
        previous -- state at beginning of transition
        next -- attempted new state
        message -- explanation of why the specific transition is not allowed
    """

    def __init__(self, previous, next, message):
        self.previous = previous
        self.next = next
        self.message = message
</pre></div>

<P>
Most exceptions are defined with names that end in ``Error,'' similar
to the naming of the standard exceptions.

<P>
与标准异常相似，大多数异常的命名都以“Error”结尾。

<P>
Many standard modules define their own exceptions to report errors
that may occur in functions they define.  More information on classes
is presented in chapter <A HREF="node10.html#classes">8</A>, ``Classes.''

<P>
很多标准模块中都定义了自己的异常，用以报告在他们所定义的函数中可能发生的错误。关于类的进一步信息请参见第 9 章 <A HREF="node10.html#classes">8</A>，“类”。

<P>

<H1><A NAME="SECTION009600000000000000000"></A><A NAME="cleanup"></A>
<BR>
7.6 Defining Clean-up Actions 定义清理行为 
</H1>

<P>
The <tt class="keyword">try</tt> statement has another optional clause which is
intended to define clean-up actions that must be executed under all
circumstances.  For example:

<P>
<tt class="keyword">try</tt> 语句还有另一个可选的子句，目的在于定义在任何情况下都一定要执行的功能。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; try:
...     raise KeyboardInterrupt
... finally:
...     print 'Goodbye, world!'
... 
Goodbye, world!
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 2, in ?
KeyboardInterrupt
</pre></div>

<P>
A <em>finally clause</em> is always executed before leaving the
<tt class="keyword">try</tt> statement, whether an exception has occurred or not.
When an exception has occurred in the <tt class="keyword">try</tt> clause and has not
been handled by an <tt class="keyword">except</tt> clause (or it has occurred in a
<tt class="keyword">except</tt> or <tt class="keyword">else</tt> clause), it is re-raised after the
<tt class="keyword">finally</tt> clause has been executed.  The <tt class="keyword">finally</tt> clause
is also executed ``on the way out'' when any other clause of the
<tt class="keyword">try</tt> statement is left via a <tt class="keyword">break</tt>, <tt class="keyword">continue</tt>
or <tt class="keyword">return</tt> statement.  A more complicated example:

<P>
不管try子句中有没有发生异常， finally 子句在程序离开 <tt class="keyword">try</tt> 后都一定会被执行。当 <tt class="keyword">try</tt> 子句中发生了未被 <tt class="keyword">except</tt> 捕获的异常（或者它发生在 <tt class="keyword">excepte</tt> 或 <tt class="keyword">else</tt> 子句中），在 finally 子句执行完后它会被重新抛出。 <tt class="keyword">try</tt> 子句经由 <tt class="keyword">break</tt>，<tt class="keyword">continue</tt> 或 <tt class="keyword">return</tt> 语句退出也一样会执行 finally 子句。以下是一个更复杂些的例子：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; def divide(x, y):
...     try:
...         result = x / y
...     except ZeroDivisionError:
...         print "division by zero!"
...     else:
...         print "result is", result
...     finally:
...         print "executing finally clause"
...
&gt;&gt;&gt; divide(2, 1)
result is 2
executing finally clause
&gt;&gt;&gt; divide(2, 0)
division by zero!
executing finally clause
&gt;&gt;&gt; divide("2", "1")
executing finally clause
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
  File "&lt;stdin&gt;", line 3, in divide
TypeError: unsupported operand type(s) for /: 'str' and 'str'
</pre></div>

<P>
As you can see, the <tt class="keyword">finally</tt> clause is executed in any
event.  The <tt class="exception">TypeError</tt> raised by dividing two strings
is not handled by the <tt class="keyword">except</tt> clause and therefore
re-raised after the <tt class="keyword">finally</tt> clauses has been executed.

<P>
如你所见，<tt class="keyword">(</tt>finally) 子句在任何情况下都会执行。<tt class="exception">TypeError</tt>在两个字符串相除的时候抛出，未被 <tt class="keyword">except</tt> 子句捕获，因此在 <tt class="keyword">finally</tt> 子句执行完毕后重新抛出。

<P>
In real world applications, the <tt class="keyword">finally</tt> clause is useful
for releasing external resources (such as files or network connections),
regardless of whether the use of the resource was successful.

<P>
在实际的应用程序中，<tt class="keyword">finally</tt> 子句用于释放外部资源（例如文件或网络连接），无论资源的使用是否成功。

<P>

<H1><A NAME="SECTION009700000000000000000"></A><A NAME="cleanup-with"></A>
<BR>
7.7 Predefined Clean-up Actions 预定义清理行为 
</H1>

<P>
Some objects define standard clean-up actions to be undertaken when
the object is no longer needed, regardless of whether or not the
operation using the object succeeded or failed.
Look at the following example, which tries to open a file and print
its contents to the screen.

<P>
有些对象定义了标准的清理行为，无论对象操作是否成功，不再需要该对象的时候就会起作用。以下示例尝试打开文件并把内容打印到屏幕上。

<P>
<div class="verbatim"><pre>
for line in open("myfile.txt"):
    print line
</pre></div>

<P>
The problem with this code is that it leaves the file open for an
indeterminate amount of time after the code has finished executing.
This is not an issue in simple scripts, but can be a problem for
larger applications. The <tt class="keyword">with</tt> statement allows
objects like files to be used in a way that ensures they are
always cleaned up promptly and correctly.

<P>
这段代码的问题在于在代码执行完后没有立即关闭打开的文件。这在简单的脚本里没什么，但是大型应用程序就会出问题。<tt class="keyword">with</tt> 语句使得文件之类的对象可以确保总能及时准确地进行清理。

<P>
<div class="verbatim"><pre>
with open("myfile.txt") as f:
    for line in f:
        print line
</pre></div>

<P>
After the statement is executed, the file <var>f</var> is always closed,
even if a problem was encountered while processing the lines. Other
objects which provide predefined clean-up actions will indicate
this in their documentation.

<P>
语句执行后，文件 <var>f</var> 总会被关闭，即使是在处理文件中的数据时出错也一样。其它对象是否提供了预定义的清理行为要查看它们的文档。

<P>


