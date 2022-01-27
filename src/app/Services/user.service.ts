import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ChangePasswordModel } from '../Models/changePasswordModel';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';
import { UpdateUserModel } from '../Models/updateUserModel';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=`${ApiUrl}`
  constructor(
    private httpClient:HttpClient
  ) { }

  updateUser(updateUserModel:UpdateUserModel):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/users/updateAdmin`;
    return this.httpClient.post<ResponseModel>(newPath,updateUserModel);
  }

  changePassword(changePasswordModel:ChangePasswordModel):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/users/changepassword`;
    return this.httpClient.post<ResponseModel>(newPath,changePasswordModel);
  }

  getUsers():Observable<ResponseListModel<User>>{
    let newPath = `${this.apiUrl}/api/users/get`;
    return this.httpClient.get<ResponseListModel<User>>(newPath);
  }

}
