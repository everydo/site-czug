---
created: ''
creator: ''
description: 使用 Chameleon(chameleon.zpt)页面模板；使用xslt；自动加载模板；使用文本模板；其他的模板语言
title: Templates模板
---
.. include:: include.rst

模板 template
========================

:翻译: 肯定来过 yuanshoujing at gmail.com
:校核: 吕健伟 （润普公司）

所谓`模板`，通常是硬盘上的一个文件，它可以用来渲染`视图view`提供的数据，但本身更多的是静态信息。

用 `Chameleon` 编写模板
------------------------------------------------------------------------

和 Zope 一样，`repoze.bfg` 使用 `ZPT` 作为其默认和支持最好的模板语言。然而，与 Zope 不同，`repoze.bfg` 使用`ZPT` 规范的另一种实现：`Chameleon`（`chameleon.zpt`）模板引擎。这种模板引擎绝大部分符合 `ZPT` 模板规范，而且速度更快。

.. note:: `repoze.bfg` 也可以通过其内置的 ``chameleon.genshi`` 包来使用 Genshi 风格的模板。用于获取和渲染 Genshi 风格模板的 API 完全照应同功能的 ZPT 风格的 API。除了模板文件本身不同外，你在使用上感受不到其它任何差异。参阅 `template_module` 获取更多有关如何在 `repoze.bfg` 中使用 Genshi 风格模板的信息。

如果有一个文件名为 ``foo.pt`` 的 `chameleon.zpt` 模板在你的程序的 ``templates`` 目录中，你可以这样从视图中渲染它：

.. code-block:: python
      :linenos:

   from repoze.bfg.chameleon_zpt import render_template_to_response
   def sample_view(context, request):
       return render_template_to_response('templates/foo.pt', foo=1, bar=2)

``render_template_to_response`` （和它的姐妹函数 ``render_template`` ，这里没有给出，区别只不过是它返回的是字符串）的第一个参数是模板的 *路径* 。如上所示的路径 ``templates/foo.pt`` 是 *相对路径* 。相对于什么，你可能会问？相对于 ``views.py`` 文件所在的目录，通常即 `repoze.bfg` 程序 `包` 目录。

``render_template_to_response`` 通常渲染 `chameleon.zpt` 模板，并且返回一个 *status code* 是 ``200 OK`` 、 *content-type* 是 ``text-html`` 的响应对象。如果你需要进一步控制状态码和内容类型，可以使用 ``render_template`` 函数来替代，它同样是渲染 ZPT 模板，但返回的是字符串而不是响应对象。你可以手工将该字符串用作响应体：

.. code-block:: python
      :linenos:

   from repoze.bfg.chameleon_zpt import render_template
   from webob import Response
   def sample_view(context, request):
       result = render_template('templates/foo.pt', foo=1, bar=2)
       response = Response(result)
       response.content_type = 'text/plain'
       return response

`repoze.bfg` 加载模板并保留于内存，然后在多次请求期间共享。这意味着你对 ZPT 所做的修改，需要重启之后才能看到结果。

用 XSLT 编写模板
-----------------------

`repoze.bfg` 也支持 XSLT 作为一种可选的模板语言。和 ZPT 一样，XSLT 模板也仅加载一次，在多次请求期间重用。

假如模板文件夹中有一个 ``foo.xsl`` 模板，你可以如下这样渲染：

.. code-block:: python
      :linenos:

   from repoze.bfg.xslt import render_transform_to_response
   from lxml import etree
   node = etree.Element("root")  
   return render_transform_to_response('templates/foo.xsl', node)

如上所示， ``render_transform_to_response`` 的第二个参数是你想用来作为 XSLT 顶级数据的元素。

你也可以将 XSLT 参数作为关键字参数传入：

.. code-block:: python
      :linenos:

   from repoze.bfg.xslt import render_transform_to_response
   from lxml import etree
   node = etree.Element("root")
   value1 = "'app1'"
   return render_transform_to_response('templates/foo.xsl', node, param1=value1)

这样，XSLT 模板中 ``<xsl:param name="param1" />`` 参数的值将被赋值为 'app1'。

.. _reload_templates_section:

自动重新加载模板
---------------------------------

改变模板文件后，不用重启程序进程就能立即看到结果通常更方便。 `repoze.bfg` 允许你配置程序的开发环境，以便模板的变更可以被自动检测到，这样下次渲染时模板就会被重新加载。

.. warning:: 模板自动重新加载特性不推荐应用于生产环境，因为它渲染的比较慢，通常只适合在开发期间使用。

为了开启模板自动重新加载，你需要使用环境变量配置或者使用文件来配置。

如果使用环境变量，在 shell 下启动你的程序时，需要使用 ``BFG_RELOAD_TEMPLATES`` 环境变量，并将它的值设为 ``1`` ，例如::

  $ BFG_RELOAD_TEMPLATES=1 bin/paster serve myproject.ini

要使用程序 ``.ini`` 文件中的配置项达到同样目的的话，可以将配置段中的 ``reload_templates`` 关键字设为 ``true`` ，例如::

  [app:main]
  use = egg:MyProject#app
  reload_templates = true

使用文本模板
--------------------

`repoze.bfg` 也允许通过 `Chameleon` 来使用完全由非 XML 文本组成的模板。这样，除了占位符需要使用 ``${name}`` 形式,你可以完全使用纯文本来创建模板文件。这种模板的渲染 API 也完全跟 ZPT 一样的，区别只不过是它需要从另外一个地方导入，可以参考 `template_module` 来了解更多信息.

使用其它模板语言编写模板
------------------------------------------

由于在 `repoze.bfg` 中，`视图` 函数一般是唯一需要知道模板细节的代码，而视图函数又是很简单的 Python 代码，所以你可以在`repoze.bfg` 中使用你喜欢的模板系统。安装该模板系统，将它的 API 函数导入到你的视图模块中，使用这些 API 来产生一个字符串，然后将该字符串做为一个 `WebOb` ``响应`` 对象的主体返回就可以了。假设你安装了 `Mako <http://www.makotemplates.org/>`_ ，这里是一个在 `repoze.bfg` `视图` 中使用 Mako 的例子：

.. code-block:: python
      :linenos:

   from mako.template import Template
   from webob import Response

   def make_view(context, request):
       template = Template(filename='/templates/template.mak')
       result = template.render(name=context.name)
       response = Response(result)
       return response

.. note:: 在 `repoze.bfg` 中编写自定义模板系统绑定包是相当容易的。可以参考 `repoze.bfg.jinja2 <http://svn.repoze.org/repoze.bfg.jinja2/trunk/>`_ ，作为编写这类包的一个例子。它详细说明了如何创建一个 `Jinja2 <http://jinja.pocoo.org/2/documentation>`_ 模板系统的 `repoze.bfg` 风格绑定。

注意，如果你使用第三方模板语言，:ref:`reload_templates_section` 部分描述的模板自动重新加载策略将不再有效。
