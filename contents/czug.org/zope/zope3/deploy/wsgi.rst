===============
WSGI部署
===============

- Zope 3天然支持WSGI
- 对于Zope 2/Grok，可以用repoze来支持: http://repoze.org
- 对于Zope 3可以不需要ZODB的：

  -  http://svn.objectrealms.net/view/public/browser/ore.wsgiapp/trunk/src/ore/wsgiapp
  - repoze.obob 和 repoze.kiss 就是另外一个例子，可以直接发布文件系统中的对象

- WSGI站点: http://www.wsgi.org/wsgi

  这里包括很多WSGI框架、服务器、中间件

