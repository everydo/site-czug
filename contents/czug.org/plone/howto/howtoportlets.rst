---
created: 2006-02-19 01:35:44
creator: panjy
description: 定制左右面板，得到个性化的界面
title: 如何定制Plone左右两侧的面板(Portlet)?
---
在plone中，<br />
<ol>
  <li>点击“Plone设置”，进入Plone控制面板；</li>
  <li>点击ZMI，进入ZMI界面</li>
  <li>在Properties标签内，修改“left_slots”和“right_slots”即可</li>
</ol>
<br />
同样，在其他的文件夹的URL后面加上/manage，进入ZMI界面，在Properties标签内，加入“left_slots”和“right_slots”两项，填入对应macro的路径应该可以定制。<br />
<br />
另外，如果安装了CMFContentPanels,也可以直接使用这个工具，所见即所得的添加面板。<br />
