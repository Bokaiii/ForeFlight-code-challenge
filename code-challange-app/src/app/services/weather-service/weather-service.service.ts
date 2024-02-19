import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherReport } from 'src/typings';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit{

  constructor(
    private httpClient: HttpClient
  ) { }


  ngOnInit(): void {
    
  }

  public getWeatherReport(icao: string): Observable<WeatherReport> {
    return this.httpClient.get<WeatherReport>(`http://localhost:5298/${icao}`);
  }

  public getForecasts(icao: string): Observable<WeatherReport[]> {
    return this.httpClient.get<WeatherReport[]>(`http://localhost:5298/forecasts/${icao}`);
  }
}
