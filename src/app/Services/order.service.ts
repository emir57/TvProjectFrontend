import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { OrderModel } from '../Models/orderModel';
import { ResponseListModel } from '../Models/responseListModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }

  getOrders():Observable<ResponseListModel<OrderModel>>{
    let newPath = `${this.apiUrl}/api/orders/getall`;
    return this.httpClient.get<ResponseListModel<OrderModel>>(newPath);
  }

  getOrdersByUser(id:number):Observable<ResponseListModel<OrderModel>>{
    let newPath = `${this.apiUrl}/api/orders/getbyid/?id=${id}`;
    return this.httpClient.get<ResponseListModel<OrderModel>>(newPath);
  }
}
