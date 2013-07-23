
对象发布原理

对象的存储
====================
对象存储在ZODB数据库上，按照容器关系树状存储的。

对象定位
============
URL 到对象的映射

对象是在Model对象，根据容器，逐曾定位的

容器地址
=====================
得到地址::

  from zope.traversing.browser import absoluteURL

  absoluteURL(obj, request)

