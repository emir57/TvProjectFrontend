import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  showLoading(message?: string, timer?: number) {
    let i = 0;
    let messageHtml = message ?? "Yükleniyor";
    let messageHtmlDot = messageHtml;
    $("#spinnerDiv > span").html(messageHtmlDot);
    var interval = setInterval(() => {
      messageHtmlDot += ".";
      $("#spinnerDiv > span#spinnerText").html(messageHtmlDot);
      i++;
      if (i === 3) {
        messageHtmlDot = messageHtml;
        i = 0;
      }
    }, 400)
    $("#spinnerDiv").show();
    $("#spinnerBgDiv").show();
    setTimeout(() => {
      $("#spinnerDiv").hide();
      $("#spinnerBgDiv").hide();
      clearInterval(interval);
    }, timer ?? 5000);
  }

  closeLoading() {
    $("#spinnerDiv").hide();
    $("#spinnerBgDiv").hide();
  }
}
