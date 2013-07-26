
 <p>从zope2.7版本开始，zope实例的配置全部集中在实例目录下的etc/zope.conf文件中。<br />
 <br />
 刚刚发现，这里有<a href="http://mechanicalcat.net/tech/zope/Zope_schema.html">完整的配置文件解释</a>。<br />
 <br />
 zodb_db中的cache-size<br />
 数据库的缓存大小，这里是缓存对象的数目，而不是内存。加大，可以提升性能。这个是一个常用的机关。<br />
 <br />
 trusted-proxy<br />
 设置代理服务器，如果是通过apache转向到zope的，最好这里为apache服务器的地址，便于在程序中判断真正的client地址。<br />
 <br />
 http-server中的webdav-source-clients<br />
 设置使用webdav
 source访问，而不是普通的http请求的client的正则表达式。这个设置后不必再单独开启webdav-source端口了。这个用得不多。<br />
 <br />
 <code>http-header-max-length</code><br />
 zope2.7.4新添加的指令，限制请求头的最大长度，用于避免被攻击。</p>
<br />
 <br />
