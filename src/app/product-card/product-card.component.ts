import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductAndPhoto } from '../Models/productAndPhoto';
declare var $: any;

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, AfterViewInit {

  @Input() product: ProductAndPhoto;
  constructor(
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    this.productBuyBtnAnimation();
  }

  ngOnInit(): void {

  }

  goCheckout(product: Product) {
    this.router.navigate(["checkout", product.id])
  }
  goProductDetail(product: Product) {
    this.router.navigate(["product-detail", product.id]);
  }

  productBuyBtnAnimation() {
    const buy_btn = $("#product_buy_btn_" + this.product.id);
    const product_card = $("#product_card_" + this.product.id);

    buy_btn.css("bottom", "0px");
    buy_btn.css("opacity", "0");

    product_card.mouseenter(() => {
      buy_btn.show();
      buy_btn.animate({
        bottom: "10px",
        opacity: 100
      }, 400);
    })

    product_card.mouseleave(() => {
      buy_btn.animate({
        bottom: "0px",
        opacity: "0"
      }, 500);
      buy_btn.hide();
    })

  }

}
