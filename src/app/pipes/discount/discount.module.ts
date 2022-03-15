import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from './discount.pipe';



@NgModule({
  declarations: [
    DiscountPipe
  ],
  imports: [
    CommonModule
  ],exports:[
    DiscountPipe
  ]
})
export class DiscountModule { }
