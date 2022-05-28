import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeBoxService {

  constructor() { }

  show(okConfirm: () => void) {
    const box = $("#verifyCode");
    const okButton = $("#verifyCode>button");
    const background = $("#verifyCodeBackground");
    box.fadeIn();
    background.fadeIn();
    background.click(() => {
      box.fadeOut();
      background.fadeOut();
    });
    okButton.click(() => {
      okConfirm();
      box.fadeOut();
      background.fadeOut();
    })
  }
}
