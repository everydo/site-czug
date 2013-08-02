---
created: 2012-03-27 18:15:20
creator:
description: 
title: 使用Traversal来配置Pyramid项目（一）Resources 
---

===============================================
使用Traversal来配置Pyramid项目（一）Resources 
===============================================

本节资料整理改编自Pyramid官方网站，部分内容按理解进行了增删整理和归纳，以便结构上更清晰。
Pyramid 1.3官方文档对于Traversal、resource、view等的说明比较分散凌乱，结构上不是很清晰（个人感觉），因此这里重新编排这部分内容，如果有人不能认同，请参阅Pyramid官方网站（http://docs.pylonsproject.org/projects/pyramid/en/1.3-branch/index.html）。

在当前网站建设中，我们经常可以看到网站地图这样一个功能，通过层级关系，将网站功能逐次列出来，其实我们仔细看的话，我们可以发现，严格来说，网站地图（特别是静态网站）也是一个树状结构的图，通过一层一层的目录结构形成一个URL，如http://127.0.0.1/photos/sports/1123.jpg，http://127.0.0.1/photos/sports/1120.jpg，http://127.0.0.1/photos/tour/1212.jpg，我们将这些URL按'/'分解，就可以看到，每一个URL其实就是在这颗树中从根到叶子节点的一次查询过程。

这就是Traversal基本思想的来源。这棵树中的所有节点就是Traverse所用到的resource。

一、Resources
----------------

1. 什么是resource

在Pyramid中，resource就是指一个app对应的结构树中的一个节点。在Pyramid中，即便从不使用，也会默认生成一个root resource。这个root节点就是这个resource树的根节点。一棵resource树就是用于表达网站结构一个类似递归字典结构。

如果使用Traversal方式，Pyramid将会根据PATH_INFO由根开始查找这棵resource树，直到找到一个resource（PATH用完或找不到子节点），Pyramid即肯定该resource为上下文（context），并用这个context和request中其他数据来定位一个合适的view。

如果使用URL分发方式，通常开发者将不会直接接触到resource树。在这种模式下，resouce树通常只有一个根节点，用来保存一些安全认证信息。

在很多情况下，参与resource树构建的不仅仅只有网站结构信息，还会有网站本身数据模型的数据。

根据树的定义，我们可以将resource分成容器节点、叶子节点两种。

针对Pyramid这种类似递归字典的数据结构，也可以表示为容器节点必须带__getitem__方法，通过调用这个方法传入名字可以得到对应的子节点，如果传入的名字查找不到相应的子节点，必须抛出KeyError异常。而叶子节点则没有__getitem__方法，即便有，也必须总是抛出KeyError异常。

按照上面的定义，我们可以简单构造如下resource树：

.. code:: python

    class Resource(dict):
        pass

    def get_root(request):
        return Resource({'a': Resource({'b': Resource({'c': Resource()})})})

在这个例子中，get_root就是一个root_factory，它返回一个Resurce，我们可以命名它为root，那么root['a']就是一个容器节点，里面包含一个key为'b'的子节点root['a']['b']，这个root['a']['b']也是一个容器节点，里面包含一个key为'c'的子节点root['a']['b']['c']，而root['a']['b']['c']则是一个叶子节点。

如果我们将这个get_root作为Pyramid Configurator的root_factory参数，那么当一个URL访问如/a/b/c来临时，Traversal将找到这个key为'c'的对象，并用它与request来定位view。

在这里例子中，为了简化程序，我们将resource树中的所有节点都定义成了同一种类型，在真实环境中，每一个节点都可以是任意类型。


2. 节点的位置感知

为了URL生成，定位，安全以及traversal API等因素的需要，Pyramid规定resource树中的所有resource必须是可感知位置的，即每一个节点必须带__parent__、__name__两个属性。

__parent__属性永远指向该节点的父节点。__name__则是一个名字以供其父节点通过__getitem__函数来查找。

root resource中的__name__必须为空字串，__parent__为None。

如一个resource从root resource中通过__getitem__返回，则该resource的__parent__必须指向root resource，__name__必须跟调用__getitem__是的参数一致。即从任何一个节点都可以通过递归__parent__得到root resource。


3. 通过resource生成URL

一旦每一个resource都可以感知位置之后，我们就可以通过pyramid.request.Request.resource_url()来生成访问该resource的URL。
如root resource有一个名字为a的子节点resource_a，那么调用request.resource_url(resource_a)即可生成http://example.com/a/这样一个URL。注意，这里产生的URL最后带一个'/'。这是因为resource指代的是resource 树这个层级结构中的一个位置。

resource_url也可以带参数，如request.resource_url(resource_a, 'foo', 'bar')可以生成http://example.com/a/foo/bar这样的URL。注意，这里最后是不带'/'的。

或者传入query参数，如request.resource_url(resource_a, query={'a':'1'})可以生成http://example.com/a/?a=1


4. 跟resouce相关的一些api

- pyramid.traversal.resource_path(resource) 返回不带域名的URL

- pyramid.traversal.find_resource(resource, '/path') 通过path找到resource，可以使用绝对路径（前带'/'），或相对路径

- pyramid.location.lineage() 产生一个包含其自身及依次父节点的生成器

- pyramid.location.inside(b, a) 检查b是否是a的子孙。

- pyramid.traversal.find_root() 找到根节点

- pyramid.traversal.find_interface() 通过接口查找resource
