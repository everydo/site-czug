---
created: ''
creator: ''
description: Model图；通过Traversal来处理请求；NotFound错误；Traversal示例；Traversal存在的问题；Unicode和Traversal
title: Traversal漫游
---
==================
Traversal漫游
==================

Model图；通过Traversal来处理请求；NotFound错误；Traversal示例；Traversal存在的问题；Unicode和Traversal

.. include:: include.rst

.. _traversal_chapter:

:翻译:  elias.soong at gmail.com
:校正: 潘俊勇

Traversal漫游
====================

:mod:`repoze.bfg` 的 *Router* 解析与访问请求相关联的URL，并且漫游URL中的路径片段所组成的图（graph）。
根据这些路径片段， :mod:`repoze.bfg` 会漫游 *model graph* （model所组成的图），
用以寻找上下文对象（ :term:`context` ）。
然后它试着根据上下文的类型 *type* (通过接口 :term:`interface` 指定)去寻找 :term:`view` 。
如果 :mod:`repoze.bfg` 找到了一个上下文对象的 :term:`view` ，就会调用它并且向用户返回应答信息（response）。

Model图（model graph）
--------------------------------

当应用程序使用 :term:`traversal 漫游` 来将URL地址映射到代码时，应用程序必须提供一个 *Model图* 给 :mod:`repoze.bfg` 。

用户通过 *路由* （router）与基于 :mod:`repoze.bfg` 的应用程序进行交互，
这个应用仅仅是一个有趣的 :term:`WSGI` 应用。
在系统启动时，路由被配置为一个代表Model图根结点的单个对象。
所有的traversal漫游将从这个根对象开始。这个根对象通常是一个 *映射* （mapping）对象（比如一个Python字典）。

图中包含的各个节点item与很多其他框架中使用的 :term:`model` 对象概念是类似的
（并且 :mod:`repoze.bfg` 同样也把它们称为model）。它们通常是Python类的实例。

Model图由容器结点（ *container* nodes）和叶结点（ *leaf* nodes）组成。
容器结点和叶结点只有一点不同：容器结点有一个 ``__getitem__`` 方法而叶结点没有。
选择 ``__getitem__`` 方法作为区分这两类结点的显著差别，因为是否存在这个方法也是Python自身用来确定一个对象能否作为容器的一般方式。

根据传递给 ``__getitem__`` 的名字，
容器结点被假定认为是能返回一个子结点，或抛出 ``KeyError`` 。

叶结点一级的实例是不需要有 ``__getitem__`` 方法的。
如果叶结点级别的实例已经有了 ``__getitem__`` 方法（由于一些历史原因），
你应该继承这些结点类型并且让它们的 ``__getitem__`` 方法简单地抛出 ``KeyError`` ，
或者干脆不用它们并且想想别的办法。

通常，traversal漫游的根是一个容器结点，因此也就包含了其他结点。
然而，它不需要真是一个容器。根据你的需要，Model图可以很浅也可以很深。

Traversal漫游在何时停止？2种情况，
要么 :mod:`repoze.bfg` 沿对象图到达一个叶结点级别的Model实例，
要么URL所提供的路径片段用光了。最后漫游所停止的对象就成为了上下文对象context。

:mod:`repoze.bfg` 如何用 Traversal漫游来处理一个请求
---------------------------------------------------------

当用户从你基于 :mod:`repoze.bfg` 的应用程序中请求一个页面时，系统用这样的算法来确定要执行哪段Python代码：

#. 页面请求request以标准 :term:`WSGI` 请求的形式，
   被提供给 :mod:`repoze.bfg` 的路由（"router"），
   这个路由器再次封装为WSGI环境和一个 ``start_response`` 可调用函数。

#. 路由根据WSGI环境建立 :term:`WebOb` 请求对象（request object）。

#. 路由使用WSGI环境上下文的 ``PATH_INFO`` 变量来确定要漫游的路径片段。 
   ``PATH_INFO`` 开头的斜杠（/）被去掉，
   并且剩下的路径片段根据斜杠字符进行拆分（split）来组成一个漫游序列，
   这样一个 ``PATH_INFO`` 变量值为``/a/b/c``的访问请求就映射成漫游序列
   ``[u'a', u'b', u'c']`` 。注意序列中的每一个路径片段通过UTF-8解码
   被转换为Unicode（如果解码失败，则抛出``TypeError``）。

#. :term:`Traversal` 漫游从根对象开始。对漫游序列 ``[u'a', u'b', u'c']`` ，
   根对象的 ``__getitem__`` 被传入名字 ``a`` 后调用。
   Traversal漫游在序列上继续前进。在我们的例子里，
   如果根对象的 ``__getitem__`` 被传入名字 ``a`` 调用后返回一个对象
   （称作"对象 ``a`` "），该对象的 ``__getitem__`` 接着被传入名字 ``b`` 后调用. 
   如果对象A查找名字 ``b`` 的时候返回了对象b，
   那么"对象 ``b``"的 ``__getitem__`` 接着会被查找名字 ``c`` ，并且可能返回"对象 ``c``"。

#. Traversal漫游在出现以下情况时结束： a) 整个路径都处理完了；或者 b) 当图中的任意一个元素从它的``__getitem__``中抛出``KeyError``；或者 c) 当周游到的非结束路径元素没有 ``__getitem__`` 方法时（会导致一个 ``NameError`` ）；或者 d) 当任意路径元素以字符集 ``@@`` 为前缀时（表示 ``@@`` 标记后面跟着的字符应当被处理为视图名称"view name"）。

#. 当漫游因为任意理由在前一步骤结束时，漫游过程中找到的最后一个对象被视为上下文对象context。
   如果在周游结束时路径已经被用尽，则"view name"被认为是空字符串（ ``''`` ）。但是如果路径在周游结束前没有用尽，剩下的路径元素中的头一个会被当作视图的名字"view name"。

   任何在"view name"后面的路径元素被视为子路径（ :term:`subpath` ）。
   子路径总是一个来自 ``PATH_INFO`` 、在漫游结束后剩下来的字符串序列。
   例如，如果 ``PATH_INFO`` 是 ``/a/b`` 并且根返回"对象 ``a``"，并且"对象 ``a``"
   接着返回"对象 ``b``"，路由就认为上下文context是"对象 ``b``"
   而view name是空字符串，并且子路径是空序列。
   另一方面，如果``PATH_INFO``是``/a/b/c``且"对象 ``a``"可以找到
   但对名字 ``b`` 抛出了 ``KeyError`` ，路由认为上下文context是 "对象 ``a``"，
   view name是 ``b`` 且子路径是 ``['c']`` 。

#. 如果 :term:`security policy` 被配置了，路由会进行权限查找。
   如果对view name和当前请求所给出的上下文对象找到了权限声明，
   系统会咨询安全策略，是否“当前用户”（也是由安全策略决定的）能够执行该行为。
   如果可以的话，继续处理；否则就抛出 ``HTTPUnauthorized`` 错误。

#. 配备了 上下文对象、view name和子路径后，
   路由器router进行一个视图查询（view lookup）。系统会根据view name和上下文对象，
   在 :mod:`repoze.bfg` 应用注册表（ :term:`application registry` ）中查找视图。
   如果能找到一个视图函数，就会传入上下文对象context和访问请求request来调用它。
   它返回响应对象response，也就是反向输出流（fed back upstream）。
   如果视图没找到，会构造并返回一个一般的WSGI ``NotFound`` 应用。

任何一种情况下，处理结果都是通过 :term:`WSGI` 协议返回逆向数据流（upstream）。

.. _debug_notfound_section:

NotFound错误
---------------

由于应用注册表错误配置，能调试非预期的 ``NotFound`` 错误会非常有用。
为此，可以使用 ``BFG_DEBUG_NOTFOUND`` 环境变量或者 
``debug_notfound`` 配置文件设置。
视图没能找到的细节将被打印到stderr，并且在浏览器上也会展现同样的信息。
参考 :ref:`environment_chapter` 获取关于在哪儿以及如何设置这些值的详细资料。

一个Traversal漫游的例子
-------------------------------

假设用户要求访问 ``http://example.com/foo/bar/baz/biz/buz.txt`` 。
也就是说，这个例子请求的 ``PATH_INFO`` 是 ``/foo/bar/baz/biz/buz.txt`` 。
我们进一步假设，当请求进来时，我们正在漫游如下的图::

 /--
    |
    |-- foo
         |
         ----bar

现在我们讲解都发生了什么：

 - bfg漫游根结点，想找到foo，而且也确实找到了。

 - bfg漫游foo，想找到bar，并再次成功找到了。

 - bfg漫游bar，想找到baz，结果没找到（当要求访问baz的时候，'bar'抛出 ``KeyError`` ）

事实是它在这没找到"baz"并不表示出错了，而是意味着：

 - 上下文对象context将是bar（因为上下文对象是漫游过程找到的最后一项）。

 - "view name"是 ``baz``

 - 子路径"subpath"是 ``['biz', 'buz.txt']``

因为"bar"是上下文，所以bfg检查它的类型。
如果我们说bfg发现上下文"bar"是``IBar``类型的
（因为"bar"正巧有一个附属于它的属性说明这是``IBar``类型）。

用"view name"（"baz"）和类型信息，bfg询问应用注册表
（ :term:`application registry` ）（通过 ``configure.zcml`` 文件单独配置的）如下问题：

 - 请为我找到以"baz"作为名字并且可以用作 ``IBar`` 类型的 :term:`view` （在一些体系下也称为 *controller* ）。

假设没找到匹配的 :term:`view` 类型，它会接着返回一个 ``NotFound`` 。请求结束，所有人都很伤心。

但是！对于如下视图::

 /--
    |
    |-- foo
         |
         ----bar
              |
              ----baz
                     |
                     biz

用户请求 ``http://example.com/foo/bar/baz/biz/buz.txt`` 的话

 - bfg漫游foo，想找到bar，而且找到了。

 - bfg漫游bar，想找到baz，也找到了。

 - bfg漫游baz，想找到biz，也找到了。

 - bfg漫游biz，想找到"buz.txt"，结果没找到。

事实上，在这没找到"buz.txt"并不表示出错了，而是意味着：

 - 上下文是biz（因为上下文是漫游过程中找到的最后一个元素）

 - "view name"是"buz.txt"

 - 子路径"subpath"是空列表[]

因为是上下文，bfg检查"biz"的类型。比如说它发现上下文对象"biz"是 ``IBiz`` 类型的
（因为"biz"正巧有一个附加属性说明它是个 ``IBiz`` ）。

根据这个"view name"（"buz.txt"）和类型信息，bfg向应用注册表进行如下查找：

 - 查找名字为"buz.txt"且可以用于 ``IBiz`` 类型的 :term:`view` （在一些体系下也称为 *controller* ）。

如果结果是：“有一段代码用来处理这种情况”，并且返回了一个 :term:`view` ，
它把"biz"对象当作上下文对象context，并且把当前的 :term:`WebOb` :term:`request` 当作请求，
最后返回响应。

这儿有两种特殊情况：

- 漫游过程中你会经常以空字符串作为"view name"停止。
  这表示 :mod:`repoze.bfg` 应该查找默认视图（default view）。
  这里默认视图是一种没有使用名字来注册、或是以空字符串作为名字注册的视图
  （ :term:`view` ）。

- 如果任意路径片段元素以特殊字符 ``@@`` 开头（把它们想象成护目镜），
  该片段会立即被当作"view name"并且在此处停止漫游。
  这允许你在图中可能会有同名Model实例的情况下无二义性地定位视图。

漫游相关的影响
------------------------------

视图总可以通过 :term:`request` 对象的 ``subpath`` 属性得到子路径。
它是包含0个或多个元素的列表（都是一些字符串）。

视图总可以通过 :term:`request` 对象的 ``view_name`` 属性来得到view name。
它是一个字符串（如果我们在渲染一个默认视图的话，这可能是空字符串）。

视图总可以通过 :term:`request` 对象的 ``root`` 属性 来得到根结点。
它是漫游起始处（根）的Model对象。

视图总可以通过 :term:`request` 对象的 ``context`` 属性来得到上下文。
它将是当前请求所隐含的上下文对象。

Unicode和漫游
---------------------
漫游机制在把路径元素传递给Model对象的 ``__getitem__`` 之前，默认会将 
``PATH_INFO`` 中的每个路径元素按其原始字节串表示（ ``str`` 类型）
以UTF-8编码解码成Unicode。
如果 ``PATH_INFO`` 中的任意路径片段无法用UTF-8解码，则抛出TypeError错误。

:ref:`environment_chapter` 中名为 ``unicode_path_segments`` 的选项提供了
一种机制，可以禁用这一行为，也就是让漫游机制把路径片段以原始字节串对象的
形式传递给所有Model的 ``__getitem__`` 方法。
