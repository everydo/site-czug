---
created: 2006-01-05 11:09:02
creator: eishn
description: 不看标准文档，用程序来代替，是另一种闭门造车吧
title: 沈著初级 CGI：原理
---
<h1>沈著初级 CGI：原理</h1>
<p>        CGI 即通用网关接口，用于实现服务器与客户的交互。众所周知，CGI 是一项面向 Web 的应用技术。本文试图通过研究 CGI 所依赖的底层技术，逐而由下至上地窥取其各个层次的实现及工作原理，以获得 CGI 技术的全貌。<br />        这里假设大家已经对 CGI 的各个层次及方面已经有了相当的了解。起码对 HTTP 协议及 CGI 技术在 Web 中的应用已有初步了解。这里对于 CGI 的非原理性的基本知识便不再赘述了。<br />        本文主张用程序说话，使用了 Python 语言技术来进行探索性的实验，包括模拟 CGI 环境、获取网络报文，以至进行原理的模拟实现。其代码都已经过调试被证明是可用的。关于 Python 语言本身，这里就不做讲解了。<br />        文中所列一切文本及代码，或者是其他资源，全部是通过实地实验获得，绝无二手或抄袭。是为完全可信之资料。其中，因篇幅之限，某些内容有所删节。</p>
<p><strong>第一章 CGI 实现原理</strong><br />        这一章，首先关注的是 CGI 的基本原理，特别是协议相关的这部分内容。</p>
<p><strong>第一节 CGI 用户变量在 HTTP/TCP 协议上的传输</strong><br /><strong>        </strong>CGI 是一种面向 Web 的应用技术。很久之前，Web 服务仅仅能够实现服务器端向客户端传递信息的功能，这是单向的，缺乏交互性的。然后CGI 技术被开发出来，其核心的目的是通过实现“客户端向服务器传递信息的机制”，来给 Web 加上交互性。<br />        由此，我们可以看出，CGI 技术的核心便是“客户端向服务器传递信息的机制”。欲得到 CGI 的工作原理，首先便要获得这个机制的实现原理。<br />        
熟悉 CGI 编程的大家应该知道 CGI 程序与一般的 Web 响应程序的不同就在于：CGI 程序可以从服务器上得到 CGI 环境变量——所谓
CGI 环境变量，便是从客户机上传输而来的数据。而 CGI 变量是如何通过网络来传输的呢？我们知道 CGI 是架设在基础 Web
请求与响应之上的，因此，通过分析带有 CGI 变量的 Web 传输报文，也许便可以得到 CGI 变量的传输机制。<br />        我们都知道，Web 是使用 HTTP 协议在网上传输的，所以在这里，可以首先获取无 CGI 变量传输的 HTTP 报文，然后与带有 CGI 变量传输的 HTTP 报文相比较、分析，从而获得 CGI 变量的传输机制。<br />        这里我们需要两个工具，一个是客户机，用于发送标准的 HTTP 报文以请求服务器响应；另一个是服务器程序，用于接收客户机报文，并显示出来——当然，功能仅此而已。<br />        幸运的是，这里很快便可以找到一打合适的，非常标准的客户机：浏览器。比如 IE 或者是 Mozilla (Eishn 当时写下此文时伟大的 FireFox 还未出世呢)，或者是其他的浏览器程序，它们都可以。<br />        至于服务器，因为 HTTP 协议的基础是 TCP 传输，所以需要编写一个 TCP 服务器 （而非所谓 HTTP 服务器）才能获取 Web 请求报文的全貌。首要任务，便是把这个服务器程序实现出来：</p>
<blockquote><p><i>“””<br /> TCPServer1.py<br /> TCP 服务器程序，支持 IPv4 及 IPv6 下的 TCP 传输。<br /> 本程序主要用于 HTTP 报文的截取及显示。<br /> 沈崴参考了《Python Documentation Release 2.3.4 May 20, 2004》<br />   文献中关于 Socket 的代码<br /> 2004-7-20</i></p><p><i>“””</i></p><p><b>import</b> socket<br /><b>import</b> sys</p><p>HOST = ''        <i># 绑定到本机地址，可以使用 127.0.0.1 访问</i><br />PORT = 80      <i># 默认 HTTP 服务监听端口</i><br />s = None<br /><b>for</b> res <b>in</b> socket.getaddrinfo(HOST, PORT, socket.AF_UNSPEC, socket.SOCK_STREAM, 0, socket.AI_PASSIVE):<br />    af, socktype, proto, canonname, sa = res<br />s = socket.socket(af, socktype, proto)<br />s.bind(sa)<br />s.listen(1)<br /><b>break</b><br />conn, addr = s.accept()<br /><b>while</b> 1:<br />    data = conn.recv(1024)<br />    <b>if</b> <b>not</b> data: <b>break</b><br />    <b>print</b> data,         <i># 显示接收到的数据</i><br />conn.close()</p></blockquote>



<p>        接下来的第一步，便是获取基本 HTTP 请求报文。基本做法是使用浏览器发送一条简单的 URL
请求，并用上面的程序截取它。在这里，实验所用的操作系统为“Microsoft Windows 2000
5.00.2195”。第一次请求使用的浏览器为”Microsoft Internet Explorer
6.0.2800.1106”，第二次请求使用的浏览器是”Lynx Version 2.8.4re1.1 (17 Jul 2001)”。发送的
URL 请求为 “http://127.0.0.1/file”。<br />        因为服务器不返回响应数据，因此，在实验中浏览器会陷入长等（阻塞)。这里，直接关闭浏览器以完成实验，而此时，服务器会发现连接意外中断，抛出异常并退出。其间，我们可以从屏幕获取实验数据，即基本 HTTP 请求报文：</p>
<p>使用 IE 的报文：<br /></p><blockquote><b>GET /file HTTP/1.1<br />Accept:
image/gif, image/x-xbitmap, image/jpeg, image/pjpeg,
application/vnd.ms-excel, application/msword,
application/x-shockwave-flash, application/vnd.ms-powerpoint, */*<br />Accept-Language: zh-cn<br />Accept-Encoding: gzip, deflate<br />User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705)<br />Host: 127.0.0.1<br />Connection: Keep-Alive</b></blockquote><p></p>
<p><br />使用 Lynx 的报文：<br /></p><blockquote><b>GET /file HTTP/1.0<br />Host: 127.0.0.1<br />Accept: text/html, text/plain, text/sgml, */*;q=0.01<br />Accept-Encoding: gzip, compress<br />Accept-Language: en<br />User-Agent: Lynx/2.8.4rel.1 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.6b</b></blockquote>
<p>        我们可以在第一行 ”GET /file HTTP/1.x” 中找到所要请求的文件 “file”，及用到的 HTTP 版本 “HTTP/1.x” 。<br />        
其他部分，基本上是不言自明的。但是 IE
浏览器发送的最后一行信息是特别需要关注的，它的意思是：“保持连接”——所谓保持连接，它的作用是告诉服务器继续保持 TCP
连接，把客户机要求的“后文”发送出去。而 Lynx 浏览器虽然保持了 TCP 连接但是并没有发出这行信息，可知保持连接是 Web
发出第一条请求之后两端的默认动作。<br />        通常服务器之后要做的事情便是把 “/file” 文件传输到客户端。那么是否可以使用
TCP
直接发送呢？为了验证该想法，编写一个程序，向浏览器发送数据，来观察效果。下面的这个服务器利用“浏览器简单请求报文”结尾的空串，来得到响应的发送时
机，使用 socket send 向客户端发送：”&lt;html&gt;Hello from
TCPServer2.py&lt;/html&gt;”。</p>
<blockquote><p><i>"""<br /> TCPServer2.py<br /> TCP 服务器程序，模拟 HTTP 服务器，忽略请求内容，一律响应:<br />   Hello from TCPServer2.py<br /> 本程序主要用于 HTTP 报文的截取及显示。<br /> 沈崴编制<br /> 2004-7-20</i></p><p><i>"""</i></p><p>RESPONSE = "&lt;html&gt;Hello from TCPServer2.py&lt;/html&gt;"</p><p><b>import</b> socket<br /><b>import</b> sys<br /><b>import</b> string</p><p>HOST = ''        <i># 绑定到本机地址，可以使用 127.0.0.1 访问</i><br />PORT = 80      <i># 默认 HTTP 服务监听端口</i><br />s = None<br /><b>for</b> res <b>in</b> socket.getaddrinfo(HOST, PORT, socket.AF_UNSPEC, socket.SOCK_STREAM, 0, socket.AI_PASSIVE):<br />    af, socktype, proto, canonname, sa = res<br />    s = socket.socket(af, socktype, proto)<br />    s.bind(sa)<br />    s.listen(1)<br />    <b>break</b><br />conn, addr = s.accept()<br />file = conn.makefile()<br />data = file.readline()<br /><b>while</b> string.strip(data) != '':<br />    data = file.readline()<br />conn.send( RESPONSE )<br />conn.close()</p></blockquote>




<p> 结果是服务器发送完数据后自动断开连接，并推出，而浏览器的输出正如预期的那样：</p>
<blockquote><p><b>Hello from TCPServer2.py</b></p></blockquote>
<p>        然而标准的 HTTP
服务器是否也是以类似的方法来直接发送信息的呢？为了了解其工作方式，这里需要截取其响应报文来进行分析。为此我们必须装配一个可以模拟发送浏览器请求报
文的客户机，同时可以用它来接收和显示服务器响应。除此之外，我们还需要一个标准的 HTTP 服务器，用它来发出标准响应。<br />        HTTP 服务器有很多，比如著名的 Apache 以及 MS IIS。这里，为了简单起见，使用 Python 标准库中的 SimpleHTTPServer.py 程序。另外，还需要一个可有可无的 test.html 用于测试文件传输：</p>
<blockquote><p><i>&lt;!-test.html --&gt;</i><br /><b>&lt;html&gt;</b>Hello from SimpleHTTPServer.py<b>&lt;/html&gt;</b></p></blockquote>
<p> 为了获得服务器响应报文，这里同样编写了一个 TCP 客户端，它向服务器请求文件 “test.html”：</p>
<blockquote><p><i>“””<br /> TCPClient1.py<br /> TCP 服务器程序，支持 IPv4 及 IPv6 下的 TCP 传输。<br /> 本程序主要用于 本地 HTTP 服务器报文的截取及显示。<br /> 沈崴参考了《Python Documentation Release 2.3.4 May 20, 2004》<br />   文献中关于 Socket 的代码<br /> 2004-7-20</i></p><p><i>“””</i></p><p><b>import</b> socket<br /><b>import</b> sys</p><p>HOST = '127.0.0.1'     <i># 本地服务器地址，即回传地址</i><br />PORT = 8000         <i># 服务器端口</i></p><p><i>#  截取的 Lynx 浏览器请求报文</i><br />HEAD = """GET /test.html HTTP/1.0<br />Host: 127.0.0.1<br />Accept: text/html, text/plain, text/sgml, */*;q=0.01<br />Accept-Encoding: gzip, compress<br />Accept-Language: en<br />User-Agent: Lynx/2.8.4rel.1 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.6b<br />"""</p><p>s = None<br /><b>for</b> res <b>in</b> socket.getaddrinfo(HOST, PORT, socket.AF_UNSPEC, socket.SOCK_STREAM):<br />    af, socktype, proto, canonname, sa = res<br />    s = socket.socket(af, socktype, proto)<br />    s.connect(sa)<br />    <b>break</b><br />s.send(HEAD)<br />data = s.recv(1024)<br /><b>while</b> data:<br />    <b>print</b> data,<br />    data = s.recv(1024)<br />s.close()</p></blockquote>





<p> 程序截取到的服务器响应为：</p>
<blockquote><p><b>HTTP/1.0 200 OK<br />Server: SimpleHTTP/0.6 Python/2.3.4<br />Date: Tue, 20 Jul 2004 08:00:45 GMT<br />Content-type: text/html<br />Content-Length: 60</b></p><p><b>&lt;!-test.html --&gt;<br />&lt;html&gt;Hello from SimpleHTTPServer.py&lt;/html&gt;</b></p></blockquote>

<p>        很明显，第一部分是 HTTP 头信息，其第一行告诉“浏览器”响应成功，其余部分则是不言自明。其第二部分即是“test.html”的正文。<br />        再次使用浏览器向 SimpleHTTPServer.py 请求 “test.html” ，文件传输成功，连接正常中断。<br />        至此，我们已经完全将静态 Web 在 HTTP/TCP 上的传输模拟出来了。下面要做的，便是将 CGI 变量加入 HTTP/TCP 传输中。<br />        CGI 变量，具有两种极为著名的传输模式，即 GET 模式和 POST 模式。这里，首先研究 GET 模式。<br />        
利用上面的报文截取程序 TCPServer1.py
我们已经可以很轻松地获取浏览器的请求报文了。根据常识，客户机向服务器发送的数据，必然会在请求报文中，包括 GET 和 POST 数据。为了获取
GET 数据的位置，这里使用一个以 GET 方式工作的 form：</p>
<blockquote><p>&lt;form action=http://127.0.0.1 method=”GET”&gt;<br />&lt;input type=”HIDDEN” name=”line” value=”+======+”&gt;<br />&lt;textarea name=”multiline” style=”visibility:hidden;”&gt;<br />+------+<br />|      |<br />|      |<br />+------+<br />&lt;/textarea&gt;<br />&lt;input type=”SUBMIT”&gt;<br />&lt;/form&gt;</p></blockquote>
<p> 使用浏览器提交该 form 可以截得其报文为：</p>
<blockquote><p><b>GET
/?line=%2B%3D%3D%3D%3D%3D%3D%2B&amp;multiline=%2B------%2B%0D%0A%7C++++++%7C%0D%0A%7C++++++%7C%0D%0A%2B------%2B%0D%0A
HTTP/1.1<br />Accept: image/gif, image/x-xbitmap, image/jpeg,
image/pjpeg, application/vnd.ms-excel, application/msword,
application/x-shockwave-flash, application/vnd.ms-powerpoint, */*<br />Accept-Language: zh-cn<br />Accept-Encoding: gzip, deflate<br />User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705)<br />Host: 127.0.0.1<br />Connection: Keep-Alive</b></p></blockquote>
<p>        其第一行“GET /?line=%2B。。。”便是 CGI 数据的所在地，“?” 表示 CGI
变量的出现位置，”&amp;” 以分割各个变量。变量与取值之间用 ”=” 分割。其一大特色是特殊字符已经全部编码（比如特殊用途的空格、?、=
以及 &amp; 等）。最终，所有的数据被连接成一行字串，出现在首行。<br />下面便是用于测试 POST 传输方式的 form：</p>
<blockquote><p>&lt;form action=http://127.0.0.1 method=”GET”&gt;<br />&lt;input type=”HIDDEN” name=”line” value=”+======+”&gt;<br />&lt;textarea name=”multiline” style=”visibility:hidden;”&gt;<br />+------+<br />|      |<br />|      |<br />+------+<br />&lt;/textarea&gt;<br />&lt;input type=”SUBMIT”&gt;<br />&lt;/form&gt;</p></blockquote>
<p> 浏览器可以取得其报文为：</p>
<blockquote><p><b>POST / HTTP/1.1<br />Accept: image/gif,
image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel,
application/msword, application/x-shockwave-flash,
application/vnd.ms-powerpoint, */*<br />Accept-Language: zh-cn<br />Content-Type: application/x-www-form-urlencoded<br />Accept-Encoding: gzip, deflate<br />User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705)<br />Host: 127.0.0.1<br />Content-Length: 112<br />Connection: Keep-Alive<br />Cache-Control: no-cache</b></p><p><b>line=%2B%3D%3D%3D%3D%3D%3D%2B&amp;multiline=%2B------%2B%0D%0A%7C++++++%7C%0D%0A%7C++++++%7C%0D%0A%2B------%2B%0D%0A</b></p></blockquote>

<p>        完全不同的是其 CGI 变量从第一行转移到了末尾，成为新增的请求正文（Content）。其长度在头部新增的 Content-Length 部分被充分说明。另外的一个显著变化是第一行的 GET 变成了 POST。<br />        当服务器获取到这些报文时首先从第一行的字符中获取 CGI 变量的传输方式，然后按照请求的变量传输模式——GET 或者是 POST 模式——选择变量的解析策略。最后可以将变量的“键值对”还原。</p>
<p><strong>第二节 HTTP/CGI 报文编码与HTTP/CGI报文解析<br /></strong>        初步地了解了 CGI 的数据在网络上的传输原理之后，接下来要探讨的便是其数据的编码与解析原理。<br />        这里，首先让我们来对已经获得的HTTP 报文做一下更进一步的分析。<br />        可以发现HTTP报文总是分为两个组成部分：头部，以及正文部分。而头部是由多个信息行组成的，它描述了报文的方方面面。值得注意的是截取的各个信息行之间不存在空行。事实上，空行已经被利用为头部与正文的分界符。<br />        
这种设计，可以理解为是出于效率及简化服务器算法的考虑。以 ”新行”
字符作为信息行结束标识符可以让服务器使用缓冲区对行数据进行全行解析。而在遭遇空行时，服务器即进入正文解析——对 CGI 而言，只有 POST
数据的时候才会进入正文解析模式——而进行 POST 变量解析。<br />        下面，就来实现一个简单的报文解析器，它的作用就是将关键数据抽取出来，整理成程序易于使用的数据结构（有部分省略）：</p>
<blockquote><p><i>“””<br /> Paraser1.py<br /> 编码解析程序<br /> 本程序主要用于 HTTP/CGI 数据的初步解码<br /> 沈崴编制<br /> 2004-7-22</i></p><p><i>“””</i></p><p>MSG = “””POST / HTTP/1.1<br />Accept: image/gif,
image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel,
application/msword, application/x-shockwave-flash,
application/vnd.ms-powerpoint, */*<br />…<br />Cache-Control: no-cache</p><p>line=%2B%3D%3D%3D%3D%3D%3D%2B&amp;multiline=%2B------%2B%0D%0A%7C++++++%7C%0D%0A%7C++++++%7C%0D%0A%2B------%2B%0D%0A”””</p><p>import re       # 出于简化的目的，使用时临时编译模式字符，有巨大效率问题，可采用 string.split<br />import string</p><p>ENV = {}<br />CONTENT = ""<br />IS_GET  = False<br />IS_POST = False</p><p>n = 0 - 1<br />list = re.split( "\n", MSG, 255 )<br />l = len(list)<br />for item in list:<br />    n += 1</p><p>    data = string.strip(item)<br />    if data=="":  # 遇空行，开始录入正文<br />        if ( n + 1 ) &lt;= ( l - 1 ):<br />            CONTENT = list[ n + 1 ]<br />        break</p><p>    list2 = re.split(" ", data, 2)<br />    if len(list2) == 3:<br />        h = list2[0]<br />        if h in ["POST", "GET", "post", "get"]:<br />            if h in ["GET" , "get" ]:<br />                IS_GET  = True<br />            if h in ["POST", "post"]:<br />                IS_POST = True<br />            ENV.update( {"METHOD"       : list2[0]} )<br />            ENV.update( {"REQUIRE_STR"  : list2[1]} )<br />            ENV.update( {"HTTP_VERSION" : list2[2]} )<br />            continue</p><p>    list2 = re.split(":", data, 1)<br />    if len(list2) == 2:<br />        list3 = re.split( "-", list2[0], 1 )<br />        if len(list3) == 2:<br />            k = "HTTP_" + string.upper( string.strip(list2[0]) )<br />        else:<br />            k = string.strip(list2[0])<br />        v = string.strip(list2[1])<br />        ENV.update( { k : v } )</p><p>if IS_GET:<br />    list = re.split(r"\?", ENV["REQUIRE_STR"], 1)<br />    if len(list) == 2:<br />        ENV.update( { "REQUIRE_RES" : list[0] } )<br />        <br />        list2 = re.split( "&amp;", list[1], 255 )<br />        for item in list2:<br />            list3 = re.split("=", item)<br />            if len(list3) == 2:<br />                k = string.strip(list3[0])  # 未转化传输字符<br />                v = string.strip(list3[1])  # 未转化传输字符<br />                ENV.update( { k : v } )<br />if IS_POST:<br />    list = re.split( "&amp;", CONTENT, 1024 )<br />    for item in list:<br />        list2 = re.split("=", item)<br />        if len(list2) == 2:<br />            k = string.strip(list2[0])  # 未转化传输字符<br />            v = string.strip(list2[1])  # 未转化传输字符<br />            ENV.update( { k : v } )<br />print "ENVs:"<br />for key in ENV.keys():<br />    print "  ENV[\"" + key + "\"] = " + ENV[key]<br />print "CONTENT = " + CONTENT</p></blockquote>










<p>        得到程序输出：</p>
<blockquote><p>ENVs:<br />  ENV["HTTP_CONTENT-LENGTH"] = 112<br />  ENV["HTTP_CACHE-CONTROL"] = no-cache<br />  ENV["HTTP_VERSION"] = HTTP/1.1<br />  ENV["Connection"] = Keep-Alive<br /> 
ENV["Accept"] = image/gif, image/x-xbitmap, image/jpeg, image/pjpeg,
application/vnd.ms-excel, application/msword,
application/x-shockwave-flash, application/vnd.ms-powerpoint, */*<br />  ENV["METHOD"] = POST<br />  ENV["Host"] = 127.0.0.1<br />  ENV["multiline"] = %2B------%2B%0D%0A%7C++++++%7C%0D%0A%7C++++++%7C%0D%0A%2B------%2B%0D%0A<br />  ENV["HTTP_ACCEPT_LANGUAGE"] = zh-cn<br />  ENV["REQUIRE_STR"] = /<br />  ENV["HTTP_CONTENT_TYPE"] = application/x-www-form-urlencoded<br />  ENV["line"] = %2B%3D%3D%3D%3D%3D%3D%2B<br />  ENV["HTTP_USER_AGENT"] = Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705)<br />  ENV["HTTP_ACCEPT_ENCODING"] = gzip, deflate<br />CONTENT = line=%2B%3D%3D%3D%3D%3D%3D%2B&amp;multiline=%2B------%2B%0D%0A%7C++++++%7C%0D%0A%7C++++++%7C%0D%0A%2B------%2B%0D%0A</p></blockquote>
<p>        这里，已经将报头及正文的数据分析出来，并设置到数组 ENV 及变量 CONTENT 中。将来通过 ENV 数组，服务器可以将数据提交给处理这些变量。<br />        最后一步，是将类似于 %n 这样的 CGI 数据还原成其原来的字符。据分析，%为转义字符，后接“不适合传输及编码的字符”的“十六进制 ASCII 码对应数值”。唯一例外的是空格字符，它往往被编码成 “+”。依此，可以设计出解码器：</p>
<blockquote><p>“””<br /> Paraser2.py<br /> 解码程序<br /> 本程序主要用于 HTTP/CGI 编码字符的解码<br /> 其中用到的是最清晰的而非是最优化的算法<br /> 沈崴编制<br /> 2004-7-22</p><p>“””</p><p>CODE = r"line=%2B%3D%3D%3D%3D%3D%3D%2B&amp;multiline=%2B------%2B%0D%0A%7C++++++%7C%0D%0A%7C++++++%7C%0D%0A%2B------%2B%0D%0A"</p><p>import string</p><p>IS_READ_HEX = False<br />HEX = 0<br />HEX_BIT = 0<br />ASCII_Z = ord("0")<br />ASCII_N = ord("9")<br />ASCII_A = ord("A")<br />s = ""<br />for c in CODE:<br />    if IS_READ_HEX:<br />        asc_c = ord( string.upper(c) )<br />        if asc_c - ASCII_N &gt; 0:<br />            n = 10 + asc_c - ASCII_A<br />        else:<br />            n = asc_c - ASCII_Z<br />        if HEX_BIT == 1:<br />            HEX += n<br />            s += chr(HEX)<br />            IS_READ_HEX = False<br />        else:<br />            HEX += n*16<br />            HEX_BIT += 1<br />        continue<br />    if c == "%":<br />        IS_READ_HEX = True<br />        HEX = 0<br />        HEX_BIT = 0<br />        continue<br />    if c == "+":<br />        s += ' '<br />        continue<br />    s += c</p><p>print s</p></blockquote>





<p> 程序的运行结果是：</p>
<blockquote><p><b>line=+======+&amp;multiline=+------+<br />|      |<br />|      |<br />+------+</b></p></blockquote>
<p>        至此，已经完成了 HTTP/CGI 数据的解码。而数据编码是解码的逆过程，只是相比而言要简单得多了。在此便不涉及了。</p>
<p><strong>第三节 文件传输及编码效率</strong><br />        研究过 HTTP/CGI
数据的编码之后，不免会对编码的效率产生疑问。很明显，HTTP/CGI 的编码方案的核心是清晰易用，而非效率。从十六进制的字符代换规则上来讲，1
个 ASCII 字符被转换成 3
个字符（#XX），从而使数据膨胀了三倍。用该编码规则来传输字符数据的优势是明显的，它的报文极为清晰，而且甚至是人工可读的，同时传输的数据膨胀得也
不太多。但是将它用于传输大型的，特别是二进制的文件却是非常不明智的。象二进制的文件，大多数的数据是需要转换的非显示字符，所以数据会明显地膨胀。<br />        因此，可以假定 HTTP/CGI 对文件的传输采用了更为高效的编码。<br />        这里，就试着使用前面的报文截取工具来截取包含文件的传输报文——首先上场的是文本文件。下面就使用 IE 来进行文件发送。<br />        这是发送的文件的内容（这里取名为 doc.gif ，当然，不是图片）：</p>
<p><a href="mailto:1234abcd%21@#$">1234abcd!@#$</a>()-=:”</p>
<p> 这是发送表单：</p>
<p>&lt;html&gt;<br />&lt;form enctype="multipart/form-data" action="<a href="http://127.0.0.1/">http://127.0.0.1</a>" method="post"&gt;<br />&lt;input type="file" name="test_file"&gt;&lt;br&gt;<br />&lt;input type="submit"&gt;<br />&lt;/form&gt;<br />&lt;/html&gt;</p>
<p> 由此获得报文（节选）：</p>
<p>POST / HTTP/1.1<br />Accept: image/gif,
image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel,
application/msword, application/x-shockwave-flash,
application/vnd.ms-powerpoint, */*<br />…<br />Content-Type: multipart/form-data; boundary=---------------------------7d439d362703b2<br />…<br />Cache-Control: no-cache</p>
<p>-----------------------------7d439d362703b2<br />Content-Disposition: form-data; name="test_file"; filename="D:\home\project\CGI 工作原理\doc.gif"<br />Content-Type: text/plain</p>
<p><a href="mailto:1234abcd%21@#$">1234abcd!@#$</a>()-=:”<br />-----------------------------7d439d362703b2--</p>
<p>        很明显，文件使用一个长标识串（”---------------------------7d439d362703b2”）来将
文件与正文分离出来。因为标识串被设计为是“文件中所没有的串”可以有效地分离文件，因此，在标识的范围，可以直接传输文件字符，而不用对它编码。<br />        在获得了编码方案之后，又进行了二进制文件的传输实验，过程在这里就省略了，其结果与文本传输没有任何不同。<br />        这似乎是一种优异的解决方法，既顾及了编码的清晰及易用性，又顾及了编码效率。然而，我们知道，一劳永逸的解决方案总是难求，问题总会在适当的时候层出不穷。<br /> 在许多年后，CGI 技术与新兴的 XML 技术开始结合。不久便产生了 XML-RPC 及 SOAP 这些规范。它们使用 XML 格式对数据进行封装，于是，便引入了意想不到的编码问题。这里，尤以 XML-RPC 为甚。<br />        首先建立 XML-RPC 服务器：</p>
<p>“””<br /> XMLRPCClient1.py<br /> 沈崴编制<br /> 2004-7-23</p>
<p>“””</p>
<p>import xmlrpclib<br />server = xmlrpclib.Server("<a href="http://127.0.0.1/">http://127.0.0.1</a>");<br />result = server.test("Hello from client.")</p>
<p> 如法炮制出请求报文：</p>
<p>POST /RPC2 HTTP/1.0<br />Host: 127.0.0.1<br />User-Agent: xmlrpclib.py/1.0.1 (by <a href="http://www.pythonware.com/">www.pythonware.com</a>)<br />Content-Type: text/xml<br />Content-Length: 166</p>
<p>&lt;?xml version='1.0'?&gt;<br />&lt;methodCall&gt;<br />&lt;methodName&gt;test&lt;/methodName&gt;<br />&lt;params&gt;<br />&lt;param&gt;<br />&lt;value&gt;&lt;string&gt;Hello from client.&lt;/string&gt;&lt;/value&gt;<br />&lt;/param&gt;<br />&lt;/params&gt;<br />&lt;/methodCall&gt;</p>
<p>        我想聪明的大家应该已经猜到，HTTP/CGI 编码方案本身是支持在报文正文中传递二进制数据及文件的——问题出在
XML-RPC 协议本身：它只支持 ASCII 码传输。这会使我们立即联想到使用 Base64 编码二进制数据。当然，这无疑是 XML-RPC
协议本身的一个巨型 BUG。<br />        至此，可以发现 HTTP/CGI
编码方案是以清晰性和易用性为设计的主导思想。其中并不包含加密及压缩的行为，一切基本上都是原汁原味的明文传输，然而这未必就是缺点。我们可以在传输之
前预先将数据进行加密和压缩，毕竟，HTTP/CGI 编码协定只负责传输，仅此而已。</p>
<p><strong>第四节 标准 CGI 与缓冲 CGI ：</strong><br />        向外部程序传递客户数据并接收其输出<br />        
当然，服务器自己全程处理所有的用户请求是不现实的，所以在现实生活中，服务器都习惯把客户请求提交给外部的 CGI
程序（或模块），然后再将它的处理结果返回给客户。确实，这是唯一可行的办法。但是问题也随之产生：服务器该怎样接口 CGI 处理程序？<br />        
（从作者 ”沈崴” 的个人观点出发）可能首先想到的是动态连接方式，亦即将 CGI
程序编译成共享库，对它进行运行期调用。或者使用解释型语言技术中的 eval 或者 exec
方法调用外部脚本或脚本中的处理函数。这都是可行的，并且也是曾经广泛实现的。然而这些方法与服务器的整合仍然过于紧密。最后，标准 CGI
作为一种被广泛接受的规范出现了，同时，大量的 CGI 处理工具向它靠拢。以至于在现实生活中，作为服务器就一定要提供标准 CGI
的接口，才成其为名正言顺的 CGI 服务器。标准CGI的概念，在此自然无须再阐述了。这里主要来研究一下它的实现。<br />        CGI 服务器端的核心问题，除了与客户端的交互，就是解决 CGI 变量及 CGI 响应在服务器与 CGI 程序间的传递。而标准 CGI 便是通过系统的标准调用来实现的。<br />        使用到的系统标准调用，主要包括系统环境变量的设置与读取，和标准输出。其中，环境变量负责向 CGI 程序传递客户的 CGI 请求数据，标准输出负责由 CGI 程序向服务器传递 CGI 响应数据。<br />        这里先将这一过程模拟出来。下面这个程序由服务器端和 CGI 程序<br />服务器端：</p>
<p>“””<br /> CGIDataTrans1.py<br /> 模拟调用外部 CGI 程序<br />  使用环境变量传递数据，使用标准输出返回数据。<br /> 沈崴编制<br /> 2004-7-23</p>
<p>“””</p>
<p>class TMyOut:<br />    def __init__(self):<br />        self.__s = ""<br />    def write(self, s):<br />        self.__s += s<br />    def readall(self):<br />        return self.__s</p>
<p>import sys<br />import os<br />myout = TMyOut()<br />save_stdout = sys.stdout</p>
<p>env = { "A1" : "Hello", "A2" : "world" }<br />os.environ.update(env)   # 设置环境变量<br />sys.stdout = myout  # 标准输出重定向</p>
<p>execfile("cgi_hello.py")</p>
<p>sys.stdout = save_stdout<br />print "myout : " + myout.readall()<br />raw_input()</p>
<p> CGI 程序：</p>
<p>“””<br /> cgi_hello.py<br /> 模拟 CGI 程序<br /> 沈崴编制<br /> 2004-7-23</p>
<p>“””</p>
<p>import os<br />s = os.environ["A1"] + " " + os.environ["A2"] + "!"<br />print s</p>
<p>        正如预料的那样，程序输出：</p>
<p>Hello world!</p>
<p>        实验成功。<br />        下面要做的，就是完成一个更为正规的实现。所谓“更为正规的实现”就是搞出一个支持多种编程语言的方案。介于 Win32 平台至今没有支持 fork ，所以这里使用管道来实现。</p>
<p>”””<br /> CallCGI2.py<br /> 使用管道实现模拟调用外部 CGI 程序<br />  使用环境变量传递数据，使用标准输出返回数据。<br /> 沈崴编制<br /> 2004-7-23</p>
<p>“””</p>
<p>import os<br />env = { "A1" : "Hello", "A2" : "world" }<br />os.environ.update(env)<br />fo = os.popen2("cgi_hello.exe")[1]<br />s  = fo.read()<br />fo.close()<br />print s</p>
<p> 下面是使用 C/C++ 语言编写的 CGI 程序，最后将其编译为 cgi_hello.exe 进行调用：</p>
<p>/*<br /> * cgi_hello.cpp<br /> * 模拟 CGI 程序<br /> * 沈崴编制<br /> * 2004-7-23<br /> */</p>
<p>#include &lt;iostream&gt;<br />#include &lt;stdlib.h&gt;</p>
<p>int main(int argc, char *argv[])<br />{<br />        char *A1, *A2;<br />        A1 = getenv("A1");<br />        A2 = getenv("A2");<br />        printf("%s %s!", A1, A2); <br />        return 0;<br />}</p>
<p>        亦如预料的那样，再次，程序输出：</p>
<p>Hello world!</p>
<p>        实验成功——当然，创建 ”cgi_hello.bat” ，内容是：@echo Hello world!，然后使用相同的方法来调用，也同样可以成功。<br />        最后，在 Unix 平台上，可以使用 fork 来实现（有部分省略）：</p>
<p>“””<br /> CallCGI3.py<br /> 使用多进程实现模拟调用外部 CGI 程序<br />  使用环境变量传递数据，使用标准输出返回数据。<br /> 沈崴编制<br /> 2004-7-23</p>
<p>“””</p>
<p>class TMyOut:<br />    …</p>
<p>import os<br />fo = TMyOut()<br />os.environ.update( { "A1" : "Hello", "A2" : "world" } )</p>
<p>os.fork()<br />os.dup2(fo, 1)<br />os.execve("cgi_hello", "", os.environ)</p>
<p>        至此，标准 CGI 中服务器与 CGI 程序间的数据交换原理，已经实现了。它可以通过标准接口调用一切支持标准 CGI
流程的外置程序，比如 PHP ASP C Shell Perl 等等。再加上前面所述的服务器与客户端通信、服务器 CGI 请求数据解析、CGI
响应报文的编码及生成，一个完整的标准 CGI 流程已经完成。<br />        除了标准 CGI
之外，世界上还存在着一种定义比较模糊的“缓冲 CGI”，它的机制是在服务器和 CGI
程序之间，加上一个输入输出缓冲区和一个缓冲区操作程序，通过他们，服务器与 CGI 程序进行数据交换。因为缓冲 CGI
并无特别的标准存在，所以，在此不深入研究了。</p>
<p><strong>第五节 加密，验证，还有其他的一些没有涉及到的 CGI 相关内容</strong><br />        上面，探讨了 CGI 的实现原理，包括数据传输及编码，服务器与 CGI 程序的数据交换等内容。其中所涉及到的数据，都是明文传输的，服务器也未对客户进行验证。下面，就对 CGI 数据的加密，及用户认证进行一点研讨。<br />        
我们都知道，建立两端通信真正有效的加密方式是公钥加密，但是其速度很慢，与之相反的是基于对称密钥体系的加密，它很快，但是无法用于建立通信，所以说，
在现实中，通信必然会混合这两种加密方式。它应该首先建立在公钥认证上，而后通过公钥认证的通信交换对称密钥，然后通过对称密钥体系建立数据传输。这是基
本的原理，但投入实用之前，还需整合数字证书及传输检测等技术，才能得到所需的安全性。<br />        在实际应用中，经常使用的一种加密传输方案是 SSL。由于这是一套比较复杂的方案，这里不便详细研究。<br />        
那么加密协议处于整个 HTTP/CGI
传输的哪一个层次中呢？为此，试着在浏览器中输入。”https://127.0.0.1:80”，以截取它发出的报文。结果，截取到一系列二进制字符，
至此已经完全可以猜测到 HTTP/CGI 数据传输是建立在 SSL 通信之上的，而非加密数据嵌入 HTTP/CGI 报文的这种情况。<br />        
有时候，服务器会要求客户提供身份验证信息。当然，可以通过 GET 和 POST 提交身份信息，但是显然也可以直接通过 HTTP
头部提供：这就是著名的 HTTP 头验证。HTTP
头部验证的实现非常简单，只需在头部添加用户、密码两项就可以了，服务器可以很容易地扩展出这个功能，在此也不赘述了。<br />        另外，据说新版的 HTTP 协议支持在一次 TCP 连接中进行多次报文交换，这里，对该项技术的必要性和实用性表示怀疑——当然，这是针对服务器明显的负载过重而言的。<br />        HTTP
还支持断点续传和多线程传输，这是通过在报头中添加 RANGE 信息条实现的，该信息行标明了返回内容数据的起始比特和结束比特。如同 HTTP
头部验证，既然服务器已经能够分析报文头部了，实现这个功能是非常容易的。同样，在客户端也是非常容易实现的。这里便不再赘述。<br />        最后，除了 form 之外，CGI 的输入方式还有 ISINDEX 一种，是非常不常用的。包括 HTML 及 MIME 在内的这几项技术和规范因为已经是普及的教育了，在这里也不作介绍了。</p>
<p><strong>第二章 CGI 服务器</strong><br />        如果要对 CGI 的工作原理作进一步的研究，那就需要深入 CGI 服务器的内部进行一番探究了。这一章，主要对服务器的实现进行探讨。</p>
<p><strong>第一节 速度瓶颈和性能提升</strong><br />        如果是一台 CGI 服务器，自然不能对工作和响应的速度置若罔闻。那么瓶颈和性能提升的空间在哪里呢？</p>
<p>1·CGI MIME 字符转换（非Multipart/Form-Data 类型的传输）<br />        既然是 CGI 服务器，当然要频繁处理客户端传输而来的数据，而大多数，是以 “%” 打头的十六进制数据。对这些数据的解析和转换，直接关系到响应的速度。在这种情况下，必须使用一点编程技巧了。<br /> 在 Python 中，如果没有特殊原因，urllib 中 quote_plus 及 unquote_plus 函数可以完全胜任这项工作。</p>
<p>2·容错式报文分析<br />        CGI 作为崇尚自由的互联网的技术家族中的一员，自然应该支持松散的，相对宽松的报文格式——即使报文不规范，甚至是有错误，也可以识别出来。但是要是真的那样做了，这就会变成一个大大的性能瓶颈。<br />        从另外一个方面来说，真要实现容错，也不是非常容易的。经过多次尝试，发现使用象上一节中的底层字符操作方法，做出一个具有起码速度性能的实现也是很困难的。<br />        于是求助于模式匹配的方法：</p>
<p>”””<br /> CGIServer.py part1<br /> 模式处理报文头部<br />及进行客户 CGI 变量解析<br /> 沈崴编制<br /> 2004-7-28<br />”””</p>
<p>import os     as __os<br />import time   as __time<br />import re     as __re<br />import string as __string<br />from _CGIServer import h2c</p>
<p>MAX_DATA_SIZE  = 1024 * 1024 * 10<br />MAX_DATA_COUNT = 256<br />CHAR_DIRTREE = "\\"</p>
<p>def parase_first_line( s ):<br /> # 解析 HTTP 报头第一行<br />    p = __re.compile( r"^ *(?P&lt;METHOD&gt;[^ ]+) *" )<br />    m = p.match( s )<br />    if( m ):<br />        METHOD = __string.upper( m.groupdict()["METHOD"] )<br />        if(   METHOD == "GET"  ):<br />           
p = __re.compile( r"^ *(?P&lt;METHOD&gt;[^ ]+) *(?P&lt;URL&gt;[^ \?]+)
*\? *(?P&lt;GET_DATA&gt;[^ \?]+) *(?P&lt;HTTP_VERSION&gt;[^ ]+) *$" )<br />            m = p.match( s )<br />            if( m ):<br />                d = m.groupdict()<br />                d.update( { "TYPE" : "GET", "METHOD" : "GET" } )<br />                return d<br />            p = __re.compile( r"^ *(?P&lt;METHOD&gt;[^ ]+) *(?P&lt;URL&gt;[^ ]+) *(?P&lt;HTTP_VERSION&gt;[^ ]+) *$" )<br />            m = p.match( s )<br />            if( m ):<br />                d = m.groupdict()<br />                d.update( { "TYPE" : "GET", "METHOD" : "GET" } )<br />                return d<br />        elif( METHOD == "POST" ):<br />            p = __re.compile( r"^ *(?P&lt;METHOD&gt;[^ ]+) *(?P&lt;URL&gt;[^ ]+) *(?P&lt;HTTP_VERSION&gt;[^ ]+) *$" )<br />            m = p.match( s )<br />            if( m ):<br />                d = m.groupdict()<br />                d.update( { "METHOD" : "POST", "TYPE" : "POST" } )<br />                return d<br />    return None</p>
<p>def parase_head_line( s ):<br /> # 解析除第一行外的 HTTP 报头<br />    items = __re.split( r";", s, MAX_DATA_COUNT )<br />    r = {}<br />    for item in items:<br />        p = __re.compile( r"^ *(?P&lt;KEY&gt;[^ :=]+) *[:=] *(?P&lt;VALUE&gt;[^ ]+) *" )<br />        m = p.match( item, 0 )<br />        if( m ):<br />            d = m.groupdict()<br />            if( len( d["KEY"] ) &gt; 64 ):<br />                return None<br />            p = __re.compile( r"^ *[^-]+-" )<br />            m = p.match( d["KEY"] )<br />            if( m ):<br />                r.update( { "HTTP_" + __string.upper( d["KEY"] ) : d["VALUE"] } )<br />                r.update( { __string.upper( __string.replace( d["KEY"], '-', '_' ) ) : d["VALUE"] } )</p>
<p><br />    if r != {}:<br />        return r<br />    return None</p>
<p>def parase_normal_data( s ):<br /> # 解析客户传递的 CGI 变量<br />    items = __re.split( r"&amp;", s, MAX_DATA_COUNT )<br />    p = __re.compile(r"^(?P&lt;KEY&gt;[^=]+)=(?P&lt;VALUE&gt;[^=]+)$")<br />    r = {}<br />    for item in items:<br />        m = p.match( item )<br />        if( m ):<br />            d = m.groupdict()<br />            r.update( { h2c( d["KEY"] ) : h2c( d["VALUE"] ) } )<br />    if r != {}:<br />        return r<br />return None</p>
<p>        很勉强，它可以处理除了拼写错误之外的几乎所有的报文了。它的速度完全依赖于模式处理模块的运行速度，这似乎是目前少数可行的方法之一了。把速度与模式技术发展绑在一起，随着该技术的发展，不断获益。<br />        不过可以理解的是当前的商用服务器并不需要这个级别的容错性能，他们将对标准报文格式进行特别优化以提升性能。<br />        当然容易遗忘的是容错技术的真正困难在于：安全性。复杂的算法必然造成巨大安全漏洞；同时，性能上一有拖沓，极易被利用，被作为报文炸弹的标靶。</p>
<p>3·大部头数据与 Multipart/Form-Data<br />        我们都知道，标准 CGI 通过环境变量传递数据，但是如果数据巨大呢？<br />        如果将数据直接放进环境变量，似乎是可行的，但前提是需要系统支持，大开环境变量缓冲区。这时，资源负载完全转移到操作系统中。<br />        
如果让我们来设计操作系统，肯定不至于蠢到直接把数据储存在内存中——起码使用虚拟内存来储存。一般而言操作系统必然会将数据转存在外部的临时文件中——
而本来意义上的环境变量，实在是应该储存在内存中才是啊——所以，理应假定处理大部头数据是操作系统所不情愿的。<br />        好了，轮到服务器处理了。<br />        如何设计数据存储策略，一个不用想就知道的方案是将数据保存在外部的临时文件中，然后设置环境变量指向该文件。此，之谓“服务器扩展”——也就是说，如果服务器设计师是我们，那我们自然可以发挥天马行空的想象力搞出一套非常漂亮的方案和机制来。<br />        对付大型数据，主要的战场是 Multipart/Form-Data ，因为它开门见山就承认自己是大部头了，而其他格式的数据如果超出规定大小顶多可以说它超过规定缓冲长度而不理它。<br />在第一章，已经见识过这种格式的数据报了，现在，便来解析它：</p>
<p> </p>
<p>”””<br /> CGIServer.py part2<br /> 处理 Multipart/Form-Data 格式数据<br />  其中parase_multipart_form_data_body<br />因为时间原因，未完全解密传输格式，<br />这对文本数据影响较小，但对二进制数据的还原影响较大。<br /> 沈崴编制<br /> 2004-7-28<br />”””</p>
<p>import os     as __os<br />import time   as __time<br />import re     as __re<br />import string as __string<br />from _CGIServer import h2c</p>
<p>MAX_DATA_SIZE  = 1024 * 1024 * 10<br />MAX_DATA_COUNT = 256<br />CHAR_DIRTREE = "\\"</p>
<p>def parase_multipart_form_data_head_line( s ):<br /> # 解析每个数据段的段头部<br />    items = __re.split( ';', s, MAX_DATA_COUNT )<br />    r = {}<br />    for item in items:<br />        p = __re.compile( r"^ *(?P&lt;KEY&gt;[^ :=]+) *[:=] *(?P&lt;VALUE&gt;[^ ].*[^ ]) *" )<br />        m = p.match( item, 0 )<br />        if( m ):<br />            d = m.groupdict()<br />            if( len( d["KEY"] ) &gt; 64 ):<br />                return None<br />            p = __re.compile( r"^ *[^-]+-" )<br />            m = p.match( d["KEY"] )<br />            if( m ):<br />               
r.update( { __string.upper( __string.replace( d["KEY"], '-', '_' ) ) :
__string.replace( d["VALUE"], '\"', '' ) } )<br />            else:<br />                r.update( { __string.upper( d["KEY"] ) : __string.replace( d["VALUE"], '\"', '' ) } )<br />    if r != {}:<br />        return r<br />return None</p>
<p>def parase_multipart_form_data_body( file, boundary ):<br /> # 解析数据段，传入文件格式的报文，或片段、以及数据段分割符。<br />    boundary_begin = boundary<br />    boundary_end   = boundary + "--"<br />    r = {}</p>
<p>    data = file.readline()<br />    while data:<br />        if __string.strip( data ) != boundary_begin:<br />            data = file.readline()<br />            continue<br />        break</p>
<p>    if not data:<br />        return r</p>
<p>    t_data = file.readline()<br />    while t_data:<br />        data = ""<br />        while t_data:<br />            t = __string.strip(t_data)<br />            if t == "":<br />                break<br />            if t == boundary_begin:<br />                d = parase_multipart_form_data_head_line( data )<br />                if d and d.has_key("FILENAME") and d.has_key("NAME"):<br />                    r.update( { d["NAME"] + "_CLIENT_FILENAME" : None } )<br />                    r.update( { d["NAME"] + "_SERVER_FILENAME" : None } )<br />                elif d and d.has_key("NAME"):<br />                    r.update( { d["NAME"] : None } )<br />                t_data = file.readline()<br />                break<br />            if t == boundary_end:<br />                d = parase_multipart_form_data_head_line( data )<br />                if d and d.has_key("FILENAME") and d.has_key("NAME"):<br />                    r.update( { d["NAME"] + "_CLIENT_FILENAME" : None } )<br />                    r.update( { d["NAME"] + "_SERVER_FILENAME" : None } )<br />                elif d and d.has_key("NAME"):<br />                    r.update( { d["NAME"] : None } )<br />                return r<br />            data += ( ";" + t )<br />            t_data = file.readline()<br />        if not t_data:<br />            return r</p>
<p>        d = parase_multipart_form_data_head_line( data )<br />        if d and d.has_key("FILENAME") and d.has_key("NAME"):<br />            r.update( { __string.upper(d["NAME"]) + "_CLIENT_FILENAME" : d["FILENAME"] } )<br />            filename = "TEMP" + "_" + __string.replace( str( __time.time() ), '.', '_' ) + ".CGI"<br />            filename = __os.path.dirname( __os.path.abspath( __file__ ) ) + CHAR_DIRTREE + filename<br />            r.update( { __string.upper(d["NAME"]) + "_SERVER_FILENAME" : filename } )<br />            fo = open(filename, "w")<br />            t_data = file.readline()<br />            while t_data:<br />                t = __string.strip(t_data)<br />                if t == boundary_begin:<br />                    fo.close()<br />                    break<br />                if t == boundary_end:<br />                        fo.write( data )<br />                    fo.close()<br />                    return r<br />                fo.write( t_data )<br />                t_data = file.readline()<br />            if not t_data:<br />                fo.close()<br />                return r</p>
<p>        elif d and d.has_key("NAME"):<br />            data = ""<br />            t_data = file.readline()<br />            while t_data:<br />                t = __string.strip(t_data)<br />                if t == boundary_begin:<br />                    r.update( { d["NAME"] : data[ 0 : -2 ] } )<br />                    break<br />                if t == boundary_end:<br />                    r.update( { d["NAME"] : data } )<br />                    return r<br />                data += t_data<br />                t_data = file.readline()<br />            if not t_data:<br />                r.update( { d["NAME"] : data } )<br />                return r</p>
<p>        t_data = file.readline()</p>
<p>return r</p>
<p>        解析数据时，首先将报文的数据部分保存为临时文件，然后将文件引用，和通过前一小节的 “parase_head_line”
函数获得的数据分界符传入 ”parase_multipart_form_data_body”
函数。该函数将文件数据存入临时文件，将客户端文件名保存在 “NAME_CLIENT_FILENAME” 环境变量中，将服务器临时文件名保存在
“NAME_SERVER_NAME” 环境变量中。然后服务器会启动 CGI 程序，在 CGI 程序退出时将临时文件删除。<br />        该函数的所有关于大数据的操作都是通过文件 IO 处理的，通过节省内存以提升性能。</p>
<p>4·共享 CGI 、静态数据缓冲以及数据静态化<br />        第一章中服务器调用 CGI 程序的功能实现函数在对同一个 CGI 程序进行调用时，每次都会开启一个 CGI 程序的实体。在频繁调用的环境下，不利于提升性能。目前全球通用的方法是只开启一个程序实体，所有请求共享该实体。这里便不深入研究了。<br />        服务器同样可以对频繁使用的静态数据进行缓冲，将其保存在内存中这里便不深入研究了。<br />        同理，一些带有或近似带有时间静态特征的动态数据同样可以对响应结果进行提速。</p>
<p>5·线程调用 CGI 程序<br />        如果使用线程来响应单个请求，调用 CGI 程序，将比进程获得更好的性能。同时，类似于 while 1 这样的单服务器循环也是可以考虑的这里便不深入研究了。</p>
<p><strong>第二节 一步之遥</strong><br />        通过这些工作，几乎已经将一个 CGI 服务器所需的各个模块实现了。其中包括与客户端数据传输、报文解析和与 CGI 程序交互的功能。<br />        而目前的商用 CGI 服务器程序还带有服务器端访问权限系统，不过实现它，其实并不难。<br />        至此，只需一个主程序将它们组装起来便可以了——而实现一个全功能的（支持Shell C PHP Perl Python 脚本及程序的） CGI 服务器也是本文的最终目标。遗憾的是时间有限，只好暂且将他搁置了。<br />        一切，只剩一步之遥。</p>
<strong>后记</strong><br />        最后显得仓促了，确实，对于这么一个题目，是需要耗费很多时间才能完全讲明白的。暂且就写到这里吧，尽管与目标相差很远，但总是要有一个发布版本的。<br /><p>        
本次发布所未涉及的，包括了：（显然）一个完整的 CGI 服务器，关于服务器扩展的讨论，和关于 Local CGI —— 一个“通过使用 CGI
的结构来开发本地程序的”一个开发框架，也就是可以实现使用 PHP 这样的服务器脚本来编写本地程序的技术—— 的研究。</p>