import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterComponent } from '../footer/footer.component';
import { FooterModule } from '../footer/footer.module';
import { ProductSearchPipe } from 'src/app/pipes/product-search.pipe';



@NgModule({
  declarations: [
    ProductComponent,
    ProductSearchPipe
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
  ]
})
export class ProductModule { }
