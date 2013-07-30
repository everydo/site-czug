<p>出处： <a href="http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node15.html">http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node15.html</a></p>
<div class='online-navigation'>
<!--Table of Child-Links-->
<A NAME="CHILD_LINKS"><STRONG>Subsections</STRONG></a>

<UL CLASS="ChildLinks">
<LI><A href="node15.html#SECTION0015100000000000000000">B.1 Representation Error</a>
</ul>
<!--End of Table of Child-Links-->
</div>
<HR>

<H1><A NAME="SECTION0015000000000000000000"></A><A NAME="fp-issues"></A>
<BR>
B. Floating Point Arithmetic:  Issues and Limitations
</H1>

<P>
Floating-point numbers are represented in computer hardware as
base 2 (binary) fractions.  For example, the decimal fraction

<P>
<div class="verbatim"><pre>
0.125
</pre></div>

<P>
has value 1/10 + 2/100 + 5/1000, and in the same way the binary fraction

<P>
<div class="verbatim"><pre>
0.001
</pre></div>

<P>
has value 0/2 + 0/4 + 1/8.  These two fractions have identical values,
the only real difference being that the first is written in base 10
fractional notation, and the second in base 2.

<P>
Unfortunately, most decimal fractions cannot be represented exactly as
binary fractions.  A consequence is that, in general, the decimal
floating-point numbers you enter are only approximated by the binary
floating-point numbers actually stored in the machine.

<P>
The problem is easier to understand at first in base 10.  Consider the
fraction 1/3.  You can approximate that as a base 10 fraction:

<P>
<div class="verbatim"><pre>
0.3
</pre></div>

<P>
or, better,

<P>
<div class="verbatim"><pre>
0.33
</pre></div>

<P>
or, better,

<P>
<div class="verbatim"><pre>
0.333
</pre></div>

<P>
and so on.  No matter how many digits you're willing to write down, the
result will never be exactly 1/3, but will be an increasingly better
approximation of 1/3.

<P>
In the same way, no matter how many base 2 digits you're willing to
use, the decimal value 0.1 cannot be represented exactly as a base 2
fraction.  In base 2, 1/10 is the infinitely repeating fraction

<P>
<div class="verbatim"><pre>
0.0001100110011001100110011001100110011001100110011...
</pre></div>

<P>
Stop at any finite number of bits, and you get an approximation.  This
is why you see things like:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 0.1
0.10000000000000001
</pre></div>

<P>
On most machines today, that is what you'll see if you enter 0.1 at
a Python prompt.  You may not, though, because the number of bits
used by the hardware to store floating-point values can vary across
machines, and Python only prints a decimal approximation to the true
decimal value of the binary approximation stored by the machine.  On
most machines, if Python were to print the true decimal value of
the binary approximation stored for 0.1, it would have to display

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 0.1
0.1000000000000000055511151231257827021181583404541015625
</pre></div>

<P>
instead!  The Python prompt uses the builtin
<tt class="function">repr()</tt> function to obtain a string version of everything it
displays.  For floats, <code>repr(<var>float</var>)</code> rounds the true
decimal value to 17 significant digits, giving

<P>
<div class="verbatim"><pre>
0.10000000000000001
</pre></div>

<P>
<code>repr(<var>float</var>)</code> produces 17 significant digits because it
turns out that's enough (on most machines) so that
<code>eval(repr(<var>x</var>)) == <var>x</var></code> exactly for all finite floats
<var>x</var>, but rounding to 16 digits is not enough to make that true.

<P>
Note that this is in the very nature of binary floating-point: this is
not a bug in Python, and it is not a bug in your code either.  You'll
see the same kind of thing in all languages that support your
hardware's floating-point arithmetic (although some languages may
not <em>display</em> the difference by default, or in all output modes).

<P>
Python's builtin <tt class="function">str()</tt> function produces only 12
significant digits, and you may wish to use that instead.  It's
unusual for <code>eval(str(<var>x</var>))</code> to reproduce <var>x</var>, but the
output may be more pleasant to look at:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; print str(0.1)
0.1
</pre></div>

<P>
It's important to realize that this is, in a real sense, an illusion:
the value in the machine is not exactly 1/10, you're simply rounding
the <em>display</em> of the true machine value.

<P>
Other surprises follow from this one.  For example, after seeing

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 0.1
0.10000000000000001
</pre></div>

<P>
you may be tempted to use the <tt class="function">round()</tt> function to chop it
back to the single digit you expect.  But that makes no difference:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; round(0.1, 1)
0.10000000000000001
</pre></div>

<P>
The problem is that the binary floating-point value stored for "0.1"
was already the best possible binary approximation to 1/10, so trying
to round it again can't make it better:  it was already as good as it
gets.

<P>
Another consequence is that since 0.1 is not exactly 1/10,
summing ten values of 0.1 may not yield exactly 1.0, either:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; sum = 0.0
&gt;&gt;&gt; for i in range(10):
...     sum += 0.1
...
&gt;&gt;&gt; sum
0.99999999999999989
</pre></div>

<P>
Binary floating-point arithmetic holds many surprises like this.  The
problem with "0.1" is explained in precise detail below, in the
"Representation Error" section.  See
<em class="citetitle"><a
 href="http://www.lahey.com/float.htm"
 title="The Perils of Floating
Point"
 >The Perils of Floating
Point</a></em> for a more complete account of other common surprises.

<P>
As that says near the end, ``there are no easy answers.''  Still,
don't be unduly wary of floating-point!  The errors in Python float
operations are inherited from the floating-point hardware, and on most
machines are on the order of no more than 1 part in 2**53 per
operation.  That's more than adequate for most tasks, but you do need
to keep in mind that it's not decimal arithmetic, and that every float
operation can suffer a new rounding error.

<P>
While pathological cases do exist, for most casual use of
floating-point arithmetic you'll see the result you expect in the end
if you simply round the display of your final results to the number of
decimal digits you expect.  <tt class="function">str()</tt> usually suffices, and for
finer control see the discussion of Python's <code>%</code> format
operator: the <code>%g</code>, <code>%f</code> and <code>%e</code> format codes
supply flexible and easy ways to round float results for display.

<P>

<H1><A NAME="SECTION0015100000000000000000"></A><A NAME="fp-error"></A>
<BR>
B.1 Representation Error
         
</H1>

<P>
This section explains the ``0.1'' example in detail, and shows how
you can perform an exact analysis of cases like this yourself.  Basic
familiarity with binary floating-point representation is assumed.

<P>
<i class="dfn">Representation error</i> refers to the fact that some (most, actually)
decimal fractions cannot be represented exactly as binary (base 2)
fractions.  This is the chief reason why Python (or Perl, C, C++,
Java, Fortran, and many others) often won't display the exact decimal
number you expect:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 0.1
0.10000000000000001
</pre></div>

<P>
Why is that?  1/10 is not exactly representable as a binary fraction.
Almost all machines today (November 2000) use IEEE-754 floating point
arithmetic, and almost all platforms map Python floats to IEEE-754
"double precision".  754 doubles contain 53 bits of precision, so on
input the computer strives to convert 0.1 to the closest fraction it can
of the form <var>J</var>/2**<var>N</var> where <var>J</var> is an integer containing
exactly 53 bits.  Rewriting

<P>
<div class="verbatim"><pre>
 1 / 10 ~= J / (2**N)
</pre></div>

<P>
as

<P>
<div class="verbatim"><pre>
J ~= 2**N / 10
</pre></div>

<P>
and recalling that <var>J</var> has exactly 53 bits (is <code>&gt;= 2**52</code> but
<code>&lt; 2**53</code>), the best value for <var>N</var> is 56:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 2**52
4503599627370496L
&gt;&gt;&gt; 2**53
9007199254740992L
&gt;&gt;&gt; 2**56/10
7205759403792793L
</pre></div>

<P>
That is, 56 is the only value for <var>N</var> that leaves <var>J</var> with
exactly 53 bits.  The best possible value for <var>J</var> is then that
quotient rounded:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; q, r = divmod(2**56, 10)
&gt;&gt;&gt; r
6L
</pre></div>

<P>
Since the remainder is more than half of 10, the best approximation is
obtained by rounding up:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; q+1
7205759403792794L
</pre></div>

<P>
Therefore the best possible approximation to 1/10 in 754 double
precision is that over 2**56, or

<P>
<div class="verbatim"><pre>
7205759403792794 / 72057594037927936
</pre></div>

<P>
Note that since we rounded up, this is actually a little bit larger than
1/10; if we had not rounded up, the quotient would have been a little
bit smaller than 1/10.  But in no case can it be <em>exactly</em> 1/10!

<P>
So the computer never ``sees'' 1/10:  what it sees is the exact
fraction given above, the best 754 double approximation it can get:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; .1 * 2**56
7205759403792794.0
</pre></div>

<P>
If we multiply that fraction by 10**30, we can see the (truncated)
value of its 30 most significant decimal digits:

<P>
<div class="verbatim"><pre>
&gt;&gt;&gt; 7205759403792794 * 10**30 / 2**56
100000000000000005551115123125L
</pre></div>

<P>
meaning that the exact number stored in the computer is approximately
equal to the decimal value 0.100000000000000005551115123125.  Rounding
that to 17 significant digits gives the 0.10000000000000001 that Python
displays (well, will display on any 754-conforming platform that does
best-possible input and output conversions in its C library -- yours may
not!).

<P>


