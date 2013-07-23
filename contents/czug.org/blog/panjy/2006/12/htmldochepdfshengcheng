<p>htmldoc能够将html转换成PDF文件</p>
<p><a class="reference" href="http://www.htmldoc.org">htmldoc</a> 包括2个版本，开源版本和商业版本。
ubuntu上是可直接使用 sudo apt-get install htmldoc 安装的。
Windows上的用户如果不想出点血，就得自己去编译了吧...</p>
<p>htmldoc有个很好的web界面，但是我主要是想在服务器上使用，
因此我对其命令行使用更感兴趣。</p>
<p>要将页面filename.html，转换成PDF，执行这个就可以了:</p>
<pre class="literal-block">
htmldoc --webpage -f output.pdf filename.html
</pre>
<p>要将file1.html, file2.html组装成一个分页的PDF，可执行这个:</p>
<pre class="literal-block">
htmldoc --webpage -f output.pdf file1.html file2.html
</pre>
<p>最酷的在这里了，要把slashdot.org的首页转换成PDF，很轻松:</p>
<pre class="literal-block">
htmldoc --webpage -f output.pdf http://slashdot.org/
</pre>
<p>想制作一本带目录的书，很容易:</p>
<pre class="literal-block">
htmldoc --book -f output.pdf file1.html file2.html
</pre>
<p>想增加一个漂亮的图片做封皮？这样的:</p>
<pre class="literal-block">
htmldoc --book -f 12book.pdf 1book.html 2book.html --titlefile bookcover.jpg
</pre>
<p>说了这么多好，最大的问题却遗漏了，支持中文吗？非常遗憾，还不支持UTF-8/Unicode/Chinese/Japanese。
看到有文章说1.9版本会支持UTF8，1.9也还没正式release. 具体如何，还不得而知。</p>
<p>又想起了 <a class="reference" href="http://www.reportlab.org/whatsnew_2_0.html">ReportLab</a> ，
2.0版本最大的特性就是支持unicode，但是我现在已经忘记上次评测的结果了。</p>
<p>中文PDF生成是心中永远的痛。</p>
<p>对了，前2天研究了下openoffice的转换机制，有个oooconv的产品，在这里:</p>
<blockquote>
<a class="reference" href="https://infrae.com/svn/buildout/oooconv-dev/trunk/">https://infrae.com/svn/buildout/oooconv-dev/trunk/</a></blockquote>
<p>但是它只能在Linux上运行，而且安装很麻烦，不过这个方法还是很值得跟踪的。</p>
