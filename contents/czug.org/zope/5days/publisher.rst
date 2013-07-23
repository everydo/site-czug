---
created: 2010-06-26 12:24
creator: 潘俊勇
description: zope的非常柔性的url寻址规则，适合大型系统
title: 对象发布
---
=======================
对象发布
=======================

zope似乎天然就是为大型系统设计的。连url的设计上也是这样。

小型的系统，不必为url的设计发愁：比如在django里面弄几个正则表达式，就OK了。

但是一旦系统复杂，可不断扩展，甚至允许用户自行PaaS开发，那整个url系统就复杂了。

这一章，就将zope的url映射的故事。

.. Contents::
.. sectnum::

Zope是什么？
=====================
zope这个名字是什么？10多年前，zope公司给了一个非常搞的解释：

zope = z object publish environment

也就是说是一个所谓的 Z 对象发布环境。当然，这个Z是没有含义的（社区曾经出现很长时间的Z字母崇拜，俺也未能幸免）有意义的是后面的那个对象发布环境。

10多年过去了，zope这个昨日之星风光不再了。但这个仍然是zope最具特色的特性之一。zope的颠覆者，也就是repoze社区搞了一个轻量级的开发框架bfg，就仍然采纳了对象发布这一特性。

天然的restful风格
======================
且在深入谈对象发布的含义之前，我们看看REST风格的API调用是怎么样的。

刚刚找到infoq上介绍REST的一篇文章：

http://www.infoq.com/cn/articles/rest-introduction

典型的REST风格的url是::

    http://example.com/customers/1234
    http://example.com/orders/2007/10/776654
    http://example.com/products/4554

REST风格很强调URL按照资源来组织。这样的URL被认为是好的URL。

这个URL，对于Zope来说，叫做“撞到枪口上来了”。因为上面url的每段地址，比如customers、1234，都可能正好是zope的一个对象，而且是树状存放在zodb数据库中的。这个url，正好是对象的地址！就如同我们资源管理器中，某个文件的地址一样。

既然如此，我们发现：zope完全省去了url映射规则这一说法，完全不必事先定义某个正则表达式，只需按照对象的路径来写URL就可以了。整个 URL路径，就是对zodb对象的一个寻址而已。

显示页面
================
那最后是如何显示相应的页面给用户的呢？这就要用我们前面在组件架构里面说的适配器的概念了：

zope会默认将找到的model对象(资源)，以及request对象一起进行适配，去找一个叫做index.html的页面视图适配器，然后调用它将结果输出即可。

其实上面的url是缩写，完整的是::

  http://example.com/customers/1234/++view++index.html

或者缩写::

  http://example.com/customers/1234/@@index.html

这里的++view++，表示对象发布器进行路径解析的时候，不要再在zodb里面去找了，需要切换到另外一个叫做view的名字空间里面找 index.html，结果就是找到了index.html的视图。后面的那个@@，表示一双可爱的大眼睛，眼睛就是视图嘛(感谢zope提供的冷笑话)。

比如编辑页面，url可能就是这样的::

  http://example.com/customers/1234/++view++edit.html

或者缩写::

  http://example.com/customers/1234/@@edit.html

名字空间
===============
如果希望切换语言的版本，url会变成这样::

  http://example.com/++lang++zh/customers/1234/@@edit.html

这里，++lang++zh，表示先到语言的名字空间里面找到zh的对象，然后切换到中文。

呵呵。到这里，您再理解下易度扩展开发的url::

   http://example.com/customers/1234/++script++zopen.demo.index

这里的script名字空间，表示需要到易度定制软件包里面找东东，具体到zopen.demo软件包里面，找到index的python脚本进行执行。

理解对象发布
===================
对象发布的概念，其实就是这么简单。最主要的的特点，通过一套统一的规则，让url映射非常可扩展。这对一般的应用可能不必要，但对于Plone 或者我们易度这样可扩展的系统来说，这个其实是个关键特性的。

另外，我说的是针对zope3的，zope2里面比较复杂，有些烂棉絮，就不说了。

我自己对这个对象发布，唯一的意见是对这个 ++ 比较不喜欢，因为+已经在URL里面有特殊的含义了：空格encode之后就是+的。这对url处理必须很小心。



