doc functional test

.. Contents::
.. sectnum::

相关资料
===================
我们是基于zopeproject做的，可参考如下资料：

zopeproject的说明：
http://pypi.python.org/pypi/zopeproject#functional-tests

zope.app.testing的说明：
http://pypi.python.org/pypi/zope.app.testing/3.4.2

最完整的，是在phlipp的那本书上testing一章的内容

详细的步骤
===================
使用tcpwatch记录一个http会话
-----------------------------------------
1. 在tmp目录下创建tcpwatch目录，是提供给tcpwatch写入日志文件；
2. 运行tcpwatch::

     python /usr/bin/tcpwatch.py -L 9080:192.168.1.2:8080 -s -r /tmp/tcpwatch

     -L 9080:8080：建立链接，其中9080是tcpwatch监听的端口，
        这两个端口都可以自行更改
     -s：以文件输出代替窗口显示
     -r：表示向/tmp/tcpwatch写入数据

3. 在ftesting.zcml中创建角色和定义权限::

     <principal
      id="zope.mgr"　　　
      title="Manager"
      login="mgr"
      password="mgrpw"
      />
     <grant role="zope.Manager" principal="zope.mgr" />

4. 使用9080端口访问页面，tcpwatch会记录下会话内容,当测试完毕后，可以使用Ctrl-C退出tcpwatch

5. 把tmp/tcpwatch下的文件转换为doctest文件：::

     python /opt/buildout-cache/eggs/zope.app.testing-3.4.2-py2.4.egg/zope/app/
            testing/dochttp.py /tmp/tcpwatch > /home/ljw/test.txt
  
6. 对这个doctest文件进行编辑，去除不必要的内容::

    python /opt/buildout-cache/eggs/zope.app.testing-3.4.2-py2.4.egg/zope/app/testing/dochttp.py /tmp/tcpwatch > /home/ljw/test1.txt
    python /usr/bin/tcpwatch.py -L 9099:192.168.1.2:8099 -s -r /tmp/tcpwatch

