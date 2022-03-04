import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'cluster';
import { Product } from 'src/app/Models/product';
import { UserAddressCityModel } from 'src/app/Models/userAddressCity';
import { AddressService } from 'src/app/Services/address.service';
import { CreditCardService } from 'src/app/Services/credit-card.service';
import { ProductService } from 'src/app/Services/product.service';
import $ from "jquery"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  selectedAddress:UserAddressCityModel;
  userId: number = +sessionStorage.getItem("user")
  product: Product;
  addresses: UserAddressCityModel[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private addressService: AddressService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getAddresses();
  }

  getProduct() {
    this.activatedRoute.params.subscribe(param => {
      if (param["productId"]) {
        this.productService.getProduct(param["productId"]).subscribe(response => {
          if (response.isSuccess) {
            this.product = response.data;
          }
        })
      }
    })
  }
  getAddresses(){
    this.addressService.getAddressesByUserId(this.userId).subscribe(response=>{
      if(response.isSuccess){
        this.addresses = response.data;
      }
    })
  }

  activedAddress(address:UserAddressCityModel){
    this.selectedAddress = address;
  }
  getAddressClass(address:UserAddressCityModel){
    if(this.selectedAddress == address){
      return "addressActive";
    }else{
      return "addressDeActive";
    }
  }


}
