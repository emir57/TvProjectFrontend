import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup
  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createforgotPasswordForm();
  }

  createforgotPasswordForm(){
    this.forgotPasswordForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  send(){

  }

}
