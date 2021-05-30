import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'app/services/city.service';
import { City } from './city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [CityService]
})
export class CityComponent implements OnInit, OnDestroy {

  constructor(private element: ElementRef, private cityService: CityService,
    private activatedRoute: ActivatedRoute) { }

  city: City[];

  ngOnInit() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.remove('navbar-transparent');

    this.activatedRoute.params.subscribe(params => {
      this.cityService.getCities(params["cityId"]).subscribe((data) => {
        this.city = data;
      });
    })
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

  }
}
