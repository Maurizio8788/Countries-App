import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  darkMode$:Observable<boolean> = this.darkModeService.darkMode$;
  darkModeActive:boolean;

  constructor( private darkModeService:DarkModeService) { }

  ngOnInit(): void {
  }

  onToggle(): void {

    this.darkModeService.toggle();
    this.darkModeActive = !this.darkModeActive;
  }

}
