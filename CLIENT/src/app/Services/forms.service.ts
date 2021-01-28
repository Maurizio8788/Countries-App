import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Countries } from '../Model/Countries.model';

@Injectable({
  providedIn: 'root',
})
export class FormsService implements OnDestroy {
  inputRes:BehaviorSubject<string> = new BehaviorSubject('');
  inputRegion:BehaviorSubject<string> = new BehaviorSubject('');
  InputResRegion:BehaviorSubject<string> = new BehaviorSubject('');
  region:Subject<object[]> = new Subject();
  private destroy$ = new Subject();

  constructor(
    private http: HttpClient
  ) {}

 

  selectFilter(region: string, pageNumber?:number) : Promise<any> {
    console.log(pageNumber);
    
    let params = new HttpParams();
      if (pageNumber) {
        params = params.append('pageNumber', pageNumber.toString());
      }
    let promise = new Promise( (resolve, reject) => {
      this.http.get<Countries>(`/Region/${region}`, {observe:'response', params})
      .pipe(
        map((res) => res),
        takeUntil(this.destroy$)
      )
      .toPromise()
      .then(
        data => resolve(data)
      )
      .catch(
        err => reject(err)
      );
    } )

    return promise;
  }

  searchResult(search: string, pageNumber?:number) : Promise<any>{
    let params = new HttpParams();
      if (pageNumber) {
        params = params.append('pageNumber', pageNumber.toString());
      }
      // http get
      let promise = new Promise( (resolve, reject) => {
        this.http.get<Countries>(`/Search/${search}`, {observe:'response', params})
          .pipe(
            map((res) => res),
            takeUntil(this.destroy$)
          )
          .toPromise()
          .then(
            (result: any) => {
              resolve(result);             
            },
            (error) => {
             reject(error)
            }
          );
      } )

      return promise;
  }

  searchFilterByRegion(search:string, region:string, pageNumber?:number) : Promise<any>{

    let promise = new Promise( ( resolve, reject ) => {
      let params = new HttpParams();
      if (pageNumber) {
        params = params.append('pageNumber', pageNumber.toString());
      }
      this.http.get<Countries>(`/Region/${region}/${search}`, {observe:'response', params})
      .pipe(
        map((res) => res),
        takeUntil(this.destroy$)
      ).toPromise()
      .then(
        data => resolve(data)
      )
      .catch( err => reject(err) );

    } )

    return promise;

  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
