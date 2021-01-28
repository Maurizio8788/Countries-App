import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesDetailComponent } from './countries-detail.component';

describe('CountriesDetailComponent', () => {
  let component: CountriesDetailComponent;
  let fixture: ComponentFixture<CountriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
