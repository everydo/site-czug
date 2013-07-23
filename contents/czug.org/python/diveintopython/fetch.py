# -*- encoding: utf-8 -*-
import httplib, urllib
import simplejson as json
import os


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


#contents = {id:(id,url,title,[sub]),id:}
contents = {}
list = []

for line in open('a.rst').readlines():
    if line.find('chapter')!=-1:
        s = line.split('href=\"../')[1]
        id = s[:s.find('/')]
        list.append("%s"%id)
        contents.setdefault(id)
        s = line.split('html\">')[1]
        title = s[:s.find('</a>')]
        s = line.split(id)[1]
        d = s[:s.find('.html')]
        url = 'http://www.woodpecker.org.cn/diveintopython/'+id+d+'.html'
            
        contents[id]=(id,url,title,[]) 
    elif line.find('section')!=-1:
        s = line.split('href=\"../')[1]
        id = s[:s.find('/')]
        s = line.split(id+'/')[1]
        sub = s[:s.find('\">')]
        if sub.find('#')==-1:
            contents[id][3].append(sub)
        else:
            pass

print contents


for content in contents.values():
    url = content[1]
    host, path = url.split('//')[1].split('/', 1)
    conn = httplib.HTTPConnection(host)
    conn.request("GET", url, '', {})
    print url

    response = conn.getresponse()
    data = response.read()
    #data = response.read().decode('gbk', 'ignore')
    ff = """<p>出处： <a href="%s">%s</a></p>"""% ( content[1],content[1])
    s = data.split('<!--#include virtual="/inc/ads" -->')[1]
    body = s[:s.find('<table')]
    body = body.replace('section\"><a href=\"', 'section\"><a href=\"#')
    body = body.replace('#index.html#', '#')

    subbody_html = ''
    for i in content[3]:
        suburl = url.split(content[0])[0]+content[0]+'/'+i
        host, path = suburl.split('//')[1].split('/', 1)
        print host, path
        conn = httplib.HTTPConnection(host)
        print suburl
        conn.request("GET", suburl, '', {})

        response = conn.getresponse()
        subdata = response.read()
        s = subdata.split('<!--#include virtual="/inc/ads" -->')[1]
        subbody = s[:s.find('<table')]
        try:
            h1 = subdata.split('<h2 class=\"title\">')[1]
            h1_title = h1[:h1.find('</h2>')]
            h1_title = h1_title.split('</a>')[1]
            print h1_title

            subbody=subbody.replace(h1_title, 
                    '<a name=\"%s">%s</a>'%(i, h1_title))
        except:
            pass
        subbody_html += subbody

    fs = open(content[0], 'w')
    fs.write(ff+body+subbody_html + '\n')
    
    mkfile({'id':content[0],'title':content[2],'dsecription':'','creator':'Benky','contenttype':'Document'})
    print list
