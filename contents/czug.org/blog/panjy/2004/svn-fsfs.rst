---
created: 2004-10-25 23:53:38
creator: panjy
description: '"FSFS" 采用文件系统的方式, 替代原来的基于Berkeley DB的实现.'
title: fsfs：使用文件系统实现subversion的存储
---

 <p>和cvs一样，使用文件系统来保存<a href="http://subversion.tigris.org/">subversion</a>的数据库，这是<a href="http://svn.collab.net/repos/svn/trunk/notes/fsfs">fsfs</a>的目标。<br />
 <br />
 这样，对于我来说，管理要简单很多。可扩展性也更强。<br />
 <br />
 fsfs在subversion 1.1.1中已经包含了；从subversion的<a href="http://subversion.tigris.org/roadmap.html">Roadmap</a>上得知，svn也将提供关系数据库的存储接口。</p>
