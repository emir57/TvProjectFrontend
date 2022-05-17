import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSlideModule } from 'src/app/image-slide/image-slide.module';
import { ProductDetailComponent } from './product-detail.component';
import { DiscountModule } from 'src/app/pipes/discount/discount.module';



@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ImageSlideModule,
    DiscountModule
  ]
})
export class ProductDetailModule { }
