---
created: 2005-12-14 14:25:22
creator: panjy
description: ''
title: Chapter13
---
Chapter 13
-----------

Developing with Archetypes
==========================
使用Archetypes开发( 张斌 译)

Archetypes is a framework for automating the development of products in Plone. Once a description has been written for a content type in Python, Archetypes handles almost everything else, including creating view and edit forms for the developer. This allows you to develop content types quickly and with a minimum amount of code. The less code written means a lower probability of bugs, less code to maintain as Plone changes, a quick development cycle, and generally lower costs.

Archetypes 是在plone中自动开发产品的一个框架. 一旦用python写成了对一个内容类型的描述,Archetypes就可以完成其他的所有事情,包括为开发者建立显示和编辑表单. 这可以让你用很小的代码快速地建立内容类型(content types).写少的代码意味着少了产生bug的可能性, 用少的代码去维护plone发生变化的影响,快速的开发周期,和通常少的费用.

Because the entire product is based upon this object description, it allows you to use tools to generate that product. For example, ArchGenXML<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=ArchGenXML" title="create this page">?</a>, which I'll cover later, allows you to generate a product in a Unified Modeling Language (UML) tool. You can then take the output of the UML model and pass it through ArchGenXML<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=ArchGenXML" title="create this page">?</a> to have a product instantly appear in Plone; you don't actually have to write any code. If you found that writing the product in Python in Chapter 12 was a little too much like hard work, then this chapter is something you'll appreciate.

因为整个产品是基于对象的描述,它允许你用工具去生成产品. 比如, ArchGenXML<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=ArchGenXML" title="create this page">?</a>,这个以后要提到, 是一个允许你用UML来生成产品的工具. 你可以把UML模型生成的结果送到ArchGenXML里面,一个产品就会立即出现在plone 中. 你事实上不需要写任何代码. 如果你在第12章"用PYTHON写产品"中发现不少事情难做,那么这一章会对你有帮助.

This doesn't mean Archetypes is right for every product; sometimes I've found Archetypes to be a little too much. For example, in one case my content type had one field, but about 16 different permutations on the data on that field were presented, which meant little of the existing Archetypes framework was used. That was an extreme case, however. Most of the time you'll find Archetypes is exactly what you need.

这并不意味着Archetypes对所有产品都合适; 有是我们也能发现Archetype的一点短处.比如,有一个例子中我们的内容类型有一个域, 但是在这个域中存在大概有16个不同的置换,(译者,原文举了一个代数学的问题)对之Archetypes框架没什么用.尽管这时一个极端的例子,大部分时候Archetypes正是你需要的.

Several people complain that Archetypes makes life a little too easy for developers, and of course it's hard to charge people much for work that can take ten minutes. Personally I've never had a problem with this, and Archetypes has gotten me out of many sticky situations when all of a sudden the specification changes from four content types to fourteen.

有些人抱怨Archetypes并不使开发者感到太容易了,当然也不是容易到十分种就能做很多事. 以个人经验看我从来没有遇到这样的问题, 并且Archetypes 使我在4-14个内容类型之上做特殊的修改没有感觉太困难.

One anecdote I've heard concerns a Web site development company. When the company visits clients, it takes along a programmer. As the client describes its needs, the programmer furiously types away into Archetypes. Before the meeting is finished, they can demonstrate a quick prototype of the working product to the client.

我曾经听到一个关于一家WEB网站开发公司的轶事.当公司访问客户时带了一个程序员. 程序员疯狂地玩起了Archetypes.当会访结束时,他们可以给客户演示一个能工作的快速原形产品.

Overall, most of the Plone development team has adopted Archetypes as the way to develop products, so it has a great deal of mind share and really has become the standard for Plone development. Some of Archetypes' other key features are as follows:

纵观大多数plone开发团队开始使用Archetypes做为开发产品的工具, 因此也就有很多观点可以共享并且他已经成为plone开发的标准. Archetypes的其他关键特征如下:


  - 自动建立显示和编辑页,因此你不用写任何页面模板代码

  - It automatically creates view and edit pages, so you don't actually have to write any page template code::


     [...1015 lines suppressed...]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=...1015%20lines%20suppressed..." title="create this page">?</a>
      db=# \d personsql
        Table "public.personsql"
        Column   | Type | Modifiers
      -----------+------+-----------
       uid       | text | not null
       parentuid | text |
       age       | int  |
       email     | text |
      Indexes: personsql_pkey primary key btree (uid)

The column for *age* has been created as an int, and the column for *email* has been created as text. These are mappings created inside *SQLStorage<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=SQLStorage" title="create this page">?</a>*; you could change these mappings to more appropriate ones if you so desired. The *uid* column is the unique ID for your object inside Plone. The *parentuid* is the *uid* of the parent object. These are all the unique IDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=IDs" title="create this page">?</a> for Archetypes that I've already mentioned. 

*age* 这一行建成int,*email*建成文本类型. 这些对应到*SQLStorage<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=SQLStorage" title="create this page">?</a>*里面; 你可以改变这些对应到你希望的相似的地方.*uid*行是Plone内对象的唯一ID.*parentuid*是父对象的*uid*. 这是我注意到的所有的Archetypes的唯一ID.

For example:

::

 db=# SELECT * FROM personsql;
           uid              | parentuid | age | email
 ---------------------------+-----------+-----+-------------------
  PersonSQL<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=PersonSQL" title="create this page">?</a>.2003-07-23.4935 |           | 30  | andy@gmane.org

That's it鈥攜our data is being persisted inside your relational database. No SQL needs to be written, and you can have all the advantages a relational database brings! Joel Burton has written an excellent how-to article on *SQLStorage<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=SQLStorage" title="create this page">?</a>* at *<a href="http://plone.sourceforge.net/archetypes/sqlstorage-howto.html">http://plone.sourceforge.net/archetypes/sqlstorage-howto.html</a>*. With kind permission, some parts of this section are based on Joel's document.

这是我们在你的关系数据库中长期存储的数据.不需要写SQL语句, 你就可以用关系数据库的所有先进性! Joel Burton为*SQLStorage<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter13/createform?page=SQLStorage" title="create this page">?</a>*写了一个很好how-to文档,在*<a href="http://plone.sourceforge.net/archetypes/sqlstorage-howto.html">http://plone.sourceforge.net/archetypes/sqlstorage-howto.html</a>*. 经他的允许,该章节一部分出自他的文档.

