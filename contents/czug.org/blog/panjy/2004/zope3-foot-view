
 <p>继续阅读<a href="http://www.czug.org/docs/zope/zope3book">Zope3Book</a>：
 <b><a href="http://www.czug.org/docs/zope/zope3book/DevProcess">开发过程</a></b><br />
 <br />
 介绍Zope3的开源软件开发过程，以及您应该然如何加入到zope3的开发中。很有趣的，充分反映了“集市”开发的过程。Zope3的开发采用的eXtreme
 Programming的总多开发方法，"Sprint"的概念更是zope/plone社区的独创。<br />
 <br />
 这个过程大概是：交流想法(mail list或者IRC) -&gt; 编写正式的proposal(zope2 proposal wiki)-&gt;
 宣布proposal(maillist) -&gt; 讨论(mailist 或 wiki) -&gt; 调整proposal(wiki) -&gt;
 确定(Jim) -&gt; 实现<br />
 <br />
 <b>实现的过程</b>:</p>
 <ul>
 <li>需要首先写Interface，Interface其实就是文档；</li>
 <li>
 接下来要写test案例，zope3非常强调单元测试。UnitTest是对Interface使用的说明，也是对Interface正确性的验证，也是对后续具体实现的一个保护。</li>
 <li>使用<span class="obeylines-h"><span class="cmtt-10">pyskel.py脚本可以从Interface自动生成框架文件</span></span></li>
 <li><span class="obeylines-h"><span class="cmtt-10">运行测试，如果通过，则提交代码</span></span></li>
 </ul>
 <p><b><a href="http://dev.zope.org/Wikis/DevSite/Projects/ComponentArchitecture/CodingStyle">
 命名规范</a><br /></b></p>
 <ul>
 <li>包和模块的名字都小写，不用下划线</li>
 <li>zope.app是zope的系统包</li>
 <li>每个包包括一个interfaces模块或者包，包括一个browser模块或者包，分别存放接口和表现层的代码</li>
 <li>第三方的包可以放到python可以找到的任意地方，但通常在$ZOPE3/src/目录下</li>
 <li>函数和变量的命名规则和java保持一致，使用Camel case
 naming；下划线用来表示私有的保护变量；类应该首字母大写；方法的第一单词应该为动词；接口应该以I起始；</li>
 <li>ZCML和ZPT应该使用2个空格进行缩进。</li>
 <li>
 tests目录用于单元测试，ftests目录用于功能测试；测试模块名应该使用test_起头；测试方法的名字可以尽量的长；测试的第一步是测试接口：<span class="cmtt-10">
 <br />
 self.assert_(IExample.providedBy(SimpleExample()))</span></li>
 </ul>
