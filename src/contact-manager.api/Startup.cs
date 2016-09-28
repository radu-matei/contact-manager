using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                                  builder => builder.WithOrigins("http://localhost:9000")
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod());
            });

        var settings = new JsonSerializerSettings();
        settings.ContractResolver = new SignalRContractResolver();

        var serializer = JsonSerializer.Create(settings);

        services.Add(new ServiceDescriptor(typeof(JsonSerializer), 
                                           provider => serializer, 
                                           ServiceLifetime.Transient));

        services.AddSignalR(options => 
        {
            options.Hubs.EnableDetailedErrors = true;
            options.EnableJSONP = true;
        });

        services.AddMvc();
        services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
            });


        services.AddSingleton<IContactRepsository, InMemoryContactRepository>();
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseCors("AllowSpecificOrigin");

        app.UseMvc(routes =>
        {
            routes.MapRoute(
                name: "default",
                template: "api/{controller}/{action}/{id?}"
            );
        });

        app.UseWebSockets();
        app.UseSignalR();
    }
}