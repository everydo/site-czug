<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/performance_tuning/index.html">http://www.woodpecker.org.cn/diveintopython/performance_tuning/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex"></a>第&nbsp;18&nbsp;章&nbsp;性能优化
                  </h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#soundex.divein">18.1. 概览</a></span></li>
               <li><span class="section"><a href="#timeit.html">18.2. 使用 timeit 模块</a></span></li>
               <li><span class="section"><a href="#regular_expressions.html">18.3. 优化正则表达式</a></span></li>
               <li><span class="section"><a href="#dictionary_lookups.html">18.4. 优化字典查找</a></span></li>
               <li><span class="section"><a href="#list_operations.html">18.5. 优化列表操作</a></span></li>
               <li><span class="section"><a href="#string_manipulation.html">18.6. 优化字符串操作</a></span></li>
               <li><span class="section"><a href="#summary.html">18.7. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>性能优化 (Performance tuning) 是一件多姿多彩的事情。<span class="application">Python</span> 是一种解释性语言并不表示你不应该担心代码优化。但也不必<span class="emphasis"><em>太</em></span> 担心。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="soundex.divein"></a>18.1.&nbsp;概览
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>由于代码优化过程中存在太多的不明确因素，以至于你很难清楚该从何入手。</p>
            </div>
            <p>让我们从这里开始：<span class="emphasis"><em>你真的确信你要这样做吗？</em></span>  你的代码真的那么差吗？值得花时间去优化它吗？在你的应用程序的生命周期中，与花费在等待一个远程数据库服务器，或是等待用户输入相比，运行这段代码将花费多少时间？
            </p>
            <p>第二，<span class="emphasis"><em>你确信已经完成代码编写了吗？</em></span> 过早的优化就像是在一块半生不熟的蛋糕上撒糖霜。你花费了几小时、几天 (或更长) 时间来优化你的代码以提高性能，却发现它不能完成你希望它做的工作。那是浪费时间。
            </p>
            <p>这并不是说代码优化毫无用处，但是你需要检查一下整个系统，并且确定把时间花在这上面是值得的。在优化代码上每花费一分钟，就意味着你少了增加新功能、编写文档或者陪你的孩子玩或者编写单元测试的一分钟。</p>
            <p>哦，是的，单元测试。不必我说，在开始性能优化之前你需要一个完全的单元测试集。你最不需要的就是在乱动你的算法时引入新的问题。</p>
            <p>谨记着这些忠告，让我们来看一些优化 <span class="application">Python</span> 代码的技术。我们要研究的代码是 Soundex 算法的实现。Soundex 是一种 20 世纪在美国人口普查中归档姓氏的方法。它把听起来相似的姓氏归在一起，使得在即便错误拼写的情况下调查者仍能查找到。Soundex 今天仍然因差不多的原因被应用着，当然现在用计算机数据库服务器了。大部分的数据库服务器都有
               Soundex 函数。
            </p>
            <p>Soundex 算法有几个差别不大的变化版本。这是本章使用的：</p>
            <div class="orderedlist">
               <ol type="1">
                  <li>名字的第一个字母不变。</li>
                  <li>根据特定的对照表，将剩下的字母转换为数字：
                     <div class="itemizedlist">
                        <ul>
                           <li>B、 F、 P 和 V 转换为 1。</li>
                           <li>C、 G、 J、 K、 Q、 S、 X 和 Z 转换为 2。</li>
                           <li>D 和 T 转换为 3。</li>
                           <li>L 转换为 4。</li>
                           <li>M 和 N 转换为 5。</li>
                           <li>R 转换为 6。</li>
                           <li>所有其他字母转换为 9。</li>
                        </ul>
                     </div>
                  </li>
                  <li>去除连续重复。</li>
                  <li>去除所有 9。</li>
                  <li>如果结果都少于四个字符 (第一个字母加上后面的三位字符)，就以零补齐。</li>
                  <li>如果结果超过四个字符，丢弃掉四位之后的字符。</li>
               </ol>
            </div>
            <p>比如，我的名字 <tt class="literal">Pilgrim</tt> 被转换为 P942695。没有连续重复，所以这一步不需要做。然后是去除 9，剩下 P4265。太长了，所以你把超出的字符丢弃，剩下 P426。
            </p>
            <p>另一个例子：<tt class="literal">Woo</tt> 被转换为 W99，变成 W9，变成 W，然后以补零成为 W000。
            </p>
            <p>这是 Soundex 函数的第一次尝试：</p>
            <div class="example"><a name="d0e39037"></a><h3 class="title">例&nbsp;18.1.&nbsp;<tt class="filename">soundex/stage1/soundex1a.py</tt></h3>
               <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
               </p><pre class="programlisting"><span class='pykeyword'>
import</span> string, re

charToSoundex = {<span class='pystring'>"A"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"B"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"C"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"D"</span>: <span class='pystring'>"3"</span>,
                 <span class='pystring'>"E"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"F"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"G"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"H"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"I"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"J"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"K"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"L"</span>: <span class='pystring'>"4"</span>,
                 <span class='pystring'>"M"</span>: <span class='pystring'>"5"</span>,
                 <span class='pystring'>"N"</span>: <span class='pystring'>"5"</span>,
                 <span class='pystring'>"O"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"P"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"Q"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"R"</span>: <span class='pystring'>"6"</span>,
                 <span class='pystring'>"S"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"T"</span>: <span class='pystring'>"3"</span>,
                 <span class='pystring'>"U"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"V"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"W"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"X"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"Y"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"Z"</span>: <span class='pystring'>"2"</span>}

<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pystring'>"convert string to Soundex equivalent"</span>

    <span class='pycomment'># Soundex requirements:</span>
    <span class='pycomment'># source string must be at least 1 character</span>
    <span class='pycomment'># and must consist entirely of letters</span>
    allChars = string.uppercase + string.lowercase
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> re.search(<span class='pystring'>'^[%s]+$'</span> % allChars, source):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>

    <span class='pycomment'># Soundex algorithm:</span>
    <span class='pycomment'># 1. make first character uppercase</span>
    source = source[0].upper() + source[1:]
    
    <span class='pycomment'># 2. translate all other characters to Soundex digits</span>
    digits = source[0]
    <span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> source[1:]:
        s = s.upper()
        digits += charToSoundex[s]

    <span class='pycomment'># 3. remove consecutive duplicates</span>
    digits2 = digits[0]
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits[1:]:
        <span class='pykeyword'>if</span> digits2[-1] != d:
            digits2 += d
        
    <span class='pycomment'># 4. remove all "9"s</span>
    digits3 = re.sub(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>, digits2)
    
    <span class='pycomment'># 5. pad end with "0"s to 4 characters</span>
    <span class='pykeyword'>while</span> len(digits3) &lt; 4:
        digits3 += <span class='pystring'>"0"</span>
        
    <span class='pycomment'># 6. return first 4 characters</span>
    <span class='pykeyword'>return</span> digits3[:4]

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>'__main__'</span>:
    <span class='pykeyword'>from</span> timeit <span class='pykeyword'>import</span> Timer
    names = (<span class='pystring'>'Woo'</span>, <span class='pystring'>'Pilgrim'</span>, <span class='pystring'>'Flingjingwaller'</span>)
    <span class='pykeyword'>for</span> name <span class='pykeyword'>in</span> names:
        statement = <span class='pystring'>"soundex('%s')"</span> % name
        t = Timer(statement, <span class='pystring'>"from __main__ import soundex"</span>)
        <span class='pykeyword'>print</span> name.ljust(15), soundex(name), min(t.repeat())
</pre></div>
            <div class="furtherreading">
               <h3>进一步阅读</h3>
               <ul>
                  <li><a href="http://www.avotaynu.com/soundex.html">Soundexing and Genealogy</a> 给出了 Soundex 发展的年代表以及地域变化。
                  </li>
               </ul>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex.timeit"></a><a name="timeit.html">18.2.&nbsp;使用 <tt class="filename">timeit</tt> 模块
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>关于 <span class="application">Python</span> 代码优化你需要知道的最重要问题是，决不要自己编写计时函数。
            </p>
         </div>
         <p>为一个很短的代码计时都很复杂。处理器有多少时间用于运行这个代码？有什么在后台运行吗？每个现代计算机都在后台运行持续或者间歇的程序。小小的疏忽可能破坏你的百年大计，后台服务偶尔被 “<span class="quote">唤醒</span>” 在最后千分之一秒做一些像查收信件，连接计时通信服务器，检查应用程序更新，扫描病毒，查看是否有磁盘被插入光驱之类很有意义的事。在开始计时测试之前，把一切都关掉，断开网络的连接。再次确定一切都关上后关掉那些不断查看网络是否恢复的服务等等。
         </p>
         <p>接下来是计时框架本身引入的变化因素。<span class="application">Python</span> 解释器是否缓存了方法名的查找？是否缓存代码块的编译结果？正则表达式呢? 你的代码重复运行时有副作用吗？不要忘记，你的工作结果将以比秒更小的单位呈现，你的计时框架中的小错误将会带来不可挽回的结果扭曲。
         </p>
         <p><span class="application">Python</span> 社区有句俗语：“<span class="quote"><span class="application">Python</span> 自己带着电池。</span>” 别自己写计时框架。<span class="application">Python</span> 2.3 具备一个叫做 <tt class="filename">timeit</tt> 的完美计时工具。
         </p>
         <div class="example"><a name="d0e39095"></a><h3 class="title">例&nbsp;18.2.&nbsp;<tt class="filename">timeit</tt> 介绍
            </h3>
            <p>如果您还没有下载本书附带的样例程序, 可以 <a href="http://www.woodpecker.org.cn/diveintopython/download/diveintopython-exampleszh-cn-5.4b.zip" title="Download example scripts">下载本程序和其他样例程序</a>。
            </p><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>import</span> timeit</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t = timeit.Timer(<span class='pystring'>"soundex.soundex('Pilgrim')"</span>,</span>
<tt class="prompt">...     </tt><span class="userinput"><span class='pystring'>"import soundex"</span>)</span>   <a name="soundex.timeit.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t.timeit()</span>              <a name="soundex.timeit.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">8.21683733547</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">t.repeat(3, 2000000)</span>    <a name="soundex.timeit.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">[16.48319309109, 16.46128984923, 16.44203948912]</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex.stage1"></a><a name="regular_expressions.html">18.3.&nbsp;优化正则表达式
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p> Soundex 函数的第一件事是检查输入是否是一个空字符串。怎样做是最好的方法？</p>
         </div>
         <p>如果你回答 “<span class="quote">正则表达式</span>”，坐在角落里反省你糟糕的直觉。正则表达式几乎永远不是最好的答案，而且应该被尽可能避开。这不仅仅是基于性能考虑，而是因为调试和维护都很困难，当然性能也是个原因。
         </p>
         <p>这是 <tt class="filename">soundex/stage1/soundex1a.py</tt> 检查 <tt class="varname">source</tt> 是否全部由字母构成的一段代码，至少是一个字母 (而不是空字符串)：
         </p>
         <div class="informalexample"><pre class="programlisting">
    allChars = string.uppercase + string.lowercase
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> re.search(<span class='pystring'>'^[%s]+$'</span> % allChars, source):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
</pre></div>
         <p><tt class="filename">soundex1a.py</tt> 表现如何？为了方便，<tt class="literal">__main__</tt> 部分包含了一段代码：调用 <tt class="filename">timeit</tt> 模块，为三个不同名字分别建立测试，依次测试，并显示每个测试的最短耗时：
         </p>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
if</span> __name__ == <span class='pystring'>'__main__'</span>:
    <span class='pykeyword'>from</span> timeit <span class='pykeyword'>import</span> Timer
    names = (<span class='pystring'>'Woo'</span>, <span class='pystring'>'Pilgrim'</span>, <span class='pystring'>'Flingjingwaller'</span>)
    <span class='pykeyword'>for</span> name <span class='pykeyword'>in</span> names:
        statement = <span class='pystring'>"soundex('%s')"</span> % name
        t = Timer(statement, <span class='pystring'>"from __main__ import soundex"</span>)
        <span class='pykeyword'>print</span> name.ljust(15), soundex(name), min(t.repeat())
</pre></div>
         <p>那么，应用正则表达式的 <tt class="filename">soundex1a.py</tt> 表现如何呢？
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage1&gt;</tt><span class="userinput">python soundex1a.py</span>
<span class="computeroutput">Woo             W000 19.3356647283
Pilgrim         P426 24.0772053431
Flingjingwaller F452 35.0463220884</span>
</pre></div>
         <p>正如你预料，名字越长，算法耗时就越长。有几个工作可以令我们减小这个差距 (使函数对于长输入花费较短的相对时间) 但是算法的本质决定它不可能每次运行时间都相同。</p>
         <p>另一点应铭记于心的是，我们测试的是有代表性的名字样本。<tt class="literal">Woo</tt> 是个被缩短到单字符并补零的小样本；<tt class="literal">Pilgrim</tt> 是个夹带着特别字符和忽略字符的平均长度的正常样本；<tt class="literal">Flingjingwaller</tt> 是一个包含连续重复字符并且特别长的样本。其它的测试可能同样有帮助，但它们已经很好地代表了不同的样本范围。
         </p>
         <p>那么那个正则表达式如何呢？嗯，缺乏效率。因为这个表达式测试不止一个范围的字符 (<tt class="literal">A-Z</tt> 的大写范围和 <tt class="literal">a-z</tt> 的小写字母范围)，我们可以使用一个正则表达式的缩写语法。这便是 <tt class="filename">soundex/stage1/soundex1b.py</tt>:
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> re.search(<span class='pystring'>'^[A-Za-z]+$'</span>, source):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
</pre></div>
         <p><tt class="filename">timeit</tt> 显示 <tt class="filename">soundex1b.py</tt> 比 <tt class="filename">soundex1a.py</tt> 稍微快一些，但是没什么令人激动的变化：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage1&gt;</tt><span class="userinput">python soundex1b.py</span>
<span class="computeroutput">Woo             W000 17.1361133887
Pilgrim         P426 21.8201693232
Flingjingwaller F452 32.7262294509</span>
</pre></div>
         <p>在 <a href="../refactoring/refactoring.html" title="15.3.&nbsp;重构">第&nbsp;15.3&nbsp;节 “重构”</a> 中我们看到正则表达式可以被编译并在重用时以更快速度获得结果。因为这个正则表达式在函数中每次被调用时都不变化，我们可以编译它一次并使用被编译的版本。这便是 <tt class="filename">soundex/stage1/soundex1c.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
isOnlyChars = re.compile(<span class='pystring'>'^[A-Za-z]+$'</span>).search
<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> isOnlyChars(source):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
</pre></div>
         <p><tt class="filename">soundex1c.py</tt> 中使用被编译的正则表达式产生了显著的提速：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage1&gt;</tt><span class="userinput">python soundex1c.py</span>
<span class="computeroutput">Woo             W000 14.5348347346
Pilgrim         P426 19.2784703084
Flingjingwaller F452 30.0893873383</span>
</pre></div>
         <p>但是这样的优化是正路吗？这里的逻辑很简单：输入 <tt class="varname">source</tt> 应该是非空，并且需要完全由字母构成。如果编写一个循环查看每个字符并且抛弃正则表达式，是否会更快些？
         </p>
         <p>这便是 <tt class="filename">soundex/stage1/soundex1d.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> source:
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
    <span class='pykeyword'>for</span> c <span class='pykeyword'>in</span> source:
        <span class='pykeyword'>if</span> <span class='pykeyword'>not</span> (<span class='pystring'>'A'</span> &lt;= c &lt;= <span class='pystring'>'Z'</span>) <span class='pykeyword'>and</span> <span class='pykeyword'>not</span> (<span class='pystring'>'a'</span> &lt;= c &lt;= <span class='pystring'>'z'</span>):
            <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
</pre></div>
         <p>这个技术在 <tt class="filename">soundex1d.py</tt> 中恰好<span class="emphasis"><em>不及</em></span> 编译后的正则表达式快 (尽管比使用未编译的正则表达式快<sup>[<a name="d0e39400" href="#ftn.d0e39400">14</a>]</sup>)：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage1&gt;</tt><span class="userinput">python soundex1d.py</span>
<span class="computeroutput">Woo             W000 15.4065058548
Pilgrim         P426 22.2753567842
Flingjingwaller F452 37.5845122774</span>
</pre></div>
         <p>为什么 <tt class="filename">soundex1d.py</tt> 没能更快？答案来自 <span class="application">Python</span> 的编译本质。正则表达式引擎以 C 语言编写，被编译后则能本能地在你的计算机上运行。另一方面，循环是以 <span class="application">Python</span> 编写，要通过 <span class="application">Python</span> 解释器。尽管循环相对简单，但没能简单到补偿花在代码解释上的时间。正则表达式永远不是正确答案……但例外还是存在的。
         </p>
         <p>恰巧 <span class="application">Python</span> 提供了一个晦涩的字符串方法。你有理由不了解它，因为本书未曾提到它。这个方法便是 <tt class="methodname">isalpha()</tt>，它检查一个字符串是否只包含字母。
         </p>
         <p>这便是 <tt class="filename">soundex/stage1/soundex1e.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>if</span> (<span class='pykeyword'>not</span> source) <span class='pykeyword'>and</span> (<span class='pykeyword'>not</span> source.isalpha()):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
</pre></div>
         <p>在 <tt class="filename">soundex1e.py</tt> 中应用这个特殊方法我们能得到多少好处?  很多。
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage1&gt;</tt><span class="userinput">python soundex1e.py</span>
<span class="computeroutput">Woo             W000 13.5069504644
Pilgrim         P426 18.2199394057
Flingjingwaller F452 28.9975225902</span>
</pre></div>
         <div class="example"><a name="d0e39467"></a><h3 class="title">例&nbsp;18.3.&nbsp;目前为止最好的结果：<tt class="filename">soundex/stage1/soundex1e.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> string, re

charToSoundex = {<span class='pystring'>"A"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"B"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"C"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"D"</span>: <span class='pystring'>"3"</span>,
                 <span class='pystring'>"E"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"F"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"G"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"H"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"I"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"J"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"K"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"L"</span>: <span class='pystring'>"4"</span>,
                 <span class='pystring'>"M"</span>: <span class='pystring'>"5"</span>,
                 <span class='pystring'>"N"</span>: <span class='pystring'>"5"</span>,
                 <span class='pystring'>"O"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"P"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"Q"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"R"</span>: <span class='pystring'>"6"</span>,
                 <span class='pystring'>"S"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"T"</span>: <span class='pystring'>"3"</span>,
                 <span class='pystring'>"U"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"V"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"W"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"X"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"Y"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"Z"</span>: <span class='pystring'>"2"</span>}

<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pykeyword'>if</span> (<span class='pykeyword'>not</span> source) <span class='pykeyword'>and</span> (<span class='pykeyword'>not</span> source.isalpha()):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
    source = source[0].upper() + source[1:]
    digits = source[0]
    <span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> source[1:]:
        s = s.upper()
        digits += charToSoundex[s]
    digits2 = digits[0]
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits[1:]:
        <span class='pykeyword'>if</span> digits2[-1] != d:
            digits2 += d
    digits3 = re.sub(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>, digits2)
    <span class='pykeyword'>while</span> len(digits3) &lt; 4:
        digits3 += <span class='pystring'>"0"</span>
    <span class='pykeyword'>return</span> digits3[:4]

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>'__main__'</span>:
    <span class='pykeyword'>from</span> timeit <span class='pykeyword'>import</span> Timer
    names = (<span class='pystring'>'Woo'</span>, <span class='pystring'>'Pilgrim'</span>, <span class='pystring'>'Flingjingwaller'</span>)
    <span class='pykeyword'>for</span> name <span class='pykeyword'>in</span> names:
        statement = <span class='pystring'>"soundex('%s')"</span> % name
        t = Timer(statement, <span class='pystring'>"from __main__ import soundex"</span>)
        <span class='pykeyword'>print</span> name.ljust(15), soundex(name), min(t.repeat())
</pre></div>
         <div class="footnotes">
            <h3 class="footnotetitle">Footnotes</h3>
            <div class="footnote">
               <p><sup>[<a name="ftn.d0e39400" href="#d0e39400">14</a>] </sup>注意 <tt class="filename">soundex1d.py</tt> 在后两个测试点上都比 <tt class="filename">soundex1b.py</tt> 慢，这点与作者所说的矛盾。本章另还有多处出现了正文与测试结果矛盾的地方，每个地方都会用译注加以说明。这个 bug 将在下个版本中得到修正。――译注
               </p>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex.stage2"></a><a name="dictionary_lookups.html">18.4.&nbsp;优化字典查找
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p> Soundex 算法的第二步是依照特定规则将字符转换为数字。做到这点最好的方法是什么？</p>
         </div>
         <p>最明显的解决方案是定义一个以单字符为键并以所对应数字为值的字典，以字典查找每个字符。这便是 <tt class="filename">soundex/stage1/soundex1e.py</tt> 中使用的方法 (目前最好的结果)：
         </p>
         <div class="informalexample"><pre class="programlisting">
charToSoundex = {<span class='pystring'>"A"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"B"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"C"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"D"</span>: <span class='pystring'>"3"</span>,
                 <span class='pystring'>"E"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"F"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"G"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"H"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"I"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"J"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"K"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"L"</span>: <span class='pystring'>"4"</span>,
                 <span class='pystring'>"M"</span>: <span class='pystring'>"5"</span>,
                 <span class='pystring'>"N"</span>: <span class='pystring'>"5"</span>,
                 <span class='pystring'>"O"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"P"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"Q"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"R"</span>: <span class='pystring'>"6"</span>,
                 <span class='pystring'>"S"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"T"</span>: <span class='pystring'>"3"</span>,
                 <span class='pystring'>"U"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"V"</span>: <span class='pystring'>"1"</span>,
                 <span class='pystring'>"W"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"X"</span>: <span class='pystring'>"2"</span>,
                 <span class='pystring'>"Y"</span>: <span class='pystring'>"9"</span>,
                 <span class='pystring'>"Z"</span>: <span class='pystring'>"2"</span>}

<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pycomment'># ... input check omitted for brevity ...</span>
    source = source[0].upper() + source[1:]
    digits = source[0]
    <span class='pykeyword'>for</span> s <span class='pykeyword'>in</span> source[1:]:
        s = s.upper()
        digits += charToSoundex[s]
</pre></div>
         <p>你已经为 <tt class="filename">soundex1e.py</tt> 计时，这便是其表现：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage1&gt;</tt><span class="userinput">python soundex1c.py</span>
<span class="computeroutput">Woo             W000 13.5069504644
Pilgrim         P426 18.2199394057
Flingjingwaller F452 28.9975225902</span>
</pre></div>
         <p>这段代码很直接，但它是最佳解决方案吗？为每个字符分别调用 <tt class="methodname">upper()</tt> 看起来不是很有效率，为整个字符串调用 <tt class="methodname">upper()</tt> 一次可能会好些。
         </p>
         <p>然后是一砖一瓦地建立 <tt class="varname">digits</tt> 字符串。一砖一瓦的建造好像非常欠缺效率。在 <span class="application">Python</span> 内部，解释器需要在循环的每一轮创建一个新的字符串，然后丢弃旧的。
         </p>
         <p>但是，<span class="application">Python</span> 擅长于列表。可以自动地将字符串作为列表来对待。而且使用 <tt class="methodname">join()</tt> 方法可以很容易地将列表合并成字符串。
         </p>
         <p>这便是 <tt class="filename">soundex/stage2/soundex2a.py</tt>，通过 <tt class="literal">map</tt> 和 <tt class="literal">lambda</tt> 把所有字母转换为数字：
         </p>
         <div class="informalexample"><pre class="programlisting"><span class='pykeyword'>
def</span> soundex(source):
    <span class='pycomment'># ...</span>
    source = source.upper()
    digits = source[0] + <span class='pystring'>""</span>.join(map(<span class='pykeyword'>lambda</span> c: charToSoundex[c], source[1:]))
</pre></div>
         <p>太震惊了，<tt class="filename">soundex2a.py</tt> 并不快：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage2&gt;</tt><span class="userinput">python soundex2a.py</span>
<span class="computeroutput">Woo             W000 15.0097526362
Pilgrim         P426 19.254806407
Flingjingwaller F452 29.3790847719</span>
</pre></div>
         <p>匿名 <tt class="literal">lambda</tt> 函数的使用耗费掉了从以字符列表替代字符串争取来的时间。
         </p>
         <p><tt class="filename">soundex/stage2/soundex2b.py</tt> 使用了一个列表遍历来替代 <tt class="literal">map</tt> 和 <tt class="literal">lambda</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    source = source.upper()
    digits = source[0] + <span class='pystring'>""</span>.join([charToSoundex[c] <span class='pykeyword'>for</span> c <span class='pykeyword'>in</span> source[1:]])
</pre></div>
         <p>在 <tt class="filename">soundex2b.py</tt> 中使用列表遍历比 <tt class="filename">soundex2a.py</tt> 中使用 <tt class="literal">map</tt> 和 <tt class="literal">lambda</tt> 快，但还没有最初的代码快 (<tt class="filename">soundex1e.py</tt> 中一砖一瓦的构建字符串<sup>[<a name="d0e39596" href="#ftn.d0e39596">15</a>]</sup>)：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage2&gt;</tt><span class="userinput">python soundex2b.py</span>
<span class="computeroutput">Woo             W000 13.4221324219
Pilgrim         P426 16.4901234654
Flingjingwaller F452 25.8186157738</span>
</pre></div>
         <p>是时候从本质不同的方法来思考了。字典查找是一个普通目的实现工具。字典的键可以是任意长度的字符串 (或者很多其他数据类型) 但这里我们只和单字符键<span class="emphasis"><em>和</em></span> 单字符值打交道。恰巧 <span class="application">Python</span> 有处理这种情况的特别函数：<tt class="function">string.maketrans</tt> 函数。
         </p>
         <p>这便是 <tt class="filename">soundex/stage2/soundex2c.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
allChar = string.uppercase + string.lowercase
charToSoundex = string.maketrans(allChar, <span class='pystring'>"91239129922455912623919292"</span> * 2)
<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pycomment'># ...</span>
    digits = source[0].upper() + source[1:].translate(charToSoundex)
</pre></div>
         <p>这儿在干什么？<tt class="function">string.maketrans</tt> 创建一个两个字符串间的翻译矩阵：第一参数和第二参数。就此而言，第一个参数是字符串 <tt class="literal">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</tt>，第二个参数是字符串 <tt class="literal">9123912992245591262391929291239129922455912623919292</tt>。看到其模式了？恰好与我们用冗长的字典构建的模式相同。A 映射到 9，B 映射到 1，C 映射到 2 等等。但它不是一个字典。而是一个你可以通过字符串方法 <tt class="methodname">translate</tt> 使用的特别数据结构。它根据 <tt class="function">string.maketrans</tt> 定义的矩阵将每个字符翻译为对应的数字。
         </p>
         <p><tt class="filename">timeit</tt> 显示 <tt class="filename">soundex2c.py</tt> 比定义字典并对输入进行循环一砖一瓦地构建输出快很多：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage2&gt;</tt><span class="userinput">python soundex2c.py</span>
<span class="computeroutput">Woo             W000 11.437645008
Pilgrim         P426 13.2825062962
Flingjingwaller F452 18.5570110168</span>
</pre></div>
         <p>你不可能做得更多了。<span class="application">Python</span> 有一个特殊函数，通过使用它做到了一个和你的工作差不多的事情。就用它并继续吧！
         </p>
         <div class="example"><a name="d0e39676"></a><h3 class="title">例&nbsp;18.4.&nbsp;目前的最佳结果：<tt class="filename">soundex/stage2/soundex2c.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> string, re

allChar = string.uppercase + string.lowercase
charToSoundex = string.maketrans(allChar, <span class='pystring'>"91239129922455912623919292"</span> * 2)

<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pykeyword'>if</span> (<span class='pykeyword'>not</span> source) <span class='pykeyword'>or</span> (<span class='pykeyword'>not</span> source.isalpha()):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
    digits = source[0].upper() + source[1:].translate(charToSoundex)
    digits2 = digits[0]
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits[1:]:
        <span class='pykeyword'>if</span> digits2[-1] != d:
            digits2 += d
    digits3 = re.sub(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>, digits2)
    <span class='pykeyword'>while</span> len(digits3) &lt; 4:
        digits3 += <span class='pystring'>"0"</span>
    <span class='pykeyword'>return</span> digits3[:4]

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>'__main__'</span>:
    <span class='pykeyword'>from</span> timeit <span class='pykeyword'>import</span> Timer
    names = (<span class='pystring'>'Woo'</span>, <span class='pystring'>'Pilgrim'</span>, <span class='pystring'>'Flingjingwaller'</span>)
    <span class='pykeyword'>for</span> name <span class='pykeyword'>in</span> names:
        statement = <span class='pystring'>"soundex('%s')"</span> % name
        t = Timer(statement, <span class='pystring'>"from __main__ import soundex"</span>)
        <span class='pykeyword'>print</span> name.ljust(15), soundex(name), min(t.repeat())
</pre></div>
         <div class="footnotes">
            <h3 class="footnotetitle">Footnotes</h3>
            <div class="footnote">
               <p><sup>[<a name="ftn.d0e39596" href="#d0e39596">15</a>] </sup>事实恰好相反，<tt class="filename">soundex2b.py</tt> 在每个点上都快于 <tt class="filename">soundex1e.py</tt>。――译注
               </p>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex.stage3"></a><a name="list_operations.html">18.5.&nbsp;优化列表操作
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>Soundex 算法的第三步是去除连续重复字符。怎样做是最佳方法？</p>
         </div>
         <p>这里是我们目前在 <tt class="filename">soundex/stage2/soundex2c.py</tt> 中的代码：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits2 = digits[0]
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits[1:]:
        <span class='pykeyword'>if</span> digits2[-1] != d:
            digits2 += d
</pre></div>
         <p>这里是 <tt class="filename">soundex2c.py</tt> 的性能表现：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage2&gt;</tt><span class="userinput">python soundex2c.py</span>
<span class="computeroutput">Woo             W000 11.437645008
Pilgrim         P426 13.2825062962
Flingjingwaller F452 18.5570110168</span>
</pre></div>
         <p>第一件事是考虑，考察在循环的每一轮都检查 <tt class="varname">digits[-1]</tt> 是否有效率。列表索引代价大吗？如果把上一个数字存在另外的变量中以便检查是否会获益？
         </p>
         <p>这里的 <tt class="filename">soundex/stage3/soundex3a.py</tt> 将回答这个问题：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits2 = <span class='pystring'>''</span>
    last_digit = <span class='pystring'>''</span>
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits:
        <span class='pykeyword'>if</span> d != last_digit:
            digits2 += d
            last_digit = d
</pre></div>
         <p><tt class="filename">soundex3a.py</tt> 并不比 <tt class="filename">soundex2c.py</tt> 运行得快多少，而且甚至可能更会慢些 (差异还没有大到可以确信这一点)：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage3&gt;</tt><span class="userinput">python soundex3a.py</span>
<span class="computeroutput">Woo             W000 11.5346048171
Pilgrim         P426 13.3950636184
Flingjingwaller F452 18.6108927252</span>
</pre></div>
         <p>为什么 <tt class="filename">soundex3a.py</tt> 不更快呢？其实 <span class="application">Python</span> 的索引功能恰恰很有效。重复使用 <tt class="varname">digits2[-1]</tt> 根本没什么问题。另一方面，手工保留上一个数字意味着我们每存储一个数字都要为<span class="emphasis"><em>两个</em></span> 变量赋值，这便抹杀了我们避开索引查找所带来的微小好处。
         </p>
         <p>让我们从本质上不同的方法来思考。如果可以把字符串当作字符列表来对待，那么使用列表遍历遍寻列表便成为可能。问题是代码需要使用列表中的上一个字符，而且使用列表遍历做到这一点并不容易。</p>
         <p>但是，使用内建的 <tt class="function">range()</tt> 函数创建一个索引数字构成的列表是可以的。使用这些索引数字一步步搜索列表并拿出与前面不同的字符。这样将使你得到一个字符串列表，使用字符串方法 <tt class="methodname">join()</tt> 便可重建字符串。
         </p>
         <p>这便是 <tt class="filename">soundex/stage3/soundex3b.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits2 = <span class='pystring'>""</span>.join([digits[i] <span class='pykeyword'>for</span> i <span class='pykeyword'>in</span> range(len(digits))
                       <span class='pykeyword'>if</span> i == 0 <span class='pykeyword'>or</span> digits[i-1] != digits[i]])
</pre></div>
         <p>这样快了吗？一个字，否。</p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage3&gt;</tt><span class="userinput">python soundex3b.py</span>
<span class="computeroutput">Woo             W000 14.2245271396
Pilgrim         P426 17.8337165757
Flingjingwaller F452 25.9954005327</span>
</pre></div>
         <p>有可能因为目前的这些方法都是 “<span class="quote">字符串中心化</span>” 的。<span class="application">Python</span> 可以通过一个命令把一个字符串转化为一个字符列表：<tt class="function">list('abc')</tt> 返回 <tt class="literal">['a', 'b', 'c']</tt>。更进一步，列表可以被很快地<span class="emphasis"><em>就地</em></span> 改变。与其一砖一瓦地建造一个新的列表 (或者字符串)，为什么不选择操作列表的元素呢？
         </p>
         <p>这便是 <tt class="filename">soundex/stage3/soundex3c.py</tt>，就地修改列表去除连续重复元素：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits = list(source[0].upper() + source[1:].translate(charToSoundex))
    i=0
    <span class='pykeyword'>for</span> item <span class='pykeyword'>in</span> digits:
        <span class='pykeyword'>if</span> item==digits[i]: <span class='pykeyword'>continue</span>
        i+=1
        digits[i]=item
    <span class='pykeyword'>del</span> digits[i+1:]
    digits2 = <span class='pystring'>""</span>.join(digits)
</pre></div>
         <p>这比 <tt class="filename">soundex3a.py</tt> 或 <tt class="filename">soundex3b.py</tt> 快吗？不，实际上这是目前最慢的一种方法<sup>[<a name="d0e39824" href="#ftn.d0e39824">16</a>]</sup>：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage3&gt;</tt><span class="userinput">python soundex3c.py</span>
<span class="computeroutput">Woo             W000 14.1662554878
Pilgrim         P426 16.0397885765
Flingjingwaller F452 22.1789341942</span>
</pre></div>
         <p>我们在这儿除了试用了几种 “<span class="quote">聪明</span>” 的技术，根本没有什么进步。到目前为止最快的方法就是最直接的原始方法 (<tt class="filename">soundex2c.py</tt>)。有时候聪明未必有回报。
         </p>
         <div class="example"><a name="d0e39852"></a><h3 class="title">例&nbsp;18.5.&nbsp;目前的最佳结果：<tt class="filename">soundex/stage2/soundex2c.py</tt></h3><pre class="programlisting"><span class='pykeyword'>
import</span> string, re

allChar = string.uppercase + string.lowercase
charToSoundex = string.maketrans(allChar, <span class='pystring'>"91239129922455912623919292"</span> * 2)

<span class='pykeyword'>def</span><span class='pyclass'> soundex</span>(source):
    <span class='pykeyword'>if</span> (<span class='pykeyword'>not</span> source) <span class='pykeyword'>or</span> (<span class='pykeyword'>not</span> source.isalpha()):
        <span class='pykeyword'>return</span> <span class='pystring'>"0000"</span>
    digits = source[0].upper() + source[1:].translate(charToSoundex)
    digits2 = digits[0]
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits[1:]:
        <span class='pykeyword'>if</span> digits2[-1] != d:
            digits2 += d
    digits3 = re.sub(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>, digits2)
    <span class='pykeyword'>while</span> len(digits3) &lt; 4:
        digits3 += <span class='pystring'>"0"</span>
    <span class='pykeyword'>return</span> digits3[:4]

<span class='pykeyword'>if</span> __name__ == <span class='pystring'>'__main__'</span>:
    <span class='pykeyword'>from</span> timeit <span class='pykeyword'>import</span> Timer
    names = (<span class='pystring'>'Woo'</span>, <span class='pystring'>'Pilgrim'</span>, <span class='pystring'>'Flingjingwaller'</span>)
    <span class='pykeyword'>for</span> name <span class='pykeyword'>in</span> names:
        statement = <span class='pystring'>"soundex('%s')"</span> % name
        t = Timer(statement, <span class='pystring'>"from __main__ import soundex"</span>)
        <span class='pykeyword'>print</span> name.ljust(15), soundex(name), min(t.repeat())
</pre></div>
         <div class="footnotes">
            <h3 class="footnotetitle">Footnotes</h3>
            <div class="footnote">
               <p><sup>[<a name="ftn.d0e39824" href="#d0e39824">16</a>] </sup><tt class="filename">soundex3c.py</tt> 比 <tt class="filename">soundex3b.py</tt> 快。――译注
               </p>
            </div>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex.stage4"></a><a name="string_manipulation.html">18.6.&nbsp;优化字符串操作
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>Soundex 算法的最后一步是对短结果补零和截短长结果。最佳的做法是什么？</p>
         </div>
         <p>这是目前在 <tt class="filename">soundex/stage2/soundex2c.py</tt> 中的做法：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits3 = re.sub(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>, digits2)
    <span class='pykeyword'>while</span> len(digits3) &lt; 4:
        digits3 += <span class='pystring'>"0"</span>
    <span class='pykeyword'>return</span> digits3[:4]
</pre></div>
         <p>这里是 <tt class="filename">soundex2c.py</tt> 的表现：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage2&gt;</tt><span class="userinput">python soundex2c.py</span>
<span class="computeroutput">Woo             W000 12.6070768771
Pilgrim         P426 14.4033353401
Flingjingwaller F452 19.7774882003</span>
</pre></div>
         <p>思考的第一件事是以循环取代正则表达式。这里的代码来自 <tt class="filename">soundex/stage4/soundex4a.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits3 = <span class='pystring'>''</span>
    <span class='pykeyword'>for</span> d <span class='pykeyword'>in</span> digits2:
        <span class='pykeyword'>if</span> d != <span class='pystring'>'9'</span>:
            digits3 += d
</pre></div>
         <p><tt class="filename">soundex4a.py</tt> 快了吗？是的：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage4&gt;</tt><span class="userinput">python soundex4a.py</span>
<span class="computeroutput">Woo             W000 6.62865531792
Pilgrim         P426 9.02247576158
Flingjingwaller F452 13.6328416042</span>
</pre></div>
         <p>但是，等一下。一个从字符串去除字符的循环？我们可以用一个简单的字符串方法做到。这便是  <tt class="filename">soundex/stage4/soundex4b.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits3 = digits2.replace(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>)
</pre></div>
         <p><tt class="filename">soundex4b.py</tt> 快了吗？这是个有趣的问题，它取决输入值：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage4&gt;</tt><span class="userinput">python soundex4b.py</span>
<span class="computeroutput">Woo             W000 6.75477414029
Pilgrim         P426 7.56652144337
Flingjingwaller F452 10.8727729362</span>
</pre></div>
         <p><tt class="filename">soundex4b.py</tt> 中的字符串方法对于大多数名字比循环快，但是对于短小的情况 (很短的名字) 却比 <tt class="filename">soundex4a.py</tt> 略微慢些。性能优化并不总是一致的，对于一个情况快些，却可能对另外一些情况慢些。就此而言，大多数情况将会从改变中获益，所以就改吧，但是别忘了原则。
         </p>
         <p>最后仍很重要的是，让我们检测算法的最后两步：以零补齐短结果和截短超过四字符的长结果。你在  <tt class="filename">soundex4b.py</tt> 中看到的代码就是做这个工作的，但是太没效率了。看一下 <tt class="filename">soundex/stage4/soundex4c.py</tt> 找出原因：
         </p>
         <div class="informalexample"><pre class="programlisting">
    digits3 += <span class='pystring'>'000'</span>
    <span class='pykeyword'>return</span> digits3[:4]
</pre></div>
         <p>我们为什么需要一个 <tt class="literal">while</tt> 循环来补齐结果？我们早就知道我们需要把结果截成四字符，并且我们知道我们已经有了至少一个字符 (直接从 <tt class="varname">source</tt> 中拿过来的起始字符)。这意味着我们可以仅仅在输出的结尾添加三个零，然后截断它。不要害怕重新理解问题，从不太一样的角度看问题可以获得简单的解决方案。
         </p>
         <p>我们丢弃 <tt class="literal">while</tt> 循环后从 <tt class="filename">soundex4c.py</tt> 中获得怎样的速度？太明显了：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage4&gt;</tt><span class="userinput">python soundex4c.py</span>
<span class="computeroutput">Woo             W000 4.89129791636
Pilgrim         P426 7.30642134685
Flingjingwaller F452 10.689832367</span>
</pre></div>
         <p>最后，还有一件事可以令这三行运行得更快：你可以把它们合并为一行。看一眼 <tt class="filename">soundex/stage4/soundex4d.py</tt>：
         </p>
         <div class="informalexample"><pre class="programlisting">
    <span class='pykeyword'>return</span> (digits2.replace(<span class='pystring'>'9'</span>, <span class='pystring'>''</span>) + <span class='pystring'>'000'</span>)[:4]
</pre></div>
         <p>在 <tt class="filename">soundex4d.py</tt> 中把所有代码放在一行可以比 <tt class="filename">soundex4c.py</tt> 稍微快那么一点：
         </p>
         <div class="informalexample"><pre class="screen">
<tt class="prompt">C:\samples\soundex\stage4&gt;</tt><span class="userinput">python soundex4d.py</span>
<span class="computeroutput">Woo             W000 4.93624105857
Pilgrim         P426 7.19747593619
Flingjingwaller F452 10.5490700634</span>
</pre></div>
         <p>它非常难懂，而且优化也不明显。这值得吗？我希望你有很好的见解。性能并不是一切。你在优化方面的努力应该与程序的可读性和可维护性相平衡。</p>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="soundex.summary"></a><a name="summary.html">18.7.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>这一章展示了性能优化的几个重要方面，这里是就 <span class="application">Python</span> 而言，但它们却普遍适用。
            </p>
         </div>
         <div class="itemizedlist">
            <ul>
               <li>如果你要在正则表达式和编写循环间抉择，选择正则表达式。正则表达式因其是以 C 语言编译的可以本能地在你的计算机上运行，你的循环却以 <span class="application">Python</span> 编写需要通过 <span class="application">Python</span> 解释器运行。
               </li>
               <li>如果你需要在正则表达式和字符串方法间抉择，选择字符串方法。它们都是以 C 编译的，所以选取简单的。</li>
               <li>字典查找的通常应用很快，但是 <tt class="function">string.maketrans</tt> 之类的特殊函数和 <tt class="methodname">isalpha()</tt> 之类的字符串方法更快。如果 <span class="application">Python</span> 有定制方法给你用，就使它吧！
               </li>
               <li>别太聪明了。有时一些明显的算法是最快的。</li>
               <li>不要太迷恋性能优化，性能并不是一切。</li>
            </ul>
         </div>
         <p>最后一点太重要了，这章中你令这个程序提速三倍并且令百万次的调用节省 20 秒。太棒了！现在思考一下：在那百万次的函数调用中，有多少秒花在周边应用程序等待数据库连接？花在磁盘输入/输出上？花在等待用户输入上？不要在过度优化算法上花时间，从而忽略了其它地方可以做的明显改进。开发你编写运行良好的
            <span class="application">Python</span> 代码的直觉，如果发现明显的失误则修正它们，并不对其它部分过分操作。
         </p>
      </div>
      
