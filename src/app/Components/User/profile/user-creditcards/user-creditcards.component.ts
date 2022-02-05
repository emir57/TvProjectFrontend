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

  today = new Date;
  cYear = +this.today.getFullYear().toString().substring(2,4);
  creditCardNumber: string = "4555555555555555";
  cvv: string = "555";
  name: String = "Emir";
  surname: String = "Gürbüz";
  day:string="01";
  year:string="22"
  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.createAddForm();
    var creditCardNumber = $("#creditCardNumber");
    let creditStatus = false;
    creditCardNumber.change(function(){
      let trimNumber = "";
      for (let i = 0; i < creditCardNumber.val().length; i++) {
        const c = creditCardNumber.val()[i];
        if(c != " ") trimNumber+=c;
      }
      console.log(trimNumber)
      if(creditCardNumber.val()==""){
        creditStatus = false;
        return;
      }
      if(!creditStatus){
        let first4 = trimNumber.substring(0,4);
        let second4 = trimNumber.substring(4,8);
        let third4 = trimNumber.substring(8,12);
        let fourth4 = trimNumber.substring(12,16);
        let completeNumber = first4+" "+second4+" "+third4+" "+fourth4
        creditCardNumber.val(completeNumber)
      }
      if(creditCardNumber.val().length!=19){
        console.log("geçersiz kredi kartı numarası")
      }
      creditStatus=true;
    })
  }

  createAddForm(){

    this.addForm = this.formBuilder.group({
      creditCardNumber:[,[Validators.required,Validators.maxLength(19),Validators.minLength(16)]],
      cvv:[,[Validators.required,Validators.maxLength(3),Validators.minLength(2)]],
      day:[,[Validators.required,Validators.max(31),Validators.min(1)]],
      year:[,[Validators.required,Validators.min(this.cYear)]]
    })
  }

  addCreditCard(){
    if(this.addForm.valid){
      let creditCardNumber = this.addForm.get("creditCardNumber").value;
      let trimNumber = "";
      for (let i = 0; i < creditCardNumber.length; i++) {
        const c = creditCardNumber[i];
        if(c != " ") trimNumber+=c;
      }
      let day = this.addForm.get("day").value;
      if(+day >=1 && +day<=9){
        day = "0"+day
      }
      let year = this.addForm.get("year").value;
      let date = day+"/"+year;
      this.addForm.get("creditCardNumber").setValue(trimNumber)
      let creditCard = Object.assign({
        date:date
      },this.addForm.value)
      console.log(creditCard);
    }
  }

}
