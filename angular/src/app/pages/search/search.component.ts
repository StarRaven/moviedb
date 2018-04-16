import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  result: any;
  query: string;
  pageEvent: PageEvent;

  constructor(
    private global: GlobalService,
    private router: Router,

    private ms: MovieService,
    private route: ActivatedRoute
  ) { }

  pageTurn(event: any) {
    //console.log(event);
    this.ms.pageTurn(this.query,event.pageIndex).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        this.result = jsonDataBody.hits.hits;
      },
      (err) => console.error(err),
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

    this.result = this.global.result;
    console.log(this.result);

    this.query = this.global.query;
  }

}
