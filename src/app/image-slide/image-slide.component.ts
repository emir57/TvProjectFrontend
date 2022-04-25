import { Component, Input, OnInit } from '@angular/core';
import { ApiUrl } from '../Models/apiUrl';
import { Photo } from '../Models/photo';
import { Product } from '../Models/product';
declare var $: any;
@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.css']
})
export class ImageSlideComponent implements OnInit {

  @Input() carouselId: string;
  @Input() photos: Photo[] = [];
  @Input() productId: number;
  apiUrl = ApiUrl;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.ImageSlide();
    }, 0);
  }
  getImageUrl() {
    return this.apiUrl;
  }
  photocheck(photo: Photo) {
    if (photo.isMain == true) {
      return `carousel-item active photoProduct${this.productId}`
    } else {
      return `carousel-item photoProduct${this.productId}`
    }
  }
  getCarouselId() {
    return `carousel${this.productId}`
  }
  getCarouselButtonId() {
    return `#carousel${this.productId}`
  }

  ImageSlide() {
    setTimeout(() => {
      function photosDisplayNone(photos) {
        for (let i = 0; i < photos.length; i++) {
          photos[i].style.display = "none"
        }
      }
      var photos = $(`.photoProduct${this.productId}`);
      let i = 0;
      photosDisplayNone(photos);
      this.photos.forEach(photo => {
        if (photo.isMain) {
          $(`#photo${photo.id}`).show();
        }
      })
      $(`#productNextBtn${this.productId}`).click(function () {
        i++;
        photosDisplayNone(photos);
        if (i > photos.length - 1) {
          i = 0;
        }
        photos[i].style.display = "block";
      })
      $(`#productPrevBtn${this.productId}`).click(function () {
        i--;
        if (i < 0) {
          i = photos.length - 1;
        }
        photosDisplayNone(photos);
        photos[i].style.display = "block";
      })
    }, 500);
  }
}
