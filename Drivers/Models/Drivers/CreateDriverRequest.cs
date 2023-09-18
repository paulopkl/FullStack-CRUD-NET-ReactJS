using Drivers.Entities;
using System.ComponentModel.DataAnnotations;

namespace Drivers.Models.Drivers;

public class CreateDriverRequest
{
    // [Key]
    // public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Range(16, 100)]
    public int Age { get; set; }
    
    [Required(ErrorMessage = "The Car field must match with the available car models.")]
    [EnumDataType(typeof(Car))]
    public string Car { get; set; }
}
