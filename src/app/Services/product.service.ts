import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Product } from '../Models/product';
import { ProductAndPhoto } from '../Models/productAndPhoto';
import { ResponseListModel } from '../Models/responseListModel';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }
    getProducts():Observable<ResponseListModel<ProductAndPhoto>>{
      let newPath = `${this.apiUrl}/api/tvs/gettvdetail`;
      return this.httpClient.get<ResponseListModel<ProductAndPhoto>>(newPath);
    }
    getProductsByCategory(id:number):Observable<ResponseListModel<ProductAndPhoto>>{
      let newPath = `${this.apiUrl}/api/tvs/getbycategoryid?id=${id}`;
      return this.httpClient.get<ResponseListModel<ProductAndPhoto>>(newPath);
    }
    addProduct(product:Product):Observable<ResponseModel>{
      let newPath = `${this.apiUrl}/api/tvs/add`;
      return this.httpClient.post<ResponseModel>(newPath,product);
    }
    updateProduct(product:Product):Observable<ResponseModel>{
      let newPath = `${this.apiUrl}/api/tvs/update`;
      return this.httpClient.put<ResponseModel>(newPath,product);
    }
    deleteProduct(product:Product):Observable<ResponseModel>{
      let newPath = `${this.apiUrl}/api/tvs/delete/?tvId=${product.id}`;
      return this.httpClient.delete<ResponseModel>(newPath);
    }

}
