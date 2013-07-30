---
created: 2006-02-19 01:36:50
creator: panjy
description: 介绍查询条件、元数据、使用方法、扩展方法等。
title: 如何在Plone中查询内容？
---
参考文献：

<ul>
<li><a href="http://www.zope.org/Members/Zen/howto/AdvZCatalogSearching">http://www.zope.org/Members/Zen/howto/AdvZCatalogSearching</a></li><li><a href="http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition/SearchingZCatalog.stx">http://www.zope.org/Documentation/Books/ZopeBook/2_6Edition/SearchingZCatalog.stx</a></li>
</ul>

<h2>查询的组成部分：</h2>

<h3>  ZCatalog</h3>

<p>    建立索引：(索引，用来构造查询条件)</p>

<p>    Zcatalog不是返回对象，而是对象的Plugable Brains，Pluggable Brain包括Metadata和下面的信息：</p>


<ul>
<li>has_key(key)</li><li>getPath()</li><li>getURL() : 得到URL!!</li><li>getObject() : 得到对象！！</li><li>getRID()</li>
</ul>

<h2>示例</h2>

<p>  我写的一个查询(注意：时间必须使用时间类型，不能使用字符串):
</p>
<pre>    portal_catalog.searchResults(<br />         {'modified':{'query':_.DateTime()-1, 'range': 'min'}, <br />                 'sort_on':'modified', 'sort_order':'reverse'} )<br /></pre>


<h2>查询使用</h2>

<p>  三种方法：</p>


<ol>
<li> 通过REQUEST对象：</li><li> 命名参数：portal_catalog.searchResults(meta_type=<code>Document</code>, sort_on=<code>modified</code>, sort_order=<code>reverse</code>)</li><li> 通过字典：portal_catalog({<code>meta_type</code> : <code>Document</code>, <code>Creator</code>:<code>panjy</code>})</li><li> 列表：Catalog(meta_type=[<code>DTML Method</code>,<code>ZCatalog</code>]<a title="建立页面" class="new" href="../../../../../../../../../../../../../../../../dev/X_e5_a6_82_e4_bd_95_e5_9c_a8Plone_e4_b8_ad_e6_9f_a5_e8_af_a2_e5_86_85_e5_ae_b9_ef_bc_9f/createform?page=%3Ccode%3EDTML%20Method%3C/code%3E%2C%3Ccode%3EZCatalog%3C/code%3E">?</a>)</li><li> 多个查询条件（AND/OR）：<a href="http://www.zope.org/Members/k/ZCatalog_searchResults_note">http://www.zope.org/Members/k/ZCatalog_searchResults_note</a></li><li> 使用Records的高级的Catalog使用方法：
<ul><li>关键字索引:
<pre>      # big or shiny<br />      results=Catalog(categories=['big, 'shiny'])<br /><br />      # big and shiny<br />      results=Catalog(categories={'query':['big','shiny'], <br />                                     'operator':'and'})<br /></pre>
</li><li>Field索引:
<pre>      # items modified in the last week<br />      results=Catalog(bobobase_modification_time={<br />                  'query':DateTime() - 7,<br />                  'range': 'min'} # min/max/minmax<br />                )<br /></pre>
</li><li>TestIndex / PathIndex 略</li></ul>
</li>
</ol>

<h2>查询条件</h2>

<dl>
<dt>  Creator</dt><dd>FieldIndex 创建人</dd><dt>  Description</dt><dd>ZCTextIndex  描述</dd><dt>  SearchableText</dt><dd>ZCTextIndex 可查找的文本</dd><dt>  Subject</dt><dd>KeywordIndex  关键字</dd><dt>  Title</dt><dd>ZCTextIndex 标题</dd><dt>  allowedRolesAndUsers</dt><dd>KeywordIndex  允许的角色和用户</dd><dt>  Date</dt><dd>FieldIndex  </dd><dt>  created</dt><dd>FieldIndex   创建时间</dd><dt>  start</dt><dd>FieldIndex  开始时间</dd><dt>  end</dt><dd>FieldIndex  结束时间</dd><dt>  effective</dt><dd>FieldIndex  生效时间</dd><dt>  expires</dt><dd>FieldIndex  失效时间</dd><dt>  id</dt><dd>FieldIndex  文档的ID（Name）</dd><dt>  in_reply_to</dt><dd>FieldIndex   回复的ID号，None表示顶层</dd><dt>  modified</dt><dd>FieldIndex  修改时间</dd><dt>  path</dt><dd>PathIndex  路径（从根开始）</dd><dt>  portal_type</dt><dd>FieldIndex CMF中的内容类型ID<b></b></dd><dt>  Type</dt><dd>FieldIndex 内容类型的显示名称</dd><dt>  meta_type</dt><dd>FieldIndex  Zope的meta_type, 更底层。多个内容可能属于同一个meta_type<br />
</dd><dt>  review_state</dt><dd>FieldIndex  评审（工作流）状态</dd>
</dl>

<h2>可显示的元数据</h2>

<p>  CreationDate</p>

<p>  Creator  </p>

<p>  Date  </p>

<p>  Description  </p>

<p>  EffectiveDate  </p>

<p>  ExpiresDate  </p>

<p>  ModificationDate  </p>

<p>  Subject  </p>

<p>  Title  </p>

<p>  Type  </p>

<p>  created  </p>

<p>  effective  </p>

<p>  end  </p>

<p>  expires  </p>

<p>  getIcon  </p>

<p>  getId  </p>

<p>  id  </p>

<p>  meta_type  </p>

<p>  modified  </p>

<p>  originals_puid  </p>

<p>  portal_type  </p>

<p>  puid  </p>

<p>  remote_url  </p>

<p>  review_state  </p>

<p>  start  </p>
