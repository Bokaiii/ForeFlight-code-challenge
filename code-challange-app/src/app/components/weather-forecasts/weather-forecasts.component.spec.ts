import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastsComponent } from './weather-forecasts.component';

describe('WeatherFutureComponent', () => {
  let component: WeatherForecastsComponent;
  let fixture: ComponentFixture<WeatherForecastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
