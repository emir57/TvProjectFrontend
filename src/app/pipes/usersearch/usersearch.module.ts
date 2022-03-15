import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchPipe } from './user-search.pipe';



@NgModule({
  declarations: [
    UserSearchPipe
  ],
  imports: [
    CommonModule
  ],exports:[
    UserSearchPipe
  ]
})
export class UsersearchModule { }
