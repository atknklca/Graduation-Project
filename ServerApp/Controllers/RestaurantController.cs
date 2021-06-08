using System;
using System.Linq;
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
    public class RestaurantController : ControllerBase
    {
        private readonly DataContext _context;
        public RestaurantController(DataContext context)
        {
            _context = context;
        }
        //localhost:5000/api/restaurant
        [HttpGet]
        public async Task<IActionResult> GetRestaurants(){
            var restorants = await _context.Restaurants.Select(r => RestorantToDto(r)).ToListAsync();
            return Ok(restorants);
        }
        //localhost:5000/api/restaurant/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurant(int id){
            var restorant = await _context.Restaurants.Include(r=> r.Reservations).FirstOrDefaultAsync(r=> r.RestaurantID==id);
            if(restorant == null)
                return NotFound();
            return Ok(restorant);
        }
        //localhost:5000/api/restaurant
        [HttpPost]
        public async Task<IActionResult> CreateRestaurant (Restaurant restaurant) { 
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRestaurant), new {id = restaurant.RestaurantID}, RestorantToDto(restaurant));
        }
        //localhost:5000/api/restaurant/2
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id){
            var check = await _context.Restaurants.FindAsync(id);
            if(check == null)
                return NotFound();
            _context.Restaurants.Remove(check);
            await _context.SaveChangesAsync();
            return NoContent();
        }
         //localhost:5000/api/restaurant/2
         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateUser(int id, Restaurant newData) { 
            if(id != newData.RestaurantID){
                return BadRequest();
            }
            var restaurant = await _context.Restaurants.FindAsync(id);
            if(restaurant == null)
                return NotFound();
            restaurant.restaurantName = newData.restaurantName;
            restaurant.restaurantAdress = newData.restaurantAdress;
            restaurant.restaurantGsm = newData.restaurantGsm;
            restaurant.restaurantPwd = newData.restaurantPwd;
            restaurant.Reservations = newData.Reservations;
            restaurant.imageUrl = newData.imageUrl;
            try{
                await _context.SaveChangesAsync();
            }
            catch(Exception e){
                return NotFound(e);
            }
            return NoContent();
         }
        private static RestaurantDto RestorantToDto(Restaurant restaurant){
            return new RestaurantDto(){
                RestaurantID = restaurant.RestaurantID,
                restaurantName = restaurant.restaurantName,
                restaurantAdress = restaurant.restaurantAdress,
                restaurantGsm = restaurant.restaurantGsm,
                Reservations = restaurant.Reservations,
                imageUrl=restaurant.imageUrl
            };
        }
    }
}