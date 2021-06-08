import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodComponent } from 'app/city/food/food.component';
import { CityService } from 'app/services/city.service';
import { City } from './city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  constructor(private element: ElementRef, private cityService: CityService,
    private activatedRoute: ActivatedRoute) { }

  cities: City[];
  chosedCity;
  chosedCityId;
  chosedRestaurantId;

  ngOnInit() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.remove('navbar-transparent');
    this.activatedRoute.firstChild.params.subscribe(params => {
      this.cityService.getCities(null).subscribe((data) => {
        this.cities = data;
        this.chosedCity = data.find(x => x.cityID == params["cityId"]);
      });
    });

    // this.activatedRoute.params.subscribe(p => )


  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

  }

}
