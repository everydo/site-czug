起步

.. Contents::
.. sectnum::

Hello world
=====================

Now you can begin your development inside src/ticketcollector}
directory.  Create a browser.py} with following content:

\lstinputlisting[
  caption={src/ticketcollector/browser.py},
  language=python]

{code/getting-started/stage3/ticketcollector/src/ticketcollector/browser.py}

Now append the following text just above the last line of
application.zcml}:

\lstinputlisting[
  caption={src/ticketcollector/application.zcml},
  firstline=56,
  lastline=61,
  language=XML]

{code/getting-started/stage3/ticketcollector/src/ticketcollector/application.zcml}

As you can see above, we are using page} attribute from the
browser} namespace.  So, you have to include the namespace in
the beginning ZCML as shown below:

\lstinputlisting[
  caption={src/ticketcollector/application.zcml},
  firstline=1,
  lastline=5,
  language=XML]

{code/getting-started/stage3/ticketcollector/src/ticketcollector/application.zcml}

Now access http://localhost:8080/hello}, you can see that it
displaying ``Hello World``.

Summary
====================

This chapter started with a brief history of Zope, then we moved to
setting up a development sandbox.  Later we ended with a hello world
application.

Discussion
============================

- Have you thought about using **zc.buildout** inside **virtualenv** ?

- Do you think installing **setuptools** and **zc.buildout** in Python's site\-packages is a bad idea?

- How do you feel about isolated working environment while developing application?

- Registration of components can be done in Python code or ZCML,
  which one you will prefer? What about keeping a balance between
  what should be done in Python and ZCML ?  (If you don't understand
  this question, think about it after few chapters)

