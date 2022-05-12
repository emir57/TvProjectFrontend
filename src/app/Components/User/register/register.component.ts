import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoad = true;
  registerForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      rePassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      agreement: [false, [Validators.requiredTrue]]
    }, { validators: this.checkPasswords })
  }

  register() {
    if (this.registerForm.valid && this.registerForm.get('agreement').value) {
      this.isLoad = false;
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel)
        .subscribe(response => {
          if (response.isSuccess) {
            this.toastrService.success(response.message);
            this.isLoad = true;
            this.router.navigate(["login"]);
          }
          else {
            this.toastrService.error(response.message);
          }
          this.isLoad = true;
        }, responseErr => {
          console.log(responseErr)
        })
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('rePassword').value
    return pass === confirmPass ? null : { notSame: true }
  }
  get firstName() {
    return this.registerForm.get("firstName")
  }
  get lastName() {
    return this.registerForm.get("lastName")
  }
  get email() {
    return this.registerForm.get("email")
  }
  get password() {
    return this.registerForm.get("password")
  }

}


