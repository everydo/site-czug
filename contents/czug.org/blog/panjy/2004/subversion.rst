---
created: 2004-12-11 14:00:23
creator: panjy
description: Subversion是超越CVS的、支持事务的、高性能的版本控制系统，和zope/Plone也有一些姻缘
title: 使用Subversion进行版本管理
---

 <p>目前Zope/Plone的代码均采用<a href="http://subversion.tigris.org/">subversion</a>来管理，而且<font face="Arial" size="2">已经 <a href="http://plone.org/events/conferences/1/archive/PloneSVN2003.pdf">可以和Plone集成</a>，而且已经有了使用svn做为ZODB存储介质的产品。在windows下有方便使用的</font><font face="Arial" size="2"><a href="http://tortoisesvn.tigris.org/">windows客户端工具</a>。<br /></font><br />
 这里记录一下subversion的基本操作，更详细的内容可参加<a href="http://freebsd.sinica.edu.tw/%7Eplasma/svnbook/">Subversion中文手册</a>。</p>
 <ol>
 <li>得到帮助<br />
 使用svn help可得到具体的帮助<br /></li>
 <li>创建SVN库<br />
 此操作一般由svn用户创建：<br />
 svnadmin create --fs-type [fsfs|bdb] /home/svn/NewResp</li>
 <li>导入文件夹下的数据到库中<br />
 类似于copy，应该使用非root用户操作：<br />
 svn import /usr/local/zopeinstance/PloneMailBoxer
 file:///home/svn/NewResp/PloneMailBoxer<br />
 注意：导入后一般需要把本地的程序删除后，再checkout</li>
 <li>checkout<br />
 svn checkout <a href="file:///home/svn/NewResp/PloneMailBoxer">file:///home/svn/NewResp/PloneMailBoxer</a>
 PloneMailBoxer<br />
 注意，必须写目录</li>
 <li>编辑修改操作</li>
 <li>添加一个文件到svn<br />
 svn add filename<br />
 注意不需要写库的url</li>
 <li>从svn中删除一个文件<br />
 svn delete filename</li>
 <li>比较当前更改<br />
 svn diff</li>
 <li>比较文件状态<br />
 svn status</li>
 <li>获取最新版本<br />
 如果别人也更改了其他的文件，需要使用此命令得到其他人的最新更改。<br />
 svn update</li>
 <li>如果update发生冲突，svn resolve</li>
 <li>取消修改<br />
 svn revert</li>
 <li>提交修改<br />
 svn commit：全部提交<br />
 svn commit filename 提交某个文件</li>
 </ol>
 <p>SVN的管理：</p>
 <ol>
 <li>配置邮件通知</li>
 <li style="list-style-type: none; list-style-image: none; list-style-position: outside;">
 <ol>
 <li>将库中hooks/post-commit.tmpl改名为post-commit，并让其有执行权限</li>
 <li>最后一行改为：<br />
 /usr/lib/subversion/hook-scripts/mailer/mailer.py "$REPOS" "$REV"
 /var/spool/svn/mailer.conf</li>
 <li>修改mailer.conf，主要包括：<br />
 smtp_hostname / smtp_username / smtp_password / to_addr /
 subject_prefix</li>
 </ol>
 </li>
 <li>库的热备份(todo)</li>
 <li>用户访问权限控制(todo)<br /></li>
 </ol>
