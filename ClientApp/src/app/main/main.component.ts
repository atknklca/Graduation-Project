import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'app/city/city';
import { AlertifyService } from 'app/services/alertify.service';
import { CityService } from 'app/services/city.service';
import * as Rellax from 'rellax';
import { Observable } from 'rxjs';


let cityName = ['adana','izmir'];

@Component({
  selector: 'app-components',
  templateUrl: './main.component.html',
  styles: [`
  ::placeholder{
    color: #FFFFFF;
    opacity: 1;
  }
  o-logo{
    margin-bottom:25rem;
  }
    ngb-progressbar {
        margin-top: 5rem;
    }
    .example {
      overflow-y: scroll; 
    }
    
    .example::-webkit-scrollbar {
        display: none;
    }
    
    .example {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    `]
})

export class MainComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  filterText = '';


  model1: any;
  data: Date = new Date();
  cities: City[]

  page = 4;
  page1 = 5;
  page2 = 3;
  focus;
  focus1;
  focus2;
  isTouched = false;

  date: { year: number, month: number };
  model: NgbDateStruct;

  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  state_icon_primary = true;

  constructor(private renderer: Renderer2, 
    config: NgbAccordionConfig, 
    private cityService: CityService,
    private router:Router,
    private alertify: AlertifyService) {
    config.closeOthers = true;
    config.type = 'info';
  }
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');

    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
    

  }
 
  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  choseCity(city){
    this.filterText = city.cityName;
  }
  searchToCity(){

    let sonuc = this.cities.find(x => x.cityName.toLowerCase() == this.filterText.toLowerCase())

    if(sonuc){
      this.router.navigate(['/city/food/'+this.cities.find(x =>  x.cityName.toLowerCase() == this.filterText.toLowerCase()).cityID]);
    }else{
      this.alertify.error("Lütfen Şehir İsmini Doğru Giriniz. Örnek Aşağıda Listede Belirtilmiştir!");
    }
    //
    
  }

  ac() {
    if(this.isTouched)
      this.isTouched  =false;
      else
      this.isTouched = true;

  }



}
