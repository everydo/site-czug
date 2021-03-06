---
created: ''
creator: ''
description: 在配置中的许多地方涉及到 Python 参考属性(pyref attributes)。
title: Python 参考
---
Python参考 Python References
===============================

配置文件的许多地方用到了pyref属性，引用了一个模块或函数名。
Many places in the configuration take ``pyref`` attributes.  These reference a module/function name.  The general pattern is:

``pyref="location:function_name"``

    The ``location`` can be a module name, or ``file:/path/to/filename.py``.  If it is a literal filename, then the file is exec'd and turned into a module that way.  All references are to functions (or callable objects), and so you must give the function name.  Note that the ``file:`` case isn't a URL, just a path.

``pyarg-foo="bar"``

    You can pass extra ad hoc arguments to the function using attributes in this form.  This would add the keyword argument ``foo="bar"`` to the function call.  All arguments have string (well, unicode) values.

一些例子 Examples
-----------------------

You can use a ``<theme>`` like:

.. code-block:: xml

    <theme pyref="file:/home/me/src/customize-deliverance.py:get_theme"
           pyarg-default_theme="default"
           pyarg-base="/home/me/src/custom-themes" 
           pyarg-base_url="/custom-themes" />

    <proxy path="/custom-themes">
        <dest href="file:///home/me/src/custom-themes" />
    </proxy>

Then your code might look like:

.. code-block:: python

    def get_theme(request, response, log, default_theme, 
                  base, base_url):
        host = request.host.split(':')[0]
        if os.path.exists(os.path.join(base, host, 'theme.html'):
            return base_url + '/' + host + '/theme.html'
        elif not default_theme:
            log.fatal(None, 
                      "Theme for host %r doesn't exist and no default theme was given"
                      % host)
            raise AbortTheme("No theme found")
        else:
            log.debug(None,
                      "Falling back to default theme")
            return base_url + '/' + default_theme + '/theme.html'

禁用参考 Disabling
--------------------

You can disallow Python references using ``deliverance-proxy`` with:

.. code-block:: xml

    <server-settings>
      <execute-pyref>false</execute-pyref>
    </server-settings>

