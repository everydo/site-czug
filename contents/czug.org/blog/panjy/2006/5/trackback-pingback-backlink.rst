---
created: 2006-05-06 15:03:37
creator: panjy
description: 这是网络链接引用的几个技术。
title: trackback / pingback / backlink
---
<p>这是网络链接引用的几个技术。</p>
<p>前不久有朋友和我讨论如何进行树状组织各个Blog文章的相互回复和引用关系。</p>
<p>这里有篇关于 <a class="reference" href="http://www.mengyan.org/blog/tag/backlink">Trackback, Pingback &amp; Backlink</a> 的比较文章
专门讨论.</p>
<p>仔细研究相关的技术，作为一个技术人员的角度，我说下我的观点：</p>
<dl class="docutils">
<dt>Trackback</dt>
<dd><p class="first">使用Blog客户端的时候，可通过Trackback URL直接回复到原始文章的评注中。</p>
<p class="last">是技术标准规范。但是用户界面并不友好，太Geek。而且spam问题难解决。</p>
</dd>
<dt>Pingback</dt>
<dd><p class="first">文章提交后，在服务器端自动提取链接信息，建立文章关联引用。</p>
<p class="last">这仅仅在某个服务器内部有效，无法实现跨系统的链接关系。这只是Blog服务器的一个功能，谈不上标准规范。</p>
</dd>
<dt>BackLink</dt>
<dd><p class="first">和Pingback类似，但有所不同。它有一个独立的服务器来对文章进行索引，因此可实现跨网站的关联。</p>
<p class="last"><a class="reference" href="http://googlechinablog.com/">google黑板报</a> 就是用了这个技术实现“引用此贴的链接”。</p>
</dd>
</dl>
<p>其实三者的应用场合和功能，是有区别的。三者都可能会长久存在下去。</p>
<p>BackLink技术是比较有趣的一个技术，也是一个社会化网络的一个新技术，实现也很简单。</p>
<p>看看google黑板报的源代码就可窥一二了:</p>
<pre class="literal-block">
&lt;dl id=&quot;comments-block&quot;&gt;
&lt;script type=&quot;text/javascript&quot;
        src=&quot;http://www.blogger.com/dyn-js/backlink.js?blogID=20904277&amp;postID=114643829238276607&quot;
        charset=&quot;utf-8&quot; defer=&quot;true&quot;&gt;
&lt;/script&gt;
&lt;noscript&gt;&lt;a href=&quot;http://search.blogger.com/blogsearch?q=link:http%3A%2F%2Fgooglechinablog.com%2F2006%2F05%2Fblog-post.html&quot;&gt;See links to this post&lt;/a&gt;
&lt;/noscript&gt;
&lt;div id=&quot;blogger-dcom-block&quot; style=&quot;display:none&quot;&gt;
   &lt;dt class=&quot;comment-title&quot;&gt;
     &lt;span class=&quot;comment-toggler&quot;&gt;&amp;nbsp;&lt;/span&gt;

     &lt;a href=&quot;&lt;$BlogBacklinkURL$&gt;&quot; target=&quot;_blank&quot;&gt;&lt;$BlogBacklinkTitle$&gt;&lt;/a&gt;
     &lt;span class=&quot;item-control admin-1718978111&quot;&gt;&lt;a style=&quot;border:none;&quot; href=&quot;http://www.blogger.com/delete-backlink.g?blogID=20904277&amp;amp;postID=114643829238276607&amp;amp;backlinkURL=%3C$BlogBacklinkURLEscaped$%3E&quot; title=&quot;移除链接&quot; &gt;&lt;span class=&quot;delete-comment-icon&quot;&gt;&amp;nbsp;&lt;/span&gt;&lt;/a&gt;&lt;/span&gt;
   &lt;/dt&gt;
   &lt;dd class=&quot;comment-body&quot;&gt;&lt;$BlogBacklinkSnippet$&gt;
     &lt;br /&gt;
     &lt;span class=&quot;comment-poster&quot;&gt;
       &lt;em&gt;posted by &lt;$BlogBacklinkAuthor$&gt; &#64;
           &lt;$BlogBacklinkDateTime$&gt;&lt;/em&gt;

     &lt;/span&gt;
   &lt;/dd&gt;
&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot;&gt;if (typeof BL_addOnLoadEvent == 'function') { BL_addOnLoadEvent(function() { BL_writeBacklinks(); }); }&lt;/script&gt;
&lt;/dl&gt;
</pre>
<p>看得出：</p>
<ol class="arabic">
<li><p class="first">google用的是www.blogger.com提供的pagelink服务</p>
</li>
<li><p class="first">这个是Client端基于javascript技术的页面模板示例！太创新了!</p>
<blockquote>
<p>颠覆了我模板技术是服务器技术的观念 :-)</p>
</blockquote>
</li>
</ol>
