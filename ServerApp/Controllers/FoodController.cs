using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Context;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly DataContext _context;
        public FoodController(DataContext context)
        {
            _context = context;
        }
         //localhost:5000/api/food
        [HttpGet]
        public async Task<IActionResult> GetFoods() { 
            var foods = await _context.Foods.ToListAsync();
            return Ok(foods); 
         }

        //localhost:5000/api/food/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFood(int id) { 
             var food = await _context.Foods.FindAsync(id);
            if(food == null){
                return NotFound();
            }
            return Ok(food);
         }

        //localhost:5000/api/food
        [HttpPost]
        public async Task<IActionResult> CreateFood(Food food) { 
            _context.Foods.Add(food);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFood), new {id=food.FoodID}, food);
        }

          //localhost:5000/api/food/2
         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateFood(int id, Food newData) { 
            if(id != newData.FoodID){
                return BadRequest();
            }
            var food = await _context.Foods.FindAsync(id);
            if(food == null)
                return NotFound();
            food.foodName = newData.foodName;
            food.foodDescription = newData.foodDescription;
            food.Users = newData.Users;
            food.City = newData.City;
            try{
                await _context.SaveChangesAsync();
            }
            catch(Exception e){
                return NotFound(e);
            }
            return NoContent();
         }
        //localhost:5000/api/food/2
         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteFood(int id) { 
             var food = await _context.Foods.FindAsync(id);
             if(food == null){
                 return NotFound();
                }
            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();
            return NoContent();
          }
    }
}