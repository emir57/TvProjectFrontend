import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Models/role';
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
  allRoles:Role[]=[];
  userRoles:Role[]=[];
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
    this.getAllRoles();
    this.getUserRoles();

    this.createUpdateForm();
  }
  getUser(){
    this.activatedRoute.params.subscribe(param=>{
      if(param["customer"]){
        this.user = JSON.parse(param["customer"])
      }
    })
  }

  getAllRoles(){
    this.roleService.getRoles().subscribe(response=>{
      if(response.isSuccess){
        this.allRoles = response.data;
      }
    })
  }
  getUserRoles(){
    this.roleService.getUserRoles(this.user.id).subscribe(response=>{
      if(response.isSuccess){
        this.userRoles = response.data;
      }
    })
  }


  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      firstName:[this.user.firstName,[Validators.required,Validators.maxLength(20)]],
      lastName:[this.user.lastName,[Validators.required,Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email,Validators.maxLength(40)]]
    })
  }

  update(){
    if(this.updateForm.valid){
      let user = Object.assign({userRoles:this.userRoles},this.updateForm.value);
      console.log(user)
    }
  }
  checkRole(role:Role){
    let status = false;
    this.userRoles.forEach(usrRole=>{
      if(usrRole.id==role.id){
        status = true;
      }
    })
    return status;
  }
  setRole(role:Role){
    let index = this.userRoles.findIndex(x=>x.id==role.id);
    if(index == -1){
      this.userRoles.push(role);
    }
    else{
      this.userRoles.splice(index,1);
    }
    console.log(this.userRoles)
  }

}
