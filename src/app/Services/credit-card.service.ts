import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { ResponseModel } from '../Models/responseModel';
import { UserCreditCard } from '../Models/userCreditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl=ApiUrl
  constructor(
    private httpClient:HttpClient
  ) { }
  add(creditCardModel:UserCreditCard):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/creditcards/add`;
    return this.httpClient.post<ResponseModel>(newPath,creditCardModel);
  }
  delete(creditCardId:number):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/creditcards/delete?id=${creditCardId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
