import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterComponent } from '../footer/footer.component';
import { FooterModule } from '../footer/footer.module';
import { ProductSearchPipe } from 'src/app/pipes/productsearch/product-search.pipe';
import { ProductsearchModule } from 'src/app/pipes/productsearch/productsearch.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryModule } from '../category/category.module';



@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarModule,
    FooterModule,
    ProductsearchModule,
    CategoryModule

  ]
})
export class ProductModule { }
