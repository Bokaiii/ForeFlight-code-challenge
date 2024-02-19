import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather-service/weather-service.service';
import { WeatherReport } from 'src/typings';
import { CommonModule } from '@angular/common';
import { WeatherInformationComponent } from '../weather-information/weather-information.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { CacheService } from 'src/app/services/cache-service/cache-service.service';

@Component({
  selector: 'app-weather-current',
  standalone: true,
  imports: [
    CommonModule,
    WeatherInformationComponent,
    NgxSkeletonLoaderModule,
    SearchHistoryComponent
  ],
  templateUrl: './weather-current.component.html',
  styleUrl: './weather-current.component.scss'
})
export class WeatherCurrentComponent {
  
  public weatherReport?: WeatherReport;
  public isLoading: boolean = false;
  public displaySearchHistory: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private cacheService: CacheService
  ) { }

  public search(icao: string): void {
    //Check if empty
    if(icao === "") {
      return;
    }

    this.isLoading = true;

    this.weatherService.getWeatherReport(icao)
      .subscribe((response: WeatherReport) => {
        //Check statuscode
        if(response.httpStatus == 409){
          console.log('Couldn\'t find weather report for ' + icao + ', found nearby instead: ' + response.icao);
        }

        this.weatherReport = response;
        this.isLoading = false;

        //Add to cache
        this.cacheService.addCache(icao, [response]);
      });
  }

  public get icaoCode(): HTMLInputElement {
    return document.getElementById('icao-field') as HTMLInputElement;
  }
}
