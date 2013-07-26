---
created: ''
creator: ''
description: 使用bfg的单元测试api
title: 单元测试
---
===============
单元测试
===============

使用bfg的单元测试api

.. _unittesting_chapter:
.. include:: include.rst

:翻译: zoomq
:校核: 潘俊勇

单元测试
============

对 `repoze.bfg` 应用的单元测试，建议使用Python 的 ``unittest`` 模块.  
`repoze.bfg` 本身也提供了一系列工具支持轻松的组织单元测试.
特别是你的代码调了 `repoze.bfg` 关联框架函式时，测试将易常有用;

使用 ``repoze.bfg.testing`` 接口
------------------------------------

``repoze.bfg.testing`` 模块为单元测试提供了专用函式.
例如, 设想我们要对以下 `repoze.bfg` 视图函式进行单元测试.

.. code-block:: python
   :linenos:

   def view_fn(context, request):
       from repoze.bfg.chameleon_zpt import render_template_to_response
       if 'say' in request.params:
           return render_template_to_response('templates/submitted.pt',
                                               say=request.params['say'])
       return render_template_to_response('templates/show.pt', say='Hello')

如果没有调用任何ZCML而运行时,这个View函数将抛出一个错误.
一般 `repoze.bfg` 应用启动时,都会查找一个应用包含的一个  ``configure.zcml`` 文件, 然后根据里面的信息创建一个应用注册表。
但是如果应用注册表没有创建和展开，(如: 在 ZCML中的 ``view`` 指令), 比如在进行单元测试时调用的时候，bfg的API调用极有可能失败.

``repoze.bfg`` 的测试接口, 允许你不通过实际应用的ZCML配置, 使用一个测试框架来模拟各种应用注册表注册.
例如, 当你想测试前述 view_fn (假设其位于 ``my.package`` 中)，
你只需使用测试接口写个测试案例:

.. code-block:: python
   :linenos:

   import unittest
   from zope.testing.cleanup import cleanUp
   from repoze.bfg import testing

   class MyTest(unittest.TestCase):
       def setUp(self):
           cleanUp()

       def tearDown(self):
           cleanUp()
       
       def test_view_fn_not_submitted(self):
           from my.package import view_fn
           renderer = testing.registerDummyRenderer('templates/show.pt')
           context = testing.DummyModel()
           request = testing.DummyRequest()
           response = view_fn(context, request)
           self.assertEqual(renderer.say, 'Hello')

       def test_view_fn_submitted(self):
           from my.package import view_fn
           renderer = testing.registerDummyRenderer('templates/submitted.pt')
           context = testing.DummyModel()
           request = testing.DummyRequest()
           request.params['say'] = 'Yo'
           response = view_fn(context, request)
           self.assertEqual(renderer.say, 'Yo')


此例,我们创建了从  ``unittest.TestCase`` 继承而来的 ``MyTest``.
只要将这个案例包含在 `repoze.bfg` 应用中,就会自动找到  ``setup.py test``  并运行.
这一案例包含两个测试方法.

头个 ``test_view_fn_not_submitted`` 测试 ``view_fn`` 函式在表单提交时,没有表单值的情况
(由 request.params 定义)
第一行注册了一个名为 ``templates/show.pt`` 的 "dummy模板渲染器" ，他通过 ``registerDummyRenderer`` 函式注册(一个 ``repoze.bfg.testing`` API)。
此函式在最后返回 DummyTemplateRenderer 实例，我们以后会用的.
我们接下来创建了一个了 ``DummyRequest`` 对象 (等同WebOb的请求对象)，
另外也创建了 ``DummyModel`` context对象.
我们用虚拟的context和request来进行测试.
当函式被调用时, ``render_template_to_response`` 会调用 "dummy" 模板渲染对象来代替真正的模板渲染对象.
当此渲染器被调用时, ``render_template_to_response`` 函式 就会将路径除外的关键字参数设置为自己的属性.
在上例中可以看到，我们检查传入模板的 ``say`` 参数就是  ``Hello``  .

次条  ``test_view_fn_submitted``  测试方法,
在表单变量 ``say`` 已经在请求中设置了，并执行了相似的模板注册和断言.
最后，我们断言渲染器的 ``say`` 参数值为 ``Yo``, 因为这是视图函式中所期望的.

注意到实例在 ``setUp`` 和 ``tearDown`` 函式中,都调用了 ``zope.testing.cleanup.cleanUp``
这其实是在各个测试间进行必要的清理.
如果要使用任何测试API, 请确认你的每个测试案例都有  ``setUp`` 和 ``tearDown`` 函式.

进一步的请参考 `repoze.bfg` 那章( `testing_module` )，可查看完整的bfg测试API.
那章描述了如何注册安全策略，如何进行把 Model注册为路径,注册事件捕获, 注册View, 
以及代表dummy实现的request/model类。

