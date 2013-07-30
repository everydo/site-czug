---
created: 2006-09-15 08:46:53
creator: panjy
description: 让Zope/plone支持阴历
title: 阴历支持
---
:项目状态: 讨论
:项目描述: 让Zope/Plone支持阴历

要求
======
1. 阴历支持算法python包，提供API，提供阴历和阳历日历的互算
2. 改进PloneCalendar，支持中文日历

   - 显示阴历年（干支名称、属相、）
   - 显示阴历月, 支持闰月提示
   - 显示日信息，包括：

     - 显示节气
     - 显示中国传统节日：如春节、元宵、端午、清明、重阳等
     - 显示现代节日：如建党节，儿童节

参考
========
`ccal <http://cxterm.sourceforge.net/ccal.html>`__ 一个用python编写的中文日历

能够通过屏幕显示日历，但是不支持节气，没有很好的API接口

代码：

http://svn.czug.org/svn/chinesezope/chinesecalendar/trunk/

阴历支持算法包lunarcalendar接口
=================================
- 提供类似python的calendar包的类似接口. 
- 提供月历和公历的查询接口

  - toLunarYear(year) : 返回阴历的年、干支、属相等名称（dict形式）
  - toSunYear(year): 返回公历年
  - toLunarMonth(year, month): 返回阴历的月份，包括显示是否是闰月
  - toSunMonth(year, month, isRun): 返回公历月
  - toLunarDay(year, month,day): 返回阴历的天信息（年、月、日、节气、节日）(dict形式)

  接口形式可参考dateutil：<a href="https://moin.conectiva.com.br/DateUtil">https://moin.conectiva.com.br/DateUtil</a>

From xyb Thu Feb 19 17:36:19 +0800 2004
From: xyb
Date: Thu, 19 Feb 2004 17:36:19 +0800
Subject: 太阴历是通过天文演算得来的
Message-ID: <20040220093619+0800@www.czug.org>

不能通过一个固定的算法得到。现在的方法都是准备一个事先算好的表格，通过检索来确定。这种检索程序早已有人做过，比如 C 编写的 lunar 和 python 编写的 ccal：
<a href="http://cxterm.sourceforge.net/ccal.html">http://cxterm.sourceforge.net/ccal.html</a>
可以用来参考。


From ccube Thu Mar 25 16:49:09 +0800 2004
From: ccube
Date: Thu, 25 Mar 2004 16:49:09 +0800
Subject: image
Message-ID: <20040326084909+0800@www.czug.org>

這月曆可以做得有趣些。在適當的日子加上background, 如何？用css 做可以不用coding, 或加入兩個lines field 去找適當的圖。

我只是想想中國日曆上那些如新年、清明的圖也能顯示一定很有趣吧了。

From Zoomq Thu Mar 25 18:01:12 +0800 2004
From: Zoomq
Date: Thu, 25 Mar 2004 18:01:12 +0800
Subject: 太阴历比阳历精确!
Message-ID: <20040326100112+0800@www.czug.org>

嗯嗯!就是!阴历能够更加精确的表示当年的天气,所以无法固定算式的,但是也更加人性化!

所以,支持定期到标准的阴历确认机构?获得日历,使用节气图片来显示!

From talw Fri Mar 26 16:38:26 +0800 2004
From: talw
Date: Fri, 26 Mar 2004 16:38:26 +0800
Subject: 一个javascript
Message-ID: <20040327083826+0800@www.czug.org>

忘了在那里找到的了，如果觉得有用，我可以mail给你

From talw Thu Apr 1 13:23:35 +0800 2004
From: talw
Date: Thu, 01 Apr 2004 13:23:35 +0800
Subject: 我写了一个Java类
Message-ID: <20040402052335+0800@www.czug.org>

要将其分开很容易。不过，我觉得对于本项目，还是哪个易经网万年历好一些。好像Plone中的日历也是一个JS。不好意思，刚刚接触Plone,不熟悉。还需要好好学习。说起来，接触Plone还是一个挺有趣的事，那天空了，写出来，让大家在百忙之余笑一笑。

From ccube Wed Apr 14 09:59:57 +0800 2004
From: ccube
Date: Wed, 14 Apr 2004 09:59:57 +0800
Subject: plonecalendar
Message-ID: <20040415015957+0800@www.czug.org>

我看過plonecal 的page template, 所有也是css的，很易改。中文化沒有問題，我已試過了。

用css定義所有節氣/日，在幾個template修改幾行code 便可。難題是要有個好的python function 回傳節日/氣資料。

From Zoomq Wed Apr 14 10:16:32 +0800 2004
From: Zoomq
Date: Wed, 14 Apr 2004 10:16:32 +0800
Subject: 回傳節日/氣資料
Message-ID: <20040415021632+0800@www.czug.org>

其实只要能从记录数据中想到对应的节气,设定相应 td 的 ID CSS 就可以进行处理了!

From lk99 Thu Jun 24 22:02:01 +0800 2004
From: lk99
Date: Thu, 24 Jun 2004 22:02:01 +0800
Subject: MyIE2<a class="new" href="http://members.czug.org/projects/LunarCalendar/createform?page=MyIE2" title="create this page">?</a>有个plugins是Lunar Calendar
Message-ID: <20040625140201+0800@www.czug.org>

是DHTML文件，里面有完整的JavaScript算法，用了CSS显示结果，应该是使用了IE专用CSS属性，导致只能用ie5.5+以上才能看。
这个plugins功能已经很不错了。如果不搞得那么花，应该可以作成any browser.
"Plugins地址"::<a href="http://dl.pconline.com.cn/html/1/8/dlid=12878&dltypeid=1&pn=0&.html">http://dl.pconline.com.cn/html/1/8/dlid=12878&dltypeid=1&pn=0&.html</a>

From hewei Mon Jun 28 21:03:14 +0800 2004
From: hewei
Date: Mon, 28 Jun 2004 21:03:14 +0800
Subject: 这里有人听说过孟卓的ccal吗？
Message-ID: <20040629130314+0800@www.czug.org>

<a href="http://thunder.eeap.cwru.edu/ccal/index.html">自制有农历的日历</a>

From hewei Tue Jun 29 12:27:55 +0800 2004
From: hewei
Date: Tue, 29 Jun 2004 12:27:55 +0800
Subject: 转载孟卓的文章
Message-ID: <20040630042755+0800@www.czug.org>

"漫话阴历":/Members/hewei/lunarcal_intro

From ryebread Mon Aug 23 15:56:52 +0800 2004
From: ryebread
Date: Mon, 23 Aug 2004 15:56:52 +0800
Subject: 有没有一个进度安排表？
Message-ID: <20040824075652+0800@nocache.czug.org>

不知道什么时候会有个产品出来？

From panjy Tue Jan 11 13:56:56 +0800 2005
From: panjy
Date: Tue, 11 Jan 2005 13:56:56 +0800
Subject: Plone的节日日历
Message-ID: <20050111135656+0800@nocache.czug.org>

<a href="http://www.misner.de/downloads/plonepublicholidaycalendar">http://www.misner.de/downloads/plonepublicholidaycalendar</a>