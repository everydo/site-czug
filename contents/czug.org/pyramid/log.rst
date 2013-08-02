---
created: 2012-04-12 13:15:43
creator:
description: 
title: 在Pyramid中使用log
---

=====================
在Pyramid中使用log
=====================

Pyramid直接导入了Python的标准logging支持，下面我们看看在项目中如何配置使用logger。

一、log配置
------------------

在Pyramid生成的项目模版中，已经在development.ini或production.ini中配置了一个基本的log服务。这些配置信息由pserver载入，并按照配置定义 生成所需要的loggers。下面就是一个典型的配置：

.. code::

   [loggers]
   keys = root, myproject

   [handlers]
   keys = console

   [formatters]
   keys = generic

   [logger_root]
   level = INFO
   handlers = console

   [logger_myproject]
   level = DEBUG
   handlers =
   qualname = myproject

   [handler_console]
   class = StreamHandler
   args = (sys.stderr,)
   level = NOTSET
   formatter = generic

   [formatter_generic]
   format = %(asctime)s %(levelname)-5.5s [%(name)s][%(threadName)s] %(message)s

在这个例子中，因为采用的是development.ini中的配置，所以上面配置中的level均用了DEBUG，如果是生产环境，则需要改成WARN。

在项目中，我们一般采用logging.getLogger来得到一个可用的logger。按照上面的配置定义，因定义了qualname = myproject，所以在myproject这个包中的所有log将采用DEBUG级别。而应用其他部分的log将采用root节中的定义，而采用了INFO级别。

用户也可以根据python标准logging中的要求，定义自己需要的logger以便将特定模块的log单独输出。

二、发送log信息
-----------------

为了可以灵活配置log，我们需要使用__name__这个名字。在python中，__name__表示当前模块的名字。如上例，我们项目中有一个myproject模块，所有项目程序都放在这个模块中。因此，在程序中，__name__就有了类似myproject.view，myproject.model这样的名字。

在配置中，我们仅在配置中定义了myproject这个logger的定义，logging.getLogger找不到myproject.view这样的logger，就会向上查找myproject，发现有这个logger定义，就将这个logger返回给程序。

因此下面的程序

.. code:: python

    import logging
    log = logging.getLogger(__name__)

    def myview(request):
        content_type = 'text/plain'
        content = 'Hello World!'
        log.debug('Returning: %s (content-type: %s)', content, content_type)
        request.response.content_type = content_type
        return request.response

将会使用myproject这节的定义，并将log输出到stderr中。

三、log过滤
--------------

我们可以通过灵活的配置，从而使我们的注意力集中在需要输出的log上。例如，我们可以专门输出sqlalchemy.pool这个模块的log。

.. code:: 

    [logger_sqlalchemy.pool]
    level = DEBUG
    handlers =
    qualname = sqlalchemy.pool


我们也可以通过level来缩小log输出的范围。python log level级别定义如下：

DEBUG < INFO < WARNING < ERROR < CRITICAL

    python只能输出定义级别以及更高级别的log。

如果在配置中找不到任何logger定义，将默认采用root logger的定义。

四、TransLogger
------------------

paster提供了一个TransLogger中间件，已将普通的log转换成Apache access log格式。需要使用TransLogger，首先需要配置TransLogger中间件支持。

配置中间件有两种方式，一种是配置方式如下：
将 

.. code:: python

    [app:main]
    use = egg:MyProject

改成

.. code::

    [app:mypyramidapp]
    use = egg:MyProject

    [filter:translogger]
    use = egg:Paste#translogger
    setup_console_handler = False

    [pipeline:main]
    pipeline = translogger
               mypyramidapp

另一种方式是通过封装app来加载translogger。如下：

在__init__文件中main函数的末尾，改成：

.. code:: python

    app = config.make_wsgi_app()
    from paste.translogger import TransLogger
    app = TransLogger(app, setup_console_handler=False)
    return app

配置好translogger之后，就可以在console中看到输出的类似access log，如果需要将这些log重定向到其他地方，还需要按照python标准log定义方式重定向到access.log文件。
