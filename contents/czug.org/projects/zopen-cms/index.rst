---
created: ''
creator: ''
description: 简单的网站内容管理系统CMS，快速构建个性化的网站，轻松管理网站内容
title: 易度网站
---
.. include:: include.rst

缘由
--------

Plone网站内容系统，是专业作网站的。 很专业，很强大。

傻瓜的用户都能用。

但累了管理人员，新学一套新东西； 累了开发人员，开发那么多东东； 累了集成人员，多了一个新东东； 累了网站定制人员，Plone有自己的定制方法； 累了外观风格定制人员，要用Plone的方法来作皮肤。

需要那么复杂吗？ 易度CMS就是试图解决这个问题。

易度CMS
---------

易度的解决方法：
~~~~~~~~~~~~~~~~~~~~~~~

   1. 不需要管理后台，用文件系统来取代
   2. 不需要php/asp/jsp/zpt，直接扩展reStructureText，来制作动态页面
   3. 采用新技术wsgi/deliverance，分离外观风格定制 

带来的好处：
~~~~~~~~~~~~~~~~~~~~

   1. 内容暴露在文件系统中了，你可以用svn/grep/vi/ulipad/ftp/rsync，你不需要学什么新知识就知道怎么管理内容了！
   2. 网站内容的编辑人员，也可以做动态页面了！
   3. 做皮肤的人，不需要麻烦开发人员协助了 

案例
~~~~~~~~~~~~~~~~~

    * 易度网： http://everydo.com
    * 易度书籍网： http://docs.everydo.com 

正在改造：
~~~~~~~~~~~~~~~~

    * 中国Zope用户社区： http://czug.org
    * 润普公司网： http://zopen.cn 

底层技术
~~~~~~~~~~~~~~~~~~~~

    * repoze.bfg
    * deliverance
    * zopen-frs: http://code.google.com/p/zopen-frs 


