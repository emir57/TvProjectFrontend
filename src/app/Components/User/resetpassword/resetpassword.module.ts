import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetpasswordComponent } from './resetpassword.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResetpasswordModule { }
