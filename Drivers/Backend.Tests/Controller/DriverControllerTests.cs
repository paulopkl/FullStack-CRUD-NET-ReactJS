using AutoMapper;
using Backend.Controllers;
using Backend.Data;
using Backend.Entities;
using Backend.Models.Drivers;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Backend.Tests.Controller;

public class DriverControllerTests
{
    private readonly IDriverService _driverService;
    private Mock<DataContext> _dataContextMock = new Mock<DataContext>();
    private readonly Mock<IMapper> _mapperMock = new Mock<IMapper>();

    public DriverControllerTests()
    {
        _driverService = new DriverService(_dataContextMock.Object, _mapperMock.Object);
    }

    [Fact]
    public async void DriverController_GetAllDrivers_ReturnOK()
    {
        List<DriverEntity> driversList = new List<DriverEntity>
        {
            new DriverEntity
            {
                Id = It.IsAny<long>(),
                Name = "Driver 04",
                Email = "driver04@email.com",
                Age = 37,
                Car = Car.Cobalt,
            }
        };

        var mockSet = new Mock<DbSet<DriverEntity>>();

        mockSet.As<IQueryable<DriverEntity>>().Setup(m => m.Provider).Returns(driversList.AsQueryable().Provider);
        mockSet.As<IQueryable<DriverEntity>>().Setup(m => m.GetEnumerator()).Returns(driversList.GetEnumerator());

        _dataContextMock.Setup(x => x.Drivers)
            .Returns(mockSet.Object);

        List<DriverEntity> drivers = this._driverService.GetAll();

        Assert.Equal(driversList.Count(), drivers.Count());
    }

    [Fact]
    public async Task DriverController_GetDriverById_WhenDriverExists()
    {
        long driverId = It.IsAny<long>();
        string driverName = "Driver 04";
        string driverEmail = "driver04@email.com";
        int driverAge = 39;
        Car driverCar = Car.Cobalt;

        var driverDTO = new DriverEntity
        {
            Id = driverId,
            Name = driverName,
            Email = driverEmail,
            Age = driverAge,
            Car = driverCar,
        };

        _dataContextMock.Setup(x => x.Drivers.Find(driverId))
            .Returns(driverDTO);

        DriverEntity driver = this._driverService.GetById(driverId);

        Assert.Equal(driverId, driver.Id);
        Assert.Equal(driverName, driver.Name);
        Assert.Equal(driverEmail, driver.Email);
        Assert.Equal(driverAge, driver.Age);
        Assert.Equal(driverCar, driver.Car);
    }

    [Fact]
    public async Task DriverController_GetDriverById_WhenDriverNotExists()
    {
        long driverId = It.IsAny<long>();

        _dataContextMock.Setup(x => x.Drivers.Find(driverId))
            .Returns(() => null);

        Assert.Throws<KeyNotFoundException>(() => this._driverService.GetById(driverId));
    }

    [Fact]
    public async Task DriverController_PostDriver_ReturnOK()
    {
        var newDriver = new CreateDriverRequest
        {
            Name = "Test",
            Email = "Test",
            Age = It.IsAny<int>(),
            Car = Car.Cobalt.ToString(),
        };

        var driver = new DriverEntity
        {
            Name = newDriver.Name,
            Email = newDriver.Email,
            Age = newDriver.Age,
            Car = (Car)Enum.Parse(typeof(Car), newDriver.Car),
        };

        _mapperMock.Setup(mapperMock => mapperMock.Map<DriverEntity>(newDriver))
            .Returns(driver);

        _dataContextMock.Setup(x => x.Drivers.Add(driver));

        _dataContextMock.Setup(x => x.Drivers.Find(driver.Id))
            .Returns(driver);

        var driverCreated = this._driverService.GetById(driver.Id);

        Assert.Equal(driverCreated.Id, driver.Id);
    }

    [Fact]
    public async Task DriverController_PutDriver_ReturnOK()
    {
        long driverId = It.IsAny<long>();

        var driver = new DriverEntity
        {
            Id = driverId,
            Name = "Test",
            Email = "test@email.com",
            Age = It.IsAny<int>(),
            Car = Car.Civic,
        };

        var updateDriver = new UpdateDriverRequest
        {
            Name = driver.Name,
            Email = "update_test@email.com",
            Age = driver.Age,
            Car = driver.ToString(),
        };

        var driverServiceMock = new Mock<IDriverService>();

        var controller = new DriversController(driverServiceMock.Object);

        driverServiceMock.Setup(x => x.Update(driverId, updateDriver));

        // Act
        var result = controller.PutDriverEntity(driverId, updateDriver);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public async Task DriverController_PatchDriver_ReturnOK()
    {
        long driverId = It.IsAny<long>();

        var driver = new DriverEntity
        {
            Id = driverId,
            Name = "Test",
            Email = "test@email.com",
            Age = It.IsAny<int>(),
            Car = Car.Civic,
        };

        var patchDriver = new PatchDriverRequest
        {
            Email = "patch_test@email.com",
        };

        var driverServiceMock = new Mock<IDriverService>();

        var controller = new DriversController(driverServiceMock.Object);

        driverServiceMock.Setup(x => x.Patch(driverId, patchDriver));

        // Act
        var result = controller.PatchDriverEntity(driverId, patchDriver);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public async Task DriverController_DeleteDriver_ReturnOK()
    {
        long driverId = It.IsAny<long>();

        var driver = new DriverEntity
        {
            Id = driverId,
            Name = "Test",
            Email = "test@email.com",
            Age = It.IsAny<int>(),
            Car = Car.Civic,
        };

        _dataContextMock.Setup(x => x.Drivers.Find(driverId))
            .Returns(driver);

        _dataContextMock.Setup(x => x.Drivers.Remove(driver));

        var exception = Record.Exception(() => this._driverService.Delete(driverId));

        Assert.Null(exception);

        _dataContextMock.Setup(x => x.Drivers.Find(driver.Id))
            .Returns(() => null);

        Assert.Throws<KeyNotFoundException>(() => this._driverService.GetById(driver.Id));
    }
}