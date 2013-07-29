---
created: 2005-02-24 14:51:42
creator: eishn
description: AIML 是著名的聊天机器人 A.L.I.C.E. 的底层技术。Python 的 PyAIML 模块提供了对这项技术的支持。我们可以使用
  PyAIML 来开发出我们想要的聊天机器人。但是 PyAIML 对中文的支持还有不够理想的地方，我们需要对之进行一点点的改进，使之可以象英文一样地平滑地处理中文。
title: 让机器人模块 PyAIML 平滑处理中文
---
<div align="right">
 <b>—— 献给 Python 及人工智能爱好者</b><br />
 <b>沈崴 2005 年 1 月 16 日 于广州<br />
 <br /></b>
 <div align="left">
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;"><b>AIML
 及其应用概述</b><br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 作为
 Python 爱好者和人工智能玩家，PyAIML 自然是手头必备的工具。当然人工智能还有许多其它的玩法，比如 PyML（机器学习，提供对
 SVM、Knn 等算法的支持）。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; PyAIML 为
 Python 提供了对 AIML 的支持。AIML 也就是智能标记语言，是一种符合 XML
 规范的标记语言，用来编写人机对话的逻辑并设计机器人的回复内容。AIML 源自著名的聊天机器人
 A.L.I.C.E.。在国外得到了广泛的应用，被用于设计自动应答的服务系统。机器人的大脑就是 AIML 编写的语料库。英文的 AIML
 语料库作为开源的工程已经是非常地庞大了，并且 A.L.I.C.E. 鉴由精心设计的语料库成功地通过了图灵测试。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; AIML
 语料库在全球范围、及多种语言上都有庞大的积累。但是非英语语系，特别是亚洲语言（除了日本）的 AIML 语料库并没有很好的积累。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 然而事实上，国内却有众多使用 AIML 技术的企业，但是并未公示这一点。据我所知的使用 AIML 的机器人有新浪的 UC。一些 QQ 机器人。许多通过
 Web 交互的机器人，以及一个非常棒的桌面机器人“笨笨鸟”。通常新浪及 QQ 机器人的 AIML
 语料库是不开放的，并且远没有开源的面向英文的语料库庞大和智能，但是我们还是可以得到桌面机器人“笨笨鸟”的语料库。在众多玩家的扩充下具有一定的规
 模，但是缺乏逻辑设计，只是粗略使用了 AIML 最为浅层的功能。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 无法形成复杂的组织良好的中文语料库，其原因很简单，因为现有的 AIML 解释器无法很好地支持中文，因而无法利用 AIML 规范中的深层功能。但是，就
 AIML 规范，它本身确实是支持中文的。</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 所有原生的 AIML
 解释器都是面向英文设计的。它需要有空格来断字，并且在运行中会自动大写所有字母，并在回复中大写首字母。<br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 我们完全可以直接使用原生的 AIML 解释器，但是首先需要在编写 AIML 及解析会话时做一些额外的工作。如果要让机器人理解对话输入，需要在编写
 AIML 时在汉字之间加上空格，并在运行时同样先给汉字插上空格再交付 AIML 解释器解析。同时所有的处理都是基于 UTF-8
 的。其实是让解释器象处理英文单词一样处理中文字。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 国内相当多的机器人都直接使用了国外的机器人程序，通常这些机器人程序都是开源的。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 但是作为更加专业的 Python 玩家，对于开源的 PyAIML 模块，我们自然不能接受这种非正统的窍门。我们需要的是一个完整支持 AIML
 规范的平滑支持中文的 AIML 解释器。</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;"><br />
 <b>中文化原理</b><br />
 一、自动空格断字、还原，以及自动编码转换。<br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 添加中文支持的原理，就是把自动添置空格自动化，并保持整个接口不变。这需要修改 PyAIML 的两个接口实现：</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 1、首先是读取 AIML 语料的接口（XML
 文档解析），在设及到进行匹配的 Pattern 时，自动将读取的内容用空格断字。<br />
 &nbsp;&nbsp;&nbsp; 2、其次是解析会话时，自动将用户输入的内容用空格断词。<br />
 <br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 因为在一些逻辑中已断词的文字也需要被返回给客户，比如：</span></p>
 <p style="background-color: rgb(204, 204, 204);"><span style="font-family: 宋体; color: black;"><span style="color: rgb(0, 0, 0);">Q:
 你叫什么？</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">A: 沈崴</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">（分析时被断词为“沈 崴”）</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">Q: 你叫沈崴。我不会显示其中的空格。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">（已经重新组合了“沈 崴”）</span><br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 所以也需要有反向还原去掉空格的能力。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 因为
 PyAIML 本身是使用 Unicode 的，所以在做输入接口时需要将字符转换为 Unicode，输出时再转换成原始编码。</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;"><br />
 二、对汉字忽略所有大写及小写转换<br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 英文 AIML
 解释器会自动大写 Pattern 内容，并将回复内容首字母大写。事实证明对Unicode
 编码的中文并没有影响，但是假如处理的是单字节编码的汉字（有很多原因会导致这种情况）它就会对中文输入输出造成影响。</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;"><br />
 三、支持单字节编码的汉字<br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 这是不需要的，并且可能是弊大于利的。但是在我使用的 FreeBSD 下 2.3 版本的 Python 中，并没有自带有 Unicode 对 GB
 编码的映射表。通常情况下我不会为 Python
 添置编码表或者增加任何模块。并且这是一个增加兼容性的选择，所以同时支持单字节编码也不失为一个良好的决定。</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;"><br />
 <b>PyAIML 源码</b><br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 在做这些事情之前我们首先需要熟悉一下 PyAIML 的源码组织。</span></p>
 <p style="background-color: rgb(204, 204, 204);"><span style="font-family: 宋体; color: black;"><span style="color: rgb(0, 0, 0);">1、&nbsp;&nbsp;&nbsp; AIML（XML）读取部分：AimlParser.py。使用
 xml.sax 接口解析 XML文件读入对话逻辑和机器人回复信息。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">2、&nbsp;&nbsp;&nbsp;
 人机对话输入输出接口：Kernel.py。提供运行期的 IO 接口，PyAIML 中最主要的 IO 接口是 respond
 函数。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">3、&nbsp;&nbsp;&nbsp;
 语言模式匹配部分：PatternMgr.py。利用 AIML 模式来匹配符合的输入字串。主要实现在 match
 函数中。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">4、&nbsp;&nbsp;&nbsp;
 其他支持模块。</span><br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 需要改动的是
 AimlParser.py、Kernel.py 和 PatternMgr.py 文件。</span></p>
 <p class="MsoNormal"><span style="font-family: 宋体; color: black;"><br />
 <b>中文空格断字</b><br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 中文化
 PyAIML 我们主要需要实现的是自动的中文空格断字。这让我想起中文折行的算法，折行算法大家可以在 CZUG 上找到，在站长（潘俊勇）的 Blog
 上：&lt;http://blog.czug.org/panjunyong/mail-line-wrap&gt;。这里，首先建立一个支持模块，算
 法类似：</span></p>
 <p style="background-color: rgb(204, 204, 204);" class="MsoNormal"><span style="font-family: 宋体; color: black;"><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">“””&nbsp;&nbsp;&nbsp;
 LangSupport.py</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">提供对中文空格断字的支持。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; 支持 GB 及 Unicode
 。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; LangSupport 对象的 input
 函数能在中文字之间添加空格。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; LangSupport 对象的
 output 函数则是去除中文字之间的空格。</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">“””</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">from re import compile as
 re_compile</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">from string import join as
 str_join</span><br style="color: rgb(0, 0, 0);" />
 <br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">findall_gb&nbsp;&nbsp; =
 re_compile('[\x81-\xff][\x00-\xff]|[^\x81-\xff]+').findall</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">findall_utf8 =
 re_compile('[\u2e80-\uffff]|[^\u2e80-\uffff]+').findall</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">sub_gb&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; =
 re_compile('([\x81-\xff][\x00-\xff])
 +(?=[\x81-\xff][\x00-\xff])').sub</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">sub_utf8&nbsp;&nbsp;&nbsp;&nbsp; =
 re_compile('([\u2e80-\uffff]) +(?=[\u2e80-\uffff])').sub</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">sub_space&nbsp;&nbsp;&nbsp; =
 re_compile(' +').sub</span><br style="color: rgb(0, 0, 0);" />
 <br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">LangSupport = type('LangSupport',
 (object, ),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 {'__init__': lambda self, encoding = 'ISO8859-1':
 self.__setattr__('_encoding', encoding),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 '__call__': lambda self, s: self.input(s),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 'input'&nbsp;&nbsp; : lambda self, s: s,</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 'output'&nbsp; : lambda self, s: s } )</span><br style="color: rgb(0, 0, 0);" />
 <br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">GBSupport = type('GBSupport',
 (LangSupport, ),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {'input'
 : lambda self, s:</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 str_join( findall_gb( type(s) == str and unicode(s, self._encoding) or s )
 ),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 'output': lambda self, s:</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 sub_space(' ', sub_gb(r'\1', ( type(s) == str and unicode(s, 'UTF-8') or s
 ).encode(self._encoding) ) ) } )</span><br style="color: rgb(0, 0, 0);" />
 <br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">UnicodeSupport = type('UnicodeSupport',
 (LangSupport, ),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {'input'
 : lambda self, s:</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 str_join( findall_utf8( type(s) == str and unicode(s, self._encoding) or s
 ) ),</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 'output': lambda self, s:</span><br style="color: rgb(0, 0, 0);" />
 <span style="color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 sub_space(' ', sub_utf8(r'\1', ( type(s) == str and unicode(s, 'UTF-8') or
 s ).encode(self._encoding) ) ) } )</span><br style="color: rgb(0, 0, 0);" />
 <br /></span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp;
 接下来就是把语言支持加入到 PyAIML 中。这并不难。这里主要需要添加中文切字的是 &lt;pattern&gt; 和 &lt;sari&gt;
 标签的处理。同时也要为 &lt;topic&gt; 和 &lt;that&gt; 标签提供中文支持。</span></p>
 <p><span style="font-family: 宋体; color: black;">&nbsp;&nbsp;&nbsp; 如果需要支持
 GB 编码（单字节编码），还需要修改 PatternMgr.py 文件，重载 string 模块的 upper
 函数，避免其大写中文字符。</span></p>
 <p class="MsoNormal"><span style="color: black;" xml:lang="EN-US" lang="EN-US"><o:p></o:p></span></p>
 </div>
<b><br />
 <br />
 <br /></b>
 </div>