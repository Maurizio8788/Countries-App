import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesDetailComponent } from './countries/countries-detail/countries-detail.component';
import { FormSearchAndFilterComponent } from './form-search-and-filter/form-search-and-filter.component';

const routes: Routes = [
   {path:'', component:FormSearchAndFilterComponent},
  { path:':name', component:CountriesDetailComponent, data:{ animation:'detail'}},
  { path:'**', component:FormSearchAndFilterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
