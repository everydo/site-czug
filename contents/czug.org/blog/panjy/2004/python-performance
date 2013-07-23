
 <p>作为一个动态语言，Python的性能是比不上Java和C的，Python最重要的特性是Productive(生产率、产出率).<br />
 <br />
 很多人喜欢抓住Python的性能喋喋不休，guido在邮件列表上<a href="http://mail.python.org/pipermail/python-dev/2004-December/050283.html">发起了讨论</a>。总结在<a href="http://dirtsimple.org/2004/12/perception-of-speed.html#c110270144133808384">
 这里</a>，有人提出改进python，增加静态编译器，有人则说“如果性能慢，就用C改写”是python宣传上的一些误导。<br />
 <br />
 如何优化性能， <a href="http://dirtsimple.org/2004/12/perception-of-speed.html#c110270144133808384">Ian
 Bicking</a>从python自身给出了性能优化的说明：<br />
 <br />
 For most performance issues (like 95% or more) the answer isn't rewriting
 slow portions in C, it's rewriting slow portions in Python. For most
 programmers, the suggested steps should be:<br />
 <br />
 1. Try it; maybe performance isn't the issue you expect it to be.<br />
 2. If it is, run a profiler.<br />
 3. Look for places to leverage Python's built-in functions. Implement
 algorithms in terms of Python's built-in data structures, like dictionaries
 and lists.<br />
 4. If startup is slow, do things lazily.<br />
 5. If it's slow after startup, cache results.<br />
 6. Find the (small) performance-critical portions, and use some of the
 Python-specific tricks, like avoiding global and method lookup.<br />
 7. Try psyco. It can't hurt, and requires about 20 seconds of effort,
 including reading the necessary docs.<br />
 8. Then, if you've done steps 1-7, maybe try rewriting a portion in a faster
 compiled language. But you'll probably achieve your goals faster by going
 through steps 2-7 a second time before you try this.<br />
 <br />
 另外，这里还有一个帖子，<a href="http://www.blueskyonmars.com/archives/2004/12/29/blue_sky_development.html">比较C/java/Python这几种语言</a>。</p>
