import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-editcustomer',
  templateUrl: './admin-editcustomer.component.html',
  styleUrls: ['./admin-editcustomer.component.css']
})
export class AdminEditcustomerComponent implements OnInit {

  updateForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private toastrService:ToastrService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }

}
