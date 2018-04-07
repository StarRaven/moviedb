import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  query: string;
  result: any;
  all: number;

  constructor() {
    this.all = 0;
    this.query = '';
    this.result = null;
  }

}
