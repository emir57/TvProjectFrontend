import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isOk = true;
  loginForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    })

  }

  async login() {
    if (this.loginForm.valid) {
      this.toastrService.info("Giriş Yapılıyor...")
      this.isOk = false;
      let rememberMe = this.loginForm.get("rememberMe").value;
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel, rememberMe,
        (responseErr) => {
          this.toastrService.error(responseErr.error.message)
        },
        (response) => {
          localStorage.setItem("remember", JSON.stringify(rememberMe))
          if (rememberMe) {
            localStorage.setItem("token", response.data.accessToken.token)
            localStorage.setItem("user", JSON.stringify(response.data.user.id))
            localStorage.setItem("userInfo", JSON.stringify(response.data.user))
            sessionStorage.setItem("user", response.data.user.id + "")
          } else {
            sessionStorage.setItem("token", response.data.accessToken.token)
            sessionStorage.setItem("user", JSON.stringify(response.data.user.id))
          }
          sessionStorage.setItem("userInfo", JSON.stringify(response.data.user))
          //Expiration
          localStorage.setItem("expiration", response.data.accessToken.expiration)
          this.toastrService.success(response.message)
          this.isOk = true;
          this.router.navigate(["/"])
        })
    }
  }

  getYear() {
    let date = new Date();
    return date.getFullYear();
  }

}
