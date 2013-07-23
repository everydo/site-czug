:作者: pupq 
:原文: <a href="http://plone.org/documentation/whatsnew/2.0/designers">http://plone.org/documentation/whatsnew/2.0/designers</a>
:翻译: 赵玉勇
:版本: $Revision: 1.5 $
:版权: 

.. contents:: 目录


重新调整了模板结构
=====================================

精简调整了Plone 1.0中界面模板的程序结构，现在要精练很多、不同界面部分也更独立。在调整界面时需要调整哪个模板、以及调整后的效果会是怎样，现在理解这些问题更加容易了。

For highly customized sites designed using the Plone 1 model, some refactoring of your customized templates may be neccessary to bring them in line with Plone 2.
对于基于Plone 1、做了很多定制工作的Plone站点，为了能在Plone 2环境下正常使用，有必要修改定制的模板文件。


增强了CSS对界面外观的控制
=====================================

相比于以前，CSS 在控制Plone的界面外观方面作用更大、更加独立。这使设计人员可以改变整个站点的外观设计，而不再需要关注、修改相关模板程序。

另外，做一些基本的外观设置时，如色彩风格、字体、边框等，可以利用一套简单的属性集合来该改变，而无须直接修改CSS。为了保持与以前版本的兼容性，以前的属性集合"stylesheet_properties"依然保留，另外又新增加了一个属性集合"base_properties"。

Plone 2 包括有原来的样式表定义"ploneDeprecated.css"，收集了与Plone 2不兼容的CSS定义，以方便使用以前版本的产品、便于迁移定制的站点。 

标准或 tableless CSS
==============================================
一般Plone 2使用我们标准的CSS设计文件，该CSS定义与所有浏览器都是兼容的。For sites with more controlled deployment who want to take advantage of true semantic web markup, there is a "tableless" CSS mode that uses no tables—even for the basic page structure. With tableless mode, even more radical changes can be made by just changing the CSS, including changing the overall page structure.

Action 图标管理
=====================================
在Plone 2中，诸如 "打印当前页面"、"我的文件夹"等Plone 操作（action）有各自对应的图标，并可以通过一个图标管理工具（Action  Icons Tool）进行配置管理。这使得设计人员可以更容易控制修改站点外观，而避免去直接修改模板程序文件。