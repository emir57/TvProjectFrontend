import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  showLoading(){
    $("#spinnerDiv").show();
    $("#spinnerBgDiv").show();
  }

  closeLoading(){
    $("#spinnerDiv").hide();
    $("#spinnerBgDiv").hide();
  }
}
