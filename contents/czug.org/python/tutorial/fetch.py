# -*- encoding: utf-8 -*-
import httplib, urllib

rexp = ""
contents = [ ('node0.html', "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node1.html"), 
             ('node1.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node3.html"), 
             ('node2.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node4.html"), 
             ('node3.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node5.html"), 
             ('node4.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node6.html"), 
             ('node5.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node7.html"), 
             ('node6.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node8.html"), 
             ('node7.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node9.html"), 
             ('node8.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node10.html"), 
             ('node9.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node11.html"), 
             ('node10.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node12.html"), 
             ('node11.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node13.html"), 
             ('node12.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node14.html"), 
             ('node13.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node15.html"), 
             ('node14.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node16.html"), 
             ('node15.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node17.html"), 
             ('node16.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node18.html"), 
             ('node17.html',
                 "http://www.woodpecker.org.cn:9081/projects/pythontutorial/py2.5/html/tut/node19.html"), 
           ]

for content in contents:
    url = content[1]
    host, path = url.split('//')[1].split('/', 1)
    print host, path
    conn = httplib.HTTPConnection(host)
    conn.request("GET", url, '', {})

    response = conn.getresponse()
    data = response.read().decode('gbk', 'ignore')
    ff = """<p>出处： <a href="%s">%s</a></p>"""% ( content[1],content[1])

    s = data.split('<!--End of Navigation Panel-->')[1]
    body = s[:s.find('<DIV CLASS="navigation"')]

    fs = open(content[0], 'w')
    fs.write(ff+body + '\n')

