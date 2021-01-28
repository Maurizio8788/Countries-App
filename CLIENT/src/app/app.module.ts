import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FormSearchAndFilterComponent } from './form-search-and-filter/form-search-and-filter.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CountriesDetailComponent } from './countries/countries-detail/countries-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { Interceptor } from './interceptor/interceptor.interceptor';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { AlertModule } from 'ngx-bootstrap/alert';
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    FormSearchAndFilterComponent,
    CountriesComponent,
    CountriesDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: DARK_MODE_OPTIONS,
      useValue: {
          darkModeClass: 'dark-mode',
          lightModeClass: 'light-mode'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
