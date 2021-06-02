using System.ComponentModel.DataAnnotations;

namespace ServerApp.DTO
{
    public class UserForRegisterDto
    {
        [Required]
        public string userName {get; set;}  
        [Required]
        public string userEmail { get; set;}
        [Required]
        public string userPwd { get; set; }
    }
}