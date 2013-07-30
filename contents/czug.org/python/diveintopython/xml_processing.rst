<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/xml_processing/index.html">http://www.woodpecker.org.cn/diveintopython/xml_processing/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp"></a>第&nbsp;9&nbsp;章&nbsp;<span class="acronym">XML</span> 处理
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#kgp.divein">9.1. 概览</a></span></li>
               <li><span class="section"><a href="#packages.html">9.2. 包</a></span></li>
               <li><span class="section"><a href="#parsing_xml.html">9.3. XML 解析</a></span></li>
               <li><span class="section"><a href="#unicode.html">9.4. Unicode</a></span></li>
               <li><span class="section"><a href="#searching.html">9.5. 搜索元素</a></span></li>
               <li><span class="section"><a href="#attributes.html">9.6. 访问元素属性</a></span></li>
               <li><span class="section"><a href="#summary.html">9.7. Segue </a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="kgp.divein"></a>9.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <p>下面两章是关于 <span class="application">Python</span> 中 <span class="acronym">XML</span> 处理的。如果你已经对 <span class="acronym">XML</span> 文档有了一个大概的了解，比如它是由结构化标记构成的，这些标记形成了层次模型的元素，等等这些知识都是有帮助的。如果你不明白这些，这里有<a href="http://directory.google.com/Top/Computers/Data_Formats/Markup_Languages/XML/Resources/FAQs,_Help,_and_Tutorials/">很多 <span class="acronym">XML</span> 教程</a>能够解释这些基础知识。
            </p>
            <p>如果你对 XML 不是很感兴趣，你还是应该读一下这些章节，它们涵盖了不少重要的主题，比如 <span class="application">Python</span> 包、Unicode、命令行参数以及如何使用 <tt class="function">getattr</tt> 进行方法分发。
            </p>
            <p>如果你在大学里主修哲学 (而不是像计算机科学这样的实用专业)，并且曾不幸地被伊曼努尔·康德的著作折磨地够呛，那么你会非常欣赏本章的样例程序。(这当然不意味着你必须修过哲学。)</p>
            <div class="abstract">
               <p>处理 <span class="acronym">XML</span> 有两种基本的方式。一种叫做 <span class="acronym">SAX</span> (“<span class="quote">Simple <span class="acronym">API</span> for <span class="acronym">XML</span></span>”)，它的工作方式是，一次读出一点 <span class="acronym">XML</span> 内容，然后对发现的每一个元素调用一个方法。(如果你读了 <a href="../html_processing/index.html" title="第&nbsp;8&nbsp;章&nbsp;HTML 处理">第&nbsp;8&nbsp;章 <i>HTML 处理</i></a>，这应该听起来很熟悉，因为这是 <tt class="filename">sgmllib</tt> 工作的方式。) 另一种方式叫做 <span class="acronym">DOM</span> (“<span class="quote">Document Object Model</span>”)，它的工作方式是，一次性读入整个 <span class="acronym">XML</span> 文档，然后使用 <span class="application">Python</span> 类创建一个内部表示形式 (以树结构进行连接)。<span class="application">Python</span> 拥有这两种解析方式的标准模块，但是本章只涉及 <span class="acronym">DOM</span>。
               </p>
            </div>
            <p>下面是一个完整的 <span class="application">Python</span> 程序，它根据 <span class="acronym">XML</span> 格式定义的上下文无关语法生成伪随机输出。如果你不明白是什么意思，不用担心，下面两章中将会深入检视这个程序的输入和输出。
            </p>
            <div class="example"><a name="d0e23015"></a><h3 class="title">例&nbsp;9.1.&nbsp;<tt class="filename">kgp.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting">
<span class='pystring'>"""Kant Generator for Python

Generates mock philosophy based on a context-free grammar

Usage: python kgp.py [options] [source]

Options:
  -g ..., --grammar=...   use specified grammar file or URL
  -h, --help              show this help
  -d                      show debugging information while parsing

Examples:
  kgp.py                  generates several paragraphs of Kantian philosophy
  kgp.py -g husserl.xml   generates several paragraphs of Husserl
  kpg.py "&lt;xref id='paragraph'/&gt;"  generates a paragraph of Kant
  kgp.py template.xml     reads from template.xml to decide what to generate
"""</span>
<span class='pykeyword'>from</span> xml.dom <span class='pykeyword'>import</span> minidom
<span class='pykeyword'>import</span> random
<span class='pykeyword'>import</span> toolbox
<span class='pykeyword'>import</span> sys
<span class='pykeyword'>import</span> getopt

_debug = 0

<span class='pykeyword'>class</span><span class='pyclass'> NoSourceError</span>(Exception): <span class='pykeyword'>pass</span>

<span class='pykeyword'>class</span><span class='pyclass'> KantGenerator</span>:
    <span class='pystring'>"""generates mock philosophy based on a context-free grammar"""</span>

    <span class='pykeyword'>def</span><span class='pyclass'> __init__</span>(self, grammar, source=None):
        self.loadGrammar(grammar)
        self.loadSource(source <span class='pykeyword'>and</span> source <span class='pykeyword'>or</span> self.getDefaultSource())
        self.refresh()

    <span class='pykeyword'>def</span><span class='pyclass'> _load</span>(self, source):
        <span class='pystring'>"""load XML input source, return parsed XML document

        - a URL of a remote XML file ("http://diveintopython.org/kant.xml")
        - a filename of a local XML file ("~/diveintopython/common/py/kant.xml")
        - standard input ("-")
        - the actual XML document, as a string
        """</span>
        sock = toolbox.openAnything(source)
        xmldoc = minidom.parse(sock).documentElement
        sock.close()
        <span class='pykeyword'>return</span> xmldoc

    <span class='pykeyword'>def</span><span class='pyclass'> loadGrammar</span>(self, grammar):                         
        <span class='pystring'>"""load context-free grammar"""</span>                     
        self.grammar = self._load(grammar)                  
        self.refs = {}                                      
        <span class='pykeyword'>for</span> ref <span class='pykeyword'>in</span> self.grammar.getElementsByTagName(<span class='pystring'>"ref"</span>):
            self.refs[ref.attributes[<span class='pystring'>"id"</span>].value] = ref     

    <span class='pykeyword'>def</span><span class='pyclass'> loadSource</span>(self, source):
        <span class='pystring'>"""load source"""</span>
        self.source = self._load(source)

    <span class='pykeyword'>def</span><span class='pyclass'> getDefaultSource</span>(self):
        <span class='pystring'>"""guess default source of the current grammar
        
        The default source will be one of the &lt;ref&gt;s that is not
        cross-referenced.  This sounds complicated but it's not.
        Example: The default source for kant.xml is
        "&lt;xref id='section'/&gt;", because 'section' is the one &lt;ref&gt;
        that is not &lt;xref&gt;'d anywhere in the grammar.
        In most grammars, the default source will produce the
        longest (and most interesting) output.
        """</span>
        xrefs = {}
        <span class='pykeyword'>for</span> xref <span class='pykeyword'>in</span> self.grammar.getElementsByTagName(<span class='pystring'>"xref"</span>):
            xrefs[xref.attributes[<span class='pystring'>"id"</span>].value] = 1
        xrefs = xrefs.keys()
        standaloneXrefs = [e <span class='pykeyword'>for</span> e <span class='pykeyword'>in</span> self.refs.keys() <span class='pykeyword'>if</span> e <span class='pykeyword'>not</span> <span class='pykeyword'>in</span> xrefs]
        <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> standaloneXrefs:
            <span class='pykeyword'>raise</span> NoSourceError, <span class='pystring'>"can't guess source, and no source specified"</span>
        <span class='pykeyword'>return</span> <span class='pystring'>'&lt;xref id="%s"/&gt;'</span> % random.choice(standaloneXrefs)
        
    <span class='pykeyword'>def</span><span class='pyclass'> reset</span>(self):
        <span class='pystring'>"""reset parser"""</span>
        self.pieces = []
        self.capitalizeNextWord = 0

    <span class='pykeyword'>def</span><span class='pyclass'> refresh</span>(self):
        <span class='pystring'>"""reset output buffer, re-parse entire source file, and return output
        
        Since parsing involves a good deal of randomness, this is an
        easy way to get new output without having to reload a grammar file
        each time.
        """</span>
        self.reset()
        self.parse(self.source)
        <span class='pykeyword'>return</span> self.output()

    <span class='pykeyword'>def</span><span class='pyclass'> output</span>(self):
        <span class='pystring'>"""output generated text"""</span>
        <span class='pykeyword'>return</span> <span class='pystring'>""</span>.join(self.pieces)

    <span class='pykeyword'>def</span><span class='pyclass'> randomChildElement</span>(self, node):
        <span class='pystring'>"""choose a random child element of a node
        
        This is a utility method used by do_xref and do_choice.
        """</span>
        choices = [e <span class='pykeyword'>for</span> e <span class='pykeyword'>in</span> node.childNodes
                   <span class='pykeyword'>if</span> e.nodeType == e.ELEMENT_NODE]
        chosen = random.choice(choices)            
        <span class='pykeyword'>if</span> _debug:                                 
            sys.stderr.write(<span class='pystring'>'%s available choices: %s\n'</span> % \
                (len(choices), [e.toxml() <span class='pykeyword'>for</span> e <span class='pykeyword'>in</span> choices]))
            sys.stderr.write(<span class='pystring'>'Chosen: %s\n'</span> % chosen.toxml())
        <span class='pykeyword'>return</span> chosen                              

    <span class='pykeyword'>def</span><span class='pyclass'> parse</span>(self, node):         
        <span class='pystring'>"""parse a single XML node
        
        A parsed XML document (from minidom.parse) is a tree of nodes
        of various types.  Each node is represented by an instance of the
        corresponding Python class (Element for a tag, Text for
        text data, Document for the top-level document).  The following
        statement constructs the name of a class method based on the type
        of node we're parsing ("parse_Element" for an Element node,
        "parse_Text" for a Text node, etc.) and then calls the method.
        """</span>
        parseMethod = getattr(self, <span class='pystring'>"parse_%s"</span> % node.__class__.__name__)
        parseMethod(node)

    <span class='pykeyword'>def</span><span class='pyclass'> parse_Document</span>(self, node):
        <span class='pystring'>"""parse the document node
        
        The document node by itself isn't interesting (to us), but
        its only child, node.documentElement, is: it's the root node
        of the grammar.
        """</span>
        self.parse(node.documentElement)

    <span class='pykeyword'>def</span><span class='pyclass'> parse_Text</span>(self, node):    
        <span class='pystring'>"""parse a text node
        
        The text of a text node is usually added to the output buffer
        verbatim.  The one exception is that &lt;p class='sentence'&gt; sets
        a flag to capitalize the first letter of the next word.  If
        that flag is set, we capitalize the text and reset the flag.
        """</span>
        text = node.data
        <span class='pykeyword'>if</span> self.capitalizeNextWord:
            self.pieces.append(text[0].upper())
            self.pieces.append(text[1:])
            self.capitalizeNextWord = 0
        <span class='pykeyword'>else</span>:
            self.pieces.append(text)

    <span class='pykeyword'>def</span><span class='pyclass'> parse_Element</span>(self, node): 
        <span class='pystring'>"""parse an element
        
        An XML element corresponds to an actual tag in the source:
        &lt;xref id='...'&gt;, &lt;p chance='...'&gt;, &lt;choice&gt;, etc.
        Each element type is handled in its own method.  Like we did in
        parse(), we construct a method name based on the name of the
        element ("do_xref" for an &lt;xref&gt; tag, etc.) and
        call the method.
        """</span>
        handlerMethod = getattr(self, <span class='pystring'>"do_%s"</span> % node.tagName)
        handlerMethod(node)

    <span class='pykeyword'>def</span><span class='pyclass'> parse_Comment</span>(self, node):
        <span class='pystring'>"""parse a comment
        
        The grammar can contain XML comments, but we ignore them
        """</span>
        <span class='pykeyword'>pass</span>
    
    <span class='pykeyword'>def</span><span class='pyclass'> do_xref</span>(self, node):
        <span class='pystring'>"""handle &lt;xref id='...'&gt; tag
        
        An &lt;xref id='...'&gt; tag is a cross-reference to a &lt;ref id='...'&gt;
        tag.  &lt;xref id='sentence'/&gt; evaluates to a randomly chosen child of
        &lt;ref id='sentence'&gt;.
        """</span>
        id = node.attributes[<span class='pystring'>"id"</span>].value
        self.parse(self.randomChildElement(self.refs[id]))

    <span class='pykeyword'>def</span><span class='pyclass'> do_p</span>(self, node):
        <span class='pystring'>"""handle &lt;p&gt; tag
        
        The &lt;p&gt; tag is the core of the grammar.  It can contain almost
        anything: freeform text, &lt;choice&gt; tags, &lt;xref&gt; tags, even other
        &lt;p&gt; tags.  If a "class='sentence'" attribute is found, a flag
        is set and the next word will be capitalized.  If a "chance='X'"
        attribute is found, there is an X% chance that the tag will be
        evaluated (and therefore a (100-X)% chance that it will be
        completely ignored)
        """</span>
        keys = node.attributes.keys()
        <span class='pykeyword'>if</span> <span class='pystring'>"class"</span> <span class='pykeyword'>in</span> keys:
            <span class='pykeyword'>if</span> node.attributes[<span class='pystring'>"class"</span>].value == <span class='pystring'>"sentence"</span>:
                self.capitalizeNextWord = 1
        <span class='pykeyword'>if</span> <span class='pystring'>"chance"</span> <span class='pykeyword'>in</span> keys:
            chance = int(node.attributes[<span class='pystring'>"chance"</span>].value)
            doit = (chance &gt; random.randrange(100))
        <span class='pykeyword'>else</span>:
            doit = 1
        <span class='pykeyword'>if</span> doit:
            <span class='pykeyword'>for</span> child <span class='pykeyword'>in</span> node.childNodes: self.parse(child)

    <span class='pykeyword'>def</span><span class='pyclass'> do_choice</span>(self, node):
        <span class='pystring'>"""handle &lt;choice&gt; tag
        
        A &lt;choice&gt; tag contains one or more &lt;p&gt; tags.  One &lt;p&gt; tag
        is chosen at random and evaluated; the rest are ignored.
        """</span>
        self.parse(self.randomChildElement(node))

<span class='pykeyword'>def</span><span class='pyclass'> usage</span>():
    <span class='pykeyword'>print</span> __doc__

<span class='pykeyword'>def</span><span class='pyclass'> main</span>(argv):                         
    grammar = <span class='pystring'>"kant.xml"</span>                
    <span class='pykeyword'>try</span>:                                
        opts, args = getopt.getopt(argv, <span class='pystring'>"hg:d"</span>, [<span class='pystring'>"help"</span>, <span class='pystring'>"grammar="</span>])
    <span class='pykeyword'>except</span> getopt.GetoptError:          
        usage()                         
        sys.exit(2)                     
    <span class='pykeyword'>for</span> opt, arg <span class='pykeyword'>in</span> opts:               
        <span class='pykeyword'>if</span> opt <span class='pykeyword'>in</span> (<span class='pystring'>"-h"</span>, <span class='pystring'>"--help"</span>):     
            usage()                     
            sys.exit()                  
        <span class='pykeyword'>elif</span> opt == <span class='pystring'>'-d'</span>:               
            <span class='pykeyword'>global</span> _debug               
            _debug = 1                  
        <span class='pykeyword'>elif</span> opt <span class='pykeyword'>in</span> (<span class='pystring'>"-g"</span>, <span class='pystring'>"--grammar"</span>):
            grammar = arg               
    
    source = <span class='pystring'>""</span>.join(args)              

    k = KantGenerator(grammar, source)
    <span class='pykeyword'>print</span> k.output()

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:
    main(sys.argv[1:])
</pre></div>
            <div class="example"><a name="d0e23026"></a><h3 class="title">例&nbsp;9.2.&nbsp;<tt class="filename">toolbox.py</tt></h3><pre class="programlisting">
<span class='pystring'>"""Miscellaneous utility functions"""</span>

<span class='pykeyword'>def</span><span class='pyclass'> openAnything</span>(source):            
    <span class='pystring'>"""URI, filename, or string --&gt; stream

    This function lets you define parsers that take any input source
    (URL, pathname to local or network file, or actual data as a string)
    and deal with it in a uniform manner.  Returned object is guaranteed
    to have all the basic stdio read methods (read, readline, readlines).
    Just .close() the object when you're done with it.
    
    Examples:
    &gt;&gt;&gt; from xml.dom import minidom
    &gt;&gt;&gt; sock = openAnything("http://localhost/kant.xml")
    &gt;&gt;&gt; doc = minidom.parse(sock)
    &gt;&gt;&gt; sock.close()
    &gt;&gt;&gt; sock = openAnything("c:\\inetpub\\wwwroot\\kant.xml")
    &gt;&gt;&gt; doc = minidom.parse(sock)
    &gt;&gt;&gt; sock.close()
    &gt;&gt;&gt; sock = openAnything("&lt;ref id='conjunction'&gt;&lt;text&gt;and&lt;/text&gt;&lt;text&gt;or&lt;/text&gt;&lt;/ref&gt;")
    &gt;&gt;&gt; doc = minidom.parse(sock)
    &gt;&gt;&gt; sock.close()
    """</span>
    <span class='pykeyword'>if</span> hasattr(source, <span class='pystring'>"read"</span>):
        <span class='pykeyword'>return</span> source

    <span class='pykeyword'>if</span> source == <span class='pystring'>'-'</span>:
        <span class='pykeyword'>import</span> sys
        <span class='pykeyword'>return</span> sys.stdin

    <span class='pycomment'># try to open with urllib (if source is http, ftp, or file URL)</span>
    <span class='pykeyword'>import</span> urllib                         
    <span class='pykeyword'>try</span>:                                  
        <span class='pykeyword'>return</span> urllib.urlopen(source)     
    <span class='pykeyword'>except</span> (IOError, OSError):            
        <span class='pykeyword'>pass</span>                              
    
    <span class='pycomment'># try to open with native open function (if source is pathname)</span>
    <span class='pykeyword'>try</span>:                                  
        <span class='pykeyword'>return</span> open(source)               
    <span class='pykeyword'>except</span> (IOError, OSError):            
        <span class='pykeyword'>pass</span>                              
    
    <span class='pycomment'># treat source as string</span>
    <span class='pykeyword'>import</span> StringIO                       
    <span class='pykeyword'>return</span> StringIO.StringIO(str(source)) 
</pre></div>
            <p>独立运行程序 <tt class="filename">kgp.py</tt>，它会解析 <tt class="filename">kant.xml</tt> 中默认的基于 <span class="acronym">XML</span> 的语法，并以康德的风格打印出几段有哲学价值的段落来。
            </p>
            <div class="example"><a name="d0e23043"></a><h3 class="title">例&nbsp;9.3.&nbsp;<tt class="filename">kgp.py</tt> 的样例输出
               </h3><pre class="screen"><tt class="prompt">[you@localhost kgp]$ python kgp.py</tt>
<span class="computeroutput">     As is shown in the writings of Hume, our a priori concepts, in
reference to ends, abstract from all content of knowledge; in the study
of space, the discipline of human reason, in accordance with the
principles of philosophy, is the clue to the discovery of the
Transcendental Deduction.  The transcendental aesthetic, in all
theoretical sciences, occupies part of the sphere of human reason
concerning the existence of our ideas in general; still, the
never-ending regress in the series of empirical conditions constitutes
the whole content for the transcendental unity of apperception.  What
we have alone been able to show is that, even as this relates to the
architectonic of human reason, the Ideal may not contradict itself, but
it is still possible that it may be in contradictions with the
employment of the pure employment of our hypothetical judgements, but
natural causes (and I assert that this is the case) prove the validity
of the discipline of pure reason.  As we have already seen, time (and
it is obvious that this is true) proves the validity of time, and the
architectonic of human reason, in the full sense of these terms,
abstracts from all content of knowledge.  I assert, in the case of the
discipline of practical reason, that the Antinomies are just as
necessary as natural causes, since knowledge of the phenomena is a
posteriori.
    The discipline of human reason, as I have elsewhere shown, is by
its very nature contradictory, but our ideas exclude the possibility of
the Antinomies.  We can deduce that, on the contrary, the pure
employment of philosophy, on the contrary, is by its very nature
contradictory, but our sense perceptions are a representation of, in
the case of space, metaphysics.  The thing in itself is a
representation of philosophy.  Applied logic is the clue to the
discovery of natural causes.  However, what we have alone been able to
show is that our ideas, in other words, should only be used as a canon
for the Ideal, because of our necessary ignorance of the conditions.

[...snip...]</span></pre></div>
            <p>这当然是胡言乱语。噢，不完全是胡言乱语。它在句法和语法上都是正确的 (尽管非常罗嗦――康德可不是你们所说的踩得到点上的那种人)。其中一些实际上是正确的 (或者至少康德可能会认同的事情)，其中一些则明显是错误的，大部分只是语无伦次。但所有内容都符合康德的风格。
               
            </p>
            <p>让我重复一遍，如果你现在或曾经主修哲学专业，这会非常、非常有趣。</p>
            <p>有趣之处在于，这个程序中没有一点内容是属于康德的。所有的内容都来自于上下文无关语法文件 <tt class="filename">kant.xml</tt>。如果你要程序使用不同的语法文件 (可以在命令行中指定)，输出信息将完全不同。
            </p>
            <div class="example"><a name="d0e23063"></a><h3 class="title">例&nbsp;9.4.&nbsp;<tt class="filename">kgp.py</tt> 的简单输出
               </h3><pre class="screen"><tt class="prompt">[you@localhost kgp]$ python kgp.py -g binary.xml</tt>
<span class="computeroutput">00101001</span>
<tt class="prompt">[you@localhost kgp]$ python kgp.py -g binary.xml</tt>
<span class="computeroutput">10110100</span></pre></div>
            <p>在本章后面的内容中，你将近距离地观察语法文件的结构。现在，你只要知道语法文件定义了输出信息的结构，而 <tt class="filename">kgp.py</tt> 程序读取语法规则并随机确定哪些单词插入哪里。
               
            </p>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.packages"></a><a name="packages.html">9.2.&nbsp;包
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>实际上解析一个 <span class="acronym">XML</span> 文档是很简单的：只要一行代码。但是，在你接触那行代码前，需要暂时岔开一下，讨论一下包。
            </p>
         </div>
         <div class="example"><a name="d0e23095"></a><h3 class="title">例&nbsp;9.5.&nbsp;载入一个 <span class="acronym">XML</span> 文档 (偷瞥一下)
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> xml.dom <span class='pykeyword'>import</span> minidom</span> <a name="kgp.packages.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc = minidom.parse(<span class='pystring'>'~/diveintopython/common/py/kgp/binary.xml'</span>)</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.parse"></a><a name="parsing_xml.html">9.3.&nbsp;<span class="acronym">XML</span> 解析
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>正如我说的，实际解析一个 <span class="acronym">XML</span> 文档是非常简单的：只要一行代码。从这里出发到哪儿去就是你自己的事了。
            </p>
         </div>
         <div class="example"><a name="d0e23416"></a><h3 class="title">例&nbsp;9.8.&nbsp;载入一个 <span class="acronym">XML</span> 文档 (这次是真的)
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> xml.dom <span class='pykeyword'>import</span> minidom</span>                                          <a name="kgp.parse.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc = minidom.parse(<span class='pystring'>'~/diveintopython/common/py/kgp/binary.xml'</span>)</span>  <a name="kgp.parse.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc</span>                                                               <a name="kgp.parse.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;xml.dom.minidom.Document instance at 010BE87C&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> xmldoc.toxml()</span>                                                 <a name="kgp.parse.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
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
                  <h2 class="title"><a name="kgp.unicode"></a><a name="unicode.html">9.4.&nbsp;Unicode
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>Unicode 是一个系统，用来表示世界上所有不同语言的字符。当 <span class="application">Python</span> 解析一个 <span class="acronym">XML</span> 文档时，所有的数据都是以unicode的形式保存在内存中的。
            </p>
         </div>
         <p>一会儿你就会了解，但首先，先看一些背景知识。</p>
         <p><b>历史注解.&nbsp;</b>在 unicode 之前，对于每一种语言都存在独立的字符编码系统，每个系统都使用相同的数字(0-255)来表示这种语言的字符。一些语言 (像俄语) 对于如何表示相同的字符还有几种有冲突的标准；另一些语言 (像日语) 拥有太多的字符，需要多个字符集。在系统之间进行文档交流是困难的，因为对于一台计算机来说，没有方法可以识别出文档的作者使用了哪种编码模式；计算机看到的只是数字，并且这些数字可以表示不同的东西。接着考虑到试图将这些
            (采用不同编码的) 文档存放到同一个地方 (比如在同一个数据库表中)；你需要在每段文本的旁边保存字符的编码，并且确保在传递文本的同时将编码也进行传递。接着考虑多语言文档，即在同一文档中使用了不同语言的字符。(比较有代表性的是使用转义符来进行模式切换；噗，我们处于俄语
            koi8-r 模式，所以字符 241 表示这个；噗，现在我们处于 Mac 希腊语模式，所以字符 241 表示其它什么。等等。) 这些就是 unicode 被设计出来要解决的问题。
            
         </p>
         <p>为了解决这些问题，unicode 用一个 2 字节数字表示每个字符，从 0 到 65535。<sup>[<a name="d0e23957" href="#ftn.d0e23957">8</a>]</sup> 每个 2 字节数字表示至少在一种世界语言中使用的一个唯一字符。(在多种语言中都使用的字符具有相同的数字码。) 这样就确保每个字符一个数字，并且每个数字一个字符。Unicode 数据永远不会模棱两可。
         </p>
         <p>当然，仍然还存在着所有那些遗留的编码系统的情况。例如，7 位 <span class="acronym">ASCII</span>，它可以将英文字符存诸为从 0 到 127 的数值。(65 是大写字母 “<span class="quote"><tt class="literal">A</tt></span>”，97 是小写字母 “<span class="quote"><tt class="literal">a</tt></span>”，等等。) 英语有着非常简单的字母表，所以它可以完全用 7 位 <span class="acronym">ASCII</span> 来表示。像法语、西班牙语和德语之类的西欧语言都使用叫做 ISO-8859-1 的编码系统 (也叫做“<span class="quote">latin-1</span>”)，它使用 7 位 <span class="acronym">ASCII</span> 字符表示从 0 到 127 的数字，但接着扩展到了 128-255 的范围来表示像 n 上带有一个波浪线(241)，和 u 上带有两个点(252)的字符。Unicode 在 0 到 127 上使用了同 7 位 <span class="acronym">ASCII</span> 码一样的字符表，在 128 到 255上同 ISO-8859-1 一样，接着使用剩余的数字，256 到 65535，扩展到表示其它语言的字符。
         </p>
         <p>在处理 unicode 数据时，在某些地方你可能需要将数据转换回这些遗留编码系统之一。例如，为了同其它一些计算机系统集成，这些系统期望它的数据使用一种特定的单字节编码模式，或将数据打印输出到一个不识别 unicode 的终端或打印机。或将数据保存到一个明确指定编码模式的
            <span class="acronym">XML</span> 文档中。
         </p>
         <p>在了解这个注解之后，让我们回到 <span class="application">Python</span>上来。
         </p>
         <p>从 2.0 版开始，<span class="application">Python</span> 整个语言都已经支持 unicode。<span class="acronym">XML</span> 包使用 unicode 来保存所有解析了的 <span class="acronym">XML</span> 数据，而且你可以在任何地方使用 unicode。
         </p>
         <div class="example"><a name="d0e24013"></a><h3 class="title">例&nbsp;9.13.&nbsp;unicode 介绍</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s = u<span class='pystring'>'Dive in'</span></span>            <a name="kgp.unicode.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s</span>
<span class="computeroutput">u'Dive in'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> s</span>                   <a name="kgp.unicode.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">Dive in</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.search"></a><a name="searching.html">9.5.&nbsp;搜索元素
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>通过一步步访问每一个节点的方式遍历 <span class="acronym">XML</span> 文档可能很乏味。如果你正在寻找些特别的东西，又恰恰它们深深埋入了你的 <span class="acronym">XML</span> 文档，有个捷径让你可以快速找到它：<tt class="function">getElementsByTagName</tt> 。
            </p>
         </div>
         <p>在这部分，将使用 <tt class="filename">binary.xml</tt> 语法文件，它的内容如下：
         </p>
         <div class="example"><a name="d0e24604"></a><h3 class="title">例&nbsp;9.20.&nbsp;<tt class="filename">binary.xml</tt></h3><pre class="screen"><span class="computeroutput">&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE grammar PUBLIC "-//diveintopython.org//DTD Kant Generator Pro v1.0//EN" "kgp.dtd"&gt;
&lt;grammar&gt;
&lt;ref id="bit"&gt;
  &lt;p&gt;0&lt;/p&gt;
  &lt;p&gt;1&lt;/p&gt;
&lt;/ref&gt;
&lt;ref id="byte"&gt;
  &lt;p&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;\
&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;/p&gt;
&lt;/ref&gt;
&lt;/grammar&gt;</span></pre></div>
         <p>它有两个 <tt class="sgmltag-element">ref</tt>，<tt class="literal">'bit'</tt> (位) 和 <tt class="literal">'byte'</tt> (字节)。一个 <tt class="literal">bit</tt> 是 <tt class="literal">'0'</tt> 或者 <tt class="literal">'1'</tt>，而一个 <tt class="literal">byte</tt> 是 8 个 <tt class="literal">bit</tt>。
         </p>
         <div class="example"><a name="d0e24637"></a><h3 class="title">例&nbsp;9.21.&nbsp;<tt class="function">getElementsByTagName</tt> 介绍
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> xml.dom <span class='pykeyword'>import</span> minidom</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">xmldoc = minidom.parse(<span class='pystring'>'binary.xml'</span>)</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">reflist = xmldoc.getElementsByTagName(<span class='pystring'>'ref'</span>)</span> <a name="kgp.search.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">reflist</span>
<span class="computeroutput">[&lt;DOM Element: ref at 136138108&gt;, &lt;DOM Element: ref at 136144292&gt;]</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> reflist[0].toxml()</span>
<span class="computeroutput">&lt;ref id="bit"&gt;
  &lt;p&gt;0&lt;/p&gt;
  &lt;p&gt;1&lt;/p&gt;
&lt;/ref&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> reflist[1].toxml()</span>
<span class="computeroutput">&lt;ref id="byte"&gt;
  &lt;p&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;\
&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;xref id="bit"/&gt;&lt;/p&gt;
&lt;/ref&gt;
</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.attributes"></a><a name="attributes.html">9.6.&nbsp;访问元素属性
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="acronym">XML</span> 元素可以有一个或者多个属性，只要已经解析了一个 <span class="acronym">XML</span> 文档，访问它们就太简单了。
            </p>
         </div>
         <p>在这部分中，将使用 <tt class="filename">binary.xml</tt> 语法文件，你在<a href="searching.html" title="9.5.&nbsp;搜索元素">上一节</a>中已经看到过了。
         </p><a name="d0e24920"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="kgp.segue"></a><a name="summary.html">9.7.&nbsp;Segue <sup>[<a name="d0e25195" href="#ftn.d0e25195">9</a></a>]</sup></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>以上就是 XML 的核心内容。下一章将使用相同的示例程序，但是焦点在于能使程序更加灵活的其它方面：使用输入流处理，使用 <tt class="function">getattr</tt> 进行方法分发，并使用命令行标识允许用户重新配置程序而无需修改代码。
            </p>
         </div>
         <p>在进入下一章前，你应该没有困难的完成这些事情：</p>
         <div class="itemizedlist">
            <ul>
               <li>使用 <tt class="filename">minidom</tt> <a href="parsing_xml.html" title="9.3.&nbsp;XML 解析">解析 <span class="acronym">XML</span> 文档</a>，<a href="searching.html" title="9.5.&nbsp;搜索元素">搜索已解析文档</a>，并以任意顺序访问<a href="attributes.html" title="9.6.&nbsp;访问元素属性">元素属性</a>和<a href="../scripts_and_streams/child_nodes.html" title="10.4.&nbsp;查找节点的直接子节点">元素子元素</a></li>
               <li>将复杂的库组织为<a href="packages.html" title="9.2.&nbsp;包">包</a></li>
               <li>将 <a href="unicode.html" title="9.4.&nbsp;Unicode">unicode 字符串转换</a>为不同的字符编码
               </li>
            </ul>
         </div>
         <div class="footnotes">
            <h3 class="footnotetitle">Footnotes</h3>
            <div class="footnote">
               <p><sup>[<a name="ftn.d0e25195" href="#d0e25195">9</a>] </sup>“Segue”是音乐术语，意为“继续演奏”。
               </p>
            </div>
         </div>
      </div>
      
