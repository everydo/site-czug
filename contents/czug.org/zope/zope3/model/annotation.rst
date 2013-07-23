.. Contents::
.. sectnum::

附加数据
==================
很多数据，实际上分为主数据和辅数据。

比如一篇文章，正文是主数据。不同的应用，会附加特定的数据上去，比如文章的授权信息、评分信息、下载次数等。

不同的应用，会扩展不同的附加数据。

元数据metadata
=======================
是一个特殊的、用来说明主数据的附加数据。

比如，一篇文章，元数据包括作者、创建时间、修改时间、关键字等，这些信息，是来说明主数据的。

元数据是有标准依循的，比如图书馆领域的dublin core标准。

注解Annotations
===============================
注解是用于存储元数据的手段。可以将各种不同元数据附加到主数据上，可扩展。

有如下接口需要了解:

IAnnotatable
    主数据是否可以注解？这是一个Marker接口，只有实现了这个接口的对象，才能去适配使用下面的接口

IAnnotations
    存储各种元数据的总入口。比如::

        >>> ann = IAnnotations(obj)
        >>> ann['zopen.ratings']['count']
        233

所有存放在ZODB的数据，只要声明实现了IAttributeAnnotatable，就可以使用IAnnotations适配::

  <class class="mypackage.MyClass">
    <implements interface="zope.annotations.interface.IAttributeAnnotatable" />
  </class>

这些辅数据，照理说，是可以直接以属性存放在主数据上的。但是这会造成混乱：

- 不同的应用会在主数据上各自添加自己需要的属性数据
- 这样，一个主数据上可能存在几十甚至上百个属性，可能存在重名，属性的含义也不便理解。

因此，对于IAttributeAnnotatable的注解数据，实际会分组存放到一个__annotations__属性中。
每个分组用一个唯一的key来标识，比如zopen.ratings分组中存放内容评分相关的数据.

都柏林核心集
=====================
国际标准Dublin Core，最早用于图书馆信息索引

常用包括：

    title = TextLine(
    description = Text(
    created = Datetime(
    modified = Datetime(
    effective = Datetime(
    expires = Datetime(
    creators = Tuple(
    subjects = Tuple(
    publisher = Text(
    contributors = Tuple(

每个都支持多个值。数据存放在annotations中，这个分组的名字key大概是zope.app.dublincore。

zope.dublincore，提供了适配器：

- IZopeDublinCore适配器，提供了读取dublin core数据
- IWriteZopeDublinCore，写数据

需要特殊说明的是，zope.dublincore会自动更新creator、created、modified等字段

使用起来很简单, 读::

 >>> form zope.dublincore.interfaces import IZopeDublinCore
 >>> dc = IZopeDublinCore(obj)
 >>> dc.title
 'the title'
 >>> dc.description
 'my desc'

修改::

 >>> form zope.dublincore.interfaces import IWriteZopeDublinCore
 >>> dc_w = IWriteZopeDublinCore(obj)
 >>> dc_w.title = 'new title'

