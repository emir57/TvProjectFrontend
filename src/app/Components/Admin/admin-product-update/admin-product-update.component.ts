import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/Models/apiUrl';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import $ from 'jquery';
import { Photo } from 'src/app/Models/photo';
import { Subject } from 'rxjs';
import { DeleteAlertService } from 'src/app/Services/delete-alert.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { Location } from '@angular/common';
import { PhotoService } from 'src/app/Services/photo.service';
@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  apiUrl = ApiUrl
  isOk = true;
  productUpdateForm: FormGroup;
  uploadImageForm: FormGroup;
  categories: Category[] = [];
  product: Product;
  selectedFile: File;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private deleteAlertService: DeleteAlertService,
    private loadingService: LoadingService,
    private location: Location,
    private photoService: PhotoService
  ) { }

  back() {
    this.location.back();
  }

  async ngOnInit() {
    this.getCategories();
    this.loadingService.showLoading();
    this.activatedRoute.params.subscribe(async param => {
      if (!param["product"]) {
        this.router.navigate(["/admindashboard/home"])
      }
      let result = await this.productService.getProduct(param["product"]).toPromise();
      this.product = result.data;
      this.createproductUpdateForm();
      this.createUploadImageForm();
      setTimeout(() => {
        this.loadingService.closeLoading();
      }, 500);
    })
    this.deleteDiv();
    setTimeout(() => {
      this.imageSlide();
    }, 500);
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      if (response.isSuccess) {
        this.categories = response.data;
      }
    })
  }
  updateProduct() {
    if (this.productUpdateForm.valid) {
      this.isOk = false;
      let productModel = Object.assign({}, this.productUpdateForm.value);
      this.productService.updateProduct(productModel).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
          this.isOk = true;
          this.router.navigate(["admindashboard/productupdate", productModel.id])
        }
      }, responseErr => {
        this.isOk = true;
        this.toastrService.error(responseErr.error.Message)
      })
    }
  }

  deleteProduct() {
    this.isOk = false;
    this.deleteAlertService.showAlertBox("Bu ürünü silmek istediğinizden eminmisiniz?",
      () => {
        this.productService.deleteProduct(this.product).subscribe(response => {
          if (response.isSuccess) {
            this.isOk = true;
            this.toastrService.success(response.message);
            this.router.navigate(["admindashboard/adminproducts"])
          }
        })
      },
      () => {
        this.isOk = true;
      })
  }
  async createproductUpdateForm() {
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
      stock: [this.product.stock, [Validators.required, Validators.min(0), Validators.max(255)]],
      photos: [this.product.photos]
    })
  }
  createUploadImageForm() {
    this.uploadImageForm = this.formBuilder.group({
      tvId: [this.product.id, [Validators.required]],
      isMain: [false],
      file: [, [Validators.required]]
    })
  }

  async uploadImage() {
    if (this.uploadImageForm.valid) {
      this.isOk = false;
      let photoModel = Object.assign({}, this.photoUploadForm.value)
      this.photoService.uploadImage(this.selectedFile, photoModel).subscribe(response => {
        if (response.isSuccess) {
          this.toastrService.success(response.message);
        } else {
          this.toastrService.error(response.message)
        }
        this.isOk = true;
      }, responseErr => {
        this.isOk = true;
      })
    }
  }

  photocheck(photo: Photo, product: Product) {
    if (photo.isMain == true) {
      return `carousel-item active photoProduct`
    } else {
      return `carousel-item photoProduct`
    }
  }
  deleteDiv() {
    var bgDiv = $("#backgroundDiv");
    var deleteDiv = $("#deleteDiv");
    var deleteButton = $("#deleteButton");
    var cancelBtn = $(".cancelBtn");
    bgDiv.click(function () {
      deleteDiv.fadeOut(500);
      bgDiv.fadeOut(900);
    })
    cancelBtn.click(function () {
      deleteDiv.fadeOut(500);
      bgDiv.fadeOut(900);
    })
    deleteButton.click(function () {
      deleteDiv.fadeIn(500);
      bgDiv.fadeIn(900);
    })
  }
}
