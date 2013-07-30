---
created: 2007-09-16 18:22:16
creator: zhangbingkai
description: "    Everydo.com的论坛使用Ploneboard实现，匿名浏览用户无需注册登录，填写姓名就可发贴；而再次访问Everydo.com时无需再填写姓名，将使用存在Cookie中的姓名来发贴。\r\
  \n\r\n    因为有社区里朋友问到，我将实现过程写在这里。"
title: 让你的Ploneboard匿名用户填写姓名可发贴
---
<h1>让你的Ploneboard匿名用户填写姓名可发贴</h1>
<h3>1. 开启匿名用户可发贴</h3>
<p>在添加了论坛board后，再来添加子论坛forum后，改变forum状态为Free of all，如下图：</p>
<p><img src="http://download.zopen.cn/benky/stuff/img/public-addcomment4.png" /></p>
<br />
<h3>2. 了解Ploneboard发贴、发表评论的过程</h3>
<p>发贴时，页面打开的是这样地址：</p>
<pre>.../add_conversation_form?</pre>
<p>我们可以在Portal_skins中找到add_conversation_form的页面，它是一个CPT页面，你若不了解什么叫控制页面模
板，简易先到CZUG的Plone中文书籍项目中了解第十三章的内容，项目地址：http://czug.everydo.com 登录用户名／密码用
guset/guest 。</p>
<p>我们在add_conversation_form页面的Actions标签页中看到Post提交后会提交给
add_conversation_script，很显然，add_conversation_script是处理发贴表单的逻辑代码。我们也可以在
Portal_skins中找到add_conversation_script。</p>
<p>我们再来了解发表评论的过程。</p>
<p>发表评论有两种方式，使用回复或快速回复，我们看到点击“回复”时，链接到了</p>
<pre>../add_comment_form</pre>
<p>在快速回复的HTML代码中，看到form提交也提交到add_comment_form</p>
<p>很显然，add_comment_form是表单，我们在Portal_skins中找到了它，它也是一个CPT页面，在
add_comment_form的Actions标签页中看到Post后提交给了add_comment_script，那么
add_comment_script就是发表评注表单的处理逻辑代码。<br /></p>
<h3>3. 定制“显示”部分代码</h3>
<p>我们在add_conversation_form的代码中看到：</p>
<pre>&lt;div metal:use-macro="here/add_comment_form/macros/comment_body_title" tal:omit-tag="" /&gt;<br /><br />&lt;div metal:use-macro="here/add_comment_form/macros/comment_body_text" tal:omit-tag="" /&gt;<br /><br />&lt;div metal:use-macro="here/add_comment_form/macros/comment_body_attachments" tal:omit-tag="" /&gt;<br /><br />&lt;div metal:use-macro="here/add_comment_form/macros/comment_body_buttons" tal:omit-tag="" /&gt;</pre>
<p>显然add_conversation_form使用的是add_comment_form的宏。</p>
<p>我们再来在add_comment_form中定制添加姓名的宏：</p>
<pre> &lt;div metal:define-macro="comment_body_creator" tal:omit-tag=""&gt;<br />            &lt;div class="field"&gt;<br />               &lt;label for="creator"&gt;您的名字&lt;/label&gt;<br /><br />              &lt;div class="formHelp"&gt;<br />              &lt;/div&gt;<br />               &lt;input id="creator" type="text" size="40" name="creator"<br />                      tal:attributes="value python:request.get('creator','');"/&gt;<br />             &lt;/div&gt;<br /></pre>
<p>提示：姓名的表单中有这样的代码：</p>
<pre>tal:attributes="value python:request.get('creator','');"</pre>
<p>
这是后文我们将从表单中的creator和email存放在Cookie中，让用户第一次发贴后，后面的发贴表单中有前面填写的值。</p>
<p>我们再将姓名的宏加在add_conversation_form中：</p>
<pre>&lt;div metal:use-macro="here/add_comment_form/macros/comment_body_creator" tal:omit-tag="" /&gt;<br /></pre>
<p>显示部分就定制完了。<br /></p>
<h3>4. 定制“逻辑”部分代码</h3>
<p>在add_conversation_script中：</p>
<p>它的参数有：</p>
<pre>title, text='', files=None</pre>
<p>我们需要加上creator的参数，将
    Parameter List 填写为<br /></p>
<pre>title, text='', files=None, creator=''</pre>
<p>下面这部分代码是用户名的处理：</p>
<pre>if pm.isAnonymousUser():<br />    creator = 'Anonymous'<br />else:<br />    creator = pm.getAuthenticatedMember().getUserName()</pre>
<br />
<p>我们将它定制为:</p>
<pre>if not pm.isAnonymousUser():<br />    creator = pm.getAuthenticatedMember().getUserName()<br /><br />if creator == '':<br />   creator =  '匿名用户'</pre>
<p>可以将creator存放在在根目录的Cookie中，保存为30天，这部分代码可写在后面：</p>
<pre>cookie_path = '/'<br />length = 30<br />expires = (DateTime() + length).toZone('GMT').rfc822()<br /><br />context.REQUEST.RESPONSE.setCookie('creator',creator, path=cookie_path, expires=expires)</pre>
<br />
<p>那么，add_comment_script中也类似的定制这样的代码。</p>
然后，你就发现可以类似于Everydo.com中的论坛一样用户不登录可用自己的姓名发贴了。