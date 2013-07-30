---
created: 
creator: panjy
description: ''
title: 类
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node10.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node10.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node10.html#SECTION0010100000000000000000">8.1 A Word About Terminology 术语漫谈</a>
<LI><A href="node10.html#SECTION0010200000000000000000">8.2 Python Scopes and Name Spaces 作用域和命名空间</a>
<LI><A href="node10.html#SECTION0010300000000000000000">8.3 A First Look at Classes 初识类</a>
<UL>
<LI><A href="node10.html#SECTION0010310000000000000000">8.3.1 Class Definition Syntax 类定义语法</a>
<LI><A href="node10.html#SECTION0010320000000000000000">8.3.2 Class Objects 类对象</a>
<LI><A href="node10.html#SECTION0010330000000000000000">8.3.3 Instance Objects 实例对象</a>
<LI><A href="node10.html#SECTION0010340000000000000000">8.3.4 Method Objects 方法对象</a>
</ul>
<LI><A href="node10.html#SECTION0010400000000000000000">8.4 Random Remarks 一些说明</a>
<LI><A href="node10.html#SECTION0010500000000000000000">8.5 Inheritance 继承</a>
<UL>
<LI><A href="node10.html#SECTION0010510000000000000000">8.5.1 Multiple Inheritance 多继承</a>
</ul>
<LI><A href="node10.html#SECTION0010600000000000000000">8.6 Private Variables 私有变量</a>
<LI><A href="node10.html#SECTION0010700000000000000000">8.7 Odds and Ends 补充</a>
<LI><A href="node10.html#SECTION0010800000000000000000">8.8 Exceptions Are Classes Too 异常也是类</a>
<LI><A href="node10.html#SECTION0010900000000000000000">8.9 Iterators 迭代器</a>
<LI><A href="node10.html#SECTION00101000000000000000000">8.10 Generators 生成器</a>
<LI><A href="node10.html#SECTION00101100000000000000000">8.11 Generator Expressions 生成器表达式</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION0010000000000000000000"></A><A NAME="classes"></A>
<BR>
8. Classes 类 
</H1>

<P>
Python's class mechanism adds classes to the language with a minimum
of new syntax and semantics.  It is a mixture of the class mechanisms
found in C++ and Modula-3.  As is true for modules, classes in Python
do not put an absolute barrier between definition and user, but rather
rely on the politeness of the user not to ``break into the
definition.''  The most important features of classes are retained
with full power, however: the class inheritance mechanism allows
multiple base classes, a derived class can override any methods of its
base class or classes, and a method can call the method of a base class with the
same name.  Objects can contain an arbitrary amount of private data.

<P>
Python 在尽可能不增加新的语法和语义的情况下加入了类机制。这种机制是 C++ 和 Modula-3 的混合。Python中的类没有在用户和定义之间建立一个绝对的屏障，而是依赖于用户自觉的不去“破坏定义”。然而，类机制最重要的功能都完整的保留下来。类继承机制允许多继承，派生类可以覆盖（override）基类中的任何方法，方法中可以调用基类中的同名方法。对象可以包含任意数量的私有成员。

<P>
In C++ terminology, all class members (including the data members) are
<em>public</em>, and all member functions are <em>virtual</em>.  There are
no special constructors or destructors.  As in Modula-3, there are no
shorthands for referencing the object's members from its methods: the
method function is declared with an explicit first argument
representing the object, which is provided implicitly by the call.  As
in Smalltalk, classes themselves are objects, albeit in the wider
sense of the word: in Python, all data types are objects.  This
provides semantics for importing and renaming.  Unlike 
C++ and Modula-3, built-in types can be used as base classes for
extension by the user.  Also, like in C++ but unlike in Modula-3, most
built-in operators with special syntax (arithmetic operators,
subscripting etc.) can be redefined for class instances.

<P>
用 C++ 术语来讲，所有的类成员（包括数据成员）都是公有（ <em>public</em> ）的，所有的成员函数都是虚拟（ <em>virtual</em> ）的。没有特定的构造和析构函数。用Modula-3的术语来讲，在成员方法中没有什么简便的方式（shorthands）可以引用对象的成员：方法函数在定义时需要以引用的对象做为第一个参数，调用时则会隐式引用对象。这样就形成了语义上的引入和重命名。（ This provides semantics for importing and renaming. ）但是，像 C++ 而非 Modula-3 中那样，大多数带有特殊语法的内置操作符（算法运算符、下标等）都可以针对类的需要重新定义。

<P>

<H1><A NAME="SECTION0010100000000000000000"></A><A NAME="terminology"></A>
<BR>
8.1 A Word About Terminology 术语漫谈 
</H1>

<P>
Lacking universally accepted terminology to talk about classes, I will
make occasional use of Smalltalk and C++ terms.  (I would use Modula-3
terms, since its object-oriented semantics are closer to those of
Python than C++, but I expect that few readers have heard of it.)

<P>
由于没有什么关于类的通用术语，我从 Smalltalk 和 C++ 中借用一些（我更希望用 Modula-3 的，因为它的面向对象机制比 C++更接近Python，不过我想没多少读者听说过它）。

<P>
Objects have individuality, and multiple names (in multiple scopes)
can be bound to the same object.  This is known as aliasing in other
languages.  This is usually not appreciated on a first glance at
Python, and can be safely ignored when dealing with immutable basic
types (numbers, strings, tuples).  However, aliasing has an
(intended!) effect on the semantics of Python code involving mutable
objects such as lists, dictionaries, and most types representing
entities outside the program (files, windows, etc.).  This is usually
used to the benefit of the program, since aliases behave like pointers
in some respects.  For example, passing an object is cheap since only
a pointer is passed by the implementation; and if a function modifies
an object passed as an argument, the caller will see the change -- this
eliminates the need for two different argument passing mechanisms as in
Pascal.

<P>
对象是被特化的，多个名字（在多个作用域中）可以绑定同一个对象。这相当于其它语言中的别名。通常对 Python 的第一印象中会忽略这一点，使用那些不可变的基本类型（数值、字符串、元组）时也可以很放心的忽视它。然而，在 Python 代码调用字典、链表之类可变对象，以及大多数涉及程序外部实体（文件、窗体等等）的类型时，这一语义就会有影响。这通用有助于优化程序，因为别名的行为在某些方面类似于指针。例如，很容易传递一个对象，因为在行为上只是传递了一个指针。如果函数修改了一个通过参数传递的对象，调用者可以接收到变化－－在 Pascal 中这需要两个不同的参数传递机制。

<P>

<H1><A NAME="SECTION0010200000000000000000"></A><A NAME="scopes"></A>
<BR>
8.2 Python Scopes and Name Spaces 作用域和命名空间 
</H1>

<P>
Before introducing classes, I first have to tell you something about
Python's scope rules.  Class definitions play some neat tricks with
namespaces, and you need to know how scopes and namespaces work to
fully understand what's going on.  Incidentally, knowledge about this
subject is useful for any advanced Python programmer.

<P>
在介绍类之前，我首先介绍一些有关 Python 作用域的规则：类的定义非常巧妙的运用了命名空间，要完全理解接下来的知识，需要先理解作用域和命名空间的工作原理。另外，这一切的知识对于任何高级 Python 程序员都非常有用。

<P>
Let's begin with some definitions.

<P>
我们从一些定义开始。

<P>
A <em>namespace</em> is a mapping from names to objects.  Most
namespaces are currently implemented as Python dictionaries, but
that's normally not noticeable in any way (except for performance),
and it may change in the future.  Examples of namespaces are: the set
of built-in names (functions such as <tt class="function">abs()</tt>, and built-in
exception names); the global names in a module; and the local names in
a function invocation.  In a sense the set of attributes of an object
also form a namespace.  The important thing to know about namespaces
is that there is absolutely no relation between names in different
namespaces; for instance, two different modules may both define a
function ``maximize'' without confusion -- users of the modules must
prefix it with the module name.

<P>
<em>命名空间</em>是从命名到对象的映射。当前<em>命名空间</em>主要是通过 Python 字典实现的，不过通常不关心具体的实现方式（除非出于性能考虑），以后也有可能会改变其实现方式。以下有一些命名空间的例子：内置命名（像 <tt class="function">abs()</tt> 这样的函数，以及内置异常名）集，模块中的全局命名，函数调用中的局部命名。某种意义上讲对象的属性集也是一个<em>命名空间</em>。关于<em>命名空间</em>需要了解的一件很重要的事就是不同<em>命名空间</em>中的命名没有任何联系，例如两个不同的模块可能都会定义一个名为“maximize”的函数而不会发生混淆－－用户必须以模块名为前缀来引用它们。

<P>
By the way, I use the word <em>attribute</em> for any name following a
dot -- for example, in the expression <code>z.real</code>, <code>real</code> is
an attribute of the object <code>z</code>.  Strictly speaking, references to
names in modules are attribute references: in the expression
<code>modname.funcname</code>, <code>modname</code> is a module object and
<code>funcname</code> is an attribute of it.  In this case there happens to
be a straightforward mapping between the module's attributes and the
global names defined in the module: they share the same namespace!
<A NAME="tex2html9"
  HREF="#foot2540"><SUP>8.1</SUP></A>
<P>
顺便提一句，我称 Python 中任何一个“.”之后的命名为<em>属性</em>－－例如，表达式 <code>z.real</code> 中的 <code>real</code> 是对象 <code>z</code> 的一个属性。严格来讲，从模块中引用命名是引用属性：表达式 <code>modname.funcname</code> 中， <code>modname</code> 是一个模块对象，<code>funcname</code> 是它的一个属性。因此，模块的属性和模块中的全局命名有直接的映射关系：它们共享同一命名空间！<A NAME="tex2html10"
  HREF="#foot1603"><SUP>8.2</SUP></A>
<P>
Attributes may be read-only or writable.  In the latter case,
assignment to attributes is possible.  Module attributes are writable:
you can write "<tt class="samp">modname.the_answer = 42</tt>".  Writable attributes may
also be deleted with the <tt class="keyword">del</tt> statement.  For example,
"<tt class="samp">del modname.the_answer</tt>" will remove the attribute
<tt class="member">the_answer</tt> from the object named by <code>modname</code>.

<P>
属性可以是只读过或写的。后一种情况下，可以对属性赋值。你可以这样作："<tt class="samp">modname.the_answer = 42</tt>"。可写的属性也可以用 <tt class="keyword">del</tt> 语句删除。例如："<tt class="samp">del modname.the_answer</tt>" 会从 <code>modname</code> 对象中删除 <tt class="member">the_answer</tt> 属性。

<P>
Name spaces are created at different moments and have different
lifetimes.  The namespace containing the built-in names is created
when the Python interpreter starts up, and is never deleted.  The
global namespace for a module is created when the module definition
is read in; normally, module namespaces also last until the
interpreter quits.  The statements executed by the top-level
invocation of the interpreter, either read from a script file or
interactively, are considered part of a module called
<tt class="module">__main__</tt>, so they have their own global namespace.  (The
built-in names actually also live in a module; this is called
<tt class="module">__builtin__</tt>.)

<P>
不同的命名空间在不同的时刻创建，有不同的生存期。包含内置命名的命名空间在 Python 解释器启动时创建，会一直保留，不被删除。模块的全局命名空间在模块定义被读入时创建，通常，模块命名空间也会一直保存到解释器退出。由解释器在最高层调用执行的语句，不管它是从脚本文件中读入还是来自交互式输入，都是 __main__ 模块的一部分，所以它们也拥有自己的命名空间。（内置命名也同样被包含在一个模块中，它被称作 __builtin__ 。）

<P>
The local namespace for a function is created when the function is
called, and deleted when the function returns or raises an exception
that is not handled within the function.  (Actually, forgetting would
be a better way to describe what actually happens.)  Of course,
recursive invocations each have their own local namespace.

<P>
当函数被调用时创建一个局部命名空间，函数反正返回过抛出一个未在函数内处理的异常时删除。（实际上，说是遗忘更为贴切）。当然，每一个递归调用拥有自己的命名空间。

<P>
A <em>scope</em> is a textual region of a Python program where a
namespace is directly accessible.  ``Directly accessible'' here means
that an unqualified reference to a name attempts to find the name in
the namespace.

<P>
<em>作用域</em> 是Python程序中一个命名空间可以直接访问的正文区域。“直接访问”在这里的意思是查找命名时无需引用命名前缀。

<P>
Although scopes are determined statically, they are used dynamically.
At any time during execution, there are at least three nested scopes whose
namespaces are directly accessible: the innermost scope, which is searched
first, contains the local names; the namespaces of any enclosing
functions, which are searched starting with the nearest enclosing scope;
the middle scope, searched next, contains the current module's global names;
and the outermost scope (searched last) is the namespace containing built-in
names.

<P>
尽管作用域是静态定义，在使用时他们都是动态的。每次执行时，至少有三个命名空间可以直接访问的作用域嵌套在一起：包含局部命名的使用域在最里面，首先被搜索；其次搜索的是中层的作用域，这里包含了同级的函数；最后搜索最外面的作用域，它包含内置命名。

<P>
If a name is declared global, then all references and assignments go
directly to the middle scope containing the module's global names.
Otherwise, all variables found outside of the innermost scope are read-only
(an attempt to write to such a variable will simply create a <em>new</em>
local variable in the innermost scope, leaving the identically named
outer variable unchanged).

<P>
如果一个命名声明为全局的，那么所有的赋值和引用都直接针对包含模全局命名的中级作用域。另外，从外部访问到的所有内层作用域的变量都是只读的。（试图写这样的变量只会在内部作用域创建一个<em>新</em>局部变量，外部标示命名的那个变量不会改变）。

<P>
Usually, the local scope references the local names of the (textually)
current function.  Outside functions, the local scope references
the same namespace as the global scope: the module's namespace.
Class definitions place yet another namespace in the local scope.

<P>
从字面意义上讲，局部作用域引用当前函数的命名。在函数之外，局部作用域与全局使用域引用同一命名空间：模块命名空间。类定义也是局部作用域中的另一个命名空间。

<P>
It is important to realize that scopes are determined textually: the
global scope of a function defined in a module is that module's
namespace, no matter from where or by what alias the function is
called.  On the other hand, the actual search for names is done
dynamically, at run time -- however, the language definition is
evolving towards static name resolution, at ``compile'' time, so don't
rely on dynamic name resolution!  (In fact, local variables are
already determined statically.)

<P>
重要的是作用域决定于源程序的文本：一个定义于某模块中的函数的全局作用域是该模块的命名空间，而不是该函数的别名被定义或调用的位置，了解这一点非常重要。另一方面，命名的实际搜索过程是动态的，在运行时确定的——然而，Python 语言也在不断发展，以后有可能会成为静态的“编译”时确定，所以不要依赖动态解析！（事实上，局部变量已经是静态确定了。）

<P>
A special quirk of Python is that assignments always go into the
innermost scope.  Assignments do not copy data -- they just
bind names to objects.  The same is true for deletions: the statement
"<tt class="samp">del x</tt>" removes the binding of <code>x</code> from the namespace
referenced by the local scope.  In fact, all operations that introduce
new names use the local scope: in particular, import statements and
function definitions bind the module or function name in the local
scope.  (The <tt class="keyword">global</tt> statement can be used to indicate that
particular variables live in the global scope.)

<P>
Python 的一个特别之处在于其赋值操作总是在最里层的作用域。赋值不会复制数据——只是将命名绑定到对象。删除也是如此："<tt class="samp">del x</tt>" 只是从局部作用域的命名空间中删除命名 <code>x</code> 。事实上，所有引入新命名的操作都作用于局部作用域。特别是 import 语句和函数定将模块名或函数绑定于局部作用域。（可以使用 global 语句将变量引入到全局作用域。）

<P>

<H1><A NAME="SECTION0010300000000000000000"></A><A NAME="firstClasses"></A>
<BR>
8.3 A First Look at Classes 初识类 
</H1>

<P>
Classes introduce a little bit of new syntax, three new object types,
and some new semantics.

<P>
类引入了一点新的语法，三种新的对象类型，以及一些新的语义。

<P>

<H2><A NAME="SECTION0010310000000000000000"></A><A NAME="classDefinition"></A>
<BR>
8.3.1 Class Definition Syntax 类定义语法 
</H2>

<P>
The simplest form of class definition looks like this:

<P>
最简单的类定义形式如下：

<P>
<div class="verbatim"><pre>
class ClassName:
    &lt;statement-1&gt;
    .
    .
    .
    &lt;statement-N&gt;
</pre></div>

<P>
Class definitions, like function definitions
(<tt class="keyword">def</tt> statements) must be executed before they have any
effect.  (You could conceivably place a class definition in a branch
of an <tt class="keyword">if</tt> statement, or inside a function.)

<P>
类的定义就像函数定义（ <tt class="keyword">def</tt> 语句），要先执行才能生效。（你当然可以把它放进 <tt class="keyword">if</tt> 语句的某一分支，或者一个函数的内部。）

<P>
In practice, the statements inside a class definition will usually be
function definitions, but other statements are allowed, and sometimes
useful -- we'll come back to this later.  The function definitions
inside a class normally have a peculiar form of argument list,
dictated by the calling conventions for methods -- again, this is
explained later.

<P>
习惯上，类定义语句的内容通常是函数定义，不过其它语句也可以，有时会很有用——后面我们再回过头来讨论。类中的函数定义通常包括了一个特殊形式的参数列表，用于方法调用约定——同样我们在后面讨论这些。

<P>
When a class definition is entered, a new namespace is created, and
used as the local scope -- thus, all assignments to local variables
go into this new namespace.  In particular, function definitions bind
the name of the new function here.

<P>
习惯上，类定义语句的内容通常是函数定义，不过其它语句也可以，有时会很有用——后面我们再回过头来讨论。类中的函数定义通常包括了一个特殊形式的参数列表，用于方法调用约定——同样我们在后面讨论这些。

<P>
When a class definition is left normally (via the end), a <em>class
object</em> is created.  This is basically a wrapper around the contents
of the namespace created by the class definition; we'll learn more
about class objects in the next section.  The original local scope
(the one in effect just before the class definition was entered) is
reinstated, and the class object is bound here to the class name given
in the class definition header (<tt class="class">ClassName</tt> in the example).

<P>
类定义完成时（正常退出），就创建了一个<em>类对象</em>。基本上它是对类定义创建的命名空间进行了一个包装；我们在下一节进一步学习类对象的知识。原始的局部作用域（类定义引入之前生效的那个）得到恢复，类对象在这里绑定到类定义头部的类名（例子中是 <tt class="class">ClassName</tt> ）。

<P>

<H2><A NAME="SECTION0010320000000000000000"></A><A NAME="classObjects"></A>
<BR>
8.3.2 Class Objects 类对象 
</H2>

<P>
Class objects support two kinds of operations: attribute references
and instantiation.

<P>
类对象支持两种操作：属性引用和实例化。

<P>
<em>Attribute references</em> use the standard syntax used for all
attribute references in Python: <code>obj.name</code>.  Valid attribute
names are all the names that were in the class's namespace when the
class object was created.  So, if the class definition looked like
this:

<P>
属性引用使用和 Python 中所有的属性引用一样的标准语法：<code>obj.name</code>。类对象创建后，类命名空间中所有的命名都是有效属性名。所以如果类定义是这样：

<P>
<div class="verbatim"><pre>
class MyClass:
    "A simple example class"
    i = 12345
    def f(self):
        return 'hello world'
</pre></div>

<P>
then <code>MyClass.i</code> and <code>MyClass.f</code> are valid attribute
references, returning an integer and a function object, respectively.
Class attributes can also be assigned to, so you can change the value
of <code>MyClass.i</code> by assignment.  <tt class="member">__doc__</tt> is also a valid
attribute, returning the docstring belonging to the class: <code>"A
simple example class"</code>. 

<P>
那么 <code>MyClass.i</code> 和 <code>MyClass.f</code> 是有效的属性引用，分别返回一个整数和一个方法对象。也可以对类属性赋值，你可以通过给<code>MyClass.i</code> 赋值来修改它。 <tt class="member">__doc__</tt> 也是一个有效的属性，返回类的文档字符串： <code>"A simple example class"</code>。

<P>
Class <em>instantiation</em> uses function notation.  Just pretend that
the class object is a parameterless function that returns a new
instance of the class.  For example (assuming the above class):

<P>
类的实例化使用函数符号。只要将类对象看作是一个返回新的类实例的无参数函数即可。例如（假设沿用前面的类）：

<P>
<div class="verbatim"><pre>
x = MyClass()
</pre></div>

<P>
creates a new <em>instance</em> of the class and assigns this object to
the local variable <code>x</code>.

<P>
以上创建了一个新的类<em>实例</em>并将该对象赋给局部变量 <code>x</code>。

<P>
The instantiation operation (``calling'' a class object) creates an
empty object.  Many classes like to create objects with instances
customized to a specific initial state.
Therefore a class may define a special method named
<tt class="method">__init__()</tt>, like this:

<P>
这个实例化操作（“调用”一个类对象）来创建一个空的对象。很多类都倾向于将对象创建为有初始状态的。因此类可能会定义一个名为 <tt class="method">__init__()</tt> 的特殊方法，像下面这样：

<P>
<div class="verbatim"><pre>
    def __init__(self):
        self.data = []
</pre></div>

<P>
When a class defines an <tt class="method">__init__()</tt> method, class
instantiation automatically invokes <tt class="method">__init__()</tt> for the
newly-created class instance.  So in this example, a new, initialized
instance can be obtained by:

<P>
类定义了 <tt class="method">__init__()</tt> 方法的话，类的实例化操作会自动为新创建的类实例调用 <tt class="method">__init__()</tt> 方法。所以在下例中，可以这样创建一个新的实例：

<P>
<div class="verbatim"><pre>
x = MyClass()
</pre></div>

<P>
Of course, the <tt class="method">__init__()</tt> method may have arguments for
greater flexibility.  In that case, arguments given to the class
instantiation operator are passed on to <tt class="method">__init__()</tt>.  For
example,

<P>
当然，出于弹性的需要， <tt class="method">__init__()</tt> 方法可以有参数。事实上，参数通过 <tt class="method">__init__()</tt> 传递到类的实例化操作上。例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; class Complex:
...     def __init__(self, realpart, imagpart):
...         self.r = realpart
...         self.i = imagpart
... 
&gt;&gt;&gt; x = Complex(3.0, -4.5)
&gt;&gt;&gt; x.r, x.i
(3.0, -4.5)
</pre></div>

<P>

<H2><A NAME="SECTION0010330000000000000000"></A><A NAME="instanceObjects"></A>
<BR>
8.3.3 Instance Objects 实例对象 
</H2>

<P>
Now what can we do with instance objects?  The only operations
understood by instance objects are attribute references.  There are
two kinds of valid attribute names, data attributes and methods.

<P>
现在我们可以用实例对象作什么？实例对象唯一可用的操作就是属性引用。有两种有效的属性名。

<P>
<em>data attributes</em> correspond to
``instance variables'' in Smalltalk, and to ``data members'' in
C++.  Data attributes need not be declared; like local variables,
they spring into existence when they are first assigned to.  For
example, if <code>x</code> is the instance of <tt class="class">MyClass</tt> created above,
the following piece of code will print the value <code>16</code>, without
leaving a trace:

<P>
数据属性相当于 Smalltalk 中的“实例变量”或 C++中的“数据成员”。和局部变量一样，数据属性不需要声明，第一次使用时它们就会生成。例如，如果 <code>x</code> 是前面创建的 <tt class="class">MyClass</tt> 实例，下面这段代码会打印出 <code>16</code> 而不会有任何多余的残留：

<P>
<div class="verbatim"><pre>
x.counter = 1
while x.counter &lt; 10:
    x.counter = x.counter * 2
print x.counter
del x.counter
</pre></div>

<P>
The other kind of instance attribute reference is a <em>method</em>.
A method is a function that ``belongs to'' an
object.  (In Python, the term method is not unique to class instances:
other object types can have methods as well.  For example, list objects have
methods called append, insert, remove, sort, and so on.  However,
in the following discussion, we'll use the term method exclusively to mean
methods of class instance objects, unless explicitly stated otherwise.)

<P>
另一种为实例对象所接受的引用属性是方法。方法是“属于”一个对象的函数。（在 Python 中，方法不止是类实例所独有：其它类型的对象也可有<em>方法</em>。例如，链表对象有 append，insert，remove，sort 等等方法。然而，在后面的介绍中，除非特别说明，我们提到的方法特指类方法）

<P>
Valid method names of an instance object depend on its class.  By
definition, all attributes of a class that are function 
objects define corresponding methods of its instances.  So in our
example, <code>x.f</code> is a valid method reference, since
<code>MyClass.f</code> is a function, but <code>x.i</code> is not, since
<code>MyClass.i</code> is not.  But <code>x.f</code> is not the same thing as
<code>MyClass.f</code> -- it is a <a id='l2h-50' xml:id='l2h-50'></a><em>method object</em>, not
a function object.

<P>
实例对象的有效名称依赖于它的类。按照定义，类中所有（用户定义）的函数对象对应它的实例中的方法。所以在我们的例子中，<code>x.f</code> 是一个有效的方法引用，因为 <code>MyClass.f</code> 是一个函数。但 <code>x.i</code> 不是，因为 <code>MyClass.i</code> 是不是函数。不过 <code>x.f</code> 和 <code>MyClass.f</code> 不同－－它是一个方法对象，不是一个函数对象。

<P>

<H2><A NAME="SECTION0010340000000000000000"></A><A NAME="methodObjects"></A>
<BR>
8.3.4 Method Objects 方法对象 
</H2>

<P>
Usually, a method is called right after it is bound:

<P>
通常，方法通过右绑定调用：

<P>
<div class="verbatim"><pre>
x.f()
</pre></div>

<P>
In the <tt class="class">MyClass</tt> example, this will return the string <code>'hello world'</code>.
However, it is not necessary to call a method right away:
<code>x.f</code> is a method object, and can be stored away and called at a
later time.  For example:

<P>
在 <tt class="class">MyClass</tt> 示例中，这会返回字符串 <code>'hello world'</code> 。然而，也不是一定要直接调用方法。 <code>x.f</code> 是一个方法对象，它可以存储起来以后调用。例如：

<P>
<div class="verbatim"><pre>
xf = x.f
while True:
    print xf()
</pre></div>

<P>
will continue to print "<tt class="samp">hello world</tt>" until the end of time.

<P>
会不断的打印 "<tt class="samp">hello world</tt>" 。

<P>
What exactly happens when a method is called?  You may have noticed
that <code>x.f()</code> was called without an argument above, even though
the function definition for <tt class="method">f</tt> specified an argument.  What
happened to the argument?  Surely Python raises an exception when a
function that requires an argument is called without any -- even if
the argument isn't actually used...

<P>
调用方法时发生了什么？你可能注意到调用 <code>x.f()</code> 时没有引用前面标出的变量，尽管在 <tt class="method">f</tt> 的函数定义中指明了一个参数。这个参数怎么了？事实上如果函数调用中缺少参数，Python 会抛出异常－－甚至这个参数实际上没什么用……

<P>
Actually, you may have guessed the answer: the special thing about
methods is that the object is passed as the first argument of the
function.  In our example, the call <code>x.f()</code> is exactly equivalent
to <code>MyClass.f(x)</code>.  In general, calling a method with a list of
<var>n</var> arguments is equivalent to calling the corresponding function
with an argument list that is created by inserting the method's object
before the first argument.

<P>
实际上，你可能已经猜到了答案：方法的特别之处在于实例对象作为函数的第一个参数传给了函数。在我们的例子中，调用 <code>x.f()</code> 相当于 <code>MyClass.f(x)</code> 。通常，以 <var>n</var> 个参数的列表去调用一个方法就相当于将方法的对象插入到参数列表的最前面后，以这个列表去调用相应的函数。

<P>
If you still don't understand how methods work, a look at the
implementation can perhaps clarify matters.  When an instance
attribute is referenced that isn't a data attribute, its class is
searched.  If the name denotes a valid class attribute that is a
function object, a method object is created by packing (pointers to)
the instance object and the function object just found together in an
abstract object: this is the method object.  When the method object is
called with an argument list, it is unpacked again, a new argument
list is constructed from the instance object and the original argument
list, and the function object is called with this new argument list.

<P>
如果你还是不理解方法的工作原理，了解一下它的实现也许有帮助。引用非数据属性的实例属性时，会搜索它的类。如果这个命名确认为一个有效的函数对象类属性，就会将实例对象和函数对象封装进一个抽象对象：这就是方法对象。以一个参数列表调用方法对象时，它被重新拆封，用实例对象和原始的参数列表构造一个新的参数列表，然后函数对象调用这个新的参数列表。

<P>

<H1><A NAME="SECTION0010400000000000000000"></A><A NAME="remarks"></A>
<BR>
8.4 Random Remarks 一些说明 
</H1>

<P>
Data attributes override method attributes with the same name; to
avoid accidental name conflicts, which may cause hard-to-find bugs in
large programs, it is wise to use some kind of convention that
minimizes the chance of conflicts.  Possible conventions include
capitalizing method names, prefixing data attribute names with a small
unique string (perhaps just an underscore), or using verbs for methods
and nouns for data attributes.

<P>
同名的数据属性会覆盖方法属性，为了避免可能的命名冲突－－这在大型程序中可能会导致难以发现的 bug －－最好以某种命名约定来避免冲突。可选的约定包括方法的首字母大写，数据属性名前缀小写（可能只是一个下划线），或者方法使用动词而数据属性使用名词。

<P>
Data attributes may be referenced by methods as well as by ordinary
users (``clients'') of an object.  In other words, classes are not
usable to implement pure abstract data types.  In fact, nothing in
Python makes it possible to enforce data hiding -- it is all based
upon convention.  (On the other hand, the Python implementation,
written in C, can completely hide implementation details and control
access to an object if necessary; this can be used by extensions to
Python written in C.)

<P>
数据属性可以由方法引用，也可以由普通用户（客户）调用。换句话说，类不能实现纯的数据类型。事实上 Python 中没有什么办法可以强制隐藏数据－－一切都基本约定的惯例。（另一方法讲，Python 的实现是用 C 写成的，如果有必要，可以用 C 来编写 Python 扩展，完全隐藏实现的细节，控制对象的访问。）

<P>
Clients should use data attributes with care -- clients may mess up
invariants maintained by the methods by stamping on their data
attributes.  Note that clients may add data attributes of their own to
an instance object without affecting the validity of the methods, as
long as name conflicts are avoided -- again, a naming convention can
save a lot of headaches here.

<P>
客户应该小心使用数据属性－－客户可能会因为随意修改数据属性而破坏了本来由方法维护的数据一致性。需要注意的是，客户只要注意避免命名冲突，就可以随意向实例中添加数据属性而不会影响方法的有效性－－再次强调，命名约定可以省去很多麻烦。

<P>
There is no shorthand for referencing data attributes (or other
methods!) from within methods.  I find that this actually increases
the readability of methods: there is no chance of confusing local
variables and instance variables when glancing through a method.

<P>
从方法内部引用数据属性（以及其它方法！）没有什么快捷的方式。我认为这事实上增加了方法的可读性：即使粗略的浏览一个方法，也不会有混淆局部变量和实例变量的机会。

<P>
Often, the first argument of a method is called
<code>self</code>.  This is nothing more than a convention: the name
<code>self</code> has absolutely no special meaning to Python.  (Note,
however, that by not following the convention your code may be less
readable to other Python programmers, and it is also conceivable that
a <em>class browser</em> program might be written that relies upon such a
convention.)

<P>
通常方法的第一个参数命名为 <code>self</code> 。这仅仅是一个约定：对 Python 而言，<code>self</code> 绝对没有任何特殊含义。（然而要注意的是，如果不遵守这个约定，别的 Python 程序员阅读你的代码时会有不便，而且有些类浏览程序也是遵循此约定开发的。）

<P>
Any function object that is a class attribute defines a method for
instances of that class.  It is not necessary that the function
definition is textually enclosed in the class definition: assigning a
function object to a local variable in the class is also ok.  For
example:

<P>
类属性中的任何函数对象在类实例中都定义为方法。不是必须要将函数定义代码写进类定义中，也可以将一个函数对象赋给类中的一个变量。例如：

<P>
<div class="verbatim"><pre>
# Function defined outside the class
def f1(self, x, y):
    return min(x, x+y)

class C:
    f = f1
    def g(self):
        return 'hello world'
    h = g
</pre></div>

<P>
Now <code>f</code>, <code>g</code> and <code>h</code> are all attributes of class
<tt class="class">C</tt> that refer to function objects, and consequently they are all
methods of instances of <tt class="class">C</tt> -- <code>h</code> being exactly equivalent
to <code>g</code>.  Note that this practice usually only serves to confuse
the reader of a program.

<P>
现在 <code>f</code>, <code>g</code> 和 <code>h</code> 都是类 <tt class="class">C</tt> 的属性，引用的都是函数对象，因此它们都是 <tt class="class">C</tt> 实例的方法－－ <code>h</code> 严格等于 <code>g</code>。要注意的是这种习惯通常只会迷惑程序的读者。

<P>
Methods may call other methods by using method attributes of the
<code>self</code> argument:

<P>
通过 <code>self</code> 参数的方法属性，方法可以调用其它的方法：

<P>
<div class="verbatim"><pre>
class Bag:
    def __init__(self):
        self.data = []
    def add(self, x):
        self.data.append(x)
    def addtwice(self, x):
        self.add(x)
        self.add(x)
</pre></div>

<P>
Methods may reference global names in the same way as ordinary
functions.  The global scope associated with a method is the module
containing the class definition.  (The class itself is never used as a
global scope!)  While one rarely encounters a good reason for using
global data in a method, there are many legitimate uses of the global
scope: for one thing, functions and modules imported into the global
scope can be used by methods, as well as functions and classes defined
in it.  Usually, the class containing the method is itself defined in
this global scope, and in the next section we'll find some good
reasons why a method would want to reference its own class!

<P>
方法可以像引用普通的函数那样引用全局命名。与方法关联的全局作用域是包含类定义的模块。（类本身永远不会做为全局作用域使用！）尽管很少有好的理由在方法中使用全局数据，全局作用域确有很多合法的用途：其一是方法可以调用导入全局作用域的函数和方法，也可以调用定义在其中的类和函数。通常，包含此方法的类也会定义在这个全局作用域，在下一节我们会了解为何一个方法要引用自己的类！

<P>

<H1><A NAME="SECTION0010500000000000000000"></A><A NAME="inheritance"></A>
<BR>
8.5 Inheritance 继承 
</H1>

<P>
Of course, a language feature would not be worthy of the name ``class''
without supporting inheritance.  The syntax for a derived class
definition looks like this:

<P>
当然，如果一种语言不支持继承就，“类”就没有什么意义。派生类的定义如下所示：

<P>
<div class="verbatim"><pre>
class DerivedClassName(BaseClassName):
    &lt;statement-1&gt;
    .
    .
    .
    &lt;statement-N&gt;
</pre></div>

<P>
The name <tt class="class">BaseClassName</tt> must be defined in a scope containing
the derived class definition.  In place of a base class name, other
arbitrary expressions are also allowed.  This can be useful, for
example, when the base class is defined in another module:

<P>
命名 <tt class="class">BaseClassName</tt>（示例中的基类名）必须与派生类定义在一个作用域内。除了类，还可以用表达式，基类定义在另一个模块中时这一点非常有用：

<P>
<div class="verbatim"><pre>
class DerivedClassName(modname.BaseClassName):
</pre></div>

<P>
Execution of a derived class definition proceeds the same as for a
base class.  When the class object is constructed, the base class is
remembered.  This is used for resolving attribute references: if a
requested attribute is not found in the class, the search proceeds to look in the
base class.  This rule is applied recursively if the base class itself
is derived from some other class.

<P>
派生类定义的执行过程和基类是一样的。构造派生类对象时，就记住了基类。这在解析属性引用的时候尤其有用：如果在类中找不到请求调用的属性，就搜索基类。如果基类是由别的类派生而来，这个规则会递归的应用上去。

<P>
There's nothing special about instantiation of derived classes:
<code>DerivedClassName()</code> creates a new instance of the class.  Method
references are resolved as follows: the corresponding class attribute
is searched, descending down the chain of base classes if necessary,
and the method reference is valid if this yields a function object.

<P>
派生类的实例化没有什么特殊之处：<code>DerivedClassName()</code> （示列中的派生类）创建一个新的类实例。方法引用按如下规则解析：搜索对应的类属性，必要时沿基类链逐级搜索，如果找到了函数对象这个方法引用就是合法的

<P>
Derived classes may override methods of their base classes.  Because
methods have no special privileges when calling other methods of the
same object, a method of a base class that calls another method
defined in the same base class may end up calling a method of
a derived class that overrides it.  (For C++ programmers: all methods
in Python are effectively <tt class="keyword">virtual</tt>.)

<P>
派生类可能会覆盖其基类的方法。因为方法调用同一个对象中的其它方法时没有特权，基类的方法调用同一个基类的方法时，可能实际上最终调用了派生类中的覆盖方法。（对于 C++ 程序员来说，Python中的所有方法本质上都是虚方法。）

<P>
An overriding method in a derived class may in fact want to extend
rather than simply replace the base class method of the same name.
There is a simple way to call the base class method directly: just
call "<tt class="samp">BaseClassName.methodname(self, arguments)</tt>".  This is
occasionally useful to clients as well.  (Note that this only works if
the base class is defined or imported directly in the global scope.)

<P>
派生类中的覆盖方法可能是想要扩充而不是简单的替代基类中的重名方法。有一个简单的方法可以直接调用基类方法，只要调用："<tt class="samp">BaseClassName.methodname(self, arguments)</tt>"。有时这对于客户也很有用。（要注意的中只有基类在同一全局作用域定义或导入时才能这样用。）

<P>

<H2><A NAME="SECTION0010510000000000000000"></A><A NAME="multiple"></A>
<BR>
8.5.1 Multiple Inheritance 多继承 
</H2>

<P>
Python supports a limited form of multiple inheritance as well.  A
class definition with multiple base classes looks like this:

<P>
Python同样有限的支持多继承形式。多继承的类定义形如下例：

<P>
<div class="verbatim"><pre>
class DerivedClassName(Base1, Base2, Base3):
    &lt;statement-1&gt;
    .
    .
    .
    &lt;statement-N&gt;
</pre></div>

<P>
The only rule necessary to explain the semantics is the resolution
rule used for class attribute references.  This is depth-first,
left-to-right.  Thus, if an attribute is not found in
<tt class="class">DerivedClassName</tt>, it is searched in <tt class="class">Base1</tt>, then
(recursively) in the base classes of <tt class="class">Base1</tt>, and only if it is
not found there, it is searched in <tt class="class">Base2</tt>, and so on.

<P>
这里唯一需要解释的语义是解析类属性的规则。顺序是深度优先，从左到右。因此，如果在 <tt class="class">DerivedClassName</tt> （示例中的派生类）中没有找到某个属性，就会搜索 <tt class="class">Base1</tt> ，然后（递归的）搜索其基类，如果最终没有找到，就搜索 <tt class="class">Base2</tt>，以此类推。

<P>
(To some people breadth first -- searching <tt class="class">Base2</tt> and
<tt class="class">Base3</tt> before the base classes of <tt class="class">Base1</tt> -- looks more
natural.  However, this would require you to know whether a particular
attribute of <tt class="class">Base1</tt> is actually defined in <tt class="class">Base1</tt> or in
one of its base classes before you can figure out the consequences of
a name conflict with an attribute of <tt class="class">Base2</tt>.  The depth-first
rule makes no differences between direct and inherited attributes of
<tt class="class">Base1</tt>.)

<P>
（有些人认为广度优先－－在搜索<tt class="class">Base1</tt>的基类之前搜索<tt class="class">Base2</tt>和<code>Base3</code>－－看起来更为自然。然而，如果<tt class="class">Base1</tt>和<tt class="class">Base2</tt>之间发生了命名冲突，你需要了解这个属性是定义于<tt class="class">Base1</tt>还是<tt class="class">Base1</tt>的基类中。而深度优先不区分属性继承自基类还是直接定义。）

<P>
It is clear that indiscriminate use of multiple inheritance is a
maintenance nightmare, given the reliance in Python on conventions to
avoid accidental name conflicts.  A well-known problem with multiple
inheritance is a class derived from two classes that happen to have a
common base class.  While it is easy enough to figure out what happens
in this case (the instance will have a single copy of ``instance
variables'' or data attributes used by the common base class), it is
not clear that these semantics are in any way useful.

<P>
显然不加限制的使用多继承会带来维护上的噩梦，因为 Python 中只依靠约定来避免命名冲突。多继承一个很有名的问题是派生继承的两个基类都是从同一个基类继承而来。目前还不清楚这在语义上有什么意义，然而很容易想到这会造成什么后果（实例会有一个独立的“实例变量”或数据属性复本作用于公共基类。）

<P>

<H1><A NAME="SECTION0010600000000000000000"></A><A NAME="private"></A>
<BR>
8.6 Private Variables 私有变量 
</H1>

<P>
There is limited support for class-private
identifiers.  Any identifier of the form <code>__spam</code> (at least two
leading underscores, at most one trailing underscore) is textually
replaced with <code>_classname__spam</code>, where <code>classname</code> is the
current class name with leading underscore(s) stripped.  This mangling
is done without regard to the syntactic position of the identifier, so
it can be used to define class-private instance and class variables,
methods, variables stored in globals, and even variables stored in instances.
private to this class on instances of <em>other</em> classes.  Truncation
may occur when the mangled name would be longer than 255 characters.
Outside classes, or when the class name consists of only underscores,
no mangling occurs.

<P>
Python 对类的私有成员提供了有限的支持。任何形如 <code>__spam</code>（以至少双下划线开头，至多单下划线结尾）随即都被替代为 <code>_classname__spam</code>，去掉前导下划线的 <code>classname</code> 即当前的类名。这种混淆不关心标识符的语法位置，所以可用来定义私有类实例和类变量、方法，以及全局变量，甚至于将其它类的实例保存为私有变量。混淆名长度超过255个字符的时候可能会发生截断。在类的外部，或类名只包含下划线时，不会发生截断。

<P>
Name mangling is intended to give classes an easy way to define
``private'' instance variables and methods, without having to worry
about instance variables defined by derived classes, or mucking with
instance variables by code outside the class.  Note that the mangling
rules are designed mostly to avoid accidents; it still is possible for
a determined soul to access or modify a variable that is considered
private.  This can even be useful in special circumstances, such as in
the debugger, and that's one reason why this loophole is not closed.
(Buglet: derivation of a class with the same name as the base class
makes use of private variables of the base class possible.)

<P>
命名混淆意在给出一个在类中定义“私有”实例变量和方法的简单途径，避免派生类的实例变量定义产生问题，或者与外界代码中的变量搞混。要注意的是混淆规则主要目的在于避免意外错误，被认作为私有的变量仍然有可能被访问或修改。在特定的场合它也是有用的，比如调试的时候，这也是一直没有堵上这个漏洞的原因之一（小漏洞：派生类和基类取相同的名字就可以使用基类的私有变量。）

<P>
Notice that code passed to <code>exec</code>, <code>eval()</code> or
<code>evalfile()</code> does not consider the classname of the invoking 
class to be the current class; this is similar to the effect of the 
<code>global</code> statement, the effect of which is likewise restricted to 
code that is byte-compiled together.  The same restriction applies to
<code>getattr()</code>, <code>setattr()</code> and <code>delattr()</code>, as well as
when referencing <code>__dict__</code> directly.

<P>
要注意的是传入 <code>exec</code>，<code>eval()</code> 或 <code>evalfile()</code> 的代码不会将调用它们的类视作当前类，这与 <code>global</code> 语句的情况类似，<code>global</code> 的作用局限于“同一批”进行字节编译的代码。同样的限制也适用于 <code>getattr()</code>，<code>setattr()</code> 和<code>delattr()</code>，以及直接引用 <code>__dict__</code> 的时候。

<P>

<H1><A NAME="SECTION0010700000000000000000"></A><A NAME="odds"></A>
<BR>
8.7 Odds and Ends 补充 
</H1>

<P>
Sometimes it is useful to have a data type similar to the Pascal
``record'' or C ``struct'', bundling together a few named data
items.  An empty class definition will do nicely:

<P>
有时类似于Pascal中“记录（record）”或C中“结构（struct）”的数据类型很有用，它将一组已命名的数据项绑定在一起。一个空的类定义可以很好的实现这它：

<P>
<div class="verbatim"><pre>
class Employee:
    pass

john = Employee() # Create an empty employee record

# Fill the fields of the record
john.name = 'John Doe'
john.dept = 'computer lab'
john.salary = 1000
</pre></div>

<P>
A piece of Python code that expects a particular abstract data type
can often be passed a class that emulates the methods of that data
type instead.  For instance, if you have a function that formats some
data from a file object, you can define a class with methods
<tt class="method">read()</tt> and <tt class="method">readline()</tt> that get the data from a string
buffer instead, and pass it as an argument.
<P>
某一段 Python 代码需要一个特殊的抽象数据结构的话，通常可以传入一个类，事实上这模仿了该类的方法。例如，如果你有一个用于从文件对象中格式化数据的函数，你可以定义一个带有 <tt class="method">read()</tt> 和 <tt class="method">readline()</tt> 方法的类，以此从字符串缓冲读取数据，然后将该类的对象作为参数传入前述的函数。

<P>
Instance method objects have attributes, too: <code>m.im_self</code> is the
instance object with the method <tt class="method">m</tt>, and <code>m.im_func</code> is the
function object corresponding to the method.

<P>
实例方法对象也有属性： <code>m.im_self</code> 是一个实例方法所属的对象，而 <code>m.im_func</code> 是这个方法对应的函数对象。

<P>

<H1><A NAME="SECTION0010800000000000000000"></A><A NAME="exceptionClasses"></A>
<BR>
8.8 Exceptions Are Classes Too 异常也是类 
</H1>

<P>
User-defined exceptions are identified by classes as well.  Using this
mechanism it is possible to create extensible hierarchies of exceptions.

<P>
用户自定义异常也可以是类。利用这个机制可以创建可扩展的异常体系。

<P>
There are two new valid (semantic) forms for the raise statement:

<P>
以下是两种新的有效（语义上的）异常抛出形式：

<P>
<div class="verbatim"><pre>
raise Class, instance

raise instance
</pre></div>

<P>
In the first form, <code>instance</code> must be an instance of
<tt class="class">Class</tt> or of a class derived from it.  The second form is a
shorthand for:

<P>
第一种形式中，<code>instance</code> 必须是 <tt class="class">Class</tt> 或其派生类的一个实例。第二种形式是以下形式的简写：

<P>
<div class="verbatim"><pre>
raise instance.__class__, instance
</pre></div>

<P>
A class in an except clause is compatible with an exception if it is the same
class or a base class thereof (but not the other way around -- an
except clause listing a derived class is not compatible with a base
class).  For example, the following code will print B, C, D in that
order:

<P>
发生的异常其类型如果是异常子句中列出的类，或者是其派生类，那么它们就是相符的（反过来说－－发生的异常其类型如果是异常子句中列出的类的基类，它们就不相符）。例如，以下代码会按顺序打印B，C，D：

<P>
<div class="verbatim"><pre>
class B:
    pass
class C(B):
    pass
class D(C):
    pass

for c in [B, C, D]:
    try:
        raise c()
    except D:
        print "D"
    except C:
        print "C"
    except B:
        print "B"
</pre></div>

<P>
Note that if the except clauses were reversed (with
"<tt class="samp">except B</tt>" first), it would have printed B, B, B -- the first
matching except clause is triggered.

<P>
要注意的是如果异常子句的顺序颠倒过来（ "<tt class="samp">execpt B</tt>" 在最前），它就会打印B，B，B－－第一个匹配的异常被触发。

<P>
When an error message is printed for an unhandled exception, the
exception's class name is printed, then a colon and a space, and
finally the instance converted to a string using the built-in function
<tt class="function">str()</tt>.

<P>
打印一个异常类的错误信息时，先打印类名，然后是一个空格、一个冒号，然后是用内置函数 <tt class="function">str()</tt> 将类转换得到的完整字符串。

<P>

<H1><A NAME="SECTION0010900000000000000000"></A><A NAME="iterators"></A>
<BR>
8.9 Iterators 迭代器 
</H1>

<P>
By now you have probably noticed that most container objects can be looped
over using a <tt class="keyword">for</tt> statement:

<P>
现在你可能注意到大多数容器对象都可以用 <code>for</code> 遍历：

<P>
<div class="verbatim"><pre>
for element in [1, 2, 3]:
    print element
for element in (1, 2, 3):
    print element
for key in {'one':1, 'two':2}:
    print key
for char in "123":
    print char
for line in open("myfile.txt"):
    print line
</pre></div>

<P>
This style of access is clear, concise, and convenient.  The use of iterators
pervades and unifies Python.  Behind the scenes, the <tt class="keyword">for</tt>
statement calls <tt class="function">iter()</tt> on the container object.  The
function returns an iterator object that defines the method
<tt class="method">next()</tt> which accesses elements in the container one at a
time.  When there are no more elements, <tt class="method">next()</tt> raises a
<tt class="exception">StopIteration</tt> exception which tells the <tt class="keyword">for</tt> loop
to terminate.  This example shows how it all works:

<P>
这种形式的访问清晰、简洁、方便。迭代器的用法在 Python 中普遍而且统一。在后台，<code>for</code> 语句在容器对象中调用 <tt class="function">iter()</tt> 。 该函数返回一个定义了 <tt class="method">next()</tt> 方法的迭代器对象，它在容器中逐一访问元素。没有后续的元素时，<tt class="method">next()</tt>抛出一个 <tt class="exception">StopIteration</tt> 异常通知 <code>for</code> 语句循环结束。以下是其工作原理的示例：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; s = 'abc'
&gt;&gt;&gt; it = iter(s)
&gt;&gt;&gt; it
&lt;iterator object at 0x00A1DB50&gt;
&gt;&gt;&gt; it.next()
'a'
&gt;&gt;&gt; it.next()
'b'
&gt;&gt;&gt; it.next()
'c'
&gt;&gt;&gt; it.next()

Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
    it.next()
StopIteration
</pre></div>

<P>
Having seen the mechanics behind the iterator protocol, it is easy to add
iterator behavior to your classes.  Define a <tt class="method">__iter__()</tt> method
which returns an object with a <tt class="method">next()</tt> method.  If the class defines
<tt class="method">next()</tt>, then <tt class="method">__iter__()</tt> can just return <code>self</code>:

<P>
了解了迭代器协议的后台机制，就可以很容易的给自己的类添加迭代器行为。定义一个 <tt class="method">__iter__()</tt> 方法，使其返回一个带有 <tt class="method">next()</tt> 方法的对象。如果这个类已经定义了 <tt class="method">next()</tt>，那么 <tt class="method">__iter__()</tt> 只需要返回self：

<P>
<div class="verbatim"><pre>
class Reverse:
    "Iterator for looping over a sequence backwards"
    def __init__(self, data):
        self.data = data
        self.index = len(data)
    def __iter__(self):
        return self
    def next(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]

&gt;&gt;&gt; for char in Reverse('spam'):
...     print char
...
m
a
p
s
</pre></div>

<P>

<H1><A NAME="SECTION00101000000000000000000"></A><A NAME="generators"></A>
<BR>
8.10 Generators 生成器 
</H1>

<P>
Generators are a simple and powerful tool for creating iterators.  They are
written like regular functions but use the <tt class="keyword">yield</tt> statement whenever
they want to return data.  Each time <tt class="method">next()</tt> is called, the
generator resumes where it left-off (it remembers all the data values and
which statement was last executed).  An example shows that generators can
be trivially easy to create:

<P>
生成器是创建迭代器的简单而强大的工具。它们写起来就像是正则函数，需要返回数据的时候使用 <tt class="keyword">yield</tt> 语句。每次  <tt class="method">next()</tt> 被调用时，生成器回复它脱离的位置（它记忆语句最后一次执行的位置和所有的数据值）。以下示例演示了生成器可以很简单的创建出来：

<P>
<div class="verbatim"><pre>
def reverse(data):
    for index in range(len(data)-1, -1, -1):
        yield data[index]
	
&gt;&gt;&gt; for char in reverse('golf'):
...     print char
...
f
l
o
g
</pre></div>

<P>
Anything that can be done with generators can also be done with class based
iterators as described in the previous section.  What makes generators so
compact is that the <tt class="method">__iter__()</tt> and <tt class="method">next()</tt> methods are
created automatically.

<P>
前一节中描述了基于类的迭代器，它能作的每一件事生成器也能作到。因为自动创建了 <tt class="method">__iter__()</tt> 和 <tt class="method">next()</tt> 方法，生成器显得如此简洁。

<P>
Another key feature is that the local variables and execution state
are automatically saved between calls.  This made the function easier to write
and much more clear than an approach using instance variables like
<code>self.index</code> and <code>self.data</code>.

<P>
另外一个关键的功能是两次调用之间的局部变量和执行情况都自动保存了下来。这样函数编写起来就比手动调用 <code>self.index</code> 和 <code>self.data</code> 这样的类变量容易的多。

<P>
In addition to automatic method creation and saving program state, when
generators terminate, they automatically raise <tt class="exception">StopIteration</tt>.
In combination, these features make it easy to create iterators with no
more effort than writing a regular function.

<P>
除了创建和保存程序状态的自动方法，当发生器终结时，还会自动抛出 <tt class="exception">StopIteration</tt> 异常。综上所述，这些功能使得编写一个正则函数成为创建迭代器的最简单方法。

<P>

<H1><A NAME="SECTION00101100000000000000000"></A><A NAME="genexps"></A>
<BR>
8.11 Generator Expressions 生成器表达式 
</H1>

<P>
Some simple generators can be coded succinctly as expressions using a syntax
similar to list comprehensions but with parentheses instead of brackets.  These
expressions are designed for situations where the generator is used right
away by an enclosing function.  Generator expressions are more compact but
less versatile than full generator definitions and tend to be more memory
friendly than equivalent list comprehensions.

<P>
有时简单的生成器可以用简洁的方式调用，就像不带中括号的链表推导式。这些表达式是为
函数调用生成器而设计的。生成器表达式比完整的生成器定义更简洁，但是没有那么多变，而且通常比等价的链表推导式更容易记。

<P>
Examples:

<P>
例如：

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; sum(i*i for i in range(10))                 # sum of squares
285

&gt;&gt;&gt; xvec = [10, 20, 30]
&gt;&gt;&gt; yvec = [7, 5, 3]
&gt;&gt;&gt; sum(x*y for x,y in zip(xvec, yvec))         # dot product
260

&gt;&gt;&gt; from math import pi, sin
&gt;&gt;&gt; sine_table = dict((x, sin(x*pi/180)) for x in range(0, 91))

&gt;&gt;&gt; unique_words = set(word  for line in page  for word in line.split())

&gt;&gt;&gt; valedictorian = max((student.gpa, student.name) for student in graduates)

&gt;&gt;&gt; data = 'golf'
&gt;&gt;&gt; list(data[i] for i in range(len(data)-1,-1,-1))
['f', 'l', 'o', 'g']
</pre></div>

<P>
<BR><HR><H4>Footnotes</H4>
<DL>
<DT><A NAME="foot2540">... namespace!</A><A
 HREF="node10.html#tex2html9"><SUP>8.1</SUP></A></DT>
<DD>
        Except for one thing.  Module objects have a secret read-only
        attribute called <tt class="member">__dict__</tt> which returns the dictionary
        used to implement the module's namespace; the name
        <tt class="member">__dict__</tt> is an attribute but not a global name.
        Obviously, using this violates the abstraction of namespace
        implementation, and should be restricted to things like
        post-mortem debuggers.


</DD>
<DT><A NAME="foot1603">... 是它的一个属性。因此，模块的属性和模块中的全局命名有直接的映射关系：它们共享同一命名空间！</A><A
 HREF="node10.html#tex2html10"><SUP>8.2</SUP></A></DT>
<DD> 有一个例外。模块对象有一个隐秘的只读对象，名为 __dict__，它返回用于实现模块命名空间的字典，命名 __dict__ 是一个属性而非全局命名。显然，使用它违反了命名空间实现的抽象原则，应该被严格限制于调试中。

</DD>
</DL>

