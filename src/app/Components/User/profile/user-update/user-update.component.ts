import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let sessionUser = sessionStorage.getItem("userInfo")
    if (sessionUser) {
      this.user = JSON.parse(sessionUser);
    }
    this.createUserUpdateForm();
    this.createresetPasswordForm();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(50)]],
    })
  }
  createresetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.maxLength(50)]],
      newPassword: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }

  updateUserInfo() {
    if (this.userUpdateForm.valid) {
      this.isOk=false;
    }
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isOk=false;
    }
  }

}
