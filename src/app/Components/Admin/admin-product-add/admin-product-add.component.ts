import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

  productAddForm:FormGroup
  brands:Category[]=[]
  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {

    this.createAddproductForm();
  }

  createAddproductForm(){
    this.productAddForm = this.formBuilder.group({
      productName:['',[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      productCode:['',[]],
      screenType:['',[Validators.required,Validators.maxLength(50)]],
      screenInch:['',[Validators.required,Validators.maxLength(10)]],
      extras:['',[Validators.maxLength(50)]],
      brandId:['',[Validators.required]],
      unitPrice:['',[Validators.required,Validators.min(500)]],
      discount:['',[]],
      isDiscount:[false,[]],
      stock:['',[Validators.required,Validators.min(1)]],
    })
  }

}
