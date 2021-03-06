==========
Directives
==========

.. Contents::
.. sectnum::

Widget template directive
-------------------------

Show how we can use the widget template directive. Register the meta
configuration for the directive.

  >>> import sys
  >>> from zope.configuration import xmlconfig
  >>> import z3c.form
  >>> context = xmlconfig.file('meta.zcml', z3c.form)

We need a custom widget template

  >>> import os, tempfile
  >>> temp_dir = tempfile.mkdtemp()
  >>> file = os.path.join(temp_dir, 'widget.pt')
  >>> open(file, 'w').write('''
  ... <input type="text" id="" name="" value="" size=""
  ...        tal:attributes="id view/id;
  ...                        name view/name;
  ...                        size view/size;
  ...                        value view/value;" />
  ... ''')

and a interface

  >>> import zope.interface
  >>> from z3c.form import interfaces
  >>> class IMyWidget(interfaces.IWidget):
  ...     """My widget interface."""

and a widget class:

  >>> from z3c.form.testing import TestRequest
  >>> from z3c.form.browser import text
  >>> class MyWidget(text.TextWidget):
  ...     zope.interface.implements(IMyWidget)
  >>> request = TestRequest()
  >>> myWidget = MyWidget(request)

Make them available under the fake package ``custom``:

  >>> sys.modules['custom'] = type(
  ...     'Module', (),
  ...     {'IMyWidget': IMyWidget})()

and register them as a widget template within the ``z3c:widgetTemplate``
directive:

  >>> context = xmlconfig.string("""
  ... <configure
  ...     xmlns:z3c="http://namespaces.zope.org/z3c">
  ...   <z3c:widgetTemplate
  ...       template="%s"
  ...       widget="custom.IMyWidget"
  ...       />
  ... </configure>
  ... """ % file, context=context)

Let's get the template

  >>> import zope.component
  >>> from z3c.template.interfaces import IPageTemplate
  >>> template = zope.component.queryMultiAdapter((None, request, None, None,
  ...     myWidget), interface=IPageTemplate, name='input')

and check it:

  >>> template
  <zope.app.pagetemplate.viewpagetemplatefile.ViewPageTemplateFile ...>

Let's use the template within the widget.

  >>> print template(myWidget)
  <input type="text" value="" />

We normally render the widget which returns the registered template.

  >>> print myWidget.render()
  <input type="text" value="" />

If the template does not exist, then the widget directive should fail
immediately:

  >>> unknownFile = os.path.join(temp_dir, 'unknown.pt')
  >>> context = xmlconfig.string("""
  ... <configure
  ...     xmlns:z3c="http://namespaces.zope.org/z3c">
  ...   <z3c:widgetTemplate
  ...       template="%s"
  ...       widget="custom.IMyWidget"
  ...       />
  ... </configure>
  ... """ % unknownFile, context=context)
  Traceback (most recent call last):
  ...
  ZopeXMLConfigurationError: File "<string>", line 4.2-7.8
      ConfigurationError: ('No such file', '...unknown.pt')


Cleanup
-------

Now we need to clean up the custom module.

  >>> del sys.modules['custom']

Also let's not leave temporary files lying around

  >>> import shutil
  >>> shutil.rmtree(temp_dir)

