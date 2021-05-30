using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class ReservationDto
    {
        [Key]
        public int ReservationId{get; set;}
        public string owner {get; set;}
        public string ownerGsm {get; set;}
        public string date {get; set;}
        public string time {get; set;}
        public int RestaurantID{get; set;}
        public int UserId{get; set;}
    }
}