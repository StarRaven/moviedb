import json
import requests
# from elasticsearch import Elasticsearch
# es = Elasticsearch(['http://elastic:uEFp16B1cfVjCSjSJu3j@localhost:9200'])

myFile = open("movie0.json", 'r')
myObject = myFile.read()
u = myObject.decode('utf-8-sig')
myObject = u.encode('utf-8')
myFile.encoding
myFile.close()
arr = json.loads(myObject, 'utf-8')


headers = {'Content-Type': 'application/json'}

num = 0

for s in arr:
    num = num+1
    if num % 1000 == 0:
        print(num)
    #res = es.index(index="moviedb", doc_type='movie', id=s['id'], body=json.dumps(s))
    url = 'http://localhost:9200/database/movies/'+str(s['id'])
    r = requests.post(url, headers=headers, data=json.dumps(s), auth=('elastic', 'uEFp16B1cfVjCSjSJu3j'))

