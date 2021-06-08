import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'app/main/reservation/reservation';
import { AlertifyService } from 'app/services/alertify.service';
import { ReservationService } from 'app/services/reservation.service';

@Component({
  selector: 'app-user-restaurant',
  templateUrl: './user-restaurant.component.html',
  styleUrls: ['./user-restaurant.component.css']
})
export class UserRestaurantComponent implements OnInit {
  reservations: Reservation[];
  restaurantId;

  constructor(

    private alertify: AlertifyService,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem("Restaurant");
    this.reservationService.getReservationForRestaurant(this.restaurantId).subscribe(data => {
      this.reservations = data;
    })

  }

  deleteReservation(reservationId) {
    this.reservationService.deleteReservation(reservationId).subscribe(next => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('user-restaurant');
      this.alertify.success("Rezervasyon Kaldırıldı!");
    }, error => {
      this.alertify.error(error);
    });

  }

}
