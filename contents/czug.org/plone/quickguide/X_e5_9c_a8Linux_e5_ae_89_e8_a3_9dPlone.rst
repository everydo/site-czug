---
created: 2005-12-14 14:34:37
creator: panjy
description: ''
title: 在 Linux 安裝 Plone
---
  開源軟體愈來愈受歡迎。在眾多開源軟體中，Plone能以短時間脫穎而出，為甚麼呢？原因是只需一個瀏覽器，Plone便能幫你建立一個深入管理和應用各項資訊的系統。對於一些抗拒網上系統或慣於付軟體版權費的人，Plone可能給你一個驚喜。

  Plone很地好實現很多前瞻的理論，例如Data、Logic和Prensentation層的明確和一致的分離、國際化支援所有語言和方言、輕易的建立各種用戶系統和支援Metadata的框架。簡單來說Plone是一個詳盡的內容管理或網上應用平台。此外，Plone能達致快速而又準確的搜尋功能，這正是商業網站必備的優勢。最重要的是，你自己可在Plone內建立在各式各樣軟體。記著，以上一切是免費的。

  .. image:: plone_1_1.jpg 
     :width: 600
     :height: 400 
     :align: center 
     :alt: NASA 美國太空總署也使用Plone. 


在Linux安裝
============

  在Linux上安裝，你要親自安裝python、Zope兩個程式。Python是Zope的重要語言，Zope本身是一個應用平台，Plone是Zope的一個最重要和最成功的框架。

Python安裝
-----------

-  首先從官方網站下載Python::
   
    <a href="http://www.python.org/download/">http://www.python.org/download/</a>

    目前Python的最新版本為2.4，下載後進行解壓。

    tar -xzvf Python-2.4.tar	(Enter)

    cd Python-2.4	(Enter)

- 然後用以下命令安裝。

   ./configure (Enter)

   make	(Enter)
   
   make install	(Enter)

- 執行「./configure」時我們也可自定Python的安裝路徑，例如我們希望把Python安裝在/usr/local/bin/python目錄下的話，便可在執行「./configure」時加上--prefix參數::

  ./configure --prefix=/usr/local/bin/python	 (Enter)

Zope安裝
---------

  首先從官方網站下載Zope::
    
    <a href="http://zope.org/Products/zope/2.7.4">http://zope.org/Products/zope/2.7.4</a>

    目前Zope的最新版本為2.4，下載後進行解壓。

    tar -xzvf Zope-2.7.4-0.gz	(Enter)

    cd Zope-2.7.4-0	(Enter)

  然後用以下命令安裝::

    ./configure (Enter)

    make	(Enter)

    make install	(Enter)

  同樣地我們可如上文般指定Zope的安裝路徑。

Zope Instances
----------------

  以上步驟安裝了Zope在你的系統內，現在只要加入 **instance home** 便可開始Zope。 **instance home** 是記錄一個Zope Server資料的文件夾。你可以在同一台電腦擁有多個instance home。這是一個便於管理和強勁的功能。例如你可以用一台電腦建立不同的 Zope 給不同員工、分開測試不同的產品、或給予各客戶不同的Zope。首先建立第一個 Zope instance。假設Zope的安裝路徑為 */usr/local/bin/zope/* ，便應輸入以下命令::

    /usr/local/bin/zope/bin/mkzopeinstance.py	(Enter)

    .. image:: plone_1_6.jpg 
       :width: 333
       :height: 210 
       :align: center 
       :alt: 執行mkzopeinstance命令建立instance home。


  
     技術常識：**使用Zope時要注意的地方**

        你是不用在Zope的文件夾內建立「instance home」的，任可一個文件夾也可，例如更好的方法是建立一個名為「instances」的文件夾放置所有「instance home」。你要輸入安裝的文件夾名，起始用戶名稱及密碼。

  .. image:: plone_1_7.jpg 
     :width: 333
     :height: 210 
     :align: center 
     :alt: 「zopeinstance1」、「admin」分別為instance home及起始用戶名稱。


  開始Zope有兩個方法，第一個方法如下::

    1 /usr/local/bin/zope/instance/bin/runzope (Enter)

        - 如果你開始時顯示有其他程式使用你的端口，你便要使用其他端口開始Zope。Zope是個http及ftp伺服器。端口預設值分別為8080及8021。你可用以下命令修改。例如改為使用9080及9021端口的話，便可在Zope的安裝目錄下輸入::

            ./bin/runzope -X port-base=1000	(Enter)

    2 開始Zope的第二個方法是以Zope為背景程式。在Zope的安裝目錄下輸入::

        ./bin/zopectl start (Enter)

      要結束Zope的背景程式，可在Zope的安裝目錄下輸入::

        ./bin/zopectl stop  (Enter)

測試 Zope Instance
--------------------

  打開瀏覽器，輸入你的網址::

    <a href="http://yourhost:8080/manage">http://yourhost:8080/manage</a>


  你將要輸入用戶密碼，可以使用之前建立的起始用戶和密碼。


  .. image:: plone_1_8.jpg 
     :width: 600
     :height: 400 
     :align: center 
     :alt: 成功登入Zope Management Interface。

安裝Plone
--------------

  其實Plone只是Zope的其中一個產品。在Zope內，你可以隨時新增產品。方法只是將產品放在Products文件夾內，然後重新啟動便可。這是很重要的概念，因你可以在同一台電腦上擁多個不同的Zope伺服器，而且每個伺服器也有不同的產品給各用戶。首先下載Plone::

    <a href="http://plone.org/downloads">http://plone.org/downloads</a>

    進入「Products」文件夾解壓。


    .. image:: plone_1_9.jpg 
       :width: 333
       :height: 310 
       :align: center 
       :alt: 記著將所有產品放在「Products」文件夾內。
	
    tar -xzvf Plone-2.0.5.tar.gz　(Enter)

    cd Plone-2.0.5 (Enter)

    cp -a * ../ 	(Enter)

    .. image:: plone_1_10.jpg 
       :width: 333
       :height: 310 
       :align: center 
       :alt: Plone.tar.gz已有全部必須的產品。可以一次過移至「Products」內。


  重新啟動Zope便可::


    /home/zope/instance/zope-2.7.4-0/zopeinstance1/bin/zopectl restart (Enter)


建立Plone instance
---------------------

  和Windows安裝不同，Linux的安裝沒有預設一個「Plone instance」在Zope內，你可在同一個Zope Server安裝多個Plone。先在瀏覽器登入Zope，然後在新增列選取「Plone Site」。

  .. image:: plone_1_11.jpg 
     :width: 600
     :height: 400 
     :align: center 
     :alt: 新增「Plone Site」。



  輸入資料，然後遞交。

  .. image:: plone_1_12.jpg 
     :width: 600
     :height: 400 
     :align: center 
     :alt: 輸入基本資料

測試Plone Site
----------------

  你的Plone Site的URL應為如下::

    <a href="http://yourhost:8080/yourplone_name">http://yourhost:8080/yourplone_name</a>

  例如<a href="http://127.0.0.1:8080/Plone">http://127.0.0.1:8080/Plone</a>。結果會和Windows版安裝完成圖一樣。


From leeshasr Wed Feb 16 11:54:04 +0800 2005
From: leeshasr
Date: Wed, 16 Feb 2005 11:54:04 +0800
Subject: 
Message-ID: <20050216115404+0800@nocache.czug.org>

直接安装DEBIAN──SARGE。