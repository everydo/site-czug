---
created: 2005-12-14 14:25:21
creator: panjy
description: ''
title: Chapter11
---
Chapter 11
-----------
:翻译: 潘俊勇

Manipulating and Categorizing Content Types

内容类型的操作和分类
===========================================

.. contents:: 内容


Throughout the book I've shown you how to add content to your site, and I've discussed the content types that come with Plone, such as documents, images, and so on. So far, however, you've been restricted to just these content types and the ones provided as products that you can find on the Internet. But the most powerful part of Plone is the core topic of this chapter: manipulating these content types.

虽然这本中，我已经为您展示了如何在网站中添加内容，我也讨论了Plone的内容类型，如文档、图片等。目前为止，您还仅仅限于这些内容类型和您在因特网上可以找到的、以附加产品(Product)提供的内容类型。Plone最强大的部分是本章的核心：操作这些内容类型。

In this chapter, I compare and contrast the different object types in Plone. This provides some insight into development tactics for your own projects. Then I cover the content types and how they're registered inside Plone. This registration provides the basis for customizing the types into the format you'd like. Then I move onto content categorization and searching - tasks you'll want to know how to perform. Armed with this knowledge, you'll be able to make key decisions about how to develop your site and create new content types.

这一章中，我比较和对比了Plone中这些不同的对象类型。这为您自己的项目开发策略方面提供了一些了解。接着，我开始讲解内容类型，以及他们如何在Plone内部注册。这个注册提供了定制你喜欢格式的内容类型的基础。接着我转到内容的飞来和搜索－你希望知道如何执行这些任务。有了这些知识，你将能够决定如何开发你的网站和创建新的内容类型。

So, I'll now whet your appetite about manipulating content types. Once you can customize an entirely new content type, you can have users adding and editing almost anything you want! Some of the examples include the following:

因此，我现在要开启您对操作内容类型的兴趣。一旦你创建了一个全信息的内容类型，你可以让用户进行添加和编辑。比如：

  - Users can upload an image of a cell culture that's dissected and manipulated using imaging libraries and is then presented to the user in a certain format.

  - Users can upload an MP3 audio file, extract the title and artist from the audio file, and place it inside Plone.

  - You can build an entire e-commerce store, letting Plone users add items such as clothes for sale, including information such as shipping costs, dimensions, and warranty.

  - Users can upload a Microsoft Word document and then manipulate it so that certain parts of it are blanked out. Users with a low security setting can see only those documents with blanked-out parts.

All these options and more are available to you in Plone! You really have few limits. This is why Plone is probably one of the most extensible and flexible frameworks available. The only real limit is your ability to program Python (or being able to afford someone to do it for you).

In this chapter, I thus cover content types in detail, including how to register and manipulate them through the Web. Although the following parts don't specifically require knowledge of Python, I recommend you at least become acquainted with it. I also include in this chapter information about the forms and how to validate them.

This chapter is required reading for anyone who wants to develop their own content types, no matter if they do it through the Web or in Python, because the chapter covers the areas needed to understand content type registration.

The next chapter will continue this journey鈥擨'll take you into the really gory details of using Python to write content types. After that you'll use Archetypes to do the same thing with a tenth of the effort and then do some really cool and advanced stuff with Archetypes. But right now, you'll get straight into content types, from the top!

An Overview of Content Types

内容类型的概览
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To begin with, I've been using certain terms throughout this book. The explanations I've given have been a little superficial, and it's time for me to expand on these to improve your understanding of them. The following are important concepts:

 **Content type**: This is a type of content registered in a Plone site. Usually, but not always, a content type is something that can be added and edited through the Plone interface by users of the given security. In Plone it's recommended to separate content types such as documents, files, and images. This separation of content into different types is a basic Plone concept.

 **内容类型** ：在Plone网站注册的内容的类型。通常，一个内容类型是能够在Plone界面中，由用户添加和编辑的东西。...

 **Item and object**: These terms refer to the actual instance of something, and they're overloaded terms, so their definitions normally depend upon their context. So far in this book, I've used these terms to refer to a particular instance of a content type, such as one particular document or image. From now on, I'll use the specific term, *content type*, to refer to actual content types.

 **条目和对象** : 这些术语指实际的实例。....

 **Tool**: A tool is a service that sits inside a Plone site. There will be only one instance of each tool in a Plone site. In itself, the tool doesn't do anything, and external users of the application will never know how many tools exist or what they do. However, content types or requests that the users make will interact with the tools. You've already seen some key tools鈥?portal_workflow*, *portal_skins*, and *portal_actions*, for example.

 **工具**: 工具是Plone站点内的服务。

 **Zope object**: This is an object that lives inside Zope. It can be accessed through the Zope Management Interface (ZMI) and provides functionality for users. However, it isn't something that's accessed or controlled by Plone. If you go to a Plone site and access the ZMI, you'll see a large number of these objects in the ZMI. Tools are one such object, the Plone site is another, and the cache managers are another. A great deal of overlap exists between these objects; for example, Plone has an image content type, and Zope has an image object. The two do similar tasks and work in a similar way, but only one can be accessed through Plone.

 **zope对象** : 位于Zope中的对象。

**NOTE** Although everything inside a Plone site in the Zope Object Database (ZODB) is a *Zope object*, I use this term to describe objects that aren't tools or instances of a content type.

When to Make Content Types

何时创建内容类型
..........................

So, you're building your killer application in Plone that's going to bring you fame and fortune. How do you structure it, and what do you build? Well, this depends upon what you're building, and you've factored out development so far. The following questions may help you decide:

 **Are you just changing skins and simple behaviors, such as portlets?** You can do almost anything you want, except write a tool or a content type in a skin. You can change all the Cascading Style Sheets (CSS), templates, and scripts that come with a Plone site if you really wanted to do so.

 **Will members of your site add multiple copies of this item?** If yes, then you probably want to write a content type.

 **Is this a service that other content types could use?** If yes, then you probably want to write a tool.

 **Will you want multiple copies of something but don't want members of your site to be able to add and edit it?** If yes, then you probably want a Zope object. However, you may want to rethink exactly what you're doing.

What usually happens is that an application is broken down into several bits: one or two tools and one or two content types. Chapter 12 covers writing a content type that takes source code, such as a snippet of Python, and then syntax highlights the code. If you needed that syntax highlighting in other places, then you could turn it into a tool that multiple content types could use. In short, tools are the best way to add functionality to a site rather than to any particular content type.

The definition for creating a content type is usually dictated by the requirement that users need to add, edit, and control these objects. It can be tempting to start creating a content type for every type of object, but as with all development, you need to be careful. Would it possible to use one content type instead of two, with only minor differences? Knowing how to configure this will come from experience, but the next few chapters will certainly help.

Content Type Configuration

内容类型配置
..........................

So, your Plone site contains content types, but how does the Plone site know how they're configured? The answer is that for each content type, its attributes, methods, security, and skins are all defined on the file system in Python and associated code. This information is enough for Plone to understand how to use the product. The only exception to this, as you've seen, is workflow, which is normally defined externally from the content type. Some products have their own workflow that's added to the content type for its behavior.

Chapter 10 showed you how content types are installed in Plone through a two step-process: First, the product is installed in Zope. Second, the content type is installed in *each* Plone instance. The second step installs information about the content type, which is taken from the file system and then installed into your Plone site.

Why is this a two-stage process? In the second stage, a local copy of the product in your Plone site is made, and now you can change how the content behaves for you. Want a document object to have different tabs at the top? Want a document object to be manipulated differently, look differently, and even be called something completely different? No problem鈥攜ou can now change your instance of Plone through the Web.

This approach is the same as it is for *portal_skins,* where you can customize a skin in your local instance. When changes occur in the product and you install a new version of Plone, those changes will affect the file system. But you can now download and install those changes; because you've customized it in your database, you'll keep the customized version.

Each content type in Plone will have a setting in the *portal_types* tool. Although each content type in the *portal_types* tool has only one setting, that type can have an unlimited number of actual objects in your database. The configuration is looked up when needed, so if you change the configuration, you'll update all the objects of that type in the database.

Content Type Registration in the portal_types Tool

在portal_types工具中注册内容类型
..................................................

To access the registration information, go to the *portal_types* tool in the ZMI. You'll be presented with a list of all the content types registered in this Plone site. Most of these content types are recognizable as something you'd add through the Plone interface with a few exceptions, such as Plone Site, TempFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TempFolder" title="create this page">?</a>, and so on.

Each of these objects is an instance of factory type information, which is the name for a particular type of configuration. Click any of these objects to access the type's information; for example, when you click an event, you get the local copy of the information about the content type. You can alter this through the Web to change your configuration. The following are the values in that form:

  - **Title**: This is a title for the content type.

  - **Description**: This is the description that appears for this content type. This is used if you go to folder contents and click *add* without selecting a content type to add鈥攁 list of all the content types and their descriptions will appear.

  - **Icon**: This is the ID of the icon that's used for this content type.

  - **Product metatype**: This is the metatype for this content type. This matches up the Plone content type with a Zope metatype.

  - **Product name**: This is the product name where this metatype is defined.

  - **Product factory method**: This is the method that's called by the product factory to create this piece of content.

  - **Initial view name**: This isn't used in Plone.

  - **Implicitly addable**: This indicates whether this content can be added to Plone. If this is selected, then it'll be addable, unless explicitly specified otherwise.

  - **Filter content types**: If this content type is a folder, then enable this to filter the content types that can be added by users to this object.

  - **Allowed content types**: If this content type can contain other items and *Filter content types* is enabled, only the types of content specified in this list will be allowed.

  - **Allow discussion**: This sets the default status for discussions for all types of content. If this is enabled, then users will be able to discuss the content. Which users will be able to do this is based on the permission *Discuss content*.

You'll now look at some of the aspects of this registration information in a bit more detail, including some examples.

How Do You Change the Icon for a Content Type?

如何改变内容类型的图标？
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

As an example, if you don't like the icon that appears for a content type, then it's a pretty simple matter of uploading a new image and then making sure that the value for the icon is set in the form described previously. Icons work best if they have a transparent background and are 16 pixels wide and 16 pixels high.

Click *portal_skins*, click *custom*,* *and add a new image. Then in the *portal_types* tool, set the value for the icon to be the same as the ID of the object uploaded. To test that the icon has changed, go to the Plone interface and look for where the object may appear; for example, do a search or look in the content add form.

Actions

动作
,,,,,,,

When you're looking at the content type configuration in *portal_types*, you'll see an Actions tab. These are the actions that can be performed on the content type. You briefly looked at actions in Chapter 4, which contains a detailed list of what the Actions tab contains.

*action*
As you've seen, actions are stored on tool objects. Many of the tools contain actions, but you really don't have a great way to search for the location of an action. If you want to change a particular action on your Plone site, you have to find the tool that stores it.

Once you've found that action, you can then customize as much as you'd like. For instance, if you want to add a new action as a green tab for a document, you have to go and find the correct place. Luckily, the following tips help you find an action:

  - If you're looking at an action on a piece of content such as view or edit, then it's on the particular content type in the *portal_types* tool.

  - If you're looking at an action for the site, then it's in the *portal_action* tool.

  - If you can't find it so far, look in a related tool; for example, joining and logging in are in *portal_membership*.

  - If you can't find the action you're looking for after trying the previous tips, go to *portal_actions* to see the list of tools and look through all the action providers.

Plone looks up the actions for content types in the following manner:

  - For an object, all the actions are queried.

  - For each action, the *conditions*, *permissions*, and *visible* properties are checked; if they pass, then the action will be returned.

  - Each action will be shown in the user interface, usually in the form of tabs at the top of the content or the top of site.

  - The URL for this action is the URL of the object with the actual *Action* appended to the end.

For example, on a document at *<a href="http://localhost.com/Plone/Document123">http://localhost.com/Plone/Document123</a>*, the URL for an edit would be *<a href="http://localhost.com/Plone/Document123/document_edit_form">http://localhost.com/Plone/Document123/document_edit_form</a>*.You should notice an important security issue here鈥攖he values for the *conditions*, *permissions*, and *visible* properties relate to showing the action in the list of actions. This means if users really wanted, they could alter the URL and go to *<a href="http://localhost.com/Plone/Document123/document_edit_form">http://localhost.com/Plone/Document123/document_edit_form</a>* even if the action permissions didn't allow this. For this reason, you should always have permissions on the actual actions that will be performed. If you were a user who could view an object but couldn't edit it, you could still alter the URL to get to the document edit form. No real harm has been done yet, because once you submitted it, the security would be rechecked and you'd be denied permission.

Normally actions are used as tabs in Plone, but since they can be called programmatically, they could be used in any way. To call an action programmatically, you call the *listFilteredActionsFor* method of the *portal_actions* tool. Given an object, this will return to you a Python dictionary keyed on category for all the actions for an object:

::

 actions = context.portal_actions.listFilteredActionsFor(object)

This gives you the following:

::

 {'site_actions': [
   {'category': 'site_actions', 'name': 'Small Text',
   'url': "javascript:setActiveStyleSheet('Small Text', 1);",
   'visible': 1, 'id': 'small_text',
   'permissions': ('View',)
    },
 ... and so on

The green tabs at the top are a combination of two categories: *object* and *object_tabs*. The actions returned from the method are a Python dictionary whose keys are the groupings of the category for that action. So, to get just the actions object for one category鈥攆or example, all actions in the *object* category鈥攜ou could just access that key of the dictionary. For example, *actions["object"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=%22object%22" title="create this page">?</a>* will give you a list of all these actions:

::

 {'category': 'object',
 'name': 'Contents',
 'url': ' <a href="http://localhost:8080/Plone/folder_contents">http://localhost:8080/Plone/folder_contents</a>',
 'visible': 1,
 'id': 'folderContents',
 'permissions': ('List folder contents',)},
 ... and so on

You'll note that as long as you provide the object you're examining, it goes to the *portal_types* tool and finds all the actions for your particular *portal_type*, as well as any other actions that may be relevant.

If you wanted to add a new tab for a content type, all you need to do is go to *portal_types*, click the content type, and select the Actions tab. Then add your action. If the action were to appear as a green tab for the content type, then you'd have to ensure you made the category *object_tabs*.

Other Objects in the portal_types Tool

portal_types工具中的其他对象
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,



*portal_types*


Storing Content Type Information on the File System

在文件系统中存储内容类型信息
...................................................

You've now seen how this information is stored in Zope, but it does of course come from somewhere on the file system. This information is normally stored on the product in a dictionary, usually called *factory-based type information*. Listing 11-1 shows the factory information about Folder, which is a product that shows folders in Plone. This was taken from *PloneFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=PloneFolder" title="create this page">?</a>.py* file located in the *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CMFPlone" title="create this page">?</a>* directory.

Listing 11-1. Factory-Based Type Information

::

 factory_type_information = {
     'id':'Folder',    'meta_type':'Plone Folder',
     'description':"""\
 Plone folders can define custom 'view' actions,\
  or will behave like directory listings without one defined.""",
     'icon':'folder_icon.gif',
     'product':'CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CMFPlone" title="create this page">?</a>',    'factory':'addPloneFolder',
     'filter_content_types':0,
     'immediate_view':'folder_listing',    'actions':
       ( {
            'id':'view',           'name':'View',
            'action':'string:${folder_url}/',           'permissions':
 (CMFCorePermissions<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CMFCorePermissions" title="create this page">?</a>.View,),           'category':'folder',         }
     ...
       )
     }

The Python dictionary closely maps the forms you saw in the Plone interface; for example, '*meta_type': 'Plone Folder'* is the product's *meta_type* and will appear in that field. The actions appear as a list of dictionaries for each action, and it's again straightforward with key/value pairings for all the properties of an action. I just showed the first action here, *View*, but by now this information should be familiar to you.

Creating a New Content Type from an Existing Type

基于现有的内容创建新的内容类型
.................................................

*Repurposing* is taking the information for an existing content type and creating multiple, slightly different copies of the same type. If you wanted to make a type that was almost the same as a news item, but not quite, then repurposing may be a quick and simple option.

The one big drawback of this approach is that you can't really change much beyond the actions, the skins, and some of content type settings. So before you proceed down this path, please be aware that you're limited to these points; you can't add new fields or attributes, for example. I've seen many e-mails on the mailing list saying, 'I've done this much, but now I want to change the attributes of my press release.鈥?So consider this a warning: You can't! If you want to do more, check out writing content types in the next two chapters.

Say you wanted to make a press release type that's like a news item but it does the following:

  - It has the name *Press Release* in the drop-down list.

  - It has a different icon.

  - It has a different workflow from a news item.

  - It has a different view.

  - It keeps the same data structure as a news item.

  - It retains the news item type.

Well, in this case, repurposing a content type is ideal. For this example, take the factory-based type information for a news item, load it into the *portal_types* tool, and then call it a press release. This will allow you to reuse all the existing code and information while giving you new options. In the ZMI, access *portal_types* and complete the following steps:

*Factory-based Type Information*
**Press Release,**
*Use default type information*
This is now an instance of the configuration for a news item, but it's called *Press Release*. What advantage does this give you? Well, you now have another type of object that can be added through the Web by a user. This gives the users of your site a really easy way to distinguish between a news item and a press release, without mucking around with keywords or metadata. It will also show up in searches and all other places as a press release. You can now change the configuration for the press release, and this will leave the configuration for the news item intact.

Changing the icon was discussed earlier in this chapter鈥攕imply upload the image into your custom directory and then alter the Icon property in the *portal_types* page for a press release. If you go to *portal_workflow*, you can see that each content type has its own workflow. Because this is now a new content type, you can change the workflow for press releases only. Perhaps press releases require an extra stage of review or, when published, send e-mails to certain users. You can now make a new workflow, as I described in Chapter 8, and assign it to your press release.

Adding a new view means customizing the *newsitem_view* page template and renaming it to something meaningful such as *pressrelease_view*. You may want to alter that file to add some information about the company at the bottom of the page. For example:

::

 <h2>About ACME Widget Company</h2>
 <p>Our company is the prime maker of widgets in the world. Founded
 in 1980 we've been providing excellent widgets to all parts of the
 globe. For more marketing information, please contact: Joe Bloggs,
 marketing director.</p>

After you've saved your changes to your new page template, return to the settings for the press release in *portal_types* and go to the Actions page. Change the action for viewing a press release from pointing to *newsitem_view* to pointing to *pressrelease_view*. Now whenever you view a press release, that view page will display, as shown in Figure 11-1.

 .. image:: img/3294f1101.png

Figure 11-1. An example Python script uploaded into Plone

In this case I've added a Press Release object, and the footer about ACME Company is in the template, so users don't need to remember to type this in every time.

Creating a Scripting Object

创建一个脚本对象
...........................

Once an object is registered in the *portal_types* tool, you can then create the object in your Plone site. You can also script the creation of the object programmatically. This is useful for making objects based on certain other factors or creating objects en masse. Plone has two useful Script (Python) objects for this:

 **generateUniqueId**: This creates a new unique ID for the type of object, for example, *Folder.2003-12-19.7359814582*. It's unique only to the folder it's created in; if you create a lot of objects quickly, then it's possible that they couldn't be unique. For most normal usage, this is good enough.

 **invokeFactory**: This takes an ID and a type name. This will create an object of the type given and give it the ID specified.

You'll make an example script that creates a folder and a default page in that folder, and into that default page you'll put some specific content. If this sounds familiar, this is what happens when you join a site and a home folder is created for you. The type names match the registration inside the *portal_types* tool, so if you wanted to create a folder and inside that create a document, you'd need to pass the parameters *Folder* and *Document* to the *invokeFactory* script.

Listing 11-2 shows a script that gets a unique ID and that creates a folder based on that ID. It will then step inside the folder and create a new document.

Listing 11-2. Getting an ID and Creating a Folder

::

 ##title=Create
 ##parameters=
 # create with a random id
 newId = context.generateUniqueId('Folder')
  
 # create a object of type Folder
 context.invokeFactory(id=newId, type_name='Folder')
 newFolder = getattr(context, newId)
  
 # create a new Document type
 newFolder.invokeFactory(id='index.html', type_name='Document')
  
 # get the new page
 newPage = getattr(newFolder, 'index.html')
 newPage.edit('html', '<p>This is the default page.</p>')
  
 # return something back to the calling script
 return "Done"

If you add this as a Script (Python) object and test it by using the Test tab, you'll get a folder made for you. One interesting thing to note is that this creates the folder and document in the current context, wherever the context object may be.

Content Type Registry

内容类型注册
.....................

I've shown you a variety of ways to access Plone, including File Transfer Protocol (FTP) and WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=WebDAV" title="create this page">?</a>. When Plone receives a piece of content from one of these sources, it has to deal with the content in an appropriate manner. This negotiation is performed by the content type registry, which is visible in the ZMI as the *content_type_registry* tool. If you visit the *content_type_registry* tool in Zope, you'll probably be dazzled by yet another badly designed form in the ZMI鈥ut don't let that put you off!

When a piece of content is added to Plone via FTP or WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=WebDAV" title="create this page">?</a>, the rules in the registry are executed from the top to the bottom, until a match is made. The match is based on the criteria in that rule, and when met, the appropriate content type for that rule is created. The following are the four different types of criteria:

 **major_minor**: This takes the two parts (either side of the forward slash) of the Multipurpose Internet Mail Extensions (MIME) type of the incoming file and matches against them. If you leave either part blank, then it will match everything. For example, a *major_minor* of *image * (that's one empty space on the end) matches *image/jpeg*, *image/gif*, *image/png*, and so on.

 **extension**: This matches the filename extension; each extension is separated by a space. So, for example, *doc pdf* matches *invoices.doc* and *report.pdf*.

 **mimetype_regex**: This performs a regular expression match on the MIME type. For example, _*,^j* matches *image/jpeg*, *image/jpg*, *application/java*, and so on.

 **name_regex**: This performs a regular expression match on the filename. For example, *^Invoice* will match *Invoice-123.pdf* but not *Not_an_Invoice-123.pdf*.

To add a type, in the form at the bottom of the page, enter the name of the rule and the type from the drop-down and click Add. This will create a rule at the bottom of the page and allow you to enter a pattern that matches the type of rule you created and select the content type you want to create from the drop-down list. You can then click Up and Down to move your item up and down, respectively, to increase its importance.

As an example, I recently bought a digital camera. Because the Plone Windows installer has CMFPhoto<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CMFPhoto" title="create this page">?</a> and PIL all set up, it seemed a way to dump my pictures into an online photo album with minimum ease. First, I enabled the FTP server, and then I went to content type registry and made a new rule, based on extension that maps *image/jpeg* to the photo content type. I then moved the rule up above the existing rule for images. Then all I had to do was drag and drop the photographs into my FTP client, and they were automatically loaded into Plone, thumbnailed, and displayed.

Searching and Categorizing Content

查询和内容分类
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You've seen how you can search for content in Plone, but I'll now go into detail and show how the underlying categorization and searching of content occurs. The main tool that stores all this information is a tool called the *portal_catalog*, which is a slightly different and extended version of the underlying ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCatalog" title="create this page">?</a> tool. You'll find an excellent online reference to the ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCatalog" title="create this page">?</a> at *<a href="http://zope.org/Documentation/Books/ZopeBook/2_6Edition/SearchingZCatalog.stx">http://zope.org/Documentation/Books/ZopeBook/2_6Edition/SearchingZCatalog.stx</a>*.

The catalog provides three key elements to a Plone site: It creates indexes of content, it holds metadata about the content in the index, and it provides a search interface to quickly examine the content of your Plone site. Of all the different objects present in your Zope site, only the actual instances of your content types are cataloged. Zope objects, tools, and other objects aren't placed in the catalog. For this reason, the catalog tool is closely tied to the content types and their usage. You can access the catalog by accessing the *portal_catalog* tool in the ZMI.

Indexing Content

内容索引
................

The first part of the catalog's job is to build indexes of the content. An index primarily provides a method for quickly and efficiently searching the content. For this reason, the content of the index isn't designed to be clear or make sense; it's designed rather for fast and efficient searching. When you search in a Plone site, you search the indexes, and the catalog will return matching result sets for that query.

An index queries a Plone object for a particular value, a method, or an attribute, and then it indexes whatever that object returns for that query. How it actually indexes the content depends upon the type of the index. Table 11-1 lists all the indexes that come with Plone.

Table 11-1. Available Index Types

 **Name	Description**

*DateIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateIndex" title="create this page">?</a>*	This is designed to index dates, and it lets you do searches based on dates and times.

*DateIndexRange<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateIndexRange" title="create this page">?</a>*	This is a more efficient implementation of *DateIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateIndex" title="create this page">?</a>* for cases where you have two dates, such as start and end dates and doing lots of searches in those dates.

*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	This treats every result automatically and allows you to search on whatever the index may contain. It matches any search that matches the index.

*KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>*	This takes a sequence of keywords and splits them into separate words. This will return a result if any of the keywords in the index match the given query. This is ideal for searching subjects or keywords on objects.

*PathIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=PathIndex" title="create this page">?</a>*	This indexes the path of an object, such as */Members/jane/myDocument*, as a list of the objects. This allows you to query the catalog for all the contents of *Members* without having to ask the folder. A *Path* index will return everything below the *Members* folder.

*TextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TextIndex" title="create this page">?</a>*	This is an old text index that takes text, splits it up, and indexes that. See *ZCTextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCTextIndex" title="create this page">?</a>*.

*TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>*	This builds up predefined result sets at cataloging time. This is useful for often-repeated queries.

*ZCTextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCTextIndex" title="create this page">?</a>*	This is a new index that provides full-text searching capabilities efficiently on pieces of text. It supports a large number of features, discussed in detail later.

You can see what indexes are defined in a catalog by clicking *portal_catalog* and selecting the Indexes tab. This will give you a list of all the indexes defined in your Plone site. The columns are the name of the index, the type, the number of hits, and when the index was last modified. The types of indexes were briefly covered previously, but Table 11-2 describes what all the default indexes are in a Plone site.

Table 11-2. Default Indexes That Are Set Up in Plone

 **Name	Type	Description**

*Creator*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	This is the username of the person who created the object.

*Date*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	This is the effective date; if not present, it's the last modified date.

*Description*	*TextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TextIndex" title="create this page">?</a>*	The description field.

*SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=SearchableText" title="create this page">?</a>*	*ZCTextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCTextIndex" title="create this page">?</a>*	The description, title, and body of the object as one searchable lump of text.

*Subject*	*KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>*	The keywords for an item.

*Title*	*TextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TextIndex" title="create this page">?</a>*	Item's title.

*Type*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	The portal type as defined in the *portal_types* tool.

*allowedRolesAndUsers*	*KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>*	Who can view this content; this is an efficient way to examine this so you can filter the search results.

*created*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	When the item was created.

*effective*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	When the item will become effective.

*end*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	For events only, when the event will end.

*expires*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	When the item will expire and no longer be viewable.

*getId*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	The ID for an item.

*id*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	Same as *getId*.

*in_reply_to*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	For discussions, gives the item to which this comment is responding.

*meta_type*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	The underlying metatype of the item.

*modified*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	When the item was last modified.

*path*	*PathIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=PathIndex" title="create this page">?</a>*	The path to the item.

*portal_type*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	Same as *Type*.

*review_state*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	The state of the object in workflow.

*start*	*FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*	For events only, when the event will start.

If you're ever unsure of the contents of an index, then you can see the contents of the indexes in the ZMI. Click *portal_catalog* and select Catalog, and this will list every object cataloged at this time. Click an object, and a window will pop up with the contents of the index and the metadata. The metadata comes first so scroll down to see the indexes.

To add, remove, or alter the indexes, return to the Indexes tab. Use the usual Add drop-down box to add a new index or remove an index. If you want to run a reindex of a particular index, then select the indexes in the left and click the reindex button. If you add an index to the catalog, it isn't populated, meaning you then need to click the reindex button to ensure that there's some content in your index.

**NOTE** If you have a large site, this indexing can be quite time and processor consuming, so you may want to avoid doing this during peak load times.

Metadata

元数据
........

When the catalog returns a result, it doesn't return to you the object; instead, it returns the metadata stored in the catalog. This metadata is a series of fields or columns for each value on the object. Likewise, a set list of columns for a Plone site are created, as described in Table 11-3.

当catalog返回一个结果，它不是返回那个对象，而是返回在catalog中存储的元数据。这个元数据是对象的一系列的域或者列的值。同样的，Plone网站创建了一组列清单，如表11-3所述。

Table 11-3. Default Metadata That's Set Up in Plone

 **Name	Description**

*CreationDate<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CreationDate" title="create this page">?</a>*	The date when the object was created.

*Creator*	The username of the person creating the object.

*Date*	This is the effective date; if not present, it's the last modified date.

*Description*	The description field.

*EffectiveDate<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=EffectiveDate" title="create this page">?</a>*	The effective date.

*ExpiresDate<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ExpiresDate" title="create this page">?</a>*	The expires date.

*ModificationDate<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ModificationDate" title="create this page">?</a>* The modification date.

*Subject*	The keywords on an object.

*Title*	The object's title.

*Type*	The object's *portal_type*.

*created*	Same as *CreationDate<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CreationDate" title="create this page">?</a>*.

*effective*	Same as *EffectiveDate<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=EffectiveDate" title="create this page">?</a>*.

*end*	For events only, when the event will end.

*expires*	When the object will expire.

*getIcon*	The objects icon.

*getId*	The object's ID.

*getRemoteUrl*	Only used for links; this is the URL pointed to by the link.

*id*	Same as *getId*.

*location*	For events only, where the event will take place.

*meta_type*	The object's *meta_type*.

*modified*	When the object was modified.

*portal_type*	The object's *portal_type*.

*review_state*	The state of the object in workflow.

*start*	For events only, when the event will start.

How an Object Is Indexed

对象如何进索引
........................

Content types are indexed automatically because they inherit from a class called *PortalContent<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=PortalContent" title="create this page">?</a>*, which inherits from a class called *CMFCatalogAware<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CMFCatalogAware" title="create this page">?</a>*. The *CMFCatalogAware<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=CMFCatalogAware" title="create this page">?</a>* class handles all the code to ensure that when you add, edit, cut, copy, delete, or rename an object, the catalog (and also workflow) are kept up-to-date. Essentially the object is passed to the catalog, and the appropriate instruction for the catalog is called (index, remove from index, and so on).

The catalog then runs through each index and for each index queries the object by looking for attributes or methods on the object. For most indexes, the attribute or method looked up is the same name as the index. For the index name *Title*, it would look for an attribute or method named *Title* and populate the index with the result. It then repeats the process with each of the metadata columns.

Two exceptions to this process are the *FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>* and *TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* types. When you add a *FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*, you can specify that the index examines a different value than the name of the index. For example, you could make an index with the ID *getVersion*, which looks at the value of version. As you'll see later, some indexes have advantages over others, so it can be useful to have two different indexes pointing to the same value.

*TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* is a different type of index in that it builds up a series of sets at the time the content is indexed. If you wanted to do a lot of searches for all images, then you could add a search for *o.portal_type == 'Image'*. To do this, you need to create a *TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* and then click the index from the Indexes tab; you can even add multiple expressions to build up an index. At this time, *TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* indexes aren't used anywhere in Plone.

*TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* 是一个不同的索引类型。它在内容索引的时候，构建了一系列的集合。如果你希望经常对所有的图片进行搜索，你可以添加一个 *o.portal_type == 'Image' 的嗖嗖。要实现这个，你需要创建一个 *TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* 在Indexes标签中，点击索引；你甚至可以添加更多的表达式，来构建一个索引。目前， *TopicIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=TopicIndex" title="create this page">?</a>* 在Plone还没有被使用。

How Do You Reindex All the Content on Your Plone Site?

如何为你的Plone网站的全部内容重建索引？
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

If you've made a large number of code-level changes, put in a new product, renamed or moved your root Plone object, then you may need to reindex all the content on your site. In the ZMI, click *portal_catalog*, click Advanced, and click Update Catalog. This will run the process of updating your catalog.

**CAUTION** This is an even more intensive task than reindexing just one index, and it can take a long time and use a lot of memory and processing power if you have a large database.

Relational Databases vs. Plone

关系数据库和Plone的对比
##############################

The development of content types in Plone is slightly different from developing using a relational database. A common development paradigm these days is LAMP鈥攁 combination of Linux, Apache, MySQL<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=MySQL" title="create this page">?</a>, and PHP or Perl. In this paradigm, data is stored in a table in the database, and a scripting language provides the application layer to pull the content out of the database and put it into templates. You search the content by sending queries to the database in SQL, using *SELECT* statements.

Plone does this differently with the use of an object database. Any content item can contain any attributes of any type, and the underlying object database takes care of persisting those attributes in the database. For searching, all the objects are then indexed in the *portal_catalog* tool. You have to specifically tell the catalog exactly what attributes you'd like to index. Instead of doing SQL calls, you'd instead use the catalog to examine the indexes.

This difference can be confusing in the development stage, especially since relationships between objects aren't created and maintained as they would be in a relational database application. Instead, there are two common ways to maintain a reference: using a catalog to maintain the relationship through keywords or other values or using a folder to group content. Archetypes, which I'll discuss in Chapter 13, allows you maintain relationships easily. It does so through the catalog.

Searching the Catalog

查询Catalog
.....................

Of course, the biggest question is how to search the catalog and use the results. The first of these tasks depends upon the indexes, so I cover each of the indexes and show how to search them. The second of these tasks involves manipulating the results, so I then show you how to do this.

All of the following examples are in Python because this is the best way to search a catalog. I also show a quick example of how to hook this into a page template. I fully recommend using Python for manipulating the catalog because it really is the best place to do things, allowing you the best flexibility without having to worry about the syntax.

In general, you achieve searching by calling the method *searchResults* on the *portal_catalog* object and passing through a series of keyword parameters. A couple of reserved keywords exist, but the rest are mapped directly to the indexes of the same name. So if you wanted to search the *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=SearchableText" title="create this page">?</a>* index, you'd pass through to the search method a keyword parameter for *SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=SearchableText" title="create this page">?</a>*. The reserved keywords are as follows:

  - **sort_on**: This is the index to sort the results on, assuming that the index allows sorting (full-text indexes don't allow sorting).

  - **sort_order**: This is *reverse* or *descending*; if not specified, the default is *ascending*.

  - **sort_limit**: This is an optimization hint to make sorting a little quicker.

So, a general search for all items that mention Plone and are published in *Date* order looks something like this:

::

 context.portal_catalog.searchResults(
     review_state = "published",
     SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=SearchableText" title="create this page">?</a> = "Plone",
     sort_order="Date"
 )

The search will return the intersection of the index results, so this will find all items that mention Plone *and* are published. You can't do searches that are the union of results; however, you could do multiple results and then add the results together, but this is a rather unusual case, though.

**TIP** If you do a search with no values, then the entire contents of the catalog are returned. By default, all searches add values for effective and end dates, ensuring that you see content only between these times, unless the user calling the search has the *Access inactive portal content* permission.

Searching a Field or Date Index

查询一个域或者日期索引
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

To search a *FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*, pass through the value of the field. Any hits that match will be returned; for example, to search for all the image's in a site, use the following:

::

 results = context.portal_catalog.searchResults(
     Type = "Image"
 )

A field index can take a range of objects as well, and the index will attempt to find all the values in-between by performing a comparison of the values. This range could be between two dates, two numbers, or two strings鈥攊t really depends upon the value of *FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*. You do this by passing a dictionary to the index, rather than just a string. The dictionary should contain two values: a list called *query*, which contains the values to be tested, and a range, which defines a range of the values. The range is a string of one of the following:

  - **min**: Anything larger than the smallest item

  - **max**: Anything smaller than the largest item

  - **minmax**: Anything smaller than the largest and bigger than the smallest

For example, to find all events that have a start time bigger than now (in other words, anything in the future), use the following:

::

 from DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a> import DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a>
 now = DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a>()
 results = context.portal_catalog.searchResults(
        Type = "Event"
        end = { "query": [now,]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=now%2C" title="create this page">?</a>,
                 "range": "min" }
 )

To search on a range, such as all news items in December, you'd need to calculate the start and end dates for the month. From those dates, you can then construct the following query:

::

 from DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a> import DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a>
 start = DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a>('2004/12/01')
 end = DateTime<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=DateTime" title="create this page">?</a>('2004/12/31')
 results = context.portal_catalog.searchResults(
         Type = "News Item",
         created = { "query": [start, end]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=start%2C%20end" title="create this page">?</a>,
                          "range": "minmax" }
 )

Date indexes work in the same manner as field indexes, and often you'll see dates placed inside field indexes, which works just fine.

Searching a KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>

查询一个KeywordIndex
,,,,,,,,,,,,,,,,,,,,,,,,

By default, a *KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>* returns all the values that match in the keyword index. *Subject* is the only *KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>*; this is the keyword that a user has assigned to an object through the Properties tab of the Plone interface. To search for all items with the keyword *Africa*, use this:

::

 results = context.portal_catalog.searchResults(
         Subject = "Africa"
 )

Similar to a *FieldIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=FieldIndex" title="create this page">?</a>*, a *KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>* can be passed a more complicated query, with several objects and an and/or operator (*or* is the default). This would allow you to find all objects that have almost any combination of keywords. To find all objects that have the subject *Africa* and *sun*, use the following:

::

 results = context.portal_catalog.searchResults(
         Subject = { "query": ["Africa", "sun"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=%22Africa%22%2C%20%22sun%22" title="create this page">?</a>,
                      "operator": "and" }
 )

Searching a PathIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=PathIndex" title="create this page">?</a>

查询一个PathIndex
,,,,,,,,,,,,,,,,,,,,,

A path index allows you to search for all objects in a certain path. It will return every object below a current location, so if you ask for all objects in *Members*, it'll return everything in everybody's home directories. For example, for all objects that have *Members* in their path, use this:

::

 results = context.portal_catalog.searchResults(
         path = "/Plone/Members"
 )

If you want to further restrict this, you can do so by passing through a level parameter that sets where you expect the value to be. The level is a number representing its position in the path, from the left when splitting it up by forward slashes. For example, in the previous code, *Plone* is level 0, *Members* is level 1, and so on. Similarly to *KeywordIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=KeywordIndex" title="create this page">?</a>*, you can pass through an and/or operator. To get all objects in the */Plone/Members/danae* folder and the */Plone/testing/danae* folder, use the following:

::

 results = context.portal_catalog.searchResults(
         path = { "query": ["danae"]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=%22danae%22" title="create this page">?</a>,
                 "level" : 2 }
 )

Searching a ZCText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCText" title="create this page">?</a> Index

查询一个ZCTextIndex
,,,,,,,,,,,,,,,,,,,,,,,,

*ZCTextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCTextIndex" title="create this page">?</a>* is the most complicated of all indexes and takes a whole host of options. Each *ZCTextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCTextIndex" title="create this page">?</a>* requires a lexicon; fortunately, Plone creates and configures all this out of the box. If you click *portal_catalog*, select the Contents tab, and click *plone_lexicon*, you can see the default configuration of the lexicon. Clicking the Query tab will show you all the words that are in the lexicon built out of your Plone site content.

The *ZCTextIndex<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=ZCTextIndex" title="create this page">?</a>* is searched using the format I described in Chapter 3. It takes similar terms to the searching that you can use on Google or other search engines. At its most basic, you can search for any term (note that this is case insensitive), like so:

::

 results = context.portal_catalog.searchResults(
         SearchableText<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=SearchableText" title="create this page">?</a> = "space"
 )

But you can also search for all of the following:

  - **Globbing**: Use an asterisk to signify any letters. For example, *tues** matches *tuesday* and *tuesdays*. You can't use the asterisk at the beginning of a word, though.

  - **Single wildcards**: Use a question mark to signify one letter. For example, *ro?e* matches *rope*, *rote*, *role*, and so on. You can't use the question mark at the beginning of a word.

  - **And**: Using *and* signifies that both terms on other side of it must exist. For example, *rome and tuesday* will return only a result with both those words are in the content.

  - **Or**: Using *or* signifies that either terms can exist. For example, *rome or tuesday* will return a result if either of those words are in the content.

  - **Not**: Using *not* returns results where this isn't present (a prefix *and* is required). For example, *welcome and not page* would return matches for pages that contained *welcome*, but not *page*.

  - **Phrases**: You can group phrases with double quotes (") and signify several words one after the other. For example: *"welcome page"* matches *This welcome page is used to introduce you to the Plone Content Management System*, but not *Welcome to the front page of鈥?.

  - **Not phrase**: You can specify a phrase with a minus (-) prefix. For example, *welcome -"welcome page"* matches all pages with *welcome* in them, but not ones that match the phrase *welcome page*.

 **TIP** If you perform a search with no text, then no results are returned.

Using the Results

使用返回结果
,,,,,,,,,,,,,,,,,

So you've got some results, now what do you do with them? The first thing a lot of people do is look at the results and assume that it's a list of the objects that were cataloged. Well, it isn't; rather, it's a series of 'catalog brains.鈥?These brains are actually lazy objects that contain the metadata columns defined earlier. You can access any of these columns as if it were an attribute. For example, to print all the IDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=IDs" title="create this page">?</a> of result objects, use the following:

::

 results = context.portal_catalog.searchResults()
 for result in results:
     print result.getId
 return printed

In this example, *getId* is the name of a metadata column, so it'll display the value for *getId* that the catalog had for that object. If you try to just access a value that doesn't exist as a metadata column, then you'll get an *AttributeError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=AttributeError" title="create this page">?</a>*. The following are a few methods available from a brain that are useful:

  - **getPath**: This returns the physical path for this object inside Zope.

  - **getURL**: This returns the URL for this object with virtual hosting applied.

  - **getObject**: This returns the actual object.

  - **getRID**: This is a unique ID for the object in the catalog, and it changes each time the object is uncataloged. It's for internal purposes only.

So, if you wanted to get the object for each result, you can do so, as you'll see in the following example. However, there's a reason the catalog doesn't do this鈥攊t's expensive (in terms of computation) because it involves waking up an object from the database (and all the objects in-between) and making lots of security checks. If you can try to make your metadata contain the right information, you'll have a much faster application. Obviously, sometimes metadata can't contain everything, but it's worth considering in the design. To get each object, use the following:

::

 results = context.portal_catalog.searchResults()
 for result in results:
     object = result.getObject()
     print object
 return printed

Since you have a Python list of these brains, it's now straightforward to manipulate the results in a manner that you see fit. To find out how many results were returned, you can just call the *len* function on the list, like so:

::

 results = context.portal_catalog.searchResults()
 print "Number of results", len(results)
 return printed

**NOTE**: *len* is a Python function that tells you the length of an item.

To get just the first ten items, use a Python slice, like so:

::

 results = context.portal_catalog.searchResults()
 return results[:10]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=%3A10" title="create this page">?</a>

To do further filtering, you could manually filter the whole list, like so:

::

 results = context.portal_catalog.searchResults()
 for result in results[:10]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter11/createform?page=%3A10" title="create this page">?</a>:
     # Title returns a string so we can use the find method of
     # a string to look for occurence of a word
     if result.Title.find("Plone") > -1:
         print result.Title
 return printed

To get a random object from the catalog, use the random module, like so:

::

 import random
 results = context.portal_catalog.searchResults()
 r = random.choice(results)
 object = r.getObject()
 return object

Tying It All Together: Making a Search Form

贯穿起来：构建一个查询表单
...........................................

In the previous discussion, I showed you how to get some results out of the catalog, and I used Script (Python) objects to demonstrate that. But you're probably asking yourself, how can I do this from a page template?

I'll start at the other end and first assume you have the results from a catalog query and loop through them in a page template using *tal:repeat*. This is how a lot of portlets are put together鈥攖he published and events portlets both just do queries and then show the results. Those portlets embed the query in a page template either by calling it directly:

::

 <div tal:define="results python: here.portal_catalog.searchResults(Type="Event")">

or by calling a separate Script (Python) object that returns the results. For example, in the following, the script is called *getCatalogResults*:

::

 ##parameters=
 kw = {}
 # enter your query into the kw dictionary
 return context.portal_catalog(**kw)

In a page template, you'd get the results in the following manner:

::

 <div tal:define="results here/getCatalogResults">

After doing this, you need to loop through the results using the standard *tal:repeat* syntax. You can access each metadata column directly in the Template Attribute Language (TAL) by making a path expression to the column. So, given a brain, you could get the title from the metadata by calling *result/Title*. Listing 11-3 shows an example page that loops through the contents of *getCatalogResults* and displays each item in a simple unordered list.

Listing 11-3. Looping Through *getCatalogResults*

::

 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US"
       lang="en-US"
       metal:use-macro="here/main_template/macros/master"
       i18n:domain="plone">
 <body>
 <div metal:fill-slot="main">
 <ul tal:define="results here/getCatalogResults">
     <li tal:repeat="result results">
         <a href=""
            tal:attributes="href result/getURL"
            tal:content="result/Title" />
         <span tal:replace="result/Description" />
     </li>
 </ul>
 </div>
 </body>
 </html>

One property of the *searchResults* method is that if you don't pass any parameters to the function, it'll look them up from the incoming request. So if you wanted to allow a form to post parameters to your results, then all you have to do is change the previous results line to the following:

::

 <ul tal:define="
  
   results python: here.portal_catalog.searchResults(REQUEST=request)
   ">

Now you can redo your query and append any index to the URL. For example, if you called this page template *testResults* and appended *?Type=Document* to the end of the URL of your browser, only the documents in your site would appear. Since you can pass in almost any request values, you can set up a search form that would pass this information through to the search form. This is what the search and advanced search pages do; you'll note that if you go to a Plone site and search for *beer* in the search box, your URL will now have *?SearchableText=beer*.

So, Listing 11-4 shows a form to call your page template.

Listing 11-4. A Form to Call Your Template

::

 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US"
       lang="en-US"
       metal:use-macro="here/main_template/macros/master"
       i18n:domain="plone">
 <body>
 <div metal:fill-slot="main">
   <p>Select a content type to search for</p>
   <form method="post" action="testResults">
     <select name="Type">
       <option
        tal:repeat="value python:here.portal_catalog.uniqueValuesFor('Type')"
        tal:content="value" />
         </select>
         <br />
         <input type="submit" class="context">
     </form>
 </div>
 </body>
 </html>

This script uses a method called *uniqueValuesFor* on the catalog, which will return all the unique values that exist for an index. This lets you perform a task such as populating a little drop-down box in a form, which is a pretty useful thing to have.

At this point, it becomes an exercise in HTML and page templates to make the pages as complicated as you'd like. Of course, the best place to look for all this is in the actual templates of Plone, which give lines upon lines of great examples. All the portlets you're familiar with in Plone (such as the calendar, events, related, and so on) are all built using catalog queries to determine what to show.

In this chapter, I've provided you with an overview of ways to develop a Plone site and how content types work in your site. I demonstrated how a content type is constructed and then referenced through the catalog. This is a key development methodology in Plone.

In the next chapter, I'll show how to develop a new content type pretty much from scratch. You'll see how you can integrate that new content type with the catalog register in the *portal_types* tool.


