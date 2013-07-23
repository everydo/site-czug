.. Contents:: 
.. sectnum::

容器包含关系
==================
类似Windows资源管理器中对象之间的包含关系

容器关系是Zope默认的Model对象发布定位依据

ZODB的根节点就是最顶层的容器

容器包含关系访问
=================
container.keys()
    查看容器所包含对象的id清单

container.values()
    返回包含的对象清单
 
container[id] = obj
    把对象存放到容器中

id in container
    判断容器里面是否存在id

container[id]
    得到名字为id的包含对象

container.get(id, default)
    带默认值的get

del container[id]
    从容器中删除一个对象

容器关系反查询
=================
from zope.traversing.api import getParent, getName

getName
    得到对象存放时候的名字，一般存放在__name__属性中

getParent
    得到父对象，一般存放在__parent__属性中

常用的容器基类
=========================
zope.app.container.btree.BTreeContainer
    支持大量数据，不可排序的容器

zope.app.container.ordered.OrderedContainer
    可排序的容器，不适合大量数据

zope.app.folder.Folder
    可转换为站点site的文件夹

选名字
===================
名字经常会出现重复或者非法的情况，如果重名，需要提供一个解决重名的方法，比如 file-1.html 之类。

Zope已经提供了，如果需要在container上选择一个名字，可以这样::

 from zope.app.container.interface import INameChooser

 # 检查名字是否合法
 INameChooser(context).checkName(new_name, None)

 # 到一个新名字
 new_name = INameChooser(context).chooseName(new_name, obj)

如果得到这个安全的名字，就可以放心后续的操作了::

 contaner[new_name] = obj
