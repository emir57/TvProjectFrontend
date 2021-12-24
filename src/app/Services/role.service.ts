import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ResponseListModel } from '../Models/responseListModel';
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
}
