import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Category } from '../Models/category';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';
import { ResponseSingleModel } from '../Models/response/responseSingleModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(): Observable<ResponseListModel<Category>> {
    let newPath = `${this.apiUrl}/api/tvbrands/getall`;
    return this.httpClient.get<ResponseListModel<Category>>(newPath);
  }
  getCategoryById(id: number): Observable<ResponseSingleModel<Category>> {
    let newPath = `${this.apiUrl}/api/tvbrands/getbyid?id=${id}`;
    return this.httpClient.get<ResponseSingleModel<Category>>(newPath);
  }
  addCategory(categoryModel: Category): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvbrands/add`;
    return this.httpClient.post<ResponseModel>(newPath, categoryModel);
  }
  updateCategory(categoryModel: Category): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvbrands/update`;
    return this.httpClient.put<ResponseModel>(newPath, categoryModel);
  }
  deleteCategory(categoryId: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvbrands/delete/?tvBrandId=${categoryId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
