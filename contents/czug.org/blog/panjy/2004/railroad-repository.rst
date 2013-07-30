---
created: 2004-09-17 00:22:14
creator: panjy
description: 针对所有CMS系统中大文件存储的命门缺陷，Infrae发布了"铁路"存储服务器(Railroad Repository)，和其他的CMS系统配合工作
title: “铁路”存储服务器
---

 <p><a href="http://www.infrae.com/products/railroad">Railroad
 Repository</a>是一个基于标准的、用于保存大的二进制文件以及其元数据的存储服务器。Railroad并不是一个Zope产品，而是基于apache+mode_python的，元数据保存在postgresql中。<br />
 <br />
 大文件是不适合存储在ZODB中的，这样会导致系统根本不可用。Railroad就是针对这个问题的一个方案。另外，由于使用的是服务器技术，支持多个client同时访问，因此对于ZEO架构也能够很好的支持。<br />
 <br />
 可使用webdav协议访问Railroad Repository, dublin核心集数据可通过Open Archives Initiative
 Protocol for Metadata Harvesting (OAI-PMH)进行访问。<br />
 <br />
 这里还有一个<a href="http://cosmos.infrae.com:4080/rr/present/splash/">幻灯片介绍</a>。</p>
