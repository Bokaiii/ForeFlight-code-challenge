export interface WeatherReport {
    icao: string;
    visibility: string;
    tempC: number;
    tempF: number;
    pressure: string;
    windSpeed: string;
    windDirection: string;
    lastUpdated: Date;
    httpStatus: number;
}

export interface cacheDto {
    icao: string;
    reports: WeatherReport[];
}

