
 <p>原文：<a href="http://www.czug.org/docs/zope/zope3book/PortingApps">Porting
 Applications from Zope 2 to Zope 3</a><br />
 <br />
 Zope2和Zope3是完全不同，其上的开发也不同。<br />
 <br />
 Zope3运用了大量的设计模式（design pattern），整个程序的可重用性非常高，这也是对其上的应用的一个要求。<br />
 <br />
 有三种方法：<br />
 <br />
 <b>重新设计</b><br />
 <br />
 列举了zwiki的zope3版本开发过程。zope2上的zwiki很流行了，但是代码非常难读，很dirty，其中主要的程序文件有121kb之多（最新的zwiki版本好像改进了一些）。实际上zope2上的zwiki很难维护了，这必然限制了其的发展。<br />
 <br />
 转移到zope3后，主文件一度只有26行。而且最主要的各种格式的支持，被迁入了zope的核心，zope新增了一个zope.render包，专门处
 理各种格式文本的显示，支持pluggbale的架构，甚至支持到XUL的转换显示！这样即简化了zwiki，有增强了zope的功能，有更多的人会分别
 去维护、改进各自负责的模块。好生漂亮！<br />
 <br />
 <b>使用适配层和脚本转换</b><br />
 <br />
 目前zope3还不支持，但是在zope X3发布后，会逐步考虑。<br />
 <br />
 <b>在Zope2中使用zope3<br /></b><br />
 这个方案是社区中众多产品所采用的，特别是FIVE这个产品<span class="obeylines-h"><span class="link-external"><a href="http://codespeak.net/z3/five.html" class="url"><span class="cmtt-10">http://codespeak.net/z3/five.html</span></a>，他允许你在Zope2中使用Zope3的很多特性。</span></span></p>
