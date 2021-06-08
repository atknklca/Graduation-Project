import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { basePath } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  path = basePath + 'api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  login(model: any) {
    return this.http.post(this.path + 'login', model).pipe(
      map((response: any) => {
        const result = response;
        if (result) {
          localStorage.setItem("token", result.token);
          this.decodedToken = this.jwtHelper.decodeToken(result.token);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.path + "register", model);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
  loggedInRestaurant() {
    const restaurantID = localStorage.getItem("Restaurant");
    if (restaurantID) {
      return true;
    } else {
      return false;
    }
  }

  loginRestaurant(restaurantID) {
    localStorage.setItem("Restaurant", restaurantID);
  }
}
