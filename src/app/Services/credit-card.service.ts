import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { CreditCardWithUser } from '../Models/creditCardWithUser';
import { ResponseListModel } from '../Models/responseListModel';
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
  getUserCreditCards(userId:number):Observable<ResponseListModel<CreditCardWithUser>>{
    let newPath = `${this.apiUrl}/api/creditcards/getallbyuserid?userId=${userId}`;
    return this.httpClient.get<ResponseListModel<CreditCardWithUser>>(newPath);
  }
  add(creditCardModel:UserCreditCard):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/creditcards/add`;
    return this.httpClient.post<ResponseModel>(newPath,creditCardModel);
  }
  delete(creditCardId:number):Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/api/creditcards/delete?id=${creditCardId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
