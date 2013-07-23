---
created: ''
creator: ''
description: 网页边栏设置、导航树功能设置
title: frs内容制作
---
.. include:: include.rst

frs内容制作
=====================

frs内容在contents文件夹

相关文件：
~~~~~~~~~~~
#. contents 网站内容位置

#. contents/index.rst 首页内容

边栏制作：
~~~~~~~~~~~~~~~~~
在demosite例子中,首页是index.rst，它的边栏内容放在indexcol.rst下。这是因为在index.rst所属文件夹下,有一个.frs文件夹存放了这些信息。
::

   $ vi .frs/index.rst/metadata.json

metadata.json描述了首页index.rst的信息，内容如下：
::

  {
    "main": {
        "left_col":".. include:: indexcol.rst",
        "right_col":"",
        "contenttype": "Document"
    },
    "dublin": {
        "description": "",
        "title": "易度，带您进入互联网工作时代！"
    }
  }

说明：

        #.    在"main"下面有一个"left_col"，它指定了左列，".. include:: indexcol.rst"指的是左列内容包含在index.rst所属目录下的indexcol.rst中。

        #.    在indexcol.rst中通过".. raw:: html"指令加入边栏html代码。

        #.    "right_col"就是右列，设置方法如上。

文件夹导航树：
~~~~~~~~~~~~~~~~~~
在.frs/products/metadata.xml有如下内容：
::

  {
    "main": {
        "left_col": ".. navtree::\n   :root_depth: 2",
        "hidden_keys": [
            "img",
            "index.rst"
        ],
        "contenttype": "Folder"
    },
    "dublin": {
        "description": "",
        "title": "产品信息"
    }
  }

说明：

        #.    "left_col": ".. navtree::\\n   :root_depth: 2"，这一行表示在products的所有未设置"left_col"的子文件或子文件夹的视图都会有左列，且左列包含了导航树。 ":root_depth: 2"表示从contents文件夹开始的第二级文件夹作为导航树的根，显示根以下的当前内容的父目录及兄弟目录。

        #.    "hidden_keys"字段包含的是不想在导航树中显示的子目录或子文件。

注：
~~~~~~~~~
        #.    "left_col"、"right_col"都是向下传递的,或者说是向上依赖的。即，某一文件页面没设置"left_col"，但显示了左列，那是因为它的父目录有设置"left_col"，要让它不显示，可以设置"left_col":""。 所以，如果要某个目录下的所有页面显示左右列，只需在这个目录的matadata.json中设置左右列。

        #.    .frs文件夹包含了.frs文件夹所在目录之下的其他目录或文件的信息。

        #.    皮肤规则的写法介绍：http://docs.everydo.com/deliverance/rules.rst。

        #.    reStructuredText写法入门介绍：http://karronqiu.googlepages.com/ReStructuredText_Primer.html。
