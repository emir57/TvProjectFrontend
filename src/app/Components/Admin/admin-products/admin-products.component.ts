import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private productService:ProductService,
    private Router:Router
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
  goUpdatePage(product:Product){
    this.Router.navigate(["admindashboard/productupdate",JSON.stringify(product)])
    // routerLink="/admindashboard/productupdate/{{product}}"
  }

}
