import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { AuthResponseModel } from '../Models/authResponseModel';
import { LoginModel } from '../Models/loginModel';
import { RegisterModel } from '../Models/registerModel';
import { ResetPasswordModel } from '../Models/resetPasswordModel';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';
import { ResponseSingleModel } from '../Models/responseSingleModel';
import { Role } from '../Models/role';
import { SendMailModel } from '../Models/sendMailModel';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) { }
  isLogin = false;

  login(loginModel: LoginModel, rememberMe: boolean) {
    let newPath = `${this.apiUrl}/api/auth/login`;
    return this.httpClient.post<ResponseSingleModel<AuthResponseModel>>(newPath, loginModel)
      .subscribe(response => {
        if (rememberMe) {
          localStorage.setItem("token", response.data.accessToken.token)
          localStorage.setItem("user", JSON.stringify(response.data.user))
        } else {
          sessionStorage.setItem("token", response.data.accessToken.token)
          sessionStorage.setItem("user", JSON.stringify(response.data.user))
        }
        if (response.isSuccess) {
          this.toastrService.info("Giriş Yapılıyor...")
          this.toastrService.success(response.message)
          this.isLogin = true;
          this.router.navigate(["/"])
        } else {
          console.log(response.message)
          this.toastrService.error(response.message)
        }
      }, responseErr => {
        this.toastrService.error(responseErr.error.message)
      })
  }

  register(registerModel: RegisterModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/auth/register`;
    return this.httpClient.post<ResponseModel>(newPath, registerModel);
  }

  userCheck(user: User) {
    let newPath = `${this.apiUrl}/api/auth/checkuser`;
    this.httpClient.post<ResponseModel>(newPath, user)
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

  sendMail(email:SendMailModel):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/auth/sendemail`
    return this.httpClient.post<ResponseModel>(newPath,email)

  }
  resetPassword(resetModel:ResetPasswordModel):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/auth/resetpassword`;
    return this.httpClient.post<ResponseModel>(newPath,resetModel);
  }

  getLoginUser():User{
    let sessionUser = sessionStorage.getItem("user");
    let localUser = localStorage.getItem("user");
    if(this.isAuthenticated()){
      if(sessionUser){
        return JSON.parse(sessionUser);
      }else if(localUser){
        return JSON.parse(localUser);
      }
      return null;
    }
  }
  getUserRoles(id:number):Observable<ResponseListModel<Role>>{
    let newPath = `${ApiUrl}/api/auth/getroles/?id=${id}`;
    return this.httpClient.get<ResponseListModel<Role>>(newPath)

  }

}
