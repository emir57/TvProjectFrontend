import { Component, OnInit } from '@angular/core';
import { User } from './Models/user';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user:User;
  constructor(
    private authService:AuthService
  ){

  }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.authService.userCheck(this.user)
    }else if(sessionStorage.getItem('user')){
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.authService.userCheck(this.user)
    }
  }

  title = 'TvProjectFrontend';
}
