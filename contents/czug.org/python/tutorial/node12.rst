---
created: 
creator: panjy
description: ''
title: 附录A
---
<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node14.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node14.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node14.html#SECTION0014100000000000000000">A.1 Line Editing</a>
<LI><A href="node14.html#SECTION0014200000000000000000">A.2 History Substitution</a>
<LI><A href="node14.html#SECTION0014300000000000000000">A.3 Key Bindings</a>
<LI><A href="node14.html#SECTION0014400000000000000000">A.4 Commentary</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION0014000000000000000000"></A><A NAME="interacting"></A>
<BR>
A. Interactive Input Editing and History Substitution
</H1>

<P>
Some versions of the Python interpreter support editing of the current
input line and history substitution, similar to facilities found in
the Korn shell and the GNU Bash shell.  This is implemented using the
<em>GNU Readline</em> library, which supports Emacs-style and vi-style
editing.  This library has its own documentation which I won't
duplicate here; however, the basics are easily explained.  The
interactive editing and history described here are optionally
available in the <span class="Unix">Unix</span> and Cygwin versions of the interpreter.

<P>
This chapter does <em>not</em> document the editing facilities of Mark
Hammond's PythonWin package or the Tk-based environment, IDLE,
distributed with Python.  The command line history recall which
operates within DOS boxes on NT and some other DOS and Windows flavors 
is yet another beast.

<P>

<H1><A NAME="SECTION0014100000000000000000"></A><A NAME="lineEditing"></A>
<BR>
A.1 Line Editing 
</H1>

<P>
If supported, input line editing is active whenever the interpreter
prints a primary or secondary prompt.  The current line can be edited
using the conventional Emacs control characters.  The most important
of these are: <kbd>C-A</kbd> (Control-A) moves the cursor to the beginning
of the line, <kbd>C-E</kbd> to the end, <kbd>C-B</kbd> moves it one position to
the left, <kbd>C-F</kbd> to the right.  Backspace erases the character to
the left of the cursor, <kbd>C-D</kbd> the character to its right.
<kbd>C-K</kbd> kills (erases) the rest of the line to the right of the
cursor, <kbd>C-Y</kbd> yanks back the last killed string.
<kbd>C-underscore</kbd> undoes the last change you made; it can be repeated
for cumulative effect.

<P>

<H1><A NAME="SECTION0014200000000000000000"></A><A NAME="history"></A>
<BR>
A.2 History Substitution 
</H1>

<P>
History substitution works as follows.  All non-empty input lines
issued are saved in a history buffer, and when a new prompt is given
you are positioned on a new line at the bottom of this buffer.
<kbd>C-P</kbd> moves one line up (back) in the history buffer,
<kbd>C-N</kbd> moves one down.  Any line in the history buffer can be
edited; an asterisk appears in front of the prompt to mark a line as
modified.  Pressing the <kbd>Return</kbd> key passes the current line to
the interpreter.  <kbd>C-R</kbd> starts an incremental reverse search;
<kbd>C-S</kbd> starts a forward search.

<P>

<H1><A NAME="SECTION0014300000000000000000"></A><A NAME="keyBindings"></A>
<BR>
A.3 Key Bindings 
</H1>

<P>
The key bindings and some other parameters of the Readline library can
be customized by placing commands in an initialization file called
<span class="file">~/.inputrc</span>.  Key bindings have the form

<P>
<div class="verbatim"><pre>
key-name: function-name
</pre></div>

<P>
or

<P>
<div class="verbatim"><pre>
"string": function-name
</pre></div>

<P>
and options can be set with

<P>
<div class="verbatim"><pre>
set option-name value
</pre></div>

<P>
For example:

<P>
<div class="verbatim"><pre>
# I prefer vi-style editing:
set editing-mode vi

# Edit using a single line:
set horizontal-scroll-mode On

# Rebind some keys:
Meta-h: backward-kill-word
"\C-u": universal-argument
"\C-x\C-r": re-read-init-file
</pre></div>

<P>
Note that the default binding for <kbd>Tab</kbd> in Python is to insert a
<kbd>Tab</kbd> character instead of Readline's default filename completion
function.  If you insist, you can override this by putting

<P>
<div class="verbatim"><pre>
Tab: complete
</pre></div>

<P>
in your <span class="file">~/.inputrc</span>.  (Of course, this makes it harder to
type indented continuation lines if you're accustomed to using
<kbd>Tab</kbd> for that purpose.)

<P>
Automatic completion of variable and module names is optionally
available.  To enable it in the interpreter's interactive mode, add
the following to your startup file:<A NAME="tex2html11"
  HREF="#foot2675"><SUP>A.1</SUP></A><a id='l2h-53' xml:id='l2h-53'></a>

<P>
<div class="verbatim"><pre>
import rlcompleter, readline
readline.parse_and_bind('tab: complete')
</pre></div>

<P>
This binds the <kbd>Tab</kbd> key to the completion function, so hitting
the <kbd>Tab</kbd> key twice suggests completions; it looks at Python
statement names, the current local variables, and the available module
names.  For dotted expressions such as <code>string.a</code>, it will
evaluate the expression up to the final "<tt class="character">.</tt>" and then
suggest completions from the attributes of the resulting object.  Note
that this may execute application-defined code if an object with a
<tt class="method">__getattr__()</tt> method is part of the expression.

<P>
A more capable startup file might look like this example.  Note that
this deletes the names it creates once they are no longer needed; this
is done since the startup file is executed in the same namespace as
the interactive commands, and removing the names avoids creating side
effects in the interactive environment.  You may find it convenient
to keep some of the imported modules, such as
<a class="ulink" href="../lib/module-os.html"
  ><tt class="module">os</tt></a>, which turn
out to be needed in most sessions with the interpreter.

<P>
<div class="verbatim"><pre>
# Add auto-completion and a stored history file of commands to your Python
# interactive interpreter. Requires Python 2.0+, readline. Autocomplete is
# bound to the Esc key by default (you can change it - see readline docs).
#
# Store the file in ~/.pystartup, and set an environment variable to point
# to it:  "export PYTHONSTARTUP=/max/home/itamar/.pystartup" in bash.
#
# Note that PYTHONSTARTUP does *not* expand "~", so you have to put in the
# full path to your home directory.

import atexit
import os
import readline
import rlcompleter

historyPath = os.path.expanduser("~/.pyhistory")

def save_history(historyPath=historyPath):
    import readline
    readline.write_history_file(historyPath)

if os.path.exists(historyPath):
    readline.read_history_file(historyPath)

atexit.register(save_history)
del os, atexit, readline, rlcompleter, save_history, historyPath
</pre></div>

<P>

<H1><A NAME="SECTION0014400000000000000000"></A><A NAME="commentary"></A>
<BR>
A.4 Commentary 
</H1>

<P>
This facility is an enormous step forward compared to earlier versions
of the interpreter; however, some wishes are left: It would be nice if
the proper indentation were suggested on continuation lines (the
parser knows if an indent token is required next).  The completion
mechanism might use the interpreter's symbol table.  A command to
check (or even suggest) matching parentheses, quotes, etc., would also
be useful.

<P>
<BR><HR><H4>Footnotes</H4>
<DL>
<DT><A NAME="foot2675">... file:</A><A
 HREF="node14.html#tex2html11"><SUP>A.1</SUP></A></DT>
<DD>
  Python will execute the contents of a file identified by the
  <a class="envvar" id='l2h-52' xml:id='l2h-52'>PYTHONSTARTUP</a> environment variable when you start an
  interactive interpreter.

</DD>
</DL>

