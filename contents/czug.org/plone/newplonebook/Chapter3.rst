第三章
---------

.. Contents:: 内容：

Adding and editing content（添加和编辑内容）
===============================================================

Adding and editing content is a simplification of the sheer power that Plone has available to leverage. Creating content-rich and feature-rich Web pages with Plone is an absolute breeze. If you have Plone installed locally, then this chapter shows you how Plone works straight out of the box. However, if you don't have Plone installed, then don't worry; you can try Plone online by going to *<a href="http://demo.plone.org">http://demo.plone.org</a>*.

添加和编辑内容只是Plone提供的全部功能的简化版。使用Plone，创建具有丰富内容和特性的网页变得十分容易。如果你已经在本机上安装了Plone，这一章内容将直接向你演示Plone是如何工作的。如果你还没有安装Plone，别担心，你可以在 *<a href="http://demo.plone.org">http://demo.plone.org</a>* 试用Plone。

Before you can alter or edit a Plone site, you need to log into a Plone site. If you installed Plone, you should have the username and password that came with the installation. This user has the role of an administrator user, which allows you to log in and alter any content. Most users of a Plone site will join the site and log in through the login process described in the 'Joining a Site' section. Users can, of course, view a Plone site without logging in, but they won't be able to add or edit content.

首先你必须登录到Plone站点，然后才可以修改或编辑内容。如果你自己安装了Plone，那么你应该在安装时已经获得了用户名和密码。这个用户具有管理员的角色，你可以通过它来登录并修改任何内容。而大多数的用户则都可以通过'Joining a Site'这一节的登录过程来加入一个站点。当然，用户不用登录也可以浏览Plone站点，但他们无法添加或修改内容。

In this chapter, I'll go through the steps a user takes to create content on a Plone site. First, I'll cover how to join the site and log in. Once you've accomplished this, I'll cover how to create and then edit a document. Finally, I'll show how you can search and publish this content. In short, this chapter covers how to use Plone.

在这一章里，我将介绍在一个Plone网站中创建内容的步骤。首先，我会讲怎样加入一个站点并登录，在这之后，我会介绍怎样添加和编辑文档。最后，我会介绍怎样搜索和发布内容。简而言之，这一章就是Plone的用法。

Joining a Site（加入到一个网站）
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you join a Plone site, you create an account on the server. That account gives you the right as a member to add content such as images, documents, and so forth. To join a site, click the *join* link in the top-right corner of the Web site (see Figure 3-1).

在你加入一个站点的同时，你也服务器上创建了一个账号。这个账号给了你权力添加内容，例如图片，文档及其它。点击网站右上角的 *join* 链接即可以加入该站点（参见图片 3-1）。

 .. image:: img/3294f0301.png

Figure 3-1. Clicking the *join* link in the top-right corner of the page

图片 3-1。点击页面右上角的 *join* 链接

This will take you to a registration form that you'll have to complete (see Figure 3-2). Because this is the first Plone form you've encountered, take note of the following:

  - Some fields are required; a little red box next to the text indicates the required fields.

  - For most fields, some grayed-out help text beneath the field name indicates what you should enter.

然后你将会看到一个必填的注册表单（参见图片 3-2）。因为这是你在Plone中遇到的第一个表单，注意以下几点：

  - 有些域是必填的；这些域的文本后面有小红方块。

  - 在大多数域的域名下面都有灰色的文字告诉你该填什么。

 .. image:: img/3294f0302.png
    :width: 700

Figure 3-2. The registration page

图片 3-2。注册页面

 **NOTE**	Because many of the Plone pages are quite large, the figures in this book have been cropped to show only the key parts (in this case, the form) and not the Plone logo or the footer. These elements are still there, but they're superfluous.

**注意**        因为许多的Plone页面都很大，这本书的截图均已经过裁减并且只显示关键部分（在这个例子中就是表单）而没有Plone的logo和footer。这些东西都还在，只是没必要显示吧。

To complete the form, complete the fields that are reasonably obvious. The values of the fields are as follows:

很明显，你必须填完这些域以完成表单。这些域的值显示如下：

 **Full Name**: Enter your full name. This field is optional.

 **Full Name**: 输入你的全名。这是一个可选域。

 **User Name**: Enter the username you want to use. Most people choose an alphanumeric value without spaces, such as *bob* or *jane97*. This username will be used throughout the Web site to refer to you. This field is required.

 **User Name**: 输入一个你想使用的用户名。大多数人都会选择使用没有空格的字母-数字串，比如 *bob* 或者 *jane97* 。这个用户名将在整个站点中被系统使用以代表你。这是一个必填域。

 **E-mail**: A valid e-mail address is required. This will allow the site administrator to contact you and to send a password to you. You can change this e-mail address later by editing your member preferences. This field is required.

 **E-mail**: 一个有效的e-mail地址是必需的。这可以让站点管理员联系你并且把密码寄给你。你可以通过编辑成员设置(member preferences)修改这个地址。这是一个必填域。

 **Password and Confirm Password**: This is the password you want to use; it must be more than four characters and can contain letters, numbers, and the underscore (_) character. Passwords are case sensitive (in other words, *SomePassword<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=SomePassword" title="create this page">?</a>* isn't the same as *somepassword*). These fields are required.

 **Password and Confirm Password**: 这是你想使用的密码；至少由四个字符组成，可以是字母，数字以及下划线 (_) 。密码是大小写敏感的（也就是说 *SomePassword<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=SomePassword" title="create this page">?</a>* 和 *somepassword* 是不同的）。这两个域是必填的。

 **Send a mail with the password**: Check this box if you'd like your password sent to the e-mail address you provided. This field is optional.

 **Send a mail with the password**: 如果你希望站点把密码寄到你提供的e-mail的话就选择这一项。这是一个可选域。

Once you've completed this form, click Register to submit your information. If you've made any errors on this form, then you'll see a message at the top and the key fields that have an error highlighted. In Figure 3-3 I entered a password but didn't enter a value for the Confirm Password field. Again, this is the standard way that Plone forms will show errors to you.

完成表单之后，点击Register提交。如果你填错了任何信息的话，你将会看到页面顶部有错误信息并且有错的域也会被高亮显示。在图片 3-3 中我填了密码但没有填"Confirm Password"。同样，这也是Plone显示错误信息的标准方式。

 .. image:: img/3294f0303.png
    :width: 700

Figure 3-3. Errors on a form

图片 3-3。 表单错误

If you've completed the form correctly, then you'll be given the option of logging in immediately. Click the Log In button to log in. You'll see the page shown in Figure 3-4.

如果你已正确填完了表单，你会很快看到登录的选项。点击Log IN按钮即可登录。你将会看到如图 3-4所示页面。

 .. image:: img/3294f0304.png
    :width: 700

Figure 3-4. After registering

图片 3-4。 注册之后

If you already have a username and password or are returning to a site you've previously joined, then you can enter your name and password in the boxes in the left column of the site and click the Log In button.

如果你已经拥有一对用户名和密码或者是以前注册过，那你只需在站点左侧的登录框中输入用户名和密码然后点击 Log In 按钮即可。

打开Cookies
~~~~~~~~~~~~~~~~

To log into a Plone site, you must have cookies enabled. If you access a Plone site and try to log in with cookies disabled, you'll get a friendly message telling you that cookies must be enabled with a link to more information. To enable cookies, perform the following steps, depending on your browser.

想要登录Plone站点，你必须打开你的cookies。如果cookies选项是关着的，而你试图登录一个Plone站点，那么你会得到一个提示信息告诉你必须打开你的cookies以及一个链接。根据你所使用的浏览器，按照以下步骤做就可以打开cookies。
(LongWayToGo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=LongWayToGo" title="create this page">?</a>:下面这段就不译了，没什么意思:-)

Internet Explorer 6.x
	1.	Select Tools > Internet Options.
	2.	Click the Privacy tab at the top of the screen.
	3.	Move the slider to Medium, and click OK.

Internet Explorer 5.x
	1.	Select Tools > Internet Options.
	2.	Click the Security tab at the top of the screen.
	3.	Click Custom Level, and scroll down to the Cookies section.
	4.	Set Allow Per-Session Cookies to Enable, and click OK.

Internet Explorer 4.x
	1.	Select View > Internet Options.
	2.	Click the Security tab at the top of the screen.
	3.	Click Custom Level, and scroll down to the Cookies section.
	4.	Select Always Accept Cookies or Prompt Before Accepting Cookies, and click OK.

Mozilla 1.x
	1.	Select Edit > Preferences.
	2.	Find Privacy & Security in the menu on the left. If thereâ€™s a plus sign (+) to the left of Privacy & Security, click it.
	3.	Select Cookies under Advanced.
	4.	Select Enable Cookies for the Originating Web Site Only or Enable All Cookies, and click OK.

Opera
	1.	Press F12.
	2.	Click Enable Cookies.

Netscape Navigator 6.x
	1.	Select Edit > Preferences.
	2.	Find Privacy & Security in the menu on the left. If thereâ€™s a triangle pointing to the right next to Privacy & Security, click it.
	3.	Select Cookies under Privacy & Security.
	4.	Select Enable Cookies for the Originating Web Site Only or Enable All Cookies, and click OK.

If you forget your password at some point, you can get it sent to the e-mail address provided when you registered with the Plone site. To have your password mailed to you, click the *Forgot your password?* link located in the left column of the Web site. This will bring up the forgotten password form, as shown in Figure 3-5; enter your login name, and a password will be e-mailed to you.

如果忘了密码，你可以让站点讲密码寄到你注册时提供的e-mail地址。点击站点左侧栏中的 *Forgot your password?* 链接，然后你可以看到密码遗忘表单，如图 3-5所示；输入你的用户名，然后系统将会把密码寄给你。

 .. image:: img/3294f0305.png
    :width: 700

Figure 3-5. Getting a forgotten password

图片 3-5。 获得被遗忘的密码

Unfortunately, if you have no longer access to that e-mail account, or you can't even remember the username, you'll have to contact a site administrator. Using the techniques discussed in Chapter 9, the administrator can change your e-mail and find your user account. Once logged in to the Plone site, you'll see a *log out* link in the upper-right corner. When your work is finished, it's good practice to log out of Plone site, especially if you're accessing it from a computer that's likely to be used by other people.

如果你不幸地无法再使用注册的e-mail账号，或者你连用户名都忘了，你得联系站点管理员了。管理员可以用第九章介绍的技巧来修改你的e-mail以及找出你的用户名。登录之后，你可以在右上角看到一个 *log out* 链接。在你干完活之后，log out Plone站点是个好习惯，尤其是当别人也可以使用你用的这台电脑的时候。

Setting Up Your Folder and Preferences（配置Folder和个人设置）
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you've logged in, the member bar in the top-right corner will change to represent the options available to you as a member of the site (see Figure 3-6).

登录之后，右上角的member bar将会提供你作为网站成员所拥有的选项（参见图片 3-6）

 .. image:: img/3294f0306.png

Figure 3-6. Your personal choices in the top-right corner have changed.

图片 3-6. 右上角的个人选项改变了。

One of these options is that each member has a folder created for them when they join a site. This folder is set up with particular security so only that member (and administrators) can add and edit the content in that folder. To access your personal folder, click the *my folder* link in the personal bar in the upper-right corner of the site. In the upper-right corner you'll also see a *my preferences* link; clicking this will open a list of personalization options. You'll see two choices at the moment; you can change your password, or you can go to the personal preferences and change key preferences in your site.

其中一个功能是每个成员在他们加入站点的时候都同时创建了一个folder。这个folder由特定的安全设置，只有成员（以及管理员）才能在其中添加或修改内容。通过点击右上角的 *my folder* 链接即可访问个人文件夹。在右上角，你还可以看到一个 *my preferences* 的链接，它会打开个性化的选项。目前你可以看到两个选项；你可以修改你的密码，或者可以访问个人设置（personal preferences）以修改设置。

The change password form allows you to change your password. To complete the form, give your current password and the new password twice. After you've changed your password, the change will be immediate. You don't have to log in again; just remember your new password when you return.

密码修改表单可以让你修改密码，你需要输入目前的密码以及两遍新密码。修改会立即生效，你无需再次登录，只需下次登录时记住你的新密码。

The personal preferences form allows you to set a number of preferences that change how you see the site. These preferences are stored on the server so they're retained between uses of the site (see Figure 3-7).

个人设置表单可以让你让你修改很多设置以达到改变站点呈现方式的目的。这些设置保存在服务器端，这样可以在多次站点访问之间保持一致。（如图 3-7）

 .. image:: img/3294f0307.png
    :width: 700

Figure 3-7. Changing preferences

图片 3-7。 修改个人设置

The options are as follows:

选项如下：

 **Full name**: This is the full name you gave when you registered with the site.

 **Full name**: 这是你在注册时给出的全名。

 **E-mail**: This is the e-mail address associated with your membership and is used a number of places in a Plone site. Most important, if you lose or forget your password, this is the address to which the system will send it.

 **E-mail**: 这是与你关联的e-mail地址，在Plone site中被广泛使用。最重要的用途是如果你忘了密码，系统会把密码寄到这个地址。

 **Content editor**: When editing complex content, you may want the help of an editor. If your site administrator has made one available, you can select it here. It will then be used when you click the edit tab of an object. If you're unsure, leave this as the default.

 **Content editor**: 你可能需要编辑器来帮助你编辑复杂的内容。如果站点管理员已经提供了一个，你可以在这里选择它。当你点击某个对象的edit标签的时候系统会使用你选择的编辑器。如果你自己并不确定，使用默认设置就可以了。

 **Listed status**: This property specifies whether your profile will show up on the members tab and when someone searches the members listing.

 **Listed status**: 该属性指定了当他人搜索成员列表时你的信息是否会显示出来。

 **Editing of Short Names**: Objects have an ID or Short Name property that's used for the internal representation of the content object. This also shows up in the item's Web address and the item's Uniform Resource Locator (URL). By default these look something like *News_Item.2002-11-16.4102*, but you could make it much simpler, such as *november_news*, by changing the Short Name value.

 **Editing of Short Names**: 对象拥有ID或者Short Name属性以便于在内部代表其本身。同时他们也在Web地址以及该对象的URL中出现。在默认情况下，会看上去像这样： *News_Item.2002-11-16.4102* ,但你可以通过修改 Short Name 来让其变得简单一些，例如 *november_news* 。

 **NOTE** When you change an object's name value, anything that references the older name will no longer be valid and will result in the page not being found. It's best not to change the name value after you submit an object for review or link to it from elsewhere. For this reason, I recommend setting this option to No.

 **注意** 在你修改了对象的name属性之后，任何原先指向该对象name的链接都会失效并导致系统无法找到页面。所以最好不要在对象被被系统的其它部分引用后修改其name属性。因此，我建议改选项设为 No。

 **Portrait**: In larger organizations and in community Web sites, it's useful to see pictures of other members. The Portrait field allows you to upload a picture of yourself. The picture should be 75 by 100 pixels.

 **Portrait**: 在比较大的组织或社区站点中，可以看到其他成员的照片会很有用。肖像（Portrait）域允许你上传自己的照片。照片大小应为75*100相素。

Once you've made the desired changes, click the Save button to commit the changes. Now that you've logged in, it's time to start adding and editing content.

填完必需的修改之后，点击Save按钮以提交设置。现在你已经成功登录，是时候添加和修改内容了。

添加和编辑 页面文档(Document)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As mentioned, now that you're a site member, a folder has been created for you where you can store content. Of course, you can add content to any folder that the site administrator has given you the right to do so, but by default every user can add content to their member folder.

如前所述，现在你已是网站的成员了，并且拥有一个可以存放内容的文件夹。当然，你可以向任何管理员已授予你相应权力的文件夹添加内容，但默认情况下每个用户只能向自己的文件夹添加内容。

Each type of content you can add is distinct, and you can edit and view it in different ways. For this reason, Plone references each type of content differently; for example, you can add images, links, documents, and so on. Out of the box, Plone provides the following content types:

每种种类的“内容”都是截然不同的，你可以通过不同的方式来编辑和浏览它们。也因为这样，Plone区别对待每种“内容”，例如，你可以添加图片，链接，文档，等等。Plone自带了以下几种类型的“内容”：

  - **Document**: This is an item that presents some static information to the user. This is the most common type of content added and most closely represents a typical Web page.

  - **Document**: 这种类型向用户展现静态的信息，同时也是最常见以及最接近典型Web页面的内容。

  - **News item**: This is a document that's to be shown under the news tab (for example, a press release).

  - **News item**: 这是一种显示在news标签下的文档类型（比如说，新闻稿发布）。

  - **Link**: This is a link to another item, which may be internal or external to another Web site.

  - **Link**: 这是指向其它元素（item）的链接，可以时内部的也可以是指向其他站点的外部链接。

  - **Image**: This is an image, such as a *.gif* or *.jpeg* file.

  - **Image**: 图片类型，例如 *.gif* 或者 *.jpeg* 文件。

  - **Event**: This is an upcoming event, meeting, conference, or other event.

  - **Event**: 即将到来的活动，会议，研讨会或者其他类型的活动。

  - **Folder**: This is like a folder on a hard drive; this is a folder for putting content into so that it's easy to find later.

  - **Folder**: 就像硬盘上的文件夹一样，这是一种文件夹，用户可以将内容放入其中以便以后使用。

  - **Topic**: This is a grouping of other content. This is essentially a saved search criteria that you can reuse later. Only privileged site users can add topics.

  - **Topic**: 这是一组其它内容的集合。本质上是一个预先设好的搜索标准（条件），用户可以重用这个标准。只有有相关权限的用户可以添加topics。

  - **File**: This is another piece of content such as a movie, sound clip, text file, spreadsheet, compressed file, or anything else you'd like to upload.

  - **File**: 这是另一种类型的内容，例如电影，声音片断，文本文件，电子表格，压缩文件或者任何你想上传的文件。

I'll go through each of these items using the document as an example, showing in detail how to add and edit documents easily and quickly. Using these basic content types, I'll show you how to build a dynamic site through a browser, without doing any programming.

我将以document为例逐一介绍各种类型，详细的展示怎样迅捷的添加和编辑documents。我将介绍怎样通过这些基本类型在浏览器中搭建一个动态站点，整个过程完全不需要编程。

Actually, you have many ways of adding and editing content in a Plone site than just through a Web browser. Access via File Transfer Protocol (FTP), via Web-based Distributed Authoring and Versioning (WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=WebDAV" title="create this page">?</a>), or via scripts is all possible. I'll discuss how to set these up in Chapter 10 and just deal with the Web browser interface for now. In Chapters 11 to 13 of this book, I'll discuss how to make new custom content types that you can tailor to a particular site's needs.

事实上，除了通过浏览器外还有很多种方式都可以在Plone站点中添加和编辑内容，通过File Transfer Protocol (FTP)，通过Web-based Distributed Authoring and Versioning (WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=WebDAV" title="create this page">?</a>)，或者是通过脚本都是可以的。在第十章中我会讨论怎样使用这些，目前先让我们把浏览器搞定。在本书的第十一至第十三章中我将会讨论怎样根据站点的特殊需求来定制新类型的内容。

理解各种Document Content Types
........................................

Rather than detailing how to add and edit all the different types of content available, I'll cover adding one type of content, a document, in detail. After adding and editing a few of these documents, the approach to adding content should be second nature, and editing other content will be easy.

我将详细讲解添加一种类型的内容--document，而不是每种类型都深入讲解。在添加和修改了一些document之后，其它类型也应该驾轻就熟了。

A *document* is a page of content, usually a self-contained piece of text. Although all items added to Plone are accessible as Web pages, if there's one content type you could think of as a Web page, this is it. The default home page for a Plone site that you've seen already - the now-famous Welcome to Plone page - is one example of a document (see Figure 3-8).

*document* 包含一定内容的页面--通常是一些文本。如果有一种类型你觉得天生是Web页面的话，就是document了--尽管所有添加到Plone的东东都可以当成Web页面来访问。Plone站点的默认首页--著名的欢迎光临Plone页面--就是一个document的例子。

 .. image:: img/3294f0308.png
    :width: 700

Figure 3-8. Welcome to Plone, a simple document

图片 3-8。 欢迎光临Plone，一个简单的document。

Adding a Document（添加Document）
.................................................

You have two ways to add any piece of content using a Web browser. First, ensure you're logged in, because only logged-in users can add content. Second, select the *my folder* link from the top-right navigation bar. This will take you to your home folder, an area that you control. If you're able to add content to a folder, then the folder will show up with the green border around the top (see Figure 3-9).

通过浏览器有两种方式可以添加内容。首先，确定你已经登录了，只有登录的用户才能添加内容。然后，点击右上角的 *my folder* 链接，这会带你进入你自己的folder，一个你可以掌控的地方。如果你有权限往某个folder添加content的话，该folder的上方应该有绿色的边界（border）（如图 3-9）

 .. image:: img/3294f0309.png
    :width: 700

Figure 3-9. My content

图片 3-9。My content

If the green border doesn't appear, then you won't be able to add content; this border contains the actions you can perform in the current location. In Figure 3-9, you can see that the page shows the contents of the folder, because that's the highlighted tab. Other tabs appear such as view, sharing, and properties for more advanced options. In the top-right corner of the green border, you'll see an Add New Item drop-down menu and a State drop-down menu. Click the Add New Item menu to open a drop-down list of items to add (see Figure 3-10).

如果这个“绿色边界”没有出现，那你将无法添加任何内容；这个“边界”包含了你可以在当前位置执行的操作。在图 3-9中，你可以看到该页面列出了当前目录下的内容，这是因为用户选择了这个标签。其他的标签如View,Sharing,以及properties提供了更高级的选项。在“绿色边界”的右上方有一个Add New Item下拉菜单以及一个State下拉菜单。点击Add New Item下拉菜单即可添加新内容。

 .. image:: img/3294f0310.png

Figure 3-10. Adding a document from the green drop-down menu

图片 3-10。 从“绿色边界”的下拉菜单中添加document

To add a new document, select Document. Alternatively, if you look in the body of the page, you can see another Add New Item drop-down box. Again, click the down arrow to open a list of items that can be added and then select the item you'd like to add (see Figure 3-11).

要添加一个document，选择Document即可。同样的，在页面的body部分，你可以看到又一个Add New Item 下拉选框。同样，使用这个下拉选框也可以添加你想要添加的内容。

 .. image:: img/3294f0311.png

Figure 3-11. Adding a document from the main folder's content menu

图片 3-11。 从main folder的content菜单添加document

Using the Add New Item list from the green border is a handy menu since it's available most of the time.

“绿色边界”的下拉菜单更为方便，因为绝大多数时候它总是可用的。

 **NOTE	**If you're familiar with Zope, you should never, never, never add content from the Zope Management Interface (ZMI). Depending upon how you've installed Plone, you may have already seen the ZMI and used it for customizing and developing Plone through the Web. However, adding content through the ZMI will create content items that are incomplete and don't 
 ***Begin Sidebar***

**注意** 即使你很熟悉Zope，也要注意永远永远永远都不要用Zope Management Interface (ZMI)来添加内容。由于不同的安装方式，你可能看到了ZMI并通过web使用其来定制和开发Plone。然而，通过ZMI来添加内容会导致不完整的内容项并且don't
 ***Begin Sidebar*** (LongWayToGo<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=LongWayToGo" title="create this page">?</a>:嘛意思啊？)

Understanding Where to Add Content（往哪里添加内容）
...............................................................

The easiest place to add content at the beginning is in the user's member folder, accessible by clicking the *my folder* link. Although this is useful, it's probably not the best approach for a long-term solution. Most noticeably it creates long URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=URLs" title="create this page">?</a> (for example, */Members/andy/Docum....*). It also means your content isn't accurately reflected in the navigation tree.

刚开始最方便的可以添加内容的地方就是通过 *my folder* 链接来访问用户的文件夹了。然而从长远来看，这并不是最好的方案，尽管它还是有用的。尤其值得注意的是这样会导致很长的URL（比如，*/Members/andy/Docum....）。这同时还意味着你的内容无法准确的在浏览栏中体现出来。

As you'll see later, a few solutions exist for this; the most common solution is to make a folder and give certain users the right to access it. For example, that folder may be *Help* or *News*. The 'Using Folderâ€ section later in this chapter discusses adding folders, and Chapter 9 discusses using group workspaces and security.

正如你稍候所见，有一些其它的方案可用；最常用的就是创建一个文件夹并给指定的用户相应的权限去访问它。例如 *Help* 或者 *News* 文件夹。本章稍后的 'Using Folders（使用文件夹）'一节将会讨论如何创建文件夹，而第九章则讨论了group workspaces and security的使用。

Editing a Document（编辑文档）
...........................................

Once you've clicked to add a document, you'll be taken directly to the edit page with a message telling you that the document has been created. If this doesn't happen, you can click a document and then click the edit tab. Again, you'll see that the edit tab becomes highlighted in green (see Figure 3-12).

选择了添加文档之后，你会直接到达编辑页面并且有信息提示你文档已被创建了。如果这些没发生，你可以选择一个文档并且点击其edit标签。同样，你可以看到edit标签变为高亮显示了。（如图 3-12）

 .. image:: img/3294f0312.png
    :width: 700

Figure 3-12. Editing a document

图片 3-12。 编辑文档

Now you can edit the document in your Web browser, using the form provided. If you look at the URL in the address bar of your browser, you'll note that a short name for the object has been created for you, something such as *Document.2003-12-29.43787*. The following is a list of the fields and their meanings:

现在，通过表单，你可以在浏览器中编辑文档了。如果你注意一下浏览器地址栏中的URL，你会发现该对象（文档）已有了一个代号（short name），例如 *Document.2003-12-29.43787*。以下是对象的属性列表以及它们所代表的意义：

 **Short name**: The short name will become part of the document's URL, so keep the name short and descriptive, preferably without spaces. Keeping to these rules will make URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=URLs" title="create this page">?</a> easier to read. For example, use something such as *audit-report-2003*. If you don't provide a name, Plone will create one for you.

 **Short name**: 代号（short name）将会成为URL的一部分，所以尽量又短又具有一定描述性，最好没有空格。遵循这些规则会让URL更加易读。举例来说，使用像这样的short name: *audit-report-2003* 。Plone会自己创建short name，如果你没有提供的话。

 **NOTE** This field won't appear if you selected No for the short names in your preferences page.

 **注意** 如果你在个人设置中short name域种选择为No的话，该属性将不会在这里出现。

 **Title**: This is the title for the item, and it'll be shown throughout the site (for example, at the top of the page, in the search interface, in the title of the browser, and so on). This field is required.

 **Title**: 这是该对象的标题，会在整个站点的各处被用到（比如，页面顶部，搜索接口，浏览器的标题栏等等）。这是个必填项。

 **Description**: This is a short lead-in to the document, usually about 20 words to introduce the document and provide a teaser for the remainder of the document. This is useful for pages that show summaries of documents, such as search results and folder contents.

 **Description**: 这是文档的简介，通常只有20个左右的单词组成用以提供文档的简单信息。对那些主要显示文档概要信息的页面来说比较有用，例如搜索结果和文件夹内容。

 **Body text**: This contains the body of the document. The format for the content is set using the Format field (described next).

 **Body text**: 这是文档的主体，其格式由Format属性所确定。

 **Format**: You have three choices for the format of body content: Structured Text, HTML, and Plain Text. These types of text are discussed in the 'Choosing a Text Formatâ€ sidebar; if you're unsure, leave this field alone and type the body text as usual.

 **Format**: 主体内容有三种格式可选：结构化文本(Structured Text)，HTML，以及纯文本（Plain Text）。这些类行将会在'Choosing a Text Format'一节中讨论；如果你并不确定，别管这个选项，直接输入文本就行了。

 **Upload document**: If you do have your document as a file on your computer, you can upload it instead of typing the content into the Body Text field. Use the Upload button at the bottom of the page to select a file. The contents of an uploaded file will *replace* any content in the Body Text field.

 **Upload document**: 如果文档是在你自己的计算机上，你可以上传该文档而无需在Body Text域中敲入任何内容。用页面底部的Upload按钮选择一个文件就行了。上传文档的内容将会 *替换* 现有文档的内容。

Once you've finished editing your document, click the Save button to commit your changes. You'll be returned to the view tab where you can see how the document will be shown to users (see Figure 3-13); to edit it again, click the edit tab.

完成编辑之后，点击Save按钮以提交你所做的工作。你将会回到view标签，可以看到该文档将会怎样被显示给用户（如图 3-13）；点击edit标签即可再次编辑文档。

 .. image:: img/3294f0313.png
    :width: 700

Figure 3-13. Saving the content will take you to the view tab.

图片 3-13。 保存内容后将回到view标签。

If you don't provide the correct input on the edit form, when you save the document you'll be returned to the edit page, and your errors will be highlighted. At this point your changes haven't been appliedâ€”you must correct the mistakes and click Save again before the changes will be committed. The view tab shown in Figure 3-13 shows the document you've created. You'll see that the title, description, and content are all shown in slightly different styles. At the bottom of the page is a byline that contains information about the author of the document, including the date the page was created.

如果你在编辑表单中输入错误，在你试图保存文档时会回到标记页面，并且错误会被高亮显示。而你所做的修改也不会被保存，除非你改正了那些错误并再次点击Save按钮。你创建的文档的View标签如图 3-13所示。你可以看到标题，描述以及内容在风格上都会有些不同。在页面的底部的署名处有文档作者的信息，包括文档创建的时间。

You'll note that if you go back to folder contents after saving your changes, you'll see two documents in your folder: the existing one that's created for you and the new one you've just added. You can edit either of these documents by clicking them to open the view tab, which allows you to select the edit tab.

如果你回到文件夹内容页面，可以看到现在有两个文档了，一个系统自己创建的以及一个你刚刚创建的。点击它们可以打开view标签，这样你就能编辑它们了。

Choosing a Text Format（选择文本的格式）
.....................................

As mentioned previously, you can edit the document content in at least three formats: structured text, HTML, and plain text. This rather confusing state of affairs is brought about by trying to produce easy systems for users to write rich marked-up content in plain text without having to use fancy editors.

正像前面提到的，文档内容至少可以以三种格式来编辑：结构化文本（structured text），HTML，以及纯文本（plain text）。之所以出现这种混乱的情形是因为系统试图让用户可以以简单文本的方式来编写有格式的内容，而不需要其它的编辑器。

Unfortunately, in most cases, this really doesn't work; training is required to understand the formatting. Structured text requires quite a bit of understanding in itself because it has a frustrating syntax and doesn't internationalize well. If I had to pick one format that I'd recommend over all the others, I'd pick HTML because it's widely understood, and you can use What You See Is What You Get (WYSIWYG) editors such as Epoz to produce it.

不幸的是，多数情况下这并没有起到什么效果，用户需要培训才能理解这些格式。结构化文本尤其如此，因为它有令人沮丧的语法而且应用并不广泛。如果非得选一个的话，我推荐HTML，因为它应用比较广，并且你可以用所见即所得（WYSIWYG）的编辑器编辑它，例如Epoz。

***HTML***
HTML is the most standard format; if a document is entered as HTML, it will be rendered in the same format. This HTML shouldn't be a complete page but rather a snippet. For example:

***HTML***
HTML是最为标准的格式；如果一份文档以HTML输入的话，它将以同样的格式显示出来。HTML应该只是一个片断而不是完整的页面。例如：

::

 <p>Here is a sample in <i>HTML</i> for a demonstration.</p>

Ideally the HTML should also be valid Extensible HTML (XHTML) to comply with the rest of the Plone system; if it's not, your pages don't comply with Web standards. Entering text as XHTML isn't for the faint of heart, so in Chapter 9, you'll see how into integrate rich-editing tools into Plone that allow users to easily write content in XHTML. The following screen shot shows Plone using Epoz so users don't have to understand HTML:

理想状态下，HTML内容同时也应该是有效的Extensible HTML (XHTML)以便和Plone的其它部分保持一致，而如果不这样的话，你的页面就与Web标准不一致了。确保输入XHTML并不只是为了faint of heart，在第九章中，你会看到如何将一些编辑工具整合到Plone中以方便用户以XHTML来编辑内容。下面的屏幕显示了在Plone中使用Epoz，这样用户就无需懂得HTML了：

 ***production: please note that I've named sidebar graphics with an 'sâ€***

 .. image:: img/3294s0301.png
    :width: 700

***Plain Text***
Plain text is simple. It does no major conversion or manipulation of the text entered; it's just plain text. The only modification made is that new lines are converted into HTML when rendered so that new lines appear in the Web browser. No other altering happens. For example:

纯文本简单些。它基本不做文本的转换或操作，只是“纯”文本罢了。唯一的改动是换行符会转换为HTML以保证在浏览器中也能换行，没别的改动了。例如：

::

 Here is a sample in plain text for a demonstration

***Structured Text***
Structured text is a system for writing plain-text documents in a particular format, which can then be interpreted in different ways. For example, if a piece of text needs to be highlighted, then it can written as **italics**; this will then be shown as *italics*. This series of rules means that a user can write a page that contains formatting information easily. For a full list of structured text rules and examples, please see Appendix A. The following is a sample of structured text:

结构化文本让用户以特殊的格式写存文本文档，然后再以不同的方式来解释其。比如说，一段文本需要高亮显示，可以把它写成 **italics** ,这会被显示成 *italics* 。这些规则意味着用户可以很容易的写出包含格式信息的文本。附录A提供了所有的结构化文本规则。下面是结构化文本的一个例子：

::

 Here is a sample in *structured text* for a demonstration

Setting Document Metadata（设置文档的元数据）
.............................................................

Any piece of content can have any number of properties assigned to it. These properties are known as *metadata* and provide information such as keywords, copyrights, and contributors of an item.

任何的内容对象都会有一些属性。这些属性就叫做 *元数据（metadata）* ，提供诸如关键字，版权以及投稿人等信息。

This entire set of properties is optional and is usually used only if there are special requirements for this piece of content, especially since this information isn't normally shown to the person viewing the content. So the main reason for entering this data is to add information for tasks such as searching or categorizing the content.

由于这些元数据通常不会在用户浏览文档时显示，他们往往都是被用在文档的某些特殊需求上。所以输入这些数据的主要原因是为像搜索或者分类这样的任务添加些信息。

You can access properties on an object by selecting the green properties tab. This properties form has the following fields, which are common to all content types:

你可以通过绿色的properties标签来访问这些属性（元数据）。这个属性表单有如下一些被其他内容类型公用的域：

 **Allow Discussion**: This lets this document be discussed by users who have the right to do so. If the value is left as default, it'll use the sitewide policy for that content type.

 **Allow Discussion**: 允许文档被拥有相应权限的用户讨论。默认设置下，会使用整个站点对该类型的一般规则。

 **Keywords**: Each item can have keywords assigned to it to enable grouping and sorting of the items. For example, an article about recent events in politics may have the keywords *politics* and *prime minister*. Keywords are flexible, and you can use any keyword from the given list. By default there are no keywords in the Plone system; site administrators may add new keywords so that other users can select them.

 **Keywords**: 每个对象都可以有相应的关键词以便于分类和排序。比如说，一片关于近期政治事件的文章可能会有关键词 *政治* 和 *首相* 。默认情况下，Plone不会自带任何关键词，站点管理员可以添加关键词以备他人使用。

 **Effective Date**: The effective date is the first day a piece of content should be available. You can specify this date by entering the values in the form or clicking the little calendar icon, which opens a calendar, and picking a date (see Figure 3-14).

 **Effective Date**: 生效日期是指一个内容对象可以被访问的第一天。你可以通过在表单中输入日期或者通过点击日历图标然后在弹出的日历中选择日期来指定一个生效日期。

 .. image:: img/3294f0314.png

Figure 3-14. Entering an effective date

图片。 输入生效日期

 **Expiration Date**: The expiration date is the last day a piece of content should be available. Usually the Effective Date and Expiration Date fields are left blank.

 **Expiration Date**: 失效日期是指内容对象可以被访问的最后一天。通常生效日期和失效日期是被置为空。

 **Format**: This is the Multipurpose Internet Mail Extensions (MIME) type of the item. The term *MIME type* refers to a computer definition of the type of content (for example, *application/msword* or *image/jpeg*). This is set at a default value; if you're unsure about this field, just ignore it.

 **Format**: 这是对象的MIME（Multipurpose Internet Mail Extensions）类型。*MIME类型* 是指内容类型的计算机定义（例如， *application/msword* 或者 *image/jpeg*）。这个属性会有一个默认值，如果你并不确定，别管它就是了。

 **Language**: This is the language in which the document is written; the default is English.

 **Language**: 这是指该文档以何种语言写成，默认是英语。

 **Copyright**: This is the copyright information for the content, which is usually blank.

 **Copyright**: 这是内容的版权信息，通常都为空。

 **Contributors**: This includes the names of the people outside the Plone system who contributed to the object. Each person's name should be on its own line.

 **Contributors**: 这包含了除了Plone系统外所有为该对象做出过贡献的人。每个人的名字都该单独占据一行。

After completing the values for this form, click Save to commit the changes. As stated, usually you won't need to edit the values on this tab. Editing the contents of this tab is usually based upon the requirements for your site and the type of site you're building.

填完表单后，点击Save已提交所有改变。前面已说过，通常你并不需要改变这个标签下的值。是否需要编辑该标签下的内容取决于你的站点的需求以及你创建的站点的类型。


What Are Effective and Expiration Dates?（什么是生效和失效日期？）
...............................................................................

Any item in the Plone system can have effective and expiration dates if the person editing the content wants. Both of these are optional, and leaving the fields blank will ensure that these values aren't set.

只要编辑者愿意，Plone中的任何对象都可以有生效和失效日期。这两项都是可选的，如果置空的话将不会设置任何值。

One example of an item that may have an effective date is a press release. In the ideal world, the news item is crafted, prepared, and reviewed in Plone. However, suppose the news item has to go live on the Web site at midnight, but that's exactly when you plan to be sleeping. Not a problemâ€”give the press release an effective date and a time of midnight. Up until the effective date, it won't be visible in the calendar, in navigation, in searches, or in pages that use a search as the listing under the news tab. However, anybody who knows about the press release will be able to access the page directly. Once the effective date has passed, the item will appear in all the aforementioned places and be live to the world.

一个可能会有生效日期的例子是新闻稿发布。理想状态下，新闻稿应该是仔细推敲并要通过审核的。不过假设有个新闻稿应该是在半夜被放到网站上的，而你却想好好睡一觉。这是就可以给这个新闻稿一个半夜的生效期。在生效期之前，它不会出现在日历，浏览栏，搜索栏或者新闻标签下任何使用搜索来列出结果的任何页面。不过，任何知道该新闻的人都可以直接访问该页面。而一旦过了生效期，该新闻会出现在前面所说的所有地方。

The effect is similar with expiration dates. If you have a special offer that stops being effective on a particular day, then you could set an expiration date of that day. After that date, it wouldn't appear in calendar, navigation, searches, and so on.

失效期作用与之有些类似。如果你有个只在某一天之前有效的邀请，那你就可以把那一天设为失效期。在那之后，这个邀请不会再出现在日历，浏览栏或者搜索结果以及其他的栏目中。

The effective and expiration dates don't actually change the state of the item in workflow (see Chapter 7 for more information on workflow); rather, they just change where it displays. You can also set effective and expiration dates on the state tab, which you'll learn about in the next section.

生效期失效期并不会真的改变对象在工作流中的状态（第七章有更详尽的关于工作流的介绍）；他们只是改变了对象显示的地方。你会在下一节中看到同样可以在state标签中设置生效期和失效期。

Publishing Your Document（发布文档）
..............................................

When a document is created, it's given an initial state, called *visible*. By default, content isn't automatically published and available to the world; instead, others can view your content, but it doesn't show up in searches or the navigation tree. This is a useful state because you can point other users to this content, but because it won't show up in navigation or searches, it's not visible unless users know about it.

文档创建之后会有一个初始状态，叫做 *visible* 。默认情况下，文档是不会自动发布的；相反，其他人可以看你的内容，但它并不会出现在搜索结果或浏览路径中。你可以告诉其他人这个文档，但因为它不会在搜索结果或浏览路径中出现，那些不知道该文档的用户将不会看到它。

At any point in time, each item of content in your Plone site is in a particular state. This state describes its permissions and roles within the Plone site. By having items in different states, it's possible to apply different security to each item of content. For example, sometimes an item may take a week or two to prepare and involve multiple revisions. Eventually you'll want to publish the content so that it's visible for all users and shows up in the navigation and search.

在任何时候，Plone中的任何内容对象都在某种状态下。状态描述了Plone站点中的权限和角色。通过使用不同的状态，每个内容对象都可以有不同的安全设置。例如，有些时候一个对象往往要一到两周的准备以及多次修订。最后，才会向所有用户发布该内容，使之出现在搜索和浏览中。

You can publish the content using the State drop-down menu located at the top right of the main navigation (see Figure 3-15).

你可以通过主浏览栏右上方的State下拉菜单来发布内容（如图 3-15）

 .. image:: img/3294f0315.png

Figure 3-15. State drop-down menu

图片 3-15。 State下拉菜单

To publish an object, select Submit from the drop-down menu. By default you can't directly publish content, but you can submit it for review. When an item is submitted for review, it moves into the review state. This is an intermediary state between visible and published. It allows for the review of content by users of your site with the reviewer role, before it goes live for the entire world to see. After you've submitted the content, you'll notice that the content is now in the review state by looking at the box in the top-right corner. You'll also notice that in Figure 3-16, there's no longer an edit tab.

首先选择下拉菜单中的Submit以便发布对象。默认设置下你不能直接发布内容，只能将内容递交审核。当某个对象被递交审核的时候，它同时也被已到了review状态下，这是visible和published之间的中间状态。它允许拥有reviewer角色的用户可以在被正式发布之前审核该文档。在你递交了对象之后，你可以在右上角看到该对象处于review状态。另外，如图 3-16所示，edit标签没有了。

 .. image:: img/3294f0316.png
    :width: 700

Figure 3-16. The content has been submitted for review, the state has changed to pending, and the edit tab is no longer an option.

图片 3-16。 该对象已被递交审核，状态为pending，而edit标签也不见了。

**NOTE** If you're logged in as a manager, then you'll note there will be one extra option in the drop-down publishing list called Publish. This lets you put content straight into the published state with no intermediate step.

***注意* 如果你是以管理员身份登录的话，会发现在下拉菜单中还有一个Publish的选项，该选项可以让你直接发布内容而无需任何中间步骤。

In the workflow drop-down list in the top-right corner, there's also an option for Advanced, which opens the state form for changing the status of an object. This form is the same as clicking the state tab. It has the following fields:

在右上角的workflow的下拉列表中还有个Advanced选项，通过它可以打开状态表单以改变对象的状态。点击state标签也可以进入该表单。该表单有如下属性：

 **Effective Date**: This is the same as the Effective Date field in the properties (see the 'Setting Document Metadata' section).

 **Effective Date**: 同元数据中的生效日期。（见'Setting Document Metadata（设置文档的元数据）'一节）。

 **Expiration Date**: This is the same as the Expiration Date field in the properties (see the 'Setting Document Metadata' section).

 **Expiration Date**: 同元数据中的失效日期。（见'Setting Document Metadata（设置文档的元数据）'一节）。


 **Comments**: This includes any comments you want to make for this change in state that will be recorded in history. For example, you could enter **First draft; Bob, please see second paragraph**.

 **Comments**: 可以是任何对于这次状态变化的评注，该评注将会被系统纪录。比如说，你可能会输入 **第一稿；Bob，请检查下第二段**。

 **Change State**: These mirror the choices available in the drop-down menu. For example, the options are Publish, Submit, and so on. One further option, No Change, is available if no change is necessary.

 **Change State**: 通过下拉菜单的方式显示可能的选项。例如Publish，Submit等等。还有个选项，No Change，在没必要改变状态时会出现。

Select the change of state you'd like to occur, and click Save to commit the changes.

选择一种你期望的状态变化，然后点击Save以保存变化。

What Are the Workflow States?（有哪些工作流状态？）
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

At this point you may be asking yourself what this *workflow* thing is and what the states mean. Workflow, as discussed in Chapter 7, is the ability to apply different states to the content. The following are the default states:

现在，你可能会问自己这个 *工作流* 到底是什么东西以及状态到底意味着什么？工作流，正如第七章所讨论的，就是给内容加上不同的状态。下面是一些默认的状态：

 **Visible**: Content is created in the visible state. All users can find visible content through the search function and can access it directly by visiting the object URL. Visible content doesn't show up in the navigation tree. Visible content is editable by their owners and site managers.

 **Visible**: 内容对象创建后的默认状态。所有用户均可通过搜索来找到该状态的内容并可直接通过URL来访问（LongWayToGo:好像和前文矛盾啊）。Visible对象不会出现在浏览路径中。对象拥有者和站点管理员均可以修改该对象。

 **Pending**: Pending content includes items that have been submitted for publishing by site members. From a user standpoint, pending content behaves like content in the visible state. The difference between the two types is that pending items are flagged for review; site reviewers are prompted to publish or reject pending items. Pending items are editable only by managers and reviewers.

 **Pending**: Pending内容包含了那些已提交审核，并且准备发布的对象。从用户的角度看，pending内容和visible没什么区别。这两者直接的区别在于pending的对象被标志为等待审核，站点的审核员负责发布或拒绝该对象。只有管理员和审核员可以修改pending对象。

 **Published**: Published items are visible to all site visitors. They appear in search results and the navigation tree. They may also appear in other areas specific to that type (news items, for example, also appear when you click the news tab). Published items are editable only by managers, but owners can retract them for editing (retracting reverts an item to the public draft state).

 **Published**: Published对象对所有站点访问者都是可见的。他们会出现在搜索结果和浏览路径中。他们还会在自身类型的区域中出现（新闻对象，举例来说，就会出现在news标签中）。只有站点管理员可以编辑published对象，但对象所有者可以收回对象来编辑（收回对象导致对象回到public draft状态）。

 **Private**: Items in the private state are visible and editable only by their owners and others with manager access to the folder in which they exist. They won't appear in search results or on the navigation tree for other users. Private items are editable by managers.

 **Private**: 只有对象拥有者和具有管理员权限的用户可以访问和编辑private状态的对象。他们不会在其他用户的搜索结果和浏览路径中出现。站点管理员可以编辑private对象。

How Does Content Get Reviewed?（怎样审核内容）
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

If you're a reviewer, then in the right column of the home page you'll see a new review list when you first log in. This is a list of the items that have been submitted for review and need reviewing by you or another reviewer (see Figure 3-17).

如果你是个审核员，那么你首次登录后会在主页的右侧看到一栏审核列表（review list），列出了已被提交给你或其他审核员审核的内容。

 .. image:: img/3294f0317.png

Figure 3-17. The review list

图片 3-17。 审核列表

The review list will appear on the right when you log in as a user with the review role and there are items to review. In my case, I logged in as admin, which was the user created during my install process. You can tell you're logged in because your name will appear in the member bar. The review list gives a list of items to review - in this case, you need to review the test document. Click the document to open the item. At this point you essentially have the following choices for this item:

当你以具有审核员角色的用户登录后，包含有待审核内容的审核列表就在页面右侧出现了。就我而言，我是以在安装时创建的管理员登录的。你可以根据你的名字是否出现在成员栏来判断是否已登录。审核列表会列出待审核的内容，在这个例子中你将审核测试文档。点击文档以打开它，你可以有以下几种选择：

 **Reject it**: Reject it by selecting Reject from the drop-down choices. This will move the content back into the visible state and assumes that as a reviewer you're unhappy with it. Usually you may want to click the Advanced option to open the comments form and add some comments stating why you're rejecting it.

 **Reject it**: 通过选择下拉菜单中的Reject拒绝发布，这会使该内容回到Visible状态，同时表明你对该内容并不满意。通常，你会点击Advanced选项打开评注表单，以添加为什么拒绝发布的理由。

 **Approve it**: Approve it by selecting Publish; this will change the content into the published state. This will make the content publicly available.

 **Approve it**: 选择Publish意味着审核通过，会把内容的状态改为published状态。也就是把该内容对公众开放。

 **Do nothing**: Leave it by doing nothing. This leaves the content in limbo but sometimes happens when you need to check information or talk to others. Eventually you should return to do something with this content because it'll continue to show up in your list of items until you make one of the previous actions.

 **Do nothing**: 什么也不做，这让该内容停留在过渡状态，通常发生在你需要查一些信息或域他人讨论的时候。最终，你仍然得做一些上面的操作，否则该对象将会一直出现在你的审核栏中。

 **Edit it**: Edit it, and then perform one of the previous actions. As the reviewer, you can make any change you'd like to do, so feel free to change the content by using the edit tab.

 **Edit it**: 先编辑，然后再做上面的操作。作为审核员，你可以做任何你想要做的操作，只需使用edit标签就可以了。

Once you've moved content *out* of the review state by publishing or retracting it, it will no longer show up in the review list. Of course, this assumes you do have someone as a reviewer for your site; this usually (although not necessarily) is also the user who created the Plone site as an administrator. In Chapter 8, I'll discuss how to add and edit users and give some users the review role.

一旦你将某对象 *移出* review状态，不管是发布或驳回，该对象就不会再在审核列表中出现了。当然，我们假定你的站点的确有审核员，通常（但不必须）是创建该Plone站点的管理员。在第八章中，我将讨论怎样添加和编辑用户以及赋予他们角色。

How Do You Edit a Published Document?（怎样编辑以发布的文档？）
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Once a document has been published, it must be *retracted* to be edited. To do this, select Retract from the workflow drop-down menu, which will move the item back into the visible state. Once it has returned to the visible state, you can reedit it and placed it back into the review queue.

文档一旦发布后，必须 *收回* 才能进行编辑。选择workflow下拉菜单中的Retract以收回文档，这会将文档置回visible状态。一旦回到visible状态，你就可以重新编辑并再次递交审核。

This step, although a little annoying, is necessary to ensure that all content goes through a review step. For example, you have to ensure that any edits made to a page are appropriate by reviewing the content. Users with the manager role can edit the content at any time, so they can quickly go in and fix a typo without having to go through the review step. It's assumed that users with a manager role are trustworthy! If you're a manager, as defined in Chapter 9, you can go to any piece of content and will see the edit tab. At that point, click Edit to alter the document and make your changes.

这一步虽然有点烦人，然而对于确保所有内容都要经过审核是必要的。就是说，你必须确保对于任何一个页面所做的编辑得要有适当的审核。具有管理员角色的用户可以在任何时候编辑内容，这样，他们可以迅速的修复一个排版错误而无需任何审核步骤--然而这是在我们足够信任管理员的情况下！如果你是管理员，正如第九章所说的，你可以在任何内容中看到edit标签，直接编辑和修改内容就可以了。

Sharing Your Document（共享文档）
............................................

This allows you to assign more rights to other users or groups of users of the system to your document. This is an advanced feature and is covered in more detail in Chapter 9.

共享文档可以给系统的其他用户或用户组更多的关于你的文档的权限。这是一个比较高级的特性，我们会在第九章中详细讨论。

Adding and Editing Other Types of Content（添加和编辑其他类型的内容）
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

I've just covered how to add and edit documents in detail. All the other content types are similar. They all have the same or similar actions to edit; it's just the forms and the data in them that change. In the following sections, I'll cover some of these other types of content. All the following types of content use the same workflow process, so they need to be published in the same manner as documents.

我已经详细介绍了入和添加和编辑文档，其他内容对象也大致如此。他们都有相同或相似的操作，只是表单和表单中的数据变了而已。在下面的几节中，我将介绍几种其他的内容类型。所有这些内容类型都有相同的工作流过程，也就是说，他们的发布和文档是一样的。

Adding and Editing Images（添加和编辑图片）
..........................................................

Images are graphical pieces of content; you add them by selecting Image from the drop-down list. When you add an image, the name of the content changes to the file of the image. So, if you upload an image called *photo.gif*, it'll be accessible in Plone as *photo.gif*. When adding or uploading a new image, you can select the image from your hard drive by clicking the Browse button and selecting the file (see Figure 3-18).

图片是图形化的内容，通过在下拉菜单中选择Image来添加图片。当你添加内容时，图片文件的名字会作为该对象的名字。因此，如果你上传了一个叫 *photo.gif* 的图片，那么在Plone中就可以用 *photo.gif* 来访问它。当你想添加或上传新图片的时候，可以通过Browse按钮来在你的硬盘上选择图片。如图3-18。

 .. image:: img/3294f0318.png
    :width: 700

Figure 3-18. Uploading an image

图片 3-18。 上传图片

It's common for image filenames to end with an extension such as *.gif*, *.jpg*, *.jpeg*, *.png*, or *.pict*. You can display images inside Plone on a Web page without having to download them to the local computer if the type of the image uploaded is viewable in the user's Web browser. The most common image types are *.gif*, *.jpg*, and *.png*, which are visible on almost computer system. Figure 3-19 shows an image of the Plone logo.

通常图片文件都有诸如 *.gif*, *.jpg*, *.jpeg*, *.png*, 或者 *.pict* 。如果你上穿的图片在用户的Web浏览器中是可见的话，那么用户可以直接看到图片而无需下载。最常见的图片类型是 *.gif*, *.jpg*, 和 *.png*, 他们几乎在所有的计算机上都是可见的。图片 3-19是Plone的logog图片

 .. image:: img/3294f0319.png
    :width: 700

Figure 3-19. Viewing the image

图片 3-19。浏览图片

You can't edit images directly; instead, you can edit the image on your hard drive using any program, such as Adobe Photoshop or GNU Image Manipulation Program (GIMP). Once complete, clicking the edit tab allows you upload your new image into Plone. If you do a lot of image manipulation, you can refer to Chapter 10, which covers External Editor, a tool that lets you edit images using a program without having to upload and download them.

你无法直接编辑图片对象，只能在本机上用其他的程序来编辑，例如Adobe Photoshop 或者 GNU Image Manipulation Program (GIMP)。完成编辑之后，可以通过edit标签向Plone上传你的新图片。如果你需要做大量的图片操作，你可利用第十章介绍的External Editor来编辑，而无需上传或下载图片。

Adding and Editing Files（添加和编辑文件）
.......................................................

A file is any arbitrary file that can be uploaded from your hard drive. To add a file, select *File* from the drop-down list. On the edit tab, you'll see an Upload button that lets you pick the file from your hard drive. This could be any sort of item, including a plain-text file, a Microsoft Word document, a Microsoft Excel spreadsheet, an executable program, an Adobe Acrobat document, and so on. When you add a file, the name of the item in Plone changes to the name of the file uploaded. So, if you upload a file called *book.pdf*, it'll be accessible in Plone as *book.pdf*. Figure 3-20 shows a plain-text file.

“文件”是指任何能从你本机上传到Plone站点的文件。选择下拉菜单中的 *File* 以添加文件。在edit标签中，你可以看到能够从硬盘上上传文件的Upload按钮。你可以上传任何文件，包括纯文本文件，Microsoftt Word文档，Microsoft Excel表格，可执行文件，Adobe Acrobat文档，等等。Plone对象会以上传文件的名字来命名。因此，如果你上传了一个文件 *book.pdf*，那么在Plone中该对象将以 *book.pdf* 的名字被访问。图片示范了上传一个纯文本文件。

 .. image:: img/3294f0320.png
    :width: 700

Figure 3-20. Adding a plain-text file

图片。添加纯文本文件

If the file is recognized as being text, then the contents of the file are shown in the Web page and are editable through the edit tab. Otherwise, the file is downloadable, and users must download it to their local hard drive and edit it there. Afterward they can upload it to the system. You'll note that a file object also has an extra download tab that lets you directly download the file.

如果使纯文本文件，文件的内容会直接在Web页面中显示出来，并可通过edit标签来编辑。其他情况下，用户可以下载文件到本地然后再编辑，随后再上传上去。你可以看到每个文件对象都会有个download标签来让你下载文件。

Adding and Editing Events（添加和编辑活动）
..............................................................

An event can be something that will happen in the future or something that happened in past. You can add events to Plone, and they show up on the calendar. To add an event, select Event from the drop-down list. An event has more information than most Plone objects; however, most of it is self-explanatory (see Figure 3-21).

活动可以是将来会发生的事情，也可以是已发生了的事情。添加活动到Plone后，他们会在日历中出现。选择下拉菜单中的Event来添加活动。尽管活动的属性比大多Plone对象都多，但他们通常都很容易理解。

 .. image:: img/3294f0321.png
    :width: 700

Figure 3-21. Adding an event

图片 3-21。 添加活动

As usual, the only required field is Title; however, if you want the event to show up in the calendar, then you must provide a start and end time. Events can span multiple days or be in the pastâ€”as long as the start date is before the end date. To enter a date, select the appropriate dates from the drop-down menu, or click the little date icon to open a graphical date picker.

想起它对象一样，只有Title是必填的。然而如果你希望活动出现在日历中的话，必须指定起始截止日期。活动将在两者之间有效。你可以从下拉菜单中选择日期或者通过日期图标来打开一个日期选择器。

Once the event is published, it'll show up in the calendar. Moving a mouse over the item in the calendar will show the start and end dates for the event, as well as the event's title (see Figure 3-22).

活动发布后，就会出现在日历中。如果将鼠标移上去的话可以看到活动的起始截止日期以及活动的标题。（如图 3-22）

 .. image:: img/3294f0322.png
    :width: 700

Figure 3-22. Viewing events in the calendar

图片 3-22。 日历中的活动

Adding and Editing Links（添加和编辑链接）
.......................................

Link content types are the primary way for users to share links. These URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=URLs" title="create this page">?</a> can be resources on the Internet or an intranet, an internal resource, or anything to which the users have access. To add a link, select Link from the drop-down menu.

链接内容是用户共享链接的最主要方式。这些URL可以是Internet/Intranet资源，可以是内部资源，也可以是任何用户可以访问的东西。选择下拉菜单中的Link以添加链接。

If you're going to link to an Internet resource, you should preface your link with the suitable protocol (for example, *<a href="http://">http://</a>*). For instance, if I was visiting an interesting page on the BBC's Web site and wanted to share this, I could add a link. The value of the URL will be the text in the address bar (for example, *<a href="http://news.bbc.co.uk">http://news.bbc.co.uk</a>*), as shown in Figure 3-23.

如果你链到Internet资源上，必须在链接前面加上合适的协议（例如， *<a href="http://">http://</a>* ）。举例来说，我在BBC的网站上看到一个很有意思的页面并且想共享该页面，这是就可以加个链接。该URL的值就是地址栏的值（例如， *<a href="http://news.bbc.co.uk">http://news.bbc.co.uk</a>* ），如图 3-23所示。

 .. image:: img/3294f0323.png
    :width: 700

Figure 3-23. Adding a link

图片 3-23。 添加链接

Adding and Editing News Items（添加和编辑新闻）
............................................

News items are commonly used in Web sites to display news that's of interest to the reader. Actually, a news item contains the same information as a document. The only real difference is that a news item will show up when a visitor clicks the news tab (once the item is published), as shown in Figure 3-24.

新闻是网站常用的向读者展示信息的方式。新闻和文档承载相同的信息，区别在于新闻会出现在news标签下（在发布之后），如图 3-24所示。

 .. image:: img/3294f0324.png
    :width: 700

Figure 3-24. A list of news items

图片 3-24。 新闻列表

If I wanted to write a Web page that was going to be relevant for a long period of time, such as directions to my company's office, I'd use a document. If I wanted a page that detailed my exciting new product and drew attention to it, I'd use a news item. That news item would be visible under the news tab, and as new things happened, it'd slowly move down the page.

如果我希望页面保留行对比较长的时间，我会用文档。如果我的页面使用来介绍我的新产品，期望得到较多的关注，我会用新闻。新闻会在news标签下出现，随着其他事情的发生，它会慢慢往下移。

Organizing Content
~~~~~~~~~~~~~~~~~~

So far you've seen how to add and edit content in a Plone site, but without clear organization, this can become a mess quite quickly. You have two main ways of organizing content: folders and topics. A *folder* is the simplest and most powerful mechanism for organizing content and works just like a folder or a directory on a computer's hard drive. A folder can contain any item of content; content can be copied and pasted between folders, and of course folders can contain other folders.

To organize content that's spread all over a site, a more sophisticated and less-used tool called a *topic* is available. A topic searches your Plone site and finds all objects that match a certain criteria, allowing you to group lots of disparate content.

Using Folders
.............

A folder is just like a folder or a directory on a hard drive, except that the folder and its contents exist inside Plone. You use a folder the same way; when you need to categorize content or make things a little clearer, you can group items and place them in a folder. To add a folder to your site, select Folder from the drop-down list. This will add a folder and take you to the edit properties page for that form. A folder has just three rather simple attributes that a user can edit: Name, Title, and Description. I've discussed all these attributes for documents, and nothing is different for folders.

Folders have two green tabs that represent slightly different views: contents and view. Actually, you may have already noticed that there's a contents tab accessible from any piece of content that you've added to the site; for example, when you were editing a document, the contents tab was there. That contents tab will always take you to the contents for that folder.

Viewing the Contents of a Folder
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The folder has the concept of a default page, which is a page that will be shown to the user when they view a folder. It's a concept taken from Web sites where viewing a folder on a Web site shows a default page if one is present; often that default page's name is *index.htm* or *index.html*. If a folder has a default page, then clicking the view tab will show that default page. If the folder doesn't have a default page, then it'll show a folder listing of all the content in that folder. When looking for a default page to display, Plone looks through the folder for content with a certain name and shows this item. The page name is usually *index.html* or *index_html*; however, the site administrator can add or alter these names.

This contents view of a folder allows a user to perform a variety of tasks, such as move content, rename it, delete it, publish it, and change the order it's listed. As shown in Figure 3-25, you'll also see a simple table of the folder contents. Each row of the table shows the title of the content (plus an icon), the type, its size, when it was last modified, its current workflow status, and order selectors. On the left is a checkbox to select the items you want to change and a series of options across the bottom: Rename, Cut, Copy, Delete, and Change Status. These functions are all pretty self-explanatory, and you can apply them to multiple objects at once by clicking several checkboxes.

 .. image:: img/3294f0325.png
    :width: 700

Figure 3-25. Contents of a folder after I've added some of the content types described in this chapter

For example, to quickly rename a piece of content, click that item's checkbox and then click Rename. This will open the rename form and allow you to rename the title of each item in that list. Click Save to have the changes take effect. The Cut and Copy buttons allow you to copy or move content between different folders. The Delete button allows you to delete the item from Plone. Just like on your hard drive, if you copy, move, or delete a folder, all the contents of the folder will also be moved, copied, or deleted.

A new feature in Plone 2 is the ability to change the default order of items in a folder. By default, items in a folder will display in the order the items were added. If one item is more important and needs to be moved to the top, use the arrows on the right side of the table to move the item. The following features will appear in the folder contents only when certain things happen:

  - If the content has an expiration date set and it has expired, you'll see the word *expired* appear in red next to the item.

  - If the server has External Editor installed, you can click the pencil to edit in External Editor (this is covered in Chapter 10).

  - If the content is locked, you'll see a lock icon appear next to the content.

Publishing a Folder
,,,,,,,,,,,,,,,,,,,

Folders have a much simpler workflow than documents. Earlier in this chapter you saw how to publish content to make it publicly visible because this allows users to create and edit content as much as possible before pushing it live. However, folders are a little different because they contain content but don't have any content of their own. For this reason, folders have no review state. Anyone can directly publish or make private folders, so there are three states: private, visible, and published.

After adding a folder, select Publish from the drop-down list. Then it'll show up in the navigation. As per the earlier rules for workflow, if you don't publish a folder, it won't show up in the navigation.

Using Topics
............

A topic allows you to collect content from disparate places throughout a Plone site and provide it in one location. Topics work by creating a criterion that's common to all the objects you'd like to gather. This criterion could be all images or all news items with *Plone* in the text. Because topics are a rather complicated type of content, only managers can add them initially. If you can't see Topic in the list of items to add, then you don't have the permission to do so.

To add a topic, select Topic from the drop-down list. After adding the topic, you can create key criteria on the criteria tab. The list of criteria and types is available in the drop-down box at the bottom of the page. This is a rather confusing list; I won't try to discuss it here. Unfortunately, what those terms are and what they mean is based heavily on the underlying technology, such as catalog indexes and object attributes. For this reason, Chapter 11 covers this in detail.

For example, to create a topic that shows all the images, you need to add a criterion that searches for content based on *portal_type*. For this, select a field name of *portal_type*, select String Criterion, and then click Add. These criteria will be added to the top of the page; in the field to the right of *portal_type*, enter **Image**, and then click Save. You now have criteria for your topic that will show all content that's an image. Returning to the view tab, you can now see all the images on a site.

As stated, topics are quite complicated, have a rather unfriendly interface, and are recommended for only advanced users. Many people have found topics useful, which is why they're still available in Plone; however, a more user-friendly system will be developed in the future.

Discussing and Finding Content
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Adding and editing content in Plone is much more useful if people can find and then discuss the content. The primary ways users find content is through searching and navigation. Fortunately, Plone automatically sets up searching and navigation for the users, so it's easy to find the content you've added.

Adding Comments to Content
..........................

Feedback from users is a vital part of any Web site. By allowing users to add comments, you ensure that users can give feedback, correct typographical errors, or otherwise discuss the content. You can discuss almost any piece of content in Plone; folders and topics are the only exceptions.

You can enable discussions in one of two ways. First, the owner of the content (otherwise known as the person who created it) turns on the discussion feature by clicking the properties tab of the object and selecting Enabled under the Allow Discussion on This Item header, as shown in Figure 3-26. Second, the default option applies the policy for that type of content as defined by the site administrator; setting this option is described for the administrator in Chapter 10.

 .. image:: img/3294f0326.png
    :width: 700

Figure 3-26. Enabling discussions

Once discussions are enabled, click the Add Comment button to discuss the content, which opens a form for adding the comment (see Figure 3-27).

 .. image:: img/3294f0327.png
    :width: 700

Figure 3-27. Adding a comment to a piece of content

Enter the subject of the comment and the text of the comment. The text is entered as plain text, so just type away as usual. Comments don't go through any workflow, so comments show up as soon as they've been added. Once a comment has been entered, it can be replied to, forming a threaded list of comments on an item. Further, comments will be entered in the catalog so they can be searched.

**NOTE** Administrators logged in as managers can remove any replies or entire threads. Disabling replies doesn't remove the comments; it just stops them being shown, so reenabling comments will show the existing comments again.

Searching for Content
.....................

Plone contains a powerful search engine system based on Zope's ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=ZCatalog" title="create this page">?</a>. This search engine allows content to be cataloged in multiple ways and to be queried efficiently and quickly. Chapter 10 covers the internals of how this works and how it can be queried.

When you're searching for content, the content will be shown to a user if it's one of the two states: published or visible. At the top of your Plone site a search box provides an easy way to do simple textual searches in the same way as a search engine (see Figure 3-28). For example, enter **Tuesday** to find all content that contains the word *Tuesday*. A result of all matching content will display; click the title to get to the content.

 .. image:: img/3294f0327.png
    :width: 700
 ***Insert 3294f0328.jpg***

Figure 3-28. A search for *Tuesday* on Plone.org

The search provides a quite sophisticated search, with features similar to most search engines. You can make this simple query quite complex. For example, you can use the following options:

 **Globbing**: You can use an asterisk to signify any letters. For example, entering **Tues*** matches *Tuesday* and *Tuesdays*. You can't use the asterisk at the beginning of a word, though.

 **Single wildcards**: You can use a question mark anywhere to signify one letter. For example, entering **ro?e** matches *rope*, *rote*, *role*, and so on. You can't use the question mark at the beginning of a word, though.

 **And**: You can use the word *and* to signify that both terms on either side of the *and* must exist. For example, entering **Rome and Tuesday** will return a result of when both those words are in the content.

 **Or**: You can use the word *or* to signify that either terms can exist. For example, entering **Rome or Tuesday** will return a result of when either of those words are in the content.

 **Not**: You can use the word *not* to return results where the word isn't present; a prefix of *and* is required. For example, entering **welcome and not page** would return matches for pages that contained *welcome*, but not *page*.

 **Phrases**: Phrases are grouped with double quotes (' â€) and signify several words one after the other. For example, entering **'welcome pageâ€** matches *This welcome page is used to introduce you to the Plone Content Management System*, but not *Welcome to the front page of my Web site*.

 **Not phrase**: You can specify a phrase with a minus (-) prefix. For example, entering **welcome -'welcome pageâ€** matches all pages with *welcome* in them, but not ones that match the phrase *welcome page*.

**NOTE** All searches are case insensitive.

Large sites may have a lot of results, so only 20 results display at a time. To page through the results, navigation bars will appear at the top and the bottom of the search result pages. The values on an object used in a search are its title, description, and body text (if the content type has anyâ€”for example, news items and documents).

Performing an Advanced Search
.............................

You can narrow down the search results by using an advanced search, which is accessible via the search results of a standard search. In old Plone sites, a search tab brought users to this page; you can reenable this tab if you want, as covered in Chapter 4. The advanced search form enables a user to query content using a number of attributes, including title, keywords, description, review state, creation date, content type, and even author, as well as the search text (as used in the quick search available from the top-right corner), as shown in Figure 3-29.

 .. image:: img/3294f0329.jpg
    :width: 700
 
Figure 3-29. Advanced search

Although the search text field searches both the title and description, you may want to search the description or title only. For that reason, these fields are presented on the advanced search form. You can't search the title and description using the wildcards, globbing, or any of the advanced search options. Any search result will match the input (if given) of all the fields; the results will be an intersection of all the terms.

Example: Creating the Plone Book Web Site
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To give an example Plone site and provide a series of examples, I set up a Web site for this book. This is a Plone site with a few minor modifications. As I go through the book, I'll make references to the site and add new features as they're covered in the book, including new templates, skins, and so on. The Web site for this book is at *<a href="http://plone-book.agmweb.ca">http://plone-book.agmweb.ca</a>*; initially I set this site up on Windows server, as described in Chapter 2. However, I later transferred it to Linux.

The site serves the following purposes:

  - It gives people a place to get information about the book and buy it.

  - It allows easy access to the software used in the book.

  - It gives code examples and allows users to interact with samples in the book.

  - It contains any errata or issues found after publication.

Once I set up a Plone site, I created the following basic folder and page structure:

::

   Home
    |_ Software
    |_ Chapters
       |_ Chapter 1
       |_ Chapter 2
       ...

To do this, I logged in as the user who was created with the installerâ€”in my case, the admin user. After logging in, I went to the home page, clicked the edit tab, and wrote some text for the home page. I created links to the *Chapters* and *Software* folders. Then I clicked the contents tab and added two folders, as shown in Figure 3-30.

 .. image:: img/3294f0330.png
    :width: 700

Figure 3-30. The folder contents with my home page and the new folders

Next, I went to the *Chapters* folder and started adding a folder for each chapter. Because I haven't made a default page, Plone will happily create a listing of all the chapters. The description for each chapter is the name of the chapter (for example, *Introducing to Plone and This Book*), and the short name is the chapter numberâ€”this will keep my URLs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter3/createform?page=URLs" title="create this page">?</a> nice and short (for example, */Chapters/3*). I've left everything in the visible state, so after this, it's just a matter of adding content.





From unknown Sun Jan 2 16:42:50 +0800 2005
From: 
Date: Sun, 02 Jan 2005 16:42:50 +0800
Subject: 
Message-ID: <20050102164250+0800@nocache.czug.org>

Publishing a Folder 中：
在实际使用plone2中，只能“发布”Plone站点根目录下的文件夹，如果文件夹是在某个用户目录下，则无法通过“发布”使其在“导航”处显现。在“可见”和“发布”的状态下，可以通过具体的用户名浏览到某个用户创建的内容，状态设置为“私有”的情况除外。
这是什么原因呢？


From zhaoxin Mon Feb 28 13:49:16 +0800 2005
From: zhaoxin
Date: Mon, 28 Feb 2005 13:49:16 +0800
Subject: 
Message-ID: <20050228134916+0800@nocache.czug.org>

如果你有权限"网"某个folder添加content的话==>如果你有权限"往"某个folder添加content的话，

From zhaoxin Mon Feb 28 14:40:46 +0800 2005
From: zhaoxin
Date: Mon, 28 Feb 2005 14:40:46 +0800
Subject: 
Message-ID: <20050228144046+0800@nocache.czug.org>

"想起"它对象一样，只有Title是必填的==>"象其"它对象一样,只有Title是必填的

From zhaoxin Mon Feb 28 14:42:26 +0800 2005
From: zhaoxin
Date: Mon, 28 Feb 2005 14:42:26 +0800
Subject: 
Message-ID: <20050228144226+0800@nocache.czug.org>

活动将在者之间有效==>活动将在"两"者之间有效
