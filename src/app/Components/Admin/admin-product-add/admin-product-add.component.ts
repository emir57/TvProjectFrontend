import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  isOk = true;
  productAddForm: UntypedFormGroup;
  categories: Category[] = [];
  selectedCategory: Category;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private location: Location
  ) { }

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
    this.createAddproductForm();
  }
  createAddproductForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      productCode: ['', []],
      screenType: ['', [Validators.required, Validators.maxLength(50)]],
      screenInch: ['', [Validators.required, Validators.maxLength(10)]],
      extras: ['', [Validators.maxLength(50)]],
      brandId: [null, [Validators.required]],
      unitPrice: [, [Validators.required, Validators.min(500)]],
      discount: [, []],
      isDiscount: [false, []],
      stock: ['', [Validators.required, Validators.min(1), Validators.max(255)]],
    })
  }
  selectCategory(brandId: any) {
    console.log(brandId.value)
    this.categoryService.getCategories().subscribe(response => {
      response.data.forEach(category => {
        if (category.id == brandId.value) {
          this.selectedCategory = category;
        }
      })
    })
  }

  addProduct() {
    if (this.productAddForm.valid) {
      this.isOk = false;
      this.productAddForm.get("brandId").setValue(+this.productAddForm.get("brandId").value)
      let productModel: Product = Object.assign({}, this.productAddForm.value);
      console.log(productModel);
      // this.productService.addProduct(productModel).subscribe(response=>{
      //   if(response.isSuccess){
      //     this.toastrService.success(response.message);
      //     this.productAddForm.reset;
      //     this.isOk=true;
      //   }
      // },responseErr=>{
      //   this.toastrService.error(responseErr.error.Message)
      //   this.isOk=true;
      // })

    }
  }

}
