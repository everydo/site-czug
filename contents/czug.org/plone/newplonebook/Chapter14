Chapter 14
----------

.. contents:: 内容

:翻译: 潘俊勇

Administering and Scaling Plone

管理和扩展Plone
===============================

This chapter covers the tasks you have to worry about once you've built your site and are using it. I start by covering the administration of a Plone site, which is actually quite straightforward. Next, I cover what files to back up, including when and how to back them up. I also cover upgrades to Plone.

本章包括您建站和使用后，必须关注的一些工作。我将从管理Plone站点开始，这个实际上很简单。接下来，我会讲解如何备份，包括何时备份。我也会讲解如何升级Plone。(潘俊勇)

Then, I cover performance and show techniques for finding the hotspots. Once you've found those spots, I cover common problems. Then I go into the main technique for making your Plone site really fast and scalable: caching. When it comes to performance, you'll definitely need to know how to scale your server outward using multiple processes and how to cope with high-cost requests. For this you'll need Zope Enterprise Objects (ZEO), which is covered at the end of this chapter.

接下来，我会讲解性能和以及如何发现问题区域的相关技术。你找到了这些问题点后，我会讲解常见的问题。接下来，我会关注如何让你的Plone站点更快、更可扩展的主要技术：缓存。一旦涉及性能，你就必须知道如何使用多处理器来提升你的服务器性能，以及如何处理大量的请求。因此，你需要知道Zope企业对象(ZEO)，这将在本章结尾讲述。

Administering a Plone Site

管理一个Plone站点
~~~~~~~~~~~~~~~~~~~~~~~~~~

As it turns out, the administration of a Plone site is quite simple; you need to perform only a few tasks, which are common to all services. The tasks are as follows:

管理Plone站点十分简单；你需要执行所有服务一般都需要的很少工作。主要任务是：

  - You should back up the database regularly.

  - 你应该定期备份数据库。

  - You should pack the database regularly.

  - 你应该定期紧缩数据库。

  - You should back up and rotate the log files.

  - 你应该备份和循环日志文件。

You should perform these actions regularly to maintain your site. In enterprises, you'll usually often have standard tools for backing up and rotating logs; these tools are all easy to integrate since Plone data is all contained as files on the file system.

你应该定期执行这些操作，维护您的站点。在企业中，你将通常有标准的备份和日志循环工具。这些工具很容易和Plone集成，因为Plone的数据全部是文件系统中的文件。

Backing Up Your Plone Site

备份您的Plone站点
..........................

You should run backups regularly on a Plone site; most people run backups nightly. Your application needs should determine the schedule for backups. If large amounts of data are written into your data, then perhaps more frequent backups are necessary. In the case of a smaller site with less content, a less frequent schedule such as once a week may be more suitable.

你应该定期在Plone站点上执行备份；大多数人在晚上执行备份。您的应用需要决定备份的时间表。如果您的数据中被写入了大量的数据，那么就更需要频率备份。对于内容很少的小站点，一周一次的低频备份可能更适合。

In a standard Plone site, only one file needs backing up: the Zope database where all the content for the Plone site resides. You can find this file by accessing the Zope Management Interface (ZMI) control panel, selecting Database Management, 

一个标准的Plone站点中，只有一个文件需要备份：包含所有Plone站点内容的zope数据库。你可以在Zope管理界面（ZMI）中的控制面板中，选择数据库管理，找到这个文件。

*Data.fs*
*var*

You can use your own scripts or tools for backing up or use a tool from Zope. As an example of the first option, Listing 14-1 shows a Linux bash script I use to back up a Zope site.

你可以使用自己的脚本或者工具来备份，或者使用Zope提供的一个工具。对于前者的示例，清单14-1中显示了我使用Linux的bash脚本来备份一个zope站点的例子。

Listing 14-1. Bash Script for Backing Up

清单14-1. Bash脚本备份

::

 #!/bin/bash
 # 拷贝、压缩、拷贝Zope数据库到远端服务器
 # 生成一个文件名
 fn=`uuidgen`.fs
 # 拷贝文件，你应该改变路径
 cp /var/zope.test/var/Data.fs /tmp/$fn
 # 压缩文件
 gzip /tmp/$fn
 # 拷贝到备份服务器，删除临时文件
 scp /tmp/$fn.gz backup-oeGcuSOwqUP9/Zxw7BGzn/d9D2ou9A/h@public.gmane.org:~/Zope
 rm /tmp/$fn.gz

For the second of these choices, a Python script called *repozo.py* is available in the Zope Object Database (ZODB) for backing up. You can find this script online at *<a href="http://cvs.zope.org/ZODB3/Tools/repozo.py">http://cvs.zope.org/ZODB3/Tools/repozo.py</a>*. It works quite happily on Windows and Linux. This script can do a whole host of things such as full backups, incremental backups, and database restores.

另外的一个选择，是Zope对象数据库(ZODB)提供的一个叫做 *repozo.py* 的python备份脚本。你可以在这里找到他： *<a href="http://cvs.zope.org/ZODB3/Tools/repozo.py">http://cvs.zope.org/ZODB3/Tools/repozo.py</a>*. 在Windows和Linux上都可以很好的运行。这个脚本可以完成完全备份、增量备份和数据库恢复等很多工作。

To back up a database with this script, you first need to make a directory to store the backups; in the following examples, this directory is */home/backups*. However, this location is up to you. To do a complete backup of a database, run the following:

要使用这个脚本备份一个数据库，你首先需要创建一个保存备份的目录；在下面的例子中，这么目录是 */home/backup*. 当然具体的位置由你选择。要做一个完全备份，可如下执行：

::

 $ python repozo.py -B -F -v -r /home/backups -f /var/zope.test/var/Data.fs
 looking for files b/w last full backup and 2003-11-21-18-33-17...
 no files found
 doing a full backup
 writing full backup: 3601549 bytes to /home/backups/2003-11-21-18-33-17.fs

To run an incremental backup, just omit the *-F* (full) flag. The script will compare the current ZODB with the last backup and only back up the differences. If no updates have occurred, then no backup will occur. The following is an example backup after making a change in Plone:

要进行增量备份，只需要忽略 *-F* (full)标记。这个脚本将比较当前的ZODB和上次的备份，然后仅仅备份差异的数据。如果没有修改，就不做任何备份。下面是在Plone修改后做一个备份示例：

::

 $ python repozo.py -B -v -r /home/backups -f /var/zope.test/var/Data.fs
 looking for files b/w last full backup and 2003-11-21-18-39-09...
 files needed to recover state as of 2003-11-21-18-39-09:
         /home/backups/2003-11-21-18-33-17.fs
 repository state: 3601549 bytes, md5: ab9e46bcdf52641ad6f71db62a9da333
 current state   : 3624968 bytes, md5: 73c871bbe2528e152342abea9e25ab27
 backed up state : 3601549 bytes, md5: ab9e46bcdf52641ad6f71db62a9da333
 doing incremental, starting at: 3601549
 writing incremental: 23419 bytes to /home/backups/2003-11-21-18-39-11.deltafs

At this point, you now have one full backup and one incremental. The same script now can do a recovery of this data. To do this, pass the *-R* (recovery) option and *-o* specifying the output file, like so:

到此为止，你有了一个完全备份和一个增量备份。同样使用这个脚本，可实现对数据的恢复。具体来说，增加 *-R* (recovery)选项，并使用 *-o* 来指定输出文件，如下：

::

 $ python repozo.py -R -v -r /home/backups -o /var/zope.test/var/Data.fs
 looking for files b/w last full backup and 2003-11-21-18-50-21...
 files needed to recover state as of 2003-11-21-18-50-21:
  /home/backups/2003-11-21-18-33-17.fs
  /home/backups/2003-11-21-18-39-11.deltafs
 Recovering file to /var/zope.test/var/Data.fs
 Recovered 3624968 bytes, md5: 73c871bbe2528e152342abea9e25ab27

For a full list of options, run *repozo.py* with the *-h* command. This prints a full set of instructions.

要知道完整的选项清单，执行 *repozo.py -h* 即可。这将打印完整的指令清单。

Logs exist in the *log* directory of your instance home by default, and there are two log files: an access log file and an event log file. You set the location of these logs in the configuration file that you looked at in Chapter 2. *z2.log* logs all incoming requests, and *event.log* logs all errors. These log files should be backed up regularly, along with any proxy server log files such as those that Apache or Internet Information Services (IIS) produces.

日志文件位于 *log* 文件夹。有两个日志文件：访问日志和事件日志。你可按第二章中看到的方法，在配置文件中设置日志文件的位置。 *Z2.log* 记录了全部的请求， *event.log* 记录全部的错。这两个日志文件应该和其他的带来服务器日志文件一起定期备份，如Apache或者IIS所产生的日志文件。

You should regularly back up code, templates, and custom products that reside outside the ZODB. Even if you have these in source control, such as Concurrent Versioning System (CVS), backing them up to make a valid snapshot of your installation never hurts.

你一个定期备份ZODB外的代码、模板和定制的产品。既便你在代码控制库中(如CVS)有保存的备份，备份他们能够确保你拥有所安装的示例的一个有效的快照。

If you have content, other databases, or other data that doesn't reside in the ZODB, this should form part of the backup plan, depending upon how often it changes. This could include data in relational databases and content on the file system. All of these are created by the site developer and don't exist in a standard 'out-of-the-box鈥� Plone site. If you're upgrading Zope or Plone, it may be prudent to make a backup of all the files involved, including Zope and Plone, so that if the upgrade fails for some reason, a full restoration is possible.

Packing the ZODB

挤压ZODB
................

The ZODB records every change to every object in the system. Each time an object changes, a new copy is appended to the end of the ZODB file. That file is the *Data.fs* file I discussed in the previous section. If the database has large pieces of content or has a large number of changes, then this can cause the ZODB to really grow.

A large ZODB isn't a problem鈥攊t works just fine, and startup times are similar (unless the index has been removed). Pack times will get longer the larger the database is, and it does make sense to occasionally go and remove those old copies of objects that are no longer used to make the database smaller. It's key to remember that all you're doing when you're packing is cleaning your existing database and throwing out some old copies.

The Old 2GB Limit on Databases

数据库从前的2GB限制
##############################

A problem exists with older versions of Python (before Python 2.1 on Unix and before Python 2.2 on Windows), which weren't capable of large file support. When the ZODB reaches 2 gigabytes (GB), the Plone site dies and can't be restarted. To test if you're running a Python version that has large file support, open a file in Python and see if its size is reported as an integer or a long, like so:

在Python的老版本中(Unix系统中Python2.1之前的版本和Windows上Python2.2之前的版本)，存在一个问题：不能支持大文件。当ZODB超过了2GB，Plone站点就会死掉，而且不能重新启动。要测试你所运行的Python版本是否支持大文件，可在Python中打开一个文件，并查看其大小是integer还是long类型，如下：

::

 >>> import os
 >>> from stat import ST_SIZE
 >>> type(os.stat('/tmp/test.txt')[ST_SIZE]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ST_SIZE" title="create this page">?</a>)
 <type 'long'>

This Python has large file support enabled and can support files larger than 2GB. If an integer is reported, then you'll need to upgrade your Python version or recompile with large file support enabled (again, enabled in new version by default). If you try to compile Plone with a version of Zope that doesn't have large file support, you'll get an error, like so:

这个Python支持大文件，能够支持超过2GB的文件。如果报告是integer，那么你需要升级你的Python版本，编译为支持大文件(在新版本中缺省开启了)。如果你尝试使用一个不支持大文件的Zope编译Plone，你会得到一个错误：

::

 andy@thorin:/tmp/Zope-2.7.0-b3$ ./configure
 Configuring Zope installation
 ...
  
 This Python interpreter does not have have 'large file support' enabled.

If this is the case, then you'll need to go and fix your Python installation. You can find more details about this at *<a href="http://www.python.org/doc/current/lib/posix-large-files.html">http://www.python.org/doc/current/lib/posix-large-files.html</a>*. If you're happy with just limiting to 2GB, then you can pass the *--ignore-largefile* option to the configure script. If you're limited to a 2GB database, then you'll need to pack more regularly.

Cleaning up the database is called packing

清理数据库被叫做挤压(packing)
##########################################

Packing can be intensive, and when its process is run, it's in a separate thread, so although it will affect a site's speed, it will still be able to respond to requests. To pack sites and keep Plone running at peak performance, see the 'Using ZEO鈥� section later in this chapter. To run a pack, access the ZMI control panel, select Database Management, and click main

挤压（pack）很耗资源，当这个过程进行的时候，他使用另外一个线程。因此结果他会影响网站的速度，他仍然会对请求进行响应。要挤压一个站点，并保持Plone能够处理大量请求，请查看本章后面的 '使用ZOE' 一节。要执行挤压，访问ZMI的控制面板，选择数据库管理，点击 main

 .. image:: img/3294f1401.png

Figure 14-1. Packing a database

Enter the number of days you'd like to keep objects for, and click Pack. For example, setting the number of days at zero (the default) will remove all revisions of objects. Again, it doesn't delete the object itself, just those old copies. A more common setting is something such as seven, which will remove revisions older than one week. By making a setting appropriate with your backup schedule, you can ensure that you'll keep a copy of every object. The pack will take a bit of time and processing power depending upon the size of your ZODB. Plone will still work, albeit slower, so you may want to use ZEO to do this.

Upgrading Plone

升级Plone
...............

Plone is continually being updated and improved, so new versions of Plone come out quite regularly. Before you upgrade to a new version of Plone, though, check that you actually need it. Quite often releases have minor changes or changes that may not be relevant. Each release has a change list, accessible from the download page. It's always worth reviewing this list to see if the upgrade is worthwhile.

After performing your backup, download the upgrade. Probably the easiest way to perform an upgrade is to repeat the same steps you performed on the installation. For example, if you installed using the Windows installer, download the new installer and run the install again. If you installed from source or a Debian package, repeat those steps. The upgrade steps are as follows:
    
 1.  Download the relevant upgrade.
 2.  Stop Plone.
 3.  Back up (as described previously).
 4.  Install the upgrade.
 5.  Start Plone.

At this point I recommend actually starting Plone in debug mode. On Windows, you can do this by selecting *Start* - *Plone* - *Plone Debug*. On Linux you can do this using the *runzope* script inside the *bin* directory of your instance home, like so:

::

 bin/runzope -X "debug-mode=on"

By running this in debug mode, you'll directly see any errors that may have occurred during the upgrade to the new version. If you're happy with this, you can now proceed onto the next step, migration.

For each Plone site you have, access the ZMI and access the *portal_migration* tool in your Plone site. It will have a bright-red exclamation mark next to it, indicating that the site isn't

The migration will attempt to make those changes for you. Until you run this migration it's possible that your Plone site may be broken. Depending upon what needs to be done in the migration, this may take some time. To perform a migration, follow these steps:

 1. From portal_migration, click the Migrate tab.
 2. Click the upgrade button. This may take some time, especially on large sites or if a large upgrade is necessary.
 3. The result of the migration, a rather lengthy message, will display on the screen. If the final message is 鈥淓nd of upgrade path, migration has finished,鈥� then the migration was successful. Any error messages will be highlighted in red.
    
Repeat this process for each Plone site within your Zope instance. If you're then happy with the migrated site, stop running Plone in debug mode. Restart Plone in your usual manner, and carry on using as normal.

Improving Plone Performance

提升Plone的性能
~~~~~~~~~~~~~~~~~~~~~~~~~~~

So you've written a wonderful Web site, millions of visitors come to the site, and it just isn't quite performing as fast as you'd like. Well, Plone is designed out of the box to be feature rich, not fast, since speed is greatly dependent on the application in question. But many techniques can make Plone really fast, and you can easily scale Plone. In the following sections, I cover how to figure out the slow parts of your site and then show you methods to improve it.

Benchmarking a Plone Site

评测Plone站点
.........................

Before you try optimizing a site, the key task is to get a numeric value of the performance of the site. Users will often give feedback such as 'it's too slow鈥� or 'takes too long to load.鈥� These comments are next to useless for a developer; you need to be able to quantify the speed so you can know how fast it is now and how fast you need to make it. Only then can you begin to do the optimization.

For getting a benchmark, you can use a tool called *ab*, or Apache Bench. This is a tool that comes with the Apache server. If you have Apache 1.3 or later installed on Linux, *ab* is included. On Windows it's included with the Apache 2 release. Running *ab* is straightforward鈥攋ust pass the uniform resource locator (URL) you want to test, like so:

::

 ab <a href="http://localhost/">http://localhost/</a>

The *ab* tool will output some information first about the site you tested, like so:

::

 Benchmarking localhost (be patient).....done
 Server Software:        Zope/(unreleased
 Server Hostname:        localhost
 Server Port:            80
  
 Document Path:          /
 Document Length:        20594 bytes

Then it'll output some aggregate statistics, like so:

::

 Concurrency Level:      1
 Time taken for tests:   0.771151 seconds
 Complete requests:      1
 Failed requests:        0
 Write errors:           0
 Total transferred:      20933 bytes
 HTML transferred:       20594 bytes
 Requests per second:    1.30 [#/sec]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%23/sec" title="create this page">?</a> (mean)
 Time per request:       771.151 [ms]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ms" title="create this page">?</a> (mean)
 Time per request:       771.151 [ms]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ms" title="create this page">?</a> (mean, across all concurrent requests)
 Transfer rate:          25.94 [Kbytes/sec]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=Kbytes/sec" title="create this page">?</a> received

This tells you how long the request took, the number of errors, and the time it took to get a request, which is probably the key statistic. The most useful value to reference is usually the *Requests per second*, Requests per second, which in this example is *1.30 [#/sec]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%23/sec" title="create this page">?</a>*. The ab tool provides some more statistics that give information on how long it took to connect, process, and get a result for each request. For example:

::

 Connection Times (ms)
               min  mean[+/-sd]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%2B/-sd" title="create this page">?</a> median   max
 Connect:        0    0   0.0      0       0
 Processing:   770  770   0.0    770     770
 Waiting:      766  766   0.0    766     766
 Total:        770  770   0.0    770     770

This last piece of information is useful and includes the time taken to get a connection. Since my server is on the same computer as the client, this is quite short. This test demonstrates that it took 1.30 seconds to complete a request. Of course, that hasn't really tested the server much at all. When testing, you'll probably want to hit the server with a few concurrent requests to simulate the real world a little more. You can do this by specifying the number of requests and the concurrency by using the *-c* (concurrent threads) and *-n* (number of requests) options. For example:

::

 ab -n 20 -c 4 <a href="http://localhost/">http://localhost/</a>

This sends a total of 20 requests over four concurrent threads. The end result is a slightly different request per second of 1.78 seconds. For more information on all the options available, please see the Apache Bench manual at *<a href="http://httpd.apache.org/docs/programs/ab.html">http://httpd.apache.org/docs/programs/ab.html</a>*.

One advantage of using *ab* is that you aren't actually assembling the pages on the client; they're just being downloaded and then thrown away. If you have a page that has lots of scripts or features big images, the time it takes for a client to assemble that page into something the user can understand won't be included. A classic example of this is that in the old Netscape browser, a large number of tables can slow down or even crash Netscape. This wouldn't be evident using *ab*, which gives you a more independent number with which to work.

Lies, Damned Lies, and Benchmark Numbers

谎言，讨厌的谎言，以及评测数据
........................................

At this point, you may be concerned about these numbers. They seem to indicate a very slow site. In these examples, my machine is a Toshiba laptop with 1.8 gigahertz (GHz<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=GHz" title="create this page">?</a>) Celeron processor, 256 megabytes (MB) of Random Access Memory (RAM), Red Hat Linux 9.0, and a beta version of Plone 2. Furthermore, Plone is running in debug mode at the same time as KDE, OpenOffice<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=OpenOffice" title="create this page">?</a>.org, Instant Messenger, and several other development tools, including the actual benchmarking tool. This means Plone is nowhere near optimized or running in an ideal environment. A similar test on a faster server yielded results around 20 requests per second.

The key point is that creating an objective number for site performance allows you to measure the success of your optimizations. Developers can perform tweaks and then test again to compare the 'before鈥� and 'after鈥� numbers. If it's possible, you should run performance tests against a machine as similar to the production server as possible to get sensible numbers. For this chapter it isn't important that a site can produce X requests per second; instead, it's important that a change be able to produce a significant increase in performance.

Also, remember that numbers about how fast a certain part of your site is are pretty meaningless in isolation. You must take into account how often the page is visited, users' expectations at that point, and realistic requirements. Micromeasuring just one part of a site can be useful to track down a certain issue, but it may not make your site much faster. As with most things, you need a sensible approach to optimizations.

Production Mode vs. Debug Mode

产品模式和调试模式
..............................

One of the biggest speed killers for Plone is to run your site in debug mode. When running in debug mode, each and every template, script, and object in the *portal_skins* tool is compared against the file system to see if it's up-to-date. This check happens with 

To find out if your site is running in debug mode, in the ZMI access the *portal_migration* object in your Plone site. At the bottom of the page will be a list of information, including Debug Mode status. To change this, alter the configuration file, as discussed in Chapter 2.

Other Reasons for Slow Performance

低性能的其他原因
..................................

A server may be running slowly for reasons outside of Plone. If you're running optimization, you should always take a look at these considerations first, since these will provide quick speed improvements for little cost.

Processor Usage

处理器使用率
###############

If you're running a great number of applications, or just some intensive ones, then this will limit the amount of processor time available to Plone. Assembling pages in Plone can take a lot of Central Processing Unit (CPU) power. When an application is bound by the amount of processing power it has available, it's called CPU bound.

To find out how much load the server is under in Linux, use the *top* command. In Windows, the Task Manager (accessible by pressing Ctrl+Alt+Del) will give you similar statistics. The recommended speed of your CPU depends upon the size and traffic load your Plone server will be under, but a 2GHz processor is a good starting point.

Amount of memory

内存数量
################

Zope likes to use a great deal of memory as objects are loaded from the ZODB. Of all the key features, giving a Zope server more memory is probably the best thing you can do. 

To find out how much load the server is under in Linux, use the *top* command. In Windows, the Task Manager (accessible by pressing Ctrl+Alt+Del) will give you similar statistics. The recommended amount of memory depends upon the size and traffic load your Plone server will be under, but a 512MB processor is a good starting point. If you can afford more memory, it's recommended.

You can make a few tweaks to the memory parameters in Plone by increasing the target number of objects in the cache. By default, Plone ships with 400 objects in the cache. For a site, you could increase this to 5,000, as shown in Figure 14-2. Although this increases memory usage, this will also

 .. image:: img/3294f1402.png

Figure 14-2. Changing the cache parameters in the control panel

Further, the fewer threads Zope uses, the less potential memory usage will occur. Although Zope is multithreaded, most of the time only one Zope thread will actually be used. Reducing the number of threads to three provides a more memory-efficient server. Instead of trying to run a large number of threads, it's recommended to run ZEO clients to serve more requests. The 'Zope Enterprise Objects鈥� section covers this in more detail.

Network Connection

网络连接
##################

The network connection can be critical to the performance of any application鈥攜ou're only as fast as the slowest connection between you and the client. When you're optimizing a Plone site, take into account the amount of time needed to connect. If it takes two seconds to actually connect, optimizing code is rather pointless.

Here again, the *ab* tool can help. When running a benchmark of Plone.org from British Columbia (the server is located in Texas), you can see in the following output that the median wait for connections over the network was 125 milliseconds:

::

             Connection Times (ms)
             min  mean[+/-sd]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%2B/-sd" title="create this page">?</a> median   max
 Connect:       90  133  40.2    125     211
 Processing:   511 1103 400.2   1113    1846
 Waiting:      202  310 110.3    293     565
 Total:        601 1236 411.2   1211    2043

The server may also have a limit on the number of connections or on traveling through internal firewalls. When a process is bound by the time it takes to do an Input/Output (I/O) process such as this, it's called I/O bound.

Your Application

您的应用
################

It could, of course, be that your application is actually causing the slowdown. The examples from service companies about clients with problems are numerous (and probably exaggerated). Some of better-known examples include the following:

  - Copied code from a Web site that had a *sleep* call buried deep in the system, which caused the script to pause for a few seconds. A code review by someone spotted this and removed the offending line.

  - Multiple relational database lookups, such as more than a dozen on one page. A more intelligent design combined the lookups and allowed for caching.

  - A script that pulled information from the ZODB by waking up every object inside the database. Using the catalog (covered in Chapter 10) made performance much faster.

  - A query that gets all the records in a database, but then shows only 100 on a page at a time, discarding the other 99,900. This was solved by writing the SQL statements in more efficient manner.

Before jumping to conclusions about what's causing the problem, it's worth profiling the site to determine where the bottleneck is.

Profiling Plone

剖析(Profile)Plone
.....................

Since you can quantify the time taken to produce pages, you can now attempt to optimize. However, the first problem is finding where to optimize.

Please note that if you enable all three of these profiling tools, you'll find that your Plone site really starts to slow down (by a significant magnitude). Each of these profilers exacts a toll on performance for the number of hooks it has to install. You should always uninstall or turn off these profilers after using them to ensure that your site is running at maximum efficiency. Also, if you enable all three of these profilers, you'll start to profile the profilers (and that's when things start to get confusing). I recommend you start with Call Profiler. Then turn on each of the other profilers in turn, turning off the preview profiler, until you have enough information.

Call Profiler

调用剖析器
#############

This Zope product takes a request, such as getting a front page, and reports the objects that were used and how long was taken by each. You can find Call Profiler at *<a href="http://zope.org/Members/richard/CallProfiler">http://zope.org/Members/richard/CallProfiler</a>*. Despite comments on the download page, the product isn't integrated into Zope 2.6. Install the product in the standard way, and then restart your Zope.

To enable Call Profiler, go to the ZMI control panel and select Call Profiler. The product works by installing hooks into an object so that when the object is accessed, the amount of time spent on rendering the object can be measured. This means Call Profiler will be activated only on objects you choose to monitor, as shown in Figure 14-3. For a standard Plone installation, you'll need to monitor Filesystem Script (Python) and Filesystem Page Template. Call Profiler doesn't remember these settings between Zope restarts, which means a simple restart will turn off the hooks and leave you ready to deploy.

 .. image:: img/3294f1403.png

Figure 14-3. Call Profiler with the file system hooks selected

Once the objects to monitor have been selected, access the URL you want to monitor. The easiest way to access the URL to be tested is to run the *ab* tool mentioned earlier; however, using a Web browser will work just fine. In this case, if you're profiling the home page on localhost, then run the following:

::

 ab -n 20 -c 4 <a href="http://localhost/">http://localhost/</a>

This will cause 20 requests to be made to Plone. Once complete, you can access the timing of those requests. Returning to the Call Profiler interface, you'll three tabs across the top of the Call Profiler tool: Results, Results by URL, and Aggregates. Since multiple requests have been run, select the Aggregates tab, which is the easiest to understand. In the list of pages called will be the URL tested. Click that link to view the results for that URL. You should now see something like Figure 14-4.

 .. image:: img/3294f1404.png

Figure 14-4. The results of the profile

In this example, you'll see the elements that Call Profiler is able to detect. Unfortunately, the results can be a little complicated to decipher. At first glance, the results add up to more than 100 percent. In this case, *document_view* takes 71.1 percent of the processing time. However, this is misleading because values below that figure relate to *document_view*, not the whole page. In this example, for the whole page, everything before *browserDefault* takes 19.9 percent of the request. Then it moves into *document_view*, and you see the percentages for that part. So in this case, going from *toLocalizedTime* to *getPreviousMonth* takes 23.3 percent of the time taken to render *document_view*.

Page Template Profiler

页面模板剖析器
######################

Page Template Profiler works only with the Zope Page Templates system. In a similar way to Call Profiler, it reports how long was spent enacting each call inside a page template. Since in the previous example you saw that most of the time is spent in one page template (*document_view*), you may find it instructive to see how the time is spent in that template.

You can find Page Template Profiler at *<a href="http://zope.org/Members/guido_w/PTProfiler">http://zope.org/Members/guido_w/PTProfiler</a>*. Install the product, and then restart Zope. To deinstall Page Template Profiler, you'll have to remove it from your *Products* directory when you've finished profiling.

Once installed, go to the Zope root in the ZMI and select PT Profile Viewer from the Add drop-down box. Complete the creation form, giving a unique value for ID (enter *PTProfiler<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=PTProfiler" title="create this page">?</a>*, for example), and then click *Add*. Now repeat calling the page you want to measure by running the *ab* tool or accessing the page in a browser. Access the Page Template Profiler object just added, and you鈥檒l see a result for the request just run. Click it to get more details, as shown in Figure 14-5.

 .. image:: img/3294f1405.png

Figure 14-5. Page Template Profiler results

In this case, you can see that on my site that *calendarBox* is taking 0.7321 seconds to call each time it's being called. Since the entire page is taking 1.9 seconds, you can assume this is an area I could optimize.

Python Profiler

Python剖析器
###############

The Python Profiler provides very low-level timing information and is normally used for more complex debugging of underlying code. It gives you a detailed report of the amount of time spent in various areas of Python code. This isn't something you'd normally use while profiling a site; however, for completeness, I'll describe it in this section.

To activate the Python Profiler, you need to add a variable to the configuration file. In the *zope.conf* file of your *etc* directory, enable the *publisher-profile-file* command. To do this, define a file to which it'll write. On Windows this could be *c:\zope.output*; on Linux it's */tmp/zope.output*. Add the following line on Linux:

::

 publisher-profile-file /tmp/zope.output

Then restart Plone, but it will run very slowly. If you're running a large number of requests and want to examine the results, then the file specified in the environment variable will contain output of the data. As in previous examples, call the page that's being profiled using the *ab* tool or a Web browser. Then access the control panel through the ZMI, select Debug Info, and then select the Profiling tab; you'll get output from the Python Profiler, as shown in Figure 14-6.

 .. image:: img/3294f1406.png

Figure 14-6. Python Profiler results

As you can see in Figure 14-6 that the output shows the gory details of what takes time. I've rarely had to use this.

Simple Optimization Tricks

简单的优化窍门
..........................

After looking at quite a lot of Plone, the Plone development team has come up with the following optimization tricks.

Limit Name Lookup

限制名字查找
#################

Overdoing name lookups is a common mistake; the solution is to define a variable locally. In the following example, Plone has to perform lookup for *portal_url* on each repetition of the loop:

::

 <tal:block
  tal:repeat="result here/portal_catalog">
    <a href=""
       tal:attributes="href here/portal_url/getPortalUrl">Home</a>
    ...
 </tal:block>

 But it'd be faster to use a *tal:define*, like so:

::

 <tal:block
  tal:repeat="result here/portal_catalog"
  tal:define="url here/portal_url/getPortalUrl>
     <a href=""
        tal:attributes="href url">Home</a>
        ...
 </tal:block>

As already stated, Plone defines a large number of global defines. By using those definitions, a developer can reduce the number of traversals. You can find a full list of all these defines in Appendix A.

Security Checks and Traversal

安全检查和遍历
#############################

Whenever an object, an object's attributes, or an object's methods are accessed, a security check is performed. Although each security check isn't that expensive, a large number of security checks can really add up.

This is especially true when you traverse to an object, for example, to *here/folderA/folderB/object*. In this case, Zope will be doing security checks on each of those folders and then on the object. If the information can be accessed without doing that traversal each time, you'll find a performance gain. Another way to avoid doing security checks is to write code in *Products* on the file system. Code in *Products* is considered trusted code, is subject to fewer checks, and is hence faster.

The ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZCatalog" title="create this page">?</a>

使用ZCatalog
############

The ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZCatalog" title="create this page">?</a> is an efficient binary tree of data about objects. You should use it (in most situations) when getting a list of objects, such as search results, providing summaries, finding objects, and so on. When the catalog returns a set of results that accesses a series of lightweight objects (called brains), accessing these brains doesn鈥檛 mean doing traversal to the object or performing any security checks.

Too Many Features

太多特性
#################

This may seem obvious, but Plone ships with lots of features you may not necessarily need. For example, both the calendar and navigation portlet take up a large number of resources yet are generally of limited use. Turning these features off if not needed will increase performance.

Is Optimization Worth It?

值得优化吗？
#########################

Before you start any optimization, you should perform a simple cost-benefit analysis to see if the optimization is worth performing.

For example, say you have a page that takes 0.5 seconds to generate. Of that page, on script takes 10 percent of the time to generate. If you're able to double the speed of that one script, that will shave only 0.025 seconds off the execution of that page. In this case, the benefit to performing the optimization is small because there are some basic costs such as the cost of a developer to do the analysis, the cost of testing to check it works, and possibly changes to documentation.

Performing this work also creates substantial risk. Changing code can break or introduce bugs into the application. Given agile programming methodologies, though, these could be minimized. Further, a programmer may not be able to complete the speed increase or may make it slower.

You have alternatives to optimizing code; for example, you could install more memory or hardware if the application is bound by one of these constraints. Although many programmers think that throwing hardware at a solution is a lazy option, it can be an extremely cost-effective solution. Introducing new hardware is low risk, can bring a large speed gain, and often cost less than a programmer.

Further, you can really scale your server by caching or adding more computers and separating the load. These techniques form the rest of the chapter.

Caching of Content

缓存内容
..................

So now that you've found the slow parts of your application, you'll turn to the main tool to increase performance: caching. Caching

When talking about caching, I'm talking about two things that can be cached: content and skins. Content is the data entered by the user into content types. Skins refer to anything in *portal_skins* and can be templates, scripts, images, or files. These two types are cached differently.

I like to think of caching in terms of the amount of control I'll have over the caching mechanism. In other words, the closer to the client that caching is performed, the faster the response will be but also the less control I will have over that cache. This in fact includes the possibility that there may be no cache at all. Figure 14-7 illustrates caching between a client and a server.

 .. image:: img/3294f1407scrap.png

Figure 14-7. Caches between a client and a server

The user's browser cache is the fastest place to cache things, but you have no idea if a user will actually have caching turned on in their browser. Next come the intermediate caches of proxy servers; keep in mind this could be your proxy server (which you should have control over) or an Internet service provider (ISP) proxy. Finally, there are the server caching options.

In the following sections, I'll discuss the following caching mechanisms:

  - Caching skin elements using the Accelerated HTTP Cache Manager

  - Caching of code using the RAM Cache Manager

  - Caching of content added by users via the Caching Policy Manager

I'll then discuss how to use Apache and Squid, two commonly used external servers that provide a whole host of high-performance configuration options.

Caching Skins

缓存皮肤
.............

Hypertext Transfer Protocol (HTTP) allows you to set HTTP headers for caching. When a response returns with these headers, it's the responsibility of the proxies between the client and the server to cache the object according to these headers. In Figure 14-7, this could be any of the caches from the server cache down. This proxy can be a Web server that you control on the server, such as Apache, or a proxy that the ISP controls. As I'll discuss, this makes a powerful tool when combined with Apache or Squid.

This caching can also include the browser if it's set to use caching (the default for Internet Explorer). However, if a browser does a refresh on a page, the browser sends the *Pragma: no-cache* header, which forces proxies to also reload their copy.

Caching in this manner applies to the entire response, so it can be risky if you try applying this to a whole page. This is most commonly used with images, style sheets, JavaScript<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=JavaScript" title="create this page">?</a>, or pages that don't change a great deal. Images used repeatedly in your pages for making nice elements, such as rounded corners or background images, are ideal for this.

By default, Plone creates an Accelerated HTTP Cache Manager called *HTTPCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=HTTPCache" title="create this page">?</a>* in the root of your Plone site. Accessing this object through the ZMI will bring up the management options for the cache. The following are all reasonable defaults, and nothing needs to be changed initially:

  - Title

  - Interval

  - Cache anonymous connections only

  - Notify URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=URLs" title="create this page">?</a> (via PURGE)

To see how the Accelerated HTTP Cache Manager works, the following is an example based on a test object, an image called *test.gif*. To see what headers are returned, you need to test the headers being returned. For this you can use a simple Python script called *header.py*. You can find this script in Appendix B. On Linux the *wget* command also does the same thing if you pass *-S*, although it will still download the file for you. For example:

::

 wget -S <a href="http://www.agmweb.ca">http://www.agmweb.ca</a>

First, the following are the headers returned for *test.gif* before 

::

 [andy@basil scripts]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=andy%40basil%20scripts" title="create this page">?</a>$ ./header.py <a href="http://localhost:8080/test.gif">http://localhost:8080/test.gif</a> GET
 Accept-Ranges: bytes
 Connection: close
 Content-Length: 2541
 Content-Type: image/gif
 Date: Wed, 03 Sep 2003 23:55:38 GMT
 Etag:
 Last-Modified: Wed, 03 Sep 2003 23:54:27 GMT
 Server: Zope/(unreleased version, python 2.2.2, linux2) ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZServer" title="create this page">?</a>/1.1

After adding the image to the cache, you'll recheck the HTTP headers using the script again. You'll find that there are two new headers. For example:

::

 [andy@basil scripts]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=andy%40basil%20scripts" title="create this page">?</a>$ ./header.py <a href="http://localhost:8080/test.gif">http://localhost:8080/test.gif</a> GET
 ...
 Cache-Control: max-age=3600
 Expires: Thu, 04 Sep 2003 00:56:03 GMT on 2.2.2, linux2) Zserver/1.1

**NOTE**: Unfortunately, Zope 2 doesn鈥檛 conform to the Request for Comments (RFC) regarding *HEAD* requests. Instead of sending the full set of headers when a *HEAD* request is sent, the values from the cache manager are missing. When testing, you should always send *GET* requests.

For more information on the HTTP headers and how they relate to caching, see RFC 2616 at *<a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html">http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html</a>*

The Accelerated HTTP Cache Manager caches an entire response, which works well for static items. However, the normal Plone page consists of personalized elements, such as the calendar, the personal navigation bar, and so on. In this situation, you need to be able to cache just part of the page, and this is where RAM Cache Manager comes in handy.

RAM Cache Manager will cache the output of an object in RAM so that on the next occurrence of that script, it'll be pulled from the cache. Repeated invocations of that object will cause the output to be pulled from the cache until the cache expires. The point of this manager is that you're really avoiding recomputing complicated or large calculations every time; instead, you're storing the result and reusing. This Cache Manager won't cache images or files. It won't stop users trying to configure the cache to do so, but it has no effect on these objects.

By default, Plone creates a RAM Manager called *RAMCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=RAMCache" title="create this page">?</a>* in the root of your Plone site. Accessing this object through the ZMI will open the management options for the cache. The following are all reasonable defaults, and nothing needs to be changed initially:

  - Title: This is the title of the cache manager and is optional.

  - REQUEST variables: These are the variables that form the condition for the cache. This is a powerful option that allows the cache to be based upon the user variables. For example, if an item to be cached requires that it should be cached differently for each user, or in different languages, you can enter the REQUEST variables you鈥檇 like to cache here.
  
  - Threshold entries: This is the maximum number of entries that can be stored in the cache. If the cache is taking up too much RAM, lower this value.

  - Maximum age of a cache entry: This is the amount of time (in seconds) this object will stay in the cache.

  - Cleanup interval: This is how often the cache gets cleaned.

Because the requests for the object actually reach Zope, this does nothing to reduce network traffic; it just causes Zope to render the result quicker. Selecting the Statistics tab in the ZMI will report statistics on exactly how many hits were returned by the cache and how many were passed onto the object. If too many hits are being passed on to the object, you may consider altering the cache configuration by having fewer *REQUEST* variables or increasing the time spent in the cache.

Assigning Caches

分配缓存
................

To add an object that's on the file system to the cache, simply specify the name of the cache in the *.metadata* file for that object. (Chapter 7 discussed using *.metadata* files.) Plone already does this on a large number of images, on CSS, and on JavaScript<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=JavaScript" title="create this page">?</a>. For example, *plone_skins /plone_images/pdf_icon.gif.metadata* reads as follows:

::

 [default]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=default" title="create this page">?</a>
 title=Pdf icon
 cache=HTTPCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=HTTPCache" title="create this page">?</a>

This signifies that the image will be cached using the *HTTPCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=HTTPCache" title="create this page">?</a>*. Most objects on the file system would be more suitable for adding to the *HTTPCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=HTTPCache" title="create this page">?</a>*, rather than the *RAMCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=RAMCache" title="create this page">?</a>*.

Caching Content Types

缓存内容类型
.....................

Caching content types is a little trickier and requires using the Caching Policy Manager. Plone installs this tool by default, and you can find it in the root of the Plone instance with the ID *caching_policy_manager*. 

Before you can cache any content, you must alter the cache settings for templates inside Plone. By default Plone emits headers for content that turns off any caching at all. If you don't do the following, the rest of this section won't work. If you click *portal_skins* and then click *plone_templates*, you鈥檒l find the page template *global_cache_settings*. This is used on every page that uses the main Plone template. The template currently looks like the following:

::

 <metal:cacheheaders define-macro="cacheheaders">
     <metal:block tal:define="dummy python:request.RESPONSE.setHeader ~CCC
 'Content-Type', 'text/html;;charset=%s' % charset)" />
     <metal:block tal:define="dummy python:request.RESPONSE.setHeader ~CCC
 ('Content-Language', lang)" />
     <metal:block tal:define="dummy python:request.RESPONSE.setHeader ~CCC
 ('Expires', 'Sat, 1 Jan 2000 00:00:00 GMT')" />
     <metal:block tal:define="dummy python:request.RESPONSE.setHeader ~CCC
 ('Pragma', 'no-cache')" />
 </metal:cacheheaders>

This will mean that nothing is cached because the HTTP headers *Pragma: no-cache* and *Expires* have been set. To disable this and make sure you can cache selectively, customize this template and remove the *Pragma* and *Expires* directives. Your template should now look like the following:

::

 <metal:cacheheaders define-macro="cacheheaders">
     <metal:block tal:define="dummy python:request.RESPONSE.setHeader ~CCC
 'Content-Type', 'text/html;;charset=%s' % charset)" />
     <metal:block tal:define="dummy python:request.RESPONSE.setHeader ~CCC
 ('Content-Language', lang)" />
 </metal:cacheheaders>

Once you've done this, you can continue to cache selectively using the *caching_policy_manager*. Access the tool via the ZMI, and you'll see the following options:

  - Policy ID: This is a unique ID for a policy, used internally only.

  - Predicate: This is a TALES expression for matching the content. The variable *content* contains the object being rendered.

  - Mod. Time: This is a TALES expression that evaluates and returns a value from the object to use for calculating the modification time. The variable content contains the object being rendered.

  - Max age (secs): This is how long to set the cache header for.

  - Vary: This varies the header to send (you鈥檒l learn more about this later in the 鈥淯sing Squid鈥� section).

  - No-cache: This sends the no-cache HTTP header.

  - No-store: This sends the no-store HTTP header.

  - Must-revalidate: This sends the must-revalidate HTTP header

The following is a sample policy that would cache all images on the site:

  - Policy ID: *Images*

  - Predicate: *python:content.portal_type=='Image'*
  
  - Max age (secs): *3600*

Leave all the other fields blank, and select Add to add this policy. The *caching_policy_manager* will now looks something like Figure 14-8.

 .. image:: img/3294f1408.png

Figure 14-8. The *caching_policy_manager* with the Images policy added

To test this correctly, you'll need to add an image into your site through the Plone interface. Images will get sent with the appropriate headers if you call the view 

*test.gif*
::

 ~/header.py <a href="http://localhost/test.gif/view">http://localhost/test.gif/view</a> GET
 Cache-Control: max-age=3600
 Connection: close
 Content-Language:
 Content-Length: 19810
 Content-Type: text/html;charset=utf-8
 Date: Fri, 05 Sep 2003 18:42:44 GMT
 Etag:
 Expires: Fri, 05 Sep 2003 19:42:44 GMT
 Last-Modified: Fri, 05 Sep 2003 18:33:41 GMT
 Pragma: no-cache
 Server: Zope/(unreleased version, python 2.2.2, linux2) ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZServer" title="create this page">?</a>/1.1

As expected, the *Last-Modified* and *Expires* headers are now being sent. By altering predicates and adding multiple policies, you can build up a rather sophisticated caching system. For complicated rules, you can, of course, pass the handling off to a Script (Python) object if you so desire. For example, if the predicate is as follows:

::

 python: here.myCachingRules(content)

then add a Script (Python) called *myCachingRules* to calculate those rules. For example:

::

 ##parameters=content
 # cache all files, images and anything
 # thats published
 if content.portal_type in ['File', 'Image']<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%27File%27%2C%20%27Image%27" title="create this page">?</a>:
     return 1
 if content.review_state in ['published',]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%27published%27%2C" title="create this page">?</a>:
     return 1

In this script you're caching all files and images, and anything that's in the published state, by setting the HTTP headers through the Caching Policy Manager.

Example: Caching on ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZopeZen" title="create this page">?</a>.org

示例：ZopeZen.org上的缓存
...............................

When developing the site *<a href="http://www.zopezen.org">http://www.zopezen.org</a>*, there was one major problem. The main page of ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZopeZen" title="create this page">?</a>, which lists the posts and the number of replies, is expensive to generate. In Plone, there's no easy way to efficiently calculate from the catalog the number of discussion replies to an item.

This is an ideal situation for the RAM Cache Manager. Since the traffic that adds news items or posts is quite small, perhaps one or two or day, it seems reasonable that within any 30-minute period, the front page won't change greatly. The function that gets the news and the replies is called *getNewsAndReplies*, and it performs the task of getting all the data needed for the *index_html* template.

The *index_html* template has elements that are specific to the user; for example, the login box on the left shows users what options they have. This means that using the Accelerated HTTP Cache Manager or caching the whole template using the RAM Cache Manager wouldn't work. This would cause users to see others users' options.

Instead, the ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ZopeZen" title="create this page">?</a> skin caches the *getNewsAndReplies* Script (Python) object by adding it to the RAM Cache Manager. Doing so ensures that the majority of the expensive work rendering the page is cached. Since the news items will be same for every user, there's no point in caching based on any *REQUEST* variables, so *AUTHENTICATED_USER* was removed from the list of *REQUEST* variables for the cache. Profiling the front page reveals that without the cache it can produce 1.06 requests per second. With the caching, the site can produce 4.96 requests per second, which is a significant difference for a minor change.

Using Caching Servers

使用缓存服务器
.....................

Since you can now send cache headers according to sophisticated rules, you can now use another server to cache requests for Plone. As fast as Zope is, it'll never be faster than Apache, Squid, or IIS for serving out content. These servers can serve static and cached content quickly and simply. Partly it's because these servers are written in C, but it's also because they do less work for each request. There are no security checks, database lookups, or language negotiations to be performed. Also, since you've read Chapter 10, you'll also already have a proxy server installed.

Using Apache

使用Apache
############

Apache is the standard open-source Web server. The following sections document techniques using Apache 2.0 server on Linux. With only minor syntax modification, most of these tips work on 1.3. For more information on different Apache servers and platforms, please see the excellent Apache documentation at *<a href="http://www.apache.org">http://www.apache.org</a>*.

The ability to deflate or gzip your pages is useful for saving bandwidth. Before a page is sent by the server, it will be sent down the wire, where the client will decompress the page. This makes pages quicker to download and incurs fewer bandwidth charges for the site's owner since the files are smaller. First, enable the *mod_deflate* module. This will depend upon your particular setup. For example, on Linux, do the following:

::

 LoadModule<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=LoadModule" title="create this page">?</a> cache_module modules/mod_deflate

Second, just add the following to your server configuration to deflate all Hypertext Markup Language (HTML), Extensible Markup Language (XML), and plain text:

::

 AddOutputFilterByType<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=AddOutputFilterByType" title="create this page">?</a> DEFLATE text/html text/xml text/plain

Some clients handle the deflation slightly differently, so it's worth reading the *mod_deflate* documentation for more detailed examples (*<a href="http://httpd.apache.org/docs-2.0/mod/mod_deflate.html">http://httpd.apache.org/docs-2.0/mod/mod_deflate.html</a>*).

In previous sections you've seen how you can send expiration headers by manipulating tools in Plone. Apache can also send these headers easily using the *ExpiresActive<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ExpiresActive" title="create this page">?</a>* directive; this is an alternative to using the various Plone tools. To set the expires headers to be 24 hours from now for all images, for example, you can add the following to your Apache site configuration:

::

 ExpiresActive<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ExpiresActive" title="create this page">?</a> On
 ExpiresByType<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ExpiresByType" title="create this page">?</a> image/gif "access plus 1 day"
 ExpiresByType<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ExpiresByType" title="create this page">?</a> image/png "access plus 1 day"
 ExpiresByType<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=ExpiresByType" title="create this page">?</a> image/jpeg "access plus 1 day"

You can find more information on *mod_expires* at *<a href="http://httpd.apache.org/docs-2.1/mod/mod_expires.html">http://httpd.apache.org/docs-2.1/mod/mod_expires.html</a>*.

Apache comes with several systems that can perform caching for you. The standard Apache module *mod_cache* has two caching modes: memory and disk. This will cache all page requests given a set of parameters for a given amount of time. To set up a disk cache in the */tmp/apache_cache* folder, add the following to the site configuration:

::

 CacheRoot<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CacheRoot" title="create this page">?</a> /tmp/apache_cache
 CacheEnable<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CacheEnable" title="create this page">?</a> disk /
 CacheSize<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CacheSize" title="create this page">?</a> 256
 CacheDirLevels<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CacheDirLevels" title="create this page">?</a> 5
 CacheDirLength<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CacheDirLength" title="create this page">?</a> 3

Unfortunately, proving that Apache is actually caching the content can be a little hard; perhaps the simplest approach is to test it by watching the *z2.log* in Plone and seeing if it's being hit. You can find more information on *mod_cache* at *<a href="http://httpd.apache.org/docs-2.0/mod/mod_cache.html">http://httpd.apache.org/docs-2.0/mod/mod_cache.html</a>*.

Using Squid

使用Squid
###########

Squid is an open-source proxy server that's used commonly with Zope. It enables you to accelerate Zope by caching content that's produced inside Squid so that multiple requests are handled by Squid, not Zope. Again, since Squid doesn't render dynamic content and is written in C, it can respond far more quickly. In Chapter 10 I covered installing Squid and using it as a proxy. If you're going to use Squid to accelerate Plone, then please see that chapter for information on setting up Squid as a proxy.

As you've seen earlier in this chapter, you can put almost any information you want in HTTP headers using the Caching Policy Manager and the Accelerated HTTP Cache Manager. Now Squid will act in a similar manner to a browser cache. When a request comes for a page, if those cache headers are present, Squid will cache the page. Repeated hits will cause Squid to return the page, not Plone.

It's relatively simple to tell if a page has been cached. Squid will add an *X-Cache* header to the response. Using the *header.py* script, you can see if the page has been successfully cached. A *HIT* means that a cached copy was found in Squid and returned; if no copy was found in the cache and Plone was queried, a *MISS* is reported. For example:

::

 X-Cache: HIT from www.agmweb.ca

Squid shows impressive numbers in testing in the development environment, accelerating the view of a Plone page that's cached from about 2 requests per second to more than 25 requests per second. On fast servers, users have reported speeds of more than 200 requests per second with relative ease.

Cleaning Squid Caches

清理Squid缓存
#####################

When a user edits an object, it changes in Plone; however, because this object is cached in an earlier state, the cache contains an old version. Users accessing the site will get the old version rather than the new version. With caches under your control (such as Squid), you can send *PURGE* commands to the caching server to tell it to remove the objects from the cache.

For the Accelerated HTTP Cache Manager, add the URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=URLs" title="create this page">?</a> of the caches to the *Notify URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=URLs" title="create this page">?</a> (via PURGE)*. An example is as follows:

::

 <a href="http://192.168.1.1:80/example.org">http://192.168.1.1:80/example.org</a>

In this example, the IP is the address of the cache, and the domain is the site to be purged. For Squid to run the *PURGE* directive, you must ensure that Squid is configured. If Squid was on localhost, this would be as follows:

::

 acl PURGE method purge
 http_access allow localhost
 http_access allow purge localhost
 http_access deny purge
 http_access deny all

The Caching Policy Manager currently has no *PURGE* mechanism, although you could add a Script (Python) object to workflow to achieve this. You could save Python code shown in Listing 14-2 as an external method and invoke it in workflow as needed.

Listing 14-2. A Script to Purge the Squid Cache

::

 import urllib
 import urlparse
 import httplib
  
 URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=URLs" title="create this page">?</a> = [
     # enter the URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=URLs" title="create this page">?</a> you would like
     # to purge here
     '<a href="http://localhost:8080">http://localhost:8080</a>',
 ]
  
 def purge(objectURL):
     for url in URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=URLs" title="create this page">?</a>:
         if not url:
             continue
         assert url[:4]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=%3A4" title="create this page">?</a> == 'http', "No protocol specified"
  
         url = urlparse.urljoin(url, objectURL)
         parsed = urlparse.urlparse(url)
         host = parsed[1]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=1" title="create this page">?</a>
         path = parsed[2]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=2" title="create this page">?</a>
  
         h = httplib.HTTP(host)
         h.putrequest('PURGE', path)
         h.endheaders()
         errcode, errmsg, headers = h.getreply()
         h.getfile.read()
  
 if __name__ == '__main__':
     print purge('/')

The Collective has a new tool called *CMFSquidTool<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CMFSquidTool" title="create this page">?</a>* that does this work for you. It watches for changes on content and when that occurs sends a purge to a Squid cache for you. I haven't tried this new tool yet, but it's definitely worth a look if you're using Squid.

Avoiding Having to Clean Squid Caches

避免Squid缓存清理
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The best way to avoid cleaning caches is to be more selective on the caching. Both the Caching Policy Manager and the RAM Cache Manager provide methods for being selective about what to return from a cache.

Both the Caching Policy Manager and Squid support the *Vary* tag. If a *Vary* tag is specified, Squid will extract the headers specified in the *Vary* tag from the request. Those headers are then checked against the cache鈥攊f they match, the page is returned from the cache. If they don't, the request is passed on down the chain to Plone.

As an example, in the Caching Policy Manager the *Vary* tag has the value of *Accept-Language*. When a request comes into Squid, the page will be cached according to the *Accept-Language* setting in that request header. When a user requests a page with a different setting, a new page will be returned. This means you can cache the pages based upon language.

The least aggressive value for *Vary* is \*, which will cache any request that's the same as any other request. Different requests are passed straight on to Plone. Although this is the least aggressive caching system, it does ensure that the user will see only up-to-date content.

The RAM Cache Manager *REQUEST* methods are the same concept as *Vary* except the tool accepts a list of Zope request variables. The result of a cache lookup is then based upon those variables. The default value is *AUTHENTICATED_USER*, which means that each authenticated users will see their own versions of the cache. Nonregistered users (anonymous) will all see the same content.

Using Zope Enterprise Objects

使用Zope企业对象
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The final key to scaling and administering Plone is using Zope Enterprise Objects (ZEO). This is a key tool in so many areas of Plone for development and production. Many people think it should be the default setup for Plone, and it may be one day soon. For the moment, however, ZEO comes with Plone on Linux but isn't installed. It also works in Windows but isn't fully supported with services or easy installs.

In a standard Plone installation, there's one instance of Plone talking to one instance of the ZODB. While that one instance of Plone is accessing the ZODB, it's locked and no other process can access it. This limits the scale of the site and creates a single point of failure. In a the world of relational databases, this would be equivalent to only one process being able to access your database.

ZEO breaks this linkage and separates the access of the ZODB (called the ZEO server

 .. image:: img/3294f1409scrap.png

Figure 14-9. A standard ZEO setup

Because multiple processes are able to connect to a ZODB, you're now able to have several copies of Plone. In essence you can now have two or three Plone instances that all share the same content. Not only does this mean you can spread the load of your site over 

Finally, one minor point is that restart times for a ZEO client are very quick. The cost of having to load up the databases has been removed, which means you can restart Plone sites quickly.

Installing ZEO

安装ZEO
..............

ZEO is included with Zope 2.7, the version of Zope supported by this book. In earlier version of Zope, it was distributed separately. At the moment there's no easy way to install ZEO on Windows鈥攖he *mkzeoinstance* script doesn't work. ZEO itself works just fine, but you'll have to read the ZEO source to see how to do this. Further, *zopectl* doesn't work on Windows, meaning the following examples don't work.

Linux
#####

To create a ZEO server, use the *mkzeoinstance* script located in the */opt/Zope-2.7/bin* directory. This assumes that Zope is already installed, as described in Chapter 2. The script takes the following parameters:

  - Directory: This is the directory in which to create the ZEO server instance.

  - Host: This is the host and port for the server to listen on, in the format *host:port*. The port will be the port that ZEO clients connect to and should be protected by a firewall, since ZEO provides no security against unauthorized access. These are optional. The default port is 9999.

  - User and password: This is the default user and password for the server in the format user:password and is optional.

For example, the following will install ZEO at */var/zeo* on the default port:

::

 cd /opt/Zope-2.7/bin
 ./mkzeoinstance /var/zeo

This has created a new database with all the appropriate configuration. This database is a new location, but this is fine. If you want to move an existing Zope installation to ZEO, then you'll need to stop the running Zope and then move the database from your old installation to the new ZEO directory. In my case, that means moving the *Data.fs* file from */var/zope/var* to */var/zeo/var*.

Next you'll need to alter the configuration of your Zope instance. To do this, open the *zope.conf* in *etc* and enter the following information:

::

  # ZEO client storage:
  #
  <zodb_db main>
     mount-point /
     <zeoclient>
       server localhost:9999
       storage 1
       name zeostorage
       var $INSTANCE/var
     </zeoclient>
  </zodb_db>

In the previous code you're setting the port and the server where the ZEO Server can be found. You'll also need to comment out the existing map to the local database. This is should look like the following:

::

  #<zodb_db main>
  #    # Main FileStorage<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=FileStorage" title="create this page">?</a> database
  #    <filestorage>
  #      path $INSTANCE/var/Data.fs
  #    </filestorage>
  #    mount-point /
  #</zodb_db>

To test that this works, first start the ZEO server. This may require more permissions than the user you installed it as:

::

 $ cd /var/zeo/bin
 $ ./zeoctl start
 daemon process started, pid=29316

The ZEO daemon has successfully started. Now fire up a Zope client, and try to connect to it, like so:

::

 $ cd /var/zope/bin
 $ ./zopectl start
 daemon process started, pid=29338

This means things are good to go, and you can now access your Plone as usual.

Using ZEO Clients

使用ZEO客户端
.................

In this configuration, the ZODB is accessed via the ZEO server, and each Zope instance is a ZEO client. Multiple ZEO clients can be connected to the server. There's no need for the client and server to be on the same computer, as long as the client can make a connection to the server. If the clients are on the same computer, each client will need to bind to different HTTP and FTP ports to avoid conflict with each other.

When your client starts, it'll connect to the storage specified in your configuration instead of the standard local storage. One common requirement is to allow a second computer to run intensive tasks, such as updating the catalog, packing the database, or performing complex lookups, without causing the other client's performance to degrade. This is actually easy to do using the *zopectl* function:

::

 $ cd /var/zope/bin
 $ ./zopectl debug
 Starting debugger (the name "app" is bound to the top-level Zope object)

To pack the database, you'd then do the following:

::

 >>> app.Control_Panel.Database.manage_pack(days=0)

Because you're running on a ZEO client, you have to tell the server that a change has been made and the caches have been updated. To complete the transaction, do this:

::

 >>> get_transaction().commit()
 >>> app._p_jar.close()

This is actually a useful thing to do if you're running a high-performance site and need to pack the database. The site will run a little slower when the transaction is committed, but most of the hard work will happen on the client that's performing the pack. This could be a totally separate machine from your site and is an excellent way to distribute the load.

For debugging, getting to this prompt is extremely useful, as you can now examine the objects inside that *app* object. You'll find that they match the objects you see in the ZMI. For example:

::

 >>> app.objectIds()
 ['acl_users', 'Control_Panel', 'temp_folder',...

What's the API for that *app* object? You can use the built-in *dir* function in Python to examine the object and even use the *__doc__* method to see the comment strings contained there in, like so:

::

 $dir(app)
 >>> dir(app)
 ['COPY', 'COPY__roles__', 'Control_Panel', 'DELETE',...
 >>> app.valid_roles.__doc__
 'Return list of valid roles'

One good example of a ZEO based application is CMFNewsFeed<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter14/createform?page=CMFNewsFeed" title="create this page">?</a> (*<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>*). This connects to Plone using a ZEO client. That separate client then goes and collects all the news feeds it can find and inserts the data into the site. By doing all the collection and cataloging in a separate process, this ensures that the main site's performance isn't degraded.

ZEO is an indispensable tool for developers. It allows you to interact programmatically with your server while it's running. If at this point you're still confused about Plone and the object database, then for experienced programmers ZEO is normally an eye-opener.

Load Balancing and Failover

负载均衡和容错
...........................

Although ZEO provides the ability to run Plone on many servers, it doesn't provide any load balancing for the user. Load balancing is the act of sending incoming requests to different servers and spreading out the load of producing pages. Sophisticated tools test to see if the server is up before sending it a request.

You have hardware and software options for load balancing. For example, Squid can perform dynamic failover. Pound is one example load balancer; you can find it at *<a href="http://www.apsis.ch/pound/index.html">http://www.apsis.ch/pound/index.html</a>*.

The Internet Cache Protocol (ICP) is a protocol that Squid can use to check that a Plone site is running prior to forwarding a request to it. In highly dynamic sites, this can be a necessity. You can find more information about ICP and Zope at *<a href="http://www.zope.org/Members/htrd/icp/intro">http://www.zope.org/Members/htrd/icp/intro</a>*.
