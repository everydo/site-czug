---
created: 2007-09-15 00:56:34
creator: zhangbingkai
description: ''
title: Plone3.0初显成效
---
<h1>Plone3.0初显成效</h1>
<p class="discreet">翻译Limi的一篇文章：http://limi.net/articles/some-preliminary-plone-3.0-benchmark-results</p>
<p class="discreet">文章同时发布在Benky's Space上：http://benky.plonespace.net/sentiment/plone3-0chuxianchengxiao<br /></p>
<p>自从我们更多聚焦在即将发布的Plone3.0的性能后，我运行了一些基本的，下面的结果是相对于Plone2.5的基准：</p>
<p>下图能说明它们的不同：</p>
<a href="http://limi.net/media/plone-2.5-3.0.png/image_view_fullscreen"><img class="image-inline" src="http://limi.net/media/plone-2.5-3.0.png/image_preview" alt="Plone 2.5 vs. 3.0" /></a><br /><br />对于匿名用户，首页的标准页面，所有的数字表明Plone3.0更佳，测试的Plone服务是在没有任何的缓存代理和Web服务在Plone服务之上，使用的2GHz MacBook Core Duo.<br /><br />数据用表格表示：
<table class="listing">
<tbody>
<tr>
<th><br /></th>
<th>HTTP requests<br /></th>
<th>Page rendering<br /></th>
<th>Page weight<br /></th>
</tr>
</tbody>
<tbody>
<tr>
<th>Plone 2.5</th>
<td>28</td>
<td>222 ms</td>
<td>198 KB</td>
</tr>
<tr>
<th>Plone 3.0</th>
<td>11</td>
<td>138 ms</td>
<td>127 KB<br /></td>
</tr>
<tr>
<th>Difference</th>
<td>17 fewer</td>
<td>84 ms faster</td>
<td>71 KB smaller</td>
</tr>
<tr>
<th>Improvement</th>
<td><em>61% fewer</em></td>
<td><em>61% more req/s</em></td>
<td><em>36% smaller</em></td>
</tr>
</tbody>
</table>
<br />的确有不错的进步。我尤其高兴递归一个页面减少HTTP请求的数字－－它减少到只有Plone2.5一半还少的请求。一般的浏览器仅做了3个并行请求，所以不论传输速度，怎样快速的在浏览器上显示网页，做出了巨大的差异。<br /><br />对
于登录用户，Plone3.0也更有重大的速度改进，它非常引人注意。因为新的Ajax
UI使得相对Plone2.5有更多的Javascript在服务，但这在首次登录后就被缓存在浏览器中，这是一次性的花费。而且这些使得
Plone3.0更为友好，更具生产力，比如可点击页面上的一些元素并且可直接编辑，这相当于对一次性花费是一个很好的补尝。