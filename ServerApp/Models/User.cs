using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class User : IdentityUser<int>
    {
        //Id, UserName, Email, PhoneNumber, PasswordHash
        public User(){
            Favorites = new List<UserFood>();
            Reservations = new List<Reservation>();
        }
        public List<UserFood> Favorites { get; set; }
        public List<Reservation> Reservations {get; set;}
    }
}