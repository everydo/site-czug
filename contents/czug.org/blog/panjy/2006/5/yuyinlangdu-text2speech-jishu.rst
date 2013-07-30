---
created: 2006-05-04 20:31:53
creator: panjy
description: Python/Plone中的语音朗读支持。
title: 文字语音合成(Text2Speech)技术
---
<p>Python/Plone中的语音朗读支持。</p>
<p>文字语音合成技术，在自动呼叫服务中心，比如考试查分、天气预报、银行客服方面应用很多。很多词典也都有语音朗读的功能，还有什么语音邮件、语音短信方面的应用。</p>
<p>对网站来说，语音朗读功能，建立语音门户(Voice Portal)，可通过电话来获取网站信息，甚至进行电子商务。</p>
<p>另外，对于视力障碍人士，这也是一个不可或缺的技术；还有，现在ipod流行，如果结合RSS，可能还会出现很多不错的应用.</p>
<p>也是看到python.cn的论坛上的一些讨论，收集一下相关的Python/Plone语音开发资源：</p>
<dl class="docutils">
<dt><a class="reference" href="http://mary.dfki.de/">OpenMary文字语音朗读系统</a></dt>
<dd>支持德语、英语、藏语，是德国 <a class="reference" href="http://www.dfki.de/lt/">DFKI语音技术实验室</a> 主持的一个开源项目。
<a class="reference" href="http://plone.org/products/speech-synthesis-tool">Speech Synthesis Tool</a> 是
这个他在Plone上的集成产品。这里有一个
<a class="reference" href="http://mary.dfki.de/online-demos/speech_synthesis">在线试用的地方</a></dd>
<dt><a class="reference" href="http://www.microsoft.com/speech">直接使用微软的Speech SDK</a></dt>
<dd><p class="first last">如果使用win32com接口访问，会比较麻烦， <a class="reference" href="http://www.dev.idv.tw:8080/folder.2005-02-27.6191275545/folder.2005-02-14.5124708507/folder.2005-02-14.6268706512/document.2005-02-26.6200162224">这里</a> 有介绍:</p>
</dd>
<dt><a class="reference" href="http://www.cs.unc.edu/~parente/tech/tr02.shtml">pyTTS</a></dt>
<dd><p class="first">这是对微软的speech API的一个Python封装，非常好用。
需要下载一个巨大的
<a class="reference" href="http://www.microsoft.com/speech/download/sdk51/">中文支持语音开发包</a>.</p>
<p class="last"><a class="reference" href="http://blog.donews.com/limodou/archive/2005/06/30/449211.aspx">limodou有相关的使用经验</a> 。</p>
</dd>
</dl>
<p>另外，这里有个安徽中科大讯飞语音系统，中文支持非常好:</p>
<p><a class="reference" href="http://www.iflytek.com/speech%20shows.asp">http://www.iflytek.com/speech%20shows.asp</a></p>
