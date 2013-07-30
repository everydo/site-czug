---
created: 
creator: Benky
description: ''
title: 15. 重构
---
<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/refactoring/index.html">http://www.woodpecker.org.cn/diveintopython/refactoring/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman2"></a>第&nbsp;15&nbsp;章&nbsp;重构
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#roman.bugs">15.1. 处理 bugs</a></span></li>
               <li><span class="section"><a href="#handling_changing_requirements.html">15.2. 应对需求变化</a></span></li>
               <li><span class="section"><a href="#refactoring.html">15.3. 重构</a></span></li>
               <li><span class="section"><a href="#postscript.html">15.4. 后记</a></span></li>
               <li><span class="section"><a href="#summary.html">15.5. 小结</a></span></li>
            </ul>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="roman.bugs"></a>15.1.&nbsp;处理 bugs
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>尽管你很努力地编写全面的单元测试，但是 bug 还是会出现。我所说的 “<span class="quote">bug</span>” 是什么呢？Bug 是你还没有编写的测试用例。
               </p>
            </div>
            <div class="example"><a name="d0e34327"></a><h3 class="title">例&nbsp;15.1.&nbsp;关于 Bug</h3><pre class="screen"><tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> roman5</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">roman5.fromRoman(<span class='pystring'>""</span>)</span> <a name="roman.bugs.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">0</span></pre><div class="calloutlist">
                  
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.change"></a><a name="handling_changing_requirements.html">15.2.&nbsp;应对需求变化
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>尽管你竭尽努力地分析你的客户，并点灯熬油地提炼出精确的需求，但需求还是会是不断变化。大部分客户在看到产品前不知道他们想要什么。即便知道，也不擅于精确表述出他们的有效需求。即便能表述出来，他们在下一个版本一定会要求更多的功能。因此你需要做好更新测试用例的准备以应对需求的改变。</p>
         </div>
         <p>假设你想要扩展罗马数字转换函数的范围。还记得<a href="../unit_testing/diving_in.html" title="13.2.&nbsp;深入">没有哪个字符可以重复三遍以上</a>这条规则吗？呃，现在罗马人希望给这条规则来个例外，用连续出现 4 个 <tt class="literal">M</tt> 字符来表示 <tt class="literal">4000</tt>。如果这样改了，你就可以把转换范围从 <tt class="literal">1..3999</tt> 扩展到 <tt class="literal">1..4999</tt>。但你先要对测试用例进行修改。
         </p>
         <div class="example"><a name="d0e34478"></a><h3 class="title">例&nbsp;15.6.&nbsp;修改测试用例以适应新需求 (<tt class="filename">romantest71.py</tt>)
            </h3>
            <p>这个文件可以在例子目录下的 <tt class="filename">py/roman/stage7/</tt> 目录中找到。
            </p>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting"><span class='pykeyword'>
import</span> roman71
<span class='pykeyword'>import</span> unittest

<span class='pykeyword'>class</span><span class='pyclass'> KnownValues</span>(unittest.TestCase):
    knownValues = ( (1, <span class='pystring'>'I'</span>),
                    (2, <span class='pystring'>'II'</span>),
                    (3, <span class='pystring'>'III'</span>),
                    (4, <span class='pystring'>'IV'</span>),
                    (5, <span class='pystring'>'V'</span>),
                    (6, <span class='pystring'>'VI'</span>),
                    (7, <span class='pystring'>'VII'</span>),
                    (8, <span class='pystring'>'VIII'</span>),
                    (9, <span class='pystring'>'IX'</span>),
                    (10, <span class='pystring'>'X'</span>),
                    (50, <span class='pystring'>'L'</span>),
                    (100, <span class='pystring'>'C'</span>),
                    (500, <span class='pystring'>'D'</span>),
                    (1000, <span class='pystring'>'M'</span>),
                    (31, <span class='pystring'>'XXXI'</span>),
                    (148, <span class='pystring'>'CXLVIII'</span>),
                    (294, <span class='pystring'>'CCXCIV'</span>),
                    (312, <span class='pystring'>'CCCXII'</span>),
                    (421, <span class='pystring'>'CDXXI'</span>),
                    (528, <span class='pystring'>'DXXVIII'</span>),
                    (621, <span class='pystring'>'DCXXI'</span>),
                    (782, <span class='pystring'>'DCCLXXXII'</span>),
                    (870, <span class='pystring'>'DCCCLXX'</span>),
                    (941, <span class='pystring'>'CMXLI'</span>),
                    (1043, <span class='pystring'>'MXLIII'</span>),
                    (1110, <span class='pystring'>'MCX'</span>),
                    (1226, <span class='pystring'>'MCCXXVI'</span>),
                    (1301, <span class='pystring'>'MCCCI'</span>),
                    (1485, <span class='pystring'>'MCDLXXXV'</span>),
                    (1509, <span class='pystring'>'MDIX'</span>),
                    (1607, <span class='pystring'>'MDCVII'</span>),
                    (1754, <span class='pystring'>'MDCCLIV'</span>),
                    (1832, <span class='pystring'>'MDCCCXXXII'</span>),
                    (1993, <span class='pystring'>'MCMXCIII'</span>),
                    (2074, <span class='pystring'>'MMLXXIV'</span>),
                    (2152, <span class='pystring'>'MMCLII'</span>),
                    (2212, <span class='pystring'>'MMCCXII'</span>),
                    (2343, <span class='pystring'>'MMCCCXLIII'</span>),
                    (2499, <span class='pystring'>'MMCDXCIX'</span>),
                    (2574, <span class='pystring'>'MMDLXXIV'</span>),
                    (2646, <span class='pystring'>'MMDCXLVI'</span>),
                    (2723, <span class='pystring'>'MMDCCXXIII'</span>),
                    (2892, <span class='pystring'>'MMDCCCXCII'</span>),
                    (2975, <span class='pystring'>'MMCMLXXV'</span>),
                    (3051, <span class='pystring'>'MMMLI'</span>),
                    (3185, <span class='pystring'>'MMMCLXXXV'</span>),
                    (3250, <span class='pystring'>'MMMCCL'</span>),
                    (3313, <span class='pystring'>'MMMCCCXIII'</span>),
                    (3408, <span class='pystring'>'MMMCDVIII'</span>),
                    (3501, <span class='pystring'>'MMMDI'</span>),
                    (3610, <span class='pystring'>'MMMDCX'</span>),
                    (3743, <span class='pystring'>'MMMDCCXLIII'</span>),
                    (3844, <span class='pystring'>'MMMDCCCXLIV'</span>),
                    (3888, <span class='pystring'>'MMMDCCCLXXXVIII'</span>),
                    (3940, <span class='pystring'>'MMMCMXL'</span>),
                    (3999, <span class='pystring'>'MMMCMXCIX'</span>),
                    (4000, <span class='pystring'>'MMMM'</span>),                                       <a name="roman.change.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
                    (4500, <span class='pystring'>'MMMMD'</span>),
                    (4888, <span class='pystring'>'MMMMDCCCLXXXVIII'</span>),
                    (4999, <span class='pystring'>'MMMMCMXCIX'</span>))

    <span class='pykeyword'>def</span><span class='pyclass'> testToRomanKnownValues</span>(self):
        <span class='pystring'>"""toRoman should give known result with known input"""</span>
        <span class='pykeyword'>for</span> integer, numeral <span class='pykeyword'>in</span> self.knownValues:
            result = roman71.toRoman(integer)
            self.assertEqual(numeral, result)

    <span class='pykeyword'>def</span><span class='pyclass'> testFromRomanKnownValues</span>(self):
        <span class='pystring'>"""fromRoman should give known result with known input"""</span>
        <span class='pykeyword'>for</span> integer, numeral <span class='pykeyword'>in</span> self.knownValues:
            result = roman71.fromRoman(numeral)
            self.assertEqual(integer, result)

<span class='pykeyword'>class</span><span class='pyclass'> ToRomanBadInput</span>(unittest.TestCase):
    <span class='pykeyword'>def</span><span class='pyclass'> testTooLarge</span>(self):
        <span class='pystring'>"""toRoman should fail with large input"""</span>
        self.assertRaises(roman71.OutOfRangeError, roman71.toRoman, 5000) <a name="roman.change.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">

    <span class='pykeyword'>def</span><span class='pyclass'> testZero</span>(self):
        <span class='pystring'>"""toRoman should fail with 0 input"""</span>
        self.assertRaises(roman71.OutOfRangeError, roman71.toRoman, 0)

    <span class='pykeyword'>def</span><span class='pyclass'> testNegative</span>(self):
        <span class='pystring'>"""toRoman should fail with negative input"""</span>
        self.assertRaises(roman71.OutOfRangeError, roman71.toRoman, -1)

    <span class='pykeyword'>def</span><span class='pyclass'> testNonInteger</span>(self):
        <span class='pystring'>"""toRoman should fail with non-integer input"""</span>
        self.assertRaises(roman71.NotIntegerError, roman71.toRoman, 0.5)

<span class='pykeyword'>class</span><span class='pyclass'> FromRomanBadInput</span>(unittest.TestCase):
    <span class='pykeyword'>def</span><span class='pyclass'> testTooManyRepeatedNumerals</span>(self):
        <span class='pystring'>"""fromRoman should fail with too many repeated numerals"""</span>
        <span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> (<span class='pystring'>'MMMMM'</span>, <span class='pystring'>'DD'</span>, <span class='pystring'>'CCCC'</span>, <span class='pystring'>'LL'</span>, <span class='pystring'>'XXXX'</span>, <span class='pystring'>'VV'</span>, <span class='pystring'>'IIII'</span>):     <a name="roman.change.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
            self.assertRaises(roman71.InvalidRomanNumeralError, roman71.fromRoman, s)

    <span class='pykeyword'>def</span><span class='pyclass'> testRepeatedPairs</span>(self):
        <span class='pystring'>"""fromRoman should fail with repeated pairs of numerals"""</span>
        <span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> (<span class='pystring'>'CMCM'</span>, <span class='pystring'>'CDCD'</span>, <span class='pystring'>'XCXC'</span>, <span class='pystring'>'XLXL'</span>, <span class='pystring'>'IXIX'</span>, <span class='pystring'>'IVIV'</span>):
            self.assertRaises(roman71.InvalidRomanNumeralError, roman71.fromRoman, s)

    <span class='pykeyword'>def</span><span class='pyclass'> testMalformedAntecedent</span>(self):
        <span class='pystring'>"""fromRoman should fail with malformed antecedents"""</span>
        <span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> (<span class='pystring'>'IIMXCC'</span>, <span class='pystring'>'VX'</span>, <span class='pystring'>'DCM'</span>, <span class='pystring'>'CMM'</span>, <span class='pystring'>'IXIV'</span>,
                  <span class='pystring'>'MCMC'</span>, <span class='pystring'>'XCX'</span>, <span class='pystring'>'IVI'</span>, <span class='pystring'>'LM'</span>, <span class='pystring'>'LD'</span>, <span class='pystring'>'LC'</span>):
            self.assertRaises(roman71.InvalidRomanNumeralError, roman71.fromRoman, s)

    <span class='pykeyword'>def</span><span class='pyclass'> testBlank</span>(self):
        <span class='pystring'>"""fromRoman should fail with blank string"""</span>
        self.assertRaises(roman71.InvalidRomanNumeralError, roman71.fromRoman, <span class='pystring'>""</span>)

<span class='pykeyword'>class</span><span class='pyclass'> SanityCheck</span>(unittest.TestCase):
    <span class='pykeyword'>def</span><span class='pyclass'> testSanity</span>(self):
        <span class='pystring'>"""fromRoman(toRoman(n))==n for all n"""</span>
        <span class='pykeyword'>for</span> integer <span class='pykeyword'>in</span> range(1, 5000):                                    <a name="roman.change.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
            numeral = roman71.toRoman(integer)
            result = roman71.fromRoman(numeral)
            self.assertEqual(integer, result)

<span class='pykeyword'>class</span><span class='pyclass'> CaseCheck</span>(unittest.TestCase):
    <span class='pykeyword'>def</span><span class='pyclass'> testToRomanCase</span>(self):
        <span class='pystring'>"""toRoman should always return uppercase"""</span>
        <span class='pykeyword'>for</span> integer <span class='pykeyword'>in</span> range(1, 5000):
            numeral = roman71.toRoman(integer)
            self.assertEqual(numeral, numeral.upper())

    <span class='pykeyword'>def</span><span class='pyclass'> testFromRomanCase</span>(self):
        <span class='pystring'>"""fromRoman should only accept uppercase input"""</span>
        <span class='pykeyword'>for</span> integer <span class='pykeyword'>in</span> range(1, 5000):
            numeral = roman71.toRoman(integer)
            roman71.fromRoman(numeral.upper())
            self.assertRaises(roman71.InvalidRomanNumeralError,
                              roman71.fromRoman, numeral.lower())

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>"__main__"</span>:
    unittest.main()
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.refactoring"></a><a name="refactoring.html">15.3.&nbsp;重构
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>全面的单元测试带来的最大好处不是你的全部测试用例最终通过时的成就感；也不是被责怪破坏了别人的代码时能够<span class="emphasis"><em>证明</em></span> 自己的自信。最大的好处是单元测试给了你自由去无情地重构。
            </p>
         </div>
         <p>重构是在可运行代码的基础上使之工作得更好的过程。通常，“<span class="quote">更好</span>”意味着“<span class="quote">更快</span>”，也可能意味着 “<span class="quote">使用更少的内存</span>”，或者 “<span class="quote">使用更少的磁盘空间</span>”，或者仅仅是“<span class="quote">更优雅的代码</span>”。不管对你，对你的项目意味什么，在你的环境中，重构对任何程序的长期良性运转都是重要的。
         </p>
         <p>这里，“<span class="quote">更好</span>” 意味着 “<span class="quote">更快</span>”。更具体地说，<tt class="function">fromRoman</tt> 函数可以更快，关键在于那个丑陋的、用于验证罗马数字有效性的正则表达式。尝试不用正则表达式去解决是不值得的 (这样做很难，而且可能也快不了多少)，但可以通过预编译正则表达式使函数提速。
         </p>
         <div class="example"><a name="d0e34816"></a><h3 class="title">例&nbsp;15.10.&nbsp;编译正则表达式</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> re</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">pattern = <span class='pystring'>'^M?M?M?$'</span></span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">re.search(pattern, <span class='pystring'>'M'</span>)</span>               <a name="roman.refactoring.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">&lt;SRE_Match object at 01090490&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">compiledPattern = re.compile(pattern)</span> <a name="roman.refactoring.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">compiledPattern</span>
<span class="computeroutput">&lt;SRE_Pattern object at 00F06E28&gt;</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">dir(compiledPattern)</span>                  <a name="roman.refactoring.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">['findall', 'match', 'scanner', 'search', 'split', 'sub', 'subn']</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">compiledPattern.search(<span class='pystring'>'M'</span>)</span>           <a name="roman.refactoring.1.4"></a><img src="../images/callouts/4.png" alt="4" border="0" width="12" height="12">
<span class="computeroutput">&lt;SRE_Match object at 01104928&gt;</span></pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.postscript"></a><a name="postscript.html">15.4.&nbsp;后记
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>聪明的读者在学习<a href="refactoring.html" title="15.3.&nbsp;重构">前一节</a>时想得会更深入一层。现在写的这个程序中最令人头痛的性能负担是正则表达式，但它是必需的，因为没有其它方法来识别罗马数字。但是，它们只有 5000 个，为什么不一次性地构建一个查询表来读取？不必用正则表达式凸现了这个主意的好处。你建立了整数到罗马数字查询表的时候，罗马数字到整数的逆向查询表也构建了。
            </p>
         </div>
         <p>更大的好处在于，你已经拥有一整套完全的单元测试。你修改了多半的代码，但单元测试还是一样的，因此你可以确定你的新代码与来的代码一样可以正常工作。</p>
         <div class="example"><a name="d0e35256"></a><h3 class="title">例&nbsp;15.17.&nbsp;<tt class="filename">roman9.py</tt></h3>
            <p>这个文件可以在例子目录下的 <tt class="filename">py/roman/stage9/</tt> 目录中找到。
            </p>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="programlisting">
<span class='pycomment'>#Define exceptions</span>
<span class='pykeyword'>class</span><span class='pyclass'> RomanError</span>(Exception): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> OutOfRangeError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> NotIntegerError</span>(RomanError): <span class='pykeyword'>pass</span>
<span class='pykeyword'>class</span><span class='pyclass'> InvalidRomanNumeralError</span>(RomanError): <span class='pykeyword'>pass</span>

<span class='pycomment'>#Roman numerals must be less than 5000</span>
MAX_ROMAN_NUMERAL = 4999

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

<span class='pycomment'>#Create tables for fast conversion of roman numerals.</span>
<span class='pycomment'>#See fillLookupTables() below.</span>
toRomanTable = [ None ]  <span class='pycomment'># Skip an index since Roman numerals have no zero</span>
fromRomanTable = {}

<span class='pykeyword'>def</span><span class='pyclass'> toRoman</span>(n):
    <span class='pystring'>"""convert integer to Roman numeral"""</span>
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> (0 &lt; n &lt;= MAX_ROMAN_NUMERAL):
        <span class='pykeyword'>raise</span> OutOfRangeError, <span class='pystring'>"number out of range (must be 1..%s)"</span> % MAX_ROMAN_NUMERAL
    <span class='pykeyword'>if</span> int(n) &lt;&gt; n:
        <span class='pykeyword'>raise</span> NotIntegerError, <span class='pystring'>"non-integers can not be converted"</span>
    <span class='pykeyword'>return</span> toRomanTable[n]

<span class='pykeyword'>def</span><span class='pyclass'> fromRoman</span>(s):
    <span class='pystring'>"""convert Roman numeral to integer"""</span>
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> s:
        <span class='pykeyword'>raise</span> InvalidRomanNumeralError, <span class='pystring'>"Input can not be blank"</span>
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> fromRomanTable.has_key(s):
        <span class='pykeyword'>raise</span> InvalidRomanNumeralError, <span class='pystring'>"Invalid Roman numeral: %s"</span> % s
    <span class='pykeyword'>return</span> fromRomanTable[s]

<span class='pykeyword'>def</span><span class='pyclass'> toRomanDynamic</span>(n):
    <span class='pystring'>"""convert integer to Roman numeral using dynamic programming"""</span>
    result = <span class='pystring'>""</span>
    <span class='pykeyword'>for</span> numeral, integer <span class='pykeyword'>in</span> romanNumeralMap:
        <span class='pykeyword'>if</span> n &gt;= integer:
            result = numeral
            n -= integer
            <span class='pykeyword'>break</span>
    <span class='pykeyword'>if</span> n &gt; 0:
        result += toRomanTable[n]
    <span class='pykeyword'>return</span> result

<span class='pykeyword'>def</span><span class='pyclass'> fillLookupTables</span>():
    <span class='pystring'>"""compute all the possible roman numerals"""</span>
    <span class='pycomment'>#Save the values in two global tables to convert to and from integers.</span>
    <span class='pykeyword'>for</span> integer <span class='pykeyword'>in</span> range(1, MAX_ROMAN_NUMERAL + 1):
        romanNumber = toRomanDynamic(integer)
        toRomanTable.append(romanNumber)
        fromRomanTable[romanNumber] = integer

fillLookupTables()
</pre></div>
         <p>这样有多快呢？</p>
         <div class="example"><a name="d0e35274"></a><h3 class="title">例&nbsp;15.18.&nbsp;用 <tt class="filename">romantest9.py</tt> 测试 <tt class="filename">roman9.py</tt> 的结果
            </h3><pre class="screen">
<span class="computeroutput">
.............
----------------------------------------------------------------------
Ran 13 tests in 0.791s

OK
</span>
</pre></div>
         <p>还记得吗？你原有版本的最快速度是 13 个测试耗时 3.315 秒。当然，这样的比较不完全公平，因为这个新版本需要更长的时间来导入 (当它填充查询表时)。但是导入只需一次，在运行过程中可以忽略。</p>
         <p>这个重构的故事的寓意是什么？</p>
         <div class="itemizedlist">
            <ul>
               <li>简洁是美德。</li>
               <li>特别是使用正则表达式时。</li>
               <li>并且单元测试给了你大规模重构的信心……即使原有的代码不是你写的。</li>
            </ul>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="roman.summary"></a><a name="summary.html">15.5.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>单元测试是一个强大的概念，使用得当的话既可以减少维护成本又可以增加长期项目的灵活性。同样重要的是要意识到单元测试并不是“灵丹妙药”，也不是“银弹”。编写好的测试用例很困难，保持其更新更需要磨练 (特别是当顾客对修复严重的 Bug 大呼小叫之时)。单元测试不是其它形式测试的替代品，比如说功能性测试、集成测试以及可用性测试。但它切实可行且功效明显，一旦相识，你会反问为什么以往没有应用它。</p>
         </div>
         <p>这一章涵盖了很多内容，有很多都不是 <span class="application">Python</span> 所特有的。很多语言都有单元测试框架，都要求你理解相同的基本概念：
         </p>
         <div class="highlights">
            <div class="itemizedlist">
               <ul>
                  <li>测试用例的设计方针是目的单一、可以自动运行、互不干扰。</li>
                  <li>在被测试代码编写<span class="emphasis"><em>之前</em></span> 编写测试用例。
                  </li>
                  <li>编写测试<a href="../unit_testing/testing_for_success.html" title="13.4.&nbsp;正面测试 (Testing for success)">有效输入的测试用例</a>并检查正确的结果。
                  </li>
                  <li>编写测试<a href="../unit_testing/testing_for_failure.html" title="13.5.&nbsp;负面测试 (Testing for failure)">无效输入的测试用例</a>并检查正确的失败。
                  </li>
                  <li>为<a href="index.html#roman.bugs" title="15.1.&nbsp;处理 bugs">描述 Bug</a> 或<a href="handling_changing_requirements.html" title="15.2.&nbsp;应对需求变化">反映新需求</a>而编写和升级测试用例。
                  </li>
                  <li>为改进性能、可伸缩性、可读性、可维护性和任何缺少的特性而无情地<a href="refactoring.html" title="15.3.&nbsp;重构">重构</a>。
                  </li>
               </ul>
            </div>
         </div>
         <p>另外，你应该能够自如地做到如下 <span class="application">Python</span> 的特有工作：
         </p>
         <div class="highlights">
            <div class="itemizedlist">
               <ul>
                  <li>继承 <a href="../unit_testing/testing_for_success.html#roman.testtoromanknownvalues.example" title="例&nbsp;13.2.&nbsp;testToRomanKnownValues"> <tt class="literal">unittest.TestCase</tt></a> 生成子类并为每个单独的测试用例编写方法。
                  </li>
                  <li>使用 <a href="../unit_testing/testing_for_success.html#roman.testtoromanknownvalues.example" title="例&nbsp;13.2.&nbsp;testToRomanKnownValues"><tt class="function">assertEqual</tt></a> 检查已知结果的返回。
                  </li>
                  <li>使用 <a href="../unit_testing/testing_for_failure.html#roman.tobadinput.example" title="例&nbsp;13.3.&nbsp;测试 toRoman 的无效输入"><tt class="function">assertRaises</tt></a> 检查函数是否引发已知异常。
                  </li>
                  <li>在 <tt class="literal">if __name__</tt> 子句中调用 <a href="../unit_testing/stage_1.html#roman.stage1.output" title="例&nbsp;14.2.&nbsp;以 romantest1.py 测试 roman1.py 的输出"><tt class="literal">unittest.main()</tt></a> 来一次性运行所有测试用例。
                  </li>
                  <li>以<a href="../unit_testing/stage_1.html#roman.stage1.output" title="例&nbsp;14.2.&nbsp;以 romantest1.py 测试 roman1.py 的输出">详细 (verbose) </a>或者<a href="refactoring.html#roman.stage8.1.output" title="例&nbsp;15.12.&nbsp;用 romantest81.py 测试 roman81.py 的结果">普通 (regular) </a>模式运行单元测试
                  </li>
               </ul>
            </div>
         </div>
         <div class="furtherreading">
            <h3>进一步阅读</h3>
            <ul>
               <li><a href="http://www.xprogramming.com/">XProgramming.com</a> 有多种语言的 <a href="http://www.xprogramming.com/software.htm">单元测试框架</a> 的下载链接。
               </li>
            </ul>
         </div>
      </div>
      
