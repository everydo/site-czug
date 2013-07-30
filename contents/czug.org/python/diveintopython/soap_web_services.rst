<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/soap_web_services/index.html">http://www.woodpecker.org.cn/diveintopython/soap_web_services/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap"></a>第&nbsp;12&nbsp;章&nbsp;<span class="acronym">SOAP</span> Web 服务
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#soap.divein">12.1. 概览</a></span></li>
               <li><span class="section"><a href="#install.html">12.2. 安装 SOAP 库</a></span><ul>
                     <li><span class="section"><a href="#install.html#d0e30152">12.2.1. 安装 PyXML</a></span></li>
                     <li><span class="section"><a href="#install.html#d0e30255">12.2.2. 安装 fpconst</a></span></li>
                     <li><span class="section"><a href="#install.html#d0e30353">12.2.3. 安装 SOAPpy</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#first_steps.html">12.3. 步入 SOAP</a></span></li>
               <li><span class="section"><a href="#debugging.html">12.4.  SOAP 网络服务查错</a></span></li>
               <li><span class="section"><a href="#wsdl.html">12.5. WSDL 介绍</a></span></li>
               <li><span class="section"><a href="#introspection.html">12.6. 以 WSDL 进行 SOAP 内省</a></span></li>
               <li><span class="section"><a href="#google.html">12.7. 搜索 Google</a></span></li>
               <li><span class="section"><a href="#troubleshooting.html">12.8.  SOAP 网络服务故障排除</a></span></li>
               <li><span class="section"><a href="#summary.html">12.9. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p><a href="../http_web_services/index.html">第 11 章</a> 关注 HTTP 上面向文档的web 服务。“<span class="quote">输入参数</span>” 是 <span class="acronym">URL</span>，“<span class="quote">返回值</span>” 是需要你来解析的一个实际的 XML 文档。
            </p>
            <p>本章将关注更加结构化的 <span class="acronym">SOAP</span> web 服务。<span class="acronym">SOAP</span> 不需要你直接与 HTTP 请求和 XML 文档打交道，而是允许你模拟返回原始数据类型的函数调用。正像你将要看到的，这个描述恰如其份；你可以使用标准 <span class="application">Python</span> 调用语法通过 <span class="acronym">SOAP</span> 库去调用一个函数，这个函数也自然会返回 <span class="application">Python</span> 对象和值。但揭开这层面纱，<span class="acronym">SOAP</span> 库实际上执行了一个多个 XML 文档和远程服务器参与的复杂处理过程。
            </p>
            <p><span class="acronym">SOAP</span> 的贴切定义很复杂，不要误认为 <span class="acronym">SOAP</span> 就是用于调用远程函数。有些人觉得应该补充上：<span class="acronym">SOAP</span> 还允许单向异步的信息通过，以及面向文档的 Web 服务。有这样想法的人是正确的，<span class="acronym">SOAP</span> 的确是这样，但却不止于此。但这一章的重点在于所谓的 “<span class="quote">RPC-style</span>” <span class="acronym">SOAP</span>――调用远程函数获得返回结果。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="soap.divein"></a>12.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>你用 Google，对吧？它是一个很流行的搜索引擎。你是否希望能以程序化的方式访问 Google 的搜索结果呢？现在你能做到了。下面是一个用 <span class="application">Python</span> 搜索 Google 的程序。
               </p>
            </div>
            <div class="example"><a name="d0e30081"></a><h3 class="title">例&nbsp;12.1.&nbsp;<tt class="filename">search.py</tt></h3><pre class="programlisting"><span class='pykeyword'>from</span> SOAPpy <span class='pykeyword'>import</span> WSDL

<span class='pycomment'># you'll need to configure these two values;</span>
<span class='pycomment'># see http://www.google.com/apis/</span>
WSDLFILE = <span class='pystring'>'/path/to/copy/of/GoogleSearch.wsdl'</span>
APIKEY = <span class='pystring'>'YOUR_GOOGLE_API_KEY'</span>

_server = WSDL.Proxy(WSDLFILE)
<span class='pykeyword'>def</span><span class='pyclass'> search</span>(q):
    <span class='pystring'>"""Search Google and return list of {title, link, description}"""</span>
    results = _server.doGoogleSearch(
        APIKEY, q, 0, 10, False, <span class='pystring'>""</span>, False, <span class='pystring'>""</span>, <span class='pystring'>"utf-8"</span>, <span class='pystring'>"utf-8"</span>)
    <span class='pykeyword'>return</span> [{<span class='pystring'>"title"</span>: r.title.encode(<span class='pystring'>"utf-8"</span>),
             <span class='pystring'>"link"</span>: r.URL.encode(<span class='pystring'>"utf-8"</span>),
             <span class='pystring'>"description"</span>: r.snippet.encode(<span class='pystring'>"utf-8"</span>)}
            <span class='pykeyword'>for</span> r <span class='pykeyword'>in</span> results.resultElements]

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>'__main__'</span>:
    <span class='pykeyword'>import</span> sys
    <span class='pykeyword'>for</span> r <span class='pykeyword'>in</span> search(sys.argv[1])[:5]:
        <span class='pykeyword'>print</span> r[<span class='pystring'>'title'</span>]
        <span class='pykeyword'>print</span> r[<span class='pystring'>'link'</span>]
        <span class='pykeyword'>print</span> r[<span class='pystring'>'description'</span>]
        print</pre></div>
            <p>你可以在较大的程序中以模块导入并使用它，也可以在命令行上运行这个脚本。在命令行上，需要把查询字符串作为命令行参数使用，之后就会打印出最前面的五个 Google 查询结果，包括：URL、标题和描述信息。</p>
            <p>下面是以 “<span class="quote">python</span>” 作为命令行参数的查询结果。
            </p>
            <div class="example"><a name="d0e30094"></a><h3 class="title">例&nbsp;12.2.&nbsp;<tt class="filename">search.py</tt> 的使用样例
               </h3><pre class="screen">
<tt class="prompt">C:\diveintopython\common\py&gt;</tt> <span class="userinput">python search.py <span class='pystring'>"python"</span></span>
<span class="computeroutput">&lt;b&gt;Python&lt;/b&gt; Programming Language
http://www.python.org/
Home page for &lt;b&gt;Python&lt;/b&gt;, an interpreted, interactive, object-oriented,
extensible&lt;br&gt; programming language. &lt;b&gt;...&lt;/b&gt; &lt;b&gt;Python&lt;/b&gt;
is OSI Certified Open Source: OSI Certified.

&lt;b&gt;Python&lt;/b&gt; Documentation Index
http://www.python.org/doc/
 &lt;b&gt;...&lt;/b&gt; New-style classes (aka descrintro). Regular expressions. Database
API. Email Us.&lt;br&gt; docs@&lt;b&gt;python&lt;/b&gt;.org. (c) 2004. &lt;b&gt;Python&lt;/b&gt;
Software Foundation. &lt;b&gt;Python&lt;/b&gt; Documentation. &lt;b&gt;...&lt;/b&gt;

Download &lt;b&gt;Python&lt;/b&gt; Software
http://www.python.org/download/
Download Standard &lt;b&gt;Python&lt;/b&gt; Software. &lt;b&gt;Python&lt;/b&gt; 2.3.3 is the
current production&lt;br&gt; version of &lt;b&gt;Python&lt;/b&gt;. &lt;b&gt;...&lt;/b&gt;
&lt;b&gt;Python&lt;/b&gt; is OSI Certified Open Source:

Pythonline
http://www.pythonline.com/


Dive Into &lt;b&gt;Python&lt;/b&gt;
http://diveintopython.org/
Dive Into &lt;b&gt;Python&lt;/b&gt;. &lt;b&gt;Python&lt;/b&gt; from novice to pro. Find:
&lt;b&gt;...&lt;/b&gt; It is also available in multiple&lt;br&gt; languages. Read
Dive Into &lt;b&gt;Python&lt;/b&gt;. This book is still being written. &lt;b&gt;...&lt;/b&gt;</span>
</pre></div>
            <div class="furtherreading">
               <h3>进一步阅读</h3>
               <ul>
                  <li><a href="http://www.xmethods.net/">http://www.xmethods.net/</a> 是一个访问 <span class="acronym">SOAP</span> web 服务的公共知识库。
                  </li>
                  <li><a href="http://www.w3.org/TR/soap/"><span class="acronym">SOAP</span> 规范</a>相当可读，如果你喜欢这类东西的话。
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.install"></a><a name="install.html">12.2.&nbsp;安装 SOAP 库
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="install.html#d0e30152">12.2.1. 安装 PyXML</a></span></li>
               <li><span class="section"><a href="install.html#d0e30255">12.2.2. 安装 fpconst</a></span></li>
               <li><span class="section"><a href="install.html#d0e30353">12.2.3. 安装 SOAPpy</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>与本书中的其他代码不同，本章依赖的库不是 <span class="application">Python</span> 预安装的。
            </p>
         </div>
         <p>在深入学习 <span class="acronym">SOAP</span> web 服务之前，你需要安装三个库：<span class="application">PyXML</span>、<span class="application">fpconst</span> 和 <span class="application">SOAPpy</span>。
         </p>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e30152"></a>12.2.1.&nbsp;安装 <span class="application">PyXML</span></h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>你要用到的第一个库是 <span class="application">PyXML</span>，它是 <span class="acronym">XML</span> 库的一个高级组件，提供了比我们在 <a href="../xml_processing/index.html">第 9 章</a> 学习的 <span class="acronym">XML</span> 内建库更多的功能。
            </p>
            <div class="procedure">
               <h3 class="title">过程&nbsp;12.1.&nbsp;</h3>
               <p>下面是安装 <span class="application">PyXML</span> 的步骤：
               </p>
               <ol type="1">
                  <li>
                     <p>访问 <a href="http://pyxml.sourceforge.net/">http://pyxml.sourceforge.net/</a>，点击 Downloads，下载适合你所使用操作系统的最新版本。
                     </p>
                  </li>
                  <li>
                     <p>如果你所使用的是 Windows，那么你有多个选择。一定要确保你所下载的 <span class="application">PyXML</span> 和你所使用的 <span class="application">Python</span> 版本匹配。
                     </p>
                  </li>
                  <li>
                     <p>双击安装程序。如果你下载的是为 Windows 提供的 <span class="application">PyXML</span> 0.8.3，并且你所使用的是 <span class="application">Python</span> 2.3，这个安装程序应该是 <tt class="filename">PyXML-0.8.3.win32-py2.3.exe</tt>。
                     </p>
                  </li>
                  <li>
                     <p>深入安装过程。</p>
                  </li>
                  <li>
                     <p>安装完成后，关闭安装程序，没有任何安装成功的昭示 (并没有在开始菜单、快捷栏或桌面出现图标)。因为 <span class="application">PyXML</span> 仅仅是被其他程序调用的 <span class="acronym">XML</span> 的库集合。
                     </p>
                  </li>
               </ol>
            </div>
            <p>要检验 <span class="application">PyXML</span> 安装得是否正确，可以运行 <span class="application">Python</span> <span class="acronym">IDE</span>，下面的指令可以看到 <span class="acronym">XML</span> 库的安装版本。
            </p>
            <div class="example"><a name="d0e30229"></a><h3 class="title">例&nbsp;12.3.&nbsp;检验 <span class="application">PyXML</span> 安装
               </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> xml</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xml.__version__</span>
<span class="computeroutput">'0.8.3'</span>
</pre><p>这个安装版本号应该和你所下载并安装的 <span class="application">PyXML</span> 安装程序版本号一致。
               </p>
            </div>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e30255"></a>12.2.2.&nbsp;安装 <span class="application">fpconst</span></h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>你所需要安装的第二个库是 <span class="application">fpconst</span>，它是一系列支持 IEEE754 double-precision 特殊值的常量和函数，提供了对 Not-a-Number (NaN), Positive Infinity (Inf) 和 Negative Infinity (-Inf) 等特殊值的支持，而这是
               <span class="acronym">SOAP</span> 数据类型规范的组成部分。
            </p>
            <div class="procedure">
               <h3 class="title">过程&nbsp;12.2.&nbsp;</h3>
               <p>下面是 <span class="application">fpconst</span> 的安装过程：
               </p>
               <ol type="1">
                  <li>
                     <p>从 <a href="http://www.analytics.washington.edu/statcomp/projects/rzope/fpconst/">http://www.analytics.washington.edu/statcomp/projects/rzope/fpconst/</a> 下载 <span class="application">fpconst</span> 的最新版本。
                     </p>
                  </li>
                  <li>
                     <p>提供了两种格式的下载：<tt class="filename">.tar.gz</tt> 和 <tt class="filename">.zip</tt>。如果你使用的是 Windows 操作系统，下载 <tt class="filename">.zip</tt> 文件；其他情况下应该下载 <tt class="filename">.tar.gz</tt> 文件。
                     </p>
                  </li>
                  <li>
                     <p>对这个文件进行解压缩。在 Windows XP 上你可以鼠标右键单击这个文件并选择“解压文件”；在较早的 Windows 版本上则需要 WinZip 之类的第三方解压程序。在 <span class="abbrev">Mac</span> <span class="acronym">OS</span> X 上，可以右键单击压缩文件进行解压。
                     </p>
                  </li>
                  <li>
                     <p>打开命令提示符窗口并定位到解压目录。</p>
                  </li>
                  <li>
                     <p>键入 <b class="userinput"><tt>python setup.py install</tt></b> 运行安装程序。
                     </p>
                  </li>
               </ol>
            </div>
            <p>要检验 <span class="application">fpconst</span> 安装得是否正确，运行 <span class="application">Python</span> <span class="acronym">IDE</span> 并查看版本号。
            </p>
            <div class="example"><a name="d0e30327"></a><h3 class="title">例&nbsp;12.4.&nbsp;检验 <span class="application">fpconst</span> 安装
               </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> fpconst</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">fpconst.__version__</span>
<span class="computeroutput">'0.6.0'</span>
</pre><p>这个安装版本号应该和你所下载并用于安装的 <span class="application">fpconst</span> 压缩包版本号一致。
               </p>
            </div>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e30353"></a>12.2.3.&nbsp;安装 <span class="application">SOAPpy</span></h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>第三个，也是最后一个需要安装的库是 <span class="acronym">SOAP</span> 库本身：<span class="application">SOAPpy</span>。
            </p>
            <div class="procedure">
               <h3 class="title">过程&nbsp;12.3.&nbsp;</h3>
               <p>下面是安装 <span class="application">SOAPpy</span>的过程：
               </p>
               <ol type="1">
                  <li>
                     <p>访问 <a href="http://pywebsvcs.sourceforge.net/">http://pywebsvcs.sourceforge.net/</a> 并选择 <span class="application">SOAPpy</span> 部分中最新的官方发布。
                     </p>
                  </li>
                  <li>
                     <p>提供了两种格式的下载。如果你使用的是 Windows，那么下载 <tt class="filename">.zip</tt> 文件；其他情况则下载 <tt class="filename">.tar.gz</tt> 文件。
                     </p>
                  </li>
                  <li>
                     <p>和安装 <span class="application">fpconst</span> 时一样先解压下载的文件．
                     </p>
                  </li>
                  <li>
                     <p>打开命令提示符窗口并定位到解压 <span class="application">SOAPpy</span> 文件的目录。
                     </p>
                  </li>
                  <li>
                     <p>键入 <b class="userinput"><tt>python setup.py install</tt></b> 运行安装程序。
                     </p>
                  </li>
               </ol>
            </div>
            <p>要检验 <span class="application">SOAPpy</span> 安装得是否正确，运行 <span class="application">Python</span> <span class="acronym">IDE</span> 并查看版本号。
            </p>
            <div class="example"><a name="d0e30419"></a><h3 class="title">例&nbsp;12.5.&nbsp;检验 <span class="application">SOAPpy</span> 安装
               </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> SOAPpy</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">SOAPpy.__version__</span>
<span class="computeroutput">'0.11.4'</span>
</pre><p>这个安装版本号应该和你所下载并用于安装的 <span class="application">SOAPpy</span> 压缩包版本号一致。
               </p>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.firststeps"></a><a name="first_steps.html">12.3.&nbsp;步入 <span class="acronym">SOAP</span></a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>调用远程函数是 <span class="acronym">SOAP</span> 的核心功能。有很多提供公开 <span class="acronym">SOAP</span> 访问的服务器提供用于展示的简单功能。
            </p>
         </div>
         <p>最受欢迎的 <span class="acronym">SOAP</span> 公开访问服务器是 <a href="http://www.xmethods.net/">http://www.xmethods.net/</a>。这个例子使用了一个展示函数，可以根据美国邮政编码返回当地气温。
         </p>
         <div class="example"><a name="d0e30468"></a><h3 class="title">例&nbsp;12.6.&nbsp;获得现在的气温</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> SOAPpy <span class='pykeyword'>import</span> SOAPProxy</span>            <a name="soap.firststeps.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">url = <span class='pystring'>'http://services.xmethods.net:80/soap/servlet/rpcrouter'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">namespace = <span class='pystring'>'urn:xmethods-Temperature'</span></span>  <a name="soap.firststeps.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server = SOAPProxy(url, namespace)</span>      <a name="soap.firststeps.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server.getTemp(<span class='pystring'>'27502'</span>)</span>                 <a name="soap.firststeps.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">80.0</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.debug"></a><a name="debugging.html">12.4.&nbsp; <span class="acronym">SOAP</span> 网络服务查错
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p> <span class="acronym">SOAP</span> 提供了一个很方便的方法用以查看背后的情形。
            </p>
         </div>
         <p><tt class="classname">SOAPProxy</tt> 的两个小设置就可以打开查错模式。
         </p>
         <div class="example"><a name="d0e30604"></a><h3 class="title">例&nbsp;12.7.&nbsp; <span class="acronym">SOAP</span> 网络服务查错
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> SOAPpy <span class='pykeyword'>import</span> SOAPProxy</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">url = <span class='pystring'>'http://services.xmethods.net:80/soap/servlet/rpcrouter'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">n = <span class='pystring'>'urn:xmethods-Temperature'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server = SOAPProxy(url, namespace=n)</span>     <a name="soap.debug.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server.config.dumpSOAPOut = 1</span>            <a name="soap.debug.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server.config.dumpSOAPIn = 1</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">temperature = server.getTemp(<span class='pystring'>'27502'</span>)</span>    <a name="soap.debug.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">*** Outgoing SOAP ******************************************************
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"
  xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
  xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
  xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsd="http://www.w3.org/1999/XMLSchema"&gt;
&lt;SOAP-ENV:Body&gt;
&lt;ns1:getTemp xmlns:ns1="urn:xmethods-Temperature" SOAP-ENC:root="1"&gt;
&lt;v1 xsi:type="xsd:string"&gt;27502&lt;/v1&gt;
&lt;/ns1:getTemp&gt;
&lt;/SOAP-ENV:Body&gt;
&lt;/SOAP-ENV:Envelope&gt;
************************************************************************
*** Incoming SOAP ******************************************************
&lt;?xml version='1.0' encoding='UTF-8'?&gt;
&lt;SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"&gt;
&lt;SOAP-ENV:Body&gt;
&lt;ns1:getTempResponse xmlns:ns1="urn:xmethods-Temperature"
  SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"&gt;
&lt;return xsi:type="xsd:float"&gt;80.0&lt;/return&gt;
&lt;/ns1:getTempResponse&gt;

&lt;/SOAP-ENV:Body&gt;
&lt;/SOAP-ENV:Envelope&gt;
************************************************************************
</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">temperature</span>
<span class="computeroutput">80.0</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.wsdl"></a><a name="wsdl.html">12.5.&nbsp;<span class="acronym">WSDL</span> 介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="classname">SOAPProxy</tt> 类本地方法调用并透明地转向到远程 <span class="acronym">SOAP</span> 方法。正如你所看到的，这是很多的工作，<tt class="classname">SOAPProxy</tt> 快速和透明地完成他们。它没有做到的是提供方法自省的手段。
            </p>
         </div>
         <p>考虑一下：前面两部分所展现的调用只有一个参数和返回的简单远程 <span class="acronym">SOAP</span> 方法。服务 <span class="acronym">URL</span> 和一系列参数及它们的数据类型需要被知道并跟踪。任何的缺失或错误都会导致整体的失败。
         </p>
         <p>这并没有什么可惊讶的。如果我要调用一个本地函数，我需要知道函数所在的包和模块名 (与之对应的则是服务 <span class="acronym">URL</span> 和命名空间)。我还需要知道正确的函数名以及其函数个数。<span class="application">Python</span> 精妙地不需明示类型，但我还是需要知道有多少个参数需要传递，多少个值将被返回。
         </p>
         <p>最大的区别就在于内省。就像你在 <a href="../power_of_introspection/index.html">第 4 章</a> 看到的那样，<span class="application">Python</span> 擅长于让你实时地去探索模块和函数的情况。你可以对一个模块中的所有函数进行列表，并不费吹灰之力地明了函数的声明和参数情况。
         </p>
         <p><span class="acronym">WSDL</span> 允许你对 <span class="acronym">SOAP</span> 网络服务做相同的事情。<span class="acronym">WSDL</span> 是 “<span class="quote">网络服务描述语言 (Web Services Description Language)</span>”的缩写。它尽管是为自如地表述多种类型的网络服务而设定，却也经常用于描述 <span class="acronym">SOAP</span> 网络服务。
         </p>
         <p>一个 <span class="acronym">WSDL</span> 文件不过就是一个文件。更具体地讲，是一个 XML 文件。通常存储于你所访问的 <span class="acronym">SOAP</span> 网络服务这个被描述对象所在的服务器上，并没有什么特殊之处。在本章稍后的位置，我们将下载 Google API 的 <span class="acronym">WSDL</span> 文件并在本地使用它。这并不意味着本地调用 Google，这个 <span class="acronym">WSDL</span> 文件所描述的仍旧是 Google 服务器上的远程函数。
         </p>
         <p>在 <span class="acronym">WSDL</span> 文件中描述了调用相应的 <span class="acronym">SOAP</span> 网络服务的一切：
         </p>
         <div class="itemizedlist">
            <ul>
               <li>服务 <span class="acronym">URL</span> 和命名空间
               </li>
               <li>网络服务的类型 (可能是 <span class="acronym">SOAP</span> 的函数调用，但我说过，<span class="acronym">WSDL</span> 足够自如地去描述网络服务的广泛内容)
               </li>
               <li>有效函数列表</li>
               <li>每个函数的参数</li>
               <li>每个参数的类型</li>
               <li>每个函数的返回值及其数据类型</li>
            </ul>
         </div>
         <p>换言之，一个 <span class="acronym">WSDL</span> 文件告诉你调用 <span class="acronym">SOAP</span> 所需要知道的一切。
         </p>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.introspection"></a><a name="introspection.html">12.6.&nbsp;以 <span class="acronym">WSDL</span> 进行 <span class="acronym">SOAP</span> 内省
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>就像网络服务舞台上的所有事物，<span class="acronym">WSDL</span> 也经历了一个充满明争暗斗而且漫长多变的历史。我不打算讲述这段令我伤心的历史。还有一些其他的标准提供相同的支持，但 <span class="acronym">WSDL</span> 还是胜出，所以我们还是来学习一下如何使用它。
            </p>
         </div>
         <p><span class="acronym">WSDL</span> 最基本的功能便是让你揭示 <span class="acronym">SOAP</span> 服务器所提供的有效方法。
         </p>
         <div class="example"><a name="d0e30935"></a><h3 class="title">例&nbsp;12.8.&nbsp;揭示有效方法</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> SOAPpy <span class='pykeyword'>import</span> WSDL</span>          <a name="soap.introspection.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">wsdlFile = <span class='pystring'>'http://www.xmethods.net/sd/2001/TemperatureService.wsdl'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server = WSDL.Proxy(wsdlFile)</span>    <a name="soap.introspection.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server.methods.keys()</span>            <a name="soap.introspection.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">[u'getTemp']</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.google"></a><a name="google.html">12.7.&nbsp;搜索 Google
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>让我们回到这章开始时你看到的那段代码，获得比当前气温更有价值和令人振奋的信息。</p>
         </div>
         <p>Google 提供了一个 <span class="acronym">SOAP</span> <span class="acronym">API</span>，以便通过程序进行 Google 搜索。使用它的前提是，你注册了 Google 网络服务。
         </p>
         <div class="procedure">
            <h3 class="title">过程&nbsp;12.4.&nbsp;注册 Google 网络服务</h3>
            <ol type="1">
               <li>
                  <p>访问 <a href="http://www.google.com/apis/">http://www.google.com/apis/</a> 并创建一个账号。唯一的需要是提供一个 E-mail 地址。注册之后，你将通过 E-mail 收到你的 Google API 许可证 (license key)。你需要在调用 Google 搜索函数时使用这个许可证。
                  </p>
               </li>
               <li>
                  <p>还是在 <a href="http://www.google.com/apis/">http://www.google.com/apis/</a> 上，下载 Google 网络 APIs 开发工具包 (Google Web APIs developer kit)。它包含着包括 <span class="application">Python</span> 在内的多种语言的样例代码，更重要的是它包含着 <span class="acronym">WSDL</span> 文件。
                  </p>
               </li>
               <li>
                  <p>解压这个开发工具包并找到 <tt class="filename">GoogleSearch.wsdl</tt>。将这个文件拷贝到你本地驱动器的一个永久地址。在本章后面位置你会用到它。
                  </p>
               </li>
            </ol>
         </div>
         <p>你有了开发许可证和 Google <span class="acronym">WSDL</span> 文件之后就可以和 Google 网络服务打交道了。
         </p>
         <div class="example"><a name="d0e31385"></a><h3 class="title">例&nbsp;12.12.&nbsp;内省 Google 网络服务</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> SOAPpy <span class='pykeyword'>import</span> WSDL</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server = WSDL.Proxy(<span class='pystring'>'/path/to/your/GoogleSearch.wsdl'</span>)</span> <a name="soap.google.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server.methods.keys()</span>                                  <a name="soap.google.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">[u'doGoogleSearch', u'doGetCachedPage', u'doSpellingSuggestion']</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">callInfo = server.methods[<span class='pystring'>'doGoogleSearch'</span>]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> arg <span class='pykeyword'>in</span> callInfo.inparams:</span>                          <a name="soap.google.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>print</span> arg.name.ljust(15), arg.type</span>
<span class="computeroutput">key             (u'http://www.w3.org/2001/XMLSchema', u'string')
q               (u'http://www.w3.org/2001/XMLSchema', u'string')
start           (u'http://www.w3.org/2001/XMLSchema', u'int')
maxResults      (u'http://www.w3.org/2001/XMLSchema', u'int')
filter          (u'http://www.w3.org/2001/XMLSchema', u'boolean')
restrict        (u'http://www.w3.org/2001/XMLSchema', u'string')
safeSearch      (u'http://www.w3.org/2001/XMLSchema', u'boolean')
lr              (u'http://www.w3.org/2001/XMLSchema', u'string')
ie              (u'http://www.w3.org/2001/XMLSchema', u'string')
oe              (u'http://www.w3.org/2001/XMLSchema', u'string')</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.troubleshooting"></a><a name="troubleshooting.html">12.8.&nbsp; <span class="acronym">SOAP</span> 网络服务故障排除
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>是的，<span class="acronym">SOAP</span> 网络服务的世界中也不总是欢乐和阳光。有时候也会有故障。
            </p>
         </div>
         <p>正如你在本章中看到的，<span class="acronym">SOAP</span> 牵扯了很多层面。<span class="acronym">SOAP</span> 向 HTTP 服务器发送 XML 文档并接收返回的 XML 文档时需要用到 HTTP 层。这样一来，你在 <a href="../http_web_services/index.html" title="第&nbsp;11&nbsp;章&nbsp;HTTP Web 服务">第&nbsp;11&nbsp;章 <i>HTTP Web 服务</i></a> 学到的调试技术在这里都有了用武之地。你可以 <b class="userinput"><tt>import httplib</tt></b> 并设置 <b class="userinput"><tt>httplib.HTTPConnection.debuglevel = 1</tt></b> 来查看潜在的 HTTP 传输。
         </p>
         <p>在 HTTP 层之上，还有几个可能发生问题的地方。<span class="application">SOAPpy</span> 隐藏 <span class="acronym">SOAP</span> 语法的本领令你惊叹不已，但也意味着在发生问题时更难确定问题所在。
         </p>
         <p>下面的这些例子是我在使用 <span class="acronym">SOAP</span> 网络服务时犯过的一些常见错误以及所产生的错误信息。
         </p>
         <div class="example"><a name="d0e31792"></a><h3 class="title">例&nbsp;12.15.&nbsp;以错误的设置调用 Proxy 方法</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> SOAPpy <span class='pykeyword'>import</span> SOAPProxy</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">url = <span class='pystring'>'http://services.xmethods.net:80/soap/servlet/rpcrouter'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server = SOAPProxy(url)</span>                                        <a name="soap.troubleshooting.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">server.getTemp(<span class='pystring'>'27502'</span>)</span>                                        <a name="soap.troubleshooting.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="traceback">&lt;Fault SOAP-ENV:Server.BadTargetObjectURI:
Unable to determine object id from call: is the method element namespaced?&gt;
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
  File "c:\python23\Lib\site-packages\SOAPpy\Client.py", line 453, in __call__
    return self.__r_call(*args, **kw)
  File "c:\python23\Lib\site-packages\SOAPpy\Client.py", line 475, in __r_call
    self.__hd, self.__ma)
  File "c:\python23\Lib\site-packages\SOAPpy\Client.py", line 389, in __call
    raise p
SOAPpy.Types.faultType: &lt;Fault SOAP-ENV:Server.BadTargetObjectURI:
Unable to determine object id from call: is the method element namespaced?&gt;</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soap.summary"></a><a name="summary.html">12.9.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="acronym">SOAP</span> 网络服务是很复杂的，雄心勃勃的它试图涵盖网络服务的很多不同应用。这一章我们接触了它的一个简单应用。
            </p>
         </div>
         <div class="highlights">
            <p>在开始下一章的学习之前，确保你能自如地做如下工作：</p>
            <div class="itemizedlist">
               <ul>
                  <li>连接到 <span class="acronym">SOAP</span> 服务器并调用远程方法
                  </li>
                  <li>通过 <span class="acronym">WSDL</span> 文件自省远程方法
                  </li>
                  <li>有效排除 <span class="acronym">SOAP</span> 调用中的错误
                  </li>
                  <li>排除常见的 <span class="acronym">SOAP</span> 相关错误
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
