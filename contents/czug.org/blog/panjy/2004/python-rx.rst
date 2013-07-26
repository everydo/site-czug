
 <p>python提供了一个<a href="http://docs.python.org/lib/module-re.html">rx包</a>,
 来支持<a href="http://www.zdnet.com.cn/developer/tech/story/0,2000081602,39077620,00.htm">正则表达式</a>.<br />
 <br />
 python的rx包中的<a href="http://docs.python.org/lib/re-syntax.html">正则表达式语法</a>是和perl兼容的。<a href="http://www.amk.ca/python/howto/regex/">在Python中如何使用正则表达式</a>呢？有如下说明:</p>
 <ul>
 <li>使用raw string, 由于正则表达式对\有自己的解释，所以使用raw string可以避免错误的书写<br /></li>
 <li>两种重复匹配模式: greedy和non-greedy<br />
 greedy采用最大匹配原则, 如"*"、"+"、"?"、"{m,n}"; non-greedy是最小匹配，对应为"*?"、"+?"、"??"、"{m,
 n}?"</li>
 <li>使用"(...)"定义匹配组（group），以便获得匹配字符串。使用"(?P&lt;name&gt;)"来标识这个组。<br /></li>
 <li>函数的两种调用方式：直接调用，或者编译后调用<br />
 使用re.compile可生成一个编译后的正则表达式对象后使用，预先编译可以提高执行速度；也可直接使用re模块的一些函数</li>
 <li>几种<a href="http://docs.python.org/lib/node111.html">执行标记</a><br />
 重要的包括多行(M)、unicode(U)、本地化(L)等</li>
 <li><a href="http://docs.python.org/lib/re-objects.html">主要的函数</a>:</li>
 <li style="list-style-type: none; list-style-image: none; list-style-position: outside;">
 <ul>
 <li>search():&nbsp; 最常用的，返回一个匹配对象(Match Object)<br /></li>
 <li>match()：类似search，但仅仅从文字的开始进行匹配；</li>
 <li>split()：分割一个string，返回字符串的数组</li>
 <li>findall()：找到所有的匹配字符串的清单(list)</li>
 <li>finditer()：类似findall，返回匹配对象(Match Object)的iteration</li>
 <li>sub(): 字符串替换<br /></li>
 <li>subn(): 类似sub, 但是同时返回替换的数量<br /></li>
 </ul>
 </li>
 <li><a href="http://docs.python.org/lib/match-objects.html">匹配对象</a>(Match
 Object): 匹配的结果，有如下操作函数:<br /></li>
 <li style="list-style-type: none; list-style-image: none; list-style-position: outside;">
 <ul>
 <li>group(): 得到匹配的字符串组。这个函数非常灵活，可传递组的编号、范围、名字等。<br /></li>
 <li>start(), end(), span(): 匹配字符串的起始、中止、范围</li>
 <li>groups(): 返回所有的子组</li>
 </ul>
 </li>
 </ul>
 <p>参考：</p>
 <ul>
 <li><a href="http://www.diveintopython.org/regular_expressions/index.html">dive into
 python对正则表达式的描述</a></li>
 <li><a href="http://linux.about.com/library/cmd/blcmdl1_pcretest.htm">linux上测试正则表达时候最佳工具pcretest</a></li>
 </ul>
