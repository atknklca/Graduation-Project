import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms'


import { MainComponent } from './main.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CityFilterPipe } from './city-filter.pipe';
import { AuthGuard } from 'app/_guards/auth-guard';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        MatBadgeModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ],
    declarations: [
        MainComponent,
        FavoriteComponent,
        ReservationComponent,
        CityFilterPipe
    ],
    exports:[ MainComponent ],
    providers:[AuthGuard]
})
export class MainModule { }
