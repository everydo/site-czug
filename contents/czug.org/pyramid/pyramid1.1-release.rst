====================
Pyramid 1.1 正式发布
====================

Pyramid 是一个非常通用的开源Python Web 框架。它的主要目标是让开发人员可以很方便的创建诸如电子表格、企业内网或WEB 2.0的社交网站等任意Web项目。

Pyramid的开发遵循以下宗旨：

\* 简明
    Pyramid基于“pay only for what you eat”的理念构建，即开发人员只需要了解部分Pyramid知识便可完成相应的工作，创建一个应用也无需任何特定的技术。Pyramid努力保证开发人员仅需了解一个最小的核心理念集即可。

\* 扼要
    Pyramid关注于为Web应用开发所面临的URL映射、模板、安全、静态资源使用等基本问题提供快速、高质量的解决方案。

\* 文档
    Pyramid提供即时详尽的文档。

\* 速度
    Pyramid为模板化、应答生成等WEB共性任务提供显著的执行速度。

\* 可靠
    Pyramid的源码管理箴言是“无测即无效”。Pyramid任何发行版本将提供100%的单元测试覆盖率。

\* 开放
    Pyramid采用宽松的许可协议。

本次1.1版本发布主要变更包括：

    1、术语变更
       Paster模板将统一改称scaffolds，而用于页面渲染的模板仍沿用templates的叫法。（Pyramid这次总算舍得将这两模板区分开了。。。）

    2、主要功能点
        pyramid.request.Request类增加了response属性
        增加了paster pviews命令可以查看匹配的view
        支持“静态”路由，add_route增加了一个static参数（这个静态好像定义的不太准确。）
        支持缺省的HTTP异常视图
        可以通过http_cache设置HTTP caching headers
        提供了bootstrap接口可以为在Pyramid环境下编写脚本提供方便
 
需要注意的是Pyramid将不再支持Python 2.4及更低版本，也不支持Python 3的任何版本。


