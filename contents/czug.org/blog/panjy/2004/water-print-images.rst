<p>（ <a class="reference" href="http://www.livejournal.com/users/gniemeyer/10279.html">原文</a> ）使用 <a class="reference" href="http://www.pythonware.com/products/pil">PIL</a> 可轻松添加水印，效果如下:</p>
<img alt="http://linux-br.conectiva.com.br/~niemeyer/livejournal/watermark.jpg" src="http://linux-br.conectiva.com.br/~niemeyer/livejournal/watermark.jpg" />
<p>代码如下:</p>
<pre class="literal-block">
#!/usr/bin/python
from PIL import Image, ImageDraw, ImageFont
from math import atan, degrees
import sys
import os

FONT = &quot;/usr/X11R6/lib/X11/fonts/TTF/Vera.ttf&quot;

def main(filename, text, outfilename):
   img = Image.open(filename).convert(&quot;RGB&quot;)
   watermark = Image.new(&quot;RGBA&quot;, (img.size[0], img.size[1]))
   draw = ImageDraw.ImageDraw(watermark, &quot;RGBA&quot;)
   size = 0
   while True:
       size += 1
       nextfont = ImageFont.truetype(FONT, size)
       nexttextwidth, nexttextheight = nextfont.getsize(text)
       if nexttextwidth+nexttextheight/3 &gt; watermark.size[0]:
           break
       font = nextfont
       textwidth, textheight = nexttextwidth, nexttextheight
   draw.setfont(font)
   draw.text(((watermark.size[0]-textwidth)/2,
              (watermark.size[1]-textheight)/2), text)
   watermark = watermark.rotate(degrees(atan(float(img.size[1])/img.size[0])),
                                Image.BICUBIC)
   mask = watermark.convert(&quot;L&quot;).point(lambda x: min(x, 55))
   watermark.putalpha(mask)
   img.paste(watermark, None, watermark)
   img.save(outfilename)

if __name__ == &quot;__main__&quot;:
   if len(sys.argv) != 4:
       sys.exit(&quot;Usage: %s &lt;input-image&gt; &lt;text&gt; &lt;output-image&gt;&quot;
                % os.path.basename(sys.argv[0]))
   main(*sys.argv[1:])
</pre>
