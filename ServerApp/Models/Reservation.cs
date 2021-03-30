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
        public RestaurantDto Restaurant{get; set;}
        public UserDto User{get; set;}

    }
}