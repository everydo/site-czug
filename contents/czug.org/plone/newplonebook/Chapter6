第六章
-------------

.. Contents:: 内容：

:翻译: 潘俊勇

(Introducing Advanced Plone Templating and Scripting)

介绍Plone高级模板和脚本技术
=======================================================

The previous chapter covered how the Zope Page Templates system works. To understand page templates, Chapter 5 also covered the object hierarchy, acquisition, and Template Attribute Language Expression Syntax (TALES). Using the code from the previous chapter, you were able to generate dynamic Web pages. The chapter also showed an example page template that plugged the code together, covered the building blocks of the templating system in Plone, and provided the key information you'll need in order to use Plone.

前面一章介绍了Zope页面模板系统的工作原理。为了理解页面模板，第5章也包括了对象层次结构、获取和模板属性语言表达式语法（TALE）。使用前面章节的代码，您可以生成动态的网页。这章也展示了一个插入了代码的页面模板示例，包括了在Plone中模板系统的构建块(Block)，提供了为了使用Plone而需要的关键信息。

It's now time to move onto some of the more advanced features of page templates and templating in Plone in general. First, I'll introduce the Macro Expansion Template Attribute Language (METAL) and Internationalization (I18N) namespaces. Like the TAL namespace, these provide functionality to the site developer. For those itching to know exactly how a Plone page is plugged together, the 'Hooking Into Plone Using METAL' section provides many of the answers.

现在是开始提升到页面模板和Plone的模板技术一些高级特性的时候了。首先，我将介绍“宏扩展模板属性语言”(METAL)和国际化(I18N)命名空间(namespace)。就像TAL命名空间一样，他们为网站开发人员提供了一些功能。对于哪些急切希望知道Plone页面如何相互插入的，'使用METAL挂接(hook)进Plone'一节提供很多的答案。

Up until now I've shown how you can use simple Python expressions in page templates. Of course, sometimes a one-line Python expression isn't enough. So in the 'Scripting Plone with Pythonâ€ section, I'll show you can take Python to the next level and increase the power of your scripting.

到目前为止，我已经展示了如何在页面模板中使用简单Python表达式。当然，有时单行的Python表达式不够用。因此在 '使用Python进行Plone脚本编程' 中，我将展示如何把Python提升到另外一个层次并增加你的脚本编程能力。

Finally, I'll cover a common example, showing how to put together a form in Plone. This example demonstrates concepts learned in the previous chapters and ties it all together while showing you exactly how Plone handles forms.

最后我将完成一个常见的例子，展示如何把一个表单放到Plone中。这个例子展示了前面几章中学到的概念，并在展现Plone处理表单时，把他们结合在一起。

(Understanding Advanced Plone Templating)

理解Plone高级模板技术
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the nice elements of page templates is that different functions are clearly separated into different namespaces. In the previous chapter, you looked at the TAL namespace. That's not the only namespace that page templates provide; two other namespaces are key to Plone.

页面模板的一个优点是将不同的功能清晰的分离到不同的名字空间。在前面的章节中，你看到了TAL名字空间。他不是页面模板唯一提供的名字空间；另外两个名字空是Plone的关键。

The first is METAL. As the rather long name suggests, it's similar to TAL in that it's an attribute language and inserts itself into element attributes. However, its primary aim is to ensure that you can reuse chunks of other page template code. It does this using the slot and macro functions.

首先是METAL。如其全面所暗示的，他类似TAL，也是一个属性语言，把他自己插入到元素属性中。然而，他的主要目标是保证你能够重复使用其他的页面模板的大段代码。他通过使用槽(slot)和宏(macro)实现。

The second is I18N, which allows you to translate the content of page templates. This is used in Plone to localize the interface of Plone into more than 30 languages and for many users is one of the key features of Plone. As you'll see, the ability to localize text is of interest to all users, even those building a monolingual site. You'll start with METAL.

其次是I18N，这个让你能够翻译页面模板。Plone中使用他将Plone的界面翻译成30多种语言，对很多用户来说，这是Plone的关键特性之一。你将看到的，本地化文字对所有用户都很有兴趣，既便你构建一种语言的网站。你将从METAL开始。

Hooking Into Plone Using METAL

使用METAL挂接(hook)进Plone
..............................

So far you've seen how to use TAL to dynamically create parts of pages. However, this really doesn't let you do a great deal of complex templating. There really isn't a mechanism to put a standard header on top of every page, other than using a TAL statement. METAL is a method of allowing preprocessing of the templates and provides some more powerful functions than TAL. All METAL functions start with the *metal:* prefix.

目前为止，你看到如何使用TAL来动态构建页面的某些部分。然而，这个并不能让你构建大量的复杂模板系统。除了TAL，还没有一个机制，让你能够把标准的头放到每个页面上方。METAL是一个预先处理模板并提供更多比TAL更加强大的功能。所有的METAL功能都以 *metal:* 开始。

metal:define-macro
,,,,,,,,,,,,,,,,,,

The *metal:define-macro* command allows you to define an element to reference from another template. The name of the referenced chunk is the name of the macro. The following is an example that defines *boxA* as a piece you want to use elsewhere:

::

 <div metal:define-macro="boxA">
     ...
 </div>

That *div* element is now a macro that can be referenced from other templates. The macro refers only to the part of the page referenced by the element, which, in this case, is the *div* tag. So, it's common to use multiple *macro:defines* in one page and for the page to be a valid Hypertext Markup Language (HTML) page, like so:

这个 *div* 元素就是一个能够被其他模板引用的宏。这个宏仅仅代表页面中被那个元素所指向的部分。这里，也就是这个 *div* 标记。因此，很常见的是在一个页面中使用多个 *macro:defines* ，为了让这个页面成为一个有效的HTML页面，可如下：

::

 <html xmlns:tal="http://xml.zope.org/namespaces/tal"
     xmlns:metal="http://xml.zope.org/namespaces/metal"
     i18n:domain="plone">
     <body>
         <div metal:define-macro="boxA">
             ...
         </div>
         <div metal:define-macro="boxB">
             ...
         </div>
     