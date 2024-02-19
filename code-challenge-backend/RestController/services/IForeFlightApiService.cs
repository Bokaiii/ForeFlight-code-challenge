
public interface IForeFlightApiService {
    
    Task<string> getWeatherReport(string icao);
}