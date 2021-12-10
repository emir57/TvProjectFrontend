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
  ngOnInit(): void {
    this.currentUser = this.getUser();
    this.getUserRoles();
  }

  isLogin() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.toastrService.info("Çıkış Yapılıyor...")
    this.authService.logout();
    this.toastrService.success("Başarıyla Çıkış Yapıldı")
  }
  getUser(): User {
    return this.authService.getLoginUser();
  }
  getUserRoles() {
    this.authService.getUserRoles(this.currentUser.id)
      .subscribe(response => {
        if (response.isSuccess) {
          this.roles = response.data
        }
      })

  }
  isInRoleAdmin(roleName: string): boolean {
    let inRole = false;
    this.roles.forEach(role => {
      if (role.name == roleName) {
        inRole = true;
      }
    });
    return inRole;
  }

}
