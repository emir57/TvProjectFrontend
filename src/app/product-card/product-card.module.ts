import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { ImageSlideModule } from '../image-slide/image-slide.module';
import { DiscountModule } from '../pipes/discount/discount.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ImageSlideModule,
    DiscountModule,
  ], exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
