using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }
        //localhost:5000/api/auth/register
         [HttpPost("register")]
          public async Task<IActionResult> Register(UserForRegisterDto model) { 
            var user = new User{
                UserName = model.userName,
                PasswordHash = model.userPwd,
                Email = model.userEmail
            };
            var result = await _userManager.CreateAsync(user, model.userPwd);
            if(result.Succeeded){
                return StatusCode(201);
            }
            return BadRequest(result.Errors);
         }
           //localhost:5000/api/auth/login
         [HttpPost("login")]
         public async Task<IActionResult> Login(UserForLoginDto model){
            var user = await _userManager.FindByEmailAsync(model.userEmail);
            if(user == null)
                return BadRequest(new {message="Email is incorrect"});
            var result = await _signInManager.CheckPasswordSignInAsync(user, model.userPwd, false);
            if(result.Succeeded){
                return Ok(new { token = GenerateJwtToken(user)});
            }
            return Unauthorized();
          }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes( _config.GetSection("AppSettings:Secret").Value);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.UserName.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token); 
        }
    }
}