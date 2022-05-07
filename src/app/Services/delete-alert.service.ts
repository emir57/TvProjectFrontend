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
    $("#deleteBoxText").html(bodyText)

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
