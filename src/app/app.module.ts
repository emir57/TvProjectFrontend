import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DiscountPipe } from './pipes/discount/discount.pipe';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductSearchPipe } from './pipes/productsearch/product-search.pipe';
import { SliderModule } from 'angular-image-slider';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminLeftnavComponent } from './Components/Admin/admin-leftnav/admin-leftnav.component';
import { AdminNavbarComponent } from './Components/Admin/admin-navbar/admin-navbar.component';
import { AdminProductsComponent } from './Components/Admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './Components/Admin/admin-orders/admin-orders.component';
import { AdminCustomersComponent } from './Components/Admin/admin-customers/admin-customers.component';
import { AdminBrandsComponent } from './Components/Admin/admin-brands/admin-brands.component';
import { AdminProductAddComponent } from './Components/Admin/admin-product-add/admin-product-add.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AdminProductUpdateComponent } from './Components/Admin/admin-product-update/admin-product-update.component';
import { AdminUploadimageComponent } from './Components/Admin/admin-uploadimage/admin-uploadimage.component';
import { AdminCategoryUpdateComponent } from './Components/Admin/admin-category-update/admin-category-update.component';
import { AdminCategoryAddComponent } from './Components/Admin/admin-category-add/admin-category-add.component';
import { AdminRolesComponent } from './Components/Admin/admin-roles/admin-roles.component';
import { AdminRoleUpdateComponent } from './Components/Admin/admin-role-update/admin-role-update.component';
import { BrandSearchPipe } from './pipes/brandsearch/brand-search.pipe';
import { UserSearchPipe } from './pipes/usersearch/user-search.pipe';
import { AdminEditcustomerComponent } from './Components/Admin/admin-editcustomer/admin-editcustomer.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { UserModule } from './Components/User/user.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLeftnavComponent,
    AdminNavbarComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminCustomersComponent,
    AdminBrandsComponent,
    AdminProductAddComponent,
    AdminProductUpdateComponent,
    AdminUploadimageComponent,
    AdminCategoryUpdateComponent,
    AdminCategoryAddComponent,
    AdminRolesComponent,
    AdminRoleUpdateComponent,
    AdminEditcustomerComponent,
  ],
  imports: [
    UserModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SliderModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
