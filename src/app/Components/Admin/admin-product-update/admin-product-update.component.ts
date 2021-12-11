import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  productUpdateForm:FormGroup;
  categories:Category[]=[];
  product:Product;
  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastrService:ToastrService,
    private router:Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();
    this.createproductUpdateForm();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      if(response.isSuccess){
        this.categories = response.data;
      }
    })
  }
  getProduct(){
    this.activatedRoute.params.subscribe(param=>{
      if(!param["id"]){
        this.router.navigate(["admindashboard/adminproducts"])
      }
      this.productService.getProduct(param["id"]).subscribe(response=>{
        if(response.isSuccess){
          this.product = response.data
        }
      })
    })
  }
  createproductUpdateForm(){
    this.productUpdateForm = this.formBuilder.group({
      productName:[this.product.productName,[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      productCode:[this.product.productCode,[]],
      screenType:[this.product.screenType,[Validators.required,Validators.maxLength(50)]],
      screenInch:[this.product.screenInch,[Validators.required,Validators.maxLength(10)]],
      extras:[this.product.extras,[Validators.maxLength(50)]],
      brandId:[this.product.brandId,[Validators.required,Validators.min(1)]],
      unitPrice:[this.product.unitPrice,[Validators.required,Validators.min(500)]],
      discount:[this.product.discount,[]],
      isDiscount:[this.product.isDiscount,[]],
      stock:[this.product.stock,[Validators.required,Validators.min(1),Validators.max(255)]],
    })
  }

  updateProduct(){
    if(this.productUpdateForm.valid){

    }
  }

}
