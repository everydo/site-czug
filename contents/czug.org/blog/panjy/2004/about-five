<p>在Zope2上已经呆了3年多了，对Zope 2的各个环节，我已经拿捏的比较细了。</p>
<p>Zope3的出现和成熟，对我一直是一个诱惑。她那样美丽，那样包容，那样开放，那样pythonic，那样可变。我怎能不产生接近她的欲望呢？ ;-)</p>
<p>曾经学过一段时间的zope 3，的确是很喜欢。但是Zope 3现在缺乏一个类似Plone这样的，更加上层的开发平台。因此，我们自己的应用，还是主要集中在Zope 2的开发上。没有具体的开发经验，Zope 3永远是蒙胧的。</p>
<p>好了，言归正传，我是要说Zope领域另外一个大家闺秀，那就是<a href="http://codespeak.net/z3/five/">Five</a>。Five是让在Zope2中使用众多Zope3技术的一个产品。Five出来已经有一年多了，而且从Zope2.8开始，已经进入了Zope的核心。Plone 2.2开始，Five技术将成为CMF/Plone的主要技术。</p>
<p>Zope3Book有长达40多章的文档，这让人有些望而生畏，或许这就是理想主义的代价？这种曾经的畏惧，让我对Five技术没有去主动接近。</p>
<p>我一直在<a href="http://svn.plone.org/svn/collective">Collective</a>这个代码库中很活跃，而且订阅了代码提交通知的邮件列表。Five的踪迹在各个产品代码提交中，已经开始时隐时现了。</p>
<p>最开始的接触，来自和<a href="http://tim.hicks.me.uk/blog/">tim</a>交流Plone的邮件入口产品<a href="http://svn.plone.org/svn/collective/EmailInPlone">EmailInPlone</a>的过程中。他在这个产品中，使用了Zope3的Interface，zcml和Adapter这三个技术。我很快被Adapter的强大功能所吸引，不需要调整原来的代码，使用Adapter，就可让另外一个现有的产品和这个产品漂亮衔接起来。我意识到这就是Adapter柔性的适配作用；而且大量的开发，都是基于接口的开发，产品的可重用性大大提高。更重要的是，由于我有一些zope3的经验，我是完全无痛的了解这些技术的使用。</p>
<p>由于不满EmailInPlone的功能，在和tim的大量交流后，我终于开始对这个产品进行了<a href="http://svn.plone.org/svn/collective/EmailInPlone/branches/zopechina-route">大刀阔斧的改进</a>。我对Interface, zcml, Adapter已经可以使用得如鱼得水了。一些久违的设计模式，也很自然的开始使用了。写这个产品的时候，真的是觉得很爽的过程。而到现在位置我还没有看一篇Five的教程。</p>
<p>如果Zope3还离我有些遥远的话，Five则已经在我身边了！我要写一些界面了，考虑到script和zpt中讨厌的安全限制，我当然希望使用更加干净的Zope3的Views技术来写了，这个技术略显复杂些。尽管看到<a href="http://svn.plone.org/svn/collective/fatsyndication/">fatsyndication</a>的一些使用实例，我觉得还是去系统的了解一下Five，接受一些正统教育。</p>
<p><a href="http://codespeak.net/svn/z3/Five/trunk/doc/">Five的教程</a>就在产品包中，她非常简单，我花了不到2小时就研究了一遍，包括：</p>

<ul>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/main.txt">Five总体介绍</a></li>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/features.txt">Five特性</a></li>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/manual.txt">Five入门教程</a></li>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/products/">Five实例教程</a>，其中：
<ul>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/products/InterfaceTutorial/">接口使用教程</a></li>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/products/ViewsTutorial/">Views教程</a></li>

</ul>
</li>
<li><a href="http://codespeak.net/svn/z3/Five/trunk/doc/directives.txt">ZCML指令参考</a></li>

</ul>
<p>有了Zope3的一些学习经历，这个Five学起来实在容易。很快我就使用Five的Views写了自己的views对象，views对象的出现，让zpt更加干净了。</p>
<p>GoldEgg-phase1正在行动，Plone 2.2计划要到11月才能出来。期待中。</p>
<p>使用Five的过程中，主要发现的问题：</p>

<ul>
<li>和zcml相关的编译错误，不是那么容易定位问题所在了，这需要一个适应过程。一些报错，不是那么明显。</li>
<li>使用views编写的模板，还不能使用Plone的主模板（等待plone 2.2），而且不能在ZMI中进行定制（我看到社区邮件列表中正在考虑解决）。</li>

</ul>
<p>经过一段时间的编程，现在对Five已经有比较全面的认识了。好，回头再看看zope3。有了Interface, views, zcml, adapter这些基础，zope3也不那么遥远了！</p>
<p>所以，呼吁ccube兄这些对zope2技术已经很熟悉的同志，开始用Five吧。真的是不错的一个东东 ;-)</p>
