
 <p><a href="http://www.openarchives.org/">OAI-PMH</a>是内容管理和图书馆科学方面的一个十分先进的元数据交换标准。国外很多图书馆都提供了这个接口。其参考结构中，定义了两个软件组件：</p>
 <ul class="square">
 <li>‘数据提供者(Data Provider)’<br />
 如运行提供OAHI-PMH为其资源(如学术出版物)揭示元数据信息的图书馆.<br /></li>
 <li>‘服务提供者(Service Provider)'<br />
 使用获取(Harvester)软件，从存储仓库中获取元数据信息. 获取的元数据信息可以用于一些增值服务, 如用于浏览和查询的网站。</li>
 </ul>
 <p>首先是Infrea的<a href="http://blog.czug.org/panjunyong/railroad-repository">Railroad</a>，这个产品首先提供了大数字媒体的OAI-PMH数据提供接口。<br />
 <br />
 接着，Pentila又提供了<a href="http://www.pentila.com/produits/ZOpenArchives/">ZOpenArchives</a>,
 让Zope/Plone支持OAI的数据提供和获取。<br />
 <br />
 后来Infrea又开放了Python, Zope, Silva的<a href="http://www.infrae.com/products/oaipack">OAI-PMH扩展</a>，支持获取OAI-PMH接口的数据获取、索引、查看。</p>
