import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  isSend=true;
  forgotPasswordForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
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
    if(this.forgotPasswordForm.valid){
      this.isSend=false;
      console.log(this.forgotPasswordForm.value)
      let model = Object.assign({},this.forgotPasswordForm.value);
      this.authService.sendMail(model)
        .subscribe(response=>{
          if(response.isSuccess){
            this.toastrService.success(`${response.message} Gereksiz Eposta Adresinizi Kontrol Etmeyi Unutmayınız`)
          }else{
            this.toastrService.error(response.message);
          }
          this.isSend=true;
        },responseErr=>{
          console.log(responseErr)
        })
    }
  }

}
