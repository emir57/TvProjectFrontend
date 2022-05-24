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
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Models/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  selectedAddress: UserAddressCityModel;
  selectedCreditCard: CreditCardWithUser;
  userId: number = +sessionStorage.getItem("user")
  product: Product;
  addresses: UserAddressCityModel[];
  userCreditCards: CreditCardWithUser[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private addressService: AddressService,
    private creditCardService: CreditCardService,
    private orderService: OrderService,
    private toastrService: ToastrService
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
  getAddresses() {
    this.addressService.getAddressesByUserId(this.userId).subscribe(response => {
      if (response.isSuccess) {
        this.addresses = response.data;
      }
    })
  }
  getCreditCards() {
    this.creditCardService.getUserCreditCards(this.userId).subscribe(response => {
      if (response.isSuccess) {
        this.userCreditCards = response.data;
      }
    })
  }

  activedAddress(address: UserAddressCityModel) {
    this.selectedAddress = address;
  }
  getAddressClass(address: UserAddressCityModel) {
    if (this.selectedAddress == address) {
      return "addressActive";
    } else {
      return "addressDeActive";
    }
  }
  activedCreditCard(card: CreditCardWithUser) {
    this.selectedCreditCard = card;
  }
  getCreditCardClass(card: CreditCardWithUser) {
    if (this.selectedCreditCard == card) {
      return "cardActive";
    } else {
      return "cardDeActive";
    }
  }

  completeCheckOut() {
    if (this.selectedAddress && this.selectedCreditCard) {
      let totalPrice = this.product.unitPrice;
      if (this.product.isDiscount) {
        totalPrice = this.product.unitPrice * (100 / this.product.discount);
      }
      let order: Order = {
        userId: this.userId,
        tvId: this.product.id,
        addressId: this.selectedAddress.id,
        totalPrice: totalPrice
      }
      this.orderService.add(order).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
        }else{
          this.toastrService.error(response.message);
        }
      }, responseErr => {
        console.log(responseErr)
        // this.toastrService.error(response.message);
      })
    }
  }

  checkSelected() {
    if (this.selectedAddress && this.selectedCreditCard) {
      return false;
    }
    else {
      return true;
    }
  }


  getYear(date: string) {
    return this.creditCardService.getYear(date);
  }
  getDay(date: string) {
    return this.creditCardService.getDay(date);
  }
  getFirstName(firstName: string) {
    return this.creditCardService.getFirstName(firstName);
  }
  getLastName(lastName: string) {
    return this.creditCardService.getLastName(lastName);
  }
  getCvv(cvv: string) {
    return this.creditCardService.getCvv(cvv);
  }
  getCreditCardNumber(number: string) {
    return this.creditCardService.getCreditCardNumber(number);
  }


}
