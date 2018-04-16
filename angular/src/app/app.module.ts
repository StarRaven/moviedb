import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TopmenuComponent } from './pages/topmenu/topmenu.component';

import { IndexComponent } from './pages/index/index.component';


import { FlexLayoutModule } from "@angular/flex-layout";
import { LightboxModule } from 'angular2-lightbox';
import { NgxEchartsModule } from 'ngx-echarts';
import { SearchComponent } from './pages/search/search.component';
import { DetailComponent } from './pages/detail/detail.component';

import { MovieService } from './services/movie.service';
import { GlobalService } from './services/global.service';
import { GraphService } from './services/graph.service';
import { PeopleService} from './services/people.service';

import { FooterComponent } from './pages/footer/footer.component';
import { SearchboxComponent } from './pages/searchbox/searchbox.component';

import { NgxTypeaheadModule } from 'ngx-typeahead';
import { PeopleComponent } from './pages/people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    IndexComponent,
    SearchComponent,
    DetailComponent,
    FooterComponent,
    SearchboxComponent,
    PeopleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTooltipModule,

    FlexLayoutModule,

    LightboxModule,
    NgxTypeaheadModule,
    NgxEchartsModule,

    RouterModule.forRoot([
      { path: '', redirectTo: '/index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'search/:refresh', component: SearchComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'people/:id', component: PeopleComponent },
    ])
  ],
  entryComponents: [
  ],
  providers: [
    PeopleService,
    MovieService,
    GlobalService,
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
