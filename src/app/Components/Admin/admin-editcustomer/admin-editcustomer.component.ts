import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { RoleService } from 'src/app/Services/role.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-editcustomer',
  templateUrl: './admin-editcustomer.component.html',
  styleUrls: ['./admin-editcustomer.component.css']
})
export class AdminEditcustomerComponent implements OnInit {

  updateForm:FormGroup
  user:User;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private toastrService:ToastrService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private roleService:RoleService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.createUpdateForm();
  }
  getUser(){
    this.activatedRoute.params.subscribe(param=>{
      if(param["customer"]){
        this.user = JSON.parse(param["customer"])
      }
    })
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      firstName:[this.user.firstName,[Validators.required,Validators.maxLength(20)]],
      lastName:[this.user.lastName,[Validators.required,Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email,Validators.maxLength(40)]],
    })
  }

}
