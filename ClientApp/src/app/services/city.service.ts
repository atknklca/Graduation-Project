import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { City } from '../city/city';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { basePath } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpClient) { }
  path  = basePath + 'api/city';

  getCities(cityId?): Observable<City[]>{
    let newPath = this.path;
    if(cityId){
      newPath +=cityId
    }
    return this.http.get<City[]>(newPath).pipe(
      tap((data) => {/*console.log(JSON.stringify(data))*/}),
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
  }




}
