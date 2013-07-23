
# -*- encoding: utf-8 -*-
import httplib, urllib
import simplejson as json
import os

contents = [
          ('01.htm','Introduction'),
          ('02.htm','Interact'),
          ('03.htm','Modules'),
          ('04.htm','Demo'),
          ('05.htm','Pong'),
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
    metadata['dublin']['creators'] = (newfile['creator'],)
    # 写入元数据
    frspath = os.path.join(os.getcwd(),'.frs',newfile['id'])
    if not os.path.exists(frspath):
        os.makedirs(frspath)
    metadatapath = os.path.join(frspath,'metadata.json')
    f = file(metadatapath,'wb')
    json.dump(metadata,f,ensure_ascii=False,indent=4)
    f.close()
    # 在文件系统中生成文件或文件夹,如果是文件夹返回其路径
    #if file_type=='folder':
    #    if not os.path.exists(newfile['id']):
    #        os.mkdir(newfile['id'])
    ##    dirpath = os.path.join(os.getcwd(),newfile['id'])
    #    return dirpath
    #else:
    #    out = file(newfile['id'],'w')
    #    out.write(newfile['data'])
    #    out.close()
#
for content in contents:
    f = open(content[0], 'w')
    for line in open(content[0]+'l').readlines():
        f.write(line.strip() + '\n')
    #fs = fs.split()
    newfile = {'id':content[0],'title':content[1],'creator':'Benky','contenttype':'Document'}
    mkfile(newfile)

