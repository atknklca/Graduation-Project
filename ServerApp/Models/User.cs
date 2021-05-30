using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class User : IdentityUser<int>
    {
        //Id, UserName, Email, PhoneNumber, PasswordHash
        public User(){
            Favorites = new List<Food>();
            Reservations = new List<Reservation>();
        }
        public List<Food> Favorites { get; set; }
        public List<Reservation> Reservations {get; set;}
    }
}