import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSlideModule } from 'src/app/image-slide/image-slide.module';
import { ProductDetailComponent } from './product-detail.component';



@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ImageSlideModule
  ]
})
export class ProductDetailModule { }
