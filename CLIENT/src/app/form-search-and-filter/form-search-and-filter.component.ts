import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { interval } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormsService } from '../Services/forms.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-search-and-filter',
  templateUrl: './form-search-and-filter.component.html',
  styleUrls: ['./form-search-and-filter.component.css'],
})
export class FormSearchAndFilterComponent implements OnInit, OnDestroy{
  countryArray:string;
  countryForm:FormGroup;
  regions:string[] = [ 'Select a Region...', 'africa','americas', 'asia', 'europe', 'oceania'];
  sSearch:string;
  rParam:string;
  private destroy$ = new Subject();

  constructor(private formService: FormsService) {}

  ngOnInit(): void {
    this.countryForm = new FormGroup({
      "inputCountry": new FormControl(''),
      "regionFilter":new FormControl('')
    });

    this.sSearch =  sessionStorage.getItem('searchString');
    this.rParam =  sessionStorage.getItem('searchRegion');

    this.countryForm.get('inputCountry').setValue(this.sSearch);
    this.countryForm.get('regionFilter').setValue(this.rParam);

    this.countryForm.get('inputCountry')
    .valueChanges
    .pipe(
      debounce( () => interval(500)),
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe( 
      (country:string) => {
        this.formService.inputRes.next(country);
        sessionStorage.setItem( 'searchString', country );
      },
      error => {
        console.log('Error: ' + error);       
      }
    );
    

    this.countryForm.get('regionFilter')
    .valueChanges
    .pipe(
      debounce( () => interval(500)),
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe( 
      (region:string) => {

        ( region === 'Select a Region...' ) ?  this.formService.inputRegion.next('') 
                                        :   this.formService.inputRegion.next(region);
        
        sessionStorage.setItem( 'searchRegion', region );
        
        this.countryForm.get('inputCountry').setValue('');

      },
      error => {
        console.log('Error: ' + error);       
      }
    );
  }


  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  regionChange(e){

    let region:string = e.target.value;

    console.log(region);
    
    
    ( region === 'Select a Region...' ) ?  this.formService.inputRegion.next('') 
                                        :   this.formService.inputRegion.next(region);
    sessionStorage.setItem( 'searchRegion', region );
    this.countryForm.get('inputCountry').setValue('');
  }

 
}
