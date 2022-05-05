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
    this.activatedRoute.params.subscribe(param => {
      if (param["categoryId"]) {
        this.productService.getProductsByCategory(param["categoryId"])
          .subscribe(response => {
            this.products = response.data;
          }, err => { },
            () => {
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
  increasedPrice() {
    this.setAnimations($("#productIncrease"), "text-warning");
    this.products = this.products.sort((x, y) => x.unitPrice - y.unitPrice);
  }
  decreasingPrice() {
    this.setAnimations($("#productDecrease"), "text-warning");
    this.products = this.products.sort((x, y) => y.unitPrice - x.unitPrice);
  }

  goCheckout(product: Product) {
    this.router.navigate(["checkout", product.id])
  }

  setAnimations(element: any, className: string) {
    element.addClass(className);
    setTimeout(() => {
      element.removeClass(className);
    }, 1000);
    setTimeout(() => {
      this.setAnimations(element, className);
    }, 1500);
  }

}
