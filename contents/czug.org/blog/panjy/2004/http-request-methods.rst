
 <p>HTML中，我们编写form表单的时候，会设置mothod为post或者get。在HTTP协议中还有哪些方法呢？<br />
 <br />
 参考<a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html">HTTP1.1的标准方法</a>，和
 <a href="http://www.webdav.org/specs/rfc2518.html">webdav的扩展方法</a>，介绍如下：</p>
 <ul>
 <li>GET<br />
 通过请求URI得到资源<br /></li>
 <li>POST,<br />
 用于添加新的内容<br /></li>
 <li>PUT<br />
 用于修改某个内容<br /></li>
 <li>DELETE,<br />
 删除某个内容<br /></li>
 <li>CONNECT,<br />
 用于代理进行传输，如使用SSL<br /></li>
 <li>OPTIONS<br />
 询问可以执行哪些方法<br /></li>
 <li>PATCH,<br />
 部分文档更改<br /></li>
 <li>PROPFIND, (wedav)<br />
 查看属性<br /></li>
 <li>PROPPATCH, (wedav)<br />
 设置属性<br /></li>
 <li>MKCOL, (wedav)<br />
 创建集合（文件夹）<br /></li>
 <li>COPY, (wedav)<br />
 拷贝<br /></li>
 <li>MOVE, (wedav)<br />
 移动<br /></li>
 <li>LOCK, (wedav)<br />
 加锁<br /></li>
 <li>UNLOCK (wedav)<br />
 解锁<br /></li>
 <li>TRACE<br />
 用于远程诊断服务器<br /></li>
 <li>HEAD<br />
 类似于GET, 但是不返回body信息，用于检查对象是否存在，以及得到对象的元数据</li>
 </ul>
 <p>apache2中，可使用Limit，LimitExcept进行访问控制的方法包括：<code>GET</code>,
 <code>POST</code>, <code>PUT</code>, <code>DELETE</code>,
 <code>CONNECT</code>, <code>OPTIONS</code>, <code>PATCH</code>,
 <code>PROPFIND</code>, <code>PROPPATCH</code>, <code>MKCOL</code>,
 <code>COPY</code>, <code>MOVE</code>, <code>LOCK</code>, 和
 <code>UNLOCK</code>.</p>
 <p>其中, HEAD GET POST OPTIONS PROPFIND是和读取相关的方法，MKCOL PUT DELETE LOCK UNLOCK
 COPY MOVE PROPPATCH是和修改相关的方法</p>
