---
created: 2005-01-13 09:50:13
creator: panjy
description: ZODB能够存放多少对象，有限制因素吗？看看jim的回答
title: ZODB的容量有限制吗？
---

 <p>Zope公司CTO Jim的这封邮件，可以解答很多人对ZODB的疑虑：</p>
 <p>Victor Ng wrote:</p>
 <blockquote type="cite">
 <p><span class="moz-txt-citetags">&gt;</span> Has anyone tested to see how
 large a ZODB can get in terms of number of objects?</p>
 </blockquote>
 <p><!-- %s -->In theory, the number of objects is unlimited. IOW, there is no
 architectural limit.<br />
 （理论上，ZODB的对象数目是无限的。在架构上没有限制）</p>
 <blockquote type="cite">
 <p><span class="moz-txt-citetags">&gt;</span> How much RAM should I expect
 to have to get acceptable performance for<br />
 <span class="moz-txt-citetags">&gt;</span> a large number of objects, say
 somewhere around 200,000-&gt;1,000,000 ?</p>
 </blockquote>
 <p><!-- %s -->That depends on lots of factors. Unfortunately, you really need
 to see what<br />
 works for your application. The main consumer of memory (for that number of
 objects)<br />
 is the in-memory object cache. How big this gets depends on how you've tuned
 it<br />
 and how you should tune it depends on your application's data structures
 and<br />
 access patterns.</p>
 <p>（要得到好的性能，主要靠一些参数的条件）</p>
 <p>(Your question is a little bit like asking "How much RAM to I need to
 use<br />
 Python?" <span class="moz-smiley-s1"><span>:)</span></span></p>
 <p>另外一封邮件讲解了参数cache_size的限制：</p>
 <p>You want to tune the cache_size parameter given to the constructor to the
 DB class, when creating your database object in Python. This parameter sets a
 <b class="moz-txt-star"><span class="moz-txt-tag">*</span>target<span class="moz-txt-tag">*</span></b> cache size, in number of objects, per connection.
 It is very imprecise because:</p>
 <ul>
 <li>Cache cleaning only happens at transaction boundaries and other discrete
 points, so it's not uncommon for the object cache to grow much larger than
 the target size.<br /></li>
 <li>The unit, number of objects, is loosly correlated to memory
 consumption.</li>
 </ul>
 <p>另外，其他人也对zodb的实现和问题做了解释：<br />
 <br />
 The cache also keeps "ghost" objects, which uses on the order of 100 bytes
 of<br />
 memory; it keeps a ghost for every object that is directly (one-hop)
 reachable from cached objects.<br />
 <br />
 Since an application may have multiple database connections, it may often
 have multiple copies of objects in memory.<br />
 <br />
 You have rough control over cache memory by changing the number of objects it
 holds.&nbsp; There are also some methods to flush or minimze the cache --
 evicting objects even if the cache has room for more objects.<br />
 <br />
 The way you implement objects has an obvious impact on memory usage.<br />
 ZODB loads a first-class persistent object as an atomic unit; it also<br />
 loads all reachable second-class persistent objects as the same time.<br />
 If you load a large object graph, because a 1st class object refers to<br />
 many 2nd class instances, you use a lot of memory when it is loaded.<br />
 (On the other hand, you effectively batch load many objects.)&nbsp; If
 you<br />
 use more 1st class objects and/or keep individual objects small, you<br />
 may get more efficient memory usage; you don't get a few large objects<br />
 in the cache that use a lot of memory.&nbsp; On the other hand, there's<br />
 more memory overhead for a 1st class persistent object.<br />
 <br />
 The storage implementation also needs memory.&nbsp; For example,<br />
 FileStorage maintains an in-memory index with an entry for each oid in<br />
 the storage.&nbsp; I don't recall exactly how much memory is used per<br />
 object.&nbsp; A very large storage will need a fair amount of memory
 for<br />
 the storage.&nbsp; ZEO is handy here, because the the storage runs in
 the<br />
 ZEO server process (potentially on a different machine).</p>
