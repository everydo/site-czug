---
created: ''
creator: ''
description: 为什么要使用 Deliverance？它能做什么？它提供什么？它将怎样改变你的 web 开发方式？
title: Deliverance 哲学
---
Deliverance哲学
+++++++++++++++++++++++++++++

:author: Ian Bicking <ianb@openplans.org>

.. contents::

为什么要使用 Deliverance？它能做什么？它提供什么？它将怎样改变你的 web 开发方式？

说说各种平台
===========================

现在，我们活在平台的战国时代.  开发人员 (或者 管理者或 coincidence) 一旦决定使用一个平台, 那么未来的开发将都以这个平台为基础.  通常，有一些从前平台的老的东西(或一个原始的前平台时期的东东: 比方说 ``formmail.pl``!)  目标通常是去除这些老的东东，使用新平台重写。这个目标很少在合适的时候采纳，甚至在完工前你就可能要转移到下一个平台上。

为什么你想把东西都转移到另外一个更新的平台上？恩，可能那个做得更好. 新的平台可能是更多人熟悉的。 但如果这些是唯一的原因，会很难决断将一个可以工作的软件重写。 
真正的推动通常源自各个系统无法在一起工作。很难让各个模板系统在所有平台上都相同。可能需要多次登录。导航可能不一致、不完整。
各个页面都需要的一些公共功能，评注、登录状态、购物车的状态等，无法全局获得。

类似的冲突，可能在你考虑如何给站点添加新功能的时候发生。比如，你可能需要增加一个博客。你是否：

1. 使用最好的博客软件？
2. 使用一些自己平台特有的博客软件？
3. 自己写一个?

答案可能是2或者3，因为太难集成外部的东东到自己的平台了。这个选择形式意味着每个平台都有自己的博客系统，但是那个博客的用户可能仅仅是所在平台用户的一个子集。
这使得很难出现胜利者，一个开发很好的软件很难真正成功。基于平台的软件，会被平台所限制。

不是所有的软件都有一个平台。比如一些非常成功的web应用， `Trac <http://trac.edgewall.org/>`_, `WordPress <http://wordpress.org>`_, 等.

"啊哈!" 你在想 "我将用这些最牛X的应用!"  但不是的!  这些应用自己其实就是一个平台.  WordPress 是一个 CMS.  Trac 也是.  
可扩展的应用, 如果成功, 就变成自己的平台.  并非责怪，一旦有一天他们不比其他的平台差，就可能自己转换为平台，要明白这个。

超越平台，更好的平台
======================================

Deliverance的一个目标是跨越平台。他是一个 *集成工具* , 他让各个框架或者语言的各种应用优雅的集成起来。

人们使用平台，只有这样几个主要的原因：

1. 整个网站一致的外观感觉。
2. 一致的导航。
3. 全网站的索引。
4. 公共的认证和用户帐号。
5. 牛X的特性 (比如，评注).

Deliverance 尤其着眼于 1, 整个站点提供了同一套外观感觉。他能帮助实现 2, 如果导航是集中维护，而不完全依赖某个平台的导航 (虽然平台的导航仍然对导航单个应用仍然非常重要).  3, 4, 和 5 还没有被 Deliverance 涉猎 (至少现在不).

Deliverance 给站点的各个应用套用了一套公共的theme. 
他完全使用 **HTML**, 不需要任何其他的模板语言.  
他根本不知道对象是什么.  HTML是每个应用都生成的东东。
Deliverance的通讯途径是 **HTTP**.  他不需要调用函数或者创建这些请求对象 [*]_.  再说一遍, 都采用 HTTP 通信.

Deliverance 也允许你包括多个位置的输出. 所有的情况下，都有一个 *theme*, 纯的 HTML 页面, 和一个 *content*, 这就是你底层应用返回的。
你也可以包括从网站其他部分的输出，比如那你希望独立管理的导航内容.  
所有这些内容可能是动态的 -- 再次说明, Deliverance 只关注 HTML 和 HTTP, 不管是谁生成的 response.

这个和 XSLT 转换非常类似，只是不需要XSLT [*]_, 也不需要 XML.  
严格的说，你可以使用 XSLT 来处理任何的可解析的标记, 甚至 HTML, 但通常(或者至少通常说过的)的方法是将 XSLT 套用到一个 "语义" XML 输出最终转换为 HTML.  
Deliverance 不需要理解应用的语义, 而是期望他们提供合适的 *展现* , 不管后台应用处理了什么语义.  *展现* 比语义更通用.

当 Deliverance 尽其所能去配合现有应用工作, 而不必对应用做特殊要求的时候，这还不完美。
冲突的CSS可能是一个严重的问题。有些应用没有一个好的结构来配合工作。 
你无法在Deliverance中生成任何内容, 你只能操作现有内容, 
这通常意味着找出更多方法来生成内容，或者确保你有一个地方来存储你的内容 (比如导航).  
这是为什么受到争论的 Deliverance 没有 *去除* 对平台的需要, 反而引入了他自己这个平台.  
到目前为止是这样的，Deliverance尽量去当一个 *更好的* 平台, 但 "更好的" 是 "更通用" 而不是 "更强大".  
大所数模板系统比Deliverance转换强大多了。这对访问底层对象生成标记是非常有用的。但Deliverance不提供你这些东西，因为他只实现了操作内容源代码的东西。
静态文件在Deleiverance中仍然可以工作，使用Python, PHP，甚至完全托管在另外一个服务上的应用同样能通过Deliverance来使用。

遗漏的部分
=================
如上面提到的，2个重要的好处被deliverance遗漏了。我将试图描述我所相信的是至关重要的。
我希望以后Deliverance或者附加应用能够满足这些需求。
Also, I suggest some lines of development that might be easier than others.

全站点索引
------------------------

Typically each application has a notion of what all the interesting pages in that application are.  Most applications have a set of *uninteresting* pages, or transient pages.  A search result is transient, as an example.  An application also knows when new pages appear, and when other pages disappear.  A site-wide index of these pages would allow things like site maps, cross-application search, and cross-application reporting to be done.

An interesting exception to the knowledge an application has of itself: search results are generally boring.  But a search result based on a category might still be interesting.  The difference between a "search" and a "report" is largely in the eye of the beholder.  An important feature is that the application shouldn't be the sole entity allowed to mark interesting pages.  Manually-managed lists of resources that may point to specific applications can allow people to usefully and easily tweak the site.  Ideally even fully external resources could be included, such as a resource on an entirely different site.

To do indexing you need both events (to signal the creation, update, or deletion of an entity/page), and a list of entities (so the index can be completely regenerated).  A simple way of giving a list of entities would be the `Google Site Map XML resource <https://www.google.com/webmasters/tools/docs/en/protocol.html#sitemapXMLFormat>`_.  Signaling events is much more complex, so I won't go into it in any greater depth here, but we're working on a product called `Cabochon <http://www.openplans.org/projects/cabochon/>`_ to handle events.

One thing that indexing can provide is a way to use `microformats <http://microformats.org/>`_.  Right now microformats are interesting, but for most sites they are largely useless.  You can mark up your content, but no one will do anything interesting with that markup.  If you could easily code up an indexer that could keep up-to-date on all the content on your site, you could produce interesting results like cross-application mapping.

共享的认证和用户帐户
---------------------------------------
Authentication is one of the most common and annoying integration tasks when crossing platform boundaries.  Systems like `Open ID <http://openid.net/>`_ offer the ability to unify *cross-site* authentication, but they don't actually solve the problem of a single site with multiple applications.

There is a basic protocol in HTTP for authentication, one that is workable for a system like Deliverance, and there are already several existing products (like `repoze.who <http://svn.repoze.org/repoze.who/trunk/>`_) that work this way.  It works like this:

* The logged-in username is sent in some header, e.g., ``X-Remote-User``.  Some kind of signing is necessary to really trust this header (Deliverance could filter out that header in incoming requests, but if you removed Deliverance from the stack you'd have a security hole).

* If the user isn't logged in, and the application wants them to log in, the application response with a ``401 Unauthorized`` response.  It is supposed to set the ``WWW-Authenticate`` header, probably to some value indicating that the intermediary should determine the authentication type.  In some cases a kind of HTTP authentication is required (typically `Basic <http://en.wikipedia.org/wiki/Basic_access_authentication>`_ or `Digest <http://en.wikipedia.org/wiki/Digest_access_authentication>`_) because cookie-based logins are too stateful (e.g., in APIs, or for WebDAV access).

* The intermediary catches the 401 and initiates the login process.  This might mean a redirect to a login page, and setting a cookie on successful login.  The login page and setting the cookie could potentially be done by an application outside of the intermediary; the intermediary only has to do the appropriate redirects and setting of headers.

* In the case when a user is logged in but isn't permitted, the application simply sends a ``403 Forbidden`` response.  The intermediary shouldn't actually do anything in this case (though maybe it could usefully add a logout link to that message).  I only mention this because some systems use ``401`` for Forbidden, which causes no end of problems.

While some applications allow for this kind of authentication scheme, many do not.  However, the scheme is general enough that I think it is justifiable that applications could be patched to work like this.

This handles shared authentication, but the only information handed around is a username.  Information about the user -- the real name, email, homepage, permission roles, etc -- are not shared in this model.

You could add something like an internal location to the username.  E.g.: ``X-Remote-User: bob; info_url=http://mysite.com/users/bob.xml``.  It would be the application's responsibility to make a subrequest to fetch that information.  This can be somewhat inefficient, though with appropriate caching perhaps it would be fine.  But many applications want very much to have a complete record of all users.  Changing this is likely to be much harder than changing the authentication scheme.  A more feasible system might be something on the order of what is described in `Indexing the Entire Site`_: provide a complete listing of the site as well as events when users are created, updated, or deleted, and allow applications to maintain their own private but synced databases of users.

A common permission system is another level of integration.  One way of handling this would be if applications had a published set of actions that could be performed, and the person integrating the application could map actions to roles/groups on the system.

跨应用功能
---------------------------

This item requires a bit of explanation.  This is functionality that cuts across multiple parts of the site.  An example might be comments, where you want a commenting system to be applicable to a variety of entities (though probably not all entities).  Or you might want page-update notification, or to provide a feed of changes to the entity.

You might also want to include some request logger like `Google Analytics <http://www.google.com/analytics/>`_ to all pages, but this is already handled well by Deliverance theming.  Deliverance's aggregation handles universal content well, but it doesn't handle content (or subrequests) that should only be present in a portion of pages.

One possible way to address this is `transclusion <http://en.wikipedia.org/wiki/Transclusion>`_, where a page can specifically request some other resource to be included in the page.  A simple subrequest could accomplish this, but many applications make it relatively easy to include some extra markup (e.g., by editing their templates) but not so easy to do something like a subrequest.  We've written a product `Transcluder <http://www.openplans.org/projects/transcluder/>`_ to use an HTML format to indicate transclusion.

It's also possible using Deliverance that you could implement this functionality without any application modification, though it means added configuration -- an application written to be inserted into a page via Deliverance, and a Deliverance rule that plugs everything together (but if written incorrectly would have to be debugged).

其他约定
-----------------

In addition to this, other platform-like conventions would make the life of the integrator much easier.

模板定制
~~~~~~~~~~~~~~~~~~~~~~

While Deliverance handles the look-and-feel of a page, it leaves the inner chunk of content to the application.  If you want to tweak something small you will still need to customize the template of the application.

It would be wonderful if applications could report on what files were used in the construction of a request, and used a common search path so you could easily override those files.

备份和其他维护
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Process management can be handled by something like `Supervisor <http://supervisord.org/>`_, and maybe in the future Deliverance will even embed Supervisor.

But even then, regular backups of the system are important.  Typically each application has its own way of producing a backup.  Conventions for producing backups would be ideal.  Additional conventions for restoring backups would be even better.

Many systems also require periodic maintenance -- compacting databases, checking for any integrity problems, etc.  Some unified cron-like system might be handy, though it's also workable for applications to handle this internally in whatever ad hoc way seems appropriate.

通用的错误处理
~~~~~~~~~~~~~~~~~~~~~~

With a system where one of many components can fail, it's important to keep track of these problems.  If errors just end up in one of 10 log files, it's unlikely anyone is closely tracking them.

One product we're working on to help with this is `ErrorEater <https://svn.openplans.org/svn/ErrorEater/trunk/>`_, which works along with `Supervisor <http://supervisord.org/>`_.  Applications have to be modified to emit errors in a specific format that Supervisor understands, but this is generally not too difficult.

子站点
~~~~~~~

Application farming is when one instance of an application can support many "sites".  These might be sites with their own domains, or just distinct projects.  Examples are `Trac <http://trac.edgewall.org/>`_, which supports multiple projects in one instance, or `WordPress MU <http://mu.wordpress.org/>`_ which supports many WordPress instances running off a single database and code base.

It would be nice if you could add a simple header to a request, like ``X-Project-Name: foo`` and that would be used by all these products to select the site (or sub-site or project or any other organization unit).  Then mapping domain names, paths, or other aspects of a request to the project could be handled once and the applications could all consistently consume it.

(Internally for `openplans.org <http://openplans.org>`_ we're using ``X-OpenPlans-Project`` and custom patches to several projects to support this, but it's all ad hoc.)

脚注
=========

.. [*] This isn't entirely true, Deliverance internally uses `WSGI <http://wsgi.org/wsgi/>`_ which is a Python-level abstraction of HTTP calls.

.. [*] At different times in the past, and potentially again in the future, Deliverance has been compiled down to XSLT rules.  So Deliverance could be seen even as an simple transformation language that compiles down to XSLT.
