---
created: 2005-02-21 17:03:57
creator: panjy
description: windows支持采用unicode的方式访问文件名，Python2.3开始，在这方面也有较好的支持。
title: Python的Unicode方式的文件名访问
---
<p>Python2.3开始，文件名的unicode访问能力已经大大增强了。<br /><br />- 所有的文件访问接口都支持unicode字符串；如果传入unicode路径，os.listdir(path)返回unicode文件名；新增了os.getcwdu()，获得unicode的当前路径。<br />- 在windows上，直接使用windows自身的unicode API接口<br />- 在linux等不支持unicode的操作系统上，自动采用sys.getfilesystemencoding()进行编码转换<br /><br />  在操作系统中设置LANG='zh_CN.gbk'等，可改变sys.getfilesystemencoding()的值</p>