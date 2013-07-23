
# -*- encoding: utf-8 -*-
import httplib, urllib
import simplejson as json
import os

contents = [
          ('01.htm','简介'),
          ('02.htm','第一个程序'),
          ('03.htm','菜单与工具条'),
          ('04.htm','层管理'),
          ('05.htm','事件和信号'),
          ('06.htm','对话框'),
          ('07.htm','插件'),
          ('08.htm','拖放操作'),
          ('09.htm','绘图'),
          ('10.htm','自定义插件'),
          ('11.htm','俄罗斯方块游戏'),
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

