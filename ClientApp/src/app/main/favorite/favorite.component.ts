import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'app/services/alertify.service';
import { AuthService } from 'app/services/auth.service';
import { FoodService } from 'app/services/food.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  userID;
  foods;
  favoriteFoods;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private foodService: FoodService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.userID = this.authService.decodedToken.nameid[0];

    this.foodService.getFoods(null).subscribe((data) => {
      this.foods = data;
    });

    this.userService.getUserProperties(this.userID).subscribe(data => {
      this.favoriteFoods = data.favorites;
    });
  }


  removeFavorite(foodID) {
    this.foodService.removeFavorite(this.userID, foodID).subscribe(next => {
      this.userService.getUserProperties(this.userID).subscribe(data => {
        this.favoriteFoods = data.favorites;
      });
      this.alertify.error(this.foods.find(x => x.foodID == foodID).foodName + " Favorilerden Silindi!");
    }, error => {
      this.alertify.error("Lütfen 1 Dakika Sonra Tekrar Deneyiniz.");
    })
  }

  appo(favFood) {
    return this.foods?.find(x => x.foodID == favFood.foodID).foodName;
  }
  getFoodImage(favFood) {
    return this.foods?.find(x => x.foodID == favFood.foodID).imageUrl;
  }

}
