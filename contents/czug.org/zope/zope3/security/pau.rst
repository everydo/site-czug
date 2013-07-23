.. Contents::
   .. sectnum::

zope3 采用pluaggable的机制进行认证，总体比zope 2的PAS要简单很多.

2类插件
===============

抽取信任状 ICredentialPlugin
   可能从各种渠道获得，这个plugin还负责让用户去输入信息

认证 IAuthenticationPlugin
   将认证信息和数据库中进行比较，确认是否认证

2种找到插件的方法
=====================

包含关系
  在PAU里面创建的插件，可进行配置

命名的utitly
  全局命名的utitly，不需要配置

信任状插件
=====================

HTTP Basic-Auth
   标准的弹出窗口登录，不友好

Session Credential
   可能会弹出登录界面，在session中存放登录信息

FTP Credential
  从ftp中登录

No challenge if authenticated
  如果权限不够，这个在最前面，可避免重复登录

