import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../Models/role';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentUser: User
  pageRole = "Admin";
  roles: Role[] = [];
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.getUser();
    this.getRoles();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    console.log(this.roles)
    return false
    // this.authService.getUserRoles(this.currentUser.id).subscribe(response => {
    //   if (response.isSuccess) {
    //     this.roles = response.data
    //   }
    // }, responseErr => {
    // }, () => {
    //   console.log(this.isInRoleAdmin())
    //   if (this.isInRoleAdmin()) {
    //     return true;
    //   }
    //   return false;
    // })
    // return false;
  }
  getRoles() {
    this.authService.getUserRoles(this.currentUser.id).subscribe(response => {
      if (response.isSuccess) {
        this.roles = response.data;
      }
    })
  }
  getUser() {
    if (this.authService.isAuthenticated()) {
      this.authService.getLoginUser().subscribe(response=>{
        this.currentUser=response.data
      })
    }
  }
  isInRoleAdmin(): boolean {
    return this.authService.isInRole(this.roles, this.pageRole);
  }

}
