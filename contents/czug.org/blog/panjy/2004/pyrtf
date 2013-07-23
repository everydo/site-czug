<p><a class="reference" href="pyrtf.sourceforge.net/">PyRTF</a> 是动态生成 <a class="reference" href="http://www.biblioscape.com/rtf15_spec.htm">RTF</a> 文档的一个Python包。如果你需要动态生成使用MS Word查看的一些文档之类的东东，这个产品可能是你的选择。doc格式不公开，而且一般生成起来很慢，而且依赖一些com组件。</p>
<p>RTF 文件是一个公开的格式, PyRTF则是一个很小的纯Python的包。因此很多情况下，选择PyRTF也是一个不错的选择。</p>
<div class="section">
<h3><a id="rtf" name="rtf">RTF的格式说明</a></h3>
<p>英文的规范阅读好麻烦，先转载一个 <a class="reference" href="http://xiaobc.blogdriver.com/xiaobc/91532.html">中文的RTF格式介绍</a>.</p>
<pre class="literal-block">
{\rtf1\ansi\ansicpg936\deflang1033\deflangfe2052     -- rtf 字符串的声明
{\fonttbl                                              -- 字体列表
     {\f0\finl Comic Sans MS;}                         -- 字体列表中的第一项
     {\f1\fmodern\fprq6\fcharset134\'cb\'ce\'cc\'e5}   -- 字体列表中的第二项，
                                -- “\’cb\’ce\’cc\’e5” 是对中文字符的特殊说明，
                                -- 对于特殊的非英语字符串，如中文，日文等在rtf格式中
                                -- 的存储都是以ASCII的形式存放的
}

{\colortbl                    -- 颜色列表
 ;                            -- 颜色列表的第一项会放一个Color.Empty的值
 \red0\green0\blue255;        -- 颜色列表的第二项
 …}

\viewkind4\uc1\pard\nowindctlpar\qj         -- rtf 字符串主体的开始
\cf1\highlight2\lang2052\f0\fs20 string     -- “string”字符串使用颜色列表中的第二项，
                     -- 高亮的背景色为颜色列表的第三项，
                     -- 字体使用字体列表中的第一项字体，字号为10号字体（20/2=10）
…}
</pre>
</div>
<div class="section">
<h3><a id="pyrtf" name="pyrtf">PyRTF编程</a></h3>
<p>下载PyRTF后，可以参考其中的example.py文件。主要问题是对中文的支持。下面是我的一个小例子:</p>
<pre class="literal-block">
doc = Document()
ss = doc.StyleSheet
# 在这里加入中文字体，\xcb\xce\xcc\xe5是“宋体”的中文内码
ss.Fonts.append(Font(&quot;\\'cb\\'ce\\'cc\\'e5&quot;, 'modern', 134, 6))
section = Section()
doc.Sections.append(section)
# 得到这个字体
tps = TextPS(font=getattr(ss.Fonts, &quot;\\'cb\\'ce\\'cc\\'e5&quot;) )
# 设置颜色
sps = ShadingPS(background=ss.Colours.Red)
text = Text('中国', tps, sps)
p = Paragraph()
p.append(text)
section.append(p)
DR = Renderer()
out = file('bb.rtf','w')
DR.Write(doc, out)
out.close()
</pre>
</div>
<div class="section">
<h3><a id="id2" name="id2">存在的问题</a></h3>
<p>最终我还是没有选择PyRTF，主要的原因是：</p>
<ul class="simple">
<li>不能解析和控制RTF文件，也就是说，无法根据模板来制作RTF文件</li>
<li>表格不能设置背景颜色。相信以后PyRTF会提供这个功能的</li>
</ul>
<p>我选择了什么？当然是使用OpenOffice的PyUNO进行开发 ;-)</p>
</div>
