---
created: 2006-02-19 01:39:36
creator: panjy
description: 如何在登录一次后, 以后打开浏览器能自动登录
title: 如何让用户自动登陆到网站？
---
在plone的ZMI下的portal_properties/site_properties中，有一个属性：
<b>auth_cookie_length</b>，表示登录验证cookie的时间长度，缺省为0。<br />
<br />
比如可以将这个值设置成为2000，便可实现自动登录。<br />
<br />
