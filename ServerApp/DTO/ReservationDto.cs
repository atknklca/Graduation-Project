using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class ReservationDto
    {
        [Key]
        public int Id { get; set; }
        public string reservationOwner{get; set;}
        public int reservationOwnerGSM{get; set;}
        public string reservationDate{get; set;}
        public string reservationTime {get; set;}
    }
}