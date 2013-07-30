按此观看简体版本_

.. _按此观看简体版本: X_e5_ae_89_e8_a3_85Plone

目的
=======

Plone 安裝在Windows versions 9x, ME, NT 3.51+, 2000 或 XP內。 

  - 準備功夫_

  - 基本安裝_

  - `執行 - 使用Plone Controller`_

  - `執行 - 其他方法`_

  - 相關_


準備功夫
=======

1　一台電腦，基本是CPU: 500MHz, RAM:64MB, 硬碟：50MB。當然，越強越快。

2　用administrator 或有足夠安裝權限的用戶登入windows

3 `到此下載`_. 

.. _`到此下載`: <a href="http://www.plone.org/download">http://www.plone.org/download</a> 


基本安裝
=======

1 雙按下載檔案

    .. image:: welcome.jpg
       :align: center

2 然後跟著一般的安裝步驟按"下一步"，直至輸入密碼頁面出現

    .. image:: password.jpg
       :align: center

    - 這是起始用戶(也是超級用戶)的密碼，記著它。建議使用"admin"用戶名稱


3 安裝過程大概幾分鐘，最後出現

    .. image:: finished.jpg
       :align: center

    - 選取"Launch Plone Controller"然後按完成。


執行 - 使用Plone Controller
===========================

1 在程式集中選取Plone Controller。

    .. image:: icon.jpg
       :align: center

2 在 Status格按下start 鍵啟動Plone

    .. image:: stopped.jpg
       :align: center

**注意**:: 
      
    若起始運作時間過長，Plone可能會自動Time Out，這個bug 在將來的Plone會解決。  

- 問題記錄，如果你還是有不明的問題，其實可以查詢Plone的錯誤記錄，打開以下檔案::

    C:\Program Files\Plone 2\Data\log 

3 如你的端口設定正確，當Plone運作後，可按"View Plone"鍵來瀏覽Plone. 按"Zope Management Interface.."可以瀏覽Zope管理介面(ZMI) (暫可不理)。
    
    .. image:: started.jpg
       :align: center


按 "Ports" 可設定端口，在相應的欄位填上端口值，空白端口值可關閉該服務。一般來說，用缺省的值便可，除非你的電腦有其他程序佔用該端口。假如你的電腦有IIS, Apache, PWS一類的程式，請確定Plone的端口和它們使用的不同。

執行 - 其他方法
==============

1 Windows NT, 2000, XP的用戶

    可以用Service模式執行Plone, Service 模式可以在ZMI restart Plone 及在Windows 控制台或用指令句啟動和關閉Plone ("net start Plone", "net stop Plone").

2 Windows 95, 98, ME的用戶 

    只可使用"Windows 95/98"模式。可以在System tray的圖示啟動/關閉Plone 及Plone Controller

**完成！**

- 打開瀏覽器，在網址列鍵入 <a href="http://localhost">http://localhost</a> (如你的Plone Http 端口不是80, 如4321, 你便要鍵入 <a href="http://localhost:4321">http://localhost:4321</a>

  .. image:: plone0.jpg
      :width: 500
      :height: 375
      :align: center
      :alt: 完整的Server

完整的Server全圖_
      
.. _完整的Server全圖: plone0.jpg


- 用admin用戶登入後可看到

  .. image:: plone1.jpg
      :width: 500
      :height: 375
      :align: center
      :alt: 登入的介面

登入的介面全圖_
      
.. _登入的介面全圖: plone1.jpg


相關
====

- 官方主頁:<a href="http://plone.org/">http://plone.org/</a>

- 安裝資料：<a href="http://plone.org/downloads">http://plone.org/downloads</a>

- CZUG相關:<a href="http://www.czug.org/docs/plone/plonebook/X_e5_ae_89_e8_a3_85Plone2/view?searchterm=install">http://www.czug.org/docs/plone/plonebook/X_e5_ae_89_e8_a3_85Plone2/view?searchterm=install</a>

- sourceforge 下載:<a href="http://sourceforge.net/projects/plone/">http://sourceforge.net/projects/plone/</a>
