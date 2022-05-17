import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductAndPhoto } from 'src/app/Models/productAndPhoto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: ProductAndPhoto;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.activatedRoute.params.subscribe(param => {
      if (param["product"]) {
        this.product = JSON.parse(param["product"]);
        console.log(this.product)
      }
    })
  }

}
