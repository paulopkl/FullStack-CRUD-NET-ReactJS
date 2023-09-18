using Microsoft.EntityFrameworkCore;
using Drivers.Entities;

namespace Drivers.Data;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        this.Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to postgres with connection string from app settings
        // var connectionString = Configuration.GetConnectionString("PostgresConnectionString") ?? "";
        var connectionString = "Host=localhost; Database=driver_db; Username=driver_user; Password=DR1V3R_PA55";
        options.UseNpgsql(connectionString);
    }

    public DbSet<DriverEntity> Drivers { get; set; }
}
