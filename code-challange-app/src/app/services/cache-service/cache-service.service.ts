import { Injectable } from '@angular/core';
import { WeatherReport, cacheDto } from 'src/typings';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  public cache: Map<string, cacheDto> = new Map();
  public cachedSearched: string[] = [];

  public addCache(icao: string, reports: WeatherReport[]): void {
    const cacheDto = {
      icao: icao,
      reports: reports
    };

    const cacheEntry = this.cache.get(icao);

    //If new cache, add it
    if(cacheEntry == null) {
      this.cache.set(icao, cacheDto);
      this.cachedSearched.push(icao);
      return;
    }

    //If already exists, replace reports
    cacheEntry.reports = reports;
  }

  public getCache(icao: string): WeatherReport[] {
    const cacheEntry = this.cache.get(icao);

    //If doesn't exist, return empty array
    if(cacheEntry == null) {
      return [];
    }

    return cacheEntry.reports;
  }

  public getSearches(): string[] {
    return this.cachedSearched;
  }
}
