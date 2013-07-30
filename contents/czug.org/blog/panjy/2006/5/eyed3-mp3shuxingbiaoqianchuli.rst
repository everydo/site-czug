---
created: 2006-05-11 14:46:49
creator: panjy
description: eyeD3_ 是对mp3文件的属性信息进行操作的一个python包。
title: eyeD3:mp3属性标签处理
---
<p><a class="reference" href="http://eyed3.nicfit.net/">eyeD3</a> 是对mp3文件的属性信息进行操作的一个python包。</p>
<p>试用了一下 <a class="reference" href="http://eyed3.nicfit.net/">eyeD3</a> , 功能比较强，但是发现对中文支持并不好:</p>
<pre class="literal-block">
&gt;&gt;&gt; import eyeD3
&gt;&gt;&gt; t = eyeD3.tag.Tag()
&gt;&gt;&gt; t.link('zhiyouni.mp3')
1
&gt;&gt;&gt; t.getTitle()
u'\xd6\xbb\xd3\xd0\xc4\xe3'
&gt;&gt;&gt; print t.getTitle()
Ö»ÓÐÄã
&gt;&gt;&gt; print '\xd6\xbb\xd3\xd0\xc4\xe3'.decode('gb2312')
只有你
</pre>
<p>显然编码上有问题:-(.</p>
<p>我用的是6.6版本，用这个版本填写的中文标题，realplayer也不认成了乱码 :-(</p>
<p>另外，发现文件名也不支持unicode，给作者提交了一个小补丁。上面的bug也报给
了作者，希望他在下个版本能够解决。</p>
<p>好的开源软件很多，但是大都一碰到中文就不行了。另外还看了一下 <a class="reference" href="http://www.liquidx.net/pytagger/">pytagger</a>
，据说专门为gbk/big5编码设计，但是接口却不慎友好。</p>
