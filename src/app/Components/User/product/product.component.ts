import { Component, OnInit } from '@angular/core';
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

  apiUrl=ApiUrl
  products:ProductAndPhoto[]=[];
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();

  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(response=>{
        this.products=response.data;
        this.products.forEach(product=>product.imageUrl=`${this.apiUrl}${product.imageUrl}`)

      },responseErr=>{
        console.log(responseErr)
      })
  }



}
