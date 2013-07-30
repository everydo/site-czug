---
created: 
creator: Benky
description: ''
title: 14. 测试优先编程
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/unit_testing/stage_1.html">http://www.woodpecker.org.cn/diveintopython/unit_testing/stage_1.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman1.5"></a>第&nbsp;14&nbsp;章&nbsp;测试优先编程
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#stage_1.html#roman.stage1">14.1. roman.py, 第 1 阶段</a></span></li>
               <li><span class="section"><a href="#stage_2.html">14.2. roman.py, 第 2 阶段</a></span></li>
               <li><span class="section"><a href="#stage_3.html">14.3. roman.py, 第 3 阶段</a></span></li>
               <li><span class="section"><a href="#stage_4.html">14.4. roman.py, 第 4 阶段</a></span></li>
               <li><span class="section"><a href="#stage_5.html">14.5. roman.py, 第 5 阶段</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="roman.stage1"></a>14.1.&nbsp;<tt class="filename">roman.py</tt>, 第 1 阶段
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>到目前为止，单元测试已经完成，是时候开始编写被单元测试测试的代码了。你将分阶段地完成这个工作，因此开始时所有的单元测试都是失败的，但在逐步完成 <tt class="filename">roman.py</tt> 的同时你会看到它们一个个地通过测试。
               </p>
            </div>
            <div class="example"><a name="d0e33028"></a><h3 class="title">例&nbsp;14.1.&nbsp;<tt class="filename">roman1.py</tt></h3>
               <p>这个程序可以在例子目录下的 <tt class="filename">py/roman/stage1/</tt> 目录中找到。
               </p>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting">
<span class='pystring'>"""Convert to and from Roman numerals"""</span>

<span class='pycomment'>#Define exceptions</span>
<span class='pykeyword'>class</span><span class='pyclass'> RomanError</span>(Exception): <span class='pykeyword'>pass</span>                <a name="roman.stage1.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12"><span class='pykeyword'>
class</span> OutOfRangeError(RomanError): <span class='pykeyword'>pass</span>          <a name="roman.stage1.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12"><span class='pykeyword'>
class</span> NotIntegerError(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> InvalidRomanNumeralError</span>(RomanError): <span class='pykeyword'>pass</span> <a name="roman.stage1.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">

<span class='pykeyword'>def</span><span class='pyclass'> toRoman</span>(n):
    <span class='pystring'>"""convert integer to Roman numeral"""</span>
    <span class='pykeyword'>pass</span>                                         <a name="roman.stage1.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">

<span class='pykeyword'>def</span><span class='pyclass'> fromRoman</span>(s):
    <span class='pystring'>"""convert Roman numeral to integer"""</span>
    <span class='pykeyword'>pass</span>
</pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.stage2"></a><a name="stage_2.html">14.2.&nbsp;<tt class="filename">roman.py</tt>, 第 2 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在你有了 <tt class="filename">roman</tt> 模块的大概框架，到了开始写代码以通过测试的时候了。
            </p>
         </div>
         <div class="example"><a name="roman.stage2.example"></a><h3 class="title">例&nbsp;14.3.&nbsp;<tt class="filename">roman2.py</tt></h3>
            <p>这个文件可以从 <tt class="filename">py/roman/stage2/</tt> 目录中找到。
            </p>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting">
<span class='pystring'>"""Convert to and from Roman numerals"""</span>

<span class='pycomment'>#Define exceptions</span>
<span class='pykeyword'>class</span><span class='pyclass'> RomanError</span>(Exception): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> OutOfRangeError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> NotIntegerError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> InvalidRomanNumeralError</span>(RomanError): <span class='pykeyword'>pass</span>

<span class='pycomment'>#Define digit mapping</span>
romanNumeralMap = ((<span class='pystring'>'M'</span>,  1000), <a name="roman.stage2.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
                   (<span class='pystring'>'CM'</span>, 900),
                   (<span class='pystring'>'D'</span>,  500),
                   (<span class='pystring'>'CD'</span>, 400),
                   (<span class='pystring'>'C'</span>,  100),
                   (<span class='pystring'>'XC'</span>, 90),
                   (<span class='pystring'>'L'</span>,  50),
                   (<span class='pystring'>'XL'</span>, 40),
                   (<span class='pystring'>'X'</span>,  10),
                   (<span class='pystring'>'IX'</span>, 9),
                   (<span class='pystring'>'V'</span>,  5),
                   (<span class='pystring'>'IV'</span>, 4),
                   (<span class='pystring'>'I'</span>,  1))

<span class='pykeyword'>def</span><span class='pyclass'> toRoman</span>(n):
    <span class='pystring'>"""convert integer to Roman numeral"""</span>
    result = <span class='pystring'>""</span>
    <span class='pykeyword'>for</span> numeral, integer <span class='pykeyword'>in</span> romanNumeralMap:
        <span class='pykeyword'>while</span> n &gt;= integer:      <a name="roman.stage2.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
            result += numeral
            n -= integer
    <span class='pykeyword'>return</span> result

<span class='pykeyword'>def</span><span class='pyclass'> fromRoman</span>(s):
    <span class='pystring'>"""convert Roman numeral to integer"""</span>
    <span class='pykeyword'>pass</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.stage3"></a><a name="stage_3.html">14.3.&nbsp;<tt class="filename">roman.py</tt>, 第 3 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在 <tt class="function">toRoman</tt> 对于有效的输入 (<tt class="literal">1</tt> 到 <tt class="literal">3999</tt> 整数) 已能正确工作，是正确处理那些无效输入 (任何其他输入) 的时候了。
            </p>
         </div>
         <div class="example"><a name="d0e33525"></a><h3 class="title">例&nbsp;14.6.&nbsp;<tt class="filename">roman3.py</tt></h3>
            <p>这个文件可以在例子目录下的 <tt class="filename">py/roman/stage3/</tt> 目录中找到。
            </p>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting">
<span class='pystring'>"""Convert to and from Roman numerals"""</span>

<span class='pycomment'>#Define exceptions</span>
<span class='pykeyword'>class</span><span class='pyclass'> RomanError</span>(Exception): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> OutOfRangeError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> NotIntegerError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> InvalidRomanNumeralError</span>(RomanError): <span class='pykeyword'>pass</span>

<span class='pycomment'>#Define digit mapping</span>
romanNumeralMap = ((<span class='pystring'>'M'</span>,  1000),
                   (<span class='pystring'>'CM'</span>, 900),
                   (<span class='pystring'>'D'</span>,  500),
                   (<span class='pystring'>'CD'</span>, 400),
                   (<span class='pystring'>'C'</span>,  100),
                   (<span class='pystring'>'XC'</span>, 90),
                   (<span class='pystring'>'L'</span>,  50),
                   (<span class='pystring'>'XL'</span>, 40),
                   (<span class='pystring'>'X'</span>,  10),
                   (<span class='pystring'>'IX'</span>, 9),
                   (<span class='pystring'>'V'</span>,  5),
                   (<span class='pystring'>'IV'</span>, 4),
                   (<span class='pystring'>'I'</span>,  1))

<span class='pykeyword'>def</span><span class='pyclass'> toRoman</span>(n):
    <span class='pystring'>"""convert integer to Roman numeral"""</span>
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> (0 &lt; n &lt; 4000):                                             <a name="roman.stage3.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
        <span class='pykeyword'>raise</span> OutOfRangeError, <span class='pystring'>"number out of range (must be 1..3999)"</span> <a name="roman.stage3.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
    <span class='pykeyword'>if</span> int(n) &lt;&gt; n:                                                    <a name="roman.stage3.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
        <span class='pykeyword'>raise</span> NotIntegerError, <span class='pystring'>"non-integers can not be converted"</span>

    result = <span class='pystring'>""</span>                                                        <a name="roman.stage3.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
    <span class='pykeyword'>for</span> numeral, integer <span class='pykeyword'>in</span> romanNumeralMap:
        <span class='pykeyword'>while</span> n &gt;= integer:
            result += numeral
            n -= integer
    <span class='pykeyword'>return</span> result

<span class='pykeyword'>def</span><span class='pyclass'> fromRoman</span>(s):
    <span class='pystring'>"""convert Roman numeral to integer"""</span>
    <span class='pykeyword'>pass</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.stage4"></a><a name="stage_4.html">14.4.&nbsp;<tt class="filename">roman.py</tt>, 第 4 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在 <tt class="function">toRoman</tt> 完成了，是开始编写 <tt class="function">fromRoman</tt> 的时候了。感谢那个将每个罗马数字和对应整数关连的完美数据结构，这个工作不比 <tt class="function">toRoman</tt> 函数复杂。
            </p>
         </div>
         <div class="example"><a name="d0e33740"></a><h3 class="title">例&nbsp;14.9.&nbsp;<tt class="filename">roman4.py</tt></h3>
            <p>这个文件可以在例子目录下的 <tt class="filename">py/roman/stage4/</tt> 目录中找到。
            </p>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting">
<span class='pystring'>"""Convert to and from Roman numerals"""</span>

<span class='pycomment'>#Define exceptions</span>
<span class='pykeyword'>class</span><span class='pyclass'> RomanError</span>(Exception): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> OutOfRangeError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> NotIntegerError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> InvalidRomanNumeralError</span>(RomanError): <span class='pykeyword'>pass</span>

<span class='pycomment'>#Define digit mapping</span>
romanNumeralMap = ((<span class='pystring'>'M'</span>,  1000),
                   (<span class='pystring'>'CM'</span>, 900),
                   (<span class='pystring'>'D'</span>,  500),
                   (<span class='pystring'>'CD'</span>, 400),
                   (<span class='pystring'>'C'</span>,  100),
                   (<span class='pystring'>'XC'</span>, 90),
                   (<span class='pystring'>'L'</span>,  50),
                   (<span class='pystring'>'XL'</span>, 40),
                   (<span class='pystring'>'X'</span>,  10),
                   (<span class='pystring'>'IX'</span>, 9),
                   (<span class='pystring'>'V'</span>,  5),
                   (<span class='pystring'>'IV'</span>, 4),
                   (<span class='pystring'>'I'</span>,  1))

<span class='pycomment'># toRoman function omitted for clarity (it hasn't changed)</span>

<span class='pykeyword'>def</span><span class='pyclass'> fromRoman</span>(s):
    <span class='pystring'>"""convert Roman numeral to integer"""</span>
    result = 0
    index = 0
    <span class='pykeyword'>for</span> numeral, integer <span class='pykeyword'>in</span> romanNumeralMap:
        <span class='pykeyword'>while</span> s[index:index+len(numeral)] == numeral: <a name="roman.stage4.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
            result += integer
            index += len(numeral)
    <span class='pykeyword'>return</span> result
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.stage5"></a><a name="stage_5.html">14.5.&nbsp;<tt class="filename">roman.py</tt>, 第 5 阶段
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>现在 <tt class="function">fromRoman</tt> 对于有效输入能够正常工作了，是揭开最后一个谜底的时候了：使它正常工作于无效输入的情况下。这意味着要找出一个方法检查一个字符串是不是有效的罗马数字。这比 <tt class="function">toRoman</tt> 中<a href="stage_3.html" title="14.3.&nbsp;roman.py, 第 3 阶段">验证有效的数字输入</a>困难，但是你可以使用一个强大的工具：正则表达式。
            </p>
         </div>
         <p>如果你不熟悉正则表达式，并且没有读过 <a href="../regular_expressions/index.html" title="第&nbsp;7&nbsp;章&nbsp;正则表达式">第&nbsp;7&nbsp;章 <i>正则表达式</i></a>，现在是该好好读读的时候了。
         </p>
         <p>如你在 <a href="../regular_expressions/roman_numerals.html" title="7.3.&nbsp;个案研究：罗马字母">第&nbsp;7.3&nbsp;节 “个案研究：罗马字母”</a>中所见到的，构建罗马数字有几个简单的规则：使用字母 <tt class="literal">M</tt>, <tt class="literal">D</tt>, <tt class="literal">C</tt>, <tt class="literal">L</tt>, <tt class="literal">X</tt>, <tt class="literal">V</tt> 和 <tt class="literal">I</tt>。让我们回顾一下：
         </p>
         <div class="orderedlist">
            <ol type="1">
               <li>字符是被“加”在一起的：<tt class="literal">I</tt> 是 <tt class="constant">1</tt>，<tt class="literal">II</tt> 是 <tt class="literal">2</tt>，<tt class="literal">III</tt> 是 <tt class="literal">3</tt>。<tt class="literal">VI</tt> 是 <tt class="literal">6</tt> (看上去就是 “<span class="quote"><tt class="literal">5</tt> 加 <tt class="literal">1</tt></span>”)，<tt class="literal">VII</tt> 是 <tt class="literal">7</tt>，<tt class="literal">VIII</tt> 是 <tt class="literal">8</tt>。
               </li>
               <li>这些字符 (<tt class="literal">I</tt>, <tt class="literal">X</tt>, <tt class="literal">C</tt> 和 <tt class="literal">M</tt>) 最多可以重复三次。对于 <tt class="literal">4</tt>，你则需要利用下一个能够被5整除的字符进行减操作得到。你不能把 <tt class="literal">4</tt> 表示为 <tt class="literal">IIII</tt> 而应该表示为 <tt class="literal">IV</tt> (“<span class="quote">比 <tt class="literal">5</tt> 小 <tt class="literal">1</tt> </span>”)。<tt class="literal">40</tt> 则被写作 <tt class="literal">XL</tt> (“<span class="quote">比 <tt class="literal">50</tt> 小 <tt class="literal">10</tt></span>”)，<tt class="literal">41</tt> 表示为 <tt class="literal">XLI</tt>，<tt class="literal">42</tt> 表示为 <tt class="literal">XLII</tt>，<tt class="literal">43</tt> 表示为 <tt class="literal">XLIII</tt>，<tt class="literal">44</tt> 表示为 <tt class="literal">XLIV</tt> (“<span class="quote">比<tt class="literal">50</tt>小<tt class="literal">10</tt>，加上 <tt class="literal">5</tt> 小 <tt class="literal">1</tt></span>”)。
               </li>
               <li>类似地，对于数字 <tt class="literal">9</tt>，你必须利用下一个能够被10整除的字符进行减操作得到：<tt class="literal">8</tt> 是 <tt class="literal">VIII</tt>，而 <tt class="literal">9</tt> 是 <tt class="literal">IX</tt> (“<span class="quote">比 <tt class="literal">10</tt> 小 <tt class="literal">1</tt></span>”)，而不是 <tt class="literal">VIIII</tt> (由于 <tt class="literal">I</tt> 不能重复四次)。<tt class="literal">90</tt> 表示为 <tt class="literal">XC</tt>，<tt class="literal">900</tt> 表示为 <tt class="literal">CM</tt>。
               </li>
               <li>含五的字符不能被重复：<tt class="literal">10</tt> 应该表示为 <tt class="literal">X</tt>，而不会是 <tt class="literal">VV</tt>。<tt class="literal">100</tt> 应该表示为 <tt class="literal">C</tt>，而不是 <tt class="literal">LL</tt>。
               </li>
               <li>罗马数字一般从高位到低位书写，从左到右阅读，因此不同顺序的字符意义大不相同。<tt class="literal">DC</tt> 是 <tt class="literal">600</tt>，<tt class="literal">CD</tt> 是完全另外一个数 (<tt class="literal">400</tt>，“<span class="quote">比 <tt class="literal">500</tt> 少 <tt class="literal">100</tt></span>”)。<tt class="literal">CI</tt> 是 <tt class="literal">101</tt>，而 <tt class="literal">IC</tt> 根本就不是一个有效的罗马数字 (因为你无法从<tt class="literal">100</tt>直接减<tt class="literal">1</tt>，应该写成 <tt class="literal">XCIX</tt>，意思是 “<span class="quote">比 <tt class="literal">100</tt> 少 <tt class="literal">10</tt>，然后加上数字 <tt class="literal">9</tt>，也就是比 <tt class="literal">10</tt> 少 <tt class="literal">1</tt></span>”)。
               </li>
            </ol>
         </div>
         <div class="example"><a name="d0e34178"></a><h3 class="title">例&nbsp;14.12.&nbsp;<tt class="filename">roman5.py</tt></h3>
            <p>这个程序可以在例子目录下的<tt class="filename">py/roman/stage5/</tt> 目录中找到。
            </p>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting">
<span class='pystring'>"""Convert to and from Roman numerals"""</span>
<span class='pykeyword'>import</span> re

<span class='pycomment'>#Define exceptions</span>
<span class='pykeyword'>class</span><span class='pyclass'> RomanError</span>(Exception): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> OutOfRangeError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> NotIntegerError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> InvalidRomanNumeralError</span>(RomanError): <span class='pykeyword'>pass</span>

<span class='pycomment'>#Define digit mapping</span>
romanNumeralMap = ((<span class='pystring'>'M'</span>,  1000),
                   (<span class='pystring'>'CM'</span>, 900),
                   (<span class='pystring'>'D'</span>,  500),
                   (<span class='pystring'>'CD'</span>, 400),
                   (<span class='pystring'>'C'</span>,  100),
                   (<span class='pystring'>'XC'</span>, 90),
                   (<span class='pystring'>'L'</span>,  50),
                   (<span class='pystring'>'XL'</span>, 40),
                   (<span class='pystring'>'X'</span>,  10),
                   (<span class='pystring'>'IX'</span>, 9),
                   (<span class='pystring'>'V'</span>,  5),
                   (<span class='pystring'>'IV'</span>, 4),
                   (<span class='pystring'>'I'</span>,  1))

<span class='pykeyword'>def</span><span class='pyclass'> toRoman</span>(n):
    <span class='pystring'>"""convert integer to Roman numeral"""</span>
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> (0 &lt; n &lt; 4000):
        <span class='pykeyword'>raise</span> OutOfRangeError, <span class='pystring'>"number out of range (must be 1..3999)"</span>
    <span class='pykeyword'>if</span> int(n) &lt;&gt; n:
        <span class='pykeyword'>raise</span> NotIntegerError, <span class='pystring'>"non-integers can not be converted"</span>

    result = <span class='pystring'>""</span>
    <span class='pykeyword'>for</span> numeral, integer <span class='pykeyword'>in</span> romanNumeralMap:
        <span class='pykeyword'>while</span> n &gt;= integer:
            result += numeral
            n -= integer
    <span class='pykeyword'>return</span> result

<span class='pycomment'>#Define pattern to detect valid Roman numerals</span>
romanNumeralPattern = <span class='pystring'>'^M?M?M?(CM|CD|D?C?C?C?)(XC|XL|L?X?X?X?)(IX|IV|V?I?I?I?)$'</span> <a name="roman.stage5.3.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">

<span class='pykeyword'>def</span><span class='pyclass'> fromRoman</span>(s):
    <span class='pystring'>"""convert Roman numeral to integer"""</span>
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> re.search(romanNumeralPattern, s):                                    <a name="roman.stage5.3.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
        <span class='pykeyword'>raise</span> InvalidRomanNumeralError, <span class='pystring'>'Invalid Roman numeral: %s'</span> % s

    result = 0
    index = 0
    <span class='pykeyword'>for</span> numeral, integer <span class='pykeyword'>in</span> romanNumeralMap:
        <span class='pykeyword'>while</span> s[index:index+len(numeral)] == numeral:
            result += integer
            index += len(numeral)
    <span class='pykeyword'>return</span> result
</pre><div class="calloutlist">
               
