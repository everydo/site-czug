KSS在Zope3中使用

.. Contents::
.. sectnum::

引入KSS
=============

在eggs产品的setup.py中加入：
::

 install_requires = [..
                     'kss.core',
                     'zopen.kssaddons',
                      ]

configure中引入： ::

 <include package="kss.core" file="meta.zcml" />

 <include package="kss.core" />

 <include package="zopen.kssaddons" />

KSS开启调试模式：@@kss_devel_mode

使用KSS
==============

使用Viewlet方式
-----------------
(1)先定义一个.kss文件 ::

 touch addxp.kss

(2)在confingure.zcml中加入资源: ::

   <zrt-resource
     name="addxp.kss"     //资源名
     file="resources/addxp.kss"　　//资源所在地
     layer = "zopen.edo.oc.core.layer.IInstanceBrowserLayer"
     />
 
   <viewlet
     name="addxp.kss"　　//资源名
     for="*"　　　　　　　//对于所有的内容对象　
     class=".AddxpKss"   //在__init__.py中定义的AddxpKss
     weight="1"
     permission="zope.Public"
     layer = "zopen.edo.oc.core.layer.IInstanceBrowserLayer"
     />

(3)在__init__.py中加入以下定义：::

   AddxpKss = CSSViewlet('addxp.kss', rel='kinetic-stylesheet')

(4)KSS ::

 form:submit {
    action-client: toggleClass;
    toggleClass-kssSelector: css(...); //htmlid(...)
    toggleClass-value: hideme;
   }

使用页面加载方式
----------------

configure中定义资源： ::

 <browser:resource
      name="deletion.kss"
      file="deletion.kss"
      />

页面中加载： ::

 <tal:kss_javascript replace="structure context/@@kss_javascript" />
 
 <link type="text/css" rel="kinetic-stylesheet" href="/@@/deletion.kss" />

