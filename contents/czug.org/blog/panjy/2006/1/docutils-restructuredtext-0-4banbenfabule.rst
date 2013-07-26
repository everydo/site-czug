<p>看到0.4版终于发布了，这是第一个中文支持良好的版本</p>
<p><a class="reference" href="http://docutils.sourceforge.net/RELEASE-NOTES.html#release-0-4-2006-01-09">http://docutils.sourceforge.net/RELEASE-NOTES.html#release-0-4-2006-01-09</a></p>
<p>需要强力推荐的是 <a class="reference" href="http://docutils.sourceforge.net/docs/user/slide-shows.html">S5/html幻灯片</a> 的支持，
我现在给客户做幻灯演示，都是用这个了。使用这个 <a class="reference" href="http://docutils.sourceforge.net/docs/user/tools.html#rst2s5-py">rst2s5.py脚本</a> 完成
转换。</p>
<p>另外就是支持中文表格和中文指令，上次提到了一下，这里再演示一下中文指令，
比如:</p>
<pre class="literal-block">
=======================
文档标题
=======================

:联系: sales&#64;zopechina.com
:组织: 上海润普网络信息技术有限责任公司
:时间: |日期|

:摘要:

  罗列润普公司提供的产品和服务，提出项目的报价。

.. 目录::
.. 章节序号::

标题1
======================
正文

子标题1
---------
la la

标题2
=========
la

.. |日期| 日期::
</pre>
<p>上面 <em>目录</em> 、 <em>日期</em> 、 <em>章节序号</em> 都是中文指令。</p>
<p>最后，再这里补充一下刚刚看到的新消息，使用ascii可以生成各种SVG图形，如果你使用的是Firefox 1.5，你可欣赏一下这个页面:</p>
<p><a class="reference" href="http://docutils.sourceforge.net/sandbox/cliechti/aafigure/README.html">http://docutils.sourceforge.net/sandbox/cliechti/aafigure/README.html</a></p>
<p>他是使用reST的ascii艺术图形解析功能自动生成的，原始的文本是：</p>
<p><a class="reference" href="http://docutils.sourceforge.net/sandbox/cliechti/aafigure/README.txt">http://docutils.sourceforge.net/sandbox/cliechti/aafigure/README.txt</a></p>
