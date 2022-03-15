import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { CategoryModule } from './category/category.module';
import { CheckoutModule } from './checkout/checkout.module';
import { FooterModule } from './footer/footer.module';
import { ForgotpasswordModule } from './forgotpassword/forgotpassword.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { RegisterModule } from './register/register.module';
import { ResetpasswordModule } from './resetpassword/resetpassword.module';
import { DiscountModule } from 'src/app/pipes/discount/discount.module';
import { ProductsearchModule } from 'src/app/pipes/productsearch/productsearch.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CategoryModule,
    CheckoutModule,
    FooterModule,
    ForgotpasswordModule,
    HomeModule,
    LoginModule,
    NavbarModule,
    ProductModule,
    ProfileModule,
    RegisterModule,
    ResetpasswordModule,
  ], exports: [
    CategoryModule,
    CheckoutModule,
    FooterModule,
    ForgotpasswordModule,
    HomeModule,
    LoginModule,
    NavbarModule,
    ProductModule,
    ProfileModule,
    RegisterModule,
    ResetpasswordModule
  ]
})
export class UserModule { }
