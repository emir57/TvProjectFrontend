import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-creditcards',
  templateUrl: './user-creditcards.component.html',
  styleUrls: ['./user-creditcards.component.css']
})
export class UserCreditcardsComponent implements OnInit {

  creditCardNumber:string="5555555555555555";
  cvv:string="555";
  nameSurname:String="Emir Gürbüz"
  constructor() { }

  ngOnInit(): void {
  }

}
