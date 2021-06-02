using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Context;
using ServerApp.DTO;
using ServerApp.Models;
using System.Linq;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
         private readonly DataContext _context;
        public ReservationController(DataContext context)
        {
            _context = context;
        }
        //localhost:5000/api/reservation
        // [AllowAnonymous]
       [HttpGet]
        public async Task<IActionResult> GetReservations() { 
            var reservations = await _context.Reservations.Select(r => ReservationToDto(r)).ToListAsync();
            return Ok(reservations); 
         }
        //localhost:5000/api/reservation/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservation(int id) { 
            var reservation = await _context.Reservations.FindAsync(id);
            if(reservation == null){
                return NotFound();
            }
            return Ok(ReservationToDto(reservation));
         }

          //localhost:5000/api/reservation/2
         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateReservation(int id, Reservation newData) { 
            if(id != newData.ReservationId){
                return BadRequest();
            }
            var reservation = await _context.Reservations.FindAsync(id);
            if(reservation == null)
                return NotFound();
            reservation.owner = newData.owner;
            reservation.ownerGsm = newData.ownerGsm;
            reservation.date = newData.date;
            reservation.time = newData.time;
            try{
                await _context.SaveChangesAsync();
            }
            catch(Exception e){
                return NotFound(e);
            }
            return NoContent();
         }
        //localhost:5000/api/reservation/2
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id) { 
             var reservation = await _context.Reservations.FindAsync(id);
             if(reservation == null){
                 return NotFound();
                }
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return NoContent();
          }
          //localhost:5000/api/reservation/2/1
          [HttpPost("{id}/{restaurantId}")]
          public async Task<IActionResult> CreateReservation(int id, int restaurantId, ReservationDto resDto){
              var reservation = DtoToReservation(resDto);
              reservation.Restaurant = await _context.Restaurants.FindAsync(restaurantId);
              reservation.User = await _context.Users.FindAsync(id);  
              _context.Reservations.Add(reservation);
              var user = await _context.Users.FindAsync(id);
              if(user== null)
                return NotFound("user patladi");
              var restaurant = await _context.Restaurants.FindAsync(restaurantId);
              if(restaurant== null)
                return NotFound("restaurant patladi");
              user.Reservations.Add(reservation);
              restaurant.Reservations.Add(reservation);
              await _context.SaveChangesAsync();
              return CreatedAtAction(nameof(GetReservation), new {id=reservation.ReservationId}, reservation);
          }
          private static ReservationDto ReservationToDto(Reservation reservation){
            return new ReservationDto(){
                ReservationId = reservation.ReservationId,
                owner = reservation.owner,
                ownerGsm = reservation.ownerGsm,
                date = reservation.date,
                time = reservation.time,
                RestaurantID = reservation.RestaurantID,
                UserId = reservation.UserId
            };
          }
           private static Reservation DtoToReservation(ReservationDto dto){
             return new Reservation(){
                 owner = dto.owner,
                 ownerGsm = dto.ownerGsm,
                 date = dto.date,
                 time = dto.time,
                 RestaurantID = dto.RestaurantID,
                 UserId = dto.UserId
             };
         }
    }
}