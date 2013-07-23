
安装

.. Contents::
.. sectnum::



Installing Python
--------------------------

The Zope community has always recommended using a custom built Python
for development and deployment.  Python 2.4 is the recommended verion
for Zope~3, although Python 2.5 will also work but is not yet
officially supported.  To install Python, you will be required to
install g++} and other development tools on your
system.  A typical installation of Python can be done like this::

    $ wget -c http://python.org/ftp/python/2.4.4/Python-2.4.4.tar.bz2
    $ tar jxvf Python-2.4.4.tar.bz2
    $ cd Python-2.4.4
    $ ./configure --prefix=/home/baiju/usr
    $ make
    $ make install

While configuring, as given above, you can give a prefix} to
install Python in that location.  The above steps will install Python
inside /home/baiju/usr directory.  You can run the Python
interpreter like this::

    $ ~/usr/bin/python2.4
    >>> print "Hello, world!"
    Hello, world!

If you are not getting old statements in Python interactive prompt using
up-arrow key, try installing libreadline development libraries
(Hint: apt-cache search libreadline).  After installing this
library, you have to install Python again.

You will also be required to install zlib (Hint:
apt-cache search zlib compression library) to properly install
Zope~3.

Buildout configuration
------------------------------

Traditionally, Zope~3 was released as a tar ball.  However, starting with
version 3.4, Zope~3 was split into many packages.  This book will use a build
tool called Buildout for developing Zope~3 applications.

The default configuartion for Buildout will be stored in the
.buildout directory of your home directory with the file name
default.cfg.  You can add the following to your
$HOME/.buildout/default.cfg file:

    \$HOME/.buildout/default.cfg

The eggs-directory} is where Buildout stores the eggs that are downloaded.
The last option, find-links} points to a reliable mirror of
the Python Package Index (PyPI).

Setting up a development sandbox
--------------------------------------------

To demonstrate the concepts, tools and techniques, we are going to
develop a simple ticket/issue tracking application called ``Ticket
Collector``.  To begin the work, first create a directory for the
project.  After creating the directory, create a buildout.cfg}
file as given below.  To bootstrap this application checkout
bootstrap.py} and run it inside that directory::

    $ mkdir ticketcollector
    $ cd ticketcollector
    $ echo "#Buildout configuration" > buildout.cfg
    $ svn co svn://svn.zope.org/repos/main/zc.buildout/trunk/bootstrap
    $ ~/usr/bin/python2.4 bootstrap/bootstrap.py

You can see a bin directory.  Now onwards, you can run this script when changing
Buildout configuration.

You can save bootstrap.py in a local repository.  If you are
using svn for managing repository, create an svn:external to the svn URL
given above.

Our application is basically a Python package.  First we will create
an 'src' directory to place our package.  Inside the 'src' directory,
you can create 'ticketcollector' Python package.  You can create the
'src' and the 'ticketcollector' package like this::

    $ mkdir src
    $ mkdir src/ticketcollector
    $ echo "#Python package" > src/ticketcollector/__init__.py 

To start building our package you have to create a setup.py}
file.  The setup.py should have the minimum details as given
below::

    setup.py}]
      {code/getting-started/stage1/ticketcollector/setup.py}

We have included bare minimum packages required for installation here:
zope.app.twisted and zope.app.securitypolicy.

Modify buildout.cfg as given below:

Now run bin directory.  This will
download all necessary eggs and install it.  So installing Zope is
nothing but just setting up a setup.py
with required packages install_requires for installation.
Unless you specified a parts} section which use
ticketcollector} in some way, buildout will not download
dependency packages.

A simple application
-------------------------
Configuring application

To run the Zope, you have to use a buildout recipe, which will be
explained in next chapter.  Here we are going to use
zc.zope3recipes:app} recipe for setting up our application,
ticketcollector}.:

buildout.cfg}]
  {code/getting-started/stage2/ticketcollector/buildout.cfg}

Then create src/ticketcollector}
directory with the following text.  Consider it as boiler plate code
now, which we will go through later in chapter chap:ComponentArchitecture}.

src/ticketcollector/application.zcml}]
  {code/getting-started/stage2/ticketcollector/src/ticketcollector/application.zcml}

Running application
--------------------------------
Now you can run the application by running buildout} script followed
by instance} script.

    $ ./bin/buildout
    $ ./bin/instance fg

So running Zope is nothing but just using a buildout} recipe
with proper configuration.

Using ZMI
---------------------

After running your instance, If you open a web browser and go to
Zope Management Interface.

Go ahead and click the Login link at the upper right. Enter the user
name and password you gave when creating the instance. Now click on
[top]} under Navigation on the right. Play around with adding
some content objects (the Zope~3 name for instances that are visible
in the ZMI). Note how content objects can be arranged in a hierarchy
by adding folders} which are special content objects that can
hold other content objects.

There is nothing special about the ZMI, it is just the default skin
for Zope~3.  You can modify it to your liking, or replace it entirely.

When you're done exploring with the ZMI, go back to the window where
you typed runzope and see that each request from your browser was
displayed there as it happened. Press Control-C to stop Zope.


