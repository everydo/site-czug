第七章
---------

.. Contents:: 内容：

:翻译: 潘俊勇

(Customizing the Look and Feel of Plone)

定制Plone的外观
==========================================

Over the previous two chapters I've covered some of the core components of Plone's user interface, including Script (Python) objects and page templates. It's now time to cover exactly how you construct the look and feel of a Plone site. This chapter includes the objects from previous chapters and introduces some new ones.

前面两章，我已经覆盖了Plone用户界面的核心组件，包括Script(Python)对象和页面模板。现在是开始具体如何定制Plone站点外观的时候了。本章包括前面章节的一些对象，同时介绍了一些新的对象。

To start, I'll cover all the key definitions and Plone elements that comprise a site. I'll define terms you may have already heard of, such as *skins* and *layers*. Then I'll cover customizing the Plone user interface, concentrating on the power that Cascading Style Sheets (CSS) bring to the site developer. I'll run through the key variables and show how you can change them. I'll then revisit the customization of logos and skin elements, pulling together all the topics I've briefly covered over the past three chapters.

开始前，我将解释全部的主要定义和站点包含的Plone元素。我将定义你可能已经听过的术语，比如 *皮肤skins* 和 *层layers*. 接下来我将讲述Plone用户界面的定制，主要是CSS带给网站开发人员的强大功能。我将快速讲解主要的变量，展示如果和改变他们。然后，我将重游logo和皮肤元素的定制，把前面三章中包含的所有主题联系起来。

Then, I'll show how to make a new skin and explain the techniques for developing all this on the file system.

接下来，我将展示如何制作一个新的皮肤，并解释在文件系统中完成这些的相关技术。

Finally, I'll finish this chapter with an example site. Specifically, I'll show the Maestro site, which was used by NASA to distribute data about the Mars rovers. This is a high-traffic Web site built in Plone, and the skin provides an excellent case study for customizing a site. This real-life example of how you can customize and modify a Plone site will enable you to do the same on your own.

最后，我将使用一个样例完成本章。更确切些，我将展示Maestro网站，这是NASA（美国国家航天和宇宙航行局）用于发布火星漫游者数据的网站。这是一个使用Plone构建的高访问量的网站，他的皮肤是一个定制网站的优秀案例。这个如何定制和修改Plone站点的实际样例，将让你能自己能做出相同的。

(Introducing Plone Skins)

介绍Plone的皮肤(Skins)
~~~~~~~~~~~~~~~~~~~~~~~

When a document displays in Plone, the content of that document displays in the now-familiar Plone green and blue interface. A *skin* determines exactly how that document displays to the user, including the images and styles surrounding the content. A skin groups elements, wrapping that piece of content, and presents them in a certain manner.

当文档在Plone中显示的时候，文档的内容出现在已经熟悉的Plone的绿色和蓝色界面中。一个 *皮肤* 决定了文档如何显示给最终用户，包括内容周围的图片和样式。一个皮肤聚集了相关的元素，把那片内容包装起来，以某种方式展现出来。

To generate the representation that a user sees, a skin has many elements, including the static items, such as images, and the dynamic pieces, such as scripts. In the previous chapter, the feedback form was an example of adding a few elements to a skin to create new elements of a skin. That example contained logic in the format of a Python (Script) object and new pages in the format of page templates. You added those elements to the skin so that a user could interact with the form.

要生成用户看到的样子，皮肤有很多元素，包括静态的，如图片；和动态的，如脚本。在前面的章节中，那个留言表单是一个添加元素到现有皮肤中的一个例子。这个例子包括Python(Script)形式的对象和一个页面模板形式的新页面。你添加了这些元素到皮肤中，这样用户就可以使用表单进行交互了。

You can use as much or as little of an existing skin as you want to assemble a new skin with Plone. You can make the skin from minor tweaks or major changes, as you can see on community sites such as *<a href="http://www.zopezen.org">http://www.zopezen.org</a>* and *<a href="http://www.zopera.org">http://www.zopera.org</a>*. Each Plone site must have at least one skin, which will be used as the default, but it can have as many skins as the site developer wants. A user may optionally flip between skins, should the site developer want to allow the user to do so, although I've found this is rarely the case.

你可以选用已有皮肤来随意整合出你想要的新皮肤给Plone。你可以仅做少许修改或者给出一些较大的改动，正如你在 *<a href="http://www.zopezen.org">http://www.zopezen.org</a>* 和 *<a href="http://www.zopera.org">http://www.zopera.org</a>* 这样的公众站点上所看到的那样。每一个Plone站点至少要有一个皮肤，它将是默认的皮肤。此外该站点还可以同时拥有多个皮肤，随开发者所愿。站点开发人员还可以让用户随意择取那些皮肤，尽管我发现这并不常见。

The default Plone skin is the one you see on a Plone site such as *<a href="http://www.plone.org">http://www.plone.org</a>*, with the familiar blue and green interface. But Plone doesn't have to look at all like, or be even vaguely recognizable as, a Plone site; its look is entirely up to you. Take, for example, the list of sites available at *<a href="http://www.plone.org/about/sites">http://www.plone.org/about/sites</a>*; these sites each provide a different and custom experience for the user. In most cases, these sites can easily flip between skins and provide different looks for users. Other sites use the power and flexibility of the Plone interface internally for creating and editing content while providing a totally different look to external users.

默认的Plone皮肤就是你在类似于 *<a href="http://www.plone.org">http://www.plone.org</a>* 这样的Plone站点上所见，那个带着平易近人的蓝色和绿色的用户界面。但是Plone未必一定要在外观上千篇一律，或者依稀可以认出是一个Plone站点；其观感全然取决与你。感受一下，作为范例，你可以在 *<a href="http://www.plone.org/about/sites">http://www.plone.org/about/sites</a>* 得到那些站点的列表；它们提供了各不相同且可定制的用户体验。在大多数的案例中，这些站点可以很容易地在皮肤之间切换并为用户提供不同的观感。另一些站点使用强大的并且具有弹性的Plone(编辑)接口在内部创建和编辑内容，而向外部用户提供另一种完全不同的观感。

I've seen many questions on mailing lists such as, does Plone have to look like a Plone site? Can it look one way to one user and another way to another user? Can it look like my corporate site? The answer to all of these questions is "yes": the only limit is your imagination (and the amount of time you can spend on customizing your site).

我在邮件列表上看到过许多诸如这样的问题：Plone必须得看起来像是一个Plone站点吗？可以给一个用户一种观感，给另一个用户另一种观感吗？它能变成我们的那个站点的样子吗？对于所有这些问题的答案都是“Yes”：唯一的限制是你的想象力(还有你可以花在定制你的站点上的时间)。

Using Layers Within a Skin

在皮肤中使用层
..........................

A skin is divided into logical collections of templates and scripts called *layers*. Altering these individual collections allows a user to easily add components to a skin or remove them. The layers are represented in a skin by a hierarchical list of folders. Each layer matches a name of a folder, and each folder contains the skin elements.

皮肤是由一系列逻辑相关的模板(templates)及脚本(scripts)的集合所构成的，这些集合被称作 *层layers* 。通过修改这种集合可以让用户轻松地向皮肤添加或移除构件资源。皮肤使用一系列分级的文件夹列表来描述这些层。每一个层对应着一个文件夹的名字，而这些文件夹中则保存着皮肤的构件资源。

For example, a skin can have the following layers:

举个例子，一个皮肤包含下述层:

::

 custom, gruf, plone_ecmascript, plone_wysiwyg ...

The order of the layers in that list is the key factor to how Plone finds the elements. When an element, such as *logo.jpg*, is requested from the skin, the skin looks through the layers to find the element. The skin starts by looking at the first layer assigned to that skin (in this example, *custom*). If the skin can't find the element in the first layer, it moves to the second layer (in this example, *gruf*). It continues looking through the list of layers until it finds the element for which it's looking. If it can't find the element, then a 404 error is raised and returned to the browser.

这个层列表是Plone赖以寻找其构件资源的主要依据。当资源，如 *logo.jpg* ，为皮肤所需，此皮肤就会遍历这些层来查找这个资源。皮肤首先从它第一个层(本例中，*custom*)中开始寻找。如果皮肤不能在第一个层中找到这个构件，它转向第二个层(本例中，*gruf*)。它会不断在这个层列表中依次查找直到找到所需的构件。如果找不到该构件，将会抛出一个404错误返回给浏览器。

A similar concept is the use of the PATH environment variable in most systems. When entering a command or looking for a program, the operating system looks through the directories on the file system as specified in the PATH environment variable. A similar approach happens for layers, where the layers are looked through in order to find that element.

这和许多系统中PATH环境变量的概念相类似。当敲入一条命令或查找某个程序，操作系统会依照PATH环境变量对文件系统上的目录进行遍历查找。层的作用与之相近，它指出了用于寻找资源的位置。

By allowing higher layers to take precedence over lower layers, developers and administrators now have the ability to customize and manipulate their site through the layers. If you don't like a particular element of a Plone skin, then by moving that element up a layer, you can custom the result. You can sort your skins and layers in Plone with the *portal_skins* tool, which I'll cover next.

通过赋予上级层高于下级层的优先级，开发者和管理员就可以通过层来得到定制以及掌控其站点的能力。如果你不喜欢某些Plone皮肤的构件资源，那么可以将那些构件资源转移到一个更高的层，让自己来定制出最终的结果。你可以在Plone中使用 *portal_skins* 工具来组织你的皮肤和层，下面我就来介绍它。

Managing Skins with the portal_skins Tool

在portal_skins工具中管理皮肤
.........................................

You use the *portal_skins* tool in Plone to define the skin and layers behavior. The *portal_skins* tool also provides a service and application programming interface (API) for creating and using skins.

你使用Plone中的 *portal_skins* 工具来定义皮肤和层的行为。*portal_skins* 工具同时还提供了创建和使用皮肤的服务以及应用编程接口(API)。

To access the *portal_skins* tool, go to the Zope Management Interface (ZMI) and click *portal_skins*. You'll see two key screens in the ZMI; the first, the Contents tab, shows all the folders and file system directory views (FSDVs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=FSDVs" title="create this page">?</a>) located within this tool (see Figure 7-1).

访问 *portal_skins* 工具，请往Zope管理界面(ZMI)然后单击 *portal_skins* 。你会在ZMI中看到两个关键屏幕; 其一，是内容(content)标签页，显示了位于工具中所有的文件夹及文件系统目录视图(即FSDVs，见图7-1)。

 .. image:: img/3294f0701.png

Figure 7-1. The contents of the *portal_skins* tool in a standard Plone installation

图7-1。标准Plone安装中 *portal_skins* 工具的内容视图。

All of the folders and file system directory views on the Contents tab aren't layers by default, but now you can turn them into layers. Further, the second important screen, the Properties tab, shows all the skins and layers you've defined in your Plone site (see Figure 7-2).

内容页上所有的文件夹及文件系统目录视图(FSDVs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=FSDVs" title="create this page">?</a>)在默认的情况下并不是层，不过现在你可以将其转换为层。下面，第二个重要的屏幕，是属性(properties)标签页，显示了你定义在你站点中所有的皮肤与层(见图7-2)。

 .. image:: img/3294f0702.png

Figure 7-2. The skins and layers in a standard Plone installation

图7-2。标准Plone安装中的皮肤与层。

As Figure 7-2 shows, the list of these layers is quite long. Although this may seem intimidating, this hefty number of layers gives the developer a large degree of flexibility and reuse. Each skin displays on the left, with a text area to the right displaying all the layers within that skin. As I mentioned earlier, Plone searches the layers from the top to the bottom to locate elements. Each layer is the name of a folder or FSDV from the Contents tab. In Figure 7-2, you can see a *plone_ecmascript* directory, and in Figure 7-1 you can see the matching FSDV object.

由图7-2可见，层列表相当之长。尽管看似吓人，但是大量的层给开发者带来了相当程度的灵活性和复用性。皮肤依次显示在左方，一个携有该皮肤所有层的文本框相应地显示在右侧。正如先前我所说的那样，Plone从头至尾地查找这些层来定位资源。其中的层便是内容(content)标签页FSDB中文件夹的名字。在图7-2中，你可以看到一个名为 *plone_ecmascript* 的目录，而在图7-1中你可以看到一个对应的FSDV对象。

An FSDV is a new object that provides a useful ability in Plone; it allows direct access to skin elements that are defined on the file system instead of from the Zope object database as usual. FSDVs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=FSDVs" title="create this page">?</a> make development and customization easier. By reading objects directly from the file system, it's much easier for developers to write and edit the code that produces the site. When you install Plone, the skin is written onto the file system. When you customize an object, you make a local copy inside your Plone database. Using an FSDV allows you to maintain clean separation between code you've downloaded from the Web and code that has been customized in your local instance.

Plone 2 ships with two skins, Plone Default and Plone Tableless. Plone Default uses tables to render the main body flanked by two table cells on either side, containing the left and right slots. For browser compatibility, this is the default setup. However, if you switch to Plone Tableless, then you'll get a skin that looks the same, except there are no tables used to produce the page, which gives you, as the site developer, more flexibility. At the time of writing, the Plone Tableless skin can be a little problematic on some browsers, such as Internet Explorer. I hope in the future that the Plone Tableless skin will become the default.

To change the skin, scroll to the bottom of the form where you see the Default Skin value and select the default skin from the list of choices. If you select the Skin Flexibility option, then users will be able to choose their own skin from the *my preferences* section.

Returning to the Contents tab of the *portal_skins* tool, you can see that some of the folders-for example, *custom*-are standard folders that exist in Zope. These have the normal folder icon. Others-for example, *plone_images*-are FSDVs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=FSDVs" title="create this page">?</a> that point to areas of the file system. These have the folder icon with a green lock inside it. This lock indicates that you can't add or edit elements in an FSDV through the Web; you can do it only through the file system.

To see where the files for an FSDV reside on your hard drive, click the Properties tab of the FSDV. For example, from the Contents tab of the *portal_skins* tool, click Properties, and it will list the file system path of *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>/skins/plone_images*. This path is the location of this directory on the file system relative to the instance home you specified in the installation process. Because you can see files through the Web in the FSDV or on the file system, you can access them for reading either way. Because viewing files through a file system is generally more friendly and easy to do, I'll refer to a file as a path in the file system, which can be accessed using familiar tools.

Customizing Skins

定制皮肤
~~~~~~~~~~~~~~~~~

You've seen how skins and layers interact. Now you'll see how you can customize a Plone site. I'll start by returning to the example in Chapter 4, where you learned how to customize the logo. Using your new knowledge of how skins work, you'll be able to follow along and customize the skin. Then I'll move onto showing the power of the Plone CSS and how you can customize it. Finally, I'll cover the main template you saw in earlier chapters and go through all the elements of it.

Customizing the Logo, Revisited

再次定制logo
...............................

In Chapter 4 you learned how to customize the logo in the top-left corner of a Plone site, but I skipped over what was actually happening. The section revisits that example.

The *logo.jpg* image is the image that appears in the top-left corner of every page. You'll now look at what happens when a browser tries to render this page. Once Plone receives the request for that image, it looks through the layers to find *logo.jpg*. In a default site, this is the item in *plone_images*, called *logo.jpg*. Because this is an FSDV, as I mentioned earlier, you're unable to alter the image through the Web. To guard your site against future changes, you don't want to be able to change it on the file system either. Instead, take a closer look at what the Customize button does. If you look at that button again, you can see that there is, to the left of that button, a drop-down list of folders in the contents of the *portal_skins* tool.

**NOTE** The folders listed are ones that exist inside the Zope database. FSDVs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=FSDVs" title="create this page">?</a> aren't included in the drop-down list; by default, it shows only folders.

Clicking the Customize button makes a local copy of the item in the folder selected in the drop-down box. By default that folder is the *custom* folder, so now you have a copy in the *custom* folder. When Plone looks up the item, *logo.jpg*, it will access the version in the *custom* folder. Looking again at the layers for the Plone Default skin, the *custom* folder is the topmost layer of the skin. Hence, when *logo.jpg* is called, it will find the image in the *custom* layer. This is why the new *logo.jpg* is rendered.

Placing customized items into the *custom* folder is the quickest way to start tweaking your Plone site. The custom folder is a standard Plone folder, so you can put as many items in there as you want in order to override earlier elements.

Introducing Plone's Cascading Style Sheets

介绍Plone的CSS
..........................................

The visual representation of a Plone site in a browser is put together almost entirely using CSS. Perhaps the easiest way to see exactly what the CSS does for a Plone site is to compare Figures 7-3 and 7-4. The first shows Plone with style sheets, and the second shows Plone without any style sheets.

 .. image:: img/3294f0703.png

Figure 7-3. Plone with style sheets

 .. image:: img/3294f0704.png

Figure 7-4. Plone without style sheets

**TIP** If you want to reproduce this, turn off style sheets in your browser. Internet Explorer doesn't let you easily do this, but Firefox (*<a href="http://www.mozilla.org/products/firefox/">http://www.mozilla.org/products/firefox/</a>*), the Mozilla-based open-source browser, lets you easily do this. In Firefox, select Tools - Web Developer - Disable - Disable Styles. With a large number of CSS and other developer tools, Firefox is the browser of choice for many Plone developers.

The difference is striking to say the least. CSS provides not only the visual representation of pages but also the layout. By changing the CSS, you can change this visual representation and layout on a Plone site (within the constraints of CSS).

 Having the presentation of Plone produced by CSS is an impressive achievement used by many talented user interface developers. The following are some of the benefits of having a CSS layout:

  - CSS provides a layer of separation between the presentation and the templates that generate the presentation.

  - You can make a large number of changes without having to touch the underlying templates. All that's needed is an experienced CSS developer.

  - CSS makes the site faster by sending smaller files. Each Hypertext Markup Language (HTML) file is smaller since the layout for the site isn't contained in HTML markup but in the CSS, which can then be cached.

  - CSS allows you to customize the look and feel without breaking underlying accessibility work.

Code Layers

代码层
###########

When a Plone page is rendered, at least three layers of code create a page. For the example of the tabs that appear across the top of a Plone site, this is how they're assembled:

So rather than asking yourself, how can I customize the tabs? you need to consider exactly what customization you want to perform. This could mean changing the CSS, the HTML, the data, or the underlying tabs. The general rules are as follows:

In fact, Plone is so customizable, on so many levels, that it's easy to worry about which bit to customize. To make sure that future Plone template changes don't compromise your application's design, try not to customize the templates. Instead, I recommend you try the CSS or the actions first. This way, when the templates change in future versions of Plone, there will be less chance of a problem.

Customizing the Font, Colors, and Spacing

定制字体、颜色和间距
.........................................

The actual style sheet that does most of the work, *plone.css*, has a number of variables in it populated using Dynamic HTML (DTML). I do not cover DTML in this book; this is probably the only use of it in Plone, so if you don't already know DTML, I recommend you avoid learning it, if possible! The Zope Page Templates system will give you everything you need. Excellent online references do exist for DTML for Zope, however; refer to *<a href="http://zope.org/Documentation/Books/ZopeBook/2_6Edition/DTML.stx">http://zope.org/Documentation/Books/ZopeBook/2_6Edition/DTML.stx</a>*.

The DTML syntax for this style sheet is actually pretty simple; each variable relates to a corresponding attribute in a property sheet. To access this property sheet, click *portal_skins*, *plone_styles*, and then *base_properties*. In Figure 7-5, you can see how this file looks in the ZMI.

 .. image:: img/3294f0705.png

Figure 7-5. The base properties for the style sheet

For example, *dtml-fontColor;* locates the variable *fontColor* and places it in the style sheet, so the *fontColor* here will be black. Now you can see where that variable is referenced in the *plone.css* file. To access the CSS file, click *portal_skins*, *portal_skins*, and then *plone.css*. In this file you can see that *mainFontColor* is referenced in quite a few places; for example, it's referenced in the main body of a page, like so:

::

 body {
     font: dtml-fontBaseSize; <dtml-var fontFamily>;
     background-color: dtml-backgroundColor;;

     color: dtml-fontColor;;

     margin: 0;
     padding: 0;
 }

You could keep reading through the style sheet, if you really wanted, but changing the variable is always a quick way to see exactly what it affects.

Returning to the ZMI, click *portal_skins*, click *plone_styles*, click *base_properties*, and then click the Customize button. As you've seen, this will create an object in the ZMI that you can customize. This time the customized object is actually a folder that has the properties contained in the folder. To access the properties you've just customized, click *portal_skins*, click *custom*, and then click *base_properties*. Next, select the Properties tab (see Figure 7-6).

 .. image:: img/3294f0706.png

Figure 7-6. The properties of the folder

This property list allows you to change the properties of *mainColor* to something different, for example, *red* or *#cc9900*. Change the value of that property, and click Save Changes. Returning to the Plone site, you should now see the nice, new color.

In Chapter 4 you saw an example where, to change a tab on the top of a page, users could change the actions. Although you may type an action with an uppercase first character (such as *Members*), it then displays in lowercase letters on the Web page. This because CSS transforms the text to lowercase because of the *textTransform* property in the property sheet. To stop this transformation, change the property for *textTransform* to *none*.

In the style sheet, properties are defined for all the colors, spacing, and fonts that are used in a Plone site. Table 7-1 describes all the parameters.

Table 7-1. CSS Properties

========================== =============================================================================
Variable Name              Description
========================== =============================================================================
logoName                   The filename of the portal logo
-------------------------- -----------------------------------------------------------------------------
fontFamily                 The font family used for all text that isn't a header
-------------------------- -----------------------------------------------------------------------------
fontBaseSize               The base font size from which everything is calculated
-------------------------- -----------------------------------------------------------------------------
fontColor                  The main font color
-------------------------- -----------------------------------------------------------------------------
backgroundColor            The background color
-------------------------- -----------------------------------------------------------------------------
linkColor                  The color used on normal links
-------------------------- -----------------------------------------------------------------------------
linkActiveColor            The color used on active links
-------------------------- -----------------------------------------------------------------------------
linkVisitedColor           The color used on visited links
-------------------------- -----------------------------------------------------------------------------
borderWidth                The width of most borders in Plone
-------------------------- -----------------------------------------------------------------------------
borderStyle                The style of the border lines (usually solid)
-------------------------- -----------------------------------------------------------------------------
borderStyleAnnotations     The style of border lines on comments, and so on
-------------------------- -----------------------------------------------------------------------------
globalBorderColor          The border color used on the main tabs, the portlets, and so on
-------------------------- -----------------------------------------------------------------------------
globalBackgroundColor      The background color for the selected tabs, portlet headings, and so on
-------------------------- -----------------------------------------------------------------------------
globalFontColor            The color of the font in the tabs and in portlet headings
-------------------------- -----------------------------------------------------------------------------
headingFontFamily          The font family for *h1*, *h2*, *h3*, *h4*, *h5*, and *h6* headlines
-------------------------- -----------------------------------------------------------------------------
headingFontBaseSize        The base size used when calculating the different headline sizes
-------------------------- -----------------------------------------------------------------------------
contentViewBorderColor     The tabs' border color on the Contents tab
-------------------------- -----------------------------------------------------------------------------
contentViewBackgroundColor The content view tabs' background color on the Contents tab
-------------------------- -----------------------------------------------------------------------------
contentViewFontColor       The font color used in the tabs on the Contents tab
-------------------------- -----------------------------------------------------------------------------
textTransform              Whether to lowercase text in portlets, tabs, and so on
-------------------------- -----------------------------------------------------------------------------
evenRowBackgroundColor     The background color of even rows in listings
-------------------------- -----------------------------------------------------------------------------
oddRowBackgroundColor      The background color of even rows in listings
-------------------------- -----------------------------------------------------------------------------
notifyBorderColor          The border color of notification elements eg: status message and the calendar
-------------------------- -----------------------------------------------------------------------------
notifyBackgroundColor      The background color of notification elements
-------------------------- -----------------------------------------------------------------------------
helpBackgroundColor        The background color of the calendar pop-up widget
-------------------------- -----------------------------------------------------------------------------
discreetColor              The color of the credits, document byline, form help
-------------------------- -----------------------------------------------------------------------------
portalMinWidth             The minimum width of the portal
-------------------------- -----------------------------------------------------------------------------
columnOneWidth             The width of the left column
-------------------------- -----------------------------------------------------------------------------
columnTwoWidth             The width of the right column
========================== =============================================================================

Customizing the CSS

定制CSS
...................

If you have small customizations, place them in *ploneCustom.css*. This is a second style sheet that's loaded after *plone.css*. By using the cascading functionality of style sheets, you can apply any changes to *ploneCustom.css* to the overall style sheet.

For example, to change the byline that appears on the bottom of every page, simply change *ploneCustom.css*. Again, access that file through the ZMI, and then click Customize. This will create a copy of that style sheet in the *custom* folder. To alter the byline, move it to the left side of the page and make it bold, as shown in Figure 7-7.

 .. image:: img/3294f0707.png

Figure 7-7. The new bold byline on the left

You do this by adding the following:

::

 div.documentByLine {
     text-align: left;
     font-weight: bold;
 }

Here you've set two attributes for the *byline* element: *text-align* and *font-weight*. Note that you haven't changed any other attributes of the *byline* element; the remaining attributes are inherited from the original style sheet. With a few simple lines of CSS, you've changed the site and made sure that other changes to Plone won't affect your site. Changing *ploneCustom.css* is the best bet for small changes.

By using different style sheets, you can use Plone to provide a different look to different clients. Often Web sites have a Click for Printable Page button that shows a simpler page, without much formatting. Plone alleviates this problem by providing a separate style sheet; when a browser prints the page, that style sheet formats the page. All the alternate style sheets are included at the top of a page; you can find them by clicking *portal_skins*, clicking *plone_templates*, and then clicking *header.pt*.

**NOTE** One style sheet that's a little unusual is the projection style sheet. It's supported only by Opera, and when the browser is used in full-screen mode, headings turn into separate pages and a presentation-like interface displays.

Customizing the Main Template

定制主模板
.............................

As you saw in the previous chapter, to get the Plone look and feel on a page, you need to use the *master* macro from the *main_template*. Every Plone page uses this macro and then fills in the appropriate slots. By taking a look at the main template in detail, you can see how a Plone page is constructed in a page template and then see exactly how you can customize those individual page elements.

If you look at the main Plone page, you'll see a number of elements in that page. Figure 7-8 shows a Plone page with all the key user interface elements marked. Table 7-2 describes each of the elements and their purpose. For each element in Figure 7-8, you'll find a corresponding number in the table.

 .. image:: img/3294f0708.png

Figure 7-8. All the main elements in the Plone user interface


Table 7-2. User Interface Elements

=== =============================== =================================================================================
No. Name                            Description
=== =============================== =================================================================================
1	Site logo                       Shows the top logo.
--- ------------------------------- ---------------------------------------------------------------------------------
2	Search form                     Shows the search form.
--- ------------------------------- ---------------------------------------------------------------------------------
3	Portal tabs                     Shows the tabs across the top of the site.
--- ------------------------------- ---------------------------------------------------------------------------------
4	Personal bar                    Shows the personal information for that user such as *login* and *my folder*.
--- ------------------------------- ---------------------------------------------------------------------------------
5	Breadcrumbs                     Shows the location of the current content.
--- ------------------------------- ---------------------------------------------------------------------------------
6	Left slot                       Determines where portlets added to the *left_slot* property display.
--- ------------------------------- ---------------------------------------------------------------------------------
7	Content tabs                    Shows the actions with the category *content_tabs* for that piece of content.
--- ------------------------------- ---------------------------------------------------------------------------------
8	Content drop-down lists         Shows some drop-down menus for this content, workflow and new content types.
--- ------------------------------- ---------------------------------------------------------------------------------
9	Document actions                Shows the actions for this particular piece of content: printing or e-mail. 
--- ------------------------------- ---------------------------------------------------------------------------------
10	Byline                          Shows a description of the content and its author.
--- ------------------------------- ---------------------------------------------------------------------------------
11	Right slo                       This is where portlets added to the *right_slot* property display.
--- ------------------------------- ---------------------------------------------------------------------------------
12	Footer                          Shows information at the bottom of the page.
--- ------------------------------- ---------------------------------------------------------------------------------
13	Colophon                        Shows more information below the footer.
=== =============================== =================================================================================

I haven't covered one section of this template: the content. All the text from *Welcome to Plone* down to *The Plone Team* is content added and edited by the users. This is the *main* slot in the page template, which is filled in by a the particular content type or page template, as you've seen. Chapter 6 covered using slots; in that chapter, I showed how, by using the *main* slot, you can ensure content appears inside a Plone page.

So, given these components of your Plone page, how do you customize a particular part? The answer is to find the matching part of the *main_template*, see which part it calls, and then customize that. For this reason, I'll cover the main template in detail.

At first glance, the main template looks quite long and complicated, but it's mostly all macros, and its main purpose is simply to pull content from other areas. You can find the main template by clicking *portal_skins*, clicking* plone_templates*, and then clicking* main_template*.

The philosophy behind the main template is that a user shouldn't have to alter the actual configuration of the template, unless there are major changes planned. Because the main template pulls all the content from other places inside Plone, you can alter the assembled page by customizing those individual elements. This means you can alter just the sections you'd like to change rather than altering the whole template.

The main template uses Extensible Markup Language (XML) namespaces heavily to present the simplest possible *metal* code. For example:

::

 <metal:headslot define-slot="head_slot" />
    <!-- A slot where you can insert elements in the header from a template -->

Here, the name of the tag isn't a standard Extensible HTML (XHTML) element; instead, it uses the *metal:* prefix to define a namespace as *metal:headslot*. This has the following advantages:

  - The element *headslot* is semantic, in that it describes the element. It's easy to spot that this is the slot for adding anything you may want to add to the head of your page.

  - Attributes in that element use the namespace in the element if not otherwise declared; so, instead of *metal:fill-slot*, you can just use *fill-slot*.

  - The actual tag isn't a valid XHTML tag, so it won't display. However, if the rendering of the tag generates any valid XHTML, that XHTML will display.

When a macro is used, the content in the calling template is removed, so it's possible to place comments in the calling template as text inside the macro. For example:

::

 <div metal:use-macro="here/global_searchbox/macros/quick_search">
     The quicksearch box, normally placed at the top right
 </div>

Because of the comment, it's easy to determine that this macro refers to the search box in the top-right corner of a site (element 2 in Figure 7-8). To see the macro, find the script named *global_searchbox* and the *quick_search* macro contained within it. The main template continues through *main* macros, pulling information from different templates and scripts, and builds the page as it goes.

After this section, the main template reaches the main content of the page, which is the object being rendered. In Chapter 6 I explained the difference between a slot and a macro; recall that a template defines slots that are then filled by the content. Really there's only one slot of any importance for content, and I've mentioned it many times: the *main* slot.

One common pattern in Plone that may be confusing is how to define a slot inside a fill slot. For example, the following is the definition for the *css_slot*:

::

 <metal:cssslot fill-slot="css_slot">
     <!-- A slot where you can insert CSS from a template -->
     <metal:cssslot define-slot="css_slot" />
 </metal:cssslot>

This design pattern looks a little odd, but it defines the slot and then re-creates the fill slot. If you look at the main template carefully, those slots are actually inside the header *use-macro*, so the header macro may fill this slot. But you also want the end template to fill the slot, so for this reason the slot is redefined. This means one slot can now be filled in two places, which is a useful technique for changing the templates.

Scanning down through the rest of main template, you'll reach the left and right columns, the footers, and the colophon. Note that the left column may appear before the main content of a page (if your language reads from left to right anyway), but the style sheet moves it there. This ensures that if you visit the site in a text-only browser, the main content appears first, not after all the navigation options.

Table 7-3 describes the macros and slots in the main template.

Table 7-3. Main Template Macros and Slots

 **Name	Description	Slot or Macro?**

Cache headers	Sets the Hypertext Transfer Protocol (HTTP) cache headers for the content.	Macro: *cacheheaders* in *global_cache_settings*

Head slot	Allows content to add to the *head* element of a page.	Slot: *head_slot*

CSS slot	Allows content to add custom CSS for the page.	Slot: *css_slot*

JavaScript<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=JavaScript" title="create this page">?</a> head slot	Allows content to add custom JavaScript<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=JavaScript" title="create this page">?</a> to the page.	Slot: *javascript_head_slot*

Site actions	The site actions allow you to have a series of actions above the search. By default these allow you to change the font size.	Macro: *site_actions* in *global_siteactions*

Quick search	The quick search box show in the top-right corner.	Macro: *quick_search* in *global_searchbox*

Portal tabs	The (normally blue) portal tabs that are normally at the top left. The actual tabs shown are determined by actions. This determines how the tabs are rendered in HTML.	Macro: *portal_tabs* in *global_sections*

Personal bar	The personal bar in the top right: login, logout, and so on.	Macro: *personal_bar* in *global_personalbar*

Path bar	The path breadcrumbs that start with "You are here."	Macro: *path_bar* in *global_pathbar*

Content views	The (normally green) tabs across the top of content. This will show only if the content is editable by the current user. The actual tabs shown are determined by actions. This determines how the tabs are rendered in HTML.	Macro: *content_views* in *global_contentviews*

Content actions	The little drop-down actions in the top-right corner of the context bar.	Macro: *content_actions* in *global_contentviews*

Portal status message	A message shown whenever something changes.	Macro: *portal_message* in *global_statusmessage*

Header	The header on a piece of content.	Slot: *header*

Main	The main part of a piece of content.	Slot: *main*

Sub	The bottom part of a piece of content where the comments on an object will appear.	Slot: *sub*

Left portlets	The slots or portlets show on the left of a page. There are a few definitions here: *column-one-slot* is the whole left column, and *portlets-one-slot* is then the slot. If neither of these slots is defined, it calls the macro.	Macro: *left_column* in *portlets_fetcher*

Right portlets	The slots or portlets show on the right of a page. See the left portlets.	Macro: *right_column* in *portlets_fetcher*

Footer	Copyright and other message.	Macro: *portal_footer* in *footer*

Colophon	Miscellaneous messages for the bottom.	Macro: *colophon* in *colophon*

Armed with this information, it's now a matter of customizing the macro or the slot to change the look and feel of the page. Again, it's recommended not to actually customize the main template itself but to instead customize the parts that the main template calls. The next section shows a few example customizations you can make to Plone.

Examining Example Customization Snippets

观察定制片断实例
........................................

The following sections show some examples that demonstrate simple customizations you can do to your Plone site. Some solutions provide one or two different ways of performing the same task.

Removing a Block

删除一个块（Block）
................

One rather neat trick is to be able to easily remove a block from the user interface such as the path bar or the search box. You have two ways to do this; the most obvious is to customize the macro that displays the element. For example, to remove the breadcrumbs, you could click *portal_skins*, click *plone_templates*, click *global_pathbar*, and then turn off the element in the page template level; for example, you can change the following:

::

 <div metal:define-macro="path_bar"
     id="pathBar"
     tal:define="breadcrumbs python:here.breadcrumbs(here);
         portal_url portal_url|here/portal_url">

To this, add the following line of code:

::

 <div metal:define-macro="path_bar"
     id="portal-breadcrumbs"
     tal:condition="nothing"
     tal:define="breadcrumbs python:here.breadcrumbs(here);
         portal_url portal_url|here/portal_url">

This means customizing a page template, which isn't a problem at all and is by now something with which you should be familiar. The slightly different approach is that you can hide elements at the CSS level. This still means the item is rendered and HTML is generated, but it's then turned off for the client-they can't see it. Because the generation of the HTML still occurs, this is a suboptimal solution, but it's a neat trick.

Most elements in Plone have a unique Document Object Model (DOM) element ID; for example, in the case of the breadcrumbs, it's *portal-breadcrumbs*, as you can see in the previous code. To stop showing the *portal-breadcrumbs*, simply add the following to *ploneCustom.css*:

::

 #portal-breadcrumbs {
     display: none;
 }

Changing Portal Tabs

更改网站标签
....................

I've already shown you how you can change the text of the portal tabs if you change the actions. They're displayed using the style sheet, not using tables (although users may initially think so). Looking at Table 7-3, you can see that the code for the portal tabs is *portalTabs*. To make the border of the nonselected tabs dotted, you can simply change the *ploneCustom* style sheet to the following:

::

 #portal-globalnav li a {
     border: 1px dotted;
 }

The tabs are a series of HTML list (*li*) and anchor (*a*) elements, so by changing the CSS for these elements, you can change the tabs' appearance. Later in the "Case Study: Examining the NASA Skin" section I'll show how to change these tabs into images.

By using CSS you can also move any element's location with the *position* attribute. Next, move your tabs to the top of the screen, above the logo and search box. To do this, you use the absolute value of the position, which lets you define the position by using the *left*, *right*, *top*, and *bottom* attributes. Add the following to your *ploneCustom* style sheet to place the portal tabs at the top of your Plone site:

使用CSS，你页可以使用 *position* 属性移动任何元素的位置。接下来，移动你的标签到屏幕上方，放到logo和查询框上。要完成这个，你需要使用位置的绝对值，页就是说你使用 *左*, *右*, *上*, *下* 这些属性来定义位置。添加下面的到 *ploneCustom* 样式表中，以让网站标签位于Plone站点上方：

::

 #portal-globalnav {
   position: absolute;
   top: 0em;
 }

This is a powerful technique for moving elements. You have multiple options for positioning the elements, including relative positioning, but that takes a little work with CSS to get the positioning just right.

Moving the Left and Right Slots

移动左边和右边的面板
...............................

I discussed the left and right slots in Chapter 4, and I've shown you how to add a new slot to the list of slots. You may have noticed that the terms *left* and *right* slots can be a little misleading. The default is to show the slots in those positions, but it's easy to move them.

**NOTE** This works only when you're using the Plone Tableless skin. This isn't the default setting, so you'll have to change the skin in the *portal_skins* tool, as discussed earlier in the "Managing Skins with the portal_skins Tool*.

For example, if you wanted to move the left portlets to the right side of the page, then you could do this by changing *ploneCustom.css* to the following:

::

 #portal-column-one  {
     float: right;
 }
 #portal-column-content {
     float: left;
 }

This moves the leftmost column to the right and pushes the main section to the left.

Hiding Help in Forms

隐藏表单中的帮助
....................

If you wanted to hide the help in all the forms, you couldn't realistically change all the templates. But you could employ a similar tactic to hiding the path bar-and just set *display: none* for the form elements. The following has the desired effect of not placing the input element on a new line:

::

 div.formHelp {
     display: none;
 }

Figure 7-9 shows the feedback page without breadcrumbs, with the help hidden, with dotted tabs, and with the left slot moved to the right of the page, all changed with only a few lines of CSS.

 .. image:: img/3294f0709.png

Figure 7-9. The combined effect of some of the examples

How Do You Find Element X?

如何找到X元素？
..........................

As I've shown, the templates, scripts, and images contained in the *skins* directory of a Plone installation create a Plone skin. Many files live in that directory, so going through every file would be long and counterproductive when those files change. Instead, it's useful to understand some basic techniques for finding the elements you want to alter.

Bear in mind at which level you want to customize the element. As noted earlier, you have three levels for rendering an object. If you want to change the visual representation, or its placement, then the chances are that you can change the CSS and do no further work.

If CSS isn't sufficient, then your next best bet is to search through the templates. For example, suppose you want to change the text that appears on the page when a user logs in, or you want to change the entire page. In this example, you'll alter the page shown in Figure 7-10 to make it a script that does something unusual.

 .. image:: img/3294f0710.png

Figure 7-10. The "You are now logged in" page

Some clues exist to find this template so you can alter it; I'll run through each of them in turn now.

Searching by Using the URL

使用URL搜索
..........................

The Uniform Resource Locator (URL) to a page translates to a series of objects in Plone that are traversed. In Figure 7-11, I've traversed to the *login_success* page. In this case, the final part of the URL is *login_success*, as you can see in the address bar in Figure 7-11. When an object is loaded into an FSDV, the extension is stripped off, so you're looking for a template or script that starts with *login_success*.

 .. image:: img/3294f0711.png

Figure 7-11. Searching for an ID

In Zope you can perform this search by going to the *portal_skins* tool and clicking the Find tab. Once there, enter **login_success** in the *with ids* field. Leave all the other settings the same, and click the Find button. Sure enough, you'll find the *login_success* template.

You can also conduct this search on the file system, depending upon your operating system and the tools available. The quickest way to find this file in Linux is to go to your *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>* directory and do the following:

::

 $ cd skins
 $ find -name 'login_success*' -print
 ./plone_forms/login_success.pt

On Windows, open the *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>* folder in Windows Explorer and click the Search tab. Then enter the name of the file as **login_success**, and click Search. This should give you a list of likely files.

This search should provide the result, *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>/plone_forms/login_success.pt*. If you perform the same search in the ZMI, you click *portal_skins*, click *plone_forms*, and then click *login_success*.

Searching for a Piece of Text

查找一段文字
.............................

A rather crude approach that's somewhat successful is to do a full-text search on the code to find the element that renders the page. For example, looking at the page in Figure 7-12, you can see that it contains the text *Notice that the top*. The simplest way to find the bit that renders that text is to search for it.

 .. image:: img/3294f0712.png

Figure 7-12. Searching for text

In Zope you can also perform this search by going to the *portal_skins* tool and clicking the Find tab. Once there, enter **Notice that the top** in the *containing* field. Leave all the other settings the same, and click the Find button. Sure enough, you'll find the *login_success* template.

You can also conduct this search on the file system, depending upon your operating system and the tools available. The quickest way to find this file in Linux is to go to your *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>* directory and do the following:

::

 $ grep -ri "Notice that the top" *
 plone_forms/login_success.pt: Notice that the top

On Windows, open the *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>* folder in Windows Explorer and click the Search* *tab. Then enter the contents of the file as **Notice that the top**, and click Search. This should give you a list of likely files. Using this rather crude technique, you've been given a template, *login_success*, that renders the message back to the user.

This technique has the following issues:

  - Beware of lowercasing the content in CSS; always make your searches case insensitive (the default in Windows). It's annoying to search for *home* when it's *Home* in the template and it's lowercased in CSS.

  - If you're trying to do this in a language other than English, the content may have been localized, causing the search to fail.

  - Occasionally there may not be searchable text that will match up; in this case, looking up via URL is the recommended approach.

Making New Skins and Layers

创建新的皮肤和层
~~~~~~~~~~~~~~~~~~~~~~~~~~~

So far I've talked about customizing the existing skin. The process for making a whole new skin or a new layer isn't actually that different. I'll cover one key point, putting your templates and scripts on the file system.

Making templates and scripts on the file system and creating new skins and layers are definitely the best way to go for long-term maintainability and flexibility. Not only is creating skin elements much easier in familiar tools on the file system, but it also allows you to easily redistribute your code. Writing on the file system is the style of choice for almost all Plone developers, with minor modifications in the *custom* directory if needed.

Making a New Skin

创建新的皮肤
.................

As you've seen, a skin is actually nothing more than a collection of layers. For my new skin, I wanted to place all my custom code in one place, so I went to the *portal_skins* tool, added a new folder, and gave it the ID of *custom_chrome*.

Then, to add a new skin, you have to click *portal_skins*, select the Properties tab, and add a new skin under the text *Add a new skin*. You'll need to enter a series of layers that you want to set up for this skin. In this example, I added a new skin called *Custom Chrome* and a series of layers, as shown in Figure 7-13.

 .. image:: img/3294f0713.png

Figure 7-13. Adding the Custom Chrome skin

 Then I added the layers for the skin. In this case, the skin didn't have a layer called *custom* in it; instead it had a folder called *custom_chrome*. You now have two skins that use two layers and two folders. Any objects added to the *custom_chrome* folder will affect that skin, not the Plone Default skin.

Using Multiple Skins

使用多个皮肤
....................

As mentioned, a standard Plone site has two skins, Plone Default and Plone Tableless. In the previous section, I added a new skin, Custom Chrome. As I discussed in Chapter 4, you can set the default skin using the Plone interface. Click *plone setup*, and then click the Portal Skin button. This mirrors the choices available in the ZMI after clicking *portal_skins*, selecting the Properties tab, and scrolling to the bottom of the page.

You have one more option, though: *REQUEST *variable name**. This is the request variable that will contain the user's skin information. This is *plone_skin* by default, which is the cookie name. But it can also be passed through other request variables such as the query string. It's available only through the ZMI.

You can also set skins programatically. This allows developers to show different skins to different users depending upon certain business or site logic. For example, if a user is writing content for a site, they may see the standard Plone skin. If they're an anonymous user, then they can see a totally different skin. Rather than letting the user choose, the site is making that decision. If you really want, you could base the skin on the folder they're accessing; however, that approach can lead to confusion, so I don't recommend it.

To change the skin, add a Script (Python) object called *setSkin* in the root of your Plone site. Then add the following code:

::

 ##title=Skin changing script
 ##parameters=
 req = context.REQUEST
 if req['SERVER_URL']<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=%27SERVER_URL%27" title="create this page">?</a>.find('internal.somesite.org') > -1:
     context.changeSkin("Plone Default")
 context.changeSkin("Custom Chrome")

The actual logic for determining the skin will depend upon the site's business rules. In this case anyone accessing *<a href="http://internal.somesite.org">http://internal.somesite.org</a>* will get the Plone Default skin, and anyone accessing *<a href="http://external.somesite.org">http://external.somesite.org</a>* will get the Custom Chrome skin. Unfortunately, one catch is that you can't determine the skin on the security level of the user (for example, authenticated users see one skin, and managers see another). This rather obvious need isn't possible at the time of writing, without severely hacking a Plone site.

**NOTE** Basing the skin on untrusted client information is common practice but not completely secure because you're trusting the information from the client. Making sure this is secure depends on your particular network settings. In most cases, you can handle this easily at the firewall or using a proxy server such as Apache, which could be configured to block all external requests to *<a href="http://internal.somesite.org">http://internal.somesite.org</a>*. I discuss integration with Apache in Chapter 10.

To activate this code, assign an access rule to this object. This means that each time this Plone site is accessed, this Script (Python) object will be executed. Each time the script is run, the skin will be set according to the script. To assign a rule to this script, select Set Access Rule from the drop-down menu and then enter the name of your Python (Script) object. Now test by visiting your site, and see what skin you get.

You do have to be careful with access rules because they occur on every invocation of that folder (or Plone site); you have to ensure that they're correct and that nothing bad can happen in them. If you've accidentally written a bad or incorrect Script (Python) object and can't even get access back into the ZMI to fix it, then you can turn off access rules by restarting Plone with the following environment variable:

::

 SUPPRESS_ACCESSRULE = 1

Appendix B explains how to set environment variables if you're unfamiliar with this process.

Making a New Skin on the File System

在文件系统上创建新的皮肤
....................................

Throughout these chapters I've been using the ZMI. But what most Plone developers use for any serious work is the file system. Making a skin on the file system is actually easy.

Go to the instance home directory of your Plone installation. Inside the *Products* directory, make a new directory; the name of this directory is the name of the product, so the convention is something short, with no spaces or underscores and mixed case. *PloneBookExample<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=PloneBookExample" title="create this page">?</a>*, *CMFPlone<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFPlone" title="create this page">?</a>*, and *PloneSilverCity<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=PloneSilverCity" title="create this page">?</a>* are all examples. Inside that folder, make a new file called *__init__.py* and a directory called *skins*. In the *__init__.py* file, you need to add the following two lines:

::

 from Products.CMFCore<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=CMFCore" title="create this page">?</a> import DirectoryView<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=DirectoryView" title="create this page">?</a>
 DirectoryView<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=DirectoryView" title="create this page">?</a>.registerDirectory('skins', globals())

Next, restart Plone, and then click *portal_skins* to add an FSDV*.* This will open a list of the registered directories. Scroll down until you find the one that matches the directory you registered; this will be the name of the directory with */skins* on the end. Enter an ID that makes sense, and click *Add*. You now have an empty directory where you can go to add layers of your skin.

Debugging Skins

调试皮肤
...............

Another reason I've repeatedly been using the ZMI with you, rather than the file system, is that it gives feedback about errors and gets you comfortable with placing objects inside others. A further positive feature about using the ZMI is that changes are instantaneous. If you change an object and then refresh, you see the change immediately (assuming you have no cache).

This isn't the case with the file system. If you change something in the file system, it isn't updated in Plone. This is for performance reasons. Plone has no way of knowing you made that change, so it must update the Zope cached copy of that object. Without getting into file system notification trickery, a Plone site has two states: production and debug mode. When Plone is in debug mode, it checks all the directories, finds files that have changed, and then updates Plone. This means you can make a change, and it will appear immediately. When run in production mode, however, your changes will not happen until you refresh the skin (see Chapter 11) or you restart Zope.

For obvious reasons, if you're developing skins in Plone, then running in debug mode is the way to go. Chapter 2 showed you how to change the configuration for Plone so that it runs in debug mode. As a quick recap, open the *zope.conf* file inside the *etc* directory of your installation and ensure the *debug-mode* directive is set to *on*.

Using File System Objects

使用文件系统对象
.........................

The FSDVs<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=FSDVs" title="create this page">?</a> allow the mapping of only those Zope objects that have been specifically configured to be used in this manner. It determines the Zope object based on the extension of the filename. The contents of that file are the contents of one attribute of the object-usually the main content, such as the binary contents of an image, or the text contents of the template.

To create an object in your empty FSDV, just go to the *skins* directory and start adding files that match the objects you want to make. Once the file is loaded into Zope as a Zope object, that extension is stripped off. For example, *some_template.pt* becomes a file system page template with the ID *some_template*. Table 7-4 describes the extensions.

Table 7-4. Extensions

 **Extensions	Object Type	Equivalent Zope Object**

*.pt*, *.zpt*, *.html*, *.htm*	Filesystem Page Template	Page Template

*.cpt*	Controller Filesystem Page Template	Controller Page Template

*.py*	Filesystem Script (Python)	Script (Python)

*.cpy*	Controller Python Script	Controller Python Script

*.vpy*	Controller Validator	Controller Validator

*.doc*, *.pdf*, *.swf*, *.jar*, *.cab*, *.ico*, *.js*, *.css*	Filesystem File	File

*.gif*, *.jpg*, *.jpeg*, *.png*	Filesystem Image	Image

*.props*	Filesystem Properties Object	Folder with Properties

*.zsql*	Filesystem Z SQL Method	ZSQL Method

*.dtml*	Filesystem DTML Method	DTML Method

So, to get an image in your directory view, dump in a *.gif* or *.jpeg* file. If you want a Script (Python) object, then add a file ending in *.py*.

Setting File System Object Metadata

设置文件系统对象元数据
...................................

Extra content for an object such as title, security, or cache is stored in a separate file. That file is given the same filename as the original file, with *.metadata* added to the end. If the original file is *logo.jpg*, for example, then the metadata will be contained in *logo.jpg.metadata*.

The metadata file is in the Windows *.ini* format of *key = value* pairs. This format has been extended to contain information about forms for the Form Controller object, which you'll see in the next section. All the choices, even the presence of this file, are optional. The following is a sample file:

::

 [default]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=default" title="create this page">?</a>
 title = Test object
 cache = RAMCache<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=RAMCache" title="create this page">?</a>
 proxy = Manager
  
 [security]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=security" title="create this page">?</a>
 Access contents information = 1:Manager,Anonymous

The following are the values you can set in that file:

 **title**: This is the title that's applied to the object in the ZMI and in Plone; this will show up in the Plone templates.

 **cache**: This is the ID of the cache object in which you'd like the object to be cached. By default Plone comes with two cache objects: a RAM Cache Manager and a HTTP Cache Manager. Chapter 14 discusses the function of these two objects.

 **proxy**: This is the proxy role you'd like to apply to this object. See Chapter 9 for more information.

 **security**: This is the security area, which allows multiple lines of security settings. The key contains the name of the permission. The right side contains the acquisition setting, followed by the roles delimited by commas. For example, *View = 0:Manager* means only users with the member and manager role can see an object, and security settings aren't acquired for that permission.

Using Validators in the File System

在文件系统中使用校验器
...................................

To specify validators on the file system, add the validator to the *.metadata* file. The validator section of the *.metadata* file would look like this:

::

 [validators]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=validators" title="create this page">?</a>
 validators = validate_script1, validate_script2

This will run the two validation scripts: *validate_script1* and *validate_script2*, in that order. A validation script will examine the data and add errors to the form controller state if there's a problem.

The *contextType* and *button* options need a slightly different syntax. Validations are run on the context being executed-for example, a document or image. You could have a different validator execute for the document and for the image. For example, to have a different validator script run when this is invoked as a document, add the following line:

::

 validators.Document = validate_script2

You can vary the validator depending on the button clicked on the form by appending the name of the button in the form to the left side of the validator. The name of the button must begin with *form.button*. For example:

::

 <input type="submit" name="form.button.button1" value="First" />

The metadata file would then look like the following:

::

 validators..button1 = validate_script1

The *..* is a space for the context type, so if, as previously, you wanted this to occur for *button1* on a document, then the metadata file would look like the following:

::

 validators.Document.button1 = validate_script5

Using Actions in the File System

在文件系统中使用Actions
................................

Like validators, you can specify actions in the *.metadata* file. The syntax for the *actions* section of your file would look like this:

::

 [actions]<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=actions" title="create this page">?</a>
 action.success = traverse_to:string:script1

In the previous example, when the form is submitted and the validation scripts return a status of success, the traverse to action is called with the argument *string:script1*. That argument is actually an expression. The default action for the failure status is to reload the current form. The form will have access to all the error messages via the *state* object in its options.

Again, you can specify a particular action on a particular context; for example, to specify an action for success when on a document, you can do the following:

::

 action.success.Documnent = traverse_to:string:document_script

Again, you can specify the action for the following button:

::

 <input type="submit" name="form.button.button1" value="Button" />

by adding the following to the *.metadata* file:

::

 action.success..button1 = traverse_to:string:script1

This example has no explicit context given, so it's valid for any type of context.

 ***start sidebar***

Finding Example File System Skins and the Book Examples

找到文件系统皮肤样例和书籍例子
########################################################

All the examples in this book have been collected in a skin for you to install. You can find this on the Plone book Web site at *<a href="http://plone-book.agmweb.ca/Software/PloneBookExamples">http://plone-book.agmweb.ca/Software/PloneBookExamples</a>* and on the Apress book Web site at *<a href="http://www.apress.com">http://www.apress.com</a>*. It's available as a *.zip* file of the skin; after you've downloaded and unzipped it, you'll find there's a file structure similar to the one mentioned earlier.

You have an *__init__.py* file and *skins* directory. In the *skins* directory you'll find a series of page templates, Controller Validator objects, and all the matching metadata files. If you want to install this, then copy the *PloneBookExamples<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=PloneBookExamples" title="create this page">?</a>* folder into the *Products* directory of your instance home. Restart Plone, and then click *plone setup*. Select Add/Remove Products,* *and* *you'll see an entry for *PloneBookExamples<a class="new" href="http://members.czug.org/plone/newplonebook/Chapter7/createform?page=PloneBookExamples" title="create this page">?</a>*; check it, and then click install. You've now installed the templates and can go to *feedbackForm* and get the page template you saw in the previous chapter.

What the install procedure did was automate the process of adding an FSDV and then added a layer to each skin. If you click *portal_skins* and then select the Properties tab, you'll see that the new layer *plone_book_examples* has been added.

 ***end sidebar***

Case Study: Examining the NASA Skin

案例学习：研究NASA皮肤
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In January 2004 two NASA probes landed on Mars: Spirit and Opportunity. These remote-controlled robots scoured the surface of Mars, returning pictures and analysis of the surface. The probes were a great success, returning stunning pictures of the surface of Mars that thrilled the world.

One small part of this cog was a Web site at *<a href="http://mars.telascience.org">http://mars.telascience.org</a>*. This site published a program called *Maestro*. To quote the Web site, its purpose was the following:

 You can download a scaled-down version of the program that NASA scientists use to operate Spirit and Opportunity. Updates are also available for Maestro that contain real data from Mars that you can add to your copy of Maestro.

Turning to Plone, the group responsible for this site developed a site that looks great quickly and easily. In this case, a large number of community members and volunteers helped the members of the Maestro team develop the site. Figure 7-14 shows the working Plone site.

 .. image:: img/3294f0714.png

Figure 7-14. The Maestro site

You'll probably recognize some similar signs of a Plone site: the tabs across the top, the personal bar in the top-right corner, and the usual breadcrumbs. Other than that, the site looks quite different from the standard Plone site. In the following sections, I'll step through exactly how this was done. Well, actually, it's quite simple because most of the look and feel was put together using CSS. There were little to no changes other than changes to the custom style sheet and some new images.

You'll first look at the non-CSS changes to the site, which are changes to some of the templates and properties.

Removing the Portlets and Some of the Main Elements

去除面板和主元素
....................................................

The site has no portlets. These have been removed because in this site there aren't any that are relevant. Instead, news appears on the home page. To remove these portlets from your site, go to the root of the Plone site and click Properties. In the form fields next to *left_slots* and *right_slots*, delete all the values.

In the Maestro site, a few elements have been removed. Sometimes I've found that this the best thing to do for features that just aren't needed in a site. It can be a little hard to squeeze every user interface element into a Plone site, but really you don't always have to do that; instead, just remove the elements you don't need. A few elements here have been removed: the site actions, the search box, the footer, and the colophon.

To accomplish this, those templates that produced the code were customized and then altered so they rendered nothing. For example, to remove the search box, in the ZMI click *portal_skins*, click *plone_templates*, and then click *global_searchbox*. Next, click the Customize button. Then change the template to the following:

::

 <html
     xmlns="http://www.w3.org/1999/xhtml"
     xml:lang="en" lang="en"
     i18n:domain="plone">
     <body>
  
         <div id="portal-searchbox"
                metal:define-macro="quick_search"
                tal:condition="nothing">
             Nothing to see here.
         </div>
     </body>
 </html>

This is the technique I showed earlier for removing elements; just set *tal:condition* on the macro element to ensure that the condition is *false*.

Customizing the Colors

定制颜色
......................

You set the base colors for the site in the *base_properties* object. This object has been customized, and the colors changed to the following colors (unless mentioned, all the other items are the same):

::

 linkColor: #776a44
 globalBorderColor: #776a44
 globalBackgroundColor: #e0d3ad
 globalFontColor: #776a44

The color change I most noticed is *globalBackgroundColor*, which affects the colors of the personal bar and has changed from blue to brownish. These minor colors changes will alter the base style sheet so that it matches the images and overall look and feel nicely.

Creating the Style Sheet

创建样式表
........................

The big part of this site is the style sheet, which is reproduced in full in Appendix B. Here I'll highlight some of the main parts of the style sheet. This style sheet is based on *ploneCustom.css*, which was customized in the *custom* folder. Then, some of the elements of the Web page were overridden in the new *ploneCustom.css* file.

First, the entire background for the body is set to the color *#343434*.

首先，页面的整个主体背景设置为颜色 *#343434*.

::

 body {
     background: #343434;
 }

Second, the actual content of a Plone page, the part that you can edit, is contained in one class called *documentContent*. Because the background color of the *documentContent* element is set to *white* in the main *plone.css* file, the background of the text is white and produces the white area in the middle of the screen.

其次，Plone页面的实际内容，也就是你能编辑的部分，位于叫做 *documentContent* 的类中。

Next, the image of the satellite and robot at the top of the Web site is one large image. You place it at the top using CSS. The code for this is as follows:

接下来，网站上方的卫星图片和机器人是一个大的图片。使用CSS把它放在上方。代码如下：

::

 #portal-top {
    background: url(<a href=""http://mars.telascience.org/header.jpg">"http://mars.telascience.org/header.jpg</a>") transparent no-repeat;
    padding: 162px 0 0 0;
    position: relative;
 }

This CSS code sets the parameters for the element that has the ID of *portal-top*. If you look at the HTML code for a Plone site, you'll see the *portal-top* element at the top of the page, just below the *body* element. By setting the background for that image to the URL of the image in question, you can have the image appear. The image is 162 pixels high, which is why the padding for the top of the *#portal-top* element is set to *162px*. If you don't do this, then all the items below will be pushed up, overriding the image.

这段CSS代码设置了ID为 *portal-top* 的元素的参数。如果你查看Plone站点的HTML代码，你将看到 *portal-top* 位于页面的上方，直接位于 *body* 元素下。图片有162象素高，这也是为什么 *#portal-top* 元素上方填充高度设置为 *162px* 的原因。如果你不这么做，下面所有的条目都将推上来，覆盖到图片上。

The header image is 677 pixels wide, and you'll note that the text in the page fits cleanly underneath the image, rather than spilling out to the left or right. You can do this by setting the value for the element to *680px*. The *visual-portal-wrapper* HTML element is actually just below the body, and it sets the width for the entire page body. The code for this is as follows:

头部图片有677象素宽，你将注意到页面的文字和图片很相配，而不是由左到右。

::

 #visual-portal-wrapper {
    width: 680px;
    margin: 1em auto 0 auto;
 }

This sets the width for all the pages to be a fixed width, which is fine as long as you make sure the width is smaller than the industry-standard 800-pixel width. No matter how big the user makes the browser window, the main part of the page will never grow beyond those 680 pixels, ensuring it matches nicely with the image.

Probably the other obvious changes are the tabs at the top of the page, which are now images instead of just the standard Plone boxes. Three images make up the tabs at the top of the page: a spacer between tab, the left part of the tab, and the right part of the tab. By putting these three images together, you get the effect of the tab. Figure 7-15 shows these three images.

 .. image:: img/3294f0715.png

Figure 7-15. The three images that combine to make the tab

For editing the CSS, remember that each of the tabs is really a list item containing a link inside an element with the ID *portal-globalnav*. To set up the background spacer between each tab, the skin first sets the background for the entire element. Again, note that by setting the height of the image to 21 pixels, the same size as the image, you've ensured that there's the appropriate space for the image. The code is as follows:

::

 #portal-globalnav {
     background: url(<a href=""http://mars.telascience.org/listspacer.gif">"http://mars.telascience.org/listspacer.gif</a>") transparent;
     padding: 0;
     height: 21px;
     border: 0;
     margin: 0 0 1px 6px;
     clear: both;
 }

To set the image at the left end of the tab, you use the start image. You set the start image by setting the value on the *li* element, rather than the *anchor* element, like so:

要设置标签左边的图片，需要使用start图片。通过设置 *li* 元素的值设置图片，而不是 *anchor* 元素，如下：

::

 #portal-globalnav li {
    display: block;
    float: left;
    height: 21px;
    background: url("/liststart.gif") transparent no-repeat;
    padding: 0 0 0 33px;
    margin: 0 0.5em 0 0;
 }

Finally, you set the right part of the tab by adding an image to the anchor element. You do this by altering the anchor element inside the tab. The following code shows where you set the background image to be the right part:

::

 #portal-globalnav li a {
     display: block;
     float: left;
     height: 21px;
     background: url("/listitem.gif") transparent right top;
     padding: 0 33px 0 0;
     border: 0;
     line-height: 2em;
     color: black;
     font-size: 90%;
     margin: 0;
 }

Now, you've replaced the rather standard-looking Plone tabs with great-looking buttons.

Creating the Splash Page

创建封皮页(Splash Page)
........................

This page has one other key element. The front page of the site is a *splash page*, which shows a nice graphic and invites the user to enter. You can add this by going into the ZMI and removing the *index_html* object that's normally there. Once removed, create a new file called *index_html*. In that file, create custom code to make the home page, including a custom CSS. The main element of that is one image, placed there by the following CSS:

::

 div {
     background: url(/splash.jpg) transparent no-repeat;
     width: 260px;
     height: 335px;
     position: absolute;
     ...
 }

The remaining CSS handles the placing of the text and links within that image. This page has no Plone elements at all; it's static HTML.

Conclusion

结论
..........

This looks like a reasonably complex site, with relatively simple CSS that does most of the hard work. By using CSS you've changed Plone's look and feel without having to know a great deal about Plone beyond the HTML. Also, by ensuring that the images are placed using CSS, you maintained key accessibility functions.

Thank you to NASA and all the people involved from the Plone community for helping with this site and case study. These include but are not limited to John Graham, Alma Ong, Joe Geldart, Michael Zeltner, and Tom Croucher.





From unknown Wed Jan 19 17:19:55 +0800 2005
From: 
Date: Wed, 19 Jan 2005 17:19:55 +0800
Subject: 建议将skin翻译为“封皮”或“表皮“。
Message-ID: <20050119171955+0800@www.czug.org>

看了关于skin的解释和用法，我建议将skin翻译为“封皮”或“表皮“。
吴晓敏
