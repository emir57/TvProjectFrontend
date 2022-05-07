import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DeleteAlertService {

  constructor() { }

  showAlertBox(bodyText: string, successCallBack: () => void, errorCallBack: () => void) {
    $("#deleteBox").fadeIn();
    $("#deleteBoxBackground").fadeIn();
    let text = `
    ${order.tv.productName}
    <br>
    Bu siparişi iptal etmek istediğinizden emin misiniz?
    `;
    text = bodyText;
    $("#deleteBoxText").html(text)

    $(".deleteBoxClose").click(function () {
      $("#deleteBox").fadeOut();
      $("#deleteBoxBackground").fadeOut();
      errorCallBack();
    })
    $("#deleteBoxBackground").click(function () {
      $("#deleteBox").fadeOut();
      $("#deleteBoxBackground").fadeOut();
      successCallBack();
    })
  }
}
