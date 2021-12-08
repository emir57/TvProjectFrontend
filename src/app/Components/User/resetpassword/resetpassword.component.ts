import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetPasswordForm:FormGroup
  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createresetPasswordForm();
  }

  createresetPasswordForm(){
    this.resetPasswordForm = this.formBuilder.group({
      oldpassword:['',[Validators.required]],
      newpassword:['',[Validators.required]]
    })
  }

  resetpassword(){
    if(this.resetPasswordForm.valid){

    }
  }

}
