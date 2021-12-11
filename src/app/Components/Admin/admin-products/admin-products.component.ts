import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products:Product[]=[];
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response=>{
      if(response.isSuccess){
        this.products = response.data;
      }
    })
  }

  isDiscount(product:Product){
    if(product.isDiscount){
      return "text-success";
    }else{
      return "text-danger"
    }
  }

}
