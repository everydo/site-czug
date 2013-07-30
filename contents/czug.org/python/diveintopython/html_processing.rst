<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/html_processing/index.html">http://www.woodpecker.org.cn/diveintopython/html_processing/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect"></a>第&nbsp;8&nbsp;章&nbsp;<span class="acronym">HTML</span> 处理
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#dialect.divein">8.1. 概览</a></span></li>
               <li><span class="section"><a href="#introducing_sgmllib.html">8.2. sgmllib.py 介绍</a></span></li>
               <li><span class="section"><a href="#extracting_data.html">8.3. 从 HTML 文档中提取数据</a></span></li>
               <li><span class="section"><a href="#basehtmlprocessor.html">8.4. BaseHTMLProcessor.py 介绍</a></span></li>
               <li><span class="section"><a href="#locals_and_globals.html">8.5. locals 和 globals</a></span></li>
               <li><span class="section"><a href="#dictionary_based_string_formatting.html">8.6. 基于 dictionary 的字符串格式化</a></span></li>
               <li><span class="section"><a href="#quoting_attribute_values.html">8.7. 给属性值加引号</a></span></li>
               <li><span class="section"><a href="#dialect.html">8.8. dialect.py 介绍</a></span></li>
               <li><span class="section"><a href="#all_together.html">8.9. 全部放在一起</a></span></li>
               <li><span class="section"><a href="#summary.html">8.10. 小结</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="dialect.divein"></a>8.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>
                  我经常在 <a href="http://groups.google.com/groups?group=comp.lang.python">comp.lang.python</a> 上看到关于如下的问题： “<span class="quote"> 怎么才能从我的 <span class="acronym">HTML</span> 文档中列出所有的 [头|图像|链接] 呢？</span>” “<span class="quote">怎么才能 [分析|解释|munge] 我的 <span class="acronym">HTML</span> 文档的文本，但是又要保留标记呢？</span>”  “<span class="quote">怎么才能一次给我所有的 <span class="acronym">HTML</span> 标记 [增加|删除|加引号] 属性呢？</span>” 本章将回答所有这些问题。
               </p>
            </div>
            <p>下面给出一个完整的，可工作的 <span class="application">Python</span> 程序，它分为两部分。第一部分，<tt class="filename">BaseHTMLProcessor.py</tt> 是一个通用工具，它可以通过扫描标记和文本块来帮助您处理 <span class="acronym">HTML</span> 文件。第二部分，<tt class="filename">dialect.py</tt> 是一个例子，演示了如何使用 <tt class="filename">BaseHTMLProcessor.py</tt> 来转化 <span class="acronym">HTML</span> 文档，保留文本但是去掉了标记。阅读文档字符串 (<tt class="literal">doc string</tt>) 和注释来了解将要发生事情的概况。大部分内容看上去像巫术，因为任一个这些类的方法是如何调用的不是很清楚。不要紧，所有内容都会按进度被逐步地展示出来。
            </p>
            <div class="example"><a name="dialect.basehtml.listing"></a><h3 class="title">例&nbsp;8.1.&nbsp;<tt class="filename">BaseHTMLProcessor.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting"><span class='pykeyword'>
from</span> sgmllib <span class='pykeyword'>import</span> SGMLParser
<span class='pykeyword'>import</span> htmlentitydefs

<span class='pykeyword'>class</span><span class='pyclass'> BaseHTMLProcessor</span>(SGMLParser):
    <span class='pykeyword'>def</span><span class='pyclass'> reset</span>(self):                       
        <span class='pycomment'># extend (called by SGMLParser.__init__)</span>
        self.pieces = []
        SGMLParser.reset(self)

    <span class='pykeyword'>def</span><span class='pyclass'> unknown_starttag</span>(self, tag, attrs):
        <span class='pycomment'># called for each start tag</span>
        <span class='pycomment'># attrs is a list of (attr, value) tuples</span>
        <span class='pycomment'># e.g. for &lt;pre class="screen"&gt;, tag="pre", attrs=[("class", "screen")]</span>
        <span class='pycomment'># Ideally we would like to reconstruct original tag and attributes, but</span>
        <span class='pycomment'># we may end up quoting attribute values that weren't quoted in the source</span>
        <span class='pycomment'># document, or we may change the type of quotes around the attribute value</span>
        <span class='pycomment'># (single to double quotes).</span>
        <span class='pycomment'># Note that improperly embedded non-HTML code (like client-side Javascript)</span>
        <span class='pycomment'># may be parsed incorrectly by the ancestor, causing runtime script errors.</span>
        <span class='pycomment'># All non-HTML code must be enclosed in HTML comment tags (&lt;!-- code --&gt;)</span>
        <span class='pycomment'># to ensure that it will pass through this parser unaltered (in handle_comment).</span>
        strattrs = <span class='pystring'>""</span>.join([<span class='pystring'>' %s="%s"'</span> % (key, value) <span class='pykeyword'>for</span> key, value <span class='pykeyword'>in</span> attrs])
        self.pieces.append(<span class='pystring'>"&lt;%(tag)s%(strattrs)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> unknown_endtag</span>(self, tag):         
        <span class='pycomment'># called for each end tag, e.g. for &lt;/pre&gt;, tag will be "pre"</span>
        <span class='pycomment'># Reconstruct the original end tag.</span>
        self.pieces.append(<span class='pystring'>"&lt;/%(tag)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_charref</span>(self, ref):         
        <span class='pycomment'># called for each character reference, e.g. for "&amp;#160;", ref will be "160"</span>
        <span class='pycomment'># Reconstruct the original character reference.</span>
        self.pieces.append(<span class='pystring'>"&amp;#%(ref)s;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_entityref</span>(self, ref):       
        <span class='pycomment'># called for each entity reference, e.g. for "&amp;copy;", ref will be "copy"</span>
        <span class='pycomment'># Reconstruct the original entity reference.</span>
        self.pieces.append(<span class='pystring'>"&amp;%(ref)s"</span> % locals())
        <span class='pycomment'># standard HTML entities are closed with a semicolon; other entities are not</span>
        <span class='pykeyword'>if</span> htmlentitydefs.entitydefs.has_key(ref):
            self.pieces.append(<span class='pystring'>";"</span>)

    <span class='pykeyword'>def</span><span class='pyclass'> handle_data</span>(self, text):           
        <span class='pycomment'># called for each block of plain text, i.e. outside of any tag and</span>
        <span class='pycomment'># not containing any character or entity references</span>
        <span class='pycomment'># Store the original text verbatim.</span>
        self.pieces.append(text)

    <span class='pykeyword'>def</span><span class='pyclass'> handle_comment</span>(self, text):        
        <span class='pycomment'># called for each HTML comment, e.g. &lt;!-- insert Javascript code here --&gt;</span>
        <span class='pycomment'># Reconstruct the original comment.</span>
        <span class='pycomment'># It is especially important that the source document enclose client-side</span>
        <span class='pycomment'># code (like Javascript) within comments so it can pass through this</span>
        <span class='pycomment'># processor undisturbed; see comments in unknown_starttag for details.</span>
        self.pieces.append(<span class='pystring'>"&lt;!--%(text)s--&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_pi</span>(self, text):             
        <span class='pycomment'># called for each processing instruction, e.g. &lt;?instruction&gt;</span>
        <span class='pycomment'># Reconstruct original processing instruction.</span>
        self.pieces.append(<span class='pystring'>"&lt;?%(text)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_decl</span>(self, text):
        <span class='pycomment'># called for the DOCTYPE, if present, e.g.</span>
        <span class='pycomment'># &lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"</span>
        <span class='pycomment'>#     "http://www.w3.org/TR/html4/loose.dtd"&gt;</span>
        <span class='pycomment'># Reconstruct original DOCTYPE</span>
        self.pieces.append(<span class='pystring'>"&lt;!%(text)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> output</span>(self):              
        <span class='pystring'>"""Return processed HTML as a single string"""</span>
        <span class='pykeyword'>return</span> <span class='pystring'>""</span>.join(self.pieces)</pre></div>
            <div class="example"><a name="d0e19890"></a><h3 class="title">例&nbsp;8.2.&nbsp;<tt class="filename">dialect.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re
<span class='pykeyword'>from</span> BaseHTMLProcessor <span class='pykeyword'>import</span> BaseHTMLProcessor

<span class='pykeyword'>class</span><span class='pyclass'> Dialectizer</span>(BaseHTMLProcessor):
    subs = ()

    <span class='pykeyword'>def</span><span class='pyclass'> reset</span>(self):
        <span class='pycomment'># extend (called from __init__ in ancestor)</span>
        <span class='pycomment'># Reset all data attributes</span>
        self.verbatim = 0
        BaseHTMLProcessor.reset(self)

    <span class='pykeyword'>def</span><span class='pyclass'> start_pre</span>(self, attrs):            
        <span class='pycomment'># called for every &lt;pre&gt; tag in HTML source</span>
        <span class='pycomment'># Increment verbatim mode count, then handle tag like normal</span>
        self.verbatim += 1                 
        self.unknown_starttag(<span class='pystring'>"pre"</span>, attrs)

    <span class='pykeyword'>def</span><span class='pyclass'> end_pre</span>(self):                     
        <span class='pycomment'># called for every &lt;/pre&gt; tag in HTML source</span>
        <span class='pycomment'># Decrement verbatim mode count</span>
        self.unknown_endtag(<span class='pystring'>"pre"</span>)         
        self.verbatim -= 1                 

    <span class='pykeyword'>def</span><span class='pyclass'> handle_data</span>(self, text):                                        
        <span class='pycomment'># override</span>
        <span class='pycomment'># called for every block of text in HTML source</span>
        <span class='pycomment'># If in verbatim mode, save text unaltered;</span>
        <span class='pycomment'># otherwise process the text with a series of substitutions</span>
        self.pieces.append(self.verbatim <span class='pykeyword'>and</span> text <span class='pykeyword'>or</span> self.process(text))

    <span class='pykeyword'>def</span><span class='pyclass'> process</span>(self, text):
        <span class='pycomment'># called from handle_data</span>
        <span class='pycomment'># Process text block by performing series of regular expression</span>
        <span class='pycomment'># substitutions (actual substitions are defined in descendant)</span>
        <span class='pykeyword'>for</span> fromPattern, toPattern <span class='pykeyword'>in</span> self.subs:
            text = re.sub(fromPattern, toPattern, text)
        <span class='pykeyword'>return</span> text

<span class='pykeyword'>class</span><span class='pyclass'> ChefDialectizer</span>(Dialectizer):
    <span class='pystring'>"""convert HTML to Swedish Chef-speak
    
    based on the classic chef.x, copyright (c) 1992, 1993 John Hagerman
    """</span>
    subs = ((r<span class='pystring'>'a([nu])'</span>, r<span class='pystring'>'u\1'</span>),
            (r<span class='pystring'>'A([nu])'</span>, r<span class='pystring'>'U\1'</span>),
            (r<span class='pystring'>'a\B'</span>, r<span class='pystring'>'e'</span>),
            (r<span class='pystring'>'A\B'</span>, r<span class='pystring'>'E'</span>),
            (r<span class='pystring'>'en\b'</span>, r<span class='pystring'>'ee'</span>),
            (r<span class='pystring'>'\Bew'</span>, r<span class='pystring'>'oo'</span>),
            (r<span class='pystring'>'\Be\b'</span>, r<span class='pystring'>'e-a'</span>),
            (r<span class='pystring'>'\be'</span>, r<span class='pystring'>'i'</span>),
            (r<span class='pystring'>'\bE'</span>, r<span class='pystring'>'I'</span>),
            (r<span class='pystring'>'\Bf'</span>, r<span class='pystring'>'ff'</span>),
            (r<span class='pystring'>'\Bir'</span>, r<span class='pystring'>'ur'</span>),
            (r<span class='pystring'>'(\w*?)i(\w*?)$'</span>, r<span class='pystring'>'\1ee\2'</span>),
            (r<span class='pystring'>'\bow'</span>, r<span class='pystring'>'oo'</span>),
            (r<span class='pystring'>'\bo'</span>, r<span class='pystring'>'oo'</span>),
            (r<span class='pystring'>'\bO'</span>, r<span class='pystring'>'Oo'</span>),
            (r<span class='pystring'>'the'</span>, r<span class='pystring'>'zee'</span>),
            (r<span class='pystring'>'The'</span>, r<span class='pystring'>'Zee'</span>),
            (r<span class='pystring'>'th\b'</span>, r<span class='pystring'>'t'</span>),
            (r<span class='pystring'>'\Btion'</span>, r<span class='pystring'>'shun'</span>),
            (r<span class='pystring'>'\Bu'</span>, r<span class='pystring'>'oo'</span>),
            (r<span class='pystring'>'\BU'</span>, r<span class='pystring'>'Oo'</span>),
            (r<span class='pystring'>'v'</span>, r<span class='pystring'>'f'</span>),
            (r<span class='pystring'>'V'</span>, r<span class='pystring'>'F'</span>),
            (r<span class='pystring'>'w'</span>, r<span class='pystring'>'w'</span>),
            (r<span class='pystring'>'W'</span>, r<span class='pystring'>'W'</span>),
            (r<span class='pystring'>'([a-z])[.]'</span>, r<span class='pystring'>'\1.  Bork Bork Bork!'</span>))

<span class='pykeyword'>class</span><span class='pyclass'> FuddDialectizer</span>(Dialectizer):
    <span class='pystring'>"""convert HTML to Elmer Fudd-speak"""</span>
    subs = ((r<span class='pystring'>'[rl]'</span>, r<span class='pystring'>'w'</span>),
            (r<span class='pystring'>'qu'</span>, r<span class='pystring'>'qw'</span>),
            (r<span class='pystring'>'th\b'</span>, r<span class='pystring'>'f'</span>),
            (r<span class='pystring'>'th'</span>, r<span class='pystring'>'d'</span>),
            (r<span class='pystring'>'n[.]'</span>, r<span class='pystring'>'n, uh-hah-hah-hah.'</span>))

<span class='pykeyword'>class</span><span class='pyclass'> OldeDialectizer</span>(Dialectizer):
    <span class='pystring'>"""convert HTML to mock Middle English"""</span>
    subs = ((r<span class='pystring'>'i([bcdfghjklmnpqrstvwxyz])e\b'</span>, r<span class='pystring'>'y\1'</span>),
            (r<span class='pystring'>'i([bcdfghjklmnpqrstvwxyz])e'</span>, r<span class='pystring'>'y\1\1e'</span>),
            (r<span class='pystring'>'ick\b'</span>, r<span class='pystring'>'yk'</span>),
            (r<span class='pystring'>'ia([bcdfghjklmnpqrstvwxyz])'</span>, r<span class='pystring'>'e\1e'</span>),
            (r<span class='pystring'>'e[ea]([bcdfghjklmnpqrstvwxyz])'</span>, r<span class='pystring'>'e\1e'</span>),
            (r<span class='pystring'>'([bcdfghjklmnpqrstvwxyz])y'</span>, r<span class='pystring'>'\1ee'</span>),
            (r<span class='pystring'>'([bcdfghjklmnpqrstvwxyz])er'</span>, r<span class='pystring'>'\1re'</span>),
            (r<span class='pystring'>'([aeiou])re\b'</span>, r<span class='pystring'>'\1r'</span>),
            (r<span class='pystring'>'ia([bcdfghjklmnpqrstvwxyz])'</span>, r<span class='pystring'>'i\1e'</span>),
            (r<span class='pystring'>'tion\b'</span>, r<span class='pystring'>'cioun'</span>),
            (r<span class='pystring'>'ion\b'</span>, r<span class='pystring'>'ioun'</span>),
            (r<span class='pystring'>'aid'</span>, r<span class='pystring'>'ayde'</span>),
            (r<span class='pystring'>'ai'</span>, r<span class='pystring'>'ey'</span>),
            (r<span class='pystring'>'ay\b'</span>, r<span class='pystring'>'y'</span>),
            (r<span class='pystring'>'ay'</span>, r<span class='pystring'>'ey'</span>),
            (r<span class='pystring'>'ant'</span>, r<span class='pystring'>'aunt'</span>),
            (r<span class='pystring'>'ea'</span>, r<span class='pystring'>'ee'</span>),
            (r<span class='pystring'>'oa'</span>, r<span class='pystring'>'oo'</span>),
            (r<span class='pystring'>'ue'</span>, r<span class='pystring'>'e'</span>),
            (r<span class='pystring'>'oe'</span>, r<span class='pystring'>'o'</span>),
            (r<span class='pystring'>'ou'</span>, r<span class='pystring'>'ow'</span>),
            (r<span class='pystring'>'ow'</span>, r<span class='pystring'>'ou'</span>),
            (r<span class='pystring'>'\bhe'</span>, r<span class='pystring'>'hi'</span>),
            (r<span class='pystring'>'ve\b'</span>, r<span class='pystring'>'veth'</span>),
            (r<span class='pystring'>'se\b'</span>, r<span class='pystring'>'e'</span>),
            (r<span class='pystring'>"'s\b"</span>, r<span class='pystring'>'es'</span>),
            (r<span class='pystring'>'ic\b'</span>, r<span class='pystring'>'ick'</span>),
            (r<span class='pystring'>'ics\b'</span>, r<span class='pystring'>'icc'</span>),
            (r<span class='pystring'>'ical\b'</span>, r<span class='pystring'>'ick'</span>),
            (r<span class='pystring'>'tle\b'</span>, r<span class='pystring'>'til'</span>),
            (r<span class='pystring'>'ll\b'</span>, r<span class='pystring'>'l'</span>),
            (r<span class='pystring'>'ould\b'</span>, r<span class='pystring'>'olde'</span>),
            (r<span class='pystring'>'own\b'</span>, r<span class='pystring'>'oune'</span>),
            (r<span class='pystring'>'un\b'</span>, r<span class='pystring'>'onne'</span>),
            (r<span class='pystring'>'rry\b'</span>, r<span class='pystring'>'rye'</span>),
            (r<span class='pystring'>'est\b'</span>, r<span class='pystring'>'este'</span>),
            (r<span class='pystring'>'pt\b'</span>, r<span class='pystring'>'pte'</span>),
            (r<span class='pystring'>'th\b'</span>, r<span class='pystring'>'the'</span>),
            (r<span class='pystring'>'ch\b'</span>, r<span class='pystring'>'che'</span>),
            (r<span class='pystring'>'ss\b'</span>, r<span class='pystring'>'sse'</span>),
            (r<span class='pystring'>'([wybdp])\b'</span>, r<span class='pystring'>'\1e'</span>),
            (r<span class='pystring'>'([rnt])\b'</span>, r<span class='pystring'>'\1\1e'</span>),
            (r<span class='pystring'>'from'</span>, r<span class='pystring'>'fro'</span>),
            (r<span class='pystring'>'when'</span>, r<span class='pystring'>'whan'</span>))

<span class='pykeyword'>def</span><span class='pyclass'> translate</span>(url, dialectName=<span class='pystring'>"chef"</span>):
    <span class='pystring'>"""fetch URL and translate using dialect
    
    dialect in ("chef", "fudd", "olde")"""</span>
    <span class='pykeyword'>import</span> urllib                      
    sock = urllib.urlopen(url)         
    htmlSource = sock.read()           
    sock.close()                       
    parserName = <span class='pystring'>"%sDialectizer"</span> % dialectName.capitalize()
    parserClass = globals()[parserName]                    
    parser = parserClass()                                 
    parser.feed(htmlSource)
    parser.close()         
    <span class='pykeyword'>return</span> parser.output() 

<span class='pykeyword'>def</span><span class='pyclass'> test</span>(url):
    <span class='pystring'>"""test all dialects against URL"""</span>
    <span class='pykeyword'>for</span> dialect <span class='pykeyword'>in</span> (<span class='pystring'>"chef"</span>, <span class='pystring'>"fudd"</span>, <span class='pystring'>"olde"</span>):
        outfile = <span class='pystring'>"%s.html"</span> % dialect
        fsock = open(outfile, <span class='pystring'>"wb"</span>)
        fsock.write(translate(url, dialect))
        fsock.close()
        <span class='pykeyword'>import</span> webbrowser
        webbrowser.open_new(outfile)

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:
    test(<span class='pystring'>"http://diveintopython.org/odbchelper_list.html"</span>)</pre></div>
            <div class="example"><a name="d0e19896"></a><h3 class="title">例&nbsp;8.3.&nbsp;<tt class="filename">dialect.py</tt> 的输出结果
               </h3>
               <p>运行这个脚本会将 <a href="../native_data_types/lists.html" title="3.2.&nbsp;List 介绍">第&nbsp;3.2&nbsp;节 “List 介绍”</a> 转换成<a href="../native_data_types/chef.html">模仿瑞典厨师用语 (mock Swedish Chef-speak)</a> (来自 The Muppets)、<a href="../native_data_types/fudd.html">模仿埃尔默唠叨者用语 (mock Elmer Fudd-speak)</a> (来自 Bugs Bunny 卡通画) 和<a href="../native_data_types/olde.html">模仿中世纪英语 (mock Middle English)</a> (零散地来源于乔叟的<i class="citetitle">《坎特伯雷故事集》</i>)。如果您查看输出页面的 <span class="acronym">HTML</span> 源代码，您会发现所有的 <span class="acronym">HTML</span> 标记和属性没有改动，但是在标记之间的文本被转换成模仿语言了。如果您观查得更仔细些，您会发现，实际上，仅有标题和段落被转换了；代码列表和屏幕例子没有改动。
               </p><pre class="programlisting">
&lt;div <span class='pykeyword'>class</span>="<span class='pyclass'>abstract</span>"&gt;
&lt;p&gt;Lists awe &lt;span <span class='pykeyword'>class</span>="<span class='pyclass'>application</span>"&gt;Pydon&lt;/span&gt;'s wowkhowse datatype.
If youw onwy expewience wif wists <span class='pykeyword'>is</span> awways <span class='pykeyword'>in</span>
&lt;span <span class='pykeyword'>class</span>="<span class='pyclass'>application</span>"&gt;Visuaw Basic&lt;/span&gt; ow (God fowbid) de datastowe
<span class='pykeyword'>in</span> &lt;span <span class='pykeyword'>class</span>="<span class='pyclass'>application</span>"&gt;Powewbuiwdew&lt;/span&gt;, bwace youwsewf fow
&lt;span <span class='pykeyword'>class</span>="<span class='pyclass'>application</span>"&gt;Pydon&lt;/span&gt; wists.&lt;/p&gt;
&lt;/div&gt;
</pre></div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.sgmllib"></a><a name="introducing_sgmllib.html">8.2.&nbsp;<tt class="filename">sgmllib.py</tt> 介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="acronym">HTML</span> 处理分成三步：将 <span class="acronym">HTML</span> 分解成它的组成片段，对片段进行加工，接着将片段再重新合成 HTML。第一步是通过 <tt class="filename">sgmllib.py</tt> 来完成的，它是标准 <span class="application">Python</span> 库的一部分。
            </p>
         </div>
         <p>理解本章的关键是要知道 <span class="acronym">HTML</span> 不只是文本，更是结构化文本。这种结构来源于开始与结束标记的或多或少分级序列。通常您并不以这种方式处理 <span class="acronym">HTML</span> ，而是以<span class="emphasis"><em>文本方式</em></span> 在一个文本编辑中对其进行处理，或以<span class="emphasis"><em>可视的方式</em></span> 在一个浏览器中进行浏览或页面编辑工具中进行编辑。<tt class="filename">sgmllib.py</tt> 表现出了 <span class="acronym">HTML</span> 的<span class="emphasis"><em>结构</em></span>。
         </p>
         <p><tt class="filename">sgmllib.py</tt> 包含一个重要的类：<tt class="classname">SGMLParser</tt>。<tt class="classname">SGMLParser</tt>  将 <span class="acronym">HTML</span> 分解成有用的片段，比如开始标记和结束标记。在它成功地分解出某个数据为一个有用的片段后，它会根据所发现的数据，调用一个自身内部的方法。为了使用这个分析器，您需要子类化 <tt class="classname">SGMLParser</tt>  类，并且覆盖这些方法。这就是当我说它表示了 <span class="acronym">HTML</span> <span class="emphasis"><em>结构</em></span> 的意思：<span class="acronym">HTML</span> 的结构决定了方法调用的次序和传给每个方法的参数。
         </p>
         <p><tt class="classname">SGMLParser</tt> 将 <span class="acronym">HTML</span> 分析成 8 类数据，然后对每一类调用单独的方法：
         </p>
         <div class="variablelist">
            <dl>
               <dt><span class="term">开始标记 (Start tag)</span></dt>
               <dd>是开始一个块的 <span class="acronym">HTML</span> 标记，像 <tt class="sgmltag-element">&lt;html&gt;</tt>、<tt class="sgmltag-element">&lt;head&gt;</tt>、<tt class="sgmltag-element">&lt;body&gt;</tt> 或 <tt class="sgmltag-element">&lt;pre&gt;</tt> 等，或是一个独一的标记，像 <tt class="sgmltag-element">&lt;br&gt;</tt> 或 <tt class="sgmltag-element">&lt;img&gt;</tt> 等。当它找到一个开始标记 <i class="replaceable"><tt>tagname</tt></i>，<tt class="classname">SGMLParser</tt>  将查找名为 <tt class="function">start_<i class="replaceable"><tt>tagname</tt></i></tt> 或 <tt class="function">do_<i class="replaceable"><tt>tagname</tt></i></tt> 的方法。例如，当它找到一个 <tt class="sgmltag-element">&lt;pre&gt;</tt> 标记，它将查找一个 <tt class="function">start_pre</tt> 或 <tt class="function">do_pre</tt> 的方法。如果找到了，<tt class="classname">SGMLParser</tt> 会使用这个标记的属性列表来调用这个方法；否则，它用这个标记的名字和属性列表来调用 <tt class="function">unknown_starttag</tt> 方法。
               </dd>
               <dt><span class="term">结束标记 (End tag)</span></dt>
               <dd>是结束一个块的 <span class="acronym">HTML</span> 标记，像 <tt class="sgmltag-element">&lt;/html&gt;</tt>、<tt class="sgmltag-element">&lt;/head&gt;</tt>、<tt class="sgmltag-element">&lt;/body&gt;</tt> 或 <tt class="sgmltag-element">&lt;/pre&gt;</tt> 等。当找到一个结束标记时，<tt class="classname">SGMLParser</tt> 将查找名为 <tt class="function">end_<i class="replaceable"><tt>tagname</tt></i></tt> 的方法。如果找到，<tt class="classname">SGMLParser</tt>  调用这个方法，否则它使用标记的名字来调用 <tt class="function">unknown_endtag</tt> 。
               </dd>
               <dt><span class="term">字符引用 (Character reference)</span></dt>
               <dd>用字符的十进制或等同的十六进制来表示的转义字符，像 <tt class="literal">&amp;#160;</tt>。当找到，<tt class="classname">SGMLParser</tt> 使用十进制或等同的十六进制字符文本来调用 <tt class="function">handle_charref</tt> 。
               </dd>
               <dt><span class="term">实体引用 (Entity reference)</span></dt>
               <dd><span class="acronym">HTML</span> 实体，像 <tt class="literal">&amp;copy;</tt>。当找到，<tt class="classname">SGMLParser</tt> 使用 <span class="acronym">HTML</span> 实体的名字来调用 <tt class="function">handle_entityref</tt> 。
               </dd>
               <dt><span class="term">注释 (Comment)</span></dt>
               <dd><span class="acronym">HTML</span> 注释，包括在 <tt class="literal">&lt;!-- ... --&gt;</tt>之间。当找到，<tt class="classname">SGMLParser</tt> 用注释内容来调用 <tt class="function">handle_comment</tt>。
               </dd>
               <dt><span class="term">处理指令 (Processing instruction)</span></dt>
               <dd><span class="acronym">HTML</span> 处理指令，包括在 <tt class="literal">&lt;? ... &gt;</tt> 之间。当找到，<tt class="classname">SGMLParser</tt>  用处理指令内容来调用 <tt class="function">handle_pi</tt>。
               </dd>
               <dt><span class="term">声明 (Declaration)</span></dt>
               <dd><span class="acronym">HTML</span> 声明，如 <tt class="sgmltag-element">DOCTYPE</tt>，包括在 <tt class="literal">&lt;! ... &gt;</tt>之间。当找到，<tt class="classname">SGMLParser</tt> 用声明内容来调用 <tt class="function">handle_decl</tt>。
               </dd>
               <dt><span class="term">文本数据 (Text data)</span></dt>
               <dd>文本块。不满足其它 7 种类别的任何东西。当找到，<tt class="classname">SGMLParser</tt> 用文本来调用 <tt class="function">handle_data</tt>。
               </dd>
            </dl>
         </div><a name="d0e20196"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.extract"></a><a name="extracting_data.html">8.3.&nbsp;从 <span class="acronym">HTML</span> 文档中提取数据
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>为了从 <span class="acronym">HTML</span> 文档中提取数据，将 <tt class="classname">SGMLParser</tt> 类进行子类化，然后对想要捕捉的标记或实体定义方法。
            </p>
         </div>
         <p>从 <span class="acronym">HTML</span> 文档中提取数据的第一步是得到某个 <span class="acronym">HTML</span> 文件。如果在您的硬盘里存放着 <span class="acronym">HTML</span> 文件，您可以使用<a href="../file_handling/file_objects.html" title="6.2.&nbsp;与文件对象共事">处理文件的函数</a>将它读出来，但是真正有意思的是从实际的网页得到 <span class="acronym">HTML</span>。
         </p>
         <div class="example"><a name="dialect.extract.urllib"></a><h3 class="title">例&nbsp;8.5.&nbsp;<tt class="filename">urllib</tt> 介绍
            </h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> urllib</span>                                       <a name="dialect.extract.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">sock = urllib.urlopen(<span class='pystring'>"http://diveintopython.org/"</span>)</span> <a name="dialect.extract.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">htmlSource = sock.read()</span>                            <a name="dialect.extract.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">sock.close()</span>                                        <a name="dialect.extract.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> htmlSource</span>                                    <a name="dialect.extract.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<span class="computeroutput">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;&lt;html&gt;&lt;head&gt;
      &lt;meta http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'&gt;
   &lt;title&gt;Dive Into Python&lt;/title&gt;
&lt;link rel='stylesheet' href='diveintopython.css' type='text/css'&gt;
&lt;link rev='made' href='mailto:mark@diveintopython.org'&gt;
&lt;meta name='keywords' content='Python, Dive Into Python, tutorial, object-oriented, programming, documentation, book, free'&gt;
&lt;meta name='description' content='a free Python tutorial for experienced programmers'&gt;
&lt;/head&gt;
&lt;body bgcolor='white' text='black' link='#0000FF' vlink='#840084' alink='#0000FF'&gt;
&lt;table cellpadding='0' cellspacing='0' border='0' width='100%'&gt;
&lt;tr&gt;&lt;td class='header' width='1%' valign='top'&gt;diveintopython.org&lt;/td&gt;
&lt;td width='99%' align='right'&gt;&lt;hr size='1' noshade&gt;&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td class='tagline' colspan='2'&gt;Python&amp;nbsp;for&amp;nbsp;experienced&amp;nbsp;programmers&lt;/td&gt;&lt;/tr&gt;</span>

[...略...]</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.basehtml"></a><a name="basehtmlprocessor.html">8.4.&nbsp;<tt class="filename">BaseHTMLProcessor.py</tt> 介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="classname">SGMLParser</tt> 自身不会产生任何结果。它只是分析，分析，再分析，对于它找到的有趣的东西会调用相应的一个方法，但是这些方法什么都不做。<tt class="classname">SGMLParser</tt> 是一个 <span class="acronym">HTML</span> <span class="emphasis"><em>消费者 (consumer)</em></span>：它接收 <span class="acronym">HTML</span>，将其分解成小的、结构化的小块。正如您所看到的，在<a href="extracting_data.html" title="8.3.&nbsp;从 HTML 文档中提取数据">前一节</a>中，您可以定义 <tt class="classname">SGMLParser</tt> 的子类，它可以捕捉特别标记和生成有用的东西，如一个网页中所有链接的一个列表。现在我们将沿着这条路更深一步。我们要定义一个可以捕捉 <tt class="classname">SGMLParser</tt> 所丢出来的所有东西的一个类，接着重建整个 <span class="acronym">HTML</span> 文档。用技术术语来说，这个类将是一个 <span class="acronym">HTML</span> <span class="emphasis"><em>生产者 (producer)</em></span>。
            </p>
         </div>
         <p><tt class="classname">BaseHTMLProcessor</tt> 子类化 <tt class="classname">SGMLParser</tt>，并且提供了全部的 8 个处理方法：<tt class="function">unknown_starttag</tt>、<tt class="function">unknown_endtag</tt>、<tt class="function">handle_charref</tt>、<tt class="function">handle_entityref</tt>、<tt class="function">handle_comment</tt>、<tt class="function">handle_pi</tt>、<tt class="function">handle_decl</tt> 和 <tt class="function">handle_data</tt>。
         </p>
         <div class="example"><a name="dialect.basehtml.intro"></a><h3 class="title">例&nbsp;8.8.&nbsp;<tt class="classname">BaseHTMLProcessor</tt> 介绍
            </h3><pre class="programlisting"><span class='pykeyword'>
class</span> BaseHTMLProcessor(SGMLParser):
    <span class='pykeyword'>def</span><span class='pyclass'> reset</span>(self):                        <a name="dialect.basehtml.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        self.pieces = []
        SGMLParser.reset(self)

    <span class='pykeyword'>def</span><span class='pyclass'> unknown_starttag</span>(self, tag, attrs): <a name="dialect.basehtml.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        strattrs = <span class='pystring'>""</span>.join([<span class='pystring'>' %s="%s"'</span> % (key, value) <span class='pykeyword'>for</span> key, value <span class='pykeyword'>in</span> attrs])
        self.pieces.append(<span class='pystring'>"&lt;%(tag)s%(strattrs)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> unknown_endtag</span>(self, tag):          <a name="dialect.basehtml.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
        self.pieces.append(<span class='pystring'>"&lt;/%(tag)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_charref</span>(self, ref):          <a name="dialect.basehtml.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
        self.pieces.append(<span class='pystring'>"&amp;#%(ref)s;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_entityref</span>(self, ref):        <a name="dialect.basehtml.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
        self.pieces.append(<span class='pystring'>"&amp;%(ref)s"</span> % locals())
        <span class='pykeyword'>if</span> htmlentitydefs.entitydefs.has_key(ref):
            self.pieces.append(<span class='pystring'>";"</span>)

    <span class='pykeyword'>def</span><span class='pyclass'> handle_data</span>(self, text):            <a name="dialect.basehtml.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
        self.pieces.append(text)

    <span class='pykeyword'>def</span><span class='pyclass'> handle_comment</span>(self, text):         <a name="dialect.basehtml.1.7"></a><img src="../images/callouts/7.png" alt="7" border="0" width="12" height="12">
        self.pieces.append(<span class='pystring'>"&lt;!--%(text)s--&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_pi</span>(self, text):              <a name="dialect.basehtml.1.8"></a><img src="../images/callouts/8.png" alt="8" border="0" width="12" height="12">
        self.pieces.append(<span class='pystring'>"&lt;?%(text)s&gt;"</span> % locals())

    <span class='pykeyword'>def</span><span class='pyclass'> handle_decl</span>(self, text):
        self.pieces.append(<span class='pystring'>"&lt;!%(text)s&gt;"</span> % locals())</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.locals"></a><a name="locals_and_globals.html">8.5.&nbsp;<tt class="function">locals</tt> 和 <tt class="function">globals</tt></a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>我们先偏离一下 <span class="acronym">HTML</span> 处理的主题，讨论一下 <span class="application">Python</span> 如何处理变量。<span class="application">Python</span> 有两个内置的函数，<tt class="function">locals</tt> 和 <tt class="function">globals</tt>，它们提供了基于 dictionary 的访问局部和全局变量的方式。
            </p>
         </div>
         <p>还记得 <tt class="function">locals</tt> 吗？您第一次是在这里看到的：
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> unknown_starttag</span>(self, tag, attrs):
        strattrs = <span class='pystring'>""</span>.join([<span class='pystring'>' %s="%s"'</span> % (key, value) <span class='pykeyword'>for</span> key, value <span class='pykeyword'>in</span> attrs])
        self.pieces.append(<span class='pystring'>"&lt;%(tag)s%(strattrs)s&gt;"</span> % locals())
</pre></div>
         <p>不，等等，此时您还不能理解 <tt class="function">locals</tt> 。首先，您需要学习关于命名空间的知识。这很枯燥，但是很重要，因此要要耐心些。
         </p>
         <p><span class="application">Python</span> 使用叫做名字空间的东西来记录变量的轨迹。名字空间只是一个 dictionary ，它的键字就是变量名，它的值就是那些变量的值。实际上，名字空间可以像 <span class="application">Python</span> 的 dictionary 一样进行访问，一会儿我们就会看到。
         </p>
         <p>在一个 <span class="application">Python</span> 程序中的任何一个地方，都存在几个可用的名字空间。每个函数都有着自已的名字空间，叫做局部名字空间，它记录了函数的变量，包括函数的参数和局部定义的变量。每个模块拥有它自已的名字空间，叫做全局名字空间，它记录了模块的变量，包括函数、类、其它导入的模块、模块级的变量和常量。还有就是内置名字空间，任何模块均可访问它，它存放着内置的函数和异常。
         </p>
         <p>当一行代码要使用变量 <tt class="varname">x</tt> 的值时，<span class="application">Python</span> 会到所有可用的名字空间去查找变量，按照如下顺序：
         </p>
         <div class="orderedlist">
            <ol type="1">
               <li>局部名字空间――特指当前函数或类的方法。如果函数定义了一个局部变量 <tt class="varname">x</tt>，或一个参数 <tt class="varname">x</tt>，<span class="application">Python</span> 将使用它，然后停止搜索。
               </li>
               <li>全局名字空间――特指当前的模块。如果模块定义了一个名为 <tt class="varname">x</tt> 的变量，函数或类，<span class="application">Python</span> 将使用它然后停止搜索。
               </li>
               <li>内置名字空间――对每个模块都是全局的。作为最后的尝试，<span class="application">Python</span> 将假设 <tt class="varname">x</tt> 是内置函数或变量。
               </li>
            </ol>
         </div>
         <p>如果 <span class="application">Python</span> 在这些名字空间找不到 <tt class="varname">x</tt>，它将放弃查找并引发一个 <tt class="errorcode">NameError</tt> 异常，同时传递 <tt class="errorname">There is no variable named 'x'</tt> 这样一条信息，回到 <a href="../native_data_types/declaring_variables.html#odbchelper.unboundvariable" title="例&nbsp;3.18.&nbsp;引用未赋值的变量">例&nbsp;3.18 “引用未赋值的变量”</a>，您会看到一路上都有这样的信息。但是您并没有体会到 <span class="application">Python</span> 在给出这样的错误之前做了多少的努力。
         </p><a name="d0e21228"></a>
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.dictsub"></a><a name="dictionary_based_string_formatting.html">8.6.&nbsp;基于 dictionary 的字符串格式化
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <p>为什么学习 <tt class="function">locals</tt> 和 <tt class="function">globals</tt>？因为接下来就可以学习关于基于 dictionary 的字符串格式化。或许您还能记起，<a href="../native_data_types/formatting_strings.html" title="3.5.&nbsp;格式化字符串">字符串格式化</a>提供了一种将值插入字符串中的一种便捷的方法。值被列在一个 tuple 中，按照顺序插入到字符串中每个格式化标记所在的位置上。尽管这种做法效率高，但还不是最容易阅读的代码，特别是当插入多个值的时候。仅用眼看一遍字符串，您不能马上就明白结果是什么；您需要经常地在字符串和值的
            tuple 之间进行反复查看。
         </p>
         <div class="abstract">
            <p>有另外一种字符串格式化的形式，它使用 dictionary 而不是值的 tuple。</p>
         </div>
         <div class="example"><a name="d0e21685"></a><h3 class="title">例&nbsp;8.13.&nbsp;基于 dictionary 的字符串格式化介绍</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">params = {<span class='pystring'>"server"</span>:<span class='pystring'>"mpilgrim"</span>, <span class='pystring'>"database"</span>:<span class='pystring'>"master"</span>, <span class='pystring'>"uid"</span>:<span class='pystring'>"sa"</span>, <span class='pystring'>"pwd"</span>:<span class='pystring'>"secret"</span>}</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pystring'>"%(pwd)s"</span> % params</span>                                    <a name="dialect.dictsub.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">'secret'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pystring'>"%(pwd)s is not a good password for %(uid)s"</span> % params</span> <a name="dialect.dictsub.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">'secret is not a good password for sa'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pystring'>"%(database)s of mind, %(database)s of body"</span> % params</span> <a name="dialect.dictsub.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'master of mind, master of body'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.quoting"></a><a name="quoting_attribute_values.html">8.7.&nbsp;给属性值加引号
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>在 <a href="http://groups.google.com/groups?group=comp.lang.python">comp.lang.python</a> 上的一个常见问题是 “<span class="quote">我有一些 <span class="acronym">HTML</span> 文档，属性值没有用引号括起来，并且我想将它们全部括起来，我怎么才能实现它呢？</span>”
               <sup>[<a name="d0e21934" href="#ftn.d0e21934">7</a>]</sup>  (一般这种事情的出现是由于一个项目经理加入到一个大的项目中来，而他又抱着 <span class="acronym">HTML</span> 是一种标记语言的教条，要求所有的页面必须能够通过 <span class="acronym">HTML</span> 校验器的验证。而属性值没有被引号括起来是一种常见的对 <span class="acronym">HTML</span> 规范的违反。) 不管什么原因，未括起来的属性值通过将 <span class="acronym">HTML</span> 送进 <tt class="classname">BaseHTMLProcessor</tt> 可以容易地修复。
               
            </p>
         </div>
         <p><tt class="classname">BaseHTMLProcessor</tt> 消费 (consume) <span class="acronym">HTML</span>  (因为它是从 <tt class="classname">SGMLParser</tt> 派生来的) 并生成等价的 <span class="acronym">HTML</span>。但是这个 <span class="acronym">HTML</span> 输出与输入的并不一样。标记和属性名最终会转化为小写字母，即使它们可能以大写字母开始或是大小写的混合形式。属性值将被双引号引起来，即使它们原来可能是用单引号括起来的或根本没有括起来。这就是最后我们可以受益的边际效应。
         </p>
         <div class="example"><a name="dialect.quoting.example"></a><h3 class="title">例&nbsp;8.16.&nbsp;给属性值加引号</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">htmlSource = <span class='pystring'>""</span>"</span>        <a name="dialect.basehtml.3.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">...     </tt>&lt;html&gt;
<tt class="prompt">...     </tt>&lt;head&gt;
<tt class="prompt">...     </tt>&lt;title&gt;Test page&lt;/title&gt;
<tt class="prompt">...     </tt>&lt;/head&gt;
<tt class="prompt">...     </tt>&lt;body&gt;
<tt class="prompt">...     </tt>&lt;ul&gt;
<tt class="prompt">...     </tt>&lt;li&gt;&lt;a href=index.html&gt;Home&lt;/a&gt;&lt;/li&gt;
<tt class="prompt">...     </tt>&lt;li&gt;&lt;a href=toc.html&gt;Table of contents&lt;/a&gt;&lt;/li&gt;
<tt class="prompt">...     </tt>&lt;li&gt;&lt;a href=history.html&gt;Revision history&lt;/a&gt;&lt;/li&gt;
<tt class="prompt">...     </tt>&lt;/body&gt;
<tt class="prompt">...     </tt>&lt;/html&gt;
<tt class="prompt">...     </tt><span class="userinput"><span class='pystring'>""</span>"</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>from</span> BaseHTMLProcessor <span class='pykeyword'>import</span> BaseHTMLProcessor</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">parser = BaseHTMLProcessor()</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">parser.feed(htmlSource)</span> <a name="dialect.basehtml.3.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> parser.output()</span>   <a name="dialect.basehtml.3.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Test page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;ul&gt;
&lt;li&gt;&lt;a href="index.html"&gt;Home&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href="toc.html"&gt;Table of contents&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href="history.html"&gt;Revision history&lt;/a&gt;&lt;/li&gt;
&lt;/body&gt;
&lt;/html&gt;</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.dialectizer"></a><a name="dialect.html">8.8.&nbsp;<tt class="filename">dialect.py</tt> 介绍
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><tt class="classname">Dialectizer</tt> 是 <tt class="classname">BaseHTMLProcessor</tt> 的简单 (和拙劣) 的派生类。它通过一系列的替换对文本块进行了处理，但是它确保在 <tt class="literal"><tt class="sgmltag-element">&lt;pre&gt;</tt>...<tt class="sgmltag-element">&lt;/pre&gt;</tt></tt> 块之间的任何东西不被修改地通过。
            </p>
         </div>
         <p>为了处理 <tt class="sgmltag-element">&lt;pre&gt;</tt> 块，我们在 <tt class="classname">Dialectizer</tt> 中定义了两个方法：<tt class="function">start_pre</tt> 和 <tt class="function">end_pre</tt>。
         </p>
         <div class="example"><a name="dialect.specifictags.example"></a><h3 class="title">例&nbsp;8.17.&nbsp;处理特别标记</h3><pre class="programlisting">
    <span class='pykeyword'>def</span><span class='pyclass'> start_pre</span>(self, attrs):             <a name="dialect.dialectizer.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        self.verbatim += 1                  <a name="dialect.dialectizer.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        self.unknown_starttag(<span class='pystring'>"pre"</span>, attrs) <a name="dialect.dialectizer.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">

    <span class='pykeyword'>def</span><span class='pyclass'> end_pre</span>(self):                      <a name="dialect.dialectizer.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
        self.unknown_endtag(<span class='pystring'>"pre"</span>)          <a name="dialect.dialectizer.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
        self.verbatim -= 1                  <a name="dialect.dialectizer.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12"></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.alltogether"></a><a name="all_together.html">8.9.&nbsp;全部放在一起
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>到了将迄今为止我们已经学过并用得不错的东西放在一起的时候了。我希望您专心些。</p>
         </div>
         <div class="example"><a name="d0e22557"></a><h3 class="title">例&nbsp;8.20.&nbsp;<tt class="function">translate</tt> 函数，第 1 部分
            </h3><pre class="programlisting"><span class='pykeyword'>
def</span> translate(url, dialectName=<span class='pystring'>"chef"</span>): <a name="dialect.alltogether.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    <span class='pykeyword'>import</span> urllib                       <a name="dialect.alltogether.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    sock = urllib.urlopen(url)          <a name="dialect.alltogether.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
    htmlSource = sock.read()           
    sock.close()                       
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="dialect.summary"></a><a name="summary.html">8.10.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="application">Python</span> 向您提供了一个强大工具，<tt class="filename">sgmllib.py</tt>，可以通过将 <span class="acronym">HTML</span> 结构转变为一种对象模型来进行处理。可以以许多不同的方式来使用这个工具。
            </p>
         </div>
         <div class="itemizedlist">
            <ul>
               <li>对 <span class="acronym">HTML</span> 进行分析，搜索特别的东西
               </li>
               <li>摘录结果，如 <a href="extracting_data.html#dialect.extract.links" title="例&nbsp;8.6.&nbsp;urllister.py 介绍"><span class="acronym">URL</span> lister</a></li>
               <li>在处理过程中顺便调整结构，如<a href="quoting_attribute_values.html#dialect.quoting.example" title="例&nbsp;8.16.&nbsp;给属性值加引号">给属性值加引号</a></li>
               <li>将 <span class="acronym">HTML</span> 转换为其它的东西，通过对文本进行处理，同时保留标记，如 <a href="dialect.html" title="8.8.&nbsp;dialect.py 介绍"><tt class="classname">Dialectizer</tt></a></li>
            </ul>
         </div>
         <p>学过了这些例子之后，您应该无障碍地完成下面的事情：</p>
         <div class="itemizedlist">
            <ul>
               <li>使用 <a href="locals_and_globals.html" title="8.5.&nbsp;locals 和 globals"><tt class="function">locals</tt>() 和 <tt class="function">globals</tt>()</a> 来访问名字空间
               </li>
               <li>使用基于 dictionary 替换的<a href="dictionary_based_string_formatting.html" title="8.6.&nbsp;基于 dictionary 的字符串格式化">字符串格式化</a></li>
            </ul>
         </div>
      </div>
      
