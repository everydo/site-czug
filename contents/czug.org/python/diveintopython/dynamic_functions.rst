---
created: 
creator: Benky
description: ''
title: 17. 动态函数
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/dynamic_functions/index.html">http://www.woodpecker.org.cn/diveintopython/dynamic_functions/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural"></a>第&nbsp;17&nbsp;章&nbsp;动态函数
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#plural.divein">17.1. 概览</a></span></li>
               <li><span class="section"><a href="#stage1.html">17.2. plural.py, 第 1 阶段</a></span></li>
               <li><span class="section"><a href="#stage2.html">17.3. plural.py, 第 2 阶段</a></span></li>
               <li><span class="section"><a href="#stage3.html">17.4. plural.py, 第 3 阶段</a></span></li>
               <li><span class="section"><a href="#stage4.html">17.5. plural.py, 第 4 阶段</a></span></li>
               <li><span class="section"><a href="#stage5.html">17.6. plural.py, 第 5 阶段</a></span></li>
               <li><span class="section"><a href="#stage6.html">17.7. plural.py, 第 6 阶段</a></span></li>
               <li><span class="section"><a href="#summary.html">17.8. 小结</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="plural.divein"></a>17.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>我想谈谈名词复数。还有，返回其它函数的函数，高级的正则表达式和生成器 (Generator)。生成器是 <span class="application">Python</span> 2.3 新引入的。但首先还是让我们先来谈谈如何生成名词复数。
               </p>
            </div>
            <p>如果你还没有看过 <a href="../regular_expressions/index.html" title="第&nbsp;7&nbsp;章&nbsp;正则表达式">第&nbsp;7&nbsp;章 <i>正则表达式</i></a>，现在是个绝佳的机会。这章中假定你已理解了正则表达式的基础内容并迅速深入更高级的应用。
            </p>
            <p>英语是一个吸收很多外来语而令人疯掉的语言，把单数名词变成复数的规则则是复杂而又多变的。有规则，有例外，更有例外的例外。</p>
            <p>如果你在英语国家长大或是在正规学校学习了英语，你可能对下面的基本规则很熟悉：</p>
            <div class="orderedlist">
               <ol type="1">
                  <li>如果一个词以 S, X 或 Z 结尾，加 ES。如 “<span class="quote">Bass</span>” 变成 “<span class="quote">basses</span>”，“<span class="quote">fax</span>” 变成 “<span class="quote">faxes</span>”，还有 “<span class="quote">waltz</span>” 变成 “<span class="quote">waltzes</span>”。
                  </li>
                  <li>如果一个词以发音的 H 结尾，加 ES；若以不发音的 H 结尾，加 S。什么是发音的 H？和其他字母混合在一起发出一个你可以听到的声音。那么，“<span class="quote">coach</span>” 变成 “<span class="quote">coaches</span>” ，“<span class="quote">rash</span>” 变成 “<span class="quote">rashes</span>”，因为在读出来时，你可以听到 CH 和 SH 的声音。但是，“<span class="quote">cheetah</span>” 变成 “<span class="quote">cheetahs</span>”，因为 H 不发音。
                  </li>
                  <li>如果一个词以发 I 音的 Y 结尾，把 Y 变成 IES；如果 Y 与元音搭配在一起发出其他声音则只添加 S。因此，“<span class="quote">vacancy</span>” 变成 “<span class="quote">vacancies</span>”，但 “<span class="quote">day</span>” 变成 “<span class="quote">days</span>”。
                  </li>
                  <li>如果一切规则都不适用，就只添加 S 并祈祷不会错。</li>
               </ol>
            </div>
            <p>(我知道有很多例外情况，比如：“<span class="quote">Man</span>” 变成 “<span class="quote">men</span>”，“<span class="quote">woman</span>” 变成 “<span class="quote">women</span>”，但是，“<span class="quote">human</span>” 却变成 “<span class="quote">humans</span>”。“<span class="quote">Mouse</span>” 变成 “<span class="quote">mice</span>”，“<span class="quote">louse</span>” 变成 “<span class="quote">lice</span>”，但是，“<span class="quote">house</span>” 却变成 “<span class="quote">houses</span>”。“<span class="quote">Knife</span>” 变成 “<span class="quote">knives</span>”，“<span class="quote">wife</span>” 变成 “<span class="quote">wives</span>”，但是 “<span class="quote">lowlife</span>” 却变成 “<span class="quote">lowlifes</span>”。更不要说那些复数根本就不需要变化的词了，比如 “<span class="quote">sheep</span>”, “<span class="quote">deer</span>” 和 “<span class="quote">haiku</span>”。)
            </p>
            <p>其他的语言当然完全不同。</p>
            <p>让我们来设计一个复数化名词的模块吧！从英语名词开始，仅考虑上面的四种规则，但是记得你将来需要不断添加规则，更可能最后添加进更多的语言。</p>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.stage1"></a><a name="stage1.html">17.2.&nbsp;<tt class="filename">plural.py</tt>, 第 1 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你所针对的单词 (至少在英语中) 是字符串和字符。你还需要规则来找出不同的字符 (字母) 组合，并对它们进行不同的操作。这听起来像是正则表达式的工作。</p>
         </div>
         <div class="example"><a name="d0e37260"></a><h3 class="title">例&nbsp;17.1.&nbsp;<tt class="filename">plural1.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re

<span class='pykeyword'>def</span><span class='pyclass'> plural</span>(noun):                            
    <span class='pykeyword'>if</span> re.search(<span class='pystring'>'[sxz]$'</span>, noun):             <a name="plural.stage1.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        <span class='pykeyword'>return</span> re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'es'</span>, noun)        <a name="plural.stage1.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    <span class='pykeyword'>elif</span> re.search(<span class='pystring'>'[^aeioudgkprt]h$'</span>, noun):
        <span class='pykeyword'>return</span> re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'es'</span>, noun)       
    <span class='pykeyword'>elif</span> re.search(<span class='pystring'>'[^aeiou]y$'</span>, noun):      
        <span class='pykeyword'>return</span> re.sub(<span class='pystring'>'y$'</span>, <span class='pystring'>'ies'</span>, noun)     
    <span class='pykeyword'>else</span>:                                    
        <span class='pykeyword'>return</span> noun + <span class='pystring'>'s'</span>                    
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.stage2"></a><a name="stage2.html">17.3.&nbsp;<tt class="filename">plural.py</tt>, 第 2 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在你将增加一个抽象过程。你从定义一个规则列表开始：如果这样，就做那个，否则判断下一规则。让我们暂时将程序一部分复杂化以便使另一部分简单化。</p>
         </div>
         <div class="example"><a name="d0e37780"></a><h3 class="title">例&nbsp;17.6.&nbsp;<tt class="filename">plural2.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re

<span class='pykeyword'>def</span><span class='pyclass'> match_sxz</span>(noun):                          
    <span class='pykeyword'>return</span> re.search(<span class='pystring'>'[sxz]$'</span>, noun)          

<span class='pykeyword'>def</span><span class='pyclass'> apply_sxz</span>(noun):                          
    <span class='pykeyword'>return</span> re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'es'</span>, noun)            

<span class='pykeyword'>def</span><span class='pyclass'> match_h</span>(noun):                            
    <span class='pykeyword'>return</span> re.search(<span class='pystring'>'[^aeioudgkprt]h$'</span>, noun)

<span class='pykeyword'>def</span><span class='pyclass'> apply_h</span>(noun):                            
    <span class='pykeyword'>return</span> re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'es'</span>, noun)            

<span class='pykeyword'>def</span><span class='pyclass'> match_y</span>(noun):                            
    <span class='pykeyword'>return</span> re.search(<span class='pystring'>'[^aeiou]y$'</span>, noun)      
        
<span class='pykeyword'>def</span><span class='pyclass'> apply_y</span>(noun):                            
    <span class='pykeyword'>return</span> re.sub(<span class='pystring'>'y$'</span>, <span class='pystring'>'ies'</span>, noun)          

<span class='pykeyword'>def</span><span class='pyclass'> match_default</span>(noun):                      
    <span class='pykeyword'>return</span> 1                                  
        
<span class='pykeyword'>def</span><span class='pyclass'> apply_default</span>(noun):                      
    <span class='pykeyword'>return</span> noun + <span class='pystring'>'s'</span>                         

rules = ((match_sxz, apply_sxz),
         (match_h, apply_h),
         (match_y, apply_y),
         (match_default, apply_default)
         )                                     <a name="plural.stage2.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">

<span class='pykeyword'>def</span><span class='pyclass'> plural</span>(noun):                             
    <span class='pykeyword'>for</span> matchesRule, applyRule <span class='pykeyword'>in</span> rules:       <a name="plural.stage2.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        <span class='pykeyword'>if</span> matchesRule(noun):                  <a name="plural.stage2.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
            <span class='pykeyword'>return</span> applyRule(noun)             <a name="plural.stage2.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.stage3"></a><a name="stage3.html">17.4.&nbsp;<tt class="filename">plural.py</tt>, 第 3 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>将每个匹配和规则应用分别制作成函数没有必要。你从来不会直接调用它们：你把它们定义于 <tt class="varname">rules</tt> 列表之中并从那里调用它们。让我们隐去它们的函数名而抓住规则定义的主线。
            </p>
         </div>
         <div class="example"><a name="d0e37925"></a><h3 class="title">例&nbsp;17.8.&nbsp;<tt class="filename">plural3.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re

rules = \
  (
    (
     <span class='pykeyword'>lambda</span> word: re.search(<span class='pystring'>'[sxz]$'</span>, word),
     <span class='pykeyword'>lambda</span> word: re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'es'</span>, word)
    ),
    (
     <span class='pykeyword'>lambda</span> word: re.search(<span class='pystring'>'[^aeioudgkprt]h$'</span>, word),
     <span class='pykeyword'>lambda</span> word: re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'es'</span>, word)
    ),
    (
     <span class='pykeyword'>lambda</span> word: re.search(<span class='pystring'>'[^aeiou]y$'</span>, word),
     <span class='pykeyword'>lambda</span> word: re.sub(<span class='pystring'>'y$'</span>, <span class='pystring'>'ies'</span>, word)
    ),
    (
     <span class='pykeyword'>lambda</span> word: re.search(<span class='pystring'>'$'</span>, word),
     <span class='pykeyword'>lambda</span> word: re.sub(<span class='pystring'>'$'</span>, <span class='pystring'>'s'</span>, word)
    )
   )                                           <a name="plural.stage3.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">

<span class='pykeyword'>def</span><span class='pyclass'> plural</span>(noun):                             
    <span class='pykeyword'>for</span> matchesRule, applyRule <span class='pykeyword'>in</span> rules:       <a name="plural.stage3.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        <span class='pykeyword'>if</span> matchesRule(noun):                 
            <span class='pykeyword'>return</span> applyRule(noun)            
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.stage4"></a><a name="stage4.html">17.5.&nbsp;<tt class="filename">plural.py</tt>, 第 4 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>让我们精炼出代码中的重复之处，以便更容易地定义新规则。</p>
         </div>
         <div class="example"><a name="plural.stage4.example.1"></a><h3 class="title">例&nbsp;17.9.&nbsp;<tt class="filename">plural4.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re

<span class='pykeyword'>def</span><span class='pyclass'> buildMatchAndApplyFunctions</span>((pattern, search, replace)):  
    matchFunction = <span class='pykeyword'>lambda</span> word: re.search(pattern, word)      <a name="plural.stage4.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
    applyFunction = <span class='pykeyword'>lambda</span> word: re.sub(search, replace, word) <a name="plural.stage4.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    <span class='pykeyword'>return</span> (matchFunction, applyFunction)                      <a name="plural.stage4.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.stage5"></a><a name="stage5.html">17.6.&nbsp;<tt class="filename">plural.py</tt>, 第 5 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>你已经精炼了所有重复代码，也尽可能地把复数规则提炼到定义一个字符串列表。接下来的步骤是把这些字符串提出来放在另外的文件中，从而可以和使用它们的代码分开来维护。</p>
         </div>
         <p>首先，让我们建立一个包含你需要的所有规则的文本文件。没有什么特别的结构，不过是以空格 (或者制表符) 把字符串列成三列。你把它命名为 <tt class="filename">rules.en</tt>，“<span class="quote">en</span>” 是英语的意思。这些是英语名词复数的规则，你以后可以为其它语言添加规则文件。
         </p>
         <div class="example"><a name="d0e38298"></a><h3 class="title">例&nbsp;17.15.&nbsp;<tt class="filename">rules.en</tt></h3><pre class="programlisting">
[sxz]$                  $               es
[^aeioudgkprt]h$        $               es
[^aeiou]y$              y$              ies
$                       $               s
</pre></div>
         <p>现在来看看如何使用规则文件。</p>
         <div class="example"><a name="d0e38306"></a><h3 class="title">例&nbsp;17.16.&nbsp;<tt class="filename">plural5.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re
<span class='pykeyword'>import</span> string                                                                     

<span class='pykeyword'>def</span><span class='pyclass'> buildRule</span>((pattern, search, replace)):                                        
    <span class='pykeyword'>return</span> <span class='pykeyword'>lambda</span> word: re.search(pattern, word) <span class='pykeyword'>and</span> re.sub(search, replace, word) <a name="plural.stage5.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">

<span class='pykeyword'>def</span><span class='pyclass'> plural</span>(noun, language=<span class='pystring'>'en'</span>):                             <a name="plural.stage5.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    lines = file(<span class='pystring'>'rules.%s'</span> % language).readlines()          <a name="plural.stage5.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
    patterns = map(string.split, lines)                      <a name="plural.stage5.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
    rules = map(buildRule, patterns)                         <a name="plural.stage5.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
    <span class='pykeyword'>for</span> rule <span class='pykeyword'>in</span> rules:                                      
        result = rule(noun)                                  <a name="plural.stage5.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
        <span class='pykeyword'>if</span> result: <span class='pykeyword'>return</span> result                            
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.stage6"></a><a name="stage6.html">17.7.&nbsp;<tt class="filename">plural.py</tt>, 第 6 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在你已准备好探讨生成器 (Generator) 了。</p>
         </div>
         <div class="example"><a name="d0e38429"></a><h3 class="title">例&nbsp;17.17.&nbsp;<tt class="filename">plural6.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> re

<span class='pykeyword'>def</span><span class='pyclass'> rules</span>(language):                                                                 
    <span class='pykeyword'>for</span> line <span class='pykeyword'>in</span> file(<span class='pystring'>'rules.%s'</span> % language):                                         
        pattern, search, replace = line.split()                                      
        <span class='pykeyword'>yield</span> <span class='pykeyword'>lambda</span> word: re.search(pattern, word) <span class='pykeyword'>and</span> re.sub(search, replace, word)

<span class='pykeyword'>def</span><span class='pyclass'> plural</span>(noun, language=<span class='pystring'>'en'</span>):      
    <span class='pykeyword'>for</span> applyRule <span class='pykeyword'>in</span> rules(language): 
        result = applyRule(noun)      
        <span class='pykeyword'>if</span> result: <span class='pykeyword'>return</span> result      
</pre></div>
         <p>这里使用了被称作生成器的技术，我不打算在你看过一个简单例子之前试图解释它。</p>
         <div class="example"><a name="plural.introducing.generators"></a><h3 class="title">例&nbsp;17.18.&nbsp;介绍生成器</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>def</span><span class='pyclass'> make_counter</span>(x):</span>
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>print</span> <span class='pystring'>'entering make_counter'</span></span>
<tt class="prompt">...     </tt><span class="userinput"><span class='pykeyword'>while</span> 1:</span>
<tt class="prompt">...     </tt><span class="userinput">    <span class='pykeyword'>yield</span> x</span>               <a name="plural.stage6.2.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">...     </tt><span class="userinput">    <span class='pykeyword'>print</span> <span class='pystring'>'incrementing x'</span></span>
<tt class="prompt">...     </tt><span class="userinput">    x = x + 1</span>
<tt class="prompt">...     </tt>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">counter = make_counter(2)</span> <a name="plural.stage6.2.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">counter</span>                   <a name="plural.stage6.2.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;generator object at 0x001C9C10&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">counter.next()</span>            <a name="plural.stage6.2.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">entering make_counter
2</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">counter.next()</span>            <a name="plural.stage6.2.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<span class="computeroutput">incrementing x
3</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">counter.next()</span>            <a name="plural.stage6.2.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
<span class="computeroutput">incrementing x
4</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="plural.summary"></a><a name="summary.html">17.8.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>这一章中我们探讨了几个不同的高级技术。它们并不都适用于任何情况。</p>
         </div>
         <p>你现在应该能自如应用如下技术：</p>
         <div class="itemizedlist">
            <ul>
               <li>应用<a href="stage1.html" title="17.2.&nbsp;plural.py, 第 1 阶段">正则表达式进行字符串替换</a>。
               </li>
               <li>将<a href="stage2.html" title="17.3.&nbsp;plural.py, 第 2 阶段">函数当作对象</a>，把它们存于列表中，把它们赋值给变量，并通过变量来调用它们。
               </li>
               <li>构建<a href="stage3.html" title="17.4.&nbsp;plural.py, 第 3 阶段">应用 <tt class="literal">lambda</tt> 的动态函数</a>。
               </li>
               <li>构建<a href="stage4.html" title="17.5.&nbsp;plural.py, 第 4 阶段">闭合</a>，将外部变量作为常量构建动态函数。
               </li>
               <li>构建<a href="stage6.html" title="17.7.&nbsp;plural.py, 第 6 阶段">生成器</a>，进行逻辑递增操作并在每次调用时返回不同值的恢复执行函数。
               </li>
            </ul>
         </div>
         <p>抽象化，动态构建函数，构建闭合以及应用生成器能够使你的代码更加简单化、可读化、灵活化。你需要在简洁和功能实现两方面进行平衡。</p>
      </div>
      
