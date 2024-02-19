using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;

[ApiController]
public class WeatherWebService : ControllerBase {

    private readonly IForeFlightApiService foreFlightApi;

    public WeatherWebService (IForeFlightApiService foreFlightApi) {
        this.foreFlightApi = foreFlightApi;
    }

    [HttpGet("/{icao}")]
    public async Task<WeatherReportDto> getWeatherCondition(string icao) {
        //Fetch information from API using service
        var response = foreFlightApi.getWeatherReport(icao);

        //Parse json
        string responseString = await response;
        JsonNode report = JsonNode.Parse(responseString)["report"]["conditions"];
        if(report != null) {
            WeatherReportDto dto = new WeatherReportDto();
            dto.fromJson(report);

            //Check if nearby
            if(!String.Equals(dto.icao, icao, StringComparison.OrdinalIgnoreCase)) {
                dto.httpStatus = 409;
            }

            return dto;
        }

        return null;
    }

    [HttpGet("/forecasts/{icao}")]
    public async Task<List<WeatherReportDto>> getForecasts(string icao) {
        Console.WriteLine("Delay 2 seconds");
        System.Threading.Thread.Sleep(2000);
        Console.WriteLine("Fetching forecasts for airport with ICAO code: " + icao);
        //Fetch information from API using service
        var response = foreFlightApi.getWeatherReport(icao);

        //Parse json
        string responseString = await response;
        JsonNode report = JsonNode.Parse(responseString)["report"]["forecast"];
        IEnumerable<JsonNode> forecasts = report["conditions"].AsArray();

        List<WeatherReportDto> list = new List<WeatherReportDto>();

        foreach(JsonNode f in forecasts) {
            WeatherReportDto dto = new WeatherReportDto();
            dto.fromJson(f);
            list.Add(dto);

            //Check if nearby
            if(!String.Equals(dto.icao, icao, StringComparison.OrdinalIgnoreCase)) {
                dto.httpStatus = 409;
            }
        }

        return list;
    }
}
