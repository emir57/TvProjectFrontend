import { getLocaleExtraDayPeriodRules, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  updateForm: UntypedFormGroup
  user: User;
  allRoles: Role[] = [];
  userRoles: Role[] = [];

  addedRoles: Role[] = [];
  removedRoles: Role[] = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private location: Location
  ) { }

  back() {
    this.location.back();
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async param => {
      if (param["customer"]) {
        let result = await this.userService.getUserById(param["customer"]).toPromise();
        this.user = result.data;
        this.getAllRoles();
        this.getUserRoles();
        this.createUpdateForm();
      }
    })
  }
  getAllRoles() {
    this.roleService.getRoles().subscribe(response => {
      if (response.isSuccess) {
        this.allRoles = response.data;
      }
    })
  }
  getUserRoles() {
    this.roleService.getUserRoles(this.user.id).subscribe(response => {
      if (response.isSuccess) {
        this.userRoles = response.data;
        this.addedRoles = response.data;
      }
    })
  }


  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [this.user.id],
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(20)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email, Validators.maxLength(40)]]
    })
  }

  update() {
    if (this.updateForm.valid) {
      let user = Object.assign({ addedRoles: this.addedRoles, removedRoles: this.removedRoles }, this.updateForm.value);
      this.userService.updateUserAdmin(user).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message)
          setTimeout(() => {
            this.router.navigate(["admindashboard/admincustomers"])
          }, 500);
        } else {
          this.toastrService.error(response.message)
        }
      }, responseErr => {
        this.toastrService.error(responseErr.error)
      })
    }
  }
  checkRole(role: Role) {
    let status = false;
    this.userRoles.forEach(usrRole => {
      if (usrRole.id == role.id) {
        status = true;
      }
    })
    return status;
  }
  setRole(role: Role) {
    let indexAdded = this.addedRoles.findIndex(x => x.id == role.id);
    let indexRemoved = this.removedRoles.findIndex(x => x.id == role.id);
    if (indexAdded == -1) {
      this.addedRoles.push(role);
    }
    else if (indexRemoved == -1) {
      this.removedRoles.push(role);
    }
    if (indexAdded != -1) {
      this.addedRoles.splice(indexAdded, 1);
    }
    else if (indexRemoved != -1) {
      this.removedRoles.splice(indexAdded, 1);
    }
  }

}
