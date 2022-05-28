import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ChangePasswordModel } from '../Models/changePasswordModel';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';
import { ResponseSingleModel } from '../Models/response/responseSingleModel';
import { UpdateUserModel } from '../Models/updateUserModel';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${ApiUrl}`
  constructor(
    private httpClient: HttpClient
  ) { }

  updateUser(updateUserModel: UpdateUserModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/users/update`;
    return this.httpClient.post<ResponseModel>(newPath, updateUserModel);
  }
  updateUserAdmin(updateUserModel: UpdateUserModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/users/updateAdmin`;
    return this.httpClient.post<ResponseModel>(newPath, updateUserModel);
  }

  changePassword(changePasswordModel: ChangePasswordModel): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/users/changepassword`;
    return this.httpClient.post<ResponseModel>(newPath, changePasswordModel);
  }

  getUsers(): Observable<ResponseListModel<User>> {
    let newPath = `${this.apiUrl}/api/users/get`;
    return this.httpClient.get<ResponseListModel<User>>(newPath);
  }
  getUserById(id: number): Observable<ResponseSingleModel<User>> {
    let newPath = `${this.apiUrl}/api/users/getbyid?id=${id}`;
    return this.httpClient.get<ResponseSingleModel<User>>(newPath);
  }

  sendCode(userId: number) {
    let newPath = `${this.apiUrl}/api/users/sendcode`;
    return this.httpClient.post(newPath, {
      userId: userId
    });
  }

}
