<ul>
 <li>这和 PyAIML 的汉化方法如出一辙，不过要方便多了。关键是一个所谓的 "Analyzer" 类：</li>
 </ul>
<pre>
import re<br />
class MyAnalyzer(object):<br />
 def __init__(self):<br />
 self.findall = re.compile('[\x81-\xff][\x00-\xff]|[^\x81-\xff]+').findall<br />
 self.split = lambda self, s: string.join( self.findall(s) )<br />
<br />
 def __call__(self, s):<br />
 tokenstream = string.split(s, ' ')<br />
 for m in tokenstream:<br />
 yield strip(self.split(m))
</pre>
 <br />
 
 <ul>
 <li>然后使用这个 Analyzer 来建立 Index：</li>
 </ul>
<pre>
from lupy.indexer import Index<br />
idx = Index("MyFolder", create=True, analyzer=MyAnalyzer())
</pre>
 <br />
 这种方法是把汉字单字当作英文单词来切分，是最简单的汉化方法。不过我们通常会使用 "二元分词" 的方法来进行单词切分。也不难。具体的写法大家自己来设计吧
 :)<br />