<h2><a id="viewpost1_TitleUrl" href="/blog/wgzhou747217/archive/2006/03/30/1295844.html">如何利用ZOPE/PLONE快速建立一个WEB站点</a> 
</h2>
<div class="postbody">———该系列文章能告诉你什么：如何利用ZOPE/PLONE快速建立一个WEB站点———<br /><br />ZOPE/PLONE适用于什么样的网站？<br /><br />Everywhere，只要你愿意，他能为任何类型的公司、政府部门、社团组织提供任何业务的支持。<br />但它更适合以内容管理为主的业务。<br />————————————————————————————————————<br />什么叫内容管理？<br />去GOOGLE上搜一搜吧，看看什么叫做内容管理。<br />假如你是公司的老板，或者是CIO，希望建立一个内部网站，将公司的通知、员工讨论、网上学习等等都汇集到这里，这就是一种内容管理。<br />如果你是政府部门的某个领导，希望实施电子政府，在网上审批各类文件，技术上通常叫做工作流，也是一种内容管理。<br />如果你管理着一个协会，就像武汉自由协会，可以不仅仅只是建立一个WWW.CLINUX.ORG的网站，你的协会完全可以拥有一个有文章发布系统、WEB类型的NEWS系统、谈论区、邮件列表的多功能站点。<br />————————————————————————————————————————<br /><br />为什么是ZOPE？<br />能够提供内容管理支持的工具非常多，为什么选择ZOPE？<br />我的答案是：<br />1、ZOPE有一个类似J2EE的框架，功能的增加和修改很容易。<br />2、ZOPE/PLONE/PYTHON的开发者非常多，不可思议的多，不断地给ZOPE添加新的功能，用户需要开发的部分越来越少。<br /><br />最后，应当说一下的是，zope和plone都是采取的和GPL兼容的版权协议，这关系到哪些打算采用ZOPE/PLONE技术谋生的人，如果你改进了ZOPE/PLONE本身，你应当将源代码同时提供给你的客户。<br />如果你仅仅只是开发了ZOPE的插件，也就是ZOPE的术语：product，你可以选择其他的版权协议。<br />由于zope类似j2ee的结构，开发者将整个体系结构像积木一样搭建起来，自己的开发工作主要在product里，和zope/plone相对隔离开，从而能够采取自己需要的版权协议。<br /><br />参考站点<br /><a href="http://www.czug.org" target="_self">http://www.czug.org(中文)</a><br /><a href="http://www.zope.org/" target="_blank">http://www.zope.org</a><br /><a href="http://www.plone.org/" target="_blank">http://www.plone.org</a><br /><a href="http://www.zope.org.xn--tw(,)-n32hp9yhwkiro1xotwdqq3a60xfa7280a4h7c/" target="_blank">http://www.zope.org.tw（台湾的，有很多繁体的资料）</a><br />其他所有信息，可以从上面的网站上找到<br /><br />
<h2>第二篇：ZOPE/CMF/PLONE/PYTHON的结构 </h2>PYTHON是编程语言，就像c/c++/java一样。 
<br /><br />zope类似于j2ee的应用服务器，他是一个大的容器。所有的服务都在这里跑。 
<br />和tomcat的结构不同的是，zope将web服务器、应用服务器、对象数据库集成到了一起，如无特殊要求，用户所需的配置工作很少。 
<br />绝大多数网页、文档、图片都存放在对象数据库里，检索起来很方便，应当说，对象数据库为zope的内容管理提供了先天的优势。 <br />参考：<a href="http://zope.org/Documentation/Books/ZopeBook/2_6Edition/ZopeArchitecture.stx" target="_new">http://zope.org/Documentation/Books/ZopeBook/2_6Edition/ZopeArchitecture.stx</a> 
<br /><br />对ZOPE的功能扩展一般不是改写他的代码，而是撰写插件，这里叫做product——产品。 
<br /><br />CMF就是一个产品，专门提供内容管理框架。 <br /><br />PLONE也是一个产品，他依托CMF提供成型的WEB站点。 <br /><br />
<h2>第三篇：安装PLONE </h2>如果你是WINDOWS用户，你什么也不需要准备，去WWW.PLONE.ORG下载plone，安装起来就行了。 
<br /><br />plone的安装包自带了zope、cmf、plone和很多其他产品，安装好了以后，“程序”菜单里就有了一个"plone"项，选择"plone"，可以打开plone 
properties面板，点击start，plone就运行起来了。 <br /><br />点击面板上的“view plone”能够打开你的新建站点，位置在<a href="http://xn--localhost,-8k1qh560a/" target="_new">http://localhost，点击</a>“manage 
root”能够打开管理界面，位置在<a href="http://localhost:8080/manage" target="_new">http://localhost:8080/manage</a>。 
<br /><br />浏览一下你的新建站点，你会发现它已经自带了很多功能，足以满足一般的要求了。 <br /><br />
<h2>第四篇：增强plone <a name="Post"></a></h2>————实例：更好的讨论版 
<br /><br />增强plone一般来说是做两件事，一个是给最底层的python添加新库，一个是给zope添加新的产品。 
<br /><br />plone默认的讨论版太简单，大部分webmaster都无法忍受，我们来更换它！ 
<br />在zope的产品列表里，有一个cmfboard，功能很丰富，也比较美观。可以在zope里搜一下，找到下载链接。 
<br /><br />需要提醒一声：zope/plone的版本很重要，你要详细产看每个产品的readme和install，看一看他推荐的版本，尽量选择较低版本而不是最高的版本，因为往往最新版本还没有经过普遍测试。 
<br /><br />一、下载 <br />Plone-1.0.5 <br />下载地址：<a href="http://www.plone.org/download/" target="_new">http://www.plone.org/download/</a> <br /><br />archetypes-1.0.1和Portal 
Transforms <br />下载地址：<a href="http://sourceforge.net/project/showfiles.php?group_id=75272" target="_new">http://sourceforge.net/project/showfiles.php?group_id=75272</a> 
<br /><br />MPoll-0.3.1和CMFBoard-1.1 <br />下载地址：<a href="http://sourceforge.net/projects/collective/" target="_new">http://sourceforge.net/projects/collective/</a> 
<br /><br />二、安装新的python库 
<br />解开archetypes-1.0.1，里面的结构是Archetypes、ArchExample、ArchGenXML、generator、validation、quickref.pdf 
<br />generator、validation就是我们要安装的新库。 
<br /><br />现在开始编译——我的python不太熟，只会用最简单的方式——打开命令行窗口 <br />第一个命令：set 
path=你的plone安装目录\python 
<br />运行之前，先检查一下，你的plone安装的目录下，是不是有一个python目录，这个python目录里是否有python.exe、python21.dll、pythonw.exe这些文件，这是plone默认安装的，如果没有意外，你可以不管他。 
<br />第二个命令：转到generator的目录下 <br />第三个命令：python setup.py install 
<br />注意看一下命令行窗口的提示，如果没有出错，你的genertator的目录下就多了一个build目录，多半是这样的结构generator-&gt;build-&gt;lib-&gt;generator，将lib里的generator目录拷贝到plone安装目录-〉python-&gt;lib里。 
<br />ok. <br /><br />同样对validation进行处理。 <br /><br />三、安装产品 <br />1、安装Portal Transforms 
<br />解包后，如果结构是PortalTransforms--&gt;PortalTransforms-&gt;bin、debian.......，你需要从第二层的PortalTransforms拷贝，由于winrar和winzip和tar不是特别兼容，在解tar压缩包的时候，会多出一个PortalTransforms目录。 
<br />如果是PortalTransforms-1.05的目录名称，你需要将它改为PortalTransforms。 <br />安装其他产品与此类似。 
<br />复制该目录后，拷贝到plone安装目录-&gt;zope-&gt;lib-&gt;python-&gt;products目录下。 
<br /><br />登陆到<a href="&lt;a target=" target="_new">http://localhost:8080/manage管理界面</a>"&gt;<a href="http://localhost:8080/manage%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2" target="_new">http://localhost:8080/manage管理界面</a>，左边的树状目录中选择plone，然后在右边的content页面里，选择“CMF 
QUICK INSTALLER” <br />然后选择PortalTransforms，install the stuff now 
<br />注意提示，如果没有出错，你可以继续 <br /><br />2、安装archetypes 
<br />解包的archetypes-1.0.1里面有Archetypes、ArchExample目录，将他们拷贝到plone安装目录-&gt;zope-&gt;lib-&gt;python-&gt;products目录下。 
<br /><br />更改Archetypes目录里面的config.py，将INSTALL_DEMO_TYPES的值设为 1 <br /><br />登陆到<a href="&lt;a target=" target="_new">http://localhost:8080/manage管理界面</a>"&gt;<a href="http://localhost:8080/manage%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2" target="_new">http://localhost:8080/manage管理界面</a>，左边的树状目录中选择plone，然后在右边的content页面里，选择“CMF 
QUICK INSTALLER” <br />然后选择Archetypes，install the stuff now <br />注意提示，如果没有出错，你可以继续。 
<br /><br />3、安装mpoll-0.3.1 <br />没什么好说得啦，与上面一样 <br /><br />4、安装CMFBoard-1.1 
<br />解包，将CMFBoard目录拷贝到plone安装目录-&gt;data-&gt;products目录下。 
<br />在ZMI管理界面里--CONTENT页面，选择“External Method” <br />参数如下： <br />o id: install_forumng 
<br />o title (optional): Install CMFBoard <br />o module name: CMFBoard.Install 
<br />o function name: install <br />add以后，再选择一次install_forumng，进入新页面后，选择“test”页面标签。 
<br />注意看提示。 <br /><br />四、配置CMFBoard <br />由于系统默认的forum不是CMFBOARD，需要设置一下： 
<br />1、在ZMI管理界面里，删除默认的portal_discussion，添加CMFBoard Tool <br />2、现在添加论坛 <br /><br /></div>