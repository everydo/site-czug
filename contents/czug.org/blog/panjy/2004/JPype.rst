
 <p>Java有丰富的包。使用<a href="http://jpype.sourceforge.net/">JPype</a>，可直接在CPython中使用Java的包：</p>
 <pre wrap="">
 &gt;&gt;&gt; from jpype import startJVM, getDefaultJVMPath, java<br />
 &gt;&gt;&gt; startJVM(getDefaultJVMPath())<br />
 &gt;&gt;&gt; java.lang.System.out.println('Hello world')<br />
 Hello world
</pre>
 <p>使用JPype，我们便可轻松利用一些Java的包了，典型的比如Lucene等，甚至直接使用jsp/servlet等服务器技术！<br />
 <br />
 <a href="http://www.jython.org">Jython</a>很滞后了，Jython其实更多是Java程序员的福音。JPype则是为Python程序员打开了Java之门。</p>
