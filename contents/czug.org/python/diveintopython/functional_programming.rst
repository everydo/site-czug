<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/functional_programming/index.html">http://www.woodpecker.org.cn/diveintopython/functional_programming/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression"></a>第&nbsp;16&nbsp;章&nbsp;函数编程
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#regression.divein">16.1. 概览</a></span></li>
               <li><span class="section"><a href="#finding_the_path.html">16.2. 找到路径</a></span></li>
               <li><span class="section"><a href="#filtering_lists.html">16.3. 重识列表过滤</a></span></li>
               <li><span class="section"><a href="#mapping_lists.html">16.4. 重识列表映射</a></span></li>
               <li><span class="section"><a href="#data_centric.html">16.5. 数据中心思想编程</a></span></li>
               <li><span class="section"><a href="#dynamic_import.html">16.6. 动态导入模块</a></span></li>
               <li><span class="section"><a href="#all_together.html">16.7. 全部放在一起</a></span></li>
               <li><span class="section"><a href="#summary.html">16.8. 小结</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="regression.divein"></a>16.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>在 <a href="../unit_testing/index.html" title="第&nbsp;13&nbsp;章&nbsp;单元测试">第&nbsp;13&nbsp;章 <i>单元测试</i></a> 中，你学会了单元测试的哲学。在 <a href="../unit_testing/stage_1.html" title="第&nbsp;14&nbsp;章&nbsp;测试优先编程">第&nbsp;14&nbsp;章 <i>测试优先编程</i></a>  中你步入了 <span class="application">Python</span> 基本的单元测试操作，在 <a href="../refactoring/index.html" title="第&nbsp;15&nbsp;章&nbsp;重构">第&nbsp;15&nbsp;章 <i>重构</i></a> 部分，你看到单元测试如何令大规模重构变得容易。本章将在这些程序样例的基础上，集中关注于超越单元测试本身的更高级的 <span class="application">Python</span> 特有技术。
               </p>
            </div>
            <p>下面是一个作为简单回归测试 (regression test) 框架运行的完整 <span class="application">Python</span> 程序。它将你前面编写的单独单元测试模块组织在一起成为一个测试套件并一次性运行。实际上这是本书的构建代码的一部分；我为几个样例程序都编写了单元测试 (不是只有 <a href="../unit_testing/index.html" title="第&nbsp;13&nbsp;章&nbsp;单元测试">第&nbsp;13&nbsp;章 <i>单元测试</i></a> 中的 <tt class="filename">roman.py</tt> 模块)，我的自动构建代码的第一个工作便是确保我所有的例子可以正常工作。如果回归测试程序失败，构建过程当即终止。我可不想因为发布了不能工作的样例程序而让你在下载他们后坐在显示器前抓耳挠腮地为程序不能运转而烦恼。
            </p>
            <div class="example"><a name="d0e35447"></a><h3 class="title">例&nbsp;16.1.&nbsp;<tt class="filename">regression.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting">
<span class='pystring'>"""Regression testing framework

This module will search for scripts in the same directory named
XYZtest.py.  Each such script should be a test suite that tests a
module through PyUnit.  (As of Python 2.1, PyUnit is included in
the standard library as "unittest".)  This script will aggregate all
found test suites into one big test suite and run them all at once.
"""</span>

<span class='pykeyword'>import</span> sys, os, re, unittest

<span class='pykeyword'>def</span><span class='pyclass'> regressionTest</span>():
    path = os.path.abspath(os.path.dirname(sys.argv[0]))   
    files = os.listdir(path)                               
    test = re.compile(<span class='pystring'>"test\.py$"</span>, re.IGNORECASE)          
    files = filter(test.search, files)                     
    filenameToModuleName = <span class='pykeyword'>lambda</span> f: os.path.splitext(f)[0]
    moduleNames = map(filenameToModuleName, files)         
    modules = map(__import__, moduleNames)                 
    load = unittest.defaultTestLoader.loadTestsFromModule  
    <span class='pykeyword'>return</span> unittest.TestSuite(map(load, modules))          

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:                   
    unittest.main(defaultTest=<span class='pystring'>"regressionTest"</span>)
</pre></div>
            <p>把这段代码放在本书其他样例代码相同的目录下运行之，<tt class="filename"><i class="replaceable"><tt>module</tt></i>test.py</tt> 中的所有单元测试将被找到并一起被运行。
            </p>
            <div class="example"><a name="d0e35465"></a><h3 class="title">例&nbsp;16.2.&nbsp;<tt class="filename">regression.py</tt> 的样例输出
               </h3><pre class="screen">
<tt class="prompt">[you@localhost py]$ </tt><span class="userinput">python regression.py -v</span>
<span class="computeroutput">help should fail with no object ... ok                             </span><a name="regression.divein.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12"><span class="computeroutput">
help should return known result for apihelper ... ok
help should honor collapse argument ... ok
help should honor spacing argument ... ok
buildConnectionString should fail with list input ... ok           </span><a name="regression.divein.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12"><span class="computeroutput">
buildConnectionString should fail with string input ... ok
buildConnectionString should fail with tuple input ... ok
buildConnectionString handles empty dictionary ... ok
buildConnectionString returns known result with known input ... ok
fromRoman should only accept uppercase input ... ok                </span><a name="regression.divein.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12"><span class="computeroutput">
toRoman should always return uppercase ... ok
fromRoman should fail with blank string ... ok
fromRoman should fail with malformed antecedents ... ok
fromRoman should fail with repeated pairs of numerals ... ok
fromRoman should fail with too many repeated numerals ... ok
fromRoman should give known result with known input ... ok
toRoman should give known result with known input ... ok
fromRoman(toRoman(n))==n for all n ... ok
toRoman should fail with non-integer input ... ok
toRoman should fail with negative input ... ok
toRoman should fail with large input ... ok
toRoman should fail with 0 input ... ok
kgp a ref test ... ok
kgp b ref test ... ok
kgp c ref test ... ok
kgp d ref test ... ok
kgp e ref test ... ok
kgp f ref test ... ok
kgp g ref test ... ok

----------------------------------------------------------------------
Ran 29 tests in 2.799s

OK</span></pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.path"></a><a name="finding_the_path.html">16.2.&nbsp;找到路径
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>从命令行运行 <span class="application">Python</span> 代码时，知道所运行代码在磁盘上的存储位置有时候是有必要的。
            </p>
         </div>
         <p>这是一个不那么容易想起，但一想起就很容易解决的小麻烦。答案是 <tt class="literal">sys.argv</tt>。正如你在 <a href="../xml_processing/index.html" title="第&nbsp;9&nbsp;章&nbsp;XML 处理">第&nbsp;9&nbsp;章 <i>XML 处理</i></a> 中看到的，它包含了很多命令行参数。它也同样记录了运行脚本的名字，和你调用它时使用的命令一摸一样。这些信息足以令我们确定文件的位置。
         </p>
         <div class="example"><a name="d0e35531"></a><h3 class="title">例&nbsp;16.3.&nbsp;<tt class="filename">fullpath.py</tt></h3>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting"><span class='pykeyword'>
import</span> sys, os

<span class='pykeyword'>print</span> <span class='pystring'>'sys.argv[0] ='</span>, sys.argv[0]             <a name="regression.path.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
pathname = os.path.dirname(sys.argv[0])        <a name="regression.path.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12"><span class='pykeyword'>
print</span> <span class='pystring'>'path ='</span>, pathname
<span class='pykeyword'>print</span> <span class='pystring'>'full path ='</span>, os.path.abspath(pathname) <a name="regression.path.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.filter"></a><a name="filtering_lists.html">16.3.&nbsp;重识列表过滤
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你已经熟识了<a href="../power_of_introspection/filtering_lists.html" title="4.5.&nbsp;过滤列表">应用列表解析来过滤列表</a>。这里介绍的是达到相同效果的另一种令很多人感觉清晰的实现方法。
            </p>
         </div>
         <p><span class="application">Python</span> 有一个内建 <tt class="function">filter</tt> 函数，它接受两个参数：一个函数和一个列表，返回一个列表。<sup>[<a name="d0e35870" href="#ftn.d0e35870">12</a>]</sup>  作为第一个参数传递给 <tt class="function">filter</tt> 的函数本身应接受一个参数，<tt class="function">filter</tt> 返回的列表将会包含被传入列表参数传递给 <tt class="function">filter</tt> 所有可以令函数返回真 (true) 的元素。
         </p>
         <p>都明白了吗？并没有听起来那么难。</p>
         <div class="example"><a name="d0e35894"></a><h3 class="title">例&nbsp;16.7.&nbsp;<tt class="function">filter</tt> 介绍
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>def</span><span class='pyclass'> odd</span>(n):</span>                 <a name="regression.filter.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>return</span> n % 2</span>
<tt class="prompt">...     </tt>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [1, 2, 3, 5, 9, 10, 256, -3]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">filter(odd, li)</span>             <a name="regression.filter.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">[1, 3, 5, 9, -3]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[e <span class='pykeyword'>for</span> e <span class='pykeyword'>in</span> li <span class='pykeyword'>if</span> odd(e)]</span>   <a name="regression.filter.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">filteredList = []</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> n <span class='pykeyword'>in</span> li:</span>                <a name="regression.filter.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>if</span> odd(n):</span>
<tt class="prompt">...     </tt><span class="userinput">    filteredList.append(n)</span>
<tt class="prompt">...     </tt>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">filteredList</span>
<span class="computeroutput">[1, 3, 5, 9, -3]</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.map"></a><a name="mapping_lists.html">16.4.&nbsp;重识列表映射
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你对使用<a href="../native_data_types/mapping_lists.html" title="3.6.&nbsp;映射 list">列表解析</a>映射列表的做法已经熟知。另一种方法可以完成同样的工作：使用内建 <tt class="function">map</tt> 函数。它的工作机理和 <a href="filtering_lists.html" title="16.3.&nbsp;重识列表过滤"><tt class="function">filter</tt></a> 函数类似。
            </p>
         </div>
         <div class="example"><a name="d0e36163"></a><h3 class="title">例&nbsp;16.10.&nbsp;<tt class="function">map</tt> 介绍
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>def</span><span class='pyclass'> double</span>(n):</span>
<tt class="prompt">...     </tt>return n*2
<tt class="prompt">...     </tt>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [1, 2, 3, 5, 9, 10, 256, -3]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">map(double, li)</span>                       <a name="regression.map.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">[2, 4, 6, 10, 18, 20, 512, -6]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[double(n) <span class='pykeyword'>for</span> n <span class='pykeyword'>in</span> li]</span>               <a name="regression.map.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">[2, 4, 6, 10, 18, 20, 512, -6]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">newlist = []</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> n <span class='pykeyword'>in</span> li:</span>                          <a name="regression.map.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">...     </tt><span class="userinput">newlist.append(double(n))</span>
<tt class="prompt">...     </tt>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">newlist</span>
<span class="computeroutput">[2, 4, 6, 10, 18, 20, 512, -6]</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.datacentric"></a><a name="data_centric.html">16.5.&nbsp;数据中心思想编程
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在的你，可能正抓耳挠腮地狠想，为什么这样比使用 <tt class="literal">for</tt> 循环和直接调用函数好。这是一个非常好的问题。通常这是一个程序观问题。使用 <tt class="function">map</tt> 和 <tt class="function">filter</tt> 强迫你围绕数据进行思考。
            </p>
         </div>
         <p>就此而言，你从没有数据开始，你所做的第一件事是<a href="finding_the_path.html" title="16.2.&nbsp;找到路径">获得当前脚本的目录路径</a>，并获得该目录中的文件列表。这就是关键的一步，使你有了待处理的真实数据：文件名列表。
         </p>
         <p>当然，你知道你并不关心所有的文件，而只关心测试套件。你有<span class="emphasis"><em>太多数据</em></span>，因此你需要过滤(<tt class="function">filter</tt>)数据。你如何知道哪些数据应该保留？你需要一个测试来确定，因此你定义一个测试并把它传给 <tt class="function">filter</tt> 函数。这里你应用了一个正则表达式来确定，但无论如何构建测试，原则是一样的。
         </p>
         <p>现在你有了每个测试套件的文件名 (且局限于测试套件，因为所有其他内容都被过滤掉了)，但是你还需要以模块名来替代之。你有正确数量的数据，只是<span class="emphasis"><em>格式不正确</em></span>。因此，你定义了一个函数来将文件名转换为模块名，并使用这个函数映射整个列表。从一个文件名，你可以获得一个模块名，从一个文件名列表，你可以获得一个模块名列表。
         </p>
         <p>如果不应用 <tt class="function">filter</tt>，你也可以使用 <tt class="literal">for</tt> 循环结合一个 <tt class="literal">if</tt> 语句的方法。<tt class="function">map</tt> 的使用则可以由一个 <tt class="literal">for</tt> 循环和一个函数调用来取代。但是 <tt class="literal">for</tt> 循环看起来像是个繁重的工作。至少，简单讲是在浪费时间，糟糕的话还会隐埋 Bug。例如，你需要弄清楚如何测试这样一个条件：“<span class="quote">这个文件是测试套件吗？</span>”这是应用特定的逻辑，没有哪个语言能自动为我们写出其代码。但是一旦你搞清楚了，你还需要费尽周折地定义一个新的空列表，写一个  <tt class="literal">for</tt> 循环以及一个 <tt class="literal">if</tt> 语句并手工地调用 <tt class="function">append</tt> 将符合条件的元素一个个添加到新列表中，然后一路上注意区分哪个变量里放着过滤后的数据，哪个变量里放着未过滤的老数据。为什么不直接定义测试条件，然后由 <span class="application">Python</span> 为你完成接下来的工作呢？
         </p>
         <p>当然啦，你可以尝试眩一点的做法，去删除列表中的元素而不新建一个列表。但是你以前吃过这样的亏。试图在循环中改变数据结构是很容易出问题的。<span class="application">Python</span> 是一个这样工作的语言吗？用多长时间你才能搞清这一点？你能确定记得你第二次这样尝试的安全性？程序员在和这类纯技术课题较劲的过程中，花费了太多的时间，犯了太多的错误，却并没有什么意义。这样并不可能令你的程序有所进步，只不过是费力不讨好。
         </p>
         <p>我在第一次学习 <span class="application">Python</span> 时是抵触列表解析的，而且我抗拒 <tt class="function">filter</tt> 和 <tt class="function">map</tt> 的时间更长。我坚持着我更艰难的生活，固守着类似于 <tt class="literal">for</tt> 循环和 <tt class="literal">if</tt> 语句以及一步步地以代码为中心的编程方式。而且我的 <span class="application">Python</span> 程序看起来很像是 <span class="application">Visual Basic</span> 程序，细化每一个函数中的每一个操作步骤。它们却有着同样的小错误和隐蔽的 Bug。这一切其实都没有意义。
         </p>
         <p>让这一切都远去吧。费力不讨好的编程不重要，数据重要。并且数据并不麻烦，它们不过就是数据。如果多了，就过滤。如果不是我们要的，就映射。聚焦在数据上，摒弃费力的劳作。</p>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.import"></a><a name="dynamic_import.html">16.6.&nbsp;动态导入模块
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>好了，大道理谈够了。让我们谈谈动态导入模块吧。</p>
         </div>
         <p>首先，让我们看一看正常的模块导入。<tt class="literal">import <i class="replaceable">module</i></tt> 语法查看搜索路径，根据给定的名字寻找模块并导入它们。你甚至可以这样做：以逗号分割同时导入多个模块，本章代码前几行就是这样做的。
         </p>
         <div class="example"><a name="d0e36476"></a><h3 class="title">例&nbsp;16.13.&nbsp;同时导入多个模块</h3><pre class="programlisting"><span class='pykeyword'>
import</span> sys, os, re, unittest <a name="regression.import.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.alltogether"></a><a name="all_together.html">16.7.&nbsp;全部放在一起
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你已经学习了足够的知识，现在来分析本章样例代码的前七行：读取一个目录并从中导入选定的模块。</p>
         </div>
         <div class="example"><a name="d0e36698"></a><h3 class="title">例&nbsp;16.16.&nbsp;<tt class="function">regressionTest</tt> 函数
            </h3><pre class="programlisting"><span class='pykeyword'>
def</span> regressionTest():
    path = os.path.abspath(os.path.dirname(sys.argv[0]))   
    files = os.listdir(path)                               
    test = re.compile(<span class='pystring'>"test\.py$"</span>, re.IGNORECASE)          
    files = filter(test.search, files)                     
    filenameToModuleName = <span class='pykeyword'>lambda</span> f: os.path.splitext(f)[0]
    moduleNames = map(filenameToModuleName, files)         
    modules = map(__import__, moduleNames)                 
load = unittest.defaultTestLoader.loadTestsFromModule  
<span class='pykeyword'>return</span> unittest.TestSuite(map(load, modules))          
</pre></div>
         <p>让我们一行行交互地看。假定当前目录是 <tt class="filename">c:\diveintopython\py</tt>，其中有包含本章脚本在内的本书众多样例。正如在 <a href="finding_the_path.html" title="16.2.&nbsp;找到路径">第&nbsp;16.2&nbsp;节 “找到路径”</a> 中所见，脚本目录将存于 <tt class="varname">path</tt> 变量，因此让我们从这里开始以实打实的代码起步。
         </p>
         <div class="example"><a name="d0e36715"></a><h3 class="title">例&nbsp;16.17.&nbsp;步骤 1：获得所有文件</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> sys, os, re, unittest</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">path = r<span class='pystring'>'c:\diveintopython\py'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">files = os.listdir(path)                               </span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">files</span> <a name="regression.alltogether.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">['BaseHTMLProcessor.py', 'LICENSE.txt', 'apihelper.py', 'apihelpertest.py',
'argecho.py', 'autosize.py', 'builddialectexamples.py', 'dialect.py',
'fileinfo.py', 'fullpath.py', 'kgptest.py', 'makerealworddoc.py',
'odbchelper.py', 'odbchelpertest.py', 'parsephone.py', 'piglatin.py',
'plural.py', 'pluraltest.py', 'pyfontify.py', 'regression.py', 'roman.py', 'romantest.py',
'uncurly.py', 'unicode2koi8r.py', 'urllister.py', 'kgp', 'plural', 'roman',
'colorize.py']</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="regression.summary"></a><a name="summary.html">16.8.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="filename">regression.py</tt> 程序及其输出到现在应该很清楚了。
            </p>
         </div>
         <p>你现在应该能够很自如地做到如下事情：</p>
         <div class="itemizedlist">
            <ul>
               <li>从命令行操作<a href="finding_the_path.html" title="16.2.&nbsp;找到路径">路径信息</a>。
               </li>
               <li>不使用列表解析，<a href="filtering_lists.html" title="16.3.&nbsp;重识列表过滤">使用 <tt class="function">filter</tt></a> 过滤列表。
               </li>
               <li>不使用列表解析，<a href="mapping_lists.html" title="16.4.&nbsp;重识列表映射">使用 <tt class="function">map</tt></a> 映射列表。
               </li>
               <li>动态<a href="dynamic_import.html" title="16.6.&nbsp;动态导入模块">导入模块</a>。
               </li>
            </ul>
         </div>
      </div>
      
