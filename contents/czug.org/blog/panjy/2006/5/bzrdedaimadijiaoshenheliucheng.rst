<p>bzr是如何规范代码提交集市的交易规则的。</p>
<p><a class="reference" href="http://bazaar-vcs.org/FrontPage">bzr</a> 项目有一个
<a class="reference" href="http://bazaar-vcs.org/bzr/bzr.dev/HACKING">代码提交规范</a> .
其中最后一节是讲解代码的提交审核流程。这个流程非常值得czug社区
项目协作参考。</p>
<p>是这样的：</p>
<ol class="arabic">
<li><p class="first">发送邮件到 <a class="reference" href="mailto:bazaar-ng&#64;lists.canonical.com">bazaar-ng&#64;lists.canonical.com</a> 这个邮件列表，
告知补丁、变更和分支的链接地址。</p>
<p>邮件标题加上[patch], 正文给出说明，并加上diff文件附件。</p>
<p>如果邮件已经可合并，标题加上[merge]；如果仅用于讨论，标题加上[rfc]</p>
</li>
<li><p class="first">任何人都欢迎参与审核代码，需要过三关：</p>
<ul class="simple">
<li>保持测试覆盖范围，所有新功能都应该有测试代码</li>
<li>代码必须保持设计的清晰性</li>
<li>解决了bug，有新的特性，速度问题，代码简洁性</li>
</ul>
<p>如果你阅读了代码，你应该说明你的意见。任何人可用数字评分，比如</p>
<ul class="simple">
<li>-1: 实在不采纳这个代码</li>
<li>-0: 有点不舒服</li>
<li>+0: 我没有问题</li>
<li>+1: 采纳</li>
</ul>
<p>如果核心人员给了2个+1票，而且没有否决票，则采纳。</p>
</li>
<li><p class="first">任何核心开发人员都可以把他集成到主分支中。主要负责人会定期进行处理。</p>
</li>
</ol>
<p>对于CZUG来说：</p>
<p>可提交到人气足一些的 <a class="reference" href="mailto:czug-plone&#64;googlegroups.com">czug-plone&#64;googlegroups.com</a> 或者 <a class="reference" href="mailto:czug-zope&#64;googlegroups.com">czug-zope&#64;googlegroups.com</a> 中。
如果量非常大，以后可转到czug-<a class="reference" href="mailto:dev&#64;googlegroups.com">dev&#64;googlegroups.com</a> 中。</p>
