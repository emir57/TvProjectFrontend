import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SliderModule } from 'angular-image-slider';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { NgImageSliderModule } from 'ng-image-slider';
import { UserModule } from './Components/User/user.module';
import { AdminModule } from './Components/Admin/admin.module';
import { RouterModule } from '@angular/router';
import { ImageSlideComponent } from './image-slide/image-slide.component';
@NgModule({
  declarations: [
    AppComponent,
    ImageSlideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SliderModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    UserModule,
    AdminModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
