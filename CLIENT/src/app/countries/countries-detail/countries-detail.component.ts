import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Countries } from 'src/app/Model/Countries.model';
import { FormsService } from 'src/app/Services/forms.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-countries-detail',
  templateUrl: './countries-detail.component.html',
  styleUrls: ['./countries-detail.component.css']
})
export class CountriesDetailComponent implements OnInit {

  country:Countries;

  constructor( 
    private formService:FormsService, 
    private route:ActivatedRoute, 
    private location:Location,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadCountryDetail();
  }

  loadCountryDetail(){
   let promise =  this.formService.searchResult(this.route.snapshot.paramMap.get('name'));

   Promise.all([promise])
   .then( (data:any) => {
    
     
     this.country = data[0].body.rows[0]; 
     this.spinner.hide();
   } )
   .catch( err => console.error(err))
  }

  back(){
    this.location.back();
   
  }

}


