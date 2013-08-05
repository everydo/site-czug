---
created: 2013-03-28 22:41:28
creator:
description: 
title: Pyramid Route方式中减少一点add_route的方法
---
 
===============================================
Pyramid Route方式中减少一点add_route的方法
===============================================

用了Pyramid Route方式之后，经常会面对一大堆add_route的定义，灵活利用Pyramid提供的一些便利技巧，可以大大减少这些route的定义。下面介绍一个简单的技巧：

.. code::

    @view_defaults(route_name='myroute' )
    class MyController(object):
        def __init__(self, request):
            self.request = request
            print 'do something before every action.'

        @view_config(match_param=('ctrl=my', 'action=action1'))
        def action1(self):
            print self.request.matchdict['ctrl'], self.request.matchdict['action'], self.request.matchdict['pa']
            return Response('in my controller action 1')

        @view_config(match_param=('ctrl=my', 'action=action2'))
        def action2(self):
            print self.request.matchdict['ctrl'], self.request.matchdict['action'], self.request.matchdict['pa']
            return Response('in my controller action 2')

        @view_config(match_param=('ctrl=my', 'action=action3'), custom_predicates=(lambda context, request: request.matchdict['pa'][0]=='3',))
        def action3(self):
            print self.request.matchdict['ctrl'], self.request.matchdict['action'], self.request.matchdict['pa']
            return Response('in my controller action 3')

    @view_defaults(route_name='myroute' )
    class MyController2(object):
        def __init__(self, request):
            self.request = request
            print 'do something before every action.'

        @view_config(match_param=('ctrl=you','action=action1'))
        def action1(self):
            print self.request.matchdict['ctrl'], self.request.matchdict['action'], self.request.matchdict['pa']
            return Response('in you controller action 1')

        @view_config(match_param=('ctrl=you', 'action=action2'))
        def action2(self):
            print self.request.matchdict['ctrl'], self.request.matchdict['action'], self.request.matchdict['pa']
            return Response('in you controller action 2')

        @view_config(match_param=('ctrl=you', 'action=action3'), custom_predicates=(lambda context, request: request.matchdict['pa'][0]=='3',))
        def action3(self):
            print self.request.matchdict['ctrl'], self.request.matchdict['action'], self.request.matchdict['pa']
            return Response('in you controller action 3')

    def main(global_config, **settings):
        """ This function returns a Pyramid WSGI application.
        """
        config = Configurator(settings=settings)
        config.add_static_view('static', 'static', cache_max_age=3600)
        config.add_route('myroute', '/{ctrl}/{action}*pa')
        config.add_route('home', '/')
        config.scan()
        return config.make_wsgi_app()

