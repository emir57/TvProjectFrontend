import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';
import $ from "jquery";
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  searchString:string="";
  products:Product[]=[];
  selectedProduct:Product;
  constructor(
    private productService:ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts(-1).subscribe(response=>{
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
    // this.selectedProduct = product;
    // $("#updatePage").fadeIn();
    // $("#updatePageBackground").fadeIn();
    // $("#updatePageBackground").click(function(){
    //   $("#updatePageBackground").fadeOut();
    //   $("#updatePage").fadeOut();
    // })
    this.router.navigate(["admindashboard/productupdate",product.id])
    // this.router.navigate(["admindashboard/productupdate",JSON.stringify(product)])
    // routerLink="/admindashboard/productupdate/{{product}}"
  }

  checkDiscount(product:Product){
    if(product.isDiscount){
      return "Evet";
    }
    return "Hayır"
  }

}
