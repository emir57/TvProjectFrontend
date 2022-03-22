import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  isOk = true;
  user: User
  userUpdateForm: FormGroup;
  resetPasswordForm: FormGroup
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    let sessionUser = sessionStorage.getItem("userInfo")
    let localUser = localStorage.getItem("userInfo")
    if (sessionUser) {
      this.user = JSON.parse(sessionUser);
    }
    if (localUser) {
      this.user = JSON.parse(localUser);
    }
    this.createUserUpdateForm();
    this.createresetPasswordForm();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      userId:[this.user.id],
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(50)]],
      password:['',[Validators.required]]
    })
  }
  createresetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      userId:[this.user.id],
      oldPassword: ['', [Validators.required, Validators.maxLength(50)]],
      newPassword: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }

  updateUserInfo() {
    if (this.userUpdateForm.valid) {
      this.isOk=false;
      let updateUserModel = Object.assign({},this.userUpdateForm.value)
      this.userService.updateUser(updateUserModel).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
          if(Boolean(localStorage.getItem("remember"))){
            localStorage.setItem("userInfo",JSON.stringify(Object.assign({id:updateUserModel.userId},updateUserModel)))
          }else{
            sessionStorage.setItem("userInfo",JSON.stringify(Object.assign({id:updateUserModel.userId},updateUserModel)))
          }

          this.userUpdateForm.get("password").setValue("")
        }else{
          this.toastrService.error(response.message)
        }
        this.isOk=true;
      },err=>{
        this.toastrService.error(err.error)
      })
    }
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isOk=false;
      let changePasswordModel = Object.assign({},this.resetPasswordForm.value)
      this.userService.changePassword(changePasswordModel).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
          this.authService.isLogin=false;
          this.router.navigate(["login"]);
        }else{
          this.toastrService.error(response.message)
        }
        this.isOk=true;
      })
    }
  }

}
