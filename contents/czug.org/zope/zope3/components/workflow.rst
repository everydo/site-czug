
基于活动的工作流
====================
zope.app.workflow
    据说是无人使用，已经废弃了

zope.wfmc
    据说框架很牛，但是很少人去用，有此文可参考

    http://source.schooltool.org/svn/trunk/schooltool/doc/wfmc-workflows.txt

基于文档的工作流
===========================
hurry.workflow，这个很实用的，类似dcworkflow，上面自带了一个多版本的文档工作流，我们会采用这个的。

http://codespeak.net/svn/z3/hurry.workflow/trunk/

http://codespeak.net/svn/z3/hurry.workflow/trunk/src/hurry/workflow/workflow.txt

最小的workflow
======================
有人说不需要什么workflow，基于事件即可：

http://mail.zope.org/pipermail/zope3-dev/2007-March/021968.html

一般来说，工作流引擎都过去复杂了！在SchoolTool项目中，就发现了这个问题。
(Everyone else can read Tom's comment on the SchoolTool-Dev list.)

这来自我们的客户服务经验：
客户需要重写求职应用管理程序。客户说，流程会过于严格，希望能随意修改状态，改变流程。

在这个需求基础上，她希望任意打断流程，所以我们不准备任何流程引擎。

取而代之，我们在应用中添加了状态集合属性。
一旦应用中这个特殊的状态属性发生变化，就分别为添加的删除的状态触发事件。

接下来，我们创建了一个 "policy" 模块，包括多个事件订阅器，来处理。
比如:

- 记录日志
- 发送邮件
- 触发其他的状态
- 权限变更
- 数据校验

下面是代码示例:

1) application::

    class Application(Contained, Persistent):
        ...
        @apply
        def stati():
            """See IApplication"""
            def getStati(self):
                return self._stati
            def setStati(self, value):
                removed = set(self._stati) - set(value)
                added = set(value) - set(self._stati)
                self._stati = tuple(value)
                for item in removed:
                    zope.event.notify(StatusRemovedEvent(self, item))
                for item in added:
                    zope.event.notify(StatusAddedEvent(self, item))
            return property(getStati, setStati)

2) policy::

    @zope.component.adapter(interfaces.IStatusRemovedEvent)
    def historyApplicationStatusRemoved(event):
        log(
            event.object,
            _('Status Removed: $status', mapping={'status': event.status}))

    # Not reacting to a status change, but nevertheless interesting to look at.
    # Yes Martijn, I love hurry.query!

    @zope.component.adapter(interfaces.IApplicationCompletedEvent)
    def applicationCheckForDuplicate(event):
        # When upon completion of the application, another application with same
        # last name, first name and birth date is detected, then this application
        # is marked as duplicate
        app = event.object
        duplicateQuery = query.And(
            query.value.Eq(('app-catalog', 'firstName'), app.firstName),
            query.value.Eq(('app-catalog', 'lastName'), app.lastName),
            query.value.Eq(('app-catalog', 'birthDate'), app.birthDate),
            query.query.Not(
                query.set.AnyOf(('app-catalog', 'stati'), (interfaces.INCOMPLETE,))
                ),
            )

        result = tuple(query.query.Query().searchResults(duplicateQuery))
        # Only mark applications as duplicates, if the application is not itself
        if (len(result) == 1 and app not in result) or len(result) > 1:
            app.stati += (interfaces.DUPLICATE,)

So in fact, our workflow engine is the Zope 3 event framework. I like it for 
the following:

- There is no new framework overhead; use what you know.

- It is maximally flexible. I have control over the way I implement the 
  business logic and the UI. 

- Having all policy in one place (this includes event subscribers to other 
  events as well) provided great oversight. Whenever the customer asks 
  me: "What are the rules for this behavior?" (even though she specified it, of 
  course), I can just go to this one place and give her an answer within a few 
  minutes.

- Easy to test. It is very simple to test each event subscriber in isolation 
  and go through all the cases.

I guess I would not have to say it again, but I really like this pattern.

