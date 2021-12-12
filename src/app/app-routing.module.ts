import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBrandsComponent } from './Components/Admin/admin-brands/admin-brands.component';
import { AdminCategoryAddComponent } from './Components/Admin/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './Components/Admin/admin-category-update/admin-category-update.component';
import { AdminCustomersComponent } from './Components/Admin/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './Components/Admin/admin-orders/admin-orders.component';
import { AdminProductAddComponent } from './Components/Admin/admin-product-add/admin-product-add.component';
import { AdminProductUpdateComponent } from './Components/Admin/admin-product-update/admin-product-update.component';
import { AdminProductsComponent } from './Components/Admin/admin-products/admin-products.component';
import { AdminUploadimageComponent } from './Components/Admin/admin-uploadimage/admin-uploadimage.component';
import { CategoryComponent } from './Components/User/category/category.component';
import { ForgotpasswordComponent } from './Components/User/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Components/User/login/login.component';
import { ProductComponent } from './Components/User/product/product.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { ResetpasswordComponent } from './Components/User/resetpassword/resetpassword.component';
import { AdminGuard } from './Guards/admin.guard';
import { ExpirationGuard } from './Guards/expiration.guard';
import { SecurityGuard } from './Guards/security.guard';

const routes: Routes = [
  {path:"",component:ProductComponent},
  {path:"products",component:ProductComponent},
  {path:"products/category/:categoryId",component:ProductComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"resetpassword/:key",component:ResetpasswordComponent},
  //Admin Panels
  {path:"admindashboard/home",component:AdminDashboardComponent,canActivate:[AdminGuard,ExpirationGuard]},
  // {path:"admindashboard/:section",component:AdminDashboardComponent,canActivate:[AdminGuard]},
  {path:"admindashboard/adminproducts",component:AdminProductsComponent,canActivate:[AdminGuard,ExpirationGuard]},
  {path:"admindashboard/adminorders",component:AdminOrdersComponent,canActivate:[AdminGuard,ExpirationGuard]},
  {path:"admindashboard/admincustomers",component:AdminCustomersComponent,canActivate:[AdminGuard,ExpirationGuard]},
  {path:"admindashboard/adminbrands",component:AdminBrandsComponent,canActivate:[AdminGuard,ExpirationGuard]},

  {path:"admindashboard/productadd",component:AdminProductAddComponent,canActivate:[AdminGuard,ExpirationGuard]},
  {path:"admindashboard/productupdate/:product",component:AdminProductUpdateComponent,canActivate:[AdminGuard,ExpirationGuard]},

  {path:"admindashboard/categoryupdate/:category",component:AdminCategoryUpdateComponent,canActivate:[AdminGuard,ExpirationGuard]},
  {path:"admindashboard/categoryadd",component:AdminCategoryAddComponent,canActivate:[AdminGuard,ExpirationGuard]},

  {path:"admindashboard/uploadimage",component:AdminUploadimageComponent,canActivate:[AdminGuard,ExpirationGuard]},

  // {path:"categories",component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
