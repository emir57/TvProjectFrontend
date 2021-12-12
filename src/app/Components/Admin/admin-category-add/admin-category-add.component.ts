import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {

  isOk=true;
  categoryAddForm:FormGroup
  constructor(
    private categoryService:CategoryService,
    private activatedRouter:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.maxLength(50)]],
      phoneNumber:['',[Validators.maxLength(15)]],
      address:['',[Validators.maxLength(250)]]
    })
  }

  addCategory(){
    if(this.categoryAddForm.valid){
      this.isOk=false;
      let categoryModel = Object.assign({},this.categoryAddForm.value);
      this.categoryService.addCategory(categoryModel).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
          this.categoryAddForm.reset();
          this.isOk=true;
        }else{
          this.toastrService.error(response.message);
        }
      })

    }
  }

}
