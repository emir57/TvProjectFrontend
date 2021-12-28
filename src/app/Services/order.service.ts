import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Order } from '../Models/order';
import { OrderModel } from '../Models/orderModel';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }

  getOrders():Observable<ResponseListModel<Order>>{
    let newPath = `${this.apiUrl}/api/orders/getall`;
    return this.httpClient.get<ResponseListModel<Order>>(newPath);
  }

  getOrdersByUser(id:number):Observable<ResponseListModel<OrderModel>>{
    let newPath = `${this.apiUrl}/api/orders/getbyid/?id=${id}`;
    return this.httpClient.get<ResponseListModel<OrderModel>>(newPath);
  }
  deleteOrder(id:number):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/orders/delete/?id=${id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
