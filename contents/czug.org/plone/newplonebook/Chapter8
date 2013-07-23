第八章
---------

.. Contents:: 内容：

(Managing Workflow)

管理工作流
=================

One of Plone's many strengths is the workflow component. Workflow fits into one of the core themes of *content management*, which is the separation of logic, content, and presentation. This chapter therefore covers Plone's workflow in detail.

工作流(Workflow)是Plone中一个非常强大的组件。工作流是“内容管理”（content management）核心的一部分，分离于业务逻辑（logic），内容（content）以及表现形式（presentation）。本章节将对此进行详细的介绍。

The chapter starts by covering some key definitions related to workflow, as well as the key tools involved, so that you can begin to conceptualize workflows. Once these concepts are clear, I then discuss how to add and edit your own workflows.

这一章开始介绍工作流的主要定义和一些常用工具的介绍。通过学习本章，你可以掌握工作流相关的概念。一旦掌握了这些概念，我们就开始讨论如何增加并编辑你自己的工作流。

Throughout this chapter, I reference simple changes you can make to the workflow that comes straight out of the box with Plone. I also provide a series of examples to help you perform tasks such as creating notifications, moving content, and so on. Finally, I show some of the more advanced features of workflow development and some of the useful tools that are available.

通过这一章，我们涉及一些简单修改Plone缺省工作流的例子。同时通过一系列例子，帮助你完成诸如创建通知，移动内容，等等任务。最后，我将展示一些工作流开发的高级特性和一些有用的现成的工具。

(What Is Workflow?)

什么是工作流？
~~~~~~~~~~~~~~~~~

*Workflow* is a chain of actions or events that occurs on something to achieve an objective. Workflow often expresses business rules that may exist. Every business has different rules and policies about tasks that must happen within that company. Examples of this include the following:

*工作流* 是一条由动作或事件组成的用于完成一个对象的动作/事件链。工作流经常用于表现可能存在的商务规则。每一个公司的业务都有不同的规则和策略。例如：

  - Before an employee's time sheet is approved, it must be viewed and acknowledged by a supervisor.
  - 在一个雇员的工作时间表被批准之前，必须有一个主管对它进行审批。

  - In a widget factory, for each widget assembled, users must be notified of the order and any change in the state of the widget as it passes through the factory.
  - 在一个配件工厂，每一个配件组装时，组装流程中的任何顺序或配件状态的改变必须通知到每一个用户。

  - Before a Web page is published on a Web site, it must be approved by marketing, approved by the Webmaster, and translated by a linguist.
  - 在一个Web页面被发布到网站之前，这个网页必须被市场部，网管部门审核批准，并翻译成其它语言。

Workflow separates the logic of these business rules and standardizes the concept of thinking about these changes. By having separate logic, it's now easy for businesses to change the application to fit their business and their business rules. Often applications try to enforce a workflow on a business because the workflow is hard-coded into the application.

工作流可以把这些商业规则中的逻辑分离开，并把实际变化时所涉及的概念标准化，便于我们的思考。逻辑的分离，使我们现在很容易改变应用程序以适合我们的商务和商务规则。由于工作流被写死在应用程序里，所以应用程序经常会在商务过程中强制执行一个工作流。

(Understanding Workflow in Plone)

理解Plone的工作流
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Plone's workflow tool provides certain features and limitations that are key to understanding workflow in Plone. The workflow product used in Plone is DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a>, which is an open-source product released by Zope Corporation. Other workflow systems are available, and some of them are being incorporated into Plone, such as OpenFlow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=OpenFlow" title="create this page">?</a> (*<a href="http://www.openflow.it">http://www.openflow.it</a>*). However, for the moment, DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> is powerful and simple enough to provide all the functionality most users will need.

Plone的工作流工具提供一些可靠的功能和限制，他们是理解Plone工作流的关键所在。Plone中使用的工作流产品是DCWorkflow。DCWorkflow是Zope公司发布的一个开源的Zope产品。其它一些现有的工作流系统正在组合进Plone中，例如OpenFlow (*<a href="http://www.openflow.it">http://www.openflow.it</a>*)。然而当前DCWorkflow提供了用户需要的足够强大的，足够易用的功能。

DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> assumes there's one object in the system that's the target of the workflow-for example, one piece of content or one widget. It further assumes that all objects of the same type go through the same workflow. By repurposing content (see Chapter 11 for more on this), you can have similar content use different workflows.

首先，DCWorkflow假定在系统中存在一种对象（object）——比如一条内容或一个配件。然后它又进一步假定，属于同类型的对象会通过同一个工作流。而通过重新规划（repurposing）内容（阅读第11章可获得更多此方面的知识），你可以使用不同的工作流来持有相似的内容。

Since the DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> system is included in Plone, there's nothing extra to install. It's represented in the Zope Management Interface (ZMI) by the *portal_workflow* object.

自从Plone包含了DCWorkflow，没有额外的东西需要安装。在Zope管理界面（ZMI）中DCWorkflow也是一个对象，它以 *portal_workflow* 的形式表现。

(Conceptualizing a Workflow)

定义一个工作流
..........................

Before explaining a workflow, I'll explain a few simple pieces of terminology: states and transitions.

在解释什么是工作流之前，我先来解释几条简单的术语：状态（states）和过渡（transitions）。

A *state* is information about an item of content at a particular moment in time. Examples of states are private, public, pending, and draft. All workflows have at least one starting state in which all the content starts. The workflow will then move the content through a series of states, either by user interaction or by some automation process. When the content reaches an end state, it'll remain in that state for a long time (usually forever). Content may reach one or more different end states in the process of a workflow.

*状态* 是指在某个特定时刻，内容所携带的一类信息。具体地说，状态包括私有（private），公共（public），提交（pending），和草案（draft）。所有的工作流至少包含一种初始状态，内容创建后会始于这种初态而存在。工作流会带动内容，使之遭遇一连串的状态变化，这种变化可能伴随用户的交互而发生，也可能伴随某些自动化操作进程而发生。当内容抵达终态，它将这种终态保持很长一段时间（通常情况会永远保持下去）。内容会在工作流处理过程中抵达一种或多种终态。

For that piece of content to move from one state to another, a *transition* is needed. A transition connects a starting state and an ending state. A transition can have lots of different features associated with it, as you'll see later, but for the moment, you just need to know that a transition moves content between two states. Usually a transition is triggered by some external force, such as a user clicking a button on a Web page or a script interacting with a page.

当需要把内容从一种状态迁移/改变至另一种状态的时候，过渡（transition）就派上用场了。简单地说，过渡连接着初始状态和终态。稍后我们将知道，过渡可以拥有许多和自身相关的不同特征，但现在你只需要理解过渡在上述两种状态间迁移内容。通常，外部力量会触发过渡，比如用户在网页上点击一个按钮，或一个脚本与页面进行交互。

Visualizing a workflow, especially when talking about something as nebulous as content, can be a little confusing. Thinking about an everyday occurrence will help. In this case, the following example shows the workflow of my credit card bill, which I have the joy of getting every month:

刚开始接触工作流，往往会搞得你一头雾水；尤其当我们把它类比于内容（content）这个已经很模糊的概念来谈论时。想想日常生活中的事情将有益于我们思考。既然可以这样做，下面就举个例子，是关于我的信用卡账单的工作流，每个月我都会欣然收到账单：

 	1.	The credit card company prepares a bill and mails it to me.

 		发放信用卡的公司会填好一张账单并邮寄给我。

 	2.	I get the bill and put it on my desk. Sometimes the bill sits on my desk for quite a while as I wait for the end of month. Occasionally I have to query people about certain expenditures, such as "What were those clothes you bought?"

 		我收到账单，放在我的办公桌上。有时我会坚持等到月底，以致这张帐单被搁置很久。有时我也必须在一些花费上进行询问，比如说“你买的这些衣服究竟是什么？”。

 	3.	Any serious queries or questions then go back to the credit card company, perhaps causing a new bill to be created (although this happens quite rarely).

 		任何严肃的询问或问题会反馈给信用卡发放公司，也许还会导致更换新卡（尽管这样的事情罕有发生）。

 	4.	Usually at the end of the month, when I do all the accounting, I then pay the bill.

 		通常到了月底，清算完帐目后我会付款。

From this, then, you can come up with some states. Looking at the previous steps, you'll see you really have no need to create different states for receiving the bill, which includes opening it and putting it on my desk. Similarly, you don't need to bother with every review that happens. Although these are all valid steps that take place, trying to make a workflow for every state would be too cumbersome. Instead, you can summarize the workflow with the following states:

好，从这个实例中，你可以提出一些状态。看看上述几个步骤，你可以发现，实际上没有必要为接收帐单（包括打开帐单、将帐单放置于办公桌上）创建不同的状态。同样也不必为每次接收帐单后的审批而费心。尽管这些真实发生的步骤都是有效的，但尝试给每个状态创建工作流真是太麻烦了。有个替代的解决方法，你可以列出下面三个状态，来概括这个工作流：

  - **Draft**: The credit card bill has been prepared and sent to me.
  - **草案**: 信用卡账单已经填好，并发送给我了。

  - **Review**: The credit card bill has been received and is on my desk, being reviewed.
  - **审批**: 信用卡账单已经收到，在我的办公桌上；我正在审批它。

  - **Paid**: The credit card bill has been paid, put in my filing cabinet, and forgotten about forever.
  - **（已）支付**: 信用卡账单已经支付，被扔进了我的档案柜，永久遗忘掉。:)

Now that you've come up with the states, you can think of the changes that need to occur. For each of these states, you'll have at least one transition that occurs to move the bill from one state to another:

现在你已经提出了这几个状态，那么可以开始考虑它们需要发生哪些改变。对于其中每个状态来说，你需要至少一个过渡来迁移帐单从一个状态至另一个状态：

  - **Post**: The bank sends the credit card bill.
  - **发送**: 银行发送信用卡账单。

  - **Pay**: I pay the credit card bill.
  - **支付**: 我支付信用卡账单。

  - **Reject**: Something is wrong on the bill, and it isn't approved.
  - **驳回**: 账单中出现差错，不能被核准。

Figure 8-1 shows this set of transitions and states. In the figure, boxes represent states, with the state written in them. Arrows represent the transitions from one state to the next, with the name of the transition in italics.

图8-1展示了相应的过渡和状态的布局。图中，方块代表状态，方块内是对应的状态名称，箭头代表从某个状态到下一状态的过渡，过渡名称用斜体字表示。

 .. image:: img/3294f0801scrap.png

Figure 8-1. A simple state machine for paying credit card bills

图8-1 一个表示支付信用卡账单的简单的状态机（state machine）

You've now extracted this business process of paying a credit card bill into a workflow. The next step is to think about roles and security for this credit card bill. This workflow now contains the business logic for an application for processing credit cards.

现在你已经把支付信用卡帐单的商务过程提取为一个工作流。下一步要考虑这个信用卡账单中的角色（roles）和安全（security）。目前来说，这个工作流包含了处理信用卡的程序所需的商业逻辑。

理解工作流中的角色（Roles）与安全（Security）
............................................

In any complicated system, you'll have users of all roles and groups. These roles give Plone a large amount of flexibility with security, but they also can make it more complicated. Chapter 9 covers security, local roles, and groups, but this section covers some key points about how these topics relate to workflow.

在任何复杂的系统中，你都会见到分布于组（groups）中或绑定在某种角色（roles）之上的用户（users）。这些角色在安全方面赋予Plone很大的弹性，但它们也能让Plone变得更为复杂。第9章涵盖了安全、本地角色（local roles），以及组的相关内容，但是在这部分我们会讨论一些关键内容，来阐明下一章的这些主题是怎样和工作流联系起来的。

When a piece of content moves from one workflow state to another, the workflow process can change the security settings on that content. The security settings determine what user can perform what action on what piece of content. By manipulating the security settings through workflow, you can cause the security to change on a piece of content through its life cycle. Users from static systems or Zope often get confused because in Zope, all pieces of content have the same security settings throughout their life cycle.

当一条内容从一种状态迁移至另一状态时，工作流能够改变这条内容的安全设置（security settings）。安全设置决定了哪些用户可以在哪些内容上执行哪些动作。通过在工作流中熟练地进行安全设置，你可以在一条内容的生命周期里对它的安全属性进行变更。在静态系统（static systems）或Zope中的用户经常会感到迷惑，因为在Zope中，所有内容在它们的生命周期里自始至终持有相同的安全设置。

Returning to the credit card example, you can infer the security settings for the credit card bill. One way to represent this is to produce a table that expands the security in general terms for the transitions that can occur at each of the various states, as shown in Table 8-1.

回顾信用卡的例子，你能推断出信用卡账单的安全设置。我们创建一个表格来表征它，这个表格笼统地阐述了在各种状态之间发生过渡时，安全（security）的面貌。请看表格8-1。

Table 8-1. The Transitions and Entities That Can Make Them

表格8-1 过渡以及可以激活这些过渡的实体

============= ============= =============
State         Me            Bank
============= ============= =============
Draft                       Post
------------- ------------- -------------
Review        Pay           Reject
------------- ------------- -------------
Paid                                     
============= ============= =============


============= ============= =============
状态            我              银行
============= ============= =============
草案                            发送
------------- ------------- -------------
审批            支付            驳回
------------- ------------- -------------
（已）支付                                     
============= ============= =============

At this stage in Table 8-1, you've seen the transitions and who can make them. You haven't thought about the access that each user has to perform an action on an object at each point. For example, at which point can someone edit the bill, and when can it be viewed? These are called *actions* in Plone terminology, as shown in Table 8-2. I hope that only I have access to my own credit card statements! Likewise, at any stage, the bank is able to view the credit card bill and answer queries on it.

眼下在表格8-1中，你已经看到了几种过渡，以及可以激活它们的人或机构。你尚未考虑在每一个过渡中，每名用户必须在一个对象上执行一个动作，即存取权问题。举个例子，在哪个过渡中可以编辑账单，以及在什么时候可以查看账单？这些在Plone术语中就叫做 *动作* ，正如表格8-2显示的那样。我希望只有自己可以访问自己的信用卡帐目！同样，在任何时候，银行亦可以查看信用卡账单和回复相关的询问。

Table 8-2. The Actions and Entities That Can Make Them

表格8-2 动作以及可以激活这些动作的实体

============= ============= =============
State         Me            Bank
============= ============= =============
Draft                       View, Edit
------------- ------------- -------------
Review        View          View
------------- ------------- -------------
Paid          View          View
============= ============= =============


============= ============= =============
状态            我              银行
============= ============= =============
草案                            查看，编辑
------------- ------------- -------------
审批            查看            查看
------------- ------------- -------------
支付            查看            查看
============= ============= =============

Actually, as it turns out, I can't edit my credit card bill; only the bank can. I can send back my credit bill by rejecting it, but the bank is unlikely to want my edits. In this situation, assume the bank is the owner of the credit card bill. This demonstrates a concept called *ownership*. I may have several credit card bills from several banks, and in each case you can think of the bank as the owner. Each bank owns its own credit card bills, but Bank A isn't the owner of Bank B's bill. Table 8-3 combines the transitions and actions, changing the terms *Me* and *Bank* to *Payee* and *Owner*, respectively.

实际上，正如表格8-2所示，我不能编辑我的信用卡账单；只有银行能这么做。我可以驳回账单，把它送回银行，但是银行不希望我可以对其进行修改。在这种情况下，就假定银行是这张信用卡账单的所有者（owner）。自然地，我们又推出了一个概念，叫做 *所有权* （ownership）。我可能持有不同银行发放的信用卡，无论哪种情况你都可以把每个银行看作是其信用卡的所有者。同样每个银行拥有它自己的信用卡账单，但是银行A不能成为银行B的账单的所有者。表格8-3把过渡和动作结合到一起，然后再把 *我* 和 *银行* 的称谓分别改成了 *付款人* 和 *所有者* 。

Table 8-3. The Transitions and Actions Combined, plus the Roles of People

表格8-3 过渡和动作结合到一起，并附加了人们的角色

============= ================= ================
State         Payee             Owner
============= ================= ================
Draft                           Post, View, Edit
------------- ----------------- ----------------
Review        Pay, Reject, View View
------------- ----------------- ----------------
Paid          View              View
============= ================= ================


========================== ========================== ==========================
  状态                           付款人                         所有者
========================== ========================== ==========================
  草案                                                          发送，查看，编辑
-------------------------- -------------------------- --------------------------
  审批                           付款，驳回，查看               查看
-------------------------- -------------------------- --------------------------
  （已）支付                     查看                           查看
========================== ========================== ==========================

 Of course, this is a rather contrived example, but it illustrates how you can apply workflow to basic states. More transitions can occur here-for instance, I'd be more than happy for someone else to pay my credit card bill for me-but that's so unlikely that you shouldn't add it to the workflow or security.

 当然，这只是一个相当做作（contrived）的例子，但是它阐明了怎样将工作流应用到基本状态中去。更多的过渡可以在这里发生——例如，我更乐于有个人能为我支付信用卡账单——但是这不太可能，你不应该把这种情况作为一种可能加入到工作流或安全机制中去。

Before showing how to create and edit workflows, I'll now show you the default workflows that ship with Plone.

在向你展示如何创建并编辑工作流之前，我会介绍一下Plone中自带的默认工作流（default workflows）。

介绍Plone的工作流
...........................

Plone ships with a set of default workflows for your Plone site. These workflows provide a logical way of moving content through a Plone site. A standard Plone site ships with two workflows: the default workflow and the folder workflow. The following sections present each of these in turn.

Plone提供了一套自带的默认工作流可用于建立你的站点（Plone site）。在Plone内部，这套工作流提供一种逻辑方法来移动内容。一个标准的Plone站点自带两种工作流：默认工作流（default workflow）和文件夹工作流（folder workflow）。接下来按顺序介绍它们。

默认的工作流
,,,,,,,,,,,,,,,,

Chapter 3 covered the default workflow and the default settings when publishing content. I discussed the security and settings for each state in the workflow. However, a picture is worth a thousand words, so Figure 8-2 shows the workflow state.

第3章介绍过在发布内容时我们所能见到的默认工作流及其默认的设置。那会儿我也探讨了工作流中每个状态的安全和设置。然而，一张形象化的图片胜过千言万语——来看图8-2，它展示出工作流状态（workflow state）。

 .. image:: img/3294f0802scrap.png

Figure 8-2. The default workflow for content that comes with Plone

图8-2 Plone自带的默认工作流，它将改变内容的状态

Figure 8-2 shows the main states and the transitions. This figure has a gray dotted line that represents a sort of security divider. To the left of the line is where owners of the content usually interact with the content. To the right of the line is where reviewers usually interact with the content.

图8-2呈现了主要的状态和过渡。再仔细看一下，图中有条灰色虚线表示安全分界线（security divider）。分界线左边是所有者（owners）和内容频繁交互的区域，右边则是审批者（reviewers）和内容频繁交互的区域。

 **NOTE**	The owner of the content is the person who created the content originally. An owner is one particular member of a Plone site. Although many members exist in a Plone site, only one person can be the owner of a piece of content in a Plone site. Because the owner role is calculated when an object is created, the owner role is special.

 **注意**	内容的所有者（the owner of the content）是指最先创建它的人。所有者（an owner）是Plone站点中特殊的成员（member）。尽管在一个Plone站点中存在许多成员，但是只有一名成员是某条内容的所有者。因为当一个对象被创建时，专门形成了所有者这个角色，它是特殊的（special）。

Just like with the credit card example, an associated set of permissions exists for the default workflow. Table 8-4 outlines all the permissions and the states.

正如信用卡的例子，一组与之相关联的许可（permissions）为默认的工作流而存在。表格8-4描绘出所有的许可和状态。

Table 8-4. The Default Workflow Permissions

表格8-4 默认工作流的许可

============= ================= ================ ============= ================= ================
State         Anonymous         Authenticated    Owner         Manager           Reviewer
============= ================= ================ ============= ================= ================
Pending       View              View             View          Edit              Edit
------------- ----------------- ---------------- ------------- ----------------- ----------------
Private                                          Edit          Edit              View
------------- ----------------- ---------------- ------------- ----------------- ----------------
Published     View              View             View          Edit              View
------------- ----------------- ---------------- ------------- ----------------- ----------------
Visible       View              View             Edit          Edit              View
============= ================= ================ ============= ================= ================

View refers to the following permissions: Access Contents Information and View

查看（view）引用的许可有：访问内容信息（Access Contents Information）和查看（View）

Edit refers to the following permission: Modify Portal Content

编辑（Edit）引用的许可有：修改入口内容（Modify Portal Content）

As you can see from Table 8-4, by default only when content is in the private state is it truly hidden from everyone else. When content is in the published state, only the manager can edit it. Later in the "Editing Permissions" section, I'll show you how to change these permissions easily through the Web.

正如你在表格8-4中看到的，默认情况下当内容处于私有状态时，对任何人来说它是真正隐藏着的。当内容处于发布状态时，只有管理员可以编辑内容。稍后在“编辑许可（Editing Permissions）”部分，我会向你介绍如何简单地通过Web来改变这些许可。

文件夹工作流
,,,,,,,,,,,,,,,

I also discussed the folder workflow in Chapter 3, when I covered publishing content with you. However, as I noted in that chapter, no pending state exists for folders. Instead, you have a slightly simpler workflow, as shown in Figure 8-3.

在第3章中我向你介绍了发布内容（publishing content），那会儿也讨论过文件夹工作流（folder workflow）。然而，那时我已经注意到，文件夹并不存在提交状态，我们是用一个更简单的工作流来替代，如图8-3。

 .. image:: img/3294f0803scrap.png

Figure 8-3. The folder workflow for content that comes with Plone

图8-3 Plone自带的文件夹工作流，它将改变内容的状态

其他形式的工作流
,,,,,,,,,,,,,,,

Numerous workflows are available to a Plone site, including private workflow, community workflow, one-step publication workflow, and so on. ZopeZen<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ZopeZen" title="create this page">?</a> comes with a workflow, and PloneCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneCollectorNG" title="create this page">?</a> also comes with a workflow. DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> comes with four workflows.

一个Plone站点可以包含各种各样的工作流，包括私有工作流（private workflow），共有工作流（community workflow），一步式发布工作流（one-step publication workflow），等等。ZopeZen自带一个工作流，PloneCollectorNG也是自带一个工作流。DCWorkflow自带四个工作流。

Currently, two workflows come in the PloneWorkflows<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneWorkflows" title="create this page">?</a> product in the collective project on SourceForge<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=SourceForge" title="create this page">?</a> (*<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>*): the community workflow and one-step publication workflow. The community workflow is similar to the Plone workflow, with a few changes. The one-step publication workflow has two states: private and published.

目前，在SourceForge (*<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>*)的集体项目（collective project）中PloneWorkflows产品携带了两个工作流：共有工作流和一步式发布工作流。共有工作流和Plone工作流类似，但稍有变化。一步式发布工作流包括两种状态：私有和（已）发布。

At the moment, you have no easy way to install and uninstall workflows, and you have no real easy way to transition content between one state and another. For example, if you install the one-step publication workflow into an existing state, you also need to fix the states for all objects and move them into one of the new states. In this case, it's probably simple-everything in a published state should stay as it is, and everything else should move into the private state.

此刻，你没有简单的方法来安装或卸载工作流，也没有真正简单的方法在任何两种状态间过渡内容。例如，如果你想在一个已经存在的状态下安装一步式发布工作流，你需要为所有的对象调整状态并且将它们转移至一个新的状态中去。这样的话，事情大概会简单的——即所有处于（已）发布状态的东西应该保持现有状态，其他的则该转移至私有状态。

添加与编辑工作流
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that I've discussed the default workflow, I come to the key point that's probably most on your mind: How can you change the defaults? Well, as with most of Plone, you can add, edit, and delete all workflow through the ZMI. The tool that controls workflow is *portal_workflow*. In the following sections, I cover how workflows are assigned and then go through all the settings for a workflow in detail.

现在我们已经讨论了默认的工作流，我想起了关键点——它可能总在你的头脑中萦绕：我怎样能改变默认的东西？好吧，正如Plone中常见的方式，你可以通过ZMI来添加，编辑和删除所有的工作流。控制工作流的工具是 *portal_workflow* 。在接下来的部分，我向你详细介绍如何分配工作流（how workflows are assigned）以及之后对一个工作流进行彻底的设置。

针对一个内容类型（Content Type）设置工作流
...................................

After clicking *portal_workflow*, you'll see a list of workflow assignments. A feature of DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> is that each content type has one and only one workflow assigned to it; Figure 8-4 shows these assignments.

点击 *portal_workflow* 后，你会看到一个配置工作流的列表。DCWorkflow的特点是每个类型的内容有且只有一种工作流与之相联系；图8-4展示了这些关联。

 .. image:: <a href="http://weirdo.objectis.net/3294f0804.png">http://weirdo.objectis.net/3294f0804.png</a>

Figure 8-4. The list of workflow by type

图8-4 按（内容）类型来区分工作流的列表

On this page you'll see a list of each content type and the workflow that has been applied to it. If a workflow isn't specified (in other words, the value is blank), then no workflow is applied. As an example, the default for the Portal Site type is blank. You really don't want to try transitioning the Plone site itself, just the objects in it. If the value is (Default), the default workflow at the bottom of the page is applied to that content type. In Figure 8-4, for topic and folders, the *folder_workflow* workflow is used, and for all other content types, *plone_workflow* is applied. The names of the workflow refer to the name of workflow objects imported or created inside the workflow tool. For more information on the workflows available, select the Contents tab. This opens a list of workflows that have been loaded into the system, as shown in Figure 8-5.

在上图中你能看到不同类型的内容以及应用在这些内容上的工作流。如果某个工作流没有确定下来（换句话说，如图，输入框中的值是空的），那么就没有工作流被应用。举个例子，默认情况下的入口站点类型（Portal Site type）是空值。实际上你是不需要尝试着让Plone站点自身实现过渡，而是Plone站点中的对象。如果输入框中的值是(default)，那么页面最下方的默认工作流就会应用于对应的内容类型。图8-4中， *folder_workflow* 应用于主题（topic）和文件夹（folders）， *plone_workflow* 则应用于其他内容类型。工作流的名称（the names of the workflow）是指在工作流工具（the workflow tool）内部被引入（imported）或被创建（created）的工作流对象的名称。点击内容标签（the Contents tab）可以获得更多关于工作流的有用信息，一个显示已被载入到系统中的工作流列表会被打开，见图8-5。

 .. image:: <a href="http://weirdo.objectis.net/3294f0805.png">http://weirdo.objectis.net/3294f0805.png</a>

Figure 8-5. Workflows available

图8-5 （系统中）可用的工作流

You can add workflows by clicking the Add Workflow button. This opens a list of the workflows available; to create a workflow, select a workflow type and enter a workflow name. To create workflow that's empty but that's configurable through the Web, select *dc_workflow* and enter an appropriate name; for example, enter **my_workflow**.

点击添加工作流按钮（Add Workflow）可以添加工作流，然后会显示列表说明哪些类型的工作流可供添加；想要创建一个工作流的话，就选择一种工作流类型然后命名它。若要添加一个可以通过Web调配的（初始状态为）空的工作流，则应该选 *dc_workflow* 然后起个适当的名称；例如，起名为 **my_workflow** 。

编辑工作流
..................

From the Contents tab, you can click a workflow to access the management screens for that workflow: all the states, transitions, and associated features. The series of tabs across the top of the page outlines the functionality of a workflow quite well: States, Transitions, Variables, Worklists, Scripts, and Permissions. I'll run through each of these tabs and some of the other options available. Unless otherwise mentioned, all the following tabs are accessible from this main workflow page.

在内容标签（Contents tab）下，点击一个工作流可以进入与之对应的管理屏幕（management screens）：包括所有的状态，过渡，以及相关特征。这一系列横跨页面顶部的标签彻底描绘了一个工作流的功能：状态（States），过渡（Transitions），变量（Vriables），工作列表（Worklists），脚本（Scripts），和许可（Permissions）。我将逐个讲解每个标签以及以一些有用的选项（options）。除非另有说明，下述的所有标签都可以通过这个主工作流页面访问。

Creating or editing workflow can require lots of clicking and can be a little confusing. If you're a developer keen on using the file system, then you can do all this from Python if you want-I cover this for you later in this chapter in the "Writing a Workflow in Python" section.

创建或编辑工作流会需要进行很多次点击操作并且让人有一点点糊涂。如果你是一位开发人员更热衷于使用文件系统（来达到同样的目的和效果），那么你可以使用Python，只要你愿意——在这章的“用Python撰写工作流（Writing a Workflow in Python）”部分，我会和你探讨的。

设置初始状态
,,,,,,,,,,,,,,,,,,,,,,,,,

To set the initial state, go to the States tab and check out the states available; next to one of the states you'll see an asterisk, as shown in Figure 8-6.

设置初始状态时，点击状态标签（States tab）然后检查可用的状态；在图8-6中，有一个状态旁边是用星号（asterisk）标注的。

 .. image:: <a href="http://weirdo.objectis.net/3294f0806.png">http://weirdo.objectis.net/3294f0806.png</a>

Figure 8-6. Setting the initial state for this workflow

图8-6 为这个工作流设置初始状态

You set the initial state for your workflow on this page by checking the box next to the state and then clicking Set Initial State. All content that uses this workflow will be created with an initial state. Any content that has already been created will remain in its initial state; changing the state afterward won't change that state. You can set only one initial state for each workflow.

通过逐项核对每个状态旁的复选框然后点击设定初始状态按钮（Set Initial State），你可以为你的工作流设置初始状态。所有使用这个工作流的内容在被创建时都会拥有一个初始状态。任何（在重新设置初态之前）已经被创建的内容仍将保持它已有的初始状态；后来改变的状态不会影响这些状态。你可以为每个工作流只设置一个初始状态。

怎样将初始状态设为私有（Private）？
#############################################

On some sites it may make sense for content to not show up at all or be accessible to users other than administrators and owners only after it has been completed. The best way to do this is to set the default state for the object to something that provides this security-for example, private. In the private state, only reviewers, managers, and owners can actually see the item.

在一些站点中，内容往往不会随便就显露出来或者仅对使用者（users）开放，从内容的角度来讲，这么做是有意义的，它不同于只有在内容被建立完成后才能让管理员和拥有者使用的情况。实现后一种情况的最好办法就是为对象设置默认的状态以达到能实现这种安全机制的目的，而这个默认状态——比如说私有（private）就可以满足我们的需求。在私有状态下，实际只有审批者，管理员和所有者可以看见内容。

To set the default state to private in the ZMI, click *portal_workflow*, and select the Contents tab. Next, click *plone_workflow*, select the States tab, and then select the default state by checking the box next to *visible*. Finally, click the Save Changes button. New content will now be in the private state and not accessible to the general public.

在ZMI中设置默认状态为私有，先要点击 *portal_workflow* ，选择内容标签（Contents tab）。然后点击 *plone_workflow* ，选择状态标签（States tab），通过勾掉 *visible* 旁的复选框来选择默认状态。最后，点击保存变更（Save Changes）按钮。这样做后，新内容将处于私有状态，对公众来说也是不可访问的。

编辑状态
,,,,,,,,,,,,,,

The States tab lists the states that are present in this workflow. At the beginning of this chapter, I explained that a state represents an object at a particular point in time. Each state has an ID that's unique; this is usually a simple verb such as *pending* or *published*. To add a state, enter an ID and click Add at the bottom of the page.

状态标签（States tab）列出了在这个工作流中存在的所有状态。在本章开始，我解释过状态代表着对象处于某个特定的时间点。每种状态持有唯一的ID；通常，状态更像是一个动词，比如 *草案（pending）* 或 *（已）发布（published）* 一样。若要添加一个状态，就输入一个ID然后点击页面下方的添加（Add）按钮。

You'll also see the following options:

添加状态时你会看见下列选项：

 **Title**: The title of the state is displayed in your Plone site and is a user-friendly version of the state.

 **标题** ：状态的标题在你的Plone站点中显示，实际上是状态这个比较抽象的概念对于用户来说较友好的一个表征（a user-friendly version of the state）。

 **Description**: The description of the state is a long description of the state. This isn't currently shown to users but may be in the future.

 **描述** ：状态的描述是关于状态的一个详细的文字说明。目前来说它不会显示给用户，但也许会在未来派上用场。

 **Possible transitions**: This lists all the possible transitions that can occur from the state. This list will show only if you actually have a transition in the system. Simply select the transitions that need to occur on this state. By selecting a transition for this state, you're selecting the start point for this transition to be this state.

 **可能存在的过渡** ：这一项列出了所有可能发生于状态之间的过渡。只有当你的系统真正用到过渡时它才会显示。我们只需要选择会在这个状态下发生的过渡。一旦你为这个状态选择好一个过渡，你也就选择了这个状态来作为这个过渡的开始点。

To alter a state, enter the changes and then click Save to commit the changes. The Permissions tab will open with the permissions that will be applied to an object while it's in this state. This may mean changing the permissions on an object when it transitions into that state. The form is rather self-explanatory; to enable an anonymous user to view the object, check the boxes that correspond to View and Anonymous and click Save, as shown in Figure 8-7.

若要改变一个状态，就输入变更然后点击保存按钮（Save）提交这些变更。许可标签（Permissions tab）打开时，如果对象在这种状态下，则会看到能应用其上的各种许可选项。这可能意味着当对象过渡至这个状态时，相应地要改变载于其上的各种许可。（图8-7中）这个表单是相当自明的（self-explanatory）；若要让匿名者可以查看对象，就勾选查看（View）和匿名者（Anonymous）旁边的复选框，并保存。见图8-7。

 .. image:: <a href="http://weirdo.objectis.net/3294f0807.png">http://weirdo.objectis.net/3294f0807.png</a>

Figure 8-7. State permissions page

图8-7 状态许可的页面

If you change the permissions for a particular workflow state, you've created an issue that needs resolving. Any existing content in that state won't have the new workflow permissions set on it. The content will have the old workflow permissions, and you'll need to update them. When you've finished making all your changes, go to the root workflow page and click Update Security Settings, as shown in Figure 8-4. Performing that update may take a while depending upon the number of objects to be altered.

如果你改变了某个特定工作流状态的许可，你就创建了一个需要解析的结果。所有处于那个状态但已经存在的内容不会顺应新的工作流。这些已存在的内容持有的是旧有工作流许可，你需要更新（update）它们。具体来说，就是当你完成所有变更设置后，去工作流的根页面并点击更新安全设置（Update Security Settings），如图8-4所示。执行这个变更可能会花些时间，这取决于需要改变的对象的数量。

The Variables tab allows you to assign a value to a variable when the object is in this state. The workflow determines the list of variables available to each state. For more information on these, see the "Editing Variables" section.

变量标签（Variables tab）允许你当对象处于这种状态时赋（assign）一个值给一个变量。工作流会确定那些对应于每个状态的可用变量列表。关于这方面的更多内容，详见“编辑变量（Editing Variables）”部分。

编辑过渡（Transitions）
,,,,,,,,,,,,,,,,,,,

The Transitions tab lists the transitions that will occur in this workflow. In the beginning of this chapter, I showed you how a transition represents the changes that will occur to the object. Each transition has a few variables that are shown on the summary page. To add a transition, enter an ID and click Add at the bottom of the page, as shown in Figure 8-8.

过渡标签（Transitions tab）列出了在工作流中将会发生的过渡。在本章开始，我向你展示了过渡如何作用于对象使其发生改变。每个过渡都有自己的摘要页面（summary page），其中含有一些变量（variables）。若要添加一个过渡，在过渡页面下方输入ID并点击添加按钮（Add），如图8-8。

 .. image:: <a href="http://weirdo.objectis.net/3294f0808.png">http://weirdo.objectis.net/3294f0808.png</a>

Figure 8-8. Transition details page

图8-8 定义过渡的页面

If you now click a transition, you'll open the following details for that transition:

如果你点击了指向过渡的一个链接，就会打开一个用以显示该过渡的详细内容的页面。其中包括：

 **Title**: This is the title for this transition.

 **标题**: 过渡的标题。

 **Description**: This is the detailed description for this transition.

 **描述**: 关于该过渡的详细描述。

 **Destination state**: This is the state that will be the target for this transition. The initial source state is defined by assigning the transition to the state.

 **目标状态**: 目标状态是这个过渡发生时所要抵达的状态，可以把它理解为过渡的“靶子”。通过把携带了目标状态的过渡分配给初始状态，初始状态才被真正定义下来。

 **Trigger type**: This indicates how the transition will be triggered. *Automatic* means that this will happen as soon as it moves into this state. *Initiated by user action* is the most common choice and means a user has enacted the transition by clicking a link.

 **触发器类型**: 指出过渡如何被触发。自动式（Automatic）表示内容一旦移至该状态（从上下文和Plone机制分析，这个状态应该指的是初始状态，欢迎指正——译者注），这个过渡就会发生。而通过用户动作触发（Initiated by user action）是最通常的选择，意味着某个用户点击一个链接时就能触发这个过渡。

 **Script (before)**: This runs this script before this transition occurs.

 **脚本（之前）**: 在这个过渡发生之前执行脚本（此时内容尚未到达目标状态——译者注）。

 **Script (after)**: This runs this script after this transition occurs.

 **脚本（之后）**: 在这个过渡发生之后执行脚本（内容到达目标状态后，执行脚本——译者注）。

 **Guard**: This is the security for this state (explained shortly).

 **安全**: 该状态的安全设置（稍后再作解释）。

 **Display in actions box**: This is how this transition will be displayed in Plone. Entering a value here also ensures that the transition will be entered as an action. You can then get this transition as an action by querying for actions.

 **动作箱中的显示方式**: 是指这个过渡在Plone中如何显示。在这里输入值也可以确保把这个过渡作为一个动作来开始，你可以通过查询动作来获得这个过渡。

Of these values, the destination state is quite interesting. Although I've already mentioned that transitions normally change state, this isn't required. Because each transition can run scripts and write something into the history, it can be useful sometimes *not* to change state. For an example of this, see the "Using Workflow to Track Changes" section later in this chapter. If your transition does change the state, then select the new state as the destination state.

在上面罗列的各项中，目标状态（destination state）相当引人好奇。我已经提到过渡通常会改变状态，但这不是必需的。因为任何过渡都可以执行脚本、向历史记录中写入一些东西，在某些时候这样做会很有用。过渡 *并不* 只局限于改变状态。关于这方面的实例，可以阅读一下稍后出现的“运用工作流跟踪变化（Using Workflow to Track Changes）”章节。如果你配置的过渡确实需要改变状态，那么就选择一个新状态作为目标状态。

A transition can have multiple starting points but only one destination; if you need multiple destinations, you'll have to make multiple transitions. You can specify scripts to run before or after this transition. Two common examples are moving an object in workflow and sending an e-mail notification. The "Common Tasks and Examples" section covers both of these examples.

一个过渡可以有多个开始点（starting points），但只能有一个目标（状态）；如果你需要多个目标状态，你必须设置多个过渡。你可以指定脚本在过渡发生之前或之后运行——有两个常见的例子：在工作流中移动对象和发送e-mail通知。这些例子将在“常见任务和实例（Common Tasks and Examples）”一节见到。

Before any transition can be executed, a security guard checks the entire transition to ensure that the user running the transition has the right to do so. The guard has the following three components:

在过渡开始执行之前，安全设置（security guard）将检验所有的过渡来确保执行过渡的使用者有权限进行操作。安全设置由三部分组成：

 **Permission(s)**: These are the required permissions. Multiple permissions should have a semicolon (;) to separate them.

 **许可** ：包含了必需的许可。多个许可之间应该用分号（semicolon）分隔开。

 **Role(s)**: These are the required roles. Multiple roles should have a semicolon (;) to separate them.

 **角色** ：包含了必需的角色。多个角色之间应该用分号分隔开。

 **Expression**: This is a workflow expression. For more information on this, see the "Editing Workflow Expressions" section later in this chapter. For each value specified, the guard must evaluate as true before continuing. If a test of any of the values fail, then the transition won't execute. Usually you'll find most guards have only one or two values specified.

 **表达式** ：是一个工作流表达式（workflow expression）。关于这方面的更多信息，请阅读本章稍后讲到的“编辑工作流表达式（Editing Workflow Expressions）”一节。在过渡执行之前，对于每一个已被指定的值，安全设置都要对其进行评估，以确保正确。如果对其中任一值的评估测试失败，这个过渡将不能执行。通常你会发现大多数安全设置只有一或两个被指定好的值。

编辑变量
,,,,,,,,,,,,,,,,,

The Variables tab lists the variables that will be created and changed in the workflow. I haven't discussed variables much with you up to this point; instead, I've focused on states and transitions. This section covers variables.

变量标签罗列出所有在工作流中被创建或被更改的变量。至此我还没有和你过多讨论变量，相反，我们刚刚关注了状态和过渡。这一节我们来研究一下变量。

It isn't always possible, and I don't recommend that you try, to encapsulate all the information you'll need in a workflow within just states and transitions. Instead, you can use variables to store some workflow-related information. For example, in the credit card bill example, the bill could be paid by several methods (Internet banking, check, and so on). You could store the amount method ($100, for example) in a variable. Should the bill be rejected or altered, that amount would be updated. The point of a variable is to have something that changes between each state and transition.

我并不赞成你尝试着将所有可用的信息以“填充胶囊”的方式汇集在一起并只运用状态和过渡来表达——这样做也是不太可能的。取而代之，你可以用变量来存储与工作流相关的信息。举个例子，信用卡账单可以多种方式支付（网上银行或支票等等）。你可以把支付的钱（比如100美元）存储在一个变量里。账单被拒绝或被更改时，支付的钱数（这个变量）都会更新。变量的作用就是持有一些在每个过渡与状态之间发生改变的元素（something）。

So, returning to the main workflow page, click the Variables tab to get a list of all the variables. To add a variable, enter a *variable* ID and click Add at the bottom of the page. To determine what state an object is in at any time, DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> stores the current state in a variable on the object. The default name of that variable is *review_state*.

那么，返回到工作流的主页面，点击变量标签（Variables tab）就能得到一个包含所有变量的列表。需要添加变量时，可以输入 *变量* ID，然后点击页面下方的添加（Add）按钮。DCWorkflow在一个变量中保存着对象目前所处的状态，这样就可以在任何时候去查看此对象的状态了。那个变量的默认名称是 *review_state* 。

 **NOTE**	If you need to change this because it conflicts with another name, you can do so at the bottom of that page. However, doing this will cause all your current objects to lose their state, so be careful about changing that value.

 **注意**	如果你是因为这个变量的名称和其他变量名称发生冲突而这么做，那么你可以在页面下方来更改名称。然而，这样做会让你所有的对象失去它们的状态，所以对这个值的改变，你要慎重考虑。

Each workflow variable has the following properties:

每个工作流变量含有下列属性：

  - **Description**: This is the variable description.

  - **描述** ：对变量自身的描述文字。

  - **Make available to catalog**: These variables will be placed in a list exposable to the catalog. This doesn't add indexes or metadata to the catalog; you still have to do that manually.

  - **在目录中有效** ：此项属性表明这些变量会被置入一个列表，并显式地存在于目录（catalog）中。变量在目录中有效并不意味着向目录中添加了索引（indexes）或元数据（metadata）；你仍然要自己动手去做。

  - **Store in workflow**: This determines if the information is to be stored in the workflow or on the object.

  - **存储在工作流中** ：此项属性会检查信息是否被保存在工作流中，或是附加在对象上。

  - **Variable update mode**: This determines when to update the variable.

  - **变量更新模式** ：此项属性检查什么时候来更新变量。

  - **Default value**: This determines a default value as a string.

  - **默认值** ：此项属性认为默认值是一个字符串，对其进行检查。

  - **Default expression**: This is the default value as an expression. If this is present, it'll be used instead of default value (for more information, see the "Editing Workflow Expressions" section later in this chapter).

  - **默认表达式** ：此项属性中的默认值是一个表达式。如果它出现在此，就会被用来替代默认值（更多信息，请阅读本章后面的“编辑工作流表达式（Editing Workflow Expressions）”一节）。

  - **Info. guard**: These are security settings for accessing this variable. These guard settings are similar to the guard settings for a transition; however, the guard occurs when accessing the variable here.

  - **信息安全设置** ：此项属性包含了访问变量时所定义的安全设置。这些安全设置和过渡中的安全设置很相似；但是这里说到的安全性检查是在访问变量时才会发生的。

编辑工作列表（Worklists）
,,,,,,,,,,,,,,,,,

The Worklists tab provides access to all the worklists that are assigned in this workflow. A *worklist* is a method of querying the workflow for information about the numbers of objects in that workflow. For example, I'd like to be able to easily ask the workflow for all the outstanding credit card bills I have.

工作流中所有被分配的工作列表，是由工作列表标签（worklists tab）来提供对它们的访问（access）。 *工作列表* 是一种用于查询（querying）工作流中特定信息的方法（method），它被用来查询存在于工作流中的对象数目的信息。例如，我希望很容易地从工作流中查询出全部尚未付清的信用卡。

To add a worklist, enter an ID and click Add. Each worklist has the following properties:

添加工作列表时，输入ID并点击添加按钮（Add）。每个工作列表含有下列属性：

  - **Description**: This is a description of the worklist.

  - **描述** ：对工作列表自身的描述文字。

  - **Cataloged variable matches**: This is the value that the worklist must match to be added in this worklist. The variable matched is the workflow state variable given in the variables list (the default variable name for this variable is *review_state*).

  - **编成目录的变量匹配** ：此项属性包含的是工作列表必须匹配的值，此值被添加在这个工作列表中。进行匹配的变量是变量列表中给出的工作流状态变量（workflow state variable）（这个变量的默认名称是 *review_state* ）。

  - **Display in actions box**: This is information to display on the user interface. Entering a value here also ensures that the transition will be entered as an action. You can then get this transition as an action by querying for actions.

  - **在动作箱中（actions box）的显示** ：此项属性包含的东西将会以某种形式在用户界面上表现出来。在这里输入值也可以确保过渡会以一个动作作为开始。然后你就可以通过查询动作来获取这个过渡。

  - **Guard**: This is a guard for accessing this worklist.

  - **安全设置** ：此项属性包含了访问工作列表时所定义的安全设置。

Returning to the credit card example, if I wanted to know all the credit card bills that need reviewing by me, then I could place this information in a worklist. First, the variable *review_state* would contain the current state for each item. All the credit card bills that need reviewing would be in the *review* state. Second, I'd add a worklist called *review_queue*, and the value for variable would be *pending*. I could now ask the worklist for all the items in the *review_queue*.

回到信用卡的例子，如果我想知道哪些信用卡需要自己来审核，那么我可以把这些信息置入一个工作列表中。首先， *review_state* 变量会包含有每张信用卡当前的状态，而那些需要审核的信用卡会在审核（review）状态下。其次，我已经添加了一个名为 *review_queue* 的工作列表，其中，变量的值会是 *pending* （中文译为“未决的”，在默认的中文Plone中也有“提交”的意思——译者注）。现在，我就可以在 *review_queue* 这个工作列表中查询所有的信用卡项目（items）了。

Although a worklist is a convenient way of storing this information, Plone doesn't use them. Instead, Plone uses ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ZCatalog" title="create this page">?</a> directly to query objects that are workflowed. Since the DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> worklist uses the catalog tool, the end result is the same.

尽管工作列表是存储此类信息的便利方式，但是Plone并不使用这些信息，它以另一种方式——ZCatalog——替代工作列表。Plone直接用ZCatalog查询那些处于工作流内（workflowed）的对象。从DCWorkflow使用目录工具以来（catalog tool），最终的结果都是一样的。

编辑脚本
,,,,,,,,,,,,,,,

The Scripts tab lists the scripts that are available this workflow. This list is actually a standard folder in the ZMI, and you can add almost anything there. Since the main reason you'd want to do this would be to add a script to perform advanced handling of transitions, you should add only Script (Python) objects here.

脚本标签（Scripts tab）列出了工作流中有效的脚本。这个列表实际上是ZMI中的标准文件夹（standard folder），你几乎可以在这里添加任何东西。既然你希望在这里添加脚本的主要原因是想对过渡进行高级处理，那么你应该只添加脚本（Python）对象。

To add a script from the Scripts tab, select Script (Python) from the Add drop-down menu, and give the script an ID. The script is passed one and only one object, which is the base workflow expression object; for more information on this object, see the "Editing Workflow Scripts" section later in this chapter. For example, if you need to access the actual object in the workflow, you can use a Python script such as the following:

若要从脚本标签（Scripts tab）中添加脚本，先从添加（Add）下拉菜单中选择Script(Python)，然后给所要添加的脚本起个ID名。一个脚本只被传递给一个对象——即基本工作流表达式对象；关于这个对象的更多信息，请阅读本章稍后介绍的“编辑工作流脚本（Editing Workflow Scripts）”一节。先来举个例子，如果你需要访问目前存在于工作流中的对象，你可以用下面这个Python脚本来实现：

::

 ##parameters=state_change
 obj = state_change.object

What happens in this script is up to the developer-you can run almost anything here. You can trigger events, and you can access other workflows and transitions. For some example scripts, see the "Sending E-Mail Notifications" and "Moving Objects" sections later in this chapter. When the script executes, it will execute as the user who initiated the transition. You could assign proxy roles on the script if it needs to happen as someone else. Returning to the transitions, you can assign this script to any number of transitions in the *script (after)* and *script (before)* settings. You can run the script either before or after a transition.

这个脚本中将会发生的事情完全要依赖于开发者——作为开发者，你在这里几乎可以做任何事情（you can run almost anything here）。你可以引发事件，你也可以访问其他的工作流和过渡。本章稍后介绍的“发送E-Mail通知（Sending E-Mail Notifications）”和“移动对象（Moving Objects）”两节会给出一些脚本实例。当脚本执行时，往往是启动了过渡的用户同时启动了脚本。如果需要让其他人来这样做，你可以把代理人角色（proxy roles）分配到脚本中。在返回过渡时，你可以在 *script(after)* 和 *script(before)* 设置中把脚本分配给任意数量的过渡。你可以在过渡发生之前或之后执行脚本。

编辑许可（Permissions）
,,,,,,,,,,,,,,,,,,,

The Permissions tab lists the permissions that are managed by this workflow. You've seen these permissions already when examining the states. You set the list of permissions manageable in those states in this tab. To add a new permission, select the permission from the drop-down box and select Add.

许可标签（Permissions tab）列出了可被这个工作流管理的所有许可。在检查状态时你已经见到这些许可了。在这个标签下，你建立了一系列可供管理的许可，它们存在于各种状态下。若要添加一个许可，从下拉菜单中选择permission然后选择添加（Add）。

怎样编辑已经发布的文档？
######################################

Well, you can't edit a published document in the default workflow unless you have the manager role. If you allow the owner of the document to edit it, then you really should review it again. However, this seems to be a common request and is a trivial thing to change. In the ZMI, click *portal_workflow*, and select the Contents tab. Then click *plone_workflow*, and select the States tab. Finally, click *published* and then select the Permissions tab. Check the box that corresponds to allowing the owner to modify portal content.

其实，在默认的工作流中你无法编辑已经发布的文档，除非你拥有管理员角色（manager role）。如果你允许文档的所有者编辑文档，那么你确实需要再次审批这些文档。然而，这看起来是个普通的要求并且是不值得改变的事情。在Zope管理界面（ZMI）中，点击portal_workflow，选择内容标签（Contents tab），然后点击plone_workflow，选择状态标签（States tab）。最后，点击 *published* 并选择许可标签（Permission tab），勾选与“允许所有者更改入口内容（modify portal content）”相对应的方框（box）。

 ***Insert 3294s0801.tif***

Click Save Changes to save your permissions. Because you've updated the security settings, you'll have to click *portal_workflow*, select the Contents tab, and click *Update security settings*. This will update all the objects in your site and ensure that your permissions have been applied to existing objects. Now owners can edit their documents while they're in the published state.

点击Save Changes保存你自定义的各种许可。由于你已经更新了安全设置，你还必须点击 portal_workflow，选择内容标签（Contents tab），然后点击Update security settings。这样做可以更新所有存在于你站点中的对象，并能确保你自定义的各种许可已经应用到现有的对象上。现在文档的所有者们就可以编辑这些处于发布状态下的文档了。

编辑工作流脚本
,,,,,,,,,,,,,,,,,,,,,,,,

Scripts are an opportunity for the developer to perform some logic upon a transition. That logic can be almost anything you want. You could be checking that some conditions have been performed (for example, is the document spell checked?) or that some special actions have been performed. When the object is transitioned, the script will be called.

脚本为开发人员提供了机会，使他们可以在过渡之上执行一些逻辑——几乎可以是任何你想要的逻辑。你可以检查一些条件是否已被执行（例如文档拼写检查是否执行了？）或者一些特殊动作是否已被执行。当对象处于过渡时期，脚本就会被唤起执行。

When a script is called, one extra parameter is passed to that script. That extra parameter provides access to all sorts of transition-related elements and attributes. That parameter is called the *state_change* parameter, and it has the following attributes:

当脚本被唤起执行时，会有一个额外的参数传递给它。这个额外的参数提供了对与过渡相关的各种元素和属性的访问通路。这个参数被称作state_change参数，它有如下属性：

 **status**: This is the workflow status.

 **status**: 工作流状态。

 **object**: This is the object being transitioned in the workflow.

 **object**: 在工作流中历经过渡的对象。

 **workflow**: This is the current workflow object for the object being transitioned.

 **workflow**: 历经过渡的对象所依赖的当前工作流对象。

 **transition**: This is the current transition object being executed.

 **transition**: 当前正在执行的过渡（过渡也被看作是一个对象）。

 **old_state**: This is original state of the object.

 **old_state**: 历经过渡的对象的原始状态。

 **new_state**: This is destination state of the object.

 **new_state**: 历经过渡的对象的目标状态。

 **kwargs**: These are keyword arguments passed to the *doActionFor* method.

 **kwargs**: 传递给 *doActionFor* 方法的关键字自变量。

 **getHistory**: This is a method that takes no parameters and returns a copy of the object's workflow history.

 **getHistory**: 一个不含参数的方法，返回对象的工作流历史的一个拷贝。

 **getPortal**: This is a method that takes no parameters and returns the root Plone object.

 **getPortal**: 一个不含参数的方法，返回Plone的根对象（root Plone object）。

 **ObjectDeleted<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectDeleted" title="create this page">?</a>(folder)**: This tells workflow that the object being transitioned has been deleted; it takes the object to which you'd like to return the user. Pass to the exception the folder you'd like the user to be redirected to (see the "Moving Objects" section later in this chapter).

 **ObjectDeleted<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectDeleted" title="create this page">?</a>(folder)**: 告诉工作流历经过渡的对象已经被删除；它含有你希望返还给用户的对象，它会转到异常，把用户重定位到你希望的folder（可参考本章后面的“移动对象”一节）。

 **ObjectMoved<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectMoved" title="create this page">?</a>(newObject, newObject)**: This tells workflow that the object being transitioned has moved. Pass to the exception the folder you'd like the user to be redirected to (see the "Moving Objects" section later in the next chapter).

 **ObjectMoved<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectMoved" title="create this page">?</a>(newObject, newObject)**: 告诉工作流历经过渡的对象已经被移动。它会转到异常，把用户重定位到你希望的folder（可参考本章后面的“移动对象”一节）。

 **WorkflowException<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=WorkflowException" title="create this page">?</a>**: This raises an expectation back to workflow and aborts the transaction (and hence the transition).

 **WorkflowException<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=WorkflowException" title="create this page">?</a>**: 抛出一个异常，回到工作流并中止事务（在这种情况下中止的是过渡）。

 **getDateTime**: This is a method that takes no parameters and returns the *DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DateTime" title="create this page">?</a>* object that relates to the transition.

 **getDateTime**: 一个不含参数的方法，返回与过渡相关的DateTime对象。

For example, to find out what state is being transitioned to and when, the following is a Script (Python) object that will tell you just that information. This script logs the information about the transition into the log file:

举个例子，如果想要知道哪些状态以及在什么时候历经过渡，下面的（Python）脚本对象可以告诉你答案。这个脚本会把你想了解的过渡信息记录到日志文件（log file）中：

::

 ##parameters=state_change
 st = 'From %s to %s on %s' % (
     state_change.old_state,
     state_change.new_state,
     state_change.getDateTime())
 context.plone_log(st)

**TIP**	When you're writing a Script (Python) object, you may need to print to the log file to help with debugging. A script called *plone_log* does this, which takes a string and passes it to Plone's logging functions. Hence, calling *context.plone_log* is a useful tool for debugging.

**提示** 当你撰写（Python）脚本对象的时候，你可能需要把它打印到日志文件中以备用来帮助调试。一个叫做plone_log的脚本会做这些工作，它会获取一些字符串信息并把这些信息传递给Plone的日志函数（Plone's logging functions）。之后便可使用context.plone_log，它是进行调试的有用工具。

When assigning a script to a transition, you have two choices: *before* and *after*. As the names suggest, a script that's set assigned to *before* runs prior to the transition running. This is suitable for scripts that may check if something should happen prior to the transition running, such as testing that another dependent object or page has been uploaded or there are no spelling errors. The script assigned to *after* runs once the transition completes-although if at any time an uncaught exception is raised on a script, this will cause the transition to fail, the object to remain in its original state, and the exception to display to the user.

当把脚本添加给过渡时，你有两种选择：before和after。正如这两个名字暗示的——以before形式添加的脚本会在过渡运行之前执行，before形式适合于那些在过渡运行之前能够检查某些事情是否应该发生的脚本，像测试其他需要依赖的对象或页面是否已被提交、或者是否没有拼写错误。以after形式添加的脚本会在过渡完毕后立即运行。虽然在任何时候，未被捕获的异常可在脚本运行时被抛出，但是这都会引发过渡失败。对象仍会保持它原来的状态，异常则会显示给用户。

编辑工作流表达式
,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Throughout this chapter you've seen values that can be expressed as workflow expressions. For example, the value assigned to a variable is the result of a workflow expression. This expression is nothing special; it's merely a Template Attribute Language (TAL) expression with a few different variables available. You already learned about TAL expressions in Chapter 5, so you should be familiar with these expression and all their options, such as Python, string, and path expressions.

贯穿本章你已纪看到值串（values）可以用工作流表达式（workflow expressions）表达。举个例子，赋给一个变量的值是（或称来自于）一个工作流表达式的结果。这个表达式没有什么特殊的；它只不过是一个模板属性语言（简称TAL）表达式并带有一些不同的可用变量。你已经在第5章学习了TAL表达式，那么你应该熟悉这些表达式和它们的选项，像Python表达式、字符串表达式和路径表达式。

Unlike the standard TAL expression, a few extra parameters are passed through to the namespace, relating to the particular workflow. The namespace for a workflow expression contains the following:

不像标准的TAL表达式，一些额外的参数直接由名字空间传递过来（passed through to the namespace），与特殊的工作流相关联。一个工作流表达式的名字空间包含有：

  - **here**: This is the object being transitioned in the workflow.

  - **here**: 在工作流中历经过渡的对象。

  - **container**: This is the container of the object being transitioned in the workflow.

  - **container**: 在工作流中历经过渡的对象的容器。

  - **state_change**: This is the state change object referenced in the "Editing Workflow Scripts" section.

  - **state_change**: 这个是在“编辑工作流脚本”一节提到的状态改变对象（state change object）。

  - **transition**: This is the transition being executed, identical to *state_change.transition*.

  - **transition**: 正在被执行的过渡，等同于 state_change.transition。

  - **status**: This is the original state, identical to *state_change.old_state*.

  - **status**: 原始的状态，等同于state_change.old_state。

  - **workflow**: This is the workflow for this object.

  - **workflow**: 对象所依赖的工作流。

  - **scripts**: These are the scripts available in this workflow.

  - **scripts**: 工作流中可用的脚本。

  - **user**: This is the user executing this transition.

  - **user**: 执行此过渡的用户。

通常的任务与例子
~~~~~~~~~~~~~~~~~~~~~~~~~

I'll now present some common tasks you can achieve easily using workflow. When a user causes a workflow transition, this transition runs using that specific user's account. In many of these examples, a normal user may not have the correct permissions to perform the task. For example, members don't normally have the right to access the list of members unless this permission has been explicitly given to them.

你能使用工作流轻易地实现一些常见任务——现在我就展示给你看。当一名用户引发了一个工作流中的过渡，这个过渡会依照对应用户的“具体情况”（account在此被翻译成“具体情况”，这里可粗略地理解为用户在Plone系统中的角色——译者注）来运行。在很多这样的例子中，一名普通用户往往没有适当的许可（权限）去执行某项任务。举个例子，成员（members）在通常情况下是没有访问成员名单的权力的，除非访问权已明确赋予他们。

To solve this permission issue, where noted, some of the following Script (Python) objects have been given a slightly different role. To set a proxy role on a script, access the Proxy tab on an object and then select the user to run the script, as shown in Figure 8-9.

为了解决这个已被指出的问题，类似下图中显示的（Python）脚本对象的执行权已经被赋予不同角色身上。这是指在脚本上设定一个代理人角色——找到某个对象的代理人标签（Proxy tab）然后选择出可以运行脚本的用户（或角色），如图8-9所示。

 .. image:: img/3294f0809.png

Figure 8-9. Setting proxy settings on a script

图8-9 在脚本上设置代理人

You would, of course, make sure your scripts executed with the minimum roles needed, depending exactly upon what your script does.

当然，建议你让可以执行脚本的角色数限制在一个最小范围内；具体地还要看脚本的实际用途了。

介绍工作流表达式
................................

The following are some useful examples of workflow expressions that can be used in various places.

下面介绍的是一些可以用在各种地方的工作流表达式，都是很实用的例子。

To get the comments, or an empty string, with this transition, use the following:

在一个过渡中需要获得“评注（comments）”或一个空字符串，可以这样写：

::

 python:state_change.kwargs.get('comment', '')

To obtain the title of the folder that the object is in, use this:

要想获得某个对象所在文件夹的标题，可以这样写：

::

 container/Title

To test if the old state is review state, use this:

要想测试旧状态是否为“评审（review）”，可以这样写：

::

 python: state_change.old_state == 'review'

To get the user executing this transition, use this:

要想知道哪个用户正在执行此过渡，可以这样写：

::

 user/getId

So if you wanted to track who the last user to transition an object was, you could add a *last user* variable into the workflow. You do this by going to the workflow and clicking the Variables tab. Then add the variable *last_user*. If you set the *Default expr* variable to *user/getId,* each time the object changed, that value would be stored for you.

所以说，如果你想跟踪最后一名在历经过渡的对象上进行操作的用户，你可以向工作流中添加一个last user变量。你需要访问工作流然后点击变量标签（Variables tab），然后添加变量last_user。如果你在Default expr（即默认表达式）中写入user/getId，那么每当对象改变时，last_user都会为你保存用户信息。

利用工作流来跟踪改变
...............................

For one particular application a client of mine wanted to keep track of every time an item was edited and any reasons for that edit so that when auditing the item later, there would be a comment for each change. Thanks to workflow, this was quite easy to achieve.

在一个特殊的应用中，我的一位客户希望保存某个条目在每次被编辑时的跟踪信息以及编辑动机，这样他可以在今后审核条目时持有对每次改变的说明。感谢工作流，客户的这个需求很容易实现！

In this case, the workflow had only one state-but actually this will work for almost any workflow. To this one workflow, a transition was added called *edit*. That transition didn't actually change the object's state; the destination state for that transition was *(Remain in state)*, meaning no change occurred.

在这种情况下，工作流只有一种状态，但是实际上这样设计几乎适用于任何工作流。对这样一个工作流来说，需要添加一个叫“编辑（edit）”的过渡。实际上——这个过渡不改变对象的状态；过渡的目标状态仍是初始状态（可以把这个过渡理解为一个回路，由初态出发，回到初态，状态没发生变化，仍唯一——译者注），这意味着没有发生变化。

When an object is edited, a method is called to perform the change. For example, when a document is edited, the method called is *document_edit.cpy*. You can find that script by clicking *portal_skins*, clicking *plone_form_scripts*, and clicking *document_edit*. All that's needed is to add one line to that script before the last line:

当对象被编辑，有一种被用来执行更改的方式。例如，当一个文档被编辑时，被用来执行更改的方式是执行脚本document_edit.cpy。你可以点击portal_skins，然后点击plone_form_scripts，再点击document_edit就能找到这个脚本。针对客户提出的功能，需要在这个脚本的最后一行加入：

::

 context.portal_workflow.doActionFor(new_context,
  'edit', comment='')

The *doActionFor* method of *portal_workflow* performs the transition given (in this case, *edit*) for the object passed in (in this case, *context*). Each time the object is edited, that *edit* transition will fire. That will cause a line to be added to the comments list showing who edited the object, when it was added, and any comments associated with it.

portal_workflow的doActionFor方法执行某个被传递的对象（这里是指context）所历经的过渡（这里是指edit）。每次对象被编辑，edit过渡都要发生。在脚本中新添的一行，执行后的效果就是向评注列表中加入一行信息，以表明谁编辑了对象、什么时候跟踪信息被添加的，以及与之相关的任何信息。

When an object is edited, there are actually no comments, so to be a little more advanced, you'd have to modify the document's edit template to include a comments field. You could then access this comments list by going to the State tab, where the list of changes displays at the bottom.

当对象被编辑时，实际上没有添加能看见的跟踪信息，所以更进一步说，你应该在文档编辑模板（document's edit template）中加入一个可存放跟踪信息的域——这样你就可以通过状态标签（State tab）访问这些跟踪信息列表，它们会在标签下面显示。

移动对象
..............

One useful ability is moving an object during the workflow. For example, you could move all press releases into a folder called *Press Release* each time you publish one. Content could be created and edited anywhere and then on publishing moved into that folder. The example script in Listing 8-1 moves the object being workflowed into the *Members* folder. To add this script, go into the workflow tool in the ZMI, and select the Scripts tab. Then select Script (Python) from the drop-down box. Give the new object the name **moveObject**, and then enter Listing 8-1 into this script.

有一种有用的功能就是在工作流运作时移动对象。例如，当你每次发布印刷版的文稿时你都可以把它们移到叫“Press Release”的文件夹中。内容则可以在任何地方创建和编辑，并在需要发布时被转移到那个文件夹中。清单8-1中的实例脚本把在工作流中演变的对象放入Members文件夹中。想要添加这个脚本，就在Zope管理界面（ZMI）中访问工作流（workflow）工具，然后选择脚本标签（Scripts tab），再从下拉项中选择Script（Python），最后给这个创建的新对象起个名字moveObject，并把清单8-1中的代码输入进去。

Listing 8-1. Moving an Object

清单8-1 移动一个对象

::

 ##parameters=state_change
 # get the object and its ID
 obj = state_change.object
 id = obj.getId()
  
 # get the src folder and the destination folder
 dstFldr = context.portal_url.Members
 srcFldr = obj.aq_parent
  
 # perform the move
 objs = srcFldr.manage_cutObjects([id,]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=id%2C" title="create this page">?</a>)
 dstFldr.manage_pasteObjects(objs)
  
 # get the new object
 new_obj = dstFldr[id]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=id" title="create this page">?</a>
  
 # pass new_obj to the error, *twice*
 raise state_change.ObjectMoved<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectMoved" title="create this page">?</a>(new_obj, new_obj)

You need to do a few more things; first, assign this script to a transition. I'd normally use such a script in the publish transition. To do this, go to that transition and assign the value of *script (after)* to *moveObject*.

你还需要再多做一些工作；首先，把这个脚本赋给一个过渡。我通常会把这类脚本用在发布（publish）过渡中。为了做到这一点，应该在过渡（transition）中把moveObject设定为script(after)。

Second, one other small problem exists: This script moves objects into the *Members* folder. You'll probably have a better destination in mind, of course. To perform such a move, a user has to have the appropriate rights to move objects between these folders. Normally, only a manager can move objects into the *Members* folder. So you need to give the script the proxy role of manager. You can do this by clicking Scripts, clicking *moveObject*, and selecting the Proxy tab. Assign the role of manager to this script. You can find more information about security and local roles in Chapter 9.

其次，还存在一个小问题：这个脚本是把对象移动到Members文件夹中。当然，你可能会想到更好的移动终点。为了完成你理想中的移动操作，使用者必须拥有适当的权力在那些文件夹之间移动对象。通常，只有管理员能把对象移动到Members文件夹中。所以你需要在这个脚本上赋予一个管理员的代理人角色。所以你可以点击Scripts，再点击moveObject，然后选择代理人标签（Proxy tab），把管理员（manager）角色赋给这个脚本。在第9章你能了解到更多关于安全和本地角色的知识。

Looking at the code, first the script gets the object and the object's ID from the transition namespace. Then it gets the source and destination folders. Then it utilizes Zope's *ObjectManager<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectManager" title="create this page">?</a>* Application Programming Interface (API) to perform the copy and paste. You could, of course, determine these folders programmatically-perhaps based on the user performing the transaction or on the type of content being moved. Finally, you get the object and pass it to an exception *ObjectMoved<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectMoved" title="create this page">?</a>*.

来分析一下代码，首选脚本从过渡的名字空间（namespace）中获取了对象以及对象的ID，然后脚本再获取源文件夹和目标文件夹。然后它利用了Zope的ObjectManager应用程序编程接口（API）来完成复制和粘贴。当然你可以通过编程方式来确定这些文件夹——也许基于那些执行过渡的用户，也许基于正在被移动的内容的类型。最后，你获得了对象并把它传递给一个异常ObjectMoved。

The *ObjectMoved<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectMoved" title="create this page">?</a>* exception is a special exception to DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a>. By passing the new object twice as parameters into the exception, the new object will be passed up to the Plone front end. This is critical so that when the user is sent to the object in response to the change, it's to the new location of the object, not the old one. Of course, you may want to write a function that moves the function back after rejecting the object, perhaps to the member's home folder.

在DCWorkflow中ObjectMoved是一个特殊异常。它有两个参数，并且传递了新对象两次，使得新对象被传递到Plone前端（pass up为“拒绝”的意思，但是用在这里个人感觉说不通，暂改用“传递”；此句有待进一步考虑和完善——译者注）。这样做是必不可少的，所以当用户由于响应变动而接触对象时，Plone会显示给用户对象移动后的新位置，而不是旧有的位置。当然，你也许想写个函数实现相反的功能——使得对象被拒绝时能移动回来，也许移动回成员的主文件夹（home folder）中。

Another special case, and a more unusual one, is to delete an object in workflow. Usually deleting an object is an action from the containing object, so it's unusual to see in workflow. For this task, you can raise an *ObjectDeleted<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectDeleted" title="create this page">?</a>* exception. Listing 8-2 shows the script to perform a delete.

另一个特殊的情况——更不寻常——就是在工作流中删除对象。删除对象这个动作经要在包含此对象的容器对象中进行，所以往往不能在工作流中看见删除后的结果。对于这项工作来说，你可以抛出一个ObjectDeleted异常，清单8-2展示了执行删除的脚本。

Listing 8-2. Deleting an Object

清单8-2 删除对象

::

 ##parameters=state_change
  
 # get the object
 obj = state_change.object
 id = obj.getId()
  
 # get the parent folder, delete the object
 srcFldr = obj.aq_parent
 srcFldr.manage_delObjects([id,]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=id%2C" title="create this page">?</a>)
  
 # raise the object deleted method and pass
 # the folder you want to return to
 raise state_change.ObjectDeleted<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=ObjectDeleted" title="create this page">?</a>(srcFldr)

You could call this script *deleteObject* and successfully delete objects in the workflow. Again, by ensuring the error is raised, Plone will know what to do; in this case, it takes the user to the folder containing that object.

你可以使用这个脚本并成功地删掉工作流中的对象。而且，确保“错误”（这里指异常——译者注）被抛出，Plone就会知道该如何应对；在这种情况下，脚本实现了把包含刚被删除对象的文件夹显示给用户的功能。

发送E-Mail通知
............................

If you have a Web site that a user doesn't visit regularly, then putting information on the site about what has to be reviewed and when is rather pointless. You can turn workflow into a rudimentary notification system by using it to send e-mails to the users. The notification channel of e-mail is just one simple example; this could also be an instant message, a text message delivered to a phone, and so on. I'll leave other options to your imagination.

如果你有一个站点，用户却不是定期来访问，那么把诸如什么时候哪些东西需要评审的信息放在站点上会毫无意义。你可以把工作流转换为一个基本的通知系统，让它可以给用户们发送电子邮件。电子邮件的通知信道（channel）只是一个简单的例子；也可以做成一则即时消息、一段发送给Plone的文本消息，等等。还有其他形式将依靠你的想象力了。

In this example, you'll send e-mail via the *MailHost<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=MailHost" title="create this page">?</a>* object on the server to every user who has the reviewer role in the system, telling them about a new item that has been submitted for review. This is actually a more complicated script than the ones I've shown you so far, since it runs through a few steps: defining the variables, finding the account name of every reviewer, finding an e-mail, and sending an e-mail. Listing 8-3 shows the script.

在这个例子中，你将通过服务器中的MailHost对象给每一个在系统中拥有审批人角色的用户发送电子邮件，告诉他们有新的项目已经提交并需要接受评审。实际上这个脚本是我目前向你介绍过的最复杂的一个，因为它要穿越一系列步骤：定义变量、找到每位审批人的帐户名、找到一封电子邮件，最后把它发送出去。清单8-3列出了脚本。

Listing 8-3. Sending an E-Mail Notification

清单8-3 发送E-Mail通知

::

 ##parameters=state_change
 # the objects we need
 object = state_change.object
 mship = context.portal_membership
 mhost = context.MailHost<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=MailHost" title="create this page">?</a>
 administratorEmailAddress = context.email_from_address
  
 # the message format, %s will be filled in from data
 message = """
 From: %s
 To: %s
 Subject: New item submitted for approval - %s
  
 %s
  
 URL: %s
 """

This sets up the message and objects you need. Apart from the object being transitioned, you'll also need a reference to the membership tool *portal_membership* and the Simple Mail Transfer Protocol (SMTP) server via *MailHost<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=MailHost" title="create this page">?</a>*. The message is easily configurable to send an e-mail in any format you like.

清单的第一部分建立起需要发送的消息以及你需要的对象。除了历经过渡的对象外，你还需要得到成员工具portal_membership提供的参考以及由MailHost提供的简单邮件传输协议（SMTP）的支持。这个消息体可以很容易地配置，你可以以任何你喜欢的格式发送电子邮件。

You then use the *listMembers* method of the *portal_membership* object to get a list of members. For each member, you can then see if the reviewer role is in the list of roles for that user by calling the *getRoles* method:

接下来使用portal_membership对象中的listMembers方法你可以获得成员列表。对于每个成员来说，你可以使用getRoles方法确定每位用户的角色中是否含有审批人角色：

::

 for user in mship.listMembers():
     if "Reviewer" in mship.getMemberById(user.id).getRoles():

The astute reader will note that looping through every member in a Plone site could be a little slow if you have thousands of users. In the next chapter, you'll modify this script to pull the list of users from a specific group.

机敏的读者会注意到如果在一个拥有数以千计用户的Plone站点上使用这种循环筛选每位用户的做法，会把站点拖慢。在下一章里，你就会尝试去修改这个脚本，以便从一个确定的组（group）中拉出用户列表。

There's no point in sending an e-mail if you don't have a user's e-mail address, so you check here that there's a valid e-mail first. Now all that's left is to format the e-mail and send it. For this you can use Python's string replacement functionality and pass in four parameters that correspond to the *%s* in the *message* variable set at the beginning of the script. After this replacement, the *msg* variable will contain the e-mail you want to send. To send the e-mail, simply call the *send* method of the *MailHost<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=MailHost" title="create this page">?</a>* and pass through the e-mail string:

如果你自己没有电子邮件地址，那发送电子邮件是没有意义的。所以在这里你先需要检查电子邮件的有效性。现在，剩下要做的就是创建邮件消息并发送出去。你可以使用Python的字符串替换功能，把先前脚本中变量message相应的%s替换为由4个参数传递进来的值。替换完成后，变量msg将包含有你想发出去的邮件消息。发送邮件时，简单地用MailHost的send方法，把邮件消息（字符串）传递过去：

::

 if user.email:
     msg = message % (
          administratorEmailAddress,
          user.email,
          object.TitleOrId<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=TitleOrId" title="create this page">?</a>(),
          object.Description(),
          object.absolute_url()
          )
     mhost.send(msg)

This will result in the following e-mail being sent:

下面的将是所发送电子邮件的完整消息：

::

 From: administrator@agmweb.ca
 To: andy@agmweb.ca
 Subject: New item submitted for approval - Plone's great
  
 We all know Plone is a great product, but with the newest release
 it's gotten even better...
  
 URL: <a href="http://agmweb.ca/Members/andym/News_Item_123">http://agmweb.ca/Members/andym/News_Item_123</a>

Appendix B shows the full listing for this script.

附录B列出了这个脚本的完整代码清单。

使用PloneCollectorNG
......................

PloneCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneCollectorNG" title="create this page">?</a> is a bug tracker that's available for Plone. You'll find many other issue trackers out there, but this is the one I use and recommend for Plone. In fact, writing an issue tracker seems to be a common thing for developers to do. One of the really nice things about workflow is that it enables your users to significantly change the way an application works. As a developer, developing products hooking into DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> allows your application to remain flexible. You can find PloneCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneCollectorNG" title="create this page">?</a> at *<a href="http://www.zope.org/Members/ajung/PloneCollectorNG">http://www.zope.org/Members/ajung/PloneCollectorNG</a>*.

PloneCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneCollectorNG" title="create this page">?</a>是用在Plone中的bug跟踪器（NG是No Good的意思，往往用在影视拍摄期间导演不满意时的口令，属于习惯/职业用语——译者注）。你会发现除此以外还有其他形式的跟踪器，但是这个PloneCollectorNG是我常用的，我在Plone系统上也推荐使用它。实际上，撰写一个版本跟踪器对开发人员来说是普通的工作。工作流最棒的地方之一就是——它使得用户可以在实际意义上改变应用程序的工作方式。作为开发人员，开发出能装配到DCWorkflow中的产品可以让你的程序保持灵活。你可以在 <a href="http://www.zope.org/Members/ajung/PloneCollectorNG">http://www.zope.org/Members/ajung/PloneCollectorNG</a> 了解PloneCollectorNG。

The product adds a series of content types during installation; one of them is PloneIssueNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneIssueNG" title="create this page">?</a>, which is an *issue* (or bug report). Rather than hard-coding exactly how the issue moves through the database, a separate workflow is assigned to the issue. That workflow contains appropriate states, transitions, variables, and worklists.

PloneCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneCollectorNG" title="create this page">?</a>这个产品在安装时会添加一系列内容类型（content types）；其中之一是PloneIssueNG，它是一种版本（或bug）跟踪器。一个单独的工作流被分配给这个版本，使得版本在数据库中移动时，要明显胜过固定模式的硬编码（hard-coding）。而这个工作流包含了适当的状态、过渡，变量以及工作列表。

At any stage you can find out what state an object is in by calling the *getInfoFor* method of *portal_workflow*. This useful method accepts an object and the variable to be looked up. In PloneCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneCollectorNG" title="create this page">?</a>'s workflow, that variable is called *state*, and in Plone workflow, it's called *review_state*. For example, to find the state for an object, you use this:

在任何情况下你都可以通过用portal_workflow中的getInfoFor方法找出某个对象所处的状态。这个有用的方法接受对对象和变量的查询。在PloneCollectorNG工作流中，那种变量叫state，在Plone工作流中，则叫review_state。举个例子，查找某个对象的状态，可以这样写：

::

 portal_workflow.getInfoFor(obj, "state")

You can find possible states for an object by examining the state's object directly from the workflow, like so:

通过在工作流中直接地检查状态的对象，你可以找到某个对象可能拥有的状态，就像这样：

::

 portal_workflow['pcng_workflow']<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=%27pcng_workflow%27" title="create this page">?</a>.states._mapping.keys()

The result of this is that if your user wants to have a simple issue-tracking system, then modifying this workflow through the Web is relatively trivial (if, when the application was developed, the workflow tools have been considered). Compare this to another popular bug-tracking system, Bugzilla, where changing a state or a transition requires hours and hours of a Perl programmer's time to find all the hard-coded references to a bug's state.

结果是，假如用户想要有一套简单的版本跟踪系统，那么通过Web修改这个工作流相对来说就是微不足道的（在这种情况下，当开发应用程序时，工作流工具已近被考虑过了）。和另一种流行的bug跟踪系统Bugzilla比较——改变一个状态或过渡需要耗费一名Perl程序员数个小时去从bug状态中找出所有与之相关的硬编码。

分发与撰写工作流
.................................

If you've got a great workflow for your application, you have a couple of different ways to write and distribute workflow. The following sections close the discussion of workflow by presenting a couple of these options.

如果你为自己的应用程序获得一个很棒的工作流，你同时有两种不同方式撰写并分发工作流。下面的部分介绍这些方式，并结束我们关于工作流的讨论。

通过ZMI撰写工作流
,,,,,,,,,,,,,,,,,,,,,,,

Probably the simplest but most laborious way to write workflow is to use the ZMI. Although the ZMI drives many people crazy, it's a simple way to set up the options. Unfortunately, once you've started writing through the ZMI, you're stuck in that paradigm. In other words, there's no easy to edit or alter that workflow on the file system. I discussed editing a workflow through the Web with you earlier in this chapter, of course.

可能最简单但是最费力的方式是使用ZMI撰写工作流。尽管ZMI让很多人抓狂，但它仍是建立各种选择的简单方式。不幸地是，一旦你已经开始通过ZMI撰写工作流，你会对这种方式产生依赖。换句话说，今后在文件系统中没有容易的方法编辑或更改那些工作流。当然，在本章早些时候我和你探讨了通过Web编辑工作流。

To export a workflow from the ZMI, click *portal_workflow* and select the Contents tab. Select the created workflows you'd like to export by checking the boxes on the left of the ZMI, and then click *import/export*. At the top part of the export page, select *Download to local machine,* and click *export*. A file with extension *.zexp* will be created that can be saved and redistributed. Selecting XML Format will provide a file in Extensible Markup Language (XML) format with an *.xml* extension.

若要从ZMI中输出工作流，点击portal_workflow选择内容标签（Contents tab），在已经建立的工作流中选择你希望输出的，先勾选ZMI左边的方框，然后点击import/export。在输出页的顶部选择Download to local machine，再点击export。这样，一个带有.zexp扩展名的文件被创建了，并可以保存下来也可分发。选择XML Format会生成一个可扩展标记语言（XML）格式的文件，带有.xml扩展名。

If you're provided a workflow in a the *.zexp* or *.xml* format, then importing the workflow into your Plone is straightforward. Place that file in the import directory of Zope on the file system. This can be the instance home directory or the Zope directory.

如果你有.zexp或.xml格式的工作流，那么把这个工作流导入Plone中是很简易的，在发文件系统中，把这个文件移动到Zope的导入目录下就可以。导入目录可以是实例化的主目录或Zope目录。

Then click *portal_workflow*, select the Contents tab, and click *import/export*. At the bottom part of the page, you'll see a small form that takes an import filename. Enter the name of the filename there, and leave *Take ownership of imported objects* selected. Click the Import button to import the workflow. The workflow will now be imported and given the name specified in the export.

然后点击portal_workflow，选择内容标签（Contents tab），选择import/export。在页面底部，你会看见一个小表单，含有导入文件名的输入框。在输入框中输入文件名，然后勾选Take ownership of imported objects。点击导入按钮导入工作流。现在工作流将被导入，并配以在输出时确定的名称。

用Python撰写工作流
,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Using Python is probably the favorite way of programmers to write a workflow, since it can all be done in Python and easily distributed. First, make a Python module on the file system. At the top of the file, import the appropriate tools, as follows:

使用Python撰写工作流可能是最受程序员欢迎的方式，因为这些都可以用Python来做并能很容易地分发。首先，在文件系统中建立一个Python模块（即一个Python文件，可以.py为扩展名，含有Python代码——译者注），在文件开头，导入合适的工具，如下所示：

::

 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=CMFCore" title="create this page">?</a>.WorkflowTool<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=WorkflowTool" title="create this page">?</a> import addWorkflowFactory
 from Products.DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a>.DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a> import DCWorkflowDefinition<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflowDefinition" title="create this page">?</a>

Second, make a function that creates the workflow. Appendix A lists the API for writing a workflow in a little more detail. But you could just cheat and look at all the great examples available in the PloneWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=PloneWorkflow" title="create this page">?</a>'s project in the collective (*<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>*), or even the ones contained in Plone. For example:

然后，建立一个创建工作流的函数。附录A更详细列出了撰写工作流时需要用到的API。但是你可以先不那么用功。只需去collective（<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>）看看PloneWorkflow项目中那些优秀的例子，或者Plone系统中的一些实际例子。例如:

::

 def sample(id):
     """ Sample workflow """
     ob = DCWorkflowDefinition<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflowDefinition" title="create this page">?</a>(id)
     ob.states.addState('private')
     ob.states.addState('public')
     # add transitions
     return ob

Finally, register the workflow in the system, like so:

最后，在系统中注册工作流，如下所示：

::

 addWorkflowFactory(sample,
                    id='sample_workflow',
                    title='Sample workflow')

This script will need to be as part of a product installation. Chapter 12 covers writing and installing products.

这个脚本需要作为一个产品的一部分安装上去。第12章介绍撰写和安装产品。

Now, of course, a shortcut is available, which is called *DCWorkflowDump<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflowDump" title="create this page">?</a>*. This will take the code from the ZMI and dump it into a Python module for you. You can find the source code for *DCWorkflowDump<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflowDump" title="create this page">?</a>* in the collective at *<a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a>*, but you can also find a zip file of the code on the Plone book Web site at *<a href="http://plone-book.agmweb.ca">http://plone-book.agmweb.ca</a>*.

当然现在有一个捷径——有一个产品叫DCWorkflowDump。它能够从ZMI中集成代码，为你装配成Python模块。你可在 <a href="http://sf.net/projects/collective">http://sf.net/projects/collective</a> collective中找到DCWorkflowDump的源代码，你也能在Plone Book网站 <a href="http://plone-book.agmweb.ca">http://plone-book.agmweb.ca</a> 找到源代码的zip文件。

To install *DCWorkflowDump<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflowDump" title="create this page">?</a>*, unzip the file and copy the directory called *DCWorkflowDump<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflowDump" title="create this page">?</a>* into the *Products* directory of your Plone installation. To check that you're in the right directory, your *Products* directory should also contain a directory for *DCWorkflow<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=DCWorkflow" title="create this page">?</a>*, among other things. Then restart your Plone instance.

安装DCWorkflowDump时，解压缩文件然后把DCWorkflowDump目录拷贝到你的Plone安装路径的Products目录下。验证你的目录是否正确，它应该包含有DCWorkflow目录以及其他目录。然后重新启动你的Plone实例。

Once you've restarted Plone, go to the particular workflow in the ZMI, and you'll notice a new tab called *dump*. Click that page to get the dump screen, and then click *Dump it!* to dump the workflow to the screen. This will take your workflow and format it in Python for you. Save that file to your product, and you now have a Python file you can manipulate. This product is a great tool because it allows you to create the workflow in the ZMI and then distribute and alter it through Python.

一旦重启Plone，访问ZMI中的工作流，你会发现一个新的标签dump。进入那个标签页面浏览一下，然后就可以点击Dump it!来装配工作流了。它会收集你的工作流并把它们转换成Python模块。在产品中保存这个模块文件，现在你就可以利用它了。这是很棒的产品因为它允许你在ZMI中创建工作流，并通过Python模块的形式分发和改变它。


From panjy Mon Feb 14 00:51:18 +0800 2005
From: panjy
Date: Mon, 14 Feb 2005 00:51:18 +0800
Subject: NG的翻译
Message-ID: <20050214005118+0800@nocache.czug.org>

NG应该不是那个NG ;-) 据我了解是Next Generation的意思，也就是下一代的新版本。PloneCollectNG之前, 有CMFCollector, CMFCollectorNG<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter8/createform?page=CMFCollectorNG" title="create this page">?</a>等替代产品。

From unknown Thu Oct 13 09:45:48 +0800 2005
From: 
Date: Thu, 13 Oct 2005 09:45:48 +0800
Subject: dsfasd
Message-ID: <20051013094548+0800@www.czug.org>

sdfksgj

From unknown Mon Nov 14 08:23:08 +0800 2005
From: 
Date: Mon, 14 Nov 2005 08:23:08 +0800
Subject: 翻译问题
Message-ID: <20051114082308+0800@www.czug.org>

“首先，DCWorkflow假定在系统中存在一种对象（object）——比如一条内容或一个配件。然后它又进一步假定，属于同类型的对象会通过同一个工作流。而通过重新规划（repurposing）内容（阅读第11章可获得更多此方面的知识），你可以使用不同的工作流来持有相似的内容。”中的最后一句应该是“你可以让相同的内容使用不同的工作流”。