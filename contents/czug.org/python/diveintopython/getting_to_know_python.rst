---
created: 
creator: Benky
description: ''
title: 2. 第一个 Python 程序
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/getting_to_know_python/index.html">http://www.woodpecker.org.cn/diveintopython/getting_to_know_python/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper"></a>第&nbsp;2&nbsp;章&nbsp;第一个 <span class="application">Python</span> 程序
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#odbchelper.divein">2.1. 概览</a></span></li>
               <li><span class="section"><a href="#declaring_functions.html">2.2. 函数声明</a></span><ul>
                     <li><span class="section"><a href="#declaring_functions.html#d0e4324">2.2.1. Python 和其他编程语言数据类型的比较</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#documenting_functions.html">2.3. 文档化函数</a></span></li>
               <li><span class="section"><a href="#everything_is_an_object.html">2.4. 万物皆对象</a></span><ul>
                     <li><span class="section"><a href="#everything_is_an_object.html#d0e4686">2.4.1. 模块导入的搜索路径</a></span></li>
                     <li><span class="section"><a href="#everything_is_an_object.html#d0e4801">2.4.2. 何谓对象？</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#indenting_code.html">2.5. 代码缩进</a></span></li>
               <li><span class="section"><a href="#testing_modules.html">2.6. 测试模块</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>大家都很清楚，其他书籍是如何一步步从编程基础讲述到构建完整的可运行程序的，但还是让我们跳过这个部分吧！
               
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="odbchelper.divein"></a>2.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>这是一个完整的、可执行的 <span class="application">Python</span> 程序。
               </p>
            </div>
            <p>它可能对您来说根本无法理解。别着急，我们将逐行地进行剖析。不过首先把代码通读一遍，看一看是否有些可以理解的内容。</p>
            <div class="example"><a name="d0e4084"></a><h3 class="title">例&nbsp;2.1.&nbsp;<tt class="filename">odbchelper.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting"><span class='pykeyword'>
def</span> buildConnectionString(params):
    <span class='pystring'>"""Build a connection string from a dictionary of parameters.

    Returns string."""</span>
    <span class='pykeyword'>return</span> <span class='pystring'>";"</span>.join([<span class='pystring'>"%s=%s"</span> % (k, v) <span class='pykeyword'>for</span> k, v <span class='pykeyword'>in</span> params.items()])

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:
    myParams = {<span class='pystring'>"server"</span>:<span class='pystring'>"mpilgrim"</span>, \
                <span class='pystring'>"database"</span>:<span class='pystring'>"master"</span>, \
                <span class='pystring'>"uid"</span>:<span class='pystring'>"sa"</span>, \
                <span class='pystring'>"pwd"</span>:<span class='pystring'>"secret"</span> \
                }
    <span class='pykeyword'>print</span> buildConnectionString(myParams)</pre></div>
            <p>现在运行一下这个程序，看一看结果是什么。</p><a name="tip.run.windows"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.funcdef"></a><a name="declaring_functions.html">2.2.&nbsp;函数声明
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="declaring_functions.html#d0e4324">2.2.1. Python 和其他编程语言数据类型的比较</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>与其它大多数语言一样 <span class="application">Python</span> 有函数，但是它没有像 <span class="application"><span class="acronym">C++</span></span> 一样的独立的头文件；或者像 <span class="application">Pascal</span> 一样的分离的 <tt class="literal">interface</tt>/<tt class="literal">implementation</tt> 段。在需要函数时，像下面这样声明即可：
            </p>
         </div>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
def</span> buildConnectionString(params):</pre></div>
         <p>首先，函数声明以关键字 <tt class="literal">def</tt> 开始，接着为函数名，再往后为参数，参数放在小括号里。多个参数之间 (这里没有演示)用逗号分隔。
         </p>
         <p>其次，函数没有定义返回的数据类型。<span class="application">Python</span> 不需要指定返回值的数据类型；甚至不需要指定是否有返回值。实际上，每个 <span class="application">Python</span> 函数都返回一个值；如果函数执行过 <tt class="literal">return</tt> 语句，它将返回指定的值，否则将返回 <tt class="literal">None</tt> (<span class="application">Python</span> 的空值)。
            
         </p><a name="compare.funcdef.vb"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.docstring"></a><a name="documenting_functions.html">2.3.&nbsp;文档化函数
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>可以通过给出一个 <tt class="literal">doc string</tt> (文档字符串) 来文档化一个 <span class="application">Python</span> 函数。
            </p>
         </div>
         <div class="example"><a name="odbchelper.triplequotes"></a><h3 class="title">例&nbsp;2.2.&nbsp;定义 <tt class="function">buildConnectionString</tt> 函数的 <tt class="literal">doc string</tt></h3><pre class="programlisting"><span class='pykeyword'>
def</span> buildConnectionString(params):
    <span class='pystring'>"""Build a connection string from a dictionary of parameters.

    Returns string."""</span></pre><p>三重引号表示一个多行字符串。在开始与结束引号间的所有东西都被视为单个字符串的一部分，包括硬回车和其它的引号字符。您可以在任何地方使用它们，但是您可能会发现，它们经常被用于定义 <tt class="literal">doc string</tt>。
            </p>
         </div><a name="compare.quoting.perl"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.objects"></a><a name="everything_is_an_object.html">2.4.&nbsp;万物皆对象
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="everything_is_an_object.html#d0e4686">2.4.1. 模块导入的搜索路径</a></span></li>
               <li><span class="section"><a href="everything_is_an_object.html#d0e4801">2.4.2. 何谓对象？</a></span></li>
            </ul>
         </div>
         <p>也许您没在意，我刚才的意思是 <span class="application">Python</span> 函数有属性，并且这些属性在运行时是可用的。
         </p>
         <div class="abstract">
            <p>在 <span class="application">Python</span> 中，函数同其它东西一样也是对象。
            </p>
         </div>
         <p>打开您习惯使用的 <span class="application">Python</span> <span class="acronym">IDE</span> 执行如下的操作：
         </p>
         <div class="example"><a name="odbchelper.import"></a><h3 class="title">例&nbsp;2.3.&nbsp;访问 <tt class="function">buildConnectionString</tt> 函数的 <tt class="literal">doc string</tt></h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> odbchelper</span>                              <a name="odbchelper.objects.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">params = {<span class='pystring'>"server"</span>:<span class='pystring'>"mpilgrim"</span>, <span class='pystring'>"database"</span>:<span class='pystring'>"master"</span>, <span class='pystring'>"uid"</span>:<span class='pystring'>"sa"</span>, <span class='pystring'>"pwd"</span>:<span class='pystring'>"secret"</span>}</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> odbchelper.buildConnectionString(params)</span> <a name="odbchelper.objects.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">server=mpilgrim;uid=sa;database=master;pwd=secret</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> odbchelper.buildConnectionString.__doc__</span> <a name="odbchelper.objects.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">Build a connection string from a dictionary

Returns string.</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.indenting"></a><a name="indenting_code.html">2.5.&nbsp;代码缩进
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 函数没有明显的 <tt class="literal">begin</tt> 和 <tt class="literal">end</tt>，没有标明函数的开始和结束的花括号。唯一的分隔符是一个冒号 (<tt class="literal">:</tt>)，接着代码本身是缩进的。
            </p>
         </div>
         <div class="example"><a name="d0e4895"></a><h3 class="title">例&nbsp;2.5.&nbsp;缩进 <tt class="function">buildConnectionString</tt> 函数
            </h3><pre class="programlisting"><span class='pykeyword'>
def</span> buildConnectionString(params):
    <span class='pystring'>"""Build a connection string from a dictionary of parameters.

    Returns string."""</span>
    <span class='pykeyword'>return</span> <span class='pystring'>";"</span>.join([<span class='pystring'>"%s=%s"</span> % (k, v) <span class='pykeyword'>for</span> k, v <span class='pykeyword'>in</span> params.items()])</pre></div>
         <p>代码块是通过它们的缩进来定义的。我所说的“代码块”是指：函数、<tt class="literal">if</tt> 语句、<tt class="literal">for</tt> 循环、<tt class="literal">while</tt> 循环，等等。开始缩进表示块的开始，取消缩进表示块的结束。不存在明显的括号，大括号或关键字。这就意味着空白是重要的，并且要一致。在这个例子中，函数代码 (包括 <tt class="literal">doc string</tt>) 缩进了 4 个空格。不一定非要是 4 个，只要一致就可以了。没有缩进的第一行则被视为在函数体之外。
         </p>
         <p><a href="indenting_code.html#odbchelper.indenting.if" title="例&nbsp;2.6.&nbsp;if 语句">例&nbsp;2.6 “if 语句”</a> 展示了一个 <tt class="literal">if</tt> 语句缩进的例子。
         </p>
         <div class="example"><a name="odbchelper.indenting.if"></a><h3 class="title">例&nbsp;2.6.&nbsp;<tt class="literal">if</tt> 语句
            </h3><pre class="programlisting"><span class='pykeyword'>
def</span> fib(n):                   <a name="odbchelper.indenting.2.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    <span class='pykeyword'>print</span> <span class='pystring'>'n ='</span>, n            <a name="odbchelper.indenting.2.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    <span class='pykeyword'>if</span> n &gt; 1:                 <a name="odbchelper.indenting.2.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
        <span class='pykeyword'>return</span> n * fib(n - 1)
    <span class='pykeyword'>else</span>:                     <a name="odbchelper.indenting.2.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
        <span class='pykeyword'>print</span> <span class='pystring'>'end of the line'</span>
        <span class='pykeyword'>return</span> 1
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.testing"></a><a name="testing_modules.html">2.6.&nbsp;测试模块
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>所有的 <span class="application">Python</span> 模块都是对象，并且有几个有用的属性。您可以使用这些属性方便地测试您所编写的模块。下面是一个使用 <tt class="literal">if</tt> <tt class="literal">__name__</tt> 的技巧。
            </p>
         </div>
         <div class="informalexample"><a name="odbchelper.ifnametrick"></a><pre class="programlisting"><span class='pykeyword'>
if</span> __name__ == <span class='pystring'>"__main__"</span>:</pre></div>
         <p>在继续学习新东西之前，有几个重要的观察结果。首先，<tt class="literal">if</tt> 表达式无需使用圆括号括起来。其次，<tt class="literal">if</tt> 语句以冒号结束，紧跟其后的是<a href="indenting_code.html" title="2.5.&nbsp;代码缩进">缩进代码</a>。
         </p><a name="compare.equals.c"></a>
