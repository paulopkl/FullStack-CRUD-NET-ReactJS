using Backend.Entities;
using Backend.Models.Drivers;

namespace Backend.Services;

public interface IDriverService
{
    List<DriverEntity> GetAll();

    DriverEntity GetById(long id);

    void Create(CreateDriverRequest model);

    void Update(long id, UpdateDriverRequest model);

    void Patch(long id, PatchDriverRequest model);

    void Delete(long id);
}
