import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AlertifyService } from "app/services/alertify.service";
import { AuthService } from "app/services/auth.service";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, 
        private router: Router,
        private alertify: AlertifyService){}
    canActivate(){
        if(this.authService.loggedIn()){
            return true;
        }
        this.router.navigate(['/index']);
        this.alertify.warning("Oturum Açmanız Gereklidir!");
        return false;
    }
}