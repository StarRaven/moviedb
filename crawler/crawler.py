import requests
import json
min = 1
max = 5
# min = 1
# max = 100000
# min = 100001
# max = 200000
# min = 200001
# max = 300000
# min = 300001
# max = 400000
# min = 400001
# max = 500000
# min = 500001
# max = 514246

with open("movie.json", "a") as f:
    f.write('[')

    for num in range(min, max):
        if num % 1000 == 0:
            print(num)
        url = 'https://api.themoviedb.org/3/movie/' + str(num) +'?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US'
        response = requests.get(url)
        if response.status_code == 200:
            json.dump(response.json(), f)
            f.write(',')

    url = 'https://api.themoviedb.org/3/movie/' + str(max) +'?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US'
    response = requests.get(url)
    if response.status_code == 200:
        json.dump(response.json(), f)

    f.write(']')
