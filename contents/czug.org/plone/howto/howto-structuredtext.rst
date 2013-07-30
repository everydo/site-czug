<p>本文来自: http://www.czug.org/Members/asky/stx-digest/document_view</p>
<h2>何謂結構文本 (Structured Text)</h2>
<p>  簡單地說, 就是利用 <strong>基本</strong> 的純文字指令, 讓使用者可以迅速地在網站上編輯網頁.
這裡提供一些使用摘要.
你可以參考:</p>

<ul>
<li><a href="http://plone.org/Members/geoff/structured_text">Structured Text Cheat Sheet - A quick structured text reference</a></li>
<li><a href="http://plone.org/Members/kpm/stx-help/view">Structured Text Help</a></li>
<li><a href="http://plone.org/Members/fifer/stx">Structured Text wiki </a></li>
<li><a href="http://zope.slat.org/Tutor/CMF/stx-intro.stx">結構本文的介紹及使用</a></li>

</ul>
<h2>標題</h2>
<p>  單一行, 其後的字母是小寫, 內縮則變次標題.</p>
<p>  <em>例如</em>:
<pre>
    One

      Here is One

      Two

        Here is Two

        Three

          Here is Three

          Four

            Here is Four

            Five

              Here is Five

              Six

                Here is six.

                Seven

                  Here is Seven. The last.
</pre>
</p>
<p>  <em>會變成</em>:</p>
<h2>One</h2>
<p>  Here is One.</p>
<h3>  Two</h3>
<p>    Here is Two.</p>
<h4>    Three</h4>
<p>      Here is Three.</p>
<h5>      Four</h5>
<p>        Here is Four.</p>
<h6>        Five</h6>
<p>          Here is Five.</p>
<h7>          Six</h7>
<p>            Here is Six.</p>
<h8>            Seven</h8>
<p>              Here is Seven. The last.</p>
<h2>無排序的列舉 (unordered list element)</h2>
<p>  以 -, *, 或 o 為開頭的段落</p>
<p>  <em>例如</em>:
<pre>
    - Test 1

    - Test 2

    - Test 3
</pre>
</p>
<p>  <em>會變成</em>:</p>

<ul>
<li>Test 1</li>
<li>Test 2</li>
<li>Test 3</li>

</ul>
<h2>有排序的列舉 (ordered list element)</h2>
<p>  以 '數字 及 一個空白鍵' 或 <code>有序的字元排列</code> 為開頭的段落</p>
<p>  <em>例如</em>:
<pre>
    1 Test 1

    2 Test 2

    3 Test 3
</pre>
</p>
<p>  <em>會變成</em>:</p>

<ol>
<li>Test 1</li>
<li>Test 2</li>
<li>Test 3</li>

</ol>
<h2>描述性列舉 (Descriptive/Definition lists)</h2>
<p>  格式如下: '標題'(一些空白)--(一些空白)<code>文字敘述</code></p>
<p>  <em>例如</em>:
<pre>
      Unordered Lists -- Generally inclues a series of bullets when
      viewed in HTML.

      Ordered Lists -- HTML viewers convert the list items into a
      numbered series.
</pre>
</p>
<p>  <em>會變成</em>:</p>
<dl>
<dt>  Unordered Lists</dt>
<dd>Generally inclues a series of bullets when
      viewed in HTML.</dd>
<dt>  Ordered Lists</dt>
<dd>HTML viewers convert the list items into a
      numbered series.</dd>
</dl>
<h2>範例說明或程式碼-1</h2>
<p>  以::為結尾並空行, 其後會被視為範例 (前面至少兩個引導空白), 以空行結束</p>
<p>  <em>例如</em>:
<pre>
    ... for example::

      This is example.

      This is also example

    ... Here is not example.
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  ... for example:
<pre>
    This is example.

    This is also example
</pre>
</p>
<p>  ...Here is not example.</p>
<h2>範例說明或程式碼-2</h2>
<p>  文字以單引號 (single quote) 括起來, (左邊引號的左邊與右邊引號的右邊留一個空白).</p>
<p>  <em>例如</em>:
<pre>
    要在 '這裡' 標示
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  要在 <code>這裡</code> 標示</p>
<h2>斜體字 (Emphasis/Italic)</h2>
<p>  格式如下: (空白)(一個星號)Text(一個星號)(空白或句點)</p>
<p>  <em>例如</em>:
<pre>
    在 *這裡測試* 也許會成功
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  在 <em>這裡測試</em> 也許會成功</p>
<h2>黑體字 (Strong/Bold)</h2>
<p>  格式如下: (空白)(兩個星號)Text(兩個星號)(空白或句點)</p>
<p>  <em>例如</em>:
<pre>
    在 **這裡測試** 也許會成功
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  在 <strong>這裡測試</strong> 也許會成功</p>
<h2>文字加底線 (Underscore)</h2>
<p>  格式如下: (空白)(一個底線)Text(一個底線)(空白或句點)</p>
<p>  <em>例如</em>:
<pre>
    在 _這裡測試_ 也許會成功
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  在 <u>這裡測試</u> 也許會成功</p>
<h2>超連結 (Hyper-Link)</h2>
<p>  格式如下:
<pre>
    - "Text":FileName

    - "Text":URL(以句點或一個空白結尾)

    - "Text":mailto:someone@some.mailbox(以句點或一個空白結尾)

    - "Image Label":img:image-file
</pre>
</p>
<p>  <em>例如</em>:
<pre>
    這裡連到 "Zope":http://www.zope.org

    請寄信給 "小白":mailto:LittleWhite@dog.my.home

    Plone Logo "Plone logo":img:http://www.plone.org/logo.jpg
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  這裡連到 <a href="http://www.zope.org">Zope</a></p>
<p>  請寄信給 <a href="mailto:LittleWhite@dog.my.home">小白</a></p>
<p>  應該會看到 Plone 的標識 <img src="http://www.plone.org/logo.jpg" alt="Plone logo" />
</p>
<h2>註解 (FootNote)</h2>
<p>  格式如下:
<pre>
    - 參考者:
        上文 [參考點] 下文.....

    - 註解:
        .. [a12] "Effective Techniques" Smith, Joe
        (獨立一行, 從第一 欄/列 開始, 兩個句點起首, 一個空白, [參考點], 一個空白, 內容)

    - 參考點命名為: letters 或 digits 或 underscores 或 dashes
      (底線和斜線好像有問題)
</pre>
</p>
<p>  <em>例如</em>:
<pre>
    我們把這個註解 [FN] 放在最後面.

    .. [FN] "註解的標題" 註解的內容
</pre>
</p>
<p>  <em>會變成</em>:</p>
<p>  我們把這個註解 <a href="#refFN">[FN]</a> 放在最後面.</p>
<h2>表格 (Table)</h2>

<ul>
<li>一般文件:
<pre>
      |-------|
      | a | b |
      |=======|
      | c | d |
      |-------|

      |-------------------------------------------------|
      | Function  | Documentation                       |
      |=================================================|
      | '__str__' | This method converts the            |
      |           |  the object to a string.            |
      |           |                                     |
      |           | - Blah                              |
      |           |                                     |
      |           | - Blaf                              |
      |           |                                     |
      |           |       |--------------------------|  |
      |           |       |  Name   | Favorite       |  |
      |           |       |         | Color          |  |
      |           |       |==========================|  |
      |           |       | Jim     |  Red           |  |
      |           |       |--------------------------|  |
      |           |       | John    |  Blue          |  |
      |           |       |--------------------------|  |
      |-------------------------------------------------|
</pre>
</li>
<li>Zwiki 文件:
<pre>
      +---+---+
      | a | b |
      +---+---+
      | c | d |
      +---+---+

      +-------+---------+------------------+
      |       |         | an inner table   |
      |       |         |                  |
      |       |         | +-------+-------+|
      |   a   |    b    | | c     | d     ||
      |       |         | |       |       ||
      |       |         | |       |       ||
      |       |         | +-------+-------+|
      +-------+---------+------------------+
</pre>
</li>

</ul>
<p>  <em>上例會變成</em>
  :<table border="1" cellpadding="2">
<tr>
<th colspan="1" align="left" valign="middle"><p> a </p>
</th>
<th colspan="1" align="left" valign="middle"><p>  b </p>
</th>
</tr>
<tr>
<td colspan="1" align="left" valign="middle"><p> c </p>
</td>
<td colspan="1" align="left" valign="middle"><p>  d </p>
</td>
</tr>
</table>
<table border="1" cellpadding="2">
<tr>
<th colspan="1" align="left" valign="middle"><p> Function  </p>
</th>
<th colspan="1" align="left" valign="middle"><p>  Documentation                       </p>
</th>
</tr>
<tr>
<td colspan="1" align="left" valign="top"><p> <code>__str__</code> </p>
</td>
<td colspan="1" align="left" valign="middle"><p>  This method converts the            
   the object to a string.            </p>

<ul>
<li>Blah                              </li>
<li>Blaf                              <table border="1" cellpadding="2">
<tr>
<th colspan="1" align="center" valign="top"><p>  Name   </p>
</th>
<th colspan="1" align="left" valign="middle"><p>  Favorite       
  Color          </p>
</th>
</tr>
<tr>
<td colspan="1" align="left" valign="middle"><p> Jim     </p>
</td>
<td colspan="1" align="center" valign="middle"><p>   Red           </p>
</td>
</tr>
<tr>
<td colspan="1" align="left" valign="middle"><p> John    </p>
</td>
<td colspan="1" align="center" valign="middle"><p>   Blue          </p>
</td>
</tr>
</table>
</li>

</ul>
</td>
</tr>
</table>
</p>
<h2><strong>有幾點注意:</strong></h2>

<ul>
<li>有些用法會和文字的編碼衝突, 原文為 Big-5 編碼, 所以如果沒經過 patch, 你會看到有些文字夾帶指令出現.</li>
<li>Carriage-Return (或 Line-Feed) 並不會造成文章的斷裂或分隔,
    而是使用單一空白列來分隔.
<ul>
<li>有時前後文有列舉, 表格時, 中間的單一敘述會變成標題文字 (header)</li>
<li>將該單一敘述分成兩行</li>

</ul>
</li>
<li>使用內縮 (indentation level) 來區分文章的字型大小.</li>
<li>可以混合使用 HTML 的語法.</li>
<li>這裡只摘要 Zope/CMF/Plone 可用的語法,
    不包含 ZWiki 或其他工具的擴充語法.
<ul>
<li>例如: <code>"Image Label" :img:image-file</code> 在
      Structured Text Documentation 可以使用,
      但是不能在 ZWiki Page 使用, 必須使用:
<pre>
        &lt;img src="FilePath/image.jpg" alt="Image Label"&gt;
</pre>
</li>
<li>請參考 <a href="http://zwiki.org/AllAboutPageTypes">AllAboutPageTypes </a></li>

</ul>
</li>

</ul>
<p><a name="refFN">[FN]</a> "註解的標題" 註解的內容</p>
