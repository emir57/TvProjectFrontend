import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpirationGuard  {
  constructor(
    private router:Router,
    private toastrService:ToastrService,
    private authService:AuthService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let now = new Date;
      let expiration = new Date(localStorage.getItem("expiration"));
      if(expiration){
          if(now>new Date(expiration)){
            this.authService.isLogin=false;
            this.toastrService.info("Oturum Süreniz Doldu Giriş Sayfasına Yönlendiriliyorsunuz.")
            this.router.navigate(["login"]);
            localStorage.removeItem("expiration")
            return false;
          }
      }
      return true;
  }

}
