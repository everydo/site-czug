
# -*- encoding: utf-8 -*-
import httplib, urllib
import simplejson as json
import os

contents = [
          ('pr01.htm','前言'),
          ('pr02.htm','关于本书'),
          ('ch01.htm','第一章 欢迎使用wxPython'),
          ('ch02.htm','第二章 给wxPython程序一个坚实的基础'),
          ('ch03.htm','第三章 在事件驱动环境中开发'),
          ('ch04.htm','第四章 用PyCrust使得wxPython更易处理'),
          ('ch05.htm','第五章 绘制蓝图'),
          ('ch06.htm','第六章 使用wxPython基本构件'),
          ('ch07.htm','第七章 使用基础控件'),
          ('ch08.htm','第八章 将构件放入窗体中'),
          ('ch09.htm','第九章 通过对话框让用户选择'),
          ('ch10.htm','第十章 创建和使用wxPython菜单'),
          ('ch11.htm','第十一章 使用sizer放置构件'),
          ('ch12.htm','第十二章 操作基本图像'),
          ('ch13.htm','第十三章 建造列表控件并管理列表项'),
          ('ch14.htm','第十四章 网格控件'),
          ('ch15.htm','第十五章 树形控件'),
          ('ch16.htm','第十六章 在应用程序中加入HTML'),
          ('ch17.htm','第十七章 wxPython的打印构架'),
          ('ch18.htm','第十八章 使用wxPython的其他功能'),
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

