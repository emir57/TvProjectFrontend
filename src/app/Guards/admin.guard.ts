import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../Models/role';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentUser:User
  roles:Role[]=[]
  pageRole="Admin";
  constructor(
    private authService:AuthService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.currentUser=this.authService.getLoginUser();
    this.authService.getUserRoles(this.currentUser.id)
      .subscribe(response=>{
        if(response.isSuccess){
          this.roles=response.data;
        }
      })
    if(this.authService.isInRole(this.roles,this.pageRole)){
      return true;
    }
    return false;
  }

}
