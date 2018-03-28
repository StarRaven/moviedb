import json
import requests


myFile=open("movie.json", 'r')
myObject=myFile.read()
u = myObject.decode('utf-8-sig')
myObject = u.encode('utf-8')
myFile.encoding
myFile.close()
arr=json.loads(myObject,'utf-8')


headers = {'Content-Type': 'application/json'}

for s in arr:
    url = 'http://localhost:9200/database/movies/'+str(s['id'])
    r = requests.post(url, headers=headers, data=json.dumps(s))