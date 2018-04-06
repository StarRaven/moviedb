import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  query= '';
  more = true;
  public staticList = [
    'guitar',
    'drums',
    'bass',
    'keyboards',
    'mic',
    'trumpet',
    'horns',
    'pedals'
  ];

  handleResultSelected (result) {
    this.query = result;
  }
  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(1);
    this.staticList.push('haha');
  }
}
