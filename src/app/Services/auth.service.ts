import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { AuthResponseModel } from '../Models/authResponseModel';
import { LoginModel } from '../Models/loginModel';
import { RegisterModel } from '../Models/registerModel';
import { ResponseModel } from '../Models/responseModel';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient,
    private toastrService:ToastrService
  ) { }
  isLogin=false;

  login(loginModel: LoginModel,rememberMe:boolean) {
    let newPath = `${this.apiUrl}/api/auth/login`;
    return this.httpClient.post<AuthResponseModel>(newPath, loginModel)
      .subscribe(response => {
        if(rememberMe){
          localStorage.setItem("token", response.accessToken.token)
          localStorage.setItem("user", JSON.stringify(response.user))
        }else{
          sessionStorage.setItem("token", response.accessToken.token)
          sessionStorage.setItem("user", JSON.stringify(response.user))
        }

        this.toastrService.success("Giriş Başarılı")
        this.isLogin=true;
      }, responseErr => {
        console.log(responseErr)
      })
  }

  register(registerModel: RegisterModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/auth/register`;
    return this.httpClient.post<ResponseModel>(newPath, registerModel);
  }

  userCheck(user:User){
    let newPath = `${this.apiUrl}/api/auth/checkuser`;
    this.httpClient.post<ResponseModel>(newPath,user)
      .subscribe(response=>{
        if(response.isSuccess){
          this.isLogin=true;
        }
      })
      this.isLogin=false;
  }

  isAuthenticated(){
    return this.isLogin;
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.isLogin=false;
  }
}
