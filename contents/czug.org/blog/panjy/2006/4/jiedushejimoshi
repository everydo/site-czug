<p>觉得设计模式方面的知识还是太薄弱，于是根据自己的理解，复习了一下，感想记录如下。</p>
<div class="contents pullquote topic">
<p class="topic-title first"><a id="contents" name="contents">Contents</a></p>
<ul class="auto-toc simple">
<li><a class="reference" href="#id1" id="id4" name="id4">1&nbsp;&nbsp;&nbsp;创建模式</a><ul class="auto-toc">
<li><a class="reference" href="#factory" id="id5" name="id5">1.1&nbsp;&nbsp;&nbsp;Factory</a></li>
<li><a class="reference" href="#prototype" id="id6" name="id6">1.2&nbsp;&nbsp;&nbsp;Prototype</a></li>
<li><a class="reference" href="#builder" id="id7" name="id7">1.3&nbsp;&nbsp;&nbsp;Builder</a></li>
<li><a class="reference" href="#singleton" id="id8" name="id8">1.4&nbsp;&nbsp;&nbsp;Singleton</a></li>
</ul>
</li>
<li><a class="reference" href="#id2" id="id9" name="id9">2&nbsp;&nbsp;&nbsp;结构模式</a><ul class="auto-toc">
<li><a class="reference" href="#adapter" id="id10" name="id10">2.1&nbsp;&nbsp;&nbsp;Adapter</a></li>
<li><a class="reference" href="#proxy" id="id11" name="id11">2.2&nbsp;&nbsp;&nbsp;Proxy</a></li>
<li><a class="reference" href="#composite" id="id12" name="id12">2.3&nbsp;&nbsp;&nbsp;Composite</a></li>
<li><a class="reference" href="#facade" id="id13" name="id13">2.4&nbsp;&nbsp;&nbsp;Facade</a></li>
<li><a class="reference" href="#decorator" id="id14" name="id14">2.5&nbsp;&nbsp;&nbsp;Decorator</a></li>
<li><a class="reference" href="#bridge" id="id15" name="id15">2.6&nbsp;&nbsp;&nbsp;Bridge</a></li>
<li><a class="reference" href="#flyweight" id="id16" name="id16">2.7&nbsp;&nbsp;&nbsp;Flyweight</a></li>
</ul>
</li>
<li><a class="reference" href="#id3" id="id17" name="id17">3&nbsp;&nbsp;&nbsp;行为模式</a><ul class="auto-toc">
<li><a class="reference" href="#template" id="id18" name="id18">3.1&nbsp;&nbsp;&nbsp;Template</a></li>
<li><a class="reference" href="#memento" id="id19" name="id19">3.2&nbsp;&nbsp;&nbsp;Memento</a></li>
<li><a class="reference" href="#chain-of-responsibility" id="id20" name="id20">3.3&nbsp;&nbsp;&nbsp;Chain of Responsibility</a></li>
<li><a class="reference" href="#observer" id="id21" name="id21">3.4&nbsp;&nbsp;&nbsp;Observer</a></li>
<li><a class="reference" href="#command" id="id22" name="id22">3.5&nbsp;&nbsp;&nbsp;Command</a></li>
<li><a class="reference" href="#state" id="id23" name="id23">3.6&nbsp;&nbsp;&nbsp;State</a></li>
<li><a class="reference" href="#strategy" id="id24" name="id24">3.7&nbsp;&nbsp;&nbsp;Strategy</a></li>
<li><a class="reference" href="#mediator" id="id25" name="id25">3.8&nbsp;&nbsp;&nbsp;Mediator</a></li>
<li><a class="reference" href="#interpreter" id="id26" name="id26">3.9&nbsp;&nbsp;&nbsp;Interpreter</a></li>
<li><a class="reference" href="#visitor" id="id27" name="id27">3.10&nbsp;&nbsp;&nbsp;Visitor</a></li>
<li><a class="reference" href="#iterator" id="id28" name="id28">3.11&nbsp;&nbsp;&nbsp;Iterator</a></li>
</ul>
</li>
</ul>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id4" id="id1" name="id1">1&nbsp;&nbsp;&nbsp;创建模式</a></h3>
<p>对象如何创建？</p>
<div class="section">
<h4><a class="toc-backref" href="#id5" id="factory" name="factory">1.1&nbsp;&nbsp;&nbsp;Factory</a></h4>
<p>将创建什么类、怎么创建的过程从 <tt class="docutils literal"><span class="pre">__init__</span></tt> 或者 <tt class="docutils literal"><span class="pre">__new__</span></tt> 中抽象出来，专门放到一个类中。</p>
<p>Plone中，所有的文件夹都是Factory，可以调用 <tt class="docutils literal"><span class="pre">invokeFactory(content_type,id)</span></tt> 来创建子对象。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id6" id="prototype" name="prototype">1.2&nbsp;&nbsp;&nbsp;Prototype</a></h4>
<p>通过复制已有对象来创建对象。Python有copy和deepcopy方法，Zope也有clone方法。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id7" id="builder" name="builder">1.3&nbsp;&nbsp;&nbsp;Builder</a></h4>
<p>也是将对象和对象的创建方法分离。和Factory的区别是：</p>
<ul class="simple">
<li>Factory以构建类为中心，可以构建出不同类的对象</li>
<li>Builder以某个类的对象为中心，可选用不同的构建方法</li>
</ul>
<p>Plone站点创建的时候，可以选择使用不同的Policy，比如中文的Plone站点，这就是Builder的示例吧...</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id8" id="singleton" name="singleton">1.4&nbsp;&nbsp;&nbsp;Singleton</a></h4>
<p>单子模式，全局只有一个对象。一些注册器，实际上是利用了单子模式。</p>
</div>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id9" id="id2" name="id2">2&nbsp;&nbsp;&nbsp;结构模式</a></h3>
<p>对象之间的组装结构，相互的关系？</p>
<div class="section">
<h4><a class="toc-backref" href="#id10" id="adapter" name="adapter">2.1&nbsp;&nbsp;&nbsp;Adapter</a></h4>
<p>Zope3 对Adapter有专门支持(zope.interface.adapter)。</p>
<p>使用apater，在2个不同接口之间转接。也就是，可让所有拥有接口A的对象，转接后，能够拥有接口B的功能。</p>
<p>Adapter是松耦合方式扩展对象功能的良好途径。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id11" id="proxy" name="proxy">2.2&nbsp;&nbsp;&nbsp;Proxy</a></h4>
<p>Zope3对Proxy有专门的支持(zope.proxy)。</p>
<p>使用Proxy后，接口不发生变化，而是对接口的功能多加了一层控制，改变了现有的功能逻辑，比如：</p>
<ol class="arabic simple">
<li>增加权限的控制</li>
<li>中间层可代替原始对象进行工作，这在原始对象不能正常访问的时候非常重要，比如网络中断</li>
</ol>
<p>Proxy是改变(改进、加强、扩充)现有接口功能的重要途径。</p>
<p>Proxy和现有的子类方法重载不同，Proxy是实例之间的关系，子类重载是类定义的时候的关系。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id12" id="composite" name="composite">2.3&nbsp;&nbsp;&nbsp;Composite</a></h4>
<p>组装模式，优点是可方便的加入新的部件。</p>
<p>这也就是我们在ZMI中看到的对象树了。Zope是天然支持的。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id13" id="facade" name="facade">2.4&nbsp;&nbsp;&nbsp;Facade</a></h4>
<p>Facade是为系统中一组接口，提供统一的访问界面，以便松散系统间的耦合性。</p>
<p>其实Python的DBI就是Facade的一个应用吧。Zope3的基于接口开发，不知道算不算也是Facade的一个应用？</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id14" id="decorator" name="decorator">2.5&nbsp;&nbsp;&nbsp;Decorator</a></h4>
<p>Decorator是让对象的接口增加新的功能。</p>
<p>感觉和Proxy比较类似，区别可能是Proxy是比较透明的，不改变原来的功能，仅仅是让原来的功能更可靠；
而Decorator则是加新的功能。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id15" id="bridge" name="bridge">2.6&nbsp;&nbsp;&nbsp;Bridge</a></h4>
<p>分离抽象对象和行为。可动态组合对象和对象行为模式。</p>
<p>在Plone中，如果皮肤的显示方法是内容的行为的话，那么Plone的皮肤切换，是否可认为是一种bridge现象？</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id16" id="flyweight" name="flyweight">2.7&nbsp;&nbsp;&nbsp;Flyweight</a></h4>
<p>Flyweight是对象共享，减少内存开销。zope中好像不怎么用</p>
</div>
</div>
<div class="section">
<h3><a class="toc-backref" href="#id17" id="id3" name="id3">3&nbsp;&nbsp;&nbsp;行为模式</a></h3>
<p>对象操作行为、算法方面的模式</p>
<div class="section">
<h4><a class="toc-backref" href="#id18" id="template" name="template">3.1&nbsp;&nbsp;&nbsp;Template</a></h4>
<p>定义一个抽象类，将公共部分抽象出来。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id19" id="memento" name="memento">3.2&nbsp;&nbsp;&nbsp;Memento</a></h4>
<p>对象状态可被保存和加载，这样在事务过程中，可回退到从前的某个状态。</p>
<p>显然，Zope中的ZODB对象，都是支持Memento的</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id20" id="chain-of-responsibility" name="chain-of-responsibility">3.3&nbsp;&nbsp;&nbsp;Chain of Responsibility</a></h4>
<p>一组对象有相同的接口，依次调用找到合适的调用对象。(可能处理某请求的对象比较多)</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id21" id="observer" name="observer">3.4&nbsp;&nbsp;&nbsp;Observer</a></h4>
<p>zope 3中的事件机制比较类似。这也就是所谓的回调函数callback。</p>
<p>抛出事件，相关类可订阅处理。</p>
<p>Oberserver和CoR的区别是，CoR只有一个对象被真正调用。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id22" id="command" name="command">3.5&nbsp;&nbsp;&nbsp;Command</a></h4>
<p>如果请求非常多，可请求进行封装，把所有的命令封装到一个类中，然后对这个类进行操作。
(要处理的请求比较多)</p>
<p>图形界面中的菜单是一个典型。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id23" id="state" name="state">3.6&nbsp;&nbsp;&nbsp;State</a></h4>
<p>不同的状态下，会有不同的行为。通常为不同状态，定义不同的类。</p>
<p>实际上，Plone的工作流，也是做这个事情，而且支持配置文件实现。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id24" id="strategy" name="strategy">3.7&nbsp;&nbsp;&nbsp;Strategy</a></h4>
<p>将一系列的算法封装为类，提供动态组装的方法。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id25" id="mediator" name="mediator">3.8&nbsp;&nbsp;&nbsp;Mediator</a></h4>
<p>中介对象，协调多个对象之间的关系。</p>
<p>让对象之间的网状关系，变成星型关系。MVC中的Controller就是典型Mediator.</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id26" id="interpreter" name="interpreter">3.9&nbsp;&nbsp;&nbsp;Interpreter</a></h4>
<p>用解释器去执行一个语言。用得不多</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id27" id="visitor" name="visitor">3.10&nbsp;&nbsp;&nbsp;Visitor</a></h4>
<p>有大量的各种类型的对象需要处理，不同的对象，处理方法还有区别。
可定义一个Visitor和多个visibale.</p>
<p>比如，对Plone网站上的内容进行升级迁移，参考ATContentTypes/migration,
其中包括了众多的migrator。</p>
</div>
<div class="section">
<h4><a class="toc-backref" href="#id28" id="iterator" name="iterator">3.11&nbsp;&nbsp;&nbsp;Iterator</a></h4>
<p>构建类对内容访问方法进行封装，提供多种内容访问的方法。</p>
<p>还是ATCT的内容迁移：</p>
<p>ATContentTypes/migration/walker.py</p>
<p>参考：</p>
<ul class="simple">
<li><a class="reference" href="http://www.jdon.com/designpatterns/index.htm">J道</a></li>
</ul>
</div>
</div>
