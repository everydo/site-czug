---
created: 2012-04-16 12:54:06
creator:
description: 
title: Pyramid国际化支持（三）
---

前面已经基本展示了Pyramid项目国际化的过程，下面再来看看一些零零碎碎的特殊情况处理。

四、使用Localizer
--------------------

尽管Pyramid在模版处理中会自动进行语言版本的切换，有的时候，我们还是希望能够手工处理的语言转换。这种时候，我们就需要用pyramid.i18n.get_localizer来得到一个Localizer。该方法得到一个系统默认的或Locale协商程序返回的Localizer。得到Localizer之后，我们就可以调用其方法进行一些特别处理了。

1. 手工语言版本切换

.. code::

    ts = TranslationString('Add ${number}', mapping={'number':1}, domain='MyProject')

    localizer = get_localizer(request)
    translated = localizer.translate(ts)

这里得到的translated就是按照request中的locale信息进行切换之后的内容。

2. 复数切换

    localizer.pluralize(singular, plural, n, domain=None, mapping=None)

根据n的值是单、复数显示singular或plural。

注，个人感觉Pyramid中复数的实现有点问题，也可能文档写的不够详细，以后再看看代码实现吧。

五、locale相关的一些配置
--------------------------

1. 默认locale配置

Pyramid配置文件（ini）中提供了一默认locale配置default_locale_name，开发者可以变更该值来指定默认语言环境。


2. 支持语言列表

Pyramid不提供自动地支持语言列表生成，但开发者可以在配置文件中地[app:main]节中定义类似配置：

    available_languages = fr de en ru

然后在程序中读取出来即可。这样可以避免系统将一些翻译还不完整地语言版本也显示出来。


3. 读取得Locale名字

可以通过以下几种方式读取locale名字：

* pyramid.i18n.get_locale_name(request)，第一次读取locale后，其结果会缓存在request中，供后续使用。可以用下面的方法每次都重新读取。

* pyramid.i18n.negotiate_locale_name(request)。

* 也可以通过pyramid.i18n.get_localizer(request).locale_name得到locale名。


六、Locale协商
------------------

Locale协商是指对一次请求应该采用那种locale进行处理地过程。Locale协商程序接收request参数，并返回合适的locale名字。该程序在get_localizer、get_locale_name、negotiate_locale_name等地方被调用。

1. 默认的Locale协商程序

大多数程序没有特殊需要时都可以用默认的Locale协商程序来确定locale，无需更多编程。

默认的Locale协商程序通过以下顺序来判断locale：

* 查看request的_LOCALE_属性（可能在视图或事件处理中指定）
* 查看request.params['_LOCALE_']
* 查看request.cookies['_LOCALE_']
* 在request中找不到，取出定义在ini中的默认locale名字
* 如果还是找不到，直接用en

2. 自定义Locale协商程序

我们可以自定义这个Locale协商程序，如下：

.. code:: python

    def my_locale_negotiator(request):
        locale_name = request.params.get('my_locale')
        return locale_name

上例就是定义了一个简单的协商程序，它至查看request.params中的my_locale，如果找不到，则采用默认的locale（ini）。

通过set_locale_negotiator()可以将这个协商程序配置进应用，如：

.. code:: python

    from pyramid.config import Configurator
    config = Configurator()
    config.set_locale_negotiator(my_locale_negotiator)


七、日期和货币的格式化
--------------------------

Pyramid默认不带日期、货币等的格式化，不过既然已经安装了Babel，就可以利用现成的Babel来做这方面的事情。如：

1. 日期的本地格式化

.. code::

        >>> Locale('en', 'US').periods['am']
        u'AM'

        >>> Locale('de', 'DE').days['format']['wide'][3]
        u'Donnerstag'

2. 货币的本地格式化

.. code::

       >>> Locale('en').currencies['COP']
        u'Colombian Peso'
        >>> Locale('de', 'DE').currencies['COP']
        u'Kolumbianischer Peso'


        >>> Locale('en', 'US').currency_symbols['USD']
        u'$'
        >>> Locale('es', 'CO').currency_symbols['USD']
        u'US$'

更多的Babel方法操作查看Babel文档。


八、Chameleon模版支持
-------------------------

一旦在模版渲染的时候传入的参数中使用了翻译字串，系统会自动根据request中的locale设置进行语言切换。


九、打包
-------------

在目前这种配置下，将整个项目打包发布是不会将mo文件打到发行包中的。如果需要，则需要在setup.py中的setup函数中再加一个参数：

    package_data={'myproject': ['locale/*/LC_MESSAGES/*.mo']},
