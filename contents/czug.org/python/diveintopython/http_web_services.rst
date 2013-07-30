---
created: 
creator: Benky
description: ''
title: 11. HTTP Web 服务
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/http_web_services/index.html">http://www.woodpecker.org.cn/diveintopython/http_web_services/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa"></a>第&nbsp;11&nbsp;章&nbsp;HTTP Web 服务
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#oa.divein">11.1. 概览</a></span></li>
               <li><span class="section"><a href="#review.html">11.2. 避免通过 HTTP 重复地获取数据</a></span></li>
               <li><span class="section"><a href="#http_features.html">11.3. HTTP 的特性</a></span><ul>
                     <li><span class="section"><a href="#http_features.html#d0e27782">11.3.1. 用户代理 (User-Agent)</a></span></li>
                     <li><span class="section"><a href="#http_features.html#d0e27806">11.3.2. 重定向 (Redirects)</a></span></li>
                     <li><span class="section"><a href="#http_features.html#d0e27880">11.3.3. Last-Modified/If-Modified-Since</a></span></li>
                     <li><span class="section"><a href="#http_features.html#d0e27915">11.3.4. ETag/If-None-Match</a></span></li>
                     <li><span class="section"><a href="#http_features.html#d0e27943">11.3.5. 压缩 (Compression)</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#debugging.html">11.4. 调试 HTTP web 服务</a></span></li>
               <li><span class="section"><a href="#user_agent.html">11.5. 设置 User-Agent</a></span></li>
               <li><span class="section"><a href="#etags.html">11.6. 处理 Last-Modified 和 ETag</a></span></li>
               <li><span class="section"><a href="#redirects.html">11.7. 处理重定向</a></span></li>
               <li><span class="section"><a href="#gzip_compression.html">11.8. 处理压缩数据</a></span></li>
               <li><span class="section"><a href="#alltogether.html">11.9. 全部放在一起</a></span></li>
               <li><span class="section"><a href="#summary.html">11.10. 小结</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="oa.divein"></a>11.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p> 在讲解<a href="../html_processing/extracting_data.html#dialect.extract.urllib" title="例&nbsp;8.5.&nbsp;urllib 介绍">如何下载 web 页</a>和<a href="../scripts_and_streams/index.html#kgp.openanything.urllib" title="例&nbsp;10.2.&nbsp;解析来自 URL 的 XML">如何从 URL 解析 XML</a>时，你已经学习了关于 <a href="../html_processing/index.html" title="第&nbsp;8&nbsp;章&nbsp;HTML 处理">HTML 处理</a>和 <a href="../xml_processing/index.html" title="第&nbsp;9&nbsp;章&nbsp;XML 处理">XML 处理</a>，接下来让我们来更全面地探讨有关 HTTP web 服务的主题。
               </p>
            </div>
            <p>简单地讲，HTTP web 服务是指以编程的方式直接使用 HTTP 操作从远程服务器发送和接收数据。如果你要从服务器获取数据，直接使用 HTTP GET；如果您想发送新数据到服务器，使用 HTTP POST。(一些较高级的 HTTP web 服务
               API 也定义了使用 HTTP PUT 和 HTTP DELETE 修改和删除现有数据的方法。) 换句话说，构建在 HTTP 协议中的 “<span class="quote">verbs (动作)</span>” (GET, POST, PUT 和 DELETE) 直接映射为接收、发送、修改和删除等应用级别的操作。
            </p>
            <p>这种方法的主要优点是简单，并且许多不同的站点充分印证了这样的简单性是受欢迎的。数据 (通常是 XML 数据) 能静态创建和存储，或通过服务器端脚本和所有主流计算机语言 (包括用于下载数据的 HTTP 库) 动态生成。调试也很简单，因为您可以在任意浏览器中调用网络服务来查看这些原始数据。现代浏览器甚至可以为您进行良好的格式化并漂亮地打印这些
               XML 数据，以便让您快速地浏览。
            </p>
            <p>HTTP web 服务上的纯 XML 应用举例：</p>
            <div class="itemizedlist">
               <ul>
                  <li><a href="http://www.amazon.com/webservices">Amazon API</a> 允许您从 Amazon.com 在线商店获取产品信息。
                  </li>
                  <li><a href="http://www.nws.noaa.gov/alerts/">National Weather Service</a> (美国) 和 <a href="http://demo.xml.weather.gov.hk/">Hong Kong Observatory</a> (香港) 通过 web 服务提供天气警报。
                  </li>
                  <li><a href="http://atomenabled.org/">Atom API</a> 用来管理基于 web 的内容。
                  </li>
                  <li><a href="http://syndic8.com/">Syndicated feeds</a> 应用于 weblogs 和新闻站点中带给您来自众多站点的最新消息。
                  </li>
               </ul>
            </div>
            <p>在后面的几章里，我们将探索使用 HTTP 进行数据发送和接收传输的 API，但是不会将应用语义映射到潜在的 HTTP 语义。(所有这些都是通过 HTTP POST 这个管道完成的。) 但是本章将关注使用 HTTP GET 从远程服务器获取数据，并且将探索几个由纯
               HTTP web 服务带来最大利益的 HTTP 特性。
            </p>
            <p>如下所示为<a href="../scripts_and_streams/index.html" title="第&nbsp;10&nbsp;章&nbsp;脚本和流">上一章</a>曾经看到过的 <tt class="filename">openanything</tt> 模块的更高级版本：
            </p>
            <div class="example"><a name="d0e27701"></a><h3 class="title">例&nbsp;11.1.&nbsp;<tt class="filename">openanything.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting"><span class='pykeyword'>
import</span> urllib2, urlparse, gzip
<span class='pykeyword'>from</span> StringIO <span class='pykeyword'>import</span> StringIO

USER_AGENT = <span class='pystring'>'OpenAnything/1.0 +http://diveintopython.org/http_web_services/'</span>

<span class='pykeyword'>class</span><span class='pyclass'> SmartRedirectHandler</span>(urllib2.HTTPRedirectHandler):    
    <span class='pykeyword'>def</span><span class='pyclass'> http_error_301</span>(self, req, fp, code, msg, headers):  
        result = urllib2.HTTPRedirectHandler.http_error_301(
            self, req, fp, code, msg, headers)              
        result.status = code                                
        <span class='pykeyword'>return</span> result                                       

    <span class='pykeyword'>def</span><span class='pyclass'> http_error_302</span>(self, req, fp, code, msg, headers):  
        result = urllib2.HTTPRedirectHandler.http_error_302(
            self, req, fp, code, msg, headers)              
        result.status = code                                
        <span class='pykeyword'>return</span> result                                       

<span class='pykeyword'>class</span><span class='pyclass'> DefaultErrorHandler</span>(urllib2.HTTPDefaultErrorHandler):   
    <span class='pykeyword'>def</span><span class='pyclass'> http_error_default</span>(self, req, fp, code, msg, headers):
        result = urllib2.HTTPError(                           
            req.get_full_url(), code, msg, headers, fp)       
        result.status = code                                  
        <span class='pykeyword'>return</span> result                                         

<span class='pykeyword'>def</span><span class='pyclass'> openAnything</span>(source, etag=None, lastmodified=None, agent=USER_AGENT):
    <span class='pystring'>'''URL, filename, or string --&gt; stream

    This function lets you define parsers that take any input source
    (URL, pathname to local or network file, or actual data as a string)
    and deal with it in a uniform manner.  Returned object is guaranteed
    to have all the basic stdio read methods (read, readline, readlines).
    Just .close() the object when you're done with it.

    If the etag argument is supplied, it will be used as the value of an
    If-None-Match request header.

    If the lastmodified argument is supplied, it must be a formatted
    date/time string in GMT (as returned in the Last-Modified header of
    a previous request).  The formatted date/time will be used
    as the value of an If-Modified-Since request header.

    If the agent argument is supplied, it will be used as the value of a
    User-Agent request header.
    '''</span>

    <span class='pykeyword'>if</span> hasattr(source, <span class='pystring'>'read'</span>):
        <span class='pykeyword'>return</span> source

    <span class='pykeyword'>if</span> source == <span class='pystring'>'-'</span>:
        <span class='pykeyword'>return</span> sys.stdin

    <span class='pykeyword'>if</span> urlparse.urlparse(source)[0] == <span class='pystring'>'http'</span>:                                      
        <span class='pycomment'># open URL with urllib2                                                     </span>
        request = urllib2.Request(source)                                           
        request.add_header(<span class='pystring'>'User-Agent'</span>, agent)                                     
        <span class='pykeyword'>if</span> etag:                                                                    
            request.add_header(<span class='pystring'>'If-None-Match'</span>, etag)                               
        <span class='pykeyword'>if</span> lastmodified:                                                            
            request.add_header(<span class='pystring'>'If-Modified-Since'</span>, lastmodified)                   
        request.add_header(<span class='pystring'>'Accept-encoding'</span>, <span class='pystring'>'gzip'</span>)                               
        opener = urllib2.build_opener(SmartRedirectHandler(), DefaultErrorHandler())
        <span class='pykeyword'>return</span> opener.open(request)                                                 
    
    <span class='pycomment'># try to open with native open function (if source is a filename)</span>
    <span class='pykeyword'>try</span>:
        <span class='pykeyword'>return</span> open(source)
    <span class='pykeyword'>except</span> (IOError, OSError):
        <span class='pykeyword'>pass</span>

    <span class='pycomment'># treat source as string</span>
    <span class='pykeyword'>return</span> StringIO(str(source))

<span class='pykeyword'>def</span><span class='pyclass'> fetch</span>(source, etag=None, last_modified=None, agent=USER_AGENT):  
    <span class='pystring'>'''Fetch data and metadata from a URL, file, stream, or string'''</span>
    result = {}                                                      
    f = openAnything(source, etag, last_modified, agent)             
    result[<span class='pystring'>'data'</span>] = f.read()                                        
    <span class='pykeyword'>if</span> hasattr(f, <span class='pystring'>'headers'</span>):                                        
        <span class='pycomment'># save ETag, if the server sent one                          </span>
        result[<span class='pystring'>'etag'</span>] = f.headers.get(<span class='pystring'>'ETag'</span>)                       
        <span class='pycomment'># save Last-Modified header, if the server sent one          </span>
        result[<span class='pystring'>'lastmodified'</span>] = f.headers.get(<span class='pystring'>'Last-Modified'</span>)      
        <span class='pykeyword'>if</span> f.headers.get(<span class='pystring'>'content-encoding'</span>, <span class='pystring'>''</span>) == <span class='pystring'>'gzip'</span>:          
            <span class='pycomment'># data came back gzip-compressed, decompress it          </span>
            result[<span class='pystring'>'data'</span>] = gzip.GzipFile(fileobj=StringIO(result[<span class='pystring'>'data'</span>]])).read()
    <span class='pykeyword'>if</span> hasattr(f, <span class='pystring'>'url'</span>):                                            
        result[<span class='pystring'>'url'</span>] = f.url                                        
        result[<span class='pystring'>'status'</span>] = 200                                       
    <span class='pykeyword'>if</span> hasattr(f, <span class='pystring'>'status'</span>):                                         
        result[<span class='pystring'>'status'</span>] = f.status                                  
    f.close()                                                        
    <span class='pykeyword'>return</span> result                                                    
</pre></div>
            <div class="furtherreading">
               <h3>进一步阅读</h3>
               <ul>
                  <li>Paul Prescod 认为<a href="http://webservices.xml.com/pub/a/ws/2002/02/06/rest.html">纯 HTTP web 服务是 Internet 的未来</a>。
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.review"></a><a name="review.html">11.2.&nbsp;避免通过 HTTP 重复地获取数据
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>假如说你想用 HTTP 下载资源，例如一个 Atom feed 汇聚。你不仅仅想下载一次；而是想一次又一次地下载它，如每小时一次，从提供 news feed 的站点获得最新的消息。让我们首先用一种直接而原始的方法来实现它，然后看看如何改进它。
               
            </p>
         </div>
         <div class="example"><a name="d0e27729"></a><h3 class="title">例&nbsp;11.2.&nbsp;用直接而原始的方法下载 feed</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">data = urllib.urlopen(<span class='pystring'>'http://diveintomark.org/xml/atom.xml'</span>).read()</span>    <a name="oa.review.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> data</span>
<span class="computeroutput">&lt;?xml version="1.0" encoding="iso-8859-1"?&gt;
&lt;feed version="0.3"
  xmlns="http://purl.org/atom/ns#"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xml:lang="en"&gt;
  &lt;title mode="escaped"&gt;dive into mark&lt;/title&gt;
  &lt;link rel="alternate" type="text/html" href="http://diveintomark.org/"/&gt;
  &lt;-- rest of feed omitted for brevity --&gt;</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.features"></a><a name="http_features.html">11.3.&nbsp;HTTP 的特性
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="http_features.html#d0e27782">11.3.1. 用户代理 (User-Agent)</a></span></li>
               <li><span class="section"><a href="http_features.html#d0e27806">11.3.2. 重定向 (Redirects)</a></span></li>
               <li><span class="section"><a href="http_features.html#d0e27880">11.3.3. Last-Modified/If-Modified-Since</a></span></li>
               <li><span class="section"><a href="http_features.html#d0e27915">11.3.4. ETag/If-None-Match</a></span></li>
               <li><span class="section"><a href="http_features.html#d0e27943">11.3.5. 压缩 (Compression)</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>这里有五个你必须关注的 HTTP 重要特性。</p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e27782"></a>11.3.1.&nbsp;用户代理 (<tt class="literal">User-Agent</tt>)
                     </h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p><tt class="literal">User-Agent</tt> 是一种客户端告知服务器谁在什么时候通过 HTTP 请求了一个 web 页、feed 汇聚或其他类型的 web 服务的简单途径。当客户端请求一个资源时，应该尽可能明确发起请求的是谁，以便当产生异常错误时，允许服务器端的管理员与客户端的开发者取得联系。
               
            </p>
            <p>默认情况下 <span class="application">Python</span> 发送一个通用的 <tt class="literal">User-Agent</tt>：<tt class="literal">Python-urllib/1.15</tt>。下一节，您将看到更加有针对性的 <tt class="literal">User-Agent</tt>。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e27806"></a>11.3.2.&nbsp;重定向 (Redirects)
                     </h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>有时资源移来移去。Web 站点重组内容，页面移动到了新的地址。甚至是 web 服务重组。原来位于 <tt class="literal">http://example.com/index.xml</tt> 的 feed 汇聚可能被移动到 <tt class="literal">http://example.com/xml/atom.xml</tt>。或者因为一个机构的扩展或重组，整个域被迁移。例如，<tt class="literal">http://www.example.com/index.xml</tt> 可能被重定向到 <tt class="literal">http://server-farm-1.example.com/index.xml</tt>。
            </p>
            <p>您每次从 HTTP 服务器请求任何类型的资源时，服务器的响应中均包含一个状态代码。状态代码 <tt class="literal">200</tt> 的意思是 “<span class="quote">一切正常，这就是您请求的页面</span>”。状态代码 <tt class="literal">404</tt> 的意思是 “<span class="quote">页面没找到</span>”。 (当浏览 web 时，你可能看到过 404 errors。)
            </p>
            <p>HTTP 有两种不同的方法表示资源已经被移动。状态代码 <tt class="literal">302</tt> 表示<span class="emphasis"><em>临时重定向</em></span>；这意味着 “<span class="quote">哎呀，访问内容被临时移动</span>” (然后在 <tt class="literal">Location:</tt> 头信息中给出临时地址)。状态代码 <tt class="literal">301</tt> 表示<span class="emphasis"><em>永久重定向</em></span>；这意味着 “<span class="quote">哎呀，访问内容被永久移动</span>” (然后在 <tt class="literal">Location:</tt> 头信息中给出新地址)。如果您获得了一个 <tt class="literal">302</tt> 状态代码和一个新地址，HTTP 规范说您应该使用新地址获取您的请求，但是下次您要访问同一资源时，应该使用原地址重试。但是如果您获得了一个 <tt class="literal">301</tt> 状态代码和一个新地址，您应该从此使用新地址。
            </p>
            <p>当从 HTTP 服务器接受到一个适当的状态代码时，<tt class="function">urllib.urlopen</tt> 将自动 “<span class="quote">跟踪</span>” 重定向，但不幸的是，当它做了重定向时不会告诉你。
               你将最终获得所请求的数据，却丝毫不会察觉到在这个过程中一个潜在的库 “<span class="quote">帮助</span>” 你做了一次重定向操作。因此你将继续不断地使用旧地址，并且每次都将获得被重定向的新地址。这一过程要往返两次而不是一次：太没效率了！本章的后面，您将看到如何改进这一点，从而适当地且有效率地处理永久重定向。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e27880"></a>11.3.3.&nbsp;<tt class="literal">Last-Modified</tt>/<tt class="literal">If-Modified-Since</tt></h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>有些数据随时都在变化。CNN.com 的主页经常几分钟就更新。另一方面，Google.com 的主页几个星期才更新一次 (当他们上传特殊的假日 logo，或为一个新服务作广告时)。
               Web 服务是不变的：通常服务器知道你所请求的数据的最后修改时间，并且 HTTP 为服务器提供了一种将最近修改数据连同你请求的数据一同发送的方法。
            </p>
            <p>如果你第二次 (或第三次，或第四次) 请求相同的数据，你可以告诉服务器你上一次获得的最后修改日期：在你的请求中发送一个 <tt class="literal">If-Modified-Since</tt> 头信息，它包含了上一次从服务器连同数据所获得的日期。如果数据从那时起没有改变，服务器将返回一个特殊的 HTTP 状态代码 <tt class="literal">304</tt>，这意味着 “<span class="quote">从上一次请求后这个数据没有改变</span>”。这一点有何进步呢？当服务器发送状态编码 <tt class="literal">304</tt> 时，<span class="emphasis"><em>不再重新发送数据</em></span>。您仅仅获得了这个状态代码。所以当数据没有更新时，你不需要一次又一次地下载相同的数据；服务器假定你有本地的缓存数据。
            </p>
            <p>所有现代的浏览器都支持最近修改 (last-modified) 的数据检查。如果你曾经访问过某页，一天后重新访问相同的页时发现它没有变化，并奇怪第二次访问时页面加载得如此之快——这就是原因所在。你的浏览器首次访问时会在本地缓存页面内容，当你第二次访问，浏览器自动发送首次访问时从服务器获得的最近修改日期。服务器简单地返回
               <tt class="literal">304: Not Modified</tt> (没有修改)，因此浏览器就会知道从本地缓存加载页面。在这一点上，Web 服务也如此智能。
            </p>
            <p><span class="application">Python</span> 的 URL 库没有提供内置的最近修改数据检查支持，但是你可以为每一个请求添加任意的头信息并在每一个响应中读取任意头信息，从而自己添加这种支持。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e27915"></a>11.3.4.&nbsp;<tt class="literal">ETag</tt>/<tt class="literal">If-None-Match</tt></h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>ETag 是实现与最近修改数据检查同样的功能的另一种方法：没有变化时不重新下载数据。其工作方式是：服务器发送你所请求的数据的同时，发送某种数据的 hash (在 <tt class="literal">ETag</tt> 头信息中给出)。hash 的确定完全取决于服务器。当第二次请求相同的数据时，你需要在 <tt class="literal">If-None-Match:</tt> 头信息中包含 ETag hash，如果数据没有改变，服务器将返回 <tt class="literal">304</tt> 状态代码。与最近修改数据检查相同，服务器<span class="emphasis"><em>仅仅</em></span> 发送 <tt class="literal">304</tt> 状态代码；第二次将不为你发送相同的数据。在第二次请求时，通过包含 ETag hash，你告诉服务器：如果 hash 仍旧匹配就没有必要重新发送相同的数据，因为你还有上一次访问过的数据。
            </p>
            <p><span class="application">Python</span> 的 URL 库没有对 ETag 的内置支持，但是在本章后面你将看到如何添加这种支持。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e27943"></a>11.3.5.&nbsp;压缩 (Compression)
                     </h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>最后一个重要的 HTTP 特性是 gzip 压缩。
               关于 HTTP web 服务的主题几乎总是会涉及在网络线路上传输的 XML。XML 是文本，而且还是相当冗长的文本，而文本通常可以被很好地压缩。当你通过 HTTP 请求一个资源时，可以告诉服务器，如果它有任何新数据要发送给我时，请以压缩的格式发送。在你的请求中包含
               <tt class="literal">Accept-encoding: gzip</tt> 头信息，如果服务器支持压缩，它将返回由 gzip 压缩的数据并且使用 <tt class="literal">Content-encoding: gzip</tt> 头信息标记。
            </p>
            <p><span class="application">Python</span> 的 URL 库本身没有内置对 gzip 压缩的支持，但是你能为请求添加任意的头信息。<span class="application">Python</span> 还提供了一个独立的 <tt class="filename">gzip</tt> 模块，它提供了对数据进行解压缩的功能。
            </p>
            <p>注意我们用于下载 feed 汇聚的<a href="review.html" title="11.2.&nbsp;避免通过 HTTP 重复地获取数据">小单行脚本</a>并不支持任何这些 HTTP 特性。让我们来看看如何改善它。
            </p>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.debug"></a><a name="debugging.html">11.4.&nbsp;调试 HTTP web 服务
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>首先，让我们开启 <span class="application">Python</span> HTTP 库的调试特性并查看网络线路上的传输过程。这对本章的全部内容都很有用，因为你将添加越来越多的特性。
            </p>
         </div>
         <div class="example"><a name="d0e27980"></a><h3 class="title">例&nbsp;11.3.&nbsp;调试 HTTP</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> httplib</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">httplib.HTTPConnection.debuglevel = 1</span>             <a name="oa.debug.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">feeddata = urllib.urlopen(<span class='pystring'>'http://diveintomark.org/xml/atom.xml'</span>).read()</span>
<span class="computeroutput">connect: (diveintomark.org, 80)</span>                       <a name="oa.debug.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">send: '</span>
<span class="computeroutput">GET /xml/atom.xml HTTP/1.0</span>                            <a name="oa.debug.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">Host: diveintomark.org</span>                                <a name="oa.debug.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">User-agent: Python-urllib/1.15</span>                        <a name="oa.debug.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<span class="computeroutput">'</span>
<span class="computeroutput">reply: 'HTTP/1.1 200 OK\r\n'</span>                          <a name="oa.debug.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
<span class="computeroutput">header: Date: Wed, 14 Apr 2004 22:27:30 GMT</span>
<span class="computeroutput">header: Server: Apache/2.0.49 (Debian GNU/Linux)</span>
<span class="computeroutput">header: Content-Type: application/atom+xml</span>
<span class="computeroutput">header: Last-Modified: Wed, 14 Apr 2004 22:14:38 GMT</span>  <a name="oa.debug.1.7"></a><img src="../images/callouts/7.png" alt="7" border="0" width="12" height="12">
<span class="computeroutput">header: ETag: "e8284-68e0-4de30f80"</span>                   <a name="oa.debug.1.8"></a><img src="../images/callouts/8.png" alt="8" border="0" width="12" height="12">
<span class="computeroutput">header: Accept-Ranges: bytes</span>
<span class="computeroutput">header: Content-Length: 26848</span>
<span class="computeroutput">header: Connection: close</span>
</pre></div>
         <div class="calloutlist">
            
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.useragent"></a><a name="user_agent.html">11.5.&nbsp;设置 <tt class="literal">User-Agent</tt></a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>改善你的 HTTP web 服务客户端的第一步就是用 <tt class="literal">User-Agent</tt> 适当地鉴别你自己。为了做到这一点，你需要远离基本的 <tt class="filename">urllib</tt> 而深入到 <tt class="filename">urllib2</tt>。
            </p>
         </div>
         <div class="example"><a name="d0e28175"></a><h3 class="title">例&nbsp;11.4.&nbsp;<tt class="filename">urllib2</tt> 介绍
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> httplib</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">httplib.HTTPConnection.debuglevel = 1</span>                             <a name="oa.useragent.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib2</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">request = urllib2.Request(<span class='pystring'>'http://diveintomark.org/xml/atom.xml'</span>)</span> <a name="oa.useragent.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">opener = urllib2.build_opener()</span>                                   <a name="oa.useragent.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">feeddata = opener.open(request).read()</span>                            <a name="oa.useragent.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">connect: (diveintomark.org, 80)</span>
<span class="computeroutput">send: '</span>
<span class="computeroutput">GET /xml/atom.xml HTTP/1.0</span>
<span class="computeroutput">Host: diveintomark.org</span>
<span class="computeroutput">User-agent: Python-urllib/2.1</span>
<span class="computeroutput">'</span>
<span class="computeroutput">reply: 'HTTP/1.1 200 OK\r\n'</span>
<span class="computeroutput">header: Date: Wed, 14 Apr 2004 23:23:12 GMT</span>
<span class="computeroutput">header: Server: Apache/2.0.49 (Debian GNU/Linux)</span>
<span class="computeroutput">header: Content-Type: application/atom+xml</span>
<span class="computeroutput">header: Last-Modified: Wed, 14 Apr 2004 22:14:38 GMT</span>
<span class="computeroutput">header: ETag: "e8284-68e0-4de30f80"</span>
<span class="computeroutput">header: Accept-Ranges: bytes</span>
<span class="computeroutput">header: Content-Length: 26848</span>
<span class="computeroutput">header: Connection: close</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.etags"></a><a name="etags.html">11.6.&nbsp;处理 <tt class="literal">Last-Modified</tt> 和 <tt class="literal">ETag</tt></a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>既然你知道如何在你的 web 服务请求中添加自定义的 HTTP 头信息，接下来看看如何添加 <tt class="literal">Last-Modified</tt> 和 <tt class="literal">ETag</tt> 头信息的支持。
            </p>
         </div>
         <p>下面的这些例子将以调试标记置为关闭的状态来显示输出结果。如果你还停留在上一部分的开启状态，可以使用 <tt class="literal">httplib.HTTPConnection.debuglevel = 0</tt> 将其设置为关闭状态。或者，如果你认为有帮助也可以保持为开启状态。
         </p>
         <div class="example"><a name="oa.etags.example.1"></a><h3 class="title">例&nbsp;11.6.&nbsp;测试 <tt class="literal">Last-Modified</tt></h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib2</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">request = urllib2.Request(<span class='pystring'>'http://diveintomark.org/xml/atom.xml'</span>)</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">opener = urllib2.build_opener()</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">firstdatastream = opener.open(request)</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">firstdatastream.headers.dict</span>                       <a name="oa.etags.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">{'date': 'Thu, 15 Apr 2004 20:42:41 GMT', 
 'server': 'Apache/2.0.49 (Debian GNU/Linux)', 
 'content-type': 'application/atom+xml',
 'last-modified': 'Thu, 15 Apr 2004 19:45:21 GMT', 
 'etag': '"e842a-3e53-55d97640"',
 'content-length': '15955', 
 'accept-ranges': 'bytes', 
 'connection': 'close'}</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">request.add_header(<span class='pystring'>'If-Modified-Since'</span>,</span>
<tt class="prompt">...     </tt><span class="userinput">firstdatastream.headers.get(<span class='pystring'>'Last-Modified'</span>))</span>  <a name="oa.etags.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">seconddatastream = opener.open(request)</span>            <a name="oa.etags.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="traceback">Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
  File "c:\python23\lib\urllib2.py", line 326, in open
    '_open', req)
  File "c:\python23\lib\urllib2.py", line 306, in _call_chain
    result = func(*args)
  File "c:\python23\lib\urllib2.py", line 901, in http_open
    return self.do_open(httplib.HTTP, req)
  File "c:\python23\lib\urllib2.py", line 895, in do_open
    return self.parent.error('http', req, fp, code, msg, hdrs)
  File "c:\python23\lib\urllib2.py", line 352, in error
    return self._call_chain(*args)
  File "c:\python23\lib\urllib2.py", line 306, in _call_chain
    result = func(*args)
  File "c:\python23\lib\urllib2.py", line 412, in http_error_default
    raise HTTPError(req.get_full_url(), code, msg, hdrs, fp)
urllib2.HTTPError: HTTP Error 304: Not Modified</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.redirect"></a><a name="redirects.html">11.7.&nbsp;处理重定向
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你可以使用两种不同的自定义 URL 处理器来处理永久重定向和临时重定向。</p>
         </div>
         <p>首先，让我们来看看重定向处理的必要性。</p>
         <div class="example"><a name="d0e28926"></a><h3 class="title">例&nbsp;11.10.&nbsp;没有重定向处理的情况下，访问 web 服务 </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib2, httplib</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">httplib.HTTPConnection.debuglevel = 1</span>           <a name="oa.redirect.1.0"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">request = urllib2.Request(</span>
<tt class="prompt">...     </tt><span class="userinput"><span class='pystring'>'http://diveintomark.org/redir/example301.xml'</span>)</span> <a name="oa.redirect.1.1"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">opener = urllib2.build_opener()</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f = opener.open(request)</span>
<span class="computeroutput">connect: (diveintomark.org, 80)
send: '
GET /redir/example301.xml HTTP/1.0
Host: diveintomark.org
User-agent: Python-urllib/2.1
'
reply: 'HTTP/1.1 301 Moved Permanently\r\n'</span>             <a name="oa.redirect.1.2"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">header: Date: Thu, 15 Apr 2004 22:06:25 GMT
header: Server: Apache/2.0.49 (Debian GNU/Linux)
header: Location: http://diveintomark.org/xml/atom.xml</span>  <a name="oa.redirect.1.3"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">header: Content-Length: 338
header: Connection: close
header: Content-Type: text/html; charset=iso-8859-1
connect: (diveintomark.org, 80)
send: '
GET /xml/atom.xml HTTP/1.0</span>                              <a name="oa.redirect.1.4"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<span class="computeroutput">Host: diveintomark.org
User-agent: Python-urllib/2.1
'
reply: 'HTTP/1.1 200 OK\r\n'
header: Date: Thu, 15 Apr 2004 22:06:25 GMT
header: Server: Apache/2.0.49 (Debian GNU/Linux)
header: Last-Modified: Thu, 15 Apr 2004 19:45:21 GMT
header: ETag: "e842a-3e53-55d97640"
header: Accept-Ranges: bytes
header: Content-Length: 15955
header: Connection: close
header: Content-Type: application/atom+xml</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.url</span>                                               <a name="oa.redirect.1.5"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
<span class="computeroutput">'http://diveintomark.org/xml/atom.xml'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.headers.dict</span>
<span class="computeroutput">{'content-length': '15955', 
'accept-ranges': 'bytes', 
'server': 'Apache/2.0.49 (Debian GNU/Linux)', 
'last-modified': 'Thu, 15 Apr 2004 19:45:21 GMT', 
'connection': 'close', 
'etag': '"e842a-3e53-55d97640"', 
'date': 'Thu, 15 Apr 2004 22:06:25 GMT', 
'content-type': 'application/atom+xml'}</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.status</span>
<span class="traceback">Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in ?
AttributeError: addinfourl instance has no attribute 'status'</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.gzip"></a><a name="gzip_compression.html">11.8.&nbsp;处理压缩数据
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你要支持的最后一个重要的 HTTP 特性是压缩。许多 web 服务具有发送压缩数据的能力，这可以将网络线路上传输的大量数据消减 60% 以上。这尤其适用于 XML web 服务，因为 XML 数据 的压缩率可以很高。</p>
         </div>
         <p>服务器不会为你发送压缩数据，除非你告诉服务器你可以处理压缩数据。</p>
         <div class="example"><a name="d0e29332"></a><h3 class="title">例&nbsp;11.14.&nbsp;告诉服务器你想获得压缩数据</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib2, httplib</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">httplib.HTTPConnection.debuglevel = 1</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">request = urllib2.Request(<span class='pystring'>'http://diveintomark.org/xml/atom.xml'</span>)</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">request.add_header(<span class='pystring'>'Accept-encoding'</span>, <span class='pystring'>'gzip'</span>)</span>        <a name="oa.gzip.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">opener = urllib2.build_opener()</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f = opener.open(request)</span>
<span class="computeroutput">connect: (diveintomark.org, 80)
send: '
GET /xml/atom.xml HTTP/1.0
Host: diveintomark.org
User-agent: Python-urllib/2.1
Accept-encoding: gzip</span>                                    <a name="oa.gzip.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">'
reply: 'HTTP/1.1 200 OK\r\n'
header: Date: Thu, 15 Apr 2004 22:24:39 GMT
header: Server: Apache/2.0.49 (Debian GNU/Linux)
header: Last-Modified: Thu, 15 Apr 2004 19:45:21 GMT
header: ETag: "e842a-3e53-55d97640"
header: Accept-Ranges: bytes
header: Vary: Accept-Encoding
header: Content-Encoding: gzip</span>                           <a name="oa.gzip.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">header: Content-Length: 6289</span>                             <a name="oa.gzip.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">header: Connection: close
header: Content-Type: application/atom+xml</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.alltogether"></a><a name="alltogether.html">11.9.&nbsp;全部放在一起
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你已经看到了构造一个智能的 HTTP web 客户端的所有片断。现在让我们看看如何将它们整合到一起。</p>
         </div>
         <div class="example"><a name="d0e29670"></a><h3 class="title">例&nbsp;11.17.&nbsp;<tt class="function">openanything</tt> 函数
            </h3>
            <p>这个函数定义在 <tt class="filename">openanything.py</tt> 中。
            </p><pre class="programlisting"><span class='pykeyword'>
def</span> openAnything(source, etag=None, lastmodified=None, agent=USER_AGENT):
    <span class='pycomment'># non-HTTP code omitted for brevity</span>
    <span class='pykeyword'>if</span> urlparse.urlparse(source)[0] == <span class='pystring'>'http'</span>:                                       <a name="oa.alltogether.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        <span class='pycomment'># open URL with urllib2                                                     </span>
        request = urllib2.Request(source)                                           
        request.add_header(<span class='pystring'>'User-Agent'</span>, agent)                                      <a name="oa.alltogether.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        <span class='pykeyword'>if</span> etag:                                                                    
            request.add_header(<span class='pystring'>'If-None-Match'</span>, etag)                                <a name="oa.alltogether.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
        <span class='pykeyword'>if</span> lastmodified:                                                            
            request.add_header(<span class='pystring'>'If-Modified-Since'</span>, lastmodified)                    <a name="oa.alltogether.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
        request.add_header(<span class='pystring'>'Accept-encoding'</span>, <span class='pystring'>'gzip'</span>)                                <a name="oa.alltogether.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
        opener = urllib2.build_opener(SmartRedirectHandler(), DefaultErrorHandler()) <a name="oa.alltogether.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
        <span class='pykeyword'>return</span> opener.open(request)                                                  <a name="oa.alltogether.1.7"></a><img src="../images/callouts/7.png" alt="7" border="0" width="12" height="12">
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="oa.summary"></a><a name="summary.html">11.10.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="filename">openanything.py</tt> 及其函数现在可以完美地工作了。
            </p>
         </div>
         <p>每个客户端都应该支持 HTTP web 服务的以下 5 个重要特性：</p>
         <div class="itemizedlist">
            <ul>
               <li><a href="user_agent.html" title="11.5.&nbsp;设置 User-Agent">通过设置适当的 <tt class="literal">User-Agent</tt></a> 识别你的应用。
               </li>
               <li>适当地处理<a href="redirects.html" title="11.7.&nbsp;处理重定向">永久重定向</a>。
               </li>
               <li>支持 <a href="etags.html" title="11.6.&nbsp;处理 Last-Modified 和 ETag"><tt class="literal">Last-Modified</tt> 日期检查</a>从而避免在数据未改变的情况下重新下载数据。
               </li>
               <li>支持 <a href="etags.html#oa.etags.example" title="例&nbsp;11.9.&nbsp;支持 ETag/If-None-Match"><tt class="literal">ETag</tt> hash</a> 从而避免在数据未改变的情况下重新下载数据。
               </li>
               <li>支持 <a href="gzip_compression.html" title="11.8.&nbsp;处理压缩数据">gzip 压缩</a>从而在数据<span class="emphasis"><em>已经</em></span> 改变的情况下尽可能地减少传输带宽。
               </li>
            </ul>
         </div>
      </div>
      
