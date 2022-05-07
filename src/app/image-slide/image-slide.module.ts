import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSlideComponent } from './image-slide.component';



@NgModule({
  declarations: [ImageSlideComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ImageSlideComponent
  ]
})
export class ImageSlideModule { }
