import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Role } from 'src/app/Models/role';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private location: Location
  ) { }

  userPhoto = `${ApiUrl}/images/user.png`
  isAdmin = false;

  ngOnInit(): void {
  }

  isLogin() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.toastrService.info("Çıkış Yapılıyor...")
    this.authService.logout();
    this.toastrService.success("Başarıyla Çıkış Yapıldı")
  }

  back() {
    this.location.back();
  }


  isInRoleAdmin(): boolean {
    if (!this.isLogin()) return false;
    return this.authService.isInRole("Admin");
  }

}
