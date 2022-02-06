import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/Services/credit-card.service';
import { CreditCardWithUser } from 'src/app/Models/creditCardWithUser';
import $ from 'jquery';

@Component({
  selector: 'app-user-creditcards',
  templateUrl: './user-creditcards.component.html',
  styleUrls: ['./user-creditcards.component.css']
})
export class UserCreditcardsComponent implements OnInit {

  today = new Date;
  cYear = +this.today.getFullYear().toString().substring(2,4);
  creditCardNumber: string = "";
  cvv: string = "";
  name: String = "";
  surname: String = "";
  day:string="";
  year:string=""

  addForm: FormGroup;
  userId: number = +sessionStorage.getItem("user")
  userCreditCards:CreditCardWithUser[]=[]
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private creditCardService:CreditCardService
  ) { }

  ngOnInit(): void {
    this.createAddForm();
    this.getCreditCards();
    this.creditCardFormat();
    this.deleteModalSettings();
  }

  getCreditCards(){
    this.creditCardService.getUserCreditCards(this.userId).subscribe(response=>{
      if(response.isSuccess){
        this.userCreditCards = response.data;
      }
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
  creditCardFormat(){
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
  deleteModalSettings(){
    var bgDiv = $("#backgroundDiv");
    var deleteModal = $("#deleteDiv");
    bgDiv.click(function(){
      deleteModal.fadeOut(500);
      bgDiv.fadeOut(1000);
    })
  }
  showDeleteModal(card:CreditCardWithUser){
    console.log(card)
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
        userId:this.userId,
        date:date
      },this.addForm.value)
      this.creditCardService.add(creditCard).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
        }
        else{
          this.toastrService.error(response.message);
        }
      },responseErr=>{
        console.log(responseErr)
        this.toastrService.error(responseErr.error.Message)
      })
    }
  }
  getYear(date:string){
    let year = date.split("/")[1];
    year = "*"+year.substring(1,2)
    return year;
  }
  getDay(date:string){
    let day = date.split("/")[0];
    day = day.substring(0,1)+"*"
    return day;
  }
  getFirstName(firstName:string){
    return firstName.substring(0,1)+"***";
  }
  getLastName(lastName:string){
    return lastName.substring(0,1)+"***";
  }
  getCvv(cvv:string){
    return cvv.substring(0,1)+"**";
  }
  getCreditCardNumber(number:string){
    return number.substring(0,4)+" "+"**** **** **"+number.substring(14,16);
  }

}
