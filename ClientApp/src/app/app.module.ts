import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { MainModule } from './main/main.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CityComponent } from './city/city.component';
import { FoodComponent } from './city/food/food.component';
import { RestaurantComponent } from './city/restaurant/restaurant.component';
import { AuthGuard } from './_guards/auth-guard';
import { ErrorInterceptor } from './services/error.intercaptor';
import { UserRestaurantComponent } from './user-restaurant/user-restaurant.component';
import { WuutecComponent } from './wuutec/wuutec.component';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CityComponent,
        FoodComponent,
        RestaurantComponent,
        UserRestaurantComponent,
        WuutecComponent],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        MainModule,
        HttpClientModule,
        
    ],
    providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
