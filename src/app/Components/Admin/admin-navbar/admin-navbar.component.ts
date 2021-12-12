import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  currentUser:User
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getLoginUser().subscribe(response=>{
      if(response.isSuccess){
        this.currentUser=response.data;
      }
    })
  }

}
