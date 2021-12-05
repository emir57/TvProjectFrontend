import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  apiUrl=ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }

  login(loginModel:LoginModel):Observable<AuthResponseModel>{
    let newPath = `${this.apiUrl}/api/auth/login`;
    return this.httpClient.post<AuthResponseModel>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/auth/register`;
    return this.httpClient.post<ResponseModel>(newPath,registerModel);
  }
}
