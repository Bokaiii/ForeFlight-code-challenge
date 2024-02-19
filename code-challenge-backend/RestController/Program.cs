using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddScoped<IForeFlightApiService, ForeFlightApiService>();
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "allowLocal",
                        policy  =>
                        {
                            policy.WithOrigins("http://localhost:4200")
                            .AllowAnyOrigin()
                            .AllowAnyMethod();
                        });
    });
}

var app = builder.Build();
{
    app.UseCors("allowLocal");
    app.MapControllers();
    app.Run();
}