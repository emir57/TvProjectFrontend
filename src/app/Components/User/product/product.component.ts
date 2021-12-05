import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrl } from 'src/app/Models/apiUrl';
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



}
