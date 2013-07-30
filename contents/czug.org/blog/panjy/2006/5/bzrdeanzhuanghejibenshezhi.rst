---
created: 2006-05-22 01:10:28
creator: panjy
description: 准备陆续博一下 bzr_ , 我关注很久的一个分布式版本管理系统。
title: bzr的安装和基本设置
---
<p>准备陆续博一下 <a class="reference" href="http://bazaar-vcs.org/FrontPage">bzr</a> , 我关注很久的一个分布式版本管理系统。</p>
<p>考虑将czug的svn转换为bzr, 下面是在czug上的一个安装经历。</p>
<div class="section">
<h3><a id="id1" name="id1">下载安装</a></h3>
<ul>
<li><p class="first">windows上有傻瓜安装程序(注意需要下载mfc7.dll)</p>
</li>
<li><p class="first">linux上执行下面的语句(注意需要python 2.4):</p>
<pre class="literal-block">
python setup.py install
</pre>
</li>
</ul>
</div>
<div class="section">
<h3><a id="email" name="email">设置你自己的Email</a></h3>
<p><a class="reference" href="http://bazaar-vcs.org/BzrSettingEmail">http://bazaar-vcs.org/BzrSettingEmail</a></p>
<p>这个email用于标识提交用户，同时用于通知邮件。
如果不设置，bzr会自动生成一个，但是你最好设置一个。
有多种方法，最常用的是通过配置文件设置， <tt class="docutils literal"><span class="pre">$HOME/.bazaar/bazaar.conf</span></tt>
(Windows中是 <tt class="docutils literal"><span class="pre">%APPDATA%\bazaar\2.0\bazaar.conf</span></tt> ):</p>
<pre class="literal-block">
[DEFAULT]
email=Pan Junyong &lt;panjy&#64;zopechin.com&gt;
</pre>
<p>也可在 <tt class="docutils literal"><span class="pre">$HOME/.bazaar/branches.conf</span></tt> 中针对某个分支进行设置:</p>
<pre class="literal-block">
[/the/directory/to/the/branch]
email=Your Name &lt;email&#64;isp.com&gt;
</pre>
<p>这时候，你可用下面的命令检测当前用户:</p>
<pre class="literal-block">
$ bzr whoami
Pan Junyong &lt;panjy&#64;zopechin.com&gt;
</pre>
</div>
<div class="section">
<h3><a id="id2" name="id2">安装第三方的bzr工具</a></h3>
<p><a class="reference" href="http://bazaar-vcs.org/3rdPartyTools">http://bazaar-vcs.org/3rdPartyTools</a></p>
<div class="section">
<h4><a id="pqm" name="pqm">补丁队列管理器(PQM)</a></h4>
<p>PQM支持通过签名的邮件来管理分支。它接受授权开发人员的gnupg签名的邮件，来合并分支。</p>
<ul class="simple">
<li>PQM 可和测试工具很好的集成：如果发现没有通过测试，则拒绝合并</li>
<li>PQM 也可设置向其他的系统报告，比如邮件列表</li>
</ul>
</div>
<div class="section">
<h4><a id="configmanager" name="configmanager">ConfigManager：树状分支树</a></h4>
<p><a class="reference" href="http://bazaar-vcs.org/ConfigManager">http://bazaar-vcs.org/ConfigManager</a></p>
<p>这个有点象svn中的external库，可把大的树分割为多个分支管理，然后通过这个组装起来。</p>
</div>
<div class="section">
<h4><a id="bzr-trac-trac" name="bzr-trac-trac">bzr-trac: 和trac集成</a></h4>
<p><a class="reference" href="http://progetti.arstecnica.it/trac+darcs/">http://progetti.arstecnica.it/trac+darcs/</a></p>
<p><a class="reference" href="https://launchpad.net/projects/bzr/trac-bzr">https://launchpad.net/projects/bzr/trac-bzr</a></p>
</div>
</div>
<div class="section">
<h3><a id="id3" name="id3">安装插件</a></h3>
<p>插件可在这里下载：</p>
<p><a class="reference" href="http://bazaar-vcs.org/PluginRegistry">http://bazaar-vcs.org/PluginRegistry</a></p>
<p>安装非常容易，解压缩后放到下面3个路径之一中就可以了:</p>
<ul class="simple">
<li><tt class="docutils literal"><span class="pre">site-packages/bzrlib/plugins</span></tt></li>
<li><tt class="docutils literal"><span class="pre">$HOME/.bazaar/plugins</span></tt></li>
<li>环境变量 <tt class="docutils literal"><span class="pre">BZR_PLUGIN_PATH</span></tt> 所指定的路径</li>
</ul>
<p>安装示例(bzrtools):</p>
<pre class="literal-block">
bzr branch http://panoramicfeedback.com/opensource/bzr/bzrtools ~/.bazaar/plugins/bzrtools
</pre>
<div class="section">
<h4><a id="email-sender" name="email-sender">email_sender插件</a></h4>
<p>位于: <a class="reference" href="http://people.ubuntu.com/~robertc/baz2.0/plugins/email">http://people.ubuntu.com/~robertc/baz2.0/plugins/email</a></p>
<p>在bazaar.conf或者branches.conf中设置:</p>
<pre class="literal-block">
post_commit=bzrlib.plugins.email.post_commit
post_commit_to = czug-checkins&#64;googlegroups.com
post_commit_sender = noreply&#64;czug.org
</pre>
<p>我发现这个email sender插件需要安装mail才能运行，于是做了一个hack，
将 <tt class="docutils literal"><span class="pre">__init__.py</span></tt> 模块中的 send 方法进行改进:</p>
<pre class="literal-block">
   def send(self):
       message  = &quot;&quot;&quot;To: %s
From: %s
Subject: %s

%s
&quot;&quot;&quot; % (self.to(), self.from_address(),self.subject(),
       self.body().encode('utf8'))

       import smtplib
       smtpserver = smtplib.SMTP('127.0.0.1', 25)
       # smtpserver.set_debuglevel(1)
       smtpserver.ehlo()
       smtpserver.sendmail(self.from_address(), self.to(), message)
       smtpserver.quit()
</pre>
<p>这是个很简单的改变，不需要mail命令的支持。但是，暂时还没有考虑中文编码。</p>
</div>
</div>
