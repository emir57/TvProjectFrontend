import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DeleteAlertService {

  constructor() { }

  showAlertBox(bodyText: string, successCallBack: () => void, errorCallBack: () => void) {
    const deleteBox = $("#deleteBox");
    const deleteBoxBackground = $("#deleteBoxBackground");
    const deleteBoxText = $("#middle");
    const deleteBoxClose = $(".closeButton");
    const deleteBoxBtn = $("#deleteBoxBtn");

    deleteBoxText.html(bodyText);

    deleteBox.fadeIn();
    deleteBox.css("top","10%");
    deleteBoxBackground.fadeIn();

    deleteBoxClose.click(function () {
      deleteBox.css("top","5%");
      deleteBox.fadeOut();
      deleteBoxBackground.fadeOut();
      errorCallBack();
    })
    deleteBoxBackground.click(function () {
      {
        deleteBox.animate({
          left: "+=2px"
        }, 100);
        setTimeout(() => {
          deleteBox.animate({
            left: "-=4px"
          }, 100);
        }, 100);
        setTimeout(() => {
          deleteBox.animate({
            left: "+=2px"
          }, 100);
        }, 100);
      }
    })
    deleteBoxBtn.click(function () {
      deleteBox.fadeOut();
      deleteBoxBackground.fadeOut();
      successCallBack();
    })
  }
}
