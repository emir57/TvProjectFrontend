import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../Models/apiUrl';
import { CreditCardWithUser } from '../Models/creditCardWithUser';
import { ResponseListModel } from '../Models/response/responseListModel';
import { ResponseModel } from '../Models/response/responseModel';
import { UserCreditCard } from '../Models/userCreditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = ApiUrl
  constructor(
    private httpClient: HttpClient
  ) { }
  getUserCreditCards(userId: number): Observable<ResponseListModel<CreditCardWithUser>> {
    let newPath = `${this.apiUrl}/api/users/${userId}/creditcards`;
    return this.httpClient.get<ResponseListModel<CreditCardWithUser>>(newPath);
  }
  add(creditCardModel: UserCreditCard): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/creditcards`;
    return this.httpClient.post<ResponseModel>(newPath, creditCardModel);
  }
  delete(creditCardId: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/api/creditcards/${creditCardId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  getYear(date: string) {
    let year = date.split("/")[1];
    year = "*" + year.substring(1, 2)
    return year;
  }
  getDay(date: string) {
    let day = date.split("/")[0];
    day = day.substring(0, 1) + "*"
    return day;
  }
  getFirstName(firstName: string) {
    return firstName.substring(0, 1) + "***";
  }
  getLastName(lastName: string) {
    return lastName.substring(0, 1) + "***";
  }
  getCvv(cvv: string) {
    return cvv.substring(0, 1) + "**";
  }
  getCreditCardNumber(number: string) {
    return number.substring(0, 4) + " " + "**** **** **" + number.substring(14, 16);
  }
}
