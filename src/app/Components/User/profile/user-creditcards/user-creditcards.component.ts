import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-creditcards',
  templateUrl: './user-creditcards.component.html',
  styleUrls: ['./user-creditcards.component.css']
})
export class UserCreditcardsComponent implements OnInit {

  creditCardNumber:string="4555555555555555";
  cvv:string="555";
  name:String="Emir"
  surname:String="Gürbüz"
  constructor() { }

  ngOnInit(): void {
  }

}
