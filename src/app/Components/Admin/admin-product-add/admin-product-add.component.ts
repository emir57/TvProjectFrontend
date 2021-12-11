import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

  productAddForm:FormGroup
  categories:Category[]=[]
  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(response=>{
      if(response.isSuccess){
        this.categories = response.data;
      }
    })
    this.createAddproductForm();
  }

  createAddproductForm(){
    this.productAddForm = this.formBuilder.group({
      productName:['',[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      productCode:['',[]],
      screenType:['',[Validators.required,Validators.maxLength(50)]],
      screenInch:['',[Validators.required,Validators.maxLength(10)]],
      extras:['',[Validators.maxLength(50)]],
      brandId:[0,[Validators.required,Validators.min(1)]],
      unitPrice:[,[Validators.required,Validators.min(500)]],
      discount:[,[]],
      isDiscount:[false,[]],
      stock:['',[Validators.required,Validators.min(1),Validators.max(255)]],
    })
  }

  addProduct(){
    if(this.productAddForm.valid){
      this.productAddForm.get("brandId").setValue(+this.productAddForm.get("brandId").value)
      console.log(this.productAddForm.value)
      let productModel:Product = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(productModel).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
          this.productAddForm.reset;
        }
      },responseErr=>{
        console.log(responseErr)
        this.toastrService.error(responseErr.error.Message)
      })
    }
  }

}
