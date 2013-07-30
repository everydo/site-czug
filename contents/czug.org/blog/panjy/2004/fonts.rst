---
created: 2005-01-18 14:22:07
creator: panjy
description: 介绍常见的字体格式文件和相关的名词
title: 关于字体
---
<p>pdf输出和打印中，中文字体支持是容易出问题的地方。下面是找到的一些资料：</p>
<dl class="docutils">
<dt>type1字体</dt>
<dd>在postscript中使用, 但是只能保存256个字符，显然是为西方字母设计的. 此字体是开放的。http://www.ams.org/tex/type1-fonts.html</dd>
<dt>cid字体</dt>
<dd>最早来自PDF，专门为中、日、韩文设计，核心还是type1，但支持很方便的扩展。
<a class="reference" href="http://www.cprint.cn/html/article/article-049.htm">http://www.cprint.cn/html/article/article-049.htm</a></dd>
<dt>TrueType字体</dt>
<dd>微软和Adobe联合制作的标准，windows上都使用它</dd>
<dt>freetype</dt>
<dd>注意：这不是字体格式，而是一个开放的字体服务引擎，支持各种字体文件
<a class="reference" href="http://freetype.sourceforge.net/freetype2/index.html">http://freetype.sourceforge.net/freetype2/index.html</a></dd>
<dt>postscript</dt>
<dd>现代打印机基本都支持的输入接口文件格式。
<a class="reference" href="http://www.slat.org/project/software-map/v1.01/node113.html">http://www.slat.org/project/software-map/v1.01/node113.html</a></dd>
</dl>
<p>使用reportlabs尝试了一下，使用CID字符是可以支持中文的，但是目前的问题是字体太少了。还不知道PDF中是否可以使用truetype的字体。</p>
