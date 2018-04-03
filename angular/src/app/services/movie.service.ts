import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  constructor(
    private http: Http
  ) { }

  getDetail(id: number) {
    let data = {
      "adult": false,
      "backdrop_path": "/z2QUexmccqrvw1kDMw3R8TxAh5E.jpg",
      "belongs_to_collection": null,
      "budget": 0,
      "genres": [
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 80,
          "name": "Crime"
        }
      ],
      "homepage": null,
      "id": 2,
      "imdb_id": "tt0094675",
      "original_language": "fi",
      "original_title": "Ariel",
      "overview": "Taisto Kasurinen is a Finnish coal miner whose father has just committed suicide and who is framed for a crime he did not commit. In jail, he starts to dream about leaving the country and starting a new life. He escapes from prison but things don't go as planned...",
      "popularity": 2.910689,
      "poster_path": "/gZCJZOn4l0Zj5hAxsMbxoS6CL0u.jpg",
      "production_companies": [
        {
          "id": 2303,
          "logo_path": null,
          "name": "Villealfa Filmproduction Oy",
          "origin_country": ""
        },
        {
          "id": 2396,
          "logo_path": null,
          "name": "Finnish Film Foundation",
          "origin_country": ""
        }
      ],
      "production_countries": [
        {
          "iso_3166_1": "FI",
          "name": "Finland"
        }
      ],
      "release_date": "1988-10-21",
      "revenue": 0,
      "runtime": 69,
      "spoken_languages": [
        {
          "iso_639_1": "fi",
          "name": "suomi"
        },
        {
          "iso_639_1": "de",
          "name": "Deutsch"
        }
      ],
      "status": "Released",
      "tagline": "",
      "title": "Ariel",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 49
    };
    return data;
  }

  getRecommendations(id: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=abc69f3218f083159cb0ebe413e122d2&language=en-US&page=1', { headers: headers })
      .map(response => response);
  }
}
