import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {

  searchString:string='';
  users:User[]=[]
  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response=>{
      this.users=response.data;
    })
  }

  goUpdatePage(user:User){
    this.router.navigate(["admindashboard/editcustomer",JSON.stringify(user)])
  }

  goRoleUpdatePage(user:User){

  }

}
