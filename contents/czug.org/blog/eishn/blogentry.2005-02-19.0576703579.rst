<p>&nbsp;&nbsp;&nbsp;
 休息了一段时间之后，我又回到了广州，按照一篇别人给我写的传记的说法：沈崴又开始了他在广州纸醉金迷般的生活。<br />
 &nbsp;&nbsp;&nbsp;
 在年前，我开始为一个软件设计图形用户界面，当然我并不是一个专职的客户端程序员，出于程序员懒惰的优点，我花了两天的时间编写了一个 Python
 脚本。实现了一个功能，就是在 HTML 中调用 Python 。这样，我就可以工作在我擅长的 Javascript
 下来进行本地应用程序的设计了。整个界面可以通过 Dreamwaver 画出来，这当然是相当好玩的！<br />
 &nbsp;&nbsp;&nbsp; 使用起来也是相当方便的：<br />
 &nbsp;&nbsp;&nbsp; &lt;!-- example.html 界面部分 --&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;html&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;form action="HAHA://example.test"
 method="get"&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;input type="hidden" name="a" value="hello"&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;input type="hidden" name="b" value="world"&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;input type="submit"&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;/form&gt;&lt;br&gt;<br />
 &nbsp;&nbsp;&nbsp; ------------&lt;br&gt;<br />
 &nbsp;&nbsp;&nbsp; 或者：&lt;br&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;a
 href="HAHA://example.test?a=hello&amp;b=world"&gt;submit&lt;/a&gt;&lt;br&gt;<br />
 &nbsp;&nbsp;&nbsp; ------------&lt;br&gt;<br />
 &nbsp;&nbsp;&nbsp; 或者使用 Javascript submit<br />
 &nbsp;&nbsp;&nbsp; &lt;/html&gt;<br />
 <br />
 &nbsp;&nbsp;&nbsp; # example.py<br />
 &nbsp;&nbsp;&nbsp; # Python Module example<br />
 &nbsp;&nbsp;&nbsp; import string<br />
 &nbsp;&nbsp;&nbsp; def test(**kw):<br />
 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; print string.join([kw["a"], kw["b"],
 "!"])<br />
 <br />
 &nbsp;&nbsp;&nbsp; 在这个程序中， example.html 是程序界面，其中如果 form action 使用到的协议为 HTTP
 那么将与普通的 HTML 页面没有区别，进行表单提交；而如果为 HAHA (这个是可以自定义的)的话，程序就会调用 Python 模块 example 的
 test 函数，各个表单成员将变成传给 test 的 Keywords 参数。<br />
 &nbsp;&nbsp;&nbsp; 这是相当容易实现的，我使用了 wxWidget 的 wxIEHtmlWin 组件，然后把它的
 OnBeforeNavigate2 事件截获，取得 GetString ，如果发现提交的协议是 HAHA 的话，就调用 Python
 模块，并且阻止页面眺转。<br />
 &nbsp;&nbsp;&nbsp; 当然，这种方法只能使用 Get 方法，而 Get
 方法有字串长度限制，这限制了参数传递的数据量大小。同时如何将返回值传递给 HTML 页面，也是一个大的问题。<br />
 &nbsp;&nbsp;&nbsp; 而对于 Javascript 而言，则需要一个更好的接口，使调用 Python 脚本，就像在调用
 Javascript 程序本身一样：<br />
 &nbsp;&nbsp;&nbsp; &lt;html&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;script&gt;<br />
 &nbsp;&nbsp;&nbsp; test = PythonMethod("example.test");<br />
 &nbsp;&nbsp;&nbsp; result = test("hello", "world");<br />
 &nbsp;&nbsp;&nbsp; alert(result);<br />
 &nbsp;&nbsp;&nbsp; &lt;/script&gt;<br />
 &nbsp;&nbsp;&nbsp; &lt;/html&gt;<br />
 <br />
 &nbsp;&nbsp;&nbsp; 使用一些技巧，这些问题都是可以解决的。我自己本身实现了一个简单的封装，感觉到：要漂亮地把 Python 接口到
 HTML &amp; Javascript ，是一件非常伤神的事情。</p>