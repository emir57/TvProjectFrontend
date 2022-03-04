import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  product:Product;
  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      if(param["productId"]){
        this.productService.getProduct(param["productId"]).subscribe(response=>{
          if(response.isSuccess){
            this.product = response.data;
          }
        })
      }
    })
  }

}
