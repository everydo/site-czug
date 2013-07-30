<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/regular_expressions/index.html">http://www.woodpecker.org.cn/diveintopython/regular_expressions/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re"></a>第&nbsp;7&nbsp;章&nbsp;正则表达式
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#re.intro">7.1. 概览</a></span></li>
               <li><span class="section"><a href="#street_addresses.html">7.2. 个案研究：街道地址</a></span></li>
               <li><span class="section"><a href="#roman_numerals.html">7.3. 个案研究：罗马字母</a></span><ul>
                     <li><span class="section"><a href="#roman_numerals.html#d0e17763">7.3.1. 校验千位数</a></span></li>
                     <li><span class="section"><a href="#roman_numerals.html#d0e17955">7.3.2. 校验百位数</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#n_m_syntax.html">7.4. 使用 {n,m} 语法</a></span><ul>
                     <li><span class="section"><a href="#n_m_syntax.html#d0e18499">7.4.1. 校验十位数和个位数</a></span></li>
                  </ul>
               </li>
               <li><span class="section"><a href="#verbose.html">7.5. 松散正则表达式</a></span></li>
               <li><span class="section"><a href="#phone_numbers.html">7.6. 个案研究：解析电话号码</a></span></li>
               <li><span class="section"><a href="#summary.html">7.7. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>正则表达式是搜索、替换和解析复杂字符模式的一种强大而标准的方法。如果你曾经在其他语言 (如 <span class="application">Perl</span>) 中使用过它，由于它们的语法非常相似，你仅仅阅读一下 <tt class="filename">re</tt> 模块的摘要，大致了解其中可用的函数和参数就可以了。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="re.intro"></a>7.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <p>字符串也有很多方法，可以进行搜索 (<tt class="function">index</tt>、<tt class="function">find</tt> 和 <tt class="function">count</tt>)、替换 (<tt class="function">replace</tt>) 和解析 (<tt class="function">split</tt>)，但它们仅限于处理最简单的情况。搜索方法查找单个和固定编码的子串，并且它们总是大小写敏感的。对一个字符串<tt class="varname">s</tt>，如果要进行大小写不敏感的搜索，则你必须调用 <tt class="function">s.lower()</tt> 或 <tt class="function">s.upper()</tt> 将 <tt class="varname">s</tt> 转换成全小写或者全大写，然后确保搜索串有着相匹配的大小写。<tt class="function">replace</tt> 和 <tt class="function">split</tt>方法有着类似的限制。
            </p>
            <div class="abstract">
               <p>如果你要解决的问题利用字符串函数能够完成，你应该使用它们。它们快速、简单且容易阅读，而快速、简单、可读性强的代码可以说出很多好处。但是，如果你发现你使用了许多不同的字符串函数和 <tt class="literal">if</tt> 语句来处理一个特殊情况，或者你组合使用了 <tt class="function">split</tt>、<tt class="function">join</tt> 等函数而导致用一种奇怪的甚至读不下去的方式理解列表，此时，你也许需要转到正则表达式了。
               </p>
            </div>
            <p>尽管正则表达式语法较之普通代码相对麻烦一些，但是却可以得到更可读的结果，与用一长串字符串函数的解决方案相比要好很多。在正则表达式内部有多种方法嵌入注释，从而使之具有自文档化 (self-documenting) 的能力。</p>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re.matching"></a><a name="street_addresses.html">7.2.&nbsp;个案研究：街道地址
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>这一系列的例子是由我几年前日常工作中的现实问题启发而来的，当时我需要从一个老化系统中导出街道地址，在将它们导入新的系统之前，进行清理和标准化。(看，我不是只将这些东西堆到一起，它有实际的用处。)这个例子展示我如何处理这个问题。</p>
         </div>
         <div class="example"><a name="d0e17108"></a><h3 class="title">例&nbsp;7.1.&nbsp;在字符串的结尾匹配</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s = <span class='pystring'>'100 NORTH MAIN ROAD'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s.replace(<span class='pystring'>'ROAD'</span>, <span class='pystring'>'RD.'</span>)</span>               <a name="re.matching.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">'100 NORTH MAIN RD.'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s = <span class='pystring'>'100 NORTH BROAD ROAD'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s.replace(<span class='pystring'>'ROAD'</span>, <span class='pystring'>'RD.'</span>)</span>               <a name="re.matching.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">'100 NORTH BRD. RD.'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">s[:-4] + s[-4:].replace(<span class='pystring'>'ROAD'</span>, <span class='pystring'>'RD.'</span>)</span> <a name="re.matching.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">'100 NORTH BROAD RD.'</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> re</span>                              <a name="re.matching.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.sub(<span class='pystring'>'ROAD$'</span>, <span class='pystring'>'RD.'</span>, s)</span>              <a name="re.matching.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12"> <a name="re.matching.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
<span class="computeroutput">'100 NORTH BROAD RD.'</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re.roman"></a><a name="roman_numerals.html">7.3.&nbsp;个案研究：罗马字母
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="roman_numerals.html#d0e17763">7.3.1. 校验千位数</a></span></li>
               <li><span class="section"><a href="roman_numerals.html#d0e17955">7.3.2. 校验百位数</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>你可能经常看到罗马数字，即使你没有意识到它们。你可能曾经在老电影或者电视中看到它们 (“<span class="quote">版权所有 <tt class="literal">MCMXLVI</tt></span>” 而不是 “<span class="quote">版权所有<tt class="literal">1946</tt></span>”)，或者在某图书馆或某大学的贡献墙上看到它们 (“<span class="quote">成立于 <tt class="literal">MDCCCLXXXVIII</tt></span>”而不是“<span class="quote">成立于<tt class="literal">1888</tt></span>”)。你也可能在某些文献的大纲或者目录上看到它们。这是一个表示数字的系统，它实际上能够追溯到远古的罗马帝国 (因此而得名)。
            </p>
         </div>
         <p>在罗马数字中，利用7个不同字母进行重复或者组合来表达各式各样的数字。</p>
         <div class="itemizedlist">
            <ul>
               <li><tt class="literal">I</tt> = <tt class="literal">1</tt></li>
               <li><tt class="literal">V</tt> = <tt class="literal">5</tt></li>
               <li><tt class="literal">X</tt> = <tt class="literal">10</tt></li>
               <li><tt class="literal">L</tt> = <tt class="literal">50</tt></li>
               <li><tt class="literal">C</tt> = <tt class="literal">100</tt></li>
               <li><tt class="literal">D</tt> = <tt class="literal">500</tt></li>
               <li><tt class="literal">M</tt> = <tt class="literal">1000</tt></li>
            </ul>
         </div>
         <p>下面是关于构造罗马数字的一些通用的规则的介绍：</p>
         <div class="itemizedlist">
            <ul>
               <li>字符是叠加的。<tt class="literal">I</tt> 表示 <tt class="constant">1</tt>，<tt class="literal">II</tt> 表示 <tt class="literal">2</tt>，而 <tt class="literal">III</tt> 表示 <tt class="literal">3</tt>。<tt class="literal">VI</tt> 表示 <tt class="literal">6</tt> (字面上为逐字符相加，“<span class="quote"><tt class="literal">5</tt> 加 <tt class="literal">1</tt></span>”)，<tt class="literal">VII</tt> 表示 <tt class="literal">7</tt>，<tt class="literal">VIII</tt> 表示 <tt class="literal">8</tt>。
               </li>
               <li>含十字符 (<tt class="literal">I</tt>、<tt class="literal">X</tt>、<tt class="literal">C</tt> 和 <tt class="literal">M</tt>) 至多可以重复三次。对于 <tt class="literal">4</tt>，你则需要利用下一个最大的含五字符进行减操作得到：你不能把 <tt class="literal">4</tt> 表示成 <tt class="literal">IIII</tt>，而应表示为 <tt class="literal">IV</tt> (“<span class="quote">比 <tt class="literal">5</tt> 小 <tt class="literal">1</tt></span>”)。数字 <tt class="literal">40</tt> 写成 <tt class="literal">XL</tt> (比 <tt class="literal">50</tt> 小 <tt class="literal">10</tt>)，<tt class="literal">41</tt> 写成 <tt class="literal">XLI</tt>，<tt class="literal">42</tt> 写成 <tt class="literal">XLII</tt>，<tt class="literal">43</tt> 写成 <tt class="literal">XLIII</tt>，而 <tt class="literal">44</tt> 写成 <tt class="literal">XLIV</tt> (比 <tt class="literal">50</tt> 小 <tt class="literal">10</tt>，然后比 <tt class="literal">5</tt> 小<tt class="literal">1</tt>)。
               </li>
               <li>类似地，对于数字 <tt class="literal">9</tt>，你必须利用下一个含十字符进行减操作得到：<tt class="literal">8</tt> 表示为 <tt class="literal">VIII</tt>，而 <tt class="literal">9</tt> 则表示为 <tt class="literal">IX</tt> (比 <tt class="literal">10</tt> 小 <tt class="literal">1</tt>)，而不是 <tt class="literal">VIIII</tt> (因为字符 <tt class="literal">I</tt> 不能连续重复四次)。数字 <tt class="literal">90</tt> 表示为 <tt class="literal">XC</tt>，<tt class="literal">900</tt> 表示为 <tt class="literal">CM</tt>。
               </li>
               <li>含五字符不能重复。数字 <tt class="literal">10</tt> 常表示为<tt class="literal">X</tt>，而从来不用<tt class="literal">VV</tt>来表示。数字 <tt class="literal">100</tt> 常表示为<tt class="literal">C</tt>，也从来不表示为 <tt class="literal">LL</tt>。
               </li>
               <li>罗马数字一般从高位到低位书写，从左到右阅读，因此不同顺序的字符意义大不相同。<tt class="literal">DC</tt> 表示 <tt class="literal">600</tt>；而 <tt class="literal">CD</tt> 是一个完全不同的数字 (为 <tt class="literal">400</tt>，也就是比 <tt class="literal">500</tt> 小<tt class="literal">100</tt>)。<tt class="literal">CI</tt> 表示 <tt class="literal">101</tt>；而<tt class="literal">IC</tt> 甚至不是一个合法的罗马字母 (因为你不能直接从数字<tt class="literal">100</tt>减去<tt class="literal">1</tt>；这需要写成 <tt class="literal">XCIX</tt>，意思是比 <tt class="literal">100</tt> 小 <tt class="literal">10</tt>，然后加上数字 <tt class="literal">9</tt>，也就是比 <tt class="literal">10</tt> 小 <tt class="literal">1</tt>的数字)。
               </li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h3 class="title"><a name="d0e17763"></a>7.3.1.&nbsp;校验千位数
                     </h3>
                  </div>
               </div>
               <div></div>
            </div>
            <p>怎样校验任意一个字符串是否为一个有效的罗马数字呢？我们每次只看一位数字，由于罗马数字一般是从高位到低位书写。我们从高位开始：千位。对于大于或等于 1000 的数字，千位由一系列的字符 <tt class="literal">M</tt> 表示。
            </p>
            <div class="example"><a name="d0e17771"></a><h3 class="title">例&nbsp;7.3.&nbsp;校验千位数</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> re</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">pattern = <span class='pystring'>'^M?M?M?$'</span></span>       <a name="re.roman.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'M'</span>)</span>    <a name="re.roman.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;SRE_Match object at 0106FB58&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MM'</span>)</span>   <a name="re.roman.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;SRE_Match object at 0106C290&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MMM'</span>)</span>  <a name="re.roman.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">&lt;SRE_Match object at 0106AA38&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MMMM'</span>)</span> <a name="re.roman.1.5"></a><img src="../images/callouts/5.png" alt="5" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>''</span>)</span>     <a name="re.roman.1.6"></a><img src="../images/callouts/6.png" alt="6" border="0" width="12" height="12">
<span class="computeroutput">&lt;SRE_Match object at 0106F4A8&gt;</span></pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re.nm"></a><a name="n_m_syntax.html">7.4.&nbsp;使用 <tt class="literal">{n,m}</tt> 语法
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="n_m_syntax.html#d0e18499">7.4.1. 校验十位数和个位数</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>在<a href="roman_numerals.html" title="7.3.&nbsp;个案研究：罗马字母">前面的章节</a>，你处理了相同字符可以重复三次的情况。在正则表达式中，有另外一个方式来表达这种情况，并且能提高代码的可读性。首先看看我们在前面的例子中使用的方法。
            </p>
         </div>
         <div class="example"><a name="d0e18283"></a><h3 class="title">例&nbsp;7.5.&nbsp;老方法：每一个字符都是可选的</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> re</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">pattern = <span class='pystring'>'^M?M?M?$'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'M'</span>)</span>    <a name="re.nm.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">&lt;_sre.SRE_Match object at 0x008EE090&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">pattern = <span class='pystring'>'^M?M?M?$'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MM'</span>)</span>   <a name="re.nm.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;_sre.SRE_Match object at 0x008EEB48&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">pattern = <span class='pystring'>'^M?M?M?$'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MMM'</span>)</span>  <a name="re.nm.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;_sre.SRE_Match object at 0x008EE090&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MMMM'</span>)</span> <a name="re.nm.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re.verbose"></a><a name="verbose.html">7.5.&nbsp;松散正则表达式
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>迄今为止，你只是处理过被我称之为“<span class="quote">紧凑</span>”类型的正则表达式。正如你曾看到的，它们难以阅读，即使你清楚正则表达式的含义，你也不能保证六个月以后你还能理解它。你真正所需的就是利用内联文档 (inline documentation)。
            </p>
         </div>
         <p><span class="application">Python</span> 允许用户利用所谓的<span class="emphasis"><em>松散正则表达式</em></span> 来完成这个任务。一个松散正则表达式和一个紧凑正则表达式主要区别表现在两个方面：
         </p>
         <div class="itemizedlist">
            <ul>
               <li>忽略空白符。空格符，制表符，回车符不匹配它们自身，它们根本不参与匹配。(如果你想在松散正则表达式中匹配一个空格符，你必须在它前面添加一个反斜线符号对它进行转义。)</li>
               <li>忽略注释。在松散正则表达式中的注释和在普通 <span class="application">Python</span> 代码中的一样：开始于一个<tt class="literal">#</tt>符号，结束于行尾。这种情况下，采用在一个多行字符串中注释，而不是在源代码中注释，它们以相同的方式工作。
               </li>
            </ul>
         </div>
         <p>用一个例子可以解释得更清楚。让我们重新来看前面的紧凑正则表达式，利用松散正则表达式重新表达。下面的例子显示实现方法。</p>
         <div class="example"><a name="d0e18954"></a><h3 class="title">例&nbsp;7.9.&nbsp;带有内联注释 (Inline Comments) 的正则表达式</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">pattern = <span class='pystring'>"""
    ^                   # beginning of string
    M{0,3}              # thousands - 0 to 3 M's
    (CM|CD|D?C{0,3})    # hundreds - 900 (CM), 400 (CD), 0-300 (0 to 3 C's),
                        #            or 500-800 (D, followed by 0 to 3 C's)
    (XC|XL|L?X{0,3})    # tens - 90 (XC), 40 (XL), 0-30 (0 to 3 X's),
                        #        or 50-80 (L, followed by 0 to 3 X's)
    (IX|IV|V?I{0,3})    # ones - 9 (IX), 4 (IV), 0-3 (0 to 3 I's),
                        #        or 5-8 (V, followed by 0 to 3 I's)
    $                   # end of string
    """</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'M'</span>, re.VERBOSE)</span>                <a name="re.verbose.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">&lt;_sre.SRE_Match object at 0x008EEB48&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MCMLXXXIX'</span>, re.VERBOSE)</span>        <a name="re.verbose.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">&lt;_sre.SRE_Match object at 0x008EEB48&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'MMMDCCCLXXXVIII'</span>, re.VERBOSE)</span>  <a name="re.verbose.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">&lt;_sre.SRE_Match object at 0x008EEB48&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'M'</span>)</span>                            <a name="re.verbose.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re.phone"></a><a name="phone_numbers.html">7.6.&nbsp;个案研究：解析电话号码
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>迄今为止，你主要是匹配整个模式，不论是匹配上，还是没有匹配上。但是正则表达式还有比这更为强大的功能。当一个模式<span class="emphasis"><em>确实</em></span> 匹配上时，你可以获取模式中特定的片断，你可以发现具体匹配的位置。
            </p>
         </div>
         <p>这个例子来源于我遇到的另一个现实世界的问题，也是在以前的工作中遇到的。问题是：解析一个美国电话号码。客户要能 (在一个单一的区域中) 输入任何数字，然后存储区号、干线号、电话号和一个可选的独立的分机号到公司数据库里。为此，我通过网络找了很多正则表达式的例子，但是没有一个能够完全满足我的要求。</p>
         <p>这里列举了我必须能够接受的电话号码：</p>
         <div class="itemizedlist">
            <ul>
               <li><tt class="literal">800-555-1212</tt></li>
               <li><tt class="literal">800 555 1212</tt></li>
               <li><tt class="literal">800.555.1212</tt></li>
               <li><tt class="literal">(800) 555-1212</tt></li>
               <li><tt class="literal">1-800-555-1212</tt></li>
               <li><tt class="literal">800-555-1212-1234</tt></li>
               <li><tt class="literal">800-555-1212x1234</tt></li>
               <li><tt class="literal">800-555-1212 ext. 1234</tt></li>
               <li><tt class="literal">work 1-(800) 555.1212 #1234</tt></li>
            </ul>
         </div>
         <p>格式可真够多的！我需要知道区号是 <tt class="literal">800</tt>，干线号是 <tt class="literal">555</tt>，电话号的其他数字为 <tt class="literal">1212</tt>。对于那些有分机号的，我需要知道分机号为 <tt class="literal">1234</tt>。
         </p>
         <p>让我们完成电话号码解析这个工作，这个例子展示第一步。</p>
         <div class="example"><a name="re.phone.example"></a><h3 class="title">例&nbsp;7.10.&nbsp;发现数字</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">phonePattern = re.compile(r<span class='pystring'>'^(\d{3})-(\d{3})-(\d{4})$'</span>)</span> <a name="re.phone.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">phonePattern.search(<span class='pystring'>'800-555-1212'</span>).groups()</span>            <a name="re.phone.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">('800', '555', '1212')</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">phonePattern.search(<span class='pystring'>'800-555-1212-1234'</span>)</span>                <a name="re.phone.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="re.summary"></a><a name="summary.html">7.7.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>这只是正则表达式能够完成工作的很少一部分。换句话说，即使你现在备受打击，相信我，你也不是什么也没见过了。</p>
         </div>
         <p>现在，你应该熟悉下列技巧：</p>
         <div class="itemizedlist">
            <ul>
               <li><tt class="literal">^</tt> 匹配字符串的开始。
               </li>
               <li><tt class="literal">$</tt> 匹配字符串的结尾。
               </li>
               <li><tt class="literal">\b</tt> 匹配一个单词的边界。
               </li>
               <li><tt class="literal">\d</tt> 匹配任意数字。
               </li>
               <li><tt class="literal">\D</tt> 匹配任意非数字字符。
               </li>
               <li><tt class="literal">x?</tt> 匹配一个可选的 <tt class="literal">x</tt> 字符 (换言之，它匹配 1 次或者 0 次 <tt class="literal">x</tt> 字符)。
               </li>
               <li><tt class="literal">x*</tt> 匹配0次或者多次 <tt class="literal">x</tt> 字符。
               </li>
               <li><tt class="literal">x+</tt> 匹配1次或者多次 <tt class="literal">x</tt> 字符。
               </li>
               <li><tt class="literal">x{n,m}</tt> 匹配 <tt class="literal">x</tt> 字符，至少 <tt class="literal">n</tt> 次，至多 <tt class="literal">m</tt> 次。
               </li>
               <li><tt class="literal">(a|b|c)</tt> 要么匹配 <tt class="literal">a</tt>，要么匹配 <tt class="literal">b</tt>，要么匹配 <tt class="literal">c</tt>。
               </li>
               <li><tt class="literal">(x)</tt> 一般情况下表示一个<span class="emphasis"><em>记忆组 (remembered group)</em></span>。你可以利用 <tt class="function">re.search</tt> 函数返回对象的 <tt class="function">groups()</tt> 函数获取它的值。
               </li>
            </ul>
         </div>
         <p>正则表达式非常强大，但是它并不能为每一个问题提供正确的解决方案。你应该学习足够多的知识，以辨别什么时候它们是合适的，什么时候它们会解决你的问题，什么时候它们产生的问题比要解决的问题还要多。</p>
         <div class="blockquote">
            
