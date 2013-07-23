================
Zope3包索引
================

来源
==========
- svn.zope.org上的包索引: http://wiki.zope.org/zope3/Zope3PackageGuide
- KGS包索引(和最新zope3兼容的包大全): http://wiki.zope.org/zope3/FAQGeneral#what-is-the-kgs-known-good-set

一些CMS
================
- tiks: 2005年的CMS, 已经死去？
- hivurt: 可切换到RDBMS的CMS，感觉不错
- z3ext

一些代码库
======================
- http://svn.objectrealms.net/browser/public
- http://svn.zope.org

介绍
============
photo
  转换为不同大小，提供多种查看视图

lovely.mount
  zodb多数据库支持包



文件管理
=====================

z3c.blobfile
  

z3c.extfile

zc.vault

搜索
===========
- zc.catalog: 
- zc.index: 对文件内容 (html /word/oo/pdf) 索引
- textindexng3: 全文索引
- hurry.query: 非常高级的查询

即时通讯
================
- jabbar

关系
===========
- lovely.relation 相互关系
- zc.extrinsicreference
- schooltool.relationship

小工具
============
- z3c.batching / schooltool.batching / zc.table / zorg.table: 分页处理

发布和容器漫游
==============
- z3c.traverser: 通过订阅的适配器，来实现漫游
- ore.wsgiapp: 指定任意的节点

用户认证
=============================
- ldapadapter: 提供一组更简单常规的方式访问LDAP
- ldapauth: 使用ldap方式的认证
- ldappas: 这个似乎比ldapauth更先进
- z3c.recipe.ldap: 用来部署openldap
- zc.winauth: 使用windows的认证系统
- z3c.authentication: cookie方式认证

权限分配
=================
可能并非基于角色！

- zc.sharing 
- schooltool.securitypolicy

Web 2.0社区功能
==============
对任意的内容进行tag, comment, rat 功能:

- lovely.tag
- lovely.rating
- zc.comment
- zorg.comment
- zorg.seen

数据库访问
========================
1. storm 

   有大项目实施的背景: launchpad，去年10月才开放出来

   http://grok.zope.org/documentation/how-to/grok-orm-with-storm

2. SQLAlchemy

   http://pypi.python.org/pypi/z3c.sqlalchemy/1.1.3

   似乎过于简单，仅仅是对sqlalchemy的简单封装
 
3. sqlos: 对sqlobjects的封装，似乎很不活跃！

    http://codespeak.net/z3/sqlos/

