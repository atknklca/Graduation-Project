import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basePath } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  path = basePath + 'api/user/';

  getUserProperties(userId): Observable<any>{
    let newPath = this.path+userId;
    return this.http.get(newPath);
  }

/*
  getUsers(userId): Observable<User[]> {

    let newPath = this.path;
    if (userId) {
      newPath += userId
    }

    return this.http.get<User[]>(newPath).pipe(
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
