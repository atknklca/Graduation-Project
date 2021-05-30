using System.ComponentModel.DataAnnotations;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class Reservation
    {
        public int ReservationId{get; set;}
        public string owner{get; set;}
        public string ownerGsm{get; set;}
        public string date{get; set;}
        public string time{get; set;}
        public int RestaurantID{get; set;}
        public Restaurant Restaurant{get; set;}
        public int UserId{get; set;}
        public User User{get; set;}
    }
}