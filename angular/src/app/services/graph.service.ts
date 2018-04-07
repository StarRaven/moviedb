import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {

  constructor(
    private http: Http
  ) { }

  genre() {
    let headers: Headers = new Headers();
      headers.append("Authorization", "Basic " + btoa('elastic' + ":" + 'uEFp16B1cfVjCSjSJu3j')); 
      headers.append('Content-Type' , 'application/json');
      /*
    return this.http.post('http://localhost:9200/moviedb/_xpack/graph/_explore', query, { headers: headers })
      .map(response => response);
      */
  }

}
