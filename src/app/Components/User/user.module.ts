import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { UserComponent } from "./user.component";
import { ProductDetailModule } from './product-detail/product-detail.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserComponent
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
    ProductDetailModule,
    RouterModule
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
    ResetpasswordModule,
    ProductDetailModule
  ]
})
export class UserModule { }
