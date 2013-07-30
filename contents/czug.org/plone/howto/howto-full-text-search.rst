---
created: 2006-02-19 01:34:40
creator: panjy
description: Zope中的全文检索查询语法
title: 如何使用全文索引功能？
---
 <p>参考：<a href="http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition/SearchingZCatalog.stx">
 此文</a></p>
 <ol>
 <li>逻辑表达式
 <p>查询:</p>
 <pre> word1 AND word2<br /></pre>
 <p>将查询同时包括"word1"和"word2"的文章. AND, OR和NOT都是有效的逻辑运算符. 可以用减号"-"代替NOT操作符:</p>
 <pre> word1 -word2<br /></pre>
 <p>这表示查询出现了"word1"但是不包含"word2".</p>
 <p>没有操作符的一组词汇的缺省操作符是“AND”. 比如查询"carpet python snakes" 等同于"carpet AND python
 AND snakes".</p>
 </li>
 <li>使用括号
 <p>使用括号可以控制查询的次序，如:</p>
 <pre> (word1 AND word2) OR word3<br /></pre>
 <p>这将返回包含"word1" 和 "word2"，或者仅仅包含"word3"的内容.</p>
 </li>
 <li>任意匹配查询(模糊查询)
 <p>中文不支持任意匹配查询（没有意义），任意匹配查询仅仅对英文有效。比如查询:</p>
 <pre> Z*<br /></pre>
 <p>将返回所有以"Z"开始的单词, 或者:</p>
 <pre> Zop?<br /></pre>
 <p>将返回所有以"Zop"开始，并且仅仅包含另外一个字母。注意：任意匹配查询匹配符不能出现在查询词的前面.
 "?ope"是一个非法的查询语，将被忽略.</p>
 </li>
 <li>查询短语
 <p>使用双引号的文本查询表示词组查询, 例如:</p>
 <pre> "carpet python" OR frogs<br /></pre>
 <p>将查询所有出现"carpet python" 或"frogs"的内容。</p>
 <p>对于中文，如果你希望对某个连续汉字完全匹配查询，可加引号得到更好的查询效果。</p>
 </li>
 <li>混合查询
 <p>所有上述的高级特性合约相互混合使用。如:</p>
 <pre> ((bob AND uncle) NOT Zoo*)<br /></pre>
 <p>将返回所有的包含"bob" 和"uncle"，但不包含起始单词为"Zoo"（如："Zoologist", "Zoology", 或
 "Zoo"）的内容.</p>
 <p>类似的，查询:</p>
 <pre> snakes OR frogs -"carpet python"<br /></pre>
 <p>将返回所有的包含"snakes" 或者 "frogs" 但不包含短语"carpet python"的内容.</p>
 </li>
 <li>忽略索引的单词
 <p>如下英文单词由于在索引时将大量存在，所以将不做索引。您无法使用下列单词进行查询:</p>
 <pre> "a", "and", "are", "as", "at", "be", "but", "by",<br />
 "for", "if", "in", "into", "is", "it",<br />
 "no", "not", "of", "on", "or", "such",<br />
 "that", "the", "their", "then", "there", "these",<br />
 "they", "this", "to", "was", "will", "with"
</pre>
 </li>
 </ol>
 <p><a id="bottom" name="bottom"></a></p>
