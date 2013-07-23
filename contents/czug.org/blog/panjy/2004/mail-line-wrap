
 <p>英文是ascii，每个字符占用空间相同，直接使用空格就可以分词。因此英文版本的折行算法在python cookbook上有很经典的高效算法：</p>
 <p><a href="http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/148061">one-liner
 word-wrap function</a></p>
 <p>但 是中文就不同了，一个汉字的空间占用等于2个英文。汉字的分词，是没有空格的。在Plone的诸多产品中(ZWiki /
 PloneCollectorNG /
 PloneTransitions等)，均没有考虑对中文折行的支持。因此开发一个通用的中文折行程序实在是很有必要。</p>
 <p>
 借鉴CJKSplitter的开发经验，我也做一个单行中文折行算法（应该也很容易支持日韩文字），当然不可能有英文的那么高效，却也很简洁。如下（最新版本位于
 <a href="http://blog.czug.org/panjunyong/mail-line-wrap">http://blog.czug.org/panjunyong/mail-line-wrap</a>）：</p>
 <p><font color="#3333FF">import re<br /></font><font color="#3333FF">rx=re.compile(u"([\u2e80-\uffff])", re.UNICODE)<br />
 <br /></font> <font color="#3333FF">def cjkwrap(text, width,
 encoding="utf8"):<br />
 &nbsp;&nbsp;&nbsp;&nbsp; return reduce(lambda line, word, width=width:
 '%s%s%s'
 %&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 (line,<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 [' ','\n', ''][(len(line)-line.rfind('\n')-1<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 + len(word.split('\n',1)[0] ) &gt;= width) or<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
 <font color="#3333FF">line[-1:] ==</font> <font color="#3333FF">'\0'</font>
 <font color="#3333FF">and 2],<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 word),<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 rx.sub(r'\1\0 ', unicode(text,encoding)).split(' ')<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 ).replace('\0', '').encode(encoding)<br />
 <br />
 def test():<br />
 &nbsp;&nbsp;&nbsp;&nbsp; msg ="""我们自己可以的，不是吗? whay 我们正的<br />
 &nbsp;要求是什么、how to dothat? no problem? !!
 但是中文就不同了，一个汉字的空间占用等于2个英文。汉字的分词，是没有空格的。<br />
 <br /></font> <font color="#3333FF">&nbsp;借鉴CJKSplitter的开发经验，我准备也做一个中文折行算法（应该也很容易支持日韩文字），当然不可能有英文的那么高效了：<br />
 &nbsp;英文是ascii，每个字符占用空间相同，直接使用空格就可以分词。因此英文版本的折行算法在python
 cookbook上有很经典的高效算法：<br />
 <br /></font> <font color="#3333FF">&nbsp;one-liner word-wrap
 function"""<br />
 &nbsp;&nbsp;&nbsp;&nbsp; return cjkwrap(msg, 50, 'gbk')<br />
 <br />
 if __name__ == '__main__':<br />
 &nbsp;&nbsp;&nbsp;&nbsp; print test()</font></p>
 <p>测试下来，效果还不错 :-) 如下：</p>
 <p><span style="color: rgb(0, 153, 0);">我们自己可以的，不是吗? whay
 我们正的</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">&nbsp;要求是什么、how to dothat? no problem?
 !! 但是中</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">文就不同了，一个汉字的空间占用等于2个英文。汉字的</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">分词，是没有空格的。</span><br style="color: rgb(0, 153, 0);" />
 <br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">&nbsp;借鉴CJKSplitter的开发经验，我准备也做一个中文折</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">行算法（应该也很容易支持日韩文字），当然不可能有</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">英文的那么高效了：</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">&nbsp;英文是ascii，每个字符占用空间相同，直接使用空格</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">就可以分词。因此英文版本的折行算法在python</span><br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">cookbook上有很经典的高效算法：</span><br style="color: rgb(0, 153, 0);" />
 <br style="color: rgb(0, 153, 0);" />
 <span style="color: rgb(0, 153, 0);">&nbsp;one-liner word-wrap
 function</span></p>
<br style="color: rgb(0, 153, 0);" />
 <br style="color: rgb(0, 153, 0);" />
 <br style="color: rgb(0, 153, 0);" />
