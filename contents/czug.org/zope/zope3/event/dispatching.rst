http://blogs.nuxeo.com/sections/blogs/florent_guillaume/2005_11_10_object-event-dispatching


Object event dispatching in Zope
==========================================

Here are some explanations about what happens in Zope 3.2 (and Zope 2.9 when using Five) when an event notification is sent by some code, up to a specific subscriber. It focuses more specifically on object events, which go through some additional hoops. All this is complex because there are many simple components that are linked together.

Let's start with some framework code that sends an event after an object has been added (similar to what zope.app.container.contained actually does)::

 event = ObjectAddedEvent(ob, container, name)
 zope.event.notify(event)

In zope.event we have the definition for this function::

 subscribers = [] # registered subscribers
 def notify(event):
    for subscriber in subscribers:
        subscriber(event)

During initialization, zope.app.event.dispatching has registered a subscriber::

 def dispatch(*event):
    # Iterating over subscribers assures they get executed.
    for ignored in zope.component.subscribers(event, None):
        pass
 zope.event.subscribers.append(dispatch)

The function zope.component.subscribers will then call all matching subscribers.

During initialization, zope/app/event/configure.zcml has registered a subscriber for zope.app.event.interfaces.IObjectEvent with the handler zope.app.event.objectevent.objectEventNotify::

 <subscriber
    for="zope.app.event.interfaces.IObjectEvent"
    handler="zope.app.event.objectevent.objectEventNotify"
    />

This handler does::

 def objectEventNotify(event):
    adapters = zope.component.subscribers((event.object, event), None)
    for adapter in adapters:
        pass # Getting them does the work.

This means that the event will be redispatched, but this time a subscriber can match using multi-adaptation on both the object and the event interfaces, which gives much more flexibility and filtering possibilities.

During initialization, zope/app/container/configure.zcml has registered a multi-subscriber::

 <subscriber
    for="zope.app.location.interfaces.ILocation
         zope.app.container.interfaces.IObjectMovedEvent"
    handler="zope.app.container.contained.dispatchToSublocations"
    />

Note that IContained, a base interface for most content objects, derives from ILocation, so this subscriber will match most content objects. Also, the IObjectAddedEvent sent initially derives from IObjectMovedEvent so it will be matched.

When using Five, in Five/event.zcml some similar subscribers are registered to react on IObjectManager instead of ILocation, and to dispatch using the same handler.

The dispatchToSublocations handler is::

 def dispatchToSublocations(object, event):
    subs = ISublocations(object, None)
    if subs is not None:
        for sub in subs.sublocations():
            for ignored in zapi.subscribers((sub, event), None):
                pass # They do work in the adapter fetch

This redispatches the same event to all subobjects, where "subobjects" is defined using the ISublocations adapter. Now, zope/app/container/configure.zcml has an adapter::

 <adapter
    for="zope.app.container.interfaces.IReadContainer"
    provides="zope.app.location.interfaces.ISublocations"
    factory="zope.app.container.contained.ContainerSublocations"
    />

Most Zope 3 container objects are also IReadContainer. The ContainerSublocations handler does simply get the sublocations using::

 class ContainerSublocations(object):
    def __init__(self, container):
        self.container = container
    def sublocations(self):
        container = self.container
        for key in container:
            yield container[key]

When using Five, a similar adapter is registered::

 <adapter
    for="OFS.interfaces.IObjectManager"
    provides="zope.app.location.interfaces.ISublocations"
    factory="OFS.subscribers.ObjectManagerSublocations"
    />

And the Five adapter does something comparable to the Zope 3 one::

 class ObjectManagerSublocations(object):
    def __init__(self, container):
        self.container = container
    def sublocations(self):
        for ob in self.container.objectValues():
            yield ob

All in all, our initial event will be redispatched to the sublocations of the original object, and the process will be done recursively to all the sublocations.

Now some user code's configure.zcml can registered a multi-subscriber::

 <subscriber
    for=".interfaces.IFoo
         zope.app.container.interfaces.IObjectAddedEvent"
    handler=".foo.reactOnAdd"
    />

Which ties to the handler::

 def reactOnAdd(ob, event):
    """Does something."""

In the handler, which will be called for all sublocations, ob is any sublocation of the original object (including the object itself), and event is the original event (which means that event.object is the original object).

This concludes our dive into through Zope 3 events. You can read in http://blogs.nuxeo.com/sections/blogs/florent_guillaume/2005_11_08_events-in-zope-2-9 how object events can be used in Zope 2.9 to do what used to be done using manage_afterAdd.

