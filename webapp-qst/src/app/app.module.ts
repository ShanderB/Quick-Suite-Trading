import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MovieService } from './services/movie/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from './modal/movie-info/movie-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { InputSearchComponent } from './input/input-search/input-search.component';
import { InputFilterComponent } from './input/input-filter-type/input-filter.component';
import { CardComponent } from './card/card.component';
import { InputFilterYearComponent } from './input/input-filter-year/input-filter-year.component';
import { WatchListModalComponent } from './modal/watch-list/watch-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    InputSearchComponent,
    InputFilterComponent,
    CardComponent,
    InputFilterYearComponent,
    WatchListModalComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
