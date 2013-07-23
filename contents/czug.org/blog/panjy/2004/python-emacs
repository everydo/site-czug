
 <p>尽管<a href="http://www.gnu.org/software/emacs/emacs.html">Emacs</a>那么的牛，但是从前用的多的还是简单的
 <a href="http://www.vim.org/">vi</a>。受不了吸引，决定开始使用Emacs进行Python的编程。<br />
 <br />
 <a href="http://www.python.org/emacs/">python.org上emacs的主页</a>和<a href="http://www.python.org/cgi-bin/moinmoin/EmacsEditor">对应wiki</a>中，对<a href="http://sf.net/projects/python-mode">python-mode</a>竟然没有太多的介绍，反而在另外一个网站上找到了一些
 <a href="http://shattered.teched.net/www.python.org/emacs/">emac的资料</a>，特别是
 <a href="http://shattered.teched.net/www.python.org/emacs/python-mode/installation.html">
 安装过程</a>。<br />
 <br />
 安装过程总结一下：</p>
 <ol>
 <li>使用最新的emacs：大于21.1的XEmacsen，或者大于20.7的Emacsen.</li>
 <li>确保安装了<i>prog-modes</i>这个包，在debian中很简单:<br />
 apt-get install prolog-el</li>
 <li>
 <p>在<a href="http://sf.net/projects/python-mode">python-mode</a>项目中，下载<code>python-mode.el</code></p>
 </li>
 <li>字节编译，在emacs中输入命令（警告信息可忽略）：<br />
 <pre>
C-x C-f /path/to/python-mode.el RET<br />
M-x byte-compile-file RET
</pre>
 </li>
 <li>确保python-mode.el在加载路径中，测试方法：<br />
 <pre>
M-x locate-library RET python-mode RET
</pre>
如果没有，加入下行到自己的.emacs文件中：<br />
 <pre>
(setq load-path (cons "/dir/of/python-mode/" load-path))
</pre>
 </li>
 <li>文件关联，自动将py后缀的文件和pyhton-mod关联，在自己的.emacs文件中添加：<br />
 <pre>
(setq auto-mode-alist<br />
 (cons '("\\.py$" . python-mode) auto-mode-alist))<br />
(setq interpreter-mode-alist<br />
 (cons '("python" . python-mode)<br />
 interpreter-mode-alist))
</pre>
 </li>
 <li>自动加载，将 <code>python-mode</code> 和文件
 <code>python-mode.elc</code>关联，在自己的.emacs文件中添加：<br />
 <pre>
(autoload 'python-mode "python-mode" "Python editing mode." t)
</pre>
 </li>
 <li>语法加亮，这个功能可不能少哟:) 同样在自己的.emacs文件中添加：<br />
 <pre>
;;; add these lines if you like color-based syntax highlighting<br />
(global-font-lock-mode t)<br />
(setq font-lock-maximum-decoration t)
</pre>
 </li>
 <li>
 <p>支持中文，在.emacs中添加：</p>
 <pre class="PROGRAMLISTING">
(set-language-environment 'Chinese-GB)<br />
(set-keyboard-coding-system 'euc-cn)<br />
(set-clipboard-coding-system 'euc-cn)<br />
(set-terminal-coding-system 'euc-cn)<br />
(set-buffer-file-coding-system 'euc-cn)<br />
(set-selection-coding-system 'euc-cn)<br />
(modify-coding-system-alist 'process "*" 'euc-cn)<br />
(setq default-process-coding-system <br />
 '(euc-cn . euc-cn))<br />
(setq-default pathname-coding-system 'euc-cn)
</pre>
 </li>
 </ol>
 <p>好了！进入emacs试验一下：</p>
 <pre>
emacs abc.py
</pre>
 <p>可以看到emacs的底部显示：Using the CPython
 shell。可以试着输入一些代码，加亮显示没有问题，支持自动缩进，支持自动括号匹配提示.... 使用C-h
 m你可以看到python模式的详细帮助文件，功能果然很强大！</p>
 <p>其他的链接：</p>
 <ul>
 <li>Python Mode - Syntax highlighting, interactive python shell, sexpr
 evaluation and commenting.<br />
 <a href="http://www.python.org/emacs/python-mode/">http://www.python.org/emacs/python-mode/</a>
 <a href="http://www.emacswiki.org/cgi-bin/wiki/PythonMode"><br />
 http://www.emacswiki.org/cgi-bin/wiki/PythonMode</a></li>
 <li>gud.el - The grand unified debugger, included in Emacs. Supports pdb
 (Python debugger).<br />
 调试Python程序, <a href="http://www.emacswiki.org/cgi-bin/wiki/GrandUnifiedDebugger">效果</a>，<a href="http://page.sourceforge.net/tricks.html">技巧</a>， <a href="http://twisted.sourceforge.net/TwistedDocs-1.2.0/howto/debug-with-emacs.html">
 操作</a>，<a href="http://www.zope.org/Members/teyc/howtoDebugZope2">windows上对zope的调试</a></li>
 <li>psvn - Integrate Subversion into Emacs' VC version control
 interface.<a href="http://xsteve.nit.at/prg/emacs/psvn.el"><br />
 http://xsteve.nit.at/prg/emacs/psvn.el</a></li>
 <li>Emacs 代码浏览 - Fancy class browsing, navigation, history, etc<a href="http://ecb.sourceforge.net/"><br />
 http://ecb.sourceforge.net/</a></li>
 <li>Dynamic Abbrevation - Tab-complete anything, intelligently<a href="http://www.emacswiki.org/cgi-bin/wiki/DynamicAbbreviations"><br />
 http://www.emacswiki.org/cgi-bin/wiki/DynamicAbbreviations</a></li>
 <li>Many nifty tricks to improve your day<a href="http://www.emacswiki.org/cgi-bin/wiki/EmacsNiftyTricks"><br />
 http://www.emacswiki.org/cgi-bin/wiki/EmacsNiftyTricks</a></li>
 <li><a href="http://sourceforge.net/projects/oo-browser/">OO-Browser</a>支持python对象的浏览。</li>
 </ul>
 <ul>
 <li><a href="http://www.emacswiki.org/cgi-bin/wiki/PyMacs">pymacs</a>支持使用python来扩展emacs</li>
 <li><a href="http://zhdotemacs.sourceforge.net/emacs/">中文化Emacs</a><br /></li>
 <li><a href="http://wvw.ttian.net/article/show.php?id=139">使用emacs调试程序的中文资料</a></li>
 </ul>
