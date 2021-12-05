import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Product } from '../Models/product';
import { ProductAndPhoto } from '../Models/productAndPhoto';
import { ResponseListModel } from '../Models/responseListModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }
    getProducts():Observable<ResponseListModel<ProductAndPhoto>>{
      let newPath = `${this.apiUrl}/api/tvs/getall`;
      return this.httpClient.get<ResponseListModel<ProductAndPhoto>>(newPath);
    }

}
