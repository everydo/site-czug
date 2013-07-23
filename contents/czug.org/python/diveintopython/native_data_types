<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/native_data_types/index.html">http://www.woodpecker.org.cn/diveintopython/native_data_types/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="datatypes"></a>第&nbsp;3&nbsp;章&nbsp;内置数据类型
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#odbchelper.dict">3.1. Dictionary 介绍</a></span><ul>
                     <li><span class="section"><a href="#d0e5309">3.1.1. Dictionary 的定义</a></span></li>
                     <li><span class="section"><a href="#d0e5404">3.1.2. Dictionary 的修改</a></span></li>
                     <li><span class="section"><a href="#d0e5585">3.1.3. 从 dictionary 中删除元素</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#lists.html">3.2. List 介绍</a></span><ul>
                     <li><span class="section"><a href="#lists.html#d0e5762">3.2.1. List 的定义</a></span></li>
                     <li><span class="section"><a href="#lists.html#d0e6029">3.2.2. 向 list 中增加元素</a></span></li>
                     <li><span class="section"><a href="#lists.html#d0e6257">3.2.3. 在 list 中搜索</a></span></li>
                     <li><span class="section"><a href="#lists.html#d0e6419">3.2.4. 从 list 中删除元素</a></span></li>
                     <li><span class="section"><a href="#lists.html#d0e6537">3.2.5. 使用 list 的运算符</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#tuples.html">3.3. Tuple 介绍</a></span></li>
               <li><span class="section"><a href="#declaring_variables.html">3.4. 变量声明</a></span><ul>
                     <li><span class="section"><a href="#declaring_variables.html#d0e7017">3.4.1. 变量引用</a></span></li>
                     <li><span class="section"><a href="#declaring_variables.html#odbchelper.multiassign">3.4.2. 一次赋多值</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#formatting_strings.html">3.5. 格式化字符串</a></span></li>
               <li><span class="section"><a href="#mapping_lists.html">3.6. 映射 list</a></span></li>
               <li><span class="section"><a href="#joining_lists.html">3.7. 连接 list 与分割字符串</a></span><ul>
                     <li><span class="section"><a href="#joining_lists.html#d0e8123">3.7.1. 字符串方法的历史注解</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#summary.html">3.8. 小结</a></span></li>
            </ul>
         </div>
         <p>让我们用点儿时间来回顾一下您的第一个 <span class="application">Python</span> 程序。但首先，先说些其他的内容，因为您需要了解一下 dictionary (字典)、tuple (元组) 和 list (列表)(哦，我的老天！)。如果您是一个 <span class="application">Perl</span> hacker，当然可以撇开 dictionary 和 list，但是仍然需要注意 tuple。
         </p>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="odbchelper.dict"></a>3.1.&nbsp;Dictionary 介绍
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="toc">
               <ul>
                  <li><span class="section"><a href="#d0e5309">3.1.1. Dictionary 的定义</a></span></li>
                  <li><span class="section"><a href="#d0e5404">3.1.2. Dictionary 的修改</a></span></li>
                  <li><span class="section"><a href="#d0e5585">3.1.3. 从 dictionary 中删除元素</a></span></li>
               </ul>
            </div>
            <div class="abstract">
               <p>Dictionary 是 <span class="application">Python</span> 的内置数据类型之一，它定义了键和值之间一对一的关系。
               </p>
            </div><a name="compare.dict.perl"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.list"></a><a name="lists.html">3.2.&nbsp;List 介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="lists.html#d0e5762">3.2.1. List 的定义</a></span></li>
               <li><span class="section"><a href="lists.html#d0e6029">3.2.2. 向 list 中增加元素</a></span></li>
               <li><span class="section"><a href="lists.html#d0e6257">3.2.3. 在 list 中搜索</a></span></li>
               <li><span class="section"><a href="lists.html#d0e6419">3.2.4. 从 list 中删除元素</a></span></li>
               <li><span class="section"><a href="lists.html#d0e6537">3.2.5. 使用 list 的运算符</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>List 是 <span class="application">Python</span> 中使用最频繁的数据类型。如果您对 list 仅有的经验就是在 <span class="application">Visual Basic</span> 中的数组或 <span class="application">Powerbuilder</span> 中的数据存储，那么就打起精神学习 <span class="application">Python</span> 的 list 吧。
            </p>
         </div><a name="compare.list.perl"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.tuple"></a><a name="tuples.html">3.3.&nbsp;Tuple 介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>Tuple 是不可变的 list。一旦创建了一个 tuple，就不能以任何方式改变它。</p>
         </div>
         <div class="example"><a name="d0e6712"></a><h3 class="title">例&nbsp;3.15.&nbsp;定义 tuple</h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t = (<span class='pystring'>"a"</span>, <span class='pystring'>"b"</span>, <span class='pystring'>"mpilgrim"</span>, <span class='pystring'>"z"</span>, <span class='pystring'>"example"</span>)</span> <a name="odbchelper.tuple.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t</span>
<span class="computeroutput">('a', 'b', 'mpilgrim', 'z', 'example')</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t[0]</span>                                       <a name="odbchelper.tuple.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">'a'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t[-1]</span>                                      <a name="odbchelper.tuple.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'example'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t[1:3]</span>                                     <a name="odbchelper.tuple.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">('b', 'mpilgrim')</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.vardef"></a><a name="declaring_variables.html">3.4.&nbsp;变量声明
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="declaring_variables.html#d0e7017">3.4.1. 变量引用</a></span></li>
               <li><span class="section"><a href="declaring_variables.html#odbchelper.multiassign">3.4.2. 一次赋多值</a></span></li>
            </ul>
         </div>
         <p>现在您已经了解了有关 dictionary、tuple、和 list 的相关知识 (哦，我的老天！)，让我们回到 <a href="../getting_to_know_python/index.html">第 2 章</a> 的例子程序 <tt class="filename">odbchelper.py</tt>。
         </p>
         <div class="abstract">
            <p><span class="application">Python</span> 与大多数其它语言一样有局部变量和全局变量之分，但是它没有明显的变量声明。变量通过首次赋值产生，当超出作用范围时自动消亡。
            </p>
         </div>
         <div class="example"><a name="myparamsdef"></a><h3 class="title">例&nbsp;3.17.&nbsp;定义 <tt class="varname">myParams</tt> 变量
            </h3><pre class="programlisting"><span class='pykeyword'>
if</span> __name__ == <span class='pystring'>"__main__"</span>:
    myParams = {<span class='pystring'>"server"</span>:<span class='pystring'>"mpilgrim"</span>, \
                <span class='pystring'>"database"</span>:<span class='pystring'>"master"</span>, \
                <span class='pystring'>"uid"</span>:<span class='pystring'>"sa"</span>, \
                <span class='pystring'>"pwd"</span>:<span class='pystring'>"secret"</span> \
                }</pre></div>
         <p>首先注意缩进。<tt class="literal">if</tt> 语句是代码块，需要像函数一样缩进。
         </p>
         <p>其次，变量的赋值是一条被分成了多行的命令，用反斜线 (“<span class="quote"><tt class="literal">\</tt></span>”) 作为续行符。
         </p><a name="tip.multiline"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.stringformatting"></a><a name="formatting_strings.html">3.5.&nbsp;格式化字符串
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 支持格式化字符串的输出 。尽管这样可能会用到非常复杂的表达式，但最基本的用法是将一个值插入到一个有字符串格式符 <tt class="literal">%s</tt> 的字符串中。
            </p>
         </div><a name="compare.stringformatting.c"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.map"></a><a name="mapping_lists.html">3.6.&nbsp;映射 list
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 的强大特性之一是其对 list 的解析，它提供一种紧凑的方法，可以通过对 list 中的每个元素应用一个函数，从而将一个 list 映射为另一个 list。
            </p>
         </div>
         <div class="example"><a name="d0e7553"></a><h3 class="title">例&nbsp;3.24.&nbsp;List 解析介绍</h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [1, 9, 8, 4]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[elem*2 <span class='pykeyword'>for</span> elem <span class='pykeyword'>in</span> li]</span>      <a name="odbchelper.map.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">[2, 18, 16, 8]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li</span>                           <a name="odbchelper.map.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">[1, 9, 8, 4]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [elem*2 <span class='pykeyword'>for</span> elem <span class='pykeyword'>in</span> li]</span> <a name="odbchelper.map.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li</span>
<span class="computeroutput">[2, 18, 16, 8]</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.join"></a><a name="joining_lists.html">3.7.&nbsp;连接 list 与分割字符串
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="joining_lists.html#d0e8123">3.7.1. 字符串方法的历史注解</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>您有了一个形如 <tt class="literal"><i class="replaceable">key</i>=<i class="replaceable">value</i></tt> 的 key-value 对 list，并且想将它们合成为单个字符串。为了将任意包含字符串的 list 连接成单个字符串，可以使用字符串对象的 <tt class="function">join</tt> 方法。
            </p>
         </div>
         <div class="informalexample">
            <p>下面是一个在 <tt class="function">buildConnectionString</tt> 函数中连接 list 的例子：
            </p><pre class="programlisting">
    <span class='pykeyword'>return</span> <span class='pystring'>";"</span>.join([<span class='pystring'>"%s=%s"</span> % (k, v) <span class='pykeyword'>for</span> k, v <span class='pykeyword'>in</span> params.items()])</pre></div>
         <p>在我们继续之前有一个有趣的地方。我一直在重复函数是对象，字符串是对象，每个东西都是对象的概念。您也许认为我的意思是说字符串<span class="emphasis"><em>值</em></span> 是对象。但是不对，仔细地看一下这个例子，您将会看到字符串 <tt class="literal">";"</tt> 本身就是一个对象，您在调用它的 <tt class="function">join</tt> 方法。
         </p>
         <p>总之，这里的 <tt class="function">join</tt> 方法将 list 中的元素连接成单个字符串，每个元素用一个分号隔开。分隔符不必是一个分号；它甚至不必是单个字符。它可以是任何字符串。
         </p><a name="tip.join"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="odbchelper.summary"></a><a name="summary.html">3.8.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在 <tt class="filename">odbchelper.py</tt> 程序和它的输出结果都应该非常清楚了。
            </p>
         </div>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
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
         <div class="informalexample">
            <p>下面是 <tt class="filename">odbchelper.py</tt> 的输出结果：
            </p><pre class="screen"><span class="computeroutput">server=mpilgrim;uid=sa;database=master;pwd=secret</span></pre></div>
         <div class="highlights">
            <p>在深入下一章学习之前，确保您可以无阻碍地完成下面的事情：</p>
            <div class="itemizedlist">
               <ul>
                  <li>使用 <span class="application">Python</span> <span class="acronym">IDE</span> 来交互式地测试表达式
                  </li>
                  <li>编写 <span class="application">Python</span> 程序并且<a href="../getting_to_know_python/testing_modules.html" title="2.6.&nbsp;测试模块">从 <span class="acronym">IDE</span> 运行</a>，或者从命令行运行
                  </li>
                  <li><a href="../getting_to_know_python/everything_is_an_object.html#odbchelper.import" title="例&nbsp;2.3.&nbsp;访问 buildConnectionString 函数的 doc string">导入模块</a>及调用它们的函数
                  </li>
                  <li><a href="../getting_to_know_python/declaring_functions.html" title="2.2.&nbsp;函数声明">声明函数</a>以及 <a href="../getting_to_know_python/documenting_functions.html" title="2.3.&nbsp;文档化函数"><tt class="literal">doc string</tt></a>、<a href="declaring_variables.html" title="3.4.&nbsp;变量声明">局部变量</a>和<a href="../getting_to_know_python/indenting_code.html" title="2.5.&nbsp;代码缩进">适当的缩进</a>的使用
                  </li>
                  <li>定义 <a href="index.html#odbchelper.dict" title="3.1.&nbsp;Dictionary 介绍">dictionary</a>、<a href="tuples.html" title="3.3.&nbsp;Tuple 介绍">tuple</a> 和 <a href="lists.html" title="3.2.&nbsp;List 介绍">list</a></li>
                  <li><a href="../getting_to_know_python/everything_is_an_object.html" title="2.4.&nbsp;万物皆对象">任意一个对象</a>的访问方法，包括：字符串、list、dictionary、函数和模块
                  </li>
                  <li>通过<a href="formatting_strings.html" title="3.5.&nbsp;格式化字符串">字符串格式化</a>连接值
                  </li>
                  <li>使用 list 解析<a href="mapping_lists.html" title="3.6.&nbsp;映射 list">映射 list</a> 为其他的 list
                  </li>
                  <li><a href="joining_lists.html" title="3.7.&nbsp;连接 list 与分割字符串">把字符串分割为 list</a> 和把 list 连接为字符串
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
