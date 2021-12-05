import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number, discount:number,isDiscount:boolean): number {
    if(isDiscount){
      return value - (value*discount/100)
    }else{
      return value
    }
  }

}
