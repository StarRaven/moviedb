import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  simpleItems = [true, 'Two', 3];
  graph: any;
  chartOption: any;
  constructor(public dialog: MatDialog) { }



  ngOnInit() {
    var categories = [];
    for (var i = 0; i < 9; i++) {
        categories[i] = {
            name: '类目' + i
        };
    }
    /*
    this.graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.symbolSize = 10;
        node.value = node.symbolSize;
        node.category = node.attributes.modularity_class;
        // Use random x, y
        node.x = node.y = null;
        node.draggable = true;
    });*/
    this.chartOption = {
      title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
      },
      tooltip: {},
      legend: [{
          // selectedMode: 'single',
          data: categories.map(function (a) {
              return a.name;
          })
      }],
      animation: false,
      series : [
          {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'force',
              data: [{value:1,symbolSize:20},{value:2,symbolSize:10}],
              //links: graph.links,
              categories: categories,
              roam: true,
              label: {
                  normal: {
                      position: 'right'
                  }
              },
              force: {
                  repulsion: 100
              }
          }
      ]
  };
  }
  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
    console.log(event.data);
  }
}
