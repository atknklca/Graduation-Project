import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FoodService } from 'app/services/food.service';
import { Food } from './food';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { AuthGuard } from 'app/_guards/auth-guard';
import { AlertifyService } from 'app/services/alertify.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  providers: [FoodService]
})
export class FoodComponent implements OnInit {

  constructor(private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService) { }

  foods: Food[];
  choseCityId;
  userID;
  favoriteFoods;
  favoriteFoodIds = new Array();

  ngOnInit(): void {

    this.userID = this.authService.decodedToken?.nameid[0];

    this.activatedRoute.params.subscribe(params => {
      this.foodService.getFoods(null).subscribe((data) => {
        this.foods = data;
        this.choseCityId = params["cityId"];
      });
    });

    this.userService.getUserProperties(this.userID).subscribe(data => {
      this.favoriteFoods = data.favorites;
      this.favoriteFoods.map(x => this.favoriteFoodIds.push(x.foodID));
    });
  }


  foodToRestaurant(restaurantID) {
    this.router.navigate(['/city/restaurant/' + this.foods.find(x => x.restaurantID == restaurantID).restaurantID]);
  }

  addFavorite(foodID) {

    this.foodService.addFavorite(this.userID, foodID).subscribe(next => {
      this.favoriteFoodIds.splice(0, this.favoriteFoodIds.length);
      this.userService.getUserProperties(this.userID).subscribe(data => {
        this.favoriteFoods = data.favorites;
        this.favoriteFoods.map(x => this.favoriteFoodIds.push(x.foodID));
      });
      this.alertify.success(this.foods.find(x => x.foodID == foodID).foodName + " Favorilere Eklendi!");
    }, error => {
      this.alertify.error("Lütfen 1 Dakika Sonra Tekrar Deneyiniz.");
    });
  }
  removeFavorite(foodID) {
    this.favoriteFoodIds.splice(0, this.favoriteFoodIds.length);

    this.foodService.removeFavorite(this.userID, foodID).subscribe(next => {
      this.userService.getUserProperties(this.userID).subscribe(data => {
        this.favoriteFoods = data.favorites;
        this.favoriteFoods.map(x => this.favoriteFoodIds.push(x.foodID));
      });
      this.alertify.error(this.foods.find(x => x.foodID == foodID).foodName + " Favorilerden Silindi!");
    }, error => {
      this.alertify.error("Lütfen 1 Dakika Sonra Tekrar Deneyiniz.");
    })
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
