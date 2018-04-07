import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  query = '';
  more = true;

  title = true;
  genres = false;
  overview = true;
  company = false;
  country = false;

  public staticList = [];

  handleResultSelected(result) {
    // this.query = result;
    // console.log(result);
    this.router.navigate(['/detail', result._id]);
  }

  constructor(
    private ms: MovieService,
    private global: GlobalService,
    private router: Router
  ) { }

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
  }

  test(obj: any) {
    console.log(obj);
    return JSON.stringify(obj);
  }

  gotoResult() {
    if ((this.query != '') &&(this.staticList != [])) {
      this.global.result = this.staticList;
      this.router.navigate(['/search', Math.random()]);
    }
  }

  search() {
    this.staticList = [];
    let searchQuery = '{\"query\":{\"query_string\":{\"query\":\"*';
    console.log(this.query);
    let searchTermStr = this.query.replace(' ', '* AND *');
    console.log(searchTermStr);
    searchQuery += searchTermStr;
    searchQuery += '*\",\"fields\":[';
    if (this.title) {
      searchQuery += '\"title\",';
    }
    if (this.genres) {
      searchQuery += '\"genres.name\",';
    }
    if (this.overview) {
      searchQuery += '\"overview\",';
    }
    if (this.company) {
      searchQuery += '\"production_companies.name\",';
    }
    if (this.country) {
      searchQuery += '\"production_countries.name\",';
    }
    if (searchQuery.charAt(searchQuery.length - 1) === ',') {
      searchQuery = searchQuery.substring(0, searchQuery.length - 1);
    }
    searchQuery += '],\"use_dis_max\":true}}}';
    this.ms.search(searchQuery).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        // console.log(jsonData);
        // console.log(jsonDataBody);
        this.staticList = jsonDataBody.hits.hits;
        this.global.all = jsonDataBody.hits.total;
        this.global.query = searchQuery;
        // console.log(this.staticList);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete"));
  }

  keyEnter() {
    console.log(11);
    this.staticList = [];
    let searchQuery = '{\"query\":{\"query_string\":{\"query\":\"*';
    console.log(this.query);
    let searchTermStr = this.query.replace(' ', '* AND *');
    console.log(searchTermStr);
    searchQuery += searchTermStr;
    searchQuery += '*\",\"fields\":[';
    if (this.title) {
      searchQuery += '\"title\",';
    }
    if (this.genres) {
      searchQuery += '\"genres.name\",';
    }
    if (this.overview) {
      searchQuery += '\"overview\",';
    }
    if (this.company) {
      searchQuery += '\"production_companies.name\",';
    }
    if (this.country) {
      searchQuery += '\"production_countries.name\",';
    }
    if (searchQuery.charAt(searchQuery.length - 1) === ',') {
      searchQuery = searchQuery.substring(0, searchQuery.length - 1);
    }
    searchQuery += '],\"use_dis_max\":true}}}';
    this.ms.search(searchQuery).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        // console.log(jsonData);
        // console.log(jsonDataBody);
        this.staticList = jsonDataBody.hits.hits;
        this.global.all = jsonDataBody.hits.total;
        this.global.query = searchQuery;
        this.gotoResult();
        // console.log(this.staticList);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete"));
  }
}

