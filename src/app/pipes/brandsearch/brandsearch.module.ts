import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandSearchPipe } from './brand-search.pipe';



@NgModule({
  declarations: [
    BrandSearchPipe
  ],
  imports: [
    CommonModule
  ],exports:[
    BrandSearchPipe
  ]
})
export class BrandsearchModule { }
