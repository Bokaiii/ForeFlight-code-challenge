import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather-service/weather-service.service';
import { WeatherInformationComponent } from '../weather-information/weather-information.component';
import { WeatherReport } from 'src/typings';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CacheService } from 'src/app/services/cache-service/cache-service.service';
import { SearchHistoryComponent } from '../search-history/search-history.component';

@Component({
  selector: 'app-weather-forecasts',
  standalone: true,
  imports: [
    CommonModule,
    WeatherInformationComponent,
    NgxSkeletonLoaderModule,
    SearchHistoryComponent
  ],
  templateUrl: './weather-forecasts.component.html',
  styleUrl: './weather-forecasts.component.scss'
})
export class WeatherForecastsComponent {
  public forecasts?: WeatherReport[] = [];
  public isLoading: boolean = false;
  public displaySearchHistory: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private cacheService: CacheService
  ) { }

  public search(icao: string): void {
    //Reset forecasts
    this.forecasts = [];
    
    //Check if empty
    if(icao === "") {
      return;
    }

    this.isLoading = true;

    //Fetch from cache
    const cache: WeatherReport[] = this.cacheService.getCache(icao);

    if(cache.length > 0) {
      this.forecasts = cache;
      this.isLoading = false;
    }

    this.weatherService.getForecasts(icao).subscribe((response: WeatherReport[]) => {
      //Check statuscode
      if(response[0].httpStatus == 409){
        console.log('Couldn\'t find weather report for ' + icao + ', found nearby instead: ' + response[0].icao);
      }

      this.forecasts = response;
      this.isLoading = false;

      //Add to cache
      this.cacheService.addCache(icao, response);
    });
  }

  public get icaoCode(): HTMLInputElement {
    return document.getElementById('icao-field-forecasts') as HTMLInputElement;
  }
}
