
 <h1>接口（Interface）</h1>
 <p><br />
 <b><a href="http://www.czug.org/docs/zope/zope3book/Interfaces">Interface</a></b><br />
 <br />
 Interface实在应该是Python的一个技术，无奈Python对Interface支持太少，因此Zope3自己开发了一套。<br />
 <br />
 接口和class其实比较类似，但是接口更偏重于文档，并提供了一些接口定义、检查的函数。<br />
 <br />
 接口的属性需要显式声名，如：<span class="cmtt-10">text</span><span class="cmtt-10">&nbsp;=</span><span class="cmtt-10">&nbsp;Attribute("The</span><span class="cmtt-10">&nbsp;text</span><span class="cmtt-10">&nbsp;of</span><span class="cmtt-10">&nbsp;the</span><span class="cmtt-10">&nbsp;example")</span>；接口的方法不需要self参数。<br />
 <br />
 接口的检查函数包括：</p>
 <ul>
 <li><span class="cmtt-10">IExample</span><span class="obeylines-h"><span class="cmtt-10">.<b>providedBy</b>(exampleObject)</span></span></li>
 <li><span class="obeylines-h"><span class="cmtt-10">IExample.<b>implementedBy</b>(SimpleExample)</span></span>.</li>
 <li><span class="obeylines-h"><span class="cmtt-10"><b>isOrExtends</b>(interface)</span></span></li>
 </ul>
 <h1>组件架构(Component Archtecture)</h1>
 <p><b><a href="http://www.czug.org/docs/zope/zope3book/Components"><br />
 The Component Archetecture - Overview</a></b><br />
 <br />
 组件架构被简称CA，但此CA非彼CA也。组件架构用于松散对象直接的耦合程度，让系统更简单、更容易扩展，更容易学习。</p>
 <p>和Zope3组件架构类似的技术包括： 微软的COM、Corba、KDE的KParts、Mozilla API、sun公司Java的JMX。</p>
 <p>组件包括如下几类：</p>
 <h2>服务（Services）</h2>
 <p><br />
 类似于CMF中的tool对象，他提供全局的基础服务，他不依赖于其他的组件。开发程序应该尽量少用服务，而用Utility。Service的接口通常提供access函数，而不提供mutator函数。</p>
 <p>最基础的服务包括：</p>
 <ul>
 <li>Utility Service，提供类的注册和检索服务</li>
 <li>Service Service，提供服务的管理服务</li>
 <li>Error Reporting service，故障的记录服务</li>
 </ul>
 <h1>适配器（Adapters）</h1>
 <p>适配器是组件架构中的粘接剂，能够把多个接口连接起来，能够实现基于接口的编程，最终达到通过配置文件ZCML将多个产品组装起来提供服务。</p>
 <h1>工具（Utilities）</h1>
 <p>工具类似于服务(Service)，但是不是那么至关重要。<br />
 一般从Utility Service中得到一个Utilities. 开发的时候少用服务，多用Utitity，以减少系统的复杂性。</p>
 <h1>构建器（Factories）</h1>
 <p><br />
 构建器用于构建组件和对象，当创建对象的时候就需要他。构建器其实是一种特殊的工具（Utility），他基于IFactory接口，提供了两个方法：</p>
 <ul>
 <li><span class="obeylines-h"><span class="cmtt-10">_</span><span class="cmtt-10">_</span><span class="cmtt-10">call</span><span class="cmtt-10">_</span><span class="cmtt-10">_</span><span class="cmtt-10">()，用于创建对象实例</span></span></li>
 <li><span class="obeylines-h"><span class="cmtt-10">getInterfaces()，用于得到要创建对象的接口</span></span></li>
 </ul>
 <p>使用方法为： <span class="cmtt-10">ex</span><span class="cmtt-10">&nbsp;=</span><span class="cmtt-10">&nbsp;zapi.createObject('example.SimpleExample')<br />
 <br /></span></p>
 <h2><span class="cmtt-10">展现组件：View、Resource、Skin、Layer</span></h2>
 <p><br />
 从组件架构来说，他们是适配器的Adapter一种，也就是说把对象适配成不同的输出，如html、ftp、xmlrpc等。<br />
 <br />
 这些东西实际上和CMF的概念十分类似：</p>
 <ul>
 <li>View，类似于zpt/pythonscript, 他们有context对象，需要request信息</li>
 <li>Resource，类似于css、图片等，独立、没有context对象</li>
 <li>layer，同cmf</li>
 <li>skin，同cmf，通过在url中添加“<b>++skin++SKINNAME</b>”可以切换皮肤</li>
 </ul>
 <h2>全局组件和本地组件</h2>
 <p><br />
 全局组件使用ZCML定义，他不保存在ZODB中，在任何地方均可得到。<br />
 本地对象在site中点击“Manage Site”创建，通常在URL中会看到<b>++etc++site<br /></b>点击“make a
 site”，任何一个文件夹都能提升为一个site。<br />
 <br />
 本地组件的获得方法为：<br />
 <span class="cmtt-10">&nbsp;factory</span><span class="cmtt-10">&nbsp;=</span><span class="cmtt-10">&nbsp;zapi.getFactory('example.SimpleExample',</span><span class="cmtt-10">&nbsp;context=other_site)<br />
 <br />
 如果other_site没有该组件，则会向上一个site询问，直至global的，看来zope3的“获取”机制是以site为单位的。<br /></span></p>
