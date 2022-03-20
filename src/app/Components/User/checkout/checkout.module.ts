import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { NavbarModule } from '../navbar/navbar.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DiscountModule } from 'src/app/pipes/discount/discount.module';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NavbarModule,
    DiscountModule
  ]
})
export class CheckoutModule { }
