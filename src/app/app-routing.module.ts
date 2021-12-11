import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomersComponent } from './Components/Admin/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './Components/Admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './Components/Admin/admin-products/admin-products.component';
import { CategoryComponent } from './Components/User/category/category.component';
import { ForgotpasswordComponent } from './Components/User/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Components/User/login/login.component';
import { ProductComponent } from './Components/User/product/product.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { ResetpasswordComponent } from './Components/User/resetpassword/resetpassword.component';
import { AdminGuard } from './Guards/admin.guard';
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
  {path:"admindashboard",component:AdminDashboardComponent,canActivate:[AdminGuard]},
  {path:"adminproducts",component:AdminProductsComponent,canActivate:[AdminGuard]},
  {path:"admindorders",component:AdminOrdersComponent,canActivate:[AdminGuard]},
  {path:"admincustomers",component:AdminCustomersComponent,canActivate:[AdminGuard]},
  // {path:"categories",component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
