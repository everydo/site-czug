---
created: 2005-12-14 14:34:52
creator: panjy
description: ''
title: Chapter9
---
第九章 设置权限和用户
---------------------------

.. Contents:: 内容：

(Setting Up Security and Users)

Plone has a powerful and fine-grained security model. It provides a myriad of options for security at all levels so each object can have custom security for a user, a role, a group, and so on.

To put this chapter in context, I'd like to share this interesting quote with you:

 *Security is hard.*

 -- Jim Fulton, chief Zope architect

Plone具有一个强大的、精细粒度的安全性模式。它提供了在不同层次上的、无数种的安全选项，因此每个对象针对于用户、组和角色都能够提供客户化的安全配置。（翻译：wanglong ）

在这里，我愿意与大家分享一点看法：*安全性管理是非常困难的*。

  -- Jime Fulton, Zope 系统架构师

The security for Plone is so powerful and multifaceted that it can be quite hard to debug and manage. But perhaps no other part of a Plone site is as important as getting security right. A security breach in your site is probably the most serious blunder you can make, and for this reason, I cover Plone security quite comprehensively.

Plone的系统安全特性非常强大，也比较复杂，从而难以进行故障排查和管理。而在使用Plone系统时，恐怕没有比系统的安全性更重要的了。如果系统存在安全性漏洞，这也许是最严重的一个失误。为此，本章非常全面细致地介绍了Plone系统安全性。（翻译：赵玉勇）

In this chapter I first cover all the user terminology and key interfaces with which your users will interact. Then I show how to add and edit users and groups through the Plone interface. I then step through the key tools and Application Programming Interfaces (APIs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=APIs" title="create this page">?</a>) that manage users and their security. Then I cover using Python tools to script changes to users and their properties. Finally, I cover server security and expand user authentication, providing a detailed example on how to incorporate users from a Lightweight Directory Access Protocol (LDAP) server.

本章首先介绍了所有相关的概念术语、以及与用户相关的关键接口。其次展示了如何添加修改用户以及用户组信息。接下来针对如何管理用户以及权限设置，介绍了相关的关键系统工具以及APIs（Application Programming Interfaces），还包括如何编写Python脚本以改变用户信息。最后，介绍了服务器安全性设置以及如何扩展用户鉴权机制，并详细介绍了如何与LDAP（Lightweight Directory Access Protocol）服务器集成（翻译：赵玉勇）

(Administering Users)

管理用户
~~~~~~~~~~~~~~~~~~~

One of the most common tasks you'll need to do as an administrator of a Plone site is to deal with the members of your site. Administration usually involves recovering passwords and changing member settings. You can perform quite a few simple tasks through the Web, but of course the best friend to any administrator is a scripting language such as Python to make changes en masse. If you have a large number of users, the 'Scripting Users锟?section later in this chapter will be of particular interest to you.

作为Plone系统的管理员，处理站点用户信息是最平常的工作之一，包括恢复用户密码、改变用户相关信息设置等。可以通过浏览器，进行简单的管理工作。但最好的方式还是通过诸如Python脚本程序来统一的批量设置工作。如果你的站点拥有大量的用户，建议特别关注一下本章靠后部分的 'Scripting Users' 一节内容。

(Users, Roles, and Groups)

用户、角色和用户组
........................

Some of the key concepts in Plone are users, roles, and groups. Before I show you how to edit these, I'll cover in more detail exactly what these are.

在Plone中，用户（Users)、角色(Roles)和用户组(Groups)属于非常重要的概念，这里先对它们进行详细地介绍。(翻译：赵玉勇)

用户(Users)
,,,,,,,,,,,,,,,,

Each person visiting a Plone site is referred to as a *user*. The user may or may not be authenticated by Plone, and users who are not authenticated are called *anonymous users*. Users who are authenticated are logged into an existing user account. If they don't have an account, then usually they can create their own account.

每个访问Plone站点的人，都被称为 **用户(User)** ，不管是否可以通过Plone认证。那些不能通过认证的用户被称为 **匿名用户(anonymouse users)** 。Users who are authenticated are logged into an existing user account. If they don't have an account, then usually they can create their own account.  （翻译：赵玉勇）

Anonymous users are the *lowest* level of users in that they usually have the most restrictions. Once users log in, they gain the roles their accounts give them. A user is identified by a short identifier, for example, *andym*. By default, no users are created for you in Plone, except for the one added to Zope by the installer to give you administrator access. The name of that user is whatever you set up in the installer, usually *admin*.

匿名用户属于最 *低* 等级的用户，系统对他们有最多的限制。一旦用户登入系统，就会获得账户赋予的角色身份。一个用户是由其用户名唯一识别的，例如 *andym* 。除了在安装过程中，会在Zope中添加一个管理员用户外，缺省情况下，Plone中并没有用户信息。在安装过程中所创建的管理员用户，其用户名通常是 *admin* 。 （翻译：赵玉勇） 

角色(Roles)
,,,,,,,,,,,,,,,,,

A Plone site has a series of roles; a *role* is a logical categorization of users. Instead of setting every user's permissions individually, each role is assigned permissions individually. Every user can be assigned zero to many roles; for example, a user can be a member and a manager. Each role is identified by a simple name, for example: *Member*.

Plone站点拥有一组角色，*角色* 是对用户的分类。需要对角色设置权限，而不是对每个用户单独设置。可以同时分配多个角色给一个用户，例如，一个用户可以是成员和管理员。每个角色也具有唯一的标识，如 *成员（Member）* 。（翻译：赵玉勇）

A Plone site has five predefined roles, split into two groups: assignable roles and not-assignable roles. Assignable roles are roles you can give to users so that when they log in, they have this role. Not-assignable roles are roles you don't grant specifically to a user but that occur within a Plone site. For example, you don't assign the anonymous role to a user.

Plone有5个预设的角色，可以分为两种：可分配角色和不可分配角色，后者如匿名角色（Anonymous）。（翻译：赵玉勇）

The following are the not-assignable roles: 

不可分配的角色有：

 **Anonymous**: This is a user who hasn't logged into the site. This could be a user who has no account or one who has merely not logged in yet.

 **匿名用户(Anonymous)**: 指那些没有登录到系统中的用户，他们可能没有系统账户、或者有系统账户但只是没有登录。（翻译：赵玉勇）

 **Authenticated**: This role refers to any user who is logged into the site, whatever their role. By definition a user is either anonymous or authenticated; the two are mutually exclusive. Because the authenticated user doesn't provide much in the way of granularity, it isn't recommended for most applications.

 **认证用户(Authenticated)**: 指所有已经登录到系统中的用户，不管他是什么角色。一个用户不是匿名用户就是认证用户，这两种角色是互斥的。因为认证用户这种角色并不能在在用户分类上提供更多帮助，所以不推荐使用。（翻译：赵玉勇）

The following are the assignable roles:

可分配的角色有：


 **Owner**: This is a special role given to users when they create an object. It applies to a user for that object only; the information is stored on the object. You don't normally explicitly assign someone as an owner. Plone does that for you.

 **所有者(Owner)**: 如果用户创建一个内容对象后，即自动成为该内容的所有者。对被创建的内容对象而言，该角色只会赋予一个用户（创建它的用户），其所有者信息被保存在这个内容对象本身。该角色的分配并不是显式操作的结果，而是Plone自动完成的。（翻译：赵玉勇）

 **Members**: This the default role for a user who has joined your site. Anyone who joins using the *join* button in the Plone interface has this role.

 **成员(Members)**: 对于注册到Plone站点的用户而言，缺省即为成员角色。只要通过Plone界面中的 *注册* 链接方式加入的用户，都会具有该角色。（翻译：赵玉勇）

 **Reviewer**: This is a user with more permissions than a member but less than a manager. Reviewers are users who can edit or review content entered by a member; they can't change the site's configuration or alter a user account.

 **审批者(Reviewer)**: 该角色用户拥有的权限比成员角色更多、但比管理员角色要少。审批者用户可以编辑或审批由成员角色提交的内容；他们不可以修改系统配置或设置用户账户信息（这是管理员用户做的事情）。（翻译：赵玉勇）

 **Manager**: Managers can do almost anything to a Plone site, so you should give this role only to trusted developers and administrators. A manager can delete or edit content, remove users, alter a site's configuration, and even delete your Plone site.

 **管理员(Manager)**: 管理员可以做任何事情，所以该角色只能赋予那些可信赖的开发人员或系统管理员。一个管理员用户可以删除、编辑内容对象，清除用户账户，改变系统配置，甚至删除整个Plone站点。所以一定要谨慎使用该角色！（翻译：赵玉勇）

用户组(Groups)
,,,,,,,,,,,,,,,,,,

Groups are a different concept from roles. Roles imply that a user has different permissions from someone with a different role, but a *group* is a logical categorization of users. For example, the marketing department may be one group, and the engineering department may be another group. Each user can belong to zero to many groups. Groups are optional; you don't need to use them, but the Plone team found them useful enough to integrate them.

组是与角色不同的概念。不同角色身份的用户，所拥有的权限是肯定不同的，而 *组* 仅仅是用户的逻辑分类。例如，市场部的用户可以划分为一个组，而工程部的用户又可以划分为另外一个组。每个用户可以不属于任何组、也可以属于多个组。在系统中，并不一定需要使用组，但Plone团队认为组是很有用的，所以将其集成到系统中。（翻译：赵玉勇）

Site developers can use the groups in anyway they choose, such as to group a department or a certain class of users. For most users using Plone for the first time, I recommend leaving groups unchanged; by default no groups are created for you.

站点开发人员可以以任意方式使用组，诸如按部门分组、或按一定等级分组。如果是第一次使用Plone系统的话，我建议不要去使用组。缺省情况下，系统是不会预先创建组的。（翻译：赵玉勇）

**NOTE** You implement groups using Group User Folder (GRUF). The groups aren't part of Zope but are an extra tool for Plone. GRUF was developed and contributed by Ingeniweb.

**注意** 对用户进行分组管理需要借助于Group User Folder（GRUF）这个产品，它并不属于Zope，而是Plone的扩展功能。GRUF是由Ingeniweb开发、发布的。（翻译：赵玉勇）

（Sharing Tab）

共享内容标签
......................

When I discussed publishing documents in Chapter 3, I skipped past the Sharing tab because it's a more advanced feature you may not always want to use. The Sharing tab is an action in *portal_actions*, so if you don't want it to appear, go to that tool in the Zope Management Interface (ZMI) and uncheck the *visible* option. However, the Sharing tab is quite useful because it lets you give different local roles on an object in Plone to users or groups.

If you've got a piece of content you've added to a Plone site and you want another person to be able to edit it, then you need to give them more permissions for that one object. This is called a *local role*, and it allows you to give a user expanded rights on an item. If I write a document in Plone, I become the owner of that document and gain certain rights. If I wanted to collaborate on this document with my colleague Ralph, prior to publishing, then I need to give Ralph more permissions so he can edit that document. To do this, I go to the Sharing tab and give Ralph more permissions.

 **NOTE**	You can assign local roles on a folder or document basis. If you give users a local role on a folder, then they get that local role for every object in that folder.

The Sharing tab appears only in places where you have the rights to alter sharing鈥攜our folder being one such place. Click *my folder*, and then click *sharing*. Figure 9-1 shows the form for the Sharing tab. It has three main components; you can assign a user to have a local role on this object, you can assign a group to have a local role on this object, and you can see who has certain roles already.

 .. image:: img/3294f0901.png
    :width: 700 

Figure 9-1. Accessing the Sharing tab

To find a user to assign a role to, enter a search term (such as *Gavin*), which opens a list of users that match your search criteria; you can then click the user and select the role from the drop-down list. For example, in Figure 9-2, I'm giving Gavin the owner role on this folder.

 .. image:: img/3294f0902.png
    :width: 700 

Figure 9-2. Assigning a role to a user

In my earlier example, I wanted to assign rights to an individual user, but that can be annoying with large numbers of users...unless you've assigned them to groups. If I wanted to allow the whole marketing team to edit my document, I could do so. To get the groups available, just click *View groups*, which opens a list of groups for this site, and you can assign a local role to a group. In Figure 9-3 I'm giving Development the owner role on this folder.

 .. image:: img/3294f0903.png
    :width: 700 

Figure 9-3. Assigning a role to a group

Finally, in Figure 9-4, you can see which users and groups have the roles for this page and then remove them if you want. Once you've given someone else local roles on an object, you allow them to access the Sharing tab. Then nothing is stopping them from removing roles for you from the content.

 .. image:: img/3294f0904.png
    :width: 700 

Figure 9-4. Viewing and removing roles

(Administering Through the Web)

通过Web方式的管理
..........................................................

Using the Plone interface you can easily modify the user that's assigned to certain groups, alter user information, add groups, and so on. You can do most of this through the Plone control panel; just click *plone setup* and then select Users and Groups Administration. You'll see two tabs: Users and Groups.

Click the Users tab to access the list of users in the system. The form is rather self-explanatory: you can remove a user, reset a password (resetting the password sends the user an e-mail anyway), or change an e-mail all from this form, as shown in Figure 9-5.

 .. image:: img/3294f0905.png
     :width: 700 

Figure 9-5. Editing users

By clicking a user, you can access the preferences form for that user, make any changes, and then click Save. To add a new user, click *add new user*. This opens the form to register the user and allows you to edit the data for that user. Because the number of users in a site can become quite large, the data will be batched in the familiar Plone manner. You can enter a search string, which will search through all the users to find matching names and e-mail addresses.

You can add, edit, and remove groups by clicking the Groups tab. To add a group, click the Add New Group button. This opens a form for a group; the only required field is Title, which should be a short, descriptive name for the group; usually a group is directly related to a business or site activity.

Now that you've added a group and have some users, you can match users and groups. Again, you can do this using the Plone control panel. You can either click a user and give that user some groups or click a group and put users into that group.

(When to Use Groups?)

使用用户组(Groups)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Using groups is optional, and you may not ever choose to use them. One strong use of groups, however, is to make a *workspace*. In a basic Plone site, users can add and edit content in their own folder; each item of content in that folder is thus owned by the person who created it. But this really doesn't scale too well; after all, the whole point is that you want a few people to be able to edit a document and share it, of course!

This is where groups and workspaces come in. Just like there's a folder for members that contains all the user folders for members, there's also a folder called *GroupWorkspaces<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=GroupWorkspaces" title="create this page">?</a>*. This is created by default whenever a group is added, and in that folder is another folder for each group. So, if you add a group called *Marketing*, you'll be able to find a folder at *GroupWorkspaces<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=GroupWorkspaces" title="create this page">?</a>/Marketing*. Any user in the Marketing group will have the right to add, edit, and delete content in the *Marketing* workspace; in other words, you now have a folder for that group. This is the same as adding a group and then assigning a local role for that group to that folder.

This is just one example of how useful a group can be; another is using groups in workflow. In the previous chapter I discussed workflow and how you can send an e-mail to certain people when something happens. If a member of the Marketing group added an item, for instance, then you can send an e-mail to all the users of that group, rather than just everyone. The 'Calculating the Other Users in a Group锟?section shows how you to do this.

On the Plone Web site, for example, the users are in development groups that are responsible for parts of Plone, such as the release team and the documentation team.

(Administering Groups)

管理用户组(Groups)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

You can administer groups in two ways from the Plone control panel. You can either go to a user and click the groups for that user or go to a group and click the users for that group. Either way you can easily add and remove the groups for a user. To add a user to a group, however, go to the user search page and click a user; then click the Groups tab, which will show the groups for that user. For example, Figure 9-6 shows the groups for the user *andym*.

 .. image:: img/3294f0906.png
     :width: 700 

Figure 9-6. Groups for this user

To add the user to a new group, select the checkbox for the group and then click *add user to selected groups*.

Likewise, you can remove a user from a group by checking the box next to the group and then clicking *remove selected groups*. You'll see a similar interface for group management if you click *plone setup*, select User and Groups Administration, and click *groups*. Click a group, and then click *group members*; you'll get a list of the members in that group, and you can add and remove members from there.

(Giving Groups Roles)

用户组(Groups)的角色设置
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

So you've seen that users can have roles but also that groups can have roles. This may seem a little odd to you, but think, for example, of a group of supervisors that needs to be able to do anything to the content added by one of their staff members. To do this in a site, they'll need to have the reviewer role. To set up a group of supervisors, click *plone setup*, select User and Groups Administration, click *groups*, and then click *add new group*. Give that group the name **Supervisor** and complete the form. On the next form, you get a list of the groups and the roles assigned to them. To assign the reviewer role to this group, select the checkboxes that correspond to the reviewer role for that group, as shown in Figure 9-7.

 .. image:: img/3294f0907.png
     :width: 700 

Figure 9-7. Setting up reviewer role for the Supervisor group

You've made it easy to give out the reviewer role to users, and you can now manage and administer the reviewers through the Plone interface. Furthermore, it's easy to programmatically calculate the reviewers because you can examine the group and get a list of its members.

The idea of groups having roles is actually a minor paradigm shift from standard Zope development, since in that scenario you're used to individual users being assigned roles. You can still do that in Plone, of course, but assigning roles to a group is easy in Plone.

 **NOTE** By definition, when the permission for a user on an object is calculated, a few factors are taken into account. First, the roles assigned to a user are calculated. Second, the roles a user gets from its groups are calculated. This gives a total set of roles that a user may have.

(User Registration Tools)

用户注册模块
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before users are members of your site, they must register with your site. Users can register themselves quite easily by clicking the *join* link in the top-right corner of a Plone site. I covered this in detail at the beginning of Chapter 3, where I showed you how users can join and register for a site. The registration process for users is actually pretty straightforward, but quite a few options are available. This process is controlled by three key tools: *portal_registration*, *portal_memberdata*, and *portal_membership*. The following sections present these three tools now.

（Portal Registration）

用户注册配置
......................................

The *portal_registration* tool is an action provider and provides one key action in Plone: joining. Clicking this link will open the join form. By default, any user (anonymous included) that hasn't already logged in can click this link to join.

When users register using the join form, they'll get two simple options for a Plone site: to either validate e-mail or not validate it. The only true way to validate an e-mail is to send an e-mail to the address and see if an appropriate response is returned. By default, e-mail validation is turned off; that is, when a user registers, by default they provide their name, e-mail, and password in Plone. They can then log in and use the site as usual. This is the form you've seen in Chapter 3. If e-mail validation is turned on, however, then users can give only a name, username, and e-mail, as shown in Figure 9-8.

 .. image:: img/3294f0908.png
     :width: 700 

Figure 9-8. Registering a user with e-mail validation turned on

After clicking the link in the e-mail, they'll then be taken to a login screen, and the registration process can continue as normal.

To enable validation in the Plone interface, click *plone setup* and select Portal Settings. Under Password Policy, select *Generate and e-mail members' initial password* and click Save to commit the changes.

If you'd like to view or edit the e-mail users get, then you can edit the page template that generates it. You can find the template by clicking *plone_skins*, clicking *plone_templates*, and then clicking *registered_notify_template*.

 ***Begin Sidebar***

If you want to add any other actions for users, before they join, this is the best place to add them. For example, if you wanted to add a page that outlined a privacy policy, this could be a good place. To do this, first add the page and all the information you want to contain in that policy. It would make sense to make the ID of the page something useful, such as *privacy.html*, and put it in the root of your Plone site.

In the ZMI, go to *portal_registration* and add a new action with the following information:

::

 Name: Privacy
 Id: privacy
 Action: string: ${portal_url}/privacy.html
 Condition: not: member
 Permission: Add portal member
 Category: user
 Visible: selected

You'll now get the privacy link to your privacy page, if aren't logged in. By making the category *user*, you'll ensure it appears in the personal bar.

 ***End Sidebar***

（Portal Member Data）

用户信息管理
....................................

The *portal_memberdata* tool holds the member data for each user. A Plone user has a series of options, such as skins, the time last logged in, What You See Is What You Get (WYSIWYG) editor, and so on. When a user joins a site, a default record in *portal_memberdata* is created. You set the actual properties created in that record in this tool; click *portal_memberdata*, and select Properties to see the default set of properties. In Plone these are the following:

  - **e-mail**: This is the user's e-mail address.

  - **portal_skin**: This is deprecated; ignore this property.

  - **listed**: Show this user in the *Members* directory (Boolean). By default this is enabled.

  - **login_time**: This is the date the user logged in for this session.

  - **last_login_time**: This is the date of the last time the user logged in.

  - **fullname**: This is a user's full name.

  - **error_log_update**: This is used by the error log form; ignore this property.

  - **formtooltips**: In old versions of Plone, there were options for displaying form help. This is now no longer relevant, so ignore it.

  - **visible_ids**: This shows the IDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=IDs" title="create this page">?</a> (or names) for objects. By enabling this, the first field on the edit form for each content type is Name, and by changing this users can rename objects. By default this is enabled.

  - **wysiwyg_editor**: This is the editor to use in forms.

You can add or remove items from this list using the Zope interface. However, adding or removing elements from here doesn't automatically make the user interface form that users actually edit. In Chapter 3 you saw that by clicking *my preferences*, users can access and alter most of these properties. If you want to alter these preferences, then you'll have to customize that form. The values given for these fields are the default values for a newly registered user; for example, by default all members are listed in the Members tab, unless users explicitly decide otherwise.

So, for example, if you wanted all members not to be listed on the search by default, then you need to change the setting in this form. In the *portal_memberdata* form, find the *listed* property and uncheck the value in the form. Then click Save Changes, and all new users will no longer be selected.

The *portal_groupdata* tool contains the corresponding data for groups. The default properties for a group are as follows:

  - **title**: A title for the group

  - **description**: A description for the group

  - **email**: An e-mail address

  - **listed**: Whether to list the group to users

These tools store the user and group data on these tools and not in the main *acl_users* folder. If you want to move user information between Plone servers, then you'll need to move these tools as well; just moving the *acl_users* folder isn't enough. You can do this by importing and exporting these tools; however, before you import into the new Plone site, you must delete the existing tool, or an error will be raised.

（Portal Membership）

用户配置管理
..................................

The *portal_membership* tool handles a few more properties; specifically, it matches the member data with the members. Accessing *portal_membership* from the ZMI gives a large number of options; the following are the most important:

  - **Set members folder**: This is the folder to put member folders into. This folder must exist. By default this is *Member*.

  - **Control creation of member areas**: By default, a member area for each user is created when joining. That creation is optional, however. Uncheck *Turn folder creation off* to disable this. The default is that it's on.

Under the Actions tab you'll find a whole series of actions that relate to users when they're logged in, such *my favorites*, *my preferences*, and so on. These all have the category *user* so that the actions will appear in the top-right corner.

The *portal_groups* tool provides similar tools to *portal_membership*, but for groups. Likewise, when a group is created, a group workspace is created where all members of that group can add and edit content.

（Useful APIs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=APIs" title="create this page">?</a>）

编程接口(APIs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=APIs" title="create this page">?</a>)
......................

The *portal_membership* tool has one of most commonly used set of API functions. Often you'll want to find out key information such as the currently logged in user, whether the user is anonymous, and so on. The *portal_membership* tool provides you with these methods; the following are some of the most important:

  - **isAnonymousUser()**: This returns *true* if the user is anonymous.

  - **getAuthenticatedMember()**: This returns the currently logged-in user wrapped with *portal_metadata* properties. If no user is logged in, it returns a special *nobody* user with null mappings for *portal_metadata* properties.

  - **listMemberIds()**: This returns the IDs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=IDs" title="create this page">?</a> for all the users.

  - **listMembers()**: This returns all the user objects.

  - **getMemberById(id)**: This returns the user object for a given ID.

  - **getHomeFolder(id=None)**: This returns the home folder for a given ID. The ID is optional and if not provided gives the current member's home folder.

  - **getHomeUrl(id=None)**: This returns a URL to the member's home folder. The ID is optional and if not provided gives the current members home folder's URL.

The user returned by these functions is 'wrapped锟?in the data from the *portal_memberdata* tool so that the properties are attributes of the user object. So, for example, the following is a little Script (Python) object to get the e-mail address for the user *Bob*:

::

 ##parameters=
 u = context.portal_membership.getMemberById("andy")
 return u.email

（Cookie Authentication）

基于Cookie认证
..........................................

By default Plone uses cookie authentication for its users, meaning that users must have cookies turned on in their browser to log in. This authentication is provided in a Plone site by the *cookie_authentication* object, which contains the necessary functionality for users to log in. If you really want to use Hypertext Transfer Protocol (HTTP) authentication, then you can simply remove this object; however, I really don't recommend it, because HTTP authentication isn't good for most sites.

This object provides the following items that you can edit from the ZMI:

  - **Authentication cookie name**: This is the name of the cookie that will be used to persist user authentication. It does this by persisting a token for the user, which preserves a user's login. The default is *__ac*.

  - **User name form variable**: This is the name of the variable in the login form that will contain the username. The default is *__ac_name*.

  - **User password form variable**: This is the name of the variable in the login form that will contain the password. The default is *__ac_password*.

  - **User name persistence form variable**: This is the name of the variable in the login form that will contain the persistence token. The default is *__ac_persistent*.

  - **Login page ID**: If a user needs to log in, this is the page that they will be sent to in order to complete the login. The default is *require_login*.

  - **Logout page ID**: If a user is to be logged out, then they will be sent to a nice page with a message. The page is this ID. The default is *logged_out*.

  - **Failed authorization page ID**: When the authorization fails, this is the page that will show. By default, this is blank, as Plone does something different.

  - **Use cookie paths to limit scope**: This sets the cookie to be local to the current folder and all folders below this. Leave this at the default of blank so that you'll authenticate for the entire site, regardless of where you actually click *login*.

To change the cookie that's being used, rather than the default, just change the value in this form and click Save. However, let me warn you that if you change the name of the cookie, all the existing cookies on your users' computers will be ignored, and they'll all have to log in again. If you wanted a different login page, then you could either customize the *require_login* page template or change the value of that variable.

（The Actual User Folder）

用户数据文件夹
............................................

You can get access to the actual user folder for a Plone site by clicking the *acl_users* folder in the ZMI. This opens the Group User Folder (GRUF) interface, which gives you a variety of options.

The GRUF interface is actually quite similar to the user options you have through the Plone control panel. You can add and edit users and groups through a pretty straightforward interface. Clicking Users and Groups will allow you to edit these items. If you click the Contents tab, you'll get a choice of users or groups; click Users and then click *acl_users*. Finally you'll get to the actual user folder for a user. This looks like the standard user folder. You'll see a list of users, and to edit a user, you just click the username, as shown in Figure 9-9.

 .. image:: img/3294f0909.png
     :width: 700 

Figure 9-9. Editing the user record

From here you can alter a user's password or the roles. You'll note that at this point the group Management is actually represented as a role to ensure that no name collisions occur. The name is mangled to be *group_Management*. If you wanted to make this user a member of this group, then you could do so here. There isn't much you can do here, though, that you can't do at the highest level, so I wouldn't go down to this level unless you have to do something such as change the password or set a domain.

（Setting Permissions）

设置权限
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

I've now covered users, roles, and groups with you, but there's more; the lowest level of settings for security is a permission. As the name suggests, giving a user a *permission* means giving them the ability to do something, such as view an object, add a document, get a listing of the contents of a folder, and so on. Each permission is identified uniquely by a meaningful name such as *View*, *Add portal content*, or *List folder contents*.

Permissions aren't applied to an individual user, but to a role. Each role gains particular permissions, and then the user gains those particular roles. You can find all the security settings for Zope in the ZMI on the Security tab. This includes the Plone site, the Zope root, all the objects and content inside a Plone site, and the skins. When clicking the Security tab, you'll see all the permissions and the roles that map to them in a grid, as shown in Figure 9-10.

 .. image:: img/3294f0910.png
     :width: 700 

Figure 9-10. Security settings

In Figure 9-10 you can see that this object has a series of security settings. This is displayed as a grid of checkboxes; on the left are the permissions in alphabetical order, and across the top are the roles again in alphabetical order. This page is rather large and cumbersome, so there are two useful shortcuts. Click the permission to get all the roles for that permission; for example, Figure 9-11 shows the settings for the *Access future portal content* permission.

 .. image:: img/3294f0911.png
     :width: 700 

Figure 9-11. Settings for a permission

And you can click a role to get all the settings for that role, which is much easier than a long list, as shown in Figure 9-12.

 .. image:: img/3294f0912.png
     :width: 700 

Figure 9-12. Settings for the reviewer role

For all these permissions, it's a simple matter of checking the boxes for the permissions you want or selecting the options in the select box and clicking Save. When the Acquire Permission setting is checked, security settings for this permission will be acquired; when it's unchecked, permissions will not acquired. *Acquisition* is the ability of an object to search the object hierarchy to find permissions and then combine them for the overall permission.

 **NOTE** The permissions page will turn on the security for the manager user for you; locking out your manager user would be really bad, so it's good for this to be on by default.

Now take a look at the *Access contents information* permission. In the ZMI, go to the root Plone object and click the Security tab. The default setting for this permission is that no roles are enabled; that is, the settings for each user are blank. However, the Acquire Settings option is checked, meaning you have to look in the parent objects in the hierarchy to determine this object's permissions. Go now to the root Zope folder, and click the *Security* tab. This opens the list of permissions for the root folder, and sure enough there are some settings for the *Access contents information* permission in this folder; namely, the anonymous and manager roles have this permission.

Since permissions are acquired, all subfolders will also acquire these permission settings. This means the Plone site and every object in the Plone site will have these permissions. Therefore, if you want to set a security permission for the whole site, all you have to do is configure the permission in the root Plone, and most of objects will acquire those permissions.

 **NOTE**	The exception is workflowed objects, which specifically turn off acquisition. This is covered in the 'Security and Workflow锟?section later in this chapter.

You can set permissions on any object in Zope through the ZMI. This may be the Zope root, a Plone site, a folder such as the *Members* folder, or even a piece of content. Each object has it own set of permissions, but not all objects have the same choice of permissions. For example, the Add... permission is provided on all folders. But since these permissions don't make sense to a nonfolderish object (by definition, an object must be a folder to have items added to it), they aren't present.

Any product or piece of Python code in your Zope site can define its own security permission, so it can be a little difficult to define exactly what a permission lets you do. Table 9-1 describes some of the key permissions and what they do.

Table 9-1. Common Plone Permissions

 **Permission	Description**

*Access contents information*	This permission allows access to an object, without necessarily viewing the object. For example, a user may want to see the object's title in a list of results, even though the user can't view the contents of that file.

*Add鈥?	There are numerous add permissions, each relating to the type of object a user may like to add. For a normal Plone site, all the permissions are grouped together as *Add portal content*.

*Add portal member*	This gives the ability to join a Plone site and get a user account.

*Copy or Move*	This gives the right to copy or move an object. Although users may have this right, they still need to have the permission to paste the object into a destination.

*Delete objects*	This gives the right to delete an object. In standard Zope, this permission is checked on the folder; on Plone this check is made on each object.

*List folder contents*	This gets a list of the contents of a folder; this doesn't check if you have right to view the actual object listed.

*List portal members*	This gives the right to see a list of members in the site and search through the members.

*Modify portal content*	This is a catch-all permission for any changes to an object, such as changing the content, its keywords, or other properties. This permission applies to nearly all objects.

*Set own password*	This gives the right to change your password in a Plone site.

*Set own properties*	This gives the right to change your properties in a Plone site.

*View*	This allows a user to view the object in question. *View* doesn't just mean only HTML views but also File Transfer Protocol (FTP), WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=WebDAV" title="create this page">?</a>, and other forms of access.

（Adding a Role）

添加角色
..........................

Placing users in roles means you have to find a compatible set of permissions for each role so that grouping the permissions makes sense. This isn't always possible. Sometimes a certain user may need something different from similar users.

However, from a development point of view, the fewer and simpler you can keep the roles, the easier it will be. It's not too complicated, but an initial urge to create a role for every conceivable security option is a really bad idea. You'll get yourself into a total mess quickly. Instead I urge you to leave the number of roles sparse and keep them generic to the entire site.

To add a role, go to the root Plone folder, click the Security tab, and scroll down to the bottom (it's a long way). At the bottom is a simple form to add more roles or remove a role. Add the name of the new role, and click Add Role.

(Performing Common Tasks)

日常管理工作
..............................................

You can set some security options quickly and easily to perform regular tasks. Before you make a lot of security settings changes, however, I urge you to back up your Plone site. I show you how to do this in Chapter 14.

(Stopping Users Joining Your Site)

禁止用户自行注册
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

To stop users from joining your site, you set the Add portal member permission in the root of your Zope for anonymous users. You can either deselect this for anonymous users there or go to your Plone site and turn off the Acquire Permission setting.

（Stopping Users Searching Your Site）

禁止用户搜索
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

To stop users from searching your site, you set the *Search ZCatalog<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=ZCatalog" title="create this page">?</a>* permission to anonymous users in the root of a Plone site. So, change the permission there by deselecting Anonymous or any other user.

（Stopping Anonymous Users from Accessing Your Site Altogether）

禁止匿名用户访问
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

Ah, well, stopping anonymous users from accessing your site is a little tricky because it's quite complicated to remove anonymous access to your site completely; users still need to be able to access your site to be able to log in! What you really want, in this situation, is to be able to restrict access to your content. You can do this be restricting the permissions on your workflow.

（Security and Workflow）

安全性和工作流
.....................

As I pointed out in Chapter 7, workflow manages the security of each object in the workflow. It does this by changing the actual permissions on an object. I've just shown you how to view the security settings for each object, so you can now see how the security settings for objects in one state can be different from the security settings of an object in another state. If you click *portal_workflow*, select the Contents tab, click *plone_workflow*, and then select the States tab, you'll see all the states available. Click a state, and then select Permissions, and you'll see the permissions for that state, as shown in Figure 9-13.

 .. image:: img/3294f0913.png
     :width: 700 

Figure 9-13. The permissions for the published state

As you can see, when an object is moved into the published state, anonymous users will be allowed the *Access contents information* and *View* permissions. This means people can view the content. You'll note that members or owners can't edit their own content because they don't have that permission. The permissions applied by workflow are set on the Permissions tab, where you can set all the permissions that will be managed by the workflow.

 After you've changed the security settings, you need to go to the *plone_workflow* tool and click *Update security settings*; otherwise, the object's security and the workflow will be different.

 **NOTE** Because the permissions change when the object is transitioned, any other permission changes to the object you may make through the ZMI are removed if (and only if) those permissions are managed by the workflow. For this reason, you should always resist the urge to make minor tweaks to the security of content types in the ZMI; stick to changing the Plone site object and the workflow.

（Guards）

约束条件
,,,,,,,,,,,,

All the transitions have a guard on them that lets the administrator select the permissions allowed before a user can perform the transition. When checking if a user can perform the transition, it will check in the following order: check the permissions, check the roles, and then check the expression. If any of these checks pass, then the transition will be run.

The following are all the settings for a guard:

  - **Permission**: This is a list of any of the acceptable permissions separated by semicolons (;)鈥攆or example, *Review portal content; Modify portal content*.

  - **Roles**: This is a list of roles that are acceptable roles for this transition separated by semicolons (for example, *Manager; Reviewer*).

  - **Expression**: This is a workflow Template Attribute Language Expression Syntax (TALES) expression that will let you come up with a custom condition. For example, the following transition will occur only if this is in folder called *Members*; it's not really a permission, but it's a neat trick:

::

 python: if 'Members' in state_object.getPhysicalPath()

**NOTE**	*getPhysicalPath* is a method of all objects in Zope that returns the location inside the Zope object hierarchy,  ignoring any virtual hosting that may occur.

(Proxy Roles)

代理角色
...........

In the previous chapter I disscused some neat methods of notifying users and moving content around when content is workflowed. When this happens, the script is executed as the user performs the workflow transaction. In this case, your script may do something your user may or may not have the right to do. For example, you may not want to allow a user to add anything to a folder called *public*, except for workflow. This is a problem; you need to ensure the script can be executed with a higher role.

A *proxy role* is something your users won't interact with or know about, but it's a method for you to get around this problem. For example, say you want a user to be able to pick a user from all the other users in a site. You don't want to give the user the right to view all users, just list the users in this particular context. To execute the script, a user will need the *List portal members* permission to be able to get a list of members, but you don't want to give this to anonymous users.

The script that executes that command will need to be given a higher proxy role, probably *Member*. To do this, go to the script in the ZMI, click the Proxy tab, and click Member. If this script is based on the file system, then this information can be added in the metadata file. For example, the *.metadata* file would have the following line: *proxy = Member*. Now this script would be executed as a member, solving your security problem!

（Scripting Users）

用脚本管理用户
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

So, you've got a whole bunch of users in your Plone site鈥ow you'll need some scripts on that site to aid in the administration of the users. After a few hundred users, it can be really hard to make changes through the Web, so the following sections give a few example scripts that perform some important tasks.

(Registering Users in Bulk)

批量注册用户
.........................

If you have a large number of users to register, then you need a script to import them. These users could be from any system you're upgrading to Plone. However, if you already have users in an external source such as LDAP, a relational database, or other source, you could integrate directly with that source.

For now, take a bunch of users in a comma-separated file, with the following content: username, full name, e-mail, and groups. In this example, you'll run through that list, add each user with those settings, and then change their properties so that they will have the correct settings. The *.csv* file will therefore look something like the following:

::

 "User Name", "Full Name", "Email", "Groups"
 "Andy", "Andy Mckay", "andy@enfoldsystems.com", "Systems,Sales,Development"
 ...

A *.csv* file is a file of comma-separated values, and it can be created and edited in most spreadsheet programs, such as Microsoft Excel or OpenOffice<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=OpenOffice" title="create this page">?</a>.org. You can then export the file as a comma-separated file and finally import it into Plone. Because this requires lots of methods that are restricted, you'll need to make this an external method:

::

 # An external method to import user
 import csv
  
 # the full path to your csv file
 fileName = "/var/zope.zeo/Extensions/test.csv"
  
 def importUsers(self):
     reader = csv.reader(open(fileName, "r"))
     pr = self.portal_registration
     pg = self.portal_groups
     out = []
  
     # if your csv file contains a header line that
     # explains the contents of each column
     ignoreLine = 1

This is just the setup code; in other words, it sets up all the variables you'll use in this script. At the beginning, you import the *csv* module, which is a module that ships with Python 2.3 and provides fast parsing of *.csv* files. The *.csv* file is in the variable *fileName*, which is a full path to the file; if you make it a relative path, Plone may end up looking in the wrong place. As you saw earlier, *self* is passed to the method, and from that you can get to the two tools needed: *portal_registration* to provide access to the registration API and *portal_groups* to provide access to the groups API:

::

     for row in reader:
         if ignoreLine:
             ignoreLine = 0
             continue
  
         # check we have exactly 4 items
         assert len(row) == 4
         id, name, email, groups = row
             groups = groups.split(',')
  
         # make a password
         password = pr.generatePassword()

Next you loop through each row and get the ID, name, e-mail, and groups. Then you make a random password by calling *generatePassword*. This generates a random six-character password composed of uppercase and lowercase characters and numbers. If you wanted to base the ID or password on provided information, such as the username or e-mail, then this is the opportunity to do that. In this case, I've entered each group in the same field, separated by a comma (for example, *"Sales,Marketing"*). Therefore, I need to split that into a list of individual names, like so:

::

         try:
             # add in member
             pr.addMember(id = id,
                 password = password,
                 roles = ["Member",]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=%22Member%22%2C" title="create this page">?</a>,
                 properties = {
                     'fullname': name,
                     'username': id,
                     'email': email,
                     }
                 )
             # groups are separated by commas
             for groupId in :
                 group = pg.getGroupById(groupId)
                 group.addMember(id)
  
             out.append("Added user %s" % id)
  
         except ValueError<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=ValueError" title="create this page">?</a>, msg:
             # if we skipped this user for a reason, tell the person
             out.append("Skipped %s, reason: %s" % (id, msg))
  
     # return something
     return "\n".join(out)

Given that you now have all the user information you need to register the user, you can perform the actual registration. You do this by calling the *addMember* function, which is a function of *portal_registration* and which registers the user. A dictionary of key/value pairs, such as e-mail and name, is passed through to the function. Then, for each group you call *getGroupById* to get the group and call *addMember* on the group. As the name suggests, this will register the user with that group. When you're done, it's a matter of printing something out to the person running the import.

To run this on your site, you'll need to put this into the *Extensions* directory of your Plone server and call it *import_users_with_groups.py*. Then you'll need to manually add the groups that you'll have for your site; this script doesn't create the groups for you. Then prepare the *.csv* file; if you have your users stored in some other system, you'll need to find some way to get them into this format. Change the filename in the script to point to your filename. Next, add an external method to your Plone site, with the following values:

  - **ID**: *import_users_with_groups*

  - **Module name**: *import_users_with_groups*

  - **Function name**: *importUsers*

Once you've added this external method, click Test to run the method, and you'll get the result!

(Changing User Settings）

改变用户设置
......................

If you install a new product or make a new setting, it can be necessary to change user metadata in bulk. For example, if you install a new WYSIWYG editor and want this to be default for every user, then two things need to occur:

  - Change the default setting for every new user. To do this, click *portal_metadata* and select the Properties tab. Set the default there, and all new users will get this value.

  - Alter the settings for every existing user, which can be done only with the following external method:

::

 def fixUsers(self):
     pm = self.portal_membership
     members = pm.listMemberIds()
  
     out = []
     for member in members:
         # now get the actual member
         m = pm.getMemberById(member)
         # get the editor property for that member
         p = m.getProperty('wysiwyg_editor', None)
  
         out.append("%s %s" % (p, member))
         if p is not None and p != 'Epoz':
             m.setMemberProperties({'wysiwyg_editor': 'Epoz',})
             out.append("Changed property for %s" % member)
     return "\n".join(out)

Put this code in a Python module in the *Extensions* directory of your Plone instance. Call the module *fixUserScript.py*. Then in the ZMI, add an external method with the following parameters:

  - **ID**: *fixUsers*

  - **Module name**: *fixUserScript*

  - **Function name**: *fixUsers*

Click the Test tab to run the code. It'll run through every member in your site and set the value for the WYSIWYG editor to *"Epoz"*. It does this by first getting a list of every member; there's a method on *portal_membership* called *listMemberIds* that does this for you. For each of the members, it examines the property used by Plone to determine the editor (in this case, the *wysiwyg_editor* property). If that property isn't *"Epoz"*, then it calls *setMemberProperties* to change it.

This is a useful way to loop through all your members. Then using the *setMemberProperties* and *getProperty* methods, you can examine or alter any of the member properties that a user may have.

(Calculating the Other Users in a Group)

获取属于组的用户
......................................

I discussed earlier with you the possibility of sending an e-mail to all the people in a workgroup for an object. You could add this to workflow, but first you need a script to do that. This example uses a couple of functions to get at the users. The following is the *getGroupUsers* script, which takes an object and returns a list of users:

::

 ##parameters=object=None
 # object is the object to find all the members of the same group for
 users = []
 # get the creator
 userName = object.Creator()
 user = context.portal_membership.getMemberById(userName)
 pg = context.portal_groups
  
 # loop through the groups the user is in
 for group in user.getGroups():
   group = pg.getGroupById(group)
  
    # loop through the users in each of those groups
   for user in group.getGroupUsers():
     if user not in users and user != userName:
       users.append(user)
  
 return users

In this script, you're given an object, so you need to find the creator of that object by calling the method *Creator*. Once you have that user, you can call *getGroups*, and a method of the user object lists all the names of all the groups a user is in. After that, you get each of those groups, and from that list you get the usernames for a group. So, finally, you have each username. Now for each of those users, you want only users who aren't duplicates or aren't the original person who made the change to the object. The user list will contain all the other users in the same groups as the person who owned the object.

 You could plug this into your workflow e-mail notification script from Chapter 7 to enhance it. For example, for the workflow e-mail notification script, you may recall that you did the following:

::

 for user in mship.listMembers():
     if "Reviewer" in mship.getMemberById(user.id).getRoles():

This loops through every user and checks if they have the membership role. The previous script was called *getGroupUsers* and placed in the *portal_skins/custom* folder. This means you can access it through the context namespace through acquisition; in short, *context.getGroupUsers(object)* will return you the users:

::

 users = context.getGroupUsers(object)
 for id in users:
     user = mship.getMemberById(id)

Now you're sending an e-mail to everyone in the group instead of all reviewers!

(User Information in Page Templates)

页面模板程序中的用户信息
..................................

In Chapter 6, you made a page template that allowed a user to give feedback to the site administrator through a form. In that form, an input box allowed a user to type in an e-mail address, which you then validated. However, if a user is logged in and you know the e-mail address, then it'd be nice to fill it in automatically for the user.

The existing code for the input box is as follows:

::

     <input type="text" name="email_address"
            tal:attributes="tabindex tabindex/next;
                            value request/email_address|nothing" />

Now, if a value for e-mail exists in the request from an earlier attempt at filling out the form, then you should show that. If not, then you can see if an e-mail address exists for the current user. The following changes to the form will ensure that the e-mail address is filled in:

::

     <input type="text" name="email_address"
     tal:define="user context/portal_membership/getAuthenticatedMember;
                 email user/email|nothing"
            tal:attributes="tabindex tabindex/next;
                            value request/email_address|email|nothing" />

(Debugging and Understanding Security）

调试理解安全性
....................................

I've found that security is not only one of the hardest parts of Plone to understand, but it's one of the hardest to debug and test. Because the model is granular and complicated, it can be extremely difficult to find why and where an error occurs. Sometimes the error message or information given is hard to decipher or is hard to find any information about at all.

Testing security is also slightly harder because in sites with lots of roles, you should do a full regression test with each of those users in each of the situations. Because of the cost involved, though, people often don't do these full regression tests. Furthermore, having a bug in security is probably the worst thing that can occur on a site if it leaks confidential information. Plone will let you do whatever you want; it will happily let you shoot yourself in the foot, so be careful!

VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a>
,,,,,,,,,,,,,,,

VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a> is an add-on product included by default with the installers. You can also download VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a> from *<a href="http://hathaway.freezope.org/Software/VerboseSecurity">http://hathaway.freezope.org/Software/VerboseSecurity</a>*. As the name suggests, it provides a detailed error message when you can't do something in Plone because you aren't authorized. If you have given too lax of security settings, this product won't help you, though.

VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a> can run on a Plone server without causing a performance hit, so you can happily run this on your production and development server. There might be a minor bit of extra overhead caused when someone isn't allowed to perform something and an error is raised and the new security modules kicks in.

However, since the error message is detailed, you won't want to expose this to users. It explains far more about your system than a user should ever know! It'll never reveal passwords鈥攋ust information about the users, roles, and permissions. Of course, your production server will always be working perfectly, so there will be no need to install it on your production server.

The original implementation of the permission-checking routines were written in Python. As the API stabilized, and the developers realized the overhead that security caused, it was rewritten in C. By default, the faster C implementation is running, but this means that VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a> can't patch the permission module to be more verbose. I've rarely had to turn to this level of detail, though; usually I've found I can get enough information already. However, if you need more information, you'll need to run Plone with the following environment variable:

::

 ZOPE_SECURITY_POLICY=PYTHON

To get VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a> to work, all you need to do is ensure that VerboseSecurity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=VerboseSecurity" title="create this page">?</a> is in your *Products* directory (for more details on this, see Chapter 10) and then restart Plone. Go to the *cookie_authentication* object, which is the list of options for your site authentication, and in the form, change the option for *login_page* from *require_login* to empty, as shown in Figure 9-14.

 .. image:: img/3294f0914.png
     :width: 700 

Figure 9-14. Changing the login settings for your site

Now you can go and re-create the circumstances for the error you'd like to debug. *Remember to log in as the user who got the error*. This is where it's handy to have two different browsers accessing your Plone site: one for administering, one for testing. When the error occurs, an HTTP authentication dialog will pop up on the screen. At that point, hit Cancel, and you should now get a detailed error message, such as that shown in Figure 9-15.

 .. image:: img/3294f0915.png
     :width: 700 

Figure 9-15. A nice detailed error message

The message is rather long and self-explanatory. At this point I normally pop into the other browser and examine the permissions settings for the objects involved to see what the cause may be.

(Common Problems)

常见问题
,,,,,,,,,,,,,,,

A couple of problems are easy to spot when dealing with Plone. The first one is unrelated specifically to Plone but worth repeating: Check that the user who can create the error is the one you think it is. Often I've heard people say, 'Works in one browser and not in the other.锟?This is usually because when you've switched browsers, you've also switched users.

Continuing with the obvious, double-check that your user has the role you expect it to have. This may mean going to *acl_users*, seeing what user role they have, and double-checking it's the one you expect. Next, think of any groups that a user may be in. Again, looking at *acl_users* will tell you this because users can get extra roles in a group. Finally, remember that a user's role can also be altered by local roles on folders or objects; this is a little harder to narrow down because there's no easy to way to tell what folder or objects have local roles.

Once you're sure who the user is and the role they have on an object, you'll be able to see what the permissions for an object actually are. As you've seen, two similar objects (for example, two documents) can have different permission and different roles. The user who creates the document will have the owner role for that document, and another user will just have the member role on it. Because workflow changes the permissions on a document as it moves through workflow states, this will also change the permissions.

(Locking Down Plone)

锁定Plone
,,,,,,,,,,,,,,,,,,

There isn't really an easy way to do this since there really is no concept of a 'locked-down锟?site. However, the basic principle is that users should be able to do the minimum they need to do and nothing more鈥攕o you may want to double-check the default settings and remove those security settings they don't need.

For the really paranoid, you can also start removing features from the User Interface (UI) to stop users going wandering by modifying the Cascading Style Sheets (CSS). Of course, remember that just removing the tab for an action or denying access to a page template isn't enough if a user could still, say, edit a document. With knowledge of Plone, they could go and run the page from a script or other malicious mechanism. Often in Plone you'll find that if you try hard enough, you can get to the edit page of a document you're viewing by hacking the uniform resource locator (URL). However, you won't actually be able to edit the page; you'll just be able to call up the edit form.

If your server is running in the wild without restricted access, then ensure that you're running another Web server in front of Zope's ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=ZServer" title="create this page">?</a>. As I discuss in Chapter 10, the ZServer<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=ZServer" title="create this page">?</a> that comes in the package is a simple implementation without all the checks and security a real Web server needs. Consider proxies, if possible, for other Zope services such as FTP and WebDAV<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=WebDAV" title="create this page">?</a> if you're going to let untrusted users at these services (this isn't normally the case).

(Integrating Plone with Other Services)

与其它系统服务集成
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following sections cover security outside of a Plone instance (for example, all the security settings you need to actually run Plone on a server). Then I cover using Plone with LDAP so that you can have users from an external server be used in Plone.

(Security on Your Server)

服务器安全性
.......................

I've covered the security of users within the Plone system, but there's one other important issue: the security and setup of your Plone server within your operating system. As with any Web application, getting the security right for your server before exposing it to the world is critical. The install process for Zope 2.7 is pretty good and gets most of this right for you, but there are a few things to note, which I'll present to you now.

User Running Zope

运行Zope的用户账户
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

You should ensure that the user running Zope has the minimum amount of security needed to complete the task. The user running Zope will need to be read and write to all Zope directories on the file system. The user will need to write the directories that contain the logs and database of your Zope instance; those are the *var* and *log* directories of your Zope instance.

The best way to do this on Linux is to add a dedicated user account called, say, *plone*, that will handle this; you can then limit the access of that user in the unlikely event of Plone being hacked.

On Linux, if you want to have Plone bind to low-numbered ports (below 1024) such as 21 or 80, then you'll normally need to run Plone as root. It'll bind to these ports as root and then change to another effective user. To do this, you must specify a value for *effective-user* in the configuration file, *zope.conf*. It'll then do the bind and change to that user; an example of this is *effective-user zope*. The best alternative isn't to do this at all but instead to run Zope on a high port such as 8080; you can then protect that port at the firewall and use Apache or other Web server to run on port 80 and proxy through to port 8080. Chapter 10 covers more about this topic.

The equivalent on Windows is the user who runs the service; by default, this is the *LocalSystem<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LocalSystem" title="create this page">?</a>* account. Again, you can change the user that Plone runs as. If you're trying to run Plone on a Windows computer that doesn't have services (which I don't recommend or support), then Plone will be running locally as the user who started the server manually.

Some products may require the installation of extra software that provides features such as image manipulation, document conversion, and so on. If you've installed any of these tools, then bear in mind that they may require a bit of work so that they'll interact with your Plone site successfully. For example, I installed *pdftohtml* on Windows for Portable Document Format (PDF) conversion, but for the command to be read, I had to run the service as a user with more privileges so Zope could interact with this software. In this case, since the server was behind a firewall, this wasn't a problem.

(Getting Emergency Access)

获取紧急用户账号
,,,,,,,,,,,,,,,,,,,,,,,,

If you've got a Plone site but can't access the ZMI because you don't know or have forgotten the password, then you can get an emergency access account. To do this, you need to have file system access to the instance of your Plone site. If you don't have this, you'll need to find some way to do this first.

To do this, go to the root of your instance and call the *zpasswd.py* script. You'll find this script in your Zope directory (in *ZOPE_HOME*). On my computer the script *zpasswd.py* is located in */opt/Zope-2.7/bin/zpasswd.py*. So, to create a password, you'd do the following:

::

 $ cd /var/zope
 $ python /opt/Zope-2.7/bin/zpasswd.py access
  
 Username: emergency
 Password:
 Verify password:
  
 Please choose a format from:
  
 SHA - SHA-1 hashed password
 CRYPT - UNIX-style crypt password
 CLEARTEXT - no protection.
  
 Encoding: SHA
 Domain restrictions:

This will create a file *access* in your Zope instance. Now restart Zope, and log into the ZMI using that username and password entered in that script. This user has a special meaning in Plone and is called the *emergency user*. Once you've logged in as an emergency user, you can't create objects, but you can now create a new user for yourself and log in as that user. For security reasons, you should then delete the *access* file.

Getting Emergency Access on Windows

获取紧急用户账号(Windows)
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

The Windows installation of Plone features a Graphical User Interface (GUI) application for easily getting emergency access. Select Start - Program Files - Plone - Plone, and click the Emergency User option. This allows you to create a new user, alter the current emergency user's password, or remove any emergency user, as shown in Figure 9-16.

 .. image:: img/3294f0916.png

Figure 9-16. Creating a new emergency user

To create a new user, click Create User. In the pop-up dialog box, add a username and password. This will create a file that contains the username and password on the file system. Similarly, clicking Change Password will alter that user's password. After adding or altering a password, you'll need to restart Zope. To restart Plone, go to the Control tab, click Stop, and then click Start. Next, click Manage Root, and give the username and password you just entered. You'll be logged in as the emergency user, which means you can't create objects, but you can now create a new user for yourself and log in as that user.

(Using External Authentication Systems)

使用第三方认证
.....................................

Plone stores all its users inside the Zope object database in a separate user list, as you saw in Chapter 8. As ever, this isn't perfect, and at some point you may want to use another service to authenticate your users. The most common alternative system is LDAP or Microsoft's Active Directory, which communicates using LDAP.

However, you may actually want to integrate with another application that stores its users in a relational database. At the time of writing, ActiveState<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=ActiveState" title="create this page">?</a>'s ASPN site uses Zope for all the content, but users can authenticate by using Microsoft's Passport system. Actually installing extra user authentication schemes is pretty straightforward thanks to excellent work by many developers. In the process of setting this up, I found that the hardest part was building the software and setting up the integration between systems.

 **CAUTION**	In the next section, you'll be playing around with the *acl_users* folders inside a Plone site. Never delete or alter the *acl_users* folder in the root of your Zope instance. If you do that and your user folder breaks for some reason (the server goes down, for example), your entire site will be blocked, and you'll no longer be able to get any access, even as an administrator. Make sure you change only the user folder in the Plone site!

(Using LDAP)

使用LDAP
,,,,,,,,,,

First, you need to set up an LDAP server, or something that communicates with LDAP, such as Active Directory (although apparently Active Directory has a few of quirks). In this example, I installed openLDAP on my Red Hat server and on my Windows server. For Windows, you'll find a precompiled version at *<a href="http://www.zope.org/Members/volkerw/LdapWin32">http://www.zope.org/Members/volkerw/LdapWin32</a>*. I tested it for Python 2.3.

Download and unzip the file, and then place the contents inside *c:\Program Files\Plone\Python\lib\site-packages*. Then install *LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a>*.

On Linux, you can find the openLDAP downloads at *<a href="http://www.openldap.org/">http://www.openldap.org/</a>*. The tested version includes the RPMs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=RPMs" title="create this page">?</a> *2.0.27-2.8.0* and *2.0.27-2.8.0*. After building this by following the instructions, I went to *<a href="http://python-ldap.sourceforge.net/">http://python-ldap.sourceforge.net/</a>*, downloaded the appropriate Python LDAP libraries, and built those. In my case, the tested version was *2.0.0pre05-1.i386.rpm*. Make sure you use the same Python interpreter you're using to run Plone.

After you've gone through those particular hoops, you need to make sure the *_ldap.so* module is importable by Python. The easiest way to test this is to run the following:

::

 $ python -c "import _ldap"

If you get no error messages, then it imported correctly. If you do get errors, then you'll have to retrace your steps. Then go and get *LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a>* from *<a href="http://www.dataflake.org/software/ldapuserfolder">http://www.dataflake.org/software/ldapuserfolder</a>*. The tested version was 2.1 beta 2. Download the file, untar it, and move it into the *Products* directory of your Zope installation. For example:

::

 $ tar -zxf LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a>-2_1beta2.tgz
 $ mv LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a> /var/zope/Products

Now restart Plone, go to the control panel, and ensure that it shows up correctly in the Products page of the control panel. I provide more details on this in Chapter 10.

Next, in Plone you should be able to click *acl_users*, click Sources, and then scroll down to the *Users source #1* option. Then select *LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a>*, and check *I'm sure*, as shown in Figure 9-17. This will create a new user folder and replace the existing one, so make sure you aren't about to lose anything critical. In fact, now is a good time to do a backup. Then click OK.

 .. image:: img/3294f0917.png
     :width: 700 

Figure 9-17. Adding an *LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a>*

In the *LDAPUserFolder<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=LDAPUserFolder" title="create this page">?</a>* settings, add the settings that match your existing LDAP settings. You should now be able to click the Users tab and search for users that already exist in your LDAP directory.

Relational Databases and Others

关系数据库及其它
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

An excellent user folder replacement is called *exUserFolder*, which stands for *extensible user folder*. This one is easy to install; just download it from *<a href="http://prdownloads.sourceforge.net/exuserfolder/exUserFolder-0_20_0.tgz">http://prdownloads.sourceforge.net/exuserfolder/exUserFolder-0_20_0.tgz</a>*, do the usual unzip dance, and copy it into your *Products* folder. Again, after restarting Plone, you should be able to click *acl_users*, select Sources, and then scroll down to the *Users source #1* option. Then select exUserFolder, and check *I'm sure*.

Actually, *exUserFolder* will authenticate against the following:

  - Radius

  - SMB

  - LDAP

  - Relational databases

To do this, you'll need to install the specific database adapter for the relational database; fortunately, adapters for all the major databases are covered. For more information, you can find excellent information in the *exUserFolder* directories with *ReadMe<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter9/createform?page=ReadMe" title="create this page">?</a>* files on almost every subject. The Zope book covers setting up access to a relational database at *<a href="http://zope.org/Documentation/Books/ZopeBook/2_6Edition/RelationalDatabases.stx">http://zope.org/Documentation/Books/ZopeBook/2_6Edition/RelationalDatabases.stx</a>*.


$Id: ch9.rst,v 1.3 2004/07/09 08:23:04 zopezen Exp $
