import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { ProductAndPhoto } from 'src/app/Models/productAndPhoto';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  otherProducts: Product[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.activatedRoute.params.subscribe(param => {
      if (param["product"]) {
        this.productService.getProduct(param["product"]).subscribe(response => {
          if (response.isSuccess) {
            this.product = response.data;
            this.getOtherProducts();
          }
        })
      }
    })
  }

  getOtherProducts() {
    this.productService.getProductsByCategory(this.product.brandId).subscribe(response => {
      if (response.isSuccess) {
        this.otherProducts = response.data;
        console.log(this.otherProducts)
      }
    })
  }

  goBuyPage() {
    this.router.navigate(["checkout", this.product.id]);
  }

}
