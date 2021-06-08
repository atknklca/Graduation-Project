import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'app/city/restaurant/restaurant';
import { AlertifyService } from 'app/services/alertify.service';
import { AuthService } from 'app/services/auth.service';
import { ReservationService } from 'app/services/reservation.service';
import { RestaurantService } from 'app/services/restaurant.service';
import { Reservation } from './reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userID;
  reservations: Reservation[];
  restaurants: Restaurant[];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.userID = this.authService.decodedToken.nameid[0];
    this.reservationService.getReservation(this.userID).subscribe((data) => {
      this.reservations = data;
    });
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    })

  }

  deleteReservation(reservationId) {
    this.reservationService.deleteReservation(reservationId).subscribe(next => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('index/reservation#ek-sayfa');
      this.alertify.success(" Rezervasyonunuz Kaldırıldı!");
    }, error => {
      this.alertify.error(error);
    });
    //  this.ngOnInit();
  }

  getRestaurantName(reservation) {
    return this.restaurants?.find(x => x.restaurantID == reservation.restaurantID).restaurantName;
  }

}
