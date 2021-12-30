import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Models/user';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(value: User[], searchString:string): User[] {
    searchString = searchString ? searchString.toLocaleLowerCase():'';
    return searchString?
      value.filter(x=>x.firstName.toLocaleLowerCase().indexOf(searchString)!=-1||
      x.lastName.toLocaleLowerCase().indexOf(searchString)!=-1||
      x.email.toLocaleLowerCase().indexOf(searchString)!=-1):
      value;
  }

}
