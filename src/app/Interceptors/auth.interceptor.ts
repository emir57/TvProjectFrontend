import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let localToken = localStorage.getItem("token");
    let sessionToken = sessionStorage.getItem("token");
    let token = "";
    if(localToken){
      token = localToken
    }else if(sessionToken){
      token = sessionToken;
    }
    let newRequest = request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    })
    return next.handle(newRequest);
  }
}
