---
created: 2012-03-30 16:11:44
creator:
description: 
title: 使用Traversal来配置Pyramid项目（五）URL分发、漫游的混合配置
---
==============================================================
使用Traversal来配置Pyramid项目（五）URL分发、漫游的混合配置
==============================================================

五、URL分发、漫游的混合配置
-----------------------------

除了单独使用URL分发、漫游两种方式之外，Pyramid还提供了混合模式，可以将两者结合在一起使用。在混合模式下，漫游只发生在当某条route规则匹配之后才会发生。

跟纯粹的基于漫游地应用对比，两者地区别在于：

* 纯粹漫游方式没有route定义；混合模式至少有一个。
* 纯粹漫游方式root resource 是全局地，通过root factory在启动时创建；混合模式的root resource是基于每条route定义的。
* 纯粹漫游方式漫游路径是整个PATH_INFO；混合模式是按route定义中的匹配字段匹配之后的一部分。
* 纯粹漫游方式view配置不需要指明route_name，view定位时也不需要考虑它；混合模式则需先匹配route_name。


1. 混合模式

在add_route定义时：

* pattern参数包含一个特殊的动态内容：\*traverse 或 \*subpath。
* factory参数指向一个特定的root factory。
* 如果没有factory参数，系统则采用全局的root factory（Configurator创建时传入）创建root对象。
* 如果没有全局的root factory，则采用默认的root factory。


2. 使用*traverse定义混合模式

例如：

.. code:: python

    config.add_route('home', '{foo}/{bar}/*traverse')
    config.add_route('home', '{foo}/{bar}/*traverse', factory='mypackage.routes.root_factory')

我们这里还是采用traversal案例中的root_factory，来看看下面的URL：
http://example.com/one/two/a/b/c
在这里例子中，漫游路径就是'a'，'b'， 'c'

如果我们定义如下view配置：
config.add_view('mypackage.views.myview', route_name='home')
则mypackage.views.myview将在以下条件下被调用：

* 匹配'home'为route名字
* 漫游之后的view名字为空
* context为任意对象

我们再来看下面的片段：

.. code:: python

    config.add_route('home', '{foo}/{bar}/*traverse',
                     factory='mypackage.routes.root_factory')
    config.add_view('mypackage.views.myview', route_name='home')
    config.add_view('mypackage.views.another_view', route_name='home',
                    name='another')

则mypackage.views.another_view将在以下条件下被调用：

* 匹配'home'为route名字
* 漫游之后的view名字为another
* context为任意对象

即http://example.com/one/two/a/another URL可以访问another view

3. 使用traverse参数定义混合模式

使用*traverse定义的话，只能将URL最后的部分作为漫游序列。如果想要更灵活呢？Pyramid还引入了一个traverse参数。

例如：

.. code:: python

    config.add_route('abc', '/articles/{article}/edit', traverse='/{article}')

这里traverse参数的语法跟pattern是一样的，而且traverse中地内容必须完全包含在pattern中。

如上例，访问URL /articles/1/edit，则article匹配之后的值是1。因此，漫游路径就是‘/1’。即在root 对象上以‘1’为参数调用__getitem__，如果存在1这个对象，则将其作为context，传入view。

如果pattern中有*traverse定义，则忽略traverse参数。

4. 使用 \*subath

如果想在route匹配时使用subpath，但又不想去执行漫游（漫游会产生subpath这个参数）。那么我们可以在pattern中使用subpath。

.. code:: python

    from pryamid.static import static_view

    www = static_view('mypackage:static', use_subpath=True)

    config.add_route('static', '/static/*subpath')
    config.add_view(www, route_name='static')
