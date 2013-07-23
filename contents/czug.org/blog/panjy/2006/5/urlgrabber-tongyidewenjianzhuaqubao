<p>一个支持ftp/http/https/file等各种方式的文件抓取的python包。</p>
<p>可能会比较有用的一个包： <a class="reference" href="http://linux.duke.edu/projects/urlgrabber/">urlgrabber</a></p>
<ul class="simple">
<li>FTP, http, file，统统都支持</li>
<li>甚至支持断点续抓</li>
<li>支持代理</li>
<li>支持镜像组</li>
</ul>
<p>简单的用法:</p>
<pre class="literal-block">
url = &quot;http://host/tmp/foo&quot;  # 也可为http/https/ftp/file，或者直接的文件路径

from urlgrabber import urlopen, urlgrab, urlread

# 模仿文件操作
fo = urlopen(url)
data = fo.read()
fo.close()

# 下载下来
local_filename = urlgrab(url)

# 读取到一个字符串中
data = urlread(url)
</pre>
<p>这个产品是基于python的urllib2编写的一个纯python包。如果希望得到更好的性能，以及更强的功能(比如sftp)，
可考虑使用基于 <a class="reference" href="http://curl.haxx.se/libcurl/">libcurl</a> 的 <a class="reference" href="http://pycurl.sourceforge.net/">pycURL</a> 。 <a class="reference" href="http://curl.haxx.se/libcurl/">libcurl</a> 是使用C语音编写的， <a class="reference" href="http://pycurl.sourceforge.net/">pycURL</a> 则是对 <a class="reference" href="http://curl.haxx.se/libcurl/">libcurl</a> 的python封装。</p>
