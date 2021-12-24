import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/Models/role';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.css']
})
export class AdminRolesComponent implements OnInit {

  roles:Role[]=[]
  constructor(
    private roleService:RoleService
  ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(response=>{
      this.roles=response.data;
    })
  }

}
