---
created: 2006-09-15 08:46:54
creator: panjy
description: 提供网站的windows版本的中文Plone打包安装程序，便于推广Plone
title: 中文Plone打包
---
这是社区最大的一个项目，我们希望发布一个**产品化的中文Plone**，包括中文文档、中文补丁支持、中文化的第三方产品打包等。

这个产品非常容易安装，非常容易使用，一般人员拿到这个产品后就可以部署到局域网中，直接使用了。

项目状态 -- 规划

大家可以对这个产品的特性提出请求:

1. 中文的安装界面

2. 安装后自动建立已经中文化的Plone实例，包括界面、中文搜索等

3. 内容中文化：包括邮件通知、首页、个人区首页等

4. 中文文档

From tangwei Wed Mar 3 13:44:01 +0800 2004
From: tangwei
Date: Wed, 03 Mar 2004 13:44:01 +0800
Subject: 请问大概什么时候释出？
Message-ID: <20040304054401+0800@www.czug.org>



From ccube Wed Apr 14 09:44:53 +0800 2004
From: ccube
Date: Wed, 14 Apr 2004 09:44:53 +0800
Subject: 啊
Message-ID: <20040415014453+0800@www.czug.org>

很好，發現了這個項目，這是很有用的打包啊。希望有win 和linux 版本

From hewei Mon Jun 28 21:59:59 +0800 2004
From: hewei
Date: Mon, 28 Jun 2004 21:59:59 +0800
Subject: 还有一个就是第三方产品库
Message-ID: <20040629135959+0800@www.czug.org>

发布的只是核心系统，第三方产品的安装和更新可联机进行。

对于Windows，我认为可以采用类似Active Setup的方式。对于RedHat Linux，可通过yum同步RPM。MDK的RPM包与RedHat制造规范不同，基本不能通用。Debian我不熟悉，应该有完善的系统。

由此看来，要采用最省力的形式，提供不同平台下的支持。我的建议是，将第三方产品的程序下载、文档、补丁、本地化以及针对不同平台的调整通过中心数据库(repository)维护，再通过脚本程序自动生成不同平台的安装包。