import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopmenuComponent implements OnInit {

  constructor( public router: Router) { }

  Logout() {
    this.router.navigate(['users']);
  }

  ngOnInit() {

  }

}
