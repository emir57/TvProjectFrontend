import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Models/role';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-admin-role-update',
  templateUrl: './admin-role-update.component.html',
  styleUrls: ['./admin-role-update.component.css']
})
export class AdminRoleUpdateComponent implements OnInit {

  role:Role
  constructor(
    private roleService:RoleService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      if(!param["role"]){
        this.router.navigate(["admindashboard/adminroles"])
      }
      this.role = param["role"]
      console.log(this.role)
    })
  }

}
