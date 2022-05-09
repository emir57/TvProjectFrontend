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

    deleteBox.fadeIn(100);
    deleteBox.animate({
      opacity: 100,
      top: "10%"
    }, 400);

    deleteBoxBackground.fadeIn();
    deleteBoxText.html(bodyText);

    deleteBoxClose.click(function () {
      deleteBox.animate({
        opacity: 0,
        top: "5%"
      }, 400);
      deleteBox.fadeOut(500);
      deleteBoxBackground.fadeOut();
      errorCallBack();
    })
    deleteBoxBackground.click(function () {
      {
        deleteBox.animate({
          left: "+=5px"
        }, 100);
        setTimeout(() => {
          deleteBox.animate({
            left: "-=10px"
          }, 100);
        }, 100);
        setTimeout(() => {
          deleteBox.animate({
            left: "+=5px"
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

  deleteBoxNotCloseAnimation() {

  }
}
