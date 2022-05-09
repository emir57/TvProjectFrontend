import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductSearchPipe } from './admin-product-search.pipe';



@NgModule({
  declarations: [
    AdminProductSearchPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    AdminProductSearchPipe
  ]
})
export class AdminProductSearchModule { }
