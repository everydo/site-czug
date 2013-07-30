---
created: 2006-03-08 22:55:05
creator: panjy
description: 这里有一个对Zope在企业级应用置疑的帖子，作者更加喜欢Django。
title: 从Zope VS Django说起
---
<p>这里有一个对Zope在企业级应用置疑的帖子，作者更加喜欢Django。</p>
<p><a class="reference" href="http://www.jrandolph.com/blog/?p=23">http://www.jrandolph.com/blog/?p=23</a></p>
<p>但是值得我关注的是下面Holger Froebe的一个长的回帖，以自身的开发经验
提出了自己对Zope/Zope3/Plone的正面解说，中肯而充满激情，个人觉得非常有价值。</p>
<p>下面摘抄如下：</p>
<p>Hello Jason,</p>
<p>when I read your post, I smiled a little.
Because I was in a similar situation in January/February
2005. Let me introduce: My name is Holger
Froebe, I work for the IT of a university hospital
here in Germany (does this count for enterprise
requirements? I hope so.) - sorry for my crude
english.</p>
<div class="section">
<h3><a id="plone" name="plone">Plone的问题</a></h3>
<p>(Plone很牛X，但是他的技术栈太深了)</p>
<p>We had some web-applications written in plone and
wanted to extend this stuff throughout the company
which failed via some of the reasons
(Integration of Oracle/User management) which you adressed
in your rant. The main goal of this extension project
was to ensure integrity of data stemming from
different sources (mainly Legacy systems, like SAP,
Oracle, stuff from File/FTP server, MySQL, SQLServer -
the whole spectrum ;-)</p>
<p>Why did we fail ?
First let me get one point clear: I think Plone has
its strenghts and merits and if you stay close to
the main street of its framework layout and its
original intention (see below), you can get very
satisfactory results - see Oxfam, Ebay-Developer Plattform,
Motorola and a lot of other impressive projects.</p>
<p>But if you look at its history, you see a pattern:
Plone started as a replacement for the User Interface of
the Content Management Framework (CMF) of Zope2. But
over the years more and more architectural
stuff slipped into the original Skin Package - which
suddenly became a framework of its own.
It started as one package - now
you have 13 (or so) Zope packages which constitutes Plone.
And this software stack got bigger with ev’ry release: There
is python, then comes zope, then plone, then put archetypes and
on top of it ArchetypesContentTypes. To add it, all this
stuff has strong inner dependencies.
So with all those dependencies
Plone slowly drifted away from its original goal (getting a more usable
+ visually appealing UI for Zope-CMF) and now does a lot of stuff
which should be done better deep down
in the software stack - may it be a pure python library
or a standard Zope Component/Product.
And that - to my totally personal mind - was the reason we failed
with a complex enterprise scenario.
If you’re interested in this point of view,
I’ll recommend you Chris Withers insightful talk
“Plone rocks my world” - <a class="reference" href="http://www.simplistix.co.uk/presentations">http://www.simplistix.co.uk/presentations</a></p>
</div>
<div class="section">
<h3><a id="but-what-was-the-solution" name="but-what-was-the-solution">But - What was the solution ?</a></h3>
<p>(当然是zope3了)</p>
<p>We tried different approaches, but stayed
closely in well-known Python territory and rounded up
the usual suspects: TurboGears, Django, Zope3, to name
the most prominent.</p>
<p>And the winner was … Zope3 (now its time
to put on my fireproof suit, right ;-)</p>
<p>We started to work with it in Spring 2005 -
and we never looked back.</p>
<p>Man, this is such an amazing piece of software !
For me it’s like a piece of art ;-)
Everyday I work with it I’m getting more
enthusiastic about it.</p>
<p>Zope3 is build on some values which in my mind
really counts if you want to build an enterprise system:</p>
<ul class="simple">
<li>Quality</li>
<li>Dynamics + Extensibility</li>
<li>Flexibility</li>
<li>Reuse, reuse and reuse again ;-)</li>
<li>Clear and concise separation of concerns</li>
<li>Focus on core competencies</li>
<li>Avoid the Not-invented-here-syndrom</li>
<li>integrate proven solutions from outside your world</li>
</ul>
<p>Zop3 is not the monolithic big framework like many
other appservers today, but a collection of loosely
coupled pieces where every piece has a clear and defined
responsibility and quality. There are a some
thousand tests to ensure the last one. You can use nearly every
of this little pieces (Zopies call them “components”)
outside Zope. This separation of concerns to the extreme
leads in a fast way to locate, isolate and remove errors -
that really saved some of my days in the last few months.</p>
<p>At the same time the Zope3-Guys build via ruthless refactoring a framework
which brings Zope-World closer to Python standard world
(stuff like WSGI, relational Database connectivity etc. - see
below).</p>
<p>Heck, you can even use Zope-Code for a client
app which doesn’t know anything Persistency or ZODB.
Yes, it’s true: You can write pure desktop applications
using Zope-Code without caring about ZODB - Example:
The CCPublisher2 rewrite of the CreativeCommons-Project,
see <a class="reference" href="http://svn.berlios.de/svnroot/repos/cctools/publisher/trunk">http://svn.berlios.de/svnroot/repos/cctools/publisher/trunk</a>
or <a class="reference" href="http://wiki.python.org/moin/PyCon2006/Talks#48">http://wiki.python.org/moin/PyCon2006/Talks#48</a>
Or you want to use a collaborative tool for groups with
instant + slick visual feeling - try Bebop which strongly
relies on Zope3-Technologies on server AND client side.</p>
<p>The Zope3-Team discussed very thoroughly: What are the
core competencies of Zope and what not ?
For example: Zope2 had its own webserver - ZServer.
But why write and maintain such a beast when there
is something better in Python-World ?
So the Zope3-Guys integrated Twisted and
got best of both worlds.</p>
</div>
<div class="section">
<h3><a id="relational-databases-and-zope3" name="relational-databases-and-zope3">Relational Databases and Zope3</a></h3>
<p>(有多种数据库集成方式，支持OR映射)</p>
<p>You described very well in your rant the problems with Oracle.
This was nearly 100% identical to our experience,
so my smile from the beginning of this post
comes a little bit from the pain I left behind me.</p>
<p>With Zope3 there are two approaches:</p>
<div class="section">
<h4><a id="a-use-cxoracleda-adapter" name="a-use-cxoracleda-adapter">a) Use cxOracleDA-adapter</a></h4>
<p>(<a class="reference" href="http://svn.zope.org/cxoracleda/">http://svn.zope.org/cxoracleda/</a>)
Looking at this source code I was amazed how easy and
straightforward it is to integrate a well-known and proven
python-Standard DB-Adapter into Zope3-world.
The same pattern again: Take a proven quality piece
of software from standard python world, put on a small wrapper
and - whoa - use it right away in Zope3.</p>
<p>Well, and then you could put sql-expressions into your templates
via sql-expressions (uhm, not really recommended ;-) or use
your zsql-scripts from Zope2.</p>
<p>But then we thought there should be a better solution,
which breathes the spirit of Zope3 … which led us to</p>
</div>
<div class="section">
<h4><a id="b-an-or-mapper-solution" name="b-an-or-mapper-solution">b) an OR-Mapper-Solution</a></h4>
<p>We tried SQLObject first, since it had a “native” Zope3-Integration
via sqlos. But Oracle connectivity is not one of the main targets
of SQLObject, despite there is a Oracle-SQL-Object-0.6.1-branch
in the repository.</p>
<p>PyDo2 from the Skunkweb-Project looked really promising, but
we had to put the name of the table into the class-definition,
so this was not flexible enough. Despite Oracle-Connectivity
was OK.</p>
<p>So we ended up with the best (shameless marketing)
enterprise ORM in python-world: SQLAlchemy (<a class="reference" href="http://www.sqlalchemy.org">http://www.sqlalchemy.org</a>)
Yes, there’s no official download and the developers
say there’s only Version 0.9.1 - but it’s pretty close to final 1.0
and it really suits our needs.</p>
<p>The great difference between SQLAlchemy and the rest of the bunch
is that other ORM-Mappers try to fit relational databases by all means
into Object-World. But a relational DB is no misled ObjectStore and
the whole analogy breaks more and more down with</p>
<ul class="simple">
<li>larger databases</li>
<li>transactional aspects</li>
<li>complex datasets/queries over many tables.</li>
</ul>
<p>SQLAlchemy has the same philosophy as Z3 in</p>
<ul class="simple">
<li>extreme separation of concerns and</li>
<li>integration of standard DB Adapters</li>
<li>high quality of code + easy readability
(anybody said “pythonic” ;-)</li>
<li>good quality of documentation</li>
</ul>
<p>SQLAlchemy treats a Class as a Class, a RDB as a RDB, and
(you guessed it, right?) a RDB Table as a
RDB Table and connects them via mappers, which can easily
enriched with some standard methods/queries provided by
the framework.
It makes heavy use of the new dynamics aspects enriching
Python with the last few releases in the 2.x-line.</p>
<p>With SQLAlchemy I could drop the lines of code of my sql-related
stuff somewhere around 20-30%. And I REALLY like the approach
of “Writing less code”. Doing all my RDB-Stuff in python
is an extra-Bonus (OK, to be honest - some complex queries
survived, but I think this is only a matter of time, since
they vanish ;-)</p>
<p>So you’re not alone in Zope3-Oracle-World. To
cite the glorious A. A. Milne “And then there were three”
(and maybe even more, if someone answers this post ;-)</p>
</div>
</div>
<div class="section">
<h3><a id="ldap-integration" name="ldap-integration">LDAP-Integration</a></h3>
<p>(很好的支持LDAP集成和可插拔的认证方式)</p>
<p>Zope3 is very concise about Authentication via
so-called PAU’s - Pluggable Authentication Utilities.
You could easily plug together Authentication sources
with different Authentication methods - its as easy
as plug your lego-stones together.</p>
<p>Like in RDB-World: First you define an Adapter to your
Datasource - lets call it LDAP-Adapter, right -
which defines and holds the connection to your
external LDAP-Source (<a class="reference" href="http://svn.zope.org/ldapadapter/">http://svn.zope.org/ldapadapter/</a>).
That way, you could even use more than one LDAP-Source
in your Application.</p>
<p>Then you have another clearly defined LDAP-PAS (<a class="reference" href="http://svn.zope.org/ldappas/">http://svn.zope.org/ldappas/</a>).
which does the authentication against this Adapter.</p>
<p>And the whole beast (you guessed it again, right?) is a small,
well-defined wrapper around python-ldap. Plus
it’s easy to read and fast to understand (my 2 cents).
It’s like dejavu all over again ;-)</p>
<p>Hint: I just played around with this LDAP-stuff and never
tested that in our production environment,
but I have great confidence from my previous experiences
with Zope3 that it should be working relatively seamless.</p>
</div>
<div class="section">
<h3><a id="zcml" name="zcml">ZCML</a></h3>
<p>（ZCML，一个倍受争议的zope3技术，现在正在简化）</p>
<p>Well, everybody beats on ZCML, since its such an easy
target - “Hey, it’s XML - that’s bad. We don’t want
to use XML (for whatever ideological reason), so
Zope3 must be something ill-constructed”</p>
<p>If you ask me about my feelings about ZCML, I would
not try to convince you it was made in heaven and tell you
that you are too blind to see the light ;-)</p>
<p>But - as often in life: truth lies somewhere in
between the extremes. My 2 cents:</p>
<p>1. I share your feelings about not direct
debugging ZCML, despite the fact that Zope3.2 brings
very concise error-tracebacks.</p>
<p>2. The Zope3-Guys are aware of the problems users have with
ZCML. They try REALLY hard to bring as much ZCML back
to python as possible - see
<a class="reference" href="http://www.z3lab.org/sections/blogs/philipp-weitershausen/2005_12_14_zcml-needs-to-do-less">http://www.z3lab.org/sections/blogs/philipp-weitershausen/2005_12_14_zcml-needs-to-do-less</a>
for a thorough discussion from one of the core developers
of Zope3. Looking from Zope3.0 to Zope3.2 (the current release) some
stuff vanished from ZCML, so those guys do their homework
and will do it even more on the upcoming Zope3.3 release.</p>
<p>3. The best thing at the end (now Z3-Team will really beat me ;-) :
You can write up and use
ALL (right, ALL) ZCML-directives right away as python-code, if you don’t
XML.
And yes, this is even documented (call me old-fashioned,
but I read docs first). You may say, that there are such
a huge amount of README’s and other .txt-stuff spread
over the whole Zope-Project, that its not easy to get into it.
But Zope3 provides you with a toolscript
called “static-apidoc” which gives you a clear, concise
overview of the whole documentation as a static website.</p>
<p>Now if you look at the README under zope/component or
at the static-apidoc unter “Component Architecture”
you find methods like provideAdapter, provideUtility,
which do - surprise, surprise - the equivalent of
ZCML-alternatives. Or look at zope/component/site.py
or zope/configuration</p>
<p>You want to see this in action ? Look at this
2-part-example of a simple Z3-object publishing system
without any piece of ZCML:</p>
<p>Part I: The Zope Component Architecture -
Interfaces, Adaptation, and Duck Typing
<a class="reference" href="http://griddlenoise.blogspot.com/2005/12/zope-component-architecture-interfaces.html">http://griddlenoise.blogspot.com/2005/12/zope-component-architecture-interfaces.html</a></p>
<p>Part II: The Zope Component Architecture -
One Way To Do It All
<a class="reference" href="http://griddlenoise.blogspot.com/2005/12/zope-component-architecture-one-way-to.html">http://griddlenoise.blogspot.com/2005/12/zope-component-architecture-one-way-to.html</a></p>
<p>Browsing through the docs, you can find the other
replacements in a straightforward way (or you debug
the xmlconfig-stuff from zope/configuration, which
gives you the corresponding callables for ZCML)</p>
<p>If that’s too tough and time-consuming - no problem,
ask on the Zope3-Users mailinglist. Those guys are
REALLY helpful to get you into Z3-world.</p>
</div>
<div class="section">
<h3><a id="kool-aid-and-the-magic-world-of-interfaces-and-adapters" name="kool-aid-and-the-magic-world-of-interfaces-and-adapters">Kool-Aid and the magic world of interfaces and adapters</a></h3>
<p>（接口和适配器技术带来的神奇世界，这些东西真的是很好的东西，对大的项目非常有帮助。）</p>
<p>Speaking with developers about Zope3 you often hear
that interfaces and adapters are too much magic and
they have to drink so much Kool-Aid to understand them.
I won’t put this here into a lengthy pro-con-discussion
of these concepts, since I’m not really a core developer,
but more an application developer/maintainer.</p>
<p>But to tell you my story:</p>
<p>It took me a while to GET the main ideas/principles
behind this stuff - to be honest,
2 days of intensive, dedicated work and 5 litres of H2O.
After one week of working with Zope3 I was more productive than
before. Plus I had learned a lot of new stuff about programming
in a quality way. Yes, dealing with Zope3 has made
me a better programmer - even if I never should do anymore project
with it ;-(</p>
<p>Plus it helped me to get my things done better + faster.</p>
<p>Well, that’s Kool-Aid I really like !</p>
<p>I wont’t say this world of interfaces and adapters
is the easiest to understand. But again:
There are a good amount of play-around-with-it-tutorials/docs/books
around which take you into Zope3-World. Just give it a try !</p>
<p>Want some examples? Want some simple apps to play around with?</p>
<p>Well, it was never easier than with Zope3 - see yourself</p>
<p>Here’s some easy stuff which you can work through in less than 1 hour
(well, the last example takes you longer ;-)</p>
<p>a) “Zope3 in 30 minutes” - at
<a class="reference" href="http://zissue.berlios.de/z3/Zope3In30Minutes.html">http://zissue.berlios.de/z3/Zope3In30Minutes.html</a>
showing you step by step how to build your first
simple Z3-application to collect your bookmarks on a server</p>
<p>b) Did I mention the magnificent Jeff Shell ? His blog
griddlenoise.blogspot.com is a rich and really insightful source
for getting into Zope3 - plus it’s really fun to read.</p>
<p>In his archives you find this funky little thing</p>
<p><a class="reference" href="http://euc.cx/toulouse/archives/simple_todo_application/">http://euc.cx/toulouse/archives/simple_todo_application/</a>
(alternative <a class="reference" href="http://worldcookery.com/files/jeffshell-todo/">http://worldcookery.com/files/jeffshell-todo/</a> )</p>
<p>where Jeff tells you how to build a Rails-like ToDo-Application
in some simple steps. In every step he shows you what
to do and why he thinks this implementation is carefully
thought out in Zope3 and what is the reason they did it this
and no other way.</p>
<p>c) Want a fresh new zope3-site without understandig “all the magic”
inside? Choose life - choose the z3 project starter
<a class="reference" href="http://www.zope.org/Members/adytumsolutions/z3project_starter/z3project_starter_released">http://www.zope.org/Members/adytumsolutions/z3project_starter/z3project_starter_released</a>
Answer a few simple questions and you have a project skeleton
to play around with without deeply understanding all this “kool-aid” upfront.</p>
<p>d) Philipp von Weitershausens Website/Book about Zope3 -
<a class="reference" href="http://worldcookery.com">http://worldcookery.com</a></p>
<p>You will find more of this tutorials on Phillips website under
<a class="reference" href="http://worldcookery.com/appetizers">http://worldcookery.com/appetizers</a>.</p>
<p>And this is not the end. New stuff is landing every day
in Zope3-space - like this little gem about events/notifications
and how they help you handle complex application
architectures:</p>
<p><a class="reference" href="http://remarkablysimple.blogspot.com/">http://remarkablysimple.blogspot.com/</a></p>
<p>Or you look at www.z3lab.org where you can get a peek
of the Zope3-ECM-Initiative and so on so on …</p>
<p>So, my advice to you: Fire on feedster.com, type in Zope3 …
and you’ll find a lot more of this diamonds.</p>
<p>I made the experience that most of the complaints about
Kool-Aid come from developers who specialized in certain
frameworks/habits and now had difficulties to extend
their mindset since they had to leave known territory.
They struggled with Zope3, found some hurdles and then gave up,
since “there’s so much kool-aid”.</p>
<p>I was surprised to find out that absolute newbies to programming
get productive with Zope3 very fast and easily -
maybe since they are not fixed on certain stuff.</p>
<p>I mean, sometimes I don’t get it: People want to write programs
for real complex enterprise scenarios, but at the same
time tell me it’s too hard to spend a few hours to play with some toy examples
and read some docs and play with the marvellous python command prompt
trying to push their brain into a new direction.</p>
<p>Believe me: This whole interface-adapter-pattern definitely helps
you in bigger/complex projects evolving over time.
Remember Fred Brooks Mythical Man-Month, which made so many of us aware
that change of requirements is inherent in any software project -
even if the whole system is in production use.</p>
<p>Zope3 has not ALL, but a lot of REALLY GOOD answers
to this situation every developer faces from time to time ;-)</p>
</div>
<div class="section">
<h3><a id="querying-the-zodb-from-outside-applications" name="querying-the-zodb-from-outside-applications">Querying the ZODB from outside applications</a></h3>
<p>（如何单独访问ZODB，有人在弄，但是作者还不很清除）</p>
<p>I’m convinced that it should be easy and I know
that the guys in the Bebop-Project did some stuff
in this direction, But I’m no expert in that,
since relational databases
constitutes more of my work. If you want to
have a profound answer on this - push it
on the Zope3-Users-Mailinglist (sorry, that
wasn’t a sufficient answer, right?). Those
helpful souls there will really show you
the best and easiest way to do it.</p>
</div>
<div class="section">
<h3><a id="coming-back-to-your-plone-dissatisfaction" name="coming-back-to-your-plone-dissatisfaction">Coming back to your Plone-dissatisfaction</a></h3>
<p>（回到Plone的问题，Plone现在正在和zope3合并）</p>
<p>I don’t want to tell you that Plone is bad. Or Plone
sucks. Or stuff like that. For me it’s the right tool
for the projects it was made of - usable portal solutions
for medium size. The same holds for Django which
is also OK, if I want to make a fast RDBMS-UI-App.</p>
<p>The good thing is: For different work tasks there
are different tools in my toolchest. It’s my
responsibility to choose the right one for
every new project, but it leaves me with a
warm safe feeling that the toolbelt is filled
with such good quality stuff.</p>
<p>And the good news is just around the corner:
Plone and Zope3-World are converging - approaching
each other with every day. Now what does that mean?</p>
<p>Since I worked with plone it was easy to find my
way in Zope3-World. Zope3 tried to learn from
the Zope2 AND the plone lessons and put a lot of
the best breed of Plone (which constituted at the
same time those hard-to-manage architectural overhead)
back to the core of the framework. Well, this
is not totally right, since there is no such thing
as a monolithic core of Zope3-framework - the greatest lesson
learned from the problems with complex Zope2-projects.
Which is the best news of all ;-)</p>
<p>Know Archetypes ? There is schema-driven content-types
with form generation (zope.formlib)</p>
<p>Know Skins and Layers ? Use them right away in Zope3</p>
<p>Know Portlets ? Generalized to Viewlets and managed via ViewletManagers.</p>
<p>RessourceRegistries? Now known as RessoureLibrary.</p>
<p>… and so on … and so on …</p>
<p>But at the same time the Plone guys push their stuff
more and more towards the proven Z3-technologies -
and by handing over Z3 the framework responsibilities
the Plone community again can concentrate on being
the big shot at their homeground -
to provide you with the “MacOS of CMSes”
(well at least that’s what Limi told me ;-)</p>
<p>I also appreciate the other web frameworks
in Python world - and I’m happy to see that
there will be a “WebFramework”-Track during
Europython this year where zopies, djangistas
and turbogearianos and all those funky-stuffistas
will get into fruitful
discussions about solutions. I’m really
looking forward to this meeting since
we can learn a lot from each other
if we leave our minds open for the NEW.</p>
</div>
<div class="section">
<h3><a id="zope3" name="zope3">作者使用zope3的一些感想</a></h3>
<p>（20年的开发经验了，还是觉得zope3最牛）</p>
<p>There is so much more to say about this marvellous
piece of software (like the integration
of other templating languages like meld or clarity
or the integration of standards like Java-like Portlet-Stuff or
WFMC - the Workflow-Coalition - and and and)
but let me come to an end, since it’s really late
and I need some sleep:</p>
<p>I work for 20 years with software and applications.
Zope3 is one of the most professionall, mature
and qualitative outstanding frameworks I saw.</p>
<p>It’s really fun to work with, if you have a sense for
lasting quality solutions, if you want to be
proud of the stuff you created.</p>
<p>Thanx for your patience + Good night,</p>
<p>Holger &#64; Germany</p>
<p>PS: If you’ve got any specific question about Zope3,
drop me a not at <a class="reference" href="mailto:booradley&#64;web.de">booradley&#64;web.de</a>. Or visit some
of the links in my rant. Or subscribe
to the Zope3-User-Newsgroups and ask your questions.
This world is really full of possibilities ;-)
# Holger Froebe Says:
February 8th, 2006 at 6:13 pm</p>
</div>
<div class="section">
<h3><a id="id1" name="id1">一些zope3的案例</a></h3>
<p>Ah, and I forgot - the collaborative development
of my favourite Linux distro (Ubuntu)
is managed by a Zope3-Application -
see <a class="reference" href="http://launchpad.net">http://launchpad.net</a> …</p>
<p>or the shiny Z3-based Schooltool if you want
to manage ressources and calendars …
see <a class="reference" href="http://www.schooltool.org">http://www.schooltool.org</a></p>
<p>Zope3 is really smoking ;-)</p>
</div>
