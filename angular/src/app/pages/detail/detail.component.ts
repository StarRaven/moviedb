import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
  cast: any;
  crew: any;
  private _albums: Array<any> = [];
  chartOption: any;

  nowCatid: number;
  recommendations: Array<any> = [];
  recommendationChartInstance: any;
  recommendationChartOption: any;
  recommendationChartData: any;
  recommendationChartEdges: any;
  recommendationChartCategories: any;
  selectRecommendation: any;

  constructor(
    private route: ActivatedRoute,
    private ms: MovieService,
    private _lightbox: Lightbox,
    private router: Router
  ) { }

  getRecommendations(chartid: number, dbid: number) {
    this.nowCatid++;
    this.ms.getRecommendations(dbid).subscribe(
      (jsonData) => {
        this.recommendations = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody['results']) {
          this.recommendations.push(entry);
        };
        console.log(this.recommendations);
        for (let i = 0; i < 5; i++) {
          let r = this.recommendations[i];
          this.recommendationChartData.push({
            id: this.recommendationChartData.length,
            name: r.title,
            category: this.nowCatid,
            symbolSize: 13,
            detail: r
          });
          console.log(chartid, this.recommendationChartData.length - 1);
          this.recommendationChartEdges.push({
            source: chartid,
            target: this.recommendationChartData.length - 1
          });
          this.recommendationChartInstance.setOption({
            series: [{
              roam: true,
              data: this.recommendationChartData,
              edges: this.recommendationChartEdges
            }]
          });
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete"));
  }

  onRecommendationChartInit(ev) {
    var thisFunc = this;
    this.recommendationChartInstance = ev;
  }

  initRecommendationChart() {
    this.selectRecommendation = null;
    this.nowCatid = 0;
    this.recommendationChartCategories = [];
    for (var i = 0; i < 9; i++) {
      this.recommendationChartCategories.push({
        name: i
      });
    }
    this.recommendationChartData = [{
      fixed: true,
      x: 200,
      y: 270,
      symbolSize: 15,
      id: '0',
      name: this.movieData.title,
      category: this.nowCatid,
      detail: this.movieData
    }];

    this.recommendationChartEdges = [];

    this.recommendationChartOption = {
      series: [{
        type: 'graph',
        layout: 'force',
        animation: false,
        data: this.recommendationChartData,
        categories: this.recommendationChartCategories,
        force: {
          // initLayout: 'circular'
          // gravity: 0
          repulsion: 100,
          edgeLength: 10
        },
        label: {
          normal: {
            position: 'right'
          }
        },
        edges: this.recommendationChartEdges
      }]
    };
  }

  getCredits(id: number) {
    this.ms.getCredits(id).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        this.cast = jsonDataBody.cast;
        this.crew = jsonDataBody.crew;
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete"));
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    var getMovie = Observable.create((observer) => {
      this.ms.getDetail(this.id).subscribe(
        (jsonData) => {
          let jsonDataBody = jsonData.json();
          this.movieData = jsonDataBody;
          console.log(jsonDataBody);
          observer.next(this.movieData);
        },
        // The 2nd callback handles errors.
        (err) => console.error(err),
        // The 3rd callback handles the "complete" event.
        () => console.log("observable complete"));
      
    });

    getMovie.subscribe(movie => {
      console.log(movie);
      this.poster = {
        src: 'https://image.tmdb.org/t/p/w780/' + movie.poster_path,
        caption: movie.title,
        thumb: 'https://image.tmdb.org/t/p/w342/' + movie.poster_path
      };
      this._albums.push(this.poster);
      this.getCredits(this.id);

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
      this.initRecommendationChart();
    })

    this.getRecommendations(0, this.id);
  }

  onRecommendationChartEvent(event: any, type: string) {
    //console.log('chart event:', type, event);
    console.log(event.data);
    this.selectRecommendation = event.data;
  }

  open(): void {
    // open lightbox
    this._lightbox.open(this._albums, 0);
  }

}
