import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  constructor(
    private http: Http
  ) { }

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
}
