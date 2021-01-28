import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryServicesService } from '../Services/country-services.service';
import { FormsService } from '../Services/forms.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators'; 
import { Countries } from "../Model/Countries.model";
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../Model/Pagination';
import {bounceInLeftOnEnterAnimation, bounceOutLeftOnLeaveAnimation } from 'angular-animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  animations:[ bounceInLeftOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation() ]
})
export class CountriesComponent implements OnInit, OnDestroy {

  loadCountry:Countries[] = [];
  Regions;
  pagination:Pagination=new Pagination();
  maxSize:number=5;
  pageSize:number=8;
  pageNumber:number;
  search:string;
  private destroy$ = new Subject();

  constructor(
    private countryServices: CountryServicesService,
    public formService: FormsService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.pagination.currentPage = 0;
    this.pageNumber = 0;
    this.search = '';
    this.Regions = [];
    this.RegionFilter();

    this.formService.inputRes.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      data => {
        this.search = data;
        this.sortResult( data );
      })
    
  }


  loadCountries() {
    let promise = this.countryServices.GetAll(this.pageNumber, this.pageSize);

    Promise.all([promise])
    .then(
      (data:any) => {
        this.loadCountry =data[0].body.rows;
        this.pagination.totalElement = data[0].body.count;
        this.spinner.hide();
      }
    ).catch(
      error =>  this.toastr.error(error)
    )
   
  }

  sortResult( search:string ) {
       
        if(search == '' && this.formService.inputRegion.value ) {
          this.pagination.currentPage = 0;
          this.pageNumber=0;
          this.RegionFilter();
        } else if( search == '' && !this.formService.inputRegion.value){
          this.pagination.currentPage = 0;
          this.pageNumber=0;
          this.loadCountries()
        }else if(this.formService.inputRegion.value){
          
          let region = this.formService.inputRegion.value;
          let promise = this.formService.searchFilterByRegion(search, region, this.pageNumber);

          Promise.all([promise])
          .then(
            data => {
              this.loadCountry = data[0].body.rows;
              this.pagination.totalElement = data[0].body.count;
              this.spinner.hide();
            }
          )
          .catch(
            error => {
              this.toastr.error(error);      
            }
          );
          
        } else {

          let promise = this.formService.searchResult(search);
      
            Promise.all([ promise ])
            .then(
              data => {          
                this.loadCountry = data[0].body.rows;
                this.pagination.totalElement = data[0].body.count;
              }
            )
            .catch(
              error => {
                this.toastr.error(error);      
              }
            );
        }
    
  }

  paged(page: any) {
  
    this.pagination.currentPage = page.page;
    this.pageNumber = page.page-1;
    if(this.formService.inputRes.value){
      this.sortResult(this.search);
    }else if( this.formService.inputRegion.value){
      this.RegionFilter()
    } else {
      this.loadCountries();
    }

    window.scroll({
      top:0,
      behavior:'smooth'
    });
  }

  RegionFilter(){
    
    this.formService.inputRegion.subscribe( 
      region => {
        
        if (region == '' || region == 'Select a Region...') {
          this.pagination.currentPage = 0;
          this.loadCountries()
        } else {
          this.pageNumber=0;
          let promise = this.formService.selectFilter(region, this.pageNumber);
  
          Promise.all([promise])
          .then( 
            data => {
           
               this.loadCountry = data[0].body.rows;
               this.spinner.hide();
            }
  
          )
          .catch(
            err => this.toastr.error(err)
          )

        }
        
      }
    )  
  }

 

 
  ngOnDestroy(){
    this.destroy$.unsubscribe();
  }
}
