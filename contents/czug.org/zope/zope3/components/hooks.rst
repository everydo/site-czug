hooks: 最佳的补丁管理

比如标准的zope.component.getSiteManager有一个处理方式

现在需要从当前的site中找到站点，因此就hook了一把

    zope.app.component.hooks.setHooks()

