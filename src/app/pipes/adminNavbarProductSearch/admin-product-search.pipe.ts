import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Pipe({
  name: 'adminProductSearch'
})
export class AdminProductSearchPipe implements PipeTransform {

  transform(value: Product[], searchString: string): Product[] {
    let array: Product[] = [];
    searchString = searchString ?? searchString.toLocaleLowerCase();
    return searchString == "" ? array :
      value.filter(
        product => product.productName.toLocaleLowerCase().indexOf(searchString) !== -1 ||
          product.extras.toLocaleLowerCase().indexOf(searchString) !== -1
      );
  }

}
