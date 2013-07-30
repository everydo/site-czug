---
created: 2006-02-19 01:35:24
creator: panjy
description: 抛砖引玉，希望更多贡献
title: Plone开发调试的常用技巧
---
<ol>
<li>  调试的时候，采用Debug模式运行Zope（加-D参数）。优点在于：
<ul><li>能查看终端的错误输出</li><li>CMF/Plone内容产品中skin，如果基于文件系统构建，当发生变化，Zope会自动刷新新的版本。（这个很方便！）</li></ul>
</li><li> 在产品目录下，添加refresh.txt文件，这样如果产品代码发生改变，在Control Panels中可以刷新产品，而不必重新启动zope</li><li> 查看error_log，在ZMI根目录下有个error_log</li><li> 安装VerboseSecurity这个产品，可以帮助您查找权限方面的错误</li>
</ol>
