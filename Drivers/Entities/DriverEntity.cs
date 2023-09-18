using System.ComponentModel.DataAnnotations.Schema;

namespace Drivers.Entities;

public class DriverEntity
{
    [Column("ID")]
    public long Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("email")]
    public string Email { get; set; } = string.Empty;
    
    [Column("age")]
    public int Age { get; set; }
    
    [Column("car")]
    public Car Car { get; set; }
}
