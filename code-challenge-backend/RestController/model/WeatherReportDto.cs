
using System.Text.Json.Nodes;

public class WeatherReportDto {
    public string? icao {get; set;}
    public float? visibility {get; set;}
    public float? tempC {get; set;}
    public float? tempF {get; set;}
    public float? pressure {get; set;}
    public float? windSpeed {get; set;}
    public float? windDirection {get; set;}
    public DateTime lastUpdated {get; set;}
    public int httpStatus {get; set;}

    public WeatherReportDto() {
        
    }

    public void fromJson(JsonNode node) {
        //Set up variables
        try {
            JsonNode node_ident = node["ident"];
            if(node_ident != null) {
                icao = node_ident.GetValue<string>();
            }

            JsonNode node_visibility = node["visibility"]["distanceSm"];
            if(node_visibility != null) {
                visibility = node_visibility.GetValue<float>();
            }

            JsonNode node_temp = node["tempC"];
            if(node_temp != null) {
                tempC = node_temp.GetValue<float>();
                tempF = (float)(tempC * 1.8) + 32;
            }

            JsonNode node_pressure = node["pressureHg"];
            if(node_pressure != null) {
                pressure = node_pressure.GetValue<float>();
            }

            JsonNode node_windSpeed = node["wind"]["speedKts"];
            if(node_windSpeed != null) {
                windSpeed = node_windSpeed.GetValue<float>();
            }

            JsonNode node_windDirection = node["wind"]["direction"];
            if(node_windDirection != null) {
                windDirection = node_windDirection.GetValue<float>();
            }

            lastUpdated = DateTime.Now;
            httpStatus = 200;
        } catch (Exception e) {
            Console.WriteLine("Marshalling error");
            Console.WriteLine(e);
        }
    }
}