import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductAndPhoto } from '../Models/productAndPhoto';
declare var $: any;

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductAndPhoto;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goCheckout(product: Product) {
    this.router.navigate(["checkout", product.id])
  }

  productBuyBtnAnimation() {

  }

}
