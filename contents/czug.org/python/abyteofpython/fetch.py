# -*- encoding: utf-8 -*-
import httplib, urllib
import simplejson as json
import os

rexp = ""
contents = [
        ('pr01.html',
    'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/pr01.html',
    '前言',7), ('ch01.html',
        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch01.html',
        '介绍',4), ('ch02.html',
            'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch02.html',
            '安装Python',3), ('ch03.html',
                'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch03.html',
                '最初的步骤',7), ('ch04.html',
                    'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch04.html',
                    '基本概念',10), ('ch05.html',
                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch05.html',
                        '运算符与表达式',5), ('ch06.html',
                            'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch06.html',
                            '控制流',7), ('ch07.html',
                                'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch07.html',
                                '函数',8), ('ch08.html',
                                    'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch08.html',
                                    '模块',7), ('ch09.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch09.html',
                                        '数据结构',8),
                                    ('ch10.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch10.html',
                                        '解决问题',4),
                                    ('ch11.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch11.html',
                                        '面向对象的编程',8),
                                    ('ch12.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch12.html',
                                        '输入/输出',3),
                                    ('ch13.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch13.html',
                                        '异常',5),
                                    ('ch14.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch14.html',
                                        'Python标准库',4),
                                    ('ch15.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch15.html',
                                        '更多Python的内容',9),
                                    ('ch16.html',
                                        'http://www.woodpecker.org.cn:9081/doc/abyteofpython_cn/chinese/ch16.html',
                                        '接下来学习什么？',3)]

def mkfile(newfile,file_type="file"):
    """ 导出文件和文件夹
        file_type : file,folder
    """
    #构造元数据
    metadata = {}
    metadata['main'] = {}
    metadata['dublin'] = {}
    metadata['main']['id'] = newfile['id']
    metadata['main']['contenttype'] = newfile['contenttype']
    metadata['dublin']['title'] = newfile['title']
#    metadata['dublin']['description'] = newfile['description']
    metadata['dublin']['creators'] = (newfile['creator'],)
    # 写入元数据
    frspath = os.path.join(os.getcwd(),'.frs',newfile['id'])
    if not os.path.exists(frspath):
        os.makedirs(frspath)
    metadatapath = os.path.join(frspath,'metadata.json')
    f = file(metadatapath,'wb')
    json.dump(metadata,f,ensure_ascii=False,indent=4)
    f.close()

for content in contents:
    url = content[1]
    host, path = url.split('//')[1].split('/', 1)
    print host, path
    conn = httplib.HTTPConnection(host)
    conn.request("GET", url, '', {})
    print url

    response = conn.getresponse()
    data = response.read().decode('gbk', 'ignore')
    ff = """<p>出处： <a href="%s">%s</a></p>"""% ( content[1],content[1])
    s = data.split('<hr noshade>')[1]
    body = s[:s.find('<hr noshade>')]
    body = body.replace('a href=\"pr', 'a href=\"#pr')
    body = body.replace('a href=\"ch', 'a href=\"#ch')

    subbody_html = ''
    for i in range(2,content[3]+1):
        if i < 10:
            ii = '0%s' %i
        else:
            ii = str(i)
        suburl = url.split('.html')[0]+'s'+ii+'.html'
        host, path = suburl.split('//')[1].split('/', 1)
        print host, path
        conn = httplib.HTTPConnection(host)
        print suburl
        conn.request("GET", suburl, '', {})

        response = conn.getresponse()
        subdata = response.read().decode('gbk', 'ignore')
        s = subdata.split('<hr noshade>')[1]
        subbody = s[:s.find('<hr noshade>')]
        try:
            h1 = subdata.split('<h1>')[1]
            h1_title = h1[:h1.find('</h1>')]

            subbody=subbody.replace(h1_title, 
                    '<a name=\"%s">%s</a>'%(suburl.split('chinese/')[1], h1_title))
        except:
            pass
        subbody_html += subbody

    fs = open(content[0], 'w')
    fs.write(ff+body+subbody_html + '\n')
    
    mkfile({'id':content[0],'title':content[2],'dsecription':'','creator':'Benky','contenttype':'Document'})
