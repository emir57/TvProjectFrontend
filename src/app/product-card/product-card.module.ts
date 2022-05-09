import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { ImageSlideModule } from '../image-slide/image-slide.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ImageSlideModule
  ], exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
