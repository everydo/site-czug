---
created: 2012-04-09 18:27:18
creator:
description: 
title: Pyramid的Request和Response
---

====================================
Pyramid的Request和Response
====================================

Pyramid中request、response对象的实现基于WebOb包。其主要的类pyramid.request.Request就是webob.Request的子类，pyramid.response.Response也是webob.Response的子类。

WebOb封装了WSGI请求的环境变量、应答状态、Header变量等信息，提供了便利的请求分析与应答构造功能。


一、Request
-------------------

request对象是对WSGI环境变量的一个封装。开发者仍然可以直接通过request.environ来访问所有的环境变量。


1. 常用属性：

- req.method：GET、POST等信息
- req.GET：URL query string中的所有变量形成的一个multidict
- req.POST：所有在request.body中的变量形成的一个multidict，只有在POST情况下且是表单提交才有值
- req.params：req.GET和req.POST两者的结合。
- req.body：request的body内容，包含整个request body的字符串。可以通过req.body_file得到一个类文件的对象方便操作
- req.json_body：JSON编码的body内容
- req.cookies：包含所有cookie的字典
- req.headers：包含所有header信息的字典，大小写无关。所有的HTTP请求header信息也是request属性，如req.accept_language, req.content_length, req.user_agent，其类型都已经转化到了合适的类型。


2. Pyramid相关属性

在webob属性之外，pyramid还添加了一些Pyramid自身的重要属性，比如context，registry，subpath，traversed，view_name、virtual_root、virtual_root_path，session，matchdict，matched_route。


3. URL相关属性

为了清楚起见，我们假定一个URL为http://localhost/app/blog?id=10，而应用的加载目录为http://localhost/app，则我们可以看到：

- req.url：整个url，这里就是http://localhost/app/blog?id=10
- req.host：Host，这里就是localhost
- req.host_url：Host URL，这里就是http://localhost
- req.application_url：应用URL，这里就是http://localhost/app
- req.path_url：包含PATH_INFO的URL，这里就是http://localhost/app/blog
- req.path：去掉host和schema的URL，这里就是/app/blog
- req.path_qs：req.path加上query string，这里就是/app/blog?id=10
- req.query_string，这里就是id=10
- req.relative_url(url，to_application=False)：相对url计算，即url加上当前request的URL


4. 相关方法

- Request.blank(base_url)：利用base_url创建一个空的request对象，也可以用req.copy()复制一个。req.copy_get()复制成GET请求。
- req.get_response(wsgi_application)：利用本请求调用一个wsgi应用，返回一个pyramid.response.Response对象。


5. Unicode编码

在提供了req.GET、req.POST等unicode形式的值之外，pyramid还提供了req.str_GET，req.str_POST这样的str类型的值供选择。


6. multidict

因为web开发中，经常有几个表单域使用同一个名字的情况，因此一个key就会有多个值，这种情况，普通的字典肯定无法使用，因此webob使用了multidict这种扩展字典，其中一个key可以对应多个值。

如一个query string为?pref=red&pref=blue，那么request.GET['pref']为'blue'（最后一个值），如果要取得所有的值，则需要用request.GET.getall('pref')。如果确定某个key有且只能有一个值，可用request.GET.getone('pref')，这种方式下一旦该key没有对应值或有多个对应值，均抛异常。

如果要得到键值对，可以用request.GET.items()，它返回类似[('pref', 'red'), ('pref', 'blue')]内容。而request.GET.keys()则返回['pref', 'pref']

multidict中其key是有序的，其值也是有序的。


7. 处理JSON编码的请求体

request.json_body返回一个JSON编码形式的请求体，如果一个请求没有body，或其body不是JSON编码内容，访问该值则抛出异常。

如我们构造如下AJAX请求：

.. code::

    jQuery.ajax({type:’POST’,
                 url: ’http://localhost:6543/’, // the pyramid server
                 data: JSON.stringify({’a’:1}),
                 contentType: ’application/json; charset=utf-8’});

则在视图中可以看到其request.json_body为{u’a’: 1}

另外，也可以通过urllib2来构造这样的AJAX请求：

.. code:: python

    import urllib2
    import json
    json_payload = json.dumps({'a':1})
    headers = {'Content-Type':'application/json; charset=utf-8'}
    req = urllib2.Request('http://localhost:6543/', json_payload, headers)
    resp = urllib2.urlopen(req)


二、Response
----------------

pyramid.response.Response基本没有对webob.Response做多少改动。一个response对象主要包含三个组成部分：

- response.status：应答的可读状态，如'200 OK'。可用status_int来设置状态编号。
- response.headerlist：header信息列表，如[('Content-Type','text/html')]
- response.app_iter：生成response内容的生成器。也可以用response.body(str)，response.unicode_body(unicode)，response.body_file来处理内容。

由上面三类又可以派生出下面一些便捷访问方式：

- response.content_type：如'text/html'
- response.charset：字符集，如'UTF-8'
- response.set_cookie(key, value, max_age=None, path=’/’, …)：设置cookie
- response.delete_cookie(key, path=’/’, domain=None)：删除cookie
- response.cache_expires(seconds=0)：设置HTTP缓存时间

