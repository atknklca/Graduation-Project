import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'app/main/reservation/reservation';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { basePath } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  path = basePath + 'api/reservation/';

  getAllReservations() {
    return this.http.get(this.path);
  }
  getReservation(userId) {
    let newPath = this.path + "query?userId=" + userId;
    return this.http.get<Reservation[]>(newPath);
  }
  getReservationForRestaurant(restaurantId) {
    let newPath = this.path + "q?restaurantId=" + restaurantId;
    return this.http.get<Reservation[]>(newPath);
  }
  deleteReservation(userId) {
    let newPath = this.path + userId;
    return this.http.delete(newPath);
  }
  addReservation(userId, restaurantId, model: any) {
    let newPath = this.path + userId + "/" + restaurantId;
    return this.http.post(newPath, model);
  }



  /*
    getReservations(reservationId): Observable<Reservation[]> {
  
      let newPath = this.path;
      if (reservationId) {
        newPath += reservationId
      }
  
      return this.http.get<Reservation[]>(newPath).pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  
    }
  
    handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = 'Bir hata oluştu ' + err.error.message;
      } else {
        errorMessage = 'Sistemsel bir hata';
      }
      return throwError(errorMessage);
    }*/

}
