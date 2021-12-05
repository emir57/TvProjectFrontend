import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Category } from '../Models/category';
import { ResponseListModel } from '../Models/responseListModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl=ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }

  getCategories():Observable<ResponseListModel<Category>>{
    let newPath = `${this.apiUrl}/api/tvbrands/getall`;
    return this.httpClient.get<ResponseListModel<Category>>(newPath);
  }
}
