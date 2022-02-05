import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Category } from 'src/app/Models/category';
import { Photo } from 'src/app/Models/photo';
import { Product } from 'src/app/Models/product';
import { ProductAndPhoto } from 'src/app/Models/productAndPhoto';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

import $ from 'jquery';
import { style } from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  apiUrl = ApiUrl
  searchString = "";
  products: ProductAndPhoto[] = [];
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();

    setTimeout(() => {
      this.products.forEach(product=>{
        var photos = $(`.photoProduct${product.id}`);
        let i = 0;
        for (let i = 0; i < photos.length; i++) {
          photos[i].style.display="none"
        }
        product.photos.forEach(photo=>{
          if(photo.isMain){
            $(`#photo${photo.id}`).show();
          }
        })
        $(`#productNextBtn${product.id}`).click(function(){
          i++;
          for (let j = 0; j < photos.length; j++) {
            photos[j].style.display="none"
          }
          if(i > photos.length-1){
            i=0;
          }
          photos[i].style.display="block";
        })
        $(`#productPrevBtn${product.id}`).click(function(){
          i--;
          if(i < 0){
            i = photos.length-1;
          }
          for (let j = 0; j < photos.length; j++) {
            photos[j].style.display="none"
          }
          photos[i].style.display="block";
        })

      })
    }, 1000);
  }

  getAllProducts() {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response.data;
      }, responseErr => {
        console.log(responseErr)
      })
  }

  getProducts() {
    this.activatedRoute.params.subscribe(param => {
      if (param["categoryId"]) {
        this.productService.getProductsByCategory(param["categoryId"])
          .subscribe(response => {
            this.products = response.data;
          })
      } else {
        this.getAllProducts();
      }
    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
  }
  getImageUrl() {
    return this.apiUrl;
  }
  getImagesForSlider(photos: Photo[]) {
    let returnPhotos: Array<object> = [];
    photos.forEach(photo => {
      returnPhotos.push({
        image: `${this.apiUrl}${photo.imageUrl}`,
        thumbImage: `${this.apiUrl}${photo.imageUrl}`,
        alt: 'Image 1',
        title: 'Image 1'
      })
    })
    return returnPhotos;
  }

  photocheck(photo: Photo,product:Product) {
    if (photo.isMain == true) {
      return `carousel-item active photoProduct${product.id}`
    } else {
      return `carousel-item photoProduct${product.id}`
    }
  }

  getCarouselId(product: Product) {
    return `carousel${product.id}`
  }
  getCarouselButtonId(product: Product) {
    return `#carousel${product.id}`
  }

  getImages(photos: Photo[]) {
    let photosUrl: string[] = []
    photos.forEach(photo => photosUrl.push(`${this.apiUrl}${photo.imageUrl}`))
    console.log(photosUrl)
    return photosUrl;
  }

  increasedPrice() {
    console.log("artan")
    this.products = this.products.sort((x, y) => x.unitPrice - y.unitPrice);
  }
  decreasingPrice() {
    this.products = this.products.sort((x, y) => y.unitPrice - x.unitPrice);
  }




}
