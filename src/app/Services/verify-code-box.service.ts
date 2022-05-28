import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeBoxService {

  constructor() { }

  show(okConfirm: (code) => void) {
    const box = $("#verifyCode");
    const okButton = $("#verifyOkButton");
    const codeInput = $("#verifyCode>input");
    const background = $("#verifyCodeBackground");
    box.fadeIn();
    background.fadeIn();
    background.click(() => {
      box.fadeOut();
      background.fadeOut();
    });
    okButton.click(() => {
      okConfirm(codeInput.val());
      box.fadeOut();
      background.fadeOut();
    })
  }
}
