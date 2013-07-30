---
created: 2007-09-16 18:26:58
creator: zhangbingkai
description: Plone在默认情况下，开启评论的内容，用户需要登录才能发表评注。下面将讲述如何让匿名用户便可评注；然后做简单定制，实现让匿名用户填写姓名即可评注。
title: 让你的站点可匿名用户填写姓名可评注
---
<h1>让你的站点可匿名用户填写姓名可评注</h1>
<h3>1. 打开评注功能</h3>
<br />
<p>在编辑页面的属性标签页中如图：</p>
<br />
<p><img src="http://download.zopen.cn/benky/stuff/img/public-addcomment1.png" /></p>
<p>点击“开放”，点击保存。</p>
<p>在Plone3.0中，点击Setting标签页，打开Allowed comments属性。<br /></p>
<h3>2. 开启匿名评注功能</h3>
<br />
<p>你发现用匿名登录后，需要登录后发表评论。如下图：</p>
<p><img src="http://download.zopen.cn/benky/stuff/img/public-addcomment2.png" /></p>
<p>那我们来开启匿名评注的功能吧：<br /></p>
<ul><li>进入ZMI的根目录的 Security 标签页</li></ul>
<ul><li>找到Reply to item权限项，取消选择Acquire，并选择允许Anonymous角色</li></ul>
<ul><li>单击Save按钮，保存更改</li></ul>
<p>这样，站点的内容如果开启了评论，匿名用户也可对内容进行评论。</p>
<h3>3. 找到评注的逻辑及代码</h3>
<br />
<p>匿名用户可评注，但是在评注表单中要填写用户名和密码才能用姓名发表评注，如下图：</p>
<p><img src="http://download.zopen.cn/benky/stuff/img/public-addcomment3.png" /></p>
<p>我们在代码中去看这个发表评注的过程。去找评注功能的相关显示及逻辑代码。</p>
<p>我们在提交评注表单的HTML代码中找到提交的Form表单是这样的：</p>
<pre>.../discussion_reply_form</pre>
<p>那么，我们在Portal_skins中找到discussion_reply_form</p>
<p>这是一个CPT文件，你若不了解什么叫控制页面模板，简易先到CZUG的Plone中文书籍项目中了解第十三章的内容，项目地址：http://czug.everydo.com  登录用户名／密码用  guset/guest 。</p>
<p>在discussion_reply_form这个CPT页面的Actions标签页中，我们看到表单提交成功后会提交到discussion_reply，这便是表单的处理逻辑代码。</p>
<h3>4. 定制可填写姓名发表评注</h3>
<br />
<p>我们来处理表单，在表单中有这样的代码：</p>
<pre>&lt;div tal:condition="isAnon"&gt;<br />                &lt;dl class="portalMessage warning"&gt;<br />                    &lt;dt i18n:translate=""&gt;<br />                        Info<br />                    &lt;/dt&gt;<br />                    &lt;dd i18n:translate="legend_note_reply_anonymous"&gt;<br />                        You are not logged in. You may optionally enter your<br />                        username and password below. If you don't enter anything,<br />                        this comment will be posted as 'Anonymous User'.<br />                    &lt;/dd&gt;<br />                &lt;/dl&gt;<br />                &lt;div class="field"&gt;<br />                    &lt;label for="username" i18n:translate="label_name"&gt;Name&lt;/label&gt;<br />                    &lt;input name="username"<br />                           id="username"<br />                           value="" alt="Username" title="Name"<br />                           size="40"<br />                           i18n:attributes="title label_name; alt label_username;" /&gt;<br />                &lt;/div&gt;<br />                &lt;div class="field"&gt;<br />                    &lt;label for="password" i18n:translate="label_password"&gt;Password&lt;/label&gt;<br />                    &lt;input type="password"<br />                           id="password"<br />                           name="password"<br />                           value="" alt="Password" title="Password"<br />                           size="40"<br />                           i18n:attributes="title label_password; alt label_password;" /&gt;<br /><br />                &lt;/div&gt;<br />            &lt;/div&gt;</pre>
换成可用填写姓名发表评论：<br />
<pre><br />  &lt;div class="field"&gt;<br />                    &lt;label for="username" i18n:translate="label_name"&gt;Name&lt;/label&gt;<br />                    &lt;input name="username"<br />                           id="username"<br />                           value="" alt="Username" title="Name"<br />                           size="40"<br />                           i18n:attributes="title label_name; alt label_username;" /&gt;<br /><br />                &lt;/div&gt;</pre>
<p>
现在来处理逻辑部分disscustion_relpy的代码，</p>
<p>这是一个Python Script，它有这样一些参数，在
    Parameter List 中看到：</p>
<pre>subject,body_text,text_format='plain',username=None,password=None</pre>
<p>换成：</p>
<pre>subject,body_text,text_format='plain',username=""</pre>
我们看到这些代码：<br />
<pre><br />if username or password:<br />    # The user username/password inputs on on the comment form were used,<br />    # which might happen when anonymous commenting is enabled. If they typed<br />    # something in to either of the inputs, we send them to 'logged_in'.<br />    # 'logged_in' will redirect them back to this script if authentication<br />    # succeeds with a query string which will post the message appropriately<br />    # and show them the result.  if 'logged_in' fails, the user will be<br />    # presented with the stock login failure page.  This all depends<br />    # heavily on cookiecrumbler, but I believe that is a Plone requirement.<br />    came_from = '%s?subject=%s&amp;amp;body_text=%s' % (req['URL'], subject, body_text)<br />    came_from = url_quote_plus(came_from)<br />    portal_url = context.portal_url()<br /><br />    return req.RESPONSE.redirect(<br />        '%s/logged_in?__ac_name=%s'<br />        '&amp;amp;__ac_password=%s'<br />        '&amp;amp;came_from=%s' % (portal_url,<br />                               url_quote_plus(username),<br />                               url_quote_plus(password),<br />                               came_from,<br />                               )<br />        )<br /><br /># if (the user is already logged in) or (if anonymous commenting is enabled and<br /># they posted without typing a username or password into the form), we do<br /># the following<br /><br />creator = mtool.getAuthenticatedMember().getId()<br /></pre>
换成下面所示：<br />
<pre>if username == '':<br />   username = '匿名用户'<br />creator = username<br /></pre>
现在，在你的站点中匿名用户不用注册登录，不用发表评注时还用着“匿名用户”的字样，就可评注了。