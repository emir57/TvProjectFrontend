import { Component, OnInit } from '@angular/core';
import { User } from './Models/user';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private authService:AuthService
  ){

  }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      let userId = JSON.parse(localStorage.getItem('user'))
      this.authService.userCheck(userId)
      this.authService.isLogin=true;
      sessionStorage.setItem("user",userId)
    }else if(sessionStorage.getItem('user')){
      let userId = JSON.parse(sessionStorage.getItem('user'))
      this.authService.userCheck(userId)
      this.authService.isLogin=true;
      sessionStorage.setItem("user",userId)
    }
  }

  title = 'TvProjectFrontend';
}
