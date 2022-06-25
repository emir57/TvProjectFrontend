import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';
import { ResponseSingleModel } from '../Models/response/responseSingleModel';
import { UserAddress } from '../Models/userAddress';
import { UserAddressCityModel } from '../Models/userAddressCity';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  getAddressesByUserId(userId: number): Observable<ResponseListModel<UserAddressCityModel>> {
    let newPath = `${this.apiUrl}/api/addresses/${userId}`;
    return this.httpClient.get<ResponseListModel<UserAddressCityModel>>(newPath);
  }
  deleteAddress(id: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/addresses/${id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
  getAddress(id: number): Observable<ResponseSingleModel<UserAddressCityModel>> {
    let newPath = `${this.apiUrl}/api/addresses/${id}`;
    return this.httpClient.get<ResponseSingleModel<UserAddressCityModel>>(newPath);
  }
  addAddress(address: UserAddress): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/addresses`;
    return this.httpClient.post<ResponseModel>(newPath, address);
  }
  updateAddress(address: UserAddress): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/addresses`;
    return this.httpClient.put<ResponseModel>(newPath, address);
  }
}
