import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  isLoad=true;
  resetPasswordForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private activatedRouted:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router,
    private authService:AuthService
  ) { }

  key="";
  ngOnInit(): void {
    this.activatedRouted.params.subscribe(param=>{
      if(param["key"]){
        this.key = param["key"]
      }
      else{
        this.toastrService.error("Hata!");
        this.router.navigate(["login"])
      }
    })
    this.createresetPasswordForm();
  }

  createresetPasswordForm(){
    this.resetPasswordForm = this.formBuilder.group({
      oldpassword:['',[Validators.required]],
      newpassword:['',[Validators.required]],
      key:[this.key]
    })
  }

  resetpassword(){
    if(this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.get('key'))
      this.isLoad=false;
      let resetModel = Object.assign({},this.resetPasswordForm.value);
      this.authService.resetPassword(resetModel)
        .subscribe(response=>{
            if(response.isSuccess){
              this.toastrService.success(response.message)
              this.isLoad=true;
              this.router.navigate(["login"])
            }
            else{
              this.toastrService.error(response.message)
            }
            this.isLoad=true;
          },responseErr=>{
            console.log(responseErr)
            this.toastrService.error(responseErr.error)
          }
        )
    }
  }
}
