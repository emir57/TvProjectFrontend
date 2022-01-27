import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-editcustomer',
  templateUrl: './admin-editcustomer.component.html',
  styleUrls: ['./admin-editcustomer.component.css']
})
export class AdminEditcustomerComponent implements OnInit {

  updateForm:FormGroup
  constructor() { }

  ngOnInit(): void {
  }

}
