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

  isOk = true;
  role: Role
  updateForm: FormGroup
  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async param => {
      if (!param["role"]) {
        this.router.navigate(["admindashboard/adminroles"])
      }
      let result = await this.roleService.getById(param["role"]).toPromise();
      this.role = result.data;
      this.createUpdateForm();
    })
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [this.role.id],
      name: [this.role.name, [Validators.required, Validators.maxLength(15)]]
    })
  }

  update() {
    if (this.updateForm.valid) {
      this.isOk = false;
      let role = Object.assign({}, this.updateForm.value);
      this.roleService.updateRole(role).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
          this.router.navigate(["admindashboard/adminroles"])
          this.isOk = true;
        } else {
          this.toastrService.error(response.message);
          this.isOk = true;
        }
      })
    }
  }
  delete() {
    if (confirm(`${this.role.name} rolünü silmek istediğinizden emin misiniz?`)) {
      this.isOk = false;
      this.roleService.deleteRole(this.role).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
          this.router.navigate(["admindashboard/adminroles"])
          this.isOk = true;
        }
      }, responseErr => {
        this.toastrService.error(responseErr.error.message);
        this.isOk = true;
      })
    }else{
      this.toastrService.info("Silme işlemi iptal edildi");
    }

  }

}
