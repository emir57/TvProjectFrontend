import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  ngOnInit(): void {
  }

  isLogin(){
    return this.authService.isAuthenticated();
  }

  logout(){
    this.toastrService.info("Çıkış Yapılıyor...")
    this.authService.logout();
    this.toastrService.success("Başarıyla Çıkış Yapıldı")
  }

}
