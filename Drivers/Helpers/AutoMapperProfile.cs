
using AutoMapper;
using Drivers.Entities;
using Drivers.Models.Drivers;

namespace Drivers.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // CreateRequest -> DriverEntity
        CreateMap<CreateDriverRequest, DriverEntity>();

        // UpdateRequest -> DriverEntity
        CreateMap<UpdateDriverRequest, DriverEntity>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore both null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    // ignore null car
                    if (x.DestinationMember.Name == "Car" && src.Car == null) return false;

                    return true;
                }
            ));

        // PatchRequest -> DriverEntity
        CreateMap<PatchDriverRequest, DriverEntity>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore both null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    // ignore null car
                    if (x.DestinationMember.Name == "Car" && src.Car == null) return false;

                    return true;
                }
            ));
    }
}
