import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private roleService:RoleService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(response=>{
      this.roles=response.data;
    })
  }

  goUpdatePage(role:Role){
    this.router.navigate(["admindashboard/roleupdate",role.id])
    // this.router.navigate(["admindashboard/roleupdate",JSON.stringify(role)])
  }

}
