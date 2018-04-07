import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  constructor(
    private http: Http
  ) { }

  search(query: string) {
    let headers: Headers = new Headers();
      headers.append("Authorization", "Basic " + btoa('elastic' + ":" + 'uEFp16B1cfVjCSjSJu3j')); 
      headers.append('Content-Type' , 'application/json');
    return this.http.post('http://localhost:9200/database/movies/_search?size=10', query, { headers: headers })
      .map(response => response);
  }

  pageTurn(query: string, page: number) {
    let headers: Headers = new Headers();
      headers.append("Authorization", "Basic " + btoa('elastic' + ":" + 'uEFp16B1cfVjCSjSJu3j')); 
      headers.append('Content-Type' , 'application/json');
    return this.http.post('http://localhost:9200/database/movies/_search?size=10&from='+page*10, query, { headers: headers })
      .map(response => response);
  }

  getDetail(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US', { headers: headers })
      .map(response => response);
  }

  getRecommendations(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US&page=1', { headers: headers })
      .map(response => response);
  }

  getCredits(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US', { headers: headers })
      .map(response => response);
  }

  getNowPlaying() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US&page=1', { headers: headers })
      .map(response => response);
  }

  getMostPopular() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US&page=1', { headers: headers })
      .map(response => response);
  }
}
