import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from 'app/city/restaurant/restaurant';
import { basePath } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }
  path = basePath + 'api/restaurant/';

  getRestaurants(): Observable<Restaurant[]> {
    let newPath = this.path;

    return this.http.get<Restaurant[]>(newPath).pipe(
      tap((data) => {/*console.log(JSON.stringify(data))*/ }),
      catchError(this.handleError)
    );

  }
  getRestaurant(restaurantId): Observable<any> {
    let newPath = this.path;
    if (restaurantId) {
      newPath += restaurantId
    }

    return this.http.get(newPath);
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluştu ' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata';
    }
    return throwError(errorMessage);
  }
}
