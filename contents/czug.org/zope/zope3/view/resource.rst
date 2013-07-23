Browser Resources

File Resource
======================

Certain presentation, like images and style sheets are not associated
with any other component, so that one cannot create a view.  To solve
this problem, resources were developed, which are presentation
components that do not require any context.  This mini-chapter will
demonstrate how resources are created and registered with Zope 3.

The first goal is to register a simple plain-text file called
resource.txt as a browser resource.  The first step is to
create this file anywhere you wish on the filesystem, and adding the
following content::

    Hello, I am a Zope 3 Resource Component!

Now just register the resource in a ZCML configuration file using the
browser resource directive::

    <browser:resource
        name="resource.txt"
        file="resource.txt"
        layer="default" />

- Line 2: This is the name under which the resource will be known in Zope.
- Line 3: The file attribute specifies the path to the resource on the
  filessytem.  The current working directory ('.') is always the
  directory the configuration file is located.  So in the example above,
  the file resource.txt is located in the same folder as the
  configuration file is.
- Line 4: The optional layer attribute specifies the layer the resource
  is added to.  By default, the default layer is selected.

Once you hook up the configuration file to the main configuration path
and restart Zope 3, you should be able to access the resource now via
a Browser using http://localhost:8080/@@/resource.txt.  The
**@@/** in the URL tells the traversal mechanism that the following
object is a resource.

Image Resource
=========================

If you have an image resource, you might want to use different
configuration.  Create a simple image called img.png and register it
as follows::

    <browser:resource
        name="img.png"
        image="img.png"
        permission="zope.ManageContent" />

- Line 3: As you can see, instead of the ``file`` attribute we use
  the ``image`` one.  Internally this will create an ``Image``
  object, which is able to detect the content type and returns it
  correctly.  There is a third possible attribute named
  ``template``.  If specified, a Page Template that is executed
  when the resource is called.  Note that only one of ``file``,
  ``image``, or ``template`` attributes can be specified
  inside a resource directive.
- Line 4: A final optional attribute is the ''permission'' one must have
  to view the resource.  To demonstrate the security, I set the
  permission required for viewing the image to
  ``zope.ManageContent``, so that you must log in as an
   administrator/- manager to be able to view it.  The default of the
   attribute is ``zope.Public`` so that everyone can see the
   resource.

Directory Resource
===============================

If you have many resource files to register, it can be very tedious to
write a single directive for every resource.  For this purpose the
**resourceDirectory** is provided, with which you can simply
declare an entire directory, including its content as resources.
Thereby the filenames of the files are reused as the names for the
resource available.  Assuming you put your two previous resources in a
directory called resource, then you can use the following::

    <browser:resourceDirectory
        name="resources"
        directory="../resource" />

The image will then be publically available under the URL:
http://localhost:8080/@@/resources/img.png

The **DirectoryResource** object uses a simple resource type
recognition.  It looks at the filename extensions to discover the
type.  For page templates, currently the extensions ''pt'', ''zpt''
and ''html'' are registered and for an image ''gif'', ''png'' and
''jpg''.  All other extensions are converted to file resources.  Note
that it is not necessary to have a list of all image types, since only
Browser-displayable images must be recognized.

ZRT Resource
=======================

When working locally, you may be storing your image resources in a
directory.  If you have a subfolder called **images** with an image
logo.png.  And you have a template, so here is the HTML to
insert the logo::

    <img src="./images/logo.png" />

Now you can see that the template locally works.

If you view the HTML via Zope, you can see that it is broken.

Now, let's try to register the logo with the system like this::

    <resource
        name="logo.png"
        file="images/logo.png"
        />

Now try again, after restarting Zope 3, you can see that it is still
broken!.  So, relative path is not correct.

Zope Resource Templates (ZRT) allows for locally working resources to
work with Zope 3 as well.  It will rewrite text segments in a
resource.  It is a 3rd party package developed by Stephan Richter for
Lovely Systems.  The package is available from here:
http://pypi.python.org/pypi/z3c.zrtresource

Add the following lines to the HTML resource::

    <!--
      /* zrt-replace: "./images/logo.png" \
                      tal"string:${context/++resource++logo.png}" */
    -->

Then convert HTML resource registration to::

    <zrt-resource
        name="helloworld.html"
        file="helloworld.html"
        />

z3ext.cssregistry:
========================
可以实现类似plone base_property的功能，并可方便实现everydo中 的皮肤色调切换

http://svn.zope.org/z3ext.cssregistry/trunk/src/z3ext/cssregistry/README.txt
