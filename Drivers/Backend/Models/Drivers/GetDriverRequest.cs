using Backend.Entities;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Drivers;

public class GetDriverRequest
{
    // [Key]
    public long Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }
    
    public int Age { get; set; }
    
    [EnumDataType(typeof(Car))]
    public string Car { get; set; }
    // {
    //     get => Car.ToString();
    //     set;
    // }
}
