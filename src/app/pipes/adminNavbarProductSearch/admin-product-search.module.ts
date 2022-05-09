import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductSearchPipe } from './admin-product-search.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminProductSearchPipe
  ], exports: [
    AdminProductSearchPipe
  ]
})
export class AdminProductSearchModule { }
