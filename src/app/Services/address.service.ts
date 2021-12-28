import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';
import { ResponseSingleModel } from '../Models/responseSingleModel';
import { UserAddress } from '../Models/userAddress';
import { UserAddressCityModel } from '../Models/userAddressCity';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl=ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }

  getAddressesByUserId(userId:number):Observable<ResponseListModel<UserAddressCityModel>>{
    let newPath = `${this.apiUrl}/api/addresses/getall?userId=${userId}`;
    return this.httpClient.get<ResponseListModel<UserAddressCityModel>>(newPath);
  }
  deleteAddress(id:number):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/addresses/delete?id=${id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
  getAddress(id:number):Observable<ResponseSingleModel<UserAddressCityModel>>{
    let newPath = `${this.apiUrl}/api/addresses/getbyid?id=${id}`;
    return this.httpClient.get<ResponseSingleModel<UserAddressCityModel>>(newPath);
  }
  updateAddress(address:UserAddress):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/addresses/update`;
    return this.httpClient.put<ResponseModel>(newPath,address);
  }
}
