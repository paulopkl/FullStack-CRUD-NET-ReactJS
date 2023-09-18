using System.ComponentModel.DataAnnotations;
using Drivers.Entities;

namespace Drivers.Models.Drivers;

public class PatchDriverRequest
{
    // [Key]
    // public int? Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }
    
    [Range(16, 100)]
    public int? Age { get; set; }
    
    [EnumDataType(typeof(Car))]
    public string? Car { get; set; }
}
