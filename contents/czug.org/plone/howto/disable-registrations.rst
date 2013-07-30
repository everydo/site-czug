---
created: 2006-02-19 01:39:05
creator: panjy
description: 如何禁止网站的注册功能
title: 如何取消新用户注册功能
---
<p>屏蔽用户注册功能的系统定制步骤如下：</p>


<ul>
<li>进入Plone站点ZMI，打开portal_registration </li><li>取消选中action “join”的属性visible。 </li>
</ul>

<p>此时个人工具栏中就不会再出现注册的链接了。</p>

<p>但这属于比较简单的定制，仅仅是在界面上屏蔽了注册 这个链接。只有修改相关权限定义，才真正可以对匿名用户关闭注册功能。</p>

<p>从action join可以看到，注册功能相关权限是Add Portal Member，这里只要取消匿名用户拥有此权限即可:</p>


<ul>
<li>回到Plone站点ZMI，点击Security标签页；</li><li>找到Add Portal Member权限所在行，在Anonymous列上取消选中复选框即可。<p>  <i>但要确保Manager拥有此权限，否则没有人可以创建用户了 </i></p>
</li>
</ul>
