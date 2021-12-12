import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
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

  apiUrl=ApiUrl
  isOk=true;
  productUpdateForm: FormGroup;
  categories: Category[] = [];
  product: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe(param => {
      if (!param["product"]) {
        this.router.navigate(["/admindashboard/home"])
      }
      this.product = JSON.parse(param["product"])
    })
    this.createproductUpdateForm();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
  }
  createproductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      id: [this.product.id, []],
      productName: [this.product.productName, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      productCode: [this.product.productCode, []],
      screenType: [this.product.screenType, [Validators.required, Validators.maxLength(50)]],
      screenInch: [this.product.screenInch, [Validators.required, Validators.maxLength(10)]],
      extras: [this.product.extras, [Validators.maxLength(50)]],
      brandId: [this.product.brandId, [Validators.required, Validators.min(1)]],
      unitPrice: [this.product.unitPrice, [Validators.required, Validators.min(500)]],
      discount: [this.product.discount, []],
      isDiscount: [this.product.isDiscount, []],
      stock: [this.product.stock, [Validators.required, Validators.min(1), Validators.max(255)]],
      photos:[this.product.photos]
    })
  }

  updateProduct() {
    if (this.productUpdateForm.valid) {
      this.isOk=false;
      let productModel = Object.assign({},this.productUpdateForm.value);
      this.productService.updateProduct(productModel).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success(response.message);
          this.isOk=true;
          this.router.navigate(["admindashboard/productupdate",JSON.stringify(productModel)])
        }
      },responseErr=>{
        this.toastrService.error(responseErr.error.Message)
      })
    }
  }
  deleteProduct(){
    this.isOk=false;
    this.productService.deleteProduct(this.product).subscribe(response=>{
      if(response.isSuccess){
        this.toastrService.success(response.message);
        this.router.navigate(["admindashboard/adminproducts"])
      }
    })
  }

}
