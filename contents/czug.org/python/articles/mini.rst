---
created: 
creator: panjy
description: ''
title: Python 绝对简明手册
---
<p>来自： <a href="http://wiki.woodpecker.org.cn/moin/PyAbsolutelyZipManual">http://wiki.woodpecker.org.cn/moin/PyAbsolutelyZipManual</a></p>
<div id="contentColumn"><div class="inside"><div lang="en" id="content" dir="ltr"><span id="top" class="anchor"/>
<span id="line-3" class="anchor"/><p class="line867"><strong> Python 绝对简明手册 </strong>-- <a href="mailto:zsp007@gmail.com" class="mailto">zsp007@gmail.com</a> ::-- <a href="/moin/ZoomQuiet">ZoomQuiet</a> [2006-09-15 04:35:33] </p><div class="table-of-contents"><p class="table-of-contents-heading">目录</p><ol><li><a href="#head-e2ee6168b18f89049e088cdc32442b3184f2fc0d">阅读须知</a></li><li><a href="#head-a53ddfd3da78342aec981793afeacf1286eedac1">基本语法</a><ol><li><a href="#head-381f472292efdfee1033103bc0f1fcf11ace35d8">if / elif / else</a></li><li><a href="#head-1764998ff5503d738395deaa9b1a8c126c96f25d">in</a></li><li><a href="#head-a64df3e238bd243be8db71d1dc4d1b5ca5db1ffd">for ... in</a></li><li><a href="#head-8f3f67bfa834e8439112412eb1171c217f2d3937">break / continue</a></li><li><a href="#head-2a15156cd132eeaa4b4c857fe381efd90c453aaa">while / pass</a></li><li><a href="#head-597f8bfc3ef77eda7d23b0dfad4f19c9cfa23b8a">is</a></li><li><a href="#head-7cdbd1bebbe17071cc4e6097df4546caedd2516e">del</a></li><li><a href="#head-263e21b75a15eebdaa6574be53cfbddebb7a1231">try ... except ... finally / raise</a></li></ol></li><li><a href="#head-f8507dfa589dd81e58c261dceab25f6eb8757d36">内建类型</a><ol><li><a href="#head-b5dd6bfb178e34df4c47aa902b81806cc0fa577a">None</a></li><li><a href="#head-55f3700a30bdb1fc71d689732516859e66de2c85">Ture / False</a></li><li><a href="#head-ae117c007e26d435c10c0b106273a566b0298506">List</a><ol><li><a href="#head-d9eaddf658ab51298abc794b97c14f37acb0a93f">内建函数</a></li><li><a href="#head-82d525b930790e0c779f0751ad3877e67f3d9b64">切片</a></li><li><a href="#head-7c5e765f00066c0b08eea09d2f042cf47c6de058">列表推导式</a></li></ol></li><li><a href="#head-807a48771c330b903c5b54fa2cf2856e6fbd1675">元组</a></li><li><a href="#head-89d692515e60718dd028c8f8993e7487a93aacd6">set</a></li><li><a href="#head-61666695a46690a32ba6fcd03235c37f0a24c9b1">dict</a></li></ol></li><li><a href="#head-11d6dd33b525a9e4e78b99050dc363a6e5859188">函数相关</a><ol><li><a href="#head-cdb69684f5df130b3325faf11ece3b0bb1d09e23">函数定义 / 参数默认值</a></li><li><a href="#head-3582c811da2dc02b8116357cec40ec89b7d744ad">Lambda函数</a></li><li><a href="#head-e9a246780dc0a4dd41be64840a6885f534a77cb7">不定长参数 *para,**para</a></li><li><a href="#head-d5a9de17aace4769855b58ac95f902fe8e8367ce">@ 装饰器</a></li><li><a href="#head-eb69a95ef9779595c1505a51f0897aefcf7314d8">生成器表达式</a></li><li><a href="#head-4786e05e677787f2a66ceb4807b000ab96e517b9">yield</a></li></ol></li><li><a href="#head-f2320f42f49db401b690cee8e04c344a3ea11488">常用函数</a><ol><li><a href="#head-4e83cda83aa8f5f69d3b173d41d8a604c45e7f91">eval</a></li><li><a href="#head-5105132b9c2837ce0e1e2139dd41749ac0978bb9">exec</a></li><li><a href="#head-a77ab6871fa90b9abbb70c1c0359316f1ad6cc89">execfile</a></li><li><a href="#head-4797ddcdb847fd34889b784c89ab70a0788919e4">dir</a></li><li><a href="#head-53cb77154c3e968e5e40b7c84c01c7ed6a798c19">help</a></li><li><a href="#head-c57534746f6b3d93d4e584a253129148699b544e">len</a></li><li><a href="#head-608370abd57aee9b889e4337ffdab5b2c1cb1f72">print</a></li><li><a href="#head-5e0c0437b8392c3392435a0ced325941d10b0337">raw_input</a></li><li><a href="#head-202f4281b21b7b2a8de71e7b18e90db5a8325279">range</a></li><li><a href="#head-48e6d1103848b95e29a91cefaed8cf2512d5f804">filter</a></li><li><a href="#head-80af9b1a9e1200867c23b1ba0b8f984df81bdbc2">map</a></li><li><a href="#head-06b131667034b779e5179596b2dd1c2010ba2a7e">reduce</a></li><li><a href="#head-c7550a21526a04abfe271e40b2468f5e863309ff">zip</a></li><li><a href="#head-dbc54974a958d9a3cd8c273517f9aa1f888a3ca5">reversed反向循环</a></li><li><a href="#head-64913df43cf8502648d6a4f78e91064e4762ebd4">sorted排序</a></li><li><a href="#head-52414578bf1672f73d77a9b744870d09a425f094">enumerate 返回索引位置和对应的值</a></li><li><a href="#head-8dcfbba933af7dffebbcce855cbd829d693d9884">open/文件操作</a></li></ol></li><li><a href="#head-76db6cb872d848d12d160efcf3a10162a8461885">模块化</a><ol><li><a href="#head-3248edaf751db3c530a94cdcfecf6e8d7ac29699">导入模块</a></li><li><a href="#head-39bd5b4d9144c6c488e33fc74fd818cef24237ff">包</a></li><li><a href="#head-fe942de2fe8507df497536620b500ade73b6cdba">面向对象</a><ol><li><a href="#head-2db9a64528769c06c7a8673bc7da38cd60af7c19">概要</a></li><li><a href="#head-fb3d93d54f53974b3a00e30b4acca756cc275f0c">类继承</a></li><li><a href="#head-87d5f1365c05fd1061d5f0555aace4248b9364f9">多重继承</a></li></ol></li><li><a href="#head-03c3ed23a30e980bf3d4e5965c7dfc343d76a427">操作符重载</a><ol><li><a href="#head-05fe34e83d4fdb30af5666a05749cb2036f3eb01">__str__ / __unicode__</a></li><li><a href="#head-fd6635ff3aff394fff35f9c14f6c04d33e5cbdeb">比较操作</a></li><li><a href="#head-4493aadc77e1048d3e98985cc81a4512be87113d">__iter__</a></li></ol></li><li><a href="#head-c84c8989a4f0ee6aa35d6e68446051b3cabe30d0">类相关函数</a><ol><li><a href="#head-b76ce66fd2e8ccb2032cf526ce6f7ac207467628">type</a></li><li><a href="#head-f4658385e844754c8cc313520d7761e4e0eb340a">getattr / hasattr /delattr</a></li><li><a href="#head-13d6bb7aaac42974d63292795835d136d4712396">property</a></li><li><a href="#head-7fc2181be1f78024b02c63052c533586d3f7c1fd">isinstance( object, classinfo)</a></li></ol></li></ol></li><li><a href="#head-9045a2f95d957ee2c99669b244a365f9a8fdc462">Py常用模块汇编</a></li></ol></div> <span id="line-4" class="anchor"/><span id="line-5" class="anchor"/><p class="line867"><span id="line-6" class="anchor"/></p><p class="line867"><span id="line-7" class="anchor"/></p><p class="line867"><em>简述</em> <span id="line-8" class="anchor"/>
</p><h1 id="head-e2ee6168b18f89049e088cdc32442b3184f2fc0d">1. 阅读须知</h1>
<span id="line-9" class="anchor"/><span id="line-10" class="anchor"/><p class="line874">文中使用 <span id="line-11" class="anchor"/><span id="line-12" class="anchor"/></p><pre>>>>
<span id="line-13" class="anchor"/></pre><span id="line-14" class="anchor"/><p class="line874">作为会命令行中的输出信息的前缀 <span id="line-15" class="anchor"/><span id="line-16" class="anchor"/></p><p class="line874">对于不清楚用用途的函数可以在解释器下面输入 <span id="line-17" class="anchor"/><span id="line-18" class="anchor"/></p><pre>help(函数名)
<span id="line-19" class="anchor"/></pre><span id="line-20" class="anchor"/><p class="line874">来获取相关信息 <span id="line-21" class="anchor"/><span id="line-22" class="anchor"/></p><p class="line874">另外,自带的文档和google也是不可少的 <span id="line-23" class="anchor"/><span id="line-24" class="anchor"/></p><p class="line867">
</p><h1 id="head-a53ddfd3da78342aec981793afeacf1286eedac1">2. 基本语法</h1>
<span id="line-25" class="anchor"/><p class="line867">
</p><h2 id="head-381f472292efdfee1033103bc0f1fcf11ace35d8">2.1. if / elif / else</h2>
<span id="line-26" class="anchor"/><p class="line867"><span id="line-27" class="anchor"/></p><pre><span id="line-28" class="anchor"/>x=int(raw_input("Please enter an integer:"))#获取行输入
<span id="line-29" class="anchor"/>
<span id="line-30" class="anchor"/>if x>0:
<span id="line-31" class="anchor"/>    print '正数'
<span id="line-32" class="anchor"/>elif x==0:
<span id="line-33" class="anchor"/>    print '零'
<span id="line-34" class="anchor"/>else:
<span id="line-35" class="anchor"/>    print '负数'
<span id="line-36" class="anchor"/></pre><span id="line-37" class="anchor"/><p class="line874">此外C语言中类似"xxx?xxx:xxx"在Python中可以这样写 <span id="line-38" class="anchor"/><span id="line-39" class="anchor"/></p><pre>>>>number=8
<span id="line-40" class="anchor"/>>>>print "good" if 8==number else "bad" #当满足if条件时返回"good",否则返回"bad"
<span id="line-41" class="anchor"/>good
<span id="line-42" class="anchor"/></pre><span id="line-43" class="anchor"/><span id="line-44" class="anchor"/><p class="line867">
</p><h2 id="head-1764998ff5503d738395deaa9b1a8c126c96f25d">2.2. in</h2>
<span id="line-45" class="anchor"/><p class="line874">in判断 一个数 是否在 一个集合(如:元组,列表等) 中 <span id="line-46" class="anchor"/><span id="line-47" class="anchor"/></p><p class="line867"><span id="line-48" class="anchor"/></p><pre>if 'yes' in  ('y','ye','yes'):print  'ok'
<span id="line-49" class="anchor"/></pre><span id="line-50" class="anchor"/><span id="line-51" class="anchor"/><p class="line867">
</p><h2 id="head-a64df3e238bd243be8db71d1dc4d1b5ca5db1ffd">2.3. for ... in</h2>
<span id="line-52" class="anchor"/><p class="line874">python中没有类似C中的for循环,而是使用for...in来对集合中的每一个元素进行操作 <span id="line-53" class="anchor"/><span id="line-54" class="anchor"/></p><pre>a=['cat','door','example']
<span id="line-55" class="anchor"/>for x in a:
<span id="line-56" class="anchor"/>    print x
<span id="line-57" class="anchor"/></pre><span id="line-58" class="anchor"/><span id="line-59" class="anchor"/><p class="line874">如果要修改a的内容，请用a的副本循环(否则不安全)，如： <span id="line-60" class="anchor"/><span id="line-61" class="anchor"/></p><pre>a=["cat","zsp007@gmail.com"]
<span id="line-62" class="anchor"/>for x in a[:]:
<span id="line-63" class="anchor"/>    if len(x)>6:a.insert(0,x)
<span id="line-64" class="anchor"/>>>>a
<span id="line-65" class="anchor"/>['zsp007@gmail.com', 'cat', 'zsp007@gmail.com']
<span id="line-66" class="anchor"/></pre><span id="line-67" class="anchor"/><span id="line-68" class="anchor"/><p class="line874">若需要得到循环的次数,参见 函数 range 的用法 <span id="line-69" class="anchor"/><span id="line-70" class="anchor"/></p><p class="line867">
</p><h2 id="head-8f3f67bfa834e8439112412eb1171c217f2d3937">2.4. break / continue</h2>
<span id="line-71" class="anchor"/><p class="line874">这两个的用法和C中相同 <span id="line-72" class="anchor"/><span id="line-73" class="anchor"/></p><pre>for i in range(10):
<span id="line-74" class="anchor"/>    if 2==i:continue #结束当前循环,进入下一步循环
<span id="line-75" class="anchor"/>    if 6==i:break #跳出循环
<span id="line-76" class="anchor"/>    print i
<span id="line-77" class="anchor"/></pre><span id="line-78" class="anchor"/><p class="line874">输出 <span id="line-79" class="anchor"/><span id="line-80" class="anchor"/></p><pre>0
<span id="line-81" class="anchor"/>1
<span id="line-82" class="anchor"/>3
<span id="line-83" class="anchor"/>4
<span id="line-84" class="anchor"/>5
<span id="line-85" class="anchor"/></pre><span id="line-86" class="anchor"/><p class="line867">
</p><h2 id="head-2a15156cd132eeaa4b4c857fe381efd90c453aaa">2.5. while / pass</h2>
<span id="line-87" class="anchor"/><p class="line867"><span id="line-88" class="anchor"/></p><pre>while True:
<span id="line-89" class="anchor"/>    pass #什么也不做
<span id="line-90" class="anchor"/></pre><span id="line-91" class="anchor"/><span id="line-92" class="anchor"/><p class="line867">
</p><h2 id="head-597f8bfc3ef77eda7d23b0dfad4f19c9cfa23b8a">2.6. is</h2>
<span id="line-93" class="anchor"/><p class="line874">用来比较两个变量是否指向同一内存地址(也就是两个变量是否等价) <span id="line-94" class="anchor"/>而 == 是用来比较两个变量是否逻辑相等 <span id="line-95" class="anchor"/><span id="line-96" class="anchor"/></p><pre>a=[1,2]
<span id="line-97" class="anchor"/>b=[1,2]
<span id="line-98" class="anchor"/>>>> a is b
<span id="line-99" class="anchor"/>False
<span id="line-100" class="anchor"/>>>> a == b
<span id="line-101" class="anchor"/>True
<span id="line-102" class="anchor"/></pre><span id="line-103" class="anchor"/><span id="line-104" class="anchor"/><p class="line867">
</p><h2 id="head-7cdbd1bebbe17071cc4e6097df4546caedd2516e">2.7. del</h2>
<span id="line-105" class="anchor"/><p class="line874">用于删除元素 <span id="line-106" class="anchor"/><span id="line-107" class="anchor"/></p><pre><span id="line-108" class="anchor"/>a=[1,2,3,4,5,6]
<span id="line-109" class="anchor"/>
<span id="line-110" class="anchor"/>del a[0]
<span id="line-111" class="anchor"/>a
<span id="line-112" class="anchor"/>>>>[2,3,4,5,6]
<span id="line-113" class="anchor"/>
<span id="line-114" class="anchor"/>del a[2:4]
<span id="line-115" class="anchor"/>a
<span id="line-116" class="anchor"/>>>>[2,3,6]
<span id="line-117" class="anchor"/>
<span id="line-118" class="anchor"/>del a[:]
<span id="line-119" class="anchor"/>a
<span id="line-120" class="anchor"/>>>>[]
<span id="line-121" class="anchor"/>
<span id="line-122" class="anchor"/>del a
<span id="line-123" class="anchor"/>a
<span id="line-124" class="anchor"/>#抛出异常
<span id="line-125" class="anchor"/>>>>NameError: name 'a' is not defined
<span id="line-126" class="anchor"/></pre><span id="line-127" class="anchor"/><span id="line-128" class="anchor"/><p class="line867">
</p><h2 id="head-263e21b75a15eebdaa6574be53cfbddebb7a1231">2.8. try ... except ... finally / raise</h2>
<span id="line-129" class="anchor"/><p class="line874">try ... except用于异常处理 <span id="line-130" class="anchor"/><span id="line-131" class="anchor"/></p><pre>try:
<span id="line-132" class="anchor"/>    x=int(raw_input("请输入数字:"))
<span id="line-133" class="anchor"/>except ValueError: #可以同时捕获多个异常,写法如except(RuntimeError,ValueError):
<span id="line-134" class="anchor"/>    #当输入非数字时
<span id="line-135" class="anchor"/>    print"您输入不是数字"
<span id="line-136" class="anchor"/>except: #省略异常名,可以匹配所有异常,慎用
<span id="line-137" class="anchor"/>    pass
<span id="line-138" class="anchor"/>else:#当没有异常时
<span id="line-139" class="anchor"/>    print 'result=',result
<span id="line-140" class="anchor"/>finally:#和Java中类似。一般用于释放资源，如文件，网络连接。
<span id="line-141" class="anchor"/>   print 'finish'
<span id="line-142" class="anchor"/></pre><span id="line-143" class="anchor"/><span id="line-144" class="anchor"/><p class="line874">raise用于抛出异常,可以为自定义的异常类 <span id="line-145" class="anchor"/><span id="line-146" class="anchor"/></p><p class="line874">惯例是以Error结尾的类，同类的异常一般派生自同一个基类(如Exception) <span id="line-147" class="anchor"/><span id="line-148" class="anchor"/></p><pre>class MyError(Exception):
<span id="line-149" class="anchor"/>    def __init__(self,value):
<span id="line-150" class="anchor"/>        self.value=value
<span id="line-151" class="anchor"/>    def __str__(self):
<span id="line-152" class="anchor"/>        return reper(self.value)
<span id="line-153" class="anchor"/></pre><span id="line-154" class="anchor"/><span id="line-155" class="anchor"/><p class="line874">基类异常可以匹配派生类异常 <span id="line-156" class="anchor"/><span id="line-157" class="anchor"/></p><p class="line867"><span id="line-158" class="anchor"/></p><pre>try:
<span id="line-159" class="anchor"/>    raise Exception("spam","egg")
<span id="line-160" class="anchor"/>except Exception,inst:#inst为该异常类的实例,为可选项
<span id="line-161" class="anchor"/>    print type(inst) #异常的类型
<span id="line-162" class="anchor"/>    print inst
<span id="line-163" class="anchor"/></pre><span id="line-164" class="anchor"/><span id="line-165" class="anchor"/><p class="line867">
</p><h1 id="head-f8507dfa589dd81e58c261dceab25f6eb8757d36">3. 内建类型</h1>
<span id="line-166" class="anchor"/><span id="line-167" class="anchor"/><p class="line867">
</p><h2 id="head-b5dd6bfb178e34df4c47aa902b81806cc0fa577a">3.1. None</h2>
<span id="line-168" class="anchor"/><p class="line874">None    表示该值不存在,比如 没有定义返回值 的函数就 返回None <span id="line-169" class="anchor"/><span id="line-170" class="anchor"/></p><p class="line867">
</p><h2 id="head-55f3700a30bdb1fc71d689732516859e66de2c85">3.2. Ture / False</h2>
<span id="line-171" class="anchor"/><p class="line874">布尔类型,Ture等价于1,False等价于0 <span id="line-172" class="anchor"/><span id="line-173" class="anchor"/></p><p class="line867">
</p><h2 id="head-ae117c007e26d435c10c0b106273a566b0298506">3.3. List</h2>
<span id="line-174" class="anchor"/><p class="line867"><span id="line-175" class="anchor"/></p><pre>>>>test=[1,2,"yes"]
<span id="line-176" class="anchor"/></pre><span id="line-177" class="anchor"/><p class="line867">
</p><h3 id="head-d9eaddf658ab51298abc794b97c14f37acb0a93f">3.3.1. 内建函数</h3>
<span id="line-178" class="anchor"/><p class="line874">append(x)    追加到链尾  <span id="line-179" class="anchor"/><span id="line-180" class="anchor"/></p><p class="line874">extend(L)    追加一个列表,等价于+= <span id="line-181" class="anchor"/><span id="line-182" class="anchor"/></p><p class="line874">insert(i,x)   在位置i插入x <span id="line-183" class="anchor"/><span id="line-184" class="anchor"/></p><p class="line874">remove(x)   删除第一个值为x的元素,如果不存在会抛出异常 <span id="line-185" class="anchor"/><span id="line-186" class="anchor"/></p><p class="line874">reverse()   反转序列 <span id="line-187" class="anchor"/><span id="line-188" class="anchor"/></p><p class="line874">pop([i])   返回并删除位置为i的元素,i默认为最后一个元素(i两边的[]表示i为可选的,实际不用输入) <span id="line-189" class="anchor"/><span id="line-190" class="anchor"/></p><p class="line874">index(x)    返回第一个值为x的元素,不存在则抛出异常 <span id="line-191" class="anchor"/><span id="line-192" class="anchor"/></p><p class="line874">count(x)   返回x出现的次数 <span id="line-193" class="anchor"/><span id="line-194" class="anchor"/></p><p class="line874">sort()   排序 <span id="line-195" class="anchor"/><span id="line-196" class="anchor"/><span id="line-197" class="anchor"/></p><p class="line874">例子: <span id="line-198" class="anchor"/><span id="line-199" class="anchor"/></p><pre>>>>test=[1,2,"yes"]
<span id="line-200" class="anchor"/>
<span id="line-201" class="anchor"/>>>>test.append(1) #追加到链尾
<span id="line-202" class="anchor"/>>>>test
<span id="line-203" class="anchor"/>[1, 2, 'yes', 1]
<span id="line-204" class="anchor"/>
<span id="line-205" class="anchor"/>>>>test.extend([ 'no','maybe']) #追加一个列表
<span id="line-206" class="anchor"/>>>>test
<span id="line-207" class="anchor"/>[1, 2, 'yes', 1, 'no', 'maybe']
<span id="line-208" class="anchor"/>
<span id="line-209" class="anchor"/>>>> test.insert(0,'never') #在位置0插入'never'
<span id="line-210" class="anchor"/>>>> test
<span id="line-211" class="anchor"/>['never', 1, 2, 'yes', 1, 'no', 'maybe']
<span id="line-212" class="anchor"/>
<span id="line-213" class="anchor"/>>>> test.remove('no') #删除第一个值为"no"的元素,如果不存在会抛出异常
<span id="line-214" class="anchor"/>>>> test
<span id="line-215" class="anchor"/>['never', 1, 2, 'yes', 1, 'maybe']
<span id="line-216" class="anchor"/>
<span id="line-217" class="anchor"/>>>> test.reverse() #反转序列
<span id="line-218" class="anchor"/>>>> test
<span id="line-219" class="anchor"/>['maybe', 1, 'yes', 2, 1, 'never']
<span id="line-220" class="anchor"/>
<span id="line-221" class="anchor"/>>>> test.pop() #返回并删除位置为i的元素,i默认为最后一个元素
<span id="line-222" class="anchor"/>'never'
<span id="line-223" class="anchor"/>>>> test
<span id="line-224" class="anchor"/>['maybe', 1, 'yes', 2, 1]
<span id="line-225" class="anchor"/>
<span id="line-226" class="anchor"/>>>> test.index('yes') #返回第一个值为'yes'的元素,不存在则抛出异常
<span id="line-227" class="anchor"/>2
<span id="line-228" class="anchor"/>
<span id="line-229" class="anchor"/>>>> test.count(1) #返回1出现的次数
<span id="line-230" class="anchor"/>2
<span id="line-231" class="anchor"/>
<span id="line-232" class="anchor"/>>>>test.sort() #排序
<span id="line-233" class="anchor"/>>>> test
<span id="line-234" class="anchor"/>[1, 1, 2, 'maybe', 'yes']
<span id="line-235" class="anchor"/></pre><span id="line-236" class="anchor"/><p class="line867">
</p><h3 id="head-82d525b930790e0c779f0751ad3877e67f3d9b64">3.3.2. 切片</h3>
<span id="line-237" class="anchor"/><p class="line874">从序列中抽取一部分 <span id="line-238" class="anchor"/><span id="line-239" class="anchor"/></p><pre>>>> test=['never', 1, 2, 'yes', 1, 'no', 'maybe']
<span id="line-240" class="anchor"/>
<span id="line-241" class="anchor"/>>>> test[0:3] #包括test[0],不包括test[3]
<span id="line-242" class="anchor"/>['never', 1, 2]
<span id="line-243" class="anchor"/>
<span id="line-244" class="anchor"/>>>> test[0:6:2] #包括test[0],不包括test[6],而且步长为2
<span id="line-245" class="anchor"/>['never', 2, 1]
<span id="line-246" class="anchor"/>
<span id="line-247" class="anchor"/>>>> test[:-1] #包括开始,不包括最后一个
<span id="line-248" class="anchor"/>['never', 1, 2, 'yes', 1, 'no']
<span id="line-249" class="anchor"/>
<span id="line-250" class="anchor"/>>>> test[-3:] #抽取最后3个
<span id="line-251" class="anchor"/>[1, 'no', 'maybe']
<span id="line-252" class="anchor"/>
<span id="line-253" class="anchor"/>>>>test[::-1] #倒序排列
<span id="line-254" class="anchor"/>['maybe', 'no', 1, 'yes', 2, 1, 'never']
<span id="line-255" class="anchor"/></pre><span id="line-256" class="anchor"/><p class="line867">
</p><h3 id="head-7c5e765f00066c0b08eea09d2f042cf47c6de058">3.3.3. 列表推导式</h3>
<span id="line-257" class="anchor"/><p class="line874">可以直接通过for循环生成一个list <span id="line-258" class="anchor"/><span id="line-259" class="anchor"/></p><p class="line867"><span id="line-260" class="anchor"/></p><pre>>>>freshfruit=['  banana  ','   loganberry  ']
<span id="line-261" class="anchor"/>>>>[weapon.strip() for weapon in freshfruit]
<span id="line-262" class="anchor"/>['banana', 'loganberry']
<span id="line-263" class="anchor"/></pre><span id="line-264" class="anchor"/><span id="line-265" class="anchor"/><p class="line874">说明:strip()是去除字符串两端多于空格,该句是去除序列中的所有字串两端多余的空格 <span id="line-266" class="anchor"/><span id="line-267" class="anchor"/></p><p class="line867"><span id="line-268" class="anchor"/></p><pre>>>>vec=[2,4,6]
<span id="line-269" class="anchor"/>>>>[3*x for x in vec if x>3]
<span id="line-270" class="anchor"/>[12, 18]
<span id="line-271" class="anchor"/></pre><span id="line-272" class="anchor"/><span id="line-273" class="anchor"/><p class="line867"><span id="line-274" class="anchor"/></p><pre>>>>[(x,x**2) for x in vec]
<span id="line-275" class="anchor"/>#循环变量要是一个sequence,而[x,x**2 for x in vec]是错误的
<span id="line-276" class="anchor"/>[(2,4),(4,16),(6,36)]
<span id="line-277" class="anchor"/></pre><span id="line-278" class="anchor"/><span id="line-279" class="anchor"/><p class="line867"><span id="line-280" class="anchor"/></p><pre>>>>vec2=[4,3,-9]
<span id="line-281" class="anchor"/>
<span id="line-282" class="anchor"/>>>>[x*y for x in vec for y in vec2]
<span id="line-283" class="anchor"/>[8, 6, -18, 16, 12, -36, 24, 18, -54]
<span id="line-284" class="anchor"/>
<span id="line-285" class="anchor"/>>>>[vec[i]+vec2[i] for i in range(len(vec))]
<span id="line-286" class="anchor"/>[6, 7, -3]
<span id="line-287" class="anchor"/></pre><span id="line-288" class="anchor"/><span id="line-289" class="anchor"/><p class="line867"><span id="line-290" class="anchor"/></p><pre>>>>[str(round(355/113.0,i)) for i in range(1,6)]
<span id="line-291" class="anchor"/>#str()是转换类型为可以打印的字符
<span id="line-292" class="anchor"/>#round(x,n)表示对x保留n位小数(四舍五入)
<span id="line-293" class="anchor"/>['3.1', '3.14', '3.142', '3.1416', '3.14159']
<span id="line-294" class="anchor"/></pre><span id="line-295" class="anchor"/><span id="line-296" class="anchor"/><p class="line867">
</p><h2 id="head-807a48771c330b903c5b54fa2cf2856e6fbd1675">3.4. 元组</h2>
<span id="line-297" class="anchor"/><p class="line874">一旦初始化便不能更改的数据结构,速度比list快 <span id="line-298" class="anchor"/><span id="line-299" class="anchor"/></p><p class="line867"><span id="line-300" class="anchor"/></p><pre>>>>t=1234,5567,'hello' #t=(1234,5567,'hello')的简写
<span id="line-301" class="anchor"/>
<span id="line-302" class="anchor"/>>>>x,y,z=t    #拆分操作可以应用于所有sequence
<span id="line-303" class="anchor"/>>>>x
<span id="line-304" class="anchor"/>1234
<span id="line-305" class="anchor"/>
<span id="line-306" class="anchor"/>>>>u=t,(1,2,3)
<span id="line-307" class="anchor"/>>>>u
<span id="line-308" class="anchor"/>((1234,5567,'hello'),(1,2,3))
<span id="line-309" class="anchor"/>
<span id="line-310" class="anchor"/>>>>empty=() #空元组
<span id="line-311" class="anchor"/>>>>singleton='hi', #单个元素的元组,注意逗号
<span id="line-312" class="anchor"/></pre><span id="line-313" class="anchor"/><span id="line-314" class="anchor"/><p class="line874">通过元组可以很简单的进行数据交换. <span id="line-315" class="anchor"/>比如: <span id="line-316" class="anchor"/><span id="line-317" class="anchor"/></p><pre>a=1
<span id="line-318" class="anchor"/>b=2
<span id="line-319" class="anchor"/>a,b=b,a
<span id="line-320" class="anchor"/></pre><span id="line-321" class="anchor"/><span id="line-322" class="anchor"/><p class="line867">
</p><h2 id="head-89d692515e60718dd028c8f8993e7487a93aacd6">3.5. set</h2>
<span id="line-323" class="anchor"/><p class="line874">set（集合）：无序不重复的元素集 <span id="line-324" class="anchor"/><span id="line-325" class="anchor"/></p><p class="line867"><span id="line-326" class="anchor"/></p><pre><span id="line-327" class="anchor"/>>>>basket = ['apple','orange','apple','pear','apple','banana']
<span id="line-328" class="anchor"/>
<span id="line-329" class="anchor"/>>>>fruit=set(basket)
<span id="line-330" class="anchor"/>
<span id="line-331" class="anchor"/>>>>fruit
<span id="line-332" class="anchor"/>set(['orange', 'pear', 'apple', 'banana'])
<span id="line-333" class="anchor"/>
<span id="line-334" class="anchor"/>>>>'orange' in fruit
<span id="line-335" class="anchor"/>True
<span id="line-336" class="anchor"/>
<span id="line-337" class="anchor"/>>>>a=set('abracadabew')
<span id="line-338" class="anchor"/>>>>a
<span id="line-339" class="anchor"/>set(['a', 'c', 'b', 'e', 'd', 'r', 'w'])
<span id="line-340" class="anchor"/>
<span id="line-341" class="anchor"/>>>>b=set('wajgwaoihwb')
<span id="line-342" class="anchor"/>>>>b
<span id="line-343" class="anchor"/>set(['a', 'b', 'g', 'i', 'h', 'j', 'o', 'w'])
<span id="line-344" class="anchor"/>
<span id="line-345" class="anchor"/>>>>a-b    #差
<span id="line-346" class="anchor"/>set(['c', 'r', 'e', 'd'])
<span id="line-347" class="anchor"/>
<span id="line-348" class="anchor"/>>>>a|b   #并
<span id="line-349" class="anchor"/>set(['a', 'c', 'b', 'e', 'd', 'g', 'i', 'h', 'j', 'o', 'r', 'w'])
<span id="line-350" class="anchor"/>
<span id="line-351" class="anchor"/>>>>a&b   #交
<span id="line-352" class="anchor"/>set(['a', 'b', 'w'])
<span id="line-353" class="anchor"/>
<span id="line-354" class="anchor"/>>>>a^b   #(并-交)
<span id="line-355" class="anchor"/>set(['c', 'e', 'd', 'g', 'i', 'h', 'j', 'o', 'r'])
<span id="line-356" class="anchor"/></pre><span id="line-357" class="anchor"/><p class="line867">
</p><h2 id="head-61666695a46690a32ba6fcd03235c37f0a24c9b1">3.6. dict</h2>
<span id="line-358" class="anchor"/><span id="line-359" class="anchor"/><p class="line874">字典:关键字为不可变类型,如字符串,整数,只包含不可变对象的元组. <span id="line-360" class="anchor"/><span id="line-361" class="anchor"/></p><p class="line874">列表等不可以作为关键字. <span id="line-362" class="anchor"/><span id="line-363" class="anchor"/></p><p class="line874">如果列表中存在关键字对,可以用dict()直接构造字典.而这样的列表对通常是由列表推导式生成的. <span id="line-364" class="anchor"/><span id="line-365" class="anchor"/></p><p class="line867"><span id="line-366" class="anchor"/></p><pre><span id="line-367" class="anchor"/>>>>tel={'jack':4098,'sape':4139}
<span id="line-368" class="anchor"/>
<span id="line-369" class="anchor"/>>>>tel['guido']=4127
<span id="line-370" class="anchor"/>
<span id="line-371" class="anchor"/>>>>tel
<span id="line-372" class="anchor"/>{'sape': 4139, 'jack': 4098, 'guido': 4127}
<span id="line-373" class="anchor"/>
<span id="line-374" class="anchor"/>>>>tel['jack'] #如果jack不存在,会抛出KeyError
<span id="line-375" class="anchor"/>4098
<span id="line-376" class="anchor"/>>>>a.get("zsp",5000) #如果"zsp"为tel的键则返回其值,否则返回5000
<span id="line-377" class="anchor"/>
<span id="line-378" class="anchor"/>>>>del tel['sape'] #删除键'sape'和其对应的值
<span id="line-379" class="anchor"/>>>>tel.keys() #复制一份键的副本,同理tel.items()为值的副本
<span id="line-380" class="anchor"/>['jack', 'guido']
<span id="line-381" class="anchor"/>
<span id="line-382" class="anchor"/>>>>"jack" in tel #判断"jack"是否tel的键
<span id="line-383" class="anchor"/>True
<span id="line-384" class="anchor"/>>>>"zsp" not in tel
<span id="line-385" class="anchor"/>True
<span id="line-386" class="anchor"/>
<span id="line-387" class="anchor"/>>>>for k,v in tel.iteritems():print k,v  #同理tel.iterkeys()为键的迭代器,tel.itervalues()为值的迭代器
<span id="line-388" class="anchor"/>jack 4098
<span id="line-389" class="anchor"/>guido 4127
<span id="line-390" class="anchor"/>
<span id="line-391" class="anchor"/>>>>tel.copy() #复制一份tel
<span id="line-392" class="anchor"/>{'jack': 4098, 'guido': 4127}
<span id="line-393" class="anchor"/>
<span id="line-394" class="anchor"/>>>> tel.fromkeys([1,2],0) #从序列生成并返回一个字典,其值为第二个参数(默认为None),不改变当前字典
<span id="line-395" class="anchor"/>{1: 0, 2: 0}
<span id="line-396" class="anchor"/>
<span id="line-397" class="anchor"/>>>>tel.popitem() #弹出一项
<span id="line-398" class="anchor"/>('jack', 4098)
<span id="line-399" class="anchor"/>
<span id="line-400" class="anchor"/></pre><span id="line-401" class="anchor"/><span id="line-402" class="anchor"/><p class="line867">
</p><h1 id="head-11d6dd33b525a9e4e78b99050dc363a6e5859188">4. 函数相关</h1>
<span id="line-403" class="anchor"/><span id="line-404" class="anchor"/><p class="line867">
</p><h2 id="head-cdb69684f5df130b3325faf11ece3b0bb1d09e23">4.1. 函数定义 / 参数默认值</h2>
<span id="line-405" class="anchor"/><p class="line867"><span id="line-406" class="anchor"/></p><pre><span id="line-407" class="anchor"/>def fib(n=2,a=1):#参数可以有默认值
<span id="line-408" class="anchor"/>    """这里给函数写文档注释"""
<span id="line-409" class="anchor"/>    for i in range(n):
<span id="line-410" class="anchor"/>        print a
<span id="line-411" class="anchor"/>
<span id="line-412" class="anchor"/>
<span id="line-413" class="anchor"/>>>>f=fib #可以用一个变量表示函数
<span id="line-414" class="anchor"/>>>>f(3)
<span id="line-415" class="anchor"/>1
<span id="line-416" class="anchor"/>1
<span id="line-417" class="anchor"/>1
<span id="line-418" class="anchor"/>
<span id="line-419" class="anchor"/>>>>fib(a=2) #多个可选参数赋值可以直接写"参数变量名＝值"来快速赋值
<span id="line-420" class="anchor"/>2
<span id="line-421" class="anchor"/>2
<span id="line-422" class="anchor"/></pre><span id="line-423" class="anchor"/><span id="line-424" class="anchor"/><p class="line867">
</p><h2 id="head-3582c811da2dc02b8116357cec40ec89b7d744ad">4.2. Lambda函数</h2>
<span id="line-425" class="anchor"/><p class="line874">一种无名函数的速写法 <span id="line-426" class="anchor"/><span id="line-427" class="anchor"/></p><pre><span id="line-428" class="anchor"/>def make_incrementor(n):
<span id="line-429" class="anchor"/>    return lambda x: x+n
<span id="line-430" class="anchor"/>
<span id="line-431" class="anchor"/>f=make_incrementor(n)
<span id="line-432" class="anchor"/>#f等价于
<span id="line-433" class="anchor"/>#def f(x):
<span id="line-434" class="anchor"/>#       return x+n
<span id="line-435" class="anchor"/>
<span id="line-436" class="anchor"/></pre><span id="line-437" class="anchor"/><span id="line-438" class="anchor"/><p class="line867">
</p><h2 id="head-e9a246780dc0a4dd41be64840a6885f534a77cb7">4.3. 不定长参数 *para,**para</h2>
<span id="line-439" class="anchor"/><p class="line874">参数格式为 *para 表示接受一个元组 <span id="line-440" class="anchor"/><span id="line-441" class="anchor"/></p><p class="line874">为 **para 表示接受一个字典 <span id="line-442" class="anchor"/><span id="line-443" class="anchor"/></p><p class="line874">*para要在**para之前 <span id="line-444" class="anchor"/><span id="line-445" class="anchor"/></p><p class="line867"><span id="line-446" class="anchor"/></p><pre><span id="line-447" class="anchor"/>def test(*args,**dic):
<span id="line-448" class="anchor"/>    for arg in args :
<span id="line-449" class="anchor"/>        print arg
<span id="line-450" class="anchor"/>    for k,v in dic.iteritems():
<span id="line-451" class="anchor"/>        print k ,':',v
<span id="line-452" class="anchor"/>
<span id="line-453" class="anchor"/>>>> test("yes",1,2,me="张沈鹏",where="中国") #"yes",1,2传递给元组;me="张沈鹏",where="中国"传递给字典
<span id="line-454" class="anchor"/>yes
<span id="line-455" class="anchor"/>1
<span id="line-456" class="anchor"/>2
<span id="line-457" class="anchor"/>me : 张沈鹏
<span id="line-458" class="anchor"/>where : 中国
<span id="line-459" class="anchor"/></pre><span id="line-460" class="anchor"/><span id="line-461" class="anchor"/><p class="line867">
</p><h2 id="head-d5a9de17aace4769855b58ac95f902fe8e8367ce">4.4. @ 装饰器</h2>
<span id="line-462" class="anchor"/><p class="line874">@A <span id="line-463" class="anchor"/>def B:pass <span id="line-464" class="anchor"/>等价于 <span id="line-465" class="anchor"/>def B:pass <span id="line-466" class="anchor"/>B=A(B) <span id="line-467" class="anchor"/>即将函数B作为参数传给参数A <span id="line-468" class="anchor"/><span id="line-469" class="anchor"/></p><pre>from time import time
<span id="line-470" class="anchor"/>#测试运行时间
<span id="line-471" class="anchor"/>def cost_time(func):
<span id="line-472" class="anchor"/>    def result(*args,**dic):
<span id="line-473" class="anchor"/>        beign=time()
<span id="line-474" class="anchor"/>        func(*args,**dic)
<span id="line-475" class="anchor"/>        print "cost time : ",time()-beign
<span id="line-476" class="anchor"/>    return result
<span id="line-477" class="anchor"/>
<span id="line-478" class="anchor"/>@cost_time
<span id="line-479" class="anchor"/>def show(n):
<span id="line-480" class="anchor"/>    for x in range(n):print x
<span id="line-481" class="anchor"/>
<span id="line-482" class="anchor"/>>>> show(10)
<span id="line-483" class="anchor"/>0
<span id="line-484" class="anchor"/>1
<span id="line-485" class="anchor"/>2
<span id="line-486" class="anchor"/>3
<span id="line-487" class="anchor"/>4
<span id="line-488" class="anchor"/>5
<span id="line-489" class="anchor"/>6
<span id="line-490" class="anchor"/>7
<span id="line-491" class="anchor"/>8
<span id="line-492" class="anchor"/>9
<span id="line-493" class="anchor"/>cost time :  0.0469999313354
<span id="line-494" class="anchor"/></pre><span id="line-495" class="anchor"/><span id="line-496" class="anchor"/><p class="line867">
</p><h2 id="head-eb69a95ef9779595c1505a51f0897aefcf7314d8">4.5. 生成器表达式</h2>
<span id="line-497" class="anchor"/><p class="line874">生成器表达式:类似于没有中括号的列表推导式,可用在参数中 <span id="line-498" class="anchor"/><span id="line-499" class="anchor"/></p><pre>>>>sum(i*i for i in range(10))
<span id="line-500" class="anchor"/>285
<span id="line-501" class="anchor"/>
<span id="line-502" class="anchor"/>>>>unique_words=set(word for line in page for word in line.split())#page为打开的文件
<span id="line-503" class="anchor"/>
<span id="line-504" class="anchor"/>>>>data='golf'
<span id="line-505" class="anchor"/>
<span id="line-506" class="anchor"/>>>>list(data[i] for i in range(len (data)-1,-1,-1))
<span id="line-507" class="anchor"/>['f','l','o','g']
<span id="line-508" class="anchor"/>
<span id="line-509" class="anchor"/></pre><span id="line-510" class="anchor"/><p class="line867">
</p><h2 id="head-4786e05e677787f2a66ceb4807b000ab96e517b9">4.6. yield</h2>
<span id="line-511" class="anchor"/><p class="line874">每次调用返回一个值,并记录当前执行位置所有的变量 <span id="line-512" class="anchor"/><span id="line-513" class="anchor"/></p><pre>def reverse(data):
<span id="line-514" class="anchor"/>    for index in range(len(data)-1,-1,-1):
<span id="line-515" class="anchor"/>        yield data[index]
<span id="line-516" class="anchor"/>
<span id="line-517" class="anchor"/>for char in reverse("golf"):
<span id="line-518" class="anchor"/>    print char,
<span id="line-519" class="anchor"/></pre><span id="line-520" class="anchor"/><p class="line874">输出 <span id="line-521" class="anchor"/><span id="line-522" class="anchor"/></p><pre>f l o g
<span id="line-523" class="anchor"/></pre><span id="line-524" class="anchor"/><span id="line-525" class="anchor"/><p class="line867">
</p><h1 id="head-f2320f42f49db401b690cee8e04c344a3ea11488">5. 常用函数</h1>
<span id="line-526" class="anchor"/><p class="line867">
</p><h2 id="head-4e83cda83aa8f5f69d3b173d41d8a604c45e7f91">5.1. eval</h2>
<span id="line-527" class="anchor"/><p class="line874">对字符串参数运算,求值 <span id="line-528" class="anchor"/><span id="line-529" class="anchor"/></p><pre>>>> eval("1 + 2*3") #可以方便的用来做四则运算
<span id="line-530" class="anchor"/>7
<span id="line-531" class="anchor"/>>>> a=1
<span id="line-532" class="anchor"/>>>> eval('a+1') #可以访问变量
<span id="line-533" class="anchor"/>2
<span id="line-534" class="anchor"/></pre><span id="line-535" class="anchor"/><p class="line867">
</p><h2 id="head-5105132b9c2837ce0e1e2139dd41749ac0978bb9">5.2. exec</h2>
<span id="line-536" class="anchor"/><p class="line874">将字符串参数作为python脚本执行 <span id="line-537" class="anchor"/><span id="line-538" class="anchor"/></p><pre>>>> exec('a="Zsp"')
<span id="line-539" class="anchor"/>>>> a
<span id="line-540" class="anchor"/>'Zsp'
<span id="line-541" class="anchor"/></pre><span id="line-542" class="anchor"/><p class="line867">
</p><h2 id="head-a77ab6871fa90b9abbb70c1c0359316f1ad6cc89">5.3. execfile</h2>
<span id="line-543" class="anchor"/><p class="line874">和exec类似,不过是用来打开一个文件,并作为python脚本执行 <span id="line-544" class="anchor"/><span id="line-545" class="anchor"/></p><p class="line867">
</p><h2 id="head-4797ddcdb847fd34889b784c89ab70a0788919e4">5.4. dir</h2>
<span id="line-546" class="anchor"/><p class="line874">显示对象的所有属性(即可以用"."操作直接访问) <span id="line-547" class="anchor"/><span id="line-548" class="anchor"/></p><pre>>>> dir([])
<span id="line-549" class="anchor"/>['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__delslice__', '__doc__', '__eq__', '__ge__', 
'__getattribute__', '__getitem__', '__getslice__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__iter__',
'__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', 
'__rmul__', '__setattr__', '__setitem__', '__setslice__', '__str__', 'append', 
'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
<span id="line-550" class="anchor"/></pre><span id="line-551" class="anchor"/><p class="line867">
</p><h2 id="head-53cb77154c3e968e5e40b7c84c01c7ed6a798c19">5.5. help</h2>
<span id="line-552" class="anchor"/><p class="line874">help(类/函数) 返回相应对象的文档字符串 <span id="line-553" class="anchor"/><span id="line-554" class="anchor"/></p><pre>>>> help(vars)
<span id="line-555" class="anchor"/>Help on built-in function vars in module __builtin__:
<span id="line-556" class="anchor"/>
<span id="line-557" class="anchor"/>vars(...)
<span id="line-558" class="anchor"/>    vars([object]) -> dictionary
<span id="line-559" class="anchor"/>
<span id="line-560" class="anchor"/>    Without arguments, equivalent to locals().
<span id="line-561" class="anchor"/>    With an argument, equivalent to object.__dict__.
<span id="line-562" class="anchor"/></pre><span id="line-563" class="anchor"/><span id="line-564" class="anchor"/><p class="line867">
</p><h2 id="head-c57534746f6b3d93d4e584a253129148699b544e">5.6. len</h2>
<span id="line-565" class="anchor"/><p class="line874">返回序列/字典的长度 <span id="line-566" class="anchor"/><span id="line-567" class="anchor"/></p><pre>>>> len([1,2,3])
<span id="line-568" class="anchor"/>3
<span id="line-569" class="anchor"/></pre><span id="line-570" class="anchor"/><span id="line-571" class="anchor"/><p class="line867">
</p><h2 id="head-608370abd57aee9b889e4337ffdab5b2c1cb1f72">5.7. print</h2>
<span id="line-572" class="anchor"/><p class="line874">输出字符串 <span id="line-573" class="anchor"/>用法演示: <span id="line-574" class="anchor"/><span id="line-575" class="anchor"/></p><pre>print "Today ", #加逗号,输出后不换行
<span id="line-576" class="anchor"/>
<span id="line-577" class="anchor"/>name="ZSP"
<span id="line-578" class="anchor"/>
<span id="line-579" class="anchor"/>print name,"cost $",10 #输出多个变量
<span id="line-580" class="anchor"/>
<span id="line-581" class="anchor"/>print "hello,%s!"%name #%s 表示用str转化为字符串
<span id="line-582" class="anchor"/>
<span id="line-583" class="anchor"/>for x in xrange(1,11):
<span id="line-584" class="anchor"/>    print '%2d %3d' % (x,x*x) #小数输出如   %5.3f
<span id="line-585" class="anchor"/></pre><span id="line-586" class="anchor"/><p class="line874">对于字典可以用变量名来直接格式化,如: <span id="line-587" class="anchor"/><span id="line-588" class="anchor"/></p><pre>>>>table={'Sjoerd':4127,'Jack':4098,'Dcab':8637678}
<span id="line-589" class="anchor"/>>>>print 'Jack:%(Jack)d; Sjoerd:%(Sjoerd)d; Dcab:%(Dcab)d' %
<span id="line-590" class="anchor"/>table
<span id="line-591" class="anchor"/>Jack:4098; Sjoerd:4127; Dcab:8637678
<span id="line-592" class="anchor"/></pre><span id="line-593" class="anchor"/><p class="line874">同时,函数vars()返回包含所有变量的字典,配合使用,无坚不摧! <span id="line-594" class="anchor"/><span id="line-595" class="anchor"/></p><p class="line867">
</p><h2 id="head-5e0c0437b8392c3392435a0ced325941d10b0337">5.8. raw_input</h2>
<span id="line-596" class="anchor"/><p class="line867"><span id="line-597" class="anchor"/></p><pre>x=raw_input("Please enter an sentence:") #将输入的内容赋值给x
<span id="line-598" class="anchor"/></pre><span id="line-599" class="anchor"/><p class="line867">
</p><h2 id="head-202f4281b21b7b2a8de71e7b18e90db5a8325279">5.9. range</h2>
<span id="line-600" class="anchor"/><p class="line867"><span id="line-601" class="anchor"/></p><pre>range(10,0,-3)#参数的含义为起点(默认为0),终点(不含终点),步长(默认为1)
<span id="line-602" class="anchor"/>>>>[10,7,4,1]
<span id="line-603" class="anchor"/></pre><span id="line-604" class="anchor"/><span id="line-605" class="anchor"/><p class="line874">和for...in配合使用 <span id="line-606" class="anchor"/><span id="line-607" class="anchor"/></p><pre>a=['cat','door','example']
<span id="line-608" class="anchor"/>for i in range(len(a)):#len()函数为求序列的长度
<span id="line-609" class="anchor"/>    print i,a[i]
<span id="line-610" class="anchor"/></pre><span id="line-611" class="anchor"/><span id="line-612" class="anchor"/><span id="line-613" class="anchor"/><p class="line867">
</p><h2 id="head-48e6d1103848b95e29a91cefaed8cf2512d5f804">5.10. filter</h2>
<span id="line-614" class="anchor"/><p class="line874">filter(function , sequence) <span id="line-615" class="anchor"/>返回序列,为原序列中能使function返回true的值 <span id="line-616" class="anchor"/><span id="line-617" class="anchor"/></p><pre>>>>a=[1,2,3,4]
<span id="line-618" class="anchor"/>>>>filter(lambda x:x%2,a)
<span id="line-619" class="anchor"/>[1, 3]
<span id="line-620" class="anchor"/></pre><span id="line-621" class="anchor"/><span id="line-622" class="anchor"/><p class="line867">
</p><h2 id="head-80af9b1a9e1200867c23b1ba0b8f984df81bdbc2">5.11. map</h2>
<span id="line-623" class="anchor"/><span id="line-624" class="anchor"/><p class="line874">map(function,sequence,[sequence...]) <span id="line-625" class="anchor"/><span id="line-626" class="anchor"/></p><p class="line874">返回序列,为对原序列每个元素分别调用function获得的值. <span id="line-627" class="anchor"/><span id="line-628" class="anchor"/></p><p class="line874">可以传入多个序列,但function也要有相应多的参数,如 <span id="line-629" class="anchor"/><span id="line-630" class="anchor"/></p><p class="line874">map(lambda x,y,z:x+y+z,range(1,3),range(3,5),range(5,7)) <span id="line-631" class="anchor"/><span id="line-632" class="anchor"/></p><p class="line874">计算过程为 <span id="line-633" class="anchor"/><span id="line-634" class="anchor"/></p><p class="line874">1+3+5=9 <span id="line-635" class="anchor"/><span id="line-636" class="anchor"/></p><p class="line874">2+4+6=12 <span id="line-637" class="anchor"/><span id="line-638" class="anchor"/></p><p class="line874">返回[9,12] <span id="line-639" class="anchor"/><span id="line-640" class="anchor"/></p><p class="line867">
</p><h2 id="head-06b131667034b779e5179596b2dd1c2010ba2a7e">5.12. reduce</h2>
<span id="line-641" class="anchor"/><span id="line-642" class="anchor"/><p class="line874">reduce(function,sequence,[init])  <span id="line-643" class="anchor"/><span id="line-644" class="anchor"/></p><p class="line874">返回一个单值为,计算步骤为 : <span id="line-645" class="anchor"/></p><ul><li>第1个结果=function(sequence[0],sequence[1]) <span id="line-646" class="anchor"/></li><li>第2个结果=function(第1个结果,sequence[2]) <span id="line-647" class="anchor"/></li><li>返回最后一个计算得值 <span id="line-648" class="anchor"/></li><li><p class="line862">如果有init,则先调用<tt>function(init,sequence[0]) </tt>  <span id="line-649" class="anchor"/></p></li><li>sequence只有一个元素时,返回该元素,为空时抛出异常. <span id="line-650" class="anchor"/></li></ul><p class="line874">如 <span id="line-651" class="anchor"/><tt>reduce(lambda x,y:x+y,range(3),99)</tt> <span id="line-652" class="anchor"/>的计算为 <span id="line-653" class="anchor"/><span id="line-654" class="anchor"/></p><p class="line862">99+0=99 => 99+1=100 => 100+2=102 <span id="line-655" class="anchor"/><span id="line-656" class="anchor"/></p><p class="line874">返回102 <span id="line-657" class="anchor"/><span id="line-658" class="anchor"/></p><p class="line874">注:实际使用中用内建函数sum来完成这个累加更合适,如这里等价sum(range(3),99) <span id="line-659" class="anchor"/><span id="line-660" class="anchor"/></p><p class="line867">
</p><h2 id="head-c7550a21526a04abfe271e40b2468f5e863309ff">5.13. zip</h2>
<span id="line-661" class="anchor"/><p class="line874">zip用于多个sequence的循环 <span id="line-662" class="anchor"/><span id="line-663" class="anchor"/></p><pre>questions=['name','quest','favorite color']
<span id="line-664" class="anchor"/>answers=['lancelot','the holy grail','blue']
<span id="line-665" class="anchor"/>
<span id="line-666" class="anchor"/>for q,a in zip(questions,answers):
<span id="line-667" class="anchor"/>    print 'What is your %s ? It is %s.'%(q,a)
<span id="line-668" class="anchor"/></pre><span id="line-669" class="anchor"/><span id="line-670" class="anchor"/><p class="line874">输出: <span id="line-671" class="anchor"/><span id="line-672" class="anchor"/></p><pre>What is your name ? It is lancelot.
<span id="line-673" class="anchor"/>What is your quest ? It is the holy grail.
<span id="line-674" class="anchor"/>What is your favorite color ? It is blue.
<span id="line-675" class="anchor"/></pre><span id="line-676" class="anchor"/><span id="line-677" class="anchor"/><p class="line867">
</p><h2 id="head-dbc54974a958d9a3cd8c273517f9aa1f888a3ca5">5.14. reversed反向循环</h2>
<span id="line-678" class="anchor"/><p class="line867"><span id="line-679" class="anchor"/></p><pre><span id="line-680" class="anchor"/>for i in reversed(range(1,4)):
<span id="line-681" class="anchor"/>    print i
<span id="line-682" class="anchor"/>
<span id="line-683" class="anchor"/></pre><span id="line-684" class="anchor"/><p class="line874">输出: <span id="line-685" class="anchor"/><span id="line-686" class="anchor"/></p><pre>3
<span id="line-687" class="anchor"/>2
<span id="line-688" class="anchor"/>1
<span id="line-689" class="anchor"/></pre><span id="line-690" class="anchor"/><p class="line867">
</p><h2 id="head-64913df43cf8502648d6a4f78e91064e4762ebd4">5.15. sorted排序</h2>
<span id="line-691" class="anchor"/><p class="line874">返回一个有序的新序列 <span id="line-692" class="anchor"/><span id="line-693" class="anchor"/></p><pre>>>>sorted([2,5,1,4])
<span id="line-694" class="anchor"/>[1, 2, 4, 5]
<span id="line-695" class="anchor"/></pre><span id="line-696" class="anchor"/><p class="line867">
</p><h2 id="head-52414578bf1672f73d77a9b744870d09a425f094">5.16. enumerate 返回索引位置和对应的值</h2>
<span id="line-697" class="anchor"/><p class="line867"><span id="line-698" class="anchor"/></p><pre>for i,v in enumerate(['tic','tac','toe'])
<span id="line-699" class="anchor"/>    print i,v
<span id="line-700" class="anchor"/></pre><span id="line-701" class="anchor"/><p class="line874">输出: <span id="line-702" class="anchor"/><span id="line-703" class="anchor"/></p><pre>0 tic
<span id="line-704" class="anchor"/>1 tac
<span id="line-705" class="anchor"/>2 toe
<span id="line-706" class="anchor"/></pre><span id="line-707" class="anchor"/><p class="line867">
</p><h2 id="head-8dcfbba933af7dffebbcce855cbd829d693d9884">5.17. open/文件操作</h2>
<span id="line-708" class="anchor"/><p class="line874">f=open('/tmp/hello','w') <span id="line-709" class="anchor"/><span id="line-710" class="anchor"/></p><p class="line874">#open(路径+文件名,读写模式) <span id="line-711" class="anchor"/><span id="line-712" class="anchor"/></p><p class="line874">#读写模式:r只读,r+读写,w新建(会覆盖原有文件),a追加,b二进制文件.常用模式 <span id="line-713" class="anchor"/><span id="line-714" class="anchor"/></p><p class="line874">如:'rb','wb','r+b'等等 <span id="line-715" class="anchor"/><span id="line-716" class="anchor"/></p><p class="line862">f.read([size])    size未指定则返回整个文件,如果文件大小>2倍内存则有问题.f.read()读到文件尾时返回""(空字串) <span id="line-717" class="anchor"/><span id="line-718" class="anchor"/></p><p class="line874">file.readline()   返回一行 <span id="line-719" class="anchor"/><span id="line-720" class="anchor"/></p><p class="line874">file.readline([size])    返回包含size行的列表,size 未指定则返回全部行 <span id="line-721" class="anchor"/><span id="line-722" class="anchor"/></p><p class="line874">for line in f: print line #通过迭代器访问 <span id="line-723" class="anchor"/><span id="line-724" class="anchor"/></p><p class="line874">f.write("hello\n")    #如果要写入字符串以外的数据,先将他转换为字符串. <span id="line-725" class="anchor"/><span id="line-726" class="anchor"/></p><p class="line874">f.tell()   返回一个整数,表示当前文件指针的位置(就是到文件头的比特数). <span id="line-727" class="anchor"/><span id="line-728" class="anchor"/></p><p class="line874">f.seek(偏移量,[起始位置]) <span id="line-729" class="anchor"/><span id="line-730" class="anchor"/></p><p class="line874">用来移动文件指针 <span id="line-731" class="anchor"/><span id="line-732" class="anchor"/></p><p class="line874">偏移量:单位:比特,可正可负 <span id="line-733" class="anchor"/><span id="line-734" class="anchor"/></p><p class="line874">起始位置:0-文件头,默认值;1-当前位置;2-文件尾 <span id="line-735" class="anchor"/><span id="line-736" class="anchor"/></p><p class="line874">f.close()    关闭文件 <span id="line-737" class="anchor"/><span id="line-738" class="anchor"/></p><p class="line867">
</p><h1 id="head-76db6cb872d848d12d160efcf3a10162a8461885">6. 模块化</h1>
<span id="line-739" class="anchor"/><span id="line-740" class="anchor"/><p class="line867">
</p><h2 id="head-3248edaf751db3c530a94cdcfecf6e8d7ac29699">6.1. 导入模块</h2>
<span id="line-741" class="anchor"/><p class="line874">模块的查找路径 <span id="line-742" class="anchor"/><span id="line-743" class="anchor"/></p><p class="line874">1.当前的目录 <span id="line-744" class="anchor"/><span id="line-745" class="anchor"/></p><p class="line874">2.环境变量PYTHONPATH所指的目录列表 <span id="line-746" class="anchor"/><span id="line-747" class="anchor"/></p><p class="line874">3.python解释器的安装目录 <span id="line-748" class="anchor"/><span id="line-749" class="anchor"/></p><p class="line874">如将代码保存上述的一个目录中的的fibo.py文件中,便可以 <span id="line-750" class="anchor"/><span id="line-751" class="anchor"/></p><p class="line867"><span id="line-752" class="anchor"/></p><pre>import fibo
<span id="line-753" class="anchor"/>fibo.function()
<span id="line-754" class="anchor"/></pre><span id="line-755" class="anchor"/><p class="line874">如果想直接使用fibo.function可以重命名这个函数,如 <span id="line-756" class="anchor"/><span id="line-757" class="anchor"/></p><p class="line867"><span id="line-758" class="anchor"/></p><pre>f=fibo.function
<span id="line-759" class="anchor"/>f()
<span id="line-760" class="anchor"/></pre><span id="line-761" class="anchor"/><p class="line874">也可以 <span id="line-762" class="anchor"/><span id="line-763" class="anchor"/></p><p class="line867"><span id="line-764" class="anchor"/></p><pre>form fibo import function
<span id="line-765" class="anchor"/>function()
<span id="line-766" class="anchor"/></pre><span id="line-767" class="anchor"/><p class="line862">甚至可以<tt>form fibo import * </tt> <span id="line-768" class="anchor"/><span id="line-769" class="anchor"/></p><p class="line862">可以 <tt>form 包.子包.模块 imort 函数 </tt> <span id="line-770" class="anchor"/><span id="line-771" class="anchor"/></p><p class="line874">然后就直接使用该函数,不需要加前缀 <span id="line-772" class="anchor"/><span id="line-773" class="anchor"/></p><p class="line867">
</p><h2 id="head-39bd5b4d9144c6c488e33fc74fd818cef24237ff">6.2. 包</h2>
<span id="line-774" class="anchor"/><p class="line874">引用推荐写法为 <span id="line-775" class="anchor"/><span id="line-776" class="anchor"/></p><p class="line867"><tt>form 包 import 模块</tt> <span id="line-777" class="anchor"/><span id="line-778" class="anchor"/></p><p class="line874">几个功能类似的模块可以组合成一个包, <span id="line-779" class="anchor"/><span id="line-780" class="anchor"/></p><p class="line874">比如一个可以处理.wav,.mp3,.wma等音频文件的有类似如下结构: <span id="line-781" class="anchor"/><span id="line-782" class="anchor"/></p><p class="line867"><span id="line-783" class="anchor"/></p><pre>Sound/
<span id="line-784" class="anchor"/>        __init__.py
<span id="line-785" class="anchor"/>        Formats/
<span id="line-786" class="anchor"/>                __init__.py
<span id="line-787" class="anchor"/>                wavread.py
<span id="line-788" class="anchor"/>                wavwrite.py
<span id="line-789" class="anchor"/>                mp3read.py
<span id="line-790" class="anchor"/>                mp3write.py
<span id="line-791" class="anchor"/>                wmaread.py
<span id="line-792" class="anchor"/>                wmawrite.py
<span id="line-793" class="anchor"/>        Effects/
<span id="line-794" class="anchor"/>                __init__.py
<span id="line-795" class="anchor"/>                echo.py
<span id="line-796" class="anchor"/>                surround.py
<span id="line-797" class="anchor"/>                reverse.py
<span id="line-798" class="anchor"/></pre><span id="line-799" class="anchor"/><span id="line-800" class="anchor"/><p class="line862">只有当<span class="u">init</span>.py存在时python才将该文件夹视为一个包. <span id="line-801" class="anchor"/><span id="line-802" class="anchor"/></p><p class="line862">该文件可以为空文件 一般在<span class="u">init</span>.py文件中定义一个<span class="u">all</span>列表,包含要import *时要导入的模块. 如Sound/Effects/<span class="u">init</span>.py可以有如下内容 <span id="line-803" class="anchor"/><span id="line-804" class="anchor"/></p><p class="line867"><tt>__all__=["echo","surround","reverse"]</tt> <span id="line-805" class="anchor"/><span id="line-806" class="anchor"/></p><p class="line874">包的作者在发布包时可以更新这个列表,也可以根据需要让某个模块不支持import * <span id="line-807" class="anchor"/><span id="line-808" class="anchor"/></p><p class="line874">对于包中同一个文件夹下的模块可以把 <span id="line-809" class="anchor"/><span id="line-810" class="anchor"/></p><p class="line867"><tt>form 包.子包 imort 模块</tt> <span id="line-811" class="anchor"/><span id="line-812" class="anchor"/></p><p class="line862">简写为 <tt>imort 模块</tt> <span id="line-813" class="anchor"/><span id="line-814" class="anchor"/></p><p class="line867">
</p><h2 id="head-fe942de2fe8507df497536620b500ade73b6cdba">6.3. 面向对象</h2>
<span id="line-815" class="anchor"/><p class="line867">
</p><h3 id="head-2db9a64528769c06c7a8673bc7da38cd60af7c19">6.3.1. 概要</h3>
<span id="line-816" class="anchor"/><p class="line867"><span id="line-817" class="anchor"/></p><pre>class ClassName:
<span id="line-818" class="anchor"/>    "类文档,可以通过类名.__doc__访问"
<span id="line-819" class="anchor"/>    def f(self):#self为每个类函数的必要的一个参数,可以通过它来访问当前实例
<span id="line-820" class="anchor"/>        return self.content
<span id="line-821" class="anchor"/>
<span id="line-822" class="anchor"/>    def __init__(self,word=''):#构造函数
<span id="line-823" class="anchor"/>        #构造函数,可以初始化变量,可以有参数"
<span id="line-824" class="anchor"/>        self.content=word
<span id="line-825" class="anchor"/>        self.__name=word #私有变量,以"__"开头,不以"__"结尾的变量
<span id="line-826" class="anchor"/></pre><span id="line-827" class="anchor"/><p class="line874">创建类实例 <span id="line-828" class="anchor"/><tt>x=ClassName("good")</tt> <span id="line-829" class="anchor"/><span id="line-830" class="anchor"/></p><p class="line867">
</p><h3 id="head-fb3d93d54f53974b3a00e30b4acca756cc275f0c">6.3.2. 类继承</h3>
<span id="line-831" class="anchor"/><p class="line862">class <a href="/moin/DerivedClassName" class="nonexistent">DerivedClassName</a>(<a href="/moin/BassClassName" class="nonexistent">BassClassName</a>): <span id="line-832" class="anchor"/></p><ul><li style="list-style-type: none;">pass <span id="line-833" class="anchor"/><span id="line-834" class="anchor"/></li></ul><p class="line874">如果基类定义在另一个模块中, 要写成 <span id="line-835" class="anchor"/><span id="line-836" class="anchor"/></p><p class="line862">modname.<a href="/moin/BaseClassName" class="nonexistent">BaseClassName</a> <span id="line-837" class="anchor"/><span id="line-838" class="anchor"/></p><p class="line874">派生类的函数会覆盖基类的同名函数 <span id="line-839" class="anchor"/><span id="line-840" class="anchor"/></p><p class="line874">如果想扩充而不是改写基类的函数,可以这样调用基类函数 <span id="line-841" class="anchor"/><span id="line-842" class="anchor"/></p><p class="line867"><a href="/moin/BaseClassName" class="nonexistent">BaseClassName</a>.methodname(self,arguments) <span id="line-843" class="anchor"/><span id="line-844" class="anchor"/></p><p class="line874">注意:该基类要在当前全局域或被导入 <span id="line-845" class="anchor"/><span id="line-846" class="anchor"/></p><pre>class A:
<span id="line-847" class="anchor"/>    def hi(self):
<span id="line-848" class="anchor"/>        print "A"
<span id="line-849" class="anchor"/>class B:
<span id="line-850" class="anchor"/>    def hi(self):
<span id="line-851" class="anchor"/>        A.hi(self)
<span id="line-852" class="anchor"/>        super(B).hi() #通过super关键字可以获得当前类的基类
<span id="line-853" class="anchor"/>        print "B"
<span id="line-854" class="anchor"/>
<span id="line-855" class="anchor"/>B().hi()
<span id="line-856" class="anchor"/></pre><span id="line-857" class="anchor"/><p class="line874">输出 <span id="line-858" class="anchor"/><span id="line-859" class="anchor"/></p><pre>A
<span id="line-860" class="anchor"/>B
<span id="line-861" class="anchor"/></pre><span id="line-862" class="anchor"/><span id="line-863" class="anchor"/><p class="line867">
</p><h3 id="head-87d5f1365c05fd1061d5f0555aace4248b9364f9">6.3.3. 多重继承</h3>
<span id="line-864" class="anchor"/><p class="line874">类多继承 <span id="line-865" class="anchor"/><span id="line-866" class="anchor"/></p><pre>class DerivedClassName(Base1,Base2,Base3):
<span id="line-867" class="anchor"/>    pass
<span id="line-868" class="anchor"/></pre><span id="line-869" class="anchor"/><p class="line874">对于该类函数的解析规则是深度优先,先是Base1,然后是Base1的基类,诸如此类. <span id="line-870" class="anchor"/><span id="line-871" class="anchor"/></p><pre>class A:
<span id="line-872" class="anchor"/>    def hi(self):
<span id="line-873" class="anchor"/>        print "A"
<span id="line-874" class="anchor"/>
<span id="line-875" class="anchor"/>class B:
<span id="line-876" class="anchor"/>    def hi(self):
<span id="line-877" class="anchor"/>        print "B"
<span id="line-878" class="anchor"/>
<span id="line-879" class="anchor"/>class C(A,B):
<span id="line-880" class="anchor"/>    pass
<span id="line-881" class="anchor"/>
<span id="line-882" class="anchor"/>C().hi()
<span id="line-883" class="anchor"/></pre><span id="line-884" class="anchor"/><p class="line874">输出: <span id="line-885" class="anchor"/><span id="line-886" class="anchor"/></p><pre>A
<span id="line-887" class="anchor"/></pre><span id="line-888" class="anchor"/><p class="line867">
</p><h2 id="head-03c3ed23a30e980bf3d4e5965c7dfc343d76a427">6.4. 操作符重载</h2>
<span id="line-889" class="anchor"/><p class="line862">通过定义类的一些约定的以"<span class="u">"开头并结尾的函数,可以到达重载一些特定操作的目的,下面是是一些常用的重载 <span id="line-890" class="anchor"/><span id="line-891" class="anchor"/><p class="line867">
</p><h3 id="head-05fe34e83d4fdb30af5666a05749cb2036f3eb01">6.4.1. __str__ / __unicode__</h3>
<span id="line-892" class="anchor"/><p class="line862">当print一个对象实例时,实际是print该实例</p></span>str<span class="u">()函数的返回值. <span id="line-893" class="anchor"/><span id="line-894" class="anchor"/><pre>class A:
<span id="line-895" class="anchor"/>    def __str__(self):
<span id="line-896" class="anchor"/>        return "A"
<span id="line-897" class="anchor"/>    def __unicode__(self):
<span id="line-898" class="anchor"/>        return "uA"
<span id="line-899" class="anchor"/>
<span id="line-900" class="anchor"/>print A()
<span id="line-901" class="anchor"/>print unicode(A())
<span id="line-902" class="anchor"/></pre><span id="line-903" class="anchor"/><p class="line874">输出 <span id="line-904" class="anchor"/><span id="line-905" class="anchor"/></p><pre>A
<span id="line-906" class="anchor"/>uA
<span id="line-907" class="anchor"/></pre><span id="line-908" class="anchor"/><span id="line-909" class="anchor"/><p class="line867"/></span>unicode<span class="u">和</span>str<span class="u">类似,不过返回Unicode字符串. <span id="line-910" class="anchor"/><span id="line-911" class="anchor"/><p class="line867">
</p><h3 id="head-fd6635ff3aff394fff35f9c14f6c04d33e5cbdeb">6.4.2. 比较操作</h3>
<span id="line-912" class="anchor"/><p class="line862">x<y     x.</p></span>lt<span class="u">(y) <span id="line-913" class="anchor"/><span id="line-914" class="anchor"/><p class="line862">x<=y    x.</p></span>le<span class="u">(y) <span id="line-915" class="anchor"/><span id="line-916" class="anchor"/><p class="line862">x==y    x.</p></span>eq<span class="u">(y) <span id="line-917" class="anchor"/><span id="line-918" class="anchor"/><p class="line862">x!=y 或 x<>y    x.</p></span>ne<span class="u">(y) <span id="line-919" class="anchor"/><span id="line-920" class="anchor"/><p class="line862">x>y     x.</p></span>gt<span class="u">(y) <span id="line-921" class="anchor"/><span id="line-922" class="anchor"/><p class="line862">x>=y    x.</p></span>ge<span class="u">(y) <span id="line-923" class="anchor"/><span id="line-924" class="anchor"/><p class="line867"/></span>cmp<span class="u">( self, other) <span id="line-925" class="anchor"/>用来简化比较函数的定义 <span id="line-926" class="anchor"/>self < other返回负数,相等时返回0,self>other时返回正数 <span id="line-927" class="anchor"/><span id="line-928" class="anchor"/><p class="line867"><span id="line-929" class="anchor"/></p><pre>class A:
<span id="line-930" class="anchor"/>    def __init__(self,i):
<span id="line-931" class="anchor"/>        self.i=i
<span id="line-932" class="anchor"/>    def __cmp__(self,other):
<span id="line-933" class="anchor"/>        return self.i-other.i
<span id="line-934" class="anchor"/>
<span id="line-935" class="anchor"/>print A(1)>A(2)
<span id="line-936" class="anchor"/></pre><span id="line-937" class="anchor"/><p class="line874">输出 <span id="line-938" class="anchor"/><span id="line-939" class="anchor"/></p><pre>False
<span id="line-940" class="anchor"/></pre><span id="line-941" class="anchor"/><p class="line867">
</p><h3 id="head-4493aadc77e1048d3e98985cc81a4512be87113d">6.4.3. __iter__</h3>
<span id="line-942" class="anchor"/><p class="line874">for ... in 循环即就是通过这个函数遍历当前容器的对象实例 <span id="line-943" class="anchor"/>可配合yield方便的编写这个函数(参见基本语法yield) <span id="line-944" class="anchor"/><span id="line-945" class="anchor"/></p><pre>class A:
<span id="line-946" class="anchor"/>   def __init__(self,n):
<span id="line-947" class="anchor"/>       self.n=n
<span id="line-948" class="anchor"/>   def __iter__(self):
<span id="line-949" class="anchor"/>       n=self.n
<span id="line-950" class="anchor"/>       while n:
<span id="line-951" class="anchor"/>           m=n%2
<span id="line-952" class="anchor"/>           n/=2
<span id="line-953" class="anchor"/>           yield m
<span id="line-954" class="anchor"/>
<span id="line-955" class="anchor"/>for i in A(5):
<span id="line-956" class="anchor"/>    print i,
<span id="line-957" class="anchor"/></pre><span id="line-958" class="anchor"/><p class="line874">输出 <span id="line-959" class="anchor"/><span id="line-960" class="anchor"/></p><pre>1 0 1
<span id="line-961" class="anchor"/></pre><span id="line-962" class="anchor"/><span id="line-963" class="anchor"/><p class="line874">另有一种繁琐的实现: <span id="line-964" class="anchor"/>返回一个可以通过next()函数遍历的对象,当结束时抛出<a href="/moin/StopIteration" class="nonexistent">StopIteration</a>异常 <span id="line-965" class="anchor"/><span id="line-966" class="anchor"/></p><p class="line867">
</p><h2 id="head-c84c8989a4f0ee6aa35d6e68446051b3cabe30d0">6.5. 类相关函数</h2>
<span id="line-967" class="anchor"/><p class="line867">
</p><h3 id="head-b76ce66fd2e8ccb2032cf526ce6f7ac207467628">6.5.1. type</h3>
<span id="line-968" class="anchor"/><p class="line874">返回对象的类型 <span id="line-969" class="anchor"/><span id="line-970" class="anchor"/></p><pre>>>> type("")
<span id="line-971" class="anchor"/><type 'str'>
<span id="line-972" class="anchor"/>>>> type("")==str
<span id="line-973" class="anchor"/>True
<span id="line-974" class="anchor"/>
<span id="line-975" class="anchor"/>>>> type([])
<span id="line-976" class="anchor"/><type 'list'>
<span id="line-977" class="anchor"/>>>> type([])==list
<span id="line-978" class="anchor"/>True
<span id="line-979" class="anchor"/>
<span id="line-980" class="anchor"/>>>> type({})
<span id="line-981" class="anchor"/><type 'dict'>
<span id="line-982" class="anchor"/>
<span id="line-983" class="anchor"/>>>> type(())
<span id="line-984" class="anchor"/><type 'tuple'>
<span id="line-985" class="anchor"/>
<span id="line-986" class="anchor"/>>>> class A:pass
<span id="line-987" class="anchor"/>
<span id="line-988" class="anchor"/>>>> type(A)
<span id="line-989" class="anchor"/><type 'classobj'>
<span id="line-990" class="anchor"/>
<span id="line-991" class="anchor"/>>>> type(A())
<span id="line-992" class="anchor"/><type 'instance'>
<span id="line-993" class="anchor"/>
<span id="line-994" class="anchor"/>>>> import types #在types模块中有许多类型的定义
<span id="line-995" class="anchor"/>
<span id="line-996" class="anchor"/>>>> type(A)==types.ClassType
<span id="line-997" class="anchor"/>True
<span id="line-998" class="anchor"/>
<span id="line-999" class="anchor"/></pre><span id="line-1000" class="anchor"/><span id="line-1001" class="anchor"/><p class="line867">
</p><h3 id="head-f4658385e844754c8cc313520d7761e4e0eb340a">6.5.2. getattr / hasattr /delattr</h3>
<span id="line-1002" class="anchor"/><p class="line874">getattr:通过类实例和一个字符串动态的调用类函数/属性 <span id="line-1003" class="anchor"/><span id="line-1004" class="anchor"/></p><pre>class A:
<span id="line-1005" class="anchor"/>    def name(self):
<span id="line-1006" class="anchor"/>        return "ZSP"
<span id="line-1007" class="anchor"/>    def hello(self):
<span id="line-1008" class="anchor"/>        return "nice to meet me ."
<span id="line-1009" class="anchor"/>
<span id="line-1010" class="anchor"/>def say(obj,attr):
<span id="line-1011" class="anchor"/>    print getattr(obj,attr)()
<span id="line-1012" class="anchor"/>
<span id="line-1013" class="anchor"/>a=A()
<span id="line-1014" class="anchor"/>say(a,"name")
<span id="line-1015" class="anchor"/>say(a,"hello")
<span id="line-1016" class="anchor"/></pre><span id="line-1017" class="anchor"/><p class="line874">输出 <span id="line-1018" class="anchor"/><span id="line-1019" class="anchor"/></p><pre>ZSP
<span id="line-1020" class="anchor"/>nice to meet me .
<span id="line-1021" class="anchor"/></pre><span id="line-1022" class="anchor"/><p class="line874">hasattr 用来判断实例有无该函数/属性 <span id="line-1023" class="anchor"/><span id="line-1024" class="anchor"/></p><p class="line874">delattr 用来删除实例的函数/属性 <span id="line-1025" class="anchor"/>
</p><h3 id="head-13d6bb7aaac42974d63292795835d136d4712396">6.5.3. property</h3>
<span id="line-1026" class="anchor"/><p class="line874">通过值的方式调用实例无参函数 <span id="line-1027" class="anchor"/><span id="line-1028" class="anchor"/></p><pre>class A(object):
<span id="line-1029" class="anchor"/>    def __init__(self): self._x = None
<span id="line-1030" class="anchor"/>    def getx(self): return self._x
<span id="line-1031" class="anchor"/>    def setx(self, value): self._x = value
<span id="line-1032" class="anchor"/>    def delx(self): self._x=None
<span id="line-1033" class="anchor"/>    x = property(getx, setx, delx, "I'm the 'x' property.")
<span id="line-1034" class="anchor"/>a=A()
<span id="line-1035" class="anchor"/>print a.x
<span id="line-1036" class="anchor"/>
<span id="line-1037" class="anchor"/>a.x="ZSP"
<span id="line-1038" class="anchor"/>print a.x
<span id="line-1039" class="anchor"/>
<span id="line-1040" class="anchor"/>del a.x
<span id="line-1041" class="anchor"/>print a.x
<span id="line-1042" class="anchor"/></pre><span id="line-1043" class="anchor"/><p class="line874">输出 <span id="line-1044" class="anchor"/><span id="line-1045" class="anchor"/></p><pre>None
<span id="line-1046" class="anchor"/>ZSP
<span id="line-1047" class="anchor"/>None
<span id="line-1048" class="anchor"/></pre><span id="line-1049" class="anchor"/><p class="line874">可以方便的定义一个只读属性 <span id="line-1050" class="anchor"/><span id="line-1051" class="anchor"/></p><pre>class A(object):
<span id="line-1052" class="anchor"/>    @property
<span id="line-1053" class="anchor"/>    def x(self): return "Property"
<span id="line-1054" class="anchor"/></pre><span id="line-1055" class="anchor"/><p class="line874">调用 <span id="line-1056" class="anchor"/><span id="line-1057" class="anchor"/></p><pre>>>>a=A()
<span id="line-1058" class="anchor"/>
<span id="line-1059" class="anchor"/>>>>print a.x
<span id="line-1060" class="anchor"/>Property
<span id="line-1061" class="anchor"/>
<span id="line-1062" class="anchor"/>>>>a.x="ZSP" #只读属性,不能更改
<span id="line-1063" class="anchor"/>Traceback (most recent call last):
<span id="line-1064" class="anchor"/>  File "D:\Profile\Untitled 2.py", line 9, in <module>
<span id="line-1065" class="anchor"/>    a.x="ZSP"
<span id="line-1066" class="anchor"/>AttributeError: can't set attribute
<span id="line-1067" class="anchor"/></pre><span id="line-1068" class="anchor"/><span id="line-1069" class="anchor"/><p class="line867">
</p><h3 id="head-7fc2181be1f78024b02c63052c533586d3f7c1fd">6.5.4. isinstance( object, classinfo)</h3>
<span id="line-1070" class="anchor"/><p class="line874">判断一个对象是否是一个类的实例 <span id="line-1071" class="anchor"/><span id="line-1072" class="anchor"/></p><pre>>>>class A:pass
<span id="line-1073" class="anchor"/>
<span id="line-1074" class="anchor"/>>>>class B:pass
<span id="line-1075" class="anchor"/>
<span id="line-1076" class="anchor"/>>>>a=A()
<span id="line-1077" class="anchor"/>
<span id="line-1078" class="anchor"/>>>>isinstance(a,A)
<span id="line-1079" class="anchor"/>True
<span id="line-1080" class="anchor"/>
<span id="line-1081" class="anchor"/>>>>isinstance(a,B)
<span id="line-1082" class="anchor"/>False
<span id="line-1083" class="anchor"/></pre><span id="line-1084" class="anchor"/><p class="line867"/><div lang="en" id="Include_PyCommonUsageMod" dir="ltr"><span id="top_Include_PyCommonUsageMod" class="anchor"/>
<span id="line-3" class="anchor"/><p class="line867"><strong> <span id="line-4" class="anchor"/>Python 常用模块体验 <span id="line-5" class="anchor"/></strong> <span id="line-6" class="anchor"/>::-- <a href="/moin/ZoomQuiet">ZoomQuiet</a> [2007-11-10 06:37:48] <span id="line-7" class="anchor"/></p><div class="table-of-contents"><p class="table-of-contents-heading">目录</p><ol><li><a href="#head-9045a2f95d957ee2c99669b244a365f9a8fdc462">Py常用模块汇编</a><ol><li><a href="#head-9da1c47f37869fa5cc2ca597b0073aa60000aecf">zshelve 对象持久模块</a><ol><li><a href="#head-63ba3c3c8b5e5cfdc6b88b87bc9ac8f8c20624f8">发布</a></li><li><a href="#head-c24a061f412ce47dee1823309cfbfbb7bf4a808d">补丁::</a></li></ol></li><li><a href="#head-dfa0c15fbc5081f78f2b9ae9de0e7631b2afcef0">fast UserDict</a></li></ol></li></ol></div> <span id="line-8" class="anchor"/><span id="line-9" class="anchor"/><p class="line867"/><div lang="en" id="Include_CPUGnav" dir="ltr"><span id="top_Include_CPUGnav" class="anchor"/>
<span id="line-1" class="anchor"/><div><table><tbody><tr>  <td><p class="line891"><strong>CPUG</strong>联盟::</p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/CPUG" class="interwiki">CPUG</a></strong>::<a href="http://python.cn" class="http">门户</a><sup>plone</sup></p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/BPUG" class="interwiki">BPUG</a></strong></p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/SPUG" class="interwiki">SPUG</a></strong></p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/ZPUG" class="interwiki">ZPUG</a></strong></p></td>
<td><p class="line862">  <a href="/moin/SpreadPython">SpreadPython</a> <sup>Python宣传</sup><em> </em></p></td>
</tr>
</tbody></table></div><span id="line-2" class="anchor"/><span id="bottom_Include_CPUGnav" class="anchor"/></div><div id="subpageQuickIn">{<a href="/moin/CPUGnav">CPUGnav</a><a href="/moin/CPUGnav?action=edit">}<sup>e</sup></a></div><div id="subpageLineSpace"/> <span id="line-10" class="anchor"/><span id="line-11" class="anchor"/><span id="line-12" class="anchor"/><p class="line867">
</p><h1 id="head-9045a2f95d957ee2c99669b244a365f9a8fdc462">7. Py常用模块汇编</h1>
<span id="line-13" class="anchor"/><p class="line867"><strong>'<a href="http://python-cn.googlegroups.com/web/PythonStandardLib.html" class="http">Python 标准库2.0</a></strong> 整理者<span id="line-14" class="anchor"/></p><pre>Python 江湖 QQ 群: 43680167
<span id="line-15" class="anchor"/>Feather (校对) gt: andelf@gmail.com
<span id="line-16" class="anchor"/></pre><span id="line-17" class="anchor"/><span id="line-18" class="anchor"/><p class="line867"/><div lang="en" id="Include_PyCommonUsageMod/zshelve" dir="ltr"><span id="top_Include_PyCommonUsageMod/zshelve" class="anchor"/>
<span id="line-3" class="anchor"/><span id="line-4" class="anchor"/><p class="line862">::-- <a href="/moin/ZoomQuiet">ZoomQuiet</a> [2007-11-10 07:39:01] <span id="line-5" class="anchor"/><span id="line-6" class="anchor"/></p><p class="line867"><span id="line-7" class="anchor"/></p><p class="line867"/><div lang="en" id="Include_CPUGnav_0001" dir="ltr"><span id="top_Include_CPUGnav_0001" class="anchor"/>
<span id="line-1" class="anchor"/><div><table><tbody><tr>  <td><p class="line891"><strong>CPUG</strong>联盟::</p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/CPUG" class="interwiki">CPUG</a></strong>::<a href="http://python.cn" class="http">门户</a><sup>plone</sup></p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/BPUG" class="interwiki">BPUG</a></strong></p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/SPUG" class="interwiki">SPUG</a></strong></p></td>
<td><p class="line891"><strong><a title="self" href="http://wiki.woodpecker.org.cn/moin/ZPUG" class="interwiki">ZPUG</a></strong></p></td>
<td><p class="line862">  <a href="/moin/SpreadPython">SpreadPython</a> <sup>Python宣传</sup><em> </em></p></td>
</tr>
</tbody></table></div><span id="line-2" class="anchor"/><span id="bottom_Include_CPUGnav_0001" class="anchor"/></div><div id="subpageQuickIn">{<a href="/moin/CPUGnav">CPUGnav</a><a href="/moin/CPUGnav?action=edit">}<sup>e</sup></a></div><div id="subpageLineSpace"/> <span id="line-8" class="anchor"/><span id="line-9" class="anchor"/><span id="line-10" class="anchor"/><p class="line867">
</p><h2 id="head-ff6323b83055617a6022580e45177be446fb2442">7.1. zshelve 对象持久模块</h2>
<span id="line-11" class="anchor"/><p class="line867"/><pre>Jiahua Huang <jhuangjiahua@gmail.com>
<span id="line-12" class="anchor"/>reply-to        python-cn@googlegroups.com,
<span id="line-13" class="anchor"/>to      "python. cn" <python-cn@googlegroups.com>,
<span id="line-14" class="anchor"/>date    Nov 8, 2007 5:41 PM
<span id="line-15" class="anchor"/>subject [CPyUG:34726] 贴个 zlib 压缩的 zshelve 对象持久模块
<span id="line-16" class="anchor"/></pre><span id="line-17" class="anchor"/><p class="line874">这个给 Python 标准库的 shelve.py 添加了 zlib 压缩， <span id="line-18" class="anchor"/>减小数据库文件体积，以改善磁盘 io 性能 <span id="line-19" class="anchor"/><span id="line-20" class="anchor"/></p><p class="line867">
</p><h3 id="head-5930583ed3799c66e3f8f66d8564f829f533ac0d">7.1.1. 发布</h3>
<span id="line-21" class="anchor"/><p class="line867"><strong><a href="http://zshelve.googlecode.com/svn/trunk/" class="http">http://zshelve.googlecode.com/svn/trunk/</a></strong> <span id="line-22" class="anchor"/><span id="line-23" class="anchor"/></p><p class="line862">加了个命令行工具:<span id="line-24" class="anchor"/></p><pre><span id="line-25" class="anchor"/>huahua@huahua:tmp$ zshelve
<span id="line-26" class="anchor"/>commandline tool for zshelve databases
<span id="line-27" class="anchor"/>
<span id="line-28" class="anchor"/>Usage: zshelve  FILE  dump                    Dump the data tree
<span id="line-29" class="anchor"/>      zshelve  FILE  keys                    List of keys
<span id="line-30" class="anchor"/>      zshelve  FILE  get          KEY        Dump value for key
<span id="line-31" class="anchor"/>      zshelve  FILE  set          KEY VALUE  Set db[key] = value
<span id="line-32" class="anchor"/>      zshelve  FILE  has_key      KEY        True if database has the key
<span id="line-33" class="anchor"/>      zshelve  FILE  search_key   KEY        Search key
<span id="line-34" class="anchor"/>      zshelve  FILE  search_value VALUE      Search value
<span id="line-35" class="anchor"/>
<span id="line-36" class="anchor"/>huahua@huahua:tmp$ zshelve set tes.db a 1
<span id="line-37" class="anchor"/>huahua@huahua:tmp$ zshelve dump tes.db
<span id="line-38" class="anchor"/>   |- a
<span id="line-39" class="anchor"/>   |    | - 1
<span id="line-40" class="anchor"/>huahua@huahua:tmp$ zshelve set tes.db b "dict(a=1,b=2,c=3,d={'s':'4'})"
<span id="line-41" class="anchor"/>huahua@huahua:tmp$ zshelve dump tes.db
<span id="line-42" class="anchor"/>   |- a
<span id="line-43" class="anchor"/>   |    |- 1
<span id="line-44" class="anchor"/>   |- b
<span id="line-45" class="anchor"/>   |    |- a
<span id="line-46" class="anchor"/>   |    |    |- 1
<span id="line-47" class="anchor"/>   |    |- c
<span id="line-48" class="anchor"/>   |    |    |- 3
<span id="line-49" class="anchor"/>   |    |- b
<span id="line-50" class="anchor"/>   |    |    |- 2
<span id="line-51" class="anchor"/>   |    |- d
<span id="line-52" class="anchor"/>   |    |    |- s
<span id="line-53" class="anchor"/>   |    |    |    |- 4
<span id="line-54" class="anchor"/></pre><span id="line-55" class="anchor"/><span id="line-56" class="anchor"/><p class="line862">对比::<span id="line-57" class="anchor"/></p><pre>>>> import zshelve
<span id="line-58" class="anchor"/>>>> import shelve
<span id="line-59" class="anchor"/>>>> zdb = zshelve.open('/tmp/zshelve.db')
<span id="line-60" class="anchor"/>>>> db  = shelve.open('/tmp/shelve.db')
<span id="line-61" class="anchor"/>>>> zdb['1'] = dict(a='0123456789'*10000000)
<span id="line-62" class="anchor"/>>>> db['1']  = dict(a='0123456789'*10000000)
<span id="line-63" class="anchor"/>>>> zdb.sync()
<span id="line-64" class="anchor"/>>>> db.sync()
<span id="line-65" class="anchor"/></pre><span id="line-66" class="anchor"/><p class="line862">看看文件大小差异::<span id="line-67" class="anchor"/></p><pre>huahua@huahua:zshelve$ ll /tmp/*shelve.db
<span id="line-68" class="anchor"/>-rw-r--r-- 1 huahua huahua  96M 2007-11-08 17:36 /tmp/shelve.db
<span id="line-69" class="anchor"/>-rw-r--r-- 1 huahua huahua 204K 2007-11-08 17:36 /tmp/zshelve.db
<span id="line-70" class="anchor"/></pre><span id="line-71" class="anchor"/><span id="line-72" class="anchor"/><span id="line-73" class="anchor"/><p class="line867">
</p><h3 id="head-61f1c7e30b2cbcc2473af3ec42c1484271aa2189">7.1.2. 补丁::</h3>
<span id="line-74" class="anchor"/><p class="line867"><span id="line-75" class="anchor"/></p><pre>--- shelve.py   2007-05-03 00:56:36.000000000 +0800
<span id="line-76" class="anchor"/>+++ zshelve.py  2007-11-08 17:25:59.000000000 +0800
<span id="line-77" class="anchor"/>@@ -70,6 +70,7 @@ except ImportError:
<span id="line-78" class="anchor"/>
<span id="line-79" class="anchor"/> import UserDict
<span id="line-80" class="anchor"/> import warnings
<span id="line-81" class="anchor"/>+import zlib        ## use zlib to compress dbfile
<span id="line-82" class="anchor"/>
<span id="line-83" class="anchor"/> __all__ = ["Shelf","BsdDbShelf","DbfilenameShelf","open"]
<span id="line-84" class="anchor"/>
<span id="line-85" class="anchor"/>@@ -80,13 +81,14 @@ class Shelf(UserDict.DictMixin):
<span id="line-86" class="anchor"/>    See the module's __doc__ string for an overview of the interface.
<span id="line-87" class="anchor"/>    """
<span id="line-88" class="anchor"/>
<span id="line-89" class="anchor"/>-    def __init__(self, dict, protocol=None, writeback=False):
<span id="line-90" class="anchor"/>+    def __init__(self, dict, protocol=None, writeback=False, compresslevel=2):
<span id="line-91" class="anchor"/>        self.dict = dict
<span id="line-92" class="anchor"/>        if protocol is None:
<span id="line-93" class="anchor"/>             protocol = 0
<span id="line-94" class="anchor"/>        self._protocol = protocol
<span id="line-95" class="anchor"/>        self.writeback = writeback
<span id="line-96" class="anchor"/>        self.cache = {}
<span id="line-97" class="anchor"/>+        self.compresslevel = compresslevel
<span id="line-98" class="anchor"/>
<span id="line-99" class="anchor"/>    def keys(self):
<span id="line-100" class="anchor"/>        return self.dict.keys()
<span id="line-101" class="anchor"/>@@ -109,7 +111,7 @@ class Shelf(UserDict.DictMixin):
<span id="line-102" class="anchor"/>        try:
<span id="line-103" class="anchor"/>            value = self.cache[key]
<span id="line-104" class="anchor"/>        except KeyError:
<span id="line-105" class="anchor"/>-            f = StringIO(self.dict[key])
<span id="line-106" class="anchor"/>+            f = StringIO(zlib.decompress(self.dict[key]))
<span id="line-107" class="anchor"/>            value = Unpickler(f).load()
<span id="line-108" class="anchor"/>            if self.writeback:
<span id="line-109" class="anchor"/>                self.cache[key] = value
<span id="line-110" class="anchor"/>@@ -121,7 +123,7 @@ class Shelf(UserDict.DictMixin):
<span id="line-111" class="anchor"/>        f = StringIO()
<span id="line-112" class="anchor"/>        p = Pickler(f, self._protocol)
<span id="line-113" class="anchor"/>        p.dump(value)
<span id="line-114" class="anchor"/>-        self.dict[key] = f.getvalue()
<span id="line-115" class="anchor"/>+        self.dict[key] = zlib.compress(f.getvalue(), self.compresslevel)
<span id="line-116" class="anchor"/>
<span id="line-117" class="anchor"/>    def __delitem__(self, key):
<span id="line-118" class="anchor"/>        del self.dict[key]
<span id="line-119" class="anchor"/>@@ -168,32 +170,32 @@ class BsdDbShelf(Shelf):
<span id="line-120" class="anchor"/>    See the module's __doc__ string for an overview of the interface.
<span id="line-121" class="anchor"/>    """
<span id="line-122" class="anchor"/>
<span id="line-123" class="anchor"/>-    def __init__(self, dict, protocol=None, writeback=False):
<span id="line-124" class="anchor"/>-        Shelf.__init__(self, dict, protocol, writeback)
<span id="line-125" class="anchor"/>+    def __init__(self, dict, protocol=None, writeback=False, compresslevel=2):
<span id="line-126" class="anchor"/>+        Shelf.__init__(self, dict, protocol, writeback, compresslevel)
<span id="line-127" class="anchor"/>
<span id="line-128" class="anchor"/>    def set_location(self, key):
<span id="line-129" class="anchor"/>        (key, value) = self.dict.set_location(key)
<span id="line-130" class="anchor"/>-        f = StringIO(value)
<span id="line-131" class="anchor"/>+        f = StringIO(zlib.decompress(value))
<span id="line-132" class="anchor"/>        return (key, Unpickler(f).load())
<span id="line-133" class="anchor"/>
<span id="line-134" class="anchor"/>    def next(self):
<span id="line-135" class="anchor"/>        (key, value) = self.dict.next()
<span id="line-136" class="anchor"/>-        f = StringIO(value)
<span id="line-137" class="anchor"/>+        f = StringIO(zlib.decompress(value))
<span id="line-138" class="anchor"/>        return (key, Unpickler(f).load())
<span id="line-139" class="anchor"/>
<span id="line-140" class="anchor"/>    def previous(self):
<span id="line-141" class="anchor"/>        (key, value) = self.dict.previous()
<span id="line-142" class="anchor"/>-        f = StringIO(value)
<span id="line-143" class="anchor"/>+        f = StringIO(zlib.decompress(value))
<span id="line-144" class="anchor"/>        return (key, Unpickler(f).load())
<span id="line-145" class="anchor"/>
<span id="line-146" class="anchor"/>    def first(self):
<span id="line-147" class="anchor"/>        (key, value) = self.dict.first()
<span id="line-148" class="anchor"/>-        f = StringIO(value)
<span id="line-149" class="anchor"/>+        f = StringIO(zlib.decompress(value))
<span id="line-150" class="anchor"/>        return (key, Unpickler(f).load())
<span id="line-151" class="anchor"/>
<span id="line-152" class="anchor"/>    def last(self):
<span id="line-153" class="anchor"/>        (key, value) = self.dict.last()
<span id="line-154" class="anchor"/>-        f = StringIO(value)
<span id="line-155" class="anchor"/>+        f = StringIO(zlib.decompress(value))
<span id="line-156" class="anchor"/>        return (key, Unpickler(f).load())
<span id="line-157" class="anchor"/>
<span id="line-158" class="anchor"/>
<span id="line-159" class="anchor"/>@@ -204,12 +206,12 @@ class DbfilenameShelf(Shelf):
<span id="line-160" class="anchor"/>    See the module's __doc__ string for an overview of the interface.
<span id="line-161" class="anchor"/>    """
<span id="line-162" class="anchor"/>
<span id="line-163" class="anchor"/>-    def __init__(self, filename, flag='c', protocol=None, writeback=False):
<span id="line-164" class="anchor"/>+    def __init__(self, filename, flag='c', protocol=None,
<span id="line-165" class="anchor"/>writeback=False, compresslevel=2):
<span id="line-166" class="anchor"/>        import anydbm
<span id="line-167" class="anchor"/>-        Shelf.__init__(self, anydbm.open(filename, flag), protocol, writeback)
<span id="line-168" class="anchor"/>+        Shelf.__init__(self, anydbm.open(filename, flag), protocol,
<span id="line-169" class="anchor"/>writeback, compresslevel)
<span id="line-170" class="anchor"/>
<span id="line-171" class="anchor"/>
<span id="line-172" class="anchor"/>-def open(filename, flag='c', protocol=None, writeback=False):
<span id="line-173" class="anchor"/>+def open(filename, flag='c', protocol=None, writeback=False, compresslevel=2):
<span id="line-174" class="anchor"/>    """Open a persistent dictionary for reading and writing.
<span id="line-175" class="anchor"/>
<span id="line-176" class="anchor"/>    The filename parameter is the base filename for the underlying
<span id="line-177" class="anchor"/>@@ -222,4 +224,4 @@ def open(filename, flag='c', protocol=No
<span id="line-178" class="anchor"/>    See the module's __doc__ string for an overview of the interface.
<span id="line-179" class="anchor"/>    """
<span id="line-180" class="anchor"/>
<span id="line-181" class="anchor"/>-    return DbfilenameShelf(filename, flag, protocol, writeback)
<span id="line-182" class="anchor"/>+    return DbfilenameShelf(filename, flag, protocol, writeback, compresslevel)
<span id="line-183" class="anchor"/></pre><span id="line-184" class="anchor"/><span id="bottom_Include_PyCommonUsageMod/zshelve" class="anchor"/></div><div id="subpageQuickIn">{<a href="/moin/PyCommonUsageMod/zshelve">/zshelve</a><a href="/moin/PyCommonUsageMod/zshelve?action=edit">}<sup>e</sup></a></div><div id="subpageLineSpace"/> <span id="line-19" class="anchor"/><span id="line-20" class="anchor"/><p class="line867"/><div lang="en" id="Include_PyCommonUsageMod/FastUserDict" dir="ltr"><span id="top_Include_PyCommonUsageMod/FastUserDict" class="anchor"/>
<span id="line-4" class="anchor"/><p class="line867"><strong> <span id="line-5" class="anchor"/></strong></p><ul><li style="list-style-type: none;"><p class="line862"><strong>一行代码让 <a href="/moin/UserDict">UserDict</a>.<a href="/moin/UserDict">UserDict</a> 的类加速 4 倍 <span id="line-6" class="anchor"/></strong></p></li></ul><p class="line867"> <span id="line-7" class="anchor"/>::-- <a href="/moin/ZoomQuiet">ZoomQuiet</a> [2007-11-10 07:34:49] <span id="line-8" class="anchor"/></p><div class="table-of-contents"><p class="table-of-contents-heading">目录</p><ol><li><a href="#head-69897e906c7433a6c7895df61afbd094ede92808">fast UserDict</a></li></ol></div> <span id="line-9" class="anchor"/><span id="line-10" class="anchor"/><p class="line867"><span id="line-11" class="anchor"/><span id="line-12" class="anchor"/><span id="line-13" class="anchor"/></p><p class="line867">
</p><h2 id="head-69897e906c7433a6c7895df61afbd094ede92808">7.2. fast UserDict</h2>
<span id="line-14" class="anchor"/><p class="line867"/><pre>Jiahua Huang <jhuangjiahua@gmail.com>
<span id="line-15" class="anchor"/>reply-to        python-cn@googlegroups.com,
<span id="line-16" class="anchor"/>to      "python. cn" <python-cn@googlegroups.com>,
<span id="line-17" class="anchor"/>date    Nov 10, 2007 3:28 PM
<span id="line-18" class="anchor"/>subject [CPyUG:34791] 一行代码让 UserDict.UserDict 的类加速 4 倍
<span id="line-19" class="anchor"/></pre><span id="line-20" class="anchor"/><p class="line862">发现 Python 标准库里好些字典类从 <a href="/moin/UserDict">UserDict</a>.<a href="/moin/UserDict">UserDict</a> 派生， <span id="line-21" class="anchor"/>而不是从 dict 派生， <span id="line-22" class="anchor"/>是因为 旧版 python 内建类型不能派生子类， <span id="line-23" class="anchor"/><span id="line-24" class="anchor"/></p><p class="line874">那么这会不会影响速度呢， <span id="line-25" class="anchor"/><span id="line-26" class="anchor"/><span id="line-27" class="anchor"/><span id="line-28" class="anchor"/></p><p class="line862">先给两个分别继承 <a href="/moin/UserDict">UserDict</a>.<a href="/moin/UserDict">UserDict</a> 和 dict 的类 URdict, Rdict <span id="line-29" class="anchor"/><span id="line-30" class="anchor"/></p><pre>>>> import UserDict
<span id="line-31" class="anchor"/>>>> class URdict(UserDict.UserDict):
<span id="line-32" class="anchor"/>...     '''dict can search key by value
<span id="line-33" class="anchor"/>...     '''
<span id="line-34" class="anchor"/>...     def indexkey4value(self, value):
<span id="line-35" class="anchor"/>...         '''search key by value
<span id="line-36" class="anchor"/>...         >>> rd = Rdict(a='One', b='Other', c='What', d='Why', e='Other')
<span id="line-37" class="anchor"/>...         >>> rd.indexkey4value('Other')
<span id="line-38" class="anchor"/>...         'b'
<span id="line-39" class="anchor"/>...         '''
<span id="line-40" class="anchor"/>...         try:
<span id="line-41" class="anchor"/>...             ind = self.values().index(value)
<span id="line-42" class="anchor"/>...             return self.keys()[ind]
<span id="line-43" class="anchor"/>...         except:
<span id="line-44" class="anchor"/>...             return None
<span id="line-45" class="anchor"/>...     def key4value(self, svalue):
<span id="line-46" class="anchor"/>...         '''search key by value
<span id="line-47" class="anchor"/>...         >>> rd = Rdict(a='One', b='Other', c='What', d='Why', e='Other')
<span id="line-48" class="anchor"/>...         >>> rd.key4value('Other')
<span id="line-49" class="anchor"/>...         'b'
<span id="line-50" class="anchor"/>...         '''
<span id="line-51" class="anchor"/>...         for key, value in self.iteritems():
<span id="line-52" class="anchor"/>...             if value == svalue:
<span id="line-53" class="anchor"/>...                 return key
<span id="line-54" class="anchor"/>...     def keys4value(self, svalue):
<span id="line-55" class="anchor"/>...         '''search keys by value
<span id="line-56" class="anchor"/>...         >>> rd = Rdict(a='One', b='Other', c='What', d='Why', e='Other')
<span id="line-57" class="anchor"/>...         >>> rd.keys4value('Other')
<span id="line-58" class="anchor"/>...         ['b', 'e']
<span id="line-59" class="anchor"/>...         '''
<span id="line-60" class="anchor"/>...         keys=[]
<span id="line-61" class="anchor"/>...         for key, value in self.iteritems():
<span id="line-62" class="anchor"/>...             if value == svalue:
<span id="line-63" class="anchor"/>...                 keys.append(key)
<span id="line-64" class="anchor"/>...         return keys
<span id="line-65" class="anchor"/>...
<span id="line-66" class="anchor"/>>>>
<span id="line-67" class="anchor"/>>>> class Rdict(dict):
<span id="line-68" class="anchor"/>...     '''dict can search key by value
<span id="line-69" class="anchor"/>...     '''
<span id="line-70" class="anchor"/>...     def indexkey4value(self, value):
<span id="line-71" class="anchor"/>...         '''search key by value
<span id="line-72" class="anchor"/>...         >>> rd = Rdict(a='One', b='Other', c='What', d='Why', e='Other')
<span id="line-73" class="anchor"/>...         >>> rd.indexkey4value('Other')
<span id="line-74" class="anchor"/>...         'b'
<span id="line-75" class="anchor"/>...         '''
<span id="line-76" class="anchor"/>...         try:
<span id="line-77" class="anchor"/>...             ind = self.values().index(value)
<span id="line-78" class="anchor"/>...             return self.keys()[ind]
<span id="line-79" class="anchor"/>...         except:
<span id="line-80" class="anchor"/>...             return None
<span id="line-81" class="anchor"/>...     def key4value(self, svalue):
<span id="line-82" class="anchor"/>...         '''search key by value
<span id="line-83" class="anchor"/>...         >>> rd = Rdict(a='One', b='Other', c='What', d='Why', e='Other')
<span id="line-84" class="anchor"/>...         >>> rd.key4value('Other')
<span id="line-85" class="anchor"/>...         'b'
<span id="line-86" class="anchor"/>...         '''
<span id="line-87" class="anchor"/>...         for key, value in self.iteritems():
<span id="line-88" class="anchor"/>...             if value == svalue:
<span id="line-89" class="anchor"/>...                 return key
<span id="line-90" class="anchor"/>...     def keys4value(self, svalue):
<span id="line-91" class="anchor"/>...         '''search keys by value
<span id="line-92" class="anchor"/>...         >>> rd = Rdict(a='One', b='Other', c='What', d='Why', e='Other')
<span id="line-93" class="anchor"/>...         >>> rd.keys4value('Other')
<span id="line-94" class="anchor"/>...         ['b', 'e']
<span id="line-95" class="anchor"/>...         '''
<span id="line-96" class="anchor"/>...         keys=[]
<span id="line-97" class="anchor"/>...         for key, value in self.iteritems():
<span id="line-98" class="anchor"/>...             if value == svalue:
<span id="line-99" class="anchor"/>...                 keys.append(key)
<span id="line-100" class="anchor"/>...         return keys
<span id="line-101" class="anchor"/>...
<span id="line-102" class="anchor"/>>>>
<span id="line-103" class="anchor"/>
<span id="line-104" class="anchor"/>>>> import time
<span id="line-105" class="anchor"/>>>> def _timeit(_src):
<span id="line-106" class="anchor"/>...     exec('''
<span id="line-107" class="anchor"/>... _t0 = time.time()
<span id="line-108" class="anchor"/>... %s
<span id="line-109" class="anchor"/>... _t1 = time.time()
<span id="line-110" class="anchor"/>... _t3 = _t1 - _t0
<span id="line-111" class="anchor"/>... '''%_src)
<span id="line-112" class="anchor"/>...     return _t3
<span id="line-113" class="anchor"/>...
<span id="line-114" class="anchor"/>>>> ran = range(100000)
<span id="line-115" class="anchor"/>
<span id="line-116" class="anchor"/>再弄俩实例
<span id="line-117" class="anchor"/>>>> u = URdict()
<span id="line-118" class="anchor"/>>>> r = Rdict()
<span id="line-119" class="anchor"/>
<span id="line-120" class="anchor"/>看看插入速度
<span id="line-121" class="anchor"/>>>> _timeit("for i in ran: u[i]=i")
<span id="line-122" class="anchor"/>0.1777961254119873
<span id="line-123" class="anchor"/>>>> _timeit("for i in ran: r[i]=i")
<span id="line-124" class="anchor"/>0.048948049545288086
<span id="line-125" class="anchor"/>
<span id="line-126" class="anchor"/>看看原始 dict 的速度
<span id="line-127" class="anchor"/>>>> _timeit("for i in ran: d[i]=i")
<span id="line-128" class="anchor"/>0.041368961334228516
<span id="line-129" class="anchor"/></pre><span id="line-130" class="anchor"/><span id="line-131" class="anchor"/><p class="line862">可以看到， <a href="/moin/UserDict">UserDict</a>.<a href="/moin/UserDict">UserDict</a> 确实严重影响速度， <span id="line-132" class="anchor"/><span id="line-133" class="anchor"/></p><p class="line862">python 标准库里边好多 <a href="/moin/UserDict">UserDict</a> 的都应该换成 dict ， 以提高性能 <span id="line-134" class="anchor"/><span id="line-135" class="anchor"/></p><p class="line874">不过，一个个修改 Python 标准库似乎又不合适， <span id="line-136" class="anchor"/><span id="line-137" class="anchor"/><span id="line-138" class="anchor"/><span id="line-139" class="anchor"/></p><p class="line862">再次使用一招鲜，直接干掉 <a href="/moin/UserDict">UserDict</a> <span id="line-140" class="anchor"/><span id="line-141" class="anchor"/></p><p class="line862">在使用/导入那些模块前先来一行<span id="line-142" class="anchor"/></p><pre>>>> import UserDict; UserDict.UserDict = dict
<span id="line-143" class="anchor"/></pre><span id="line-144" class="anchor"/><p class="line862">完了再导入模块来试试<span id="line-145" class="anchor"/></p><pre>>>> u = URdict()
<span id="line-146" class="anchor"/>>>> _timeit("for i in ran: u[i]=i")
<span id="line-147" class="anchor"/>0.042366981506347656
<span id="line-148" class="anchor"/></pre><span id="line-149" class="anchor"/><span id="line-150" class="anchor"/><p class="line867"><tt class="backtick">一行代码让速度提高 4 倍</tt> <span id="line-151" class="anchor"/><span id="bottom_Include_PyCommonUsageMod/FastUserDict" class="anchor"/></p></div><div id="subpageQuickIn">{<a href="/moin/PyCommonUsageMod/FastUserDict">/FastUserDict</a><a href="/moin/PyCommonUsageMod/FastUserDict?action=edit">}<sup>e</sup></a></div><div id="subpageLineSpace"/> <span id="line-21" class="anchor"/><span id="line-22" class="anchor"/><p class="line867"><span id="line-23" class="anchor"/></p><p class="line867"><span id="line-24" class="anchor"/><span id="bottom_Include_PyCommonUsageMod" class="anchor"/></p></div><div id="subpageQuickIn">{<a href="/moin/PyCommonUsageMod">PyCommonUsageMod</a><a href="/moin/PyCommonUsageMod?action=edit">}<sup>e</sup></a></div><div id="subpageLineSpace"/> <span id="line-1085" class="anchor"/><span id="bottom" class="anchor"/></span></p></div></div></div>
