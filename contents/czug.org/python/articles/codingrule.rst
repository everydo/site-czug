---
created: 
creator: panjy
description: ''
title: Python开发编码规范
---
<p><a href="http://wiki.woodpecker.org.cn/moin/PythonCodingRule">http://wiki.woodpecker.org.cn/moin/PythonCodingRule</a></p>
<div class="inside"><div lang="en" id="content" dir="ltr"><span id="top" class="anchor"/>
<span id="line-3" class="anchor"/><div><table><tbody><tr>  <td><p class="line891"><strong>Python开发编码规范</strong> </p></td>
<td><p class="line862"> <img width="15" height="15" title="{*}" src="/htdocs/woodpecker/img/star_on.png" alt="{*}"/>  <a href="/moin/CodeCommentingRule">文档化开发注释规范</a> </p></td>
</tr>
</tbody></table></div><span id="line-4" class="anchor"/><p class="line867"/><div class="table-of-contents"><p class="table-of-contents-heading">目录</p><ol><li><a href="#head-3659cb159e67b3acfdc234dcfeb0a4e7098508d1">Python Coding Rule</a><ol><li><a href="#head-412243e5ff260d9405929dfb5438dcb74e020013">介绍</a></li><li><a href="#head-dd177e6d92a1fd6b54b298d5b89bd4940abcf148">一致性的建议</a></li><li><a href="#head-6ccc9cb881c674c4d40f3db9c8c6f313fd60cda4">代码的布局</a><ol><li><a href="#head-618073a36b7b947a741997c00e5a729d39aff3f6">缩进</a></li><li><a href="#head-7d8433532dffea19b5c0be29e5ed3e2b79aa9503">制表符还是空格?</a></li><li><a href="#head-155feb7c23c6ef99e68759ed1d9d5cefc07086e1">行的最大长度</a></li><li><a
href="#head-8cdd435b044a9e8b5b714064b73daeac85cde2a2">空行</a></li><li><a href="#head-62037a58b15eceee9eff16658484893ae8789791">编码</a></li></ol></li><li><a href="#head-2e53a01bfcbdb15dc8895f20f99f9b268947a4d6">导入</a></li><li><a href="#head-9759812b7b03eb6d838a71d76f7afe0b4d5bb38f">空格</a><ol><li><a href="#head-46cf38185d2f61e5678b811f8cc331b9d02cccd9">其它建议</a></li></ol></li><li><a href="#head-7d7bdfbe6299504f91653381d6d0b6a390ae8699">注释</a><ol><li><a href="#head-fbe88f70fac5f3e585d939e91ed34d9bf842dd7f">注释块</a></li><li><a href="#head-ef1bb2b0d890e4cd6c2c42c7225bb4f937fcb01f">行内注释</a></li></ol></li><li><a href="#head-9c662a33ceba72c5acd083fd2ac398b8d4c7d216">文档化</a></li><li><a href="#head-e15168afe5203c4085af59cf24a6d2417f4e227e">版本注记</a></li><li><a
href="#head-732695faddbfd5c70b72daf24c8efc45402507cb">命名约定</a><ol><li><a href="#head-ec3dfc951fab3a931471a130211023f375fa459e">描述:命名风格</a></li><li><a href="#head-31f2c4b21f71bebc9dd574f6f66064624f332025">说明:命名约定</a><ol><li><a href="#head-800374d8cc154d88ac028f31f7918c302b4ab517">应避免的名字</a></li><li><a href="#head-2de6fb884113deabd22365f482203e61a9670a26">模块名</a></li><li><a href="#head-4b2436c259aae9076cf7ea6c98388a49128d72a5">类名</a></li><li><a href="#head-26a5acd6cec8d1d3dbbac96943e050e7249538fc">异常名</a></li><li><a href="#head-3fdc3a8eff7e731910cb9524ed97cc2476002357">全局变量名</a></li><li><a href="#head-8463d06ec59aebf1312b877cbc67bf20f5fb46f5">函数名</a></li><li><a
href="#head-ba8c26e02b3a9c3fcc02221ec6dd14a2b59bc64e">方法名和实例变量</a></li><li><a href="#head-63856ed8fb53bfcccf3f927d7fb1451077474457">继承的设计</a></li></ol></li></ol></li><li><a href="#head-1e7ebfe96f53d329a01aff6bcd7946e8822df541">设计建议</a></li></ol></li></ol></div> <span id="line-5" class="anchor"/><span id="line-6" class="anchor"/><p class="line867">
</p><h1 id="head-3659cb159e67b3acfdc234dcfeb0a4e7098508d1">1. Python Coding Rule</h1>
<span id="line-7" class="anchor"/><p class="line867"><span id="line-8" class="anchor"/></p><pre>  --- hoxide 初译 dreamingk 校对发布 040724
<span id="line-9" class="anchor"/>  --- xyb 重新排版 040915
<span id="line-10" class="anchor"/>  --- ZoomQuiet MoinMoin 美化 050610
<span id="line-11" class="anchor"/></pre><span id="line-12" class="anchor"/><div><table><tbody><tr>  <td><p class="line891"><strong>用Python进行开发时的编码风格约定</strong> </p></td>
<td><p class="line862"> 原文:<strong><a href="http://www.python.org/dev/peps/pep-0008/" class="http">PEP 008 《Style Guide for Python Code》</a> </strong> </p></td>
<td><p class="line862">下载(中文pdf): <a title="attachment:PythonCodingRule.pdf" href="/moin/PythonCodingRule?action=AttachFile&amp;do=get&amp;target=PythonCodingRule.pdf" class="attachment">PythonCodingRule.pdf</a> </p></td>
</tr>
</tbody></table></div><span id="line-13" class="anchor"/><p class="line867">
</p><h2 id="head-412243e5ff260d9405929dfb5438dcb74e020013">1.1. 介绍</h2>
<span id="line-14" class="anchor"/><ul><li style="list-style-type: none;">这篇文档所给出的编码约定适用于在主要的Python发布版本中组成标准库的Python 代码.请查阅相关的关于在Python的C实现中C代码风格指南的描述. 这篇文档改编自Guido最初的《Python风格指南》一文. 并从《Barry's style guide》中添加了部分内容. 在有冲突的地方，Guide的风格规则应该是符合本PEP的意图 (译注：就是当有冲突时，应以Guido风格为准) 这篇PEP也许仍然尚未完成(实际上，它可能永远不会结束). <span id="line-15" class="anchor"/></li></ul><p class="line867">
</p><h2 id="head-dd177e6d92a1fd6b54b298d5b89bd4940abcf148">1.2. 一致性的建议</h2>
<span id="line-16" class="anchor"/><p class="line867"><strong>愚蠢得使用一致性是无知的妖怪(A Foolish Consistency is the Hobgoblin of Little Minds)</strong> <span id="line-17" class="anchor"/><span id="line-18" class="anchor"/></p><p class="line867"><span id="line-19" class="anchor"/></p><pre>呆板的坚持一致性是傻的没边了!
<span id="line-20" class="anchor"/>-- Zoomq</pre><span id="line-21" class="anchor"/><ul><li style="list-style-type: none;">在这篇风格指导中的一致性是重要的. 在一个项目内的一致性更重要. 在一个模块或函数内的一致性最重要. 但最重要的是:知道何时会不一致 -- 有时只是没有实施风格指导.当出现疑惑时, <span id="line-22" class="anchor"/><ul><li style="list-style-type: none;">运用你的最佳判断.看看别的例子,然后决定怎样看起来更好.并且要不耻下问! <span id="line-23" class="anchor"/></li></ul></li><li>打破一条既定规则的两个好理由: <span id="line-24" class="anchor"/><ol type="1"><li>当应用这个规则是将导致代码可读性下降,即便对某人来说,他已经习惯于按这条规则来阅读代码了. <span id="line-25" class="anchor"/></li><li>为了和周围的代码保持一致而打破规则(也许是历史原因) <span id="line-26"
class="anchor"/><ul><li>-- 虽然这也是个清除其它混乱的好机会(真正的XP风格). <span id="line-27" class="anchor"/></li></ul></li></ol></li></ul><p class="line867">
</p><h2 id="head-6ccc9cb881c674c4d40f3db9c8c6f313fd60cda4">1.3. 代码的布局</h2>
<span id="line-28" class="anchor"/><p class="line874">(Code lay-out) <span id="line-29" class="anchor"/><span id="line-30" class="anchor"/></p><p class="line867">
</p><h3 id="head-618073a36b7b947a741997c00e5a729d39aff3f6">1.3.1. 缩进</h3>
<span id="line-31" class="anchor"/><p class="line874">(Indentation) <span id="line-32" class="anchor"/><span id="line-33" class="anchor"/></p><ul><li style="list-style-type: none;">使用Emacs的Python-mode的默认值:4个空格一个缩进层次. 对于确实古老的代码,你不希望产生混乱,可以继续使用8空格的制表符(8-space tabs). Emacs Python-mode自动发现文件中主要的缩进层次,依此设定缩进参数. <span id="line-34" class="anchor"/></li></ul><p class="line867">
</p><h3 id="head-7d8433532dffea19b5c0be29e5ed3e2b79aa9503">1.3.2. 制表符还是空格?</h3>
<span id="line-35" class="anchor"/><p class="line874">(Tabs or Spaces) <span id="line-36" class="anchor"/><span id="line-37" class="anchor"/></p><ul><li style="list-style-type: none;">永远不要混用制表符和空格. 最流行的Python缩进方式是仅使用空格, 其次是仅使用制表符.混合着制表符和空格缩进的代码将被转换成仅使用空格. (在Emacs中,选中整个缓冲区,按ESC-x去除制表符(untabify).) 调用python命令行解释器时使用-t选项,可对代码中不合法得混合制表符和空格发出警告(warnings). 使用-tt时警告(warnings)将变成错误(errors).这些选项是被高度推荐的. 对于新的项目,强烈推荐仅使用空格(spaces-only)而不是制表符. 许多编辑器拥有使之易于实现的功能.(在Emacs中,确认indent-tabs-mode是nil). <span id="line-38" class="anchor"/></li></ul><p class="line867">
</p><h3 id="head-155feb7c23c6ef99e68759ed1d9d5cefc07086e1">1.3.3. 行的最大长度</h3>
<span id="line-39" class="anchor"/><p class="line874">(Maximum Line Length) <span id="line-40" class="anchor"/><span id="line-41" class="anchor"/></p><ul><li style="list-style-type: none;">周围仍然有许多设备被限制在每行80字符;而且,窗口限制在80个字符 使将多个窗口并排放置成为可能.在这些设备上使用默认的折叠(wrapping)方式看起来有点丑陋. 因此,请将所有行限制在最大79字符(Emacs准确得将行限制为长80字符), 对顺序排放的大块文本(文档字符串或注释),推荐将长度限制在72字符. 折叠长行的首选方法是使用Pyhon支持的圆括号,方括号(brackets)和花括号(braces)内的行延续. 如果需要,你可以在表达式周围增加一对额外的圆括号, 但是有时使用反斜杠看起来更好.确认恰当得缩进了延续的行. Emacs的Python-mode正确得完成了这些.一些例子: <span id="line-42" class="anchor"/></li></ul><p class="line867"><span id="line-43"
class="anchor"/><span id="line-44" class="anchor"/><span id="line-45" class="anchor"/><span id="line-46" class="anchor"/><span id="line-47" class="anchor"/><span id="line-48" class="anchor"/><span id="line-49" class="anchor"/><span id="line-50" class="anchor"/><span id="line-51" class="anchor"/><span id="line-52" class="anchor"/><span id="line-53" class="anchor"/><span id="line-54" class="anchor"/><span id="line-55" class="anchor"/><span id="line-56" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
function isnumbered(obj) {
return obj.childNodes.length && obj.firstChild.childNodes.length && obj.firstChild.firstChild.className == 'LineNumber';
}
function nformat(num,chrs,add) {
var nlen = Math.max(0,chrs-(''+num).length), res = '';
while (nlen>0) { res += ' '; nlen-- }
return res+num+add;
}
function addnumber(did, nstart, nstep) {
var c = document.getElementById(did), l = c.firstChild, n = 1;
if (!isnumbered(c))
if (typeof nstart == 'undefined') nstart = 1;
if (typeof nstep  == 'undefined') nstep = 1;
n = nstart;
while (l != null) {
if (l.tagName == 'SPAN') {
var s = document.createElement('SPAN');
s.className = 'LineNumber'
s.appendChild(document.createTextNode(nformat(n,4,' ')));
n += nstep;
if (l.childNodes.length)
l.insertBefore(s, l.firstChild)
else
l.appendChild(s)
}
l = l.nextSibling;
}
return false;
}
function remnumber(did) {
var c = document.getElementById(did), l = c.firstChild;
if (isnumbered(c))
while (l != null) {
if (l.tagName == 'SPAN' && l.firstChild.className == 'LineNumber') l.removeChild(l.firstChild);
l = l.nextSibling;
}
return false;
}
function togglenumber(did, nstart, nstep) {
var c = document.getElementById(did);
if (isnumbered(c)) {
remnumber(did);
} else {
addnumber(did,nstart,nstep);
}
return false;
}
</script>

<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-8ada9855556deb262fcd69a4b5b0900c89ad5f20_000\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-8ada9855556deb262fcd69a4b5b0900c89ad5f20_000', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-8ada9855556deb262fcd69a4b5b0900c89ad5f20_000" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>        <span class="ResWord">class</span> <span class="ID">Rectangle</span><span class="Operator">(</span><span class="ID">Blob</span><span class="Operator">)</span><span class="Operator">:</span></span>
<span class="line"><span class="LineNumber">   2 </span>                <span class="ResWord">def</span> <span class="ID">__init__</span><span class="Operator">(</span><span class="ID">self</span><span class="Operator">,</span> <span class="ID">width</span><span class="Operator">,</span> <span class="ID">height</span><span class="Operator">,</span></span>
<span class="line"><span class="LineNumber">   3 </span>                             <span class="ID">color</span><span class="Operator">=</span><span class="String">'black'</span><span class="Operator">,</span> <span class="ID">emphasis</span><span class="Operator">=</span><span class="ID">None</span><span class="Operator">,</span> <span class="ID">highlight</span><span class="Operator">=</span><span class="Number">0</span><span class="Operator">)</span><span class="Operator">:</span></span>
<span class="line"><span class="LineNumber">   4 </span>                        <span class="ResWord">if</span> <span class="ID">width</span> <span class="Operator">==</span> <span class="Number">0</span> <span class="ResWord">and</span> <span class="ID">height</span> <span class="Operator">==</span> <span class="Number">0</span> <span class="ResWord">and</span> \
<span class="ID">color</span> <span class="Operator">==</span> <span class="String">'red'</span> <span class="ResWord">and</span> <span class="ID">emphasis</span> <span class="Operator">==</span> <span class="String">'strong'</span> <span class="ResWord">or</span> \
<span class="ID">highlight</span> <span class="Operator">></span> <span class="Number">100</span><span class="Operator">:</span></span>
<span class="line"><span class="LineNumber">   5 </span>                                <span class="ResWord">raise</span> <span class="ID">ValueError</span><span class="Operator">,</span> <span class="String">"sorry, you lose"</span></span>
<span class="line"><span class="LineNumber">   6 </span>                        <span class="ResWord">if</span> <span class="ID">width</span> <span class="Operator">==</span> <span class="Number">0</span> <span class="ResWord">and</span> <span class="ID">height</span> <span class="Operator">==</span> <span class="Number">0</span> <span class="ResWord">and</span> <span class="Operator">(</span><span class="ID">color</span> <span class="Operator">==</span> <span class="String">'red'</span> <span class="ResWord">or</span></span>
<span class="line"><span class="LineNumber">   7 </span>                                                           <span class="ID">emphasis</span> <span class="ResWord">is</span> <span class="ID">None</span><span class="Operator">)</span><span class="Operator">:</span></span>
<span class="line"><span class="LineNumber">   8 </span>                                <span class="ResWord">raise</span> <span class="ID">ValueError</span><span class="Operator">,</span> <span class="String">"I don't think so"</span></span>
<span class="line"><span class="LineNumber">   9 </span>                        <span class="ID">Blob</span><span class="Operator">.</span><span class="ID">__init__</span><span class="Operator">(</span><span class="ID">self</span><span class="Operator">,</span> <span class="ID">width</span><span class="Operator">,</span> <span class="ID">height</span><span class="Operator">,</span></span>
<span class="line"><span class="LineNumber">  10 </span>                                      <span class="ID">color</span><span class="Operator">,</span> <span class="ID">emphasis</span><span class="Operator">,</span> <span class="ID">highlight</span><span class="Operator">)</span><span class="Text"/></span>
</pre></div><span id="line-57" class="anchor"/><p class="line867">
</p><h3 id="head-8cdd435b044a9e8b5b714064b73daeac85cde2a2">1.3.4. 空行</h3>
<span id="line-58" class="anchor"/><p class="line874">(Blank Lines) <span id="line-59" class="anchor"/><span id="line-60" class="anchor"/></p><ul><li style="list-style-type: none;">用两行空行分割顶层函数和类的定义,类内方法的定义用单个空行分割. <span id="line-61" class="anchor"/></li><li style="list-style-type: none;">额外的空行可被用于(保守的(sparingly))分割一组相关函数(groups of related functions). 在一组相关的单句中间可以省略空行.(例如.一组哑元(a set of dummy implementations)). <span id="line-62" class="anchor"/></li><li
style="list-style-type: none;">当空行用于分割方法(method)的定义时,在'class'行和第一个方法定义之间也要有一个空行. <span id="line-63" class="anchor"/></li><li style="list-style-type: none;">在函数中使用空行时,请谨慎的用于表示一个逻辑段落(indicate logical sections). Python接受contol-L(即^L)换页符作为空格;Emacs(和一些打印工具) 视这个字符为页面分割符,因此在你的文件中,可以用他们来为相关片段(sections)分页. <span id="line-64" class="anchor"/></li></ul><p class="line867">
</p><h3 id="head-62037a58b15eceee9eff16658484893ae8789791">1.3.5. 编码</h3>
<span id="line-65" class="anchor"/><p class="line862">(Encodings)<a title="epes" href="/moin/InterWiki" class="badinterwiki">(PEP 263)</a> <span id="line-66" class="anchor"/><span id="line-67" class="anchor"/></p><ul><li style="list-style-type: none;">Python核心发布中的代码必须始终使用ASCII或Latin-1编码(又名 ISO-8859-1). 使用ASCII的文件不必有译码cookie(coding cookie). Latin-1仅当注释或文档字符串涉及作者名字需要Latin-1时才被使用; 另外使用\x转义字符是在字符串中包含非ASCII(non-ASCII)数据的首选方法. 作为PEP
263实现代码的测试套件的部分文件是个例外. <span id="line-68" class="anchor"/></li></ul><p class="line867"><span id="line-69" class="anchor"/></p><pre>Python 2.4 以后内核支持 Unicode 了！
<span id="line-70" class="anchor"/>不论什么情况使用 UTF-8 吧！这是王道！
<span id="line-71" class="anchor"/></pre><span id="line-72" class="anchor"/><p class="line862">--<a href="/moin/ZoomQuiet">ZoomQuiet</a> <span id="line-73" class="anchor"/><span id="line-74" class="anchor"/></p><p class="line867">
</p><h2 id="head-2e53a01bfcbdb15dc8895f20f99f9b268947a4d6">1.4. 导入</h2>
<span id="line-75" class="anchor"/><p class="line874">(Imports) <span id="line-76" class="anchor"/><span id="line-77" class="anchor"/></p><ul><li>通常应该在单独的行中导入(Imports),例如: <span id="line-78" class="anchor"/></li></ul><p class="line867"><span id="line-79" class="anchor"/></p><pre>                No:  import sys, os
<span id="line-80" class="anchor"/>                Yes: import sys
<span id="line-81" class="anchor"/>                     import os
<span id="line-82" class="anchor"/></pre><span id="line-83" class="anchor"/><ul><li style="list-style-type: none;">但是这样也是可以的: <span id="line-84" class="anchor"/></li></ul><p class="line867"><span id="line-85" class="anchor"/></p><pre>                from types import StringType, ListType
<span id="line-86" class="anchor"/></pre><span id="line-87" class="anchor"/><ul><li>Imports 通常被放置在文件的顶部,仅在模块注释和文档字符串之后,在模块的全局变量和常量之前.Imports应该有顺序地成组安放. <span id="line-88" class="anchor"/><ol type="1"><li>标准库的导入(Imports ) <span id="line-89" class="anchor"/></li><li>相关的主包(major package)的导入(即,所有的email包在随后导入) <span id="line-90" class="anchor"/></li><li>特定应用的导入(imports) <span id="line-91" class="anchor"/></li></ol></li><li>你应该在每组导入之间放置一个空行. <span
id="line-92" class="anchor"/></li><li>对于内部包的导入是不推荐使用相对导入的.对所有导入都要使用包的绝对路径. <span id="line-93" class="anchor"/></li><li>从一个包含类的模块中导入类时,通常可以写成这样: <span id="line-94" class="anchor"/></li></ul><p class="line867"><span id="line-95" class="anchor"/></p><pre>                from MyClass import MyClass
<span id="line-96" class="anchor"/>                from foo.bar.YourClass import YourClass
<span id="line-97" class="anchor"/></pre><span id="line-98" class="anchor"/><ul><li style="list-style-type: none;">如果这样写导致了本地名字冲突,那么就这样写 <span id="line-99" class="anchor"/></li></ul><p class="line867"><span id="line-100" class="anchor"/></p><pre>                import MyClass
<span id="line-101" class="anchor"/>           import foo.bar.YourClass
<span id="line-102" class="anchor"/></pre><span id="line-103" class="anchor"/><ul><li style="list-style-type: none;"><p class="line862">即使用<tt>"MyClass.MyClass"</tt>和<tt>"foo.bar.YourClass.YourClass"</tt> <span id="line-104" class="anchor"/></p></li></ul><p class="line867">
</p><h2 id="head-9759812b7b03eb6d838a71d76f7afe0b4d5bb38f">1.5. 空格</h2>
<span id="line-105" class="anchor"/><p class="line874">(Whitespace in Expressions and Statements) <span id="line-106" class="anchor"/><span id="line-107" class="anchor"/></p><ul><li style="list-style-type: none;">Guido不喜欢在以下地方出现空格: <span id="line-108" class="anchor"/></li><li style="list-style-type: none;"><p class="line891"><tt>"spam( ham[ 1 ], { eggs: 2 } )".  Always write this as</tt> <tt>"spam(ham[1], {eggs: 2})".</tt> <span id="line-109" class="anchor"/></p><ul><li><p
class="line862">紧挨着圆括号,方括号和花括号的,如:<tt>"spam( ham[ 1 ], { eggs: 2 } )".</tt> 要始终将它写成<tt>"spam(ham[1], {eggs: 2})".</tt> <span id="line-110" class="anchor"/></p></li></ul><p class="line891"><tt>"if x == 4 : print x , y ; x , y = y , x".</tt>  Always write this as <tt>"if x == 4: print x, y; x, y = y, x".</tt> <span id="line-111" class="anchor"/></p><ul><li>紧贴在逗号,分号或冒号前的,如: <span id="line-112" class="anchor"/></li></ul><p class="line891"><tt>"if x == 4 : print x , y ; x , y = y , x".</tt>  要始终将它写成
<tt>"if x == 4: print x, y; x, y = y, x".</tt> <span id="line-113" class="anchor"/></p><ul><li><p class="line862">紧贴着函数调用的参数列表前开式括号(open parenthesis )的,如<tt>"spam (1)"</tt>.要始终将它写成<tt>"spam(1)"</tt>. <span id="line-114" class="anchor"/></p></li></ul><p class="line891"><tt>slicing, as in: "dict ['key'] = list [index]".</tt>  Always write this as <tt>"dict['key'] = list[index]".</tt> <span id="line-115" class="anchor"/></p><ul><li>紧贴在索引或切片(slicing?下标?)开始的开式括号前的,如: <span id="line-116"
class="anchor"/></li></ul><p class="line891"><tt>"dict ['key'] = list [index]".要始终将它写成"dict['key'] = list[index]".</tt> <span id="line-117" class="anchor"/></p><ul><li>在赋值(或其它)运算符周围的用于和其它并排的一个以上的空格,如: <span id="line-118" class="anchor"/></li></ul></li></ul><p class="line867"><span id="line-119" class="anchor"/><span id="line-120" class="anchor"/><span id="line-121" class="anchor"/><span id="line-122" class="anchor"/><span id="line-123" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-4ea043ff9659dbf88b552ac03175acd233409a61_001\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-4ea043ff9659dbf88b552ac03175acd233409a61_001', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-4ea043ff9659dbf88b552ac03175acd233409a61_001" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                  <span class="ID">x</span>             <span class="Operator">=</span> <span class="Number">1</span></span>
<span class="line"><span class="LineNumber">   2 </span>                  <span class="ID">y</span>             <span class="Operator">=</span> <span class="Number">2</span></span>
<span class="line"><span class="LineNumber">   3 </span>                  <span class="ID">long_variable</span> <span class="Operator">=</span> <span class="Number">3</span><span class="Text"/></span>
</pre></div><span id="line-124" class="anchor"/><ul><li style="list-style-type: none;">要始终将它写成 <span id="line-125" class="anchor"/></li></ul><p class="line867"><span id="line-126" class="anchor"/><span id="line-127" class="anchor"/><span id="line-128" class="anchor"/><span id="line-129" class="anchor"/><span id="line-130" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-b9958e5a6e368d5632a88d50311ea71e85728f54_002\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-b9958e5a6e368d5632a88d50311ea71e85728f54_002', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-b9958e5a6e368d5632a88d50311ea71e85728f54_002" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                 <span class="ID">x</span> <span class="Operator">=</span> <span class="Number">1</span></span>
<span class="line"><span class="LineNumber">   2 </span>                 <span class="ID">y</span> <span class="Operator">=</span> <span class="Number">2</span></span>
<span class="line"><span class="LineNumber">   3 </span>                 <span class="ID">long_variable</span> <span class="Operator">=</span> <span class="Number">3</span><span class="Text"/></span>
</pre></div><span id="line-131" class="anchor"/><ul><li style="list-style-type: none;">(不要对以上任意一条和他争论 --- Guido 养成这样的风格超过20年了.) <span id="line-132" class="anchor"/></li></ul><p class="line867">
</p><h3 id="head-46cf38185d2f61e5678b811f8cc331b9d02cccd9">1.5.1. 其它建议</h3>
<span id="line-133" class="anchor"/><p class="line874">(Other Recommendations) <span id="line-134" class="anchor"/><span id="line-135" class="anchor"/></p><ul><li><p class="line862">始终在这些二元运算符两边放置一个空格:赋值(=), 比较(==, <, >, !=, <>, <=,>=, in, not in, is, is not), 布尔运算 (and, or, not). <span id="line-136" class="anchor"/></p></li></ul><p class="line874">* 按你的看法在算术运算符周围插入空格. 始终保持二元运算符两边空格的一致. <span id="line-137" class="anchor"/><span id="line-138"
class="anchor"/></p><ul><li>一些例子: <span id="line-139" class="anchor"/></li></ul><p class="line867"><span id="line-140" class="anchor"/><span id="line-141" class="anchor"/><span id="line-142" class="anchor"/><span id="line-143" class="anchor"/><span id="line-144" class="anchor"/><span id="line-145" class="anchor"/><span id="line-146" class="anchor"/><span id="line-147" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-37280c81ab86daf5140befd245c7302d96ac01c5_003\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-37280c81ab86daf5140befd245c7302d96ac01c5_003', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-37280c81ab86daf5140befd245c7302d96ac01c5_003" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                  <span class="ID">i</span> <span class="Operator">=</span> <span class="ID">i</span><span class="Operator">+</span><span class="Number">1</span></span>
<span class="line"><span class="LineNumber">   2 </span>                  <span class="ID">submitted</span> <span class="Operator">=</span> <span class="ID">submitted</span> <span class="Operator">+</span> <span class="Number">1</span></span>
<span class="line"><span class="LineNumber">   3 </span>                  <span class="ID">x</span> <span class="Operator">=</span> <span class="ID">x</span><span class="Operator">*</span><span class="Number">2</span> <span class="Operator">-</span> <span class="Number">1</span></span>
<span class="line"><span class="LineNumber">   4 </span>                  <span class="ID">hypot2</span> <span class="Operator">=</span> <span class="ID">x</span><span class="Operator">*</span><span class="ID">x</span> <span class="Operator">+</span> <span class="ID">y</span><span class="Operator">*</span><span class="ID">y</span></span>
<span class="line"><span class="LineNumber">   5 </span>                  <span class="ID">c</span> <span class="Operator">=</span> <span class="Operator">(</span><span class="ID">a</span><span class="Operator">+</span><span class="ID">b</span><span class="Operator">)</span> <span class="Operator">*</span> <span class="Operator">(</span><span class="ID">a</span><span class="Operator">-</span><span class="ID">b</span><span class="Operator">)</span></span>
<span class="line"><span class="LineNumber">   6 </span>                  <span class="ID">c</span> <span class="Operator">=</span> <span class="Operator">(</span><span class="ID">a</span> <span class="Operator">+</span> <span class="ID">b</span><span class="Operator">)</span> <span class="Operator">*</span> <span class="Operator">(</span><span class="ID">a</span> <span class="Operator">-</span> <span class="ID">b</span><span class="Operator">)</span><span class="Text"/></span>
</pre></div><span id="line-148" class="anchor"/><ul><li>不要在用于指定关键字参数或默认参数值的'='号周围使用空格,例如: <span id="line-149" class="anchor"/></li></ul><p class="line867"><span id="line-150" class="anchor"/><span id="line-151" class="anchor"/><span id="line-152" class="anchor"/><span id="line-153" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-e2b7edf7b5962feddd8f63075e47f14d29b561ce_004\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-e2b7edf7b5962feddd8f63075e47f14d29b561ce_004', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-e2b7edf7b5962feddd8f63075e47f14d29b561ce_004" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                  <span class="ResWord">def</span> <span class="ID">complex</span><span class="Operator">(</span><span class="ID">real</span><span class="Operator">,</span> <span class="ID">imag</span><span class="Operator">=</span><span class="Number">0.0</span><span class="Operator">)</span><span class="Operator">:</span></span>
<span class="line"><span class="LineNumber">   2 </span>                          <span class="ResWord">return</span> <span class="ID">magic</span><span class="Operator">(</span><span class="ID">r</span><span class="Operator">=</span><span class="ID">real</span><span class="Operator">,</span> <span class="ID">i</span><span class="Operator">=</span><span class="ID">imag</span><span class="Operator">)</span><span class="Text"/></span>
</pre></div><span id="line-154" class="anchor"/><ul><li>不要将多条语句写在同一行上. <span id="line-155" class="anchor"/></li></ul><p class="line867"><span id="line-156" class="anchor"/></p><pre>                  No:  if foo == 'blah': do_blah_thing()
<span id="line-157" class="anchor"/>                  Yes: if foo == 'blah':
<span id="line-158" class="anchor"/>                                   do_blah_thing()
<span id="line-159" class="anchor"/>                  No:  do_one(); do_two(); do_three()
<span id="line-160" class="anchor"/>                  Yes: do_one()
<span id="line-161" class="anchor"/>                           do_two()
<span id="line-162" class="anchor"/>                           do_three()
<span id="line-163" class="anchor"/></pre><span id="line-164" class="anchor"/><p class="line867">
</p><h2 id="head-7d7bdfbe6299504f91653381d6d0b6a390ae8699">1.6. 注释</h2>
<span id="line-165" class="anchor"/><p class="line874">(Comments) <span id="line-166" class="anchor"/><span id="line-167" class="anchor"/></p><ul><li style="list-style-type: none;">同代码不一致的注释比没注释更差.当代码修改时,始终优先更新注释! 注释应该是完整的句子. 如果注释是一个短语或句子,首字母应该大写, 除非他是一个以小写字母开头的标识符(永远不要修改标识符的大小写). 如果注释很短,最好省略末尾的句号(period?结尾句末的停顿?也可以是逗号吧,)
注释块通常由一个或多个由完整句子构成的段落组成,每个句子应该以句号结尾. 你应该在句末,句号后使用两个空格,以便使Emacs的断行和填充工作协调一致 (译按:应该说是使这两种功能正常工作,".  "给出了文档结构的提示). 用英语书写时,断词和空格是可用的. 非英语国家的Python程序员:请用英语书写你的注释,除非你120%的确信 这些代码不会被不懂你的语言的人阅读. <span id="line-168" class="anchor"/></li></ul><p class="line867"><span id="line-169"
class="anchor"/></p><pre>我就是坚持全部使用中文来注释，真正要发布脚本工具时，再想E文的；
<span id="line-170" class="anchor"/>开发时每一瞬间都要用在思量中，坚决不用在E文语法，单词的回忆中！
<span id="line-171" class="anchor"/></pre><span id="line-172" class="anchor"/><p class="line874">-- ZoomQUiet <span id="line-173" class="anchor"/><span id="line-174" class="anchor"/></p><ul><li><p class="line862">约定使用统一的文档化注释格式有利于良好习惯和团队建议！-- <a href="/moin/CodeCommentingRule">CodeCommentingRule</a> <span id="line-175" class="anchor"/></p></li></ul><p class="line867">
</p><h3 id="head-fbe88f70fac5f3e585d939e91ed34d9bf842dd7f">1.6.1. 注释块</h3>
<span id="line-176" class="anchor"/><p class="line874">(Block Comments) <span id="line-177" class="anchor"/><span id="line-178" class="anchor"/></p><ul><li style="list-style-type: none;">注释块通常应用于跟随着一些(或者全部)代码并和这些代码有着相同的缩进层次. 注释块中每行以'#'和一个空格开始(除非他是注释内的缩进文本). 注释块内的段落以仅含单个'#'的行分割. 注释块上下方最好有一空行包围(或上方两行下方一行,对一个新函数定义段的注释). <span id="line-179" class="anchor"/></li></ul><p
class="line867">
</p><h3 id="head-ef1bb2b0d890e4cd6c2c42c7225bb4f937fcb01f">1.6.2. 行内注释</h3>
<span id="line-180" class="anchor"/><p class="line874">(Inline Comments) <span id="line-181" class="anchor"/><span id="line-182" class="anchor"/></p><ul><li>(inline?内联?翻成"行内"比较好吧) <span id="line-183" class="anchor"/><ul><li style="list-style-type: none;">一个行内注释是和语句在同一行的注释.行内注释应该谨慎适用. 行内注释应该至少用两个空格和语句分开. 它们应该以'#'和单个空格开始. <span id="line-184" class="anchor"/></li></ul></li></ul><p class="line867"><span
id="line-185" class="anchor"/></p><pre>                x = x+1                 # Increment x
<span id="line-186" class="anchor"/></pre><span id="line-187" class="anchor"/><ul><li style="list-style-type: none;">如果语意是很明了的,那么行内注释是不必要的,事实上是应该被去掉的. 不要这样写: <span id="line-188" class="anchor"/></li></ul><p class="line867"><span id="line-189" class="anchor"/></p><pre>                x = x+1                 # Increment x
<span id="line-190" class="anchor"/></pre><span id="line-191" class="anchor"/><p class="line867"><span id="line-192" class="anchor"/></p><pre>                x = x+1                 # Compensate for border
<span id="line-193" class="anchor"/></pre><span id="line-194" class="anchor"/><ul><li style="list-style-type: none;">但是有时,这样是有益的: <span id="line-195" class="anchor"/></li></ul><p class="line867"><span id="line-196" class="anchor"/></p><pre>                x = x+1                 # Compensate for border
<span id="line-197" class="anchor"/></pre><span id="line-198" class="anchor"/><p class="line867">
</p><h2 id="head-9c662a33ceba72c5acd083fd2ac398b8d4c7d216">1.7. 文档化</h2>
<span id="line-199" class="anchor"/><p class="line874">(Documentation Strings) <span id="line-200" class="anchor"/><span id="line-201" class="anchor"/></p><ul><li style="list-style-type: none;">Conventions for writing good documentation strings (a.k.a. "docstrings") are immortalized in <span id="line-202" class="anchor"/><p class="line891"><a title="epes" href="/moin/InterWiki" class="badinterwiki">PEP 257</a>.
应该一直遵守编写好的文档字符串(又名"docstrings")的约定(?实在不知道怎么译) <span id="line-203" class="anchor"/></p></li></ul><p class="line867"><span id="line-204" class="anchor"/></p><pre>Documentation Strings-- 文档化字符 ;
<span id="line-205" class="anchor"/>为配合 pydoc;epydoc,Doxygen等等文档化工具的使用,类似于MoinMoin 语法,约定一些字符,
<span id="line-206" class="anchor"/>以便自动提取转化为有意义的文档章节等等文章元素!
<span id="line-207" class="anchor"/>-- Zoomq</pre><span id="line-208" class="anchor"/><ul><li>为所有公共模块,函数,类和方法编写文档字符串.文档字符串对非公开的方法不是必要的,但你应该有一个描述这个方法做什么的注释.这个注释应该在"def"这行后. <span id="line-209" class="anchor"/></li><li><p class="line891"><a title="epes" href="/moin/InterWiki" class="badinterwiki">PEP 257</a> 描述了好的文档字符串的约定.一定注意,多行文档字符串结尾的""" 应该单独成行,例如: <span id="line-210"
class="anchor"/></p></li></ul><p class="line867"><span id="line-211" class="anchor"/></p><pre>          """Return a foobang
<span id="line-212" class="anchor"/>          Optional plotz says to frobnicate the bizbaz first.
<span id="line-213" class="anchor"/>          """
<span id="line-214" class="anchor"/></pre><span id="line-215" class="anchor"/><ul><li>对单行的文档字符串,结尾的"""在同一行也可以. <span id="line-216" class="anchor"/></li></ul><p class="line867"><span id="line-217" class="anchor"/></p><pre>实际上Python 自个儿就使用文档化编码维护着所有内置对象的使用说明\
<span id="line-218" class="anchor"/>不信的话常试:
<span id="line-219" class="anchor"/>        #python
<span id="line-220" class="anchor"/>>>> import time
<span id="line-221" class="anchor"/>>>> dir(time)
<span id="line-222" class="anchor"/>['__doc__', '__file__', '__name__', 'accept2dyear', 
'altzone', 'asctime', 'clock', 'ctime', 'daylight', 'gmtime', 
'localtime', 'mktime', 'sleep', 'strftime', 'strptime', 'struct_time', 
'time', 'timezone', 'tzname', 'tzset']
<span id="line-223" class="anchor"/>>>> help(time.time)
<span id="line-224" class="anchor"/>Help on built-in function time in module time:
<span id="line-225" class="anchor"/>time(...)
<span id="line-226" class="anchor"/>        time() -> floating point number
<span id="line-227" class="anchor"/>        Return the current time in seconds since the Epoch.
<span id="line-228" class="anchor"/>        Fractions of a second may be present if the system clock provides them.
<span id="line-229" class="anchor"/></pre><span id="line-230" class="anchor"/><p class="line867">
</p><h2 id="head-e15168afe5203c4085af59cf24a6d2417f4e227e">1.8. 版本注记</h2>
<span id="line-231" class="anchor"/><p class="line874">(Version Bookkeeping) (我觉得叫"注记"更好) <span id="line-232" class="anchor"/><span id="line-233" class="anchor"/></p><ul><li style="list-style-type: none;">如果你要将RCS或CVS的杂项(crud)包含在你的源文件中,按如下做. <span id="line-234" class="anchor"/></li></ul><p class="line867"><span id="line-235" class="anchor"/><span id="line-236" class="anchor"/><span id="line-237" class="anchor"/><span id="line-238"
class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-3a6927d7c3a87cbec851b837d54e40784ac00934_005\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-3a6927d7c3a87cbec851b837d54e40784ac00934_005', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-3a6927d7c3a87cbec851b837d54e40784ac00934_005" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                <span class="ID">__version__</span> <span class="Operator">=</span> <span class="String">"$Revision: 1.4 $"</span></span>
<span class="line"><span class="LineNumber">   2 </span>                <span class="Comment"># $Source: E:/cvsroot/python_doc/pep8.txt,v $</span><span class="Text"/></span>
</pre></div><span id="line-239" class="anchor"/><ul><li style="list-style-type: none;">这个行应该包含在模块的文档字符串之后,所有代码之前,上下用一个空行分割. <span id="line-240" class="anchor"/></li></ul><p class="line867"><span id="line-241" class="anchor"/></p><pre>对于CVS的服务器工作标记更应该在代码段中明确出它的使用
<span id="line-242" class="anchor"/>如：在文档的最开始的版权声明后应加入如下版本标记：
<span id="line-243" class="anchor"/># 文件：$id$
<span id="line-244" class="anchor"/># 版本： $Revision$
<span id="line-245" class="anchor"/>这样的标记在提交给配置管理服务器后，会自动适配成为相应的字符串，如：
<span id="line-246" class="anchor"/># 文件：$Id: ussp.py,v 1.22 2004/07/21 04:47:41 hd Exp $
<span id="line-247" class="anchor"/># 版本： $Revision: 1.4 $
<span id="line-248" class="anchor"/>----HD
<span id="line-249" class="anchor"/></pre><span id="line-250" class="anchor"/><p class="line867">
</p><h2 id="head-732695faddbfd5c70b72daf24c8efc45402507cb">1.9. 命名约定</h2>
<span id="line-251" class="anchor"/><p class="line874">(Naming Conventions) <span id="line-252" class="anchor"/><span id="line-253" class="anchor"/></p><ul><li style="list-style-type: none;">Python库的命名约定有点混乱,所以我们将永远不能使之变得完全一致--- 不过还是有公认的命名规范的. 新的模块和包(包括第三方的框架)必须符合这些标准,但对已有的库存在不同风格的, 保持内部的一致性是首选的. <span id="line-254" class="anchor"/></li></ul><p class="line867">
</p><h3 id="head-ec3dfc951fab3a931471a130211023f375fa459e">1.9.1. 描述:命名风格</h3>
<span id="line-255" class="anchor"/><p class="line874">(Descriptive: Naming Styles) <span id="line-256" class="anchor"/><span id="line-257" class="anchor"/></p><ul><li style="list-style-type: none;">有许多不同的命名风格.以下的有助于辨认正在使用的命名风格,独立于它们的作用. 以下的命名风格是众所周知的: <span id="line-258" class="anchor"/></li><li>b (单个小写字母) <span id="line-259" class="anchor"/></li><li>B (单个大写字母) <span id="line-260"
class="anchor"/></li><li>小写串 如:getname <span id="line-261" class="anchor"/></li><li>带下划的小写串 如:_getname <span id="line-262" class="anchor"/></li><li>大写串 如:GETNAME <span id="line-263" class="anchor"/></li><li>带下划的大写串 如:_GETNAME <span id="line-264" class="anchor"/></li><li><p class="line891"><tt class="backtick">CapitalizedWords</tt>(首字母大写单词串) (或 <tt class="backtick">CapWords</tt>, <tt class="backtick">CamelCase</tt> --
这样命名是由于它的字母错落有致的样子而来的. <span id="line-265" class="anchor"/></p><ul><li style="list-style-type: none;"><p class="line862">这有时也被当作<tt class="backtick">StudlyCaps</tt>. 如:<tt class="backtick">GetName</tt> <span id="line-266" class="anchor"/></p></li></ul></li><li><p class="line891"><tt class="backtick">mixedCase</tt> (混合大小写串)(与首字母大写串不同之处在于第一个字符是小写如:getName) <span id="line-267" class="anchor"/></p></li><li><p
class="line891"><tt class="backtick">Capitalized_Words_With_Underscores</tt>(带下划线的首字母大写串) (丑陋!) <span id="line-268" class="anchor"/></p></li><li>还有一种使用特别前缀的风格，用于将相关的名字分成组.这在Python中不常用, <span id="line-269" class="anchor"/></li><li>但是出于完整性要提一下.例如, <span id="line-270" class="anchor"/><span id="line-271" class="anchor"/><pre>os.stat()函数返回一个tuple,
<span id="line-272" class="anchor"/> 他的元素传统上有象st_mode, st_size, st_mtime等等这样的名字.
<span id="line-273" class="anchor"/>X11库的所有公开函数以X开头.
<span id="line-274" class="anchor"/></pre><span id="line-275" class="anchor"/></li></ul><p class="line874">(在Python中,这个风格通常认为是不必要的,        因为属性和方法名以对象作前缀,而函数名以模块名作前缀.) <span id="line-276" class="anchor"/><span id="line-277" class="anchor"/></p><ul><li style="list-style-type: none;">另外,以下用下划线作前导或结尾的特殊形式是被公认的(这些通常可以和任何习惯组合(使用?)): <span id="line-278"
class="anchor"/></li><li>_single_leading_underscore(以一个下划线作前导): 弱的"内部使用(internal use)"标志. <span id="line-279" class="anchor"/><ul><li>(例如,"from M import *"不会导入以下划线开头的对象). <span id="line-280" class="anchor"/></li></ul></li><li>single_trailing_underscore_(以一个下划线结尾): 用于避免与Python关键词的冲突,例如. <span id="line-281" class="anchor"/><ul><li><p class="line862">"Tkinter.Toplevel(master, class_='<a href="/moin/ClassName"
class="nonexistent">ClassName</a>')". <span id="line-282" class="anchor"/></p></li></ul></li><li><p class="line891"><tt>__double_leading_underscore</tt>(双下划线): 从Python 1.4起为类私有名. <span id="line-283" class="anchor"/></p></li><li><p class="line891"><tt>__double_leading_and_trailing_underscore__</tt>: 特殊的(magic) 对象或属性,存在于用户控制的(user-controlled)名字空间, 例如:<tt>__init__</tt>, <tt>__import__</tt> 或 <tt>__file__</tt>. 有时它们被用户定义,
用于触发某个特殊行为(magic behavior)(例如:运算符重载); 有时被构造器(infrastructure)插入,以便自己使用或为了调试. 因此,在未来的版本中,构造器(松散得定义为Python解释器和标准库) 可能打算建立自己的魔法属性列表,用户代码通常应该限制将这种约定作为己用. 欲成为构造器的一部分的用户代码可以在下滑线中结合使用短前缀,例如. <tt>__bobo_magic_attr__</tt>. <span id="line-284" class="anchor"/></p></li></ul><p class="line867">
</p><h3 id="head-31f2c4b21f71bebc9dd574f6f66064624f332025">1.9.2. 说明:命名约定</h3>
<span id="line-285" class="anchor"/><p class="line874">(Prescriptive: Naming Conventions) <span id="line-286" class="anchor"/><span id="line-287" class="anchor"/></p><p class="line867">
</p><h4 id="head-800374d8cc154d88ac028f31f7918c302b4ab517">1.9.2.1. 应避免的名字</h4>
<span id="line-288" class="anchor"/><p class="line874">(Names to Avoid) <span id="line-289" class="anchor"/><span id="line-290" class="anchor"/></p><ul><li style="list-style-type: none;">永远不要用字符`l'(小写字母el(就是读音,下同)), <span id="line-291" class="anchor"/><p class="line891"><tt class="backtick">O'(大写字母oh),或</tt>I'(大写字母eye)作为单字符的变量名. 在某些字体中,这些字符不能与数字1和0分开.当想要使用'l'时，用'L'代替它. <span id="line-292"
class="anchor"/></p></li></ul><p class="line867">
</p><h4 id="head-2de6fb884113deabd22365f482203e61a9670a26">1.9.2.2. 模块名</h4>
<span id="line-293" class="anchor"/><p class="line874">(Module Names) <span id="line-294" class="anchor"/><span id="line-295" class="anchor"/></p><ul><li style="list-style-type: none;">模块应该是不含下划线的,简短的,小写的名字. 因为模块名被映射到文件名, 有些文件系统大小写不敏感并且截短长名字, 模块名被选为相当短是重要的---这在Unix上不是问题, 但当代码传到Mac 或Windows上就可能是个问题了. 当一个用C或C++写的扩展模块有一个伴随的Python模块,这个Python模块提供了 <span
id="line-296" class="anchor"/><ul><li style="list-style-type: none;">一个更高层(例如，更面向对象)的接口时,C/C++模块有一个前导下划线(如：_socket) <span id="line-297" class="anchor"/></li></ul>Python包应该是不含下划线的,简短的,全小写的名字. <span id="line-298" class="anchor"/></li></ul><p class="line867">
</p><h4 id="head-4b2436c259aae9076cf7ea6c98388a49128d72a5">1.9.2.3. 类名</h4>
<span id="line-299" class="anchor"/><p class="line874">(Class Names) <span id="line-300" class="anchor"/><span id="line-301" class="anchor"/></p><ul><li style="list-style-type: none;"><p class="line862">几乎没有例外，类名总是使用首字母大写单词串(<tt class="backtick">CapWords</tt>)的约定. <span id="line-302" class="anchor"/></p></li></ul><p class="line867">
</p><h4 id="head-26a5acd6cec8d1d3dbbac96943e050e7249538fc">1.9.2.4. 异常名</h4>
<span id="line-303" class="anchor"/><p class="line874">(Exception Names) <span id="line-304" class="anchor"/><span id="line-305" class="anchor"/></p><ul><li style="list-style-type: none;">如果模块对所有情况定义了单个异常,它通常被叫做"error"或"Error". 似乎内建(扩展)的模块使用"error"(例如:os.error), 而Python模块通常用"Error" (例如: xdrlib.Error). <span id="line-306" class="anchor"/><p class="line862">趋势似乎是倾向使用<tt class="backtick">CapWords</tt>异常名. <span
id="line-307" class="anchor"/></p></li></ul><p class="line867">
</p><h4 id="head-3fdc3a8eff7e731910cb9524ed97cc2476002357">1.9.2.5. 全局变量名</h4>
<span id="line-308" class="anchor"/><p class="line874">(Global Variable Names) <span id="line-309" class="anchor"/><span id="line-310" class="anchor"/></p><ul><li style="list-style-type: none;">(让我们希望这些变量打算只被用于模块内部) 这些约定与那些用于函数的约定差不多.被设计可以通过"from M import *"来使用的 <span id="line-311" class="anchor"/><ul><li style="list-style-type: none;">那些模块,应该在那些不想被导入的全局变量(还有内部函数和类)前加一个下划线). <span
id="line-312" class="anchor"/></li></ul></li></ul><p class="line867">
</p><h4 id="head-8463d06ec59aebf1312b877cbc67bf20f5fb46f5">1.9.2.6. 函数名</h4>
<span id="line-313" class="anchor"/><p class="line874">(Function Names) <span id="line-314" class="anchor"/><span id="line-315" class="anchor"/></p><ul><li style="list-style-type: none;">函数名应该为小写,可能用下划线风格单词以增加可读性. <span id="line-316" class="anchor"/><p class="line891"><tt class="backtick">mixedCase</tt>仅被允许用于这种风格已经占优势的上下文(如: threading.py) 以便保持向后兼容. <span id="line-317" class="anchor"/></p></li></ul><p
class="line867">
</p><h4 id="head-ba8c26e02b3a9c3fcc02221ec6dd14a2b59bc64e">1.9.2.7. 方法名和实例变量</h4>
<span id="line-318" class="anchor"/><p class="line874">(Method Names and Instance Variables) <span id="line-319" class="anchor"/><span id="line-320" class="anchor"/></p><ul><li style="list-style-type: none;">这段大体上和函数相同:通常使用小写单词,必要时用下划线分隔增加可读性. 使用一个前导下划线仅用于不打算作为类的公共接口的内部方法和实例变量. Python不强制要求这样; 它取决于程序员是否遵守这个约定. 使用两个前导下划线以表示类私有的名字.
Python将这些名字和类名连接在一起: <span id="line-321" class="anchor"/><p class="line862">如果类Foo有一个属性名为 <tt>__a</tt>, 它不能以<tt>Foo.__a</tt>访问. (执著的用户(An insistent user)还是可以通过<tt>Foo._Foo__a</tt>得到访问权.) 通常,双前导下划线应该只用来避免与类(为可以子类化所设计)中的属性发生名字冲突. <span id="line-322" class="anchor"/></p></li></ul><p class="line867">
</p><h4 id="head-63856ed8fb53bfcccf3f927d7fb1451077474457">1.9.2.8. 继承的设计</h4>
<span id="line-323" class="anchor"/><p class="line874">(Designing for inheritance) <span id="line-324" class="anchor"/><span id="line-325" class="anchor"/></p><ul><li style="list-style-type: none;">始终要确定一个类中的方法和实例变量是否要被公开. 通常,永远不要将数据变量公开,除非你实现的本质上只是记录. 人们总是更喜欢给类提供一个函数的接口作为替换 (Python 2.2 的一些开发者在这点上做得非常漂亮). 同样,确定你的属性是否应为私有的.私有与非公有的区别在于:
前者永远不会被用在一个派生类中,而后者可能会. 是的,你应该在大脑中就用继承设计好了你的类. 私有属性必须有两个前导下划线,无后置下划线. 非公有属性必须有一个前导下划线,无后置下划线. 公共属性没有前导和后置下划线,除非它们与保留字冲突, 在此情况下,单个后置下划线比前置或混乱的拼写要好, 例如:class_优于klass. 最后一点有些争议; 如果相比class_你更喜欢klass,那么这只是一致性问题. <span id="line-326" class="anchor"/></li></ul><p class="line867">
</p><h2 id="head-1e7ebfe96f53d329a01aff6bcd7946e8822df541">1.10. 设计建议</h2>
<span id="line-327" class="anchor"/><p class="line874">(Programming Recommendations) <span id="line-328" class="anchor"/><span id="line-329" class="anchor"/></p><ul><li>同象None之类的单值进行比较,应该永远用:'is'或'is not'来做. 当你本意是"if x is not None"时,对写成"if x"要小心 -- 例如当你测试一个默认为None的变量或参数是否被设置为其它值时. 这个其它值可能是一个在布尔上下文中为假的值! <span id="line-330" class="anchor"/></li><li>基于类的异常总是好过基于字符串的异常.
模块和包应该定义它们自己的域内特定的基异常类(base exception class), 基类应该是内建的Exception类的子类. 还始终包含一个类的文档字符串.例如: <span id="line-331" class="anchor"/></li></ul><p class="line867"><span id="line-332" class="anchor"/><span id="line-333" class="anchor"/><span id="line-334" class="anchor"/><span id="line-335" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-85383e2ff1c52a648bf6b0895889148c3785d05b_006\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-85383e2ff1c52a648bf6b0895889148c3785d05b_006', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-85383e2ff1c52a648bf6b0895889148c3785d05b_006" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                <span class="ResWord">class</span> <span class="ID">MessageError</span><span class="Operator">(</span><span class="ID">Exception</span><span class="Operator">)</span><span class="Operator">:</span></span>
<span class="line"><span class="LineNumber">   2 </span>                        <span class="String">"""Base class for errors in the email package."""</span><span class="Text"/></span>
</pre></div><span id="line-336" class="anchor"/><ul><li>使用字符串方法(methods)代替字符串模块,除非必须向后兼容Python 2.0以前的版本. 字符串方法总是非常快,而且和unicode字符串共用同样的API(应用程序接口) <span id="line-337" class="anchor"/></li><li>在检查前缀或后缀时避免对字符串进行切片. 用startswith()和endswith()代替, 因为它们是明确的并且错误更少. 例如: <span id="line-338" class="anchor"/></li></ul><p class="line867"><span id="line-339"
class="anchor"/></p><pre>                No:  if foo[:3] == 'bar':
<span id="line-340" class="anchor"/>                Yes: if foo.startswith('bar'):
<span id="line-341" class="anchor"/></pre><span id="line-342" class="anchor"/><ul><li style="list-style-type: none;">例外是如果你的代码必须工作在Python 1.5.2 (但是我们希望它不会发生!). <span id="line-343" class="anchor"/></li><li>对象类型的比较应该始终用isinstance()代替直接比较类型.例如: <span id="line-344" class="anchor"/></li></ul><p class="line867"><span id="line-345" class="anchor"/></p><pre>                No:  if type(obj) is type(1):
<span id="line-346" class="anchor"/>                Yes: if isinstance(obj, int):
<span id="line-347" class="anchor"/></pre><span id="line-348" class="anchor"/><ul><li style="list-style-type: none;">检查一个对象是否是字符串时,紧记它也可能是unicode字符串! 在Python 2.3, str和unicode有公共的基类,basestring,所以你可以这样做: <span id="line-349" class="anchor"/></li></ul><p class="line867"><span id="line-350" class="anchor"/><span id="line-351" class="anchor"/><span id="line-352" class="anchor"/></p><div lang="en" dir="ltr"
class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-4965ed48058c3e9ac1a9e94e99d6cbb2616c3ef6_007\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-4965ed48058c3e9ac1a9e94e99d6cbb2616c3ef6_007', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-4965ed48058c3e9ac1a9e94e99d6cbb2616c3ef6_007" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                <span class="ResWord">if</span> <span class="ID">isinstance</span><span class="Operator">(</span><span class="ID">obj</span><span class="Operator">,</span> <span class="ID">basestring</span><span class="Operator">)</span><span class="Operator">:</span><span class="Text"/></span>
</pre></div><span id="line-353" class="anchor"/><ul><li style="list-style-type: none;"><p class="line862">在Python 2.2 类型模块为此定义了<a href="/moin/StringTypes" class="nonexistent">StringTypes</a>类型, 例如: <span id="line-354" class="anchor"/></p></li></ul><p class="line867"><span id="line-355" class="anchor"/><span id="line-356" class="anchor"/><span id="line-357" class="anchor"/><span id="line-358" class="anchor"/></p><div
lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-eb717319e47e22096478e1c13c966237327e41d1_008\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-eb717319e47e22096478e1c13c966237327e41d1_008', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-eb717319e47e22096478e1c13c966237327e41d1_008" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                <span class="ResWord">from</span> <span class="ID">types</span> <span class="ResWord">import</span> <span class="ID">StringTypes</span></span>
<span class="line"><span class="LineNumber">   2 </span>                <span class="ResWord">if</span> <span class="ID">isinstance</span><span class="Operator">(</span><span class="ID">obj</span><span class="Operator">,</span> <span class="ID">StringTypes</span><span class="Operator">)</span><span class="Operator">:</span><span class="Text"/></span>
</pre></div><span id="line-359" class="anchor"/><ul><li style="list-style-type: none;">在Python 2.0和2.1,你应该这样做: <span id="line-360" class="anchor"/></li></ul><p class="line867"><span id="line-361" class="anchor"/><span id="line-362" class="anchor"/><span id="line-363" class="anchor"/><span id="line-364" class="anchor"/><span id="line-365" class="anchor"/></p><div lang="en" dir="ltr" class="codearea">
<script type="text/javascript">
document.write('<a href="#" onclick="return togglenumber(\'CA-01709e679fdc65154a55f48d7dfb4a0d9ed1c5ca_009\', 1, 1);" \
class="codenumbers">切换行号显示<\/a>');
</script><a class="codenumbers" onclick="return togglenumber('CA-01709e679fdc65154a55f48d7dfb4a0d9ed1c5ca_009', 1, 1);" href="#">切换行号显示</a>
<pre lang="en" id="CA-01709e679fdc65154a55f48d7dfb4a0d9ed1c5ca_009" dir="ltr"><span class="line"><span class="LineNumber">   1 </span>                <span class="ResWord">from</span> <span class="ID">types</span> <span class="ResWord">import</span> <span class="ID">StringType</span><span class="Operator">,</span> <span class="ID">UnicodeType</span></span>
<span class="line"><span class="LineNumber">   2 </span>                <span class="ResWord">if</span> <span class="ID">isinstance</span><span class="Operator">(</span><span class="ID">obj</span><span class="Operator">,</span> <span class="ID">StringType</span><span class="Operator">)</span> <span class="ResWord">or</span> \
<span class="ID">isinstance</span><span class="Operator">(</span><span class="ID">obj</span><span class="Operator">,</span> <span class="ID">UnicodeType</span><span class="Operator">)</span> <span class="Operator">:</span><span class="Text"/></span>
</pre></div><span id="line-366" class="anchor"/><ul><li>对序列,(字符串(strings),列表(lists),元组(tuples)), 使用空列表是false这个事实,因此"if not seq"或"if seq"比 "if len(seq)"或"if not len(seq)"好. <span id="line-367" class="anchor"/></li><li>书写字符串文字时不要依赖于有意义的后置空格. 这种后置空格在视觉上是不可辨别的,并且有些编辑器(特别是近来,reindent.py) 会将它们修整掉. <span
id="line-368" class="anchor"/></li><li>不要用 == 来比较布尔型的值以确定是True或False(布尔型是Pythn 2.3中新增的) <span id="line-369" class="anchor"/></li></ul><p class="line867"><span id="line-370" class="anchor"/></p><pre>                No:  if greeting == True:
<span id="line-371" class="anchor"/>                Yes: if greeting:
<span id="line-372" class="anchor"/>                No:  if greeting == True:
<span id="line-373" class="anchor"/>                Yes: if greeting:
<span id="line-374" class="anchor"/></pre><span id="line-375" class="anchor"/><p class="line867"/><hr/><p class="line874"> <span id="line-376" class="anchor"/></p><ul><li style="list-style-type: none;"><p class="line862">-- <a href="/moin/ZoomQuiet">ZoomQuiet</a> (2005-01-26) <span id="line-377" class="anchor"/></p></li></ul><span id="bottom" class="anchor"/></div></div>
