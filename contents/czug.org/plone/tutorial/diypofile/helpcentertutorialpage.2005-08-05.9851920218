<p>po是i18n翻译的时候需要的翻译文件。</p>
 <p>pot顾名思义，就是po的模版文件。定义好的格式和资源，翻译的时候是要在空格等地方填入翻译之后的内容即可。</p>
 <p>下面是一个典型的pot文件的格式，我们以kupu编辑器的pot文件来做例子。</p>
 <p>msgid ""<br />
 msgstr ""<br />
 "POT-Creation-Date: Mon May&nbsp; 2 00:46:04 2005\n"<br />
 "PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\n"<br />
 "Last-Translator: FULL NAME &lt;<a href="mailto:EMAIL@ADDRESS>\n">EMAIL@ADDRESS&gt;\n</a>"<br />
 "Language-Team: Silva i18n team &lt;<a href="mailto:walco@infrae.com>\n">walco@infrae.com&gt;\n</a>"<br />
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
 /default/body.kupu:14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 注释。一般用来说明该段翻译项所应用的地方。本例说明在/default/body.kupu文件的第14行。<br />
 msgid "Kupu Editor Test
 Page"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消息ID，用来标示将被翻译的消息。<br />
 msgstr
 ""&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 消息字符串，用来写翻译后的文字。</p>
 <p>翻译后将是下面这样：</p>
 <p>#: /default/body.kupu:14<br />
 msgid "Kupu Editor Test Page"<br />
 msgstr "Kupu编辑器测试页面"</p>
 <p>以此类推，即可完成所有资源的翻译了。</p>