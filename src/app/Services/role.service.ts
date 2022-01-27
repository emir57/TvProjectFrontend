import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';
import { Role } from '../Models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl=ApiUrl;
  constructor(
    private httpClient:HttpClient
  ) { }

  getRoles():Observable<ResponseListModel<Role>>{
    let newPath = `${this.apiUrl}/api/roles/getall`;
    return this.httpClient.get<ResponseListModel<Role>>(newPath);
  }
  getUserRoles(userId:number):Observable<ResponseListModel<Role>>{
    let newPath = `${this.apiUrl}/api/roles/getuserroles?userId=${userId}`;
    return this.httpClient.get<ResponseListModel<Role>>(newPath);
  }
  updateRole(role:Role):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/roles/update`;
    return this.httpClient.put<ResponseModel>(newPath,role);
  }
  deleteRole(role:Role):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/roles/delete?roleId=${role.id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
