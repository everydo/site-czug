---
created: 2005-09-22 08:36:55
creator: panjy
description: 内容管理系统，到底应该选择关系数据库，还是ZODB来存储数据？
title: ZODB，还是RDBMS?
---
<p>首先是Florent提出 <a href="http://blogs.nuxeo.com/sections/blogs/florent_guillaume/2005_08_11_object_relational">支持O/R映射应该是ECM项目的一个重点</a> , 让数据保存在关系数据库中，他的意见是:</p>

<ul>
<li>关系数据库更成熟，性能更高
- 关系数据库的外部接口更好
- 关系数据库更容易查询分析
- ...</li>

</ul>
<p>这可是一个大的挑战，因为ZODB是Zope/CMF/Plone依赖多年的利器，是Zope/Plone能够快速前行的基础。</p>
<p>一石激起千层浪，社区讨论比较激烈，这两个帖子的意见比较中肯：</p>

<ul>
<li><a href="http://mail.zope.org/pipermail/zope3-dev/2005-August/015278.html">zope公司gary从zope3角度的意见</a><p>  O/R是有代价的，ZODB的技术是值得相信的，ZODB有他的优势，很多RDBMS也在对象化。O/R只是在某些特例情况下必须。</p>
</li>
<li><a href="http://www.palladion.com/home/tseaver/obzervationz/ecms_rdbms_vs_zodb_20050823">tseaver从cmf角度的意见</a><p>  zodb的一些缺点是可以解决的；使用RDBM，将使得开发速度急剧下降；既便是SQL的查询也不能盲信：一旦表结构发生变化，后面的查询都需要更改，关系数据库也需要诸如“数据仓库”的附加索引支持；</p>
</li>

</ul>
