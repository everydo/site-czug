---
created: 2012-05-05 11:22:48
creator:
description:
title: Pyramid 与 Beaker
---
=======================
Pyramid 与 Beaker
=======================

Beaker为Python程序提供了良好的缓存和session支持。在Pyramid中，也有一个叫pyramid_beaker的小程序提供了Beaker接入支持，只需要在Pyramid应用中include pyramid_beaker即可在程序中使用Beaker。

pyramid_beaker主要提供了一个session factory，可以读取ini配置文件中的配置信息提供session factory服务。同时，pyramid_beaker也能够将配置的cache信息读取到beaker.cache.cache_regions中，以便在程序中使用@cache_region标注。不过这个插件对cache的支持不是很给力，个人感觉应该直接将给request对象植入一个CacheManager或Cache比较好，这样在应用中就可以不必关注是否使用Beaker了。

一、启用Beaker
-----------------

将development.ini中的pyramid.includes中增加一项pyramid_beaker即可在应用中启用Beaker支持

.. code::

    pyramid.includes =
        pyramid_debugtoolbar
        pyramid_tm
        pyramid_beaker


二、beaker session
------------------------

1. session的配置

在development.ini中加入如下配置即可在程序中使用Beaker Session。

.. code::

    session.type = file
    session.data_dir = %(here)s/data/sessions/data
    session.lock_dir = %(here)s/data/sessions/lock
    session.key = mykey
    session.secret = mysecret
    session.cookie_on_exception = true

其中session.type支持cookie, file, dbm, memory, ext:memcached, ext:database, ext:google这几种类型。（注意：cookie有大小限制）
如果使用了ext:memcached, ext:database这两种类型，还会增加一个session.url的配置，如：

.. code::

    beaker.session.key = sso
    beaker.session.secret = somesecret
    beaker.session.type = ext:memcached
    beaker.session.url = 10.72.249.39:11211;10.90.133.122:11211;10.242.117.122:11211
    beaker.session.timeout = 10800


2. session的使用

Pyramid通过session factory封装了session的使用，因此配置了pyramid_beaker之后，引用request.session就是在使用Beaker提供的session支持。


三、beaker cache
--------------------

1. cache的配置

.. code::

    beaker.cache.regions = default_term, second, short_term, long_term
    beaker.cache.type = memory
    beaker.cache.second.expire = 1
    beaker.cache.short_term.expire = 60
    beaker.cache.default_term.expire = 300
    beaker.cache.long_term.expire = 3600

其中session.type支持file, dbm, memory, ext:memcached, ext:database, ext:google这几种类型。

cache的配置引入了一个region的概念，可以支持多种类、不同层次的cache支持。如：

.. code::

    beaker.cache.data_dir = %(here)s/data/cache/data
    beaker.cache.lock_dir = %(here)s/data/cache/lock
    beaker.cache.regions = short_term, long_term
    beaker.cache.short_term.type = ext:memcached
    beaker.cache.short_term.url' = 127.0.0.1.11211
    beaker.cache.short_term.expire = 3600
    beaker.cache.long_term.type = file
    beaker.cache.long_term.expire = 86400


2. cache的使用

在ini文件配置好之后，在程序中，就可以使用@cache_region这个标注来使用cache功能了。如：

.. code::

    from beaker.cache import cache_region

    @cache_region('long_term')
    def get_photos():
        pass

注意，不要直接在视图上加这个标注，最好将数据存取的地方抽取成函数，如果一定要在视图上做，view_config本身可以提供简单的自带cache功能。

.. code::

    def view_callable(request):

        @cache_region('long_term')
        def func_to_cache():
            ...
            return something
        return func_to_cache()


3. cache的另类使用

标注虽然很简单，不过有的时候可能会懒得将数据存取独立成函数，这时候，也可以直接使用Beaker的功能直接往cache中put、get数据，如：

.. code::

    import time
    from beaker.cache import cache_regions, CacheManager

    cm = CacheManager(cache_regions=cache_regions)
    cache = cm.get_cache_region("mypyramid", "short_term")

    try:
        atime = cache.get("atime")
    except Exception, exp:
        atime = str(time.time())
        cache.put("atime", atime, expiretime=60)


注意，这里的put可以单独指定一个expiretime，这会直接覆盖region中定义的过期时间。
