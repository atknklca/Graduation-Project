using ServerApp.DTO;

namespace ServerApp.Models
{
    public class Reservation
    {
        public int ReservationID{get; set;}
        public string reservationOwner{get; set;}
        public int reservationOwnerGSM{get; set;}
        public string reservationDate{get; set;}
        public string reservationTime {get; set;}
        public virtual Restaurant Restaurant{get; set;}
        public virtual User User{get; set;}

    }
}