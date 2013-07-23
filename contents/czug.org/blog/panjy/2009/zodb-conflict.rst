---
created: 2009-12-12 16:58
creator: 潘俊勇
description: ''
title: ZODB的冲突解决
---
=========================================
ZODB的冲突解决
=========================================

一般的关系数据库，进行写操作之前，都会先锁住。

但是在ZODB，会采用的类似cvs/svn的方式，不是强制锁，而是事后检查merge，再提交:

检查对象是否修改了，如果发现修改了，然后停下来，设法解决冲突，如果解决成功，那就成功提交。否则，抛出异常。

如何解决冲突，对象需要有这样一个方法::

    def _p_resolveConflict(self, oldState, savedState, newState):

        # Figure out how each state is different:
        savedDiff= savedState['count'] - oldState['count']
        newDiff= newState['count']- oldState['count']

        # Apply both sets of changes to old state:
        newState['count'] = oldState['count'] + savedDiff + newDiff
        return newState

oldState是进行事务前的对象，savedState是现在发生冲突实际保存的对象，newState是新的状态。

什么是状态？看看标准的pickle(一般就是对象的__dict__的值)：

http://docs.python.org/library/pickle.html#the-pickle-protocol

需要注意的是，如果采用ZEO的方式，冲突的解决是在服务器端进行的。这样，就必须将 ``_p_resolveConflict`` 所在的包，在ZEO的进程中包含，否则不会起作用。一个简单的方法是调整ZEO的buildout配置::

 [zodb]
 recipe = zc.recipe.egg:script
 eggs = ZODB3
        zope.minmax
        zc.queue

详细参看: http://www.zope.org/Documentation/Articles/ZODB2

