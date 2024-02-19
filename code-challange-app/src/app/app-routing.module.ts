import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from 'src/app/components/angular-welcome/welcome.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherCurrentComponent } from './components/weather-current/weather-current.component';
import { WeatherForecastsComponent } from './components/weather-forecasts/weather-forecasts.component';
import { WeatherFullComponent } from './components/weather-full/weather-full.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "weather",
    pathMatch: "full"
  },
  { path: 'weather',
    component: WeatherComponent,
    children: [
      {
        path: 'metar',
        component: WeatherCurrentComponent
      },
      {
        path: 'taf',
        component: WeatherForecastsComponent
      },
      {
        path: 'full',
        component: WeatherFullComponent
      }
      ]},
  {
    path: 'welcome',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
