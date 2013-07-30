---
created: 
creator: Benky
description: ''
title: 5. 对象和面向对象
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/object_oriented_framework/index.html">http://www.woodpecker.org.cn/diveintopython/object_oriented_framework/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo"></a>第&nbsp;5&nbsp;章&nbsp;对象和面向对象
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#fileinfo.divein">5.1. 概览</a></span></li>
               <li><span class="section"><a href="#importing_modules.html">5.2. 使用 from module import 导入模块</a></span></li>
               <li><span class="section"><a href="#defining_classes.html">5.3. 类的定义</a></span><ul>
                     <li><span class="section"><a href="#defining_classes.html#d0e11869">5.3.1. 初始化并开始类编码</a></span></li>
                     <li><span class="section"><a href="#defining_classes.html#d0e12045">5.3.2. 了解何时去使用 self 和 __init__</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#instantiating_classes.html">5.4. 类的实例化</a></span><ul>
                     <li><span class="section"><a href="#instantiating_classes.html#d0e12314">5.4.1. 垃圾回收</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#userdict.html">5.5. 探索 UserDict：一个封装类</a></span></li>
               <li><span class="section"><a href="#special_class_methods.html">5.6. 专用类方法</a></span><ul>
                     <li><span class="section"><a href="#special_class_methods.html#d0e13019">5.6.1. 获得和设置数据项</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#special_class_methods2.html">5.7. 高级专用类方法</a></span></li>
               <li><span class="section"><a href="#class_attributes.html">5.8. 类属性介绍</a></span></li>
               <li><span class="section"><a href="#private_functions.html">5.9. 私有函数</a></span></li>
               <li><span class="section"><a href="#summary.html">5.10. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>这一章，和此后的许多章，均讨论了面向对象的 <span class="application">Python</span> 程序设计。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="fileinfo.divein"></a>5.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>下面是一个完整的，可运行的 <span class="application">Python</span> 程序。请阅读模块、类和函数的 <a href="../getting_to_know_python/documenting_functions.html" title="2.3.&nbsp;文档化函数"><tt class="literal">doc string</tt>s</a>，可以大概了解这个程序所做的事情和工作情况。像平时一样，不用担心你不理解的东西，这就是本章其它部分将告诉你的内容。
               </p>
            </div>
            <div class="example"><a name="d0e11326"></a><h3 class="title">例&nbsp;5.1.&nbsp;<tt class="filename">fileinfo.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting">
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
    <span class='pykeyword'>for</span> info <span class='pykeyword'>in</span> listDirectory(<span class='pystring'>"/music/_singles/"</span>, [<span class='pystring'>".mp3"</span>]): <a name="fileinfo_divein.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        <span class='pykeyword'>print</span> <span class='pystring'>"\n"</span>.join([<span class='pystring'>"%s=%s"</span> % (k, v) <span class='pykeyword'>for</span> k, v <span class='pykeyword'>in</span> info.items()])
        print</pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.fromimport"></a><a name="importing_modules.html">5.2.&nbsp;使用 <tt class="literal">from <i class="replaceable">module</i> import</tt> 导入模块
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 有两种导入模块的方法。两种都有用，你应该知道什么时候使用哪一种方法。一种方法，<tt class="literal">import <i class="replaceable">module</i></tt>，你已经在<a href="../getting_to_know_python/everything_is_an_object.html" title="2.4.&nbsp;万物皆对象">第&nbsp;2.4&nbsp;节 “万物皆对象”</a>看过了。另一种方法完成同样的事情，但是它与第一种有着细微但重要的区别。
            </p>
         </div>
         <div class="informalexample">
            <p>下面是 <tt class="literal">from <i class="replaceable">module</i> import</tt> 的基本语法：
            </p><pre class="programlisting"><span class='pykeyword'>
from</span> UserDict <span class='pykeyword'>import</span> UserDict
</pre></div>
         <p>它与你所熟知的 <a href="../getting_to_know_python/everything_is_an_object.html#odbchelper.import" title="例&nbsp;2.3.&nbsp;访问 buildConnectionString 函数的 doc string"><tt class="literal">import <i class="replaceable">module</i></tt></a> 语法很相似，但是有一个重要的区别：<tt class="filename">UserDict</tt> 被直接导入到局部名字空间去了，所以它可以直接使用，而不需要加上模块名的限定。你可以导入独立的项或使用 <tt class="literal">from <i class="replaceable">module</i> import *</tt> 来导入所有东西。
         </p><a name="compare.fromimport.perl"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.class"></a><a name="defining_classes.html">5.3.&nbsp;类的定义
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="defining_classes.html#d0e11869">5.3.1. 初始化并开始类编码</a></span></li>
               <li><span class="section"><a href="defining_classes.html#d0e12045">5.3.2. 了解何时去使用 self 和 __init__</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 是完全面向对象的：你可以定义自已的类，从自已的或内置的类继承，然后从你定义的类创建实例。
            </p>
         </div>
         <p>在 <span class="application">Python</span> 中定义类很简单。就像定义函数，没有单独的接口定义。只要定义类，然后就可以开始编码。<span class="application">Python</span> 类以保留字 <tt class="literal">class</tt> 开始，后面跟着类名。从技术上讲，有这些就够了，因为一个类并非必须从其它类继承。
         </p>
         <div class="example"><a name="fileinfo.class.simplest"></a><h3 class="title">例&nbsp;5.3.&nbsp;最简单的 <span class="application">Python</span> 类
            </h3><pre class="programlisting"><span class='pykeyword'>
class</span> Loaf: <a name="fileinfo.class.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    <span class='pykeyword'>pass</span>    <a name="fileinfo.class.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12"> <a name="fileinfo.class.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.create"></a><a name="instantiating_classes.html">5.4.&nbsp;类的实例化
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="instantiating_classes.html#d0e12314">5.4.1. 垃圾回收</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>在 <span class="application">Python</span> 中对类进行实例化很直接。要对类进行实例化，只要调用类 (就好像它是一个函数)，传入定义在 <tt class="function">__init__</tt> 方法中的参数。返回值将是新创建的对象。
            </p>
         </div>
         <div class="example"><a name="d0e12149"></a><h3 class="title">例&nbsp;5.7.&nbsp;创建 <tt class="classname">FileInfo</tt> 实例
            </h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> fileinfo</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f = fileinfo.FileInfo(<span class='pystring'>"/music/_singles/kairo.mp3"</span>)</span> <a name="fileinfo.create.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.__class__</span>                                        <a name="fileinfo.create.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;class fileinfo.FileInfo at 010EC204&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.__doc__</span>                                          <a name="fileinfo.create.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'store file metadata'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f</span>                                                  <a name="fileinfo.create.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">{'name': '/music/_singles/kairo.mp3'}</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.userdict"></a><a name="userdict.html">5.5.&nbsp;探索 <tt class="classname">UserDict</tt>：一个封装类
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>如你所见，<tt class="classname">FileInfo</tt> 是一个有着像字典一样的行为方式的类。为了进一步揭示这一点，让我们看一看在 <tt class="filename">UserDict</tt> 模块中的 <tt class="classname">UserDict</tt> 类，它是我们的 <tt class="classname">FileInfo</tt> 类的父类。它没有什么特别的，也是用 <span class="application">Python</span> 写的，并且保存在一个 <tt class="literal">.py</tt> 文件里，就像我们其他的代码。特别之处在于，它保存在你的 <span class="application">Python</span> 安装目录的 <tt class="filename">lib</tt> 目录下。
            </p>
         </div><a name="tip.locate"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.specialmethods"></a><a name="special_class_methods.html">5.6.&nbsp;专用类方法
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="special_class_methods.html#d0e13019">5.6.1. 获得和设置数据项</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>除了普通的类方法，<span class="application">Python</span> 类还可以定义专用方法。专用方法是在特殊情况下或当使用特别语法时由 <span class="application">Python</span> 替你调用的，而不是在代码中直接调用 (像普通的方法那样)。
            </p>
         </div>
         <p>就像你在<a href="userdict.html" title="5.5.&nbsp;探索 UserDict：一个封装类">上一节</a>所看到的，普通的方法对在类中封装字典很有帮助。但是只有普通方法是不够的，因为除了对字典调用方法之外，还有很多事情可以做的。例如，你可以通过一种没有包括明确方法调用的语法来<a href="../native_data_types/index.html#odbchelper.dict.define" title="例&nbsp;3.1.&nbsp;定义 Dictionary">获得</a>和<a href="../native_data_types/index.html#odbchelper.dict.modify" title="例&nbsp;3.2.&nbsp;修改 Dictionary">设置</a>数据项。这就是专用方法产生的原因：它们提供了一种方法，可以将非方法调用语法映射到方法调用上。
         </p>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e13019"></a>5.6.1.&nbsp;获得和设置数据项
                     </h3>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="example"><a name="d0e13022"></a><h3 class="title">例&nbsp;5.12.&nbsp;<tt class="function">__getitem__</tt> 专用方法
               </h3><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> __getitem__</span>(self, key): <span class='pykeyword'>return</span> self.data[key]</pre><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f = fileinfo.FileInfo(<span class='pystring'>"/music/_singles/kairo.mp3"</span>)</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f</span>
<span class="computeroutput">{'name':'/music/_singles/kairo.mp3'}</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f.__getitem__(<span class='pystring'>"name"</span>)</span> <a name="fileinfo.specialmethods.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">'/music/_singles/kairo.mp3'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">f[<span class='pystring'>"name"</span>]</span>             <a name="fileinfo.specialmethods.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">'/music/_singles/kairo.mp3'</span></pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.morespecial"></a><a name="special_class_methods2.html">5.7.&nbsp;高级专用类方法
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>除了 <tt class="function">__getitem__</tt> 和 <tt class="function">__setitem__</tt> 之外 <span class="application">Python</span> 还有更多的专用函数。某些可以让你模拟出你甚至可能不知道的功能。
            </p>
         </div>
         <p>下面的例子将展示 <tt class="filename">UserDict</tt> 一些其他专用方法。
         </p>
         <div class="example"><a name="fileinfo.morespecial.example"></a><h3 class="title">例&nbsp;5.16.&nbsp;<tt class="classname">UserDict</tt> 中更多的专用方法
            </h3><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> __repr__</span>(self): <span class='pykeyword'>return</span> repr(self.data)     <a name="fileinfo.morespecial.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    <span class='pykeyword'>def</span><span class='pyclass'> __cmp__</span>(self, dict):                       <a name="fileinfo.morespecial.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        <span class='pykeyword'>if</span> isinstance(dict, UserDict):            
            <span class='pykeyword'>return</span> cmp(self.data, dict.data)      
        <span class='pykeyword'>else</span>:                                     
            <span class='pykeyword'>return</span> cmp(self.data, dict)           
    <span class='pykeyword'>def</span><span class='pyclass'> __len__</span>(self): <span class='pykeyword'>return</span> len(self.data)       <a name="fileinfo.morespecial.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
    <span class='pykeyword'>def</span><span class='pyclass'> __delitem__</span>(self, key): <span class='pykeyword'>del</span> self.data[key] <a name="fileinfo.morespecial.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.classattributes"></a><a name="class_attributes.html">5.8.&nbsp;类属性介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你已经知道了<a href="userdict.html#fileinfo.userdict.init.example" title="例&nbsp;5.9.&nbsp;定义 UserDict 类">数据属性</a>，它们是被一个特定的类实例所拥有的变量。<span class="application">Python</span> 也支持类属性，它们是由类本身所拥有的。
            </p>
         </div>
         <div class="example"><a name="fileinfo.classattributes.intro"></a><h3 class="title">例&nbsp;5.17.&nbsp;类属性介绍</h3><pre class="programlisting"><span class='pykeyword'>
class</span> MP3FileInfo(FileInfo):
    <span class='pystring'>"store ID3v1.0 MP3 tags"</span>
    tagDataMap = {<span class='pystring'>"title"</span>   : (  3,  33, stripnulls),
                  <span class='pystring'>"artist"</span>  : ( 33,  63, stripnulls),
                  <span class='pystring'>"album"</span>   : ( 63,  93, stripnulls),
                  <span class='pystring'>"year"</span>    : ( 93,  97, stripnulls),
                  <span class='pystring'>"comment"</span> : ( 97, 126, stripnulls),
                  <span class='pystring'>"genre"</span>   : (127, 128, ord)}</pre><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> fileinfo</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">fileinfo.MP3FileInfo</span>            <a name="fileinfo.classattributes.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">&lt;class fileinfo.MP3FileInfo at 01257FDC&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">fileinfo.MP3FileInfo.tagDataMap</span> <a name="fileinfo.classattributes.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">{'title': (3, 33, &lt;function stripnulls at 0260C8D4&gt;), 
'genre': (127, 128, &lt;built-in function ord&gt;), 
'artist': (33, 63, &lt;function stripnulls at 0260C8D4&gt;), 
'year': (93, 97, &lt;function stripnulls at 0260C8D4&gt;), 
'comment': (97, 126, &lt;function stripnulls at 0260C8D4&gt;), 
'album': (63, 93, &lt;function stripnulls at 0260C8D4&gt;)}</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">m = fileinfo.MP3FileInfo()</span>      <a name="fileinfo.classattributes.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">m.tagDataMap</span>
<span class="computeroutput">{'title': (3, 33, &lt;function stripnulls at 0260C8D4&gt;), 
'genre': (127, 128, &lt;built-in function ord&gt;), 
'artist': (33, 63, &lt;function stripnulls at 0260C8D4&gt;), 
'year': (93, 97, &lt;function stripnulls at 0260C8D4&gt;), 
'comment': (97, 126, &lt;function stripnulls at 0260C8D4&gt;), 
'album': (63, 93, &lt;function stripnulls at 0260C8D4&gt;)}</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.private"></a><a name="private_functions.html">5.9.&nbsp;私有函数
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <p>与大多数语言一样，<span class="application">Python</span> 也有私有的概念：
         </p>
         <div class="itemizedlist">
            <ul>
               <li>私有函数不可以从它们的模块外面被调用</li>
               <li>私有类方法不能够从它们的类外面被调用</li>
               <li>私有属性不能够从它们的类外面被访问</li>
            </ul>
         </div>
         <div class="abstract">
            <p>与大多数的语言不同，一个 <span class="application">Python</span> 函数，方法，或属性是私有还是公有，完全取决于它的名字。
            </p>
         </div>
         <p>如果一个 <span class="application">Python</span> 函数，类方法，或属性的名字以两个下划线开始 (但不是结束)，它是私有的；其它所有的都是公有的。
            <span class="application">Python</span> 没有类方法<span class="emphasis"><em>保护</em></span> 的概念 (只能用于它们自已的类和子类中)。类方法或者是私有 (只能在它们自已的类中使用) 或者是公有 (任何地方都可使用)。
         </p>
         <p>在 <tt class="classname">MP3FileInfo</tt> 中，有两个方法：<tt class="function">__parse</tt> 和 <tt class="function">__setitem__</tt>。正如我们已经讨论过的，<tt class="function">__setitem__</tt> 是一个<a href="special_class_methods.html#fileinfo.specialmethods.setitem.example" title="例&nbsp;5.13.&nbsp;__setitem__ 专用方法">专有方法</a>；通常，你不直接调用它，而是通过在一个类上使用字典语法来调用，但它是公有的，并且如果有一个真正好的理由，你可以直接调用它 (甚至从 <tt class="filename">fileinfo</tt> 模块的外面)。然而，<tt class="function">__parse</tt> 是私有的，因为在它的名字前面有两个下划线。
         </p><a name="tip.specialmethodnames"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="fileinfo.summary"></a><a name="summary.html">5.10.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>实打实的对象把戏到此为止。你将在 <a href="../soap_web_services/index.html">第 12 章</a> 中看到一个真实世界应用程序的专有类方法，它使用 <tt class="function">getattr</tt> 创建一个到远程 Web 服务的代理。
            </p>
         </div>
         <p>下一章将继续使用本章的例程探索其他 <span class="application">Python</span> 的概念，例如：异常、文件对象 和 <tt class="literal">for</tt> 循环。
         </p>
         <p>在研究下一章之前，确保你可以无困难地完成下面的事情：</p>
         <div class="itemizedlist">
            <ul>
               <li>使用 <a href="../getting_to_know_python/everything_is_an_object.html#odbchelper.import" title="例&nbsp;2.3.&nbsp;访问 buildConnectionString 函数的 doc string"><tt class="literal">import <i class="replaceable">module</i></tt></a> 或 <a href="importing_modules.html" title="5.2.&nbsp;使用 from module import 导入模块"><tt class="literal">from <i class="replaceable">module</i> import</tt></a>导入模块
               </li>
               <li><a href="defining_classes.html" title="5.3.&nbsp;类的定义">定义</a>和<a href="instantiating_classes.html" title="5.4.&nbsp;类的实例化">实例化</a>类
               </li>
               <li>定义 <a href="defining_classes.html#fileinfo.class.example" title="例&nbsp;5.4.&nbsp;定义 FileInfo 类"><tt class="function">__init__</tt> 方法</a>和其他<a href="special_class_methods.html" title="5.6.&nbsp;专用类方法">专用类方法</a>，并理解它们何时会调用
               </li>
               <li>子类化 <a href="userdict.html" title="5.5.&nbsp;探索 UserDict：一个封装类"><tt class="classname">UserDict</tt></a> 来定义行为像字典的类
               </li>
               <li>定义<a href="userdict.html#fileinfo.userdict.init.example" title="例&nbsp;5.9.&nbsp;定义 UserDict 类">数据属性</a>和<a href="class_attributes.html" title="5.8.&nbsp;类属性介绍">类属性</a>，并理解它们之间的不同
               </li>
               <li>定义<a href="private_functions.html" title="5.9.&nbsp;私有函数">私有属性和方法</a></li>
            </ul>
         </div>
      </div>
      
