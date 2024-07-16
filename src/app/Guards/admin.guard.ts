import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Role } from '../Models/role';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';
import { ResponseListModel } from '../Models/response/responseListModel';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  currentUser: User
  pageRole = "Admin";
  roles: Role[] = [];
  constructor(
    private authService: AuthService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getLoginUser().pipe(
      switchMap(response => {
        if (this.authService.isAuthenticated()) {
          return of(response.data);
        }
        return of(null);
      }),
      switchMap((user: User | null) => {
        if (user == null) {
          return of(false);
        }
        return this.authService.getUserRoles(user.id)
      }),
      switchMap((rolesResponse: boolean | ResponseListModel<Role>) => {
        if (!rolesResponse) {
          return of(!!rolesResponse);
        }
        const response: ResponseListModel<Role> = rolesResponse as any;
        if (response.isSuccess && response.data.map(r => r.name).includes('Admin')) {
          return of(true);
        }
        return of(false);
      })
    )
  }
}
