import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserCreditcardsComponent } from './user-creditcards/user-creditcards.component';
import { UserLeftPanelComponent } from './user-left-panel/user-left-panel.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProfileComponent,
    UserLeftPanelComponent,
    UserUpdateComponent,
    UserOrdersComponent,
    UserLeftPanelComponent,
    UserCreditcardsComponent,
    UserAddressComponent
  ],
  imports: [
    RouterModule.forChild([
      {path:"",component:ProfileComponent}
    ]),
    CommonModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
