进入开发模式，在zope.conf中设置(最后一行)：

devmode on

这时候，可以在zcml中，有条件的加载：

   <configure
       xmlns:zcml="http://namespaces.zope.org/zcml"
       zcml:condition="have devmode">

   开发设置

   </configure>

这样，可以省去我们从前的testing.zcml
