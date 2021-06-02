using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Context;
using ServerApp.DTO;
using ServerApp.Models;


namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        private readonly DataContext _context;
        public CityController(DataContext context)
        {
            _context = context;
        }
        //localhost:5000/api/city
        [HttpGet]
        public async Task<IActionResult> GetCities() { 
            var cities = await _context.Cities.ToListAsync();
            return Ok(cities); 
         }

        //localhost:5000/api/city/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCity(int id) { 
             var city = await _context.Cities.FindAsync(id);
            if(city == null){
                return NotFound();
            }
            return Ok(city);
         }

        //localhost:5000/api/city
        [HttpPost]
        public async Task<IActionResult> CreateCity(City city) { 
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCity), new {id=city.CityID}, city);
        }

          //localhost:5000/api/city/2
         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateCity(int id, City newData) { 
            if(id != newData.CityID){
                return BadRequest();
            }
            var city = await _context.Cities.FindAsync(id);
            if(city == null)
                return NotFound();
            city.cityName = newData.cityName;
            city.cityDescription = newData.cityDescription;
            city.Foods = newData.Foods;
            city.imageUrl = newData.imageUrl;
            try{
                await _context.SaveChangesAsync();
            }
            catch(Exception e){
                return NotFound(e);
            }
            return NoContent();
         }
        //localhost:5000/api/user/2
         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteCity(int id) { 
             var city = await _context.Cities.FindAsync(id);
             if(city == null){
                 return NotFound();
                }
            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();
            return NoContent();
          }
    }
}