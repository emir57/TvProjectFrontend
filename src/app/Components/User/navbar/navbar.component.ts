import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private toastrService:ToastrService
  ) { }

  currentUser:User;
  userPhoto = `${ApiUrl}/images/user.png`
  ngOnInit(): void {
    this.currentUser = this.getUser();
    console.log(this.currentUser)
  }

  isLogin(){
    return this.authService.isAuthenticated();
  }

  logout(){
    this.toastrService.info("Çıkış Yapılıyor...")
    this.authService.logout();
    this.toastrService.success("Başarıyla Çıkış Yapıldı")
  }
  getUser():User{
    return this.authService.getLoginUser();
  }

}
