using Drivers.Entities;
using Drivers.Models.Drivers;

namespace Drivers.Services;

public interface IDriverService
{
    IEnumerable<DriverEntity> GetAll();

    DriverEntity GetById(long id);

    void Create(CreateDriverRequest model);

    void Update(long id, UpdateDriverRequest model);

    void Patch(long id, PatchDriverRequest model);

    void Delete(long id);
}
