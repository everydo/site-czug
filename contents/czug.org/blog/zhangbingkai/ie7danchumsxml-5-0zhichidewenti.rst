---
created: 2007-02-01 11:14:48
creator: zhangbingkai
description: ''
title: IE7弹出MSXML 5.0支持的问题
---
<h1>IE7弹出MSXML 5.0支持的问题</h1>
<p>IE7显示支持在之前贴过一篇贴子，见<a href="../2006/11/rangnideplonezaiie7shangxianshizhengchang">这里</a></p><p>当你使用Plone的电脑安装了Office 2003后，用IE7打开Plone站点，IE7弹出提示“未验证的MSXML 5.0” 。见<a href="http://swik.net/Plone/CMS.Info+Blog/Sarissa+Javascript+problems+in+IE7/qqk2">这里</a></p><p>这个问题在当前的Plone2.1, 2.5 版本中都有出现，早期的版本应该也有。这是因为Plone需依赖一个叫做Sarissa外部扩展库，它在IE7中检查本地执行的XmlHttpRequest对象，而IE7 在MSXML5.0中拒绝执行XmlHttpRequest对象。所以本地安装
MSXML 5.0 （Office 2003安装了它）后，就会在IE7中弹出“未验证的MSXML 5.0”。</p>这主要是Kupu和LiveSearch使用了Sairissa，你可以在这里找到它们：<br /><br />Products/kupu/common/sarissa.js<br />Products/validation/kupu/common/sarissa.js<br />Products/validation/CMFPlone/skins/plone_3rdParty/sarissa.js<br />Products/CMFPlone/skins/plone_3rdParty/sarissa.js<br /><br />找到如下所示的代码：<br /><br /><pre> _SARISSA_XMLHTTP_PROGID = pickRecentProgID(["Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], [["XMLHTTP", 4]]);<br /> _SARISSA_THREADEDDOM_PROGID = pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.5.0","MSXML2.FreeThreadedDOMDocument.4.0", "MSXML2.FreeThreadedDOMDocument.3.0"]);<br /> _SARISSA_XSLTEMPLATE_PROGID = pickRecentProgID(["Msxml2.XSLTemplate.5.0","Msxml2.XSLTemplate.4.0", "MSXML2.XSLTemplate.3.0"], [["XSLTPROC", 2]]);</pre>

更改成如下：

<pre> _SARISSA_XMLHTTP_PROGID = pickRecentProgID(["Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], [["XMLHTTP", 4]]);<br /> _SARISSA_THREADEDDOM_PROGID = pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.4.0", "MSXML2.FreeThreadedDOMDocument.3.0"]);<br /> _SARISSA_XSLTEMPLATE_PROGID = pickRecentProgID(["Msxml2.XSLTemplate.4.0", "MSXML2.XSLTemplate.3.0"], [["XSLTPROC", 2]]);</pre>

这个问题应该在Plone未来的版本不会出现，Kupu也更新的新的版本，当然这个问题，如果用Kupu新版本应该也可解决,The <a href="http://plone.org/products/kupu">latest release of Kupu</a> .<br />