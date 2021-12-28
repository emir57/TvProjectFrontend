import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { City } from '../Models/city';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';
import { ResponseSingleModel } from '../Models/responseSingleModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl=ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }
  getCities():Observable<ResponseListModel<City>>{
    let newPath = `${this.apiUrl}/api/cities/getall`;
    return this.httpClient.get<ResponseListModel<City>>(newPath);
  }
  getCity(id:number):Observable<ResponseSingleModel<City>>{
    let newPath = `${this.apiUrl}/api/cities/getbyId?id=${id}`;
    return this.httpClient.get<ResponseSingleModel<City>>(newPath);
  }
  updateCity(city:City):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/cities/update`;
    return this.httpClient.put<ResponseModel>(newPath,city);
  }
  addCity(city:City):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/cities/add`;
    return this.httpClient.post<ResponseModel>(newPath,city);
  }
  deleteCity(id:number):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/cities/delete?cityId=${id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}