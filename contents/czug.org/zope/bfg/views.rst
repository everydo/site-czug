---
created: ''
creator: ''
description: 用函数定义视图；把视图映射为URL;Model接口；view zcml；请求类型；安全性；转向；静态内容
title: Views
---
.. include:: include.rst

.. _views_chapter:

:翻译: Jim Zhan ijwing at gmail.com

视图
=====

:term:`view` 是当请求进入应用时被调用的可执行函数。 :mod:`repoze.bfg` 的主要工作就是
当 :term:`request` 到达时查找并调用视图。视图的返回值必须实现 :term:`WebOb` ``Response``
的对象接口。

用函数定义视图
-----------------------------

定义视图最简单的方法就是创建一个接收 :term:`context` 和 :term:`request` 这两个
参数的函数。譬如，以下就是一个 hello world 的实现：

.. code-block:: python
   :linenos:

   def hello_world(context, request):
       from webob import Response
       return Repsonse('Hello world!')

:term:`context` 和 :term:`request` 的定义如下：

context
  通过图遍历(:term:`traversal`)或 URL 分发查找得到的模型实例。

request
  WebOb request 对象，表示当前 WSGI 请求。

视图必须返回一个实现了 :term:`WebOb` ``Response`` 接口的对象。最简单的方法就是
返回一个 ``webob.Response`` 对象。但任何包含以下属性的对象也同样有效：

status
  response 的 HTTP 状态码（包括名称）。譬如， ``200 OK`` 或
  ``401 Unauthorized`` 。

headerlist
  需要在 response 中设置 HTTP 报头的元组序列。譬如
  ``[('Content-Type', 'text/html'), ('Content-Length', '412')]`` 。

app_iter
    一个表示 response 报文的可迭代对象。它可以是一个数组，譬如
    ``['<html><head></head><body>Hello world!</body></html>']``
    或一个类似于文件的对象，又或是其它任何的可迭代对象。
  
假如视图返回至 :mod:`repoze.bfg` 发佈器的是没有实现这一接口的对象，那么发佈器
将会掷出一个异常。

将视图映射至 URLs
----------------------

通过在文件 ``configure.zcml`` 中使用 :term:`ZCML` 定义 ``view`` 从而
将信息添加至 :term:`application registry` ，可以将视图和 URL 关联起来。

.. code-block:: xml
   :linenos:

   <view
       for=".models.Hello"
       view=".views.hello_world"
       name="hello.html"
       />

以上就是当 *view name* 为 ``hello.html`` 时是将 ``.views.hello_world`` 视图
函数映射至 ``.models.Hello`` 所代表的 :term:`context` Python 对象（或其子类）。

.. 注解:: ``view`` （如上）中的 ``for`` 和 ``view`` 属性中句点 (``.``) 的意思
   是“该 :term:`ZCML` 文件存储路径下 Python 包的相对路径”。因此如果以上的
   ``view`` 是定义在 ``hello` 包下的 ``configure.zcml`` 文件内，你就可以将
   相对路径 ``.models.Hello`` 改为绝对路径 ``hello.views.hello_world``
   。相对或绝对路径在功能上是等价的。但如果包名改变，相对路径通常会更加有用。同时它
   也更为简洁。

你也可以为模型定义 *default view* (默认视图)：

.. code-block:: xml
   :linenos:

   <view
       for=".models.Hello"
       view=".views.hello_world"
       />

*default view* 没有 ``name`` 属性。当 :term:`context` 被遍历后而当前请求没有
*view name* 时，*default view* 就会被启用。

你也可以通过在 ``for`` 属性中使用特殊字符 ``*`` 来声明该视图适用于所有的 model 类型。

.. code-block:: xml
   :linenos:

   <view
       for="*"
       view=".views.hello_world"
       name="hello.html"
       />

这表示当 :mod:`repoze.bfg` 识别到 *view name* 为 ``hello.html`` 的*任何*
:term:`context` 后，该视图就会被调动。

.. 注解::

   如果你对 :term:`ZCML` 不感冒, 又或者你只是更喜欢用 Python 定义视图，你
   可以使用 :term:`repoze.bfg.convention` 。这个包提供了一个名为 ``bfg_view``
   的 decorator，它可以通过 BFG 视图而不是需要依赖于 ZCML 关联至 ``for``, ``name``,
   ``permission`` 和 ``request_type`` 信息。你只需在 ``configure.zcml`` 中
   添加一段 ZCML 定义就可以让 :term:`repoze.bfg.convention` 查找到所有使用了
   该 decorator 的视图。

使用模型接口
----------------------

除用 ``for`` 为 Python 类注册视图外，你还可以为 :term:`interface` 注册视图。由
于接口可以被关联至任何实例（而非仅由它的类指明其身份），使用接口可为模型的两个或以上的
不同实现间共享视图提供更大的灵活性。譬如，如果两个不同的 Python 模型对象共享一个接口，
那么你就可以使用基于它们其中的任意一个来使用相同的视图。

为了在视图分发时使用接口，你必需先创建一个接口，然后在你的类或实例中标明引用至该接口的
定义。

要将接口关联至类，你需要先定义好接口然后用函数 ``zope.interface.implements`` 将
两者关联起来。

.. code-block:: python
   :linenos:

   from zope.interface import Interface
   from zope.interface import implements

   class IHello(Interface):
       """ A marker interface """

   class Hello(object):
       implements(IHello)

      
要将接口关联至实例，你需要先定义好接口然后用函数 ``zope.interface.alsoProvides``
将两者关联起来。这个函数通过改变实例来将接口和实例关联起来。

.. code-block:: python
   :linenos

   from zope.interface import Interface
   from zope.interface import implements

   class IHello(Interface):
       """ A marker interface """

   class Hello(object):
       pass

   def make_hello():
       hello = Hello()
       alsoProviders(hello, IHello)
       return hello       

无论你如何将接口关联至实例或类，得到的接口与视图关联的 ZCML 定义都是一样的。假设以上
代码所定义的 ``IHello`` 接口在你应用的根部，它的模块名为 "model.py"，那以下的接口
定义则会将 ``.views.hello_world`` 视图关联至实现（也称为提供）了这个接口的 model。

.. code-block:: xml
   :linenos

   <view
       for=".models.IHello"
       view=".views.hello_world"
       name="hello.html"
       />

每当 model 被确定为提供这个接口的 :term:`context` 时，它就会根据 URL 查找名为
``hello.html`` 的视图，继而调用 ``.view.hello_world`` 。

注意，当出现视图同时被注册为类和接口所用这样的二义性时，类定义具有优先权。

在术语集中可以找到更多关于 :term:`interface` 的定义。

ZCML 的中 ``view`` 元件
-------------------------

ZCML 的 ``view`` 元件具有以下的属性：

view
  Python 句点形式的视图函数名。

for
  Python 句点形式的路径名。其 :term:`context` 必须为该 Python 类的实例或是提供了
  :term:`接口` ，以让视图查找及调用。
  
name
  *view name* 。你可以通过 :ref:`traversal` 这章来了解这一概念。

permission
  要调用视图，用户必须拥有 *permission* 名称(权限名)。

request_type
  为让该视图能被查找及调用，:term:`request` 必须拥有的以 Python 句点形式表示的
  :term:`interface` 名称。:ref:`view_security_section` 可查找到更多关于安
  全和权限的信息。

.. _view_request_types_sections:

视图的请求类型
------------------

你可以选择性的将 *request_type* 属性添加到 ``view`` 定义中，从而指定视图的请求类型。
譬如:

.. code-block:: xml
   :linenos:

   <view
       for=".models.IHello"
       view=".views.hello_json"
       name="hello.json"
       request_type=".interfaces.IJSONRequest"
       />

``.interfaces.IJSONRequest`` 代码大致如下:

.. code-block:: python
   :linenos:

   from repoze.bfg.interfaces import IRequest

   class IJSONRequest(IRequest):
       """ An marker interface for representing a JSON request """

这是一个使用 JSON 的简单请求。为确保当(且仅当)请求来自于 JSON 客户端时该视图才会被调用，
你可以用 ``INewRequest`` 事件记录器将 ``IJSONRequest`` 接口关联至该请求。由于我们
在 ZCML 里已经指明了这个视图的 ``request_type`` 为 ``.interface.IJSONRequest``,
所以只有当请求提供了这一接口时，该视图才会被调用。

通过请求参数，你也可以使用这个接口来改变请求所提供的接口。

通过将经主机名验证的任意接口或是 ``INewRequest`` 事件记录器内 request 中的任何
信息关联至 request，你就可以精确的控制视图的定位。譬如，如果你需要为两个不同主机名
的 request 准备两个区别不大的视图，你可以将其中一个视图的 ``request_type`` 定义
为 ``.interfaces.IHostnameFoo`` 而另一个为 ``.interfaces.IHostnameBar``，
然后在事件记录器中将 ``.interfaces.IHostnameFoo`` 与 HTTP_POST 为 ``foo``
时的 request 以及 ``.interfaces.IHostnameBar`` 与 HTTP_Post 为 ``bar``
时的 request 关联起来，那么当请求到达时的系统就会调用相应的视图。

你也可以建立一个独立于 ``request_type`` 的继承体系。当 :mod:`repoze.bfg` 查找
视图时，通过该接口的类层次体系，基于标准 Python 函数定位顺序的请求就会找到最适用于该
接口的视图。

.. 注解:: :ref:`events_chapter` 有更多关于事件记录器的信息，以及如何为 request
   供不同的类型。

.. _view_security_section:

视图安全
-------------

如果 :term:``security policy` 为激活状态，系统会先检查 ``view`` 的
:term:`permission`，以确保视图函数在被调用前，当前授权用户拥有此权限。以下是一个在
``view`` 中定义权限的例子:

.. code-block:: xml
   :linenos:

   <view
       for=".models.IBlob"
       view=".views.add_entry"
       name="add.html"
       permission="add"
       />

启用安全策略后，这个视图会被 ``add`` 权限所保护。如果用户在当前的 :term:`context`
下没有 ``add`` 权限，视图就不会被调用，系统会将 HTTP 状态码 ``Unauthorized`` 返
回给客户端。

.. 注解::

   :ref:`security_chapter` 一章有说明如何启用安全策略。

使用视图来进行 HTTP 重定向
----------------------------------

通过返回不同的响应，你可以在视图中创建 HTTP 重定向。

.. code-block:: python
   :linenos:

   from webob.exc import HTTPFound

   def myview(context, request):
       return HTTPFound(location='http://example.com')

:mod:`webob.exc` 模块中所有的异常均实现了 ``IResponse`` 这一接口；它们都可以在
视图中作为 response 被返回。 请查阅 :term:`WebOb` 中该模块的文档；它包括了如
Unauthorized 等的其它响应类型。

使用视图处理静态资源
-------------------------------------

在 :mod:`repoze.bfg` 中，处理静态资源(如 JavaScript 和 CSS 文件)的首选是
:mod:repoze.bfg.view ``static`` 辅助类。这个类可以创建一个类似于
:mod:`repoze.bfg` 视图的可调用函数来处理目录中的静态资源。譬如，要处理在应用中
被挂载到 URL 路径 ``/static`` 的文件系统目录 ``/path/to/static/dir`` ，首先
在应用程序根目录下的 ``static.py`` 文件内创建一个 :mod:`repoze.bfg.view` 的
实例如下:

.. code-block:: python
   :linenos:

   from repoze.bfg.view import static
   static_view = static('/path/to/static/dir')

然后，通过 ZCML (应用中的 ``configure.zcml`` 文件) 用表示根对象的类或接口将
这个视图映射到 ``/static`` 。

.. code-block:: xml
   :linenos:

   <view
       for=".models.Root"
       view=".static.static_view"
       name="static"
       />

本例中，引用至 BFG 应用根对象的类的 ``.model.Root`` 是一个实例。

.. 注解:: 如果想通过任意 model 对象将 ``static`` 当作静态视图来访问，你可以将 ``for``
   的值设为 ``*`` 。它会允许 ``/static/foo.js`` ，但 ``/anything/static/foo.js``
   也同样有效，只要 ``anything`` 本身是可以解析的。

现在，将你的静态文件(如 JS)放到文件系统目录中(如 ``/path/to/static/dir`` 。这步
完成后，你应该就可以通过添加了 ``/static`` 前缀的 URLs 浏览这个目录下的静态文件了，
譬如，``/static/foo.js`` 会返回 ``/path/to/static/dir/foo.js`` 。静态目录
可以递归的包含子目录，而任何的子目录都可以存放文件；它们会如你所想那样的为静态视图所解析。

.. note:: 为确保根目录中的 model 对象不会屏蔽静态资源 (在遍历的过程中 model 对象
   的优先级较高)，或根对象的 ``__getitem__`` 函数在静态资源请求到达时不被调用，你
   可以使用 URL 引用以上的静态资源，如 ``/@@static/foo.js`` 。它和 ``/static/foo.js``
   完全等价的。:ref::`traversal_chapter` 一章有关于 ``@@`` 的说明。

.. note:: 在底层，``repoze.bfg.view.static`` 使用 ``urlparser.StaticURLParser``
   WSGI 应用程序来处理静态文件。`the Paste documentation for urlparser
   <http://pythonpaste.org/modules/urlparser.html>`_ 有关于
   ``urlparser.StaticURLParser`` 更多的信息。

