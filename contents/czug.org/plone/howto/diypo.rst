---
created: 2006-11-14 10:06:24
creator: honeyday
description: "对于支持i18n翻译的zope产品，可以通过自己手工编辑po文件来实现软件的本地化。\r\n本文简单介绍了po文件的制作和应用等的操作步骤。"
title: 如何自己动手汉化po文件
---
<h1><strong>一、po/pot文件简介</strong></h1>
 <p>po是i18n翻译的时候需要的翻译文件。</p>
 <table>
 <tbody>
 <tr>
 <td>I18N 是 internationalization 的缩写形式，意即在 i 和 n 之间有
 18 个字母，本意是指软件的"国际化"；与之类似，L10N 是 localization 的缩写形式，意即在 l 和 n 之间有 10
 个字母，本意是指软件的"本地化"。 </td>
 </tr>
 </tbody>
 </table>
 <br />
 <p>pot顾名思义，就是po的模版文件。定义好的格式和资源，翻译的时候是要在空格等地方填入翻译之后的内容即可。</p>
 <p>下面是一个典型的pot文件的格式，我们以kupu编辑器的pot文件来做例子。</p>
 <p>msgid ""<br />
 msgstr ""<br />
 "POT-Creation-Date: Mon May  2 00:46:04 2005\n"<br />
 "PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\n"<br />
 "Last-Translator: FULL NAME &lt;EMAIL@ADDRESS&gt;\n"<br />
 "Language-Team: Silva i18n team &lt;walco@infrae.com&gt;\n"<br />
 "MIME-Version: 1.0\n"<br />
 "Content-Type: text/plain; charset=UTF-8\n"<br />
 "Content-Transfer-Encoding: 8bit\n"<br />
 "Generated-By: zope/app/translation_files/extract.py\n"<br />
 "Language-Code: zh-cn\n"<br />
 "Language-Name: 简体中文\n"<br />
 "Preferred-Encodings: utf-8\n"<br />
 "Domain: kupu\n"</p>
 <p>#: /default/body.kupu:14<br />
 msgid "Kupu Editor Test Page"<br />
 msgstr ""</p>
 <p>上面有几点注意的是Language-Code、Language-Name、Preferred-Encodings、Domain。<br />
 在原始的pot文件里面可能没有上面这4个项目，如果没有的话请自行添加。<br />
 Language-Name用于在zope的控制面板里面显示语言的名称，而一般的编码则采用UTF-8。<br />
 Domain是用来指定这个po文件应用的域，一定要写上，否则po文件不会生效的。</p>
 <p>下面就是po文件的主体结构了。每一个翻译项占一段。</p>
 <p>#:
 /default/body.kupu:14                             
 注释。一般用来说明该段翻译项所应用的地方。本例说明在/default/body.kupu文件的第14行。<br />
 msgid "Kupu Editor Test
 Page"                      消息ID，用来标示将被翻译的消息。<br />
 msgstr
 ""                                                       
 消息字符串，用来写翻译后的文字。</p>
 <p>翻译后将是下面这样：</p>
 <p>#: /default/body.kupu:14<br />
 msgid "Kupu Editor Test Page"<br />
 msgstr "Kupu编辑器测试页面"</p>
 <p>以此类推，即可完成所有资源的翻译了。</p>
 <h1><strong>二、应用po文件</strong></h1>
 <p>在上一节，讲过了po和pot文件的结构和编辑方法。</p>
 <p>这一节，将讲述如何将翻译好的po文件应用到产品中。</p>
 <p>首先，要将翻译好的po文件放到相应产品的i18n的目录下，一般这个目录下已经有一些其它语言的po文件了。</p>
 <p>然后，打开zope的管理平台（ZMI），进入<strong> </strong> <a href="../../../manage_workspace"><strong> /</strong></a><a href="../../../Control_Panel/manage_workspace"><strong>Control_Panel</strong></a><strong>/</strong>
 <a class="strong-link" href="../../../Control_Panel/TranslationService/manage_workspace">
 <strong>TranslationService</strong></a>
 <strong>，在这里列出了所有已经安装的zope产品的翻译文件。</strong>在列表中查找kupu，一般在最下面。</p>
 <p><img src="../tutorial/diypofile/zope_po_1.JPG" /></p>
 <p>上面图片中，用绿色框起来的项目就是我刚刚制作的kupu的简体中文翻译文件。</p>
 <p>可以注意到，在绿色框的上面的项目，显示出错误的信息，这表明该po文件编辑错误，无法应用。<br />
 错误一般是由于po的结构被破坏（常见的是头信息的缺失或者书写错误，或者是正文信息的标签不匹配等。），以及在头信息里面指定的文件编码格式与文件真实保存时所使用的编码格式不一样，造成读文件时解码错误。例如，在头信息里面指定了编码为utf-8，而po文件是以gb2312的格式保存的，就会造成错误。</p>
 <p>点击绿框的项目，进入详细信息页面，页面截图如下：</p>
 <p><img src="../tutorial/diypofile/zope_po_2.JPG" /></p>
 <p>如果文件内容有修改或更新，可以按Reload this catalog按钮来刷新。</p>
 <h1><strong>三、关于编辑器的选择</strong></h1>
 <p>由于po文件本身就是一个文本文件，所以任何文本编辑器都可以使用。</p>
 <p>还有一款<strong>poEdit</strong>产品，可以很专业的莱编辑po文件。poEdit可以将现有的po与新的pot自动进行比较，并标识­出不同来。
 并且poEdit的Catalog/Update catalog命令可以将现有的po与pot（其实也可以是po­）进行比较更新。<br />
 </p>
 <p>对于初级玩家，找一款支持语法加亮的编辑器就可以了。这里推荐使用<strong>EditPlus</strong>或者<strong>UltraEdit</strong>。可以在EditPlus里面新建一个po文件的格式，并且定义一下语法加亮规则。以#开头的行都是注释行，用不同颜色显示一下就可以了。至于UltraEdit也是一样的。</p>
 <p>
 对于习惯使用vi的人来说，也可以使用gvim，直接支持语法加亮的。但是，在windows下面，我的gvim不支持utf-8编码，仅仅支持本地编码，就是gb2312，这给编辑utf-8编码的文件带来较大的麻烦。</p>
 <p class="discreet">编者注：这个说法有误，vim是很早就支持utf-8的，只因为windows平台默认编码是GB的，可以手工设定 set encoding=utf-8 来解决，并可以写到vimrc文件中。</p>
 <p>总的来说，如果你是像潘老大那样搞专业汉化的，请使用poEdit，而如果像我这样学习研究的，就找一款自己用的熟悉的文本编辑器就可以了。</p>