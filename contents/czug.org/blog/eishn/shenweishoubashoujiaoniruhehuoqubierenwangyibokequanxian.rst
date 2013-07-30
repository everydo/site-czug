---
created: 2007-01-08 14:36:56
creator: eishn
description: 注入, crack, xss, javascript
title: 沈崴手把手教你如何获取别人网易博客权限
---
<h1>沈崴手把手教你如何获取别人网易博客权限</h1>
<a href="http://eishn.plonespace.net/images/step6.jpg"><img src="http://eishn.plonespace.net/images/step6.jpg/image_preview" /></a><br />
<p align="left">好了,
现在就让我们来聊些别的,
比如如何获取别人在网易博客上的权限。</p>

<p align="left">基本上网易博客的漏洞还是比较多的,
今天先讲一下
XSS
攻击。这个算是最简单的攻击方法,
以后如果有空,
我还会补充一些其他方法。下面就让我们开始吧。</p><p align="left"><br /></p>


<p><b>IE
JavaScript </b><b>注入</b></p>

<p align="left">那么什么是
JavaScript
注入呢?
所谓
JavaScript
注入,
就是利用网页编辑器,
在网站上写入自己
JavaScript
代码。因为这些代码可以在用户的浏览器上执行,
所以会产生一些非预期的效果,
特别是可以将用户的
Cookie
发送出去而造成安全性问题,
俗称
XSS
攻击。所以一般而言系统会删除用户提交的可执行代码,
这点网易博客就做得很周到,
它的客户端编辑器会删除用户有意输入的
JavaScript
脚本,
并且在服务器上也进行了判断。如果要进行脚本注入,
我们必须先越过这些检查。因为网易博客系统还算比较严格,
所以对于不同的浏览器,
我们需要用不同的方法来实现。</p>

<p align="left">这里,
先说说如何照顾用户的
IE
浏览器。请大家跟我做。</p>
<p align="left"><a href="http://eishn.plonespace.net/images/step1.jpg"><img src="http://eishn.plonespace.net/images/step1.jpg/image_preview" /></a><br />
</p>
<p align="left"></p>

<p align="left"><br /></p><p align="left">这里为了测试方便,
我们暂且使用博客提供的
"自定义
HTML"
功能。然后使用如下程序生成一段编过码的
HTML,
填写到博客上。</p>

<p align="left"></p>
<p align="left"><a href="http://eishn.plonespace.net/images/step2.jpg"><img src="http://eishn.plonespace.net/images/step2.jpg/image_preview" /></a><br />
</p>
<p align="left"><br /></p><p align="left">接下来浏览一下你的博客,
发现什么了?</p>
<p align="left"><a href="http://eishn.plonespace.net/images/step3.jpg"><img src="http://eishn.plonespace.net/images/step3.jpg/image_preview" /></a><br />
</p>
<p align="left"></p>

<p align="left"><br /></p><p align="left">我们的代码已经成功注入。这段代码成功地修改了网易博客的
Logo
标志,
并且将用户的
Cookie
打印到了提示窗口上。现在,
面向
IE
的
JavaScript
注入已经完成。</p>

<p align="left">如果你是老鸟,
不言而喻,
下面的内容基本上已经可以略过了。</p>

<p align="left"><br />
</p>
<p align="left"><b>FireFox
JavaScript </b><b>注入</b></p>

<p align="left">作为
Unix
程序员,
不跨平台是可耻的。所以现在就让我们来照顾一下
FireFox
用户。这次,
让我们来注入一个更加邪恶的程序。</p>
<p align="left"><a href="http://eishn.plonespace.net/images/step4.jpg"><img src="http://eishn.plonespace.net/images/step4.jpg/image_preview" /></a><br />
</p>
<p align="left"></p>

<p align="left"><br /></p><p align="left">这个程序将在用户没有察觉的情况下把他的
Cookie
发送给某个监控服务器。架设这个监控服务器并不难,
从上面的演示图片中我们看到,
一点技术含量都没有。</p>

<p align="left">下面我们继续,
这里我们假定有一个已经登录了的网易博客用户
"鬼使神差"
地访问了你的博客。结果就发生了下面这件事情。</p>
<p align="left"><a href="http://eishn.plonespace.net/images/step5.jpg"><img src="http://eishn.plonespace.net/images/step5.jpg/image_preview" /></a><br />
</p>
<p align="left"></p>

<p align="left"><br /></p><p align="left">好的,
现在我已经拿到了你的
Cookie。如果没有估计错误,
我现在应该能够以你的身份登录到你的博客上来去了。下面就让我们来验明正身。</p>
<p align="left"><a href="http://eishn.plonespace.net/images/step6.jpg"><img src="http://eishn.plonespace.net/images/step6.jpg/image_preview" /></a><br />
</p>
<p align="left"></p>

<p align="left"><br /></p><p align="left">不错,
只要有人访问了我的博客,
我就能马上得到他的权限。</p>

<p align="left"><br />
</p>
<p align="left"><b>接下来我该做什么呢</b><b>?</b></p>

<p align="left">嗯,
接下来我就直接销毁掉用户的
Cookie,
防止用户登出。当然,
我们离用户的密码也已经不远了,
这个我就不赘述了。</p>

<p align="left">当然我还可以改进程序,
或许可以利用
XMLHttpRequest/WebMail
将你的
Cookie
直接发送到我的邮箱。</p>

<p align="left">如果嫌麻烦,
我可能会写一个
Proxy
直接使用普通浏览器来享受你的用户待遇。</p>

<p align="left">当一切搞定之后,
我就会上到网易博客官方
Blog
上,
向管理员和广大用户推销我的个人博客。</p>

<p align="left"><br />
</p>
<p align="left"><b>我的申明</b></p>

<p align="left">事实上,
我并不是所谓骇客,
我的出发点不过是想能够自定义更多的页面功能。比如说
Logo
图片。</p>

<p align="left">基本上,
构建一个站点要比攻击它难很多。而且像网易博客这么强大的系统,
想要做到绝对安全,
我觉得是根本不可能的。说实话,
我的奇技淫巧和网易博客伟大程序设计师的技术比起来根本不值一提。</p>

<p align="left">最后我想告诉所有有志于此道的小屁孩一个坏消息, 我已经将问题向网易博客反映, 网易博客很快进行了修补。现在的博客是非常安全的, 否则大家也看不到这篇文章。<br /></p>
<p></p>
