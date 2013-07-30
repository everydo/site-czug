<p>出处： <a href="http://www.woodpecker.org.cn/diveintopython/installing_python/index.html">http://www.woodpecker.org.cn/diveintopython/installing_python/index.html</a></p>
      <div class="chapter" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install"></a>第&nbsp;1&nbsp;章&nbsp;安装 <span class="application">Python</span></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="toc">
            <ul>
               <li><span class="section"><a href="#install.choosing">1.1. 哪一种 Python 适合您？</a></span></li>
               <li><span class="section"><a href="#windows.html">1.2. Windows 上的 Python</a></span></li>
               <li><span class="section"><a href="#macosx.html">1.3. Mac OS X 上的 Python </a></span></li>
               <li><span class="section"><a href="#macos9.html">1.4. Mac OS 9 上的 Python </a></span></li>
               <li><span class="section"><a href="#redhat.html">1.5. RedHat Linux 上的 Python </a></span></li>
               <li><span class="section"><a href="#debian.html">1.6. Debian GNU/Linux 上的 Python </a></span></li>
               <li><span class="section"><a href="#source.html">1.7. 从源代码安装 Python </a></span></li>
               <li><span class="section"><a href="#shell.html">1.8. 使用 Python 的交互 Shell</a></span></li>
               <li><span class="section"><a href="#summary.html">1.9. 小结</a></span></li>
            </ul>
         </div>
         <div class="abstract">
            <p>欢迎来到 <span class="application">Python</span> 世界，让我们开始吧。在本章中，将学习适合您的 <span class="application">Python</span> 安装。
            </p>
         </div>
         <div class="section" lang="zh_cn">
            <div class="titlepage">
               <div>
                  <div>
                     <h2 class="title"><a name="install.choosing"></a>1.1.&nbsp;哪一种 <span class="application">Python</span> 适合您？
                     </h2>
                  </div>
               </div>
               <div></div>
            </div>
            <div class="abstract">
               <p>学习 <span class="application">Python</span> 的第一件事就是安装，不是吗？
               </p>
            </div>
            <p>如果您在公网的服务器上有个用户账号，那么您的 ISP 或许已经安装了 <span class="application">Python</span>。
               大多数 Linux 发行版在默认安装的情况下就已经提供了 <span class="application">Python</span>。
               虽然您可能希望在苹果机上安装一个拥有类 Mac 的图形操作界面，但在 <span class="abbrev">Mac</span> <span class="acronym">OS</span> X 10.2 或更高的版本上已经包含了一个 <span class="application">Python</span> 的命令行版本。
            </p>
            <p>Windows 环境默认不提供任何版本的 <span class="application">Python</span>，但是不要担心！本章将提供几种 Windows 环境下安装 <span class="application">Python</span> 的方法。
            </p>
            <p>正像您所看到的，<span class="application">Python</span> 可以运行于很多操作系统平台。包括 Windows、<span class="abbrev">Mac</span> <span class="acronym">OS</span>、<span class="abbrev">Mac</span> <span class="acronym">OS</span> X、所有免费的类 <span class="acronym">UNIX</span> 变种 (如 Linux)。也有运行于 Sun Solaris、AS/400、Amiga、OS/2、BeOS 的版本，甚至是您从来没听说过的其他操作系统平台。
            </p>
            <p>有太多的平台可以运行 <span class="application">Python</span> 了。在一种平台下编写的 <span class="application">Python</span> 程序稍作修改，就可以运行于<span class="emphasis"><em>任何</em></span> 其他支持的平台。例如，我通常在 Windows 平台上开发 <span class="application">Python</span> 程序，然后适当配置后使之能在 Linux 平台上运行。
            </p>
            <p>回到开始的问题，“<span class="quote">哪一种 <span class="application">Python</span> 适合您？</span>” 回答是：哪一个已经安装在您计算机上的均可。
            </p>
         </div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.windows"></a><a name="windows.html">1.2.&nbsp;Windows 上的 <span class="application">Python</span></a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>在 Windows 上，安装 <span class="application">Python</span> 有两种选择。
            </p>
         </div>
         <p>ActiveState 制作的 <span class="application">ActivePython</span> 是专门针对 Windows 的 <span class="application">Python</span> 套件，它包含了一个完整的 <span class="application">Python</span> 发布、一个适用于 <span class="application">Python</span> 编程的 <span class="acronym">IDE</span> 以及一些 <span class="application">Python</span> 的 Windows 扩展，提供了全部的访问 Windows <span class="acronym">API</span>s 的服务，以及 Windows 注册表的注册信息。
         </p>
         <p>虽然 <span class="application">ActivePython</span> 不是开源软件，但它可以自由下载。<span class="application">ActivePython</span> 是我学习 <span class="application">Python</span> 时使用过的 <span class="acronym">IDE</span>。除非有别的原因，我建议您使用它。可能的一个原因是：ActiveState 通常要在新的 <span class="application">Python</span> 版本发布几个月以后才更新它的安装程序。如果您就需要 <span class="application">Python</span> 的最新版本，并且 <span class="application">ActivePython</span> 仍然落后于最新版本的话，您应该直接跳到在 Windows 上安装 <span class="application">Python</span> 的第二种选项。
            
         </p>
         <p>第二种选择是使用由 <span class="application">Python</span> 发布的 “<span class="quote">官方</span>” <span class="application">Python</span> 安装程序。她是可自由下载的开源软件，并且您总是可以获得当前 <span class="application">Python</span> 的最新版本。
         </p>
         <div class="procedure">
            <h3 class="title">过程&nbsp;1.1.&nbsp;选项 1：安装 <span class="application">ActivePython</span></h3>
            <p>下面描述 <span class="application">ActivePython</span> 的安装过程：
            </p>
            <ol type="1">
               <li>
                  <p>从 <a href="http://www.activestate.com/Products/ActivePython/">http://www.activestate.com/Products/ActivePython/</a> 下载 <span class="application">ActivePython</span> 。
                  </p>
               </li>
               <li>
                  <p>如果您正在使用 Windows 95、Windows 98 或 Windows ME，还需要在安装 <span class="application">ActivePython</span> 之前下载并安装<a href="http://download.microsoft.com/download/WindowsInstaller/Install/2.0/W9XMe/EN-US/InstMsiA.exe">Windows Installer 2.0</a> 。
                  </p>
               </li>
               <li>
                  <p>双击安装程序 <tt class="filename">ActivePython-2.2.2-224-win32-ix86.msi</tt>。
                  </p>
               </li>
               <li>
                  <p>按照安装程序的提示信息一步步地执行。</p>
               </li>
               <li>
                  <p>如果磁盘空间不足，您可以执行定制安装，不选文档，但是笔者不建议您这样做，除非您实在是挤不出14M空间来。
                     
                  </p>
               </li>
               <li>
                  <p>在安装完后之后，关闭安装程序，打开 <span class="guimenu">开始</span>-&gt;<span class="guimenuitem">程序</span>-&gt;<span class="guimenuitem">ActiveState ActivePython 2.2</span>-&gt;<span class="guimenuitem">PythonWin IDE</span>。您将看到类似如下的信息：
                  </p>
               </li>
            </ol>
         </div>
         <div class="informalexample"><pre class="screen">
<span class="computeroutput">PythonWin 2.2.2 (#37, Nov 26 2002, 10:24:37) [MSC 32 bit (Intel)] on win32.
Portions Copyright 1994-2001 Mark Hammond (mhammond@skippinet.com.au) -
see 'Help/About PythonWin' for further copyright information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt>
</pre></div>
         <div class="procedure">
            <h3 class="title">过程&nbsp;1.2.&nbsp;选项 2：安装来自 <a href="http://www.python.org/" title="Python language home page">Python.org</a> 的 <span class="application">Python</span> 
            </h3>
            <ol type="1">
               <li>
                  <p>从 <a href="http://www.python.org/ftp/python/">http://www.python.org/ftp/python/</a> 选择最新的 <span class="application">Python</span> Windows 安装程序，下载 <tt class="literal">.exe</tt> 安装文件。
                  </p>
               </li>
               <li>
                  <p>双击安装程序 <tt class="filename">Python-2.xxx.yyy.exe</tt>。文件名依赖于您所下载的 <span class="application">Python</span> 安装程序文件。
                  </p>
               </li>
               <li>
                  <p>按照安装程序的提示信息一步步地执行。</p>
               </li>
               <li>
                  <p>如果磁盘空间不足，可以取消 HTMLHelp 文件、实用脚本 (<tt class="filename">Tools/</tt>)、和/或测试套件 (<tt class="filename">Lib/test/</tt>)。
                  </p>
               </li>
               <li>
                  <p>如果您没有机器的管理员权限，您可以选择 <span class="guibutton">Advanced Options</span>，然后选择 <span class="guilabel">Non-Admin Install</span>。这只会对登记注册表和开始菜单中创建的快捷方式有影响。
                  </p>
               </li>
               <li>
                  <p>在安装完成之后，关闭安装程序，打开 <span class="guimenu">开始</span>-&gt;<span class="guimenuitem">程序</span>-&gt;<span class="guimenuitem">Python 2.3</span>-&gt;<span class="guimenuitem">IDLE (Python GUI)</span>。您将看到类似如下的信息：
                  </p>
               </li>
            </ol>
         </div>
         <div class="informalexample"><pre class="screen">
<span class="computeroutput">Python 2.3.2 (#49, Oct  2 2003, 20:02:00) [MSC v.1200 32 bit (Intel)] on win32
Type "copyright", "credits" or "license()" for more information.

    ****************************************************************
    Personal firewall software may warn about the connection IDLE
    makes to its subprocess using this computer's internal loopback
    interface.  This connection is not visible on any external
    interface and no data is sent to or received from the Internet.
    ****************************************************************
    
IDLE 1.0</span>
<tt class="prompt">&gt;&gt;&gt; </tt>
</pre></div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.macosx"></a><a name="macosx.html">1.3.&nbsp;<span class="abbrev">Mac</span> <span class="acronym">OS</span> X 上的 <span class="application">Python</span> 
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>在 <span class="abbrev">Mac</span> <span class="acronym">OS</span> X 上，对于安装 <span class="application">Python</span> 有两种选择：安装或不安装。您可能想要安装它。
            </p>
         </div>
         <p><span class="abbrev">Mac</span> <span class="acronym">OS</span> X 10.2 及其后续版本已经预装了一个 <span class="application">Python</span> 的命令行版本。如果您习惯使用命令行，那么您可以使用它学完本书的三分之一。然而，预安装的版本不带 <span class="acronym">XML</span> 解析器，所以当您学到 <span class="acronym">XML</span> 的章节时，您会需要安装完整版。
         </p>
         <p>您还可以安装优于预装版本的最新的包含图形界面 Shell 的完整版本。</p>
         <div class="procedure">
            <h3 class="title">过程&nbsp;1.3.&nbsp;在 <span class="abbrev">Mac</span> <span class="acronym">OS</span> X 上运行预装版本的 <span class="application">Python</span> 
            </h3>
            <p>使用预装的 <span class="application">Python</span> 版本的步骤：
            </p>
            <ol type="1">
               <li>
                  <p>打开 <tt class="filename">/Applications</tt> 文件夹。
                  </p>
               </li>
               <li>
                  <p>打开 <tt class="filename">Utilities</tt> 文件夹。
                  </p>
               </li>
               <li>
                  <p>双击 <tt class="filename">Terminal</tt> 打开一个终端进入命令行窗口。
                  </p>
               </li>
               <li>
                  <p>在提示符下键入 <b class="userinput"><tt>python</tt></b>。
                  </p>
               </li>
            </ol>
         </div>
         <p>试验:</p>
         <div class="informalexample"><pre class="screen">
<span class="computeroutput">Welcome to Darwin!</span>
<tt class="prompt">[localhost:~] you% </tt><span class="userinput">python</span>
<span class="computeroutput">Python 2.2 (#1, 07/14/02, 23:25:09)
[GCC Apple cpp-precomp 6.14] on darwin
Type "help", "copyright", "credits", or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to get back to the command prompt]</span>
<tt class="prompt">[localhost:~] you% </tt>
</pre></div>
         <div class="procedure">
            <h3 class="title">过程&nbsp;1.4.&nbsp;在 <span class="abbrev">Mac</span> <span class="acronym">OS</span> X 上安装最新版的 <span class="application">Python</span> 
            </h3>
            <p>下面介绍下载并安装 <span class="application">Python</span> 最新版本的过程:
            </p>
            <ol type="1">
               <li>
                  <p>从 <a href="http://homepages.cwi.nl/~jack/macpython/download.html">http://homepages.cwi.nl/~jack/macpython/download.html</a> 下载 <tt class="filename">MacPython-OSX</tt> 磁盘镜像 。
                  </p>
               </li>
               <li>
                  <p>下载完毕，双击 <tt class="filename">MacPython-OSX-2.3-1.dmg</tt> 将磁盘镜像挂载到桌面。
                  </p>
               </li>
               <li>
                  <p>双击安装程序 <tt class="filename">MacPython-OSX.pkg</tt>.
                  </p>
               </li>
               <li>
                  <p>安装程序将提示要求您的管理员用户名和口令。</p>
               </li>
               <li>
                  <p>按照安装程序的提示一步步执行。</p>
               </li>
               <li>
                  <p>安装完毕后，关闭安装程序，打开 <tt class="filename">/Applications</tt> 文件夹。
                  </p>
               </li>
               <li>
                  <p>打开 <tt class="filename">MacPython-2.3</tt> 文件夹。
                  </p>
               </li>
               <li>
                  <p>双击 <tt class="filename">PythonIDE</tt> 来运行 <span class="application">Python</span> 。
                  </p>
               </li>
            </ol>
         </div>
         <p><span class="application">MacPython</span> <span class="acronym">IDE</span> 将显示启动画面将您带进交互 shell。如果交互 shell 没有出现，选择 <span class="guimenu">Window</span>-&gt;<span class="guimenuitem">Python Interactive</span> (<span><b class="shortcut"><span><b class="keycap">Cmd</b></span>-<span class="keysym">0</span></b></span>)。您将看到类似如下的信息:
         </p>
         <div class="informalexample"><pre class="screen">
<span class="computeroutput">Python 2.3 (#2, Jul 30 2003, 11:45:28)
[GCC 3.1 20020420 (prerelease)]
Type "copyright", "credits" or "license" for more information.
MacPython IDE 1.0.1</span>
<tt class="prompt">&gt;&gt;&gt; </tt>
</pre></div>
         <p>
            请注意，安装完最新版本后，预装版本仍然存在。如果您从命令行运行脚本，那您需要知道正在使用的是哪一个版本的 <span class="application">Python</span> 。
            
         </p>
         <div class="example"><a name="d0e3460"></a><h3 class="title">例&nbsp;1.1.&nbsp;两个 <span class="application">Python</span> 版本
            </h3><pre class="screen">
<tt class="prompt">[localhost:~] you% </tt><span class="userinput">python</span>
<span class="computeroutput">Python 2.2 (#1, 07/14/02, 23:25:09)
[GCC Apple cpp-precomp 6.14] on darwin
Type "help", "copyright", "credits", or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to get back to the command prompt]</span>
<tt class="prompt">[localhost:~] you% </tt><span class="userinput">/usr/local/bin/python</span>
<span class="computeroutput">Python 2.3 (#2, Jul 30 2003, 11:45:28)
[GCC 3.1 20020420 (prerelease)] on darwin
Type "help", "copyright", "credits", or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to get back to the command prompt]</span>
<tt class="prompt">[localhost:~] you% </tt>
</pre></div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.macos9"></a><a name="macos9.html">1.4.&nbsp;<span class="abbrev">Mac</span> <span class="acronym">OS</span> 9 上的 <span class="application">Python</span> 
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p><span class="abbrev">Mac</span> <span class="acronym">OS</span> 9 上没有预装任何版本的 <span class="application">Python</span>，安装相对简单，只有一种选择。
            </p>
         </div>
         <div class="procedure">
            <p>下面介绍在 <span class="abbrev">Mac</span> <span class="acronym">OS</span> 9 上安装 <span class="application">Python</span> 的过程:
            </p>
            <ol type="1">
               <li>
                  <p>从 <a href="http://homepages.cwi.nl/~jack/macpython/download.html">http://homepages.cwi.nl/~jack/macpython/download.html</a> 下载 <tt class="filename">MacPython23full.bin</tt>。
                  </p>
               </li>
               <li>
                  <p>如果浏览器不能自动解压文件，那么双击 <tt class="filename">MacPython23full.bin</tt> 用 <span class="application">Stuffit Expander</span> 解压。
                  </p>
               </li>
               <li>
                  <p>双击安装程序 <tt class="filename">MacPython23full</tt>。
                  </p>
               </li>
               <li>
                  <p>按照安装程序的提示一步步执行。</p>
               </li>
               <li>
                  <p>安装完毕后，关闭安装程序，打开 <tt class="filename">/Applications</tt> 文件夹。
                  </p>
               </li>
               <li>
                  <p>打开 <tt class="filename">MacPython-OS9 2.3</tt> 文件夹。
                  </p>
               </li>
               <li>
                  <p>双击 <tt class="filename">PythonIDE</tt> 来运行 <span class="application">Python</span> 。
                  </p>
               </li>
            </ol>
         </div>
         <p><span class="application">MacPython</span> <span class="acronym">IDE</span> 将显示启动画面将您带进交互 shell。如果交互 shell 没有出现，选择 <span class="guimenu">Window</span>-&gt;<span class="guimenuitem">Python Interactive</span> (<span><b class="shortcut"><span><b class="keycap">Cmd</b></span>-<span class="keysym">0</span></b></span>)。您将看到类似如下的信息:
         </p>
         <div class="informalexample"><pre class="screen">
<span class="computeroutput">Python 2.3 (#2, Jul 30 2003, 11:45:28)
[GCC 3.1 20020420 (prerelease)]
Type "copyright", "credits" or "license" for more information.
MacPython IDE 1.0.1</span>
<tt class="prompt">&gt;&gt;&gt; </tt>
</pre></div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.redhat"></a><a name="redhat.html">1.5.&nbsp;RedHat Linux 上的 <span class="application">Python</span> 
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <p>在类 <span class="acronym">UNIX</span> 的操作系统 (如 Linux) 上安装二进制包很容易。预编译好的二进制包对大多数 Linux 发行版是可用的。或者您可以通过源码进行编译。
         </p>
         <div class="abstract">
            <p>在 <a href="http://www.python.org/ftp/python/">http://www.python.org/ftp/python/</a> 选择列出的最新的版本号, 然后选择
               其中的<tt class="filename">rpms/</tt> 目录下载最新的 <span class="application">Python</span> <span class="acronym">RPM</span> 包。
               使用 <span><b class="command">rpm</b></span> 命令进行安装，操作如下所示:
            </p>
         </div>
         <div class="example"><a name="d0e3640"></a><h3 class="title">例&nbsp;1.2.&nbsp;在 RedHat Linux 9 上安装</h3><pre class="screen">
<tt class="prompt">localhost:~$ </tt><span class="userinput">su -</span>
<tt class="prompt">Password: </tt><span class="userinput">[enter your root password]</span>
<tt class="prompt">[root@localhost root]# </tt><span class="userinput">wget http://python.org/ftp/python/2.3/rpms/redhat-9/python2.3-2.3-5pydotorg.i386.rpm</span>
<span class="computeroutput">Resolving python.org... done.
Connecting to python.org[194.109.137.226]:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 7,495,111 [application/octet-stream]
...</span>
<tt class="prompt">[root@localhost root]# </tt><span class="userinput">rpm -Uvh python2.3-2.3-5pydotorg.i386.rpm</span>
<span class="computeroutput">Preparing...                ########################################### [100%]
   1:python2.3              ########################################### [100%]</span>
<tt class="prompt">[root@localhost root]# </tt><span class="userinput">python</span>          <a name="install.unix.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">Python 2.2.2 (#1, Feb 24 2003, 19:13:11)
[GCC 3.2.2 20030222 (Red Hat Linux 3.2.2-4)] on linux2
Type "help", "copyright", "credits", or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to exit]</span>
<tt class="prompt">[root@localhost root]# </tt><span class="userinput">python2.3</span>       <a name="install.unix.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">Python 2.3 (#1, Sep 12 2003, 10:53:56)
[GCC 3.2.2 20030222 (Red Hat Linux 3.2.2-5)] on linux2
Type "help", "copyright", "credits", or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to exit]</span>
<tt class="prompt">[root@localhost root]# </tt><span class="userinput">which python2.3</span> <a name="install.unix.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<span class="computeroutput">/usr/bin/python2.3</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.debian"></a><a name="debian.html">1.6.&nbsp;Debian <span class="acronym">GNU</span>/Linux 上的 <span class="application">Python</span> 
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>如果您运行在 Debian <span class="acronym">GNU</span>/Linux 上，安装 <span class="application">Python</span> 需要使用 <span><b class="command">apt</b></span> 命令。
            </p>
         </div>
         <div class="example"><a name="d0e3765"></a><h3 class="title">例&nbsp;1.3.&nbsp;在 Debian <span class="acronym">GNU</span>/Linux 上安装
            </h3><pre class="screen">
<tt class="prompt">localhost:~$ </tt><span class="userinput">su -</span>
<tt class="prompt">Password: </tt><span class="userinput">[enter your root password]</span>
<tt class="prompt">localhost:~# </tt><span class="userinput">apt-get install python</span>
<span class="computeroutput">Reading Package Lists... Done
Building Dependency Tree... Done
The following extra packages will be installed:
  python2.3
Suggested packages:
  python-tk python2.3-doc
The following NEW packages will be installed:
  python python2.3
0 upgraded, 2 newly installed, 0 to remove and 3 not upgraded.
Need to get 0B/2880kB of archives.
After unpacking 9351kB of additional disk space will be used.</span>
<tt class="prompt">Do you want to continue? [Y/n] </tt><span class="userinput">Y</span>
<span class="computeroutput">Selecting previously deselected package python2.3.
(Reading database ... 22848 files and directories currently installed.)
Unpacking python2.3 (from .../python2.3_2.3.1-1_i386.deb) ...
Selecting previously deselected package python.
Unpacking python (from .../python_2.3.1-1_all.deb) ...
Setting up python (2.3.1-1) ...
Setting up python2.3 (2.3.1-1) ...
Compiling python modules in /usr/lib/python2.3 ...
Compiling optimized python modules in /usr/lib/python2.3 ...</span>
<tt class="prompt">localhost:~# </tt><span class="userinput">exit</span>
<span class="computeroutput">logout</span>
<tt class="prompt">localhost:~$ </tt><span class="userinput">python</span>
<span class="computeroutput">Python 2.3.1 (#2, Sep 24 2003, 11:39:14)
[GCC 3.3.2 20030908 (Debian prerelease)] on linux2
Type "help", "copyright", "credits" or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to exit]</span>
</pre></div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.source"></a><a name="source.html">1.7.&nbsp;从源代码安装 <span class="application">Python</span> 
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>如果您宁愿从源码创建，可以从 <a href="http://www.python.org/ftp/python/">http://www.python.org/ftp/python/</a>下载 <span class="application">Python</span> 的源代码。选择最新的版本，下载<tt class="filename">.tgz</tt> 文件，执行通常的 <b class="userinput"><tt>configure</tt></b>, <b class="userinput"><tt>make</tt></b>, <b class="userinput"><tt>make install</tt></b> 步骤。
            </p>
         </div>
         <div class="example"><a name="d0e3848"></a><h3 class="title">例&nbsp;1.4.&nbsp;从源代码安装</h3><pre class="screen">
<tt class="prompt">localhost:~$ </tt><span class="userinput">su -</span>
<tt class="prompt">Password: </tt><span class="userinput">[enter your root password]</span>
<tt class="prompt">localhost:~# </tt><span class="userinput">wget http://www.python.org/ftp/python/2.3/Python-2.3.tgz</span>
<span class="computeroutput">Resolving www.python.org... done.
Connecting to www.python.org[194.109.137.226]:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 8,436,880 [application/x-tar]
...</span>
<tt class="prompt">localhost:~# </tt><span class="userinput">tar xfz Python-2.3.tgz</span>
<tt class="prompt">localhost:~# </tt><span class="userinput">cd Python-2.3</span>
<tt class="prompt">localhost:~/Python-2.3# </tt><span class="userinput">./configure</span>
<span class="computeroutput">checking MACHDEP... linux2
checking EXTRAPLATDIR...
checking for --without-gcc... no
...</span>
<tt class="prompt">localhost:~/Python-2.3# </tt><span class="userinput">make</span>
<span class="computeroutput">gcc -pthread -c -fno-strict-aliasing -DNDEBUG -g -O3 -Wall -Wstrict-prototypes
-I. -I./Include  -DPy_BUILD_CORE -o Modules/python.o Modules/python.c
gcc -pthread -c -fno-strict-aliasing -DNDEBUG -g -O3 -Wall -Wstrict-prototypes
-I. -I./Include  -DPy_BUILD_CORE -o Parser/acceler.o Parser/acceler.c
gcc -pthread -c -fno-strict-aliasing -DNDEBUG -g -O3 -Wall -Wstrict-prototypes
-I. -I./Include  -DPy_BUILD_CORE -o Parser/grammar1.o Parser/grammar1.c
...</span>
<tt class="prompt">localhost:~/Python-2.3# </tt><span class="userinput">make install</span>
<span class="computeroutput">/usr/bin/install -c python /usr/local/bin/python2.3
...</span>
<tt class="prompt">localhost:~/Python-2.3# </tt><span class="userinput">exit</span>
<span class="computeroutput">logout</span>
<tt class="prompt">localhost:~$ </tt><span class="userinput">which python</span>
<span class="computeroutput">/usr/local/bin/python</span>
<tt class="prompt">localhost:~$ </tt><span class="userinput">python</span>
<span class="computeroutput">Python 2.3.1 (#2, Sep 24 2003, 11:39:14)
[GCC 3.3.2 20030908 (Debian prerelease)] on linux2
Type "help", "copyright", "credits" or "license" for more information.</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">[press Ctrl+D to get back to the command prompt]</span>
<tt class="prompt">localhost:~$ </tt>
</pre></div>
      </div>
      
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.shell"></a><a name="shell.html">1.8.&nbsp;使用 <span class="application">Python</span> 的交互 Shell
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>既然我们已经安装了 <span class="application">Python</span>，那么我们运行的这个交互 shell 是什么东西呢？
            </p>
         </div>
         <p><span class="application">Python</span> 扮演着两种角色。首先它是一个脚本解释器，可以从命令行运行脚本，也可以在脚本上双击，像运行其他应用程序一样。它还是一个交互 shell，可以执行任意的语句和表达式。这一点对调试、快速组建和测试相当有用。我甚至知道一些人把 <span class="application">Python</span> 的交互 shell 当作计算器来使用！
            
         </p>
         <p>在您的计算机平台上启动 <span class="application">Python</span> 的交互 shell，接下来让我们尝试着做些操作：
         </p>
         <div class="example"><a name="d0e3963"></a><h3 class="title">例&nbsp;1.5.&nbsp;初次使用交互 Shell</h3><pre class="screen">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">1 + 1</span>               <a name="install.shell.1.1"></a><img src="../images/callouts/1.png" alt="1" border="0" width="12" height="12">
<span class="computeroutput">2</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput"><span class='pykeyword'>print</span> <span class='pystring'>'hello world'</span></span> <a name="install.shell.1.2"></a><img src="../images/callouts/2.png" alt="2" border="0" width="12" height="12">
<span class="computeroutput">hello world</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">x = 1</span>               <a name="install.shell.1.3"></a><img src="../images/callouts/3.png" alt="3" border="0" width="12" height="12">
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">y = 2</span>
<tt class="prompt">&gt;&gt;&gt; </tt><span class="userinput">x + y</span>
<span class="computeroutput">3</span>
</pre><div class="calloutlist">
               
      <div class="section" lang="zh_cn">
         <div class="titlepage">
            <div>
               <div>
                  <h2 class="title"><a name="install.summary"></a><a name="summary.html">1.9.&nbsp;小结
                  </a></h2>
               </div>
            </div>
            <div></div>
         </div>
         <div class="abstract">
            <p>您现在应该已经安装了一个可以工作的 <span class="application">Python</span> 版本了。
            </p>
         </div>
         <p>
            根据您的运行平台，您可能安装有不止一个 <span class="application">Python</span> 版本。那样的话，您需要知道 <span class="application">Python</span> 的路径。若在命令行简单地键入 <span><b class="command">python</b></span> 没有运行您想使用的 <span class="application">Python</span> 版本，则需要输入想要的版本的全路径。
            
         </p>
         <p>最后祝贺您，欢迎来到 <span class="application">Python</span> 世界。
         </p>
      </div>
      
