---
created: 
creator: Benky
description: ''
title: 10. 脚本和流
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/scripts_and_streams/index.html">http://www.woodpecker.org.cn/diveintopython/scripts_and_streams/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="streams"></a>第&nbsp;10&nbsp;章&nbsp;脚本和流
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#kgp.openanything">10.1. 抽象输入源</a></span></li>
               <li><span class="section"><a href="#stdin_stdout_stderr.html">10.2. 标准输入、输出和错误</a></span></li>
               <li><span class="section"><a href="#caching.html">10.3. 查询缓冲节点</a></span></li>
               <li><span class="section"><a href="#child_nodes.html">10.4. 查找节点的直接子节点</a></span></li>
               <li><span class="section"><a href="#handlers_by_node_type.html">10.5. 根据节点类型创建不同的处理器</a></span></li>
               <li><span class="section"><a href="#command_line_arguments.html">10.6. 处理命令行参数</a></span></li>
               <li><span class="section"><a href="#all_together.html">10.7. 全部放在一起</a></span></li>
               <li><span class="section"><a href="#summary.html">10.8. 小结</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="kgp.openanything"></a>10.1.&nbsp;抽象输入源
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p><span class="application">Python</span> 的最强大力量之一是它的动态绑定，而动态绑定最强大的用法之一是<span class="emphasis"><em>类文件(file-like)对象</em></span>。
               </p>
            </div>
            <p>许多需要输入源的函数可以只接收一个文件名，并以读方式打开文件，读取文件，处理完成后关闭它。其实它们不是这样的，而是接收一个<span class="emphasis"><em>类文件对象</em></span>。
            </p>
            <p>在最简单的例子中，<span class="emphasis"><em>类文件对象</em></span> 是任意一个带有 <tt class="function">read</tt> 方法的对象，这个方法带有一个可选的 <tt class="varname">size</tt> 参数，并返回一个字符串。调用时如果没有 <tt class="varname">size</tt> 参数，它从输入源中读取所有东西并将所有数据作为单个字符串返回；调用时如果指定了 <tt class="varname">size</tt> 参数，它将从输入源中读取 <tt class="varname">size</tt> 大小的数据并返回这些数据；再次调用的时候，它从余下的地方开始并返回下一块数据。
            </p>
            <p>这就是<a href="../file_handling/file_objects.html" title="6.2.&nbsp;与文件对象共事">从真实文件读取数据</a>的工作方式；区别在于你不用把自己局限于真实的文件。输入源可以是任何东西：磁盘上的文件，甚至是一个硬编码的字符串。只要你将一个类文件对象传递给函数，函数只是调用对象的 <tt class="function">read</tt> 方法，就可以处理任何类型的输入源，而不需要为处理每种类型分别编码。
               
            </p>
            <p>你可能会纳闷，这和 <span class="acronym">XML</span> 处理有什么关系。其实 <tt class="function">minidom.parse</tt> 就是一个可以接收类文件对象的函数。
            </p>
            <div class="example"><a name="d0e25300"></a><h3 class="title">例&nbsp;10.1.&nbsp;从文件中解析 <span class="acronym">XML</span></h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> xml.dom <span class='pykeyword'>import</span> minidom</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">fsock = open(<span class='pystring'>'binary.xml'</span>)</span>    <a name="kgp.openanything.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc = minidom.parse(fsock)</span> <a name="kgp.openanything.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">fsock.close()</span>                 <a name="kgp.openanything.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> xmldoc.toxml()</span>          <a name="kgp.openanything.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">&lt;?xml version="1.0" ?&gt;
&lt;grammar&gt;
&lt;ref id="bit"&gt;
  &lt;p&gt;0&lt;/p&gt;
  &lt;p&gt;1&lt;/p&gt;
&lt;/ref&gt;
&lt;ref id="byte"&gt;
  &lt;p&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;\
&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;/p&gt;
&lt;/ref&gt;
&lt;/grammar&gt;</span></pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.stdio"></a><a name="stdin_stdout_stderr.html">10.2.&nbsp;标准输入、输出和错误
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="acronym">UNIX</span> 用户已经对标准输入、标准输出和标准错误的概念非常熟悉了。这一节是为其他不熟悉的人准备的。
            </p>
         </div>
         <p>标准输入和标准错误 (通常缩写为 <tt class="literal">stdout</tt> 和 <tt class="literal">stderr</tt>) 是内建在每一个 <span class="acronym">UNIX</span> 系统中的管道。当你 <tt class="function">print</tt> 某些东西时，结果前往 <tt class="literal">stdout</tt> 管道；当你的程序崩溃并打印出调试信息 (例如 <span class="application">Python</span> 中的 traceback (错误跟踪)) 的时候，信息前往 <tt class="literal">stderr</tt> 管道。通常这两个管道只与你正在工作的终端窗口相联，所以当一个程序打印时，你可以看到输出，而当一个程序崩溃时，你可以看到调试信息。(如果你正在一个基于窗口的 <span class="application">Python</span> <span class="acronym">IDE</span> 上工作，<tt class="literal">stdout</tt> 和 <tt class="literal">stderr</tt> 缺省为你的“<span class="quote">交互窗口</span>”。)
         </p>
         <div class="example"><a name="d0e25966"></a><h3 class="title">例&nbsp;10.8.&nbsp;<tt class="literal">stdout</tt> 和 <tt class="literal">stderr</tt> 介绍
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> i <span class='pykeyword'>in</span> range(3):</span>
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>print</span> <span class='pystring'>'Dive in'</span></span>             <a name="kgp.stdio.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">Dive in
Dive in
Dive in</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> sys</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> i <span class='pykeyword'>in</span> range(3):</span>
<tt class="prompt">...     </tt><span class="userinput">sys.stdout.write(<span class='pystring'>'Dive in'</span>)</span> <a name="kgp.stdio.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">Dive inDive inDive in</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> i <span class='pykeyword'>in</span> range(3):</span>
<tt class="prompt">...     </tt><span class="userinput">sys.stderr.write(<span class='pystring'>'Dive in'</span>)</span> <a name="kgp.stdio.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">Dive inDive inDive in</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.cache"></a><a name="caching.html">10.3.&nbsp;查询缓冲节点
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="filename">kgp.py</tt> 使用了多种技巧，在你进行 <span class="acronym">XML</span> 处理时，它们或许能派上用场。第一个就是，利用输入文档的结构稳定特征来构建节点缓冲。
            </p>
         </div>
         <p>一个语法文件定义了一系列的 <tt class="sgmltag-element">ref</tt> 元素。每个 <tt class="sgmltag-element">ref</tt> 包含了一个或多个 <tt class="sgmltag-element">p</tt> 元素，<tt class="sgmltag-element">p</tt> 元素则可以包含很多不同的东西，包括 <tt class="sgmltag-element">xref</tt>。对于每个 <tt class="sgmltag-element">xref</tt>，你都能找到相对应的 <tt class="sgmltag-element">ref</tt> 元素 (它们具有相同的 <tt class="sgmltag-element">id</tt> 属性)，然后选择 <tt class="sgmltag-element">ref</tt> 元素的子元素之一进行解析。(在下一部分中你将看到是如何进行这种随机选择的。)
         </p>
         <p>语法的构建方式如下：先为最小的片段定义 <tt class="sgmltag-element">ref</tt> 元素，然后使用 <tt class="sgmltag-element">xref</tt> 定义“包含”第一个 <tt class="sgmltag-element">ref</tt> 元素的 <tt class="sgmltag-element">ref</tt> 元素，等等。然后，解析“最大的”引用并跟着 <tt class="sgmltag-element">xref</tt> 跳来跳去，最后输出真实的文本。输出的文本依赖于你每次填充 <tt class="sgmltag-element">xref</tt> 时所做的 (随机) 决策，所以每次的输出都是不同的。
         </p>
         <p>这种方式非常灵活，但是有一个不好的地方：性能。当你找到一个 <tt class="sgmltag-element">xref</tt> 并需要找到相应的 <tt class="sgmltag-element">ref</tt> 元素时，会遇到一个问题。<tt class="sgmltag-element">xref</tt> 有 <tt class="sgmltag-element">id</tt> 属性，而你要找拥有相同 <tt class="sgmltag-element">id</tt> 属性的 <tt class="sgmltag-element">ref</tt> 元素，但是没有简单的方式做到这件事。较慢的方式是每次获取所有 <tt class="sgmltag-element">ref</tt> 元素的完整列表，然后手动遍历并检视每一个 <tt class="sgmltag-element">id</tt> 属性。较快的方式是只做一次，然后以字典形式构建一个缓冲。
         </p>
         <div class="example"><a name="d0e26553"></a><h3 class="title">例&nbsp;10.14.&nbsp;<tt class="function">loadGrammar</tt></h3><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> loadGrammar</span>(self, grammar):                         
        self.grammar = self._load(grammar)                  
        self.refs = {}                                       <a name="kgp.cache.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        <span class='pykeyword'>for</span> ref <span class='pykeyword'>in</span> self.grammar.getElementsByTagName(<span class='pystring'>"ref"</span>): <a name="kgp.cache.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
            self.refs[ref.attributes[<span class='pystring'>"id"</span>].value] = ref      <a name="kgp.cache.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12"> <a name="kgp.cache.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.child"></a><a name="child_nodes.html">10.4.&nbsp;查找节点的直接子节点
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>解析 <span class="acronym">XML</span> 文档时，另一个有用的己技巧是查找某个特定元素的所有直接子元素。例如，在语法文件中，一个 <tt class="sgmltag-element">ref</tt> 元素可以有数个 <tt class="sgmltag-element">p</tt> 元素，其中每一个都可以包含很多东西，包括其他的 <tt class="sgmltag-element">p</tt> 元素。你只要查找作为 <tt class="sgmltag-element">ref</tt> 孩子的 <tt class="sgmltag-element">p</tt> 元素，不用查找其他 <tt class="sgmltag-element">p</tt> 元素的孩子 <tt class="sgmltag-element">p</tt> 元素。
            </p>
         </div>
         <p>你可能认为你只要简单地使用 <tt class="function">getElementsByTagName</tt> 来实现这点就可以了，但是你不可以这么做。<tt class="function">getElementsByTagName</tt> 递归搜索并返回所有找到的元素的单个列表。由于 <tt class="sgmltag-element">p</tt> 元素可以包含其他的 <tt class="sgmltag-element">p</tt> 元素，你不能使用 <tt class="function">getElementsByTagName</tt>，因为它会返回你不要的嵌套 <tt class="sgmltag-element">p</tt> 元素。为了只找到直接子元素，你要自己进行处理。
         </p>
         <div class="example"><a name="d0e26690"></a><h3 class="title">例&nbsp;10.16.&nbsp;查找直接子元素</h3><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> randomChildElement</span>(self, node):
        choices = [e <span class='pykeyword'>for</span> e <span class='pykeyword'>in</span> node.childNodes
                   <span class='pykeyword'>if</span> e.nodeType == e.ELEMENT_NODE] <a name="kgp.child.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12"> <a name="kgp.child.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12"> <a name="kgp.child.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
        chosen = random.choice(choices)             <a name="kgp.child.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
        <span class='pykeyword'>return</span> chosen                              </pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.handler"></a><a name="handlers_by_node_type.html">10.5.&nbsp;根据节点类型创建不同的处理器
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>第三个有用的 <span class="acronym">XML</span> 处理技巧是将你的代码基于节点类型和元素名称分散到逻辑函数中。解析后的 <span class="acronym">XML</span> 文档是由各种类型的节点组成的，每一个都是通过 <span class="application">Python</span> 对象表示的。文档本身的根层次通过一个 <tt class="classname">Document</tt> 对象表示。<tt class="classname">Document</tt> 还包含了一个或多个 <tt class="classname">Element</tt> 对象 (表示 <span class="acronym">XML</span> 标记)，其中的每一个可以包含其它的 <tt class="classname">Element</tt> 对象、<tt class="classname">Text</tt> 对象 (表示文本)，或者 <tt class="classname">Comment</tt> 对象 (表示内嵌注释)。使用 <span class="application">Python</span> 编写分离各个节点类型逻辑的分发器非常容易。
            </p>
         </div>
         <div class="example"><a name="d0e26817"></a><h3 class="title">例&nbsp;10.17.&nbsp;已解析 <span class="acronym">XML</span> 对象的类名
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> xml.dom <span class='pykeyword'>import</span> minidom</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc = minidom.parse(<span class='pystring'>'kant.xml'</span>)</span> <a name="kgp.handler.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc</span>
<span class="computeroutput">&lt;xml.dom.minidom.Document instance at 0x01359DE8&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc.__class__</span>                   <a name="kgp.handler.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;class xml.dom.minidom.Document at 0x01105D40&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc.__class__.__name__</span>          <a name="kgp.handler.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'Document'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.commandline"></a><a name="command_line_arguments.html">10.6.&nbsp;处理命令行参数
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 完全支持创建在命令行运行的程序，也支持通过命令行参数和短长样式来指定各种选项。这些并非是 <span class="acronym">XML</span> 特定的，但是这样的脚本可以充分使用命令行处理，看来是时候提一下它了。
            </p>
         </div>
         <p>如果不理解命令行参数如何暴露给你的 <span class="application">Python</span> 程序，讨论命令行处理是很困难的，所以让我们先写个简单点的程序来看一下。
         </p>
         <div class="example"><a name="d0e27060"></a><h3 class="title">例&nbsp;10.20.&nbsp;<tt class="varname">sys.argv</tt> 介绍
            </h3>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting">
<span class='pycomment'>#argecho.py</span>
<span class='pykeyword'>import</span> sys

<span class='pykeyword'>for</span> arg <span class='pykeyword'>in</span> sys.argv: <a name="kgp.commandline.0.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    <span class='pykeyword'>print</span> arg</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.alltogether"></a><a name="all_together.html">10.7.&nbsp;全部放在一起
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你已经了解很多基础的东西。让我们回来看看所有片段是如何整合到一起的。</p>
         </div>
         <p>作为开始，这里是一个<a href="command_line_arguments.html" title="10.6.&nbsp;处理命令行参数">接收命令行参数</a>的脚本，它使用 <tt class="filename">getopt</tt> 模块。
         </p>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
def</span> main(argv):                         
...
    <span class='pykeyword'>try</span>:                                
        opts, args = getopt.getopt(argv, <span class='pystring'>"hg:d"</span>, [<span class='pystring'>"help"</span>, <span class='pystring'>"grammar="</span>])
    <span class='pykeyword'>except</span> getopt.GetoptError:          
...
    <span class='pykeyword'>for</span> opt, arg <span class='pykeyword'>in</span> opts:               
...</pre></div>
         <p>创建 <tt class="classname">KantGenerator</tt> 类的一个实例，然后将语法文件和源文件传给它，可能在命令行没有指定。
         </p>
         <div class="informalexample"><pre class="programlisting">
    k = KantGenerator(grammar, source)</pre></div>
         <p><tt class="classname">KantGenerator</tt> 实例自动加载语法，它是一个 <span class="acronym">XML</span> 文件。你使用自定义的 <tt class="function">openAnything</tt> 函数打开这个文件 (<a href="index.html#kgp.openanything" title="10.1.&nbsp;抽象输入源">可能保存在一个本地文件中或者一个远程服务器上</a>)，然后使用内置的 <tt class="filename">minidom</tt> 解析函数<a href="../xml_processing/parsing_xml.html" title="9.3.&nbsp;XML 解析">将 <span class="acronym">XML</span> 解析为一棵 <span class="application">Python</span> 对象树</a>。
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> _load</span>(self, source):
        sock = toolbox.openAnything(source)
        xmldoc = minidom.parse(sock).documentElement
        sock.close()</pre></div>
         <p>哦，根据这种方式，你将使用到 <span class="acronym">XML</span> 文档结构的知识<a href="caching.html" title="10.3.&nbsp;查询缓冲节点">建立一个引用的小缓冲</a>，这些引用都只是 <span class="acronym">XML</span> 文档中的元素。
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> loadGrammar</span>(self, grammar):                         
        <span class='pykeyword'>for</span> ref <span class='pykeyword'>in</span> self.grammar.getElementsByTagName(<span class='pystring'>"ref"</span>):
            self.refs[ref.attributes[<span class='pystring'>"id"</span>].value] = ref     </pre></div>
         <p>如果你在命令行中指定了某些源材料，你可以使用它；否则你将打开语法文件查找“顶层”引用 (没有被其它的东西引用) 并把它作为开始点。</p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> getDefaultSource</span>(self):
        xrefs = {}
        <span class='pykeyword'>for</span> xref <span class='pykeyword'>in</span> self.grammar.getElementsByTagName(<span class='pystring'>"xref"</span>):
            xrefs[xref.attributes[<span class='pystring'>"id"</span>].value] = 1
        xrefs = xrefs.keys()
        standaloneXrefs = [e <span class='pykeyword'>for</span> e <span class='pykeyword'>in</span> self.refs.keys() <span class='pykeyword'>if</span> e <span class='pykeyword'>not</span> <span class='pykeyword'>in</span> xrefs]
        <span class='pykeyword'>return</span> <span class='pystring'>'&lt;xref id="%s"/&gt;'</span> % random.choice(standaloneXrefs)</pre></div>
         <p>现在你打开了了源材料。它是一个 <span class="acronym">XML</span>，你每次解析一个节点。为了让代码分离并具备更高的可维护性，你可以使用<a href="handlers_by_node_type.html" title="10.5.&nbsp;根据节点类型创建不同的处理器">针对每个节点类型的独立处理方法</a>。
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> parse_Element</span>(self, node): 
        handlerMethod = getattr(self, <span class='pystring'>"do_%s"</span> % node.tagName)
        handlerMethod(node)</pre></div>
         <p>你在语法里面跳来跳去，解析每一个 <tt class="sgmltag-element">p</tt> 元素的<a href="child_nodes.html" title="10.4.&nbsp;查找节点的直接子节点">所有孩子</a>，
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> do_p</span>(self, node):
...
        <span class='pykeyword'>if</span> doit:
            <span class='pykeyword'>for</span> child <span class='pykeyword'>in</span> node.childNodes: self.parse(child)</pre></div>
         <p>用任意一个孩子替换 <tt class="sgmltag-element">choice</tt> 元素，
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> do_choice</span>(self, node):
        self.parse(self.randomChildElement(node))</pre></div>
         <p>并用对应 <tt class="sgmltag-element">ref</tt> 元素的任意孩子替换 <tt class="sgmltag-element">xref</tt>，前面你已经进行了缓冲。
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> do_xref</span>(self, node):
        id = node.attributes[<span class='pystring'>"id"</span>].value
        self.parse(self.randomChildElement(self.refs[id]))</pre></div>
         <p>就这样一直解析，最后得到普通文本。</p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> parse_Text</span>(self, node):    
        text = node.data
...
            self.pieces.append(text)</pre></div>
         <p>把结果打印出来。</p>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
def</span> main(argv):                         
...
    k = KantGenerator(grammar, source)
    <span class='pykeyword'>print</span> k.output()</pre></div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.summary"></a><a name="summary.html">10.8.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 带有解析和操作 <span class="acronym">XML</span> 文档非常强大的库。<tt class="filename">minidom</tt> 接收一个 <span class="acronym">XML</span> 文件并将其解析为 <span class="application">Python</span> 对象，并提供了对任意元素的随机访问。进一步，本章展示了如何利用 <span class="application">Python</span> 创建一个“真实”独立的命令行脚本，连同命令行标志、命令行参数、错误处理，甚至从前一个程序的管道接收输入的能力。
            </p>
         </div>
         <p>在继续下一章前，你应该无困难地完成所有这些事情：</p>
         <div class="itemizedlist">
            <ul>
               <li>通过标准输入输出<a href="stdin_stdout_stderr.html" title="10.2.&nbsp;标准输入、输出和错误">链接程序</a></li>
               <li>使用 <tt class="function">getattr</tt> <a href="handlers_by_node_type.html" title="10.5.&nbsp;根据节点类型创建不同的处理器">定义动态分发器</a></li>
               <li>通过 <tt class="filename">getopt</tt> <a href="command_line_arguments.html" title="10.6.&nbsp;处理命令行参数">使用命令行标志</a>并进行验证
               </li>
            </ul>
         </div>
      </div>
      
