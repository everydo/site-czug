---
created: 2005-12-14 14:34:40
creator: panjy
description: ''
title: Chapter2
---
第二章
---------

.. Contents:: 内容：

安裝Plone
================

This chapter explains how to install Plone on a variety of platforms and set the basic configuration options for Plone. If you want to try Plone really quickly, then your best bet is to go to the live demonstration site at *<a href="http://demo.plone.org">http://demo.plone.org</a>*; you can try adding and editing content immediately without installing anything.

本篇解釋怎樣在各種平台上安裝Plone及調整它的基本設定。如果你急切的要測試Plone﹐你最好是到這個試範網站 *<a href="http://demo.plone.org">http://demo.plone.org</a>* ﹔不用安裝任何東西﹐你也可立即嘗試新增及修改內容。

Unlike the other chapters, reading this chapter from one end to the other may not make the most sense. Instead, I've broken this chapter down by operating system, so you can read only the sections you need to in order to install Plone. Plone will install on any of the platforms that Zope supports: Windows, Mac OS X, Linux, most Unix platforms, and Solaris.

不同於其他篇章﹐ 將這篇由頭至尾的閱讀可能沒有意思。 我為此將這篇按系統分開﹐你可以只閱讀有需要的部份以安裝Plone。 Plone可在所有Zope支援的系統安裝﹕Windows﹐ Mac OS X﹐ Linux﹐ 大部份的Unix 平台﹐ 及Solaris。

For a Plone server, a high-performance computer will obviously make Plone perform better. Plone is a complicated system that requires processing power and memory. In general, it's recommended you don't go into production with a machine slower than 2GHz with less than 1GB of Random Access Memory (RAM) if you're serving a large Web site. It works fine with setups as low as 500MHz and 64MB of memory for more modest sites, however. For advanced information about the performance, caching, and acceleration of Plone, see Chapter 14. For a base installation of Plone, you'll need about 50MB of hard drive space. If you already have installations of Zope or Python, then this will be a great deal less; you'll need about 2MB. You must also account for the Plone object database, which can grow to almost any size depending upon the amount of data you store.

對於Plone伺服器﹐ 一個高效率的電腦將明顯提升Plone的表現。 Plone是一個複雜的系統﹐ 它要求相當的執行權限及記憶體。一般來說﹐如果你正式應用一個大型網站﹐一部慢過2GHz及少於1GB記憶體(RAM)是不被建議的。雖然﹐它可以在500MHz及64MB 記憶體的設定上運作較小型的網站。在第14章﹐有關於速度﹐緩衝,及加速Plone的進階資料。最基本的安裝只須50MB的硬碟空間。如果你已安裝Zope或Python,你所須的會大大減少﹔你只須2MB.你一定要考慮Plone object database﹐ 它會因你的使用量無限量增大﹐  

To use Plone, you need a Web browser that can access the server. If users want to log into your site, then they must have cookies enabled. JavaScript<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=JavaScript" title="create this page">?</a> isn't required but will provide a richer user experience. Because of the large amount of Cascading Style Sheets (CSS) in Plone, modern browsers will see the correct Plone interface in a richer, more attractive way; however, it should be quite functional in any reasonable browser.

使用Plone, 你需要一個可以存取伺服器的瀏覽器。如果用者需要登入你的網站﹐他們必需啟動cookies。JavaScript 並不是必需的﹐但將會給予更豐富的瀏覽經歷。因為在Plone內的大部份串接樣式表(CSS)﹐新的瀏覽器也會看見正確的而又更豐富﹐更吸引的Plone介面﹔雖然﹐在任何一個瀏覽器﹐它也應該適合的運作。

I recommend any of the following browsers:

我建議以下瀏覽器﹕

  - Microsoft Internet Explorer 5.5 and later

  - Netscape 7.0 and later

  - Mozilla 1.0 and later

  - Opera 7.0 and later

  - Konqueror 3.0 and later

  - Safari 1.0 and later

Plone also is fully functional in the following browsers but may look different from the original Plone:

Plone 在以下瀏覽器也運作良好但外觀可能有些分別﹕

  - Netscape 4.*x*

  - Microsoft Internet Explorer 5.0

  - Microsoft Internet Explorer 4.0

  - Konqueror 2.*x*

  - Lynx (text-based)

  - w3m (text-based)

  - AWeb<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=AWeb" title="create this page">?</a>

  - Links (text-based, with optional graphics)

  - Any browser that handles a basic set of Hypertext Markup Language (HTML) and form input cookies, including most mobile/Personal Digital Assistant (PDA) browsers

  - 任何可處理基本 Hypertext Markup Language (HTML) 的瀏覽器及表單輸入cookie, 包括大部份流動/個人電子手帳(PDA)瀏覽器

Window上安裝Plone
~~~~~~~~~~~~~~~~~~~~~~~~~~~

By far the easiest way to install Plone is to use the Plone Windows installer, which automates the installation of Plone on Windows. The installation includes extra packages and options, a Hypertext Transfer Protocol (HTTP)â€“loaded database, the setup of services, and Python for Windows packages. You can download this installer from *<a href="http://www.plone.org/download">http://www.plone.org/download</a>*.

到目前為至最簡單的安裝Plone方法便是使用Plone Windows Installer, 它會自動在Window安裝Plone. 安裝包括額外的package 及選擇﹐ 一個 Hypertext Transfer Protocol (HTTP)â€“loaded database﹐ 安裝成services, 及Python for Windows package. 你可以在這裏下載installer *<a href="http://www.plone.org/download">http://www.plone.org/download</a>*.

使用Installer
...................

The installer has been tested on Windows 9*x*, ME, NT 3.51+, 2000, and XP, but it should also work on other Windows versions. It's recommended you have administrator access on the computer you want to install on since the installer will try to set up as a service and install settings into the Windows Registry. If you already have Zope or Python installed, you may want to install the source separately to save hard drive space.

這Installer㔾已在Windows 9*x*, ME, NT 3.51+, 2000, 及XP上測試﹐但在其它Windows版本也應運作。因為Installer將嘗試安裝service及將設定存入Windows Registry, 建議你在將進行安裝的電腦擁有管理員權限。如你㔾經已安裝Zope或Python, 你可能只需分別安裝源碼以省回硬碟空間。

Before installing Plone, you should make note of any current Web servers you have running. For example, later versions of Windows automatically install and start Microsoft Internet Information Services (IIS), which listens to port 80. The installer starts Plone on ports 80 and 8080. To test if something is using port 80 already, the easiest way to test is by opening a browser to *<a href="http://127.0.0.1/">http://127.0.0.1/</a>* and seeing if it finds a page. You can either disable that Web server or change the ports for Plone; see 'Configuring the Web Serverâ€ later in this chapter. If you want to run Plone behind IIS or run both Plone and IIS on the same server at the same time, then see Chapter 14 for more information. At the moment, however, it's easiest to just disable that Web server.

在安裝Plone前﹐你應該寫下所有正在執行的伺服器。例如﹐最近版本的Windows自動安裝及啟動Microsoft Internet Information Services (IIS), 並Listen 80 port. 這Installer開啟Plone是在80及8080 port的。要測試有沒有程式已使用80 port ﹐最方便的方法是嘗試開啟瀏覽器到 *<a href="http:/127.0.0.1/">http:/127.0.0.1/</a>* 及看看有沒有找到網頁。你可以關閉那個伺服器或改變Plone的ports﹔詳情請看這章後段的'Configuring the Web Server‘。如果你要在IIS後面執行Plone或同時在同一台伺服器執行Plone及IIS﹐請看第十四章的詳情。暫時來說﹐最方便的方法是關閉伺服器。

Once you've downloaded the installer, double-click the installer to begin (see Figure 2-1).

如果你經已下載Installer, 雙按Installer並開始 (圖 2-1) 。

 .. image:: img/3294f0201.png

Figure 2-1. The start of the Plone installer

圖 2-1。 Plone Installer開始

 The installer goes through the usual steps for installing software; click Next to continue the setup or Cancel to exit. The Plone installer lets you choose a location to install the software; the default is *c:\Program Files\Plone 2* (see Figure 2-2).


  這Installer經過一般的安裝步驟﹔按 下一步 續繼安裝或 取消離開。Plone Installer 讓你選取安裝位置﹔預設為 *c:\Program Files\Plone 2* (圖 2-2).

 .. image:: img/3294f0202.png

Figure 2-2. Selecting a directory

圖 2-2。選取文件夾

When you get to the password screen, as shown in Figure 2-3, you must enter a username and a password. This will create a user for you, and this will make the Plone site in that user's name. Often people create one user called *admin* or similar for this role. You'll need this username and password later, so remember it; however, if you do lose this password, you can enter a new one later.

 .. image:: img/3294f0203.png

Figure 2-3. Entering a username and password

The installation takes about five minutes, depending upon the speed of your computer. The installation performs a few tasks at the end of the installation, such as compiling all the Python files and setting up the database. When the installation has finished, a message displays to let you know that it's done (see Figure 2-4).

 .. image:: img/3294f0204.png

Figure 2-4. Final setup screen

To start Plone, access the Plone controller by going to Start - Programs TRA Plone TRA Plone. The controller is an application that provides a nice user interface for starting and stopping Plone. It begins with the Status page, which lets you easily start or stop your Plone installation (see Figure 2-5).

 .. image:: img/3294f0205.png

Figure 2-5. Plone isn't running.

As shown in Figure 2-5, the screen displays the status of your Plone installation. Plone doesn't start automatically; you'll have to click Start to start Plone. Once you've clicked this, you may have to wait a minute as it completes the startup process (see Figure 2-6).

 .. image:: img/3294f0206.png

Figure 2-6. Plone is now running.

When Plone has started, you can access the Plone site by clicking the View Plone button. This starts a browser and accesses the Plone site; you should then see the Plone welcome page. Note that the address in the browser is *<a href="http://localhost/">http://localhost/</a>*; this is the address to access your Plone site. Clicking the Zope Management Interface* *button starts a browser and accesses the management interface; the address in the browser for this is *<a href="http://localhost::8080/manage">http://localhost::8080/manage</a>*, which gives you access to the underlying application server. When you click the Manage button and access Plone, it'll ask you for your username and password. This is the username and password you added in the installer.

The controller will know whether you've installed Plone as a service or not as a service. If Plone has been installed as a Windows service, then you can stop and start Plone using the standard service management screens and commands. If it hasn't been installed as Windows service, you'll see a little icon appear in the task bar. At this point if you want to edit content, move on to Chapter 3.

Configuring the Server on Windows
.................................

The configuration for Plone is contained in a text file that you can edit to configure your Plone instance. You can change the ports Plone listens to, the log files used, and a whole host of options. On Windows some of the key features are available through the controller and the Graphical User Interface (GUI). If you want to alter some of the other configuration options, refer to Appendix A for a full list of configuration options. To access the controller, select Start - Programs - Plone - Plone; this will start the controller.

As discussed earlier, the first page you'll see is the Status page, which allows you to stop or start Plone. On the left of the controller are a few other screens that I'll now discuss.

Changing the Ports
,,,,,,,,,,,,,,,,,,

The Ports choice, as shown in Figure 2-7, allows you to specify the ports that Plone listens to for incoming connections such as HTTP, File Transfer Protocol (FTP), and Web-based Distributed Authoring and Versioning (WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=WebDAV" title="create this page">?</a>).

 .. image:: img/3294f0207.png

Figure 2-7. The Ports page displays the ports on which Plone is running

As mentioned when installing Plone, you'll want to ensure that no other server is listening to the same port as Plone servers such as II:S, Apache, and Personal Web Server (PWS) could be listening to port 80. At the time of writing, only the Plone HTTP and Zope Management HTTP ports are enabled; to enable them, you have to go into a text file to configure them. The following are the four fields on the Ports page:

 **Plone** **HTTP**: This field specifies the port to access Plone for the user. The default is port 80, the standard default for a Web server. Although this port isn't required, without it you won't be able to access Plone with a Web browser. If this port is enabled and Plone is running, the View Plone button is enabled on the Status page.

 **Zope Management** **HTTP**: This field specifies the port to access Plone as the manager. The default is port 8080. This port gives you access to Zope Management Interface (ZMI) for the root of Zope. You can still get to this through the HTTP port; however, it's easier and more convenient to have a separate port. If this port is enabled and Plone is running, the Manage Plone button is enabled on the Status page.

 **FTP Access**: This field specifies the port to access Plone via FTP. The default is blank, meaning that this isn't enabled; if you want to enable this, the usual port is 21. You can use FTP to transfer large files to and from Plone.

 **WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=WebDAV" title="create this page">?</a> Source**: This field specifies the port to access Plone via WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=WebDAV" title="create this page">?</a>. The default is blank, meaning that this isn't enabled; if you want to enable this, the usual port is 8081. (WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=WebDAV" title="create this page">?</a> is a protocol for remotely authoring content in Plone. With WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=WebDAV" title="create this page">?</a>, you're able to perform tasks such as mapping your Plone server to a Windows drive letter.)

Using the Emergency User Page
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Chapter 9 covers the Emergency User page, but, put briefly, it allows you to get emergency access to your system should you forget your username or password.

Starting Plone in Debug Mode
,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Up to this point, you've started and stopped Plone in production mode. This is the fastest way to run Plone and is recommended. For developing add-ons in Plone or debugging problems, you'll need to start Plone in debug mode. This mode is the recommended way of running Plone when you're developing products and skins, as you'll do in later chapters. This method isn't the default because you'll note that Plone is about ten times slower than normal.

To start Plone in debug mode, select Start - Programs - Plone - Plone (Debug Mode), and a command prompt will appear; all the log information will be printed to this window (see Figure 2-8).

 .. image:: img/3294f0208.png

Figure 2-8. Running Plone from the command line

To test that Plone is running, start a browser and go to *<a href="http://localhost/">http://localhost/</a>*; if Plone is installed successfully, you'll see the Plone welcome screen.

Installing Plone on Mac OS X, Unix, and Linux
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The installations for Mac OS X, Unix, and Linux are different, but the configurations are similar. Specific packages exist for different operating systems, including Mac OS X, Debian, Gentoo, FreeBSD<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=FreeBSD" title="create this page">?</a>, OpenBSD<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=OpenBSD" title="create this page">?</a>, and RPM Package Managers (RPMs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=RPMs" title="create this page">?</a>) for Red Hat, SuSE<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=SuSE" title="create this page">?</a>, and Mandrake. In the following sections, I'll cover some of the more popular: Mac OS X, Red Hat, and Debian. For information about your specific operating system, consult the installation instructions for the specific installation system.

Installing on Mac OS X
......................

The installer automates the installation of Plone on Mac OS X and has been tested on version 10.2.3 and later. You'll need administrator access on the computer on which you want to install. You can download this installer from *<a href="http://ww.plone.org/download">http://ww.plone.org/download</a>*. Once you've downloaded the installer, double-click the installer to decompress the archive, and double-click the resulting installer package to begin the install. You should see the screen shown in Figure 2-9.

 ***Insert 3294f0209.jpg***

Figure 2-9. Authorizing the installation using your Mac OS X password

Enter your Mac OS X account password to authorize the installation; your account must have administrator privileges to do this. If your account doesn't have administrator privileges, log out and log back in as someone who does and then relaunch the installer. You may want to move the installer package to */Users/Shared* before you log out so you can access it from the other account. Once the installation is authorized, you'll see the screen shown in Figure 2-10.

 ***Insert 3294f0210.jpg***

Figure 2-10. Welcome to the installer.

The installer goes through the usual steps for installing software. Click the Continue and Go Back buttons at the bottom as necessary; most of the steps are self-explanatory. However, when presented with the choice of volumes to install Plone on, you must choose the partition on which Mac OS X is installed (see Figure 2-11).

 ***Insert 3294f0211.jpg***

Figure 2-11. Choosing the boot volume

The installation takes about five minutes, depending upon the speed of your computer. When the installation has finished, Plone isn't started by default. The *ReadMe<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=ReadMe" title="create this page">?</a>.rtf* file in */Applications/Plone* contains a lot of useful information about running and managing your Plone installation, including how to start Plone. For example, running the following command will start Plone:

::

 sudo /Library/StartupItems<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=StartupItems" title="create this page">?</a>/Plone/Plone start

To test whether Plone has worked, use a browser to go to *<a href="http://localhost:9090/">http://localhost:9090/</a>*; you should see the Plone welcome page. Also in that *ReadMe<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=ReadMe" title="create this page">?</a>* file you'll find the username and password that Plone has set up for you to access the server.

Installing Using an RPM
.......................

RPMs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=RPMs" title="create this page">?</a> are available for the Red Hat, Mandrake, and SuSE<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=SuSE" title="create this page">?</a> distributions. You can download the latest packages from *<a href="http://www.plone.org/download">http://www.plone.org/download</a>*. The RPM requires that Python 2.3 is installed. To find out which version of Python you have, run the following command in a shell:

::

 $ python -V
 Python 2.3.2

In this case, Python 2.3.2 is installed; if you don't have this, RPMs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=RPMs" title="create this page">?</a> for Python are available from the Python Web site at *<a href="http://www.python.org">http://www.python.org</a>*. After downloading the files, install using the standard *rpm* command; fortunately, the Plone installation prints some really useful information. For example:

::

 [root@lappi i386]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=root%40lappi%20i386" title="create this page">?</a># rpm -ivh Plone2-2.0.0rh-2.i386.rpm
 Preparing... ###########################################
 [100%]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=100%25" title="create this page">?</a>
 Making group plone (not altered if already exists).
 Making user plone.
 ~ 1:Plone2 ###########################################
 [100%]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=100%25" title="create this page">?</a>
 Creating initial 'main' instance...
 Instance created. Listening on 127.0.0.1:8080, initial user: 'plone'
 with password: 'plone'.
 Setup of initial database in 'main' instance...
 /usr/lib/plone2/lib/python/AccessControl<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=AccessControl" title="create this page">?</a>/Owned.py:79:
 DeprecationWarning<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=DeprecationWarning" title="create this page">?</a>: Owned.getOwner(1) is deprecated; please use
 getOwnerTuple() instead.
 ~ DeprecationWarning<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=DeprecationWarning" title="create this page">?</a>)
 Created initial database content.
 look at /etc/plone2/main/zope.conf.
 Run then "/etc/rc.d/init.d/plone2 start" to start Plone2.
 you may create new Plone instances with mkploneinstance.

As shown in the previous output, to start Plone, run the following:

::

 /etc/rc.d/init.d/plone2 start

To test that Plone is working, use a browser to go to *<a href="http://localhost:8080/">http://localhost:8080/</a>*; you should see the Plone welcome page. The username *plone** *and the password *plone* have been created for you*.*

Installing on Debian Linux
..........................

Plone is a standard package in Debian and moves through the standard release process, so you'll want to either get the stable or get the unstable version of Plone, depending upon how your Debian installation is configured. To install Plone, simple use Debian's *apt* system to get the package. This is an example installation:

::

 agmweb:/home/andy# apt-get install plone
 Reading Package Lists... Done
 Building Dependency Tree... Done
 The following extra packages will be installed:
   zope zope-cmf zope-cmfcalendar zope-cmfcore zope-cmfdefault
 zope-cmfplone zope-cmftopic zope-cmfworkflow
   zope-formulator zopectl
 Suggested packages:
   zope-cmfwiki python-unit zope-devguide zope-book
 Recommended packages:
   zope-cmfforum zope-localizer
 The following NEW packages will be installed:
   plone zope zope-cmf zope-cmfcalendar zope-cmfcore zope-cmfdefault
 zope-cmfplone zope-cmftopic zope-cmfworkflow
   zope-formulator zopectl
 0 upgraded, 11 newly installed, 0 to remove and 49 not upgraded.
 Need to get 4743kB of archives.
 After unpacking 24.9MB of additional disk space will be used.
 Do you want to continue? [Y/n]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=Y/n" title="create this page">?</a>

Press Y to continue and install all the required packages. To start and stop Zope, an install script has been created in the *init.d* directory, called *zope*. To start Plone, run the following:

::

 /etc/init.d/zope start

The Debian installer starts Zope on the nonstandard port 9673. Since the Debian installer is quite unusual, it's recommended that you read the documentation for the packages at */usr/share/doc/zope* and */usr/share/doc/zope-cmfplone*.

Installing from Source
~~~~~~~~~~~~~~~~~~~~~~

As an alternative to using an installer or package, you can install from the source tarball. If you're familiar with installing from source, it's actually rather simple but does require familiarity with basic tools such as *tar*. The following sections demonstrate how to install it on Linux.

This installation assumes you're familiar with basic operations such as 'untarringâ€ files and moving files. This requires a working Zope installation.

 **NOTE**	To install Zope, see the Zope installation instructions in the *doc/INSTALL.txt* file of your Zope download. For more information, see *<a href="http://zope.org/Documentation/Books/ZopeBook/2_6Edition/InstallingZope.stx">http://zope.org/Documentation/Books/ZopeBook/2_6Edition/InstallingZope.stx</a>*).

Follow these steps to install Plone:

 1. Download Plone 2 from <a href="http://www.plone.org/download,">http://www.plone.org/download,</a> and select the tarball file.

 2. Unzip the archive using the following: *tar xzf CMFPlone2<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=CMFPlone2" title="create this page">?</a>.0.tar.gz*

 3. You'll find that a directory has been created called CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=CMFPlone" title="create this page">?</a>-xxx, where xxx is the version (for example, CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=CMFPlone" title="create this page">?</a>-2.0).

 4. Move the contents of that directory into your Zope installationâ€™s Product directory. For example, if the Zope Products directory is in /var/zope, then do this: *mv CMFPlone2<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=CMFPlone2" title="create this page">?</a>.0/* /var/zope/Products*

After completing this installation, restart Zope. Once Zope has restarted, access Zope by opening a browser and going to *<a href="http://localhost:8080/manage">http://localhost:8080/manage</a>*. You'll need a username and password for this (for example, the username and password you gave during the Zope installation).

In the ZMI, there's a drop-down list of products you can add located in the top-right corner. Ensure that Plone Site is one of the options. If so, your installation is complete (see Figure 2-12).

 .. image:: img/3294f0212.png
    :width: 700

Figure 2-12. Plone Site in the drop-down list

Installing from CVS
...................

Concurrent Versioning System (CVS) access is recommended only for experienced users and developers. You can find current CVS access information at *<a href="http://ww.plone.org/development/cvs">http://ww.plone.org/development/cvs</a>*. The current CVS checkout command is as follows:

::

 cvs -d:pserver:anonymous@cvs.sf.net:/cvsroot/plone login
 cvs -d:pserver:anonymous@cvs.sf.net:/cvsroot/plone co CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=CMFPlone" title="create this page">?</a>

Plone 2 has a whole host of other dependencies (such as DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=DCWorkflow" title="create this page">?</a>, Formulator, Group User Folder, and so on) that aren't in Plone CVS, meaning users will have to go and find all these dependencies. When you start Plone, it'll print any errors regarding packages not found. For example:

::

 2003-11-21T12:23:11 ERROR(200) Plone Dependency
 CMFActionIcons<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter2/createform?page=CMFActionIcons" title="create this page">?</a> not found.  Please download it from <a href="http://cvs.zope.org/Products/">http://cvs.zope.org/Products/</a>

Adding a Plone Site
...................

Once you've installed Plone from source, you need to create an instance of Plone. To do this, you'll need to log into the ZMI and add a Plone site. You can access this by going to the Uniform Resource Locator (URL) for the management interface, which is normally *<a href="http://localhost:8080/manage">http://localhost:8080/manage</a>* (this port will change depending upon your installation). You'll need a manager's username and password for access to the ZMI; this password is created during the Zope installation.

 **NOTE**	If you've forgotten the password for Plone that was created in the installation, don't panic. You can create a new one; see Chapter 9 for more information.

You add all objects via the drop-down list in the top-right corner, as shown in Figure 2-12. Scroll down the list until you find Plone Site, and click Add.

After selecting the option Plone Site, a form will display that prompts for some more information (see Figure 2-13):

  - **Id**: This is the unique ID of the Plone site (for example, enter **Plone** or **Site**).

  - **Title**: This is the title of the Plone site (for example, enter **My Portal**).

  - **Membership source**: For the moment, leave this as the default option, Create a New User Folder in the Portal. This allows you to have user authentication somewhere other than the portal (see Chapter 9 for more information).

  - **Description**: This is a description of the portal that members will see in e-mails, (for example, enter **A site all about the exciting new widget technology**). Don't worry too much about this; you can always change this later in the portal's properties.

 .. image:: img/3294f013.png

Figure 2-13. Adding a Plone site

After clicking Add Plone Site, a Plone site will be created. This may take a minute or two on slower machines because a great deal of processing occurs. The screen will then redirect you to the Plone welcome page.

Configuring the Web Server
~~~~~~~~~~~~~~~~~~~~~~~~~~

Once Plone has been installed, you may want to configure the Plone site so that it runs on a different port, has FTP capabilities, logs to a different file, and so on. This section covers these basic setup issues. Note that you aren't configuring the Plone sites themselves; you're altering the configuration of the underlying Web server.

 **NOTE** If you've installed on Windows using the Windows installer, then most of this configuration is provided through a nice user interface program; see 'Configuring the Server on Windowsâ€ earlier in this chapter.

 **NOTE** If you've installed using Mac OS X or the Windows installer, then you'll find one extra file (*plone.conf*), which contains port definitions used in the main Zope configuration file.

Zope 2.7 creates a configuration file inside each instance installed. All the configuration for the server is located in that one file. A full list of the configuration options is available in Appendix A. To find the configuration file, look for a file called *zope.conf* located in the *etc* folder of your Plone installation. Some installers (Windows and Mac OS X, for example) create a second configuration file called *plone.conf* that contains Plone-specific configuration options. If your installation contains a *plone.conf* file, then use that configuration file to make changes; they'll be included in the main configuration file.

The configuration file is extremely verbose and contains a great deal of useful comments and examples. If you're familiar with Unix configuration files such as Apache, then you'll find the Zope configuration file familiar. To alter Zope configuration, open the configuration in a text editor, and change the lines as needed; after altering the configuration, you'll need to restart Zope.

It's possible to run Plone 2.0 with a version of Zope prior to 2.7; however, Zope 2.7 offers increased stability and new features, including easier configuration. If you're using a version of Zope prior to 2.7, you'll need to read the documentation on how to change the configuration.

Changing the Ports
..................

To change a port, add the address lines for that port. For example, to run Plone on port 80 instead of the default, change the following bold line in *zope.conf*:

::

 <http-server>
   # valid keys are "address" and "force-connection-close"
   address 8080
   # force-connection-close on
 </http-server>

to the following:

::

 <http-server>
   # valid keys are "address" and "force-connection-close"
   address 80
   # force-connection-close on
 </http-server>

If you used the Windows or Mac OS X installer, then you'll find these port definitions in *plone.conf*. These values are then imported into the main configuration file. So, on a Mac to change the port, you'll edit *plone.conf* from this:

::

 ## PLONE_WEBSERVER_PORT
 ## --------------------
 ## This is the port you will access your Plone site from.  Set this to a port
 ## number above 1024 not used for any other server on your computer.
 %define PLONE_WEBSERVER_PORT 8080

to the following:

::

 %define PLONE_WEBSERVER_PORT 80

Using the Debug Mode
....................

By default in Zope 2.7 debug mode is enabled. Note that Plone runs significantly slower in debug mode, approximately 10-20 times slower. To turn this off, add the following line to the configuration file:

::

 debug-mode off

To make the out-of-the-box experience more impressive for Windows users (debug mode slows Plone down on Windows even more than on Linux), it ships with debug mode off already. If you have a Plone site running and want to know if debug mode is running, go to *portal_migration* in the ZMI and look at the variables listed there; this will tell you if debug mode is enabled.

Using Logs
..........

By default there are two logs in Plone: an access log that you can produce site statistics from and an event log that contains debug information about Plone products. The event log is the place to find errors and messages in Plone. The default configuration looks like the following:

::

 <eventlog>
   level all
   <logfile>
     path $INSTANCE/log/event.log
     level INFO
   </logfile>
 </eventlog>
  
 <logger access>
   level WARN
   <logfile>
     path $INSTANCE/log/Z2.log
     format %(message)s
   </logfile>
 </logger>

This is where you can change the path to the file by defining a new file. The values that are logged are based upon a level sent with error messages; more serious messages are sent with higher levels. By default, only information and the previous message are sent to the log, but that value could be one of the following: *CRITICAL*, *ERROR*, *WARN*, *INFO*, *DEBUG*, and *ALL*. If you wanted to log only errors, then you'd change *level INFO* to *level ERROR*.



*翻譯 Arthur Chan (ccube)*