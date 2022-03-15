import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../Models/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: Product[], searchString:string): Product[] {
    searchString = searchString ?? searchString.toLocaleLowerCase()
    return searchString ?
    value.filter(
      product=>product.productName.toLocaleLowerCase().indexOf(searchString)!==-1 ||
      product.screenInch.indexOf(searchString)!==-1 ||
      product.extras.toLocaleLowerCase().indexOf(searchString)!==-1 ||
      product.screenType.toLocaleLowerCase().indexOf(searchString)!=-1
        ):
        value;
  }

}
