Zope 2.7.0

Zope 是開源應用伺服器。你可以用這伺服器建立內容管理、內聯網、portals, 及其它網上軟件。Zope是由　Python: <a href="http://www.python.org/">http://www.python.org/</a> 建立而成。

如果你覺得這一大埋東西很複雜，不用管它，立即安裝，ｚｏｐｅ和ｐｙｔｈｏｎ，然後跳去Plone那部份。


**安裝Zope**

1 下載:<a href="http://zope.org/Products/Zope/2.7.0/Zope-2.7.0-win32.exe">http://zope.org/Products/Zope/2.7.0/Zope-2.7.0-win32.exe</a>

2 執行剛下載檔案。 

image:: zinstall1.png

按”下一步”。你要同意Zope的版權再按”下一步”。因為你可以在同一台電腦上安裝多過一個Zope，你要使用一個獨有的”站名”給每個Zope。缺省的名字是"WebSite<a class="new" href="http://members.czug.org/plone/quickguide/X_e5_ae_89_e8_a3_9dZope/createform?page=WebSite" title="create this page">?</a>"。建議你改變這名字。

再按”下一步”選擇你的站名。你然後要選取安裝Zope的文件夾。一個適當的選擇是"c:\Program Files\Zope"。完成後按"下一步”。你將要製造一個新的Zope用戶。這並不是Operating System用戶，只是一個對Zope有用的用戶。這用戶是起始用者（或”超級用者”）及用作第一次登入之用。所以這戶口會有管理者特權。你可以修改這用者的名字及密碼。一個適合的選擇給這起始用者是”admin".

image:: zinstall3.png

image:: zinstall5.png

image:: zinstall7.png

當複製檔案完成後，如果你是使用Windows NT, Windows 2000, 或 Windows XP, 你將會看見一個對話盒以選取是否執行Zope為一個Service. 如你只是當作個人用途，不要將它作成一個Server（過程較複雜和需要多些資源。）。如果你是使用Windows ９５, Windows ９８, 或 Windows ME, 你並不可以執行Zope為一個Service。建議你第一次運行Zope時不要選取Service。

image:: zinstall８.png

你按”下一步”後，安裝程式會顯示你安裝成功。按”完成”．如果你將來決定要移除Zope，你可以使用Unwise.exe 程式，你可以在你選擇安裝Zope的文件來內找到。


3.　開始Zope

如果你使用”手動執行”(執行為Service的相反），使用檔案管理去瀏覽你安裝Zope的文件夾(一般是 c:\Program Files\Zope　或　c:\Program Files\WebSite<a class="new" href="http://members.czug.org/plone/quickguide/X_e5_ae_89_e8_a3_9dZope/createform?page=WebSite" title="create this page">?</a>)。在這文件夾內，找一個名字是 start.bat 的檔案。雙按 start.bat圖示，一個console視窗將會跳出。這會顯示startup 資料。



- <a href="http://members.czug.org/plone/quickguide/X_e9_80_b2_e9_9a_8eZope_e5_ae_89_e8_a3_9d" title="" style="background-color:;">進階Zope 安裝</a>

...


- 相關

    - 官方主頁:<a href="http://zope.org/">http://zope.org/</a>

    - CZUG相關:<a href="http://">http://</a>

    - 介紹:<a href="http://zope.org/Products/Zope">http://zope.org/Products/Zope</a>

    - [RestructuredText(remove it later)]:http://docutils.sourceforge.net/docs/rst/quickref.html

From panjy Tue Mar 23 13:11:37 +0800 2004
From: panjy
Date: Tue, 23 Mar 2004 13:11:37 +0800
Subject: Plone的安装包中已经包含了zope/python的安装
Message-ID: <20040324051137+0800@www.czug.org>

Plone的windows安装包中已经包含了zope/python的安装(我没记错的话)，因此，我觉得简化起见，这章是没有必要写的。安装简单是Plone的特色之一。