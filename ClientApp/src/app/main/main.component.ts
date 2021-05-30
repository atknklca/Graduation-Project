import { ViewChild } from '@angular/core';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NgbDateStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { merge } from 'rxjs';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

const city = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
    `]
})

export class MainComponent implements OnInit, OnDestroy {
  model1: any;
  data: Date = new Date();

  page = 4;
  page1 = 5;
  page2 = 3;
  focus;
  focus1;
  focus2;

  date: { year: number, month: number };
  model: NgbDateStruct;

  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  state_icon_primary = true;

  constructor(private renderer: Renderer2, config: NgbAccordionConfig) {
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
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? city
        : city.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 81))

    );
  }

   searchToCity(model1){
     if(model1 =="Alaska"){
      console.log(model1)
     }else{
       console.log("Lütfens akdasjd")
     }
    
   }

}
