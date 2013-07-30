---
created: 2006-05-09 22:10:52
creator: panjy
description: Zope2的FileUpload对象是如何保存上传文件的。
title: 文件上传对象FileUpload探究
---
<p>Zope2的FileUpload对象是如何保存上传文件的。</p>
<p>表单页面中的所有输入，包括上传的文件，Zope都保存在request对象中。request对象可从上下文对象中获取:</p>
<pre class="literal-block">
request = self.REQUEST
file_foo = request['file_foo']
</pre>
<p>上传的文件file_foo是一个FileUpload对象。FielUpload对象是对Python的 <tt class="docutils literal"><span class="pre">cgi.FieldStorage</span></tt> 对象的一个封装，
可直接在ZMI中使用FileUpload对象(Zope有权限沙箱保护，ZMI中不能直接使用FieldStorage)。</p>
<p>FileUpload是在Zope 2的 <tt class="docutils literal"><span class="pre">ZPublisher/HTTPRequest.py</span></tt> 中定义的。</p>
<p>FielUpload更象一个普通的file对象，包括file对象的所有接口:</p>
<pre class="literal-block">
'close', 'fileno', 'flush', 'isatty',
'read', 'readline', 'readlines', 'seek',
'tell', 'truncate', 'write', 'writelines'
</pre>
<p>另外，FileUpload还增加了FieldStorage的headers和filename属性。</p>
<p>大文件上传的时候，cgi.FieldStorage会将文件存放到 <tt class="docutils literal"><span class="pre">tempfile.TemporaryFile</span></tt> 创建的一个临时文件中，用完后这个文件会自动清除。</p>
