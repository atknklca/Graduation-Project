using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ServerApp.Models
{
    public class User : IdentityUser<int>
    {
        public List<Food> Favorites { get; set; }
        public List<Reservation> Reservations {get; set;}
    }
}