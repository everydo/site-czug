---
created: 2004-08-17 11:23:13
creator: panjy
description: CST，中国标准时间（China Standard Time), 还是美国中部标准时间（Center Standard Time）?
title: zope的时间bug
---

 <p>
 在Linux上使用zope的人常会被zope和linux的时间搅得胡涂，通常出现Zope显示的时间和实际的时间不匹配。特别是在Redhat的某些版本上。<br>

 <br>
 Linux上使用date命令，查看当前的时间，比如：</p>
 <pre>
Mon Aug 16 08:44:42 GMT+8 2004
</pre>

 <p><br>
 表示GMT+8时区的时间，也就是我们中国所在的时区的时间了。<br>
 <br>
 不过，在Redhat上却经常用CST来代替GMT+8, Linux认为CST是China Standard Time的缩写，如：</p>
 <pre>
Mon Aug 16 08:44:42 CST 2004
</pre>

 <p>可到了zope上，情况却不同了，Zope的DateTime\DateTime.py中定义为：</p>
 <pre>
'cst':'US/Central'
</pre>

 <p>这就是根结所在，Zope认为CST是美国中部时间的意思！<br>
 <br>
 解决办法，修改Zope中DateTime\DateTime.py的定义：</p>
 <pre>
'cst':'GMT+8'
</pre>

 <p>这个补丁，将包括到ZopeChinaPak的下个版本中。本文参考tcchou的 <a href="http://zope.slat.org/Members/tcchou/index_html/install_CMFWeblog">安装CMFWeblog</a>中的地区时间修补一节。<br>

 <br>
 Linux时间命令参考：</p>
 <pre wrap="">
date -s "2004-08-16 GMT8"<br>
date -s 8:46
</pre>
