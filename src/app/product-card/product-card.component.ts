import { Component, Input, OnInit } from '@angular/core';
import { ProductAndPhoto } from '../Models/productAndPhoto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductAndPhoto;
  constructor() { }

  ngOnInit(): void {
  }

}
