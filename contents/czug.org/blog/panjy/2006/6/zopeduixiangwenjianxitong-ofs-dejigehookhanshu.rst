---
created: 2006-06-01 21:07:04
creator: panjy
description: 这个几个函数非常索然无味，而且在后续版本会过时。
title: Zope对象文件系统(OFS)的几个hook函数
---
<p>这个几个函数非常索然无味，而且在后续版本会过时。</p>
<p>但是，在zope 3的事件机制未引入之前，Zope开发还是需要了解OFS的几个hook函数。</p>
<p>所谓OFS，就是Zope的对象文件系统(Object File System)，也就是在ZMI中所看到的对象树。</p>
<p>好不容易从代码中扒出来，写下来：</p>
<div class="section">
<h3><a id="def-manage-beforedelete-self-item-container" name="def-manage-beforedelete-self-item-container"><tt class="docutils literal"><span class="pre">def</span> <span class="pre">manage_beforeDelete(self,</span> <span class="pre">item,</span> <span class="pre">container):</span></tt></a></h3>
<p>对象被删除(delete)、改名(rename)，或者移动(move)之前，都先会调用此函数（从对象树中移除的时候就会调用_delObject）。</p>
<p>如果要区分具体是什么操作，可同时重载 <tt class="docutils literal"><span class="pre">_notifyOfCopyTo</span></tt> 等方法处理。</p>
<p>CMF中的容器对象，会对整个容器树中的子对象迭代调用这个方法。</p>
</div>
<div class="section">
<h3><a id="def-manage-afteradd-self-item-container" name="def-manage-afteradd-self-item-container"><tt class="docutils literal"><span class="pre">def</span> <span class="pre">manage_afterAdd(self,</span> <span class="pre">item,</span> <span class="pre">container):</span></tt></a></h3>
<p>对象被添加、或者复制、被移动的之后，都会调用此函数(只要放到对象树中的时候就会调用_setObject)。</p>
<p>如果要区分是新添加，还是复制，需要重载其他的方法，比如 <tt class="docutils literal"><span class="pre">_getCopy</span></tt> 等.</p>
<p>CMF中的容器对象，会对整个容器树中的子对象迭代调用这个方法。</p>
</div>
<div class="section">
<h3><a id="def-manage-afterclone-self-item" name="def-manage-afterclone-self-item"><tt class="docutils literal"><span class="pre">def</span> <span class="pre">manage_afterClone(self,</span> <span class="pre">item):</span></tt></a></h3>
<p>对象被Paste完成后调用，此前会先调用 <tt class="docutils literal"><span class="pre">manage_afterAdd</span></tt></p>
<p>CMF中的容器对象，会对整个容器树中的子对象迭代调用这个方法。</p>
</div>
<div class="section">
<h3><a id="def-manage-renameobject-self-id-new-id-request-none" name="def-manage-renameobject-self-id-new-id-request-none"><tt class="docutils literal"><span class="pre">def</span> <span class="pre">manage_renameObject(self,</span> <span class="pre">id,</span> <span class="pre">new_id,</span> <span class="pre">REQUEST=None):</span></tt></a></h3>
<p>容器对象才有此方法，对对象进行改名，会触发 <tt class="docutils literal"><span class="pre">manage_beforeDelete</span></tt> 和 <tt class="docutils literal"><span class="pre">manage_afterAdd</span></tt> 方法</p>
</div>
