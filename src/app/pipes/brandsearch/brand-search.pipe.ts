import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../Models/category';

@Pipe({
  name: 'brandSearch'
})
export class BrandSearchPipe implements PipeTransform {

  transform(value: Category[], searchString:string): Category[] {
    searchString = searchString?searchString.toLocaleLowerCase():'';
    return searchString ?
    value.filter(x=>x.name.toLocaleLowerCase().indexOf(searchString)!=-1):
    value;
  }

}
