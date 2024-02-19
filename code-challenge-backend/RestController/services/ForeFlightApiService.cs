
public class ForeFlightApiService : IForeFlightApiService {

    private HttpClient httpClient = new HttpClient();
    private string endpoint = "https://api.foreflight.com/weather/report/";

    private Dictionary<string, string> nearby = new Dictionary<string, string>{
        {"EKHG", "EKKA"},
        {"EKGE", ""},
        {"EKST", "EKOD"},
        {"EKVH", "EKYT"}
    };

    public async Task<string> getWeatherReport(string icao) {
        //Check if string exists in nearby dictionary
        if(nearby.ContainsKey(icao)) {
            var temp = await simulateNearby(icao);
            return temp;
        }

        Uri uri = new Uri(endpoint + icao);
        using HttpRequestMessage msg = new HttpRequestMessage(HttpMethod.Get, uri);
        msg.Headers.Add("x-foreflight-odense", "true");

        var response = await httpClient.SendAsync(msg);
        return response.Content.ReadAsStringAsync().Result;
    }

    public async Task<string> simulateNearby(string icao) {
        Console.WriteLine("Simulating nearby");
        string nearbyIcao = nearby[icao];

        if(nearbyIcao == "") {
            return "";
        }

        Uri uri = new Uri(endpoint + nearbyIcao);
        HttpRequestMessage msg = new HttpRequestMessage(HttpMethod.Get, uri);
        msg.Headers.Add("x-foreflight-odense", "true");

        var response = await httpClient.SendAsync(msg);
        return response.Content.ReadAsStringAsync().Result;
    }
}