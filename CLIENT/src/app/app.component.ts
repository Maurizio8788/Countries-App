import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'rest-countries-api';
 

constructor( private spinner:NgxSpinnerService){}

ngOnInit():void {
  this.spinner.show();
}


}
