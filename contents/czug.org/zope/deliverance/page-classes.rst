---
created: ''
creator: ''
description: 注意：这个文章写在更新程序代码之前，需要校正。
title: 页面类
---
页面类 Page Classes
=========================

**Note:** This document was written before the code, and needs to be corrected.

I still like the idea of using names and indirection, ala CSS classes. I'm thinking of calling them page-class, like "page type" that Wichert suggested, but using "class" to suggest that a page isn't exclusively one thing.

The obvious and explicit way to set the class is with X-Deliverance-Page-Class, either an HTTP header or <meta http-equiv>.

Setting these isn't always easy.  You have to poke around in templates to do it, and for something like styling Trac it would be nice to do it completely externally to Trac itself.  So back to path matching.  This seems fairly obvious:

.. code-block:: xml

  <match path="/foo" class="foo" />

There will be the <match> tag, and these selectors as attributes:

  ``path``: a path.  If it allows wildcards, I am a little concerned about people mistakenly putting an exact path and assuming it is a prefix.  So I'm thinking this won't take wildcards.  A trailing / won't matter -- /foo/ and /foo will be treated equivalently, and neither would match /foobar.

    Perhaps prefixes could allow different kinds of matches.  E.g.: "wildcard:*/manage*" or "regex:/wp-admin/(post|new-post)\.php".

    I'd like a way to indicate whether just PATH_INFO or the full path is being matched.  People are naturally inclined to view it as a full-path match.  Perhaps a leading / would indicate this, and no leading / means match SCRIPT_NAME.  Except that wouldn't work for wildcard and regex matches.  For most installations PATH_INFO will be the full path, so it's a little academic.  But that's not true for openplans, so I have to think about this.

  ``domain``: a domain, with possible wildcard.

  request-header: this would be "Header: match", like "X-Requested-With:  regex:(?i)xmlhttprequest".  The header name will be parsed out.  Maybe allow wildcards?  The part after : will be matched like path, except maybe a case-insensitive whitespace-normalized match as the default.  So "X-Requested-With: xmlhttprequest" would match a value of "XMLHttpRequest", but wouldn't match "XMLHttpRequest/foo"

  ``response-header``: just like request header, but the response.

  ``last``: if this is "1", then if this <match> matches, no other matches will be checked.  (Not sure if this is the best name... it's like [L] in a rewrite rule)

If you provide multiple attributes then they all must match.  I'm not sure how to allow multiple attributes of the same type, like if you want to match multiple request headers.

Then there's the question: are classes entirely cumulative, like CSS classes?  Or is there a way to suppress a class?  Like class="-standard my-page-type", to remove the standard page type (there might be an implicit <match class="standard" /> rule).  Or maybe last="1" would stop any other classes, and so you've implicitly excluded all other classes from being added if you use it.


OK, so then the actual rules.  We introduce a single attribute:

.. code-block:: xml

  <rules class="class_name(s)">
    <append ... />
  </rules>

Except... we've already used <rules>.  We could use <class name="class_name">, but I would kind of prefer that the attribute name be "class" in both the match and rules.

Maybe better than things like -standard, would be a way of including other classes in a rule.  Like:

.. code-block:: xml

  <rules class="my-page">
    <match class="standard" />
  </rules>

then this would also have any standard rules.  This kind of overloads <match>, though I think in a way that's reasonably intuitive -- it feels the same, even though the implementation would be quite different. Though I'm not inclined to allow any other conditionals like <match path="..." /> in this context.

Also, <theme href="..." /> would be allowed in this context, and the first matched class (I'd maintain classes in an order) would have its theme used.

So... modulo a few places I noted indecision, this sounds like a simple way of providing what people need in conditional theming.  Opinions?
