import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  productsIsLoad = true;
  currentPage = 1;
  totalPage = [];
  apiUrl = ApiUrl
  searchString = "";
  products: ProductAndPhoto[] = [];
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getAllProducts() {
    this.productService.getProducts(1)
      .subscribe(response => {
        this.products = response.data;
        for (let i = 0; i < response.totalPage; i++) {
          this.totalPage.push(i);
        }
        this.productsIsLoad = true;
      }, responseErr => {
        console.log(responseErr)
      }, () => {
      })
  }
  getProductsByPage(page: number) {
    this.currentPage = page;
    this.productService.getProducts(page)
      .subscribe(response => {
        this.products = response.data;
        window.scrollTo(0, 350)
      }, responseErr => {
        console.log(responseErr)
      })
  }

  getProducts() {
    this.productsIsLoad = false;
    this.activatedRoute.params.subscribe(param => {
      if (param["categoryId"]) {
        this.productService.getProductsByCategory(param["categoryId"])
          .subscribe(response => {
            this.products = response.data;
            setTimeout(() => {
              this.productsIsLoad = true;
            }, 500);
          }, err => {},
            () => {
            })
      } else {
        this.getAllProducts();
        setTimeout(() => {
          this.productsIsLoad = true;
        }, 500);
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
  increasedPrice() {
    console.log("artan")
    this.products = this.products.sort((x, y) => x.unitPrice - y.unitPrice);
  }
  decreasingPrice() {
    this.products = this.products.sort((x, y) => y.unitPrice - x.unitPrice);
  }

  goCheckout(product: Product) {
    this.router.navigate(["checkout", product.id])
  }

}
