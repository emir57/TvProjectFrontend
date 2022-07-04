import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Product } from '../Models/product';
import { ProductAndPhoto } from '../Models/productAndPhoto';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';
import { ResponseSingleModel } from '../Models/response/responseSingleModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient
  ) { }
  getProduct(id: number): Observable<ResponseSingleModel<Product>> {
    let newPath = `${this.apiUrl}/api/tvs/get/?id=${id}`;
    return this.httpClient.get<ResponseSingleModel<Product>>(newPath);
  }
  getProducts(page: number): Observable<ResponseListModel<ProductAndPhoto>> {
    let newPath = `${this.apiUrl}/api/tvs/gettvdetail?page=${page}`;
    return this.httpClient.get<ResponseListModel<ProductAndPhoto>>(newPath);
  }
  getProductsByCategory(id: number): Observable<ResponseListModel<ProductAndPhoto>> {
    let newPath = `${this.apiUrl}/api/tvs/getbycategoryid?id=${id}`;
    return this.httpClient.get<ResponseListModel<ProductAndPhoto>>(newPath);
  }
  addProduct(product: Product): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvs`;
    return this.httpClient.post<ResponseModel>(newPath, product);
  }
  updateProduct(product: Product): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvs`;
    return this.httpClient.put<ResponseModel>(newPath, product);
  }
  deleteProduct(product: Product): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvs/delete/${product.id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }

}
