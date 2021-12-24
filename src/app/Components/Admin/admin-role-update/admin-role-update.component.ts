import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Models/role';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-admin-role-update',
  templateUrl: './admin-role-update.component.html',
  styleUrls: ['./admin-role-update.component.css']
})
export class AdminRoleUpdateComponent implements OnInit {

  role:Role
  updateForm:FormGroup
  constructor(
    private roleService:RoleService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      if(!param["role"]){
        this.router.navigate(["admindashboard/adminroles"])
      }
      this.role = param["role"]
    })
    this.createUpdateForm();
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      id:[this.role.id],
      name:[this.role.name,[Validators.required]]
    })
  }

  update(){
    if(this.updateForm.valid){
      let role = Object.assign({},this.updateForm.value);
      this.roleService.updateRole(role).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
          this.router.navigate(["admindashboard/adminroles"])
        }else{
          this.toastrService.error(response.message);
        }
      })
    }
  }

}
