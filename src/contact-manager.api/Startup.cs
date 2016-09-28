using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc();
        services.AddSingleton<IContactRepsository, InMemoryContactRepository>();
        services.AddCors();
    }

    public void Configure(IApplicationBuilder app)
    {

    app.UseCors(builder =>
       builder.WithOrigins("http://localhost:9000"));

        app.UseMvc(routes =>
        {
            routes.MapRoute(
                name: "default",
                template: "api/{controller}/{action}/{id?}"
            );
        });
    }
}