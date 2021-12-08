import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Photo } from 'src/app/Models/photo';
import { Product } from 'src/app/Models/product';
import { ProductAndPhoto } from 'src/app/Models/productAndPhoto';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  apiUrl = ApiUrl
  searchString="";
  products: ProductAndPhoto[] = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProducts();
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

      if(param["categoryId"]) {
        this.productService.getProductsByCategory(param["categoryId"])
          .subscribe(response => {
            this.products = response.data;
          })
      } else {
        this.getAllProducts();
      }
    })
  }

  getImageUrl(){
    return this.apiUrl;
  }

  photocheck(photo:Photo){
    if(photo.isMain==true){
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
  }

  getCarouselId(product:Product){
    return `carousel${product.id}`
  }
  getCarouselButtonId(product:Product){
    return `#carousel${product.id}`
  }

  getImages(photos:Photo[]){
    let photosUrl:string[]=[]
    photos.forEach(photo=>photosUrl.push(`${this.apiUrl}${photo.imageUrl}`))
    console.log(photosUrl)
    return photosUrl;
  }



}
