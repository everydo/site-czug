自带的 KSS 插件
===================

.. Contents::

.. sectnum::

在使用 javascript 的时候, 我们需要给插件需要的参数。这些参数，可能是必须的，或者是提供默认值的可选参数。

命令集(commandset)，实际上是采用Python语言，重写了所有的kss action功能，
需要传递完全相同的参数。
由于采用Python语言，参数的顺序必须一致。

另外，selector类型的命令必须提供一个selector参数，但这个在global类型的命令中不需要。

"core" 插件 
------------------

名字空间: "core"

事件
""""""

浏览器基础事件
'''''''''''''''''''''

With all native browser events, the following event
parameters are available. Additional parameters are marked
at the corresponding event.

- evt-<eventname>-allowbubbling (default False)

  By default, we only let an event triggered when it
  happens on the exact node we bound the event to. If
  the event happens in one of the contained nodes of
  the bound node, the event is "bubbling up" and
  occasionally reach the bound node. If this parameter
  is set to True, all these events will trigger.

  (The basic behaviour with bubbling in KSS is
  different from that of javascript. in javascript,
  bubbling events are default triggering. in kss the
  default is that we suppress these events.)

  At the moment this parameter is only available for
  "click" events.
    
- evt-<eventname>-preventdefault (default False)

  If set to True, this disables the default behaviour
  to happen upon succesful completion of an event.

  For example, if we handle the click event on an <A>
  node, we don't want to link followed as well as it
  would be the default behaviour of the click.

- evt-<eventname>-preventbubbling (default False)

  When used in combination with allowbubbling on an
  outer node, this
  can prevent the bubbling up of events from an inner
  node that is contained by the outer node. This
  property itself needs to be set on the inner node.
  (If the outer node does not have allowbubbling, the
  parameter has no effect.)

具体包括如下事件:

blur
    Triggers when leaving a form field.

focus
    Triggers when entering a form field.

resize
    Triggers when element is resized.

click
    Triggers when element is clicked with the mouse.

dblclick
    Triggers when element is double clicked with the mouse.

mousedown
    Triggers when mouse button is pressed.

mouseup
    Triggers when mouse button is released.
    
mousemove
    Triggers when mouse moves over the element.
    
mouseover
    Triggers when mouse enters the element.

mouseout
    Triggers when mouse leaves the element.

change
    Triggers when the form field value is changed.

reset
    Triggers when form is reset.

select
    Trigger when selection box's value is selected.

submit
    Trigger when form is submitted.

keydown
    Trigger when key is pressed down.
    
    - evt-keydown-keycodes (default empty)
        
      If specified, it needs to be a list of comma
      separated keycodes (specified as a single string),
      and only the keycodes in the list will trigger the
      event.

keypress
    Trigger when key is pressed.

    - evt-keypress-keycodes (default empty)

      Same as with keydown.

keyup
    Trigger when key is released.

    - evt-keyup-keycodes (default empty)

      Same as with keydown.

特殊的 kss 事件
''''''''''''''''''

timeout
    Implements a timer that triggers the event when the
    given period expires.

    - evt-timeout-delay:  delay period in milliseconds

    - evt-timeout-repeat (default true):  If the event should
      happen periodically. This is the default, but it can
      be set to false to let the timeout event happen only
      once.


load
    The event triggers when the bound node gets loaded. That
    signifies the full loading of the DOM, and may preceed
    the loading of images for the page.

    The event triggers both on the original page load, and
    when we dynamically insert content from KSS.

    - evt-load-initial (default true): if the event should
      trigger on the initial page load.

    - evt-load-insert (default true): if the event should
      trigger on dynamic insertions by KSS.


iload
    The event can only be bound to <IFRAME> node. It
    triggers when the full content of the internal frame gets loaded. 

    - evt-iload-autodetect: if set to true, the default
      mechanism that observes the loading of the iframe will
      be utilized. If set to false, it is required that the
      template of the internal template has the
      _kssReadyForLoadEvent attribute set on the document.
      (Without this the event will never be triggered.) This
      method may be more solid then the default one but
      requires the cooperation of the internal contact.

    - evt-iload-initial (default true): if the event should
      trigger on the initial page load.

    - evt-iload-insert (default true): if the event should
      trigger on dynamic insertions by KSS.

spinneron
    This event triggers when the "loading..." spinner should
    be activated.

    - evt-spinneron-laziness (default 0): laziness of the
      spinner in milliseconds.

spinneroff
    This event triggers when the "loading..." spinner should
    be deactivated.

    - evt-spinneroff-laziness (default 0): laziness of the
      spinner in milliseconds.

操作Action
""""""""""""""""

用于插入内容的HTML函数(function)
''''''''''''''''''''''''''''''''''''

所有这些操作都有如下参数:

- withKssSetup: if set to false, prohibits binding uthe
  nodes in the inserted content. This is plain
  optimization, normally ve want this wo leave on the
  default true.

函数清单:

replaceInnerHTML
    Replace all children of the given node with the given
    content.
    
    - html: the html to insert

replaceHTML
    Replace HTML including the given node with the given
    content.

    - html: the html to use as replacement (only the first node is used in the replace)
    
    - withKssSetup: if set to false, prohibits binding the
      nodes in the inserted content.

appendHTML
    Add HTML after last child of given node.

    - html: the html to insert

insertHTMLBefore
    add HTML before given node.      

    - html: the html to insert

insertHTMLAfter
    Add HTML after given node.

    - html: the html to insert

insertHTMLAsFirstChild
    Add HTML inside the given node, at the beginning.
          
    - html: the html to insert
    
insertHTMLAsLastChild
    add HTML inside the given node, at the end
    
    - html: the html to insert

删除内容
''''''''''''''''

deleteNode
    Delete the node.

clearChildNodes
    Delete all the children of the node.

deleteNodeAfter
    Delete the next node.

deleteNodeBefore
    Delete the previous node.

移动内容
''''''''''''''

moveNodeAfter
    Move the node after the node with the given HTML id.

    - html_id: the id of the second node

moveNodeBefore
    Move the node before the node with the given HTML id.

    - html_id: the id of the second node

moveNodeAsLastChild
    Move the node as last child of the node with the given HTML id.

    - html_id: the id of the second node

copyChildNodesFrom
    Copy the child nodes from the given HTML id, under the
    current node.

    - html_id: the id of the second node

copyChildNodesTo
    Copy the child nodes of the given node to the given HTML
    id.

    - html_id: the id of the second node

属性操作
''''''''''

setAttribute
    Sets a given HTML attribute of the node.

    - name: the attribute name. "style" cannot be used.
    - value: the attribute value to set

setKssAttribute
    Sets a given KSS attribute of the node, available for reading with the kssAttr() parameter producer function.
    
    - name: the attribute name.
    - value: the attribute value to set

setStyle
    Sets a given style element on the node.
    
    - name: the name of the style element.
    - value: the style element value to set

addClass
    Add a class to the classes of the node, in case it it
    not there.

    - value: the name of the class

removeClass
    Remove a class from the classes of the node, in case it
    is defined on it.

    - value: the name of the class

toggleClass
    Add a class to the classes of the node if it's not
    there, and remove it if it's there.

    - value: the name of the class

杂项
'''''''''''''

focus
    Focus the given node that is a form input.

setStateVar
    Sets a variable that resides on the client, in a global
    namespace. You can also use namespace-name to separate
    namespaces.  This variable can be sent back to a server
    action later, as a parameter.

    - varname: the variable name
    
    - value: the value to set

continueEvent
    Trigger continuation event. Event will be triggered on the same node or
    on all the nodes bound for the current event state.

    - name: the event name

    - allnodes (default false): if set to True, event is
      triggered on all the nodes that are bound in the
      current event binder.

调试帮助
'''''''''''''''''

error
    Throws an exception, when executed.

log
    Logs an informational message.

    - message: additional message to log

logDebug
    Logs a debug message.

    - message: additional message to log

alert
    Pops up an alert box. Note that this is not meant to be
    used for an applications, only for debugging.

    - message: additional message to show in the alert box

参数提供函数
"""""""""""""""""""

从指定表单抓取参数
''''''''''''''''''''''''''''''

formVar(formname, varname)
    Produces the value of a given variable within a given form.

currentFormVar(varname)
    Produces the value of a given variable within the
    current form, which is the one in which the selected
    node is. The parameter varname is optional, and if it is
    ommitted, the current node will be used (in this case it
    must be a form variable itself).

For submitting an entire form, see the kssSubmitForm action
parameter below.


抓取内容
''''''''''''''''

nodeAttr(attrname [, recurseParent])
    Produces the value of a given html attribute of the
    selected node. The optional second parameter is by
    default false. If set to true, it tries to recursively
    acquire the attribute from parent nodes as well.

kssAttr(attrname [, recurseParent])
    Produces the value of a given kss attribute of the
    selected node. The optional second parameter is by
    default false. If set to true, it tries to recursively
    acquire the attribute from parent nodes as well. The kss
    attribute may be encoded in the page as a namespace
    attribute in the form of kssattr:key="value" (only in
    case of real xhtml iow not for Plone) or in a class
    emulation mode appended at the end of the existing class
    attribute as class="... kssattr-key1-value1
    kssattr-key2-value2 ... kssattr-keyN-valueN"

nodeContent([recursive])
    Produces the textual content of the node. Newlines are
    converted to spaces. If the parameter is false
    (default), then only the direct text nodes are
    considered, if the parameter is true, texts are fetched
    from the whole subtree.

杂项
'''''''''''''

stateVar(varname)
    Produces the value of a state variable, that is, the
    same that can be set via the setStateVar command.

pass(key)
    It passes the given parameter from defaultparms to the
    request.

    It is only used in advanced cases with specially
    developed stateful event plugins. This enables the
    plugin to set additional parameters in defaultparms, and
    these values are made available for KSS.


currentFormVarFromKssAttr(attrname [, recurseParent])
    experimental, the two methods cascaded. First the
    kssAttr is looked up, and then it is used as the name of
    the form variable of whose value is to be fetched.

操作参数
"""""""""""""""""
There are special parameters that are associated with an
action itself. They all start with kss  and consequently
normal parameters cannot have a name starting with this
prefix.

对于action-server
''''''''''''''''''''''''''

kssUrl
    Can specify a different url then what would be the page
    base url and the name of the action concatenated after
    it. For example, views containing a @@ in the url can be
    called this way.

kssSubmitForm
    Submits an entire form directly onto the request.
    
    The parameter value can be one of the followings:

    - form(formname):  Produces the values of all the
      variables in a given form.
    
    - currentForm(): Produces the values of all the
      variables in the form that contains the current node.
    
    - <string>: equals to form(<string>).

对于action-client 和 默认操作
''''''''''''''''''''''''''''''''''''''''

kssSelector
    Changes the scope of execution. All selectors can be
    used as if they were parameter providers. A string value can also 
    be specified, this will be equivalent of css(<string>).

    - htmlid(id)
    
选择符类型
'''''''''''''''''''''''

css(selector)
    Selects node by the css selector.

htmlid(id)
    Selects (zero or) one element that has the givem HTML
    id.

samenode()
    Selects the same node on which the event was triggered
    originally.

    If used with kssSelector, this is the default, so it has
    the same effect as not using kssSelector at all.

    If used in commands, it will cause the command to select
    the same node on which the event was triggered.
    
parentnode(selector):
    Return a list of all nodes that match the css expression
    in the parent chain of the original node.

passnode(key)
    Similarly to passes the given parameter from defaultparms to the
    request. 
    
    It is only used in advanced cases with specially
    developed stateful event plugins. 
    The event plugin puts a set of nodes as a
    value on defaultparms, and this will be used as the
    selection.


命令集
""""""""""

The following client action are added as "selector" commands
(in addition of the action parameters, the first parameter
should be the selector)::

    replaceInnerHTML, replaceHTML, 
    setAttribute, setStyle, 
    insertHTMLAfter, insertHTMLBefore,
    insertHTMLAsFirstChild, insertHTMLAsLastChild,
    clearChildNodes, deleteNode, 
    deleteNodeAfter, deleteNodeBefore,
    copyChildNodesFrom, copyChildNodesTo, moveNodeAfter,
    toggleClass, addClass, removeClass, focus

The following client action are added as "global" commands::

    setStateVar, triggerEvent

The following helpers are also on the commandset::

getSelector(type, selector)
        Return a specific type of selector.

        The type can be `css` or `htmlid` or any registered
        selector type. The selector parameter must contain the value for the
        selector.

getCssSelector(selector)
        Return a CSS selector with selector as the value.

getHtmlIdSelector(selector)
        Return a HTML id selector with selector as the
        value.

getSameNodeSelector()
        Returns the same node selector. This can be used to
        select the same node where the original event was
        triggered.

getParentNodeSelector(selector)
        Return a all nodes in the parent chain which match
        the given css selector.

"zope" 插件
------------------

名字空间: "zope"

命令集
""""""""""

refreshProvider(selector, name)
    Refresh a page provider with the given name at the
    selected node.

refreshViewlet(self, selector, manager, name)
    Refresh a viewlet with the given manager and name at the
    selected node.


"plone" 插件
-------------------

名字空间: "plone"

事件
""""""

formProtectionChecked
    Programmatic event, that gets triggered from the
    plone-formProtectionCheck action, in case the user's
    answer to the popup query is yes.

formProtectionFailed
    Programmatic event, that gets triggered from the
    plone-formProtectionCheck action, in case the user's
    answer to the popup query is yes.

操作Action
""""""""""""""

formProtectionCheck
    Allow the form protection dialog to be triggered
    programmatically from kss. The action checks if form
    protection is needed, pops up the user dialog to let the
    user decide if he wants to leave the page, and finally
    trigger either the formProtectionChecked or
    formProtectionFailed programmatic events, based on the
    user's answer.


removeLockProtection
    Force to remove the locking protection.

initLockingProtection
    Initialize the locking protection.
    Need to execute on form nodes, typically on load event.

initKupu
    Initialize kupu. This is needed to initialize kupu
    editors inserted dynamically to the page.

followLink
    Should execute on an <A> node. Results in the link
    followed as a new request.

submitCurrentForm
    Submit the current form.

initFormTabs
    Initialize javascript for forms that have form tabs.
    Needs to execute on the form, typically on load event.

--

initFormProtection
    Initialize the form protection that protects the user
    from leaving the form withoug saving, in case he has
    changed the form's content.
    Need to execute on form nodes, typically on load event.

initShiftDetection
    Action used for the quick-edit implementation.
    

initCheckBoxSelection
    XXX

createCheckBoxSelection
    XXX

initDragAndDrop
    XXX

命令集
""""""""""

issuePortalMessage(message, msgtype='info')
    Issue a portal message to the orange message area.


refreshPortlet(portlethash, \*\*kw)
    Refresh the portlet identified with the given portlet
    hash. Additional parameters are passed to the request
    while the portlet is rendered.

refreshContentMenu()
    Refresh the content menu.

"zopen" 插件
----------------------
我们自己的插件

命令
""""""""""
redirect
    跳转

clear
    清除

addSectionOption
    给select添加option

issurePortalMessage
    显示消息

选择器
""""""""""
parentnodecss('tr|.kk')
    父节点下的某个css，如果是形式 ``table|*pageid`` ，则会先从kssattr中获取到pagid的值作为css(如果css中包括空格，则用 ``*`` 代理)

parentnodenextnode('tr')
    父节点的下一个节点

辅助函数
""""""""""""
``kssAttrJoin('lal', '*itemid', '/@@edit.html')``
    合并kss，其中带 ``*`` 的标记表示需要从kssattr中获取的

函数
""""""""""
kssServerAction(node, actionName, parms)
    在javascript中发送消息

扩展插件
------------------
拖放kss.plugins.dnd
    - http://dev.plone.org/collective/browser/kssdnd/kssdnd/trunk
    - http://codespeak.net/pipermail/kss-devel/2007-November/000326.html
    - http://it.youtube.com/watch?v=MGnSRwQuUTA

kss.plugin.livesearch
    http://pypi.python.org/pypi/kss.plugin.livesearch/1.0dev-20080523

    http://plone.org/products/livesearchwidget

