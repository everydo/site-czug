.. contents:: 章节目录

Zope配置文件
-----------

位于实例目录下： etc/zope.conf，从zope2.7开始全部的配置都在这个文件中进行。这个配置文件包含了全部的文档，也可参考下面两个链接:

- <a href="http://mechanicalcat.net/tech/zope/Zope_schema.html">http://mechanicalcat.net/tech/zope/Zope_schema.html</a>
- <a href="http://www.plope.com/Members/chrism/whatsnew_27">http://www.plope.com/Members/chrism/whatsnew_27</a>

下面介绍几个主要的配置参数：

端口设置
-------

Zope的运行需要占用多个端口，通常包括http服务的端口和ftp服务的端口。其缺省值为8080和8021。  但如果这两个端口被其他的应用程序占用，或者希望使用80和21这样标准的端口，就需要调整配置文件。

在缺省配置下，调整下面的两个指令就可以了::

   <http-server>
     # valid keys are "address" and "force-connection-close"
     address 8080
     # force-connection-close on
   </http-server>

   <ftp-server>
     # valid key is "address"
     address 8021
   </ftp-server>

如采用标准端口，可改为::

   <http-server>
     # valid keys are "address" and "force-connection-close"
     address 80
     # force-connection-close on
   </http-server>

   <ftp-server>
     # valid key is "address"
     address 21
   </ftp-server>

一个捷径：如果您有多个实例，可以通过调整“端口基数”来简化端口的分配，详细参考指令“port-base”

运行模式
-------

zope缺省处于调试（debug）模式下运行。在这个模式下运行，系统可以直接在终端上输出错误信息，但是性能会大打折扣。在产品化的网站中，应该关闭这个开关。

指令：debug-mode

如要关闭调试模式，将此行::

   #    debug-mode on

修改为::

       debug-mode off

有效运行用户
----------

如果你希望采用80这样的端口，那么你必须使用root运行zope。但使用root运行是危险的，可能导致安全性问题。因此可指定一个实际运行过程中的用户，也就是“有效运行用户”(这是unix上的suid权限)。这个指令仅仅在类Unix的操作系统上有效。

指令：effective-user

对于我们安装过程，这里应该是::

    effective-user zope

Python轮询检查周期
--------------------

python-check-interval是用来轮询检查线程切换和信号量处理的，缺省是500，可根据情况调整。

本地环境设置
----------------

设置locale，这影响系统的日期、货币、提示语言、编码等操作。对于大陆用户，安装了Plone应该采用utf8的编码，设置为::

 locale zh_CN.UTF8

新结构化文本编码
------------------

典型设置::

 rest-input-encoding utf8
 rest-output-encoding utf8
 rest-header-level 2
 rest-language-code en  # zh


From lexon Thu Apr 8 14:34:56 +0800 2004
From: lexon
Date: Thu, 08 Apr 2004 14:34:56 +0800
Subject: should be "ftp port"
Message-ID: <20040409063456+0800@www.czug.org>

[通常包括web服务的端口和http服务的端口]<a class="new" href="http://members.czug.org/plone/plonebook/X_e9_85_8d_e7_bd_aeZope/createform?page=%E9%80%9A%E5%B8%B8%E5%8C%85%E6%8B%ACweb%E6%9C%8D%E5%8A%A1%E7%9A%84%E7%AB%AF%E5%8F%A3%E5%92%8Chttp%E6%9C%8D%E5%8A%A1%E7%9A%84%E7%AB%AF%E5%8F%A3" title="create this page">?</a>=>[通常包括web服务的端口和ftp服务的端口]<a class="new" href="http://members.czug.org/plone/plonebook/X_e9_85_8d_e7_bd_aeZope/createform?page=%E9%80%9A%E5%B8%B8%E5%8C%85%E6%8B%ACweb%E6%9C%8D%E5%8A%A1%E7%9A%84%E7%AB%AF%E5%8F%A3%E5%92%8Cftp%E6%9C%8D%E5%8A%A1%E7%9A%84%E7%AB%AF%E5%8F%A3" title="create this page">?</a>
