---
created: ''
creator: ''
description: 网站皮肤、规则用法说明
title: 皮肤制作
---
.. include:: include.rst

皮肤制作
=====================

皮肤是指一个站点中各个页面都会有的基本元素的组合，如页眉、导航栏、页脚等

主要相关文件：
-------------------
#. rules.xml 网站界面基本过滤规则，由cms.ini中的rule_uri指定。

#. themes是网站皮肤所在文件夹，其中，themes/index.html就是网站皮肤，由cms.ini中的theme_uri指定。

重要的皮肤代码
-------------------------------
在themes/index.html中只有基本的内容，如页眉、页脚等。还有一些用于装载内容的空标签（重要）：

如在<body>标签下 ::

  <table id="portal-columns">
     <tbody>
       <tr id="portal-tr">
          <td id="portal-column-content">
             <div id="content"></div>
          </td>
      </tr>
    </tbody>
  </table>

<div id="content"></div>就是要装载网页主题内容的标签，它是必需的。在rules.xml中可以看到它的用处。

导航栏空标签是::

   <ul id="portal-globalnav"></ul>

导航树相关的css代码::

        <!-- 导航树的css -->
        <link type="text/css" href="css/navtree.css" rel="stylesheet"/>

        <!-- 导航树的kss -->
        <script type="text/javascript" src="/resources/thecmsface/js/sarissa.js"></script> 
        <script type="text/javascript" src="/resources/thecmsface/js/base2-dom-fp.js"></script> 
        <script type="text/javascript" src="/resources/thecmsface/js/kukit.js"> </script>
        <script type="text/javascript" src="/resources/thecmsface/js/zopen.js"> </script>
        <link type="text/css" rel="kinetic-stylesheet" href="/static/navtree.kss" media="all" />

