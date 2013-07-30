---
created: 2004-12-27 02:00:20
creator: panjy
description: locale的设置，影响地域相关的输出显示和编码
title: debian/python/zope的locale设置
---

 <p>locale的设置，会影响操作系统函数的输出，比如错误提示语言、货币符号、日期格式等。</p>
<br />
 <h2>Debian中的设置</h2>
 <p>在Debian中，设置系统支持的locale方法为：</p>
 <pre>
dpkg-reconfigure locales
</pre>
 <p>可查看装载的编码方法：</p>
 <pre>
locale -a
</pre>
 <p>更改当前的locale:</p>
 <pre>
export LANG=zh_CN.GB2312
</pre>
 <p>更多中文支持设置参考：<br />
 <a href="http://wiki.linux.org.hk/index.php/How_to_make_Debian_support_chinese">http://wiki.linux.org.hk/index.php/How_to_make_Debian_support_chinese</a></p>
<br />
 <h2>Python的设置</h2>
 <p>python有一个locale包，可设置当前的locale参数。</p>
 <pre>
import locale<br />
locale.setlocale(locale.LC_ALL, 'zh_CN.GBK')
</pre>
 <h2>Zope的设置</h2>
 <p>zope的配置文件Zope.conf中，有一个locale的设置:</p>
 <pre>
locale zh_CN.UTF8
</pre>
 <p>注意，这里设置为UTF8比较重要，这样才能和Plone中显示的编码才一致，否则日期显示等方面会出现乱码。</p>
