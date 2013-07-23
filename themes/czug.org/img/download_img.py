import os

rf = file('css.txt','r')
while 1:
    rl = rf.readline()
    if 'url(http://czug.org:38081/czug/' in rl:
        it = rl.split('url(')[1].split(')')[0]
        print it
        try:
            os.system('sudo wget %s' % it)
        except:
            continue
    if rl.startswith('theend'):
        break
print 'end'
rf.close()
