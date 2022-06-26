import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { Category } from '../Models/category';
import { CategoryWithCount } from '../Models/categoryWithCount';
import { CategoryWithPriceAverage } from '../Models/categoryWithPriceAverage';
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
    let newPath = `${this.apiUrl}/api/tvbrands`;
    return this.httpClient.get<ResponseListModel<Category>>(newPath);
  }
  getAllWithCount(): Observable<ResponseListModel<CategoryWithCount>> {
    let newPath = `${this.apiUrl}/api/tvbrands/getallwithcount`;
    return this.httpClient.get<ResponseListModel<CategoryWithCount>>(newPath);
  }
  getAllWithPriceAverage(): Observable<ResponseListModel<CategoryWithPriceAverage>> {
    let newPath = `${this.apiUrl}/api/tvbrands/getallwithpriceaverage`;
    return this.httpClient.get<ResponseListModel<CategoryWithPriceAverage>>(newPath);
  }
  getCategoryById(id: number): Observable<ResponseSingleModel<Category>> {
    let newPath = `${this.apiUrl}/api/tvbrands/${id}`;
    return this.httpClient.get<ResponseSingleModel<Category>>(newPath);
  }
  addCategory(categoryModel: Category): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvbrands`;
    return this.httpClient.post<ResponseModel>(newPath, categoryModel);
  }
  updateCategory(categoryModel: Category): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvbrands`;
    return this.httpClient.put<ResponseModel>(newPath, categoryModel);
  }
  deleteCategory(categoryId: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/tvbrands/${categoryId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
