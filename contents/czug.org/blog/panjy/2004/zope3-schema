
 <p><br />
 原文：<a href="http://www.czug.org/docs/zope/zope3book/Schema">Zope Schemas and
 Widgets (Forms)</a><br />
 <br />
 总的来说：Schema用来描述对象的属性，是数据的接口；Widget用来展现对象，是显示的接口。这样可以最终实现表单的自动生成、自动进行数据合法性判断等，省去的大量的编码工作。<br />
 <br />
 Zope2的Archetypes上也有Schema和Widget，但zope3的这套机制更加底层、更加完善、更加合理。<br />
 <br />
 Archetypes上，是以schema为中心，在Field中引用Widget，这二者有些纠缠；<br />
 <br />
 zope3上，schema中完全独立于widget，是在widget中引用field，这个结构应该更趋合理。zope3的Schema实际上是Interface的扩展，他不仅仅用于界面的显示，如，他还用于ZCML指令的定义。<br />
 <br />
 Zope3的field非常细，可以看到，Text/TextLine等文本都是基于unicode的，这表示他对中文的支持将更好。这一点也和archetypes的unicode存储是一致的。<br />
 <br />
 zope3的widget也有所不同，目前看到的更多是通过程序生成widget的html，或者通过ZCML来定义一个form，或者改变一个widget的属性。而在archetypes中，widget更多是用ZPT的macro实现的。</p>
<br />
 <br />
