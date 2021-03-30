export class UserModel{
  categoryName:String;
  users: Array<User>;
  constructor(){
    this.categoryName = "User";
    this.users = [
      new User(1, "1asd","1asdjkqwd@gmail.com"),
      new User(2, "2asd","2asdjkqwd@gmail.com"),
      new User(3, "3asd","3asdjkqwd@gmail.com"),
      new User(4, "4asd","4asdjkqwd@gmail.com"),
      new User(5, "5asd","5asdjkqwd@gmail.com"),
      new User(6, "6asd","6asdjkqwd@gmail.com")
    ];
  }
}
export class User{
  id: number;
  name: String;
  email:String;
  constructor(id:number, name:String, email:String){
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
