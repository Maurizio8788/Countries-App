import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor( private toastr:ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url) && !request.url.startsWith('/assets/')){
     request = request.clone({
        url : "http://localhost:3000/api/countries" + request.url
      });  
    }
    
     return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                this.toastr.error('401 Unauthorized', "KO");
            }
            else
            this.toastr.error('500 Internal Server Error', "KO");

            const error = err.error.message || err.statusText;
            this.toastr.error(error, "KO");
            return throwError(error);
        }))
  }
}
