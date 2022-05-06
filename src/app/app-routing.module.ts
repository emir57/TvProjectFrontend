import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBrandsComponent } from './Components/Admin/admin-brands/admin-brands.component';
import { AdminCategoryAddComponent } from './Components/Admin/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './Components/Admin/admin-category-update/admin-category-update.component';
import { AdminCustomersComponent } from './Components/Admin/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminEditcustomerComponent } from './Components/Admin/admin-editcustomer/admin-editcustomer.component';
import { AdminOrdersComponent } from './Components/Admin/admin-orders/admin-orders.component';
import { AdminProductAddComponent } from './Components/Admin/admin-product-add/admin-product-add.component';
import { AdminProductUpdateComponent } from './Components/Admin/admin-product-update/admin-product-update.component';
import { AdminProductsComponent } from './Components/Admin/admin-products/admin-products.component';
import { AdminRoleUpdateComponent } from './Components/Admin/admin-role-update/admin-role-update.component';
import { AdminRolesComponent } from './Components/Admin/admin-roles/admin-roles.component';
import { AdminUploadimageComponent } from './Components/Admin/admin-uploadimage/admin-uploadimage.component';
import { AdminComponent } from './Components/Admin/admin.component';
import { CategoryComponent } from './Components/User/category/category.component';
import { CheckoutComponent } from './Components/User/checkout/checkout.component';
import { ForgotpasswordComponent } from './Components/User/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Components/User/login/login.component';
import { ProductComponent } from './Components/User/product/product.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { UserAddressComponent } from './Components/User/profile/user-address/user-address.component';
import { UserCreditcardsComponent } from './Components/User/profile/user-creditcards/user-creditcards.component';
import { UserOrdersComponent } from './Components/User/profile/user-orders/user-orders.component';
import { UserUpdateComponent } from './Components/User/profile/user-update/user-update.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { ResetpasswordComponent } from './Components/User/resetpassword/resetpassword.component';
import { UserComponent } from './Components/User/user.component';
import { AdminGuard } from './Guards/admin.guard';
import { ExpirationGuard } from './Guards/expiration.guard';
import { SecurityGuard } from './Guards/security.guard';

const routes: Routes = [
  {
    path: "", component: UserComponent, children: [
      { path: "", component: ProductComponent },
      { path: "products/category/:categoryId", component: ProductComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgotpassword", component: ForgotpasswordComponent },
      { path: "checkout/:productId", component: CheckoutComponent, canActivate: [ExpirationGuard] },
      { path: "resetpassword/:key", component: ResetpasswordComponent },
    ]
  },
  //Admin Panels

  {
    path: "admindashboard", component: AdminComponent, children: [
      { path: "home", component: AdminDashboardComponent, canActivate: [AdminGuard, ExpirationGuard] },
      { path: "adminproducts", component: AdminProductsComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "adminorders", component: AdminOrdersComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "admincustomers", component: AdminCustomersComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "adminbrands", component: AdminBrandsComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "editcustomer/:customer", component: AdminEditcustomerComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "productadd", component: AdminProductAddComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "productupdate/:product", component: AdminProductUpdateComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "categoryupdate/:category", component: AdminCategoryUpdateComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "categoryadd", component: AdminCategoryAddComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "adminroles", component: AdminRolesComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "roleupdate/:role", component: AdminRoleUpdateComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
      { path: "uploadimage", component: AdminUploadimageComponent, canActivate: [SecurityGuard, AdminGuard, ExpirationGuard] },
    ]
  },
  //User Panels
  {
    path: "profile", component: ProfileComponent, children: [
      { path: "", component: UserUpdateComponent, canActivate: [SecurityGuard, ExpirationGuard] },
      { path: "update", component: UserUpdateComponent, canActivate: [SecurityGuard, ExpirationGuard] },
      { path: "myorders", component: UserOrdersComponent, canActivate: [SecurityGuard, ExpirationGuard] },
      { path: "mycreditcards", component: UserCreditcardsComponent, canActivate: [SecurityGuard, ExpirationGuard] },
      { path: "myadresses", component: UserAddressComponent, canActivate: [SecurityGuard, ExpirationGuard] },
    ]
  },
  // {path:"categories",component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
