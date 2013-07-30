---
created: 2005-12-14 14:34:41
creator: panjy
description: ''
title: Chapter4
---
第四章
---------

.. Contents:: 内容：

进行简单的定制
============================

After you've figured out how to add and edit content, you'll want to start customizing your site. This chapter explains how to perform simple customizations in Plone using the options available to administrators. Performing the customizations in this chapter requires a user to be logged in with the manager role, as discussed in Chapter 2.

当你了解了如何增加和编辑内容以后，你就会想去开始定制你的站点了。本章将解释在plone上管理员如何使用有效的选项来进行简单的定制。和第二章一样，用户需要以管理员的角色登陆才能进行站点的配置。

These customizations are all configuration options you can make through the Web. Rather than explain all these parts in detail, this chapter gives an overview of many subjects and explains how to accomplish certain tasks while showing some of the under-the-hood machinery. These topics are then expanded and explained in later chapters throughout the book.

整个网站都可以通过所有的配置选项来进行定制。本章将不对每个部分进行详细的解释，本章将只是走马观花地了解一下一些方面，并在展示某些内部机制时解释一下怎样完成特定的任务，在本书的后续章节将会对具体内容进行拓展和解说。

The first and most useful place to look is the Plone control panel, which offers a variety of options for the site administrator. All the parts of a Plone site are designed to be easily changed and customized; the blue tabs you can see across the top of the page are easy to add and remove. Other examples are the boxes in the left and right columns, which are called *portlets*. Plone comes with several portlets, and you can easily choose where to display certain portlets.

最开始看到的，也是最有用的地方就是Plone的控制面板，Plone控制面板为站点管理提供了一系列的定制选项。Plone站点的每个部分都非常容易改变和定制，在页面顶部的一排蓝色标签可以很容易的添加或是删除，在页面的左边和右边的两栏被称作"portlets"的文本框也可以很容易的添加、删除，Plone提供了几个portlets，你可以很容易的选择某些portlets在页面的某个位置显示。

Finally, this chapter shows how to customize Cascading Style Sheets (CSS) and images in Plone. CSS affects everything in a Plone site. In fact, as you'll see in this chapter, CSS determines all the colors, all the positioning, and a lot of the images you see. If you have the ability to change the CSS code, then you can change almost the entire look and feel of your Plone site. All the options covered in this chapter show you the large degree of control you have over your Plone site.

在本章的最后展示了怎样在Plone中定制CSS(层叠样式表)和图片，CSS影响了Plone站点的每个方面。在本章的介绍中你可以看到，CSS决定了你能看到的图片，站点的所有颜色以及站点的布局。如果你会修改CSS代码的话，那么你可以改变你的Plone站点的整个外观。本章涉及的所有选项展示了你对自己的Plone站点具有很大的控制度。

管理网站
~~~~~~~~~~~~~~~~~~~

The first place site administrators should visit is the Plone control panel. This is the way to access some of the administration functions of a site, including the name and description of your Plone site, user and group administration, and any errors that occur within your site.

管理员访问的第一个地方就是Plone控制面板。从这里可以对站点的一些管理功能进行访问，包括Plone站点的命名和描述，用户和组管理以及站点内所发生的出错日志。

The term *control panel* is common, so don't confuse it with the Zope Management Interface (ZMI) control panel that shows the low-level ZMI options. The Plone control panel is an ongoing attempt to provide a more user-friendly interface for the functions provided in the ZMI. Since the project is ongoing, it's hard to predict what functionality will be available in the future. Instead, I recommend you go to the control panel and see what functions are currently available; if you can't complete your task there, then you'll have to go to the ZMI.

"控制面板"是一个常见的术语，不要把它和ZMI（Zope管理界面）的控制面板搞混淆了。ZMI控制面板向你展露的是底层的ZMI选项，而Plone控制面板尚处于开发阶段，她提供了一个更加用户友好的接口以使用ZMI所提供的功能。因为这个项目尚在进行中，因此很难知道最终Plone控制面板能提供什么样的功能。不过我还是推荐你到Plone控制面板去看看她目前都提供了什么功能，在那里如果不能完成你的任务时，再去ZMI控制面板进行系统管理。

To access the control panel, log into Plone as a user with the manager role. If you don't have a user with that role and are an administrator of the site, see Chapter 9 for more information on how to do this. If you aren't the administrator of a site and want this level of access, ask your site administrator. To access the control panel, click *plone* *setup* at the top of the page (see Figure 4-1).

访问控制面板需要以拥有管理员权限（manager role）的用户登录Plone。如果你是站点的管理员（administrator）但没有这一权限，第9章有更多信息。如果你想进些这一操作而不是站点的管理员，咨询你的站点管理员。点击页面最上端的 *Plone设置* 可以访问控制面板（如图 4-1）。

 .. image:: img/3294f0401.png

Figure 4-1. Accessing the control panel

图 4-1. 访问控制面板

This opens the control panel (see Figure 4-2).

这一操作将会打开控制面板（如图 4-2）。

 .. image:: img/3294f0402.png
    :width: 700

Figure 4-2. Plone control panel

图 4-2. Plone 控制面板

The following functions are available in the control panel:

控制面板中有如下功能：

  - **Add/Remove Products**: Clicking this link allows you to automate the installation products (covered in detail in Chapter 10).

  - “安装/卸载产品”：点击该链接允许你自动的安装产品（第10章中会有详细论述）。

  - **Error Log**: Clicking this link accesses the log of errors that have occurred in the Plone site.

  - “错误日志”：点击该链接访问Plone站点遇到的错误的日志。

  - **Mail Settings**: Clicking this link allows you to alter the Simple Mail Transfer Protocol (SMTP) server Plone uses to send e-mail.

  - “邮件设置”：点击该链接允许你更改Plone用于发送邮件的SMTP服务器。

  - **Portal Settings**: Clicking this link allows you to alter portal settings (discussed in the 'Changing the Title, Description, and E-Mail Addressesâ€ section of this chapter).

  - “网站设置”：点击该链接允许你更改网站设置（在本章的“更改标题，描述，和电子邮件地址”小节中讨论）。

  - **Skins**: Clicking this link allows you to set the current skin (discussed in Chapter 7).

  - “皮肤”：点击该链接允许你设置当前的皮肤（在第7章中讨论）。

  - **Users and Groups Administration**: Clicking this link allows you to alter users and groups (discussed in Chapter 8).

  - “用户和组管理”：点击该链接允许你更改用户和组（在第8章中讨论）。

  - **Zope Management Interface**: Clicking this link takes you to the ZMI.

  - “Zope管理界面”：点击该链接进入ZMI。

Throughout the rest of the book, I reference the Plone control panel if the current feature is accessible from there; however, the remainder of book uses the ZMI for altering properties.

在本书的后面章节，我将使用Plone控制面板，如果当前特性可以通过它来访问；但是在其他地方只能用ZMI来更改属性。

使用ZMI
~~~~~~~~~~~~~

The ZMI is the basic interface that gives you access to Plone's underlying Zope interface. Before Plone existed, the ZMI was the main way to access, edit, and manage a Zope site and its content. This was originally the Web interface for the content management system. Of course, nowadays Zope isn't really an out-of-the-box content management system but instead is an application that sits under a system such as Plone. After quickly playing with the ZMI, you'll see why it isn't suited as an interface to a content management system.

One thing the ZMI does provide is a simple interface to the underlying Plone and Zope infrastructure. You can find many of the basic features mentioned in this chapter through Plone, but you'll need to use the ZMI eventually. If you haven't gone to the ZMI before, then you'll find that there are a few simple ways to get there; the easiest way is to log in as a user with the manager role, click *plone setup*, and then click *Zope Management Interface*. You'll note that the address of the ZMI is the uniform resource locator (URL) of your Plone site with */manage* on the end of it. The ZMI for your Plone site should look like this:

 .. image:: img/3294s0401.png

You may have a problem with virtual hosting, which occurs with the Windows and Mac installers. Virtual hosting is the ability to have the Plone site as the root object rather than the root of your Zope instance. For more information on virtual hosting, see Chapter 10. So, to get to the root, you need to access the manage port. On Windows, select Start - Plone - Plone - Manage Root. You'll note that this sets the address to *<a href="http://localhost:8080/manage">http://localhost:8080/manage</a>*. For information on virtual hosting with your installation, see the specific documentation.

You'll need to get to the root of your Zope installation for two reasons. First, you'll need to get to the Zope control panel. Second, you'll need to get to the root of your Plone site to make, rename, and copy Plone sites. The Zope control panel gives you database information and access to products and other add-ons (you'll need access to this for Chapter 10), as shown here:

 .. image:: img/3294s0402.png

 ***End Sidebar***

**TIP**	When dealing with the ZMI, I find having two different browsers open helpful. For example, I use Mozilla and Firefox. Besides, as a site administrator, it's always a good idea to have two different browsers to test that your changes work in more than one browser.

改变标题、描述和E-Mail地址
.....................................................

The title, description, and e-mail addresses are stored in a Plone site as properties on an object inside Plone. You can access these fields by clicking the *Portal Settings* link in the Plone control panel (see Figure 4-3).

 .. image:: img/3294f0403.png
    :width: 700

Figure 4-3. Portal options

The portal settings are as follows:

  - **Portal title**: This is the title of the site that will appear in the title for browsers, breadcrumbs, navigation, e-mails, and so on. The default is Portal.

  - **Portal description**: This is the description for the portal, which is currently used only in syndication.

  - **Portal â€˜From' name**: This field is related to various functions, such as a lost password or the 'send-to-a-friendâ€ function. Plone sends the e-mail messages with this name attached. The default is Portal Administrator.

  - **Portal â€˜From' address**: This is the address used for the e-mails that Plone sends. The default is postmaster@localhost.

  - **Default Language**: This is the default language that's given in the properties of an object.

  - **Password policy**: New users have two options; they can either enter a password or enter a password that's then e-mailed to them. Although in both cases they have to enter an e-mail address, the latter choice ensures that the e-mail address they enter is valid.

  - **Enable External Editor Feature**: This will turn on External Editor, which is an advanced editing tool. It requires that External Editor be installed on the user's computer. Chapter 10 covers this in more detail.

After selecting the options you want, click Save to commit the changes. All the changes on this form will occur immediately.

设置一个Email服务器
........................

Plone will send e-mail using the *MailHost<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=MailHost" title="create this page">?</a>* object, which provides an interface to an SMTP server and allows the developer to write forms and tools that send e-mails. The 'send-to-a-friendâ€ function and the mailing of a forgotten password use the settings configured here.

The default configuration is for a mail server on the localhost at port 25. If the SMTP server is located elsewhere in the network, then you can access the form by clicking *plone setup* and then clicking *Mail Settings*. Then change the mail server and the port to suit your configuration. On my network, the mail server is at *monty.clearwind.ca* on port 1025, so I set the server as shown in Figure 4-4; however, in most cases, you won't need to change this.

 .. image:: img/3294f0404.png
    :width: 700

Figure 4-4. Setting up the mail server

**NOTE** The *MailHost<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=MailHost" title="create this page">?</a>* object is a Zope object accessible in the ZMI. This object doesn't currently allow for authentication with the server. If this is needed, change the settings on the server.

记录错误
..............

The error log catches errors that may occur in a Plone site; these are features such as Page Not Found (404) errors, unauthorized errors, and so on. This isn't designed to trap errors from forms. For instance, if somebody doesn't enter a required field in a form, then this won't be reported; this isn't an error since it's captured by the validation framework. This error log is designed to catch internal server errors that may occur.

From the Plone interface, click *plone* *setup* and then click *Error Log* to see the errors reported by the Plone site. Click the exception in the list (if there's one reported) to see the error. Figure 4-5 shows an error that occurred when incorrectly filling out the mail settings form. It's a long page that includes a complete Python traceback and the incoming request.

 .. image:: img/3294f0405.png
    :width: 700

Figure 4-5. An example error

On the error log form you'll see the following settings:

  - **Number of exceptions to keep**: These are the exceptions to keep in the active log on the screen. The default is 20.

  - **Copy exceptions to the event log**: This copies each exception to the file-based log file. Not doing this means that no permanent record will be kept for exceptions. The default is that this is selected.

  - **Ignored exception types**: This is a list (one per line) of exception types to ignore. The default is *Unauthorized*, *NotFound<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=NotFound" title="create this page">?</a>*, and *Redirect*.

You can log each exception and view it on the screen. This means if a user is visiting your site and an error occurs, then you can go to the error log and see what occurred. The three components of an error are the error type (which is the type of the error), the error value (which is a string explaining when an error occurs), and the traceback. These first two items are shown to a user on a standard error page (see Figure 4-6).

 .. image:: img/3294f0406.png
    :width: 700

Figure 4-6. An example error message

So, when a user reports an error, the report will often include a message with the error name and a value in it. If user isn't allowed to do something and an Unauthorized error is raised or a Page Not Found (404) is triggered, then you'll get a custom error page rather than the standard page shown in Figure 4-6. The following standard error types occur:

  - **Unauthorized**: This occurs when a user doesn't have the right to perform a function.

  - **NotFound<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=NotFound" title="create this page">?</a>**: This occurs when the item a user is trying to access doesn't exist.

  - **Redirect**: This is an error that can raise a Hypertext Transfer Protocol (HTTP) redirect.

  - **AttributeError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=AttributeError" title="create this page">?</a>**: When an object doesn't have this attribute, this error is raised.

  - **ValueError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=ValueError" title="create this page">?</a>**: This occurs when a value given is incorrect and isn't caught correctly by the validation or other framework.

定制Plone的外观
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following sections describe the other customizations you can make to a site; almost of all these require access to the ZMI.

理解面板(Portlet)
......................

On a Plone site, you'll see three columns to a page by default: the left, middle, and right columns. The middle column contains the content for the object being currently viewed. This is where most of the user functionality is for adding and editing content, completing forms, and so on. The left and right columns contain a series of boxes that display information. Each of these boxes is called a *portlet*. A variable determines which portlets display at a particular point in time. The best way to understand these portlets is to look at the default portlets that ship with a Plone site. You can find the parameters for the portlets in the portal object. To access this, go to the ZMI, ensure you're on the root Plone site, and click the properties tab. This opens a list of properties, including *left_slots*, *right_slots*, and *document_action_slots* (see Figure 4-7).

 **NOTE** In earlier versions of Plone, the portlets were called *slots*. This is a common term that conflicts with the page template term *slot*, so it was changed to *portlets* for version 2. In certain places in the code and in the text, you may see the term *slot* used. In these contexts, the words *slot* and *portlet* are synonymous.

 .. image:: img/3294f0407.png
    :width: 700

Figure 4-7. The default portlet properties

The *left_slots* properties refer to portlets shown on the left of the page, and the *right_slots* properties list the portlets shown on the right of the page. The portlets are shown in the order, from top to bottom, that they're listed in the properties; notice that each portlet is on a new line. However, most portlets have some code to ensure that the portlet displays only if it makes sense. For example, a login portlet is pointless to show if the user is already logged in. In this case, the login portlet is included in the list of portlet but will show up only when needed.

Each portlet value is actually a special value called a Template Attribute Languages Expression Syntax (TALES) path expression (Chapter 5 covers this in detail). Site developers can add their own portlets to a site by creating simple macros and page templates. The default portlets are as follows:

 **left_slots**: This includes the navigation, login, and related portlets.

 **right_slots**: This includes the review, news, events, recently published, and calendar portlets. All the available portlets aren't configured in Plone by default. The following sections describe portlet slot in Plone. Each section describes the portlet and shows what it looks like. Then I give the path expression that you need to add to the *slots* property so it'll show up in your Plone site.

For example, to show the calendar portlet on left side, enter **here/portlet_calendar/macros/portlet** in the *left_slots* property, and click Save Changes. If you want to remove it from the *right_slots* property, then you could remove the same line from the *right_slots* property and click Save Changes.

日历
,,,,,,,,

The calendar portlet is one of the default portlets that displays the calendar on the right of the Plone page. This portlet shows published events for that month in a little calendar. The calendar portlet will appear regardless if there are events to show in the calendar. You can further configure the calendar using the *portal_calendar* tool in the ZMI (see Figure 4-8).

 .. image:: img/3294f0408.png

Figure 4-8. Calendar portlet

The expression to add is *here/portlet_calendar/macros/portlet*.

事件
,,,,,,

The events portlet displays a list of the upcoming published events. If you have this item in the portlet list, it won't show up unless there are some published events to display (see Figure 4-9).

 .. image:: img/3294f0409.png

Figure 4-9. Events portlet

The expression to add is *here/portlet_events/macros/portlet*.

收藏
,,,,,,,,,

In the top-right corner of a Plone document, you'll see a Plone icon. A user can click this logo to add a favorite. A *favorite* is similar to the concept of a bookmark or link to the page to which you want to return; however, this favorite is stored on the Plone site. Figure 4-10 shows the icon to add a favorite.

 .. image:: img/3294f0410.png

Figure 4-10. The icon to add in a favorite

The favorites are added to the user's home folder, and they display in the favorites portlet along with a link to organize them (see Figure 4-11). The favorites that are shown are particular to the favorites that user has saved, so even if you have this item in the portlet list, it won't show up unless the user has some favorites.

 .. image:: img/3294f0411.png

Figure 4-11. Favorites portlet

The expression to add is *here/portlet_favorites/macros/portlet*.

Login

登录
,,,,,

The login portlet displays the login form so a user can log in using their username and password. If they've forgotten their password, they have an option to get their password e-mailed to them. Even if you have this item in the portlet list, however, it won't show if the user is already logged in (see Figure 4-12).

 .. image:: img/3294f0412.png

Figure 4-12. Login portlet

The expression to add is *here/portlet_login/macros/portlet*.

Navigation

导航
,,,,,,,,,,

The navigation portlet shows a simple tree of the folders in the current position in the form of a tree. It provides a powerful and simple navigation tool. The navigation portlet is extremely customizable; you can alter it by clicking *portal_properties* and then clicking *navtree_properties* inside the ZMI, which is covered in the 'Altering the Navigation Portlet" section (see Figure 4-13).

 .. image:: img/3294f0413.png

Figure 4-13. Navigation portlet

The expression to add is *here/portlet_navigation/macros/portlet*.

News

新闻
,,,,

The news portlet lists all the recent news items, with links to them (see Figure 4-14). Even if you have this item in the portlet list, it won't show up unless there are some news items published. The news items on a site are also available by clicking the news tab.

 .. image:: img/3294f0414.png

Figure 4-14. News portlet

The expression to add is *here/portlet_news/macros/portlet*.

Recent

最近
,,,,,,

The recent portlet lists the recently published items on the site since the last time you logged in (see Figure 4-15). If there are no such items, it'll still display.

 .. image:: img/3294f0415.png

Figure 4-15. Related portlet

The expression to add is *here/portlet_recent/macros/portlet*.

Related

相关
,,,,,,,

The related portlet shows a list of items that are related to the item you're currently viewing, as determined by the keywords on that item. If a related item is a link to another Web site, then it'll show up in a separate list of external resources. Even if you have this item in the list of portlets, it won't display unless there are some related items (see Figure 4-16).

 .. image:: img/3294f0416.png

Figure 4-16. Related portlet

The expression to add is *here/portlet_news/macros/portlet*.

Review

审核
,,,,,,

The review portlet displays a list of items that are in the review state and are waiting to be reviewed. This is shown only if the user logged in has the reviewer role and there are items awaiting review (see Figure 4-17).

 .. image:: img/3294f0417.png

Figure 4-17. Review portlet

The expression to add is *here/portlet_review/macros/portlet*.

Book Web Site: Altering Slots

书籍网站：调整Slots
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

For the Plone book site, most of the slots on the right side made no sense. This book has no events, so the calendar and event slots weren't needed. I expect new things to be added to the site, but really they'll be minimal once the site is complete. So I decided to remove all the right slots for my site. I did this by going to the portal root object in the ZMI and clicking the Properties object. Then I deleted right slots. The navigation, login, and related portlets, which normally occur on the left side, are all useful to me, so I kept those.

Here's how the portlet properties for the Plone book site look at this point:

 .. image:: img/3294s0403.png

Having Different Portlets in Different Parts of Your Site

在网站的不同地方显示不同的面板
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The underlying Zope database of Plone provides a feature called *acquisition*. In its simplest form, this means when looking up an item, such as *right_slots*, Plone finds the closest object that contains the property. So, when looking for what portlets to show in the right column, normally Plone finds the root object and lists those.

That's why you can change the properties in the root portal object to change the whole site. You may notice that if you click the *my folder* link and go to your personal folder, there's no calendar. If you click *Members* and then click *Properties* in the ZMI, you'll see that there's an entry for *right_slots*. The entry for that folder is an empty list. When the Plone site goes looking for a value to show for the right column's portlets, it moves up the folder hierarchy until it reaches the *Members* folder. There it finds the *right_slots* value and uses that. Since the value of *right_slot* in the *Members* folder is empty whenever you're viewing content located in *Members*, the right slot will be empty.

By adding and removing properties from folders through the ZMI, site administrators can customize exactly what portlets appear on their sites. The properties tab is fortunately reasonably straightforward. You just select the item in the ZMI and then click *Properties*. To add a left or right slots property, use the add form at the bottom of the form and ensure that the property type is *list*.

Altering the Navigation Portlet

调整导航面板
...............................

Of all the portlets covered, probably the most useful and the most asked about is the navigation portlet. Specifically, how can you alter the navigation portlet and the way that it's displayed? The navigation portlet is list of current folders and documents in the navigation slot. You can alter the navigation slot by changing the code; however, you can make many changes through the ZMI. The biggest thing to remember is that only published objects will be shown in the navigation tree to members and anonymous users. To alter the navigation tree properties, click *portal_properties* and then click *navtree_properties* in the ZMI.

在所有本文谈到的面板中，最有用并且被问的最多的是导航面板。特别是怎样调整导航面板和它现实的方式。导航面板是导航slot中当前文档和文件夹的列表。你可以通过修改代码调整导航slot；但是你也可以通过ZMI做很多改动。只有被发布出来的对象，才会在导航树中显示给成员和匿名用户，这是最重要的。要调整导航树的属性，在ZMI中点击 *portal_properties* ，再点击 *navtree_properties* 。

The following is an abridged list of the options available:

下面是一个删减后的选项列表：

  - **showMyUserFolderOnly**: This displays only the user folder of the user logged in. So when the *Members* folder is being shown in the navigation, it won't show every *Members* folder. This is selected by default.

  - **showMyUserFolderOnly**: 只显示登录用户的用户文件夹。所以当导航栏中显示 *Members* 文件夹的时候，不会显示每个 *Members* 文件夹。这是默认选项。

  - **showFolderishSiblingsOnly**: Only folders in parent folders will display if this is selected; otherwise, it will show all content. This is selected by default.

  - **showFolderishSiblingsOnly**: 如果选中此项，只有父文件夹中的文件夹会显示；否则会显示所有的内容。这是默认选项。

  - **showFolderishChildrenOnly**: When this is enabled on a folder, it shows only folders in the same folder rather than all the other types of content. Selecting this option effectively shows you all the contents of the folder currently viewed. This is selected by default.

  - **showFolderishChildrenOnly**: 在一个文件夹上启用该项时，只显示在同一个文件夹中的文件夹，其它类型的内容都不显示。选中此项显示当前浏览的文件夹中的所有内容。这是默认选项。

  - **roleSeeUnpublishedContent**: As mentioned, content is shown only if published to members and anonymous users. Add more roles to this list, with each role on a new line, to have nonpublished content display. This is undesirable if the user doesn't actually have access anyway.

  - **roleSeeUnpublishedContent**: 前面提到，只有对成员和匿名用户发布出来的内容能显示。在该列表中增加更多的角色，每个角色一行，可以显示未发布的内容。如果用户没有访问权限，该项就并不适用了。

  - **croppingLength**: This determines how many characters of the names to show in the navigation tree. The default is 256.

  - **croppingLength**: 该项指定导航树中每个名字显示的字符数。默认的是256。

  - **idsnotToList**: This is the item IDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=IDs" title="create this page">?</a> not to show. Place each ID on a separate line. The default is None.

  - **idsnotToList**: 该项是不显示条目的ID。把每个ID发在单独的行上。默认是None。

Make any changes to that form, and then click Save Changes. The order of the items in the navigation tree is determined by the order of the items in the folder contents form. As shown in Chapter 3, using the up and down arrows, users can change this order to suit their own needs.

在表单中做修改，然后点击 *Save Changes* 。导航树中的条目的顺序由条目在文件夹内容表单中的顺序决定。如第3章所示，用户可以根据自己的需要用上箭头和下箭头修改条目的顺序。

Book Web Site: Altering the Navigation Tree

书籍网站：调整导航树
...........................................

For most Web sites I prefer a fuller navigation tree than the one provided by default. So, I went to the navigation tree options and deselected *showFolderishChildrenOnly* and *showFolderishSiblingsOnly*. This made the contents show up nicely; for example, here's the software folder with just a few items selected:

对于大多数网站，我更喜欢一个全面的导航树，而不是默认的那个。因此我进入导航树选项，取消了 *showFolderishChildrenOnly* 和 *showFolderishSiblingsOnly*。

 .. image:: img/3294s0404.png

Altering the Date Formats

调整时间格式
.........................

Throughout the portlets and the whole site, Plone presents dates in a consistent format that are editable using formats set internally. Whenever a date is shown in Plone, it calls one of two formats. You can find these formats by accessing the ZMI, clicking *portal_properties*, and clicking *site_properties*. These are the formats:

  - **localTimeFormat**: This is the time format to use for dates that should appear in a short format in Plone.

  - **localLongTimeFormat**: This is the time format to use for dates that should appear in a long format in Plone, showing seconds.

The format for the date is based on Python's time format module. The reference for the formats are at *<a href="http://www.python.org/doc/current/lib/module-time.html">http://www.python.org/doc/current/lib/module-time.html</a>*. For the short date, the default value is *%Y-%m-%d*, which means *year-month-day* as decimal numbers (for example, *2003-10-26*). For long date, the default value is *%Y-%m-%d %I:%M %p*, which means *year-month-day hours:minutes am/pm* (for example, *2003-10-26 07:32 PM*).

The following is a quick summary of the options available:

  - **%a**: Locale's abbreviated weekday name (for example, *Mon*)

  - **%A**: Locale's full weekday name (for example, *Monday*)

  - **%b**: Locale's abbreviated month name (for example, *Jan*)

  - **%B**: Locale's full month name (for example, *January*)

  - **%d**: Day of the month as a decimal number

  - **%H**: Hour (24-hour clock) as a decimal number

  - **%I**: Hour (12-hour clock) as a decimal number

  - **%m**: Month as a decimal number

  - **%M**: Minute as a decimal number

  - **%S**: Second as a decimal number

  - **%y**: Year without century as a decimal number

  - **%Y**: Year with century as a decimal number

 If you want to include the day name in the short date, it's a simple matter of changing the short date format to read *%A, %b. %d, %y*. This produces *Thursday, Oct. 24, 02*. These dates are used in the boxes on the left and right of the screen, in the search results, in the content byline, and so on.

Adding Keywords and Event Types

添加关键字和事件类型
...............................

One of the tools in Plone, *portal_metadata*, allows the site administrator to define some of the metadata elements. Plone uses the metadata defined in the *portal_metadata* tool in several places.

Plone中的一个工具，*portal_metadata*，允许站点管理员定义一些元数据。Plone在很多地方用到*portal_metadata*中定义的元数据。

For example, when you add an event, you're given a list of possible types of events. You can add to this list by clicking *portal_metadata*, clicking *elements*, and then clicking *subject* in the ZMI. You'll see a vocabulary for events that lists the subjects for that content type. It's a simple matter of adding or editing that list, one item per line, to have the relevant event types. These event types will then appear in the forms for adding and editing events.

例如，当你添加一个事件的时候，会有一个可用的事件类型的列表。添加到该列表，你需要在ZMI中点击 *portal_metadata* ，点击 *elements* ，点击 *subject* 。你将看到事件的列表，列出了内容类型的名称。添加和编辑该列表，使其具有相应的事件类型，是很简单的，每行一项。这些事件类型会出现在添加和编辑事件的表单中。

Another use of *portal_metadata* is the selection of keywords available on a site. On the form at *portal_metadata/elements/subject*, you'll also see a vocabulary form for a content type of *<default>*. If you add items to the Vocabulary field of that page and click Update, you'll add these to the list of available keywords for *every* content type.

*portal_metadata* 的另一个应用是选择站点上的关键字。在 *portal_metadata/elements/subject* 的表单中，对于 *<default>* 的一个类型，你也会看到一个列表表单。如果你在那一页的Vocabulary区域中添加一项，并点击Update，你将把他们添加到每个内容类型的关键字列表中。

If you want keywords to appear for, say, only documents, then use the add form at the bottom of the page. Select a content type, and add some vocabulary, one value for each line. These will then become keywords that users can select for that piece of content only.

如果你希望关键字只出现在文档中，那就适用该页底部的添加表单。选择一个内容类型，添加一些词汇，每行一个值。这些将会只成为对于该种内容，用户可以选择的关键字。

If you're logged in as a user with the manager or reviewer role, clicking the properties tab of an object in the Plone interface will display a New Keywords box for the addition of ad-hoc keywords. These keywords won't appear in the *portal_metadata* vocabulary but will appear on all types of content for other users to enter.

如果你以管理员（manager）或者检察员（reviewer）的角色登录，在Plone的界面中点击一个对象的属性标签，会显示一个额外关键字的新关键字框。这些关键字不会出现在 *portal_metadata* 的词汇表中，但会显示在其它用户输入的所有类型的内容中。

Changing the Default Page

更改缺省页面
.........................

As discussed in Chapter 3, when a user is viewing a folder, the default page for that folder is shown if present. In the old versions of Zope and Plone, the name for that default page was *index_html*. You'll see these a lot in Plone sites, where Web site addresses often have *index_html* on the end. If you made this filename an extension that's more commonly recognized as *index.html*, then it'd be easier to edit using editing programs and Web site tools.

In Plone you can define a list of pages that will be looked up to be rendered as the default page (see Figure 4-18). The default pages are *index_html*, *index.html*, *index.htm*, and *<a href="http://members.czug.org/plone/newplonebook/FrontPage" title="" style="background-color:;">FrontPage</a>*. You set the list of pages in *site_properties/portal_properties/default_page property*, one name per line. When the default page is looked for, Plone will look for each page in that list, starting with the first until it finds one that matches. Further, if you'd like to change the value for a folder only, you can access the folder through the ZMI, click the properties tab, and then add a new list property called *default_page*.

 .. image:: img/3294f0418.png
    :width: 700

Figure 4-18. Making *index.asp* the first default page

How Can You Make the News Items List the Default Page?

如何让新闻列表作为缺省页面？
......................................................

Exactly how this works involves knowing the underlying machinery a little too much. For now, go to your portal root and click *Properties*. Then you need to go to the bottom of the page, complete the add new property form with the following information, and then click the Add button:

    For the Name field: **default_page**
    For the Value field: **news**
    For the Type field: **lines**

Now return to your Plone site. Instead of the standard home page, you'll see the news page. The news tab will still show you the news, as well, but in the following sections I'll show how to remove that.

Altering the Site Tabs

调整网站标签
......................

In a Plone site various tabs refer to different sections or parts of a site. Using tabs is a familiar concept in Web site design and is common in sites such as Amazon, MSN, and Plone sites.

Two main types of tabs exist: portal tabs and content tabs. The portal tabs are blue and appear at the top of the Plone site. The default ones are home, news, and members. The following sections show how to customize these. The content tabs are green and appear when an item can be edited. The content tabs, as the name suggests, are related to content. Chapter 11 covers how to alter these tabs. The tabs you see in a Plone site are formed by a collection of actions, so to understand how to modify these tabs, you'll take a quick look at actions in general.

Introducing Actions

介绍动作（Actions）
,,,,,,,,,,,,,,,,,,,

In Plone certain people can perform certain tasks at different times in different parts of the site. These various tasks are called *actions*. Plone translates them into tabs, links, and other elements. They're a highly configurable way of providing navigational elements for a site.

Each action has the following properties that can be configured in the ZMI. Exactly where you configure them depends upon where the action is stored. The following is a list of the properties for a default action:

 **Name**: This is a user-friendly name for the action. This name is often used in the user interface. For example, when the action is used as a tab, this value is the text in the tab.

 **Id**: This is a unique ID for the action.

 **Actions**: This is the action that's to be performed. For example, when the action is used as a tab, this action is used as the link. This field is a TALES expression (see Chapter 5 for more information).

 **Condition**: This is a condition that has to occur in order for the action to be used. For example, when used as tab, if this condition is met, the tab will appear. This field is a TALES expression (see Chapter 5 for more information).

 **Permission**: This is the permission the user has to have in order to have this action. This permission has to be met in order for the action to be used (see Chapter 9 for more information on security).

 **Category**: This categorizes the actions. In Plone this distinguishes the actions so they're used in different sections of the user interface. For portal tabs, the category value is *portal_tabs*.

 **Visible**: This indicates if the category is active. Since actions usually relate to visual elements, the term *visible* is used.

Introducing the Top Tabs

介绍页首标签
,,,,,,,,,,,,,,,,,,,,,,,,

In the following sections, you'll alter the portal tabs in two different ways as an example. You'll change the home tab to say *welcome*, and you'll move the members tab to the left of the news tab. The actions for the portal tabs are stored in the *portal_actions* tool, so to alter these, click *portal_actions* in the ZMI. As shown in Figure 4-19, this will open a large list of portal actions present by default. Some of these actions will seem familiar in that they represent parts of the Plone site.

 .. image:: img/3294f0419.png
    :width: 700

Figure 4-19. The portal actions for your Plone site

Scroll through the actions until you find the Home item, and change the Name field to **welcome**. Then scroll down to the bottom of the page, and click Save. Returning to the Plone interface, you'll now notice that it says *welcome* on the tab.

The order of the tabs from left to right on the page is set by the order from top to bottom in the list of actions. So, to move the tabs, it's a matter of checking the tab and then scrolling to the bottom of the page to the Move Up and Move Down buttons. It's a little tedious, but by repeatedly checking the actions and then using the up and down buttons, you can alter the order. Do this, and you'll note that the tabs now appear in a different order on your Plone site.

Why Is the Text in Lowercase?

为什么文字是小写的？
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Plone changes the case for many features, such as tabs, to lowercase in the style sheet. To turn off this option, you can alter the style sheet, which is discussed later in this chapter in the 'Changing Images and CSSâ<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter4/createform?page=CSS%C3%A2" title="create this page">?</a>€ section.

 ***Begin Sidebar***

Book Web Site: Adding a New Tab

书籍网站：添加一个新的标签
###############################

A nice navigation helper is to add a tab or remove one in the portal tabs. So, in this sidebar, you'll add a tab that points to the Software folder, and you'll remove the news and members tabs (which in my site is pointless). Return to the ZMI, and click *portal_actions*. Scroll to the bottom of the form to the add form. I filled out the form with the following values:

**Software**
**software_tab**
**string:$portal_url/Software**
**View**
**portal_tabs**
**selected**
Further, I found the actions for news and members and deselected Visible (not forgetting to hit Save, of course). Returning to the Plone interface, you'll now see those new tabs. The key value here is *Action*, which is a TALES expression. These are discussed fully in Chapter 5. The *Action* value points to the URL of the folder you're pointing to; in my case, it's *Software* and is in the root of my Plone site. Hence, the expression is *string:$portal_url/Software*.

 ***End Sidebar***

Altering the Icons for a Document

为文档更改图标
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

If you're looking at a list of links or options in a Plone site, then chances are that a series of actions are producing that list. If it's not actions, then it's code, but many of the key features of the Plone interface are generated dynamically from settings in the ZMI. Two other examples of actions are the document actions and site actions.

The site actions appear in the top-right corner and are links to change the size of the text. These links could be anything but just happen to reference some client-side script functions. These links are again configured in *portal_actions* and are just actions that have a different category. If you look through the actions in *portal_actions*, you'll see these three actions at the bottom of the page. They have the category *site_actions*. If you want to remove them, just uncheck the Visible option. The icons come from the *portal_actionicons* tool, which is another simple tool that maps the icon to the action. Looking in *portal_actionicons*, you'll see a match for *normal_text* of *site_actions* that matches up an icon (see Figure 4-20).

 .. image:: img/3294f0420.png

Figure 4-20. Site actions

Similarly, document actions are in *portal_actions* and have the category *document_actions*. You can again edit the order, icons, and text and add or remove icons from the interface all through editing those actions.

Changing Images and CSS

更改图片和CSS
.......................

The look and feel of a Plone site is a big subject that takes three chapters of its own, Chapters 5â€“7. The following sections cover the basics and, rather than trying to explain everything, just show how to quickly make a few changes.

A *skin* is a series of CSS, images, templates, and scripts that come together to form a look and feel for the user. The idea of a skin is that you can change the skin and hence change the look and feel of a site without having to change the content.

Changing the Skin

更改皮肤
,,,,,,,,,,,,,,,,,

You can change the default skin for a site using the portal skin form, which is accessible from the control panel. You can represent a Plone site in a few different ways by applying different colors, style sheets, and templates to a site.

The portal skin form provides the following three choices:

  - **Default skin**: This is the default skin to show to a user when they access the site. There is only one skin that's given by default, which is Plone Default.

  - **Skin flexibility**: This sets whether you're going to allow users the choice of choosing their skin. If this is enabled, a user can go to their preferences and choose a new skin. This is enabled by default.

  - **Skin cookie persistence**: If a user can select a skin, then select this to have the cookie last indefinitely. This means that a user will always see this skin when logging into a site. This is disabled by default.

Select the changes you'd like to make, and click Save to commit the changes. To improve performance sites, use image and style sheet caching. To ensure that you're seeing the new skin as it should be, clear your browser's cache (on Internet Explorer, pressing Ctrl+F5 will do this).

Setting a Different Logo

设置一个不同的徽标
,,,,,,,,,,,,,,,,,,,,,,,,

Changing the logo of a Plone site from the Plone logo is a simple operation, but the steps can get a little confusing, so you should following them carefully.

First, access the ZMI, click *portal_skins*, click *plone_images*, and then click *logo.jpg*. This will open the page for that object. It should look something like Figure 4-21.

 .. image:: img/3294f0421.png
    :width: 700

Figure 4-21. The default logo

This object represents the logo as it's used in Zope. In Figure 4-21 you can clearly see information about the image, its size, its type, and its location on the file system. In the middle of the page is the Customize button; click it. This will create a copy of the object called *logo.jpg* in the custom folder (see Figure 4-22).

**NOTE** If at this point you get an error message about a bad request, return to *portal_skins/custom*, and you'll see an object called *logo.jpg*. Click that object. There can be only one object called *logo.jpg* in the custom folder, and the error is warning you that this procedure has been performed already. If you want to customize the original object (in other words, repeat these steps), you'll have to delete the object inside *custom*.

 .. image:: img/3294f0422.png
    :width: 700

Figure 4-22. The customized image

This page may look similar to the previous page shown in Figure 4-21, but there are a couple of differences. First, if you look in the top-left corner of the page, you'll see that the *meta_type* and location of this object has changed. No longer are you in *portal_skins/plone_images/logo.jpg*; rather, you're in *portal_skins/custom/logo.jpg*. Second, you'll now see a Browse button that lets you select an image and upload it, meaning you can change this image. Click that button to find your new image, and click Save to commit the changes. In Figure 4-23, I'll add a Canadian Plone logo as an example.

 .. image:: img/3294f0423.png

Figure 4-23. The Canadian Plone logo

Now return to the Plone interface, and you'll see that the image has changed. To ensure you're seeing the new image, clear your browser's cache (on Internet Explorer, pressing Ctrl+F5 will do this).

What If Your New Image Isn't in JPG Format?

如果你的新图片不是JPG格式，会怎么样？
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Zope doesn't base the Multipurpose Internet Mail Extensions (MIME) type on the extension but rather on the content. So, you can upload a GIF image into *logo.jpg*, and it'll still work since the correct MIME type of *image/gif* is applied. However, you may want to rename the image to *logo.gif* or *logo.png* to be less confusing.

Changing the CSS Code

改变CSS代码
,,,,,,,,,,,,,,,,,,,,,

CSS determines the majority of the look and feel of your site, including the tabs, the images, the boxes, and the overall layout. The fact that Plone's CSS is totally customizable means that from a few style sheets users can completely customize many aspects of a site.

Again, Chapter 7 covers what all the elements do; in this section, I'll quickly show you how to change the CSS code for a Plone site. First, access the ZMI, click *portal_skins*, click *plone_styles*, and then click *ploneCustom.css*. This opens the page for that object. This style sheet is actually straightforward; in fact, it's empty. Plone is using the cascading property of CSS. Because the Hypertext Markup Language (HTML) for Plone first imports *plone.css* and then *ploneCustom.css*, any changes to the latter overrides the standard style sheet. Why is this a good thing? It means you can make small incremental changes to *ploneCustom.css* without breaking or altering the core style sheet.

So, to customize the *ploneCustom.css* object, click *portal_skins*, click *plone_styles*, and then click *ploneCustom.css*. Next, click the Customize button. Again, this object has been customized, and instead of being at *portal_skins/plone_styles/ploneCustom.css*, you'll notice you're now at *portal_skins/custom/ploneCustom.css*. Because file objects can now be edited through the Web, you can directly edit the style sheet through the Web.

As an example, make the background have an image in the middle of it (this isn't necessarily the best user interface, but it's a clear example of how to customize the CSS code). First, you need to upload an image to Plone. To do this, click *portal_skins*, click *custom*, click the Add button, and then select Image, as shown in Figure 4-24.

 .. image:: img/3294f0424.png

Figure 4-24. Adding the new image

For the file I chose an image I found on the Web (which is also available on the Plone book Web site), but you could choose any image you have. Make sure that the ID of the image is *background.gif*, as shown in Figure 4-25.

 .. image:: img/3294f0425.png

Figure 4-25. Checking the new image

Second, you need to change the CSS code to point to the new image. You've already customized the CSS code, so return to *portal_skins/custom/ploneCustom.css* and change the text from this:

::

 /* DELETE THIS LINE AND PUT YOUR CUSTOM STUFF HERE */

to the following:

::

 body {
    background-image: url(background.jpg);
    background-repeat: no-repeat;
    background-position: center;
 }

Click Save Changes to commit changes to this file. Then return to the Plone interface. If all went well, you should see the new image (see Figure 4-26).

 .. image:: img/3294f0426.png
    :width: 700

Figure 4-26. The new background image

From lookup Mon Aug 1 14:23:11 +0800 2005
From: lookup
Date: Mon, 01 Aug 2005 14:23:11 +0800
Subject: 
Message-ID: <20050801142311+0800@members.czug.org>

我想认领这一章。刚开始学习Zope/Plone，希望能通过翻译更仔细的学习，同时也为社区做一些力所能及的事情。