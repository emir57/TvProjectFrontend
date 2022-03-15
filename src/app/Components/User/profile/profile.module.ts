import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserCreditcardsComponent } from './user-creditcards/user-creditcards.component';
import { UserLeftPanelComponent } from './user-left-panel/user-left-panel.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
    UserLeftPanelComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,

  ]
})
export class ProfileModule { }
