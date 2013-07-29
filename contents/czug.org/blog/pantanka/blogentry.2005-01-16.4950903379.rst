---
created: 2005-01-16 13:40:36
creator: patanka
description: plone不断的给我惊喜，这一次是和domino的集成。
title: 利用ldap与domino集成
---
<p>
 企业已经构建了基于domino的办公系统，也搭建了基于plone的内部新闻咨询平台。用户需要记住不同的用户名和密码，实在很麻烦。如果能让plone使用domino的用户目录就好了。</p>
 <p>我们首先启动了domino的ldap服务。然后按照<a href="http://plone.org/documentation/howto/ldap-in-windows">这篇文章</a>的指导（我们的plone运行于win2000）设置好了python-ldap和ldapuserfolder，之后又照着
 <a href="http://www.czug.org/Members/yaojian/ad_luf/view">这篇文章</a>解决了中文支持，于是一切ok了!</p>
 <p>现在用户可以用相同的用户名和密码登陆两个系统，方便了很多。又一次感受到了plone给我带来的惊喜，不知道下一次又会是什么。</p>
 <p>&nbsp;</p>