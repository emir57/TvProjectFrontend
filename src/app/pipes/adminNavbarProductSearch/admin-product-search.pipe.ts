import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminProductSearch'
})
export class AdminProductSearchPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
