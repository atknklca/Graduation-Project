using System.ComponentModel.DataAnnotations;

namespace ServerApp.DTO
{
    public class UserForLoginDto
    {
        [Required]
        public string userEmail {get; set;}  
        [Required]
        public string userPwd {get; set;}
    }
}