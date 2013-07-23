.. Contents::

.. sectnum::

存在问题
================
开发过程中，版本的升级导致管理上非常复杂，需要写升级脚本，有时候，无法知道运行版本是处于那个阶段的。

Schema Manager
=========================
这个是核心，知道如何从一个升级到另外一个。

创建一个generations子包
----------------------------

这里存放升级脚本

设置基准0版本
-----------------------
1. 进入网站根
2. 点击Manage Process链接
3. 点击Database Schames标签

注册generations工具
------------------------
直接使用 zope.app.generations，或者使用我们的::

 from zope.app.generations.generations import SchemaManager

 WorldCookerySchemaManager = SchemaManager(
     minimum_generation =0,
     generation=1,
     package_name=’worldcookery.generations’
     )

注册::

 <utility
     component=".WorldCookerySchemaManager "
     name="worldcookery"
     />


编写进化脚本
------------------
必须叫做evolveN.py::

     1 from  zope.component.interfaces import ObjectEvent
     2 from  zope.app.zopeappgenerations import getRootFolder
     3 from  zope.app.generations.utility import findObjectsProviding
     4 from  zope.app.intid import addIntIdSubscriber
     5 from  zope.app.catalog.catalog import indexDocSubscriber
     6 from  zope.app.component.site import setSite
     7 from  worldcookery.interfaces import IRecipe, IWorldCookerySite
     8 from  worldcookery.search import setupCatalogAndIndices
     9
    10 def evolve(context):
    11      """Setup catalog and indices for fulltext search."""
    12      root = getRootFolder(context)
    13      for site in findObjectsProviding(root, IWorldCookerySite):
    14          sm = site.getSiteManager()
    15          if u’catalog’ not in sm:
    16              setupCatalogAndIndices(ObjectEvent(site))
    17
    18              setSite(site)
    19              for recipe in findObjectsProviding (site, IRecipe):
    20                  addIntIdSubscriber(recipe, ObjectEvent(recipe))
    21                  indexDocSubscriber(ObjectEvent(recipe))
    22              setSite(None)


