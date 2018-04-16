import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Lightbox } from 'angular2-lightbox';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  id: number;
  person: any;
  poster: any;
  movies: any;
  creditsNumber = 0;
  private _albums: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private ps: PeopleService,
    private _lightbox: Lightbox,
    private router: Router
  ) { }

  getPeople(id: number) {
    this.ps.getDetail(id).subscribe(
      (jsonData) => {
        this.person = jsonData.json();
        console.log(this.person);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => {
        this.poster = {
          src: 'https://image.tmdb.org/t/p/w1280/' + this.person.profile_path,
          caption: this.person.name,
          thumb: 'https://image.tmdb.org/t/p/w342/' + this.person.profile_path
        };
        this._albums.push(this.poster);
      });
  }

  getMovie(id: number) {
    this.ps.getMovie(id).subscribe(
      (jsonData) => {
        this.movies = jsonData.json().cast;
        this.creditsNumber = this.movies.length;
        this.movies = this.movies.slice(0, 8);
        console.log(this.movies);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => {
        this.poster = {
          src: 'https://image.tmdb.org/t/p/w1280/' + this.person.profile_path,
          caption: this.person.name,
          thumb: 'https://image.tmdb.org/t/p/w342/' + this.person.profile_path
        };
        this._albums.push(this.poster);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getPeople(this.id);
      this.getMovie(this.id);
    });
  }

  open(): void {
    // open lightbox
    this._lightbox.open(this._albums, 0);
  }

}
