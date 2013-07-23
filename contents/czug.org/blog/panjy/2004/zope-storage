
 <p>安装Zope后，会发现数据均保存在一个Data.fs的文件中，而且采用的是一个不开放的存储格式。很多人会产生疑问：</p>
 <ul>
 <li>一旦数据量增加了，这个独立Data.fs能否承受？系统性能是否会变慢？</li>
 <li>我保存了大量的图片、文档，能否让这些数据保存在文件系统中？<br /></li>
 <li>关系数据库已经非常成熟了，能否保存在关系数据库中？</li>
 </ul>
 <p>其实，独立Data.fs仅仅是Zope一个缺省存储方式，能够满足大多数的应用。通过定制和选择其他的第三方插件，可以满足其他的特殊要求。</p>
 <ul>
 <li>ZODB支持多个storage。这样您可以把您的Data.fs文件分割为多个文件，分别存储数据。在$
 ZOPEINSTANCE/etc/zope.conf中，可以设置具体的ZODB存储方案。同时在ZMI中，需要mount相应的storage。使用
 起来就好像在linux上mount一个分区一样。</li>
 <li>
 ZODB的storage有很多种，Data.fs仅仅是一个FileStorage，即单文件的storage方式。其他的storage包括<a href="http://dirstorage.sourceforge.net/">DirectoryStorage</a>(分目录存储数据), <a href="http://hathawaymix.org/Software/Ape">APE</a>(可适配的存储引擎，见后)，<a href="http://www.zope.org/Wikis/ZODB/BerkeleyStorage">BDBStorage</a>（将数据保存在BerkerleyDB中），以及OracelStorage等。各个storage有不同的特点，可参考这个
 <a href="http://cvs.zope.org/ZODB3/Doc/storages.html?rev=1">对比</a>。</li>
 <li><a href="http://cvs.zope.org/ZODB3/Doc/storages.html?rev=1">APE</a>是一个可适配的存储引擎，通过适配器，她能够把python对象保存在一个文件系统中、或者关系数据库中、或者其他任意的地方。目前主要用于ZODB，也可以用
 于zope/zodb外的其他Python项目。APE目前支持文件系统和数据库的两种适配。可提供到postgresql/mysql的映射，同时CA
 公司也提供了到Ingres数据库的映射适配器。APE得到了CA公司的支持。</li>
 <li>上面是一些ZODB相关的storage。实际上通过zope也可以直接访问关系数据库，直接将数据存储在关系数据库而不是存储在ZODB上。</li>
 <li>
 如果开发新的产品，可使用Archetypes，Archetypes提供的抛开ZODB外的独立的Storage，可将数据保存到文件系统或者数据库(还不成熟)中。<br />
 </li>
 <li>在zope3上，数据存储的适配功能更强。目前有一个<a href="http://codespeak.net/z3/sqlos/">sqlos</a>产品，利用了<a href="http://sqlobject.org/">sqlobject</a> (<a href="http://wiki.sqlobject.org/">wiki</a>)的"对象-关系数据库"映射机制，将数据保存到关系数据库上。python上的对象和关系数据库映射系统其实很多，除了sqlobject,
 前面的ape上就有一个，其他的还有<a href="http://modeling.sourceforge.net/">Modeling</a>、
 <a class="reference" href="http://skunkweb.sourceforge.net/pydo.html">PyDO</a></li>
 </ul>
 <p>因此，Zope的存储是十分灵活的，他提供了十分全面的存储机制，几乎可以满足您任意的存储要求。</p>
