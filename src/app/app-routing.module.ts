import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './Components/User/category/category.component';
import { LoginComponent } from './Components/User/login/login.component';
import { ProductComponent } from './Components/User/product/product.component';
import { RegisterComponent } from './Components/User/register/register.component';

const routes: Routes = [
  {path:"",component:ProductComponent},
  {path:"products",component:ProductComponent},
  {path:"products/category/:categoryId",component:ProductComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  // {path:"categories",component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
