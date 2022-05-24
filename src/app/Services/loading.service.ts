import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  showLoading(message?: string, timer?: number) {
    if (message) $("#spinnerDiv > span").html(message);
    $("#spinnerDiv").show();
    $("#spinnerBgDiv").show();
    setTimeout(() => {
      $("#spinnerDiv").hide();
      $("#spinnerBgDiv").hide();
    }, timer ?? 5000);
  }

  closeLoading() {
    $("#spinnerDiv").hide();
    $("#spinnerBgDiv").hide();
  }
}
