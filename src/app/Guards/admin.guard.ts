import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = new Subject<boolean>();
    this.getUser().subscribe(response => {
      this.currentUser = response.data
    }, responseErr => { },
      () => {
        this.getRoles().subscribe(response => {
          if (response.isSuccess) {
            response.data.forEach(role => {
              if (role.name == "Admin") {
                result.next(true);
                result.complete();
                return result.asObservable();
              }
            })
          }
          result.next(false);
          result.complete();
          // this.router.navigate(["login"])
        })
      })
    return result;
  }
  getRoles() {
    return this.authService.getUserRoles(this.currentUser.id)
  }
  getUser() {
    if (this.authService.isAuthenticated()) {
      return this.authService.getLoginUser()
    }
  }
  isInRoleAdmin(): boolean {
    return this.authService.isInRole(this.pageRole);
  }

}
