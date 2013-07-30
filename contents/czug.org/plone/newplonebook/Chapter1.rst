---
created: 2006-08-23 22:11:40
creator: panjy
description: ''
title: Chapter1
---
第一章 
----------------------

.. Contents:: 内容：

(Introducing Plone)

介绍Plone
=================

(A company without a Web site is unthinkable and most companies and organizations have more than one site. Whether it's an external site for communicating with clients, an intranet for employees to use, or a site for direct client communication and feedback, all Web sites have a common problem how to manage the content on them. This is a challenge that can often cost organizations large amounts of time and effort. Producing a powerful yet flexible system for these sites that meets ever-changing requirements while growing to meet your company's emerging needs isn't easy.)

一个没有网站的公司是不可想象的，绝大多数的公司和组织不只拥有一个网站。不管是用于和客户沟通的外部网，或是员工使用的内部网，或者用于和客户直接沟通和反馈的网站，所有的网站都有一个共同的问题：如何管理网站上的内容。这很容易耗费组织机构的大量的时间和精力。为了这些网站，构建一个功能强大而且具备“柔性”的系统，以适应不断变化的需求，而且能够根据公司出现的新需求能够程序扩展，并不容易。(译：潘俊勇)

No matter what the requirements for your Web site are or the amount of content or users, Plone is a user-friendly, powerful solution that lets you easily add and edit any type of content through the Web, produce navigation and searches for that content, and apply security and workflow to that content.

不管你的网站有什么需求，或者内容有多大量，或者用户有多少，Plone始终是一个用户友好的、功能强大的方案。他让你在web上，轻松地添加和编辑任意类型的内容，对这些内容进行导航和查询，并对内容进行权限管理和工作流管理。(潘俊勇)

Plone enables you to put together almost any Web site and easily update it. This lets you build content-rich sites quickly so you can gain a competitive advantage. Finally, probably the best things about this system are that it's free and it's open source. With its large and impressive feature set, it's comparable, if not better than, many closed-source content management systems that cost hundreds of thousands of dollars.

通过Plone，您可将几乎任意的网站集中起来，并能够轻松的更新。这让你能够很快构建内容丰富的网站，因而你能获得一个竞争优势。最后，这个系统最重要的事情可能是，他是免费的和开放源代码的。以其大量印象深刻的特性集合，Plone可以和很多耗资几十万的封闭源代码的内容管理系统相抗衡，如果不说优于他们的话。(潘俊勇)

Mike Sugarbaker says the following when reporting on the Open Source Content Management Conference (OSCOM) in 2002 for the Mindjack site (*<a href="http://www.mindjack.com/events/oscom.html">http://www.mindjack.com/events/oscom.html</a>*):

Mike Sugarbaker在2002年“开源内容管理会议(OSCOM)”上，为Mindjack网站做了如下报告：

"I won't do the complete rundown of all the 'competing' open-source content management frameworks. I'll cut to the chase: The winner is Plone. This 'productized' take on the six-year-old web application framework Zope was the package with the most tools, the most professionalism, the most traction, and, above all, the most buzz."

“我不想对所有最优秀的开源内容管理框架做一个完整的比较。我只想做这个结论：Plone是胜利者。他是产品化的，基于开发了6年的、有大部分工具的Zope web应用框架，他最专业、最有吸引力，而且，最重要的，最具价值” (潘俊勇)

You can find the Plone Web site at *<a href="http://www.plone.org">http://www.plone.org</a>*, as shown in Figure 1-1. To try Plone easily, a demonstration site is available at *<a href="http://demo.plone.org">http://demo.plone.org</a>*. There you can quickly and easily add and edit content through the Web. Specifically, you can add events, upload pictures, add documents, and process them all through the framework that Plone provides.

你可访问Plone网站: *<a href="http://www.plone.org">http://www.plone.org</a>*, 如图1-1所示。如要方便的试用Plone，可使用一个演示网站： *<a href="http://demo.plone.org">http://demo.plone.org</a>*. 这里你可以在网站上，快速的、方便的添加和编辑内容。如，你可以添加事件，上载图片，添加文档，全部通过Plone提供的框架完成。(潘俊勇)

 .. image:: img/3294f0101.png
    :width: 700

Figure 1-1. The Plone Web site
图 1-1 Plone网站

(What Is a Content Management System?)

什么是内容管理系统?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One simple definition for a Content Management System (CMS) is that it's a system for managing content. This is a rather unhelpful definition, so I'll break it down into smaller parts for a fuller explanation. I'll start with a broad definition of *content*: Content is a unit of data with some extra information attached to it. That piece of data could be a Web page, information about an upcoming event, a Microsoft Word document, an image, a movie clip, or any piece of data that has meaning to the organization deploying the system.

内容管理系统（CMS）的一个简单定义是管理内容的系统。但这是一个毫无帮助的定义，因此我将把他细化为一些更小的部分依次解释。首先， *内容* 的一个广义定义是：内容是一个包括一些附加信息的数据单元。这个数据可以是网页、将要发生的事件、一个微软的Word文档、一个图片、一个电影剪辑，或者对组织有意义的部署到系统中的任意数据。(潘俊勇)

All these items are called *content*, and they all share similar attributes, such as the need to be added or edited by certain users and be published in various ways. A system called *workflow* controls these attributes. Workflow is logic defined by the organization's business rules, and it describes a system for managing the content.

所有的这些东西被叫做"内容"，他们全部有写公共类似的属性，如需要被某些用户添加和编辑，并通过各种方式发布。一个叫做 *工作流* 的系统控制这些属性。工作流是一个由组织机构定义的商业逻辑，他描述了管理内容的一个系统。(潘俊勇)

Historically there has been a difference between document management systems and CMSs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=CMSs" title="create this page">?</a>, but mostly these two systems have converged. The essential difference is the items being managed; it's often considered that *content* is any unit of information, and a *document* refers to something that's created and edited by humans using software such as Microsoft Office. Take, for example, a book: A book contains many units of data and may require management slightly different from that required by content. However, in most cases, this is a small difference, and products such as Plone are able to manage the small units of a larger piece of content and reassemble them.

历史上，文档管理系统和CMS系统是有区别的，最终这两个系统合并了。最主要的区别是管理的对象；通常认为 "内容"是任意的信息单元，而"文档"表示由人通过类似微软Office等创建和编辑的东西。如，一本书：书包括很多章节，可能需要和一般内容稍有不同的管理方法。然而，这通常都是一些小的区别，Plone这样的产品能够管理一大篇内容的小章节，并合并他们。

With the ubiquitousness of the Web, many CMSs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=CMSs" title="create this page">?</a> are now classified as Web CMSs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=CMSs" title="create this page">?</a>, either because they have a Web-based interface or because they focus on a Web-based delivery system over the Internet or an intranet. Plone provides a Web management interface and Web-based delivery system.

使用普遍存在的Web，很多CMS系统现在被分类为Web CMS，因为他们要么由一个web界面，或者因为他们主要集中于一个通过内部网或者因特网的web发布系统。Plone提供了一个web管理界面 和一个web发布界面。

The following is one definition of a CMS (*<a href="http://www.contentmanager.eu.com/history.htm">http://www.contentmanager.eu.com/history.htm</a>*):

下面是一个CMS的定义：
(*<a href="http://www.contentmanager.eu.com/history.htm">http://www.contentmanager.eu.com/history.htm</a>*):

 A CMS is a tool that enables a variety of (centralized) technical and (decentralized) nontechnical staff to create, edit, manage and finally publish a variety of content (such as text, graphics, video, and so on) whilst being constrained by a centralized set of rules, process, and workflows that ensure a coherent, validated Web site appearance.

CMS是一个工具，它让各种（集中的）技术的和（分散的）非技术的人员在一定的规则、过程、工作流的限制下，创建、编辑、管理和最终发布各种类型的内容（如文本、图片、视频等），以保证一个一致、有效的网站形象。

(Do You Want a Content Management System?)

你是否需要一个内容管理系统?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Although not the only advantage of a CMS, the most obvious benefit of a CMS is coordinating a Web site easily. Take a situation where one person, a *Webmaster*, coordinates a Web site, either an intranet or an external site. Content comes from users in a variety of formats, and the Webmaster turns these into usable Web pages by converting them to Hypertext Markup Language (HTML). If a user has to change those pages, then the user sends the changes to the Webmaster, who changes the pages, and so on.

虽然不是CMS系统的唯一优点，CMS系统的最明显的好处是网站协同管理更方便。比如这种情况，一个人，一个 *网站管理员*, 来管理一个网站，比如内部网或者外部网。用户产生各种形式的内容，网站管理员把他们转变成有用的HTML页面。如果用户需要更改这些页面，那么这个人需要把更改发送到网站管理员，由他来改变这些页面，如此等等。

This presents many problems for the organization, the biggest being that all content is flowing through one person - an obvious bottleneck. That one person can do only so much work, and if that person is sick or leaves the company, a great deal of productivity is lost in finding a replacement. The publishing process can be quite frustrating as e-mails fly between the Webmaster and the user trying to get content published.

这体现了组织的很多问题，最大的问题是：所有的内容都由一个人处理－这显然是一个瓶颈。一个人只能做一定量的工作，而且一旦他生病或者离开了公司，则需要寻找一个替代，这就导致了生产率的下降。这个发布过程也可能因为网站管理员和发布内容的用户之间的邮件传输问题而受到阻挠。

What's needed is a system that does the following:

所需要的是实现如下功能的系统：

 **Separates the content of a page from the presentation**: If the actual content is separate from the presentation method, then the content author doesn't need to know any HTML or how the page is delivered. In fact, one piece of content could have many different templates applied to it, including formats other than HTML, such as Portable Document Format (PDF), or Scalable Vector Graphics (SVG). When you want to change the look and feel of the site, you have to change only that one template rather than all the content.

 **把页面的内容和表现分离** ：如果实际的内容和显示方法分离开来，那么内容的作者不需要关心HTML或者页面如何处理。 事实上，一个内容上可以应用多种不同的模板，包括除了HTML之外的其他的格式，比如PDF，或者SVG。如果你希望改变网站的外观感受，你仅仅只需改变一个模板，而不是所有的内容。

 **Allows certain users to add and edit content**: If specified users can add and edit content easily, then there's no need to send content to the Webmaster or Web team. Instead, the user who wants to create a page can do so and edit it as much as necessary.

 **允许指定用户添加和编辑内容** ：如果指定的用户能够轻松的添加和编辑内容，那么就不需要把内容发送到网站管理员或者网站工作组了。代替的是，创建页面的用户自己能够按需进行编辑。

 **Applies rules to whom can publish what and when**: Your business rules might not want just anybody publishing content on your Web site; for example, people in marketing would be able to publish to the press release part of the site and not to the engineering section.

 **实现谁、什么时候、能发布什么的规则** : 您的商业规则可能不仅仅是让任意人在您的网站上发布内容；例如，市场部的人能够发布网站的新闻稿，但是不能动工程部分。

 **Can apply business rules to content**: If a person from marketing creates a press release, somebody in legal might need to review that document. In this case, the document will be passed through a review process that ensures it won't go live until these reviews are done.

 **能够把商业规则应用到内容** ： 如果市场部门的一个人创建了一个新闻稿，某个法律部的人可能需要审核这个文档。这里，文档将通过一个审核流程进行传递，以保证仅仅在审核通过的时候，这个新闻稿才生效。

 **Can search and index information intelligently**: Since the CMS can keep track of structured information about the content (such as author's name, publication date, modification dates, categories, and so on), it can produce listings of content by author, recent content, and so on. It can also provide searching capabilities that are much smarter and more useful than just a simple textual search.

 **能够集成的查询和索引信息** ：既然CMS可以记录内容的信息（如，作者名，发布时间，修改时间，分类等），它能够生成作者、最近内容的清单，等等。它也能够提供查询能力，这比一个简单的文本查询更聪明、更有用。

Although this example portrays paybacks that are more significant for large organizations, organizations of all levels benefit from this approach. In fact, typically small organizations that don't employ a full-time Webmaster can be one of the key beneficiaries of such a system. By installing a CMS, you can resolve all these issues and more.

虽然这个例子的回报对大型组织更显著，但各个级别的组织都将在这个方法上受益。实际上，通常小的组织不会雇佣一个全职的网站管理员，这个系统能够让它十分的受益。安装一个CMS系统，你就能解决所有的这些问题了。

The key factor of any CMS is that it provides a clear separation of the key elements in it: security, workflow, templates, and so on. For example, the templates presenting an item are separate from the content. This allows you to easily modify the presentation.

CMS的关键的因素是，它是否提供了对关键元素的清晰分离：权限、工作流、模板等等。例如，一个项目的模板表现和内容是分离的。这让您能轻松的修改外观。

(Introducing Plone's Features)

介绍Plone的特性
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Plone is open source, licensed under the General Public License (GPL), which is a common open-source license that allows anyone to use the source for free. For more information about the GPL, go to the Free Software Foundation Web site at *<a href="http://www.gnu.org">http://www.gnu.org</a>*. You can examine any aspect of Plone's code and alter it to fit your application. There are no licensing fees to pay, there's no license that will expire, and all the code is visible. This open-source philosophy means that Plone already has a large user base and legion of developers, usability experts, translators, technical writers, and graphic designers who are able to work *on* Plone. By choosing Plone, you're not locked into one company; rather, nearly a dozen companies offer different Plone services.

Plone是开放源代码的，使用常用的GPL开源许可授权，这个授权允许任何人免费使用这个源代码。欲了解更多GPL的信息，请访问自由软件基金网站: *<a href="http://www.gnu.org">http://www.gnu.org</a>*. 你可以查看Plone的全部代码，修改他让他用于你的应用。你不需要支付授权费用，这个授权也不会过期，全部的代码都可以看见。这个开源哲学意味着Plone已经由了大量的用户和众多的开发人员，易用性专家，翻译人员，技术作家，和外观设计人员，他们可以在Plone上工作。选择Plone，你不会被某一个公司锁死；相反，成打的公司提供了各种的Plone服务。

(Packaging)

打包
.........

Plone maintains easy installers for Windows, Linux, and Mac. Other third-party products and add-ons also come with the installers. Maintaining quality releases of these products makes installation and management easy. Also, each new release maintains migration paths and updates so that your Plone site will keep working and stay up-to-date.

Plone包含了Windows, Linux, Mac操作系统上的简便安装程序。其他的一些第三方的附加产品也包含在这个安装程序中。这些产品保持高质量的发布，使得安装和管理十分方便。同时，每个新的发布版本提供了升级和共享方法，因此你的Plone网站可以很容易保持最新而且能保证持续正常工作。

(Internationalization)

国际化
....................

The whole Plone user interface is translated into more than 20 languages, including Korean, Japanese, French, Spanish, and German. Inserting your own translation is easy (see Chapter 4).

整个Plone用户界面被翻译成了20多种语言，包括中文、韩语、日语、法语、德文等。加入你自己的语言翻译，也是很容易的（请看第4章）

(Usability)

可用性(Usability)
.................

Plone offers an excellent user experience that provides high levels of usability and accessibility. This isn't just a matter of presenting pretty HTML but instead goes to the core of Plone. Plone provides an interface that's compatible with the industry and government standard WAI-AAA and U.S. Section 508. This allows sites built with Plone to be used by people with vision disabilities. In addition, this provides the unexpected but related benefit that your page may index better in search engines such as Google.

Plone提供了优秀的用户感受，他提供了高级的可用性(usability)和可访问性(accessibility)。这不仅仅是展现一些漂亮的HTML页面，而且，它进入了Plone的核心。Plone提供了一个符合工业标准（WAI-AAA）和政府标准（U.S. Section 508）的界面。这样，使用Plone构建的网站能够被有视力缺陷的人很好的使用。另外，这也提供了非预期的一个相应益处：你的页面可能被Google这样的搜索引擎更好的检索。

Skinnable

支持皮肤(Skin)
..............

Plone separates the content from the actual templates used to present the content, often called *skins*. The skins are written in the excellent HTML templating system, Zope Page Templates, and a large amount of Cascading Style Sheets (CSS). With little knowledge of Plone, you can apply multiple skins, achieve multiple looks, and totally customize your Web site's appearance.

Plone把内容和显示这些内容的实际的模板分离开，这些模板叫做 *皮肤*. 皮肤使用优秀的HTML模板系统，也就是“Zope页面模板”(Zope Page Template)，和大量的层叠样式表（CSS）编写。不需要太多的Plone知识，你就实现多个皮肤，得到多个外观，完全定制你的网站表现。

(Registration and Personalization)

注册和个性化
................................

Plone features a complete user registration system. Users register with a Plone site using their own username, password, and any other information you might want to add about the user. You can then personalize the whole user interface for that user. In addition, with add-ons, you can use information you already have about users, coming from many places, such as relational databases, Lightweight Directory Access Protocol (LDAP), Active Directory, and more. Chapter 8 covers how to register and configure users.

Plone提供了完整的用户注册系统。用户使用用户名、口令和其他你可能需要添加的相关用户信息进行注册。接下来，你可以为那个用户定制整个用户界面。另外，使用些附加产品，你可以使用来自其他地方的一些现有用户信息。比如，关系数据库、轻量级目录访问协议(LDAP), 活动目录（Active Directory）, 等等。第8章包括了如何注册和定制用户的信息。

(Workflow and Security)

工作流和安全管理
.....................

Workflow controls the logic of processing content through the site. You can configure this logic through the Web using graphical tools. Site administrators can make sites as complex or as simple as they'd like; for example, you can add notification tools such as sending e-mails or instant messages to users. Chapter 8 covers workflow in great detail.

工作流控制了网站处理内容的逻辑。你可以直接在网站上使用图形化的工具来定制定制这个逻辑。网站管理员可以根据需要让他们的网站复杂或者简单；比如，你可以添加通知工具到用户，如发送电子邮件或者即时消息。第8章详细介绍了工作流。

For every item of content in a Plone site, you can set up access control lists to decide who has access to that item and how they'll be able to interact with it. Will they be able to edit it, view it, or comment on it? All this is configurable through the Web (see Chapter 9).

对于Plone网站的每条内容，你都可以设置访问控制清单，以决定谁可以访问那个内容、能对他执行什么操作。他们能否编辑、查看、或者评注它？所有这些都可以通过网站进行定制。（见第9章）

(Extensible)

可扩展性
..........

Since Plone is open source, it can be easily altered. You can change and configure almost any aspect of Plone to suit your needs. Countless packages and tools for Plone provide a wide array of options for smaller sites and for large-scale enterprises. Repositories of free add-ons for Plone are available at *<a href="http://www.plone.org">http://www.plone.org</a>*. With development tools such as Archetypes (covered in Chapter 13), you can generate and alter Plone code easily through the Web or using Unified Modeling Language (UML) tools. Chapter 10 covers integration of Plone with enterprise solutions such as LDAP, Apache, Microsoft Internet Information Services (IIS), Macromedia Dreamweaver, and so on.

由于Plone是开源的，她可被轻松更改。你根据你的需要，几乎可任意地改变和配置Plone。Plone的无数扩展包和工具，为小型网站和大型企业网提供了一个很宽的选择余地。Plone免费的附加产品库位于： *<a href="http://collective.sf.net">http://collective.sf.net</a>*. 使用Archetypes等开发工具（第13章详述），你可以通过网页或者使用统一建模语言（UML）工具，方便地生成和修改Plone的代码。第10章讲述了Plone和其他企业解决方案的集成，如LDAP，Apache，微软的IIS，Macromedia Dreamweaver, 等等。

(Content Customization)

内容定制
.....................

Users of a Plone site can add all manner of content, but the data added isn't limited or constrained. Plone developers can create their own content types so that almost any type of content can be managed; the only limit is your own imagination. In Chapters 11 and 12, I'll discuss how to customize the content types. Chapter 13 will introduce Archetypes, which is a very powerful system for generating content types that don't require programming; for instance, you can generate new types of content from UML tools.

Plone站点的用户能够添加各种各样的内容，但是添加的数据并没有限制。Plone开发任意能够创建他们自己的内容类型，这样几乎任意的内容类型都可被管理；唯一的限制是你自己的想象。第11和12章，我讲讨论如何定制这些内容类型。第13章讲介绍Archetypes，她是一个非常强大的内容类型生成系统，她不需要编程；例如，你可以通过UML工具生成新的内容类型。

(Documentation)

文档
.............

The Plone project maintains documentation, including this book, which is published under the Creative Commons license. The best starting place for the community documentation is at *<a href="http://www.plone.org/documentation">http://www.plone.org/documentation</a>*.

Plone项目维护了文档，包括这本以Creative Commons许可证发布的书。社区的文档中，最好的开始地方是：*<a href="http://www.plone.org/documentation">http://www.plone.org/documentation</a>*.

(Community)

社区
.........

One of the best things about Plone is the community of developers and companies that supports and develops Plone. With more than 60 developers involved to some degree in the project around the world, it's almost always possible to find a Plone developer online who is willing and able to help you. Alan Runyan, Alexander Limi, and Vidar Andersen started Plone; however, it quickly grew into a thriving open-source project as more developers became involved. The contributions from these developers form the Plone product that's now available.

Plone的一个最好的东西是开发人员的社区和支持和开发Plone的公司。全世界60多个开发人员，不同程度的参与到项目的开发。您几乎总能够找到一个在线的Plone开发人员，他愿意和能够帮助您。Alan Runyan, Alexander Limi, 和Vidar Andersen创立的Plone；然而，当更多的开源人员卷入时，他迅速发展成为一个繁荣的开源项目。这些开发任意的贡献所形成的Plone产品，现在已经可以得到了。

(Example Plone Sites)

Plone网站示例
###################

Many Plone sites exist; some are obvious because of their looks, and some aren't. The following is just a small sample of the more diverse sites:

存在许多的Plone站点；很多从外观上显然可以看出，某些则不。下面是一少部分不同站点的示例：

- **Plone (*<a href="http://www.plone.org">http://www.plone.org</a>*)**
- **Plone Demo Site (*<a href="http://demo.plone.org">http://demo.plone.org</a>*)**
- **Zope.org (*<a href="http://www.zope.org">http://www.zope.org</a>*)**
- **Liquidnet (*<a href="http://www.liquidnet.com">http://www.liquidnet.com</a>*)**
- **Design Science Toys (*<a href="http://www.dstoys.com">http://www.dstoys.com</a>*)**
- **Give Kids the World (*<a href="http://www.gktw.org">http://www.gktw.org</a>*)**
- **Propane (*<a href="http://www.usepropane.com">http://www.usepropane.com</a>*)**
- **Maestro Headquarters (*<a href="http://mars.telascience.org">http://mars.telascience.org</a>*)**

More Plone sites are available at *<a href="http://www.plone.org/about/sites">http://www.plone.org/about/sites</a>*, including sites that provide a quite different user interface. Without knowing about the development of these sites, it would in fact be hard to tell that these sites use Plone.

更多的Plone站点位于： *<a href="http://www.plone.org/about/sites">http://www.plone.org/about/sites</a>*, 他们提供了非常不同的用户界面。如果不知道这些网站的开发，实际上就很难弄清楚这些网站是否使用了Plone。

(Getting Involved in Plone's Development)

进入Plone的开发
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Although Plone has an impressive list of features, its list of 'wants' even more impressive. For this reason, the project is always on the lookout for new people willing to contribute time for the project.

尽管Plone已经有一个可观的特性清单，对其期望的特性清单也更加可观。由于这个原因，这个项目总是希望有很多新人参与进来，把他们的时间贡献给这个项目。

Fortunately, because Plone is focused on the end user, there's a need for a very broad spectrum of disciplines. Volunteers in a range of areas, rather than just coders or Web developers, are welcomed. Plone needs user interface developers, usability experts, graphic designers, translators, writers, and testers. You can find the current development status on the Plone Web site at *<a href="http://plone.org/development">http://plone.org/development</a>*, and the best way to get involved is to join the mailing lists or join the developers on an Internet Relay Chat (IRC) channel.

幸运的是，由于Plone关注于最终用户，就需要很广泛的学科知识。我们需要众多领域的志愿者，不仅仅是编程人员或者是Web开发人员。Plone需要用户界面的开发人员，可用性专家，图像设计者，翻译人员，作家和测试人员。你能在Plone的网站上<a href="http://plone.org/development">http://plone.org/development</a>上找到当前的开发状态，加入的最佳方式是订阅邮件列表，或者在IRC频道上加入到开发人员中。

Plone is built on top of Zope and the Content Management Framework (CMF). To understand Plone, you have to understand Zope and the CMF as the underlying architecture. For this reason, I'll explain these two items and how they integrate with Plone in this section.

Plone基于Zope和"内容管理框架(CMF)"。要理解Plone，你必须理解Zope和CMF, 他们是底层的架构。因为这个原因，我想在本节解释一下二者，以及他们如何和Plone集成起来的。

Zope is a powerful and flexible open-source Web application server developed by Zope Corporation (*<a href="http://www.zope.org">http://www.zope.org</a>*). Originally, Zope was developed as a stand-alone CMS, but over time it didn't satisfy the needs of its users. Then Zope Corporation developed the CMF an open-source project. The CMF provides developers with the tools necessary to create complex CMSs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=CMSs" title="create this page">?</a>; it enables workflow, provides site skinning, and offers other functions.

Zope是一个由Zope公司(<a href="http://www.zope.org">http://www.zope.org</a>)开发的功能强大的、柔性的开源Web应用服务器。最初，Zope被开发为一个独立的CMS，但当时她并不能满足用户的需求。于是Zope公司开发了CMF这个开源项目。CMF提供给开发人员足够的工具来创建复杂的CMS系统；他包括工作流、网站皮肤机制，以及很多其他的功能。

The CMF is a framework for a system; in other words, it provides the tools for developers to build a product, rather than just providing an out-of-the-box system that users can use immediately. Plone takes this and many other features and improves upon them to provide the user with a high-quality product. Plone is a layer on top of the CMF, which is an application running on top of Zope. Understanding the CMF is key to understanding Plone. Most administration functions require the use of Zope's administration interface, and developing Plone requires an understanding of Zope and its objects.

CMF是一个系统的框架；用其他的话说，他为开发人员提供了构建产品的工具，而不是为最终用户直接使用的、即拆即用的系统。Plone利用了CMF的众多特性，并提升他们，提供给用户一个高质量的产品。Plone是一个在CMF之上的一层，而CMF则又是运行在Zope之上的一个应用。理解CMF是理解Plone的一个关键。大多数管理功能需要使用Zope的管理界面，开发Plone则需要理解Zope和他的对象。

This book doesn't go into depth about Zope; rather, it gives you enough information to complete tasks in Plone. Just reading this book will give you enough information to customize and modify almost anything you want in Plone. For more information on Zope, I recommend *The Zope Book*. Originally published by New Riders, it has since been placed online and is updated by community members. It's available free online at *<a href="http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition">http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition</a>*.

这本书不想深入介绍Zope；但是，他提供了完成Plone上的任务所需要的足够信息。仅仅阅读这本书，你将得到足够信息，随心所欲定制和修改Plone中的任意地方。要了解Zope的更多信息，我推荐阅读"The Zope Book"一书。这本书最初由New Riders发行，现在已经放在网上并由社区成员在维护。你可免费得到：*<a href="http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition">http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition</a>*

Both Zope and the CMF are key technologies that Plone needs; without them, Plone wouldn't exist. The Plone team owes a great deal of thanks to everyone at Zope Corporation for having the vision to create and then offer both Zope and the CMF as open source. The list of people I'd like to thank there and in the CMF communities is long. Thank you, everyone involved.

Zope和CMF都是Plone需要的核心技术。没有他们，Plone不可能存在。Plone团队十分感激Zope公司的每一个人，是他们有这样的眼光，能够把Zope和CMF以开源的形式提供出来。在那里，以及在CMF社区中，我需要感谢的人员清单实在太长了。谢谢你们，所有参与的每个人。

Zope is written in Python, a powerful object-oriented, open-source programming language comparable to Perl or Tcl. Knowledge of Python isn't required to use Plone or even to do some basic administration; however, customizing products and scripting Plone does require some Python.

Zope是由Python编写的，他是一个强大的面向对象的、开源的编程语言，他和Perl及Tcl比较类似。使用Plone，甚至基本的管理，都不需要Python的知识；然而，定制产品和Plone上脚本编程是需要一些Python知识的。

Tommy Burnette, a senior technical director at Industrial Light  Magic, says this about Python (*<a href="http://www.python.org/Quotes.html">http://www.python.org/Quotes.html</a>*):

Tommy Burnette, 一个在Industrial Light  Magic公司的高级技术主管，这样说Python (*<a href="http://www.python.org/Quotes.html">http://www.python.org/Quotes.html</a>*):

 Python plays a key role in our production pipeline. Without it a project the size of Star Wars: Episode II 

 Python在我们主要的产品线中扮演着一个关键的角色。没有他，象“星球大战II”这样大的项目就根本不可能

If you plan to do anything sophisticated with Plone, take a day or two to learn the basics of Python. Not only will this allow you to customize Plone substantially, but it'll also familiarize you with objects and how they interact in the Plone environment. Teaching you Python is outside the scope of this book; instead, I assume you have a basic knowledge of Python. That fundamental knowledge of Python will be enough to get you through this book and allow you to customize the Plone installation easily.

如果你打算使用Plone做一些复杂的事情，就需要花1－2天学习Python的基础知识。这不仅将让你能更充分地定制Plone，而且他将让你熟悉这些对象，以及他们如何在Plone环境中相互作用。学习Python，并不在本书的范围之内；取而代之的是，我假设你已经由了基本的Python知识。这些基本的Python知识将带领你看完此书，并让你能轻松定制Plone站点。

Fortunately, Python is an easy programming language to learn; on average, it takes an experienced programmer a day to become productive in it. New programmers take a little longer. If you're installing Plone using the Windows or Mac installers, then the correct version of Python will be included. To download Python as separate product, for almost any operating system, go to *<a href="http://www.python.org">http://www.python.org</a>*.

幸运的是，Python是一个非常容易学习的编程语言；一般，一个熟练的编程人员一天便可完全掌握他。新的编程人员稍微长些。如果你在Windows或者Mac上安装Plone，Python的正确版本灰自动安装上。如果要在几乎任意的操作系统中，独立地下载安装Python，请到 *<a href="http://www.python.org">http://www.python.org</a>*.

The best way to master Python is to try it from the command Python interpreter. If you have a Windows installation of Plone, there's a link for the Pythonwin, a Python Integrated Development Environment (IDE) already in the Start menu; go to Start - Programs - Plone - Pythonwin (see Figure 1-2).

掌握Python的最佳方法是在一个命令行的Python解释器中试用他。如果你有Plone的一个Windows安装程序，会有一个到Pythonwin链接，他是一个Python的集成开发环境(IDE)。你可以在“开始”菜单中找到它：开始 - 程序 - Plone - Pythonwin (图 1-2).

 .. image:: img/3294f0102.png

Figure 1-2. The Python prompt on Windows

图 1-2. Windows上Python命令提示符

On Linux and Mac OS X, usually typing **python** will start the Python interpreter:

在Linux和Mas OS X上，通常键入 **python** 将启动Python解释器:

::

 $ python
 Pyython 2.3.2 (#1, Oct  6 2003, 10:07:16)
 [GCC 3.2.2 20030222 (Red Hat Linux 3.2.2-5)]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=GCC%203.2.2%2020030222%20%28Red%20Hat%20Linux%203.2.2-5%29" title="create this page">?</a> on linux2
 Type "help", "copyright", "credits" or "license" for more information.
 >>>

Since Python is an interpreted language, instead of the whole Python script being compiled and run, you can just send lines of code to the interpreter as you write them. This makes the interpreter an amazingly useful place for testing and debugging code. In the interpreter, each line waiting for input is prefixed with *>>>*.

既然Python是一个解释程序，你可仅仅在你些程序的时候将部分代码行发送到解释器执行，而不是把整个Python脚本进行编译和执行。这使得解释器成为在测试和调试代码时，一个十分有用的地方。在解释器中，等待输入的每行程序都以 *>>>* 开始.

For example, the simplest 'Hello, Worldâ€ program is as follows:

例如，最简单的 'Hello, World' 程序如下：

::

 >>> print "Hello, world!"
 Hello, world!
 >>>

To exit the interpreter, press Ctrl+D (press the D key while holding down Ctrl) on Linux or press Ctrl+Z on Windows. (You'll also use this later for more advanced Zope and Plone interaction.) You can execute normal Python scripts by passing them to the interpreter; for example, given the following script called *hello.py*:

要退出解释器，可在Linux上按下 Ctrl+D (同时按下Ctrl键和D键），或者在Windows上按下Ctrl+Z。（稍后你将也使用这个来完成更高级的Zope和Plone交互。）把普通的Python脚本做为参数传递给解释器，你便能执行它。例如，把下面的脚本取名为 *hello.py*:

::

 print "Hello, world!"

you can run this using the following command:

你可以用下面的命令运行它:

::

 $ python hello.py
 Hello, world!

The Python Web site at *<a href="http://www.python.org">http://www.python.org</a>* has excellent documentation, especially the tutorial. Also, the following books provide a good overview of Python:

Python的网站位于 *<a href="http://www.python.org">http://www.python.org</a>* ，那里有很多优秀的文档，特别是那个教程。另外，下面的书籍也为Python提供了一个很好的介绍：

  - ***Dive Into Python* (Apress,2004)**: Based on Mark Pilgrim's popular Web-based tutorial, this books treats readers to a fast-paced introduction to the Python language. This is a great book geared toward experienced programmers.
  
  - ***Dive Into Python* (Apress,2004)**: 基于Mark Pilgrim's十分流行Web教程, 这本书面向的读者是对Python语言的快速入门介绍。这本书面向的是熟练的编程人员。

  - ***Learning Python*, Second Edition (O'Reilly, 2003)**: This book covers version 2.3 of Python and provides a good overview of Python and all the new features. This is good for relatively new programmers.

  - ***Learning Python*, 第二版 (O'Reilly, 2003)**: 这本书覆盖了Python2.3版本，提供了Python的概述和和全部的新特性。相对而言，它面向新的编程人员。

  - ***Practical Python* (Apress, August 2002)**: This highly practical introduction to Python offers insight into the language's array of features. The reader can immediately put this knowledge into practice, following along with the creation of ten interesting projects, including a Web-based bulletin board and a Graphical User Interfaceâ€“based file-sharing application.

  - ***Practical Python* (Apress, August 2002)**: 这本书高度面向实践的角度介绍Python，它深入洞察了Python语言的大量特性. 随着10个有趣项目的创建，读者可很快把这些知识用于实践；其中它包括了一个基于Web的公告板和一个图形用户界面的文件共享程序.

  - ***Python Essential Reference*, Second Edition* *(Sams, 2001)**: A reference book that provides a great overview of all the key libraries and functions. This is an excellent book for experienced programmers.

  - ***Python Essential Reference*, 第二版* *(Sams, 2001)**: 提供所有主要类库和函数信息的一个参考书籍。这本书适合熟练编程人员。

This book uses the following conventions:

这本书使用了下面的约定：

  - **Italics**: New terms are *italicized*. (Appendix C contains an extensive glossary that defines all acronyms.) Also, links that appear in the user interface are italicized.

  - **斜体字**: 新的术语使用 *斜体字*. (附录C 包含了全部缩写词广泛的词汇表.) 同时，在用户界面中的链接也使用了斜体字.

  - **Bold**: If there are instructions within the text that include something you should type on your keyboard, these words are in **bold**.

  - **粗体字**: 如果文字中出现了需要你在见面上打字的指令，这些单词就使用 **粗体字**.

  - **Code font**: A *monospaced font* indicates filenames, folder paths, code, variables, and Uniform Resource Locators (URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=URLs" title="create this page">?</a>).

  - **代码字体**: *等宽字体* 表示文件名，文件夹路径，代码，变量，和统一资源定位符(URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter1/createform?page=URLs" title="create this page">?</a>).

This book contains lots of screen shots of Zope, Python, and Plone. Since Plone is a rapidly developing product, the screen shots might vary slightly from the version of software you're using; these changes should be minor and shouldn't affect your understanding of the system.

这本书包括了大量的Zope、Python和Plone的屏幕截图。由于Plone是快速发展的产品，这些截图可能和您使用的软件版本有轻微的变化；这些变化应该是微小的，而且不应该影响你对系统的理解。

For this book, the following versions of software are used; although this book is specifically written with these versions in mind, all the software should work on these and later versions for some time to come.

对于这本书，使用了下面的软件版本；虽然这本书专门针对这些版本编写，全部的软件应该在这些和以后的版本中，能够正常工作。

Plone 2.0 was the most recently released version of Plone at the time of writing. This is the second major release of the software, and it provides many new features over 1.0, including group user management, a new interface, and an improved Zope distribution. It's strongly suggested you start any new projects in 2.0 or later, rather than using the earlier versions of Plone.

此书编写时，Plone 2.0是最近发布的版本。这是这个软件的第二个大的发布。它在1.0的基础上提供了很多新的特性，包括用户的组管理、新的界面，和一个改进的Zope发行。强烈建议你使用2.0和之后的版本完成你的新项目，而不是使用Plone的先前版本。

Version 2.0 of Plone has the following dependencies: Zope 2.7, CMF 1.4.2, and Python 2.3.3. All of the code examples in this book have been specifically designed not to be dependent upon these versions or a particular operating system. However, there may be situations where this isn't the case; I apologize for any inconvenience.

2.0版的Plone依赖如下产品：Zope 2.7，CMF 1.4.2，和Python 2.3.3。这本书中的全部的这些代码示例经过了专门的设计，他们并不依赖于某个特定的版本或者操作系统。然而，也有可能例外，我对这些不便表示歉意。

Originally, a group of Plone users keen to produce quality documentation came up with the idea of this book. We released the first version of that book on the Plone Web site as an open-source documentation project. All the content added to the Plone Web site was under the open publication license.

最初，Plone的一组用户渴望制作高质量的文档，这带来这本书的一些想法。我们在Plone网站上以开源文档项目的形式发布了第一个版本。所有的内容都作为一个开放发行许可放到了Plone网站上。

Growing interest in Plone made a commercial book more feasible, and in the summer of 2003, Apress and I started this book. I used some of the material from the old book with the original owners' permissions. With the change to Plone 2, I added a large amount of new material. This book is now published under the Creative Commons license, which allows for the reuse of this work as long as the original author is attributed. However, you may not use this work for commercial purposes. For more information, see the license online at *<a href="http://creativecommons.org/licenses/by-nc-sa/1.0/">http://creativecommons.org/licenses/by-nc-sa/1.0/</a>*.

Plone不断增长的兴趣导致了商业书籍成为可能，在2003年夏天，Apress和我开始了这本书。我经过原始作者的许可使用了老版书籍的大部分材料。根据Plone 2的更改，我添加了大量新的资料。这本书现在使用Creative Common许可发现，这样使得和原始作者一起重用这些工作成为可能。然而，你不能把这本书用于商业用途。更多的信息，可查看在线许可： *<a href="http://creativecommons.org/licenses/by-nc-sa/1.0/">http://creativecommons.org/licenses/by-nc-sa/1.0/</a>*.


From unknown Thu Oct 14 16:49:50 +0800 2004
From: 
Date: Thu, 14 Oct 2004 16:49:50 +0800
Subject: 
Message-ID: <20041015084950+0800@www.czug.org>

“他们提高了非常不同的用户界面”，其中的提高应该为“提供”。

From unknown Fri Jan 21 02:30:47 +0800 2005
From: 
Date: Fri, 21 Jan 2005 02:30:47 +0800
Subject: typo
Message-ID: <20050121023047+0800@www.czug.org>

Zope被开发味一个独立的
==>
Zope被开发为一个独立的

From zhaoxin Mon Feb 28 10:28:06 +0800 2005
From: zhaoxin
Date: Mon, 28 Feb 2005 10:28:06 +0800
Subject: 
Message-ID: <20050228102806+0800@nocache.czug.org>

所有的网站都由一个共同的问题==>所有的网站都有一个共同的问题

From unknown Wed Nov 23 10:25:56 +0800 2005
From: 
Date: Wed, 23 Nov 2005 10:25:56 +0800
Subject: 
Message-ID: <20051123102556+0800@www.czug.org>

Python的正确版本灰自动安装上 -> 会