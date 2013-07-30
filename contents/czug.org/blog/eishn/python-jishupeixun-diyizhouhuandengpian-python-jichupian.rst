---
created: 2006-02-11 18:05:38
creator: eishn
description: "Python 基础篇  -Life Is Short  You Need Python\r\n\"作者: 魏中华 (我已经转换为HTML)\""
title: '[Python 技术培训] 第一周幻灯片 "Python 基础篇"'
---
<h1>[Python 技术培训] 第一周幻灯片 "Python 基础篇</h1>
<h2 class="Heading">
Python 基础篇  -Life Is Short  You Need Python</h2><h3 class="Subheading"><br />
</h3><h3 class="Subheading">Python 简介</h3><ul><li>
Python是一种开源的 、解析性的，面向对象的编程语言。 </li></ul><ul><li>
Python使用一种优雅的语法，可读性强 </li></ul><ul><li>
Python支持类和多层继承等的面向对象编程技术。 </li></ul><ul><li>
Python可运行在多种计算机平台和操作系统中，如各位unix，windows，MacOS,OS/2等等</li></ul><p><br />
</p><h3 class="Subheading">
 使用python</h3><ul><li>
安装python, 请参阅:http://www.python.org </li></ul><ul><li>
运行python脚本:</li></ul><ol><li>
    交互式运行(在Windows平台下有GUI界面）</li><li>
    执行python脚本文件</li><li>
在Linux/UNIX环境下运行程序 。</li><li>
    在python头部加一行：#! /usr/local/bin/python</li><li>
    chmod +x myfile.py</li><li>
    ./myfile.py (当然也可以直接以python myfile 方式执行)</li></ol><p><br /></p><h3 class="Subheading">快速开始</h3><ul><li>
简单语句<br /></li></ul><blockquote><p><b>print</b> “hello world” <br /></p></blockquote><ul><li>
计算器<br /></li></ul><blockquote><p>1+1</p></blockquote><ul><li>
格式化字符串</li></ul><blockquote><p><b>print</b> "The total is %0.2f"  %56.3598</p></blockquote><ul><li>
注释 <br /></li></ul><blockquote><p><i>#  我是注释</i></p><p><i>“”“ 我的注释 ”“”</i></p></blockquote><ul><li>
模块</li></ul><blockquote><b>import</b> sys<br />sys.exit()<br /></blockquote><p><br /></p><h3 class="Subheading">Python的数据类型</h3><p><br />变量的定义。在python中，变量的类型是由赋给它的数值定义的。<br /></p><blockquote>
      q = 7                        <i>#q其为数值型变量</i><br />
      q = “Seven”    <i>#q为字符串型变量</i><br /></blockquote><br /><p>
基本数据类型:<b>字符串，整数，浮点数，虚数，布尔型</b>。<br />
集合类型：<b>列表（List),元组（Tuple),字典（Dictionary或Hash)</b><br />
<br /></p><h3 class="Subheading">
Python的数据类型:列表（List)</h3><p>
List的定义。<br /></p><blockquote>
       aList = [23]  或者 bList = [1,2,3]<br /></blockquote><br /><p>
List的使用。可以像c语言中数据一样引用list中的元素。<br /></p><blockquote><b>
       print</b> bList[1] <br /></blockquote><br /><p>
 List常用操作：append, del, + ,*, len(list)<br /></p><blockquote>
     [0] * 5<br /></blockquote><br /><p>
Python的数据类型:列表（方法)<br />
Table 3.3. 列表对象支持的方法(演示）<br /></p><blockquote>
append(x)  count(x)   extend(L)<br />
Index(x)     insert(i,x) pop(x)<br />
remove(x)   reverse()  sort()<br /></blockquote><p>
<br />
<br /></p><h3 class="Subheading">
Python的数据类型:元组（Tuple)</h3><p>
Tuple的定义。<br /></p><blockquote>
       aTuple = (1, 3, 5)<br /><b>
       print</b> aTuple<br /></blockquote><p>
List的使用。<br /></p><ol><li>元组可以用方括号括起下标做索引</li><li>元组一旦创建就不能改变</li><li> 列表大部分操作同样适用于元组</li></ol><p><br /></p><h3 class="Subheading">Python的数据类型:字典（Hash)</h3><p>
字典是一个用大括号括起来的键值对，字典元素分为两部份，键(key)和值。字典是python中唯一内置映射数据类型。通过指定的键从字典访问值。 <br />
字典的使用:<br /></p><blockquote>
a = {‘a’:’aa’, ‘b’:’bb’}<br />
a[‘c’]=‘cc’<br />
a.has_key(‘a’)<br /></blockquote><p><br /></p><h3 class="Subheading">Python的数据类型:字典（常用方法)</h3><p>
字典的常用方法（演示）：<br /></p><blockquote>
has_key(x)   keys()      values() <br />
items()         clear()      copy() <br />
update(x)     get(x[,y])<br /></blockquote><p><br /></p><h3 class="Subheading">Python 控制语句 if</h3><p>
Python支持三种不同的控制结构：if，for和while，不支持C语言中的switch语句。<br />
    (1)if 语句的用法：<br /></p><blockquote><b>
          if</b> EXPRESSION1:<br />    STATEMENT1<br /><b>
		elif</b> EXPRESSION2:<br />    STATEMENT2<br /><b>
		else</b>:<br />    STATEMENT3<br /></blockquote><p>
<br />
<br /></p><h3 class="Subheading">
Python 控制语句 for</h3><p>for语句的用法：<br /></p><blockquote>
mylist = "for statement"<br /><b>for</b> word <b>in</b> mylist:<br />    <b>print</b> word<br />
<b>else</b>:<br />    <b>print</b> "End list"<br /></blockquote><p>
<br />
<br />
<br /></p><h3 class="Subheading">
Python 控制语句 while</h3><p>while语句的用法：<br /></p><blockquote>a = 0<br /><b>while</b> a &gt; 5:<br />    a = a + 1<br />    <b>print</b> a<br /><b>
else</b>:<br />    <b>print</b> "a's value is five"<br /></blockquote><p><br /></p><h3 class="Subheading">Python 循环中的控制语句</h3><p>循环中的控制语句 <br /><b>
 break:    终止当前循环<br />
 continue: 终止本次循环<br />
 pass:     什么事都不错</b><br /></p><p><br /></p><h3 class="Subheading">Python 函数</h3><p>
函数定义：<br /></p><blockquote><b>
    def</b> function_name(arg1,arg2[,...]):<br />    statement<br />    
		[<b>return</b> value]<br /></blockquote><p>
函数名：<br /></p><ol><li>函数名必须以下划线或字母开头，可以包含任意字母、数字或下划线的组合。不能使用任何的标点符号；</li><li>函数名是区分大小写的。</li><li>函数名不能是保留字。</li></ol><p>
<br />
<br /></p><h3 class="Subheading">
Python 函数</h3><p><b>
作用域：</b>Python使用名称空间的概念存储对象，这个名称空间就是对象作用的区域， 不同对象存在于不同的作用域。下面是不同对象的作用域规则：<br /></p><ol><li>
         每个模块都有自已的全局作用域。</li><li>
         函数定义的对象属局部作用域，只在函数内有效，不会影响全局作用域中的对象。</li><li>
     赋值对象属局部作用域，除非使用global关键字进行声明。</li></ol><p><b><br />LGB规则</b><br />
   大多数名字引用在三个作用域中查找：先局部(Local)，次之全局(Global)，再次之内置(Build-in)。<br />
<br /></p><h3 class="Subheading">
Python 函数</h3><p>
函数的参数的分类：<br />
     默认参数：<b>def</b> function(ARG=VALUE)<br />
  元组参数：<b>def</b> function(*ARG)<br />
  字典参数：<b>def</b> function(**ARG)<br />
一些规则：<br /></p><ol><li>默认值必须在非默认参数之后；</li><li>
   在单个函数定义中，只能使用一个tuple参数（*ARG）和一个字典参数（**ARG）。</li><li>
      tuple参数必须在连接参数和默认参数之后。</li><li>
   字典参数必须在最后定义。</li></ol><p>
<br /></p><h3 class="Subheading">
Python 模块</h3><p>
模块：模块可把一个复杂的程序按功能分开，分别存放到不同文件中，使程序更容易维护和管理。在Python中的模块是一个以.py结尾的Python代码文件。可通过<b>import</b>命令输入，如：<br /></p><blockquote><b>
      import</b> sys（和c中include语句似乎相似)<br /></blockquote><p>
      <br />
     该import语句共执行三步操作：<br /></p><ol><li>
      创建新的名称空间（namespace），该名称空间中拥有输入模块中定义的所有对象；</li><li>
      执行模块中的代码；</li><li>
      创建该名称空间的变量名。</li></ol><p>
<br />
Python 模块<br />
  import的使用:<br /></p><blockquote><b>
     import</b> ftplib <b>as</b> ftp<br /><b>
    from</b> ftplib <b>import</b> FTP<br /></blockquote><p>
<br /></p><h3 class="Subheading">
   Python脚本与模块</h3><p><br /></p><p>
         python脚本和模块都是一个以.py结束的文件，那程序是如何判断一个.py文件是作为脚本还是模块呢？关键是一个名为__name__的变量，如果它的值是__main__，则是作为脚本直接运行，否则是做为模块运行的。<br />
<br /></p><blockquote><b>
             if</b> __name__ == “__main__”:<br />   main()<br /></blockquote><p>
     <br /></p><h3 class="Subheading">
Python 包(package)</h3><p>
我们可以把几个功能相近的模块组成一个Python包，存放到一个目录结构中，通过输入包的路径来调用对对象。<br />
         例子：<br /></p><blockquote>
               /WebDesign<br />   __init__.py<br />   design.py<br />   draw.py<br /></blockquote><p>
      其中__init__.py是包的初始化文件，可以为空，但是必不可少的。可以以下列方式引用design模块：<br /></p><blockquote><b>
         import</b> WebDesign.design<br /></blockquote><p>
<br /></p><h3 class="Subheading">
Python 类</h3><p>
一个简单的例子：<br /></p><blockquote>
#!/usr/bin/python<br />
#-*- encoding:utf-8 -*-<br /><b>
class</b> test: #定义一个test类<br />   desc = "这是一个测试类。" #在类中定义一个属性desc<br />   <b>def</b> __init__(self,name1): #对象构造函数，初始化类<br />      self.name1 = name1<br />   <b>def </b>show(self,name2): #在类中定义一个方法show()<br />      <b>print</b> "hello world"<br />      <b>print</b> 'name1:',self.name1<br />      <b>print</b> 'name2:',name2<br /></blockquote><blockquote>obj = test(‘这是传递给name1的值’) #生成test类的实例对象<br /><b>
print</b> obj.desc #调用类中的desc属性<br />
obj.show('这是传递给name2的值') #调用类中的show()方法</blockquote>