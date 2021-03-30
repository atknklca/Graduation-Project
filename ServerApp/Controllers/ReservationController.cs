using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Context;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Authorize]
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

        //localhost:5000/api/reservation
        [HttpPost]
        public async Task<IActionResult> CreateReservation(Reservation reservation) { 
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReservation), new {id=reservation.ReservationID}, reservation);
        }

          //localhost:5000/api/reservation/2
         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateReservation(int id, Reservation newData) { 
            if(id != newData.ReservationID){
                return BadRequest();
            }
            var reservation = await _context.Reservations.FindAsync(id);
            if(reservation == null)
                return NotFound();
            reservation.reservationOwner = newData.reservationOwner;
            reservation.reservationOwnerGSM = newData.reservationOwnerGSM;
            reservation.reservationDate = newData.reservationDate;
            reservation.reservationTime = newData.reservationTime;
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
          private static ReservationDto ReservationToDto(Reservation reservation){
            return new ReservationDto(){
                Id = reservation.ReservationID,
                reservationOwner = reservation.reservationOwner,
                reservationOwnerGSM = reservation.reservationOwnerGSM,
                reservationDate = reservation.reservationDate,
                reservationTime = reservation.reservationTime
            };
          }
    }
}