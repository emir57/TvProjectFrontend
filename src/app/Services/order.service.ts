import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Order } from '../Models/order';
import { OrderModel } from '../Models/orderModel';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  getOrders(): Observable<ResponseListModel<OrderModel>> {
    let newPath = `${this.apiUrl}/api/orders/getall`;
    return this.httpClient.get<ResponseListModel<OrderModel>>(newPath);
  }

  getOrdersByUser(id: number): Observable<ResponseListModel<OrderModel>> {
    let newPath = `${this.apiUrl}/api/orders/getbyid/?id=${id}`;
    return this.httpClient.get<ResponseListModel<OrderModel>>(newPath);
  }
  deleteOrder(id: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/orders/delete/?id=${id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
