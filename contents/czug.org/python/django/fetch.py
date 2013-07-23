# -*- encoding: utf-8 -*-
import httplib, urllib
import simplejson as json
import os

rexp = ""
contents = [
        ('01.html',
            'http://www.javaeye.com/wiki/Django-book/737-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%B8%80%E7%AB%A0%EF%BC%9ADjango%E4%BB%8B%E7%BB%8D',
    '第一章：Django介绍'), ('02.html',
        'http://www.javaeye.com/wiki/Django-book/736-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%BA%8C%E7%AB%A0%EF%BC%9ADjango%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B',
        '第二章：Django快速上手'),
    ('03.html',
        'http://www.javaeye.com/wiki/Django-book/735-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%B8%89%E7%AB%A0%EF%BC%9A%E5%8A%A8%E6%80%81Web%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80',
                '第三章：动态Web页面基础'),
    ('04.html',
        'http://www.javaeye.com/wiki/Django-book/734-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%9B%9B%E7%AB%A0%EF%BC%9ADjango%E6%A8%A1%E6%9D%BF%E7%B3%BB%E7%BB%9F',
                    '第四章：Django模板系统'), 
    ('05.html',
        'http://www.javaeye.com/wiki/Django-book/733-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%BA%94%E7%AB%A0%EF%BC%9A%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%A4%E4%BA%92:%E6%A8%A1%E5%9E%8B',
        '第五章：与数据库交互:模型 '),
    ('06.html',
        'http://www.javaeye.com/wiki/Django-book/732-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%85%AD%E7%AB%A0%EF%BC%9ADjango%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fadmin',
                            '第六章：Django管理系统admin'),
    ('08.html',
        'http://www.javaeye.com/wiki/Django-book/731-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%85%AB%E7%AB%A0%EF%BC%9A%E9%AB%98%E7%BA%A7%E8%A7%86%E5%9B%BE%E5%92%8CURL%E9%85%8D%E7%BD%AE',
                                    '第八章：高级视图和URL配置'),
    ('09.html',
        'http://www.javaeye.com/wiki/Django-book/730-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%B9%9D%E7%AB%A0:%20Generic%20views',
        '第九章: Generic views'),
('10.html',
    'http://www.javaeye.com/wiki/Django-book/729-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E7%AB%A0%EF%BC%9A%E6%B7%B1%E5%85%A5%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E',
                                        '第十章：深入模板引擎'),
 ('11.html',
     'http://www.javaeye.com/wiki/Django-book/728-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E4%B8%80%E7%AB%A0%EF%BC%9A%E7%94%9F%E6%88%90%E9%9D%9EHTML%E5%86%85%E5%AE%B9',
                                        '第十一章：生成非HTML内容'),
                                    ('12.html',
                                        'http://www.javaeye.com/wiki/Django-book/727-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E4%BA%8C%E7%AB%A0%EF%BC%9A%E4%BC%9A%E8%AF%9D%EF%BC%8C%E7%94%A8%E6%88%B7%E5%92%8C%E6%B3%A8%E5%86%8C',
                                        '第十二章：会话，用户和注册'),
                                    ('14.html',
                                        'http://www.javaeye.com/wiki/Django-book/726-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E5%9B%9B%E7%AB%A0%EF%BC%9A%E7%BC%93%E5%AD%98',
                                        '第十四章：缓存'),
                                    ('15.html',
                                        'http://www.javaeye.com/wiki/Django-book/725-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E4%BA%94%E7%AB%A0%EF%BC%9A%E8%B4%A1%E7%8C%AE%E7%9A%84%E5%85%B6%E5%AE%83%E5%AD%90%E6%A1%86%E6%9E%B6',
                                        '第十五章：贡献的其它子框架'),
                                    ('16.html',
                                        'http://www.javaeye.com/wiki/Django-book/724-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E5%85%AD%E7%AB%A0%EF%BC%9A%E4%B8%AD%E9%97%B4%E4%BB%B6',
                                        '第十六章：中间件'),
                                    ('17.html',
                                        'http://www.javaeye.com/wiki/Django-book/723-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E4%B8%83%E7%AB%A0%EF%BC%9A%E4%B8%8E%E9%81%97%E7%95%99%E7%B3%BB%E7%BB%9F%E5%92%8C%E6%95%B0%E6%8D%AE%E5%BA%93%E9%9B%86%E6%88%90',
                                        '第十七章：与遗留系统和数据库集成'),
                                    ('18.html',
                                            'http://www.javaeye.com/wiki/Django-book/722-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E5%85%AB%E7%AB%A0%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89Django%E7%9A%84admin%E7%95%8C%E9%9D%A2',
                                        '第十八章：自定义Django的admin界面'),
                                    ('19.html',
                                            'http://www.javaeye.com/wiki/Django-book/721-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E5%8D%81%E4%B9%9D%E7%AB%A0%EF%BC%9A%E5%9B%BD%E9%99%85%E5%8C%96',
                                        '第十九章：国际化'),
                                    ('20.html',
                                            'http://www.javaeye.com/wiki/Django-book/720-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%BA%8C%E5%8D%81%E7%AB%A0%EF%BC%9A%E5%AE%89%E5%85%A8',
                                        '第二十章：安全'),
                                    ('21.html',
                                            'http://www.javaeye.com/wiki/Django-book/719-%E7%BF%BB%E8%AF%91www.djangobook.com%E4%B9%8B%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%80%E7%AB%A0%EF%BC%9A%E9%83%A8%E7%BD%B2Django',
                                        '第二十一章：部署Django')
                                    ]

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
    data = response.read()
    ff = """<p>出处： <a href="%s">%s</a></p>"""% ( content[1],content[1])
    s = data.split('<div id="wiki_main">')[1]
    body = s[:s.find('<div id="wiki_advert_w2')]

    fs = open(content[0], 'w')
    fs.write(ff+body + '\n')
    
    mkfile({'id':content[0],'title':content[2],'dsecription':'','creator':'Benky','contenttype':'Document'})
