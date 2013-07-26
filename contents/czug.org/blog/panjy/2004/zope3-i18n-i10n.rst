
 <p>原文：<a href="http://www.czug.org/docs/zope/zope3book/I18NOverview">Introduction to Zope’s
 I18n and L10n Support</a><br />
 <br />
 先介绍两个名词：</p>
 <ul>
 <li>国际化，Internationalization,I18n, 指让软件能被翻译为多种语言的过程，包括文字、货币、日期等</li>
 <li>本地化，Localization，I10n，指被翻译为一个具体语言(地区)的翻译过程</li>
 </ul>
 <p>
 zope2的国际化是一个大问题，zope2的核心没有考虑国际化。因此zope就一直没有推出过国际化的版本。plone等上层产品在国际化方面做了一些努力，我们润普公司也进行了不少的补丁，但是到目前，仍然有些不尽人意的地方。<br />
 <br />
 国际化支持是zope3的主要特性之一。zope3内部的所有的函数，都是支持unicode的，仅仅在输出的时候再根据client的编码需要进行编码
 转换。从对zope3的试验来看，真的还没有碰到什么中文问题。zope3目前已经支持英语、法语、德语、俄语、意大利语、西班牙语等多种语言了！这和
 zope2的局面完全不同。<br />
 <br />
 Zope3的翻译，主要采用了GNU的getText标准，这和Plone中的PlacelessTranslationService是一致的。<br />
 <br />
 不同的是，Zope3还利用了ICU（另外一个更高级的基于Java的国际化标准）的 220
 多种本地数据信息，如货币、时间等。另外，除了使用PO文件，zope3提供了一个功能强大的本地翻译工具，直接在web上进行翻译。<br />
 <br />
 zope3支持对python、zpt、zcml的翻译，对dtml目前还不支持（这个应该快淘汰了吧）<br />
 <br />
 使用<span class="obeylines-h"><span class="cmtt-10">ZOPE3/utilities/i18nextract.py可以自动从文件中提取msgid，生成po文件。</span></span></p>
