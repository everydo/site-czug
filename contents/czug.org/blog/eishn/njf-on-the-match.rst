<ul>
  <li>通过模板(div id="tmpl"), 创建三个窗体。</li>
</ul>
<ul>
  <li>每个窗体替换一个组件到模板变量("&lt;!--widget--&gt;")。</li>
  <li>其中第三个窗体已经图标化。</li>
  <li>模板可以任意复杂, 并支持子模板。</li>
  <li>简单组件(Text、Radio/Checkbox Group、Button、Password 等)略。</li>
  <li>通信库略。<br />
  </li>
</ul>

<pre>&lt;html&gt;<br />&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"&gt;<br />&lt;head&gt;<br />&lt;script src="njf-loader.js"&gt;&lt;/script&gt;<br />&lt;div id="tmpl" style="display: none;"&gt;<br />&amp;nbsp;&lt;!--widget--&gt;&amp;nbsp;<br />&lt;/div&gt;<br />&lt;/head&gt;<br />&lt;body&gt;<br />&lt;script&gt;<br />LoadNJFFamily();<br />var wnd1 = ECW.Window(ECW.TemplateById('tmpl')); // 我们可以从站点上临时下载一个模板<br />var wnd2 = ECW.Window(ECW.TemplateById('tmpl'));<br />var wnd3 = ECW.Window(ECW.TemplateById('tmpl'));<br /><br />wnd2.setIcon(ScriptBase + 'images/w3nemesis.gif')<br />wnd3.setIcon(ScriptBase + 'images/w3ecw.gif')<br /><br />wnd1.ecwBody.setVal('widget', ECW.RichEditor());<br />wnd1.ecwBody.active();<br />wnd2.ecwBody.setVal('widget', ECW.Calendar());<br />wnd2.ecwBody.active();<br />&lt;/script&gt;<br />&lt;/body&gt;<br />&lt;/html&gt;</pre>
<img src="../images/njfonthematch.jpg" />