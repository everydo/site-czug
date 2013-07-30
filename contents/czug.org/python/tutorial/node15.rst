---
created: 
creator: panjy
description: ''
title: 附录D
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node17.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node17.html</a></p>

<H1><A NAME="SECTION0017000000000000000000"></A><A NAME="glossary"></A>
<BR>
D. Glossary
</H1>

<P>
<DL>
<DD><a id='l2h-54' xml:id='l2h-54'></a>
</DD>
<DT><STRONG><code>&gt;<code>&gt;</code>&gt;</code></STRONG></DT>
<DD>The typical Python prompt of the interactive shell.  Often seen for
code examples that can be tried right away in the interpreter.
<P>
<a id='l2h-55' xml:id='l2h-55'></a>
</DD>
<DT><STRONG><code>.<code>.</code>.</code></STRONG></DT>
<DD>The typical Python prompt of the interactive shell when entering code
for an indented code block.

<P>
<a id='l2h-56' xml:id='l2h-56'></a>
</DD>
<DT><STRONG>BDFL</STRONG></DT>
<DD>Benevolent Dictator For Life, a.k.a. <a class="ulink" href="http://www.python.org/~guido/"
  >Guido van
Rossum</a>, Python's creator.

<P>
<a id='l2h-57' xml:id='l2h-57'></a>
</DD>
<DT><STRONG>byte code</STRONG></DT>
<DD>The internal representation of a Python program in the interpreter.
The byte code is also cached in <code>.pyc</code> and <code>.pyo</code>
files so that executing the same file is faster the second time
(recompilation from source to byte code can be avoided).  This
``intermediate language'' is said to run on a ``virtual
machine'' that calls the subroutines corresponding to each bytecode.

<P>
<a id='l2h-58' xml:id='l2h-58'></a>
</DD>
<DT><STRONG>classic class</STRONG></DT>
<DD>Any class which does not inherit from <tt class="class">object</tt>.  See
<em>new-style class</em>.

<P>
<a id='l2h-59' xml:id='l2h-59'></a>
</DD>
<DT><STRONG>coercion</STRONG></DT>
<DD>The implicit conversion of an instance of one type to another during an
operation which involves two arguments of the same type.  For example,
<code>int(3.15)</code> converts the floating point number to the integer
<code>3</code>, but in <code>3+4.5</code>, each argument is of a different type (one
int, one float), and both must be converted to the same type before they can
be added or it will raise a <code>TypeError</code>.  Coercion between two
operands can be performed with the <code>coerce</code> builtin function; thus,
<code>3+4.5</code> is equivalent to calling <code>operator.add(*coerce(3,
4.5))</code> and results in <code>operator.add(3.0, 4.5)</code>.  Without coercion,
all arguments of even compatible types would have to be normalized to the
same value by the programmer, e.g., <code>float(3)+4.5</code> rather than just
<code>3+4.5</code>.

<P>
<a id='l2h-60' xml:id='l2h-60'></a>
</DD>
<DT><STRONG>complex number</STRONG></DT>
<DD>An extension of the familiar real number system in which all numbers are
expressed as a sum of a real part and an imaginary part.  Imaginary numbers
are real multiples of the imaginary unit (the square root of <code>-1</code>),
often written <code>i</code> in mathematics or <code>j</code> in engineering.
Python has builtin support for complex numbers, which are written with this
latter notation; the imaginary part is written with a <code>j</code> suffix,
e.g., <code>3+1j</code>.  To get access to complex equivalents of the
<tt class="module">math</tt> module, use <tt class="module">cmath</tt>.  Use of complex numbers is a
fairly advanced mathematical feature.  If you're not aware of a need for them,
it's almost certain you can safely ignore them.

<P>
<a id='l2h-61' xml:id='l2h-61'></a>
</DD>
<DT><STRONG>descriptor</STRONG></DT>
<DD>Any <em>new-style</em> object that defines the methods
<tt class="method">__get__()</tt>, <tt class="method">__set__()</tt>, or <tt class="method">__delete__()</tt>.
When a class attribute is a descriptor, its special binding behavior
is triggered upon attribute lookup.  Normally, writing <var>a.b</var> looks
up the object <var>b</var> in the class dictionary for <var>a</var>, but if
<var>b</var> is a descriptor, the defined method gets called.
Understanding descriptors is a key to a deep understanding of Python
because they are the basis for many features including functions,
methods, properties, class methods, static methods, and reference to
super classes.

<P>
<a id='l2h-62' xml:id='l2h-62'></a>
</DD>
<DT><STRONG>dictionary</STRONG></DT>
<DD>An associative array, where arbitrary keys are mapped to values.  The
use of <tt class="class">dict</tt> much resembles that for <tt class="class">list</tt>, but the keys
can be any object with a <tt class="method">__hash__()</tt> function, not just
integers starting from zero.  Called a hash in Perl.

<P>
<a id='l2h-63' xml:id='l2h-63'></a>
</DD>
<DT><STRONG>duck-typing</STRONG></DT>
<DD>Pythonic programming style that determines an object's type by inspection
of its method or attribute signature rather than by explicit relationship
to some type object ("If it looks like a duck and quacks like a duck, it
must be a duck.")  By emphasizing interfaces rather than specific types,
well-designed code improves its flexibility by allowing polymorphic
substitution.  Duck-typing avoids tests using <tt class="function">type()</tt> or
<tt class="function">isinstance()</tt>. Instead, it typically employs
<tt class="function">hasattr()</tt> tests or <em>EAFP</em> programming.

<P>
<a id='l2h-64' xml:id='l2h-64'></a>
</DD>
<DT><STRONG>EAFP</STRONG></DT>
<DD>Easier to ask for forgiveness than permission.  This common Python
coding style assumes the existence of valid keys or attributes and
catches exceptions if the assumption proves false.  This clean and
fast style is characterized by the presence of many <tt class="keyword">try</tt> and
<tt class="keyword">except</tt> statements.  The technique contrasts with the
<em>LBYL</em> style that is common in many other languages such as C.

<P>
<a id='l2h-65' xml:id='l2h-65'></a>
</DD>
<DT><STRONG>__future__</STRONG></DT>
<DD>A pseudo module which programmers can use to enable new language
features which are not compatible with the current interpreter.  For
example, the expression <code>11/4</code> currently evaluates to <code>2</code>.
If the module in which it is executed had enabled <em>true division</em>
by executing:

<P>
<div class="verbatim"><pre>
from __future__ import division
</pre></div>

<P>
the expression <code>11/4</code> would evaluate to <code>2.75</code>.  By
importing the <a class="ulink" href="../lib/module-future.html"
  ><tt class="module">__future__</tt></a>
module and evaluating its variables, you can see when a new feature
was first added to the language and when it will become the default:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; import __future__
&gt;&gt;&gt; __future__.division
_Feature((2, 2, 0, 'alpha', 2), (3, 0, 0, 'alpha', 0), 8192)
</pre></div>

<P>
<a id='l2h-66' xml:id='l2h-66'></a>
</DD>
<DT><STRONG>generator</STRONG></DT>
<DD>A function that returns an iterator.  It looks like a normal function except
that values are returned to the caller using a <tt class="keyword">yield</tt> statement
instead of a <tt class="keyword">return</tt> statement.  Generator functions often
contain one or more <tt class="keyword">for</tt> or <tt class="keyword">while</tt> loops that
<tt class="keyword">yield</tt> elements back to the caller.  The function execution is
stopped at the <tt class="keyword">yield</tt> keyword (returning the result) and is
resumed there when the next element is requested by calling the
<tt class="method">next()</tt> method of the returned iterator.

<P>
<a id='l2h-67' xml:id='l2h-67'></a>
</DD>
<DT><STRONG>generator expression</STRONG></DT>
<DD>An expression that returns a generator.  It looks like a normal expression
followed by a <tt class="keyword">for</tt> expression defining a loop variable, range, and
an optional <tt class="keyword">if</tt> expression.  The combined expression generates
values for an enclosing function:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; sum(i*i for i in range(10))         # sum of squares 0, 1, 4, ... 81
285
</pre></div>

<P>
<a id='l2h-68' xml:id='l2h-68'></a>
</DD>
<DT><STRONG>GIL</STRONG></DT>
<DD>See <em>global interpreter lock</em>.

<P>
<a id='l2h-69' xml:id='l2h-69'></a>
</DD>
<DT><STRONG>global interpreter lock</STRONG></DT>
<DD>The lock used by Python threads to assure that only one thread can be
run at a time.  This simplifies Python by assuring that no two
processes can access the same memory at the same time.  Locking the
entire interpreter makes it easier for the interpreter to be
multi-threaded, at the expense of some parallelism on multi-processor
machines.  Efforts have been made in the past to create a
``free-threaded'' interpreter (one which locks shared data at a much
finer granularity), but performance suffered in the common
single-processor case.

<P>
<a id='l2h-70' xml:id='l2h-70'></a>
</DD>
<DT><STRONG>IDLE</STRONG></DT>
<DD>An Integrated Development Environment for Python.  IDLE is a
basic editor and interpreter environment that ships with the standard
distribution of Python.  Good for beginners, it also serves as clear
example code for those wanting to implement a moderately
sophisticated, multi-platform GUI application.

<P>
<a id='l2h-71' xml:id='l2h-71'></a>
</DD>
<DT><STRONG>immutable</STRONG></DT>
<DD>An object with fixed value.  Immutable objects are numbers, strings or
tuples (and more).  Such an object cannot be altered.  A new object
has to be created if a different value has to be stored.  They play an
important role in places where a constant hash value is needed, for
example as a key in a dictionary.

<P>
<a id='l2h-72' xml:id='l2h-72'></a>
</DD>
<DT><STRONG>integer division</STRONG></DT>
<DD>Mathematical division discarding any remainder.  For example, the
expression <code>11/4</code> currently evaluates to <code>2</code> in contrast
to the <code>2.75</code> returned by float division.  Also called
<em>floor division</em>.  When dividing two integers the outcome will
always be another integer (having the floor function applied to it).
However, if one of the operands is another numeric type (such as a
<tt class="class">float</tt>), the result will be coerced (see <em>coercion</em>) to
a common type.  For example, an integer divided by a float will result
in a float value, possibly with a decimal fraction.  Integer division
can be forced by using the <code>//</code> operator instead of the <code>/</code>
operator.  See also <em>__future__</em>.

<P>
<a id='l2h-73' xml:id='l2h-73'></a>
</DD>
<DT><STRONG>interactive</STRONG></DT>
<DD>Python has an interactive interpreter which means that you can try out
things and immediately see their results.  Just launch <code>python</code> with no
arguments (possibly by selecting it from your computer's main menu).
It is a very powerful way to test out new ideas or inspect modules and
packages (remember <code>help(x)</code>).

<P>
<a id='l2h-74' xml:id='l2h-74'></a>
</DD>
<DT><STRONG>interpreted</STRONG></DT>
<DD>Python is an interpreted language, as opposed to a compiled one.  This means
that the source files can be run directly without first creating an
executable which is then run.  Interpreted languages typically have a
shorter development/debug cycle than compiled ones, though their programs
generally also run more slowly.  See also <em>interactive</em>.

<P>
<a id='l2h-75' xml:id='l2h-75'></a>
</DD>
<DT><STRONG>iterable</STRONG></DT>
<DD>A container object capable of returning its members one at a time.
Examples of iterables include all sequence types (such as <tt class="class">list</tt>,
<tt class="class">str</tt>, and <tt class="class">tuple</tt>) and some non-sequence types like
<tt class="class">dict</tt> and <tt class="class">file</tt> and objects of any classes you define
with an <tt class="method">__iter__()</tt> or <tt class="method">__getitem__()</tt> method.  Iterables
can be used in a <tt class="keyword">for</tt> loop and in many other places where a
sequence is needed (<tt class="function">zip()</tt>, <tt class="function">map()</tt>, ...).  When an
iterable object is passed as an argument to the builtin function
<tt class="function">iter()</tt>, it returns an iterator for the object.  This
iterator is good for one pass over the set of values.  When using
iterables, it is usually not necessary to call <tt class="function">iter()</tt> or
deal with iterator objects yourself.  The <code>for</code> statement does
that automatically for you, creating a temporary unnamed variable to
hold the iterator for the duration of the loop.  See also
<em>iterator</em>, <em>sequence</em>, and <em>generator</em>.

<P>
<a id='l2h-76' xml:id='l2h-76'></a>
</DD>
<DT><STRONG>iterator</STRONG></DT>
<DD>An object representing a stream of data.  Repeated calls to the
iterator's <tt class="method">next()</tt> method return successive items in the
stream.  When no more data is available a <tt class="exception">StopIteration</tt>
exception is raised instead.  At this point, the iterator object is
exhausted and any further calls to its <tt class="method">next()</tt> method just
raise <tt class="exception">StopIteration</tt> again.  Iterators are required to have
an <tt class="method">__iter__()</tt> method that returns the iterator object
itself so every iterator is also iterable and may be used in most
places where other iterables are accepted.  One notable exception is
code that attempts multiple iteration passes.  A container object
(such as a <tt class="class">list</tt>) produces a fresh new iterator each time you
pass it to the <tt class="function">iter()</tt> function or use it in a
<tt class="keyword">for</tt> loop.  Attempting this with an iterator will just
return the same exhausted iterator object used in the previous iteration
pass, making it appear like an empty container.

<P>
<a id='l2h-77' xml:id='l2h-77'></a>
</DD>
<DT><STRONG>LBYL</STRONG></DT>
<DD>Look before you leap.  This coding style explicitly tests for
pre-conditions before making calls or lookups.  This style contrasts
with the <em>EAFP</em> approach and is characterized by the presence of
many <tt class="keyword">if</tt> statements.

<P>
<a id='l2h-78' xml:id='l2h-78'></a>
</DD>
<DT><STRONG>list comprehension</STRONG></DT>
<DD>A compact way to process all or a subset of elements in a sequence and
return a list with the results.  <code>result = ["0x%02x"
% x for x in range(256) if x % 2 == 0]</code> generates a list of strings
containing hex numbers (0x..) that are even and in the range from 0 to 255.
The <tt class="keyword">if</tt> clause is optional.  If omitted, all elements in
<code>range(256)</code> are processed.

<P>
<a id='l2h-79' xml:id='l2h-79'></a>
</DD>
<DT><STRONG>mapping</STRONG></DT>
<DD>A container object (such as <tt class="class">dict</tt>) that supports arbitrary key
lookups using the special method <tt class="method">__getitem__()</tt>.

<P>
<a id='l2h-80' xml:id='l2h-80'></a>
</DD>
<DT><STRONG>metaclass</STRONG></DT>
<DD>The class of a class.  Class definitions create a class name, a class
dictionary, and a list of base classes.  The metaclass is responsible
for taking those three arguments and creating the class.  Most object
oriented programming languages provide a default implementation.  What
makes Python special is that it is possible to create custom
metaclasses.  Most users never need this tool, but when the need
arises, metaclasses can provide powerful, elegant solutions.  They
have been used for logging attribute access, adding thread-safety,
tracking object creation, implementing singletons, and many other
tasks.

<P>
<a id='l2h-81' xml:id='l2h-81'></a>
</DD>
<DT><STRONG>mutable</STRONG></DT>
<DD>Mutable objects can change their value but keep their <tt class="function">id()</tt>.
See also <em>immutable</em>.

<P>
<a id='l2h-82' xml:id='l2h-82'></a>
</DD>
<DT><STRONG>namespace</STRONG></DT>
<DD>The place where a variable is stored.  Namespaces are implemented as
dictionaries.  There are the local, global and builtin namespaces
as well as nested namespaces in objects (in methods).  Namespaces support
modularity by preventing naming conflicts.  For instance, the
functions <tt class="function">__builtin__.open()</tt> and <tt class="function">os.open()</tt> are
distinguished by their namespaces.  Namespaces also aid readability
and maintainability by making it clear which module implements a
function.  For instance, writing <tt class="function">random.seed()</tt> or
<tt class="function">itertools.izip()</tt> makes it clear that those functions are
implemented by the <a class="ulink" href="../lib/module-random.html"
  ><tt class="module">random</tt></a>
and <a class="ulink" href="../lib/module-itertools.html"
  ><tt class="module">itertools</tt></a> modules
respectively.

<P>
<a id='l2h-83' xml:id='l2h-83'></a>
</DD>
<DT><STRONG>nested scope</STRONG></DT>
<DD>The ability to refer to a variable in an enclosing definition.  For
instance, a function defined inside another function can refer to
variables in the outer function.  Note that nested scopes work only
for reference and not for assignment which will always write to the
innermost scope.  In contrast, local variables both read and write in
the innermost scope.  Likewise, global variables read and write to the
global namespace.

<P>
<a id='l2h-84' xml:id='l2h-84'></a>
</DD>
<DT><STRONG>new-style class</STRONG></DT>
<DD>Any class that inherits from <tt class="class">object</tt>.  This includes all
built-in types like <tt class="class">list</tt> and <tt class="class">dict</tt>.  Only new-style
classes can use Python's newer, versatile features like
<tt class="method">__slots__</tt>, descriptors, properties,
<tt class="method">__getattribute__()</tt>, class methods, and static methods.

<P>
<a id='l2h-85' xml:id='l2h-85'></a>
</DD>
<DT><STRONG>Python3000</STRONG></DT>
<DD>A mythical python release, not required to be backward compatible, with
telepathic interface.

<P>
<a id='l2h-86' xml:id='l2h-86'></a>
</DD>
<DT><STRONG>__slots__</STRONG></DT>
<DD>A declaration inside a <em>new-style class</em> that saves memory by
pre-declaring space for instance attributes and eliminating instance
dictionaries.  Though popular, the technique is somewhat tricky to get
right and is best reserved for rare cases where there are large
numbers of instances in a memory-critical application.

<P>
<a id='l2h-87' xml:id='l2h-87'></a>
</DD>
<DT><STRONG>sequence</STRONG></DT>
<DD>An <em>iterable</em> which supports efficient element access using
integer indices via the <tt class="method">__getitem__()</tt> and
<tt class="method">__len__()</tt> special methods.  Some built-in sequence types
are <tt class="class">list</tt>, <tt class="class">str</tt>, <tt class="class">tuple</tt>, and <tt class="class">unicode</tt>.
Note that <tt class="class">dict</tt> also supports <tt class="method">__getitem__()</tt> and
<tt class="method">__len__()</tt>, but is considered a mapping rather than a
sequence because the lookups use arbitrary <em>immutable</em> keys
rather than integers.

<P>
<a id='l2h-88' xml:id='l2h-88'></a>
</DD>
<DT><STRONG>Zen of Python</STRONG></DT>
<DD>Listing of Python design principles and philosophies that are helpful
in understanding and using the language.  The listing can be found by
typing ``<code>import this</code>'' at the interactive prompt.

<P>
</DD>
</DL>

<P>
 

