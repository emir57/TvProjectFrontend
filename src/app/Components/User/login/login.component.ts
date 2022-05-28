import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { VerifyCodeBoxService } from 'src/app/Services/verify-code-box.service';

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
    private router: Router,
    private userService: UserService,
    private verifyCodeBoxService: VerifyCodeBoxService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
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
          if (!responseErr.error.message) {
            this.toastrService.warning("Sunucuya bağlanılamıyor..");
          }
          if (responseErr.error.message) {
            this.toastrService.error(responseErr.error.message);
          }
          this.isOk = true;
        },
        (response) => {
          this.userService.sendCode(response.data.user.id).subscribe();
          this.verifyCodeBoxService.show((code) => {
            this.userService.verifyCode(response.data.user.id, code).subscribe(codeResponse => {
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
            }, responseErr => {
              this.toastrService.error("Hatalı Kod")
            })
          })

        })
    }
  }

  getYear() {
    let date = new Date();
    return date.getFullYear();
  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

}
