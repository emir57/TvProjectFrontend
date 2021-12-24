import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {

  users:User[]=[]
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response=>{
      this.users=response.data;
    })
  }

  goUpdatePage(user:User){

  }

  goRoleUpdatePage(user:User){

  }

}
