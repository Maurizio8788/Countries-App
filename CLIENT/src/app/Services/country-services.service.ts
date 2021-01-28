import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Countries } from '../Model/Countries.model';



@Injectable({
  providedIn: 'root'
})

export class CountryServicesService {

 

  constructor( private http:HttpClient) { }

  GetAll( pageNumber?:number, pageSize?:number ){

    let params =new HttpParams();
    
    if( pageNumber ?? pageSize ){
      params = params.append( 'pageNumber', pageNumber.toString() );
      params = params.append( 'pageSize', pageSize.toString() );
    }

    let promise = new Promise( (response, reject) => {

      this.http.get<Countries>( '/GetAll', { observe:'response' , params } )
      .toPromise()
      .then( 
        data => {
          response(data);
        }
       )
      .catch(
        error => {
          reject(error)
        }
      )
    } );

    return promise;
  }




}
