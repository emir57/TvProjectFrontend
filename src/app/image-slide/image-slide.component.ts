import { Component, Input, OnInit } from '@angular/core';
import { ApiUrl } from '../Models/apiUrl';
import { Photo } from '../Models/photo';
import { Product } from '../Models/product';
declare var $: any;
@Component({
  selector: 'image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.css']
})
export class ImageSlideComponent implements OnInit {

  @Input() carouselId: string;
  @Input() photos: Photo[] = [];
  @Input() product: Product;
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
      return `carousel-item active photoProduct${this.product.id}`
    } else {
      return `carousel-item photoProduct${this.product.id}`
    }
  }
  getCarouselId() {
    return `carousel${this.product.id}`
  }
  getCarouselButtonId() {
    return `#carousel${this.product.id}`
  }

  ImageSlide() {
    setTimeout(() => {
      function photosDisplayNone(photos) {
        for (let i = 0; i < photos.length; i++) {
          photos[i].style.display = "none"
        }
      }
      var photos = $(`.photoProduct${this.product.id}`);
      let i = 0;
      photosDisplayNone(photos);
      this.photos.forEach(photo => {
        if (photo.isMain) {
          $(`#photo${photo.id}`).show();
        }
      })
      $(`#productNextBtn${this.product.id}`).click(function () {
        i++;
        photosDisplayNone(photos);
        if (i > photos.length - 1) {
          i = 0;
        }
        photos[i].style.display = "block";
      })
      $(`#productPrevBtn${this.product.id}`).click(function () {
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
