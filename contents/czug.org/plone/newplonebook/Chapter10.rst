---
created: 2005-12-14 14:25:20
creator: panjy
description: ''
title: Chapter10
---
Chapter 10 和其他系统集成
------------------------------

Integrating with Other Systems

.. contents:: 目录


1. 前言
~~~~~~~~~~~~~~~~~~~~~~~~~

Integration is a huge issue in any enterprise that has a large number of other systems already in place. Because Plone is an open-source project, it has a lot of products, add-ons, skins, and tools that provide extra functionality for free. That's right鈥攐ften these extra products are given away to anyone who wants them. Additionally, as an open-source language, Python has a whole host of free, excellent products (often called *packages*). Most of these products don't directly affect Plone, though. In other words, they don't give functionality to Plone out of the box鈥攖hat's what Plone products do. However, people often ask, 'Can Plone do X?鈥?The answer is often, 'Yes, if Python can do it.鈥?

The following are some of the most popular Python products:

  - **Python Imaging Library (PIL)**: This allows you to manipulate, convert, and analyze images (*<a href="http://www.pythonware.com/products/pil/">http://www.pythonware.com/products/pil/</a>*).

  - **ReportLab<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ReportLab" title="create this page">?</a>**: This allows you to create Portable Document Format (PDF) files dynamically with images, graphs, and other goodies (*<a href="http://www.reportlab.org/">http://www.reportlab.org/</a>*).

  - **Windows extensions**: This gives an interface to all the Windows Application Programming Interfaces (APIs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=APIs" title="create this page">?</a>); for example, it offers the ability to use Component Object Model (COM) objects (*<a href="http://sourceforge.net/projects/pywin32/">http://sourceforge.net/projects/pywin32/</a>*).

  - **Pygame**: This is a framework that allows users to write games in Python. People have used it in Plone to get access to the media layer interfaces it provides for creating images or sounds (*<a href="http://www.pygame.org/">http://www.pygame.org/</a>*).

  - **OpenOffice<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=OpenOffice" title="create this page">?</a>.org bindings**: This provides bindings so that you can do almost anything to OpenOffice<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=OpenOffice" title="create this page">?</a>.org documents, even parsing Microsoft Office documents, for example鈥攁s you'll see in Chapter 13 (*<a href="http://udk.openoffice.org/python/python-bridge.html">http://udk.openoffice.org/python/python-bridge.html</a>*).

  - **mxTidy**: This package locates and corrects problems in Hypertext Markup Language (HTML) files, including page templates (*<a href="http://www.egenix.com/files/python/mxTidy.html">http://www.egenix.com/files/python/mxTidy.html</a>*).

These excellent add-ons usually have graphical installers for Windows that allow you to step through the installation. If you aren't using Windows, then the *distutils* module for Python offers a simple command-line interface for installing any of these products. As ever, the real key to installing anything is to read the instructions contained in the download. This chapter focuses on installing products that provide extra functionality to Plone. You'll find a directory of Python packages at *<a href="http://www.python.org/pypi">http://www.python.org/pypi</a>*.

Open-Source Licensing

开放源码授权
................................

Most open-source packages are released with a particular license that describes how the package may be used. Before you use any third-party code, you should check the license to see if it's compatible with your needs.

Plone is licensed under the General Public License (GPL), which you can find at *<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>* and inside the *LICENSE.txt* file of your Plone installation. If you're the developer of a Plone Web site, then you can happily create and develop Web sites without any issue. Users of your Web site will never have to worry about the license for the code; they just use the Web site normally. As with most licenses, the license limits the redistribution and sale of other people's code.

Usually licenses are easy to read and understand, but if you're unsure, you should probably have a qualified legal professional look at the license. I'll limit myself to describing the main licenses that exist in the Zope world and point you to where you can find more information:

**Zope Public License**

*<a href="http://zope.org/Resources/ZPL">http://zope.org/Resources/ZPL</a>*

**Python License**

*<a href="http://http://www.python.org/2.3/license.html">http://http://www.python.org/2.3/license.html</a>*

**GPL**

*<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>*

**Lesser GPL**

*<a href="http://www.gnu.org/copyleft/lesser.html">http://www.gnu.org/copyleft/lesser.html</a>*


Installing Plone Products

2. 安装 Plone 产品
~~~~~~~~~~~~~~~~~~~~~~~~~

A *product* is a module to install into Plone that provides more functionality to Plone. Although the name *product* implies a cost, that isn't the case鈥攎ost products are free and open source. The term *product* actually describes something written on the file system and distributed for other Plone sites to use.

Installing a product generally involves the following two steps:

1.	Installing it so that it鈥檚 registered inside Zope

2.	Installing it into each Plone instance that wants to use it

The large variety of add-ons available means that it's pretty hard to give any hard and fast rules about what exactly needs to be done to install them. As I'll repeatedly point out in this chapter, always read the product's installation files, which will usually explain how to install the product. If you do need further help, contact a mailing list or the product author for more information; however, ensure that you've read the instructions first.

When you're installing products, remember that you're installing code that could be incomplete and has no warranty on the quality. The nature of open source is that people tend to write products and then leave them as they move onto other projects. In an ideal world, before you install anything, you'd take the time to have someone you trust read through it line by line. In reality, you can't do this. Still, most products are pretty good. Just be careful to test products before you install them into your million-dollar site.

Finding Products

2.1 寻找产品
................

Finding the right products to meet your needs is probably the hardest part about integration. The Zope.org Web site contains many products created and uploaded by users. You can find these products primarily at *<a href="http://www.zope.org/Products">http://www.zope.org/Products</a>*, but if you look at the home page of Zope.org, you'll see product announcements on the right side of the page. Some of these products are Plone related, and others are Zope, Content Management Framework (CMF), or Python related.

The other main area to find products is in the Collective project at SourceForge<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=SourceForge" title="create this page">?</a> (*<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>*). The products in the Collective project reside in SourceForge<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=SourceForge" title="create this page">?</a>'s Concurrent Versioning System (CVS). Although products often get released as tarballs, CVS access is the best way to see the products there.

At this time, no comprehensive product directory exists for Plone products or their state. (I hope one will be online at Plone.org by the time this book is published.) As products are released, people tend to put packages on the Files page, but the best bet is to look in the CVS. You can find a visual view of all the available files at *<a href="http://cvs.sourceforge.net/viewcvs.py/collective/">http://cvs.sourceforge.net/viewcvs.py/collective/</a>*.

One final CVS repository that contains useful code is Zope Corporation's CVS repository. Almost all code that's made public is placed in this CVS repository. If you're looking for the source to Zope 2, then this is also the place to go. The *Products* directory contains all the products (*<a href="http://cvs.zope.org/Products/">http://cvs.zope.org/Products/</a>*). You can find more information on how to check out code at *<a href="http://dev.zope.org/CVS/ReadOnlyAccess">http://dev.zope.org/CVS/ReadOnlyAccess</a>*.


What Is CVS?

什么是CVS？
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

CVS is a system for maintaining control over source code. Most development happens in a source code control system, such as CVS or one of its many similar competing products, such as Subversion, Perforce, BitKeeper<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=BitKeeper" title="create this page">?</a>, and so on.

Checking files out of CVS is simple, and most Unix and Linux users will be familiar with using CVS from the command line. To check out all the products in the collective to your computer (this may take a while), do the following::

 cvs -d:pserver:anonymous@cvs.sourceforge.net:/cvsroot/collective login

Supply a blank password and continue with the following command::

 cvs -z3 -d:pserver:anonymous@cvs.sourceforge.net:/cvsroot/collective co *.*
 
Most of the Plone development team using Windows uses TortoiseCVS<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=TortoiseCVS" title="create this page">?</a>, which hooks directly into the Windows Explorer shell - m Explorer you can right-click to check in and check out code. For more information on TortoiseCVS<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=TortoiseCVS" title="create this page">?</a>, visit *<a href="http://www.tortoisecvs.org">http://www.tortoisecvs.org</a>*.

Installing in Zope

2.2 在Zope中安装
..................

Once you've found and downloaded a suitable product, you need to install it. You'll first need to install it into Zope so that Zope can recognize the new product. To do this, you need to find the area that contains all the existing products. To find the directories, go to the control panel in the Zope Management Interface (ZMI). There you'll see a list of the directories for your Plone instance. If you have a value for *INSTANCE_HOME*, then your *Products* directory will be located in that directory. If you don't have a value for *INSTANCE_HOME*, you'll find the *Products* directory inside *SOFTWARE_HOME*. It's worth noting that almost all methods of installing Plone create *INSTANCE_HOME* for you. As shown in Figure 10-1, my *INSTANCE_HOME* is */var/book*, so my *Products* directory is */var/book/Products*.

 .. image:: img/3294f1001.png

Figure 10-1. Locating your *Products* directory

To do the Zope part of the install, take the downloaded product, decompress it, and place it inside the *Products* directory for your server. Actually doing that is a little tricky and depends greatly upon how the product you're trying to install is packaged. To show this in more detail, the following section explains how to install an example product, CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a>, which itself is covered in the 'Managing a File in Plone鈥?section.

One of the nice things about CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a> is that it actually comes in two parts, with two downloads. First, you have the Zope-specific code called ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>. If you ever wanted to use this product outside of Plone, in plain Zope, you could do so. Second, you have the Plone- and CMF-specific code called CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a>. Most products don't need two installs; they come self-contained as one product.

Performing an Example Installation on Windows

2.2.1 完成一个Windows中安装的例子
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

First, you'll need to download the product from Zope.org at *<a href="http://zope.org/Members/arielpartners/ExternalFile/1.2.0/ExternalFile-1-2-0.zip">http://zope.org/Members/arielpartners/ExternalFile/1.2.0/ExternalFile-1-2-0.zip</a>* and save it to your computer.

Second, unzip the file. For this you could use WinZip<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WinZip" title="create this page">?</a>, which you can find on most Windows computers these days (I prefer 7-Zip, which is available from *<a href="http://www.7-zip.org/">http://www.7-zip.org/</a>*).

After unzipping, you'll get a directory called *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>*. Inside that directory is the product directory (see Figure 10-2). You can tell this because inside that directory is a whole bunch of Python files and text files, including *INSTALL.txt* and *README.txt*, which contain information about how to do the install.

 .. image:: img/3294f1002.png

Figure 10-2. The *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>* directory contents

Next, move the *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>* folder (not its contents) into your *Products* directory. In Windows that directory is located at *c:\Program Files\Plone 2\Data\Products*. In that directory you'll see a series of other directories including *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFPlone" title="create this page">?</a>*, *CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFCore" title="create this page">?</a>*, and so on. The directory *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>* should now be one of those directories. You can now skip to testing the installation in the server.

Performing an Example Installation on Unix

2.2.2 完成一个在Unix中安装的例子
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

First, you'll need to download the product from Zope.org at *<a href="http://zope.org/Members/arielpartners/ExternalFile/1.2.0/ExternalFile-1-2-0.zip">http://zope.org/Members/arielpartners/ExternalFile/1.2.0/ExternalFile-1-2-0.zip</a>* and save it to your computer. Second, unzip the file; most Unix systems have an unzip program already installed. If so, execute the following commands:

::

 $ unzip ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>-1-2-0.zip
 Archive:  ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>-1-2-0.zip
    creating: ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>/CVS/
 ...

After unzipping, you'll get the directory *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>*. You know that the *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>* directory is the product directory because inside that directory is a whole bunch of Python files and text files, including *INSTALL.txt* and *README.txt*, which contain information about how to install.

Now move the *ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>* folder (not its contents) into the *Products* directory. This command will depend upon the configuration of your server, but in my case this is as follows:

::

 $ mv ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a> /var/zope/Products

Testing the Installation in the Server

2.2.3 在服务器中测试安装
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

After installing a product, you'll need to restart Plone for the products to be registered in Plone. Once you've restarted your server, go to the ZMI and access the Product Management screen of the Zope control panel. This screen will list all the products installed on the server. If you installed the product successfully, you'll see that it's now listed, as shown in Figure 10-3.

 .. image:: img/3294f1003.png
    :width: 700

Figure 10-3. Correctly installed products

Incidentally, you have three things that could go wrong at this point. First, if nothing shows up in the management interface, then you've placed the directory in the wrong place. To correct this, double-check the installation instructions and the location of your *Products* directory, as explained earlier.

Second, you could get a 'broken鈥?icon appearing in the product list; this means the product was attempted to be registered in Zope, but an error occurred. Click the broken icon to get a traceback, which will tell you the error and should give you a chance to fix it.

Finally, if you've been unable to access the management interface after restarting, it could be that you have a more serious problem. Zope wasn't able to start because Plone found a serious error. To find out what the problem is, start Plone from the command line in debug mode, and a traceback will print to the screen.

Installing in Plone

2.3 在Plone中安装
...................

Now that you've correctly installed into Zope, the next step is easy. To completely install CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a>, you'll now need to install the CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a> product (*<a href="http://prdownloads.sourceforge.net/collective/CMFExternalFile.0.5.zip?download">http://prdownloads.sourceforge.net/collective/CMFExternalFile.0.5.zip?download</a>*) the same way you installed ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a>. You'll also have to restart Plone.

You have to install CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a> into *each* Plone instance. Not all Plone products require this, but most do. The only real way to tell is to read the installation instructions. If you see anything about 'install in the standard CMF way鈥?or 'in your Plone instance make an external method,鈥?then you need to complete this step.

Fortunately, you can actually disregard the instructions to make an external method because Plone has a much simpler way to do this. In Plone, click *plone setup* and then click Add/Remove Products. You'll see a list of products that are installed on your server and that need configuring in Plone. Simply click the check box next to the product (in this case, CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a>), and click *install*, as shown in Figure 10-4.

 .. image:: img/3294f1004.png
    :width: 700

Figure 10-4. A list of products available to the user

Just like that, the product will be installed. Well, it may be鈥攊f there's an error, then it won't show up in the installed products list. You may be able to solve the problem by reading the log, so click the link next to the name of the product to get a log. This installation is a service provided by the *portal_quickinstaller* tool contained inside Zope. For a look at what this product actually does, skip to the 'Integrating Plone with the File System鈥?section.

Using a Different Web Server

3. 使用别的的Web服务器
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you're in an organization that already serves Web sites, then you'll likely have a Web server platform that you use. *Virtual hosting* is the ability to server multiple Web sites on one server, differentiating sites based upon their Internet Protocol (IP) address or name. It allows one initial server, such as Apache, to pass requests to one or more Plone instances.

Virtual hosting is usually achieved by *proxying*, although using a proxy server is a desirable approach with Plone no matter how many sites are hosted. A proxy server sits between a client and a server and forwards requests from the client and the server. A proxy server should be transparent to the user. In Chapter 14, I'll show you how you can use proxy servers to dramatically increase Plone's performance.

Although Plone uses Zope's underlying Web server, ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZServer" title="create this page">?</a> works just fine鈥攊t's not a complete, industry-strength Web server that should be exposed to the world. The server has several issues regarding possible Denial of Service (DOS) attacks; however, these are obscure and hard-to-find items within ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZServer" title="create this page">?</a>. No known attacks have been performed against ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZServer" title="create this page">?</a> that exploit these issues, but perhaps this is because of its relative obscurity in the real world. ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZServer" title="create this page">?</a> isn't specifically designed to be an industry-strength server, and since it's feature complete, it's no longer being developed. By keeping a server such as Apache up-to-date, you're ensuring that a robust secure server is facing the world. Of course, if you're developing an intranet or other application with trusted users, this may not be an issue.

Figure 10-5 shows how such a setup would exist; the figure doesn't show actual computers, just services. A request would normally come from the Internet to the firewall and then go to Apache and then to Plone. It could be that these are all different boxes. The essential point is that there should be no access to Plone from untrusted users except through a proxy.

 .. image:: img/3294f1005scrap.png

Figure 10-5. How virtual hosting works

Putting a Web server, such as Apache, in front of Plone provides a whole host of useful services that ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZServer" title="create this page">?</a> doesn't have. For example, Apache can provide the following: Uniform Resource Locator (URL) rewriting, Secure Sockets Layer (SSL) support, caching, content deflation, virtual hosting, proxying to other Web services, incoming request sanitation, and so on. The most commonly asked question is how to change a URL from *<a href="http://localhost:8080/Plone">http://localhost:8080/Plone</a>* into something more friendly such as *<a href="http://yoursite.com">http://yoursite.com</a>*. This is called *URL rewriting*. Whilst a proxying server isn't required for this, it's much easier with one.

A favorite method for proxying to Plone is to use an Hypertext Transfer Protocol (HTTP) proxy. Apache achieves this using the *mod_proxy* module. When a request for a page comes into the proxying server, it performs various functions. Then a new request is created and sent to the ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZServer" title="create this page">?</a>. That response is passed back to the server and then onto the client. Of course, this all transparent to the client, which just makes requests as normal to a server.

**NOTE** The old way to connect Apache to Plone is via Fast CGI or Persistent CGI. These are harder to configure and actually slower when running. Although lots of old documentation exists on these subjects, more efficient solutions now exist, and I *don't* recommend these methods.

Configuring Plone

3.1 配置Plone
.................

Before configuring your proxy Web server, you need to configure Plone. Since only one server can connect to a port at once, alter Plone so that it's listening to a high-numbered port. Usually this port would be something that's blocked at the firewall and isn't accessible from the outside. Example ports are 8080, 9090, 9673, and so on. Chapter 2 provides information about how to change the ports on which your Plone server runs.

Next, you probably want to perform URL rewriting to change the URL of your site. Because the Plone object lives inside the Zope Object Database (ZODB) and has an ID, it's accessed by putting that ID in the URL, such as *<a href="http://localhost:8080/Plone">http://localhost:8080/Plone</a>*. To make this friendlier, you need to translate the request to the Web server from *<a href="http://yoursite.com">http://yoursite.com</a>* into a request for a correct object inside Zope. You have two slightly different ways to do this, based upon your requirements. If you're using a proxy Web server or basing sites upon domain names, then you can use a Virtual Host Monster (VHM). This is a friendly and powerful object that will make your life so much easier, so I fully recommend using it. You need only one VHM in the root of a Zope instance. The VHM object sits at the root of a Zope site and intercepts all incoming requests; it then alters the request so that the request goes to the part of Zope that you want.

To create a VHM, in the ZMI, go to the root of your Zope and select *Virtual Host Monster* from the Add drop-down box; in the form that opens, enter an ID. For example, enter **vhm** (the actual ID doesn't matter).

At this point, if you're using a proxy Web server in front of Plone, continue to the configuration for that Web server in the 'Configuring the Proxy Server鈥?section.

This next step is necessary only if you *aren't* using a proxy Web server. Click the VHM object you added in the ZMI, and then select the Mappings tab, which will present a list of the available mappings for hosts on this object. The mapping takes an incoming request and maps it to Plone, with the following syntax:

::

 host/path

where *host* is the hostname being mapped and *path* is the actual path to the object in Zope. For example:

::

 www.somesite.com/Plone

To ensure that all variations on the name are mapped to the path, you can use wildcards in the mapping. For example, the following maps all subdomains of *somesite.com*:

::

 *.somesite.com/Plone

To add this mapping, go to the Mapping tab, enter each mapping on a new line, and click Save. This means you'll no longer be able to access the root of your Zope site using the addresses you've mapped. Fortunately, you can still access the root of your Zope server using an IP address; this will still work because the mapping isn't applied to numeric addresses. Figure 10-6 shows how Figure 10-5 changes when you access the server through the IP directly and bypass the rewriting.

 .. image:: img/3294f1006scrap.png

Figure 10-6. Virtual hosting with access to root

You've now mapped a named domain such as *somesite.com* to point to a particular Plone instance. If an incoming request is sent looking for that site name, it will be forwarded to the Plone instance.

Configuring the Proxy Server

3.2 配置代理服务器
............................

Now that you've added your VHM into Plone, it's time to configure the proxy server. But proxy server configuration depends upon the actual server you're using. The following sections cover the specifics for each server. However, to get virtual hosting to work, you'll have to pass a URL to Plone that the VHM object understands.

It's worth noting that there's one other advantage of virtual hosting using a proxy server. You do all the configuration of the domains outside of Plone in the proxy server. This means your system administrator can now administer and use a familiar tool, without having to worry about Plone.

Proxying works by taking an incoming request and manipulating it so that a request with a special URL is sent to Plone. That request will be manipulated and contains all the information Plone needs to know to produce a response. When that response is produced and sent back to the requesting person, all the URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=URLs" title="create this page">?</a> have to point to your site correctly. This will ensure that links within your pages are all correct.

A URL has the following three main components:

  - The IP or hostname and port for the server on which Plone resides

  - The IP or hostname for where Plone is meant to be residing so that all links in resulting documents have the correct URL

  - The actual object in Zope to access and the URL passed to it

This information is passed to Plone by transforming the URL into one big, complicated URL of the following format (line breaks have been added to make this clearer):

::

 <a href="http://">http://</a>[URL to server]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=URL%20to%20server" title="create this page">?</a>:[port]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=port" title="create this page">?</a>
 /VirtualHostBase<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostBase" title="create this page">?</a>/[protocol]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=protocol" title="create this page">?</a>/[URL]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=URL" title="create this page">?</a>:[port]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=port" title="create this page">?</a>
 /[path to virtual host root]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=path%20to%20virtual%20host%20root" title="create this page">?</a>
 /VirtualHostRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostRoot" title="create this page">?</a>/[actual URL]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=actual%20URL" title="create this page">?</a>

Take the following example:

  - Plone is on a box at the IP address 192.168.2.1 on port 8080. Note that the IP address is one that the proxy server can access; it's not the IP address to the outside world鈥攖he proxy server handles that.

  - Plone should appear to be at *www.mysite.com* on port 80.

  - The actual Plone object is at */Plone*.

  - The incoming request is for */Members/andym*.

This translates into the following long URL:

::

  <a href="http://192.168.2.1:8080">http://192.168.2.1:8080</a> ~CCC
 /VirtualHostBase<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostBase" title="create this page">?</a>/http/www.mysite.com:80/Plone ~CCC
 /VirtualHostRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostRoot" title="create this page">?</a>/Members/andym

The point of doing this is that when the VHM object sees that URL, it knows exactly what to do with it. It munges it and sends the request to the Plone object. Obviously, the actual page fragment (*/Members/andym*) will be different for each request and needs to be calculated. But if you know what you're aiming for, you can now configure your server.

Configuring Apache

3.2.1 配置Apache
,,,,,,,,,,,,,,,,,,

Apache is probably the most popular choice for placing in front of Plone, and it's available for all Linux, Unix, and Windows platforms (*<a href="http://httpd.apache.org/">http://httpd.apache.org/</a>*). After installing Apache, you need to pass requests onto Plone by using HTTP proxies.

For configuring Apache, you'll need to access Apache's configuration files; where they are depend upon your installation of Apache, so consult the Apache documentation. In Windows, the configuration is accessible from the Start menu. In Linux, you can usually find the Apache configuration in the */etc* directory at */etc/apache/httpd.conf* or */etc/apache2/httpd.conf*. To alter these files, you'll usually need you to gain root or privileged user access.

**NOTE** This example uses Apache 2, but all these commands are backward compatible with earlier versions, such as Apache 1.3.2. However, some earlier versions of Apache (before 1.3.2) are known to have issues with cookies.

The easiest way to rewrite a URL in Apache is to use the built-in rewrite and proxy modules. This means enabling Apache's *mod_rewrite* and *mod_proxy* modules. In Apache, each site is usually contained within a virtual host directory that starts with the following:

::

 <VirtualHost *:80>
     ServerName<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ServerName" title="create this page">?</a> yoursite.com
     # other configuration options

All you need to do is enable rewrites and add the rewrite rule, like so:

::

     RewriteEngine<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteEngine" title="create this page">?</a> On
     RewriteRule<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteRule" title="create this page">?</a> ^/(.*)  <a href="http://192.168.2.1:8080">http://192.168.2.1:8080</a> ~CCC
 /VirtualHostBase<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostBase" title="create this page">?</a>/http/www.mysite.com:80/Plone ~CCC
 /VirtualHostRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostRoot" title="create this page">?</a>/$1 [L,P]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L%2CP" title="create this page">?</a> ~CCC
 </VirtualHost>

The key rewrite rule here takes any request string passed to it and appends it to the end of your hard-coded rewrite rule. The *[L,P]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L%2CP" title="create this page">?</a>* tells Apache that this is the last rewrite rule, and it should proxy to the server given. After doing this, you'll need to restart Apache to update the configuration. You can find more information about rewriting in the *mod_rewrite* documentation at *<a href="http://httpd.apache.org/docs-2.0/misc/rewriteguide.html">http://httpd.apache.org/docs-2.0/misc/rewriteguide.html</a>*. Note that in this case you've placed the rewrite rule information inside a virtual host directive. You could have multiple such virtual hosts in Apache so that PHP, Perl, and Java sites all sit side by side on one server.

Squid

3.2.2 Squid
,,,,,,,,,,,,,,,

For its powerful caching and configuration options, Squid is a popular choice for users. Squid is available for Unix, and there are Windows builds using cygwin available. Although I haven't tested the Windows version specifically, people who have report that it works well. You can find the downloads at *<a href="http://www.squid-cache.org/">http://www.squid-cache.org/</a>*. These notes cover the latest stable version at the time of writing, which is version 2.5.

Installing Squid from the source distribution is quite simple. After downloading, the following commands install Squid:

::

 $ tar -xvf squid-2.5.STABLE3.tar.gz
 $ cd  squid-2.5.STABLE3
 $ ./configure --prefix=/usr/local/squid
 ...
 $ make all
 ...
 $ make install
 ...

Unfortunately, Squid doesn't have a rewrite rule that allows you to alter incoming requests before proxying. Squid Guard (*<a href="http://www.squidguard.org">http://www.squidguard.org</a>*) can do this job, though. I tested the 1.2.0 version. After downloading, the following commands perform the install:

::

 $ tar -zxvf squidGuard-1.2.0.tar.gz
 $ cd squidGuard-1.2.0
 $ ./configure
 ...
 $ make
 ...
 $ make install
 ...

Now both Squid and SquidGuard<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=SquidGuard" title="create this page">?</a> are ready to go; however, both configuration files still need setting up. You can find the Squid configuration file at */etc/squid.conf*. It's a long configuration file that fortunately explains in great detail all the options. The following are the essential options to set:

::

 http_port 80
 httpd_accel_host virtual
 httpd_accel_port 0
  
 http_access allow all
 http_access allow localhost

These last two lines are security rules for allowing access from browsers. Because this was tested behind a firewall, these are lax rules. If you're running Squid externally, you should read up on access rules in detail. The easiest way to secure this is to change *http_access allow all* to *http_access deny all*. Finally, add the following line to the configuration file:

::

 redirect_program /usr/bin/squidGuard -c /etc/squid/squidGuard.conf

This sets up the redirect through Squid Guard using the configuration file at */etc/squid/squidGuard.conf*. SquidGuard<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=SquidGuard" title="create this page">?</a> doesn't come with a configuration file, but a standard one that uses the virtual host configuration looks like the following:

::

 dbhome /var/lib/squidguard/db
 logdir /var/log/squid
 acl {
     default {
             redirect <a href="http://192.168.2.1:8080">http://192.168.2.1:8080</a> ~CCC
 /VirtualHostBase<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostBase" title="create this page">?</a>/http/www.agmweb.ca:80 ~CCC
 /Plone/VirtualHostRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostRoot" title="create this page">?</a>/%p ~CCC
   }
  }

Finally, Squid has the configuration you need to redirect traffic so that the host monster understands it. Incoming requests will be handled by Squid and then passed to Plone.

Microsoft Internet Information Services

3.2.3 MS IIS
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Using Internet Information Services (IIS) isn't my preferred server of choice; however, many companies use IIS, so I've included this section. Unfortunately, IIS can't perform proxying in the same way as Squid and Apache; you need a separate plug-in. Just before this book was published, a free proxy was written called IIS2Zope that provides this functionality. However, I haven't had chance to try it in a high-performance site. For more information, see *<a href="http://zope.org/Members/freshlogic/index_html">http://zope.org/Members/freshlogic/index_html</a>*.

Instead, I'll cover a solution that's simple to set up and free. Earlier Zope users recommended PCGI, but over the years this has been slow and complicated to install. By using Microsoft's ASP language and some IIS properties, you have a quicker solution. It's called ASP 404 and does the redirect through Microsoft's ASP programming language.

From *<a href="http://www.zope.org/Members/hiperlogica/ASP404">http://www.zope.org/Members/hiperlogica/ASP404</a>*, download the latest version. I tested *ASP404_1-0-b2.zip*. Unzip the downloaded file, and you'll find a file, *default.asp*, inside it. Take that file and put it in the root of the site you want to proxy; on my server, that's *c:\inetpub\wwwroot*.

Next, you need to configure that script with the appropriate information for the location of your Plone site. You have to open the script in a simple text editor and change two lines that contain the variables for the site configuration. Specifically, change line 18 from this:

::

 zopeAddress = <a href=""http://127.0.0.1:8080">"http://127.0.0.1:8080</a>"

to the address of the destination server. In this example, it's as follows:

::

 zopeAddress = <a href=""http://192.168.2.1:8080">"http://192.168.2.1:8080</a>"

Then change line 27 from this:

::

 zopePath = "/"

to the ID of the Plone object, like so:

::

 zopePath = "/Plone"

Save the file, and close the editor. Finally, you need to tell IIS to speak to Plone; this is where you have to use a bit of trickery. Open the Internet Services Manager, usually found somewhere in the Windows Control Panel. Find the site you want to proxy and access the sites properties, as shown in Figure 10-7.

 ***Insert 3294f1007.jpg***

Figure 10-7. Accessing a site's properties

In the properties, select the Custom Errors tab, and scroll down until you find the error for 404. Double-click the 404 error and alter it as follows:

  - **Message Type**: URL

  - **URL**: /default.asp

Figure 10-8 shows the settings.

 ***Insert 3294f1008.jpg***

Figure 10-8. Setting up the redirect for 404

Save the changes by clicking OK. At this point, your list of errors should look like the list of errors in Figure 10-9. If this is the case, then you should be set up correctly. Access IIS through the browser and bingo鈥攜ou'll see Plone.

 ***Insert 3294f1009.jpg***

Figure 10-9. The error list

What's happened here is that you're capturing the error for when an item can't be found in IIS. The ASP script you installed then reads the request and forwards it to Plone. It takes the response and passes it back to IIS and down the line back to the browser. This means you've added a simple proxy program to IIS.

You have a few key concerns here, though. The first is that a page can't be found in order for the proxy to occur; otherwise the script will not be triggered. This is good and bad. You can add folders and images to IIS, and they will be served out instead of Plone if the names match the request from the browser. Second, the incoming request is parsed and sent on; this gets a little confusing in several situations with all the possible HTTP request configurations. You'll also find that all your Plone requests are actually logged as 404 errors, by IIS, which confuses log file analysis tools.

Overall, this setup has worked for most people who've used it, but whether it's an enterprise solution that could cope with every situation is unlikely. However, it provides a strong base for people to work with and develop.

Debugging Proxy Servers

3.2.4 调试代理服务器
,,,,,,,,,,,,,,,,,,,,,,,

Once you've set the server up and restarted everything, you'll want to test the server by using your browser to visit the site. After doing this a few times, you can use the following tips for when things don't seem to quite work as they should:

 **Testing the site**: The golden rule of debugging proxy servers is to *always *test the site by logging in and using your proxy server. You can do this by accessing the IP and port of your Plone server directly. In the case of the previous example, you can access the site by going to *<a href="http://192.168.2.1:8080/Plone">http://192.168.2.1:8080/Plone</a>*, and you've circumvented the proxy server completely. If you don't have any problems accessing and logging into Plone this way but do when you try through the proxy server, chances are any errors are occurring in the proxy's server side. Some older versions of Apache 1.3 do give problems with cookies when logging in, so you should upgrade to the latest 1.3 version.

 **Checking the URL**: Double-check that your proxy server is sending the right URL, which can be quite long and complicated. Break it down by the forward slashes to examine each part. Remember that for Plone to return the correct URL, it must be passed the correct values. So you have to ensure that the */[protocol]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=protocol" title="create this page">?</a>/[URL]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=URL" title="create this page">?</a>:[port]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=port" title="create this page">?</a>* section is correct. If your site is using SSL, for example, ensure your protocol part is *https*, not *http*.

Integrating Plone with the File System

4. 让Plone和文件系统集成
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Integrating Plone with the file system may sound a little odd, but I'm talking about enabling the use of content on the file system with Plone. Of course, Plone already exists as a series of files that's installed and run on the file system. However, all content in a Plone site is stored in the ZODB, but many people tell me they want to store and serve their content from the file system directly.

Actually, a lot of people look at Zope and Plone, see little folder icons, and assume they directly relate to the folders and items on the file system. However, this is really not the case. If you were using a relational database, as most Content Management Systems (CMSs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMSs" title="create this page">?</a>) do, would you still want to do this? Many people jump into this thinking it's a problem, but the following are reasons why you'd want to do this:

 **You have lots of really large pieces of content**: Plone can manage really large files without a lot of problems. Databases of more than 10 gigabytes aren't uncommon and work just fine. If you're getting really large pieces of content (for example, one client I work for uses Plone to manage its DVDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=DVDs" title="create this page">?</a>鈥攖he actual content of the DVDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=DVDs" title="create this page">?</a>, that is), then take a look at CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a> and Apache. For really large stuff, using Apache or another service to serve your content is a good way to go.

 **You want to manage content using programs that read from the file system, such as Microsoft Word**: You can use External Editor to edit content stored in a Plone site using your local programs. If you have Microsoft Word installed, you can upload a Microsoft Word document and then edit it in Microsoft Word on your computer.

 **You're sick of editing code through the Web in little text areas**: Again, look first at External Editor. Second, why are you doing work through the Web anyway? As I demonstrated in Chapter 7, you can write all skins and CSS templates on the file system.

 **You can use my file system tools on the content**: Well, you can mount Plone via File Transfer Protocol (FTP) and WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WebDAV" title="create this page">?</a>. Both of these provide file system鈥搇ike interfaces that work with Plone.

 **You want to back up the content easily**: In Chapter 14 I show how to back up and administer Plone and how to do simple incremental backups. An alternative storage called Directory Storage can handle this *<a href="http://dirstorage.sf.net">http://dirstorage.sf.net</a>*.

 **You want to use CVS/Subversion/BitKeeper<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=BitKeeper" title="create this page">?</a> or some other source control system on the content**: Ah, that makes sense but, unfortunately, isn鈥檛 fully integrated yet. In future versions, one tentatively called Plone 3, this may be fully integrated.

With these points in mind, you'll now look at various ways you could serve content that exists on the file system through Plone.

Using the Proxying Web Server

4.1 使用代理的Web服务器
.............................

So you've set up the Web server as described earlier in this chapter. At the risk of repeating myself, that Web server is better at serving plain content than Plone ever will be. If you have a large number of downloads, simply put them in a directory on your server that won't be proxying to Plone and then link to them from Plone. The users will just click the link and download as usual.

Doing this in IIS is easy because IIS first automatically checks to see if the file exists before raising the 404 error. Apache requires only two extra lines in the configuration, highlighted in the following code in bold:

::

 <VirtualHost *:80>
     ServerName<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ServerName" title="create this page">?</a> yoursite.com
     # other configuration options
     DocumentRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=DocumentRoot" title="create this page">?</a> /var/downloads
     RewriteEngine<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteEngine" title="create this page">?</a> On
     RewriteRule<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteRule" title="create this page">?</a> ^/download(.*) - [L]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L" title="create this page">?</a>
     RewriteRule<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteRule" title="create this page">?</a> ^/(.*)  <a href="http://192.168.2.1:8080">http://192.168.2.1:8080</a> ~CCC
 /VirtualHostBase<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostBase" title="create this page">?</a>/http/www.mysite.com:80 ~CCC
 /Plone/VirtualHostRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=VirtualHostRoot" title="create this page">?</a>/$1 [L,P]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L%2CP" title="create this page">?</a>
 </VirtualHost>

In this example, you'll put the content in */var/downloads*, and the URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=URLs" title="create this page">?</a> to the downloadable through Apache content will all start with */download*.

The rewrite engine will see that the URL starts with */download* and then not apply any change to it鈥攖hat's what the dash (*-*) means. By specifying the *[L]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L" title="create this page">?</a>* at the end of the line, no more rewrite rules will apply, so the proxy doesn't occur and Apache carries on like usual, serving the file.

This trick is useful if you want to host other services in the same virtual host. In one site I host鈥擬ailman, a mailing list manager鈥攁ll the Mailman URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=URLs" title="create this page">?</a> start with */mailman* and */pipermail*. After setting up Mailman correctly and doing all the configuration, I added the following two lines to the configuration so that it'd work nicely:

::

 RewriteRule<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteRule" title="create this page">?</a> ^/mailman(.*) - [L]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L" title="create this page">?</a>
 RewriteRule<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=RewriteRule" title="create this page">?</a> ^/pipermail(.*) - [L]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=L" title="create this page">?</a>

Again, the only catch here is that you can't add objects to Plone where the names may conflict with your rules, such as adding folders with similar names. For example, *mailman*, *pipermail*, or *download* in this example would be forbidden because users could never view those objects. You could use this method to restrict access to certain parts of your site, but I recommend using security within Plone for this. At this point, Plone isn't actually managing content, so it has no security, workflow, or metadata. The content is entirely outside of Plone. This may be a good solution, though.

Managing a File in Plone

4.2 在Plone中的文件管理
........................

CMFExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternalFile" title="create this page">?</a> is a product that allows you to manage content from within Plone and still have the core content on the file system. If you installed ExternalFile<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ExternalFile" title="create this page">?</a> and CMFExternal<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=CMFExternal" title="create this page">?</a> earlier in the chapter, then you're all set. If not, return to the earlier 'Installing Plone Products鈥?section.

After installing these, return to your Plone interface. You'll note that if you go to Plone, you can now add a new content type called *External File*. You add the External File type in the same way as a normal file, as I described in Chapter 3. In fact, if you dig into the program code, you'll note that it uses the same templates.

However, you'll notice one small difference here. The file has actually been added to the file system. It's placed in a new directory located in the *var* directory of your Plone installation. If you aren't sure where this is, go to the control panel and look for the directory listed by the instance home; my *var* directory is located in */var/zope/var*. Inside that directory is a directory called *externalfiles*. In this directory, all the files you upload into Plone will be created. If you look in that directory, you should find the file you uploaded.

What you've got now is a hybrid storage solution that stores the file on the file system and the metadata about the object (description, keywords, and such) in Plone. This is better than the Web server鈥搊nly solution because it allows the content to have security, metadata, and so on. If you really wanted, by configuring your Web server correctly, you could have the content served by Apache by reading the directory from the *externalfiles* directory.

FTP Access into Plone

4.3 通过FTP来访问Plone
.....................

Using FTP is one good way to put and get content so that you can edit it without having to use a browser. To enable FTP in Plone, ensure that it's enabled in the server. Returning to Chapter 2, you can see how to add and edit services like this. In short, make sure your Zope configuration file, *zope.conf*, has the following in it:

::

 <ftp-server>
     address 21
 </ftp-server>

**NOTE** If you're going to have your server use port 21, you must ensure that nothing else is listening to that port. Furthermore, for most Unix systems, you'll need to start your service as root so that it has permissions to connect to the low-numbered port. To do this, you'll need to set the effective user in your Zope configuration file. See the 'Setting Up Security on Your Server鈥?section in Chapter 9.

Next, you'll need an FTP client to access the server. If you're on Windows, then you can just use Internet Explorer by entering the address of the server in the address bar. For example, set the address to the path of your Zope server (such as *<a href="ftp://localhost:8021/">ftp://localhost:8021/</a>*), and you'll get access to the objects in your site, as shown in Figure 10-10.

 .. image:: img/3294f1010.png
    :width: 700

Figure 10-10. FTP access in Internet Explorer

If you need a username and password to access the server, then you'll need to add them to the URL in the following format: *<a href="ftp://user:password@localhost:8021/">ftp://user:password@localhost:8021/</a>*. Many other FTP clients are available that will allow you to have a more sophisticated interface if you'd like. Many FTP clients are available in Linux, for the command line, or with GUIs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=GUIs" title="create this page">?</a>, such as gFTP and Konqueror.

WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WebDAV" title="create this page">?</a> Access into Plone

4.4 通过WebDAV来访问Plone
........................

WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WebDAV" title="create this page">?</a> is a system for authoring content in systems such as Plone using HTTP. This allows you to map a Plone server as a file system. To enable this, you'll have to edit the Zope configuration file as I detailed in Chapter 2 so that the *zope.conf* file has the following in it:

::

 <webdav-source-server>
     address 1980
 </webdav-source-server>

In Windows, the WebDrive<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WebDrive" title="create this page">?</a> program is available at *<a href="http://www.webdrive.com/">http://www.webdrive.com/</a>*. A free trial is available, so you can give it a try. After installing WebDrive<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WebDrive" title="create this page">?</a>, add a connection to the Plone server, and then all you need to do then is access your Plone directly from the file system by going to Windows Explorer, as shown in Figure 10-11.

 .. image:: img/3294f1011.png

Figure 10-11. Accessing your Plone contents using WebDrive<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=WebDrive" title="create this page">?</a>

For Unix, you can get Cadaver (*<a href="http://www.webdav.org/cadaver">http://www.webdav.org/cadaver</a>*), which is a full-featured command-line client. After installing Cadaver, you can connect to a Plone site from the command line. For example:

::

 cadaver <a href="http://192.168.2.1:8080/Members/Plone">http://192.168.2.1:8080/Members/Plone</a>

Editing Content with Rich Editors

4.5 使用非纯文本编辑器来编辑内容
.................................

Editing content in a text area is a really bad way to force users to write and edit content鈥攕omething I've commented on several times. Some editors provide a solution for this.

One is Epoz, which allows users to edit and alter documents directly in the browser without having to know HTML. If you have lots of users entering content, then installing Epoz allows your users to alter HTML content without having to actually understand HTML. For really advanced editing, you could use External Editor, which would allow you to edit content in a local program such as Microsoft Word.

Browser WYSIWYG Editor

4.5.1 基于浏览器的 WYSIWYG 编辑器
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

You can find the tested version of Epoz 0.7.4 at *<a href="http://zope.org/Members/mjablonski/Epoz/0.7.4">http://zope.org/Members/mjablonski/Epoz/0.7.4</a>*. Epoz requires a modern browser, which most Plone users will need anyway. The required browsers are Internet Explorer 5.5+, Mozilla 1.3.1+, and Netscape 7.1+.

Download and install Epoz as usual; after installing, you'll need to change your personal Plone preferences so that you can use Epoz. Log into Plone, click *my preferences*, and select Personal Preferences. On the preferences page, open the Content Editor drop-down list, select the Epoz option, and then click Save to commit your changes.

Now you've chosen your editor, go to a document (any document will do) and click the Edit tab. You'll note that the *Body text* field has now changed significantly into a rich editor. The editor should be pretty self-explanatory to you, with familiar buttons such as B for bold, I for italics, and so on (see Figure 10-12).

 .. image:: img/3294f1012.png
    :width: 700

Figure 10-12. Editing a document in Epoz

External Editor

4.5.2 外部编辑器
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

External Editor is a tool you can use on all sorts of Plone content, templates, and code. It allows you to edit Plone objects stored on a Plone site locally in programs of your choice. For example, you can edit a Microsoft Word document stored on your Plone site locally in Microsoft Word. When you save the document, it's automatically sent to Plone.

External Editor comes with the Plone installer packages and sets up automatically on the server. The application is unusual in that it has two components: one for the server and one for *each* client that wants to use the product.

Installing the server product isn't necessary if you used an installer to install your Plone site. If this isn't the case, the server-side product is available at *<a href="http://zope.org/Members/Caseman/ExternalEditor">http://zope.org/Members/Caseman/ExternalEditor</a>*. Install the product in the standard way I discussed at the beginning of this chapter, and then restart your Zope.

Then, in Plone, log in as the administrator, click *plone setup*, and then select Portal Configuration. Select the Enable External Editor option to make sure you can edit objects with this tool.

For every computer accessing the Plone site, you'll need to install this product on the client computer. Just like you'd install Flash or QuickTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=QuickTime" title="create this page">?</a> in your browser, you install the client-side External Editor code. This is manageable in intranets or on your computer but can be a little harder for a public site.

For Windows 2000 and XP, download the executable Windows installer named *zopeedit-win32-0.7.1.exe*. Double-click the installer, and the graphical install will proceed. You just need to select all the defaults. This will set up the options for Internet Explorer. To verify that this has worked, do the following:

 .. image:: img/3294f1013.png

Figure 10-13. File type configuration on Windows

For Unix, download the tarball named *zopeedit-0.7-src.tar.gz*. You'll need to then unpack and run the setup as detailed in the Unix installation instructions at *<a href="http://zope.org/Members/Caseman/ExternalEditor/install-unix">http://zope.org/Members/Caseman/ExternalEditor/install-unix</a>*. The following is an example with version 0.7:

::

 $ tar -zxf zopeedit-0.7.1-src.tgz
 $ cd zopeedit-0.7.1-src
 $ python setup.py install
 ...

After you've installed the client, you'll need to configure each browser you want to use. Instructions for Konqueror, Galeon, and other browsers are available online at Zope.org. The following are the step-by-step configuration instructions for Mozilla:

**Zope Editor**
**application/x-zope-edit**
External Editor opens an editor based on the contents of a configuration file. To have an editor of your choice invoked, alter that file. You can find it under different names in the following places, depending on your setup:

  - On Windows, if you installed Plone using an installer, you can find this file at *c:\Program Files\Plone\Zope\pwi\zopeedit.ini*.

  - On Windows, if you used the stand-alone External Editor installer, you can find this file in the directory you installed External Editor to; by default this is *c:\Program Files\ZopeExternalEditor<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=ZopeExternalEditor" title="create this page">?</a>\zopeedit.ini*.

  - On Unix, this file will be called *.zope-external-edit* and located in the home directory of the user running the program, for example, */home/andy/.zope-external-edit*. It's in the home directory of the user because each user may have different settings.

This file contains a mapping of extensions and the editor invoked; to change the editor for page templates, for example, find the following lines that have *meta-type:Page-Template*:

::

 [meta-type:Page Template]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=meta-type%3APage%20Template" title="create this page">?</a>
 extension=.pt

For example, you can use Scite, a free text editor. To use this editor for page templates, you'd have to change the file to read as follows:

::

 [meta-type:Page Template]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=meta-type%3APage%20Template" title="create this page">?</a>
 extension=.pt
 editor=scite

For External Editor to work, each invocation of the editor must open a separate process. This means that the External Editor client program can monitor that process to see when it's finished. This causes problems for some editors that try to open multiple files in the same process. For example, to load VIM in KDE, you must run a separate shell as follows:

::

 editor=konsole -e vim

Editing a Word Document

4.5.3 编辑Word文件
,,,,,,,,,,,,,,,,,,,,,,,

Editing a Microsoft Word document is actually really easy to set up; all you need is Microsoft Word installed on your local computer. Upload your Microsoft Word document to Plone as a standard file and then view the file in Plone. Click the little pencil icon in the top-right corner of your page. Microsoft Word will open on your computer, and the document from the server will display. You can now edit the content as much as you want, and clicking Save will automatically save the file into Plone.

Editing Page Templates Through External Editor

4.5.4 通过外部编辑器编辑页面模板
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

To create a page template, use the ZMI. Sure enough, when viewing the folder containing the page template, you'll see an extra pencil icon to the right of the object. Clicking the pencil will activate External Editor and open the page template in the editor you've selected. All you need to do is find a good editor for editing the page templates. Since page templates are just Extensible HTML (XHTML), I use a simple editor that supports Extensible Markup Language (XML). The following sections discuss two example editors: Dreamweaver and HTML-Kit.

Dreamweaver MX

4.5.5 Dreamweaver MX
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Change the *[meta-type:Page Template]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=meta-type%3APage%20Template" title="create this page">?</a>* part of the configuration file to point to Dreamweaver. For example, in my installation this is as follows:

::

 [meta-type:Page Template]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=meta-type%3APage%20Template" title="create this page">?</a>
 extension=.pt
 editor=C:\Program Files\Macromedia\Dreamweaver MX\Dreamweaver.exe

Clicking the pencil icon to edit in External Editor now opens it directly in Dreamweaver, as shown in Figure 10-14. Unfortunately, Dreamweaver will not open in each file in a separate instance, which means you can edit only one file at a time.

 .. image:: img/3294f1014.png
    :width: 700

Figure 10-14. Editing page templates in Dreamweaver

HTML-Kit

4.5.6 HTML-Kit
,,,,,,,,,,,,,,,,,,,,,,,,

HTML-Kit is a free and powerful HTML editor and is the favorite of many Plone developers. To use HTML-Kit with External Editor, alter your configuration file to point to HTML-Kit. For example, in my installation this is as follows:

::

 [meta-type:Page Template]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=meta-type%3APage%20Template" title="create this page">?</a>
 extension=.pt
 editor=C:\Program Files\Chami\HTML-Kit\Bin\HTMLKit<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=HTMLKit" title="create this page">?</a>.exe

Clicking the pencil icon to edit in External Editor now opens it directly in HTML-Kit. You can also edit a setting to open each file in a separate process; select Edit - Preferences - Startup, and check *Limit to a single HTML-Kit instance*. Each file will now open a new process.


From redmoon Wed Nov 10 02:44:11 -0800 2004
From: redmoon
Date: Wed, 10 Nov 2004 02:44:11 -0800
Subject: 格式有问题
Message-ID: <20041109104411-0800@nocache.czug.org>

由于我对ReStructuredText还不是很了解，所以造成页面格式有问题。我会尽快修正。

From unknown Tue Apr 26 11:21:21 +0800 2005
From: 
Date: Tue, 26 Apr 2005 11:21:21 +0800
Subject: DJxiaowei<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=DJxiaowei" title="create this page">?</a>
Message-ID: <20050426112121+0800@www.czug.org>



From unknown Tue Apr 26 11:21:45 +0800 2005
From: 
Date: Tue, 26 Apr 2005 11:21:45 +0800
Subject: DJxiaowei<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter10/createform?page=DJxiaowei" title="create this page">?</a>
Message-ID: <20050426112145+0800@www.czug.org>

