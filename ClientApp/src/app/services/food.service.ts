import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from 'app/city/food/food';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { basePath } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }
  path = basePath + 'api/food/';

  getFoods(foodId): Observable<Food[]> {

    let newPath = this.path;
    if (foodId) {
      newPath += foodId
    }

    return this.http.get<Food[]>(newPath).pipe(
      tap((data) => {/*console.log(JSON.stringify(data))*/}),
      catchError(this.handleError)
    );

  }

  addFavorite(userID,foodID) {
    let newPath =this.path + "addfavorite/"+ userID + "/"+foodID;
    
    return this.http.put(newPath,null);
  }

  removeFavorite(userID,foodID) {
    let newPath =this.path + "removefavorite/"+ userID + "/"+foodID;
    return this.http.delete(newPath);
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
