import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { MainComponent } from './main/main.component';
import { CityComponent } from './city/city.component';
import { FoodComponent } from './food/food.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FavoriteComponent } from './main/favorite/favorite.component';
import { ReservationComponent } from './main/reservation/reservation.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: MainComponent ,
     children:[
         {path:'favorite', component:FavoriteComponent},
         {path:'reservation', component:ReservationComponent}
     ]    
},
    {
        path: 'city', component: CityComponent,
        children: [
            { path: 'food', component: FoodComponent },
            { path: 'restaurant', component: RestaurantComponent }
        ]
    }


];

const routerOptions: ExtraOptions = {
    scrollPositionRestoration:'enabled',
    anchorScrolling: 'enabled'
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,routerOptions)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
