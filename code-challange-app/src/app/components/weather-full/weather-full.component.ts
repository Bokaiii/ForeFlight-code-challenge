import { Component } from '@angular/core';
import { WeatherCurrentComponent } from '../weather-current/weather-current.component';
import { WeatherForecastsComponent } from '../weather-forecasts/weather-forecasts.component';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-weather-full',
  standalone: true,
  imports: [WeatherCurrentComponent, WeatherForecastsComponent, FontAwesomeModule],
  templateUrl: './weather-full.component.html',
  styleUrl: './weather-full.component.scss'
})
export class WeatherFullComponent {

  faCloud = faCloud;

}
