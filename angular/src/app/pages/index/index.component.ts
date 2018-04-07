import { Component, EventEmitter, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
    nowPlaying: any;
    mostPopular: any;
    cat1: string;
    cat2: string;
    genresChartOption: any;
    genresChartInstance: any;
    genresSelectLink = false;
    genresSelectCat = false;
    genreData: any;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private ms: MovieService,
        private global: GlobalService
    ) { }

    onGenresChartInit(ev) {
        var thisFunc = this;
        this.genresChartInstance = ev;
    }

    initGenreGraph() {
        let genreJson = {
            "took": 0,
            "timed_out": false,
            "failures": [],
            "vertices": [
                {
                    "field": "genres.name.keyword",
                    "term": "Fantasy",
                    "weight": 0.0007353885130836975,
                    "depth": 1
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Romance",
                    "weight": 0.00018538064984116324,
                    "depth": 1
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Action",
                    "weight": 0.01577779096648183,
                    "depth": 0
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Drama",
                    "weight": 0.023782260173835296,
                    "depth": 0
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Horror",
                    "weight": 0.005534387230697638,
                    "depth": 1
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Crime",
                    "weight": 0.8117747099531069,
                    "depth": 0
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Adventure",
                    "weight": 0.0022493997074644867,
                    "depth": 1
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Thriller",
                    "weight": 0.26298364836982546,
                    "depth": 0
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Mystery",
                    "weight": 0.038328673769035024,
                    "depth": 0
                },
                {
                    "field": "genres.name.keyword",
                    "term": "Science Fiction",
                    "weight": 0.0051360560194483006,
                    "depth": 1
                }
            ],
            "connections": [
                {
                    "source": 5,
                    "target": 2,
                    "weight": 0.0005719636566043709,
                    "doc_count": 15
                },
                {
                    "source": 7,
                    "target": 9,
                    "weight": 0.004044109452338514,
                    "doc_count": 20
                },
                {
                    "source": 7,
                    "target": 2,
                    "weight": 0.006327794299675402,
                    "doc_count": 33
                },
                {
                    "source": 8,
                    "target": 4,
                    "weight": 0.0018445550288571514,
                    "doc_count": 5
                },
                {
                    "source": 7,
                    "target": 8,
                    "weight": 0.010727239642656783,
                    "doc_count": 29
                },
                {
                    "source": 7,
                    "target": 4,
                    "weight": 0.0036898322018404863,
                    "doc_count": 13
                },
                {
                    "source": 2,
                    "target": 0,
                    "weight": 0.0007353885130836975,
                    "doc_count": 16
                },
                {
                    "source": 2,
                    "target": 7,
                    "weight": 0.0009817712096450177,
                    "doc_count": 33
                },
                {
                    "source": 3,
                    "target": 5,
                    "weight": 0.00005854219294869021,
                    "doc_count": 51
                },
                {
                    "source": 3,
                    "target": 1,
                    "weight": 0.00018538064984116324,
                    "doc_count": 68
                },
                {
                    "source": 2,
                    "target": 9,
                    "weight": 0.0010919465671097865,
                    "doc_count": 18
                },
                {
                    "source": 7,
                    "target": 5,
                    "weight": 0.015055466776986262,
                    "doc_count": 52
                },
                {
                    "source": 2,
                    "target": 6,
                    "weight": 0.0022493997074644867,
                    "doc_count": 30
                },
                {
                    "source": 8,
                    "target": 7,
                    "weight": 0.0065242288838717796,
                    "doc_count": 29
                },
                {
                    "source": 5,
                    "target": 3,
                    "weight": 0.009019928471640952,
                    "doc_count": 61
                },
                {
                    "source": 8,
                    "target": 5,
                    "weight": 0.0011938251431753634,
                    "doc_count": 12
                },
                {
                    "source": 5,
                    "target": 8,
                    "weight": 0.007996931863416221,
                    "doc_count": 12
                },
                {
                    "source": 8,
                    "target": 3,
                    "weight": 0.0005145650612001722,
                    "doc_count": 30
                },
                {
                    "source": 5,
                    "target": 7,
                    "weight": 0.09362926954023729,
                    "doc_count": 52
                },
                {
                    "source": 3,
                    "target": 8,
                    "weight": 0.00003128698341840851,
                    "doc_count": 30
                },
                {
                    "source": 2,
                    "target": 5,
                    "weight": 0.000014269506807827947,
                    "doc_count": 15
                }
            ]
        };

        this.genreData = [{ id: 0, name: genreJson.vertices[0].term, symbolSize: genreJson.vertices[0].weight, x: 200, y: 200, category: 0 }];
        let genreLinks = [];
        let genreMin = 65536;
        let genreMax = 0;
        let genreCategories = [];
        let i = 1;

        for (let k = 1; k < genreJson.vertices.length; k++) {
            let d = genreJson.vertices[k];
            genreMin = Math.min(d.weight, genreMin);
            genreMax = Math.max(d.weight, genreMax);
            this.genreData.push({
                id: this.genreData.length,
                name: d.term,
                symbolSize: d.weight,
                category: i,
            });
            genreCategories.push({ name: i });
            i++;
        }

        for (let gd of this.genreData) {
            gd.symbolSize = (gd.symbolSize - genreMin) / (genreMax - genreMin);
            gd.symbolSize = gd.symbolSize * 20 + 20;
        }

        for (let gl of genreJson.connections) {
            genreLinks.push({ source: gl.source, target: gl.target });
        }

        this.genresChartOption = {
            title: {
                text: 'Genres',
                top: 'bottom',
                left: 'right'
            },
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: 'Genres',
                    type: 'graph',
                    layout: 'force',
                    data: this.genreData,
                    links: genreLinks,
                    categories: genreCategories,
                    roam: true,
                    force: {
                        repulsion: 600,
                        edgeLength: 50
                    },
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }
            ]
        };
    }

    singleGenre(c: string) {
        let searchQuery = '{\"query\":{\"query_string\":{\"query\":\"*';
        searchQuery += c.toLowerCase();
        searchQuery += '*\",\"fields\":[\"genres.name\"],\"use_dis_max\":true}}}';
        console.log(searchQuery);
        this.ms.search(searchQuery).subscribe(
            (jsonData) => {
                let jsonDataBody = jsonData.json();
                console.log(jsonData);
                console.log(jsonDataBody);
                let result = jsonDataBody.hits.hits;
                console.log(result);

                if (result) {
                    this.global.result = result;
                    this.global.all = jsonDataBody.hits.total;
                    this.router.navigate(['/search', Math.random()]);
                }
            },
            // The 2nd callback handles errors.
            (err) => console.error(err),
            // The 3rd callback handles the "complete" event.
            () => console.log("observable complete"));
    }
    
    doubleGenre(c1: string, c2: string) {
        let searchQuery = '{\"query\":{\"query_string\":{\"query\":\"*';
        searchQuery += c1.toLowerCase() + '* AND *' + c2.toLowerCase();
        searchQuery += '*\",\"fields\":[\"genres.name\"],\"use_dis_max\":true}}}';
        console.log(searchQuery);
        this.ms.search(searchQuery).subscribe(
            (jsonData) => {
                let jsonDataBody = jsonData.json();
                console.log(jsonData);
                console.log(jsonDataBody);
                let result = jsonDataBody.hits.hits;
                console.log(result);

                if (result) {
                    this.global.result = result;
                    this.global.all = jsonDataBody.hits.total;
                    this.router.navigate(['/search', Math.random()]);
                }
            },
            // The 2nd callback handles errors.
            (err) => console.error(err),
            // The 3rd callback handles the "complete" event.
            () => console.log("observable complete"));
    }

    ngOnInit() {
        this.ms.getNowPlaying().subscribe(
            (jsonData) => {
                this.nowPlaying = jsonData.json().results;
                // console.log(this.nowPlaying);
            },
            // The 2nd callback handles errors.
            (err) => console.error(err),
            // The 3rd callback handles the "complete" event.
            () => console.log("observable complete"));

        this.ms.getMostPopular().subscribe(
            (jsonData) => {
                this.mostPopular = jsonData.json().results.slice(0, 8);
                console.log(this.mostPopular);
            },
            // The 2nd callback handles errors.
            (err) => console.error(err),
            // The 3rd callback handles the "complete" event.
            () => console.log("observable complete"));

        this.initGenreGraph();
    }

    onGenresChartEvent(event: any, type: string) {
        //console.log('chart event:', type, event);
        console.log(event.data);
        if (event.data.source) {
            // link
            console.log('link');
            this.genresSelectCat = false;
            this.genresSelectLink = true;
            this.cat1 = this.genreData[event.data.source].name;
            this.cat2 = this.genreData[event.data.target].name;
        } else if (event.data.symbolSize) {
            // category
            console.log('category');
            this.genresSelectCat = true;
            this.genresSelectLink = false;
            this.cat1 = event.data.name;
        } else {
            this.genresSelectCat = false;
            this.genresSelectLink = false;
        }
        //this.selectRecommendation = event.data;
    }
}
