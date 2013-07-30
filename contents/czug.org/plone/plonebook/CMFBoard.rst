
Plone上最优秀的讨论区产品，被<a href="http://mars.telascience.org/home">火星探测器漫游者</a> 网站采用。

基本情况

  作者信息 -- Nikolay Kim <a href="mailto:fafhrd@datacom.kz">fafhrd@datacom.kz</a>

  产品主页 -- <a href=""http://www.cmfboard.org"><a href="http://www.cmfboard.org">http://www.cmfboard.org</a></a>

  下载地址 -- <a href=""http://sourceforge.net/project/showfiles.php?group_id=55262&package_id=98783"><a href="http://sourceforge.net/project/showfiles.php?group_id=55262&package_id=98783">http://sourceforge.net/project/showfiles.php?group_id=55262&package_id=98783</a></a>

     请访问<a href="http://cvs.sourceforge.net/viewcvs.py/collective/CMFBoard/">CVS</a>以获取最新版本

  许可方式 -- ZPL

  安装要求 -- Zope 2.6.2+ , Plone 2.0+、ArcheTypes 1.2.4 

功能特性

 * 支持邮件列表功能，可订阅论坛动态、回复，可通过邮件直接发贴、回贴；

 * 可替代Plone原有的讨论功能，基于CMFBoard对页面文档、新闻等进行讨论；

 * 支持多种权限策略、更容易满足你的个性化需要；

 * ......

系统配置

 <a href="http://members.czug.org/plone/plonebook/CMFBoard" title="" style="background-color:;">CMFBoard</a> Discussion Tool -- 管理员打开Plone系统设置界面，可看到'<a href="http://members.czug.org/plone/plonebook/CMFBoard" title="" style="background-color:;">CMFBoard</a> Discussion Tool'，打开后如图所示，如选中则说明系统支持用CMFBoard代替原来一般文档的讨论评注功能。

 <a href="http://members.czug.org/plone/plonebook/CMFBoard" title="" style="background-color:;">CMFBoard</a> configuration  -- 管理员打开Plone系统设置界面，可看到'<a href="http://members.czug.org/plone/plonebook/CMFBoard" title="" style="background-color:;">CMFBoard</a> configuration'，需要设置两个参数：

   * Allow creation of ForumNB<a class="new" href="http://members.czug.org/plone/plonebook/CMFBoard/createform?page=ForumNB" title="create this page">?</a> outside of "Forum Folder"：是否允许自己直接添加内容类型'FormNB<a class="new" href="http://members.czug.org/plone/plonebook/CMFBoard/createform?page=FormNB" title="create this page">?</a>'--主板，而并不必须在'Form Folder'内创建。

   * Allow member signatures：是否允许定义自己的签名档。

 讨论区参数设置 -- 管理员打开讨论区，点击'讨论区'编辑内容标签，可以清楚得看到需要设置的参数信息。

 讨论区状态设置 -- 讨论区缺省支持5种状态：

   * **member** 只有成员角色可以发贴、阅读；
   
   * **public1** 只有成员角色用户可以发贴，匿名用户仅可阅读帖子；

   * **public2** 与'public1'类似，但匿名用户可回贴； 

   * **open** 与'public2'类似，但匿名用户可发贴； 

   * **custom** 用于管理员定制以满足特殊权限策略要求。

   对于内部网应用，用户登录后即具有系统Member角色，所以一般情况下，设置讨论区状态为**member**就可以了。

操作使用

   创建讨论区的方式一般是首先在指定文件夹'添加新内容'菜单中选择'讨论区主文件夹'，然后在该文件夹中再选择添加'讨论区'内容类型，创建多个讨论区后的样子如图示。