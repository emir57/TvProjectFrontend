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
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  currentUser: User;
  roles: Role[] = []
  userPhoto = `${ApiUrl}/images/user.png`
  isAdmin=false;
  ngOnInit(): void {
    this.getUser();
    this.getRoles();
    this.isAdmin = this.isInRoleAdmin();
  }

  isLogin() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.toastrService.info("Çıkış Yapılıyor...")
    this.authService.logout();
    this.toastrService.success("Başarıyla Çıkış Yapıldı")
  }

  getRoles(){
    this.authService.getUserRoles(this.currentUser.id).subscribe(response=>{
      if(response.isSuccess){
        this.roles=response.data
      }
    })
  }
  getUser() {
    if (this.authService.isAuthenticated()) {
      this.currentUser = this.authService.getLoginUser();
    }
  }
  isInRoleAdmin():boolean{
    return this.authService.isInRole(this.roles,"Admin");
  }

}
