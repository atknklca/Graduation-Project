using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Context;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, DataContext context, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _config = configuration;
        }

        //localhost:5000/api/user
        [HttpGet]
        public async Task<IActionResult> GetUsers() { 
            var users = await _context.Users.Select(u => UserToDto(u)).ToListAsync();
            return Ok(users);
         }

        //localhost:5000/api/user/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id) { 
            var user = await _context.Users.Include(u=>u.Favorites).Include(u => u.Reservations).FirstOrDefaultAsync(u => u.Id==id);
            if(user == null){
                return NotFound();
            }
            return Ok(UserToDto(user));
         }

        //localhost:5000/api/user/2
        [HttpPut("{id}")]
         public async Task<IActionResult> UpdateUser(int id, User newData) { 
            if(id != newData.Id){
                return BadRequest();
            }
            var user = await _context.Users.FindAsync(id);
            if(user == null)
                return NotFound();
            user.UserName = newData.UserName;
            user.Email = newData.Email;
            user.Favorites = newData.Favorites;
            user.Reservations = newData.Reservations;
            user.PasswordHash = newData.PasswordHash;
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
         public async Task<IActionResult> DeleteUser(int id) { 
             var user = await _context.Users.FindAsync(id);
             if(user == null){
                 return NotFound();
                }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
          }
        private static UserDto UserToDto(User user){
            return new UserDto(){
                Id = user.Id,
                userEmail = user.Email,
                userName = user.UserName,
                Favorites = user.Favorites,
                Reservations = user.Reservations
            };
        }
    }
}