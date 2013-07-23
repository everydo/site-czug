KSS入门

.. Contents::
.. sectnum::

网站链接
===============
- kss 官方网站：http://kssproject.org
- Begin with kss: http://kssproject.org/docs/tutorial/simple-kss/begin-with-kss.rst
- Kss Cheat sheet: http://kssproject.org/documentation/cheat-sheet/
- 介绍KSS http://codespeak.net/svn/kukit/docs/introducing_kss/trunk/3-shipped-kss-plugins.txt
- kss 1.4： http://kssproject.org/docs/how-to/how-to-setup-and-use-kss-1.4
- **KSS实例演示**: http://demo.kssproject.org/

原理
=================
通过类似css语法的kss描述文件，说明 **什么元素** (selector) **发生什么事件** (event) 的时候， **执行那些操作** (action)

内置一个kukit引擎。解析kss文件，发送命令到服务器，服务器会以xml文件的形式返回client支持的action，然后去执行。

selector: 什么元素
============================
这个和标准的css selector类似，但是有扩展。

在3个地方涉及selector
-------------------------------
- kss定义中，css选择符，这个完全符合css标准
- action-client中的定义
- action-server中的定义

哪些selector
-----------------------
- css()
- htmlid()
- parentnode
- samenode
- parentnodecss(.rigion|p.div)：适合局部更新，是我们的扩展，非常有用，先向上，再向下。

event：发生什么事件
============================
简单：这个和js中的onclick, onhover等类似

action: 调用函数，执行操作
=================================
- 根据是否要走一趟服务，分client和server 2种
- 参数的传递：支持非表单参数传递

  - help函数，从上下文得到参数，非常多

action-client：只需要客户端
--------------------------------------
- 常规的js dom操作类似
- 可扩展！如：拖动、效果等

action-server: 需要服务器干预的逻辑
---------------------------------------
实际上是在服务器中，生成action-client

问题：大量重复操作！比如设置消息！

解决方法：可扩展的commandset，可能对应一个action-client操作，也可能对应一组。但是最终都是对应一个。

我们的扩展（zopen命令集）：

- clear
- redirect


