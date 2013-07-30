---
created: 
creator: Benky
description: ''
title: 4. 自省的威力
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/power_of_introspection/index.html">http://www.woodpecker.org.cn/diveintopython/power_of_introspection/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper"></a>第&nbsp;4&nbsp;章&nbsp;自省的威力
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#apihelper.divein">4.1. 概览</a></span></li>
               <li><span class="section"><a href="#optional_arguments.html">4.2. 使用可选参数和命名参数</a></span></li>
               <li><span class="section"><a href="#built_in_functions.html">4.3. 使用 type、str、dir 和其它内置函数</a></span><ul>
                     <li><span class="section"><a href="#built_in_functions.html#d0e8648">4.3.1. type 函数</a></span></li>
                     <li><span class="section"><a href="#built_in_functions.html#d0e8758">4.3.2. str 函数</a></span></li>
                     <li><span class="section"><a href="#built_in_functions.html#d0e9105">4.3.3. 内置函数</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#getattr.html">4.4. 通过 getattr 获取对象引用</a></span><ul>
                     <li><span class="section"><a href="#getattr.html#d0e9345">4.4.1. 用于模块的 getattr</a></span></li>
                     <li><span class="section"><a href="#getattr.html#d0e9513">4.4.2. getattr 作为一个分发者</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#filtering_lists.html">4.5. 过滤列表</a></span></li>
               <li><span class="section"><a href="#and_or.html">4.6. and 和 or 的特殊性质</a></span><ul>
                     <li><span class="section"><a href="#and_or.html#d0e10128">4.6.1. 使用 and-or 技巧</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#lambda_functions.html">4.7. 使用 lambda 函数</a></span><ul>
                     <li><span class="section"><a href="#lambda_functions.html#d0e10549">4.7.1. 真实世界中的 lambda 函数</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#all_together.html">4.8. 全部放在一起</a></span></li>
               <li><span class="section"><a href="#summary.html">4.9. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>本章论述了 <span class="application">Python</span> 众多强大功能之一：自省。正如你所知道的，<a href="../getting_to_know_python/everything_is_an_object.html" title="2.4.&nbsp;万物皆对象"><span class="application">Python</span> 中万物皆对象</a>，自省是指代码可以查看内存中以对象形式存在的其它模块和函数，获取它们的信息，并对它们进行操作。用这种方法，你可以定义没有名称的函数，不按函数声明的参数顺序调用函数，甚至引用事先并不知道名称的函数。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="apihelper.divein"></a>4.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>下面是一个完整可运行的 <span class="application">Python</span> 程序。大概看一下这段程序，你应该可以理解不少了。用数字标出的行阐述了 <a href="../getting_to_know_python/index.html" title="第&nbsp;2&nbsp;章&nbsp;第一个 Python 程序">第&nbsp;2&nbsp;章 <i>第一个 Python 程序</i></a> 中涉及的一些概念。如果剩下来的代码看起来有点奇怪，不用担心，通过阅读本章你将会理解所有这些。
               </p>
            </div>
            <div class="example"><a name="d0e8300"></a><h3 class="title">例&nbsp;4.1.&nbsp;<tt class="filename">apihelper.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting"><span class='pykeyword'>
def</span> info(object, spacing=10, collapse=1): <a name="apihelper.intro.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12"> <a name="apihelper.intro.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12"> <a name="apihelper.intro.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
    <span class='pystring'>"""Print methods and doc strings.
    
    Takes module, class, list, dictionary, or string."""</span>
    methodList = [method <span class='pykeyword'>for</span> method <span class='pykeyword'>in</span> dir(object) <span class='pykeyword'>if</span> callable(getattr(object, method))]
    processFunc = collapse <span class='pykeyword'>and</span> (<span class='pykeyword'>lambda</span> s: <span class='pystring'>" "</span>.join(s.split())) <span class='pykeyword'>or</span> (<span class='pykeyword'>lambda</span> s: s)
    <span class='pykeyword'>print</span> <span class='pystring'>"\n"</span>.join([<span class='pystring'>"%s %s"</span> %
                      (method.ljust(spacing),
                       processFunc(str(getattr(object, method).__doc__)))
                     <span class='pykeyword'>for</span> method <span class='pykeyword'>in</span> methodList])

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:                <a name="apihelper.intro.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12"> <a name="apihelper.intro.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
    <span class='pykeyword'>print</span> info.__doc__</pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.optional"></a><a name="optional_arguments.html">4.2.&nbsp;使用可选参数和命名参数
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 允许函数参数有缺省值；如果调用函数时不使用参数，参数将获得它的缺省值。此外，通过使用命名参数还可以以任意顺序指定参数。<span class="application">SQL Server</span> Transact/<span class="acronym">SQL</span> 中的存储过程也可以做到这些；如果你是脚本高手，你可以略过这部分。
            </p>
         </div>
         <div class="informalexample">
            <p><tt class="function">info</tt> 函数就是这样一个例子，它有两个可选参数。
            </p><pre class="programlisting"><span class='pykeyword'>
def</span> info(object, spacing=10, collapse=1):</pre></div>
         <p><tt class="varname">spacing</tt> 和 <tt class="varname">collapse</tt> 是可选参数，因为它们已经定义了缺省值。<tt class="varname">object</tt> 是必备参数，因为它没有指定缺省值。如果调用 <tt class="function">info</tt> 时只指定一个参数，那么 <tt class="varname">spacing</tt> 缺省为 <tt class="constant">10</tt> ，<tt class="varname">collapse</tt> 缺省为 <tt class="constant">1</tt>。如果调用 <tt class="function">info</tt> 时指定两个参数，<tt class="varname">collapse</tt> 依然默认为 <tt class="constant">1</tt>。
         </p>
         <p>假如你要指定 <tt class="varname">collapse</tt> 的值，但是又想要接受 <tt class="varname">spacing</tt> 的缺省值。在绝大部分语言中，你可能运气就不太好了，因为你需要使用三个参数来调用函数，这势必要重新指定 <tt class="varname">spacing</tt> 的值。但是在 <span class="application">Python</span> 中，参数可以通过名称以任意顺序指定。
         </p>
         <div class="example"><a name="d0e8539"></a><h3 class="title">例&nbsp;4.4.&nbsp;<tt class="function">info</tt> 的有效调用
            </h3><pre class="programlisting">
info(odbchelper)                    <a name="apihelper_args.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
info(odbchelper, 12)                <a name="apihelper_args.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
info(odbchelper, collapse=0)        <a name="apihelper_args.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
info(spacing=15, object=odbchelper) <a name="apihelper_args.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.builtin"></a><a name="built_in_functions.html">4.3.&nbsp;使用 <tt class="function">type</tt>、<tt class="function">str</tt>、<tt class="function">dir</tt> 和其它内置函数
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="built_in_functions.html#d0e8648">4.3.1. type 函数</a></span></li>
               <li><span class="section"><a href="built_in_functions.html#d0e8758">4.3.2. str 函数</a></span></li>
               <li><span class="section"><a href="built_in_functions.html#d0e9105">4.3.3. 内置函数</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 有小部分相当有用的内置函数。除这些函数之外，其它所有的函数都被分到了各个模块中。其实这是一个非常明智的设计策略，避免了核心语言变得像其它脚本语言一样臃肿 (咳 咳，<span class="application">Visual Basic</span>)。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e8648"></a>4.3.1.&nbsp;<tt class="function">type</tt> 函数
                     </h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p><tt class="function">type</tt> 函数返回任意对象的数据类型。在 <tt class="filename">types</tt> 模块中列出了可能的数据类型。这对于处理多种数据类型的帮助者函数 <sup>[<a name="d0e8660" href="#ftn.d0e8660">1</a>]</sup> 非常有用。
            </p>
            <div class="example"><a name="apihelper.type.intro"></a><h3 class="title">例&nbsp;4.5.&nbsp;<tt class="function">type</tt> 介绍
               </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">type(1)</span>           <a name="apihelper.builtin.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">&lt;type 'int'&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = []</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">type(li)</span>          <a name="apihelper.builtin.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;type 'list'&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> odbchelper</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">type(odbchelper)</span>  <a name="apihelper.builtin.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;type 'module'&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> types</span>      <a name="apihelper.builtin.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">type(odbchelper) == types.ModuleType</span>
<span class="computeroutput">True</span></pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.getattr"></a><a name="getattr.html">4.4.&nbsp;通过 <tt class="function">getattr</tt> 获取对象引用
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="getattr.html#d0e9345">4.4.1. 用于模块的 getattr</a></span></li>
               <li><span class="section"><a href="getattr.html#d0e9513">4.4.2. getattr 作为一个分发者</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>你已经知道 <a href="../getting_to_know_python/everything_is_an_object.html" title="2.4.&nbsp;万物皆对象"><span class="application">Python</span> 函数是对象</a>。你不知道的是，使用 <tt class="function">getattr</tt> 函数，可以得到一个直到运行时才知道名称的函数的引用。
            </p>
         </div>
         <div class="example"><a name="apihelper.getattr.intro"></a><h3 class="title">例&nbsp;4.10.&nbsp;<tt class="function">getattr</tt> 介绍
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [<span class='pystring'>"Larry"</span>, <span class='pystring'>"Curly"</span>]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li.pop</span>                       <a name="apihelper.getattr.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">&lt;built-in method pop of list object at 010DF884&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">getattr(li, <span class='pystring'>"pop"</span>)</span>           <a name="apihelper.getattr.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;built-in method pop of list object at 010DF884&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">getattr(li, <span class='pystring'>"append"</span>)(<span class='pystring'>"Moe"</span>)</span> <a name="apihelper.getattr.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li</span>
<span class="computeroutput">["Larry", "Curly", "Moe"]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">getattr({}, <span class='pystring'>"clear"</span>)</span>         <a name="apihelper.getattr.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">&lt;built-in method clear of dictionary object at 00F113D4&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">getattr((), <span class='pystring'>"pop"</span>)</span>           <a name="apihelper.getattr.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<span class="traceback">Traceback (innermost last):
  File "&lt;interactive input&gt;", line 1, in ?
AttributeError: 'tuple' object has no attribute 'pop'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.filter"></a><a name="filtering_lists.html">4.5.&nbsp;过滤列表
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>如你所知，<span class="application">Python</span> 具有通过列表解析 (<a href="../native_data_types/mapping_lists.html" title="3.6.&nbsp;映射 list">第&nbsp;3.6&nbsp;节 “映射 list”</a>) 将列表映射到其它列表的强大能力。这种能力同过滤机制结合使用，使列表中的有些元素被映射的同时跳过另外一些元素。
            </p>
         </div>
         <div class="informalexample">
            <p>过滤列表语法：</p><pre class="programlisting">
[<i class="replaceable"><tt>mapping-expression</tt></i><span class='pykeyword'> for</span> <i class="replaceable"><tt>element</tt></i><span class='pykeyword'> in</span> <i class="replaceable"><tt>source-list</tt></i><span class='pykeyword'> if</span> <i class="replaceable"><tt>filter-expression</tt></i>]</pre></div>
         <p>这是你所知所爱的<a href="../native_data_types/mapping_lists.html" title="3.6.&nbsp;映射 list">列表解析</a>的扩展。前三部分都是相同的；最后一部分，以 <tt class="literal">if</tt> 开头的是过滤器表达式。过滤器表达式可以是返回值为真或者假的任何表达式 (在 <span class="application">Python</span> 中是<a href="../native_data_types/lists.html#tip.boolean">几乎任何东西</a>)。任何经过滤器表达式演算值为真的元素都可以包含在映射中。其它的元素都将忽略，它们不会进入映射表达式，更不会包含在输出列表中。
         </p>
         <div class="example"><a name="d0e9689"></a><h3 class="title">例&nbsp;4.14.&nbsp;列表过滤介绍</h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [<span class='pystring'>"a"</span>, <span class='pystring'>"mpilgrim"</span>, <span class='pystring'>"foo"</span>, <span class='pystring'>"b"</span>, <span class='pystring'>"c"</span>, <span class='pystring'>"b"</span>, <span class='pystring'>"d"</span>, <span class='pystring'>"d"</span>]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[elem <span class='pykeyword'>for</span> elem <span class='pykeyword'>in</span> li <span class='pykeyword'>if</span> len(elem) &gt; 1]</span>       <a name="apihelper.filter.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">['mpilgrim', 'foo']</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[elem <span class='pykeyword'>for</span> elem <span class='pykeyword'>in</span> li <span class='pykeyword'>if</span> elem != <span class='pystring'>"b"</span>]</span>         <a name="apihelper.filter.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">['a', 'mpilgrim', 'foo', 'c', 'd', 'd']</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[elem <span class='pykeyword'>for</span> elem <span class='pykeyword'>in</span> li <span class='pykeyword'>if</span> li.count(elem) == 1]</span> <a name="apihelper.filter.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">['a', 'mpilgrim', 'foo', 'c']</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.andor"></a><a name="and_or.html">4.6.&nbsp;<tt class="literal">and</tt> 和 <tt class="literal">or</tt> 的特殊性质
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="and_or.html#d0e10128">4.6.1. 使用 and-or 技巧</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>在<span class="application">Python</span> 中，<tt class="literal">and</tt> 和 <tt class="literal">or</tt> 执行布尔逻辑演算，如你所期待的一样。但是它们并不返回布尔值，而是返回它们实际进行比较的值之一。
            </p>
         </div>
         <div class="example"><a name="apihelper.andor.intro.example"></a><h3 class="title">例&nbsp;4.15.&nbsp;<tt class="literal">and</tt> 介绍
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pystring'>'a'</span> <span class='pykeyword'>and</span> <span class='pystring'>'b'</span></span>         <a name="apihelper.andor.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">'b'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pystring'>''</span> <span class='pykeyword'>and</span> <span class='pystring'>'b'</span></span>          <a name="apihelper.andor.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">''</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pystring'>'a'</span> <span class='pykeyword'>and</span> <span class='pystring'>'b'</span> <span class='pykeyword'>and</span> <span class='pystring'>'c'</span></span> <a name="apihelper.andor.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'c'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.lambda"></a><a name="lambda_functions.html">4.7.&nbsp;使用 <tt class="literal">lambda</tt> 函数
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="lambda_functions.html#d0e10549">4.7.1. 真实世界中的 lambda 函数</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 支持一种有趣的语法，它允许你快速定义单行的最小函数。这些叫做 <tt class="literal">lambda</tt> 的函数，是从 <span class="application">Lisp</span> 借用来的，可以用在任何需要函数的地方。
            </p>
         </div>
         <div class="example"><a name="d0e10455"></a><h3 class="title">例&nbsp;4.20.&nbsp;<tt class="literal">lambda</tt> 函数介绍
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>def</span><span class='pyclass'> f</span>(x):</span>
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>return</span> x*2</span>
<tt class="prompt">...     </tt><span class="userinput"></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f(3)</span>
<span class="computeroutput">6</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">g = <span class='pykeyword'>lambda</span> x: x*2</span>  <a name="apihelper.lambda.1.2"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">g(3)</span>
<span class="computeroutput">6</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>(lambda</span> x: x*2)(3)</span> <a name="apihelper.lambda.1.3"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">6</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.alltogether"></a><a name="all_together.html">4.8.&nbsp;全部放在一起
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>最后一行代码是唯一还没有解释过的，它完成全部的工作。但是现在工作已经简单了，因为所需要的每件事都已经按照需求建立好了。所有的多米诺骨牌已经就位，到了将它们推倒的时候了。</p>
         </div>
         <div class="informalexample">
            <p>下面是 <tt class="filename">apihelper.py</tt> 的关键
            </p><pre class="programlisting">
    <span class='pykeyword'>print</span> <span class='pystring'>"\n"</span>.join([<span class='pystring'>"%s %s"</span> %
                      (method.ljust(spacing),
                       processFunc(str(getattr(object, method).__doc__)))
                     <span class='pykeyword'>for</span> method <span class='pykeyword'>in</span> methodList])</pre></div>
         <p>注意这是一条命令，被分隔成了多行，但是并没有使用续行符 (<tt class="literal">\</tt>)。还记得我说过<a href="../native_data_types/declaring_variables.html#tip.implicitmultiline">一些表达式可以分割成多行</a>而不需要使用反斜线吗？列表解析就是这些表达式之一，因为整个表达式包括在方括号里。
         </p>
         <p>现在，让我们从后向前分析。</p><pre class="programlisting"><span class='pykeyword'>
for</span> method <span class='pykeyword'>in</span> methodList</pre><p>告诉我们这是一个<a href="../native_data_types/mapping_lists.html" title="3.6.&nbsp;映射 list">列表解析</a>。如你所知 <tt class="varname">methodList</tt> 是 <tt class="varname">object</tt> 中<a href="filtering_lists.html#apihelper.filter.care">所有你关心的方法</a>的一个列表。所以你正在使用 <tt class="varname">method</tt> 遍历列表。
         </p>
         <div class="example"><a name="d0e10827"></a><h3 class="title">例&nbsp;4.22.&nbsp;动态得到 <tt class="literal">doc string</tt> 
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> odbchelper</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">object = odbchelper</span>                   <a name="apihelper.alltogether.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">method = <span class='pystring'>'buildConnectionString'</span></span>      <a name="apihelper.alltogether.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">getattr(object, method)</span>               <a name="apihelper.alltogether.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;function buildConnectionString at 010D6D74&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> getattr(object, method).__doc__</span> <a name="apihelper.alltogether.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">Build a connection string from a dictionary of parameters.

    Returns string.</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="apihelper.summary"></a><a name="summary.html">4.9.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="filename">apihelper.py</tt> 程序和它的输出现在应该非常清晰了。
            </p>
         </div>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
def</span> info(object, spacing=10, collapse=1):
    <span class='pystring'>"""Print methods and doc strings.
    
    Takes module, class, list, dictionary, or string."""</span>
    methodList = [method <span class='pykeyword'>for</span> method <span class='pykeyword'>in</span> dir(object) <span class='pykeyword'>if</span> callable(getattr(object, method))]
    processFunc = collapse <span class='pykeyword'>and</span> (<span class='pykeyword'>lambda</span> s: <span class='pystring'>" "</span>.join(s.split())) <span class='pykeyword'>or</span> (<span class='pykeyword'>lambda</span> s: s)
    <span class='pykeyword'>print</span> <span class='pystring'>"\n"</span>.join([<span class='pystring'>"%s %s"</span> %
                      (method.ljust(spacing),
                       processFunc(str(getattr(object, method).__doc__)))
                     <span class='pykeyword'>for</span> method <span class='pykeyword'>in</span> methodList])

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:
    <span class='pykeyword'>print</span> info.__doc__</pre></div>
         <div class="informalexample">
            <p><tt class="filename">apihelper.py</tt> 的输出：
            </p><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> apihelper <span class='pykeyword'>import</span> info</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = []</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">info(li)</span>
<span class="computeroutput">append     L.append(object) -- append object to end
count      L.count(value) -&gt; integer -- return number of occurrences of value
extend     L.extend(list) -- extend list by appending list elements
index      L.index(value) -&gt; integer -- return index of first occurrence of value
insert     L.insert(index, object) -- insert object before index
pop        L.pop([index]) -&gt; item -- remove and return item at index (default last)
remove     L.remove(value) -- remove first occurrence of value
reverse    L.reverse() -- reverse *IN PLACE*
sort       L.sort([cmpfunc]) -- sort *IN PLACE*; if given, cmpfunc(x, y) -&gt; -1, 0, 1</span></pre></div>
         <div class="highlights">
            <p>在研究下一章前，确保你可以无困难的完成下面这些事情：</p>
            <div class="itemizedlist">
               <ul>
                  <li>用<a href="optional_arguments.html" title="4.2.&nbsp;使用可选参数和命名参数">可选和命名参数</a>定义和调用函数
                  </li>
                  <li>用 <a href="built_in_functions.html#apihelper.str.intro" title="例&nbsp;4.6.&nbsp;str 介绍"><tt class="function">str</tt></a> 强制转换任意值为字符串形式
                  </li>
                  <li>用 <a href="getattr.html" title="4.4.&nbsp;通过 getattr 获取对象引用"><tt class="function">getattr</tt></a> 动态得到函数和其它属性的引用
                  </li>
                  <li>扩展列表解析语法实现<a href="filtering_lists.html" title="4.5.&nbsp;过滤列表">列表过滤</a></li>
                  <li>识别 <a href="and_or.html" title="4.6.&nbsp;and 和 or 的特殊性质"><tt class="literal">and-or</tt> 技巧</a>并安全地使用它
                  </li>
                  <li>定义 <a href="lambda_functions.html" title="4.7.&nbsp;使用 lambda 函数"><tt class="literal">lambda</tt> 函数</a></li>
                  <li><a href="lambda_functions.html#apihelper.funcassign">将函数赋值给变量</a>然后通过引用变量调用函数。我强调的已经够多了：这种思考方式对于提高对 <span class="application">Python</span> 的理解力至关重要。在本书中你会随处可见这种技术的更复杂的应用。
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
