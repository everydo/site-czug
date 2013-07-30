按此观看简体版本_

.. _按此观看简体版本: X_e4_b8_aa_e4_ba_ba_e5_8c_96_e5_9f_ba_e6_9c_ac_e8_ae_be_e5_ae_9a


Plone 的安裝完成後，便要設定一個能應付自己問題和有個人風格的Plone了。

首先，在Plone Controller 按"Zope Management Interface" 啟動Zope的管理介面(ZMI)

.. image::zopestart.jpg
     :align: center 

鍵入你的起始用者和密碼便可登入ZMI

此頁內容包括：

- 基本外觀_: 網站標題圖案, 和外觀顏色。

    1 `網站標題圖案`_: 網站左上方的圖示

    2 `個人風格設定 - base_properties`_: 最簡單的方案

    3 `個人風格設定 - css`_: 最全面方案

- 個人喜好設定_: 網站面板和格子

    1 `slots 面板`_: 設定基本組件

    2 `tabs 格子`_: 細緻的修改

基本外觀
==========

網站標題圖案
-------------

在ZMI 瀏覽至Plone的文件夾位置

.. image:: zmiplone.jpg
     :align: center 


在右上方的選擇項中選取Image, 然後在新出現的頁面，Id 鍵入"logo.jpg". 在File 欄開啟你要的圖像檔案，可以是任何圖案格式, 如.jpg, .bmp, .png

.. image:: addlogo.jpg
     :align: center 

**完成**

.. image:: mysitelogo.jpg
      :width: 500
      :height: 375
      :align: center
      :alt: 網站圖示

觀看網站圖示全圖_
      
.. _觀看網站圖示全圖: mysitelogo.jpg



個人風格設定 - base_properties
-----------------------------

base_properties 是為了讓管理員不改動編碼也可設定外觀而設。方便得很。

在zmi瀏覽至Plone>portal_skins>plone_styles, 選取"base_properties"

.. image:: select_base_properties.jpg
     :align: center 

按"customize"鍵, base_properties便會自動放在custom 文件夾內。

你可以設定每項外觀的相關值，建議先嘗試將backgroundColor改為"Blue"

.. image:: zmi_base_properties.jpg
     :align: center 

此外，我還改動其他顏色，結果

.. image:: mysite_base_properties.jpg
      :width: 500
      :height: 375
      :align: center
      :alt: 網站base_properties

觀看網站base_properties全圖_
      
.. _觀看網站base_properties全圖: mysite_base_properties.jpg


個人風格設定 - css
-------------------

CSS 是Plone外觀的核心，你學懂CSS 後，便可控制每部份的位置，排位等設定。

在ZMI 瀏覽至 Plone>portal_skins>custom 的文件夾位置 (custom 是主要放置自己編碼的地方)

.. image:: zmicustom.jpg
     :align: center 

在選取項中選擇DTML Method

.. image:: selectdtml.jpg
     :align: center 

在新的頁面Id欄鍵入"ploneCustom.css" 然後按"Add and Edit"

.. image::zmiploneCustom.jpg
     :align: center 

你的新StyleSheet將會產生，你所要做的是在文字欄中鍵入你的外觀設定 CSS 編碼 例如::

        body {
           background:blue;
        }

修改完成後按"Save"鍵便可

我"偷取"了czug.org 的ploneCustom.css用在自己的網站上(這是很強的功能，你可以直接取下其他網站的.css 留為己用，再作修改。當然，一定要得站長同意，否則，版權自付)

.. image:: zmicustomczug.jpg
     :align: center 

**結果**

.. image:: mysitecustom.jpg
      :width: 500
      :height: 375
      :align: center
      :alt: 網站css

觀看網站css全圖_
      
.. _觀看網站css全圖: mysitecustom.jpg


**注意**

如果在custom文件夾內同時有ploneCustom.css 和base_properties，結果一般可以假設成 **優先使用ploneCustom.css** ，因為ploneCustom.css 會覆蓋掉大部份外觀設定。即是假如你在css 和base_properties 中也有background color 的設定，base_properties便未必能發揮效用了。


按此至Plone外观定制实战_

.. _按此至Plone外观定制实战: <a href="http://www.czug.org/docs/plone/skin-guide">http://www.czug.org/docs/plone/skin-guide</a>


個人喜好設定
============

slots 面板
------------

面板是指網站左面和右面一個個的"盒子"。你可以在自己的網站使用/停用預設的面板。


在ZMI 瀏覽至Plone 文件夾，然後按"properties" 格

.. image:: zmi_properties.jpg
     :align: center 

左面的面板是left_slots, 右的便是right_slots。你可以嘗試將右面的calendar_slot 放在左面的面板中

.. image:: zmi_slots.jpg
     :align: center 

結果右面的月曆便會走到左面了！

可在此找到 面板詳情_

.. _面板詳情: <a href="http://www.czug.org/docs/plone/plonebook/X_e5_ae_9a_e5_88_b6Plone2/view?searchterm=slots">http://www.czug.org/docs/plone/plonebook/X_e5_ae_9a_e5_88_b6Plone2/view?searchterm=slots</a>

你還可以 建立自己的面板_

.. _建立自己的面板: <a href="http://www.czug.org/docs/plone/plonebook/X_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf_e6_8a_80_e6_9c_af#slot">http://www.czug.org/docs/plone/plonebook/X_e9_a1_b5_e9_9d_a2_e6_a8_a1_e6_9d_bf_e6_8a_80_e6_9c_af#slot</a>


tabs 格子
-----------

有沒有留意czug 上的主頁、文檔、產品等格子，和你的網站是不同的。其實你可以加入自己的格子。

瀏覽至Plone>portal_actions

移至最下方，鍵入以下數值

.. image:: zmi_portal_actions.jpg
     :align: center 

按"Add"鍵後便可有一個雅虎連結了！

你還可以修改其他數值，看看有什麼變化！(小心Permission和condition的設定，可能令你難以返回相關位置)


相關
====

修改tabs: <a href="http://www.czug.org/docs/plone/howto/HowToChangeTheTabs/view?searchterm=tabs">http://www.czug.org/docs/plone/howto/HowToChangeTheTabs/view?searchterm=tabs</a>

Plone Book Chapter 6(Style): <a href="http://plone.org/documentation/book/6">http://plone.org/documentation/book/6</a>