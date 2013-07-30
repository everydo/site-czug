<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/file_handling/index.html">http://www.woodpecker.org.cn/diveintopython/file_handling/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="filehandling"></a>第&nbsp;6&nbsp;章&nbsp;异常和文件处理
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#fileinfo.exception">6.1. 异常处理</a></span><ul>
                     <li><span class="section"><a href="#d0e14544">6.1.1. 为其他用途使用异常</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#file_objects.html">6.2. 与文件对象共事</a></span><ul>
                     <li><span class="section"><a href="#file_objects.html#d0e14868">6.2.1. 读取文件</a></span></li>
                     <li><span class="section"><a href="#file_objects.html#d0e14995">6.2.2. 关闭文件</a></span></li>
                     <li><span class="section"><a href="#file_objects.html#d0e15122">6.2.3. 处理 I/O 错误</a></span></li>
                     <li><span class="section"><a href="#file_objects.html#d0e15243">6.2.4. 写入文件</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#for_loops.html">6.3. for 循环</a></span></li>
               <li><span class="section"><a href="#more_on_modules.html">6.4. 使用 sys.modules</a></span></li>
               <li><span class="section"><a href="#os_module.html">6.5. 与目录共事</a></span></li>
               <li><span class="section"><a href="#all_together.html">6.6. 全部放在一起</a></span></li>
               <li><span class="section"><a href="#summary.html">6.7. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>在本章中，将研究异常、文件对象、<tt class="literal">for</tt> 循环、<tt class="filename">os</tt> 和 <tt class="filename">sys</tt> 模块等内容。如果你已经在其它编程语言中使用过异常，你可以简单看看第一部分来了解 <span class="application">Python</span> 的语法。但是本章其它的内容仍需仔细研读。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="fileinfo.exception"></a>6.1.&nbsp;异常处理
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="toc">
               <ul>
                  <li><span class="section"><a href="#d0e14544">6.1.1. 为其他用途使用异常</a></span></li>
               </ul>
            </div>
            <div class="abstract">
               <p>与许多面向对象语言一样，<span class="application">Python</span> 具有异常处理，通过使用 <tt class="literal">try...except</tt> 块来实现。
               </p>
            </div><a name="compare.exceptions.java"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.files"></a><a name="file_objects.html">6.2.&nbsp;与文件对象共事
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="file_objects.html#d0e14868">6.2.1. 读取文件</a></span></li>
               <li><span class="section"><a href="file_objects.html#d0e14995">6.2.2. 关闭文件</a></span></li>
               <li><span class="section"><a href="file_objects.html#d0e15122">6.2.3. 处理 I/O 错误</a></span></li>
               <li><span class="section"><a href="file_objects.html#d0e15243">6.2.4. 写入文件</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 有一个内置函数，<tt class="function">open</tt>，用来打开在磁盘上的文件。<tt class="function">open</tt> 返回一个文件对象，它拥有一些方法和属性，可以得到被打开文件的信息，以及对被打开文件进行操作。
            </p>
         </div>
         <div class="example"><a name="d0e14796"></a><h3 class="title">例&nbsp;6.3.&nbsp;打开文件</h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f = open(<span class='pystring'>"/music/_singles/kairo.mp3"</span>, <span class='pystring'>"rb"</span>)</span> <a name="fileinfo.files.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f</span>                                           <a name="fileinfo.files.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;open file '/music/_singles/kairo.mp3', mode 'rb' at 010E3988&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.mode</span>                                      <a name="fileinfo.files.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'rb'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.name</span>                                      <a name="fileinfo.files.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">'/music/_singles/kairo.mp3'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.for"></a><a name="for_loops.html">6.3.&nbsp;<tt class="literal">for</tt> 循环
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>与其它大多数语言一样，<span class="application">Python</span> 也拥有 <tt class="literal">for</tt> 循环。你到现在还未曾看到它们的唯一原因就是，<span class="application">Python</span> 在其它太多的方面表现出色，通常你不需要它们。
            </p>
         </div>
         <p>其它大多数语言没有像 <span class="application">Python</span> 一样的强大的 list 数据类型，所以你需要亲自做很多事情，指定开始，结束和步长，来定义一定范围的整数或字符或其它可重复的实体。但是在 <span class="application">Python</span> 中，<tt class="literal">for</tt> 循环简单地在一个列表上循环，与 <a href="../native_data_types/mapping_lists.html" title="3.6.&nbsp;映射 list">list 解析</a>的工作方式相同。
         </p>
         <div class="example"><a name="d0e15442"></a><h3 class="title">例&nbsp;6.8.&nbsp;<tt class="literal">for</tt> 循环介绍
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">li = [<span class='pystring'>'a'</span>, <span class='pystring'>'b'</span>, <span class='pystring'>'e'</span>]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> li:</span>         <a name="fileinfo.for.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>print</span> s</span>          <a name="fileinfo.for.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">a
b
e</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> <span class='pystring'>"\n"</span>.join(li)</span>  <a name="fileinfo.for.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">a
b
e</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.modules"></a><a name="more_on_modules.html">6.4.&nbsp;使用 <tt class="literal"><tt class="filename">sys</tt>.modules</tt></a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>与其它任何 <span class="application">Python</span> 的东西一样，模块也是对象。只要导入了，总可以用全局 dictionary <tt class="literal"><tt class="filename">sys</tt>.modules</tt> 来得到一个模块的引用。
            </p>
         </div>
         <div class="example"><a name="d0e15882"></a><h3 class="title">例&nbsp;6.12.&nbsp;<tt class="literal"><tt class="filename">sys</tt>.modules</tt> 介绍
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> sys</span>                          <a name="fileinfo.modules.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> <span class='pystring'>'\n'</span>.join(sys.modules.keys())</span> <a name="fileinfo.modules.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">win32api
os.path
os
exceptions
__main__
ntpath
nt
sys
__builtin__
site
signal
UserDict
stat</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.os"></a><a name="os_module.html">6.5.&nbsp;与目录共事
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="filename">os.path</tt> 模块有几个操作文件和目录的函数。这里，我们看看如何操作路径名和列出一个目录的内容。
            </p>
         </div>
         <div class="example"><a name="fileinfo.os.path.join.example"></a><h3 class="title">例&nbsp;6.16.&nbsp;构造路径名</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> os</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">os.path.join(<span class='pystring'>"c:\\music\\ap\\"</span>, <span class='pystring'>"mahadeva.mp3"</span>)</span> <a name="fileinfo.os.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12"> <a name="fileinfo.os.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">'c:\\music\\ap\\mahadeva.mp3'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">os.path.join(<span class='pystring'>"c:\\music\\ap"</span>, <span class='pystring'>"mahadeva.mp3"</span>)</span>   <a name="fileinfo.os.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'c:\\music\\ap\\mahadeva.mp3'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">os.path.expanduser(<span class='pystring'>"~"</span>)</span>                         <a name="fileinfo.os.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">'c:\\Documents and Settings\\mpilgrim\\My Documents'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">os.path.join(os.path.expanduser(<span class='pystring'>"~"</span>), <span class='pystring'>"Python"</span>)</span> <a name="fileinfo.os.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<span class="computeroutput">'c:\\Documents and Settings\\mpilgrim\\My Documents\\Python'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.alltogether"></a><a name="all_together.html">6.6.&nbsp;全部放在一起
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>再一次，所有的多米诺骨牌都放好了。我们已经看过每行代码是如何工作的了。现在往回走一步，看一下放在一起是怎么样的。</p>
         </div>
         <div class="example"><a name="fileinfo.nested"></a><h3 class="title">例&nbsp;6.21.&nbsp;<tt class="function">listDirectory</tt></h3><pre class="programlisting"><span class='pykeyword'>
def</span> listDirectory(directory, fileExtList):                                         <a name="fileinfo.alltogether.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    <span class='pystring'>"get list of file info objects for files of particular extensions"</span>
    fileList = [os.path.normcase(f)
                <span class='pykeyword'>for</span> f <span class='pykeyword'>in</span> os.listdir(directory)]           
    fileList = [os.path.join(directory, f) 
               <span class='pykeyword'>for</span> f <span class='pykeyword'>in</span> fileList
                <span class='pykeyword'>if</span> os.path.splitext(f)[1] <span class='pykeyword'>in</span> fileExtList]                          <a name="fileinfo.alltogether.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    <span class='pykeyword'>def</span><span class='pyclass'> getFileInfoClass</span>(filename, module=sys.modules[FileInfo.__module__]):       <a name="fileinfo.alltogether.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
        <span class='pystring'>"get file info class from filename extension"</span>                             
        subclass = <span class='pystring'>"%sFileInfo"</span> % os.path.splitext(filename)[1].upper()[1:]        <a name="fileinfo.alltogether.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
        <span class='pykeyword'>return</span> hasattr(module, subclass) <span class='pykeyword'>and</span> getattr(module, subclass) <span class='pykeyword'>or</span> FileInfo <a name="fileinfo.alltogether.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
    <span class='pykeyword'>return</span> [getFileInfoClass(f)(f) <span class='pykeyword'>for</span> f <span class='pykeyword'>in</span> fileList]                              <a name="fileinfo.alltogether.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.summary2"></a><a name="summary.html">6.7.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>在 <a href="../object_oriented_framework/index.html">第 5 章</a> 介绍的 <tt class="filename">fileinfo.py</tt> 程序现在应该完全理解了。
            </p>
         </div>
         <div class="informalexample"><pre class="programlisting">
<span class='pystring'>"""Framework for getting filetype-specific metadata.

Instantiate appropriate class with filename.  Returned object acts like a
dictionary, with key-value pairs for each piece of metadata.
    import fileinfo
    info = fileinfo.MP3FileInfo("/music/ap/mahadeva.mp3")
    print "\\n".join(["%s=%s" % (k, v) for k, v in info.items()])

Or use listDirectory function to get info on all files in a directory.
    for info in fileinfo.listDirectory("/music/ap/", [".mp3"]):
        ...

Framework can be extended by adding classes for particular file types, e.g.
HTMLFileInfo, MPGFileInfo, DOCFileInfo.  Each class is completely responsible for
parsing its files appropriately; see MP3FileInfo for example.
"""</span>
<span class='pykeyword'>import</span> os
<span class='pykeyword'>import</span> sys
<span class='pykeyword'>from</span> UserDict <span class='pykeyword'>import</span> UserDict

<span class='pykeyword'>def</span><span class='pyclass'> stripnulls</span>(data):
    <span class='pystring'>"strip whitespace and nulls"</span>
    <span class='pykeyword'>return</span> data.replace(<span class='pystring'>"\00"</span>, <span class='pystring'>""</span>).strip()

<span class='pykeyword'>class</span><span class='pyclass'> FileInfo</span>(UserDict):
    <span class='pystring'>"store file metadata"</span>
    <span class='pykeyword'>def</span><span class='pyclass'> __init__</span>(self, filename=None):
        UserDict.__init__(self)
        self[<span class='pystring'>"name"</span>] = filename

<span class='pykeyword'>class</span><span class='pyclass'> MP3FileInfo</span>(FileInfo):
    <span class='pystring'>"store ID3v1.0 MP3 tags"</span>
    tagDataMap = {<span class='pystring'>"title"</span>   : (  3,  33, stripnulls),
                  <span class='pystring'>"artist"</span>  : ( 33,  63, stripnulls),
                  <span class='pystring'>"album"</span>   : ( 63,  93, stripnulls),
                  <span class='pystring'>"year"</span>    : ( 93,  97, stripnulls),
                  <span class='pystring'>"comment"</span> : ( 97, 126, stripnulls),
                  <span class='pystring'>"genre"</span>   : (127, 128, ord)}

    <span class='pykeyword'>def</span><span class='pyclass'> __parse</span>(self, filename):
        <span class='pystring'>"parse ID3v1.0 tags from MP3 file"</span>
        self.clear()
        <span class='pykeyword'>try</span>:                               
            fsock = open(filename, <span class='pystring'>"rb"</span>, 0)
            <span class='pykeyword'>try</span>:                           
                fsock.seek(-128, 2)        
                tagdata = fsock.read(128)  
            <span class='pykeyword'>finally</span>:                       
                fsock.close()              
            <span class='pykeyword'>if</span> tagdata[:3] == <span class='pystring'>"TAG"</span>:
                <span class='pykeyword'>for</span> tag, (start, end, parseFunc) <span class='pykeyword'>in</span> self.tagDataMap.items():
                    self[tag] = parseFunc(tagdata[start:end])               
        <span class='pykeyword'>except</span> IOError:                    
            <span class='pykeyword'>pass</span>                           

    <span class='pykeyword'>def</span><span class='pyclass'> __setitem__</span>(self, key, item):
        <span class='pykeyword'>if</span> key == <span class='pystring'>"name"</span> <span class='pykeyword'>and</span> item:
            self.__parse(item)
        FileInfo.__setitem__(self, key, item)

<span class='pykeyword'>def</span><span class='pyclass'> listDirectory</span>(directory, fileExtList):                                        
    <span class='pystring'>"get list of file info objects for files of particular extensions"</span>
    fileList = [os.path.normcase(f)
                <span class='pykeyword'>for</span> f <span class='pykeyword'>in</span> os.listdir(directory)]           
    fileList = [os.path.join(directory, f) 
               <span class='pykeyword'>for</span> f <span class='pykeyword'>in</span> fileList
                <span class='pykeyword'>if</span> os.path.splitext(f)[1] <span class='pykeyword'>in</span> fileExtList] 
    <span class='pykeyword'>def</span><span class='pyclass'> getFileInfoClass</span>(filename, module=sys.modules[FileInfo.__module__]):      
        <span class='pystring'>"get file info class from filename extension"</span>                             
        subclass = <span class='pystring'>"%sFileInfo"</span> % os.path.splitext(filename)[1].upper()[1:]       
        <span class='pykeyword'>return</span> hasattr(module, subclass) <span class='pykeyword'>and</span> getattr(module, subclass) <span class='pykeyword'>or</span> FileInfo
    <span class='pykeyword'>return</span> [getFileInfoClass(f)(f) <span class='pykeyword'>for</span> f <span class='pykeyword'>in</span> fileList]                             

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:
    <span class='pykeyword'>for</span> info <span class='pykeyword'>in</span> listDirectory(<span class='pystring'>"/music/_singles/"</span>, [<span class='pystring'>".mp3"</span>]):
        <span class='pykeyword'>print</span> <span class='pystring'>"\n"</span>.join([<span class='pystring'>"%s=%s"</span> % (k, v) <span class='pykeyword'>for</span> k, v <span class='pykeyword'>in</span> info.items()])
        print</pre></div>
         <div class="highlights">
            <p>在研究下一章之前，确保你可以无困难地完成下面的事情：</p>
            <div class="itemizedlist">
               <ul>
                  <li>使用 <a href="index.html#fileinfo.exception" title="6.1.&nbsp;异常处理"><tt class="literal">try...except</tt></a> 来捕捉异常
                  </li>
                  <li>使用 <a href="file_objects.html#fileinfo.files.incode" title="例&nbsp;6.6.&nbsp;MP3FileInfo 中的文件对象"><tt class="literal">try...finally</tt></a> 来保护额外的资源
                  </li>
                  <li>读取<a href="file_objects.html" title="6.2.&nbsp;与文件对象共事">文件</a></li>
                  <li>在一个 <a href="for_loops.html#fileinfo.multiassign.for.example" title="例&nbsp;6.11.&nbsp;MP3FileInfo 中的 for 循环"><tt class="literal">for</tt> 循环</a>中一次赋多个值
                  </li>
                  <li>使用 <a href="os_module.html" title="6.5.&nbsp;与目录共事"><tt class="filename">os</tt></a> 模块来满足你的跨平台文件操作的需要
                  </li>
                  <li>通过将类看成对象并传入参数，动态地<a href="all_together.html" title="6.6.&nbsp;全部放在一起">实例化未知类型的类</a></li>
               </ul>
            </div>
         </div>
      </div>
      
