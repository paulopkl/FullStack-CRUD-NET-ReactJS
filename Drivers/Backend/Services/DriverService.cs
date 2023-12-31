using AutoMapper;
using Backend.Data;
using Backend.Entities;
using Backend.Models.Drivers;
using Backend.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class DriverService : IDriverService
{
    private DataContext _context;

    private readonly IMapper _mapper;

    public DriverService(DataContext context, IMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }

    public List<DriverEntity> GetAll()
    {
        return _context.Drivers.ToList();
    }

    public DriverEntity GetById(long id)
    {
        return getDriver(id);
    }

    public void Create(CreateDriverRequest model)
    {
        // validate
        if (DriverEntityExists(model.Email))
        {
            throw new AppException("Driver with the email '" + model.Email + "' already exists");
        }

        // map model to new user object
        var driver = _mapper.Map<DriverEntity>(model);

        _context.Drivers.Add(driver);
        _context.SaveChanges();
    }

    public void Update(long id, UpdateDriverRequest model)
    {
        var driver = getDriver(id);

        var driverOld = _context.Drivers.Find(id);

        if (model.Email != driverOld.Email && DriverEntityExists(model.Email))
        {
            throw new AppException("Driver with the email '" + model.Email + "' already exists");
        }

        // copy model to user and save
        _mapper.Map(model, driver);
        _context.Drivers.Update(driver);
        _context.SaveChanges();
    }

    public void Patch(long id, PatchDriverRequest model)
    {
        var driver = getDriver(id);

        if (DriverEntityExists(model.Email))
        {
            throw new AppException("Driver with the email '" + model.Email + "' already exists");
        }

        // copy model to user and save
        _mapper.Map(model, driver);
        _context.Drivers.Update(driver);
        _context.SaveChanges();
    }

    public void Delete(long id)
    {
        var driver = getDriver(id);
        _context.Drivers.Remove(driver);
        _context.SaveChanges();
    }

    // helper methods
    private DriverEntity getDriver(long id)
    {
        var driver = _context.Drivers.Find(id);
        if (driver == null) throw new KeyNotFoundException("Driver not found!");
        return driver;
    }

    private bool DriverEntityExists(string email)
    {
        return _context.Drivers.Any(x => x.Email == email);
    }
}
