import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService:AuthService
  ) { }

  ngOnInit(): void {
    this.userService.getLoginUser().subscribe(response=>{
      if(response.isSuccess){
        sessionStorage.setItem("userInfo",JSON.stringify(response.data))
      }
    })
  }

}
