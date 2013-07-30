---
created: 2006-06-16 16:23:37
creator: panjy
description: Plone中居然不能发信到163的邮箱，谁之过错
title: 对163邮箱的支持
---
<p>Plone中居然不能发信到163的邮箱，谁之过错</p>
<p>今天朋友提出这个问题，终于有时间追究一下了 ;-)</p>
<p>问题是这样的:</p>
<pre class="literal-block">
&gt;&gt;&gt; import smtplib
&gt;&gt;&gt; host = 'smtp.163.com'
&gt;&gt;&gt; username = &quot;xxxxxx&quot;
&gt;&gt;&gt; password = &quot;xxx&quot;
&gt;&gt;&gt; smtp = smtplib.SMTP(host)
&gt;&gt;&gt; smtp.set_debuglevel(1)
&gt;&gt;&gt; smtp.login(username,password)
send: 'ehlo [61.152.160.190]\r\n'
reply: '250-mail\r\n'
reply: '250-PIPELINING\r\n'
reply: '250-AUTH LOGIN PLAIN\r\n'
reply: '250-AUTH=LOGIN PLAIN\r\n'
reply: '250 8BITMIME\r\n'
reply: retcode (250); Msg: mail
PIPELINING
AUTH LOGIN PLAIN
AUTH=LOGIN PLAIN
8BITMIME
send: 'AUTH PLAIN YXV6zhelibunenggeinikanMjM0NTY=\r\n'
reply: '535 Error: authentication failed\r\n'
reply: retcode (535); Msg: Error: authentication failed
Traceback (most recent call last):
  File &quot;&lt;stdin&gt;&quot;, line 1, in ?
  File &quot;/usr/lib/python2.4/smtplib.py&quot;, line 584, in login
    raise SMTPAuthenticationError(code, resp)
smtplib.SMTPAuthenticationError: (535, 'Error: authentication failed')
</pre>
<p>其实，啄木鸟的兄弟 <a class="reference" href="http://python.cn/pipermail/python-chinese/2004-May/001317.html">早就在邮件列表上有类似讨论了</a></p>
<p>问题的实质是，各个ISP对邮件协议支持不是很完全，163对PLAIN认证方法支持有
问题，
而Python的smtplib只按照标准行事。</p>
<p>163中意的是LOGIN认证方法（BTW: 这个方法是M$抛弃标准恶搞的一个东东），因
此在login之前，需要先强制设置一下:</p>
<pre class="literal-block">
&gt;&gt;&gt; smtp.esmtp_features[&quot;auth&quot;]=&quot;LOGIN&quot;
&gt;&gt;&gt; smtp.login(username,password)
(235, 'Authentication successful')
</pre>
<p>具体对Plone2.1修改代码，是需要调整 <tt class="docutils literal"><span class="pre">SecureMailHost/mail.py</span></tt> ，调整下
send方法中:</p>
<pre class="literal-block">
+               smtpserver.esmtp_features[&quot;auth&quot;]=&quot;LOGIN&quot;
               smtpserver.login(userid, password)
</pre>
