<p>开始关注 <a class="reference" href="http://www.bazaar-ng.org/">Bazaar-NG</a> (bzr)这个分布式的版本管理系统，最初的原因有2个：</p>
<ul class="simple">
<li>这是Canonical公司支持的一个项目，也就是 <a class="reference" href="http://www.ubuntulinux.org">ubuntu</a> linux的发行公司</li>
<li>是python编写的</li>
</ul>
<p>既然有subversion这样的集中式版本管理系统好东东，为什么还要这个产品呢？</p>
<p>进一步用下来，发现一些理由：</p>
<ol class="arabic">
<li><p class="first">支持脱机工作，方便同步</p>
<p>这是一个 <a class="reference" href="http://bazaar.canonical.com/AaronBentleysBzrStories">bzr用户的小故事</a></p>
<p>不过 subversion 上据说有一个svk，能够实现这个功能了</p>
</li>
<li><p class="first">简单, 还是简单</p>
<p>看看这个 <a class="reference" href="http://bazaar.canonical.com/TheIndependant">bzr初学者的happy经历</a> （我觉得这个故事是最佳的bzr入门教程）</p>
<ul class="simple">
<li>不需要安装什么服务器，0管理</li>
<li>透明的存储格式</li>
<li>branche就拷贝操作（但会浪费空间？），提交版本不需要申请写权限(所有工作都在branch上完成)</li>
<li>不再需要那么长的url, 所有都是本地操作！！merge操作超级简单</li>
<li>如何定位版本：http://bazaar.canonical.com/BzrRevisionSpec</li>
</ul>
</li>
<li><p class="first">小核心，多插件的架构</p>
<p>bzr很容易加插件，很多高级特性都是以插件的形式提供的，这能够让核心快速前进。</p>
<p>有大量的 <a class="reference" href="http://bazaar.canonical.com/BzrPlugins">BzrPlugins</a> , 其中 <a class="reference" href="http://bazaar.canonical.com/BzrTools">BzrTools</a> 包括：</p>
<ul class="simple">
<li>Push: rsync增量提交省带宽</li>
<li>Annotate: 显示每行是谁、什么时候修改的</li>
<li>Shelve/Unshelve: 比undo更强的undo，可指定回退什么修改！！这个是subversion难奢望的了</li>
<li>Clean-Tree: 清理不认识的东东，好像svn没有这个功能？</li>
<li>Graph-Ancesty: 使用 <a class="reference" href="http://www.graphviz.org/">dot</a> 图形显示版本历史</li>
<li>Shell: 支持自动完成拼写等超强功能的bzr命令解释环境</li>
<li>Patch: 加补丁</li>
</ul>
<p>看到主页上介绍，可方便在上面编写和工作流相关的功能。这个倒使我觉得和Plone集成可能会比较方便。</p>
</li>
</ol>
<p>疑问：</p>
<ol class="arabic">
<li><p class="first">做一个分支，需要把整个版本库都拷贝下来。</p>
<p>这个有一点夸张，如果库很大，特别是二进制图片什么的，岂不非常耗时？</p>
</li>
<li><p class="first">没有看到subversion的文件属性功能</p>
</li>
<li><p class="first">没有看到好的web界面</p>
</li>
<li><p class="first">个人觉得小的代码库用这个管理还不错，大的可能存在问题</p>
</li>
<li><p class="first">虽然是分布式的，我觉得也还是应该学习subversion，做一个服务器，能够更好的支持增量版本提交(或者利用webdav的功能？)。</p>
</li>
</ol>
<p>参考：</p>
<ol class="arabic simple">
<li><a class="reference" href="http://drupal.org/node/45368">Drupal 也是采用Bazaa-NG管理代码</a> ，主要是方便代码贡献</li>
<li><a class="reference" href="http://blog.ianbicking.org/distributed-vs-centralized-scm.html">采用分布式，还是集中式的版本管理:</a></li>
<li><a class="reference" href="http://bazaar.canonical.com/BzrGivingBack">bzr自己是这么组织开发的！</a></li>
<li><a class="reference" href="http://bazaar.canonical.com/IntroductionToBzr">短小的教程</a></li>
<li><a class="reference" href="_Bazaar-NG">bzr</a> 是 基于 <a class="reference" href="http://bazaar.canonical.com/">bazaar</a> 的，而 <a class="reference" href="http://bazaar.canonical.com/">bazaar</a> 又是基于 <a class="reference" href="http://www.gnu.org/software/gnu-arch/">arch</a> 的。</li>
<li><a class="reference" href="http://abridgegame.org/darcs/">darcs</a> 是另外一个更加成熟的分布式版本管理系统，但是采用比较怪异的Haskell语言编写 <a class="reference" href="_Bazaar-NG">bzr</a> 向 <a class="reference" href="http://abridgegame.org/darcs/">darcs</a> 学习了很多，而且在继续学习。</li>
</ol>
