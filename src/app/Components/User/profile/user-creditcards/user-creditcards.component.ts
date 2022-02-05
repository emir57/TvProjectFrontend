import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  addForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,

  ) { }

  ngOnInit(): void {
  }

}
