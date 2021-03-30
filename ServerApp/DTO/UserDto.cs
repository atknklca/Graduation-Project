using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class UserDto
    {
        [Key]
        public int Id { get; set; }
        public string userName {get; set;}  
        public string userEmail { get; set;}
        public List<Food> Favorites { get; set; }
        public List<Reservation> Reservations {get; set;}
    }
}