import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'cluster';
import { Product } from 'src/app/Models/product';
import { UserAddressCityModel } from 'src/app/Models/userAddressCity';
import { AddressService } from 'src/app/Services/address.service';
import { CreditCardService } from 'src/app/Services/credit-card.service';
import { ProductService } from 'src/app/Services/product.service';
import $ from "jquery"
import { UserCreditCard } from 'src/app/Models/userCreditCard';
import { CreditCardWithUser } from 'src/app/Models/creditCardWithUser';

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
  userCreditCards:CreditCardWithUser[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private addressService: AddressService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getAddresses();
    this.getCreditCards();
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
  getCreditCards(){
    this.creditCardService.getUserCreditCards(this.userId).subscribe(response=>{
      if(response.isSuccess){
        this.userCreditCards = response.data;
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


  getYear(date:string){
    let year = date.split("/")[1];
    year = "*"+year.substring(1,2)
    return year;
  }
  getDay(date:string){
    let day = date.split("/")[0];
    day = day.substring(0,1)+"*"
    return day;
  }
  getFirstName(firstName:string){
    return firstName.substring(0,1)+"***";
  }
  getLastName(lastName:string){
    return lastName.substring(0,1)+"***";
  }
  getCvv(cvv:string){
    return cvv.substring(0,1)+"**";
  }
  getCreditCardNumber(number:string){
    return number.substring(0,4)+" "+"**** **** **"+number.substring(14,16);
  }


}
