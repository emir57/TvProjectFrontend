import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })

  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel)
        .subscribe(response=>{
          if(response.isSuccess){
            console.log("Giriş başarılı");
            console.log(response)
          }
        },responseErr=>{
          console.log(responseErr)
        })
    }
  }

}
