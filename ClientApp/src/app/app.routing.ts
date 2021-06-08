import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { MainComponent } from './main/main.component';
import { CityComponent } from './city/city.component';
import { FoodComponent } from './city/food/food.component';
import { RestaurantComponent } from './city/restaurant/restaurant.component';
import { FavoriteComponent } from './main/favorite/favorite.component';
import { ReservationComponent } from './main/reservation/reservation.component';
import { AuthGuard } from './_guards/auth-guard';
import { UserRestaurantComponent } from './user-restaurant/user-restaurant.component';
import { WuutecComponent } from './wuutec/wuutec.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    {
        path: 'index', component: MainComponent,
        children: [
            { path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
            { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: 'city', component: CityComponent,
        children: [
            { path: 'food/:cityId', component: FoodComponent },
            { path: 'restaurant/:restaurantId', component: RestaurantComponent }
        ]
    },
    {   path: 'user-restaurant', component: UserRestaurantComponent},
    {   path: 'wuutec', component: WuutecComponent}


];

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, routerOptions)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
