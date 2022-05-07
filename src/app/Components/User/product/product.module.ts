import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterComponent } from '../footer/footer.component';
import { FooterModule } from '../footer/footer.module';
import { ProductSearchPipe } from 'src/app/pipes/productsearch/product-search.pipe';
import { ProductsearchModule } from 'src/app/pipes/productsearch/productsearch.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryModule } from '../category/category.module';
import { DiscountModule } from 'src/app/pipes/discount/discount.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ImageSlideComponent } from 'src/app/image-slide/image-slide.component';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarModule,
    FooterModule,
    ProductsearchModule,
    DiscountModule,
    CategoryModule,
    AppRoutingModule
  ]
})
export class ProductModule { }
