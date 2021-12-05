import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { AuthResponseModel } from '../Models/authResponseModel';
import { LoginModel } from '../Models/loginModel';
import { RegisterModel } from '../Models/registerModel';
import { ResponseModel } from '../Models/responseModel';

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

  login(loginModel: LoginModel) {
    let newPath = `${this.apiUrl}/api/auth/login`;
    return this.httpClient.post<AuthResponseModel>(newPath, loginModel)
      .subscribe(response => {
        localStorage.setItem("token", response.accessToken.token)
        localStorage.setItem("user", JSON.stringify(response.user))
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

  isAuthenticated(){
    return this.isLogin;
  }
}
