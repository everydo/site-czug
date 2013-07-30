---
created: 2006-09-15 08:46:52
creator: panjy
description: 支持中日韩三语全文检索分词模块，采用二元分词算法
title: CJKSplitter
---
=========================================
CJKSplitter - 中日韩三语全文检索分词模块
=========================================
:作者: 潘俊勇 `润普公司 <http://www.zopen.cn>`__
:状态: 0.6版本已经完成

CJKSplitter 是一个基于ZCTextIndex支持中日韩三语的全文检索断字模块，他使用unicode存储索引书籍，使用了一个简单但可用的二词算法，而不是采用词典方式。和从前的词典方式比较，他的索引数据更大但匹配更精确。

特性
------------
* 支持多种编码，包括gbk/gb2312/gb18030/mbcs/big5/unicode/utf-8等，
      安装这个产品将包括三个ZCTextIndex的断字模块（无需修改代码配置）：

  - 'CJK splitter' : 支持unicode/utf-8编码，此断字方法和0.1版本兼容

  - 'CJK GB splitter' : 支持unicode/gb18030/gbk/gb2312/mbcs 编码.

  - 'CJK BIG5 splitter' : 支持unicode/big5/mbcs编码

* 支持Archetypes最新版本中的unicode存储方法，自动识别处理unicode编码

* 使用unicode进行存储，节省中文存储空间

* 支持英文模糊查询，如，可查 zop*

* 支持中文单字模糊查询

参考: 

- `位于zope.org上的产品主页 <http://www.zope.org/Members/panjunyong/CJKSplitter>`__

