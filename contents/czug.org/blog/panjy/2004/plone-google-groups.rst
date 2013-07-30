---
created: 2005-04-16 00:24:35
creator: panjy
description: Google Groups的消息提要(feed)采用ATOM的格式. 这里介绍如何在Plone中显示Google Groups的摘要信息。
title: 在Plone中显示Google Groups的最近消息
---
<p>由于czug升级，采用 <a class="reference" href="http://groups-beta.google.com/">Google Groups</a> 来实现邮件列表功能。该服务采用ATOM格式实现消息摘要，而不是我们习惯的RSS格式（ATOM的确比RSS强些，见 <a class="reference" href="http://www.blogchina.com/new/display/32658.html">RSS和ATOM格式说明</a> ）。因此就不能再使用CMFSin来显示Google Groups的摘要信息了。</p>
<p>于是准备自己写段小程序，来实现这个功能。查了一下，发现python有个 <a class="reference" href="http://feedparser.org/">feedparser</a> 的好东东，支持RSS、ATOM等各种格式的摘要解析。于是准备用他，具体操作如下：</p>
<ul>
<li><p class="first">下载安装 <a class="reference" href="http://feedparser.org/">feedparser</a> , 这个就不细讲了</p>
</li>
<li><p class="first">由于zope中写脚本有权限沙箱，不能直接使用feedparser包。可建立一个ExternalMethod来避开沙箱。也可以将下面的脚本，加入到任意一个产品下的__init__函数末尾(我放到了CMFSin的末尾):</p>
<pre class="literal-block">
from AccessControl import ModuleSecurityInfo
modulesecurity = ModuleSecurityInfo()
modulesecurity.declarePublic('feedparse')

from feedparser import parse as feedparse
modulesecurity.apply(globals())
</pre>
</li>
<li><p class="first">建立一个Script(python)脚本，名字叫做getFeeds:</p>
<pre class="literal-block">
from Products.CMFSin import feedparse

urls = [
 'http://groups-beta.google.com/group/czug-plone/feed/topics.xml?num=15',
 'http://groups-beta.google.com/group/czug-zope/feed/topics.xml?num=15',
 'http://groups-beta.google.com/group/czug-org/feed/topics.xml?num=15',
]

return [dict(feedparse(url)) for url in urls]
</pre>
</li>
<li><p class="first">最后是写一个显示摘要信息的Page Tempalte了, 如下：</p>
</li>
</ul>
<pre class="literal-block">
&lt;html xmlns=&quot;http://www.w3.org/1999/xhtml&quot; xml:lang=&quot;en&quot;
     lang=&quot;en&quot;
     metal:use-macro=&quot;here/main_template/macros/master&quot;
     i18n:domain=&quot;plone&quot;&gt;

 &lt;body&gt;

&lt;div metal:fill-slot=&quot;main&quot;
    tal:define=&quot;DateTime python:modules['DateTime'].DateTime&quot;&gt;

   &lt;h2&gt;&lt;span tal:replace=&quot;here/title_or_id&quot;&gt;content title or id&lt;/span&gt;
       &lt;span tal:condition=&quot;template/title&quot;
             tal:replace=&quot;template/title&quot;&gt;optional template id&lt;/span&gt;&lt;/h2&gt;

   &lt;tal:repeat repeat=&quot;feedsource context/getFeeds&quot;&gt;
   &lt;fieldset tal:define=&quot;feed python:dict(feedsource['feed']);
                         entries python:[ dict(item) for item in feedsource['entries'] ]&quot;
             tal:condition=&quot;entries&quot;&gt;

       &lt;legend&gt;
          &lt;a tal:attributes=&quot;href python:dict(feed['links'][0])['href']&quot;
             target=&quot;_blank&quot;
             tal:content=&quot;feed/title&quot;&gt;title&lt;/a&gt;
       &lt;/legend&gt;
       &lt;p tal:content=&quot;feed/description&quot;&gt;description&lt;/p&gt;
       &lt;ul&gt;
           &lt;li tal:repeat=&quot;entry entries&quot;&gt;
             &lt;a tal:attributes=&quot;href python:dict(entry['links'][0])['href']&quot;
                target=&quot;_blank&quot;
                tal:content=&quot;entry/title&quot;&gt;item&lt;/a&gt;
                &lt;span class=&quot;discreet&quot; tal:content=&quot;python:dict(entry['author_detail']).get('name', '')&quot;&gt;&lt;/span&gt;
                &lt;span class=&quot;discreet&quot; tal:define=&quot;modified python:DateTime(entry['modified']) &quot;
                      tal:content=&quot;python: modified.strftime('%m.%d %H:%M')&quot;&gt;&lt;/span&gt;
           &lt;/li&gt;
       &lt;/ul&gt;

   &lt;/fieldset&gt;
   &lt;/tal:repeat&gt;

&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
<p>大家可能发现，有很多变量强制转换为dict类型了，这个是比较奇怪。这是因为zope的zpt中，仅仅能够直接访问dict类型，而不必单独声明权限。否则就会报权限错了。</p>
