using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Entities;
using Backend.Models.Drivers;
using Backend.Services;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DriversController : ControllerBase
{
    private IDriverService _driverService;

    public DriversController(IDriverService driverService)
    {
        this._driverService = driverService;
    }

    // GET: api/Drivers
    [HttpGet(Name = "Get All Drivers")]
    public async Task<ActionResult<List<DriverEntity>>> GetDrivers()
    {
        var drivers = this._driverService.GetAll();

        return drivers;
    }

    // GET: api/Drivers/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DriverEntity>> GetDriverEntity(long id)
    {
        var driver = this._driverService.GetById(id);

        return Ok(driver);
    }

    // POST: api/Drivers
    [HttpPost]
    public async Task<ActionResult<DriverEntity>> PostDriverEntity(CreateDriverRequest model)
    {
        this._driverService.Create(model);

        return Ok(new { message = "Driver Created" });
    }

    // PATCH: api/Drivers/5
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchDriverEntity(long id, PatchDriverRequest model)
    {
        this._driverService.Patch(id, model);

        return Ok(new { message = "Driver specifications Updated!" });
    }

    // PUT: api/Drivers/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDriverEntity(long id, UpdateDriverRequest model)
    {
        this._driverService.Update(id, model);

        return Ok(new { message = "Driver Updated!" });
    }

    // DELETE: api/Drivers/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDriverEntity(long id)
    {
        this._driverService.Delete(id);

        return Ok(new { message = "Driver Deleted!" });
    }
}
