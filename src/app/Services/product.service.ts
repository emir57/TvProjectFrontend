import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }
    getProducts():Observable<any>{
      let newPath = `${this.apiUrl}/tvs/getall`;
    }

}
