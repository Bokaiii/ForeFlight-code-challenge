import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-service/weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient,
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    const headers = new HttpHeaders().set('x-foreflight-odense', 'true');
    
    this.http.get("/weather/report/KCPR", { headers: headers }).subscribe({
      next: result => console.log(result),
    });
  }
}
