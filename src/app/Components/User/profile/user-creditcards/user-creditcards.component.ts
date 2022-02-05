import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import $ from 'jquery';
@Component({
  selector: 'app-user-creditcards',
  templateUrl: './user-creditcards.component.html',
  styleUrls: ['./user-creditcards.component.css']
})
export class UserCreditcardsComponent implements OnInit {

  creditCardNumber: string = "4555555555555555";
  cvv: string = "555";
  name: String = "Emir"
  surname: String = "Gürbüz"
  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.createAddForm();
    var creditCardNumber = $("#creditCardNumber");
    $("#creditCardNumber").change(function(){
      let first4 = creditCardNumber.val().substring(0,4);
      let second4 = creditCardNumber.val().substring(4,8);
      let third4 = creditCardNumber.val().substring(8,12);
      let fourth4 = creditCardNumber.val().substring(12,16);
      let completeNumber = first4+" "+second4+" "+third4+" "+fourth4
      creditCardNumber.val(completeNumber)
    })

  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      creditCardNumber:[,[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      cvv:[,[Validators.required,Validators.maxLength(3),Validators.minLength(3)]],
      date:[,[Validators.required]]
    })
  }

}
