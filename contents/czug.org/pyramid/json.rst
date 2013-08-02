---
created: 2012-07-23 12:24:55
creator:
description: 
title: Pyramid 中SQLAlchemy 对象的JSON序列化
---

===========================================
Pyramid 中SQLAlchemy 对象的JSON序列化
===========================================

pyramid github中master 版本增加了custom objects的JSON支持，而在之前（1.3及以前）的版本中SQLAlchemy model对象的序列化需要编写JSONEncoder的子类，然后在dumps的时候指定。因此，想在程序中直接使用json这个renderer输出view结果是一件麻烦的事。

为了在pyramid程序中增加JSON支持，只需要在model类里面增加__json__方法即可。如

.. code::

    DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
    Base = declarative_base()
    def sqlalchemy_json(self, request):
        obj_dict = self.__dict__
        return dict((key, obj_dict[key]) for key in obj_dict if not key.startswith("_"))
    Base.__json__ = sqlalchemy_json

之后继承自Base的model类即可直接json renderer中输出了。（本例中暂没测试relation）如

.. code::

    @view_config(route_name='home', renderer='json')
    def home(request):
        one = DBSession.query(MyModel).filter(MyModel.name=='one').first()
        return {'one':one, 'project':'MyProject'}

为了支持更多第三方类的序列化，pyramid还提供了adapter的功能，如在SQLAlchemy中常用datetime数据类型，这个数据类型在序列化时也会报错，则需要增加一个adapter，如：

.. code::

    def datetime_adapter(obj, request):
        return obj.strftime('%Y-%m-%d %H:%M:%S')

    custom_json_renderer_factory.add_adapter(datetime.datetime, datetime_adapter)

并调用config.add_renderer将 custom_json_renderer_factory注册即可。

随便附上单独提取出来的代码，直接放入项目即可在1.3版本的pyramid上使用。

 

.. code::

    import json
    import datetime

    from zope.interface import providedBy, Interface
    from zope.interface.registry import Components

    class IJSONAdapter(Interface):
        """
        Marker interface for objects that can convert an arbitrary object
        into a JSON-serializable primitive.
        """
    _marker = object()

    class JSON(object):
        """ Renderer that returns a JSON-encoded string.

        Configure a custom JSON renderer using the
        :meth:`~pyramid.config.Configurator.add_renderer` API at application
        startup time:

        .. code-block:: python

           from pyramid.config import Configurator

           config = Configurator()
           config.add_renderer('myjson', JSON(indent=4))

        Once this renderer is registered as above, you can use
        ``myjson`` as the ``renderer=`` parameter to ``@view_config`` or
        :meth:`~pyramid.config.Configurator.add_view``:

        .. code-block:: python

           from pyramid.view import view_config

           @view_config(renderer='myjson')
           def myview(request):
               return {'greeting':'Hello world'}

        Custom objects can be serialized using the renderer by either
        implementing the ``__json__`` magic method, or by registering
        adapters with the renderer.  See
        :ref:`json_serializing_custom_objects` for more information.

        The default serializer uses ``json.JSONEncoder``. A different
        serializer can be specified via the ``serializer`` argument.
        Custom serializers should accept the object, a callback
        ``default``, and any extra ``kw`` keyword argments passed during
        renderer construction.

        .. note::

           This feature is new in Pyramid 1.4. Prior to 1.4 there was
           no public API for supplying options to the underlying
           serializer without defining a custom renderer.
        """

        def __init__(self, serializer=json.dumps, adapters=(), **kw):
            """ Any keyword arguments will be passed to the ``serializer``
            function."""
            self.serializer = serializer
            self.kw = kw
            self.components = Components()
            for type, adapter in adapters:
                self.add_adapter(type, adapter)

        def add_adapter(self, type_or_iface, adapter):
            """ When an object of the type (or interface) ``type_or_iface`` fails
            to automatically encode using the serializer, the renderer will use
            the adapter ``adapter`` to convert it into a JSON-serializable
            object.  The adapter must accept two arguments: the object and the
            currently active request.

            .. code-block:: python

               class Foo(object):
                   x = 5

               def foo_adapter(obj, request):
                   return obj.x

               renderer = JSON(indent=4)
               renderer.add_adapter(Foo, foo_adapter)

            When you've done this, the JSON renderer will be able to serialize
            instances of the ``Foo`` class when they're encountered in your view
            results."""

            self.components.registerAdapter(adapter, (type_or_iface,),
                IJSONAdapter)

        def __call__(self, info):
            """ Returns a plain JSON-encoded string with content-type
            ``application/json``. The content-type may be overridden by
            setting ``request.response.content_type``."""
            def _render(value, system):
                request = system.get('request')
                if request is not None:
                    response = request.response
                    ct = response.content_type
                    if ct == response.default_content_type:
                        response.content_type = 'application/json'
                default = self._make_default(request)
                return self.serializer(value, default=default, **self.kw)

            return _render

        def _make_default(self, request):
            def default(obj):
                if hasattr(obj, '__json__'):
                    return obj.__json__(request)
                obj_iface = providedBy(obj)
                adapters = self.components.adapters
                result = adapters.lookup((obj_iface,), IJSONAdapter,
                    default=_marker)
                if result is _marker:
                    raise TypeError('%r is not JSON serializable' % (obj,))
                return result(obj, request)
            return default

    custom_json_renderer_factory = JSON()

    def datetime_adapter(obj, request):
        return obj.strftime('%Y-%m-%d %H:%M:%S')

    def date_adapter(obj, request):
        return obj.strftime('%Y-%m-%d')

    custom_json_renderer_factory.add_adapter(datetime.datetime, datetime_adapter)
    custom_json_renderer_factory.add_adapter(datetime.date, date_adapter)
