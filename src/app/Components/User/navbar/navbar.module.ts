import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LoginModule } from '../login/login.module';
import { LoginComponent } from '../login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
