import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Product } from '../Models/product';
import { ResponseListModel } from '../Models/responseListModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }
    getProducts():Observable<ResponseListModel<Product>>{
      let newPath = `${this.apiUrl}/tvs/getall`;
      return this.httpClient.get<ResponseListModel<Product>>(newPath);
    }

}
