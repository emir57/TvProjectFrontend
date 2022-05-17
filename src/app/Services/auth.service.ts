import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { AuthResponseModel } from '../Models/response/authResponseModel';
import { LoginModel } from '../Models/loginModel';
import { RegisterModel } from '../Models/registerModel';
import { ResetPasswordModel } from '../Models/resetPasswordModel';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';
import { ResponseSingleModel } from '../Models/response/responseSingleModel';
import { Role } from '../Models/role';
import { SendMailModel } from '../Models/sendMailModel';
import { User } from '../Models/user';
import { NavbarComponent } from '../Components/User/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;
  roles: Role[] = []
  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {
    if (this.isLogin) {
      this.getLoginUser().subscribe(response => {
        this.currentUser = response.data;
        this.getRoles();
      })
    }
  }
  isLogin = false;

  async login(loginModel: LoginModel, rememberMe: boolean, errorCallBack?: (responseErr) => void, successCallBack?: (response: ResponseSingleModel<AuthResponseModel>) => void) {
    let newPath = `${this.apiUrl}/api/auth/login`;
    return this.httpClient.post<ResponseSingleModel<AuthResponseModel>>(newPath, loginModel)
      .subscribe(response => {
        if (response.isSuccess) {
          this.getLoginUser(response.data.user.id).subscribe(response => {
            this.currentUser = response.data;
            this.getRoles();
          });
          this.isLogin = true;
          successCallBack(response);
        }
      }, responseErr => {
        errorCallBack(responseErr);
      })
  }

  register(registerModel: RegisterModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/auth/register`;
    return this.httpClient.post<ResponseModel>(newPath, registerModel);
  }

  userCheck(userId: number) {
    let newPath = `${this.apiUrl}/api/auth/getuser/?id=${userId}`;
    this.httpClient.get<ResponseModel>(newPath)
      .subscribe(response => {
        if (response.isSuccess) {
          this.isLogin = true;
        }
      })
    this.isLogin = false;
  }

  isAuthenticated() {
    return this.isLogin;
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    this.isLogin = false;
  }

  sendMail(email: SendMailModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/auth/sendemail`
    return this.httpClient.post<ResponseModel>(newPath, email)

  }
  resetPassword(resetModel: ResetPasswordModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/auth/resetpassword`;
    return this.httpClient.post<ResponseModel>(newPath, resetModel);
  }

  getLoginUser(id?: number): Observable<ResponseSingleModel<User>> {
    let path = `${this.apiUrl}/api/auth/getuser/?id=`;
    let sessionUser = sessionStorage.getItem("user");
    let localUser = localStorage.getItem("user");

    // if (!this.isAuthenticated()) {
    //   return this.httpClient.get<ResponseSingleModel<User>>(path)
    // }
    if (id) {
      path = `${path}${id}`
      return this.httpClient.get<ResponseSingleModel<User>>(path)
    }
    else if (sessionUser) {
      path = `${path}${sessionUser}`
      return this.httpClient.get<ResponseSingleModel<User>>(path)
    } else {
      path = `${path}${localUser}`
      return this.httpClient.get<ResponseSingleModel<User>>(path)
    }
  }

  isInRole(roleName: string): boolean {
    let inRole = false;
    this.roles.forEach(role => {
      if (role.name == roleName) {
        inRole = true;
      }
    });
    return inRole;
  }
  getRoles(userId?: number) {
    this.getUserRoles(this.currentUser ? this.currentUser.id : userId).subscribe(response => {
      if (response.isSuccess) {
        this.roles = response.data
      }
    })
  }
  getUserRoles(id: number): Observable<ResponseListModel<Role>> {
    let roles: Role[] = []
    let newPath = `${ApiUrl}/api/auth/getroles/?id=${id}`;
    return this.httpClient.get<ResponseListModel<Role>>(newPath)
  }
}
