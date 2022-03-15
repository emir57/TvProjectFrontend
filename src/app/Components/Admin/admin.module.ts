import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBrandsComponent } from './admin-brands/admin-brands.component';
import { AdminCategoryAddComponent } from './admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './admin-category-update/admin-category-update.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditcustomerComponent } from './admin-editcustomer/admin-editcustomer.component';
import { AdminLeftnavComponent } from './admin-leftnav/admin-leftnav.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { AdminProductUpdateComponent } from './admin-product-update/admin-product-update.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminRoleUpdateComponent } from './admin-role-update/admin-role-update.component';
import { AdminRolesComponent } from './admin-roles/admin-roles.component';
import { AdminUploadimageComponent } from './admin-uploadimage/admin-uploadimage.component';
import { ProductsearchModule } from 'src/app/pipes/productsearch/productsearch.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersearchModule } from 'src/app/pipes/usersearch/usersearch.module';
import { BrandsearchModule } from 'src/app/pipes/brandsearch/brandsearch.module';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    AdminBrandsComponent,
    AdminCategoryAddComponent,
    AdminCategoryUpdateComponent,
    AdminCustomersComponent,
    AdminDashboardComponent,
    AdminEditcustomerComponent,
    AdminLeftnavComponent,
    AdminNavbarComponent,
    AdminOrdersComponent,
    AdminProductAddComponent,
    AdminProductUpdateComponent,
    AdminProductsComponent,
    AdminRoleUpdateComponent,
    AdminRolesComponent,
    AdminUploadimageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsearchModule,
    UsersearchModule,
    BrandsearchModule,
    AppRoutingModule
  ]
})
export class AdminModule { }
