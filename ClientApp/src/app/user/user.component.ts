import { Component, OnInit } from '@angular/core';
import { UserModel } from '../UserModel';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  user = new UserModel();
  getName(){
    return this.user.categoryName;
  }
  getUsers(){
    return this.user.users;
  }

}
