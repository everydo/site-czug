---
created: ''
creator: ''
description: ''
title: site.czug网站示例
---
==========================================================
site.czug改造记录 此纪录作为zopen-cms制作网站的示例。
==========================================================

基础安装
----------------------
#. $ svn co http://zopen-cms.googlecode.com/svn/trunk/demosite site.czug

#. $ cd site.czug

#. $ python boostrap.py

    注意：zc.buildout为1.1.1版本，检查bin/paster脚本中的zc.buildout路径，如不是需手工改之。

#. $ bin/buildout

#. 加入zopen.cms, zopen.frs.core开发包

   在buildout.cfg的[buildout]加上::

    develop = src/zopen.cms
              src/zopen.frs.core

   在buildout.cfg的[bfg]的eggs改为::

    eggs = repoze.bfg
           zopen.cms
           zopen.frs.core

#. $ bin/buildout -N

#. 修改cms.ini: theme_host = http://121.12.175.237:6543

#. 修改cms.ini中的tabs导航栏

皮肤制作themes/index.html
---------------------------
#. 备份demosite皮肤作参考
   $ cp themes/index.html themes/index_demo.html

#. 拷贝原网站页面源代码覆盖到themes/index.html

#. 导航树相关

::

         <!-- 导航树的css -->
        <link type="text/css" href="css/navtree.css" rel="stylesheet"/>

        <!-- 导航树的kss -->
        <script type="text/javascript" src="/resources/thecmsface/js/sarissa.js"></script> 
        <script type="text/javascript" src="/resources/thecmsface/js/base2-dom-fp.js"></script> 
        <script type="text/javascript" src="/resources/thecmsface/js/kukit.js"> </script>
        <script type="text/javascript" src="/resources/thecmsface/js/zopen.js"> </script>
        <link type="text/css" rel="kinetic-stylesheet" href="/static/navtree.kss" media="all" />

#. 去掉原有导航栏代码，改为：<ul id="portal-globalnav"></ul>

#. 去掉原有主体内容，改为::

           <table id="portal-columns">
                <tbody>
                    <tr id="portal-tr">
                        <td id="portal-column-content">
                           <div id="content"></div>
                         </td>
                    </tr>
                </tbody>
            </table>

#. 下载原网站css到本地，修改皮肤中的css路径、图片路径

网站内容导入
----------------------------

#. $ sudo rm contents -R 

#. $ cp /var/zope/zopen.cn/var/frsdump . -R

#. 整理内容的图片及路径

#. 增加左、右边栏。

   在需要左边栏的文件或文件夹的metadata.json中，例如首页::

     {
      "main": {
        "right_col":".. include:: index_right_col.rst",
        "left_col":".. include:: index_left_col.rst",
        "contenttype": "Document",
        "hidden_keys": "img"
          },
      "dublin": {
          "description": "这里是Zope开源web应用服务器和Plone开源内容管理系统的中文技术社区。",
           "title": "欢迎来到中文Zope/Plone用户组！"
        }
      }

   在index_left_col.rst::

       .. navtree:: 
          :root_depth: 2
       
       .. include:: index_links_col.rst 
       .. include:: login.rst

其他
-------------------
zopen-cms教程：http://docs.everydo.com/zopen-cms

