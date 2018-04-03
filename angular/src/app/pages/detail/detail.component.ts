import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Lightbox } from 'angular2-lightbox';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: number;
  movieData: any;
  poster: any;
  private _albums: Array<any> = [];
  chartOption: any;
  recommendations: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private ms: MovieService,
    private _lightbox: Lightbox
  ) { }

  getRecommendations(id: number){
    this.ms.getRecommendations(id).subscribe(
      (jsonData) => {
        this.recommendations = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody['results']) {
          this.recommendations.push(entry);
        };
        console.log(this.recommendations);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete"));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    var getMovie = Observable.create((observer) => {
      this.movieData = this.ms.getDetail(this.id);
      observer.next(this.movieData);
    })

    getMovie.subscribe(movie => {
      console.log(movie);
      this.poster = {
        src: 'https://image.tmdb.org/t/p/w780/' + movie.poster_path,
        caption: movie.title,
        thumb: 'https://image.tmdb.org/t/p/w342/' + movie.poster_path
      };
      this._albums.push(this.poster);
      
      this.chartOption = {
        color: [],
        series: [
          {
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold',
                  color: '#fff'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: movie.vote_average, name: movie.vote_average * 10 + '%' },
              { value: 10 - movie.vote_average },
            ]
          }
        ]
      }
      if (movie.vote_average >= 7) {
        this.chartOption.color.push("#21D07A");
        this.chartOption.color.push("#204529");
      } else if (movie.vote_average >= 4) {
        this.chartOption.color.push("#D2D531");
        this.chartOption.color.push("#423D0F");
      } else {
        this.chartOption.color.push("#DB2360");
        this.chartOption.color.push("#571435");
      }

    })

    this.getRecommendations(this.id);
  }


  open(): void {
    // open lightbox
    this._lightbox.open(this._albums, 0);
  }

}
