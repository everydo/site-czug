<p>sqlite小巧轻便，深受欢迎，但是也存在一些局限。</p>
<div class="section">
<h3><a id="id1" name="id1">不支持外键</a></h3>
<p>如果你的表格中有类似的语句，sqlite会忽略的:</p>
<pre class="literal-block">
create table zope_suf.userroles (
 name varchar(64) not null references zope_suf.users(name)
 ...
</pre>
<p>上面的外键refernces约束是不支持的，如果要支持，需要手工写trigger。</p>
<p>参考：http://www.sqlite.org/cvstrac/wiki?p=ForeignKeyTriggers</p>
</div>
<div class="section">
<h3><a id="client-server" name="client-server">Client/Server应用</a></h3>
<p>Sqlite是没有Server的，当然更适合做web应用一些。如果做C/S则需要
通过文件共享来访问数据库，这个性能就差了；而且可能有写冲突。</p>
</div>
<div class="section">
<h3><a id="id2" name="id2">高访问量的网站</a></h3>
<p>Sqlite不可能把数据库对象分别部属在不同的计算机上，也就是说不可能实现
数据库的clusting。如果要有这个特性，需要考虑其他C/S架构的数据库。</p>
</div>
<div class="section">
<h3><a id="id3" name="id3">非常大的数据集</a></h3>
<p>在处理事务中，sqlite会在内存中分配一个脏页面表: 每1M的数据库会耗用256Byte
的内存。如果你的数据库修改达到数G，这个内存耗用会非常大。</p>
<p>如果数据的修改和存储超过数十G(应该不会)，你应该考虑其他的数据库。</p>
</div>
<div class="section">
<h3><a id="id4" name="id4">高并行</a></h3>
<p>SQLite是整个数据库级别的读写锁，大量并行读写，可能存在冲突。
因此不适合多个进程并行读写的情况。</p>
<p>参考: <a class="reference" href="http://www.sqlite.org/whentouse.html">http://www.sqlite.org/whentouse.html</a></p>
</div>
