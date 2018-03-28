import requests
import json
    
max = 514246

with open("movie.json","a") as f:
    f.write('[')

    for num in range(2,max):
        url='https://api.themoviedb.org/3/movie/'+str(num)+'?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US' 
        response = requests.get(url)
        if response.status_code == 200:
            json.dump(response.json(),f)
            f.write(',')

    url='https://api.themoviedb.org/3/movie/'+str(max)+'?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US' 
        response = requests.get(url)
        if response.status_code == 200:
            json.dump(response.json(),f)
            
    f.write(']')
