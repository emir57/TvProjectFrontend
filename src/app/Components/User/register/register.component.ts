import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.maxLength(20)]],
      lastName: ['', [Validators.required,Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email,Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(30)]],
      agreement:[false]
    })
  }

  register(){
    if(this.registerForm.valid && this.registerForm.get('agreement').value){
      console.log("başarılı")
    }
  }

}


