import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { WeatherReport } from 'src/typings';

@Component({
  selector: 'app-weather-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-information.component.html',
  styleUrl: './weather-information.component.scss'
})
export class WeatherInformationComponent {
  @Input() public weatherReport?: WeatherReport;
}
