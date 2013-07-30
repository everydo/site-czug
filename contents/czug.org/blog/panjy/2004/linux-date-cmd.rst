---
created: 2004-11-30 08:56:33
creator: panjy
description: Linux上设置正确时间，可真不是一件容易的事情 ...
title: Linux上让人迷惑的时间设置
---

 <p>前面已经讨论过<a href="http://blog.czug.org/panjunyong/zope-datetime-bug">CST时区的含义</a>了。事实上，在debian上使用dpkg-reconfigure
 timezoneconf，选择上海所在的时区，其结果也是CST。<br />
 <br />
 从<a href="http://www.worldtimezone.com/wtz-names/timezonenames.html">worldtimezone.com</a>上得知，一个时区缩写，的确是有多种含义的，CST可代表：</p>
 <ul>
 <li>Central Standard Time (USA) Heure Normale du Centre (french)&nbsp;
 UTC-06</li>
 <li>Central Standard Time (Australia)&nbsp; UTC+0930</li>
 <li>China Time&nbsp; UTC+08</li>
 <li>Cuba Summer Time UTC-04<br /></li>
 </ul>
 <p>因此，通过时区缩写设置时间，是不科学的。很容易导致zope等程序出现问题。<br />
 <br />
 那么使用绝对时区，应该更加安全了。中国是东8区：+0800，那是否应该把时区设置为GMT+8呢？<br />
 <br />
 答案居然是否！应该设置为GMT-8，这是非常奇怪的，相信是很多linux用户容易犯的错误。可以使用下面的命令测试：</p>
 <pre>
# date +%z%Z<br />
+0800GMT-8
</pre>
 <p><br />
 表示GMT-8 代表+0800。据说<a href="http://lists.debian.org/debian-chinese-gb/2002/07/msg00063.html">Sun的Solaris也是这个奇怪的表示方法</a>。</p>
 <p>2004年10月30补充：<br />
 <br />
 这原来是posix规范的一个bug，而且没有人愿意去调整了。参看<a href="http://collector.zope.org/Zope/1552">我在zope上报告的一个bug</a>，结论是：<br />
 <br />
 使用dpkg-reconfigure
 timezoneconf时，不要使用etc中的GMT时区。那些时区是老的、过时的、很奇怪的东东，还是应该使用三个英文字母的缩写。但既然CST这么
 不确定，就不能用。幸好有一个HKT，是表示香港的时间，也是东8区，这个没有错。托香港的福，就用这个好了。</p>
