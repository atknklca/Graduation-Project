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
    public class FoodController : ControllerBase
    {
        private readonly DataContext _context;
        public FoodController(DataContext context)
        {
            _context = context;
        }
        //localhost:5000/api/food
        [HttpGet]
        public async Task<IActionResult> GetFoods()
        {
            var foods = await _context.Foods.Select(f => FoodToDto(f)).ToListAsync();
            return Ok(foods);
        }

        //localhost:5000/api/food/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFood(int id)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }
            return Ok(FoodToDto(food));
        }

        //localhost:5000/api/food
        [HttpPost]
        public async Task<IActionResult> CreateFood(Food food)
        {
            _context.Foods.Add(food);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFood), new { id = food.FoodID }, food);
        }

        //localhost:5000/api/food/2
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFood(int id, Food newData)
        {
            if (id != newData.FoodID)
            {
                return BadRequest();
            }
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
                return NotFound();
            food.foodName = newData.foodName;
            food.foodDescription = newData.foodDescription;
            food.Users = newData.Users;
            food.City = newData.City;
            food.imageUrl = newData.imageUrl;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return NotFound(e);
            }
            return NoContent();
        }
        //localhost:5000/api/food/2
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFood(int id)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }
            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        //localhost:5000/api/food/addfavorite/1/2
        [HttpPut("addfavorite/{id}/{foodId}")]
        public async Task<IActionResult> AddFavorite(int id, int foodId)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            var food = await _context.Foods.FindAsync(foodId);
            if (food == null)
            {
                return NotFound();
            }
            var favorite = new UserFood();
            favorite.Id = id;
            favorite.FoodID = foodId;
            user.Favorites.Add(favorite);
            food.Users.Add(favorite);
            await _context.SaveChangesAsync();
            return Ok();
        }
        //localhost:5000/api/food/removefavorite/1/2
        [HttpDelete("removefavorite/{id}/{foodId}")]
        public async Task<IActionResult> RemoveFavorite(int id, int foodID)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            var food = await _context.Foods.FindAsync(foodID);
            if (food == null)
                return NotFound();
            var fav = await _context.UserFoods.ToListAsync();
            var item = new UserFood();
            for (int i = 0; i < fav.Count; i++)
            {
                if (fav[i].FoodID == foodID && fav[i].Id == id)
                {
                    item = fav[i];
                }
            }
            _context.UserFoods.Remove(item);
            user.Favorites.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }
        private static FoodDto FoodToDto(Food food)
        {
            return new FoodDto()
            {
                FoodID = food.FoodID,
                foodName = food.foodName,
                foodDescription = food.foodDescription,
                imageUrl = food.imageUrl,
                CityID = food.CityID,
                RestaurantID = food.RestaurantID
            };
        }
    }
}